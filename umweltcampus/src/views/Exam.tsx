import { useEffect, useMemo, useState } from 'react';
import { FEYNMAN, MODULES, SCENARIOS } from '../content';
import type { Question } from '../content/types';
import { useStore } from '../store';
import { QuestionBlock } from '../components/Question';
import { RichText } from '../components/RichText';
import { DevBadge, Section, SourceList, fmtDateTime, pct, Bar } from '../components/ui';
import { buildExam, PASS, type ExamKind } from '../lib/exam';
import { scoreQuestion, moduleRequirements } from '../lib/learning';
import { FeynmanBlock } from '../components/Practice';
import { topicTitle } from '../lib/coach';
import { SCORING_VERSION, type ExamRun } from '../lib/state';
import { isLegacyExam } from '../lib/versioning';

const KIND_LABEL: Record<ExamKind, string> = { check: 'Kurzer Wissenscheck', modul: 'Modulabschlusstest', offen: 'Offene Fachfragen', mix: 'Gemischte Prüfung über alle verfügbaren Module' };
const modTitle = (id: string) => (id === 'mix' ? 'alle Module' : `Modul ${MODULES.find((m) => m.id === id)?.no}: ${MODULES.find((m) => m.id === id)?.short}`);

export function ExamView() {
  const { s, ai, setCoachOpen, update } = useStore();
  const avail = MODULES.filter((m) => m.status === 'verfuegbar').sort((a, b) => a.pathOrder - b.pathOrder);
  const [mod, setMod] = useState(avail[0]?.id ?? 'm2');
  const [run, setRun] = useState<{ kind: ExamKind; qs: Question[]; moduleId: string } | null>(null);
  const [feyn, setFeyn] = useState<string | null>(null);
  if (run) return <ExamRunner kind={run.kind} qs={run.qs} moduleId={run.moduleId} onExit={() => setRun(null)} />;
  const req = moduleRequirements(s, mod);
  const start = (k: ExamKind) => setRun({ kind: k, qs: buildExam(k, mod), moduleId: k === 'mix' ? 'mix' : mod });
  const oral = () => {
    update((x) => ({ ...x, settings: { ...x.settings, coachMode: 'pruefen' } }));
    setCoachOpen(true);
  };
  return (
    <div className="page">
      <header className="page-head">
        <h1>Prüfungstraining</h1>
        <p className="lead">Prüfen unter realistischen Bedingungen: keine Rückmeldung und kein Coach bis zum Abschluss. Danach eine fachliche Auswertung mit Wiederholungsempfehlungen. Die Kompetenzstufen der App sind interne Lernstände und keine staatlich oder offiziell anerkannte Qualifikation.</p>
      </header>
      <div className="seg" role="radiogroup" aria-label="Modul für die Prüfung">
        {avail.map((m) => (
          <label key={m.id} className={mod === m.id ? 'on' : ''}><input type="radio" name="exam-mod" checked={mod === m.id} onChange={() => setMod(m.id)} />Modul {m.no}: {m.short}</label>
        ))}
      </div>
      <div className="cards three">
        <article className="card">
          <span className="eyebrow">ca. 5 Min.</span>
          <h3>Kurzer Wissenscheck</h3>
          <p>6 gemischte Fragen aus allen Themen des Moduls.</p>
          <button type="button" className="btn primary" onClick={() => start('check')}>Starten</button>
        </article>
        <article className="card">
          <span className="eyebrow">ca. 30 Min.</span>
          <h3>Modulabschlusstest</h3>
          <p>16 geschlossene Fragen über alle vier Stufen und 2 offene Fall- und Beratungsfragen. Bestanden ab 75 %, offene Fragen mindestens 50 %.</p>
          <button type="button" className="btn primary" onClick={() => start('modul')}>Starten</button>
        </article>
        <article className="card">
          <span className="eyebrow">ca. 15 Min.</span>
          <h3>Offene Fachfragen</h3>
          <p>Zwei Fragen auf Stufe 3–4: Planungsfehler erkennen, Bauführer beraten, Ereignis nachbereiten.</p>
          <button type="button" className="btn" onClick={() => start('offen')}>Starten</button>
        </article>
        <article className="card">
          <span className="eyebrow">Fallbezogen</span>
          <h3>Entscheidungssimulationen</h3>
          <p>{SCENARIOS.filter((x) => x.status === 'verfuegbar').length} spielbare Baustellenfälle mit Bewertung nach sieben Kriterien.</p>
          <a className="btn" href="#simulator">Zum Simulator</a>
        </article>
        <article className="card">
          <span className="eyebrow">Mündlich</span>
          <h3>Prüfungsgespräch mit dem Coach</h3>
          {ai ? <><p>Der KI-Coach stellt Fragen wie in einer mündlichen Prüfung und wertet erst am Schluss aus.</p><button type="button" className="btn" onClick={oral}>Gespräch beginnen</button></>
            : <p className="hint">Nur mit KI-Schnittstelle verfügbar (im claude.ai-Artifact). Ohne KI nutzen Sie die offenen Fachfragen und die Feynman-Übungen.</p>}
        </article>
        <article className="card">
          <span className="eyebrow">Mehrere Module · ca. 20 Min.</span>
          <h3>Gemischte Prüfung</h3>
          <p>Je 6 Fragen aus allen {avail.length} verfügbaren Modulen, Themen abwechselnd gemischt (Interleaving). Bestanden ab 70 %.</p>
          <button type="button" className="btn" disabled={avail.length < 2} onClick={() => start('mix')}>Starten</button>
        </article>
        <article className="card muted-card">
          <span className="eyebrow">Alle 12 Module</span>
          <h3>Umfassende Abschlussprüfung</h3>
          <p>Folgt, sobald alle Module verfügbar sind.</p>
          <DevBadge />
        </article>
      </div>

      <Section title="Erklären üben (Feynman-Methode)">
        <p className="hint">Erklären Sie ein Thema so, dass ein Polier oder Bauführer es versteht. Danach prüfen Sie Verständlichkeit, Richtigkeit und Vollständigkeit am Raster{ai ? ' – optional mit KI-Feedback' : ''}.</p>
        <div className="row">{FEYNMAN.map((f) => <button key={f.id} type="button" className={'chip' + (feyn === f.id ? ' on' : '')} onClick={() => setFeyn(feyn === f.id ? null : f.id)}>{topicTitle(f.topic)} – für {f.audience}</button>)}</div>
        {feyn && <FeynmanBlock key={feyn} id={feyn} />}
      </Section>

      <Section title="Voraussetzungen für den Modulabschluss">
        <p className="hint">Eine gute Multiple-Choice-Quote allein genügt nicht: Fälle und Praxis gehören dazu.</p>
        <ul className="reqs">{req.map((r) => <li key={r.label} className={r.done ? 'done' : ''}><span className="mono">{r.done ? '✓' : '○'}</span> {r.label} <span className="hint">({r.detail})</span></li>)}</ul>
      </Section>

      {s.exams.length > 0 && (
        <Section title="Bisherige Prüfungen">
          <table className="table">
            <thead><tr><th>Datum</th><th>Art</th><th>Ergebnis</th><th>Status</th></tr></thead>
            <tbody>{[...s.exams].reverse().slice(0, 12).map((e) => <tr key={e.id}><td>{fmtDateTime(e.at)}</td><td>{KIND_LABEL[e.kind]} – {modTitle(e.moduleId)}</td><td className="mono">{pct(e.score)}</td><td>{e.passed ? 'bestanden' : 'nicht bestanden'}{isLegacyExam(e) ? ' (frühere Bewertungsfassung – zählt nicht mehr als Nachweis)' : ''}</td></tr>)}</tbody>
          </table>
        </Section>
      )}
    </div>
  );
}

