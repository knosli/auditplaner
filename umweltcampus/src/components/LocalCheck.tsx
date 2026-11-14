import { useStore } from '../store';
import { cantonOf, MODULE_THEMES, projectCheck } from '../content/cantons';
import { CantonSourceItem, CheckBadge, FederalItems } from './CantonParts';

/** Bereich «Vor Ort prüfen» auf der Modulseite – Schweizer Grundlagen und kantonale Quellen getrennt. */
export function LocalCheck({ moduleId }: { moduleId: string }) {
  const { s, update } = useStore();
  const themes = MODULE_THEMES[moduleId];
  if (!themes) return null;
  const site = s.settings.site;
  const c = cantonOf(site?.canton);
  const mode = c ? s.settings.localMode ?? 'kanton' : 'ch';
  const setMode = (m: 'ch' | 'kanton') => update((x) => ({ ...x, settings: { ...x.settings, localMode: m } }));
  const rows = projectCheck(c?.code, themes, site?.municipality);
  return (
    <section className="section localcheck" id="vor-ort">
      <div className="section-head"><h2>Vor Ort prüfen</h2><a className="hint" href="#kanton">Kanton &amp; Standort →</a></div>
      {!c ? (
        <p className="hint">Die Lerninhalte beschreiben die Schweizer Grundlagen. Kantone und Gemeinden können zusätzliche Anforderungen stellen. Wählen Sie in den <a href="#einstellungen">Einstellungen</a> den Kanton der Baustelle, um die amtlichen kantonalen Quellen zu sehen.</p>
      ) : (
        <>
          <div className="seg" role="radiogroup" aria-label="Betrachtungsmodus">
            <label className={mode === 'ch' ? 'on' : ''}><input type="radio" name="localmode" checked={mode === 'ch'} onChange={() => setMode('ch')} />Schweizer Grundlagen</label>
            <label className={mode === 'kanton' ? 'on' : ''}><input type="radio" name="localmode" checked={mode === 'kanton'} onChange={() => setMode('kanton')} />Zusatzanforderungen {c.code}{site?.municipality ? ' / ' + site.municipality : ''}</label>
          </div>
          {mode === 'ch' ? (
            <div className="lc-rows">
              <p className="hint">Bundesrecht, Bundes-Vollzugshilfen und Normen – gelten unabhängig vom Kanton. Die kantonale Umsetzung steht im anderen Modus.</p>
              {rows.map((r) => <div key={r.theme} className="lc-row"><h3>{r.label}</h3><FederalItems row={r} /></div>)}
            </div>
          ) : (
            <div className="lc-rows">
              <p className="hint">Amtliche Quellen des Kantons {c.name} aus dem Quellenregister (Link-Recherche 14.11.2026). Es sind Fundorte, keine geprüften Pflichten.</p>
              {rows.map((r) => (
                <div key={r.theme} className="lc-row">
                  <h3>{r.label} <CheckBadge status={r.status} /></h3>
                  <p className={'lc-msg st-' + r.status}>{r.message}</p>
                  {r.cantonal.length > 0 && <ul className="srclist">{r.cantonal.map((x) => <CantonSourceItem key={x.id} x={x} />)}</ul>}
                  {r.entry.length > 0 && <><p className="hint">Allgemeiner Einstieg beim Kanton:</p><ul className="srclist">{r.entry.map((x) => <CantonSourceItem key={x.id} x={x} />)}</ul></>}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
