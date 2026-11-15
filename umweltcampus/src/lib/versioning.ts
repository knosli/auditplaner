import type { AnswerRecord, AppState, ExamRun, ScenarioRun } from './state';

// Inhalte, deren Lösung oder Bewertung in Bewertungsfassung 3 geändert wurde
// (externe Fachprüfung vom 13.11.2026). Frühere Ergebnisse dazu werden nicht neu
// benotet, sondern als «nach früherer Bewertungsfassung» gekennzeichnet und
// nicht mehr als Kompetenznachweis gezählt.
export const RESCORED_V3_QUESTIONS = new Set(['m2-q12', 'm2-q21', 'm2-q28', 'm2-d01', 'm2-d03', 'm2-d04', 'm2-d05', 'm2-d06']);
export const RESCORED_V3_SCENARIOS = new Set(['sim-a', 'sim-b']);

// Bewertungsfassung 4 (externe Prüfung Module 1–4 vom 13.11.2026): Teilpunkte für
// Optionen, die eine Stopp-, Freigabe- oder Schichtentrennungspflicht verletzen,
// wurden gestrichen bzw. herabgesetzt.
export const RESCORED_V4_QUESTIONS = new Set(['m3-d03', 'm3-d05', 'm4-d01']);
export const RESCORED_V4_SCENARIOS = new Set(['sim-g', 'sim-h']);
/** Prüfungen dieser Module (und gemischte) können geänderte Fragen enthalten. */
const RESCORED_V4_EXAM_MODULES = new Set(['m3', 'm4', 'mix']);

// Bewertungsfassung 5 (externe Prüfung Modul 8 vom 13.11.2026): Vergabe- und
// Nachtragsrecht, Asbest-Freigabekette und Gewichte dreier Abwägungen korrigiert;
// Fall D mit zwingender Freigabekette (No-Go) neu bewertet.
export const RESCORED_V5_QUESTIONS = new Set(['m8-q08', 'm8-q17', 'm8-q22', 'm8-d02', 'm8-d03', 'm8-d05']);
export const RESCORED_V5_SCENARIOS = new Set(['sim-d']);
const RESCORED_V5_EXAM_MODULES = new Set(['m8', 'mix']);

// Bewertungsfassung 6 (Gesamtprüfung V0.17 vom 14.11.2026): Teilpunkte für Optionen,
// die eine gefährdende Handlung fortsetzen, eine unzulässige Einleitung vornehmen oder eine
// nötige Meldung verzögern, gestrichen; Fälle G und K entsprechend neu bewertet.
export const RESCORED_V6_QUESTIONS = new Set(['m2-d05', 'm5-d01', 'm5-d02', 'm6-d03', 'm7-d01', 'm7-d02', 'm7-d04', 'm9-d03', 'm12-d05']);
export const RESCORED_V6_SCENARIOS = new Set(['sim-g', 'sim-k']);
const RESCORED_V6_EXAM_MODULES = new Set(['m2', 'm3', 'm5', 'm6', 'm7', 'm9', 'm12', 'mix']);

// Bewertungsfassung 7 (Gesamtprüfung V0.17, Phase 3): Teilpunkte bei Interessenkonflikt (UBB),
// Spitzenbelastung (Baulärm), verschwiegener Auditlücke und pauschaler Verantwortungsabgabe gesenkt.
export const RESCORED_V7_QUESTIONS = new Set(['m6-d01', 'm9-d01', 'm10-d04', 'm12-d01']);
const RESCORED_V7_EXAM_MODULES = new Set(['m6', 'm9', 'm10', 'm12', 'mix']);

// Bewertungsfassung 8 (Prüfberichte V0.22 vom 15.11.2026): keine Teilpunkte mehr für verzögerte
// Ölfilm-Meldung, ungeprüftes Überdecken verdächtigen Klebers und ungeklärte Abgabe von Rückbauteilen;
// Benzinunfall-Option ohne «weiterarbeiten wie bisher» neu gefasst; Aufschub bei Umweltzusagen gesenkt.
export const RESCORED_V8_QUESTIONS = new Set(['m2-d05', 'm3-d02', 'm7-d04', 'm11-d04', 'm11-d05']);
export const RESCORED_V8_SCENARIOS = new Set<string>([]);
const RESCORED_V8_EXAM_MODULES = new Set(['m2', 'm3', 'm7', 'm11', 'mix']);

// Bewertungsfassung 9 (Nachprüfung des Korrekturberichts V0.23 vom 15.11.2026): Teilpunkte gesenkt bzw.
// gestrichen für fehlende eigene Sofortmassnahmen beim Ölfilm (m2-d05 f), bewusst bis Bauende verschwiegene
// Vertragsabweichungen (m11-d05 d) und einen kurzfristig nachgeholten Nachweis, der eine Lücke im Audit verdeckt (m10-d04 c).
export const RESCORED_V9_QUESTIONS = new Set(['m2-d05', 'm10-d04', 'm11-d05']);
const RESCORED_V9_EXAM_MODULES = new Set(['m2', 'm10', 'm11', 'mix']);

/** Antwort aus früherer Bewertungsfassung zu einer inzwischen geänderten Frage. */
export const isLegacyAnswer = (a: AnswerRecord) => (!a.v && RESCORED_V3_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 4 && RESCORED_V4_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 5 && RESCORED_V5_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 6 && RESCORED_V6_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 7 && RESCORED_V7_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 8 && RESCORED_V8_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 9 && RESCORED_V9_QUESTIONS.has(a.q));
/** Offene Fragen vor Fassung 3 wurden als «richtig» verbucht, obwohl nur selbst bewertet. */
export const isLegacySelf = (a: AnswerRecord, isOpen: boolean) => !a.v && isOpen;
export const isLegacyRun = (scenarioId: string, r: ScenarioRun) => (!r.v && RESCORED_V3_SCENARIOS.has(scenarioId)) || ((r.v ?? 0) < 4 && RESCORED_V4_SCENARIOS.has(scenarioId)) || ((r.v ?? 0) < 5 && RESCORED_V5_SCENARIOS.has(scenarioId)) || ((r.v ?? 0) < 6 && RESCORED_V6_SCENARIOS.has(scenarioId)) || ((r.v ?? 0) < 8 && RESCORED_V8_SCENARIOS.has(scenarioId));
/** Prüfungen enthalten geänderte Fragen und Selbstbewertungen: alle vor Fassung 3 gelten als frühere Fassung. */
export const isLegacyExam = (e: ExamRun) => !e.v || (e.v < 4 && RESCORED_V4_EXAM_MODULES.has(e.moduleId)) || (e.v < 5 && RESCORED_V5_EXAM_MODULES.has(e.moduleId)) || (e.v < 6 && RESCORED_V6_EXAM_MODULES.has(e.moduleId)) || (e.v < 7 && RESCORED_V7_EXAM_MODULES.has(e.moduleId)) || (e.v < 8 && RESCORED_V8_EXAM_MODULES.has(e.moduleId)) || (e.v < 9 && RESCORED_V9_EXAM_MODULES.has(e.moduleId));

export function legacyCounts(s: AppState, isOpen: (qid: string) => boolean) {
  return {
    answers: s.answers.filter((a) => isLegacyAnswer(a) || isLegacySelf(a, isOpen(a.q))).length,
    runs: Object.entries(s.scenarios).reduce((n, [id, runs]) => n + runs.filter((r) => isLegacyRun(id, r)).length, 0),
    exams: s.exams.filter(isLegacyExam).length,
  };
}
