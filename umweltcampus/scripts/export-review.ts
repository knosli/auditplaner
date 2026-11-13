// Exportiert alle Lerninhalte von Modul 2 als ein Markdown-Dokument für eine
// externe fachliche Prüfung (Fachperson oder anderes KI-System).
// Aufruf: npx vite-node scripts/export-review.ts [m2|m1 …]   (Standard: m2)
import { writeFileSync, mkdirSync } from 'node:fs';
import { CARDS as ALL_CARDS, FEYNMAN as ALL_F, GLOSSARY, LESSONS as ALL_L, LIBRARY as ALL_LIB, MODULES, Q, QUESTIONS as ALL_Q, SCENARIOS as ALL_S, SITETASKS as ALL_ST, SOURCES, ST, T, TASKS as ALL_T } from '../src/content';
const MOD = process.argv[2] ?? 'm2';
const inMod = <X extends { moduleId?: string }>(a: X[]) => a.filter((x) => x.moduleId === MOD);
const CARDS = inMod(ALL_CARDS), FEYNMAN = inMod(ALL_F), LESSONS = inMod(ALL_L), LIBRARY = inMod(ALL_LIB), QUESTIONS = inMod(ALL_Q), SCENARIOS = inMod(ALL_S), SITETASKS = inMod(ALL_ST), TASKS = inMod(ALL_T);
const MODINFO = MODULES.find((m) => m.id === MOD)!;
import { SOURCE_KIND_LABEL } from '../src/content/sources';
import type { Question } from '../src/content/types';

const out: string[] = [];
const w = (...l: string[]) => out.push(...l);
const clean = (t: string) => t.replace(/\[\[[a-z0-9-]+\|(.+?)\]\]/g, '$1').replace(/\[\[([a-z0-9-]+)\]\]/g, '$1').replace(/^§> /gm, '> Rechtsnatur: ').replace(/^!> /gm, '> ACHTUNG: ');
const src = (ids: string[]) => ids.map((id) => SOURCES.find((s) => s.id === id)?.short ?? id).join(', ');

function question(q: Question, n?: string) {
  w(`#### ${n ?? ''}Frage ${q.id} (Stufe ${q.level}, Typ ${q.type}, Thema ${q.topic})`, '', `**Lernziel:** ${q.objective}`, '', clean(q.prompt), '');
  if (q.options) for (const o of q.options) {
    const mark = q.type === 'best' ? ` — Gewicht ${o.weight}` : q.correct?.includes(o.id) ? ' — **richtig**' : '';
    w(`- (${o.id}) ${o.text}${mark}`);
    if (o.why) w(`  - Beurteilung: ${o.why}`);
    if (o.prerequisites) w(`  - Voraussetzungen: ${o.prerequisites}`);
    if (o.risks) w(`  - Risiken: ${o.risks}`);
  }
  if (q.rubric) { w('', '**Bewertungsraster:**'); for (const r of q.rubric) w(`- ${r.text}`); }
  w('', `**Erklärung:** ${clean(q.explanation)}`, '', `**Häufige Fehler:** ${q.commonErrors.join(' · ')}`, '', `**Quellen:** ${src(q.sources)}`, '');
}

w(`# UmweltCampus Bau CH – Modul ${MODINFO.no} «${MODINFO.title}»`, '', `Export für die fachliche Prüfung, ${new Date().toLocaleDateString('de-CH')}. Prüfstatus aller Inhalte: Entwurf.`, '',
  'Zielgruppe der App: angehender leitender Umweltbeauftragter einer Deutschschweizer Baufirma (Hoch- und Tiefbau, ISO 14001), Hintergrund Bau-Polier und Spezialist Arbeitssicherheit.', '');

w('## 1. Quellenverzeichnis', '');
for (const s of SOURCES) {
  w(`### ${s.short}: ${s.title}`, `- Art: ${SOURCE_KIND_LABEL[s.kind]}${s.sr ? ` · ${s.sr}` : ''}`, `- Verwendete Artikel: ${s.articles ?? '–'}`, `- Fassung: ${s.version}`, `- Link: ${s.url ?? '–'}`, `- Hinweis: ${s.note ?? '–'}`, '');
}

