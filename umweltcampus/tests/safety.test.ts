// Regressionstests zur externen Fachprüfung vom 13.11.2026 (Bewertungsfassung 3).
import { Q, S, QUESTIONS, LESSONS, SOURCES } from '../src/content';
import { criticalChoice, recordAnswer, scoreQuestion, topicCompetence, lastAnswers, moduleRequirements } from '../src/lib/learning';
import { evaluateRank, evaluateStage, summarize } from '../src/lib/scenario';
import { emptyState, normalizeState, SCORING_VERSION } from '../src/lib/state';
import { isLegacyAnswer, isLegacyRun, legacyCounts } from '../src/lib/versioning';

const opt = (qid: string, oid: string) => Q.get(qid)!.options!.find((o) => o.id === oid)!;
const stage = (sid: string, id: string) => S.get(sid)!.stages.find((x) => x.id === id)!;

describe('Sicherheitsveto: gefährliche Optionen erhalten 0 Punkte', () => {
  const dangerous: [string, string][] = [
    ['m2-d01', 'a'], ['m2-d01', 'd'], ['m2-d03', 'c'], ['m2-d03', 'd'], ['m2-d04', 'c'],
    ['m2-d05', 'b'], ['m2-d05', 'c'], ['m2-d05', 'd'], ['m2-d07', 'd'],
  ];
  test.each(dangerous)('%s Option %s: Gewicht 0', (qid, oid) => {
    expect(opt(qid, oid).weight).toBe(0);
    expect(scoreQuestion(Q.get(qid)!, [oid])).toBe(0);
  });
  test.each([['m2-d01', 'a'], ['m2-d03', 'c'], ['m2-d03', 'd'], ['m2-d04', 'c'], ['m2-d05', 'b'], ['m2-d05', 'c'], ['m2-d05', 'd'], ['m2-d07', 'd']])('%s Option %s: als kritisch markiert', (qid, oid) => {
    expect(opt(qid, oid).critical).toBe(true);
    expect(criticalChoice(Q.get(qid)!, [oid])).toBe(true);
  });
  test('alle kritischen Optionen in allen Fragen haben Gewicht 0', () => {
    for (const q of QUESTIONS) for (const o of q.options ?? []) if (o.critical) expect(o.weight ?? 0, `${q.id}/${o.id}`).toBe(0);
  });
  test('d06: begründete Ablehnung (b) höher gewichtet als ungeprüfte Eigenleistung (d)', () => {
    expect(opt('m2-d06', 'b').weight!).toBeGreaterThan(opt('m2-d06', 'd').weight!);
  });
  test('kritische Wahl wird als Fehlannahme verbucht, nie als richtig', () => {
    let s = emptyState();
    s = recordAnswer(s, 'm2-d05', 0, 1, 'lektion', Date.now(), { crit: true });
    const a = s.answers[0];
    expect(a.crit).toBe(true);
    expect(a.correct).toBe(false);
    expect(a.v).toBe(SCORING_VERSION);
    expect(topicCompetence(s).find((t) => t.topic === 'oel')!.dangerous).toContain('m2-d05');
  });
});

describe('Korrigierte Wissensfragen', () => {
  test('q12: keine garantierte pH-Untergrenze bei CO₂ mehr behauptet', () => {
    const q = Q.get('m2-q12')!;
    const txt = JSON.stringify(q);
    expect(txt).not.toMatch(/kaum unter ca\. 6/);
    expect(q.explanation).toMatch(/nicht garantiert/);
  });
  test('kein Lerntext behauptet mehr eine pH-Untergrenze bei CO₂', () => {
    const all = JSON.stringify({ LESSONS, QUESTIONS });
    expect(all).not.toMatch(/kaum unter ca\. 6/);
  });
  test('q21: richtige Antwort verlangt Alarmierung parallel zur Eindämmung', () => {
    const q = Q.get('m2-q21')!;
    const right = q.options!.find((o) => q.correct!.includes(o.id))!.text;
    expect(right).toMatch(/gleichzeitig/);
    expect(right).toMatch(/118\/117/);
  });
  test('SIA 431 wird in der Ausgabe 2022 geführt', () => {
    const sia = SOURCES.find((x) => x.id === 'sia431')!;
    expect(sia.title).toMatch(/2022/);
    expect(sia.version).toMatch(/2022/);
  });
});

