import { CARDS, LESSONS, MODULES, QUESTIONS, SCENARIOS, TASKS, TOPICS } from '../content';
import type { Question, RubricPoint } from '../content/types';
import type { AnswerRecord, AppState, Confidence } from './state';
import { grade, review } from './srs';

// ---------- Bewertung von Antworten ----------

/** Punkte 0..1 für geschlossene Fragen. Multi: richtige minus falsche Wahlen. */
export function scoreQuestion(q: Question, selected: string[]): number {
  if (q.type === 'open') return 0;
  if (q.type === 'best') {
    const o = q.options?.find((x) => x.id === selected[0]);
    return selected.length === 1 && o ? Math.max(0, Math.min(1, o.weight ?? 0)) : 0;
  }
  if (!q.correct) return 0;
  const corr = new Set(q.correct);
  if (q.type === 'single') return selected.length === 1 && corr.has(selected[0]) ? 1 : 0;
  const hits = selected.filter((s) => corr.has(s)).length;
  const wrong = selected.filter((s) => !corr.has(s)).length;
  return Math.max(0, Math.min(1, (hits - wrong) / corr.size));
}

const norm = (t: string) => t.toLowerCase().replace(/ß/g, 'ss');

/**
 * Regelbasierte Vorprüfung eines Freitexts: Welche Rubrikpunkte enthalten
 * Hinweiswörter? Nur ein Hilfsmittel – die Bewertung erfolgt durch die
 * lernende Person (oder optional KI), nie allein durch Stichwörter.
 */
export function rubricHints(text: string, rubric: RubricPoint[]): string[] {
  const t = norm(text);
  return rubric.filter((r) => r.keywords.length > 0 && r.keywords.some((k) => t.includes(norm(k)))).map((r) => r.id);
}

/** Antwort verbuchen: Historie + Wiederholungsplan der Frage. */
export function recordAnswer(s: AppState, qid: string, score: number, conf: Confidence | undefined, ctx: AnswerRecord['ctx'], now = Date.now()): AppState {
  const correct = score >= 0.999;
  const ans: AnswerRecord = { q: qid, at: now, score, correct, conf, ctx };
  // Prüfungsantworten zählen für Kompetenz, aber verändern den Plan nur, wenn falsch
  const g = grade(correct, conf);
  const key = 'q:' + qid;
  const sr = ctx === 'pruefung' && correct ? s.sr : { ...s.sr, [key]: review(s.sr[key], g, now) };
  return { ...s, answers: [...s.answers, ans], sr, updatedAt: now };
}

export function recordCard(s: AppState, cid: string, correct: boolean, conf: Confidence | undefined, now = Date.now()): AppState {
  const key = 'c:' + cid;
  return { ...s, sr: { ...s.sr, [key]: review(s.sr[key], grade(correct, conf), now) }, updatedAt: now };
}

// ---------- Kompetenz ----------

/** Letzte Antwort pro Frage (aktueller Wissensstand). */
export function lastAnswers(s: AppState): Map<string, AnswerRecord> {
  const m = new Map<string, AnswerRecord>();
  for (const a of s.answers) m.set(a.q, a);
  return m;
}

export interface TopicCompetence {
  topic: string;
  title: string;
  moduleId: string;
  viewed: boolean; // Inhalte angesehen
  asked: number; // verschiedene Fragen beantwortet
  total: number; // Fragen im Pool
  accuracy: number; // Anteil richtig (letzte Antwort je Frage)
  mastered: boolean; // sicher beherrscht
  applied: boolean; // in Szenario angewendet
  confirmed: boolean; // Praxis bestätigt
  dangerous: string[]; // sicher, aber falsch
  unsureCorrect: number; // richtig, aber unsicher
  stage: 0 | 1 | 2 | 3 | 4 | 5;
}

export const STAGE_LABEL = ['Nicht begonnen', 'Inhalte angesehen', 'Wissen abgefragt', 'Sicher beherrscht', 'In Szenario angewendet', 'In Praxis bestätigt'];

