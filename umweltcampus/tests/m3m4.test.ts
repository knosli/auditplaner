// Module 3 (Bauabfälle) und 4 (Bodenschutz).
import { CARDS, FEYNMAN, LESSONS, MODULES, QUESTIONS, S, SCENARIOS, SITETASKS, TASKS, TOPICS } from '../src/content';
import { buildExam } from '../src/lib/exam';
import { evaluateRank, evaluateStage } from '../src/lib/scenario';
import { scoreQuestion } from '../src/lib/learning';
import { emptyState, normalizeState } from '../src/lib/state';
import { moduleRequirements } from '../src/lib/learning';

for (const mod of ['m3', 'm4']) {
  describe(`Modul ${mod}: Umfang und Struktur`, () => {
    test('verfügbar, 5 Lektionen in Reihenfolge', () => {
      expect(MODULES.find((m) => m.id === mod)!.status).toBe('verfuegbar');
      expect(LESSONS.filter((l) => l.moduleId === mod).map((l) => l.order)).toEqual([1, 2, 3, 4, 5]);
    });
    test('Fragenpool, Karten, Aufgaben, Fall vorhanden', () => {
      const qs = QUESTIONS.filter((q) => q.moduleId === mod);
      expect(qs.length).toBeGreaterThanOrEqual(35);
      expect(qs.filter((q) => q.type === 'open').length).toBeGreaterThanOrEqual(2);
      expect(qs.filter((q) => q.type === 'best').length).toBe(5);
      expect(CARDS.filter((c) => c.moduleId === mod).length).toBeGreaterThanOrEqual(15);
      expect(TASKS.filter((t) => t.moduleId === mod).length).toBe(5);
      expect(SITETASKS.filter((t) => t.moduleId === mod).length).toBe(5);
      expect(FEYNMAN.filter((f) => f.moduleId === mod).length).toBe(2);
      expect(SCENARIOS.some((x) => x.moduleId === mod && x.status === 'verfuegbar' && x.rev === 3)).toBe(true);
    });
    test('jedes Thema hat Fragen auf mindestens zwei Stufen', () => {
      for (const t of TOPICS.filter((x) => x.moduleId === mod)) {
        expect(new Set(QUESTIONS.filter((q) => q.topic === t.id).map((q) => q.level)).size, t.id).toBeGreaterThanOrEqual(2);
      }
    });
    test('alle Fragen tragen Bewertungsfassung 3', () => {
      for (const q of QUESTIONS.filter((x) => x.moduleId === mod)) expect(q.rev, q.id).toBe(3);
    });
    test('kritische Optionen geben 0 Punkte', () => {
      for (const q of QUESTIONS.filter((x) => x.moduleId === mod && x.type === 'best')) {
        for (const o of q.options!.filter((o) => o.critical)) expect(scoreQuestion(q, [o.id]), `${q.id}/${o.id}`).toBe(0);
      }
    });
    test('Modulprüfung: 16 geschlossene + 2 offene, nur aus dem Modul', () => {
      const qs = buildExam('modul', mod, 3);
      expect(qs.every((q) => q.moduleId === mod)).toBe(true);
      expect(qs.filter((q) => q.type !== 'open').length).toBe(16);
      expect(qs.filter((q) => q.type === 'open').length).toBe(2);
    });
    test('Modulanforderungen erreichbar (Fall vorhanden)', () => {
      const r = moduleRequirements(emptyState(), mod);
      expect(r.length).toBeGreaterThan(0);
      expect(r.every((x) => !x.done)).toBe(true);
    });
  });
}

describe('Fachliche Kernaussagen (Regressionen)', () => {
  const text = (mod: string) => JSON.stringify(LESSONS.filter((l) => l.moduleId === mod));
  test('Modul 3: PAK-Grenze 250 mg/kg und Fristen-Vorbehalt', () => {
    expect(text('m3')).toContain('250 mg');
    expect(text('m3')).toContain('Fedlex prüfen');
  });
  test('Modul 3: Asbest nur durch Suva-anerkannte Unternehmen, Meldung 14 Tage', () => {
    expect(text('m3')).toContain('Suva-anerkannte');
    expect(text('m3')).toContain('14 Tage');
  });
  test('Modul 4: keine erfundenen Saugspannungs-Zahlen (cbar/kPa)', () => {
    expect(text('m4')).not.toMatch(/\d+\s*(cbar|kPa|hPa)/);
  });
  test('Modul 4: Freigabe bleibt bei der Fachperson', () => {
    expect(QUESTIONS.find((q) => q.id === 'm4-q27')!.correct).toEqual(['b']);
  });
});

describe('Fall G: Asbest beim Rückbau', () => {
  const st = (id: string) => S.get('sim-g')!.stages.find((x) => x.id === id)!;
  test('Weiterarbeiten und Mischmulde ist kritisch', () => {
    expect(evaluateStage(st('g1'), { stageId: 'g1', selected: ['o2'] })).toMatchObject({ score: 0, critical: true });
  });
  test('trocken zusammenwischen ist kritisch, auch mit guten Massnahmen', () => {
    expect(evaluateStage(st('g3'), { stageId: 'g3', selected: ['m1', 'm2', 'm3', 'm4', 'm5'] })).toMatchObject({ score: 0, critical: true });
    expect(evaluateStage(st('g3'), { stageId: 'g3', selected: ['m1', 'm2', 'm3', 'm4'] }).score).toBe(1);
  });
  test('Freigabe vor Entkernung; Untersuchung und Meldung parallel', () => {
    expect(evaluateRank(st('g5'), ['n2', 'n1', 'n3', 'n4', 'n5'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st('g5'), ['n1', 'n2', 'n4', 'n5', 'n3']).critical).toBe(true);
  });
});

describe('Fall H: Regenwoche', () => {
  const st = (id: string) => S.get('sim-h')!.stages.find((x) => x.id === id)!;
  test('alte Freigabe nach Regen nutzen ist kritisch', () => {
    expect(evaluateStage(st('h1'), { stageId: 'h1', selected: ['o2'] })).toMatchObject({ score: 0, critical: true });
  });
  test('auf dem Acker wenden ist kritisch', () => {
    expect(evaluateStage(st('h3'), { stageId: 'h3', selected: ['m1', 'm2', 'm3', 'm4', 'm5'] }).critical).toBe(true);
  });
  test('neue Freigabe kommt vor den Bodenarbeiten', () => {
    expect(evaluateRank(st('h5'), ['n5', 'n1', 'n2', 'n3', 'n4'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st('h5'), ['n2', 'n3', 'n1', 'n4', 'n5']).critical).toBe(true);
  });
});

describe('Bestehende Lernstände', () => {
  test('Stand mit Modul-1/2-Fortschritt bleibt unverändert gültig', () => {
    const s = normalizeState({ version: 3, lessons: { 'm1-l1': { cur: 'm1-l1-deep', seen: ['m1-l1-deep'], startedAt: 1, answers: {}, open: {} } }, answers: [{ q: 'm2-q01', at: 1, score: 1, correct: true, ctx: 'lektion', v: 3 }] });
    expect(s.lessons['m1-l1'].cur).toBe('m1-l1-deep');
    expect(s.answers).toHaveLength(1);
  });
});
