import { LESSONS, MODULES, Q } from '../content';
import type { Lesson, Question } from '../content/types';
import { displayOrder } from './exam';

/**
 * Hörmodus: Lerninhalte als vorlesbare Abschnitte (Sprachausgabe des Geräts, Web Speech API).
 * Keine Audiodateien, keine externen Dienste, funktioniert offline, soweit das Gerät eine deutsche Stimme hat.
 */

export type ListenMode = 'inhalt' | 'inhalt+quiz' | 'quiz';

export interface Segment {
  /** Anzeige während des Vorlesens */
  title: string;
  /** vorzulesender Text (bereits für die Sprachausgabe aufbereitet) */
  text: string;
  /** Denkpause nach dem Abschnitt in Sekunden (Hör-Quiz) */
  pauseAfter?: number;
  lessonId: string;
}

// Abkürzungen, die als Wort gelesen werden (nicht buchstabiert)
const AS_WORD = new Set(['SIA', 'VSS', 'ISO', 'SUVA', 'Suva', 'KlG', 'BöB']);
// Erlasse und Stellen, die beim Hören ausgeschrieben verständlicher sind
const NAMES: [RegExp, string][] = [
  [/\bUSG\b/g, 'Umweltschutzgesetz'], [/\bGSchG\b/g, 'Gewässerschutzgesetz'], [/\bGSchV\b/g, 'Gewässerschutzverordnung'],
  [/\bLRV\b/g, 'Luftreinhalte-Verordnung'], [/\bLSV\b/g, 'Lärmschutz-Verordnung'], [/\bVBBo\b/g, 'Bodenbelastungsverordnung'],
  [/\bVVEA\b/g, 'Abfallverordnung'], [/\bVeVA\b/g, 'Verordnung über den Verkehr mit Abfällen'], [/\bKlG\b/g, 'Klimagesetz'],
  [/\bChemRRV\b/g, 'Chemikalien-Risikoreduktions-Verordnung'], [/\bBauAV\b/g, 'Bauarbeitenverordnung'], [/\bAltlV\b/g, 'Altlasten-Verordnung'],
  [/\bBAFU\b/g, 'Bafu'], [/\bARA\b/g, 'Ara'], [/\bAVOR\b/g, 'Arbeitsvorbereitung'], [/\bUBB\b/g, 'Umweltbaubegleitung'], [/\bBBB\b/g, 'bodenkundliche Baubegleitung'],
];
const REPL: [RegExp, string][] = [
  [/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1'],
  [/\[\[([a-z0-9-]+)\]\]/g, '$1'],
  [/\*\*/g, ''],
  [/^#+\s*/gm, ''],
  [/^[!§]?>\s*/gm, ''],
  [/^\s*[-*]\s+/gm, ''],
  [/\bArt\.\s/g, 'Artikel '],
  [/\bAbs\.\s/g, 'Absatz '],
  [/\bZiff\.\s/g, 'Ziffer '],
  [/\blit\.\s/g, 'Buchstabe '],
  [/\bBst\.\s/g, 'Buchstabe '],
  [/\bz\.\s?B\./g, 'zum Beispiel'],
  [/\bu\.\s?a\./g, 'unter anderem'],
  [/\bd\.\s?h\./g, 'das heisst'],
  [/\bbzw\./g, 'beziehungsweise'],
  [/\bca\./g, 'circa'],
  [/\bggf\./g, 'gegebenenfalls'],
  [/\bevtl\./g, 'eventuell'],
  [/\binkl\./g, 'inklusive'],
  [/\bSR\s(\d)/g, 'S R $1'],
  [/\bmg\/l\b/g, 'Milligramm pro Liter'],
  [/\bmg\/kg\b/g, 'Milligramm pro Kilogramm'],
  [/\bg\/m³/g, 'Gramm pro Kubikmeter'],
  [/\bl\/s\b/g, 'Liter pro Sekunde'],
  [/\bm³\/h\b/g, 'Kubikmeter pro Stunde'],
  [/\bm³/g, 'Kubikmeter'],
  [/\bm²/g, 'Quadratmeter'],
  [/\bµm\b/g, 'Mikrometer'],
  [/\bkW\b/g, 'Kilowatt'],
  [/\bdB\b/g, 'Dezibel'],
  [/\bpH\b/g, 'P H'],
  [/CO₂-eq/g, 'C O 2 Äquivalente'],
  [/CO₂/g, 'C O 2'],
  [/PM10/g, 'P M 10'],
  [/PM2\.5/g, 'P M 2,5'],
  [/(?<![\d.])(\d+)\.(\d+)(?![\d.])/g, '$1,$2'],
  [/(\d)\s?[–-]\s?(\d)/g, '$1 bis $2'],
  [/(\d)\s?%/g, '$1 Prozent'],
  [/\s?≥\s?/g, ' mindestens '],
  [/\s?≤\s?/g, ' höchstens '],
  [/\s?→\s?/g, ', dann '],
  [/\s?×\s?/g, ' mal '],
  [/[«»]/g, ''],
  [/\s–\s/g, ', '],
  [/\(\s*\)/g, ''],
];

/** Text für die Sprachausgabe aufbereiten: Markup weg, Abkürzungen und Einheiten ausgeschrieben. */
export function speakable(raw: string): string {
  let t = raw;
  // Tabellen: «Spalte: Wert»-Sätze statt Pipes
  t = t.replace(/((?:^\|.*\|\s*$\n?)+)/gm, (block) => {
    const rows = block.trim().split('\n').filter((l) => !/^\|\s*-{2,}/.test(l.trim())).map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
    if (rows.length < 2) return block;
    const [head, ...body] = rows;
    return body.map((r) => r.map((c, i) => (i === 0 ? c : `${head[i]}: ${c}`)).join('. ') + '.').join('\n') + '\n';
  });
  for (const [re, s] of REPL) t = t.replace(re, s);
  for (const [re, s] of NAMES) t = t.replace(re, s);
  // Grossbuchstaben-Abkürzungen (2–6 Zeichen) buchstabieren, ausser bekannte Wörter
  t = t.replace(/\b([A-ZÄÖÜ][A-ZÄÖÜ0-9]{1,5}[a-z]?)\b/g, (m) => (AS_WORD.has(m) || /^[A-Z][a-z]/.test(m) ? m : m.split('').join(' ')));
  return t.replace(/\n{2,}/g, '\n').replace(/[ \t]{2,}/g, ' ').trim();
}

/** In kurze Stücke teilen (manche Browser brechen lange Äusserungen ab). */
export function chunks(text: string, max = 220): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    const sentences = para.match(/[^.!?]+[.!?]*/g) ?? [para];
    let cur = '';
    for (const s of sentences) {
      if ((cur + s).length > max && cur) { out.push(cur.trim()); cur = ''; }
      cur += s;
    }
    if (cur.trim()) out.push(cur.trim());
  }
  return out.filter(Boolean);
}