export function topicCompetence(s: AppState): TopicCompetence[] {
  const last = lastAnswers(s);
  return TOPICS.map((t) => {
    const lessons = LESSONS.filter((l) => l.topics.includes(t.id));
    const viewed = lessons.some((l) => (s.lessons[l.id]?.seen.length ?? 0) > 0);
    const qs = QUESTIONS.filter((q) => q.topic === t.id);
    const answered = qs.map((q) => last.get(q.id)).filter((a): a is AnswerRecord => !!a);
    const ok = answered.filter((a) => a.correct).length;
    const accuracy = answered.length ? ok / answered.length : 0;
    const dangerous = answered.filter((a) => !a.correct && a.conf === 3).map((a) => a.q);
    const unsureCorrect = answered.filter((a) => a.correct && a.conf === 1).length;
    const withConf = answered.filter((a) => a.conf);
    const avgConf = withConf.length ? withConf.reduce((x, a) => x + (a.conf ?? 0), 0) / withConf.length : 2;
    const minN = Math.min(4, qs.length);
    const mastered = answered.length >= minN && accuracy >= 0.8 && avgConf >= 2 && dangerous.length === 0;
    const applied = SCENARIOS.some((sc) => sc.topics.includes(t.id) && (s.scenarios[sc.id] ?? []).some((r) => r.passed));
    const confirmed = TASKS.some((pt) => pt.topic === t.id && s.practice[pt.id]?.status === 'bestaetigt');
    let stage: TopicCompetence['stage'] = 0;
    if (viewed) stage = 1;
    if (stage === 1 && answered.length > 0) stage = 2;
    if (stage === 2 && mastered) stage = 3;
    if (stage === 3 && applied) stage = 4;
    if (stage === 4 && confirmed) stage = 5;
    return { topic: t.id, title: t.title, moduleId: t.moduleId, viewed, asked: answered.length, total: qs.length, accuracy, mastered, applied, confirmed, dangerous, unsureCorrect, stage };
  });
}

/** Wissenslücken: schwächste Themen zuerst (nur begonnene). */
export function knowledgeGaps(s: AppState) {
  return topicCompetence(s)
    .filter((t) => t.asked > 0)
    .map((t) => ({ ...t, weakness: (1 - t.accuracy) + t.dangerous.length * 0.3 + (t.unsureCorrect / Math.max(1, t.asked)) * 0.3 }))
    .filter((t) => t.weakness > 0.15)
    .sort((a, b) => b.weakness - a.weakness);
}

// ---------- Stufen und Empfehlungen ----------

export function levelStats(s: AppState, moduleId: string, level: number) {
  const last = lastAnswers(s);
  const qs = QUESTIONS.filter((q) => q.moduleId === moduleId && q.level === level);
  const ans = qs.map((q) => last.get(q.id)).filter((a): a is AnswerRecord => !!a);
  const acc = ans.length ? ans.filter((a) => a.correct).length / ans.length : 0;
  const lessons = LESSONS.filter((l) => l.moduleId === moduleId && l.level === level);
  const lessonsDone = lessons.filter((l) => s.lessons[l.id]?.completedAt).length;
  return { n: ans.length, pool: qs.length, acc, lessons: lessons.length, lessonsDone };
}

/** Eine Stufe gilt als gefestigt bei ≥75 % richtig (mind. 4 Fragen) und abgeschlossenen Lektionen. */
export function levelSolid(s: AppState, moduleId: string, level: number) {
  const st = levelStats(s, moduleId, level);
  const enough = st.n >= Math.min(4, st.pool);
  return st.lessonsDone === st.lessons && enough && st.acc >= 0.75;
}

/** Höchste empfohlene Stufe: nächste Stufe erst, wenn die vorherige gefestigt ist. */
export function recommendedLevel(s: AppState, moduleId: string): number {
  let lvl = 1;
  while (lvl < 4 && levelSolid(s, moduleId, lvl)) lvl++;
  return lvl;
}

