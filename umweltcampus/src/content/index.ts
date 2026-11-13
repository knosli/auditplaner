import { M2_QUESTIONS } from './m2/questions';
import { M2_CARDS } from './m2/cards';
import { M2_LESSONS } from './m2/lessons';
import { M2_TASKS, M2_FEYNMAN } from './m2/tasks';
import { SCENARIOS } from './m2/scenarios';
import { M2_DECISIONS } from './m2/decisions';
import { M2_SITETASKS } from './m2/sitetasks';
import { M2_L7, M2_L7_CARDS, M2_L7_QUESTIONS, M2_P7, M2_T7 } from './m2/lesson-sia';
import type { Card, FeynmanTask, Lesson, PracticeTask, Question, Scenario, SiteTask } from './types';

export { MODULES, TOPICS, LEVEL_LABEL, LEVEL_SHORT } from './modules';
export { SOURCES, SOURCE_KIND_LABEL, REVIEW_LABEL } from './sources';
export { GLOSSARY } from './glossary';
export { LIBRARY, LIB_CATEGORY_LABEL } from './library';
export { SCENARIOS, CRITERION_LABEL } from './m2/scenarios';

// Neue Module: hier ihre Datensätze anhängen.
export const QUESTIONS: Question[] = [...M2_QUESTIONS, ...M2_DECISIONS, ...M2_L7_QUESTIONS];
export const CARDS: Card[] = [...M2_CARDS, ...M2_L7_CARDS];
export const LESSONS: Lesson[] = [...M2_LESSONS, M2_L7].sort((a, b) => a.order - b.order);
export const TASKS: PracticeTask[] = [...M2_TASKS, M2_P7];
export const FEYNMAN: FeynmanTask[] = [...M2_FEYNMAN];
export const SITETASKS: SiteTask[] = [...M2_SITETASKS, M2_T7];

const byId = <T extends { id: string }>(arr: T[]) => new Map(arr.map((x) => [x.id, x] as const));
export const Q = byId(QUESTIONS);
export const C = byId(CARDS);
export const L = byId(LESSONS);
export const T = byId(TASKS);
export const F = byId(FEYNMAN);
export const S = byId<Scenario>(SCENARIOS);
export const ST = byId(SITETASKS);
