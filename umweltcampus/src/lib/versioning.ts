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

/** Antwort aus früherer Bewertungsfassung zu einer inzwischen geänderten Frage. */
export const isLegacyAnswer = (a: AnswerRecord) => (!a.v && RESCORED_V3_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 4 && RESCORED_V4_QUESTIONS.has(a.q)) || ((a.v ?? 0) < 5 && RESCORED_V5_QUESTIONS.has(a.q));
/** Offene Fragen vor Fassung 3 wurden als «richtig» verbucht, obwohl nur selbst bewertet. */
export const isLegacySelf = (a: AnswerRecord, isOpen: boolean) => !a.v && isOpen;
export const isLegacyRun = (scenarioId: string, r: ScenarioRun) => (!r.v && RESCORED_V3_SCENARIOS.has(scenarioId)) || ((r.v ?? 0) < 4 && RESCORED_V4_SCENARIOS.has(scenarioId)) || ((r.v ?? 0) < 5 && RESCORED_V5_SCENARIOS.has(scenarioId));
/** Prüfungen enthalten geänderte Fragen und Selbstbewertungen: alle vor Fassung 3 gelten als frühere Fassung. */
export const isLegacyExam = (e: ExamRun) => !e.v || (e.v < 4 && RESCORED_V4_EXAM_MODULES.has(e.moduleId)) || (e.v < 5 && RESCORED_V5_EXAM_MODULES.has(e.moduleId));

export function legacyCounts(s: AppState, isOpen: (qid: string) => boolean) {
  return {
    answers: s.answers.filter((a) => isLegacyAnswer(a) || isLegacySelf(a, isOpen(a.q))).length,
    runs: Object.entries(s.scenarios).reduce((n, [id, runs]) => n + runs.filter((r) => isLegacyRun(id, r)).length, 0),
    exams: s.exams.filter(isLegacyExam).length,
  };
}
