import { useEffect, useMemo, useRef, useState } from 'react';
import { GLOSSARY } from '../content';
import { useStore } from '../store';
import { RichText } from './RichText';
import { KindBadge, SourceList } from './ui';
import { coachInstructions, generateQuestionPrompt, GUIDING, offlineSearch, topicTitle } from '../lib/coach';
import { knowledgeGaps } from '../lib/learning';
import { aiErrorText } from '../lib/platform';
import type { Settings } from '../lib/state';

/** Nachschlagewerk als Seitenleiste: Lektionsstand bleibt erhalten. */
export function GlossaryDrawer() {
  const { term, openTerm } = useStore();
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const open = term !== null;
  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open, term]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && openTerm(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openTerm]);
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return GLOSSARY.filter((g) => !n || (g.term + ' ' + (g.aliases ?? []).join(' ') + ' ' + g.definition).toLowerCase().includes(n));
  }, [q]);
  if (!open) return null;
  const g = GLOSSARY.find((x) => x.id === term);
  return (
    <div className="drawer-wrap" onClick={(e) => e.target === e.currentTarget && openTerm(null)}>
      <aside className="drawer" role="dialog" aria-label="Fachbegriffe" tabIndex={-1} ref={ref}>
        <div className="drawer-head">
          <h2>Fachbegriffe</h2>
          <button type="button" className="btn ghost" onClick={() => openTerm(null)}>Schliessen</button>
        </div>
        <p className="hint">Ihr Lernfortschritt bleibt erhalten, während Sie nachschlagen.</p>
        {g ? (
          <article className="term">
            <button type="button" className="btn ghost small" onClick={() => openTerm('')}>← Alle Begriffe</button>
            <h3>{g.term}</h3>
            {g.kind && <KindBadge kind={g.kind} />}
            <p className="term-def">{g.definition}</p>
            {g.detail && <RichText text={g.detail} />}
            {g.related && <p className="related">Siehe auch: {g.related.map((r) => <button key={r} type="button" className="termlink" onClick={() => openTerm(r)}>{GLOSSARY.find((x) => x.id === r)?.term ?? r}</button>)}</p>}
            <SourceList ids={g.sources} compact />
          </article>
        ) : (
          <>
            <input id="glossary-search" type="search" className="search" placeholder="Begriff suchen, z. B. Kolmation" value={q} onChange={(e) => setQ(e.target.value)} />
            <ul className="termlist">
              {list.map((x) => <li key={x.id}><button type="button" onClick={() => openTerm(x.id)}><strong>{x.term}</strong><span>{x.definition}</span></button></li>)}
              {!list.length && <li className="hint">Kein Begriff gefunden. Versuchen Sie es in der Wissensbibliothek.</li>}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}

interface Msg { role: 'user' | 'assistant'; content: string }

const MODE_LABEL: Record<Settings['coachMode'], string> = { erklaeren: 'Erklären', trainieren: 'Trainieren', pruefen: 'Prüfen' };
const MODE_HINT: Record<Settings['coachMode'], string> = {
  erklaeren: 'Direkte fachliche Antworten mit Quellenangabe.',
  trainieren: 'Hinweise und Rückfragen, keine sofortige Musterlösung.',
  pruefen: 'Mündliches Prüfungsgespräch ohne Hilfestellung. Schreiben Sie «Auswertung», um es abzuschliessen.',
};

export function CoachPanel() {
  const { coachOpen, setCoachOpen, coachCtx, ai, aiChecked, s, update, openTerm } = useStore();
  const mode = s.settings.coachMode;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ctl = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const gaps = knowledgeGaps(s).slice(0, 3).map((g) => g.title);
  useEffect(() => endRef.current?.scrollIntoView({ block: 'end' }), [msgs]);
  if (!coachOpen) return null;

  const setMode = (m: Settings['coachMode']) => {
    update((x) => ({ ...x, settings: { ...x.settings, coachMode: m } }));
    setMsgs([]);
  };
  const locked = !!coachCtx?.locked;

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || !ai || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: t }];
    setMsgs([...next, { role: 'assistant', content: 'Claude denkt nach …' }]);
    setInput('');
    setBusy(true);
    setErr(null);
    ctl.current = new AbortController();
    const rules = coachInstructions(mode, gaps, coachCtx?.text ? `${coachCtx.label}\n${coachCtx.text}` : undefined);
    const turns = next.slice(-12);
    try {
      const r = await ai([{ role: 'user', content: rules }, ...turns], {
        cache: false,
        signal: ctl.current.signal,
        onText: ({ text: tt }: { text: string }) => setMsgs([...next, { role: 'assistant', content: tt }]),
      });
      setMsgs([...next, { role: 'assistant', content: r.text + (r.truncated ? '\n\n(Antwort gekürzt.)' : '') }]);
    } catch (e: any) {
      setMsgs(e?.text ? [...next, { role: 'assistant', content: e.text }] : next);
      if (e?.code !== 'cancelled') setErr(aiErrorText(e?.code));
    } finally {
      setBusy(false);
    }
  };

  const starters = mode === 'pruefen'
    ? ['Starte ein mündliches Prüfungsgespräch zum Gewässerschutz auf Baustellen (Stufe 2–3).']
    : mode === 'trainieren'
      ? ['Stelle mir eine Fallfrage zu meinem schwächsten Thema.', 'Bereite mich auf ein Gespräch mit einem Bauführer vor, der keine Neutralisationsanlage will.']
      : ['Erkläre den Unterschied zwischen Trenn- und Mischsystem in drei Detailstufen.', 'Was muss ich vor der Einleitung von Baugrubenwasser abklären?'];

  return (
    <div className="drawer-wrap" onClick={(e) => e.target === e.currentTarget && setCoachOpen(false)}>
      <aside className="drawer coach" role="dialog" aria-label="Lerncoach">
        <div className="drawer-head">
          <h2>Lerncoach</h2>
          <button type="button" className="btn ghost" onClick={() => { ctl.current?.abort(); setCoachOpen(false); }}>Schliessen</button>
        </div>
        {locked ? (
          <div className="callout crit"><span className="callout-label">Prüfung läuft</span><span>Im Prüfungsmodus gibt der Coach bis zum Abschluss keine Hilfestellung.</span></div>
        ) : (
          <>
            <div className="seg modes" role="radiogroup" aria-label="Coach-Modus">
              {(['erklaeren', 'trainieren', 'pruefen'] as const).map((m) => (
                <label key={m} className={mode === m ? 'on' : ''}>
                  <input type="radio" name="coach-mode" checked={mode === m} onChange={() => setMode(m)} />{MODE_LABEL[m]}
                </label>
              ))}
            </div>
            <p className="hint">{MODE_HINT[mode]}</p>
            {coachCtx && <p className="ctxline">Kontext: {coachCtx.label}</p>}
            {ai ? (
              <>
                <div className="callout info"><span className="callout-label">Datenschutz</span><span>Ihre Nachrichten gehen an Claude (über Ihr Claude-Konto). Keine vertraulichen Projektdaten, Namen oder Pläne eingeben. KI-Antworten sind nicht fachlich geprüft.</span></div>
                <div className="chat" aria-live="polite">
                  {msgs.map((m, i) => <div key={i} className={'msg ' + m.role}>{m.role === 'assistant' ? <RichText text={m.content} /> : <p>{m.content}</p>}</div>)}
                  {!msgs.length && (
                    <div className="starters">
                      {starters.map((st) => <button key={st} type="button" className="chip" onClick={() => send(st)}>{st}</button>)}
                      <AIQuestion />
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
                {err && <p className="error">{err}</p>}
                <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
                  <textarea id="coach-input" rows={2} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Frage oder Antwort eingeben …" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }} />
                  {busy ? <button type="button" className="btn" onClick={() => ctl.current?.abort()}>Stopp</button> : <button type="submit" className="btn primary" disabled={!input.trim()}>Senden</button>}
                </form>
                {msgs.length > 0 && <button type="button" className="btn ghost small" onClick={() => setMsgs([])}>Neues Gespräch</button>}
              </>
            ) : (
              <OfflineCoach mode={mode} ready={aiChecked} openTerm={openTerm} />
            )}
          </>
        )}
      </aside>
    </div>
  );
}

function AIQuestion() {
  const { ai, s } = useStore();
  const gaps = knowledgeGaps(s);
  const topic = gaps[0]?.topic ?? 'alkalisch';
  const [q, setQ] = useState<{ prompt: string; options: string[]; correct: number; explanation: string; source: string } | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  if (!ai) return null;
  const gen = async () => {
    setBusy(true);
    setErr(null);
    setPick(null);
    try {
      const r: any = await ai.json(generateQuestionPrompt(topicTitle(topic), 2), { modelTier: 'default' });
      if (!r || typeof r.prompt !== 'string' || !Array.isArray(r.options) || r.options.length < 2) throw { code: 'invalid_json' };
      setQ({ prompt: r.prompt, options: r.options.map(String), correct: Number(r.correct) || 0, explanation: String(r.explanation ?? ''), source: String(r.source ?? '') });
    } catch (e: any) {
      setErr(aiErrorText(e?.code));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="aiq">
      <button type="button" className="chip" onClick={gen} disabled={busy}>{busy ? 'Frage wird erstellt …' : `Neue Übungsfrage zu «${topicTitle(topic)}» erstellen`}</button>
      {err && <p className="error">{err}</p>}
      {q && (
        <div className="question">
          <span className="badge ai">KI-generiert · nicht fachlich geprüft</span>
          <p className="q-prompt">{q.prompt}</p>
          <div className="options">
            {q.options.map((o, i) => (
              <label key={i} className={'opt' + (pick !== null && i === q.correct ? ' correct' : '') + (pick === i && i !== q.correct ? ' wrong' : '')}>
                <input type="radio" name="aiq" disabled={pick !== null} checked={pick === i} onChange={() => setPick(i)} />
                <span>{o}</span>
              </label>
            ))}
          </div>
          {pick !== null && <div className="feedback"><p>{q.explanation}</p><p className="src-compact">Quelle laut KI: {q.source || 'keine Angabe'} – bitte prüfen.</p></div>}
        </div>
      )}
    </div>
  );
}

function OfflineCoach({ mode, ready, openTerm }: { mode: Settings['coachMode']; ready: boolean; openTerm: (id: string) => void }) {
  const { s, coachCtx } = useStore();
  const [q, setQ] = useState('');
  const hits = offlineSearch(q);
  const gaps = knowledgeGaps(s);
  const topic = gaps[0]?.topic;
  return (
    <div className="offline">
      <div className="callout info">
        <span className="callout-label">Ohne KI</span>
        <span>{ready ? 'In dieser Umgebung ist keine KI-Schnittstelle verfügbar (oder in den Einstellungen ausgeschaltet).' : 'KI-Verfügbarkeit wird geprüft …'} Der Coach arbeitet regelbasiert: Er durchsucht die geprüften App-Inhalte und gibt vorbereitete Leitfragen. Er erzeugt keine eigenen Antworten.</span>
      </div>
      <label className="field">
        <span>Was möchten Sie wissen?</span>
        <input id="offline-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="z. B. Betonwaschwasser Schacht" />
      </label>
      {q.trim() && (
        <ul className="hits">
          {hits.map((h, i) => (
            <li key={i}>
              <span className="badge">{h.kind}</span>{' '}
              {h.termId ? <button type="button" className="termlink" onClick={() => openTerm(h.termId!)}>{h.title}</button> : <a href={h.href}>{h.title}</a>}
              <p>{h.text}</p>
            </li>
          ))}
          {!hits.length && <li className="hint">Nichts gefunden. Versuchen Sie andere Begriffe oder die Wissensbibliothek.</li>}
        </ul>
      )}
      {mode !== 'erklaeren' && (
        <div className="guiding">
          <h4>Leitfragen{topic ? ` zu Ihrem schwächsten Thema: ${topicTitle(topic)}` : ''}</h4>
          <ul>{(GUIDING[topic ?? 'entwaesserung'] ?? []).map((g) => <li key={g}>{g}</li>)}</ul>
          {coachCtx && <p className="hint">Beantworten Sie die Leitfragen schriftlich für sich, bevor Sie die Lösung ansehen.</p>}
        </div>
      )}
    </div>
  );
}
