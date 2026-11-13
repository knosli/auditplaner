// Lernstand: ein einziges, versioniertes JSON-Objekt. Bewusst flach und
// serialisierbar, damit es später 1:1 in eine Datenbank (pro Benutzer)
// migriert werden kann. Keine personenbezogenen Daten ausser freiwilligen
// Notizen der Lernenden.

import { LEGACY_V1_STEPS } from './migrate';

export const STATE_VERSION = 3;

/**
 * Bewertungsfassung. Ergebnisse ohne Fassungsangabe stammen aus früheren
 * Fassungen. Sie werden nie neu benotet, sondern bei geänderten Inhalten als
 * «nach früherer Bewertungsfassung» gekennzeichnet und nicht mehr als
 * Kompetenznachweis gezählt.
 */
export const SCORING_VERSION = 5;

export type Confidence = 1 | 2 | 3; // 1 unsicher, 2 eher sicher, 3 sicher

export interface AnswerRecord {
  q: string; // Frage-ID
  at: number;
  score: number; // 0..1
  correct: boolean;
  conf?: Confidence;
  ctx: 'lektion' | 'wiederholung' | 'pruefung' | 'check' | 'coach';
  /** Bewertungsfassung (fehlt = frühere Fassung) */
  v?: number;
  /** Selbstbewertung am Raster (offene Fragen) – kein unabhängiger Fachnachweis */
  self?: boolean;
  /** kritische Option gewählt (Sicherheitsveto) */
  crit?: boolean;
}

export interface SRItem {
  ease: number;
  interval: number; // Tage
  due: number; // Zeitstempel
  reps: number;
  lapses: number;
  last: number;
}

export interface LessonProgress {
  cur: string; // ID des aktuellen Schritts
  seen: string[]; // IDs der gesehenen Schritte
  startedAt: number;
  completedAt?: number;
  answers: Record<string, string[]>; // Antworten in der Lektion (für Wiederaufnahme)
  open: Record<string, string>; // Freitext
}

export interface ScenarioRun {
  at: number;
  total: number; // 0..1
  byCriterion: Record<string, number>;
  critical: number;
  path: string[];
  passed: boolean;
  v?: number;
  /** Ergebnis ohne Selbstbewertungs-Schritte */
  objective?: number;
}

export interface ExamRun {
  id: string;
  kind: 'check' | 'modul' | 'offen' | 'mix';
  moduleId: string;
  at: number;
  score: number; // 0..1
  total: number;
  byTopic: Record<string, { ok: number; n: number }>;
  passed: boolean;
  v?: number;
  /** Anteil der Punkte aus Selbstbewertung (offene Fragen) */
  selfShare?: number;
}

export type PracticeStatus = 'offen' | 'in_arbeit' | 'eingereicht' | 'bestaetigt';

export interface PracticeRecord {
  status: PracticeStatus;
  notes: string;
  reflection: Record<string, string>; // Kriterium -> Begründung
  site?: string; // frei gewählte, anonymisierte Bezeichnung
  submittedAt?: number;
  confirm?: { role: string; date: string; evidence: string };
}

export interface FeynmanRecord {
  text: string;
  at: number;
  self: string[]; // abgehakte Rubrikpunkte
  aiFeedback?: string;
}

export interface SiteTaskRecord {
  text: string;
  ticks: string[];
  at: number;
}

export interface HistoryEvent {
  at: number;
  type: 'lektion_start' | 'lektion_ende' | 'szenario' | 'pruefung' | 'wiederholung' | 'praxis' | 'feynman' | 'aufgabe' | 'import';
  ref: string;
  detail: string;
}

export interface Settings {
  theme: 'system' | 'hell' | 'dunkel';
  coachMode: 'erklaeren' | 'trainieren' | 'pruefen';
  askConfidence: boolean;
  aiEnabled: boolean;
}

export interface AppState {
  version: number;
  createdAt: number;
  updatedAt: number;
  settings: Settings;
  lessons: Record<string, LessonProgress>;
  answers: AnswerRecord[];
  sr: Record<string, SRItem>; // Karten 'c:<id>' und Fragen 'q:<id>'
  scenarios: Record<string, ScenarioRun[]>;
  exams: ExamRun[];
  practice: Record<string, PracticeRecord>;
  feynman: Record<string, FeynmanRecord>;
  siteTasks: Record<string, SiteTaskRecord>;
  history: HistoryEvent[];
  studySec: Record<string, number>; // 'YYYY-MM-DD' -> Sekunden
}

export function emptyState(now = Date.now()): AppState {
  return {
    version: STATE_VERSION,
    createdAt: now,
    updatedAt: now,
    settings: { theme: 'system', coachMode: 'trainieren', askConfidence: true, aiEnabled: true },
    lessons: {},
    answers: [],
    sr: {},
    scenarios: {},
    exams: [],
    practice: {},
    feynman: {},
    siteTasks: {},
    history: [],
    studySec: {},
  };
}

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

/**
 * Prüft und ergänzt einen importierten oder gespeicherten Stand. Wirft einen
 * verständlichen Fehler, wenn die Datei kein Lernstand dieser App ist.
 */
