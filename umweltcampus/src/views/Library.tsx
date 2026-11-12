import { useMemo, useState } from 'react';
import { GLOSSARY, LIB_CATEGORY_LABEL, LIBRARY, SOURCES, TASKS } from '../content';
import type { LibraryEntry } from '../content/types';
import { useStore } from '../store';
import { RichText } from '../components/RichText';
import { KindBadge, ReviewBadge, Section, SourceList } from '../components/ui';
import { PracticeCard } from '../components/Practice';
import { saveFile } from '../lib/platform';

const norm = (t: string) => t.toLowerCase().replace(/ß/g, 'ss');

export function LibraryView() {
  const { openTerm } = useStore();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'alle' | 'begriffe' | 'recht' | 'quellen'>('alle');
  const n = norm(q.trim());
  const terms = useMemo(() => GLOSSARY.filter((g) => !n || norm([g.term, ...(g.aliases ?? []), g.definition, g.detail ?? ''].join(' ')).includes(n)), [n]);
  const entries = useMemo(() => LIBRARY.filter((e) => !n || norm([e.title, e.summary, e.text ?? '', ...e.tags, ...(e.items ?? []).flatMap((i) => i.points), ...(e.table?.rows.flat() ?? [])].join(' ')).includes(n)), [n]);
  const srcs = useMemo(() => SOURCES.filter((s) => !n || norm([s.title, s.short, s.sr ?? '', s.issuer, s.articles ?? ''].join(' ')).includes(n)), [n]);

  return (
    <div className="page">
      <header className="page-head">
        <h1>Wissensbibliothek</h1>
        <p className="lead">Nachschlagen unabhängig von den Lektionen: Fachbegriffe, Rechtsgrundlagen, häufige Probleme, Schutzmassnahmen, Checklisten, Vorlagen und Quellen.</p>
      </header>
      <input id="lib-search" type="search" className="search big-search" placeholder="Suchen: Betonwaschwasser, Bodenschutz, SIA 431, Entsorgungskonzept …" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="seg tabs" role="tablist">
        {(['alle', 'begriffe', 'recht', 'quellen'] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
            {{ alle: 'Alles', begriffe: `Fachbegriffe (${terms.length})`, recht: `Praxis & Recht (${entries.length})`, quellen: `Quellen (${srcs.length})` }[t]}
          </button>
        ))}
      </div>
      {n && !terms.length && !entries.length && !srcs.length && (
        <p className="hint">Keine Treffer für «{q}». Viele Themen (z. B. Bodenschutz, Entsorgungskonzept) gehören zu Modulen in Entwicklung; prüfen Sie Schreibweise oder Synonyme.</p>
      )}
      {(tab === 'alle' || tab === 'begriffe') && terms.length > 0 && (
        <Section title="Fachbegriffe">
          <ul className="termgrid">
            {terms.slice(0, tab === 'alle' && !n ? 12 : 99).map((g) => (
              <li key={g.id}>
                <button type="button" onClick={() => openTerm(g.id)}>
                  <strong>{g.term}</strong>
                  {g.kind && <KindBadge kind={g.kind} />}
                  <span>{g.definition}</span>
                </button>
              </li>
            ))}
          </ul>
          {tab === 'alle' && !n && terms.length > 12 && <button type="button" className="btn ghost small" onClick={() => setTab('begriffe')}>Alle {terms.length} Begriffe</button>}
        </Section>
      )}
      {(tab === 'alle' || tab === 'recht') && entries.length > 0 && (
        <Section title="Praxis und Recht">
          <div className="libgrid">{entries.map((e) => <LibCard key={e.id} e={e} />)}</div>
        </Section>
      )}
      {(tab === 'alle' || tab === 'quellen') && srcs.length > 0 && (
        <Section title="Quellenverzeichnis">
          <div className="callout law"><span className="callout-label">Prüfstatus</span><span>Alle Quellen stehen auf «Entwurf». Artikel und Fassungen wurden noch nicht gegen die aktuelle Originalquelle geprüft; Links wurden nicht automatisch getestet. Kostenpflichtige Normen werden nicht zitiert.</span></div>
          <SourceList ids={srcs.map((s) => s.id)} />
        </Section>
      )}
    </div>
  );
}

function LibCard({ e }: { e: LibraryEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={'libcard cat-' + e.category}>
      <span className="eyebrow">{LIB_CATEGORY_LABEL[e.category]}</span>
      <h3>{e.title}</h3>
      <p>{e.summary}</p>
      <button type="button" className="btn ghost small" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Schliessen' : 'Öffnen'}</button>
      {open && <LibBody e={e} />}
    </article>
  );
}