function quizSegments(l: Lesson, q: Question, n: number): Segment[] {
  const opts = displayOrder(q.options ?? [], q.id, 7); // gemischt wie in der App
  const right = opts.filter((o) => (q.type === 'best' ? (o.weight ?? 0) >= 0.999 : q.correct?.includes(o.id)));
  const nr = (id: string) => opts.findIndex((o) => o.id === id) + 1;
  const ask = `Frage ${n}. ${q.prompt} ${q.type === 'multi' ? 'Mehrere Antworten sind richtig.' : ''} ${opts.map((o, i) => `Antwort ${i + 1}: ${o.text}`).join(' ')}`;
  const sol = `Richtig ist ${right.length > 1 ? 'Antwort ' + right.map((o) => nr(o.id)).join(' und ') : `Antwort ${nr(right[0]?.id ?? '')}`}: ${right.map((o) => o.text).join('; ')}. ${q.explanation}`;
  return [
    { lessonId: l.id, title: `Hör-Quiz: Frage ${n}`, text: speakable(ask), pauseAfter: 6 },
    { lessonId: l.id, title: `Hör-Quiz: Lösung ${n}`, text: speakable(sol) },
  ];
}

/** Abschnitte einer Lektion. */
export function lessonSegments(l: Lesson, mode: ListenMode, withDeep = false): Segment[] {
  const out: Segment[] = [];
  if (mode !== 'quiz') {
    out.push({ lessonId: l.id, title: l.title, text: speakable(`Lektion ${l.order}: ${l.title}.`) });
    for (const st of l.steps) {
      if (st.kind === 'situation' || st.kind === 'brief' || st.kind === 'explain') out.push({ lessonId: l.id, title: st.title, text: speakable(`${st.title}. ${st.text}`) });
      else if (st.kind === 'example') out.push({ lessonId: l.id, title: st.title, text: speakable(`${st.title}. ${st.text}`) });
      else if (st.kind === 'deep' && withDeep) out.push({ lessonId: l.id, title: st.title, text: speakable(`${st.title}. ${st.text}`) });
      else if (st.kind === 'summary') out.push({ lessonId: l.id, title: 'Zusammenfassung', text: speakable(`Zusammenfassung. ${st.points.join(' ')}`) });
    }
  }
  if (mode !== 'inhalt') {
    const ids = l.steps.flatMap((st) => (st.kind === 'review' || st.kind === 'quiz' ? st.questionIds : st.kind === 'decision' ? [st.questionId] : []));
    const qs = [...new Set(ids)].map((id) => Q.get(id)).filter((q): q is Question => !!q && q.type !== 'open' && (q.options?.length ?? 0) > 0);
    qs.forEach((q, i) => out.push(...quizSegments(l, q, i + 1)));
  }
  return out;
}

