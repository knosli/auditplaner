// ═══ MERGE: Änderungen mehrerer Benutzer zusammenführen ═══
// Reine Funktionen ohne Zugriff auf den App-Zustand (dadurch einzeln testbar, siehe tests/).
//
// Prinzip (3-Wege-Merge): «base» ist der letzte gemeinsame Stand vom Server, «local» der
// eigene Stand, «remote» der aktuelle Server-Stand. Was nur eine Seite geändert hat, wird
// übernommen. Haben beide denselben Datensatz geändert, wird Feld für Feld zusammengeführt;
// nur wenn beide dasselbe Feld geändert haben, gewinnt die eigene (neuere) Änderung.

function mgClone(v){return v===undefined?undefined:JSON.parse(JSON.stringify(v));}
function mgEq(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function mgIsObj(v){return v!==null&&typeof v==='object'&&!Array.isArray(v);}

// Liste von Datensätzen mit eindeutiger id?
function mgHasIds(arr){
  const seen=new Set();
  for(const x of arr){
    if(!mgIsObj(x)||x.id===undefined||x.id===null)return false;
    const k=String(x.id);if(seen.has(k))return false;seen.add(k);
  }
  return true;
}

function mgMerge(base,local,remote){
  if(mgEq(local,base))return remote;
  if(mgEq(remote,base)||mgEq(local,remote))return local;
  if(mgIsObj(local)&&mgIsObj(remote))return mgMergeObj(mgIsObj(base)?base:{},local,remote);
  if(Array.isArray(local)&&Array.isArray(remote)){
    const b=Array.isArray(base)?base:[];
    if(mgHasIds(b)&&mgHasIds(local)&&mgHasIds(remote))return mgMergeById(b,local,remote);
    return mgMergeSet(b,local,remote);
  }
  return local;
}

function mgMergeObj(b,l,r){
  const out={};
  for(const k of new Set([...Object.keys(r),...Object.keys(l)])){
    const inB=k in b,inL=k in l,inR=k in r;
    if(inB&&!inL&&(!inR||mgEq(r[k],b[k])))continue; // lokal gelöscht
    if(inB&&!inR&&(!inL||mgEq(l[k],b[k])))continue; // anderswo gelöscht
    if(!inL){out[k]=r[k];continue;}
    if(!inR){out[k]=l[k];continue;}
    out[k]=mgMerge(b[k],l[k],r[k]);
  }
  return out;
}

function mgMergeById(b,l,r){
  const idx=a=>new Map(a.map(x=>[String(x.id),x]));
  const B=idx(b),L=idx(l),R=idx(r),done=new Set(),out=[];
  for(const x of [...r,...l]){
    const id=String(x.id);if(done.has(id))continue;done.add(id);
    const inB=B.has(id),inL=L.has(id),inR=R.has(id);
    if(inB&&!inL&&(!inR||mgEq(R.get(id),B.get(id))))continue; // lokal gelöscht
    if(inB&&!inR&&(!inL||mgEq(L.get(id),B.get(id))))continue; // anderswo gelöscht
    if(!inL){out.push(R.get(id));continue;}
    if(!inR){out.push(L.get(id));continue;}
    out.push(mgMerge(B.get(id),L.get(id),R.get(id)));
  }
  return out;
}

// Listen ohne ids (z.B. Namen, ältere Planungen): Einträge werden als Ganzes verglichen.
// Hinzufügen und Entfernen beider Seiten wird übernommen; gleiche Ergänzungen nur einmal.
function mgMergeSet(b,l,r){
  const key=x=>JSON.stringify(x);
  const cnt=a=>{const m=new Map();for(const x of a){const k=key(x);m.set(k,(m.get(k)||0)+1);}return m;};
  const B=cnt(b),L=cnt(l),R=cnt(r),F=new Map();
  for(const k of new Set([...B.keys(),...L.keys(),...R.keys()])){
    const bn=B.get(k)||0,dl=(L.get(k)||0)-bn,dr=(R.get(k)||0)-bn;
    F.set(k,dl>0&&dr>0?bn+Math.max(dl,dr):Math.max(0,bn+dl+dr));
  }
  const out=[];
  for(const x of [...r,...l]){const k=key(x),n=F.get(k)||0;if(n>0){out.push(x);F.set(k,n-1);}}
  return out;
}

// Ganzen Zustand (Objekt mit einem Eintrag pro Datenfeld) zusammenführen.
// Felder, die auf dem Server fehlen (undefined), bleiben lokal unverändert.
function mgMergeAll(base,local,remote){
  const out={};
  for(const f of Object.keys(local)){
    if(remote[f]===undefined){out[f]=local[f];continue;}
    out[f]=mgMerge(base?base[f]:undefined,local[f],remote[f]);
  }
  return out;
}

// Lesbare Zusammenfassung, was sich zwischen zwei Ständen geändert hat.
const MG_LABELS={plans:'Planungen',auditors:'Auditoren',ferien:'Ferien',ghostAudits:'Ghost-Audits',
  personAudits:'Personen-Audits',beratPlan:'Beratungs-Planungen',persons:'Personen',auditorMeta:'Auditor-Angaben',
  auditorColors:'Auditor-Farben',piCollectBox:'Sammelbox',auditTarget:'Audit-Ziel',tempWorkers:'Temporäre Mitarbeitende',
  ferienWunsch:'Wunschferien',orsKey:'Routen-Schlüssel',deptMeta:'Abteilungen',rapporte:'Rapporte'};

function mgDescribe(before,after){
  const lines=[];
  if(!before||!after)return lines;
  const b=before.data||[],a=after.data||[];
  if(!mgEq(b,a)){
    const B=new Map(b.map(x=>[String(x.id),x])),A=new Map(a.map(x=>[String(x.id),x]));
    const nm=x=>'«'+(x.name||x.psp||'?')+'»';
    for(const [id,x] of A){
      const o=B.get(id);
      if(!o){lines.push('Baustelle '+nm(x)+' erfasst');continue;}
      if(mgEq(o,x))continue;
      if(o.lastAudit!==x.lastAudit&&x.lastAudit)lines.push('Audit erfasst: '+nm(x)+' ('+x.lastAudit+')');
      else if(!o.paused&&x.paused)lines.push('Baustelle '+nm(x)+' pausiert');
      else if(o.paused&&!x.paused)lines.push('Baustelle '+nm(x)+' reaktiviert');
      else if(o.active!==false&&x.active===false)lines.push('Baustelle '+nm(x)+' deaktiviert');
      else lines.push('Baustelle '+nm(x)+' geändert');
    }
    for(const [id,x] of B)if(!A.has(id))lines.push('Baustelle '+nm(x)+' gelöscht');
  }
  for(const f of Object.keys(MG_LABELS)){
    const x=before[f],y=after[f];
    if(x===undefined||y===undefined||mgEq(x,y))continue;
    if(Array.isArray(x)&&Array.isArray(y)){
      const cx=new Set(x.map(v=>JSON.stringify(v))),cy=new Set(y.map(v=>JSON.stringify(v)));
      let add=0,del=0;cy.forEach(v=>{if(!cx.has(v))add++;});cx.forEach(v=>{if(!cy.has(v))del++;});
      const parts=[];
      if(add&&del&&add===del)parts.push(add+' geändert');
      else{if(add)parts.push(add+' neu/geändert');if(del)parts.push(del+' entfernt');}
      lines.push(MG_LABELS[f]+': '+(parts.join(', ')||'geändert'));
    }else lines.push(MG_LABELS[f]+' geändert');
  }
  return lines;
}

// Schutz vor eingeschleustem HTML/JavaScript (Cross-Site-Scripting): Zeichen, mit denen sich
// in der Anzeige HTML-Tags oder Code bilden liessen, werden durch gleich aussehende, harmlose
// Zeichen ersetzt. Gilt für alle Texte (auch Schlüssel), die aus der Datenbank, aus Dateien
// oder von anderen Benutzern kommen.
const MG_SAFE={'<':'‹','>':'›','"':'”',"'":'’','`':'´','\\':'∖'};
function mgSafe(v){
  if(typeof v==='string')return v.replace(/[<>"'`\\]/g,c=>MG_SAFE[c]).replace(/&(?=#|[a-zA-Z][a-zA-Z0-9]*;)/g,'＆');
  if(Array.isArray(v))return v.map(mgSafe);
  if(mgIsObj(v)){const o={};for(const k in v)o[mgSafe(k)]=mgSafe(v[k]);return o;}
  return v;
}

if(typeof module!=='undefined')module.exports={mgSafe,mgClone,mgEq,mgMerge,mgMergeAll,mgMergeSet,mgMergeById,mgDescribe};