function ExamRunner({ kind, qs, moduleId, onExit }: { kind: ExamKind; qs: Question[]; moduleId: string; onExit: () => void }) {
  const { update, log, setCoachCtx } = useStore();
  const [i, setI] = useState(0);
  const [res, setRes] = useState<Record<string, { sel: string[]; score: number }>>({});
  const [finished, setFinished] = useState(false);
  const examId = useMemo(() => 'ex-' + Date.now().toString(36), []);

  useEffect(() => {
    setCoachCtx(finished ? null : { label: KIND_LABEL[kind], locked: true });
    return () => setCoachCtx(null);
  }, [finished, kind, setCoachCtx]);

  const q = qs[i];
  const answeredCur = !!res[q?.id];

  const finish = () => {
    const closed = qs.filter((x) => x.type !== 'open');
    const open = qs.filter((x) => x.type === 'open');
    const closedScore = closed.length ? closed.reduce((a, x) => a + (res[x.id]?.score ?? 0), 0) / closed.length : 0;
    const openScore = open.length ? open.reduce((a, x) => a + (res[x.id]?.score ?? 0), 0) / open.length : 1;
    const total = qs.reduce((a, x) => a + (res[x.id]?.score ?? 0), 0) / qs.length;
    const byTopic: ExamRun['byTopic'] = {};
    for (const x of qs) {
      byTopic[x.topic] ??= { ok: 0, n: 0 };
      byTopic[x.topic].n++;
      byTopic[x.topic].ok += res[x.id]?.score ?? 0;
    }
    const passed = kind === 'modul' ? closedScore >= PASS.modul && openScore >= PASS.open : kind === 'offen' ? openScore >= PASS.open : total >= PASS.check;
    const selfShare = open.length / qs.length;
    const run: ExamRun = { id: examId, kind, moduleId, at: Date.now(), score: total, total: qs.length, byTopic, passed, v: SCORING_VERSION, selfShare };
    update((x) => ({ ...x, exams: [...x.exams, run] }));
    log('pruefung', examId, `${KIND_LABEL[kind]}: ${pct(total)}${passed ? ' bestanden' : ''}`);
    setFinished(true);
  };

  if (finished) {
    const total = qs.reduce((a, x) => a + (res[x.id]?.score ?? 0), 0) / qs.length;
    const topics = Object.entries(qs.reduce<Record<string, { ok: number; n: number }>>((m, x) => {
      m[x.topic] ??= { ok: 0, n: 0 };
      m[x.topic].n++;
      m[x.topic].ok += res[x.id]?.score ?? 0;
      return m;
    }, {})).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n);
    const weak = topics.filter(([, v]) => v.ok / v.n < 0.75);
    return (
      <div className="page">
        <h1>Auswertung: {KIND_LABEL[kind]} ({modTitle(moduleId)})</h1>
        <p className="verdict">{pct(total)} der Punkte</p>
        {qs.some((x) => x.type === 'open') && <p className="hint">Die offenen Fragen haben Sie selbst am Raster bewertet. Diese Punkte sind eine Selbsteinschätzung, kein unabhängiger Fachnachweis. Das Ergebnis ist ein interner Lernstand und keine fachliche, behördliche oder offizielle Qualifikation.</p>}
        <Section title="Ergebnis nach Thema">
          <ul className="crit-bars">{topics.map(([t, v]) => <li key={t}><span>{topicTitle(t)}</span><Bar value={v.ok / v.n} tone={v.ok / v.n >= 0.75 ? 'ok' : v.ok / v.n >= 0.5 ? 'warn' : 'crit'} label={topicTitle(t)} /><span className="mono">{pct(v.ok / v.n)}</span></li>)}</ul>
          {weak.length > 0 ? <p>Empfehlung: Wiederholen Sie {weak.map(([t]) => topicTitle(t)).join(', ')} – die falsch beantworteten Fragen sind bereits im Wiederholungsplan.</p> : <p>Keine Schwachstelle unter 75 %. Festigen Sie das Wissen mit einem Baustellenfall.</p>}
        </Section>
        <Section title="Fragen im Detail">
          <ol className="exam-review">
            {qs.map((x) => (
              <li key={x.id}>
                <details>
                  <summary><span className="mono">{pct(res[x.id]?.score ?? 0)}</span> {x.prompt.replace(/\*\*/g, '')}</summary>
                  {x.options && <ul>{x.options.map((o) => <li key={o.id} className={(x.correct?.includes(o.id) ? 'correct ' : '') + (res[x.id]?.sel.includes(o.id) ? 'chosen' : '')}>{res[x.id]?.sel.includes(o.id) ? '▸ ' : ''}{o.text}{x.correct?.includes(o.id) ? ' (richtig)' : ''}</li>)}</ul>}
                  <RichText text={x.explanation} />
                  <SourceList ids={x.sources} compact />
                </details>
              </li>
            ))}
          </ol>
        </Section>
        <div className="row"><button type="button" className="btn primary" onClick={onExit}>Zurück zum Prüfungstraining</button><a className="btn" href="#wiederholung">Zu den Wiederholungen</a></div>
      </div>
    );
  }

  return (
    <div className="page exam">
      <div className="row spread">
        <h1>{KIND_LABEL[kind]} <span className="muted">– {modTitle(moduleId)}</span></h1>
        <span className="mono">Frage {i + 1} / {qs.length}</span>
      </div>
      <Bar value={Object.keys(res).length / qs.length} label="Beantwortet" small />
      <p className="hint">Prüfungsmodus: keine Rückmeldung bis zum Schluss, Lerncoach gesperrt.</p>
      <QuestionBlock key={q.id} q={q} ctx="pruefung" silent onAnswered={(sel, score) => setRes((r) => ({ ...r, [q.id]: { sel, score: q.type === 'open' ? score : scoreQuestion(q, sel) } }))} />
      <div className="step-nav">
        <button type="button" className="btn ghost" onClick={onExit}>Abbrechen</button>
        {i < qs.length - 1 ? (
          <button type="button" className="btn primary" disabled={!answeredCur} onClick={() => setI(i + 1)}>Nächste Frage</button>
        ) : (
          <button type="button" className="btn primary" disabled={!answeredCur} onClick={finish}>Prüfung abgeben</button>
        )}
      </div>
    </div>
  );
}
