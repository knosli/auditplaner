// Browser-Test (optional, nicht Teil der App): Tourguide-Zeitrechnung (tgSim: T2–T4, T6, T19, T21) und isoMonday
// Voraussetzung: lokaler Webserver im Projektordner (z.B. `python3 -m http.server 8765`) und Playwright (`require('playwright')`).
// Aufruf: BASE=http://localhost:8765 node tests/tourguide/sim.test.js   – Ausgabe: ✓ bestanden / ✗ nicht bestanden
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
  mobAutoRouteSoon=()=>{};
  // ---------- tgSim ----------
  // Knoten 0 = Start/Heim. D in Sekunden. mins(a)=Minuten -> Sekunden
  const mk=(n,fill)=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:fill(i,j)*60));
  const calc=(D,dur,fixT,extra={})=>{_tgCalc={D,dur:new Map(dur),fixT:new Map(fixT||[]),loc:new Map(extra.loc||[]),persN:new Map(extra.persN||[]),cache:new Map(),days:[{ds:'2026-11-17',events:extra.events||[]}]};return _tgCalc;};
  const bs=node=>({t:'bs',node}),ev=(o)=>({t:'ev',ev:Object.assign({node:null,dur:60,time:null},o)});
  // T2: Audit endet 11:40, 60 min Fahrt, Rapport fix 12:40
  {const D=mk(3,(i,j)=>(i&&j&&i!==j)?60:(i+j===1?0:60));D[0][1]=0;D[1][0]=0;
   // Start 7:00 bei Knoten 1 (Fahrzeit 0) -> Audit 1 hat 'Dauer' bis 11:40; Rapport = Knoten 2, 60 min entfernt
   calc(D,[[1,4*60+40]],[]);
   const e2={t:'ev',ev:{node:2,dur:60,time:12*60+40}};
   const r=tgSim([bs(1),e2]);
   ok('T2 Fixtermin pünktlich trotz Mittag',r.sched[1].late<0.5&&Math.abs(r.sched[1].start-(12*60+40))<0.6,JSON.stringify({start:r.sched[1].start,late:r.sched[1].late,lc:r.lunchConflict}));
   ok('T2b Pausenkonflikt sichtbar',r.lunchConflict===true);}
  // T3: Fixes Baustellen-Audit 12:00, 30 min, Mittag 12:00-13:00
  {const D=mk(2,()=>10);calc(D,[[1,30]],[[1,12*60]]);const r=tgSim([bs(1)]);
   ok('T3 Baustellen-Fixaudit 12:00 nicht im Mittag',r.sched[0].start>=13*60-0.01&&Math.abs(r.sched[0].late-60)<0.6,JSON.stringify({start:r.sched[0].start,late:r.sched[0].late}));}
  // T4: Fixes Baustellen-Audit 09:00, Znüni 09:00-09:15
  {const D=mk(2,()=>10);calc(D,[[1,30]],[[1,9*60]]);const r=tgSim([bs(1)]);
   ok('T4 Baustellen-Fixaudit 09:00 nicht im Znüni',Math.abs(r.sched[0].start-(9*60+15))<0.6&&Math.abs(r.sched[0].late-15)<0.6,JSON.stringify({start:r.sched[0].start,late:r.sched[0].late}));}
  // T4b: Rapport (Termin) darf im Znüni/Mittag liegen
  {const D=mk(2,()=>10);const e=ev({node:1,time:12*60+10,dur:30});calc(D,[],[]);const r=tgSim([e]);
   ok('T4b Rapport mit Uhrzeit darf im Mittag liegen',Math.abs(r.sched[0].start-(12*60+10))<0.6&&r.sched[0].late<0.5);}
  // T6: zwei Termine 09:00 an 30 Fahrminuten getrennten Orten
  {const D=mk(3,(i,j)=>(i&&j)?30:20);calc(D,[],[]);const a=ev({node:1,time:9*60,dur:30}),c=ev({node:2,time:9*60,dur:30});const r=tgSim([a,c]);
   ok('T6 gleichzeitige Termine -> Verspätung ausgewiesen',r.late>=29,String(r.late));}
  // T21: gleicher Ort, 2 + 3 Personen: gemeinsamer Rundgang
  {const D=mk(3,(i,j)=>(i&&j)?0:10);calc(D,[[1,30],[2,45]],[],{loc:[[1,'X'],[2,'X']],persN:[[1,2],[2,3]]});
   const r=tgSim([bs(1),bs(2)]);const total=r.sched[1].end-r.sched[0].start;
   ok('T21 gemeinsamer Rundgang: Dauer nach Gesamtpersonal, Nachbearbeitung 2x',r.sched[1].joint===true&&Math.abs(total-tgMinForCount(5))<0.6&&Math.abs(r.post-2*S('tg_post_min'))<0.01,JSON.stringify({total,joint:r.sched[1].joint,post:r.post}));}
  // Kein Fixtermin: Verhalten wie vorher – Pause vor Fahrt in den Mittag
  {const D=mk(3,(i,j)=>(i&&j)?40:0);calc(D,[[1,11*60-7*60+10],[2,30]],[]);const r=tgSim([bs(1),bs(2)]);
   ok('Regression: freie Stopps nie im Baustellen-Mittag',!(r.sched[1].start<13*60&&r.sched[1].end>12*60),JSON.stringify(r.sched.map(s=>[s.start,s.end])));}
  // ---------- isoMonday ----------
  {const d=isoMonday(14,2026);ok('T19 isoMonday KW14/2026 = Mo 30.03. 00:00',d.getFullYear()===2026&&d.getMonth()===2&&d.getDate()===30&&d.getHours()===0&&d.getMinutes()===0,d.toString());
   let allMon=true;for(const [kw,yr] of [[1,2026],[1,2027],[52,2026],[53,2026],[10,2026],[44,2026],[45,2026],[1,2025]]){const x=isoMonday(kw,yr);if(x.getDay()!==1||x.getHours()!==0)allMon=false;}
   ok('T19b isoMonday immer Montag 00:00 (auch über Sommer-/Winterzeit)',allMon);
   ok('T19c Jahreswechsel: KW1/2027 = 04.01.2027',isoMonday(1,2027).getDate()===4&&isoMonday(1,2027).getMonth()===0);}
  return R;
});
for(const r of res)console.log((r[1]?'✓ ':'✗ ')+r[0]+(r[2]?'  '+r[2]:''));
console.log('Seitenfehler:',errs);
await b.close();})();
