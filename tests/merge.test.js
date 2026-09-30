// Tests für js/merge.js – ausführen mit: node tests/merge.test.js
const assert=require('assert');
const {mgMerge,mgMergeAll,mgDescribe,mgSafe}=require('../js/merge.js');

let n=0;
function t(name,fn){fn();n++;console.log('✓ '+name);}

const bs=(id,extra)=>({id,name:'BS'+id,active:true,paused:false,auditHistory:[],...extra});

t('nur lokal geändert → lokal',()=>{
  const b=[bs(1)],l=[bs(1,{note:'x'})];
  assert.deepStrictEqual(mgMerge(b,l,b),l);
});

t('nur remote geändert → remote',()=>{
  const b=[bs(1)],r=[bs(1,{note:'y'})];
  assert.deepStrictEqual(mgMerge(b,b,r),r);
});

t('beide fügen verschiedene Baustellen hinzu → beide bleiben',()=>{
  const b=[bs(1)],l=[bs(1),bs(2)],r=[bs(1),bs(3)];
  assert.deepStrictEqual(mgMerge(b,l,r).map(x=>x.id).sort(),[1,2,3]);
});

t('Anna plant, Ben erfasst Ferien (verschiedene Felder) → nichts geht verloren',()=>{
  const base={plans:[{id:1,bsId:1,date:'2026-10-01'}],ferien:[]};
  const anna={plans:[...base.plans,{id:2,bsId:5,date:'2026-10-02'}],ferien:[]};
  const ben={plans:base.plans,ferien:[{id:9,auditor:'Ben',von:'2026-10-05',bis:'2026-10-09'}]};
  const m=mgMergeAll(base,ben,anna);
  assert.strictEqual(m.plans.length,2);
  assert.strictEqual(m.ferien.length,1);
});

t('gleiche Baustelle, verschiedene Felder → beide Änderungen',()=>{
  const b=[bs(1)],l=[bs(1,{note:'Notiz'})],r=[bs(1,{paused:true})];
  const m=mgMerge(b,l,r)[0];
  assert.strictEqual(m.note,'Notiz');
  assert.strictEqual(m.paused,true);
});

t('gleiches Feld von beiden geändert → eigene Änderung gewinnt',()=>{
  const b=[bs(1,{note:'a'})],l=[bs(1,{note:'lokal'})],r=[bs(1,{note:'remote'})];
  assert.strictEqual(mgMerge(b,l,r)[0].note,'lokal');
});

t('lokal gelöscht, remote unverändert → gelöscht',()=>{
  const b=[bs(1),bs(2)],l=[bs(1)];
  assert.deepStrictEqual(mgMerge(b,l,b).map(x=>x.id),[1]);
});

t('lokal gelöscht, remote gleichzeitig geändert → Änderung bleibt erhalten',()=>{
  const b=[bs(1),bs(2)],l=[bs(1)],r=[bs(1),bs(2,{note:'wichtig'})];
  const m=mgMerge(b,l,r);
  assert.deepStrictEqual(m.map(x=>x.id),[1,2]);
  assert.strictEqual(m[1].note,'wichtig');
});

t('remote gelöscht, lokal andere Baustelle geändert → gelöscht bleibt gelöscht',()=>{
  const b=[bs(1),bs(2)],l=[bs(1,{note:'x'}),bs(2)],r=[bs(1)];
  const m=mgMerge(b,l,r);
  assert.deepStrictEqual(m.map(x=>x.id),[1]);
  assert.strictEqual(m[0].note,'x');
});

t('Audit-Verlauf (Liste ohne ids): beide ergänzen → beide Einträge',()=>{
  const h0=[{date:'2026-01-01',auditor:'A'}];
  const b=[bs(1,{auditHistory:h0})];
  const l=[bs(1,{auditHistory:[...h0,{date:'2026-09-01',auditor:'A'}]})];
  const r=[bs(1,{auditHistory:[...h0,{date:'2026-09-02',auditor:'B'}]})];
  assert.strictEqual(mgMerge(b,l,r)[0].auditHistory.length,3);
});

