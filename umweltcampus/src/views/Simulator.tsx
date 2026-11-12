import { useEffect, useMemo, useState } from 'react';
import { CRITERION_LABEL, MODULES, S, SCENARIOS } from '../content';
import type { Scenario, ScenarioStage } from '../content/types';
import { useStore } from '../store';
import { InlineText, RichText } from '../components/RichText';
import { Bar, DevBadge, SourceList, fmtDateTime, pct } from '../components/ui';
import { RubricRating } from '../components/Question';
import { evaluateStage, nextStageId, summarize, type StageAnswer, type StageResult } from '../lib/scenario';

export function SimulatorView() {
  const { s } = useStore();
  return (
    <div className="page">
      <header className="page-head">
        <h1>Baustellensimulator</h1>
        <p className="lead">Realistische Situationen mit unvollständigen Informationen. Sie erfragen, was fehlt, setzen Prioritäten, entscheiden und begründen. Falsche Entscheide haben Folgen – schwere Umweltschäden werden nicht verharmlost.</p>
      </header>
      <div className="cards two">
        {SCENARIOS.map((sc) => {
          const runs = s.scenarios[sc.id] ?? [];
          const best = runs.reduce((m, r) => Math.max(m, r.total), 0);
          const mod = MODULES.find((m) => m.id === sc.moduleId);
          return (
            <article key={sc.id} className={'card scen' + (sc.status !== 'verfuegbar' ? ' muted-card' : '')}>
              <div className="scen-code mono">{sc.code}</div>
              <div className="scen-body">
                <span className="eyebrow">{sc.setting} · Stufe {sc.level} · Modul {mod?.no} {mod?.short}</span>
                <h3>{sc.title}</h3>
                <p>{sc.intro}</p>
                {sc.status === 'verfuegbar' ? (
                  <div className="row">
                    <a className="btn primary" href={'#szenario-' + sc.id}>{runs.length ? 'Erneut spielen' : 'Fall starten'}</a>
                    <span className="hint">{sc.stages.length > 6 ? '6–7' : sc.stages.length} Entscheidungsschritte · ca. {sc.minutes} Min.</span>
                    {runs.length > 0 && <span className={'status-pill ' + (runs.some((r) => r.passed) ? 'st-bestaetigt' : 'st-in_arbeit')}>{runs.some((r) => r.passed) ? 'bestanden' : 'nicht bestanden'} · bestes {pct(best)}</span>}
                  </div>
                ) : (
                  <div className="row"><DevBadge /><span className="hint">Folgt mit Modul {mod?.no}.</span></div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ScenarioPlayer({ id }: { id: string }) {
  const sc = S.get(id);
  const { s, update, log, setCoachCtx } = useStore();
  const [stageId, setStageId] = useState<string | null>(sc?.stages[0]?.id ?? null);
  const [results, setResults] = useState<StageResult[]>([]);
  const [answers, setAnswers] = useState<Record<string, StageAnswer>>({});
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sc) return;
    setCoachCtx({ label: `Baustellenfall ${sc.code}: ${sc.title}`, text: `Situation: ${sc.intro}\nIm Coach-Modus «Trainieren» keine Lösung verraten.`, locked: false });
    return () => setCoachCtx(null);
  }, [sc, setCoachCtx]);

  const stage = sc?.stages.find((x) => x.id === stageId) ?? null;
  const done = started && !stage;
  const run = useMemo(() => (done ? summarize(results) : null), [done, results]);

  useEffect(() => {
    if (!sc || !done || !run || saved) return;
    setSaved(true);
    update((x) => ({ ...x, scenarios: { ...x.scenarios, [sc.id]: [...(x.scenarios[sc.id] ?? []), run] } }));
    log('szenario', sc.id, `${sc.code}: ${pct(run.total)}${run.critical ? `, ${run.critical} kritisch` : ''}`);
  }, [sc, done, run, saved, update, log]);

  if (!sc || sc.status !== 'verfuegbar') return <div className="page"><p>Dieser Fall ist noch in Entwicklung.</p><a href="#simulator">Zum Simulator</a></div>;

  const restart = () => {
    setStageId(sc.stages[0].id);
    setResults([]);
    setAnswers({});
    setRevealed(false);
    setStarted(true);
    setSaved(false);
  };

  if (!started) {
    const last = (s.scenarios[sc.id] ?? []).slice(-1)[0];
    return (
      <div className="page scenario">
        <nav className="crumbs"><a href="#simulator">Baustellensimulator</a> / <span>Fall {sc.code}</span></nav>
        <header className="page-head">
          <span className="eyebrow">{sc.setting} · Stufe {sc.level} · ca. {sc.minutes} Min.</span>
          <h1>Fall {sc.code}: {sc.title}</h1>
        </header>
        <div className="scene">
          <p>{sc.intro}</p>
          <h4>Was Sie vor Ort sehen</h4>
          <ul>{sc.facts.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <p className="hint">Bewertet werden: {Object.values(CRITERION_LABEL).join(', ')}. Bestanden ab 70 % ohne kritischen Fehler.</p>
        {last && <p className="hint">Letzter Versuch: {fmtDateTime(last.at)} – {pct(last.total)}{last.passed ? ' (bestanden)' : ''}</p>}
        <button type="button" className="btn primary" onClick={restart}>Fall beginnen</button>
      </div>
    );
  }

  if (done && run) {
    const crit = sc.stages.flatMap((st) => (st.options ?? []).filter((o) => o.critical && answers[st.id]?.selected.includes(o.id)).map((o) => ({ st, o })));
    return (
      <div className="page scenario">
        <nav className="crumbs"><a href="#simulator">Baustellensimulator</a> / <span>Fall {sc.code} – Auswertung</span></nav>
        <header className="page-head">
          <h1>Auswertung Fall {sc.code}</h1>
          <p className={'verdict ' + (run.passed ? 'ok' : 'crit')}>{run.passed ? 'Bestanden' : 'Nicht bestanden'} · Gesamt {pct(run.total)}{run.critical ? ` · ${run.critical} kritische${run.critical === 1 ? 'r' : ''} Fehler` : ''}</p>
        </header>
        {crit.length > 0 && (
          <div className="callout crit"><span className="callout-label">Kritische Fehler</span>
            <span>
              {crit.map(({ st, o }) => <span key={o.id} className="block"><strong>{st.title}:</strong> {o.text} – {o.feedback}</span>)}
              <span className="block">Bei einem kritischen Fehler gilt der Fall unabhängig von der Punktzahl als nicht bestanden. In der Realität könnte ein solcher Entscheid einen Gewässerschaden, ein Strafverfahren und hohe Kosten auslösen.</span>
            </span>
          </div>
        )}
        <section className="section">
          <h2>Kompetenzprofil in diesem Fall</h2>
          <ul className="crit-bars">
            {Object.entries(CRITERION_LABEL).map(([k, label]) => run.byCriterion[k] === undefined ? null : (
              <li key={k}><span>{label}</span><Bar value={run.byCriterion[k]} tone={run.byCriterion[k] >= 0.7 ? 'ok' : run.byCriterion[k] >= 0.4 ? 'warn' : 'crit'} label={label} /><span className="mono">{pct(run.byCriterion[k])}</span></li>
            ))}
          </ul>
        </section>
        <section className="section">
          <h2>Ihr Weg durch den Fall</h2>
          <ol className="path">
            {results.map((r) => {
              const st = sc.stages.find((x) => x.id === r.stageId)!;
              return <li key={r.stageId}><strong>{st.title}</strong> <span className="mono">{pct(r.score)}</span>{r.critical && <span className="badge crit">kritisch</span>}</li>;
            })}
          </ol>
        </section>
        <section className="section">
          <h2>Fachliche Einordnung</h2>
          <p>{sc.debrief}</p>
          <SourceList ids={sc.sources} />
        </section>
        <div className="row">
          <button type="button" className="btn primary" onClick={restart}>Fall wiederholen</button>
          <a className="btn" href="#simulator">Zur Übersicht</a>
          <a className="btn ghost" href="#fortschritt">Zum Fortschritt</a>
        </div>
      </div>
    );
  }

  if (!stage) return null;
  const a = answers[stage.id] ?? { stageId: stage.id, selected: stage.type === 'rank' ? defaultRank(stage) : [] };
  const setA = (patch: Partial<StageAnswer>) => setAnswers((x) => ({ ...x, [stage.id]: { ...a, ...patch } }));
  const confirm = () => {
    const r = evaluateStage(stage, a);
    setResults((x) => [...x, r]);
    setRevealed(true);
  };
  const next = () => {
    setRevealed(false);
    setStageId(nextStageId(sc, stage, a));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const stepNo = results.length + (revealed ? 0 : 1);

  return (
    <div className="page scenario">
      <nav className="crumbs"><a href="#simulator">Baustellensimulator</a> / <span>Fall {sc.code}</span></nav>
      <header className="page-head compact">
        <span className="eyebrow">Fall {sc.code} · Entscheidung {stepNo}</span>
        <h1>{stage.title}</h1>
      </header>
      <div className="scene"><RichText text={stage.situation} /></div>
      <StageInput sc={sc} stage={stage} a={a} setA={setA} revealed={revealed} />
      {!revealed ? (
        <div className="q-actions">
          <button type="button" className="btn primary" disabled={!canConfirm(stage, a)} onClick={confirm}>Entscheid bestätigen</button>
          {stage.type === 'ask' && <span className="hint">{a.selected.length} von {stage.pick} Fragen gewählt</span>}
        </div>
      ) : (
        <>
          <StageFeedback stage={stage} a={a} result={results[results.length - 1]} />
          <div className="q-actions"><button type="button" className="btn primary" onClick={next}>Weiter</button></div>
        </>
      )}
    </div>
  );
}

function defaultRank(stage: ScenarioStage): string[] {
  // Startreihenfolge: bewusst nicht die Lösung (rotiert)
  const ids = (stage.rankItems ?? []).map((x) => x.id);
  return ids.length > 2 ? [...ids.slice(2), ...ids.slice(0, 2)].reverse() : ids;
}

function canConfirm(stage: ScenarioStage, a: StageAnswer) {
  if (stage.type === 'single') return a.selected.length === 1;
  if (stage.type === 'multi') return a.selected.length >= 1;
  if (stage.type === 'ask') return a.selected.length === (stage.pick ?? 3);
  if (stage.type === 'rank') return true;
  return (a.text ?? '').trim().length >= 60 && a.selected !== undefined && (a as any).rated === true;
}

function StageInput({ stage, a, setA, revealed }: { sc: Scenario; stage: ScenarioStage; a: StageAnswer; setA: (p: Partial<StageAnswer> & { rated?: boolean }) => void; revealed: boolean }) {
  const [phase, setPhase] = useState<'write' | 'rate'>('write');
  const toggle = (id: string, max?: number) => {
    if (revealed) return;
    if (stage.type === 'single') return setA({ selected: [id] });
    const has = a.selected.includes(id);
    if (!has && max && a.selected.length >= max) return;
    setA({ selected: has ? a.selected.filter((x) => x !== id) : [...a.selected, id] });
  };
  const move = (i: number, d: -1 | 1) => {
    const arr = [...a.selected];
    const j = i + d;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setA({ selected: arr });
  };
  const items = useMemo(() => new Map((stage.rankItems ?? []).map((x) => [x.id, x.text])), [stage]);

  return (
    <div className="stage-input">
      <p className="q-prompt"><InlineText text={stage.prompt} /></p>
      {(stage.type === 'single' || stage.type === 'multi' || stage.type === 'ask') && (
        <div className="options">
          {stage.options!.map((o) => {
            const chosen = a.selected.includes(o.id);
            return (
              <label key={o.id} className={'opt' + (chosen ? ' chosen' : '') + (revealed && o.points === 2 ? ' correct' : '') + (revealed && chosen && o.points === 0 ? ' wrong' : '')}>
                <input type={stage.type === 'single' ? 'radio' : 'checkbox'} name={'st-' + stage.id} checked={chosen} disabled={revealed} onChange={() => toggle(o.id, stage.type === 'ask' ? stage.pick : undefined)} />
                <span>{o.text}</span>
              </label>
            );
          })}
        </div>
      )}
      {stage.type === 'rank' && (
        <ol className="rank">
          {a.selected.map((id, i) => (
            <li key={id}>
              <span className="mono">{i + 1}</span>
              <span>{items.get(id)}</span>
              {!revealed && (
                <span className="rank-btns">
                  <button type="button" className="btn ghost small" onClick={() => move(i, -1)} disabled={i === 0} aria-label="nach oben">↑</button>
                  <button type="button" className="btn ghost small" onClick={() => move(i, 1)} disabled={i === a.selected.length - 1} aria-label="nach unten">↓</button>
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
      {stage.type === 'justify' && (
        <>
          <textarea id={'just-' + stage.id} rows={7} value={a.text ?? ''} disabled={revealed || phase === 'rate'} onChange={(e) => setA({ text: e.target.value })} placeholder="Ihre Begründung …" />
          {phase === 'write' && !revealed && <button type="button" className="btn" disabled={(a.text ?? '').trim().length < 60} onClick={() => setPhase('rate')}>Text abschliessen und selbst bewerten</button>}
          {phase === 'rate' && !revealed && (
            <RubricRating rubric={stage.rubric ?? []} text={a.text ?? ''} ticks={a.selected} setTicks={(t) => setA({ selected: t })} task={stage.prompt} onDone={() => setA({ rated: true } as any)} />
          )}
          {(a as any).rated && !revealed && <p className="okline">Selbstbewertung gespeichert. Bestätigen Sie den Entscheid.</p>}
        </>
      )}
    </div>
  );
}

function StageFeedback({ stage, a, result }: { stage: ScenarioStage; a: StageAnswer; result: StageResult }) {
  const chosen = (stage.options ?? []).filter((o) => a.selected.includes(o.id));
  return (
    <div className={'feedback stage-fb' + (result.critical ? ' crit' : '')}>
      <p className="fb-verdict">Bewertung dieses Schritts: <span className="mono">{pct(result.score)}</span></p>
      {stage.type === 'ask' && (
        <ul className="reveals">
          {chosen.map((o) => <li key={o.id}><strong>{o.text}</strong><span className="reveal">{o.reveal}</span><span className="muted">{o.feedback}</span></li>)}
          {(stage.options ?? []).filter((o) => o.relevant && o.points === 2 && !a.selected.includes(o.id)).map((o) => <li key={o.id} className="missed"><strong>Nicht gefragt: {o.text}</strong><span className="reveal">{o.reveal}</span><span className="muted">{o.feedback}</span></li>)}
        </ul>
      )}
      {(stage.type === 'single' || stage.type === 'multi') && (
        <ul className="fb-list">
          {(stage.type === 'single' ? chosen : stage.options ?? []).map((o) => (
            <li key={o.id} className={a.selected.includes(o.id) ? 'sel' : ''}>
              {stage.type === 'multi' && <span className="mono">{a.selected.includes(o.id) ? '☑' : '☐'} </span>}
              <strong>{o.text}</strong> – {o.feedback}
              {o.consequence && a.selected.includes(o.id) && <span className="consequence"><strong>Folge:</strong> {o.consequence}</span>}
            </li>
          ))}
        </ul>
      )}
      {stage.type === 'single' && chosen[0]?.points !== 2 && (
        <p className="better"><strong>Besser:</strong> {(stage.options ?? []).find((o) => o.points === 2)?.text}</p>
      )}
      {stage.type === 'rank' && (
        <>
          <p><strong>Fachlich begründete Reihenfolge:</strong></p>
          <ol>{(stage.rankOrder ?? []).map((id) => <li key={id}>{stage.rankItems?.find((x) => x.id === id)?.text}</li>)}</ol>
          <p>{stage.rankExplanation}</p>
        </>
      )}
      {stage.type === 'justify' && (
        <>
          <p>Abgedeckt laut Ihrer Selbstbewertung: {a.selected.length} von {stage.rubric?.length} Punkten.</p>
          <ul>{(stage.rubric ?? []).filter((r) => !a.selected.includes(r.id)).map((r) => <li key={r.id}>Fehlt: {r.text}</li>)}</ul>
        </>
      )}
    </div>
  );
}