function LibBody({ e, interactive }: { e: LibraryEntry; interactive?: boolean }) {
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const { toast } = useStore();
  const exportMd = async () => {
    const md = toMarkdown(e, ticks);
    const r = await saveFile(e.id + '.md', md, 'text/markdown');
    toast(r === 'gespeichert' ? 'Datei gespeichert.' : r === 'abgelehnt' ? 'Speichern abgelehnt.' : 'Speichern hier nicht möglich – bitte Text kopieren.');
  };
  return (
    <div className="libbody">
      {e.text && <RichText text={e.text} />}
      {e.items && e.items.map((g) => (
        <fieldset key={g.group} className="checklist">
          <legend>{g.group}</legend>
          {g.points.map((p) => {
            const k = g.group + '|' + p;
            return interactive ? (
              <label key={p}><input type="checkbox" checked={!!ticks[k]} onChange={() => setTicks({ ...ticks, [k]: !ticks[k] })} /> {p}</label>
            ) : <p key={p} className="cl-point">☐ {p}</p>;
          })}
        </fieldset>
      ))}
      {e.table && (
        <div className="tablewrap">
          <table className="table">
            <thead><tr>{e.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{e.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      <SourceList ids={e.sources} compact />
      {interactive && <button type="button" className="btn small" onClick={exportMd}>Als Markdown-Datei speichern</button>}
    </div>
  );
}

function toMarkdown(e: LibraryEntry, ticks: Record<string, boolean>) {
  const lines = [`# ${e.title}`, '', e.summary, ''];
  if (e.items) for (const g of e.items) {
    lines.push(`## ${g.group}`);
    for (const p of g.points) lines.push(`- [${ticks[g.group + '|' + p] ? 'x' : ' '}] ${p}`);
    lines.push('');
  }
  if (e.table) {
    lines.push('| ' + e.table.head.join(' | ') + ' |', '|' + e.table.head.map(() => '---').join('|') + '|');
    for (const r of e.table.rows) lines.push('| ' + r.join(' | ') + ' |');
    lines.push('');
  }
  if (e.text) lines.push(e.text.replace(/\[\[[a-z0-9-]+\|?(.*?)\]\]/g, '$1'), '');
  lines.push(`Erstellt mit UmweltCampus Bau CH, ${new Date().toLocaleDateString('de-CH')}. Inhalte Prüfstatus Entwurf.`);
  return lines.join('\n');
}

export function ToolsView() {
  const tools = LIBRARY.filter((e) => ['checkliste', 'vorlage', 'matrix', 'massnahme'].includes(e.category));
  const [sel, setSel] = useState(tools[0]?.id);
  const cur = tools.find((t) => t.id === sel);
  return (
    <div className="page">
      <header className="page-head">
        <h1>Praxiswerkzeuge</h1>
        <p className="lead">Werkzeuge für die Baustelle und Ihre Praxisaufträge. Checklisten lassen sich abhaken und als Markdown-Datei speichern. Reale Projektdaten bleiben in Ihren Firmensystemen.</p>
      </header>
      <Section title="Praxisaufträge Modul 2">
        <p className="hint">Status «In der Praxis bestätigt» erfordert eine Reflexion zu jedem Kriterium und eine Bestätigung mit Funktion, Datum und Nachweis. Ein Klick allein genügt nicht.</p>
        <div className="practice-list">{TASKS.map((t) => <PracticeCard key={t.id} taskId={t.id} compact />)}</div>
      </Section>
      <Section title="Checklisten, Vorlagen und Matrizen">
        <div className="row">{tools.map((t) => <button key={t.id} type="button" className={'chip' + (sel === t.id ? ' on' : '')} onClick={() => setSel(t.id)}>{t.title}</button>)}</div>
        {cur && (
          <article className="tool">
            <div className="row spread"><h3>{cur.title}</h3><ReviewBadge status="entwurf" /></div>
            <p>{cur.summary}</p>
            <LibBody key={cur.id} e={cur} interactive />
          </article>
        )}
      </Section>
      <Section title="Weitere Werkzeuge">
        <ul className="plain">
          <li>Baustellenspezifische Checklisten, Umweltmassnahmenplan-Generator und Rechtskataster <span className="badge dev">In Entwicklung</span></li>
        </ul>
      </Section>
    </div>
  );
}
