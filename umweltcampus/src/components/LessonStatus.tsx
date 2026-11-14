import type { LessonStatus } from '../lib/learning';
import { Icon } from './Icons';

const LABELS = [
  { key: 'read', label: 'Gelesen', title: 'Alle Inhaltsschritte angesehen' },
  { key: 'worked', label: 'Bearbeitet', title: 'Alle Fragen beantwortet und die Baustellenaufgabe bearbeitet' },
  { key: 'proven', label: 'Nachgewiesen', title: 'Alle geschlossenen Fragen zuletzt richtig beantwortet (objektiv ausgewertet, aktuelle Bewertungsfassung). Selbstbewertungen und KI-Feedback zählen nicht.' },
] as const;

/** Drei getrennte Stufen: gelesen – bearbeitet – nachgewiesen. */
export function StatusTrio({ st, compact }: { st: LessonStatus; compact?: boolean }) {
  return (
    <ul className={'trio' + (compact ? ' compact' : '')} aria-label="Lernstand der Lektion">
      {LABELS.map((x) => {
        const v = st[x.key];
        return (
          <li key={x.key} className={v.ok ? 'ok' : v.done > 0 ? 'part' : ''} title={x.title}>
            <span className="trio-mark" aria-hidden="true">{v.ok ? <Icon name="check" size={13} /> : null}</span>
            <span className="trio-l">{x.label}</span>
            {!compact && <span className="trio-n mono">{v.done}/{v.total}</span>}
            <span className="sr-only">{v.ok ? 'erfüllt' : `${v.done} von ${v.total}`}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Was fehlt noch? Für den Lektionsabschluss. */
export function StatusTodo({ st }: { st: LessonStatus }) {
  const items: string[] = [];
  if (!st.read.ok) items.push(`${st.read.total - st.read.done} Inhaltsschritt${st.read.total - st.read.done === 1 ? '' : 'e'} noch nicht angesehen`);
  if (!st.worked.ok) items.push(`${st.worked.total - st.worked.done} Frage${st.worked.total - st.worked.done === 1 ? '' : 'n'} bzw. Aufgabe offen`);
  if (!st.proven.ok) items.push(`${st.proven.total - st.proven.done} von ${st.proven.total} geschlossenen Fragen noch nicht richtig – Nachweis über Wiederholung oder Prüfung möglich`);
  return (
    <div className="trio-todo">
      <StatusTrio st={st} />
      {items.length ? <ul className="plain hint">{items.map((i) => <li key={i}>{i}</li>)}</ul> : <p className="okline">Alle drei Stufen erfüllt.</p>}
      {st.openOnly > 0 && <p className="hint">{st.openOnly} offene Frage{st.openOnly === 1 ? '' : 'n'} mit Selbstbewertung – hilfreich zum Lernen, aber kein Nachweis.</p>}
    </div>
  );
}
