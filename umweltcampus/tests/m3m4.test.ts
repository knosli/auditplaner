// Module 3 (Bauabfälle) und 4 (Bodenschutz).
import { CARDS, FEYNMAN, LESSONS, MODULES, QUESTIONS, S, SCENARIOS, SITETASKS, TASKS, TOPICS } from '../src/content';
import { buildExam } from '../src/lib/exam';
import { evaluateRank, evaluateStage } from '../src/lib/scenario';
import { scoreQuestion } from '../src/lib/learning';
import { emptyState, normalizeState } from '../src/lib/state';
import { isLegacyAnswer, isLegacyExam, isLegacyRun } from '../src/lib/versioning';
import { moduleRequirements } from '../src/lib/learning';

for (const mod of ['m3', 'm4', 'm8']) {
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
      expect(SCENARIOS.some((x) => x.moduleId === mod && x.status === 'verfuegbar' && (x.rev ?? 0) >= 3)).toBe(true);
    });
    test('jedes Thema hat Fragen auf mindestens zwei Stufen', () => {
      for (const t of TOPICS.filter((x) => x.moduleId === mod)) {
        expect(new Set(QUESTIONS.filter((q) => q.topic === t.id).map((q) => q.level)).size, t.id).toBeGreaterThanOrEqual(2);
      }
    });
    test('alle Fragen tragen Bewertungsfassung 3 oder 4', () => {
      for (const q of QUESTIONS.filter((x) => x.moduleId === mod)) expect([3, 4]).toContain(q.rev);
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
    expect(text('m3')).toContain('31.12.2027');
    expect(text('m3')).toContain('31.12.2025');
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
  test('Bewertungsfassung 4: mit Maske weiterarbeiten ist kritisch (0 Punkte)', () => {
    expect(evaluateStage(st('g1'), { stageId: 'g1', selected: ['o3'] })).toMatchObject({ score: 0, critical: true });
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
  test('Bewertungsfassung 4: Raupenbagger ohne neue Freigabe ist kritisch (0 Punkte)', () => {
    expect(evaluateStage(st('h1'), { stageId: 'h1', selected: ['o3'] })).toMatchObject({ score: 0, critical: true });
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

describe('Bewertungsfassung 4 (externe Prüfung 13.11.2026)', () => {
  const w = (qid: string, oid: string) => QUESTIONS.find((q) => q.id === qid)!.options!.find((o) => o.id === oid)!.weight;
  test('Teilpunkte gestrichen bzw. herabgesetzt', () => {
    expect(w('m4-d01', 'c')).toBe(0); // Ober-/Unterboden mischen
    expect(w('m3-d05', 'c')).toBe(0); // Ausbau ohne Auftrag/Freigaben
    expect(w('m3-d03', 'c')).toBe(0.25); // Schnelltest nur Vorselektion
    for (const id of ['m4-d01', 'm3-d05', 'm3-d03']) expect(QUESTIONS.find((q) => q.id === id)!.rev).toBe(4);
    expect(S.get('sim-g')!.rev).toBe(4);
    expect(S.get('sim-h')!.rev).toBe(4);
  });
  test('frühere Ergebnisse zu neu gewichteten Inhalten gelten als frühere Fassung, andere bleiben gültig', () => {
    const s = normalizeState({ version: 3,
      answers: [
        { q: 'm4-d01', at: 1, score: 0.5, correct: false, ctx: 'lektion', v: 3 },
        { q: 'm4-d02', at: 1, score: 1, correct: true, ctx: 'lektion', v: 3 },
        { q: 'm4-d01', at: 2, score: 1, correct: true, ctx: 'lektion', v: 4 },
      ],
      scenarios: { 'sim-g': [{ at: 1, total: 0.8, byCriterion: {}, critical: 0, path: [], passed: true, v: 3 }], 'sim-f': [{ at: 1, total: 0.8, byCriterion: {}, critical: 0, path: [], passed: true, v: 3 }] },
      exams: [{ id: 'e', kind: 'modul', moduleId: 'm4', at: 1, score: 0.9, total: 18, byTopic: {}, passed: true, v: 3 }, { id: 'f', kind: 'modul', moduleId: 'm1', at: 1, score: 0.9, total: 18, byTopic: {}, passed: true, v: 3 }],
    });
    expect(s.answers.map(isLegacyAnswer)).toEqual([true, false, false]);
    expect(isLegacyRun('sim-g', s.scenarios['sim-g'][0])).toBe(true);
    expect(isLegacyRun('sim-f', s.scenarios['sim-f'][0])).toBe(false);
    expect(s.exams.map(isLegacyExam)).toEqual([true, false]);
    expect(s.answers[0].score).toBe(0.5); // nicht still neu benotet
  });
});

describe('Rechtsstand-Korrekturen', () => {
  const all = (mod: string) => JSON.stringify([...LESSONS, ...QUESTIONS].filter((x) => x.moduleId === mod));
  test('Art. 18 VVEA nur mit Voraussetzungen', () => expect(all('m4')).toContain('sofern'));
  test('USG-Revision: in Kraft seit 1.1.2025', () => expect(all('m3')).toContain('1. Januar 2025'));
  test('Art. 102 StGB Abs. 2 unterschieden', () => expect(all('m1')).toContain('Abs. 2'));
});

describe('Modul 8: Planung und AVOR', () => {
  const st = (id: string) => S.get('sim-d')!.stages.find((x) => x.id === id)!;
  test('Fall D ersetzt den Platzhalter (stabile ID sim-d, nur einmal vorhanden)', () => {
    expect(SCENARIOS.filter((x) => x.id === 'sim-d').length).toBe(1);
    expect(S.get('sim-d')!.moduleId).toBe('m8');
    expect(S.get('sim-d')!.status).toBe('verfuegbar');
  });
  test('Rückbau parallel zur nicht gemeldeten Asbestsanierung ist kritisch', () => {
    expect(evaluateStage(st('d1'), { stageId: 'd1', selected: ['o2'] })).toMatchObject({ score: 0, critical: true });
  });
  test('Zementwasser in den Meteorschacht ist kritisch', () => {
    expect(evaluateStage(st('d5'), { stageId: 'd5', selected: ['r2'] })).toMatchObject({ score: 0, critical: true });
  });
  test('Lücken nicht sofort melden ist kritisch', () => {
    expect(evaluateRank(st('d4'), ['n2', 'n3', 'n1', 'n4', 'n5']).critical).toBe(true);
    expect(evaluateRank(st('d4'), ['n2', 'n1', 'n3', 'n4', 'n5'])).toMatchObject({ score: 1, critical: false });
  });
  test('Fachaussagen: Auflage gilt auch ohne LV-Position; keine Einleitung ohne Zustimmung', () => {
    expect(QUESTIONS.find((q) => q.id === 'm8-q07')!.correct).toEqual(['b']);
    const d1 = QUESTIONS.find((q) => q.id === 'm8-d01')!;
    expect(d1.options!.find((o) => o.id === 'c')!.critical).toBe(true);
  });
});
