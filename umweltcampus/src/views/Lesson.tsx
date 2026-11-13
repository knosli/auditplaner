import { useEffect, useRef } from 'react';
import { CARDS, L, LEVEL_LABEL, LESSONS, MODULES, Q } from '../content';
import type { Lesson, Step } from '../content/types';
import { useStore } from '../store';
import { RichText } from '../components/RichText';
import { QuestionBlock } from '../components/Question';
import { Diagram } from '../components/Diagrams';
import { FeynmanBlock, PracticeCard } from '../components/Practice';
import { SiteTaskBlock } from '../components/SiteTask';
import { ReviewBadge, SourceList, Bar } from '../components/ui';
import { newItem } from '../lib/srs';
import type { LessonProgress } from '../lib/state';

const STEP_LABEL: Record<Step['kind'], string> = {
  situation: 'Einstieg', quiz: 'Wissensabfrage', brief: 'Kurz erklärt', explain: 'Erklärung', diagram: 'Schema', example: 'Beispiel', deep: 'Vertiefung',
  decision: 'Entscheidung', sitetask: 'Baustellenaufgabe', review: 'Wiederholung', feynman: 'Erklären', practice: 'Praxisauftrag', summary: 'Zusammenfassung', sources: 'Quellen',
};

function stepLabel(st: Step): string {
  if (st.kind === 'decision' && st.id.endsWith('-abw')) return 'Abwägung';
  if (st.kind === 'example') return st.context === 'Hoch- und Tiefbau' ? 'Beispiel' : 'Beispiel ' + st.context;
  return STEP_LABEL[st.kind];
}

const fresh = (firstId: string): LessonProgress => ({ cur: firstId, seen: [firstId], startedAt: Date.now(), answers: {}, open: {} });

