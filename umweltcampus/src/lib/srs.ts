import type { Confidence, SRItem } from './state';

// Spaced Repetition (angelehnt an SM-2), nachvollziehbar gehalten:
//  - Bewertung aus Richtigkeit UND Sicherheit:
//      falsch            -> Note 1 (sicher falsch: Note 0 = «gefährlicher Irrtum»)
//      richtig, unsicher -> Note 3  (kurzes Intervall, Wissen noch wackelig)
//      richtig, eher sicher -> Note 4
//      richtig, sicher   -> Note 5
//  - Intervall: 1 Tag, 3 Tage, dann bisheriges Intervall × Leichtigkeit.
//  - Zeit seit letzter Wiederholung zählt: Wer nach langer Pause noch richtig
//    antwortet, erhält ein Intervall auf Basis der tatsächlich vergangenen Zeit.
//  - Falsch: Intervall zurück auf 1 Tag, Leichtigkeit sinkt.

export const DAY = 86_400_000;

export function grade(correct: boolean, conf: Confidence | undefined): number {
  if (!correct) return conf === 3 ? 0 : 1;
  if (conf === 1) return 3;
  if (conf === 2) return 4;
  return conf === 3 ? 5 : 4;
}

export function newItem(now: number): SRItem {
  return { ease: 2.5, interval: 0, due: now, reps: 0, lapses: 0, last: 0 };
}

export function review(prev: SRItem | undefined, g: number, now: number): SRItem {
  const it = prev ? { ...prev } : newItem(now);
  const elapsedDays = it.last ? Math.max(0, (now - it.last) / DAY) : 0;
  // Leichtigkeit nach SM-2, begrenzt
  it.ease = Math.min(3.0, Math.max(1.3, it.ease + (0.1 - (5 - g) * (0.08 + (5 - g) * 0.02))));
  if (g < 3) {
    it.reps = 0;
    it.lapses += 1;
    it.interval = 1;
  } else {
    it.reps += 1;
    if (it.reps === 1) it.interval = g === 3 ? 1 : 2;
    else if (it.reps === 2) it.interval = g === 3 ? 3 : 6;
    else {
      const basis = Math.max(it.interval, elapsedDays);
      const factor = g === 3 ? 1.2 : it.ease;
      it.interval = Math.round(basis * factor);
    }
    it.interval = Math.min(it.interval, 180);
  }
  it.last = now;
  it.due = now + it.interval * DAY;
  return it;
}

/** Wie stark überfällig (≥1 = fällig). */
export function overdueRatio(it: SRItem, now: number): number {
  if (!it.last) return 1;
  const span = Math.max(1, it.interval) * DAY;
  return (now - it.last) / span;
}

export const isDue = (it: SRItem | undefined, now: number) => !!it && it.due <= now;
