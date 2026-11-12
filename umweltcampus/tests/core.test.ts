import { CARDS, F, FEYNMAN, GLOSSARY, L, LESSONS, LIBRARY, Q, QUESTIONS, S, SCENARIOS, SOURCES, T, TASKS, TOPICS } from '../src/content';
import { DAY, grade, review } from '../src/lib/srs';
import { scoreQuestion, rubricHints, recordAnswer, topicCompetence, recommendedLevel, moduleRequirements, dueItems } from '../src/lib/learning';
import { evaluateStage, nextStageId, summarize } from '../src/lib/scenario';
import { buildExam, interleave } from '../src/lib/exam';
import { emptyState, exportPayload, normalizeState } from '../src/lib/state';

const sourceIds = new Set(SOURCES.map((s) => s.id));
const termIds = new Set(GLOSSARY.map((g) => g.id));
const topicIds = new Set(TOPICS.map((t) => t.id));

describe('Inhalte: Datenintegrität', () => {
  test('IDs sind eindeutig', () => {
    for (const arr of [QUESTIONS, CARDS, LESSONS, TASKS, FEYNMAN, SCENARIOS, GLOSSARY, LIBRARY, SOURCES] as { id: string }[][]) {
      const ids = arr.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  test('jede Frage hat Pflichtfelder, gültige Lösung und Quellen', () => {
    for (const q of QUESTIONS) {
      expect(q.explanation.length, q.id).toBeGreaterThan(40);
      expect(q.sources.length, q.id).toBeGreaterThan(0);
      for (const s of q.sources) expect(sourceIds.has(s), `${q.id} → ${s}`).toBe(true);
      expect(topicIds.has(q.topic), q.id).toBe(true);
      expect(q.objective.length, q.id).toBeGreaterThan(5);
      if (q.type === 'open') expect(q.rubric?.length, q.id).toBeGreaterThanOrEqual(3);
      else {
        const opts = new Set(q.options!.map((o) => o.id));
        expect(q.correct!.length, q.id).toBeGreaterThan(0);
        for (const c of q.correct!) expect(opts.has(c), q.id).toBe(true);
        if (q.type === 'single') expect(q.correct!.length, q.id).toBe(1);
      }
    }
  });

  test('jede Lektion enthält alle 13 Elemente einer Lerneinheit', () => {
    for (const l of LESSONS) {
      const kinds = new Set(l.steps.map((s) => s.kind));
      expect(l.objectives.length, l.id).toBeGreaterThan(0); // 1 Lernziele
      for (const k of ['situation', 'quiz', 'explain', 'example', 'deep', 'decision', 'review', 'practice', 'summary', 'sources'] as const) expect(kinds.has(k), `${l.id}: ${k}`).toBe(true);
      expect(l.minutes).toBeGreaterThanOrEqual(10);
      expect(l.minutes).toBeLessThanOrEqual(20);
    }
    // Visualisierung «falls sinnvoll»: in den meisten Lektionen
    expect(LESSONS.filter((l) => l.steps.some((s) => s.kind === 'diagram')).length).toBeGreaterThanOrEqual(5);
  });

  test('alle Verweise in Lektionen sind auflösbar', () => {
    for (const l of LESSONS) for (const st of l.steps) {
      if (st.kind === 'quiz' || st.kind === 'review') st.questionIds.forEach((id) => expect(Q.has(id), `${l.id} → ${id}`).toBe(true));
      if (st.kind === 'decision') expect(Q.has(st.questionId), st.questionId).toBe(true);
      if (st.kind === 'practice') expect(T.has(st.taskId), st.taskId).toBe(true);
      if (st.kind === 'feynman') expect(F.has(st.feynmanId), st.feynmanId).toBe(true);
      if (st.kind === 'sources') st.sourceIds.forEach((id) => expect(sourceIds.has(id), id).toBe(true));
      const text = 'text' in st ? st.text : '';
      for (const m of text.matchAll(/\[\[([a-z0-9-]+)/g)) expect(termIds.has(m[1]), `${l.id}: Begriff ${m[1]}`).toBe(true);
    }
  });

  test('Glossar- und Bibliotheksquellen existieren', () => {
    for (const g of GLOSSARY) g.sources.forEach((s) => expect(sourceIds.has(s), g.id).toBe(true));
    for (const e of LIBRARY) e.sources.forEach((s) => expect(sourceIds.has(s), e.id).toBe(true));
    for (const c of CARDS) c.sources.forEach((s) => expect(sourceIds.has(s), c.id).toBe(true));
  });

  test('Quellen ohne Prüfung sind als Entwurf markiert', () => {
    for (const s of SOURCES) if (!s.lastChecked) expect(s.review).toBe('entwurf');
  });

  test('Szenarien: Verzweigungen zeigen auf existierende Schritte, Optionen sind bewertbar', () => {
    for (const sc of SCENARIOS.filter((x) => x.status === 'verfuegbar')) {
      const ids = new Set(sc.stages.map((s) => s.id));
      expect(sc.stages.length).toBeGreaterThanOrEqual(5);
      for (const st of sc.stages) {
        if (st.next) expect(ids.has(st.next), st.id).toBe(true);
        for (const o of st.options ?? []) if (o.next) expect(ids.has(o.next), o.id).toBe(true);
        if (st.type === 'rank') expect([...(st.rankOrder ?? [])].sort()).toEqual((st.rankItems ?? []).map((x) => x.id).sort());
        if (st.type === 'justify') expect(st.rubric?.length).toBeGreaterThan(2);
        if (st.type === 'ask') expect((st.options ?? []).length).toBeGreaterThan(st.pick ?? 0);
      }
      sc.sources.forEach((s) => expect(sourceIds.has(s)).toBe(true));
    }
    expect(S.get('sim-a')).toBeTruthy();
  });

  test('jede Lektion ist im Lookup', () => {
    for (const l of LESSONS) expect(L.get(l.id)).toBe(l);
  });
});

describe('Bewertung von Antworten', () => {
  const single = QUESTIONS.find((q) => q.type === 'single')!;
  const multi = QUESTIONS.find((q) => q.type === 'multi' && q.options!.length - q.correct!.length >= 1)!;
  test('single: richtig = 1, falsch = 0', () => {
    expect(scoreQuestion(single, single.correct!)).toBe(1);
    const wrong = single.options!.find((o) => !single.correct!.includes(o.id))!.id;
    expect(scoreQuestion(single, [wrong])).toBe(0);
  });
  test('multi: falsche Wahlen werden abgezogen, nie negativ', () => {
    expect(scoreQuestion(multi, multi.correct!)).toBe(1);
    const wrong = multi.options!.filter((o) => !multi.correct!.includes(o.id)).map((o) => o.id);
    expect(scoreQuestion(multi, [...multi.correct!, wrong[0]])).toBeLessThan(1);
    expect(scoreQuestion(multi, wrong)).toBe(0);
    expect(scoreQuestion(multi, [])).toBe(0);
  });
  test('Rubrik-Hinweise erkennen Stichwörter ohne Gross-/Kleinschreibung', () => {
    const q = Q.get('m2-q27')!;
    const hits = rubricHints('Wir brauchen die Zustimmung der GEMEINDE, sonst gibt es Ablagerungen im Kanal.', q.rubric!);
    expect(hits).toContain('r1');
    expect(hits).toContain('r2');
  });
});

describe('Spaced Repetition', () => {
  const t0 = Date.UTC(2026, 0, 1);
  test('Noten aus Richtigkeit und Sicherheit', () => {
    expect(grade(false, 3)).toBe(0);
    expect(grade(false, 1)).toBe(1);
    expect(grade(true, 1)).toBe(3);
    expect(grade(true, 3)).toBe(5);
  });
  test('Intervalle wachsen bei sicheren richtigen Antworten', () => {
    let it = review(undefined, 5, t0);
    expect(it.interval).toBe(2);
    it = review(it, 5, t0 + 2 * DAY);
    expect(it.interval).toBe(6);
    it = review(it, 5, t0 + 8 * DAY);
    expect(it.interval).toBeGreaterThan(12);
    expect(it.due).toBe(t0 + 8 * DAY + it.interval * DAY);
  });
  test('unsicher richtig ergibt kürzere Intervalle als sicher richtig', () => {
    const a = review(review(review(undefined, 3, t0), 3, t0 + DAY), 3, t0 + 4 * DAY);
    const b = review(review(review(undefined, 5, t0), 5, t0 + 2 * DAY), 5, t0 + 8 * DAY);
    expect(a.interval).toBeLessThan(b.interval);
  });
  test('falsch setzt zurück und senkt die Leichtigkeit', () => {
    const good = review(review(undefined, 5, t0), 5, t0 + 2 * DAY);
    const bad = review(good, 0, t0 + 8 * DAY);
    expect(bad.interval).toBe(1);
    expect(bad.reps).toBe(0);
    expect(bad.lapses).toBe(1);
    expect(bad.ease).toBeLessThan(good.ease);
  });
  test('lange Pause und trotzdem richtig: Intervall basiert auf tatsächlicher Zeit', () => {
    let it = review(review(undefined, 5, t0), 5, t0 + 2 * DAY); // Intervall 6
    const late = review(it, 4, t0 + 40 * DAY);
    it = review(it, 4, t0 + 8 * DAY);
    expect(late.interval).toBeGreaterThan(it.interval);
  });
});

describe('Kompetenz und Empfehlungen', () => {
  test('neuer Stand: Stufe 0 überall, Empfehlung Stufe 1', () => {
    const s = emptyState();
    expect(topicCompetence(s).every((c) => c.stage === 0)).toBe(true);
    expect(recommendedLevel(s, 'm2')).toBe(1);
    expect(moduleRequirements(s, 'm2').every((r) => !r.done)).toBe(true);
  });
  test('sicher falsch wird als Fehlannahme erkannt', () => {
    let s = emptyState();
    s = { ...s, lessons: { 'm2-l1': { step: 0, viewed: [0], startedAt: 0, answers: {}, open: {} } } };
    s = recordAnswer(s, 'm2-q01', 0, 3, 'lektion');
    const c = topicCompetence(s).find((x) => x.topic === 'recht')!;
    expect(c.dangerous).toContain('m2-q01');
    expect(c.stage).toBe(2);
    expect(dueItems(s, Date.now() + 2 * DAY).some((d) => d.id === 'm2-q01')).toBe(true);
  });
  test('Stufe 2 wird erst empfohlen, wenn Stufe 1 gefestigt ist', () => {
    let s = emptyState();
    const l1 = LESSONS.filter((l) => l.level === 1);
    for (const l of l1) s.lessons[l.id] = { step: 0, viewed: [0], startedAt: 0, completedAt: 1, answers: {}, open: {} };
    for (const q of QUESTIONS.filter((q) => q.level === 1)) s = recordAnswer(s, q.id, 1, 3, 'lektion');
    expect(recommendedLevel(s, 'm2')).toBe(2);
    for (const q of QUESTIONS.filter((q) => q.level === 1)) s = recordAnswer(s, q.id, 0, 2, 'lektion');
    expect(recommendedLevel(s, 'm2')).toBe(1);
  });
  test('«Bestätigt» erfordert Praxisstatus bestätigt, nicht nur eingereicht', () => {
    const s = emptyState();
    s.practice['m2-p1'] = { status: 'eingereicht', notes: '', reflection: {} };
    expect(topicCompetence(s).find((c) => c.topic === 'recht')!.confirmed).toBe(false);
    s.practice['m2-p1'] = { status: 'bestaetigt', notes: '', reflection: {}, confirm: { role: 'Bauführer', date: '2026-11-01', evidence: 'Steckbrief im Projektordner' } };
    expect(topicCompetence(s).find((c) => c.topic === 'recht')!.confirmed).toBe(true);
  });
});

describe('Baustellensimulation', () => {
  const sc = S.get('sim-a')!;
  const st = (id: string) => sc.stages.find((x) => x.id === id)!;
  test('kritischer Entscheid verzweigt auf die Havarie', () => {
    expect(nextStageId(sc, st('a1'), { stageId: 'a1', selected: ['x2'] })).toBe('a-hav');
    expect(nextStageId(sc, st('a1'), { stageId: 'a1', selected: ['x1'] })).toBe('a2');
    expect(nextStageId(sc, st('a-hav'), { stageId: 'a-hav', selected: ['h1'] })).toBe('a3');
  });
  test('Rangfolge: richtige Reihenfolge = 1, falscher erster Platz ≤ 0.5', () => {
    const s4 = st('a4');
    expect(evaluateStage(s4, { stageId: 'a4', selected: s4.rankOrder! }).score).toBe(1);
    const swapped = [...s4.rankOrder!].reverse();
    expect(evaluateStage(s4, { stageId: 'a4', selected: swapped }).score).toBeLessThanOrEqual(0.5);
  });
  test('Informationsfragen: relevante Wahl = volle Punkte', () => {
    const s2 = st('a2');
    expect(evaluateStage(s2, { stageId: 'a2', selected: ['q1', 'q2', 'q3', 'q4'] }).score).toBe(1);
    expect(evaluateStage(s2, { stageId: 'a2', selected: ['q5', 'q6', 'q7', 'q1'] }).score).toBeLessThan(0.5);
  });
  test('kritischer Fehler = nicht bestanden, unabhängig von Punkten', () => {
    const r = summarize([
      { stageId: 'a', score: 1, critical: false, criteria: ['risiko'] },
      { stageId: 'b', score: 1, critical: true, criteria: ['recht'] },
      { stageId: 'c', score: 1, critical: false, criteria: ['fachlich'] },
    ]);
    expect(r.total).toBe(1);
    expect(r.passed).toBe(false);
  });
  test('kompletter guter Durchlauf besteht', () => {
    const picks: Record<string, string[]> = { a1: ['x1'], a2: ['q1', 'q2', 'q3', 'q4'], a3: ['f1', 'f2', 'f3', 'f4'], a4: st('a4').rankOrder!, a5: ['v1'], a6: ['w1'], a7: ['b1', 'b2', 'b3', 'b4'] };
    let id: string | null = 'a1';
    const res = [];
    while (id) {
      const stage = st(id);
      const a = { stageId: id, selected: picks[id] };
      res.push(evaluateStage(stage, a));
      id = nextStageId(sc, stage, a);
    }
    const run = summarize(res);
    expect(run.path).not.toContain('a-hav');
    expect(run.passed).toBe(true);
    expect(Object.keys(run.byCriterion)).toContain('begruendung');
  });
});

describe('Prüfungen', () => {
  test('Modulprüfung: 16 geschlossene + 2 offene, alle Stufen vertreten, reproduzierbar', () => {
    const a = buildExam('modul', 'm2', 42);
    expect(a.filter((q) => q.type !== 'open').length).toBe(16);
    expect(a.filter((q) => q.type === 'open').length).toBe(2);
    expect(new Set(a.map((q) => q.level))).toEqual(new Set([1, 2, 3, 4]));
    expect(new Set(a.map((q) => q.id)).size).toBe(a.length);
    expect(buildExam('modul', 'm2', 42).map((q) => q.id)).toEqual(a.map((q) => q.id));
  });
  test('Interleaving vermeidet gleiche Themen hintereinander, wo möglich', () => {
    const out = interleave([{ topic: 'a' }, { topic: 'a' }, { topic: 'b' }, { topic: 'b' }]);
    expect(out.map((x) => x.topic)).toEqual(['a', 'b', 'a', 'b']);
  });
});

describe('Lernstand: Export und Import', () => {
  test('Export lässt sich wieder importieren', () => {
    let s = emptyState();
    s = recordAnswer(s, 'm2-q01', 1, 3, 'lektion');
    const back = normalizeState(JSON.parse(JSON.stringify(exportPayload(s))));
    expect(back.answers).toHaveLength(1);
    expect(back.sr['q:m2-q01']).toBeTruthy();
  });
  test('fremde oder kaputte Dateien werden mit verständlicher Meldung abgelehnt', () => {
    expect(() => normalizeState([1, 2])).toThrow(/kein/);
    expect(() => normalizeState({ app: 'andere-app', state: {} })).toThrow(/nicht aus UmweltCampus/);
    expect(() => normalizeState({ foo: 1 })).toThrow(/Versionsangabe/);
    expect(() => normalizeState({ version: 99 })).toThrow(/neueren/);
  });
  test('fehlende Felder werden ergänzt', () => {
    const s = normalizeState({ version: 1, lessons: { x: { step: 2 } } });
    expect(s.lessons.x.viewed).toEqual([]);
    expect(s.settings.theme).toBe('system');
  });
});
