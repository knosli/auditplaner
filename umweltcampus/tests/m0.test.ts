// Modul 0 «Grundlagen auffrischen» und Einstufungstest.
import { describe, expect, test } from 'vitest';
import { CARDS, LESSONS, MODULES, PLACEMENT, Q, QUESTIONS, TOPICS } from '../src/content';
import { buildExam } from '../src/lib/exam';
import { continueLesson, moduleRequirements, placementSkip, recommendations } from '../src/lib/learning';
import { emptyState, normalizeState } from '../src/lib/state';

const ls = LESSONS.filter((l) => l.moduleId === 'm0');

describe('Modul 0: Umfang und Format', () => {
  test('verfügbar, steht im Lernpfad vor allen Fachmodulen', () => {
    const m = MODULES.find((x) => x.id === 'm0')!;
    expect(m.status).toBe('verfuegbar');
    expect(Math.min(...MODULES.map((x) => x.pathOrder))).toBe(m.pathOrder);
    expect(LESSONS[0].moduleId).toBe('m0');
  });
  test('sieben kurze Auffrischungslektionen, Stufe 1, Prüfstatus Entwurf', () => {
    expect(ls.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    for (const l of ls) {
      expect(l.format, l.id).toBe('auffrischung');
      expect(l.level).toBe(1);
      expect(l.minutes).toBeLessThanOrEqual(15);
      expect(l.review).toBe('entwurf');
      const summary = l.steps.find((s) => s.kind === 'summary') as { points: string[] };
      expect(summary.points.some((p) => /Vertieft in Modul/.test(p)), `${l.id}: Verweis auf Fachmodul`).toBe(true);
    }
  });
  test('Fragen: 42 geschlossene, 2 offene, jedes Thema auf zwei Stufen, Karten vorhanden', () => {
    const qs = QUESTIONS.filter((q) => q.moduleId === 'm0');
    expect(qs.filter((q) => q.type !== 'open').length).toBe(42);
    expect(qs.filter((q) => q.type === 'open').length).toBe(2);
    for (const t of TOPICS.filter((x) => x.moduleId === 'm0')) expect(new Set(qs.filter((q) => q.topic === t.id).map((q) => q.level)).size, t.id).toBeGreaterThanOrEqual(2);
    expect(CARDS.filter((c) => c.moduleId === 'm0').length).toBeGreaterThanOrEqual(15);
  });
  test('richtige Antworten gleichmässig auf a–d verteilt (kein «immer b»)', () => {
    const n: Record<string, number> = {};
    for (const q of QUESTIONS.filter((x) => x.moduleId === 'm0' && x.type === 'single')) n[q.correct![0]] = (n[q.correct![0]] ?? 0) + 1;
    for (const k of ['a', 'b', 'c', 'd']) expect(n[k], k).toBeGreaterThanOrEqual(8);
  });
  test('Abschlusstest: 16 geschlossene + 2 offene aus Modul 0', () => {
    const qs = buildExam('modul', 'm0', 7);
    expect(qs.every((q) => q.moduleId === 'm0')).toBe(true);
    expect(qs.filter((q) => q.type !== 'open').length).toBe(16);
    expect(qs.filter((q) => q.type === 'open').length).toBe(2);
  });
});

describe('Einstufungstest', () => {
  test('je Grundlagen-Lektion zwei eindeutige Grundwissen-Fragen', () => {
    expect(PLACEMENT.map((p) => p.lessonId)).toEqual(ls.map((l) => l.id));
    const ids = PLACEMENT.flatMap((p) => p.questionIds);
    expect(new Set(ids).size).toBe(14);
    for (const id of ids) {
      const q = Q.get(id)!;
      expect(q.moduleId).toBe('m0');
      expect(q.type).toBe('single');
      expect(q.level).toBe(1);
    }
  });
  test('neuer Lernstand: Einstufung wird zuerst empfohlen', () => {
    const r = recommendations(emptyState());
    expect(r[0].kind).toBe('einstufung');
    expect(r[0].href).toBe('#einstufung');
  });
  test('sichere Grundlagen (2/2) werden übersprungen, nicht als abgeschlossen verbucht', () => {
    const s = emptyState();
    s.placement = { at: 1, res: { 'm0-l1': 2, 'm0-l2': 2, 'm0-l3': 1, 'm0-l4': 0, 'm0-l5': 2, 'm0-l6': 2, 'm0-l7': 2 } };
    expect(placementSkip(s, 'm0-l1')).toBe(true);
    expect(placementSkip(s, 'm0-l3')).toBe(false);
    expect(continueLesson(s)!.lesson.id).toBe('m0-l3');
    expect(s.lessons['m0-l1']).toBeUndefined();
    const req = moduleRequirements(s, 'm0');
    expect(req[0].done).toBe(true);
    expect(req[1].detail).toBe('5 von 7');
    expect(req[2].done).toBe(false);
  });
  test('alle Grundlagen sicher: Empfehlung geht zu den Fachmodulen', () => {
    const s = emptyState();
    s.placement = { at: 1, res: Object.fromEntries(ls.map((l) => [l.id, 2])) };
    expect(continueLesson(s)!.lesson.moduleId).not.toBe('m0');
  });
  test('Lernstand: Ergebnis bleibt beim Laden erhalten, ungültige Einträge werden verworfen', () => {
    const b = emptyState();
    const ok = normalizeState({ ...b, placement: { at: 5, res: { 'm0-l1': 2, 'm2-l1': 2, 'm0-l2': 7 } } });
    expect(ok.placement).toEqual({ at: 5, res: { 'm0-l1': 2 } });
    expect(normalizeState({ ...b, placement: 'x' }).placement).toBeUndefined();
    expect(normalizeState(b).placement).toBeUndefined();
  });
});

describe('Antworten gemischt anzeigen', () => {
  test('stabil je Person und Frage, unterschiedlich zwischen Personen, IDs bleiben erhalten', async () => {
    const { displayOrder } = await import('../src/lib/exam');
    const opts = ['a', 'b', 'c', 'd'].map((id) => ({ id }));
    const one = displayOrder(opts, 'm5-q01', 111).map((o) => o.id).join('');
    expect(displayOrder(opts, 'm5-q01', 111).map((o) => o.id).join('')).toBe(one);
    expect([...one].sort().join('')).toBe('abcd');
    // Über viele Fragen landet die ursprünglich zweite Antwort nicht fast immer an Position 2
    let atB = 0;
    for (let i = 0; i < 400; i++) if (displayOrder(opts, 'q' + i, 111)[1].id === 'b') atB++;
    expect(atB).toBeLessThan(160);
    const others = new Set(Array.from({ length: 20 }, (_, k) => displayOrder(opts, 'm5-q01', k).map((o) => o.id).join('')));
    expect(others.size).toBeGreaterThan(5);
  });
});