t('Planungen ohne id: Verschieben lokal + neue Planung remote',()=>{
  const p1={bsId:1,auditor:'A',date:'2026-10-01'};
  const b=[p1],l=[{...p1,date:'2026-10-03'}],r=[p1,{bsId:2,auditor:'B',date:'2026-10-02'}];
  const m=mgMerge(b,l,r);
  assert.strictEqual(m.length,2);
  assert.ok(m.some(x=>x.bsId===1&&x.date==='2026-10-03'));
  assert.ok(!m.some(x=>x.bsId===1&&x.date==='2026-10-01'));
});

t('Auditoren-Namen: beide fügen denselben Namen hinzu → nur einmal',()=>{
  const b=['A'],l=['A','C'],r=['A','C'];
  assert.deepStrictEqual(mgMerge(b,l,r),['A','C']);
  assert.deepStrictEqual(mgMerge(['A','B'],['A','B','C'],['A','D']).sort(),['A','C','D']);
});

t('Objekte (Farben): verschiedene Schlüssel → beide',()=>{
  const m=mgMerge({A:'#1'},{A:'#1',B:'#2'},{A:'#9'});
  assert.deepStrictEqual(m,{A:'#9',B:'#2'});
});

t('ohne Basis (erster Abgleich fehlgeschlagen) → Vereinigung, nichts gelöscht',()=>{
  const m=mgMergeAll(null,{data:[bs(1)]},{data:[bs(2)]});
  assert.deepStrictEqual(m.data.map(x=>x.id).sort(),[1,2]);
});

t('Feld fehlt auf dem Server → lokal bleibt',()=>{
  const m=mgMergeAll({rapporte:[]},{rapporte:[{id:1}]},{});
  assert.deepStrictEqual(m.rapporte,[{id:1}]);
});

t('Undo über Merge: eigene Löschung rückgängig, fremde Änderung bleibt',()=>{
  const before={data:[bs(1),bs(2)]},after={data:[bs(1)]};
  const current={data:[bs(1),bs(3)]}; // inzwischen hat jemand BS3 erfasst
  const m=mgMergeAll(after,before,current);
  assert.deepStrictEqual(m.data.map(x=>x.id).sort(),[1,2,3]);
});

t('Beschreibung der Änderungen',()=>{
  const d=mgDescribe({data:[bs(1),bs(2)],plans:[]},{data:[bs(1,{lastAudit:'2026-09-30'}),bs(3)],plans:[{id:1}]});
  assert.ok(d.includes('Audit erfasst: «BS1» (2026-09-30)'));
  assert.ok(d.includes('Baustelle «BS3» erfasst'));
  assert.ok(d.includes('Baustelle «BS2» gelöscht'));
  assert.ok(d.includes('Planungen: 1 neu/geändert'));
});

t('Schutz vor eingeschleustem Code',()=>{
  const bad={data:[{id:1,name:'<img src=x onerror=alert(1)>',note:`" onmouseover="x`,addr:"');alert(1);('",psp:'&#39;x&lt;'}],
    auditorColors:{'<b>X</b>':'#fff'}};
  const s=JSON.stringify(mgSafe(bad));
  for(const c of ['<','>','\\"x','&#','&lt;',"');"])assert.ok(!JSON.parse(s).data[0].name.includes(c)&&!s.includes('<'),c);
  assert.strictEqual(mgSafe('Müller & Co, Bahnhofstr. 5'),'Müller & Co, Bahnhofstr. 5');
  assert.strictEqual(mgSafe("Hans O'Neill"),'Hans O’Neill');
  assert.strictEqual(mgSafe(42),42);
  assert.deepStrictEqual(Object.keys(mgSafe(bad.auditorColors)),['‹b›X‹/b›']);
  assert.deepStrictEqual(mgSafe(mgSafe(bad)),mgSafe(bad)); // zweimal = einmal
});

console.log(`\n${n} Tests bestanden`);
