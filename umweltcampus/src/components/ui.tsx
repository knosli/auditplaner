import { useState, type ReactNode } from 'react';
import { REVIEW_LABEL, SOURCE_KIND_LABEL, SOURCES } from '../content';
import type { ReviewStatus, SourceKind } from '../content/types';
import type { Confidence } from '../lib/state';

export function KindBadge({ kind }: { kind: SourceKind }) {
  return <span className={'badge kind-' + kind}>{SOURCE_KIND_LABEL[kind]}</span>;
}

export function ReviewBadge({ status }: { status: ReviewStatus }) {
  return <span className={'badge review-' + status} title={REVIEW_LABEL[status]}>{status === 'entwurf' ? 'Prüfstatus: Entwurf' : REVIEW_LABEL[status]}</span>;
}

export function DevBadge() {
  return <span className="badge dev">In Entwicklung</span>;
}

export function Bar({ value, label, tone = 'accent', small }: { value: number; label?: string; tone?: 'accent' | 'ok' | 'warn' | 'crit' | 'muted'; small?: boolean }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div className={'bar' + (small ? ' small' : '')} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={'bar-fill tone-' + tone} style={{ width: pct + '%' }} />
    </div>
  );
}

export function SourceList({ ids, compact }: { ids: string[]; compact?: boolean }) {
  const list = ids.map((id) => SOURCES.find((s) => s.id === id)).filter(Boolean) as typeof SOURCES;
  if (!list.length) return null;
  if (compact)
    return (
      <p className="src-compact">
        Quellen: {list.map((s, i) => <span key={s.id}>{i > 0 && ' · '}<span className="mono">{s.short}</span></span>)}
      </p>
    );
  return (
    <ul className="srclist">
      {list.map((s) => (
        <li key={s.id}>
          <div className="src-head">
            <strong>{s.title}</strong>
            {s.sr && <span className="mono"> {s.sr}</span>}
          </div>
          <div className="src-badges"><KindBadge kind={s.kind} /><ReviewBadge status={s.review} /></div>
          <dl className="src-meta">
            {s.articles && <><dt>Verwendete Artikel</dt><dd>{s.articles}</dd></>}
            <dt>Herausgeber</dt><dd>{s.issuer}</dd>
            <dt>Fassung</dt><dd>{s.version}</dd>
            <dt>Letzte Prüfung</dt><dd>{s.lastChecked ?? 'noch nicht geprüft'}</dd>
            <dt>Geltungsbereich</dt><dd>{s.scope}</dd>
            {s.cantonal && <><dt>Kantonal</dt><dd>{s.cantonal}</dd></>}
            {s.note && <><dt>Hinweis</dt><dd>{s.note}</dd></>}
          </dl>
          {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="extlink">{s.url.replace(/^https?:\/\//, '')} ↗</a>}
        </li>
      ))}
    </ul>
  );
}

const CONF: { v: Confidence; label: string }[] = [
  { v: 1, label: 'Unsicher / geraten' },
  { v: 2, label: 'Eher sicher' },
  { v: 3, label: 'Sicher' },
];

export function ConfidencePicker({ value, onChange, name }: { value?: Confidence; onChange: (c: Confidence) => void; name: string }) {
  return (
    <fieldset className="conf">
      <legend>Wie sicher sind Sie sich?</legend>
      <div className="seg">
        {CONF.map((c) => (
          <label key={c.v} className={value === c.v ? 'on' : ''}>
            <input type="radio" name={name} checked={value === c.v} onChange={() => onChange(c.v)} />
            {c.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Zweistufige Bestätigung im Seiteninhalt (keine Browser-Dialoge). */
export function ConfirmButton({ label, confirmLabel, onConfirm, className = 'btn', danger }: { label: string; confirmLabel: string; onConfirm: () => void; className?: string; danger?: boolean }) {
  const [ask, setAsk] = useState(false);
  if (!ask) return <button type="button" className={className} onClick={() => setAsk(true)}>{label}</button>;
  return (
    <span className="confirm">
      <button type="button" className={'btn ' + (danger ? 'danger' : 'primary')} onClick={() => { setAsk(false); onConfirm(); }}>{confirmLabel}</button>
      <button type="button" className="btn ghost" onClick={() => setAsk(false)}>Abbrechen</button>
    </span>
  );
}

export function Section({ title, children, aside, id }: { title: string; children: ReactNode; aside?: ReactNode; id?: string }) {
  return (
    <section className="section" id={id}>
      <div className="section-head"><h2>{title}</h2>{aside}</div>
      {children}
    </section>
  );
}

export const pct = (x: number) => Math.round(x * 100) + ' %';

export function fmtDate(t: number) {
  return new Date(t).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
export function fmtDateTime(t: number) {
  return new Date(t).toLocaleString('de-CH', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}
