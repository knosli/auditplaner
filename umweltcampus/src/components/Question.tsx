import { useState } from 'react';
import type { Question, RubricPoint } from '../content/types';
import { recordAnswer, rubricHints, scoreQuestion } from '../lib/learning';
import type { AnswerRecord, Confidence } from '../lib/state';
import { useStore } from '../store';
import { InlineText, RichText } from './RichText';
import { ConfidencePicker, SourceList } from './ui';
import { feedbackPrompt } from '../lib/coach';
import { aiErrorText } from '../lib/platform';
import { LEVEL_SHORT } from '../content';

interface Props {
  q: Question;
  ctx: AnswerRecord['ctx'];
  /** Bereits gegebene Antwort (Wiederaufnahme) */
  initial?: string[];
  initialText?: string;
  onAnswered?: (selected: string[], score: number, text?: string) => void;
  /** Prüfungsmodus: keine Rückmeldung, Auswertung erfolgt am Ende */
  silent?: boolean;
  label?: string;
}

export function QuestionBlock({ q, ctx, initial, initialText, onAnswered, silent, label }: Props) {
  if (q.type === 'open') return <OpenQuestion q={q} ctx={ctx} initialText={initialText} onAnswered={onAnswered} silent={silent} label={label} />;
  return <ClosedQuestion q={q} ctx={ctx} initial={initial} onAnswered={onAnswered} silent={silent} label={label} />;
}

function ClosedQuestion({ q, ctx, initial, onAnswered, silent, label }: Props) {
  const { s, update } = useStore();
  const [sel, setSel] = useState<string[]>(initial ?? []);
  const [conf, setConf] = useState<Confidence | undefined>();
  const [done, setDone] = useState(!!initial?.length);
  const askConf = s.settings.askConfidence;
  const score = scoreQuestion(q, sel);

  const toggle = (id: string) => {
    if (done) return;
    if (q.type === 'single') setSel([id]);
    else setSel((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]));
  };
  const check = () => {
    setDone(true);
    update((st) => recordAnswer(st, q.id, score, conf, ctx));
    onAnswered?.(sel, score);
  };
  const canCheck = sel.length > 0 && (!askConf || conf !== undefined);
  const name = `q-${q.id}-${ctx}`;

  return (
    <div className={'question' + (done && !silent ? (score === 1 ? ' is-ok' : score > 0 ? ' is-part' : ' is-wrong') : '')}>
      <div className="q-meta">
        {label && <span>{label}</span>}
        <span>Stufe {q.level} · {LEVEL_SHORT[q.level]}</span>
        <span>{q.type === 'multi' ? 'Mehrere Antworten möglich' : 'Eine Antwort'}</span>
      </div>
      <p className="q-prompt"><InlineText text={q.prompt} /></p>
      <div className="options" role={q.type === 'single' ? 'radiogroup' : 'group'}>
        {q.options?.map((o) => {
          const chosen = sel.includes(o.id);
          const isCorrect = q.correct?.includes(o.id);
          const cls = ['opt', chosen ? 'chosen' : '', done && !silent && isCorrect ? 'correct' : '', done && !silent && chosen && !isCorrect ? 'wrong' : ''].join(' ');
          return (
            <label key={o.id} className={cls}>
              <input type={q.type === 'single' ? 'radio' : 'checkbox'} name={name} checked={chosen} disabled={done} onChange={() => toggle(o.id)} />
              <span><InlineText text={o.text} /></span>
              {done && !silent && isCorrect && <span className="opt-mark">richtig</span>}
            </label>
          );
        })}
      </div>
      {!done && (
        <div className="q-actions">
          {askConf && <ConfidencePicker value={conf} onChange={setConf} name={name + '-conf'} />}
          <button type="button" className="btn primary" disabled={!canCheck} onClick={check}>{silent ? 'Antwort speichern' : 'Antwort prüfen'}</button>
          {askConf && sel.length > 0 && conf === undefined && <span className="hint">Bitte zuerst Ihre Sicherheit angeben.</span>}
        </div>
      )}
      {done && silent && <p className="hint">Antwort gespeichert. Die Auswertung folgt am Ende.</p>}
      {done && !silent && <Feedback q={q} score={score} conf={conf} />}
    </div>
  );
}