/** Abschnitte eines ganzen Moduls (Lektionen in Reihenfolge). */
export function moduleSegments(moduleId: string, mode: ListenMode, withDeep = false): Segment[] {
  const m = MODULES.find((x) => x.id === moduleId);
  const ls = LESSONS.filter((l) => l.moduleId === moduleId);
  if (!m || !ls.length) return [];
  const intro: Segment = { lessonId: ls[0].id, title: m.title, text: speakable(`Modul ${m.no}: ${m.title}. ${ls.length} Lektionen.`) };
  return [intro, ...ls.flatMap((l) => lessonSegments(l, mode, withDeep))];
}

/** Ungefähre Hördauer in Minuten (rund 150 Wörter pro Minute plus Pausen). */
export function minutesOf(segs: Segment[], rate = 1): number {
  const words = segs.reduce((n, s) => n + s.text.split(/\s+/).length, 0);
  const pauses = segs.reduce((n, s) => n + (s.pauseAfter ?? 0) + 0.6, 0);
  return Math.max(1, Math.round(words / (150 * rate) + pauses / 60));
}

/**
 * Qualität einer Gerätestimme schätzen (höher = natürlicher). Bevorzugt «Premium/Verbessert/Natural/Neural»-Stimmen
 * (iOS, macOS, Edge, Android) und Google-Stimmen in Chrome; einfache Kompakt- oder eSpeak-Stimmen zuletzt.
 */
export function voiceScore(v: { name: string; lang: string; localService?: boolean }): number {
  const n = v.name.toLowerCase();
  let s = 0;
  if (/premium|verbessert|erweitert|enhanced|natural|neural|online/.test(n)) s += 10;
  if (/google/.test(n)) s += 6;
  if (/compact|kompakt|espeak|robot|novelty/.test(n)) s -= 8;
  if (v.lang === 'de-CH') s += 2;
  else if (v.lang === 'de-DE') s += 1;
  return s;
}