export function dueItems(s: AppState, now = Date.now()) {
  const out: { key: string; kind: 'karte' | 'frage'; id: string; overdue: number }[] = [];
  for (const [key, it] of Object.entries(s.sr)) {
    if (it.due > now) continue;
    const [p, id] = [key.slice(0, 1), key.slice(2)];
    if (p === 'c' && !CARDS.some((c) => c.id === id)) continue;
    if (p === 'q' && !QUESTIONS.some((q) => q.id === id && q.type !== 'open')) continue;
    out.push({ key, kind: p === 'c' ? 'karte' : 'frage', id, overdue: (now - it.due) / 86_400_000 });
  }
  return out;
}

/** Karten, die zu bereits begonnenen Lektionen gehören, aber noch nie geübt wurden. */
export function newCardsAvailable(s: AppState) {
  const started = new Set(LESSONS.filter((l) => s.lessons[l.id]).flatMap((l) => l.topics));
  return CARDS.filter((c) => started.has(c.topic) && !s.sr['c:' + c.id]);
}

export interface ModuleRequirement { label: string; done: boolean; detail: string }

export function moduleRequirements(s: AppState, moduleId: string): ModuleRequirement[] {
  const lessons = LESSONS.filter((l) => l.moduleId === moduleId);
  const ld = lessons.filter((l) => s.lessons[l.id]?.completedAt).length;
  const exam = s.exams.filter((e) => e.moduleId === moduleId && e.kind === 'modul');
  const bestExam = exam.reduce((m, e) => Math.max(m, e.score), 0);
  const sims = SCENARIOS.filter((x) => x.moduleId === moduleId && x.status === 'verfuegbar');
  const simsOk = sims.filter((x) => (s.scenarios[x.id] ?? []).some((r) => r.passed)).length;
  const tasks = TASKS.filter((t) => t.moduleId === moduleId);
  const tasksSub = tasks.filter((t) => ['eingereicht', 'bestaetigt'].includes(s.practice[t.id]?.status ?? '')).length;
  return [
    { label: 'Alle Lektionen abgeschlossen', done: ld === lessons.length, detail: `${ld} von ${lessons.length}` },
    { label: 'Modulprüfung bestanden (≥ 75 %, offene Fragen ≥ 50 %)', done: exam.some((e) => e.passed), detail: exam.length ? `bestes Ergebnis ${Math.round(bestExam * 100)} %` : 'noch nicht abgelegt' },
    { label: 'Alle Baustellenfälle bestanden (≥ 70 %, kein kritischer Fehler)', done: simsOk === sims.length && sims.length > 0, detail: `${simsOk} von ${sims.length}` },
    { label: 'Mindestens ein Praxisauftrag eingereicht', done: tasksSub >= 1, detail: `${tasksSub} von ${tasks.length} eingereicht` },
  ];
}

export function moduleProgress(s: AppState, moduleId: string): number {
  const req = moduleRequirements(s, moduleId);
  const lessons = LESSONS.filter((l) => l.moduleId === moduleId);
  if (!lessons.length) return 0;
  const lessonShare = lessons.reduce((x, l) => {
    const p = s.lessons[l.id];
    if (!p) return x;
    if (p.completedAt) return x + 1;
    return x + Math.min(0.9, p.seen.filter((id) => l.steps.some((st) => st.id === id)).length / l.steps.length);
  }, 0) / lessons.length;
  const other = req.slice(1).filter((r) => r.done).length / 3;
  return lessonShare * 0.55 + other * 0.45;
}

export function overallProgress(s: AppState): number {
  const avail = MODULES.filter((m) => m.status === 'verfuegbar');
  // Gesamtfortschritt bezogen auf alle 12 Module (nicht nur verfügbare)
  return avail.reduce((x, m) => x + moduleProgress(s, m.id), 0) / MODULES.length;
}

export interface Recommendation { title: string; why: string; href: string; kind: 'wiederholung' | 'lektion' | 'szenario' | 'pruefung' | 'praxis' | 'luecke' }

