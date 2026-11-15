// Zusatzexporte für die Prüfung: Simulator-Szenen, kantonales Quellenregister, Frageninventar (CSV).
// Aufruf: npx vite-node scripts/export-extras.ts
import { writeFileSync, mkdirSync } from 'node:fs';
import { MODULES, QUESTIONS, SCENARIOS } from '../src/content';
import { SCENES } from '../src/content/scenes';
import { CANTONS, CANTON_SOURCES, CHECK_THEMES, FEDERAL_BY_THEME, MODULE_THEMES, NATURE_LABEL, THEME_LABEL, projectCheck } from '../src/content/cantons';

mkdirSync('review', { recursive: true });
const d = new Date().toLocaleDateString('de-CH');

// 1. Szenen
const s: string[] = [`# Simulator-Szenen (technische Lagepläne bzw. Ablaufschemas)`, '', `Export ${d}. Prüfstatus Entwurf. Jede Szene stellt Gefahren, Schutzgüter, Wirkungswege, mögliche Folgen ohne Massnahme und die Massnahmen der Musterlösung dar. Massnahmen sind in der App erst in der Auswertung sichtbar. Inhalte sollen ausschliesslich aus Ausgangslage, Fakten und Musterlösung des jeweiligen Falls stammen – bitte prüfen.`, ''];
for (const sc of SCENARIOS.filter((x) => x.status === 'verfuegbar')) {
  const sn = SCENES[sc.id];
  const mod = MODULES.find((m) => m.id === sc.moduleId);
  s.push(`## Fall ${sc.code}: ${sc.title} (Modul ${mod?.no})`, '', `*${sn?.caption ?? 'keine Szene'}*`, '', `**Ausgangslage (aus dem Fall):** ${sc.intro}`, '', ...sc.facts.map((f) => `- ${f}`), '');
  if (!sn) continue;
  s.push('| Nr. | Gefahr | Mögliche Folge ohne Massnahme |', '|---|---|---|');
  for (const e of sn.els) if (e.t === 'hazard') s.push(`| ${e.n} | ${e.label} | ${e.then} |`);
  s.push('', '**Schutzgüter / Betroffene:** ' + sn.els.filter((e) => e.t === 'receptor').map((e) => e.t === 'receptor' ? `${e.id} ${e.label}` : '').join(' · '), '');
  s.push('**Massnahmen (Auswertung):**', ...sn.els.filter((e) => e.t === 'measure').map((e) => e.t === 'measure' ? `- ${e.id}: ${e.label}` : ''), '');
  s.push('**Flächen im Plan:** ' + sn.els.filter((e) => e.t === 'zone' && e.label).map((e) => (e.t === 'zone' ? e.label : '')).join(' · '), '');
}
writeFileSync('review/simulator-szenen.md', s.join('\n'));

// 2. Kantonsregister
const k: string[] = [`# Kantonales Quellenregister (21 Kantone)`, '', `Export ${d}. Grundlage: Quellenregister des Nutzers (Link-Recherche 14.11.2026). Alle Einträge sind Quellenhinweise mit Prüfstatus «nicht geprüft»; die App leitet daraus keine Pflichten ab. Links wurden von der App nicht auf Erreichbarkeit geprüft.`, '', '## Kantone', '', '| Kanton | Name | Amtssprachen | Fachstelle | Hinweis |', '|---|---|---|---|---|'];
for (const c of CANTONS) k.push(`| ${c.code} | ${c.name} | ${c.langs.join('/')} | ${c.office} | ${c.hint} |`);
k.push('', '## Quellen', '', '| ID | Kanton | Titel | Themen | Rechtsnatur | Ausgabe/Stand | Status | URL |', '|---|---|---|---|---|---|---|---|');
for (const x of CANTON_SOURCES) k.push(`| ${x.id} | ${x.canton} | ${x.title} | ${x.themes.map((t) => THEME_LABEL[t]).join(', ')} | ${NATURE_LABEL[x.nature]} | ${x.edition ?? '–'} | ${x.status === 'geprueft' ? 'geprüft: ' + x.checkedRef : 'nicht geprüft'} | ${x.url} |`);
k.push('', '## Zuordnung Themen → Schweizer Grundlagen (Quellen-IDs der App)', '', ...CHECK_THEMES.map((t) => `- ${THEME_LABEL[t]}: ${FEDERAL_BY_THEME[t].join(', ')}`), '', '## Zuordnung Module → Themen «Vor Ort prüfen»', '', ...Object.entries(MODULE_THEMES).map(([m, ts]) => `- ${m}: ${ts.map((t) => THEME_LABEL[t]).join(', ')}`));
k.push('', '## Beispiel Projektcheck ZH / Gemeinde «Musterdorf»', '', '| Thema | Status | Meldung |', '|---|---|---|');
for (const r of projectCheck('ZH', CHECK_THEMES, 'Musterdorf')) k.push(`| ${r.label} | ${r.status} | ${r.message} |`);
writeFileSync('review/kantonsregister.md', k.join('\n'));

// 3. Frageninventar
const esc = (t: string) => '"' + String(t ?? '').replace(/"/g, '""').replace(/\n/g, ' ') + '"';
const rows = ['modul;id;typ;stufe;thema;bewertungsfassung;loesung_bzw_gewichte;kritische_optionen;prompt'];
for (const q of QUESTIONS) {
  const sol = q.type === 'best' ? (q.options ?? []).map((o) => `${o.id}=${o.weight}`).join(' ') : q.type === 'open' ? 'offen (Raster)' : (q.correct ?? []).join(' ');
  const crit = (q.options ?? []).filter((o) => o.critical).map((o) => o.id).join(' ');
  rows.push([q.moduleId, q.id, q.type, q.level, q.topic, q.rev ?? '', sol, crit, esc(q.prompt)].join(';'));
}
writeFileSync('review/frageninventar-v022.csv', '﻿' + rows.join('\n'));
console.log('ok', SCENARIOS.filter((x) => x.status === 'verfuegbar').length, 'Szenen,', CANTON_SOURCES.length, 'Kantonsquellen,', QUESTIONS.length, 'Fragen');
