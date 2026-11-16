import { useStore } from '../store';
import { cantonOf } from '../content/cantons';
import { siteKey, type SiteSettings } from '../lib/state';

const label = (x: SiteSettings) => `${x.canton}${x.municipality ? ' · ' + x.municipality : ''}`;

/**
 * «Meine Baustellen»: mehrere Standorte merken und mit einem Tipp wechseln.
 * Gespeichert werden nur Kanton, Sprache und Gemeindename (keine Adresse).
 */
export function SiteSwitcher({ manage = false, compact = false }: { manage?: boolean; compact?: boolean }) {
  const { s, update } = useStore();
  const sites = s.settings.sites ?? [];
  const cur = s.settings.site;
  const curKey = siteKey(cur);
  const known = sites.some((x) => siteKey(x) === curKey);
  const setSites = (list: SiteSettings[]) => update((x) => ({ ...x, settings: { ...x.settings, sites: list.length ? list : undefined } }));
  const pick = (x: SiteSettings) => update((st) => ({ ...st, settings: { ...st.settings, site: { ...x } } }));
  const add = () => cur?.canton && !known && setSites([...sites, { canton: cur.canton, ...(cur.lang ? { lang: cur.lang } : {}), ...(cur.municipality ? { municipality: cur.municipality } : {}) }]);
  const remove = (x: SiteSettings) => setSites(sites.filter((y) => siteKey(y) !== siteKey(x)));
  if (!manage && sites.length < 2) return null;
  return (
    <div className={'site-switch' + (compact ? ' compact' : '')}>
      <span className="side-title">Meine Baustellen</span>
      {sites.length > 0 ? (
        <ul className="site-chips" aria-label="Gemerkte Baustellenstandorte">
          {sites.map((x) => {
            const on = siteKey(x) === curKey;
            return (
              <li key={siteKey(x)}>
                <button type="button" className={'chip' + (on ? ' on' : '')} aria-pressed={on} onClick={() => pick(x)} title={cantonOf(x.canton)?.name}>{label(x)}</button>
                {manage && <button type="button" className="chip-x" aria-label={`${label(x)} entfernen`} onClick={() => remove(x)}>×</button>}
              </li>
            );
          })}
        </ul>
      ) : manage ? <p className="hint">Noch keine Standorte gemerkt. Wählen Sie oben einen Kanton (optional mit Gemeinde) und tippen Sie auf «Merken».</p> : null}
      {manage && cur?.canton && !known && <button type="button" className="btn small" onClick={add}>＋ {label(cur)} merken</button>}
      {manage && sites.length > 0 && <p className="hint">Tippen Sie auf einen Standort, um ihn für «Vor Ort prüfen» und den Projektcheck zu verwenden. Die Lerninhalte bleiben gleich.</p>}
    </div>
  );
}
