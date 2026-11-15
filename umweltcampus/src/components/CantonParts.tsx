import { LINK_STATUS_LABEL, NATURE_LABEL, linkCheck, type CantonSource, type CheckRow } from '../content/cantons';
import { KindBadge } from './ui';

export function CheckBadge({ status }: { status: CheckRow['status'] | CantonSource['status'] }) {
  if (status === 'geprueft') return <span className="badge chk-ok">Fundstelle geprüft</span>;
  if (status === 'quelle_nicht_geprueft' || status === 'nicht_geprueft') return <span className="badge chk-open">nicht geprüft</span>;
  return <span className="badge chk-none">kantonale Regelung nicht verifiziert</span>;
}

export function LinkBadge({ id }: { id: string }) {
  const l = linkCheck(id);
  if (!l) return <span className="badge chk-none">Link nicht geprüft</span>;
  return <span className={'badge ' + (l.status === 'nicht_pruefbar' ? 'chk-open' : 'chk-link')} title={'Linkprüfung ' + l.checked}>{LINK_STATUS_LABEL[l.status]}</span>;
}

export function CantonSourceItem({ x }: { x: CantonSource }) {
  const l = linkCheck(x.id);
  return (
    <li className="csrc">
      <div className="src-head"><strong>{x.title}</strong> <span className="mono">{x.canton}</span></div>
      <div className="src-badges"><span className="badge">{NATURE_LABEL[x.nature]}</span><CheckBadge status={x.status} /><LinkBadge id={x.id} /></div>
      <dl className="src-meta">
        <dt>Herausgeber</dt><dd>{x.issuer}</dd>
        <dt>Ausgabe/Stand</dt><dd>{x.edition ?? 'nicht angegeben'}</dd>
        <dt>Link recherchiert</dt><dd>{x.retrieved} (Quellenregister; Inhalt nicht fachlich geprüft)</dd>
        <dt>Linkprüfung</dt><dd>{l ? `${LINK_STATUS_LABEL[l.status]} – ${l.checked}${l.note ? ' · ' + l.note : ''}` : 'nicht durchgeführt'} (nur Erreichbarkeit, keine fachliche Prüfung)</dd>
        <dt>Geprüfte Fundstelle</dt><dd>{x.checkedRef ?? '– keine –'}</dd>
        {x.reviewer && <><dt>Geprüft durch</dt><dd>{x.reviewer}</dd></>}
        <dt>Hinweis</dt><dd>{x.hint}</dd>
      </dl>
      <a href={x.url} target="_blank" rel="noopener noreferrer" className="extlink">{x.url.replace(/^https?:\/\//, '').slice(0, 90)}{x.url.length > 98 ? '…' : ''} ↗</a>
    </li>
  );
}

export function FederalItems({ row }: { row: CheckRow }) {
  return (
    <ul className="fedlist">
      {row.federal.map((s) => (
        <li key={s.id}><KindBadge kind={s.kind} /> <strong>{s.short}</strong>{s.sr ? <span className="mono"> {s.sr}</span> : null} – {s.title}{s.url && <> · <a href={s.url} target="_blank" rel="noopener noreferrer">Quelle ↗</a></>}</li>
      ))}
    </ul>
  );
}
