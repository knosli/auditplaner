import { useMemo, useState } from 'react';
import { L, PLACEMENT, Q } from '../content';
import { useStore } from '../store';
import { Icon } from '../components/Icons';
import { RichText } from '../components/RichText';
import { rng, shuffle } from '../lib/exam';

const DONT_KNOW = '?';

/**
 * Einstufungstest Grundlagen (Modul 0): je Lektion zwei Fragen. Ergebnis: welche Grundlagen-Lektionen
 * übersprungen werden können (2/2), kurz aufgefrischt (1/2) oder bearbeitet werden sollten (0/2).
 * Die Antworten zählen nicht als Kompetenznachweis und verändern den übrigen Lernstand nicht.
 */
export function PlacementView() {
  const { s, update } = useStore();
  const items = useMemo(() => PLACEMENT.flatMap((p) => p.questionIds.map((qid) => ({ lessonId: p.lessonId, q: Q.get(qid)! }))), []);
  const [seed] = useState(() => Date.now());
  const order = useMemo(() => {
    const r = rng(seed);
    return items.map((it) => shuffle(it.q.options ?? [], r));
  }, [items, seed]);
  const [running, setRunning] = useState(false);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [given, setGiven] = useState<Record<string, string>>({});
  const done = !running && Object.keys(given).length === items.length;

  const start = () => { setGiven({}); setI(0); setPicked(null); setRunning(true); };
  const next = () => {
    if (picked === null) return;
    const it = items[i];
    const g = { ...given, [it.q.id]: picked };
    setGiven(g);
    setPicked(null);
    if (i < items.length - 1) { setI(i + 1); return; }
    setRunning(false);
    const res: Record<string, number> = {};
    for (const p of PLACEMENT) res[p.lessonId] = p.questionIds.filter((qid) => Q.get(qid)!.correct!.includes(g[qid])).length;
    update((x) => ({ ...x, placement: { at: Date.now(), res } }));
  };

  if (running) {
    const it = items[i];
    return (
      <div className="page placement">
        <header className="page-head"><span className="eyebrow">Einstufungstest Grundlagen · Frage {i + 1} von {items.length}</span><h1>{L.get(it.lessonId)?.title}</h1></header>
        <div className="bar small" aria-hidden="true"><b style={{ width: `${(i / items.length) * 100}%` }} /></div>
        <fieldset className="pl-q">
          <legend className="q-prompt">{it.q.prompt}</legend>
          {order[i].map((o) => (
            <label key={o.id} className={'opt' + (picked === o.id ? ' sel' : '')}>
              <input type="radio" name={'pl-' + it.q.id} checked={picked === o.id} onChange={() => setPicked(o.id)} /> <span>{o.text}</span>
            </label>
          ))}
          <label className={'opt dontknow' + (picked === DONT_KNOW ? ' sel' : '')}>
            <input type="radio" name={'pl-' + it.q.id} checked={picked === DONT_KNOW} onChange={() => setPicked(DONT_KNOW)} /> <span>Weiss ich nicht</span>
          </label>
        </fieldset>
        <div className="q-actions">
          <button type="button" className="btn primary" id="pl-next" disabled={picked === null} onClick={next}>{i < items.length - 1 ? 'Weiter' : 'Auswerten'} <Icon name="arrow" size={16} /></button>
          {picked === null && <span className="hint need">Wählen Sie eine Antwort – oder «Weiss ich nicht», statt zu raten.</span>}
        </div>
        <p className="hint">Raten verfälscht das Ergebnis. «Weiss ich nicht» ist hier die ehrlichste und nützlichste Antwort.</p>
      </div>
    );
  }

  const res = s.placement?.res;
  const firstOpen = res ? PLACEMENT.find((p) => (res[p.lessonId] ?? 0) < 2 && !s.lessons[p.lessonId]?.completedAt) : undefined;
  const missed = done ? items.filter((it) => !it.q.correct!.includes(given[it.q.id])) : [];
  return (
    <div className="page placement">
      <header className="page-head">
        <span className="eyebrow">Modul 0 · Grundlagen auffrischen</span>
        <h1>Einstufungstest.</h1>
        <p className="lead">14 kurze Fragen, je zwei zu jeder Grundlagen-Lektion – etwa 7 Minuten. Danach sehen Sie, welche Grundlagen Sie auffrischen sollten und welche Sie überspringen können.</p>
      </header>
      {!res ? (
        <section className="section">
          <ul className="plain">
            <li>Keine Zeitbegrenzung, keine Note.</li>
            <li>Bei Unsicherheit «Weiss ich nicht» wählen – das macht die Empfehlung genauer.</li>
            <li>Das Ergebnis zählt nicht als Kompetenznachweis und verändert Ihren übrigen Lernstand nicht.</li>
          </ul>
          <button type="button" className="btn primary" id="pl-start" onClick={start}>Einstufungstest starten <Icon name="arrow" size={16} /></button>
        </section>
      ) : (
        <>
          <section className="section">
            <div className="section-head"><h2>Ihr Ergebnis</h2><span className="hint">{new Date(s.placement!.at).toLocaleDateString('de-CH')}</span></div>
            <ul className="pl-res">
              {PLACEMENT.map((p) => {
                const n = res[p.lessonId] ?? 0;
                const l = L.get(p.lessonId)!;
                const st = n >= 2 ? { c: 'ok', t: 'sicher – kann übersprungen werden' } : n === 1 ? { c: 'part', t: 'kurz auffrischen' } : { c: 'todo', t: 'bearbeiten empfohlen' };
                const lp = s.lessons[l.id];
                return (
                  <li key={p.lessonId} className={'pl-row ' + st.c}>
                    <span className="pl-n mono">{n}/2</span>
                    <span className="pl-t"><a href={'#lektion-' + l.id}>{l.order}. {l.title}</a><span className="hint">{lp?.completedAt ? 'abgeschlossen' : st.t}</span></span>
                  </li>
                );
              })}
            </ul>
            <div className="q-actions">
              {firstOpen ? <a className="btn primary" href={'#lektion-' + firstOpen.lessonId}>Mit «{L.get(firstOpen.lessonId)!.title}» beginnen <Icon name="arrow" size={16} /></a>
                : <a className="btn primary" href="#modul-m2">Grundlagen sitzen – weiter zu den Fachmodulen <Icon name="arrow" size={16} /></a>}
              <a className="btn" href="#modul-m0">Zur Übersicht Modul 0</a>
              <button type="button" className="btn quiet" onClick={start}>Test wiederholen</button>
            </div>
            <p className="hint">Übersprungene Lektionen können Sie jederzeit trotzdem öffnen. Für den Abschluss von Modul 0 zählt zusätzlich der Abschlusstest im Prüfungstraining.</p>
          </section>
          {missed.length > 0 && (
            <section className="section">
              <h2>Diese Fragen lohnt es sich anzusehen</h2>
              {missed.map((it) => {
                const ok = it.q.options!.find((o) => it.q.correct!.includes(o.id))!;
                return (
                  <details key={it.q.id} className="pl-miss">
                    <summary>{it.q.prompt}</summary>
                    <p><strong>Richtig:</strong> {ok.text}</p>
                    <RichText text={it.q.explanation} />
                  </details>
                );
              })}
            </section>
          )}
        </>
      )}
    </div>
  );
}
