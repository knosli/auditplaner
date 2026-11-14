// Querschnitt über alle Module für die Konsistenzprüfung (Widersprüche zwischen Modulen,
// Rechtsnatur, kritische Antworten, Quellen, Fachbegriffe). Ergänzt die Exporte je Modul.
// Aufruf: npx vite-node scripts/export-overview.ts
import { writeFileSync, mkdirSync } from 'node:fs';
import { GLOSSARY, LESSONS, MODULES, QUESTIONS, SCENARIOS, SOURCES } from '../src/content';
import { SOURCE_KIND_LABEL } from '../src/content/sources';

const REVIEWED = ['m1', 'm2', 'm3', 'm4', 'm8'];
const out: string[] = [];
const w = (...l: string[]) => out.push(...l);
const clean = (t: string) => t.replace(/\[\[[a-z0-9-]+\|(.+?)\]\]/g, '$1').replace(/\[\[([a-z0-9-]+)\]\]/g, '$1');
const src = (ids: string[]) => ids.map((id) => SOURCES.find((s) => s.id === id)?.short ?? id).join(', ');

w('# UmweltCampus Bau CH – Querschnitt über alle Module', '', `Export für die Konsistenzprüfung, ${new Date().toLocaleDateString('de-CH')}. Prüfstatus aller Inhalte: Entwurf.`, '',
  'Enthält je Lektion die Zusammenfassung, alle Hinweise zur Rechtsnatur (§) und Warnhinweise (!), alle als kritisch markierten Antworten, das vollständige Quellenverzeichnis und alle Fachbegriffe. Die vollständigen Inhalte stehen in den Dateien `modulN-inhalte.md`.', '');

w('## 1. Module und Prüfstand', '', '| Nr. | Modul | Lektionen | Fragen | Fall | Externe KI-Prüfung |', '|---|---|---|---|---|---|');
for (const m of [...MODULES].sort((a, b) => a.no - b.no)) {
  const sc = SCENARIOS.filter((s) => s.moduleId === m.id && s.status === 'verfuegbar').map((s) => s.code).join(', ');
  w(`| ${m.no} | ${m.title} | ${LESSONS.filter((l) => l.moduleId === m.id).length} | ${QUESTIONS.filter((q) => q.moduleId === m.id).length} | ${sc || '–'} | ${REVIEWED.includes(m.id) ? 'geprüft und korrigiert' : 'noch nicht geprüft'} |`);
}
w('');

w('## 2. Kernaussagen je Lektion', '');
for (const m of [...MODULES].sort((a, b) => a.no - b.no)) {
  w(`### Modul ${m.no}: ${m.title}`, '');
  for (const l of LESSONS.filter((x) => x.moduleId === m.id)) {
    w(`#### ${l.id}: ${l.title}`, '');
    for (const st of l.steps) if (st.kind === 'summary') w(...st.points.map((p) => `- ${clean(p)}`));
    const notes: string[] = [];
    for (const st of l.steps) if ('text' in st && typeof st.text === 'string') {
      for (const line of st.text.split('\n')) {
        if (line.startsWith('§> ')) notes.push(`- § ${clean(line.slice(3))}`);
        if (line.startsWith('!> ')) notes.push(`- ! ${clean(line.slice(3))}`);
      }
    }
    if (notes.length) w('', '*Rechtsnatur und Warnhinweise:*', ...notes);
    w('');
  }
}

w('## 3. Als kritisch markierte Antworten', '', 'Kritisch = 0 Punkte und Kennzeichnung als schwerer Fehler (Umweltschaden, Rechtsverstoss, Täuschung).', '');
for (const q of QUESTIONS) for (const o of q.options ?? []) if (o.critical) w(`- **${q.id}** (${o.id}) ${o.text} — ${o.why ?? ''}`);
for (const s of SCENARIOS.filter((x) => x.status === 'verfuegbar')) for (const st of s.stages) {
  for (const o of st.options ?? []) if (o.critical) w(`- **Fall ${s.code} ${st.id}** ${o.text} — ${o.feedback}`);
  for (const r of st.rankEarly ?? []) w(`- **Fall ${s.code} ${st.id}** (Reihenfolge) «${st.rankItems?.find((x) => x.id === r.id)?.text}» muss spätestens an Position ${r.maxPos} stehen — ${r.why}`);
}
w('');

w('## 4. Quellenverzeichnis', '');
for (const s of SOURCES) w(`- **${s.short}** – ${s.title} · ${SOURCE_KIND_LABEL[s.kind]}${s.sr ? ` · ${s.sr}` : ''}${s.articles ? ` · Artikel: ${s.articles}` : ''} · Fassung: ${s.version}${s.note ? ` · Hinweis: ${s.note}` : ''}`);
w('', '## 5. Fachbegriffe', '');
for (const g of GLOSSARY) w(`- **${g.term}** (${g.moduleId ?? '–'}): ${g.definition}${g.detail ? ' ' + g.detail : ''} [${src(g.sources)}]`);

mkdirSync('review', { recursive: true });
writeFileSync('review/querschnitt-alle-module.md', out.join('\n'));
console.log('review/querschnitt-alle-module.md', Math.round(out.join('\n').length / 1024), 'KB');