function Feedback({ q, score, conf }: { q: Question; score: number; conf?: Confidence }) {
  return (
    <div className="feedback">
      <p className="fb-verdict">
        {score === 1 ? 'Richtig.' : score > 0 ? `Teilweise richtig (${Math.round(score * 100)} %).` : 'Nicht richtig.'}
        {score < 1 && conf === 3 && <span className="danger-note"> Sie waren sich sicher – das ist eine Fehlannahme, die wir gezielt wiederholen.</span>}
        {score === 1 && conf === 1 && <span className="muted"> Richtig, aber unsicher – kommt bald wieder.</span>}
      </p>
      <RichText text={q.explanation} />
      {q.commonErrors.length > 0 && (
        <div className="errors">
          <h5>Häufige Fehler</h5>
          <ul>{q.commonErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}
      <SourceList ids={q.sources} compact />
    </div>
  );
}

function OpenQuestion({ q, ctx, initialText, onAnswered, silent, label }: Props) {
  const { update } = useStore();
  const [text, setText] = useState(initialText ?? '');
  const [phase, setPhase] = useState<'write' | 'rate' | 'done'>(initialText ? 'done' : 'write');
  const [ticks, setTicks] = useState<string[]>([]);
  const rubric = q.rubric ?? [];
  const finish = () => {
    const score = rubric.length ? ticks.length / rubric.length : 0;
    setPhase('done');
    update((st) => recordAnswer(st, q.id, score >= 0.8 ? 1 : score, undefined, ctx));
    onAnswered?.(ticks, score, text);
  };
  return (
    <div className="question open">
      <div className="q-meta">
        {label && <span>{label}</span>}
        <span>Stufe {q.level} · {LEVEL_SHORT[q.level]}</span>
        <span>Offene Fachfrage</span>
      </div>
      <p className="q-prompt"><InlineText text={q.prompt} /></p>
      <textarea id={`open-${q.id}-${ctx}`} value={text} onChange={(e) => setText(e.target.value)} rows={6} disabled={phase !== 'write'} placeholder="Ihre Antwort in eigenen Worten …" />
      {phase === 'write' && (
        <div className="q-actions">
          <button type="button" className="btn primary" disabled={text.trim().length < 40} onClick={() => setPhase('rate')}>Antwort abschliessen und bewerten</button>
          {text.trim().length < 40 && <span className="hint">Mindestens einige Sätze schreiben.</span>}
        </div>
      )}
      {phase === 'rate' && <RubricRating rubric={rubric} text={text} ticks={ticks} setTicks={setTicks} onDone={finish} task={q.prompt} noAI={silent} />}
      {phase === 'done' && !silent && (
        <div className="feedback">
          <h5>Musterüberlegung</h5>
          <RichText text={q.explanation} />
          <div className="errors"><h5>Häufige Fehler</h5><ul>{q.commonErrors.map((e, i) => <li key={i}>{e}</li>)}</ul></div>
          <SourceList ids={q.sources} compact />
        </div>
      )}
      {phase === 'done' && silent && <p className="hint">Antwort und Selbstbewertung gespeichert.</p>}
    </div>
  );
}

/**
 * Bewertung offener Antworten: Raster wird gezeigt, Stichwort-Treffer als
 * Hinweis markiert, die Person entscheidet ehrlich selbst. Optional KI-Feedback.
 */
export function RubricRating({ rubric, text, ticks, setTicks, onDone, task, audience, noAI }: { rubric: RubricPoint[]; text: string; ticks: string[]; setTicks: (t: string[]) => void; onDone: () => void; task: string; audience?: string; noAI?: boolean }) {
  const { ai, s } = useStore();
  const hints = rubricHints(text, rubric);
  const [aiText, setAiText] = useState<string | null>(null);
  const [aiErr, setAiErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const askAI = async () => {
    if (!ai) return;
    setBusy(true);
    setAiErr(null);
    setAiText('Claude denkt nach …');
    try {
      const r = await ai(feedbackPrompt(task, audience, rubric, text), { onText: ({ text: t }: { text: string }) => setAiText(t) });
      setAiText(r.text);
    } catch (e: any) {
      setAiText(e?.text ?? null);
      setAiErr(aiErrorText(e?.code));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="rubric">
      <h5>Bewertungsraster – haken Sie ehrlich ab, was Ihre Antwort tatsächlich enthält</h5>
      <ul>
        {rubric.map((r) => (
          <li key={r.id}>
            <label>
              <input type="checkbox" checked={ticks.includes(r.id)} onChange={() => setTicks(ticks.includes(r.id) ? ticks.filter((x) => x !== r.id) : [...ticks, r.id])} />
              <span>{r.text}</span>
              {hints.includes(r.id) && <span className="hintchip" title="Ein passendes Stichwort wurde gefunden. Das ist nur ein Hinweis, keine Bewertung.">Stichwort gefunden</span>}
            </label>
          </li>
        ))}
      </ul>
      <p className="hint">Die Stichwort-Markierung ist eine einfache, regelbasierte Vorprüfung und kann irren. Massgebend ist Ihre Beurteilung{ai && !noAI ? ' (das KI-Feedback hilft dabei)' : ''}.</p>
      <div className="q-actions">
        {ai && !noAI && s.settings.coachMode !== 'pruefen' && <button type="button" className="btn" onClick={askAI} disabled={busy}>{busy ? 'Feedback läuft …' : 'KI-Feedback einholen'}</button>}
        <button type="button" className="btn primary" onClick={onDone}>Bewertung speichern ({ticks.length}/{rubric.length})</button>
      </div>
      {aiText && <div className="aibox"><span className="badge ai">KI-Feedback · nicht fachlich geprüft</span><RichText text={aiText} /></div>}
      {aiErr && <p className="error">{aiErr}</p>}
    </div>
  );
}
