import { useMemo, useState } from 'react';
import { C, CARDS, Q, QUESTIONS } from '../content';
import { useStore } from '../store';
import { QuestionBlock } from '../components/Question';
import { RichText } from '../components/RichText';
import { SourceList, Section } from '../components/ui';
import { dueItems, knowledgeGaps, lastAnswers, newCardsAvailable, recordCard } from '../lib/learning';
import { overdueRatio } from '../lib/srs';
import { interleave, rng, shuffle } from '../lib/exam';
import type { Confidence } from '../lib/state';
import { topicTitle } from '../lib/coach';
import { Icon } from '../components/Icons';

type Item = { kind: 'karte' | 'frage'; id: string };

export function ReviewView() {
  const { s, log } = useStore();
  const [queue, setQueue] = useState<Item[] | null>(null);
  const [pos, setPos] = useState(0);
  const [title, setTitle] = useState('');
  const now = Date.now();
  const due = dueItems(s, now);
  const fresh = newCardsAvailable(s);
  const gaps = knowledgeGaps(s);
  const last = lastAnswers(s);
  const danger = [...last.values()].filter((a) => !a.correct && a.conf === 3).map((a) => a.q);

  const upcoming = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => ({ i, n: 0 }));
    for (const it of Object.values(s.sr)) {
      const d = Math.floor((it.due - now) / 86_400_000);
      if (d >= 0 && d < 7) days[d].n++;
    }
    return days;
  }, [s.sr, now]);

  const start = (items: Item[], t: string) => {
    setQueue(items);
    setPos(0);
    setTitle(t);
  };

  const startDue = () => {
    // Priorität: Fehlannahmen zuerst, dann nach Überfälligkeit; Themen gemischt
    const scored = due.map((d) => {
      const it = s.sr[d.key];
      const topic = d.kind === 'karte' ? C.get(d.id)?.topic : Q.get(d.id)?.topic;
      return { ...d, topic, prio: (danger.includes(d.id) ? 10 : 0) + overdueRatio(it, now) };
    }).sort((a, b) => b.prio - a.prio).slice(0, 20);
    const mixed = interleave(scored.map((x) => ({ ...x, topic: x.topic ?? '' })));
    start(mixed.map((x) => ({ kind: x.kind, id: x.id })), 'Fällige Wiederholungen');
  };

  if (queue) {
    if (pos >= queue.length) {
      return (
        <div className="page narrow">
          <header className="page-head result-head ok"><span className="eyebrow">Wiederholung</span><h1>{title}: abgeschlossen</h1></header>
          <p>{queue.length} Elemente wiederholt. Die nächsten Termine wurden anhand Ihrer Antworten und Ihrer Sicherheit neu geplant.</p>
          <div className="row"><button type="button" className="btn primary" onClick={() => setQueue(null)}>Zur Übersicht</button><a className="btn" href="#dashboard">Zum Dashboard</a></div>
        </div>
      );
    }
    const it = queue[pos];
    const next = () => {
      if (pos + 1 >= queue.length) log('wiederholung', title, `${queue.length} Elemente`);
      setPos(pos + 1);
    };
    return (
      <div className="page review narrow">
        <button type="button" className="back-link linkish" onClick={() => setQueue(null)}><Icon name="back" size={16} /> Alle Wiederholungen</button>
        <div className="row spread"><h1>{title}</h1><span className="mono count-pill">{pos + 1} / {queue.length}</span></div>
        <div className="seg-bar" aria-hidden="true">{queue.map((_, k) => <span key={k} className={k === pos ? 'cur' : k < pos ? 'seen' : ''} />)}</div>
        {it.kind === 'karte' ? <Flashcard key={it.id + pos} id={it.id} onDone={next} /> : (
          <div key={it.id + pos}>
            <QuestionBlock q={Q.get(it.id)!} ctx="wiederholung" onAnswered={() => undefined} />
            <div className="q-actions"><button type="button" className="btn primary" onClick={next}>Weiter</button></div>
          </div>
        )}
      </div>
    );
  }

  const answeredTopics = new Set([...last.keys()].map((q) => Q.get(q)?.topic));
  const mixPool = QUESTIONS.filter((q) => q.type !== 'open' && answeredTopics.has(q.topic));

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Praxis & Training</span>
        <h1>Wiederholungen.</h1>
        <p className="lead">Verteiltes Wiederholen: Karten und Fragen kommen wieder, kurz bevor Sie sie vergessen würden. Der Abstand richtet sich danach, ob Sie richtig lagen, wie sicher Sie waren und wie lange die letzte Wiederholung her ist.</p>
      </header>
      <div className="cards three">
        <article className="card action-card primary-card">
          <span className="ec-ico"><Icon name="review" size={22} /></span>
          <span className="eyebrow">Heute fällig</span>
          <p className="big mono">{due.length}</p>
          <button type="button" className="btn primary" disabled={!due.length} onClick={startDue}>Wiederholung starten</button>
          {!due.length && <p className="hint">Nichts fällig. Neue Karten entstehen, wenn Sie Lektionen abschliessen.</p>}
        </article>
        <article className="card action-card">
          <span className="ec-ico"><Icon name="terms" size={22} /></span>
          <span className="eyebrow">Neue Karten</span>
          <p className="big mono">{fresh.length}</p>
          <button type="button" className="btn" disabled={!fresh.length} onClick={() => start(fresh.slice(0, 10).map((c) => ({ kind: 'karte', id: c.id })), 'Neue Karten')}>Neue Karten lernen</button>
          {!fresh.length && <p className="hint">Beginnen Sie eine Lektion, um Karten freizuschalten.</p>}
        </article>
        <article className="card action-card">
          <span className="ec-ico"><Icon name="layers" size={22} /></span>
          <span className="eyebrow">Gemischte Übung</span>
          <p className="big mono">{Math.min(8, mixPool.length)}</p>
          <button type="button" className="btn" disabled={mixPool.length < 4} onClick={() => start(interleave(shuffle(mixPool, rng(Date.now())).slice(0, 8)).map((q) => ({ kind: 'frage', id: q.id })), 'Gemischte Übung')}>Themen mischen</button>
          <p className="hint">Fragen aus bereits bearbeiteten Themen, abwechselnd gemischt (Interleaving).</p>
        </article>
      </div>
      {gaps.length > 0 && (
        <Section title="Schwächen gezielt trainieren">
          <ul className="gaplist">
            {gaps.slice(0, 4).map((g) => (
              <li key={g.topic}>
                <div><strong>{g.title}</strong><span className="hint"> {Math.round(g.accuracy * 100)} % richtig{g.dangerous.length ? ` · ${g.dangerous.length} Fehlannahme(n)` : ''}</span></div>
                <button type="button" className="btn small" onClick={() => start(interleave(QUESTIONS.filter((q) => q.topic === g.topic && q.type !== 'open')).map((q) => ({ kind: 'frage' as const, id: q.id })).slice(0, 6), 'Training: ' + topicTitle(g.topic))}>Trainieren</button>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <Section title="Die nächsten 7 Tage">
        <div className="forecast">
          {upcoming.map((d) => (
            <div key={d.i} className="fc-day">
              <span className="fc-bar" style={{ height: `${Math.min(100, d.n * 8)}%` }} />
              <span className="mono">{d.n}</span>
              <span className="fc-l">{d.i === 0 ? 'heute' : new Date(now + d.i * 86_400_000).toLocaleDateString('de-CH', { weekday: 'short' })}</span>
            </div>
          ))}
        </div>
        <p className="hint">{Object.keys(s.sr).length} Elemente im Wiederholungsplan · {CARDS.length} Karten in den verfügbaren Modulen.</p>
      </Section>
    </div>
  );
}

function Flashcard({ id, onDone }: { id: string; onDone: () => void }) {
  const c = C.get(id);
  const { update } = useStore();
  const [shown, setShown] = useState(false);
  const [guess, setGuess] = useState('');
  if (!c) return null;
  const rate = (correct: boolean, conf: Confidence | undefined) => {
    update((s) => recordCard(s, id, correct, conf));
    onDone();
  };
  return (
    <div className="flashcard">
      <span className="eyebrow">Karte · {topicTitle(c.topic)}</span>
      <p className="fc-front">{c.front}</p>
      {!shown ? (
        <>
          <textarea id={'fc-' + id} rows={3} value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Antwort aus dem Gedächtnis notieren (optional, hilft beim ehrlichen Vergleich)" />
          <button type="button" className="btn primary" onClick={() => setShown(true)}>Antwort zeigen</button>
        </>
      ) : (
        <>
          <div className="fc-back"><RichText text={c.back} /></div>
          <SourceList ids={c.sources} compact />
          <p className="hint">Wie gut wussten Sie es?</p>
          <div className="row">
            <button type="button" className="btn crit" onClick={() => rate(false, 2)}>Nicht gewusst</button>
            <button type="button" className="btn crit" onClick={() => rate(false, 3)} title="Sie waren sich sicher, lagen aber falsch">Sicher – aber falsch</button>
            <button type="button" className="btn" onClick={() => rate(true, 1)}>Gewusst, unsicher</button>
            <button type="button" className="btn primary" onClick={() => rate(true, 3)}>Gewusst, sicher</button>
          </div>
        </>
      )}
    </div>
  );
}
