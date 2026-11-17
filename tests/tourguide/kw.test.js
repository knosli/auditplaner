// Browser-Test (optional, nicht Teil der App): Kalenderwochen über Sommer-/Winterzeit (isoMonday, piPrevKW) in drei Zeitzonen
// Voraussetzung: lokaler Webserver im Projektordner (z.B. `python3 -m http.server 8765`) und Playwright (`require('playwright')`).
// Aufruf: BASE=http://localhost:8765 node tests/tourguide/kw.test.js   – Ausgabe: ✓ bestanden / ✗ nicht bestanden
const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch();
for(const tz of ['Europe/Zurich','America/New_York','UTC']){
const ctx=await b.newContext({timezoneId:tz,locale:'de-CH'});
const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route(/^https?:\/\/(?!localhost)/,r=>r.abort());
await pg.goto((process.env.BASE||'http://localhost:8765')+'/index.html');await pg.waitForTimeout(1200);
const r=await pg.evaluate(()=>{
  const bad=[];
  const isoWeekOfMonday=(y,kw)=>{ // unabhängig: Montag KW1 = Montag der Woche mit dem 4. Januar (UTC-Rechnung)
    const j4=Date.UTC(y,0,4),wd=(new Date(j4).getUTCDay()+6)%7;return new Date(j4-wd*864e5+(kw-1)*7*864e5);};
  for(let y=2020;y<=2031;y++)for(let kw=1;kw<=52;kw++){
    const m=isoMonday(kw,y),u=isoWeekOfMonday(y,kw);
    if(m.getFullYear()!==u.getUTCFullYear()||m.getMonth()!==u.getUTCMonth()||m.getDate()!==u.getUTCDate()||m.getHours()!==0||m.getDay()!==1)bad.push('isoMonday '+kw+'/'+y);
    const pv=piPrevKW(kw,y),pu=isoWeekOfMonday(y,kw);const prevMon=new Date(pu.getTime()-7*864e5);
    const exp=dateToKW(prevMon.getUTCFullYear()+'-'+String(prevMon.getUTCMonth()+1).padStart(2,'0')+'-'+String(prevMon.getUTCDate()).padStart(2,'0'));
    if(pv.kw!==exp)bad.push('piPrevKW '+kw+'/'+y+' '+pv.kw+'!='+exp);
    if(piKdWeek(kw,y)-piKdWeek(piPrevKW(kw,y).kw,piPrevKW(kw,y).year)!==1)bad.push('piKdWeek '+kw+'/'+y);
  }
  return bad;});
console.log(tz,'Abweichungen:',r.length,r.slice(0,6).join(' | '),errs);
await ctx.close();}
await b.close();})();
