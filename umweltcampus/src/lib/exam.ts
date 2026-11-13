import { MODULES, QUESTIONS } from '../content';
import type { Question } from '../content/types';

export type ExamKind = 'check' | 'modul' | 'offen' | 'mix';

/** Deterministischer Zufall (für Tests reproduzierbar). */
export function rng(seed: number) {
  let x = seed >>> 0 || 1;
  return () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >> 17;
    x ^= x << 5; x >>>= 0;
    return x / 4294967296;
  };
}

export function shuffle<T>(arr: T[], r: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Prüfung zusammenstellen.
 *  - check: 6 geschlossene Fragen, gemischt (Interleaving)
 *  - modul: 16 geschlossene Fragen, nach Stufen geschichtet, + 2 offene Fachfragen
 *  - offen: 2 offene Fragen (Fall- und Beratungsfragen)
 */
export function buildExam(kind: ExamKind, moduleId: string, seed = Date.now()): Question[] {
  const r = rng(seed);
  if (kind === 'mix') {
    // Gemischte Prüfung: 6 geschlossene Fragen je verfügbares Modul, Themen abwechselnd
    const mods = MODULES.filter((m) => m.status === 'verfuegbar').map((m) => m.id);
    const picked = mods.flatMap((m) => shuffle(QUESTIONS.filter((q) => q.moduleId === m && q.type !== 'open'), r).slice(0, 6));
    return interleave(shuffle(picked, r));
  }
  const pool = QUESTIONS.filter((q) => q.moduleId === moduleId);
  const closed = pool.filter((q) => q.type !== 'open');
  const open = pool.filter((q) => q.type === 'open');
  if (kind === 'check') return interleave(shuffle(closed, r).slice(0, 6));
  if (kind === 'offen') return shuffle(open, r).slice(0, 2);
  const per: Record<number, number> = { 1: 4, 2: 6, 3: 4, 4: 2 };
  let picked: Question[] = [];
  for (const lvl of [1, 2, 3, 4]) picked.push(...shuffle(closed.filter((q) => q.level === lvl), r).slice(0, per[lvl]));
  if (picked.length < 16) picked.push(...shuffle(closed.filter((q) => !picked.includes(q)), r).slice(0, 16 - picked.length));
  picked = interleave(shuffle(picked, r));
  return [...picked, ...shuffle(open, r).slice(0, 2)];
}

/** Gleiches Thema möglichst nicht zweimal hintereinander. */
export function interleave<T extends { topic: string }>(qs: T[]): T[] {
  const rest = [...qs];
  const out: T[] = [];
  while (rest.length) {
    const prev = out[out.length - 1]?.topic;
    const i = rest.findIndex((q) => q.topic !== prev);
    out.push(rest.splice(i === -1 ? 0 : i, 1)[0]);
  }
  return out;
}

export const PASS = { modul: 0.75, open: 0.5, check: 0.7 };