export function recommendations(s: AppState, now = Date.now()): Recommendation[] {
  const recs: Recommendation[] = [];
  const due = dueItems(s, now);
  if (due.length) recs.push({ kind: 'wiederholung', title: `${due.length} Wiederholung${due.length === 1 ? '' : 'en'} fällig`, why: 'Fällige Wiederholungen festigen das Wissen am wirksamsten, bevor es verblasst.', href: '#wiederholung' });
  const gaps = knowledgeGaps(s);
  const danger = topicCompetence(s).filter((t) => t.dangerous.length);
  if (danger.length) recs.push({ kind: 'luecke', title: `Fehlannahme klären: ${danger[0].title}`, why: 'Sie haben hier eine Frage falsch beantwortet, waren sich aber sicher. Solche Irrtümer sind auf der Baustelle am gefährlichsten.', href: '#wiederholung' });
  const started = LESSONS.find((l) => s.lessons[l.id] && !s.lessons[l.id].completedAt);
  if (started) recs.push({ kind: 'lektion', title: `Weiter: ${started.title}`, why: `Begonnen, bei Schritt ${Math.max(1, started.steps.findIndex((st) => st.id === s.lessons[started.id].cur) + 1)} von ${started.steps.length}.`, href: '#lektion-' + started.id });
  const next = LESSONS.find((l) => !s.lessons[l.id]);
  if (next && !started) {
    const rec = recommendedLevel(s, next.moduleId);
    if (next.level > rec && gaps.length) recs.push({ kind: 'luecke', title: `Erst Stufe ${rec} festigen: ${gaps[0].title}`, why: `Die nächste Lektion ist Stufe ${next.level}. Ihre Antworten auf Stufe ${rec} liegen noch unter 75 % – eine Wiederholung lohnt sich zuerst. Sie können trotzdem weitergehen.`, href: '#wiederholung' });
    recs.push({ kind: 'lektion', title: `Nächste Lektion: ${next.title}`, why: `Stufe ${next.level} · ca. ${next.minutes} Minuten.`, href: '#lektion-' + next.id });
  }
  for (const sc of SCENARIOS.filter((x) => x.status === 'verfuegbar')) {
    const ready = sc.topics.some((t) => LESSONS.some((l) => l.topics.includes(t) && s.lessons[l.id]?.completedAt));
    if (ready && !(s.scenarios[sc.id] ?? []).some((r) => r.passed)) {
      recs.push({ kind: 'szenario', title: `Fall ${sc.code}: ${sc.title}`, why: 'Wenden Sie das Gelernte in einer Entscheidungssituation an.', href: '#szenario-' + sc.id });
      break;
    }
  }
  const allLessons = LESSONS.filter((l) => l.moduleId === 'm2').every((l) => s.lessons[l.id]?.completedAt);
  if (allLessons && !s.exams.some((e) => e.kind === 'modul' && e.passed)) recs.push({ kind: 'pruefung', title: 'Modulprüfung Gewässerschutz', why: 'Alle Lektionen sind abgeschlossen. Prüfen Sie Ihr Wissen unter Prüfungsbedingungen.', href: '#pruefung' });
  const openTask = TASKS.find((t) => s.lessons[LESSONS.find((l) => l.steps.some((st) => st.kind === 'practice' && st.taskId === t.id))?.id ?? '']?.completedAt && (s.practice[t.id]?.status ?? 'offen') === 'offen');
  if (openTask) recs.push({ kind: 'praxis', title: `Praxisauftrag: ${openTask.title}`, why: 'Übertragen Sie das Gelernte auf eine reale Baustelle.', href: '#werkzeuge' });
  return recs.slice(0, 5);
}

export function studyMinutes(s: AppState, days?: number): number {
  const entries = Object.entries(s.studySec);
  if (!days) return Math.round(entries.reduce((x, [, v]) => x + v, 0) / 60);
  const cutoff = Date.now() - days * 86_400_000;
  return Math.round(entries.filter(([k]) => new Date(k).getTime() >= cutoff - 86_400_000).reduce((x, [, v]) => x + v, 0) / 60);
}
