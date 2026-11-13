// Modul 1 und modulübergreifende Funktionen.
import { LESSONS, MODULES, QUESTIONS, S, SCENARIOS, TOPICS, CARDS, TASKS, SITETASKS, FEYNMAN } from '../src/content';
import { buildExam } from '../src/lib/exam';
import { evaluateRank, evaluateStage } from '../src/lib/scenario';
import { emptyState, normalizeState } from '../src/lib/state';
import { moduleRequirements, recommendations, topicCompetence } from '../src/lib/learning';

describe('Modul 1: Umfang und Struktur', () => {
  test('Modul 1 ist verfügbar und hat 6 Lektionen in Reihenfolge', () => {
    expect(MODULES.find((m) => m.id === 'm1')!.status).toBe('verfuegbar');
    const ls = LESSONS.filter((l) => l.moduleId === 'm1');
    expect(ls.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test('Lernpfad: Modul 2 vor Modul 1 (Pfadreihenfolge)', () => {
    const firstM1 = LESSONS.findIndex((l) => l.moduleId === 'm1');
    const lastM2 = LESSONS.map((l) => l.moduleId).lastIndexOf('m2');
    expect(lastM2).toBeLessThan(firstM1);
  });
  test('Fragenpool, Karten, Aufgaben, Fall vorhanden', () => {
    const qs = QUESTIONS.filter((q) => q.moduleId === 'm1');
    expect(qs.length).toBeGreaterThanOrEqual(35);
    expect(qs.filter((q) => q.type === 'open').length).toBeGreaterThanOrEqual(2);
    expect(qs.filter((q) => q.type === 'best').length).toBe(6);
    expect(CARDS.filter((c) => c.moduleId === 'm1').length).toBeGreaterThanOrEqual(15);
    expect(TASKS.filter((t) => t.moduleId === 'm1').length).toBe(6);
    expect(SITETASKS.filter((t) => t.moduleId === 'm1').length).toBe(6);
    expect(FEYNMAN.filter((f) => f.moduleId === 'm1').length).toBe(2);
    expect(SCENARIOS.some((x) => x.moduleId === 'm1' && x.status === 'verfuegbar')).toBe(true);
  });
  test('jedes Thema von Modul 1 hat Fragen auf mindestens zwei Stufen', () => {
    for (const t of TOPICS.filter((x) => x.moduleId === 'm1')) {
      const levels = new Set(QUESTIONS.filter((q) => q.topic === t.id).map((q) => q.level));
      expect(levels.size, t.id).toBeGreaterThanOrEqual(2);
    }
  });
  test('alle Fragen von Modul 1 tragen Bewertungsfassung 3', () => {
    for (const q of QUESTIONS.filter((x) => x.moduleId === 'm1')) expect([3, 4]).toContain(q.rev);
  });
});

describe('Fall F: Behördenkontrolle', () => {
  const sc = S.get('sim-f')!;
  const st = (id: string) => sc.stages.find((x) => x.id === id)!;
  test('Mängel vor der Kontrolle verstecken ist kritisch', () => {
    expect(evaluateStage(st('f1'), { stageId: 'f1', selected: ['o3'] })).toMatchObject({ score: 0, critical: true });
  });
  test('Bagger trotz Feststellung weiterlaufen lassen ist kritisch, auch zusammen mit guten Massnahmen', () => {
    expect(evaluateStage(st('f3'), { stageId: 'f3', selected: ['m1', 'm2', 'm3', 'm4', 'm5'] })).toMatchObject({ score: 0, critical: true });
    expect(evaluateStage(st('f3'), { stageId: 'f3', selected: ['m1', 'm2', 'm3', 'm4'] }).score).toBe(1);
  });
  test('Nachbereitung: Analyse und Stellungnahme parallel, Behebung zuerst', () => {
    expect(evaluateRank(st('f5'), ['n1', 'n3', 'n2', 'n4', 'n5'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st('f5'), ['n2', 'n1', 'n3', 'n4', 'n5']).critical).toBe(true);
  });
});

describe('Modulübergreifend', () => {
  test('Modulprüfung Modul 1: 16 geschlossene + 2 offene Fragen, nur aus Modul 1', () => {
    const qs = buildExam('modul', 'm1', 7);
    expect(qs.every((q) => q.moduleId === 'm1')).toBe(true);
    expect(qs.filter((q) => q.type !== 'open').length).toBe(16);
    expect(qs.filter((q) => q.type === 'open').length).toBe(2);
  });
  test('Gemischte Prüfung: Fragen aus allen verfügbaren Modulen, nur geschlossene', () => {
    const qs = buildExam('mix', 'mix', 11);
    const mods = new Set(qs.map((q) => q.moduleId));
    expect(mods).toEqual(new Set(MODULES.filter((m) => m.status === 'verfuegbar').map((m) => m.id)));
    expect(qs.every((q) => q.type !== 'open')).toBe(true);
  });
  test('Modulanforderungen sind je Modul getrennt', () => {
    const s = emptyState();
    s.exams.push({ id: 'x', kind: 'modul', moduleId: 'm2', at: 1, score: 0.9, total: 18, byTopic: {}, passed: true, v: 3 });
    expect(moduleRequirements(s, 'm2').find((r) => r.label.startsWith('Modulprüfung'))!.done).toBe(true);
    expect(moduleRequirements(s, 'm1').find((r) => r.label.startsWith('Modulprüfung'))!.done).toBe(false);
  });
  test('Kompetenz enthält die Themen beider Module', () => {
    const t = topicCompetence(emptyState()).map((x) => x.moduleId);
    expect(t).toContain('m1');
    expect(t).toContain('m2');
  });
  test('Empfehlung für neuen Stand verweist auf die erste Lektion im Lernpfad', () => {
    const recs = recommendations(emptyState());
    expect(recs.find((r) => r.kind === 'lektion')!.href).toBe('#lektion-m2-l1');
  });
  test('bestehender Lernstand bleibt mit neuem Modul gültig', () => {
    const s = normalizeState({ version: 3, lessons: { 'm2-l1': { cur: 'm2-l1-deep', seen: ['m2-l1-deep'], startedAt: 1, answers: {}, open: {} } } });
    expect(s.lessons['m2-l1'].cur).toBe('m2-l1-deep');
  });
});
