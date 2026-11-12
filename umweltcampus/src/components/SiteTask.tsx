import { useState } from 'react';
import { ST } from '../content';
import { useStore } from '../store';
import { RichText } from './RichText';
import { RubricRating } from './Question';
import { SourceList } from './ui';

/**
 * Praktische Baustellenaufgabe: Lösung schriftlich erarbeiten → ehrlich am
 * Raster bewerten → Musterlösung vergleichen. Die Musterlösung erscheint erst
 * nach der eigenen Bearbeitung (Active Recall statt Abschreiben).
 */
export function SiteTaskBlock({ id }: { id: string }) {
  const t = ST.get(id);
  const { s, update, log } = useStore();
  const prev = s.siteTasks[id];
  const [text, setText] = useState(prev?.text ?? '');
  const [ticks, setTicks] = useState<string[]>(prev?.ticks ?? []);
  const [phase, setPhase] = useState<'write' | 'rate' | 'done'>(prev ? 'done' : 'write');
  if (!t) return null;
  const save = () => {
    update((x) => ({ ...x, siteTasks: { ...x.siteTasks, [id]: { text, ticks, at: Date.now() } } }));
    log('aufgabe', id, `${t.title}: ${ticks.length}/${t.rubric.length} Punkte`);
    setPhase('done');
  };
  return (
    <div className="sitetask">
      <div className="scene">
        <span className="badge">{t.setting}</span> <span className="badge">fiktives Projekt</span>
        <p>{t.situation}</p>
        <ul className="taskdata">{t.data.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
      <p className="q-prompt">Auftrag: {t.assignment}</p>
      <textarea id={'st-' + id} rows={9} value={text} disabled={phase !== 'write'} onChange={(e) => setText(e.target.value)} placeholder="Ihre Lösung – Stichworte genügen, aber begründen Sie Ihre Entscheide." />
      {phase === 'write' && (
        <div className="q-actions">
          <button type="button" className="btn primary" disabled={text.trim().length < 80} onClick={() => setPhase('rate')}>Lösung abschliessen und bewerten</button>
          {text.trim().length < 80 && <span className="hint">Schreiben Sie zuerst Ihre Lösung (mindestens einige Zeilen). Die Musterlösung erscheint danach.</span>}
        </div>
      )}
      {phase === 'rate' && <RubricRating rubric={t.rubric} text={text} ticks={ticks} setTicks={setTicks} task={`${t.situation}\n${t.data.join('\n')}\nAuftrag: ${t.assignment}`} onDone={save} />}
      {phase === 'done' && (
        <div className="feedback">
          <p className="fb-verdict">Selbstbewertung: {ticks.length} von {t.rubric.length} Punkten.</p>
          {ticks.length < t.rubric.length && <ul>{t.rubric.filter((r) => !ticks.includes(r.id)).map((r) => <li key={r.id}>Noch nicht abgedeckt: {r.text}</li>)}</ul>}
          <h5>Musterlösung mit Begründung</h5>
          <RichText text={t.solution} />
          <SourceList ids={t.sources} compact />
          <button type="button" className="btn ghost small" onClick={() => { setPhase('write'); setTicks([]); }}>Aufgabe überarbeiten</button>
        </div>
      )}
    </div>
  );
}
