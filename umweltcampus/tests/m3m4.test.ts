// Module 3 (Bauabfälle) und 4 (Bodenschutz).
import { CARDS, FEYNMAN, LESSONS, MODULES, QUESTIONS, S, SCENARIOS, SITETASKS, TASKS, TOPICS } from '../src/content';
import { buildExam } from '../src/lib/exam';
import { evaluateRank, evaluateStage } from '../src/lib/scenario';
import { scoreQuestion } from '../src/lib/learning';
import { emptyState, normalizeState } from '../src/lib/state';
import { isLegacyAnswer, isLegacyExam, isLegacyRun } from '../src/lib/versioning';
import { moduleRequirements } from '../src/lib/learning';

for (const mod of ['m3', 'm4', 'm8', 'm9', 'm10']) {
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
    test('alle Fragen tragen eine gültige Bewertungsfassung', () => {
      for (const q of QUESTIONS.filter((x) => x.moduleId === mod)) expect(mod === 'm9' || mod === 'm10' ? [5] : mod === 'm8' ? [4, 5] : [3, 4]).toContain(q.rev);
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
    expect(evaluateRank(st('d4'), ['n2', 'n3', 'n1', 'n4', 'n6', 'n5']).critical).toBe(true);
    expect(evaluateRank(st('d4'), ['n2', 'n1', 'n3', 'n4', 'n6', 'n5'])).toMatchObject({ score: 1, critical: false });
  });
  test('Fassung 5: Freigabekette – Rückbau vor Meldung, Sanierung oder Freigabe ist ein No-Go', () => {
    const all = ['n1', 'n2', 'n3', 'n4', 'n6', 'n5'];
    // jede Reihenfolge, in der der Rückbau (n5) nicht am Schluss steht, ist kritisch
    for (let pos = 0; pos < 5; pos++) {
      const rest = all.filter((x) => x !== 'n5');
      const order = [...rest.slice(0, pos), 'n5', ...rest.slice(pos)];
      if (order[5] === 'n2') continue; // nur Planungsschritt nach dem Rückbau – kein Glied der Freigabekette
      expect(evaluateRank(st('d4'), order).critical, order.join()).toBe(true);
    }
    expect(evaluateRank(st('d4'), ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'])).toMatchObject({ critical: true });
    expect(evaluateRank(st('d4'), ['n1', 'n2', 'n3', 'n4', 'n5', 'n6']).score).toBeLessThanOrEqual(0.25);
  });
  test('Fassung 5: Gewichte der Abwägungen (keine Punkte für fehlende Schutzwirkung oder Intransparenz)', () => {
    const w = (qid: string, oid: string) => QUESTIONS.find((q) => q.id === qid)!.options!.find((o) => o.id === oid)!.weight;
    expect(w('m8-d03', 'c')).toBe(0); // Erdwall statt Fassung und Behandlung
    expect(w('m8-d05', 'c')).toBe(0); // Kosten auf andere Positionen verschieben
    expect(w('m8-d02', 'c')).toBe(0);
    expect(w('m8-d02', 'b')).toBe(1);
    expect(w('m8-d02', 'd')).toBe(0.75); // Pflichtmassnahme gesichert, aber ohne Anzeige
  });
  test('Fassung 5: Vertragsrecht – kein automatischer Nachtrag, Vorbehalt kein Standard', () => {
    const l2 = JSON.stringify(LESSONS.find((l) => l.id === 'm8-l2'));
    expect(l2).toContain('nicht automatisch');
    expect(l2).toContain('vier Fälle');
    expect(l2).not.toContain('Der Nachtrag ist unbestritten');
    expect(QUESTIONS.find((q) => q.id === 'm8-q08')!.options!.find((o) => o.id === 'b')!.text).toContain('nur nach vergabe- und vertragsrechtlicher Prüfung');
    expect(JSON.stringify(SITETASKS.find((x) => x.id === 'm8-t2'))).toContain('keine sichere Lösung');
  });
  test('Fassung 5: Asbest nur für Arbeiten mit erheblicher Faserfreisetzung pauschalisiert', () => {
    expect(JSON.stringify(LESSONS.find((l) => l.id === 'm8-l4'))).toContain('erheblicher Faserfreisetzung');
    expect(CARDS.find((c) => c.id === 'm8-c13')!.back).toContain('erheblicher Faserfreisetzung');
  });
  test('Fassung 5: geänderte Inhalte tragen rev 5; frühere Ergebnisse gelten als frühere Fassung, neue nicht', () => {
    for (const id of ['m8-q08', 'm8-q17', 'm8-q22', 'm8-d02', 'm8-d03', 'm8-d05']) expect(QUESTIONS.find((q) => q.id === id)!.rev, id).toBe(5);
    expect(S.get('sim-d')!.rev).toBe(5);
    const mk = (v: number) => ({ q: 'm8-d02', at: 1, score: 1, correct: true, conf: 2, ctx: 'lesson', v }) as never;
    expect(isLegacyAnswer(mk(4))).toBe(true);
    expect(isLegacyAnswer(mk(5))).toBe(false);
    expect(isLegacyAnswer({ q: 'm8-q01', at: 1, score: 1, correct: true, conf: 2, ctx: 'lesson', v: 4 } as never)).toBe(false);
    expect(isLegacyAnswer({ q: 'm4-d01', at: 1, score: 1, correct: true, conf: 2, ctx: 'lesson', v: 4 } as never)).toBe(false);
    const run = (v: number) => ({ at: 1, total: 1, objective: 1, byCriterion: {}, critical: 0, path: [], passed: true, v }) as never;
    expect(isLegacyRun('sim-d', run(4))).toBe(true);
    expect(isLegacyRun('sim-d', run(5))).toBe(false);
    expect(isLegacyRun('sim-h', run(4))).toBe(false);
    const ex = (moduleId: string, v: number) => ({ id: 'x', kind: 'modul', moduleId, at: 1, score: 1, total: 1, byTopic: {}, passed: true, v }) as never;
    expect(isLegacyExam(ex('m8', 4))).toBe(true);
    expect(isLegacyExam(ex('m8', 5))).toBe(false);
    expect(isLegacyExam(ex('m3', 4))).toBe(false);
  });
  test('Prüfstatus bleibt Entwurf', () => {
    for (const l of LESSONS.filter((x) => x.moduleId === 'm8')) expect(l.review).toBe('entwurf');
    for (const q of QUESTIONS.filter((x) => x.moduleId === 'm8')) expect(q.review).toBe('entwurf');
  });
  test('Fachaussagen: Auflage gilt auch ohne LV-Position; keine Einleitung ohne Zustimmung', () => {
    expect(QUESTIONS.find((q) => q.id === 'm8-q07')!.correct).toEqual(['b']);
    const d1 = QUESTIONS.find((q) => q.id === 'm8-d01')!;
    expect(d1.options!.find((o) => o.id === 'c')!.critical).toBe(true);
  });
});

describe('Modul 9: Umweltbaubegleitung und Baustellenkontrollen', () => {
  const st = (id: string) => S.get('sim-i')!.stages.find((x) => x.id === id)!;
  test('Fall I: Abwarten oder Verdünnen bei laufendem Spülwasser ist kritisch', () => {
    expect(evaluateStage(st('i2'), { stageId: 'i2', selected: ['o2'] })).toMatchObject({ score: 0, critical: true });
    expect(evaluateStage(st('i2'), { stageId: 'i2', selected: ['o3'] })).toMatchObject({ score: 0, critical: true });
    expect(evaluateStage(st('i2'), { stageId: 'i2', selected: ['o1'] })).toMatchObject({ score: 1, critical: false });
  });
  test('Fall I: Alarmieren und Abdichten vor dem Dokumentieren', () => {
    expect(evaluateRank(st('i4'), ['n2', 'n1', 'n3', 'n4', 'n5'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st('i4'), ['n4', 'n1', 'n2', 'n3', 'n5']).critical).toBe(true);
    expect(evaluateRank(st('i4'), ['n2', 'n3', 'n1', 'n4', 'n5']).critical).toBe(true);
  });
  test('Abwarten bei unmittelbarer Gefahr und «zuerst dokumentieren» geben 0 Punkte', () => {
    const d3 = QUESTIONS.find((q) => q.id === 'm9-d03')!;
    expect(scoreQuestion(d3, ['a'])).toBe(0);
    expect(scoreQuestion(d3, ['d'])).toBe(0);
    expect(scoreQuestion(d3, ['b'])).toBe(1);
  });
  test('Geschönter Bericht und ungeklärte Übernahme der UBB geben 0 Punkte', () => {
    const w = (qid: string, oid: string) => QUESTIONS.find((q) => q.id === qid)!.options!.find((o) => o.id === oid)!.weight;
    expect(w('m9-d04', 'a')).toBe(0);
    expect(w('m9-d01', 'a')).toBe(0);
  });
  test('Rollen: interne Umweltfachperson ist keine formelle UBB; Prüfstatus Entwurf', () => {
    expect(JSON.stringify(LESSONS.find((l) => l.id === 'm9-l1'))).toContain('keine formelle UBB');
    for (const l of LESSONS.filter((x) => x.moduleId === 'm9')) expect(l.review).toBe('entwurf');
    for (const q of QUESTIONS.filter((x) => x.moduleId === 'm9')) expect(q.review).toBe('entwurf');
  });
});

describe('Modul 10: ISO 14001 und Umweltmanagement', () => {
  const st = (id: string) => S.get('sim-e')!.stages.find((x) => x.id === id)!;
  test('Fall E ersetzt den Platzhalter (stabile ID sim-e, nur einmal vorhanden)', () => {
    expect(SCENARIOS.filter((x) => x.id === 'sim-e').length).toBe(1);
    expect(S.get('sim-e')!.moduleId).toBe('m10');
  });
  test('Nachweise nachträglich herstellen ist kritisch (Fall und Abwägung)', () => {
    expect(evaluateStage(st('e1'), { stageId: 'e1', selected: ['o2'] })).toMatchObject({ score: 0, critical: true });
    expect(scoreQuestion(QUESTIONS.find((q) => q.id === 'm10-d04')!, ['a'])).toBe(0);
    expect(QUESTIONS.find((q) => q.id === 'm10-q18')!.correct).toEqual(['b']);
  });
  test('Vorgehen nach Abweichung: zuerst Umfang feststellen', () => {
    expect(evaluateRank(st('e4'), ['n1', 'n3', 'n2', 'n4', 'n5', 'n6'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st('e4'), ['n4', 'n5', 'n1', 'n2', 'n3', 'n6']).critical).toBe(true);
  });
  test('Keine Normtexte behauptet: Abschnittsnummern als Ausgabe 2015 gekennzeichnet; Prüfstatus Entwurf', () => {
    const all = JSON.stringify(LESSONS.filter((l) => l.moduleId === 'm10'));
    expect(all).toContain('Ausgabe 2026 nicht verglichen');
    expect(all).toContain('kein Normtext');
    for (const l of LESSONS.filter((x) => x.moduleId === 'm10')) expect(l.review).toBe('entwurf');
    for (const q of QUESTIONS.filter((x) => x.moduleId === 'm10')) expect(q.review).toBe('entwurf');
  });
  test('Zertifikat ist kein Freibrief', () => {
    expect(QUESTIONS.find((q) => q.id === 'm10-q02')!.correct).toEqual(['b']);
  });
});
