import type { AnswerRecord, AppState, ExamRun, ScenarioRun } from './state';

// Inhalte, deren Lösung oder Bewertung in Bewertungsfassung 3 geändert wurde
// (externe Fachprüfung vom 13.11.2026). Frühere Ergebnisse dazu werden nicht neu
// benotet, sondern als «nach früherer Bewertungsfassung» gekennzeichnet und
// nicht mehr als Kompetenznachweis gezählt.
export const RESCORED_V3_QUESTIONS = new Set(['m2-q12', 'm2-q21', 'm2-q28', 'm2-d01', 'm2-d03', 'm2-d04', 'm2-d05', 'm2-d06']);
export const RESCORED_V3_SCENARIOS = new Set(['sim-a', 'sim-b']);

/** Antwort aus früherer Bewertungsfassung zu einer inzwischen geänderten Frage. */
export const isLegacyAnswer = (a: AnswerRecord) => !a.v && RESCORED_V3_QUESTIONS.has(a.q);
/** Offene Fragen vor Fassung 3 wurden als «richtig» verbucht, obwohl nur selbst bewertet. */
export const isLegacySelf = (a: AnswerRecord, isOpen: boolean) => !a.v && isOpen;
export const isLegacyRun = (scenarioId: string, r: ScenarioRun) => !r.v && RESCORED_V3_SCENARIOS.has(scenarioId);
/** Prüfungen enthalten geänderte Fragen und Selbstbewertungen: alle vor Fassung 3 gelten als frühere Fassung. */
export const isLegacyExam = (e: ExamRun) => !e.v;

export function legacyCounts(s: AppState, isOpen: (qid: string) => boolean) {
  return {
    answers: s.answers.filter((a) => isLegacyAnswer(a) || isLegacySelf(a, isOpen(a.q))).length,
    runs: Object.entries(s.scenarios).reduce((n, [id, runs]) => n + runs.filter((r) => isLegacyRun(id, r)).length, 0),
    exams: s.exams.filter(isLegacyExam).length,
  };
}
