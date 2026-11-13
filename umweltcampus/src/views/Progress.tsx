import { useRef, useState } from 'react';
import { MODULES, SCENARIOS, SITETASKS, T, TOPICS } from '../content';
import { useStore } from '../store';
import { Bar, ConfirmButton, Section, fmtDateTime, pct } from '../components/ui';
import { STAGE_LABEL, knowledgeGaps, moduleProgress, studyMinutes, topicCompetence } from '../lib/learning';
import { exportPayload, normalizeState, emptyState, type AppState } from '../lib/state';
import { clearLocal, copyText, inArtifact, saveFile } from '../lib/platform';
import { CRITERION_LABEL, QUESTIONS } from '../content';
import { isLegacyRun, legacyCounts } from '../lib/versioning';
import { PRACTICE_LABEL } from '../components/Practice';
import { Icon } from '../components/Icons';
import { metaOf } from '../components/moduleMeta';
import { LayerBars } from './Main';

const Dot = ({ on }: { on?: boolean }) => <span className={'cdot' + (on ? ' on' : '')} role="img" aria-label={on ? 'erreicht' : 'offen'} />;

export function ProgressView() {
  const { s } = useStore();
  const comp = topicCompetence(s);
  const gaps = knowledgeGaps(s);
  const days = Object.entries(s.studySec).sort((a, b) => a[0].localeCompare(b[0])).slice(-14);
  const maxDay = Math.max(1, ...days.map(([, v]) => v));
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Persönlich</span>
        <h1>Lernfortschritt.</h1>
        <p className="lead">Kompetenz wird an Anwendung und Begründung gemessen, nicht an Klicks. «Gelesen» gilt nie als «beherrscht».</p>
      </header>
      <ol className="stage-legend" aria-label="Kompetenzstufen">
        {STAGE_LABEL.slice(1).map((l, i) => <li key={l}><span className="sl-no">{i + 1}</span>{l}</li>)}
      </ol>
      <p className="hint">Jede Stufe setzt die vorherige voraus. «Sicher beherrscht» heisst: mindestens 6 Fragen bzw. alle des Themas, ≥ 80 % richtig, mit Sicherheit, ohne Fehlannahme oder kritische Wahl, und mindestens zwei Inhalte nach zeitlichem Abstand erneut richtig abgerufen; offene Fragen zählen als Selbstbewertung nicht.</p>

      <LegacyNotice />

      {MODULES.filter((m) => m.status === 'verfuegbar').sort((a, b) => a.pathOrder - b.pathOrder).map((m) => {
        const meta = metaOf(m.id);
        const rows = comp.filter((c) => TOPICS.find((t) => t.id === c.topic)?.moduleId === m.id);
        return (
          <section key={m.id} className={'section prog-mod tone-' + meta.tone}>
            <div className="prog-head">
              <span className="mod-ico"><Icon name={meta.icon} size={22} /></span>
              <div><span className="eyebrow">Modul {String(m.no).padStart(2, '0')}</span><h2>{m.title}</h2></div>
              <span className="mono prog-pct" title="Anteil der Anforderungen für den Modulabschluss">{pct(moduleProgress(s, m.id))} Abschluss</span>
            </div>
            <LayerBars s={s} moduleId={m.id} />
            <div className="tablewrap">
              <table className="table comp">
                <thead><tr><th>Fachgebiet</th>{STAGE_LABEL.slice(1).map((l) => <th key={l}>{l}</th>)}<th>Richtig</th></tr></thead>
                <tbody>
                  {rows.map((c) => (
                    <tr key={c.topic}>
                      <td>{c.title}</td>
                      <td>{c.viewed ? <Dot on /> : <Dot />}</td>
                      <td>{c.asked ? `${c.asked}/${c.total}` : <Dot />}</td>
                      <td>{c.mastered ? <Dot on /> : <Dot />}</td>
                      <td>{c.applied ? <Dot on /> : <Dot />}</td>
                      <td>{c.confirmed ? <Dot on /> : <Dot />}</td>
                      <td className="mono">{c.asked ? pct(c.accuracy) : '–'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <Section title="Wissenslandkarte">
        <p className="hint">Alle zwölf Module. Farbige Felder: bewertete Fachgebiete (dunkler = höhere Stufe). Graue Module sind in Entwicklung.</p>
        <div className="kmap">
          {MODULES.map((m) => {
            const topics = TOPICS.filter((t) => t.moduleId === m.id);
            return (
              <div key={m.id} className={'kmap-mod' + (m.status === 'verfuegbar' ? '' : ' dev')}>
                <span className="kmap-title"><span className="mono">{m.no}</span> {m.short}</span>
                <div className="kmap-cells">
                  {topics.length ? topics.map((t) => {
                    const c = comp.find((x) => x.topic === t.id)!;
                    return <span key={t.id} className={'kcell s' + c.stage} title={`${t.title}: ${STAGE_LABEL[c.stage]}`}>{t.title}</span>;
                  }) : m.topics.slice(0, 6).map((t) => <span key={t} className="kcell dev" title={t + ' (in Entwicklung)'}>{t}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="grid-2">
        <Section title="Wissenslücken und Fehlannahmen">
          {gaps.length ? <ul className="gaplist">{gaps.map((g) => <li key={g.topic}><div><strong>{g.title}</strong><span className="hint"> {pct(g.accuracy)} richtig · {g.dangerous.length} Fehlannahme(n) · {g.unsureCorrect}× richtig, aber unsicher</span></div></li>)}</ul> : <p className="hint">Noch keine Lücken erkannt.</p>}
          <p className="hint">Fehlannahme = falsch beantwortet, obwohl Sie «sicher» angegeben haben. Diese Fragen werden in den Wiederholungen bevorzugt.</p>
        </Section>
        <Section title="Lernzeit (letzte 14 Tage mit Aktivität)">
          {days.length ? (
            <div className="forecast">
              {days.map(([k, v]) => <div key={k} className="fc-day"><span className="fc-bar" style={{ height: `${(v / maxDay) * 100}%` }} /><span className="mono">{Math.round(v / 60)}</span><span className="fc-l">{k.slice(8)}.{k.slice(5, 7)}.</span></div>)}
            </div>
          ) : <p className="hint">Noch keine Lernzeit erfasst. Gezählt wird nur aktive Zeit bei sichtbarer Seite.</p>}
          <p className="hint">Gesamt: {studyMinutes(s)} Minuten</p>
        </Section>
      </div>

      <div>
        <Section title="Ergebnisse der Baustellenfälle">
          {SCENARIOS.filter((x) => x.status === 'verfuegbar').map((sc) => {
            const runs = s.scenarios[sc.id] ?? [];
            const last = runs[runs.length - 1];
            return (
              <div key={sc.id} className="scen-res">
                <strong>Fall {sc.code}: {sc.title}</strong>
                {last ? (
                  <>
                    <span className="hint"> {runs.length} Versuch(e), letzter {fmtDateTime(last.at)}: {pct(last.objective ?? last.total)} {last.passed ? '– bestanden' : '– nicht bestanden'}{isLegacyRun(sc.id, last) ? ' (nach früherer Bewertungsfassung – bitte neu spielen)' : ''}</span>
                    <ul className="crit-bars small">{Object.entries(last.byCriterion).map(([k, v]) => <li key={k}><span>{CRITERION_LABEL[k]}</span><Bar value={v} small tone={v >= 0.7 ? 'ok' : v >= 0.4 ? 'warn' : 'crit'} label={CRITERION_LABEL[k]} /><span className="mono">{pct(v)}</span></li>)}</ul>
                  </>
                ) : <span className="hint"> noch nicht gespielt</span>}
              </div>
            );
          })}
        </Section>
      </div>

      <Section title="Praxisaufträge">
        <ul className="plain">{Object.entries(s.practice).map(([id, r]) => <li key={id}>{T.get(id)?.title ?? id} – {PRACTICE_LABEL[r.status]}{r.site ? ` (${r.site})` : ''}</li>)}{!Object.keys(s.practice).length && <li className="hint">Noch kein Praxisauftrag begonnen.</li>}</ul>
      </Section>

      <Section title="Baustellenaufgaben in den Lektionen">
        <ul className="plain">{SITETASKS.map((t) => { const r = s.siteTasks[t.id]; return <li key={t.id}>{t.title} <span className="hint">{r ? `bearbeitet ${fmtDateTime(r.at)}, Selbstbewertung ${r.ticks.length}/${t.rubric.length}` : 'noch offen'}</span></li>; })}</ul>
      </Section>

      <Section title="Lernhistorie">
        {s.history.length ? (
          <ol className="history">{[...s.history].reverse().slice(0, 40).map((h, i) => <li key={i}><span className="mono">{fmtDateTime(h.at)}</span> <span className="badge">{h.type.replace('_', ' ')}</span> {h.detail}</li>)}</ol>
        ) : <p className="hint">Noch keine Einträge.</p>}
      </Section>

      <DataPanel />
    </div>
  );
}

export function LegacyNotice() {
  const { s } = useStore();
  const openIds = new Set(QUESTIONS.filter((q) => q.type === 'open').map((q) => q.id));
  const c = legacyCounts(s, (id) => openIds.has(id));
  if (!c.answers && !c.runs && !c.exams) return null;
  return (
    <div className="callout law"><span className="callout-label">Frühere Fassung</span>
      <span>Nach einer externen Fachprüfung wurden Lösungen und Bewertungen einzelner Inhalte korrigiert (Bewertungsfassungen 3 bis 5). Ihre früheren Ergebnisse bleiben gespeichert und werden nicht nachträglich neu benotet, zählen aber nicht mehr als Kompetenznachweis: {c.answers} Antwort(en), {c.runs} Fallversuch(e), {c.exams} Prüfung(en) nach früherer Bewertungsfassung. Beantworten bzw. spielen Sie diese Inhalte erneut.</span>
    </div>
  );
}

export function DataPanel() {
  const { s, replaceState, toast, log } = useStore();
  const [fallback, setFallback] = useState<string | null>(null);
  const [paste, setPaste] = useState('');
  const [preview, setPreview] = useState<AppState | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const doExport = async () => {
    const json = JSON.stringify(exportPayload(s), null, 2);
    const r = await saveFile(`umweltcampus-lernstand-${new Date().toISOString().slice(0, 10)}.json`, json);
    if (r === 'gespeichert') toast('Lernstand exportiert.');
    else if (r === 'abgelehnt') toast('Export abgelehnt.');
    else setFallback(json);
  };
  const parse = (text: string) => {
    setErr(null);
    try {
      setPreview(normalizeState(JSON.parse(text)));
    } catch (e: any) {
      setPreview(null);
      setErr(e instanceof SyntaxError ? 'Die Datei ist kein gültiges JSON.' : e?.message ?? 'Unbekannter Fehler beim Lesen.');
    }
  };
  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (f.size > 5_000_000) return setErr('Die Datei ist zu gross (max. 5 MB).');
    f.text().then(parse).catch(() => setErr('Die Datei konnte nicht gelesen werden.'));
  };
  return (
    <Section title="Lernstand exportieren und importieren" id="daten">
      <p className="hint">Der Lernstand wird {inArtifact() ? 'in Ihrem Claude-Konto (privat, nur für Sie sichtbar) und ' : ''}in diesem Browser gespeichert. Ein Export sichert ihn als Datei – auch für den späteren Umzug in eine Firmenversion.</p>
      <div className="row">
        <button type="button" className="btn primary" onClick={doExport}>Lernstand exportieren (JSON)</button>
        <button type="button" className="btn" onClick={() => fileRef.current?.click()}>Datei importieren …</button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
      {fallback && (
        <div className="fallback">
          <p className="hint">Dateien können hier nicht direkt gespeichert werden. Kopieren Sie den Text und speichern Sie ihn als .json-Datei.</p>
          <textarea id="export-json" readOnly rows={6} value={fallback} onFocus={(e) => e.target.select()} />
          <button type="button" className="btn small" onClick={async () => toast((await copyText(fallback)) ? 'In die Zwischenablage kopiert.' : 'Kopieren nicht möglich – Text markieren und kopieren.')}>Kopieren</button>
        </div>
      )}
      <details>
        <summary>Oder exportierten Text einfügen</summary>
        <textarea id="import-json" rows={4} value={paste} onChange={(e) => setPaste(e.target.value)} placeholder='{"app":"umweltcampus-bau-ch", …}' />
        <button type="button" className="btn small" disabled={!paste.trim()} onClick={() => parse(paste)}>Prüfen</button>
      </details>
      {err && <p className="error">{err}</p>}
      {preview && (
        <div className="import-preview">
          <p>Gefundener Lernstand vom {fmtDateTime(preview.updatedAt)}: {Object.keys(preview.lessons).length} Lektionen begonnen, {preview.answers.length} Antworten, {preview.exams.length} Prüfungen.</p>
          <p className="hint">Beim Import wird der aktuelle Stand ersetzt. Exportieren Sie ihn vorher, falls Sie ihn behalten möchten.</p>
          <ConfirmButton label="Diesen Stand übernehmen" confirmLabel="Ja, aktuellen Stand ersetzen" onConfirm={() => { replaceState(preview); setPreview(null); setPaste(''); log('import', 'datei', 'Lernstand importiert'); toast('Lernstand importiert.'); }} />
        </div>
      )}
      <div className="danger-zone">
        <h4>Alles löschen</h4>
        <p className="hint">Entfernt Ihren gesamten Lernstand aus diesem Browser{inArtifact() ? ' und aus Ihrem Konto' : ''}. Nicht rückgängig zu machen.</p>
        <ConfirmButton label="Lernstand löschen" confirmLabel="Endgültig löschen" danger onConfirm={() => { clearLocal(); replaceState(emptyState()); toast('Lernstand gelöscht.'); }} />
      </div>
    </Section>
  );
}
