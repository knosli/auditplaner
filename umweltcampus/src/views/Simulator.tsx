import { useEffect, useMemo, useState } from 'react';
import { CRITERION_LABEL, MODULES, S, SCENARIOS, TOPICS } from '../content';
import { Icon } from '../components/Icons';
import { ModuleIllustration } from '../components/Illustrations';
import { metaOf } from '../components/moduleMeta';
import type { Scenario, ScenarioStage } from '../content/types';
import { useStore } from '../store';
import { InlineText, RichText } from '../components/RichText';
import { Bar, DevBadge, SourceList, fmtDateTime, pct } from '../components/ui';
import { RubricRating } from '../components/Question';
import { evaluateStage, nextStageId, summarize, type StageAnswer, type StageResult } from '../lib/scenario';
import { isLegacyRun } from '../lib/versioning';

export function SimulatorView() {
  const { s } = useStore();
  const avail = SCENARIOS.filter((x) => x.status === 'verfuegbar');
  const dev = SCENARIOS.filter((x) => x.status !== 'verfuegbar');
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Praxis & Training</span>
        <h1>Baustellensimulator.</h1>
        <p className="lead">Realistische Situationen mit unvollständigen Informationen. Sie erfragen, was fehlt, setzen Prioritäten, entscheiden und begründen. Falsche Entscheide haben Folgen – kritische Fehler werden nicht mit Trostpunkten verharmlost.</p>
      </header>
      <div className="sim-grid">
        {avail.map((sc) => {
          const runs = s.scenarios[sc.id] ?? [];
          const best = runs.reduce((m, r) => Math.max(m, r.total), 0);
          const mod = MODULES.find((m) => m.id === sc.moduleId);
          const cur = runs.filter((r) => !isLegacyRun(sc.id, r));
          const ok = cur.some((r) => r.passed);
          return (
            <article key={sc.id} className={'sim-card tone-' + metaOf(sc.moduleId).tone}>
              <div className="sim-banner"><ModuleIllustration moduleId={sc.moduleId} /><span className="code-chip big">{sc.code}</span></div>
              <div className="sim-body">
                <span className="eyebrow">Modul {mod?.no} · {mod?.short}</span>
                <h3><a href={'#szenario-' + sc.id} className="stretched">{sc.title}</a></h3>
                <div className="fact-pills"><span>{sc.setting}</span><span>Stufe {sc.level}</span><span><Icon name="clock" size={13} /> ca. {sc.minutes} Min.</span><span>{sc.stages.length} Entscheidungen</span></div>
                <p>{sc.intro}</p>
                <div className="sim-foot">
                  {runs.length > 0 && (cur.length > 0
                    ? <span className={'status-pill ' + (ok ? 'st-bestaetigt' : 'st-in_arbeit')}>{ok ? 'bestanden' : 'nicht bestanden'} · bestes {pct(Math.max(...cur.map((r) => r.objective ?? r.total)))}</span>
                    : <span className="status-pill" title="Die Bewertung dieses Falls wurde geändert. Frühere Ergebnisse zählen nicht mehr als Nachweis.">früher gespielt (frühere Bewertungsfassung, bestes {pct(best)}) – bitte neu spielen</span>)}
                  <span className="mod-open">{runs.length ? 'Erneut spielen' : 'Fall starten'} <Icon name="arrow" size={15} /></span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {dev.length > 0 && (
        <section className="section">
          <h2>In Entwicklung</h2>
          <ul className="dev-list">{dev.map((sc) => { const mod = MODULES.find((m) => m.id === sc.moduleId); return <li key={sc.id}><span className="code-chip muted">{sc.code}</span><span><strong>{sc.title}</strong><span className="hint">{sc.setting} · folgt mit Modul {mod?.no} {mod?.short}</span></span><DevBadge /></li>; })}</ul>
        </section>
      )}
    </div>
  );
}

const PHASE: Record<ScenarioStage['type'], string> = { ask: 'Informationen sammeln', single: 'Entscheidung', multi: 'Entscheidung', rank: 'Prioritäten setzen', justify: 'Begründen und übertragen' };

function Timeline({ sc, results, current, revealed, done }: { sc: Scenario; results: StageResult[]; current?: ScenarioStage | null; revealed?: boolean; done?: boolean }) {
  return (
    <aside className="sim-side" aria-label="Ablauf des Falls">
      <span className="side-title">Ihr Einsatzablauf</span>
      <ol className="timeline">
        <li className="tl done"><span className="tl-num"><Icon name="check" size={14} /></span><span><strong>Ausgangslage</strong><span>erfasst</span></span></li>
        {results.map((r) => { const st = sc.stages.find((x) => x.id === r.stageId); if (current && revealed && st?.id === current.id) return null; return <li key={r.stageId} className={'tl done' + (r.critical ? ' crit' : '')}><span className="tl-num">{r.critical ? '!' : <Icon name="check" size={14} />}</span><span><strong>{st?.title}</strong><span>{r.critical ? 'kritischer Fehler' : PHASE[st?.type ?? 'single']}</span></span></li>; })}
        {current && <li className="tl on"><span className="tl-num">{results.length + (revealed ? 0 : 1)}</span><span><strong>{current.title}</strong><span>{revealed ? 'Konsequenz ansehen' : PHASE[current.type]}</span></span></li>}
        {!done && <li className="tl"><span className="tl-num">…</span><span><strong>Weitere Entscheidungen</strong><span>je nach Ihrem Weg</span></span></li>}
        <li className={'tl' + (done ? ' on' : '')}><span className="tl-num"><Icon name="chart" size={14} /></span><span><strong>Auswertung und Transfer</strong><span>nach Kriterien</span></span></li>
      </ol>
      <p className="hint">Bestanden ab 70 % der objektiv bewerteten Schritte und ohne kritischen Fehler.</p>
    </aside>
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
    const mod = MODULES.find((m) => m.id === sc.moduleId);
    return (
      <div className="page scenario">
        <a className="back-link" href="#simulator"><Icon name="back" size={16} /> Alle Baustellenfälle</a>
        <header className="page-head">
          <span className="eyebrow">Baustellenfall {sc.code} · Modul {mod?.no} {mod?.short}</span>
          <h1>{sc.title}</h1>
          <p className="lead">Sie übernehmen die Verantwortung vor Ort. Jede Entscheidung verändert den weiteren Verlauf.</p>
        </header>
        <div className="sim-start">
          <div className={'sim-stage-card tone-' + metaOf(sc.moduleId).tone}>
            <div className="sim-banner"><ModuleIllustration moduleId={sc.moduleId} /></div>
            <div className="sim-body">
              <span className="step-kind"><Icon name="site" size={16} /> Ausgangslage</span>
              <p className="sim-intro">{sc.intro}</p>
              <h3>Was Sie vor Ort sehen</h3>
              <ul className="facts-list">{sc.facts.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          </div>
          <aside className="panel brief-panel">
            <span className="side-title">Ihr Einsatz</span>
            <dl className="brief-dl">
              <dt>Rolle</dt><dd>Umweltfachperson des Unternehmens</dd>
              <dt>Ziel</dt><dd>Schaden begrenzen, rechtskonform entscheiden, nachvollziehbar begründen</dd>
              <dt>Bauart</dt><dd>{sc.setting}</dd>
              <dt>Risikofaktoren</dt><dd>{sc.topics.map((t) => TOPICS.find((x) => x.id === t)?.title ?? t).join(' · ')}</dd>
              <dt>Dauer</dt><dd>ca. {sc.minutes} Min. · Stufe {sc.level}</dd>
            </dl>
            <span className="side-title">Bewertet werden</span>
            <ul className="crit-tags">{Object.values(CRITERION_LABEL).map((c) => <li key={c}>{c}</li>)}</ul>
            {last && <p className="hint">Letzter Versuch: {fmtDateTime(last.at)} – {pct(last.total)}{last.passed ? ' (bestanden)' : ''}{isLegacyRun(sc.id, last) ? ' · frühere Bewertungsfassung' : ''}</p>}
            <button type="button" className="btn primary big-cta" onClick={restart}>Fall beginnen <Icon name="arrow" size={16} /></button>
          </aside>
        </div>
      </div>
    );
  }

  if (done && run) {
    const crit = [
      ...sc.stages.flatMap((st) => (st.options ?? []).filter((o) => o.critical && answers[st.id]?.selected.includes(o.id)).map((o) => ({ key: st.id + o.id, title: st.title, text: `${o.text} – ${o.feedback}` }))),
      ...results.flatMap((r) => (r.criticalWhy ?? []).map((w, i) => ({ key: r.stageId + i, title: sc.stages.find((x) => x.id === r.stageId)?.title ?? '', text: w }))),
    ];
    return (
      <div className="page scenario">
        <a className="back-link" href="#simulator"><Icon name="back" size={16} /> Alle Baustellenfälle</a>
        <header className={'page-head result-head ' + (run.passed ? 'ok' : 'crit')}>
          <span className="eyebrow">Auswertung · Fall {sc.code}</span>
          <h1>Auswertung Fall {sc.code}</h1>
          <p className={'verdict ' + (run.passed ? 'ok' : 'crit')}>{run.passed ? 'Bestanden' : 'Nicht bestanden'} · objektiv bewertete Schritte {pct(run.objective ?? run.total)}{run.critical ? ` · ${run.critical} kritische${run.critical === 1 ? 'r' : ''} Fehler` : ''}</p>
          <p className="hint">Die schriftliche Begründung haben Sie selbst am Raster bewertet. Sie ist im Kompetenzprofil enthalten, entscheidet aber nicht über «bestanden» – sie ist kein unabhängiger Fachnachweis. Die Fallbewertung ist eine Lernübung, keine fachliche oder behördliche Freigabe.</p>
        </header>
        {crit.length > 0 && (
          <div className="callout crit"><span className="callout-label">Kritische Fehler</span>
            <span>
              {crit.map((c) => <span key={c.key} className="block"><strong>{c.title}:</strong> {c.text}</span>)}
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
              return <li key={r.stageId}><strong>{st.title}</strong> <span className="mono">{pct(r.score)}</span>{r.critical && <span className="badge crit">kritisch</span>}{r.self && <span className="badge">Selbstbewertung</span>}</li>;
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
      <a className="back-link" href="#simulator"><Icon name="back" size={16} /> Fall {sc.code}: {sc.title}</a>
      <div className="sim-run">
        <div className="sim-run-main">
          <header className="page-head compact">
            <span className="eyebrow">Fall {sc.code} · Schritt {stepNo} · {revealed ? "Konsequenz" : PHASE[stage.type]}</span>
            <h1>{stage.title}</h1>
          </header>
          <div className="scene"><RichText text={stage.situation} /></div>
          <StageInput key={stage.id} sc={sc} stage={stage} a={a} setA={setA} revealed={revealed} />
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
        <Timeline sc={sc} results={results} current={stage} revealed={revealed} />
      </div>
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
      <p className="fb-verdict">{result.self ? 'Ihre Selbstbewertung' : 'Bewertung dieses Schritts'}: <span className="mono">{pct(result.score)}</span>{result.critical && <span className="badge crit"> kritischer Fehler</span>}</p>
      {(result.criticalWhy ?? []).map((w) => <p key={w} className="consequence"><strong>Kritisch:</strong> {w}</p>)}
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
        <p className="better"><strong>Besser:</strong> {(stage.options ?? []).filter((o) => o.points === 2).map((o) => o.text).join(' – oder gleichwertig: ')}</p>
      )}
      {stage.type === 'rank' && (
        <>
          <p><strong>Fachlich begründete Reihenfolge</strong>{stage.rankGroups ? ' (Massnahmen auf derselben Stufe laufen parallel – ihre Reihenfolge untereinander ist frei):' : ':'}</p>
          <ol>{(stage.rankGroups ?? (stage.rankOrder ?? []).map((id) => [id])).map((g, i) => <li key={i}>{g.map((id) => stage.rankItems?.find((x) => x.id === id)?.text).join('  ∥  ')}</li>)}</ol>
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
