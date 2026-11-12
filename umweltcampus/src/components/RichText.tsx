import { Fragment, type ReactNode } from 'react';
import { useStore } from '../store';

// Kleiner, sicherer Renderer für das Inhalts-Markup (kein innerHTML).
// Unterstützt: Absätze, "- " und "1. " Listen, "### " Titel, **fett**,
// [[begriff|Text]], "> " Hinweis, "!> " kritisch, "§> " Rechtsnatur.

function Inline({ text }: { text: string }) {
  const { openTerm } = useStore();
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[\[([a-z0-9-]+)(?:\|(.+?))?\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={i++}>{m[1]}</strong>);
    else {
      const id = m[2];
      parts.push(
        <button key={i++} type="button" className="termlink" onClick={() => openTerm(id)} title="Fachbegriff nachschlagen">
          {m[3] ?? id}
        </button>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function RichText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className="rich">
      {blocks.map((b, bi) => {
        const lines = b.split('\n');
        if (lines.length > 1 && lines.every((l) => l.trim().startsWith('|'))) {
          const rows = lines.filter((l) => !/^\|\s*-{2,}/.test(l.trim())).map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
          return (
            <div className="tablewrap" key={bi}>
              <table className="table"><thead><tr>{rows[0].map((c, i) => <th key={i}><Inline text={c} /></th>)}</tr></thead>
                <tbody>{rows.slice(1).map((r, ri) => <tr key={ri}>{r.map((c, i) => <td key={i}><Inline text={c} /></td>)}</tr>)}</tbody></table>
            </div>
          );
        }
        if (lines.every((l) => /^- /.test(l))) return <ul key={bi}>{lines.map((l, i) => <li key={i}><Inline text={l.slice(2)} /></li>)}</ul>;
        if (lines.every((l) => /^\d+\. /.test(l))) return <ol key={bi}>{lines.map((l, i) => <li key={i}><Inline text={l.replace(/^\d+\. /, '')} /></li>)}</ol>;
        return (
          <Fragment key={bi}>
            {groupLines(lines).map((g, gi) => {
              if (g.type === 'h') return <h4 key={gi}><Inline text={g.text} /></h4>;
              if (g.type === 'ul') return <ul key={gi}>{g.items.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>;
              if (g.type === 'ol') return <ol key={gi}>{g.items.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ol>;
              if (g.type === 'note') return <aside key={gi} className={'callout ' + g.variant} role="note"><span className="callout-label">{g.variant === 'crit' ? 'Achtung' : g.variant === 'law' ? 'Rechtsnatur' : 'Hinweis'}</span><span><Inline text={g.text} /></span></aside>;
              return <p key={gi}><Inline text={g.text} /></p>;
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

type G = { type: 'p'; text: string } | { type: 'h'; text: string } | { type: 'ul'; items: string[] } | { type: 'ol'; items: string[] } | { type: 'note'; variant: 'info' | 'crit' | 'law'; text: string };

function groupLines(lines: string[]): G[] {
  const out: G[] = [];
  for (const l of lines) {
    const prev = out[out.length - 1];
    if (l.startsWith('### ')) out.push({ type: 'h', text: l.slice(4) });
    else if (l.startsWith('!> ')) out.push({ type: 'note', variant: 'crit', text: l.slice(3) });
    else if (l.startsWith('§> ')) out.push({ type: 'note', variant: 'law', text: l.slice(3) });
    else if (l.startsWith('> ')) out.push({ type: 'note', variant: 'info', text: l.slice(2) });
    else if (/^- /.test(l)) {
      if (prev?.type === 'ul') prev.items.push(l.slice(2));
      else out.push({ type: 'ul', items: [l.slice(2)] });
    } else if (/^\d+\. /.test(l)) {
      const t = l.replace(/^\d+\. /, '');
      if (prev?.type === 'ol') prev.items.push(t);
      else out.push({ type: 'ol', items: [t] });
    } else if (prev?.type === 'p') prev.text += ' ' + l;
    else out.push({ type: 'p', text: l });
  }
  return out;
}

export function InlineText({ text }: { text: string }) {
  return <Inline text={text} />;
}
