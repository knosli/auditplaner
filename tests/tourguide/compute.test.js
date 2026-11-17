// Browser-Test (optional, nicht Teil der App): Tourguide-Auswahl (tgCompute: T1, T5, Kandidatenlimit, Stabilität, Zufallsszenarien)
// Voraussetzung: lokaler Webserver im Projektordner (z.B. `python3 -m http.server 8765`) und Playwright (`require('playwright')`).
// Aufruf: BASE=http://localhost:8765 node tests/tourguide/compute.test.js   – Ausgabe: ✓ bestanden / ✗ nicht bestanden
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
  // ---- Szenario-Aufbau ----
  const kw=dateToKW(today()),KWN=kwNum(kw),KWY=kwYear(kw);
  const dayDS=n=>rpAddDays(kwToDate(kw),n);
  const ago=n=>{const d=parseDate(today());d.setDate(d.getDate()-n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
  let nextId=1000;
  const site=(o)=>Object.assign({id:nextId++,name:'S'+nextId,psp:String(4000000+nextId),addr:'x',dept:'Testabteilung',rhythm:28,type:'baustelle',active:true,paused:false,auditHistory:[],lastAudit:ago(70),
    lastPersonalKW:KWN,lastPersonalCount:o.pers||5,personalHistory:[{kw:KWN,year:KWY,count:o.pers||5}]},o);
  const setup=(sites,{days=[0],settings={}}={})=>{
    data=sites;plans=[];rapporte=[];personAudits=[];beratPlan=[];currentUser='';
    auditors=['Tester'];auditorMeta={Tester:{homeLat:47.05,homeLng:8.30}};
    deptMeta._settings=Object.assign({},settings);
    const sel=document.getElementById('tg-aud');sel.innerHTML='<option>Tester</option>';sel.value='Tester';
    document.getElementById('tg-kw').innerHTML='<option value="'+kw+'">KW</option>';document.getElementById('tg-kw').value=String(kw);
    document.getElementById('tg-days').innerHTML=days.map(d=>'<input type="checkbox" value="'+d+'" checked>').join('');
    _tg=null;
  };
  const sets=()=>_tg.sets.map(s=>s.slice().sort((a,b)=>a-b).map(n=>_tg.nodeEntry.get(n).name));
  // ---- T1: gleichwertiger Umweg, A klein / B gross, nur 1 Platz am Tag ----
  for(const order of [0,1]){
    const A=site({name:'A klein',pers:2,lat:47.05+0.05,lng:8.30}),B=site({name:'B gross',pers:25,lat:47.05-0.05,lng:8.30});
    setup(order?[B,A]:[A,B],{settings:{tg_max_per_day:1,tg_size_bonus:0,tg_harvest_min:0,tg_post_min:0}});
    await tgCompute();
    ok('T1 Priorität gross vor klein (Reihenfolge '+order+')',_tg&&JSON.stringify(sets())===JSON.stringify([['B gross']]),JSON.stringify(_tg&&sets()));
  }
  // ---- T1b: Präferenz und Fälligkeit bei Gleichstand ----
  {const A=site({name:'A',pers:5,lat:47.10,lng:8.30,lastAudit:ago(40)}),B=site({name:'B',pers:5,lat:47.00,lng:8.30,lastAudit:ago(90)});
   setup([A,B],{settings:{tg_max_per_day:1,tg_size_bonus:0,tg_harvest_min:0,tg_post_min:0}});await tgCompute();
   ok('T1b längster überfällig gewinnt bei Gleichstand',_tg&&JSON.stringify(sets())===JSON.stringify([['B']]),JSON.stringify(sets()));}
  // ---- T5: geplante Baustelle ohne Kartenpunkt ----
  {const P=site({name:'Ohne Koordinaten',lat:null,lng:null});setup([P,site({name:'Z',lat:47.1,lng:8.3})]);
   plans=[{id:1,bsId:P.id,date:dayDS(0),auditor:'Tester',kw}];
   await tgCompute();
   ok('T5 geplanter Audit ohne Koordinaten -> klare Meldung, keine Rechnung',_tg===null&&/nicht berechnet/.test(document.getElementById('tg-result').innerText)&&/Ohne Koordinaten/.test(document.getElementById('tg-result').innerText),document.getElementById('tg-result').innerText.slice(0,160));}
  // ---- gelöschte Baustelle in Planung: wird gemeldet, nicht blockiert ----
  {setup([site({name:'N1',lat:47.1,lng:8.3})]);plans=[{id:2,bsId:99999,date:dayDS(0),auditor:'Tester',kw}];await tgCompute();
   ok('Verwaiste Planung blockiert nicht, wird gemeldet',_tg&&(_tg.orphans||[]).length===1&&/gelöschte Baustelle/.test(document.getElementById('tg-result').innerText));}
  // ---- Termin mit Ort ohne Kartenpunkt blockiert; reiner Zeittermin nicht ----
  {setup([site({name:'N2',lat:47.1,lng:8.3})]);rapporte=[{id:5,date:dayDS(0),auditor:'Tester',type:'Sitzung',addr:'Nirgendwo 1',time:'10:00',dur:60}];await tgCompute();
   ok('Rapport mit Adresse ohne Kartenpunkt -> keine Berechnung',_tg===null&&/Termin\(e\) mit Ortsangabe/.test(document.getElementById('tg-result').innerText),document.getElementById('tg-result').innerText.slice(0,120));
   setup([site({name:'N3',lat:47.1,lng:8.3})]);rapporte=[{id:6,date:dayDS(0),auditor:'Tester',type:'Sitzung',ort:'Luzern',time:'10:00',dur:60}];await tgCompute();
   ok('Rapport nur mit Ort-Bezeichnung (ohne Adresse) -> rechnet als reiner Zeittermin',_tg!==null);}
  // ---- Kandidaten-Limit: 70 Baustellen -> max. 59 Punkte, Hinweis sichtbar ----
  {const many=Array.from({length:70},(_,i)=>site({name:'M'+i,pers:5,lat:47.05+0.01*(i%10),lng:8.30+0.01*Math.floor(i/10)}));
   setup(many,{days:[0,1,2,3,4]});let maxPts=0;const orig=getDurationMatrix;getDurationMatrix=async p=>{maxPts=Math.max(maxPts,p.length);return orig(p);};
   await tgCompute();getDurationMatrix=orig;
   ok('Kandidatenlimit: höchstens 59 Punkte, Rest gemeldet',_tg&&maxPts<=59&&(_tg.unprocessed||[]).length>=70-58&&/Nicht vollständig geprüft/.test(document.getElementById('tg-result').innerText),'pts='+maxPts+' unprocessed='+(_tg&&(_tg.unprocessed||[]).length));}
  // ---- Eigenschaftstest: gleiche Eingabe -> gleiches Ergebnis; Tage zulässig ----
  {let seed=12345;const rnd=()=>{seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296;};
   let bad=[],nondet=0,runs=0,t0=Date.now();
   for(let k=0;k<25;k++){
     const n=8+Math.floor(rnd()*14);const days=[0,1,2,3,4].slice(0,2+Math.floor(rnd()*4));
     const sites=Array.from({length:n},(_,i)=>{const s=site({name:'R'+k+'_'+i,pers:[1,3,6,12,25][Math.floor(rnd()*5)],lat:47.05+(rnd()-.5)*0.5,lng:8.3+(rnd()-.5)*0.7,lastAudit:ago(35+Math.floor(rnd()*80))});
       if(rnd()<.25){s.fixVisit={days:[Math.floor(rnd()*5)],time:'10:00'};}return s;});
     setup(sites,{days});
     // einige feste Planungen
     const fixedSite=sites[0];plans=[{id:k+1,bsId:fixedSite.id,date:dayDS(days[0]),auditor:'Tester',kw}];
     await tgCompute();const a=JSON.stringify(_tg&&_tg.sets);
     const evals1=_tg;
     await tgCompute();const b2=JSON.stringify(_tg&&_tg.sets);
     runs++;if(a!==b2)nondet++;
     if(_tg){
       const maxN=S('tg_max_per_day');const seen=new Set();
       _tg.sets.forEach((s,d)=>{if(s.length>maxN)bad.push('maxN k'+k);s.forEach(nd=>{if(seen.has(nd))bad.push('dupl k'+k);seen.add(nd);
         if(!_tg.fixedIds.has(nd)){const u=(_tg.urgOf.get(nd)||[])[d];if(u==null)bad.push('unzulässiger Tag k'+k+' d'+d);}});
         const sim=tgPlanDay(d,s).sim;if(!(sim.total<=S('tg_day_hours')*60+S('tg_day_tol')+0.6+ (sim.total<=0?0:0))&&s.length>0&&s.filter(nd=>!_tg.fixedIds.has(nd)).length>0)bad.push('Tag zu lang k'+k+' d'+d+' '+Math.round(sim.total));});
     }else bad.push('kein Ergebnis k'+k);
   }
   ok('Eigenschaftstest: 25 Zufallsszenarien deterministisch (zweimal gleiches Ergebnis)',nondet===0,'nondet='+nondet+' von '+runs);
   ok('Eigenschaftstest: nur zulässige Tage, keine Doppelten, Tageslänge/maxN eingehalten',bad.length===0,bad.slice(0,6).join('; '));
   ok('Rechenzeit vertretbar',Date.now()-t0<120000,(Date.now()-t0)+' ms für 50 Berechnungen');}
  // ---- ein Tag ohne Stopps / ohne Kandidaten ----
  {setup([],{days:[0,1]});await tgCompute();ok('Tag ohne Kandidaten: kein Absturz',_tg&&_tg.sets.every(s=>s.length===0));}
  return R;
});
for(const r of res)console.log((r[1]?'✓ ':'✗ ')+r[0]+(r[2]?'  '+r[2]:''));
console.log('Seitenfehler:',errs);
await b.close();})();
