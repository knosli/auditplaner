import { useState } from 'react';
import { RichText, keySentence, splitDeep } from './RichText';

/**
 * Fachvertiefung gegliedert: Übersicht «Auf einen Blick» mit Kernsätzen,
 * aufklappbare Abschnitte, Lesefortschritt und Zwischenstand.
 */
export function DeepText({ text, id }: { text: string; id: string }) {
  const { intro, sections, legal } = splitDeep(text);
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  if (sections.length < 3) return <RichText text={text} />;
  const toggle = (i: number, v?: boolean) => {
    setOpen((o) => { const n = new Set(o); (v ?? !n.has(i)) ? n.add(i) : n.delete(i); return n; });
    setSeen((x) => new Set(x).add(i));
  };
  const jump = (i: number) => {
    toggle(i, true);
    setTimeout(() => document.getElementById(`${id}-sec-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  };
  const half = Math.ceil(sections.length / 2);
  return (
    <div className="deep">
      {intro.trim() && <RichText text={intro} />}
      <nav className="deep-toc" aria-label="Auf einen Blick">
        <div className="deep-toc-head"><strong>Auf einen Blick</strong><span className="hint">{seen.size} von {sections.length} Abschnitten gelesen</span></div>
        <ol>
          {sections.map((s, i) => (
            <li key={i} className={seen.has(i) ? 'seen' : ''}>
              <button type="button" onClick={() => jump(i)}><span className="deep-t">{s.title.replace(/^\d+\.\s*/, '')}</span><span className="deep-k">{keySentence(s.body)}</span></button>
            </li>
          ))}
        </ol>
        <div className="row"><button type="button" className="btn small quiet" onClick={() => { setOpen(new Set(sections.map((_, i) => i))); setSeen(new Set(sections.map((_, i) => i))); }}>Alle aufklappen</button><button type="button" className="btn small quiet" onClick={() => setOpen(new Set())}>Alle zuklappen</button></div>
      </nav>
      {sections.map((s, i) => (
        <section key={i} id={`${id}-sec-${i}`} className={'deep-sec' + (open.has(i) ? ' open' : '')}>
          <h3>
            <button type="button" aria-expanded={open.has(i)} aria-controls={`${id}-body-${i}`} onClick={() => toggle(i)}>
              <span className="deep-no mono">{i + 1}</span><span>{s.title.replace(/^\d+\.\s*/, '')}</span><span className="deep-chev" aria-hidden="true">{open.has(i) ? '−' : '+'}</span>
            </button>
          </h3>
          {!open.has(i) && <p className="deep-k-inline">{keySentence(s.body)}</p>}
          <div id={`${id}-body-${i}`} hidden={!open.has(i)}>
            <RichText text={s.body} />
            {i < sections.length - 1 && <button type="button" className="btn small" onClick={() => { toggle(i, false); jump(i + 1); }}>Weiter: {sections[i + 1].title.replace(/^\d+\.\s*/, '')} ↓</button>}
          </div>
          {i === half - 1 && sections.length >= 6 && (
            <aside className="deep-mid" aria-label="Zwischenstand">
              <strong>Zwischenstand</strong>
              <ul>{sections.slice(0, half).map((x, j) => <li key={j}>{keySentence(x.body)}</li>)}</ul>
            </aside>
          )}
        </section>
      ))}
      {legal && <RichText text={legal} />}
    </div>
  );
}
