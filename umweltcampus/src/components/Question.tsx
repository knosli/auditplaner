import { useState } from 'react';
import type { Question, RubricPoint } from '../content/types';
import { criticalChoice, recordAnswer, rubricHints, scoreQuestion } from '../lib/learning';
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
    if (q.type === 'single' || q.type === 'best') setSel([id]);
    else setSel((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]));
  };
  const check = () => {
    setDone(true);
    const crit = criticalChoice(q, sel);
    update((st) => recordAnswer(st, q.id, score, conf, ctx, Date.now(), { crit }));
    onAnswered?.(sel, crit ? 0 : score);
  };
  const canCheck = sel.length > 0 && (!askConf || conf !== undefined);
  const name = `q-${q.id}-${ctx}`;

  return (
    <div className={'question' + (done && !silent ? (score === 1 ? ' is-ok' : score > 0 ? ' is-part' : ' is-wrong') : '')}>
      <div className="q-meta">
        {label && <span>{label}</span>}
        <span>Stufe {q.level} · {LEVEL_SHORT[q.level]}</span>
        <span>{q.type === 'multi' ? 'Mehrere Antworten möglich' : q.type === 'best' ? 'Abwägung – mehrere Antworten sind vertretbar, wählen Sie die beste' : 'Eine Antwort'}</span>
      </div>
      <p className="q-prompt"><InlineText text={q.prompt} /></p>
      <div className="options" role={q.type === 'multi' ? 'group' : 'radiogroup'}>
        {q.options?.map((o) => {
          const chosen = sel.includes(o.id);
          const isCorrect = q.correct?.includes(o.id);
          const best = q.type === 'best';
          const w = o.weight ?? 0;
          const good = best ? w >= 0.999 : isCorrect;
          const cls = ['opt', chosen ? 'chosen' : '', done && !silent && good ? 'correct' : '', done && !silent && best && !good && w >= 0.5 ? 'partial' : '', done && !silent && chosen && !good && (!best || w < 0.5) ? 'wrong' : ''].join(' ');
          return (
            <label key={o.id} className={cls}>
              <input type={q.type === 'multi' ? 'checkbox' : 'radio'} name={name} checked={chosen} disabled={done} onChange={() => toggle(o.id)} />
              <span><InlineText text={o.text} /></span>
              {done && !silent && (best ? <span className={'opt-mark ' + weightClass(w)}>{weightLabel(w, o.critical)}</span> : isCorrect && <span className="opt-mark">richtig</span>)}
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
      {done && !silent && <Feedback q={q} score={score} conf={conf} sel={sel} />}
    </div>
  );
}

export function weightLabel(w: number, critical?: boolean) {
  if (critical) return 'kritisch – unzulässig';
  return w >= 0.999 ? 'am besten geeignet' : w >= 0.5 ? 'unter Voraussetzungen vertretbar' : w > 0 ? 'wenig geeignet' : 'ungeeignet';
}
function weightClass(w: number) {
  return w >= 0.999 ? 'w-best' : w >= 0.5 ? 'w-ok' : 'w-bad';
}

function Feedback({ q, score, conf, sel }: { q: Question; score: number; conf?: Confidence; sel: string[] }) {
  const best = q.type === 'best';
  const crit = (q.options ?? []).filter((o) => o.critical && sel.includes(o.id));
  return (
    <div className="feedback">
      {crit.length > 0 && (
        <div className="callout crit"><span className="callout-label">Kritischer Fehler</span>
          <span>Diese Wahl würde ein Gewässer gefährden oder ist ohne Bewilligung unzulässig. Sie erhält 0 Punkte und wird wie eine Fehlannahme gezielt wiederholt – unabhängig davon, wie sicher Sie waren.</span>
        </div>
      )}
      <p className="fb-verdict">
        {best
          ? score >= 0.999 ? 'Sie haben die am besten geeignete Massnahme gewählt.' : score >= 0.5 ? `Vertretbar, aber nicht die beste Wahl (${Math.round(score * 100)} %).` : `Wenig geeignet (${Math.round(score * 100)} %).`
          : score === 1 ? 'Richtig.' : score > 0 ? `Teilweise richtig (${Math.round(score * 100)} %).` : 'Nicht richtig.'}
        {score < (best ? 0.5 : 1) && conf === 3 && <span className="danger-note"> Sie waren sich sicher – das ist eine Fehlannahme, die wir gezielt wiederholen.</span>}
        {score >= 0.999 && conf === 1 && <span className="muted"> Richtig, aber unsicher – kommt bald wieder.</span>}
      </p>
      {best && (
        <div className="analysis">
          <h5>Beurteilung aller Optionen</h5>
          {[...(q.options ?? [])].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)).map((o) => (
            <div key={o.id} className={'ana ' + weightClass(o.weight ?? 0) + (sel.includes(o.id) ? ' mine' : '')}>
              <div className="ana-head"><span className={'opt-mark ' + weightClass(o.weight ?? 0)}>{weightLabel(o.weight ?? 0, o.critical)}</span>{sel.includes(o.id) && <span className="badge">Ihre Wahl</span>}</div>
              <p className="ana-text">{o.text}</p>
              {o.why && <p><strong>Beurteilung:</strong> {o.why}</p>}
              {o.prerequisites && <p><strong>Voraussetzungen:</strong> {o.prerequisites}</p>}
              {o.risks && <p><strong>Risiken:</strong> {o.risks}</p>}
            </div>
          ))}
        </div>
      )}
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
    // Selbstbewertung: wird gespeichert, aber nie als «richtig» bzw. Fachnachweis verbucht
    update((st) => recordAnswer(st, q.id, score, undefined, ctx, Date.now(), { self: true }));
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
          <p className="hint">Ihre Selbstbewertung: {ticks.length} von {rubric.length} Rasterpunkten. Das ist eine Selbsteinschätzung, kein unabhängiger Fachnachweis.</p>
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
      <h5>Selbstbewertung am Raster – haken Sie ehrlich ab, was Ihre Antwort tatsächlich enthält</h5>
      <p className="hint">Die Selbstbewertung hilft beim Lernen und plant Wiederholungen. Sie zählt nicht als unabhängige Fachprüfung und nicht für «sicher beherrscht».</p>
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
