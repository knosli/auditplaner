import { useState } from 'react';
import { F, T } from '../content';
import type { PracticeRecord, PracticeStatus } from '../lib/state';
import { useStore } from '../store';
import { RubricRating } from './Question';
import { fmtDate } from './ui';

export const PRACTICE_LABEL: Record<PracticeStatus, string> = {
  offen: 'Offen',
  in_arbeit: 'In Arbeit',
  eingereicht: 'Eingereicht (selbst dokumentiert)',
  bestaetigt: 'In der Praxis bestätigt',
};

/**
 * Praxisauftrag mit ehrlichem Statusmodell:
 *  offen → in Arbeit → eingereicht (Reflexion zu jedem Kriterium nötig)
 *  → bestätigt (Funktion der bestätigenden Person, Datum und Nachweis nötig).
 * Ein einfacher Klick auf «Erledigt» gibt es bewusst nicht.
 */
export function PracticeCard({ taskId, compact }: { taskId: string; compact?: boolean }) {
  const t = T.get(taskId);
  const { s, update, log, toast } = useStore();
  const rec: PracticeRecord = s.practice[taskId] ?? { status: 'offen', notes: '', reflection: {} };
  const [open, setOpen] = useState(!compact);
  const [conf, setConf] = useState({ role: rec.confirm?.role ?? '', date: rec.confirm?.date ?? '', evidence: rec.confirm?.evidence ?? '' });
  if (!t) return null;
  const set = (patch: Partial<PracticeRecord>) => update((x) => ({ ...x, practice: { ...x.practice, [taskId]: { ...rec, ...patch } } }));
  const reflOk = t.criteria.every((c) => (rec.reflection[c] ?? '').trim().length >= 15);
  const confOk = conf.role.trim().length >= 3 && /^\d{4}-\d{2}-\d{2}$/.test(conf.date) && conf.evidence.trim().length >= 15;

  return (
    <article className={'practice st-' + rec.status}>
      <header className="practice-head">
        <div>
          <span className="eyebrow">Praxisauftrag</span>
          <h3>{t.title}</h3>
        </div>
        <span className={'status-pill st-' + rec.status}>{PRACTICE_LABEL[rec.status]}</span>
      </header>
      <p>{t.goal}</p>
      {compact && <button type="button" className="btn ghost small" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Weniger anzeigen' : 'Auftrag öffnen'}</button>}
      {open && (
        <>
          <ol className="steps">{t.steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
          <p><strong>Ergebnis:</strong> {t.deliverable}</p>
          <p className="hint">Verwenden Sie für reale Baustellen eine neutrale Bezeichnung. Laden Sie keine Pläne, Fotos oder Namen in die App – sie bleiben in Ihren Firmensystemen.</p>
          {rec.status === 'offen' && <button type="button" className="btn primary" onClick={() => { set({ status: 'in_arbeit' }); log('praxis', taskId, 'begonnen'); }}>Auftrag beginnen</button>}
          {rec.status !== 'offen' && (
            <div className="practice-work">
              <label className="field">
                <span>Bezeichnung der Baustelle oder des Prozesses (neutral)</span>
                <input id={`pt-site-${taskId}`} value={rec.site ?? ''} onChange={(e) => set({ site: e.target.value })} placeholder="z. B. MFH Ost, Rohbau" disabled={rec.status === 'bestaetigt'} />
              </label>
              <label className="field">
                <span>Arbeitsnotizen</span>
                <textarea id={`pt-notes-${taskId}`} rows={3} value={rec.notes} onChange={(e) => set({ notes: e.target.value })} disabled={rec.status === 'bestaetigt'} />
              </label>
              <fieldset className="refl">
                <legend>Reflexion je Kriterium (mindestens ein Satz, wie Sie es erfüllt haben)</legend>
                {t.criteria.map((c, i) => (
                  <label key={c} className="field">
                    <span>{c}</span>
                    <textarea id={`pt-refl-${taskId}-${i}`} rows={2} value={rec.reflection[c] ?? ''} onChange={(e) => set({ reflection: { ...rec.reflection, [c]: e.target.value } })} disabled={rec.status === 'bestaetigt'} />
                  </label>
                ))}
              </fieldset>
              {rec.status === 'in_arbeit' && (
                <div className="q-actions">
                  <button type="button" className="btn primary" disabled={!reflOk} onClick={() => { set({ status: 'eingereicht', submittedAt: Date.now() }); log('praxis', taskId, 'eingereicht'); toast('Praxisauftrag eingereicht.'); }}>Als eingereicht markieren</button>
                  {!reflOk && <span className="hint">Für jedes Kriterium eine Begründung schreiben.</span>}
                </div>
              )}
              {rec.status === 'eingereicht' && (
                <fieldset className="confirmbox">
                  <legend>Bestätigung aus der Praxis</legend>
                  <p className="hint">Erst wenn eine Person aus dem Betrieb ({t.confirmer}) die Umsetzung gesehen hat. Die App kann das nicht überprüfen – der Eintrag ist eine Selbstdeklaration mit Nachweisangabe.</p>
                  <label className="field"><span>Funktion der bestätigenden Person</span><input id={`pt-role-${taskId}`} value={conf.role} onChange={(e) => setConf({ ...conf, role: e.target.value })} placeholder="z. B. Bauführer" /></label>
                  <label className="field"><span>Datum der Bestätigung</span><input id={`pt-date-${taskId}`} type="date" value={conf.date} onChange={(e) => setConf({ ...conf, date: e.target.value })} /></label>
                  <label className="field"><span>Nachweis (wo abgelegt, was bestätigt wurde)</span><textarea id={`pt-ev-${taskId}`} rows={2} value={conf.evidence} onChange={(e) => setConf({ ...conf, evidence: e.target.value })} /></label>
                  <button type="button" className="btn primary" disabled={!confOk} onClick={() => { set({ status: 'bestaetigt', confirm: conf }); log('praxis', taskId, 'bestätigt durch ' + conf.role); toast('Praxisbestätigung erfasst.'); }}>Bestätigung erfassen</button>
                </fieldset>
              )}
              {rec.status === 'bestaetigt' && rec.confirm && <p className="okline">Bestätigt durch {rec.confirm.role} am {fmtDate(new Date(rec.confirm.date).getTime())}. Nachweis: {rec.confirm.evidence}</p>}
            </div>
          )}
        </>
      )}
    </article>
  );
}

export function FeynmanBlock({ id }: { id: string }) {
  const f = F.get(id);
  const { s, update, log } = useStore();
  const prev = s.feynman[id];
  const [text, setText] = useState(prev?.text ?? '');
  const [ticks, setTicks] = useState<string[]>(prev?.self ?? []);
  const [phase, setPhase] = useState<'write' | 'rate' | 'done'>(prev ? 'done' : 'write');
  if (!f) return null;
  return (
    <div className="feynman">
      <p className="eyebrow">Zielpublikum: {f.audience}</p>
      <p className="q-prompt">{f.prompt}</p>
      <textarea id={`feyn-${id}`} rows={7} value={text} onChange={(e) => setText(e.target.value)} disabled={phase !== 'write'} placeholder="So würde ich es auf der Baustelle sagen …" />
      {phase === 'write' && <button type="button" className="btn primary" disabled={text.trim().length < 80} onClick={() => setPhase('rate')}>Erklärung prüfen</button>}
      {phase === 'rate' && (
        <RubricRating rubric={f.rubric} text={text} ticks={ticks} setTicks={setTicks} task={f.prompt} audience={f.audience} onDone={() => {
          update((x) => ({ ...x, feynman: { ...x.feynman, [id]: { text, at: Date.now(), self: ticks } } }));
          log('feynman', id, `${ticks.length}/${f.rubric.length} Punkte`);
          setPhase('done');
        }} />
      )}
      {phase === 'done' && (
        <div className="feedback">
          <p>Selbstbewertung: {ticks.length} von {f.rubric.length} Punkten abgedeckt.</p>
          {ticks.length < f.rubric.length && <ul>{f.rubric.filter((r) => !ticks.includes(r.id)).map((r) => <li key={r.id}>Fehlt noch: {r.text}</li>)}</ul>}
          <button type="button" className="btn ghost small" onClick={() => { setPhase('write'); setTicks([]); }}>Neu formulieren</button>
        </div>
      )}
    </div>
  );
}