export function LessonView({ id }: { id: string }) {
  const lesson = L.get(id);
  const { s, update, log, setCoachCtx } = useStore();
  const top = useRef<HTMLDivElement>(null);
  const p: LessonProgress | undefined = s.lessons[id];

  useEffect(() => {
    if (!lesson) return;
    if (s.lessons[id]) return;
    update((x) => (x.lessons[id] ? x : { ...x, lessons: { ...x.lessons, [id]: fresh(lesson.steps[0].id) } }));
    log('lektion_start', id, lesson.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Aktueller Schritt über seine ID; unbekannte IDs (z. B. entfernte Schritte) → erster Schritt
  const idx = lesson ? Math.max(0, lesson.steps.findIndex((st) => st.id === p?.cur)) : 0;

  useEffect(() => {
    if (!lesson) return;
    const st = lesson.steps[idx];
    setCoachCtx({ label: `Lektion «${lesson.title}», Schritt: ${st?.title ?? ''}`, text: `Lernziele: ${lesson.objectives.join('; ')}` });
    return () => setCoachCtx(null);
  }, [lesson, idx, setCoachCtx]);

  if (!lesson) return <div className="page"><p>Lektion nicht gefunden.</p><a href="#module">Zur Modulübersicht</a></div>;
  const mod = MODULES.find((m) => m.id === lesson.moduleId)!;
  const seen = new Set(p?.seen ?? []);

  const go = (i: number) => {
    const sid = lesson.steps[i].id;
    update((x) => {
      const cur = x.lessons[id] ?? fresh(lesson.steps[0].id);
      return { ...x, lessons: { ...x.lessons, [id]: { ...cur, cur: sid, seen: cur.seen.includes(sid) ? cur.seen : [...cur.seen, sid] } } };
    });
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const complete = () => {
    const now = Date.now();
    const wasDone = !!p?.completedAt;
    update((x) => {
      const sr = { ...x.sr };
      for (const c of CARDS.filter((c) => lesson.topics.includes(c.topic) && c.level <= lesson.level + 1)) if (!sr['c:' + c.id]) sr['c:' + c.id] = newItem(now + 86_400_000);
      const cur = x.lessons[id] ?? fresh(lesson.steps[0].id);
      return { ...x, sr, lessons: { ...x.lessons, [id]: { ...cur, completedAt: cur.completedAt ?? now } } };
    });
    if (!wasDone) log('lektion_ende', id, lesson.title);
    const cand = LESSONS[LESSONS.findIndex((l) => l.id === id) + 1];
    const next = cand && cand.moduleId === lesson.moduleId ? cand : null;
    location.hash = next ? '#lektion-' + next.id : '#modul-' + lesson.moduleId;
  };

  const answered = (qid: string) => !!p?.answers[qid] || !!p?.open[qid];
  const qIds = lesson.steps.flatMap((st) => (st.kind === 'quiz' || st.kind === 'review' ? st.questionIds : st.kind === 'decision' ? [st.questionId] : []));
  const missing = qIds.filter((q) => !answered(q)).length;
  const cur = lesson.steps[idx];
  const isLast = idx === lesson.steps.length - 1;

  return (
    <div className="page lesson" ref={top}>
      <nav className="crumbs"><a href="#module">Fachmodule</a> / <a href={'#modul-' + mod.id}>Modul {mod.no}</a> / <span>Lektion {lesson.order}</span></nav>
      <header className="lesson-head">
        <div>
          <span className="eyebrow">{LEVEL_LABEL[lesson.level]} · ca. {lesson.minutes} Min. (mit Vertiefung und Aufgabe länger)</span>
          <h1>{lesson.title}</h1>
        </div>
        <ReviewBadge status={lesson.review} />
      </header>
      <details className="objectives" open={idx === 0}>
        <summary>Lernziele</summary>
        <ul>{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
      </details>
      <ol className="stepper" aria-label="Schritte der Lektion">
        {lesson.steps.map((st, i) => (
          <li key={st.id}>
            <button type="button" className={(i === idx ? 'cur ' : '') + (seen.has(st.id) ? 'seen' : '')} onClick={() => go(i)} aria-current={i === idx ? 'step' : undefined} title={st.title}>
              <span className="mono">{i + 1}</span><span className="st-l">{stepLabel(st)}</span>
            </button>
          </li>
        ))}
      </ol>
      <Bar value={lesson.steps.filter((st) => seen.has(st.id)).length / lesson.steps.length} label="Fortschritt der Lektion" small />

      <section className={'step step-' + cur.kind} key={cur.id}>
        <span className="eyebrow">{stepLabel(cur)}</span>
        <h2>{cur.title}</h2>
        <StepBody step={cur} lesson={lesson} />
      </section>

      <div className="step-nav">
        <button type="button" className="btn" disabled={idx === 0} onClick={() => go(idx - 1)}>Zurück</button>
        {!isLast && <button type="button" className="btn primary" onClick={() => go(idx + 1)}>Weiter: {stepLabel(lesson.steps[idx + 1])}</button>}
        {isLast && (
          <div className="finish">
            {missing > 0 && <span className="hint">{missing} Frage{missing === 1 ? '' : 'n'} noch nicht beantwortet – Sie können trotzdem abschliessen.</span>}
            <button type="button" className="btn primary" onClick={complete}>{p?.completedAt ? 'Weiter zur nächsten Lektion' : 'Lektion abschliessen'}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepBody({ step, lesson }: { step: Step; lesson: Lesson }) {
  const { s, update } = useStore();
  const p = s.lessons[lesson.id];
  const save = (qid: string, sel: string[], text?: string) =>
    update((x) => {
      const cur = x.lessons[lesson.id];
      if (!cur) return x;
      return { ...x, lessons: { ...x.lessons, [lesson.id]: { ...cur, answers: { ...cur.answers, [qid]: sel }, open: text ? { ...cur.open, [qid]: text } : cur.open } } };
    });
  const qs = (ids: string[]) => ids.map((qid, i) => {
    const q = Q.get(qid);
    if (!q) return null;
    return <QuestionBlock key={qid} q={q} ctx="lektion" label={ids.length > 1 ? `Frage ${i + 1}/${ids.length}` : undefined} initial={q.type !== 'open' ? p?.answers[qid] : undefined} initialText={p?.open[qid]} onAnswered={(sel, _sc, text) => save(qid, sel, text)} />;
  });
  switch (step.kind) {
    case 'situation':
      return <div className="situation"><RichText text={step.text} /><p className="hint">Überlegen Sie kurz, was Sie tun würden. Die Lektion greift die Situation wieder auf.</p></div>;
    case 'brief':
      return <div className="brief"><RichText text={step.text} /><p className="hint">Das Wesentliche in einer Minute – so können Sie es auf der Baustelle erklären. Die Erklärung und die Vertiefung folgen.</p></div>;
    case 'explain':
    case 'deep':
      return <RichText text={step.text} />;
    case 'example':
      return <><span className="badge">{step.context}</span><RichText text={step.text} /></>;
    case 'diagram':
      return <figure><Diagram id={step.diagram} /><figcaption>{step.caption}</figcaption></figure>;
    case 'quiz':
      return <><p className="hint">Beantworten Sie die Fragen, bevor Sie die Erklärung lesen. Fehler sind hier erwünscht – sie zeigen, worauf Sie achten müssen.</p>{qs(step.questionIds)}</>;
    case 'review':
      return <>{qs(step.questionIds)}</>;
    case 'decision':
      return <>{qs([step.questionId])}</>;
    case 'sitetask':
      return <SiteTaskBlock id={step.taskId} />;
    case 'feynman':
      return <FeynmanBlock id={step.feynmanId} />;
    case 'practice':
      return <><PracticeCard taskId={step.taskId} /><p className="hint">Den Auftrag können Sie später unter «Praxiswerkzeuge» weiterbearbeiten.</p></>;
    case 'summary':
      return <ul className="summary">{step.points.map((x) => <li key={x}>{x}</li>)}</ul>;
    case 'sources':
      return <>
        <div className="callout law"><span className="callout-label">Verlässlichkeit</span><span>Die Inhalte stehen auf Prüfstatus «Entwurf». Ausgewählte Rechtsaussagen sind über kantonale Vollzugshilfen bestätigt (gekennzeichnet), aber noch nicht durch eine Fachperson am Originaltext geprüft. Kantone, Gemeinden, Bewilligungsauflagen und besondere Projektbedingungen können zusätzliche Anforderungen stellen. Bei kritischen Entscheiden aktuelle Vorgaben prüfen und Fachpersonen beiziehen.</span></div>
        <SourceList ids={step.sourceIds} />
      </>;
  }
}