describe('Simulationen: kritische Entscheide und parallele Massnahmen', () => {
  test('A/a1: «zurufen und weitergehen» ist kritisch und verzweigt in die Havarie', () => {
    const o = stage('sim-a', 'a1').options!.find((x) => x.id === 'x4')!;
    expect(o.critical).toBe(true);
    expect(o.next).toBe('a-hav');
    expect(evaluateStage(stage('sim-a', 'a1'), { stageId: 'a1', selected: ['x4'] })).toMatchObject({ score: 0, critical: true });
  });
  test('A/a5: ungemessenes Klarwasser in den Kanal = 0 und kritisch; Entsorger = volle Punkte', () => {
    expect(evaluateStage(stage('sim-a', 'a5'), { stageId: 'a5', selected: ['v4'] })).toMatchObject({ score: 0, critical: true });
    expect(evaluateStage(stage('sim-a', 'a5'), { stageId: 'a5', selected: ['v2'] }).score).toBe(1);
  });
  test('A/a4: Alarmieren vor oder nach dem Abdichten ist beides voll richtig (parallel)', () => {
    const st = stage('sim-a', 'a4');
    expect(evaluateRank(st, ['s1', 's2', 's3', 's4', 's5'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st, ['s2', 's1', 's3', 's5', 's4'])).toMatchObject({ score: 1, critical: false });
  });
  test('A/a4: Alarmierung zu spät = kritischer Fehler', () => {
    const r = evaluateRank(stage('sim-a', 'a4'), ['s1', 's3', 's4', 's2', 's5']);
    expect(r.critical).toBe(true);
    expect(r.score).toBeLessThanOrEqual(0.25);
  });
  test('B/b2: Melden parallel zum Stoppen anerkannt, späte Meldung kritisch', () => {
    const st = stage('sim-b', 'b2');
    expect(evaluateRank(st, ['p3', 'p1', 'p2', 'p5', 'p4'])).toMatchObject({ score: 1, critical: false });
    expect(evaluateRank(st, ['p1', 'p2', 'p4', 'p3', 'p5']).critical).toBe(true);
  });
  test('B/b5: «nicht melden» kritisch, «bei Gelegenheit» 0 Punkte', () => {
    expect(evaluateStage(stage('sim-b', 'b5'), { stageId: 'b5', selected: ['k2'] })).toMatchObject({ score: 0, critical: true });
    expect(evaluateStage(stage('sim-b', 'b5'), { stageId: 'b5', selected: ['k3'] }).score).toBe(0);
  });
  test('Begründung ist Selbstbewertung und entscheidet nicht über «bestanden»', () => {
    const just = evaluateStage(stage('sim-a', 'a7'), { stageId: 'a7', selected: ['b1', 'b2', 'b3', 'b4', 'b5'] });
    expect(just.self).toBe(true);
    const weak = { stageId: 'x', score: 0.5, critical: false, criteria: ['fachlich'] };
    const run = summarize([weak, weak, just]);
    expect(run.total).toBeGreaterThan(run.objective!);
    expect(run.passed).toBe(false); // objektiv nur 50 %, trotz voller Selbstbewertung
  });
  test('Ask-Schritt wertet nie mehr Antworten als erlaubt', () => {
    const st = stage('sim-a', 'a2');
    const all = st.options!.map((o) => o.id);
    expect(evaluateStage(st, { stageId: 'a2', selected: all }).score).toBeLessThanOrEqual(1);
  });
});

describe('Selbstbewertung und Kompetenz', () => {
  test('offene Frage: Selbstbewertung wird nie als «richtig» verbucht und zählt nicht für Kompetenz', () => {
    let s = emptyState();
    s = recordAnswer(s, 'm2-q27', 1, undefined, 'lektion', Date.now(), { self: true });
    expect(s.answers[0]).toMatchObject({ self: true, correct: false, score: 1 });
    expect(lastAnswers(s).has('m2-q27')).toBe(false);
  });
  test('«sicher beherrscht» braucht Breite und zeitliche Stabilität, nicht nur 4 richtige Antworten', () => {
    let s = emptyState();
    s.lessons['m2-l1'] = { cur: 'm2-l1-situation', seen: ['m2-l1-situation'], startedAt: 0, answers: {}, open: {} };
    const qs = QUESTIONS.filter((q) => q.topic === 'recht' && q.type !== 'open').slice(0, 4);
    for (const q of qs) s = recordAnswer(s, q.id, 1, 3, 'lektion');
    expect(topicCompetence(s).find((t) => t.topic === 'recht')!.mastered).toBe(false);
  });
});

describe('Migration: frühere Bewertungsfassung wird gekennzeichnet, nicht neu benotet', () => {
  const v2 = {
    version: 2, createdAt: 1, updatedAt: 1000,
    lessons: { 'm2-l3': { cur: 'm2-l3-deep', seen: ['m2-l3-situation', 'm2-l3-deep'], startedAt: 1, answers: { 'm2-q12': ['b'] }, open: {} } },
    answers: [
      { q: 'm2-q12', at: 10, score: 1, correct: true, conf: 3, ctx: 'lektion' },
      { q: 'm2-q01', at: 11, score: 1, correct: true, conf: 3, ctx: 'lektion' },
      { q: 'm2-q27', at: 12, score: 1, correct: true, ctx: 'lektion' },
    ],
    sr: {}, exams: [{ id: 'e1', kind: 'modul', moduleId: 'm2', at: 20, score: 0.9, total: 18, byTopic: {}, passed: true }],
    scenarios: { 'sim-a': [{ at: 30, total: 0.9, byCriterion: {}, critical: 0, path: [], passed: true }] },
    practice: {}, feynman: {}, siteTasks: {}, history: [], studySec: {},
  };
  test('alter Stand lädt verlustfrei, Ergebnisse bleiben unverändert gespeichert', () => {
    const s = normalizeState(JSON.parse(JSON.stringify(v2)));
    expect(s.version).toBe(3);
    expect(s.answers).toHaveLength(3);
    expect(s.answers[0].score).toBe(1); // keine stille Neubenotung
    expect(s.exams[0].passed).toBe(true);
    expect(s.lessons['m2-l3'].cur).toBe('m2-l3-deep');
  });
  test('alte Ergebnisse zu geänderten Inhalten zählen nicht mehr als Nachweis', () => {
    const s = normalizeState(JSON.parse(JSON.stringify(v2)));
    expect(isLegacyAnswer(s.answers[0])).toBe(true);
    expect(isLegacyAnswer(s.answers[1])).toBe(false); // unveränderte Frage bleibt gültig
    const last = lastAnswers(s);
    expect(last.has('m2-q12')).toBe(false);
    expect(last.has('m2-q01')).toBe(true);
    expect(last.has('m2-q27')).toBe(false); // frühere Selbstbewertung als «richtig»
    expect(isLegacyRun('sim-a', s.scenarios['sim-a'][0])).toBe(true);
    const req = moduleRequirements(s, 'm2');
    expect(req.find((r) => r.label.startsWith('Modulprüfung'))!.done).toBe(false);
    expect(req.find((r) => r.label.startsWith('Alle Baustellenfälle'))!.done).toBe(false);
    const c = legacyCounts(s, (id) => Q.get(id)?.type === 'open');
    expect(c).toEqual({ answers: 2, runs: 1, exams: 1 });
  });
});
