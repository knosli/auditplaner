// Browser-Test (optional, nicht Teil der App): Handy-Route, Maps-Links, ORS-Matrix (T8–T18, T20, T22)
// Voraussetzung: lokaler Webserver im Projektordner (z.B. `python3 -m http.server 8765`) und Playwright (`require('playwright')`).
// Aufruf: BASE=http://localhost:8765 node tests/tourguide/mobile.test.js   – Ausgabe: ✓ bestanden / ✗ nicht bestanden
const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch();
const ctx=await b.newContext({timezoneId:'Europe/Zurich',locale:'de-CH'});
const pg=await ctx.newPage();
const errs=[];pg.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await pg.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await pg.goto((process.env.BASE||'http://localhost:8765')+'/index.html');await pg.waitForTimeout(1500);
const res=await pg.evaluate(async()=>{
  hideLoginModal();document.body.classList.add('admin-mode');
  const R=[];const ok=(n,c,info)=>R.push([n,!!c,info===undefined?'':info]);
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  mobAutoRouteSoon=()=>{};
  const HOME={lat:47.05,lng:8.30};
  getHomeCoords=async()=>HOME;
  let nid=500;
  const site=(o)=>Object.assign({id:nid++,name:'S'+nid,addr:'Strasse '+nid,dept:'T',rhythm:28,type:'baustelle',active:true,paused:false,auditHistory:[],lat:47.05,lng:8.30,lastPersonalKW:1,lastPersonalCount:5},o);
  const setupDay=(sites,planExtra=[],day=today())=>{
    currentUser='Tester';data=sites;plans=sites.map((s,i)=>Object.assign({id:i+1,bsId:s.id,date:day,auditor:'Tester'},planExtra[i]||{}));
    beratPlan=[];personAudits=[];rapporte=[];_mobDate=day;_mobRoute=null;_mobFirstPin={};_mobAutoTried='';_mobGPSPos=null;_mobGPSTime=0;window._orsKey='';
    for(const k of Object.keys(_orsMatrixCache))delete _orsMatrixCache[k];_orsRetryAfter=0;
  };
  const mins=(m)=>m*60;
  // ---------- T8: Fixtermine in der Reihenfolge ----------
  {// Knoten: 0 Start, 1=A (fix 09:00, nah), 2=B (fix 08:00, weiter weg)
   const D=[[0,mins(10),mins(20)],[mins(10),0,mins(15)],[mins(20),mins(15),0]];
   const stops=[{time:9*60+30,dur:30,type:'P',key:'A'},{time:8*60,dur:30,type:'P',key:'B'}];
   const r=solveMobTimedRoute(D,0,[1,2],null,stops,'2030-01-01',null);
   ok('T8 Handy: B fix 08:00 vor A fix 09:00 obwohl A näher',JSON.stringify(r.order)==='[2,1]'&&r.late<0.5,JSON.stringify(r));
   const D2=[[0,mins(30),mins(30)],[mins(30),0,mins(30)],[mins(30),mins(30),0]];
   const st2=[{time:9*60,dur:30,type:'P',key:'A'},{time:9*60,dur:30,type:'P',key:'B'}];
   const r2=solveMobTimedRoute(D2,0,[1,2],null,st2,'2030-01-01',null);
   ok('T8b unvermeidliche Verspätung wird ausgewiesen',r2.late>=29,JSON.stringify(r2));
   // Pin: fester erster Stopp
   const r3=solveMobTimedRoute(D,0,[1,2],null,stops,'2030-01-01',1);
   ok('T8c fest gewählter erster Stopp bleibt vorne',r3.order[0]===1);
   // grosse Tage: Heuristik liefert gültige Permutation
   const n=11,Dn=Array.from({length:n+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===j?0:mins(5+((i*7+j*3)%20))));
   const stn=Array.from({length:n},(_,i)=>({time:i===3?13*60:null,dur:30,type:'P',key:'k'+i}));
   const rn=solveMobTimedRoute(Dn,0,Array.from({length:n},(_,i)=>i+1),n,stn,'2030-01-01',null);
   ok('T8d 11 Stopps (Heuristik): gültige Reihenfolge, nicht als exakt gekennzeichnet',rn.order.length===n&&new Set(rn.order).size===n&&rn.exact===false);}
  // ---------- T22: ohne Fixtermine = minimale Fahrzeit (6 Stopps) ----------
  {const sites=Array.from({length:6},(_,i)=>site({name:'W'+i,lat:47.05+((i*37)%11)*0.01,lng:8.30+((i*53)%13)*0.01}));
   setupDay(sites);await computeMobRoute({silent:true});
   const stops=mobCurrentDayStops();const pts=[HOME,...stops,HOME];const {D}=await getDurationMatrix(pts);
   const perm=a=>a.length<2?[a]:a.flatMap((x,i)=>perm(a.slice(0,i).concat(a.slice(i+1))).map(p=>[x,...p]));
   let best=1e18;perm([1,2,3,4,5,6]).forEach(p=>{let c=0,cur=0;p.forEach(j=>{c+=D[cur][j];cur=j;});c+=D[cur][7];if(c<best)best=c;});
   ok('T22 6 Stopps ohne Fixtermine: minimale Fahrzeit wie bisher',_mobRoute&&Math.abs(_mobRoute.total-best)<1,(_mobRoute&&_mobRoute.total)+' vs '+best);
   ok('T22b nicht als zeitgebunden gekennzeichnet',_mobRoute&&_mobRoute.timed===false);}
  // ---------- T10: genau ein Stopp, GPS ----------
  {setupDay([site({name:'Einzel',lat:47.2,lng:8.4})]);_mobGPSPos={lat:47.0,lng:8.2};_mobGPSTime=Date.now();
   await computeMobRoute({silent:true});
   ok('T10 ein Stopp mit GPS wird berechnet',_mobRoute&&_mobRoute.keys.length===1&&_mobRoute.startKind==='gps'&&_mobRoute.legs[0]>0,JSON.stringify(_mobRoute&&{k:_mobRoute.keys,kind:_mobRoute.startKind}));
   // über mobAutoRoute (früher: stops.length<2 -> return)
   _mobRoute=null;_mobAutoTried='';mobAutoRoute();await sleep(80);
   ok('T10b automatische Route auch für genau einen Stopp',_mobRoute&&_mobRoute.keys.length===1);}
  // ---------- T11/T12: Gültigkeit ----------
  {const s1=site({name:'V1',lat:47.1,lng:8.3}),s2=site({name:'V2',lat:47.2,lng:8.4});setupDay([s1,s2]);await computeMobRoute({silent:true});
   ok('Route gültig direkt nach Berechnung',mobRouteValid(mobCurrentDayStops()));
   s1.lat=47.11;ok('T11 geänderte Koordinate -> Route ungültig',!mobRouteValid(mobCurrentDayStops()));s1.lat=47.1;
   plans[0].time='10:30';ok('T12 geänderte Fixuhrzeit -> Route ungültig',!mobRouteValid(mobCurrentDayStops()));plans[0].time=undefined;delete plans[0].time;
   ok('wieder gültig nach Rücknahme',mobRouteValid(mobCurrentDayStops()));
   data=[s1];plans=[plans[0]];ok('Stoppmenge geändert -> ungültig',!mobRouteValid(mobCurrentDayStops()));
   data=[s1,s2];plans=[{id:1,bsId:s1.id,date:today(),auditor:'Tester'},{id:2,bsId:s2.id,date:today(),auditor:'Tester'}];
   s2.zeitbedarf=120;ok('Aufenthaltsdauer geändert -> ungültig',!mobRouteValid(mobCurrentDayStops()));}
  // ---------- T9: sieben Stopps, Heim: 3 Etappen ----------
  {const sites=Array.from({length:7},(_,i)=>site({name:'E'+(i+1),lat:47.05+0.02*i,lng:8.30+0.015*i}));
   setupDay(sites);await computeMobRoute({silent:true});
   const urls=[];const wo=window.open;window.open=u=>{urls.push(u);return null;};
   const ch=mobMapsChunks(_mobRoute);
   for(let i=0;i<ch.length;i++)mobOpenTourMaps(i);window.open=wo;
   const U=urls.map(u=>new URL(u));
   const wp=U.map(u=>(u.searchParams.get('waypoints')||'').split('|').filter(Boolean).length);
   const homeStr=HOME.lat+','+HOME.lng;
   ok('T9 sieben Stopps -> 3 Etappen',ch.length===3&&urls.length===3,String(ch.length));
   ok('T9b je Link höchstens 3 Zwischenziele',wp.every(n=>n<=3),JSON.stringify(wp));
   ok('T9c letzter Link endet bei der Startadresse',U[2].searchParams.get('destination')===homeStr,U[2].searchParams.get('destination'));
   const c=k=>_mobRoute.coords[k].lat+','+_mobRoute.coords[k].lng;
   ok('T9d Etappen schliessen aneinander an (origin = letztes Ziel davor)',U[1].searchParams.get('origin')===U[0].searchParams.get('destination')&&U[2].searchParams.get('origin')===U[1].searchParams.get('destination'));
   const order=[];U.forEach(u=>{(u.searchParams.get('waypoints')||'').split('|').filter(Boolean).forEach(x=>order.push(x));const d=u.searchParams.get('destination');if(d!==homeStr)order.push(d);});
   ok('T9e Reihenfolge der Links = berechnete Reihenfolge',JSON.stringify(order)===JSON.stringify(_mobRoute.keys.map(c)),JSON.stringify(order).slice(0,80));
   ok('T9f api=1, Koordinaten, travelmode',U.every(u=>u.searchParams.get('api')==='1'&&u.searchParams.get('travelmode')==='driving'&&/^-?\d+\.\d+,-?\d+\.\d+$/.test(u.searchParams.get('destination'))));
   ok('T9g Start der 1. Etappe: Startadresse (kein GPS)',U[0].searchParams.get('origin')===homeStr&&!U[0].searchParams.get('dir_action'));
   _mobGPSPos={lat:47.0,lng:8.2};_mobGPSTime=Date.now();await computeMobRoute({silent:true});
   const urls2=[];window.open=u=>{urls2.push(u);return null;};mobOpenTourMaps(0);window.open=wo;
   const u0=new URL(urls2[0]);ok('T9h mit GPS: kein origin (aktueller Standort), Navigation startet',!u0.searchParams.get('origin')&&u0.searchParams.get('dir_action')==='navigate');
   // Einzelziel
   const u3=[];window.open=u=>{u3.push(u);return null;};mobOpenMaps(sites[0].addr,sites[0].name);window.open=wo;const uu=new URL(u3[0]);
   ok('T9i Einzelziel: kein erzwungener Start, Koordinaten als Ziel',!uu.searchParams.get('origin')&&/^47\.\d+,8\.\d+$/.test(uu.searchParams.get('destination')),u3[0]);
   mobOpenMaps('',''); ok('Einzelziel ohne Adresse -> keine Navigation',u3.length===1);}
  // ---------- T20: HTML-Injektion ----------
  {const evil='Baustelle <img src=x onerror=window.__pwn=1> & "X"';const s1=site({name:evil,lat:47.1,lng:8.3}),s2=site({name:'ok',lat:47.15,lng:8.35});setupDay([s1,s2]);await computeMobRoute({silent:true});
   const div=document.createElement('div');div.innerHTML=mobRouteBannerHTML(mobCurrentDayStops());document.body.appendChild(div);
   ok('T20 Stoppname mit HTML: keine fremden Elemente, nur Text',!div.querySelector('img')&&div.innerText.includes('<img src=x')&&!window.__pwn,div.querySelectorAll('img').length);
   const opt=[...div.querySelectorAll('option')].map(o=>o.textContent);ok('T20b Dropdown zeigt Name als Text',opt.some(t=>t.includes('Baustelle <img')));div.remove();}
  // ---------- ORS-Matrix ----------
  const realFetch=window.fetch;let calls=0;const pts=(n,off=0)=>Array.from({length:n},(_,i)=>({lat:47.0+i*0.01+off,lng:8.3+i*0.01}));
  const mockFetch=(impl)=>{window.fetch=async(u,o)=>{if(String(u).includes('openrouteservice')){calls++;return impl(u,o);}return realFetch(u,o);};};
  const okMatrix=n=>({ok:true,status:200,headers:new Headers(),json:async()=>({durations:Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:100+i+j))})});
  const reset=()=>{calls=0;for(const k of Object.keys(_orsMatrixCache))delete _orsMatrixCache[k];_orsRetryAfter=0;window._orsKey='testkey';};
  {reset();mockFetch(async()=>({ok:true,status:200,headers:new Headers(),json:async()=>({durations:[[0,null],[5,0]]})}));
   const r=await getDurationMatrix(pts(2));ok('T13 null in Matrix -> Luftlinie, keine NaN',r.src==='air'&&r.why==='invalid'&&r.D.flat().every(Number.isFinite));
   reset();mockFetch(async()=>({ok:true,status:200,headers:new Headers(),json:async()=>({durations:[[0,'x'],[5,0]]})}));
   const r2=await getDurationMatrix(pts(2));ok('T13b Text/NaN statt Zahl -> ungültig',r2.src==='air'&&r2.why==='invalid');
   reset();mockFetch(async()=>({ok:true,status:200,headers:new Headers(),json:async()=>({durations:[[0,1,2],[5,0]]})}));
   const r3=await getDurationMatrix(pts(2));ok('T13c falsche Zeilenlänge -> ungültig',r3.src==='air'&&r3.why==='invalid');
   reset();mockFetch(async()=>({ok:true,status:200,headers:new Headers(),json:async()=>({durations:[[0,-5],[5,0]]})}));
   const r4=await getDurationMatrix(pts(2));ok('T13d negative Zeit -> ungültig',r4.src==='air');
   reset();mockFetch(async()=>okMatrix(3));const r5=await getDurationMatrix(pts(3));ok('gültige Matrix wird übernommen',r5.src==='ors'&&r5.D[0][1]===101);}
  {reset();mockFetch(async()=>okMatrix(60));const r=await getDurationMatrix(pts(60));ok('T14 60 Punkte (3600 Paare): keine Anfrage, Schätzung mit Grund',calls===0&&r.src==='air'&&r.why==='size');
   reset();mockFetch(async()=>okMatrix(59));const r2=await getDurationMatrix(pts(59));ok('T14b 59 Punkte (3481 Paare) werden angefragt',calls===1&&r2.src==='ors');}
  {reset();mockFetch(async()=>{await sleep(50);return okMatrix(4);});const [a,b2]=await Promise.all([getDurationMatrix(pts(4)),getDurationMatrix(pts(4))]);
   ok('T15 zwei gleichzeitige gleiche Anfragen -> ein Netzaufruf',calls===1&&a.src==='ors'&&b2.src==='ors'&&a.D===b2.D,'calls='+calls);}
  {reset();mockFetch(async()=>okMatrix(4));await getDurationMatrix(pts(4));const base=pts(4);base[0]={lat:base[0].lat+0.00003,lng:base[0].lng+0.00002};await getDurationMatrix(base);
   ok('T16 GPS verschiebt sich wenige Meter -> Cache wird wiederverwendet',calls===1,'calls='+calls);
   const far=pts(4);far[0]={lat:far[0].lat+0.01,lng:far[0].lng};await getDurationMatrix(far);ok('T16b grosse Verschiebung -> neue Abfrage',calls===2);}
  {reset();mockFetch(async()=>({ok:false,status:429,headers:new Headers(),json:async()=>({})}));const r=await getDurationMatrix(pts(3));
   ok('T17 HTTP 429 -> Schätzung mit Grund «limit»',r.src==='air'&&r.why==='limit'&&calls===1);
   const r2=await getDurationMatrix(pts(3,0.5));ok('T17b danach Rückfragepause: keine weitere Anfrage, keine Schleife',calls===1&&r2.src==='air'&&r2.why==='limit','calls='+calls);}
  {reset();mockFetch(async()=>{throw new TypeError('Failed to fetch');});const r=await getDurationMatrix(pts(3));ok('offline: Schätzung «nicht erreichbar»',r.src==='air'&&r.why==='error'&&mobWhyText(r.why).includes('nicht erreichbar'));}
  {reset();window._orsKey='';const r=await getDurationMatrix(pts(3));ok('ohne Schlüssel: Luftlinie mit Hinweis',r.src==='air'&&r.why==='nokey');}
  {let threw=false;try{await getDurationMatrix([{lat:47,lng:8},{lat:NaN,lng:8}]);}catch(e){threw=true;}ok('ungültige Koordinaten werden abgelehnt (Fehler statt NaN-Matrix)',threw);}
  // ---------- T18: Null Stopps, Tageswechsel während der Anfrage ----------
  {reset();setupDay([]);window._orsKey='testkey';await computeMobRoute({silent:true});ok('T18 null Stopps: kein Absturz, keine Route',_mobRoute===null);
   const s1=site({name:'D1',lat:47.1,lng:8.3}),s2=site({name:'D2',lat:47.2,lng:8.4});setupDay([s1,s2]);window._orsKey='testkey';
   let release;const gate=new Promise(r=>release=r);mockFetch(async()=>{await gate;return okMatrix(4);});
   const p=computeMobRoute({silent:true});await sleep(20);_mobDate='2031-05-05';release();await p;
   ok('T18b Tageswechsel während der Abfrage: Ergebnis gehört nicht zum neuen Tag',_mobRoute===null||_mobRoute.date!=='2031-05-05'&&_mobRoute.date===_mobDate,JSON.stringify(_mobRoute&&_mobRoute.date));
   _mobDate=today();}
  window.fetch=realFetch;
  // ---------- erledigt vs. gelöscht ----------
  {const s=[site({name:'Q1',lat:47.1,lng:8.3}),site({name:'Q2',lat:47.2,lng:8.4}),site({name:'Q3',lat:47.3,lng:8.5})];setupDay(s);await computeMobRoute({silent:true});
   const first=_mobRoute.keys[0];const fid=+first.slice(1);const fs_=data.find(e=>e.id===fid);
   // Fall 1: Stopp erledigt (Audit-Eintrag + Plan weg)
   fs_.auditHistory.push({date:today(),kw:1,auditor:'Tester'});plans=plans.filter(p=>p.bsId!==fid);
   _mobAutoTried='';mobAutoRoute();await sleep(80);
   ok('Erledigter Stopp (Audit eingetragen) -> Route startet dort',_mobRoute&&_mobRoute.startKind==='stop'&&Math.abs(_mobRoute.start.lat-fs_.lat)<1e-6,JSON.stringify(_mobRoute&&[_mobRoute.startKind,_mobRoute.fromLabel]));
   // Fall 2: weiterer Stopp GELÖSCHT (kein Beleg) -> Start bleibt der erledigte Stopp (nicht der gelöschte)
   const second=_mobRoute.keys[0];const sid=+second.slice(1);const sd=data.find(e=>e.id===sid);plans=plans.filter(p=>p.bsId!==sid);
   _mobAutoTried='';mobAutoRoute();await sleep(80);
   ok('Gelöschter/abgesagter Stopp wird NICHT als besucht unterstellt',_mobRoute&&Math.abs(_mobRoute.start.lat-fs_.lat)<1e-6&&Math.abs(_mobRoute.start.lat-sd.lat)>1e-6);}
  {const s=[site({name:'G1',lat:47.1,lng:8.3}),site({name:'G2',lat:47.2,lng:8.4})];setupDay(s);await computeMobRoute({silent:true});
   const k0=_mobRoute.keys[0],d0=data.find(e=>e.id===+k0.slice(1));plans=plans.filter(p=>p.bsId!==d0.id);
   _mobAutoTried='';mobAutoRoute();await sleep(80);
   ok('Ohne Beleg (nur Plan gelöscht) -> Start Startadresse, nicht gelöschter Stopp',_mobRoute&&_mobRoute.startKind==='home');}
  // ---------- GPS-Frische ----------
  {setupDay([site({name:'F1',lat:47.1,lng:8.3}),site({name:'F2',lat:47.2,lng:8.4})]);_mobGPSPos={lat:47.0,lng:8.2};_mobGPSTime=Date.now()-16*60000;
   _mobAutoTried='';mobAutoRoute();await sleep(80);
   ok('Alter GPS-Standort (>15 min) wird nicht als aktueller ausgegeben',_mobRoute&&_mobRoute.startKind==='home'&&_mobGPSPos===null);
   // frisches GPS nach Heimstart -> Route wird neu gerechnet
   _mobGPSPos={lat:47.0,lng:8.2};_mobGPSTime=Date.now();_mobAutoTried='';mobAutoRoute();await sleep(80);
   ok('Frischer GPS-Standort ersetzt Heimstart automatisch',_mobRoute&&_mobRoute.startKind==='gps');}
  // ---------- Zeitgebundene Stopps in der Handy-Route ----------
  {const sA=site({name:'Nah A',lat:47.06,lng:8.31}),sB=site({name:'Fern B',lat:47.30,lng:8.60});setupDay([sA,sB],[{time:'09:30'},{time:'08:00'}],'2031-03-04');
   await computeMobRoute({silent:true});
   ok('Handy: Stopp mit Fixzeit 08:00 vor Stopp mit 09:00 (nicht nur nach Fahrzeit)',_mobRoute&&_mobRoute.timed===true&&_mobRoute.keys[0]==='P'+sB.id,JSON.stringify(_mobRoute&&_mobRoute.keys));
   // fixVisit-Zeit zählt ebenfalls
   const sC=site({name:'FV',lat:47.1,lng:8.3,fixVisit:{days:[],time:'07:30'}}),sD=site({name:'Fr',lat:47.2,lng:8.4});setupDay([sD,sC]);await computeMobRoute({silent:true});
   const st=mobCurrentDayStops().find(s=>s.name==='FV');ok('fixVisit-Uhrzeit wird übernommen',st&&st.time===450);}
  return R;
});
for(const r of res)console.log((r[1]?'✓ ':'✗ ')+r[0]+(r[2]?'  '+r[2]:''));
console.log('Seitenfehler:',errs);
await b.close();})();