export function normalizeState(raw: unknown): AppState {
  if (!isObj(raw)) throw new Error('Die Datei enthält keinen gültigen Lernstand (kein JSON-Objekt).');
  if (raw.app !== undefined && raw.app !== 'umweltcampus-bau-ch') throw new Error('Die Datei stammt nicht aus UmweltCampus Bau CH.');
  const src = isObj(raw.state) ? raw.state : raw;
  if (typeof src.version !== 'number') throw new Error('Die Datei enthält keine Versionsangabe und ist kein Lernstand dieser App.');
  if (src.version > STATE_VERSION) throw new Error(`Der Lernstand stammt aus einer neueren App-Version (${src.version}). Bitte App aktualisieren.`);
  const base = emptyState(typeof src.createdAt === 'number' ? src.createdAt : Date.now());
  const s: AppState = {
    ...base,
    updatedAt: typeof src.updatedAt === 'number' ? src.updatedAt : base.updatedAt,
    settings: { ...base.settings, ...(isObj(src.settings) ? (src.settings as Partial<Settings>) : {}) },
    lessons: isObj(src.lessons) ? (src.lessons as AppState['lessons']) : {},
    answers: Array.isArray(src.answers) ? (src.answers as AnswerRecord[]).filter((a) => isObj(a) && typeof a.q === 'string') : [],
    sr: isObj(src.sr) ? (src.sr as AppState['sr']) : {},
    scenarios: isObj(src.scenarios) ? (src.scenarios as AppState['scenarios']) : {},
    exams: Array.isArray(src.exams) ? (src.exams as ExamRun[]) : [],
    practice: isObj(src.practice) ? (src.practice as AppState['practice']) : {},
    feynman: isObj(src.feynman) ? (src.feynman as AppState['feynman']) : {},
    siteTasks: isObj(src.siteTasks) ? (src.siteTasks as AppState['siteTasks']) : {},
    history: Array.isArray(src.history) ? (src.history as HistoryEvent[]) : [],
    studySec: isObj(src.studySec) ? (src.studySec as AppState['studySec']) : {},
  };
  // Lektionsfortschritt: Version 1 (Positionen) → Version 2 (Schritt-IDs)
  for (const k of Object.keys(s.lessons)) {
    s.lessons[k] = migrateLesson(k, s.lessons[k] as unknown as Record<string, unknown>);
  }
  s.version = STATE_VERSION;
  return s;
}

/** Einzelnen Lektionsdatensatz auf das aktuelle Format bringen (verlustfrei). */
export function migrateLesson(lessonId: string, l: Record<string, unknown>): LessonProgress {
  const legacy = LEGACY_V1_STEPS[lessonId] ?? [];
  const fromIdx = (i: unknown) => (typeof i === 'number' ? legacy[i] : undefined);
  let seen: string[] = Array.isArray(l.seen) ? (l.seen as unknown[]).filter((x): x is string => typeof x === 'string') : [];
  if (Array.isArray(l.viewed)) for (const i of l.viewed) { const id = fromIdx(i); if (id && !seen.includes(id)) seen.push(id); }
  const cur = typeof l.cur === 'string' ? l.cur : fromIdx(l.step) ?? seen[seen.length - 1] ?? '';
  if (cur && !seen.includes(cur)) seen = [...seen, cur];
  return {
    cur,
    seen,
    startedAt: typeof l.startedAt === 'number' ? l.startedAt : Date.now(),
    ...(typeof l.completedAt === 'number' ? { completedAt: l.completedAt } : {}),
    answers: isObj(l.answers) ? (l.answers as LessonProgress['answers']) : {},
    open: isObj(l.open) ? (l.open as LessonProgress['open']) : {},
  };
}

/** Enthält der Stand Lernaktivität? (Ein frischer Stand darf nie einen gespeicherten überschreiben.) */
export function hasProgress(s: AppState): boolean {
  return Object.keys(s.lessons).length > 0 || s.answers.length > 0 || Object.keys(s.sr).length > 0 || s.exams.length > 0
    || Object.keys(s.scenarios).length > 0 || Object.keys(s.practice).length > 0 || Object.keys(s.feynman).length > 0 || Object.keys(s.siteTasks).length > 0;
}

/** Soll der im Konto gespeicherte Stand den lokalen ersetzen? */
export function preferRemote(local: AppState, remote: AppState | null): boolean {
  if (!remote || !hasProgress(remote)) return false;
  return !hasProgress(local) || remote.updatedAt > local.updatedAt;
}

export function exportPayload(s: AppState) {
  return { app: 'umweltcampus-bau-ch', exportedAt: new Date().toISOString(), state: s };
}

export const dayKey = (t = Date.now()) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** Begrenzung, damit der Stand klein bleibt (Datenbank-Dokumentgrösse). */
export function trimState(s: AppState): AppState {
  const MAX_ANS = 3000;
  const MAX_HIST = 600;
  return {
    ...s,
    answers: s.answers.length > MAX_ANS ? s.answers.slice(-MAX_ANS) : s.answers,
    history: s.history.length > MAX_HIST ? s.history.slice(-MAX_HIST) : s.history,
  };
}