w('## 2. Lektionen', '');
for (const l of LESSONS) {
  w(`### Lektion ${l.order}: ${l.title} (Stufe ${l.level}, ca. ${l.minutes} Min.)`, '', '**Lernziele:**', ...l.objectives.map((o) => `- ${o}`), '');
  for (const st of l.steps) {
    w(`#### Schritt «${st.title}» (${st.kind})`, '');
    switch (st.kind) {
      case 'situation': case 'brief': case 'explain': case 'deep': w(clean(st.text), ''); break;
      case 'example': w(`*${st.context}*`, '', clean(st.text), ''); break;
      case 'diagram': w(`Interaktives Schema «${st.diagram}»: ${st.caption}`, ''); break;
      case 'quiz': case 'review': w(`Fragen: ${st.questionIds.join(', ')} (siehe Abschnitt 3)`, ''); break;
      case 'decision': w(`Frage: ${st.questionId} (siehe Abschnitt 3)`, ''); break;
      case 'sitetask': w(`Baustellenaufgabe: ${st.taskId} – ${ST.get(st.taskId)?.title} (siehe Abschnitt 4)`, ''); break;
      case 'feynman': w(`Feynman-Übung: ${st.feynmanId} (siehe Abschnitt 6)`, ''); break;
      case 'practice': w(`Praxisauftrag: ${st.taskId} – ${T.get(st.taskId)?.title} (siehe Abschnitt 6)`, ''); break;
      case 'summary': w(...st.points.map((p) => `- ${p}`), ''); break;
      case 'sources': w(`Quellen: ${src(st.sourceIds)}`, ''); break;
    }
  }
}

w('## 3. Fragen (inkl. Lösungen und Abwägungen)', '');
for (const q of QUESTIONS) question(q);

w('## 4. Baustellenaufgaben', '');
for (const t of SITETASKS) {
  w(`### ${t.id}: ${t.title} (${t.setting}, Stufe ${t.level})`, '', t.situation, '', ...t.data.map((d) => `- ${d}`), '', `**Auftrag:** ${t.assignment}`, '', '**Raster:**', ...t.rubric.map((r) => `- ${r.text}`), '', '**Musterlösung:**', '', t.solution, '', `**Quellen:** ${src(t.sources)}`, '');
}

w('## 5. Baustellensimulationen', '');
for (const sc of SCENARIOS.filter((x) => x.status === 'verfuegbar')) {
  w(`### Fall ${sc.code}: ${sc.title} (${sc.setting}, Stufe ${sc.level})`, '', sc.intro, '', ...sc.facts.map((f) => `- ${f}`), '');
  for (const st of sc.stages) {
    w(`#### ${st.id}: ${st.title} (${st.type})`, '', st.situation, '', `**Frage:** ${st.prompt}`, '');
    for (const o of st.options ?? []) w(`- ${o.text} — Punkte ${o.points}/2${o.critical ? ' — KRITISCH' : ''}${o.next ? ` — weiter zu ${o.next}` : ''}`, `  - Rückmeldung: ${o.feedback}${o.reveal ? ` | Antwort: ${o.reveal}` : ''}${o.consequence ? ` | Folge: ${o.consequence}` : ''}`);
    if (st.rankOrder) w('Richtige Reihenfolge:', ...st.rankOrder.map((id, i) => `${i + 1}. ${st.rankItems?.find((x) => x.id === id)?.text}`), '', st.rankExplanation ?? '');
    if (st.rubric) w('Raster:', ...st.rubric.map((r) => `- ${r.text}`));
    w('');
  }
  w(`**Fachliche Einordnung:** ${sc.debrief}`, '', `**Quellen:** ${src(sc.sources)}`, '');
}

w('## 6. Praxisaufträge und Feynman-Übungen', '');
for (const t of TASKS) w(`### ${t.id}: ${t.title}`, '', t.goal, '', ...t.steps.map((s, i) => `${i + 1}. ${s}`), '', `**Ergebnis:** ${t.deliverable}`, '', `**Kriterien:** ${t.criteria.join(' · ')}`, '');
for (const f of FEYNMAN) w(`### ${f.id} (Publikum: ${f.audience})`, '', f.prompt, '', ...f.rubric.map((r) => `- ${r.text}`), '');

w('## 7. Wiederholungskarten', '');
for (const c of CARDS) w(`- **${c.front}** → ${c.back.replace(/\n/g, ' ')} (${src(c.sources)})`);
w('', '## 8. Fachbegriffe', '');
for (const g of GLOSSARY) w(`- **${g.term}**: ${g.definition}${g.detail ? ' ' + g.detail : ''}`);
w('', '## 9. Bibliothek (Checklisten, Vorlagen, Matrix)', '');
for (const e of LIBRARY) {
  w(`### ${e.title}`, '', e.summary, '');
  if (e.items) for (const g of e.items) w(`**${g.group}**`, ...g.points.map((p) => `- [ ] ${p}`), '');
  if (e.table) w('| ' + e.table.head.join(' | ') + ' |', '|' + e.table.head.map(() => '---').join('|') + '|', ...e.table.rows.map((r) => '| ' + r.join(' | ') + ' |'), '');
  if (e.text) w(clean(e.text), '');
}

mkdirSync('review', { recursive: true });
writeFileSync(`review/modul${MODINFO.no}-inhalte.md`, out.join('\n'));
console.log(`review/modul${MODINFO.no}-inhalte.md`, Math.round(out.join('\n').length / 1024), 'KB,', QUESTIONS.length, 'Fragen, Q-Lookup', Q.size);
