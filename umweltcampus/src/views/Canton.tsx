import { SiteSwitcher } from '../components/SiteSwitcher';
import { useStore } from '../store';
import { Section } from '../components/ui';
import { CANTONS, cantonOf, cantonSources, CHECK_THEMES, LANG_LABEL, projectCheck } from '../content/cantons';
import { CantonSourceItem, CheckBadge, FederalItems } from '../components/CantonParts';
import type { SiteSettings } from '../lib/state';

const RASTER = [
  'Baustellenentwässerung, Einleitung, Wasserhaltung, Grundwasserschutzzonen',
  'Entsorgungskonzept, Schadstoffermittlung, VeVA und Abfallanlagen',
  'Bodenabtrag, Bodenverwertung, bodenkundliche Baubegleitung',
  'Luftreinhaltung, Staub, emissionsarme Maschinen',
  'Baulärm, Erschütterungen, Betriebszeiten und Nachbarschaft',
  'Natur-, Biotop-, Wald-, Gewässerraum- und Neophytenauflagen',
  'Baustoffrecycling, Transporte, Materiallager und Werkhof',
  'Zuständigkeiten, Gesuche, kantonale und kommunale Fristen, Havariealarmierung',
];

export function CantonView() {
  const { s, update } = useStore();
  const site = s.settings.site;
  const c = cantonOf(site?.canton);
  const setSite = (p: Partial<SiteSettings>) => update((x) => ({ ...x, settings: { ...x.settings, site: { ...x.settings.site, ...p } } }));
  const rows = projectCheck(c?.code, CHECK_THEMES, site?.municipality);
  const all = cantonSources(c?.code);
  return (
    <div className="page">
      <header className="page-head"><span className="eyebrow">Nachschlagen</span><h1>Kanton &amp; Standort.</h1><p className="lead">Quellenkarte und Projektcheck für eine Baustelle – Schweizer Grundlagen und kantonale Quellen getrennt.</p></header>
      <p className="trust"><span><strong>Quellenhinweise, keine geprüften Vorschriften.</strong> Das Register verlinkt amtliche Websites und Dokumente von 21 Kantonen (Link-Recherche 14.11.2026). Daraus abgeleitete Pflichten sind nicht fachlich geprüft. Massgebend sind die aktuelle Fassung, die Bewilligung mit ihren Auflagen und die Auskunft der zuständigen Stellen.</span></p>
      <Section title="Standort">
        <SiteSwitcher manage compact />
        <div className="canton-pick">
          <label className="field"><span>Kanton</span>
            <select id="canton-pick" value={site?.canton ?? ''} onChange={(e) => setSite({ canton: e.target.value || undefined, lang: undefined, municipality: undefined })}>
              <option value="">– kein Kanton –</option>
              {CANTONS.map((k) => <option key={k.code} value={k.code}>{k.code} – {k.name}</option>)}
            </select>
          </label>
          {c && c.langs.length > 1 && (
            <label className="field"><span>Sprache der Unterlagen</span>
              <select id="canton-lang" value={site?.lang ?? ''} onChange={(e) => setSite({ lang: (e.target.value || undefined) as SiteSettings['lang'] })}>
                <option value="">– nicht festgelegt –</option>
                {c.langs.map((l) => <option key={l} value={l}>{LANG_LABEL[l]}</option>)}
              </select>
            </label>
          )}
          {c && (
            <label className="field"><span>Standortgemeinde (optional)</span>
              <input id="canton-muni" type="text" maxLength={60} value={site?.municipality ?? ''} placeholder="Gemeindename" onChange={(e) => setSite({ municipality: e.target.value || undefined })} />
            </label>
          )}
        </div>
      </Section>
      {c && (
        <Section title={`Quellenkarte ${c.code} – ${c.name}`}>
          <dl className="src-meta">
            <dt>Amtssprachen</dt><dd>{c.langs.map((l) => LANG_LABEL[l]).join(', ')}{c.langs.length > 1 ? ' – mehrsprachiger Kanton: Originaltexte in der Sprache des Standorts prüfen; massgebend ist die amtlich veröffentlichte Fassung (z. B. französisch, italienisch oder rätoromanisch), deutsche Fassungen oder Übersetzungen können abweichen' : ''}{site?.lang ? ` · gewählt: ${LANG_LABEL[site.lang]}` : ''}</dd>
            <dt>Fachstelle</dt><dd>{c.office}</dd>
            <dt>Hinweis</dt><dd>{c.hint}</dd>
            <dt>Quellen im Register</dt><dd id="canton-count">{all.length}</dd>
          </dl>
          <ul className="srclist">{all.map((x) => <CantonSourceItem key={x.id} x={x} />)}</ul>
        </Section>
      )}
      <Section title={c ? `Projektcheck ${c.code}${site?.municipality ? ' / ' + site.municipality : ''}` : 'Projektcheck'}>
        {!c && <p className="hint">Ohne Kanton zeigt der Projektcheck nur die Schweizer Grundlagen.</p>}
        <div className="lc-rows projectcheck">
          {rows.map((r) => (
            <div key={r.theme} className="lc-row">
              <h3>{r.label} {c && <CheckBadge status={r.status} />}</h3>
              <p className="lc-sub">Schweizer Grundlagen</p>
              <FederalItems row={r} />
              {c && <>
                <p className="lc-sub">Kanton {c.code}</p>
                <p className={'lc-msg st-' + r.status}>{r.message}</p>
                {r.cantonal.length > 0 && <ul className="plain">{r.cantonal.map((x) => <li key={x.id}><a href={x.url} target="_blank" rel="noopener noreferrer">{x.title} ↗</a> <CheckBadge status={x.status} /></li>)}</ul>}
                {r.entry.length > 0 && <ul className="plain">{r.entry.map((x) => <li key={x.id}>Einstieg: <a href={x.url} target="_blank" rel="noopener noreferrer">{x.title} ↗</a></li>)}</ul>}
              </>}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Abklärungsraster je Standort">
        <p className="hint">Vor Offerte, AVOR und Ausführung klären: Kanton, Gemeinde, Gewässerschutzbereich, Bauart, Projektphase, Bewilligungsauflagen, aktuelle Merkblätter.</p>
        <ul className="plain checklist">{RASTER.map((t) => <li key={t}>☐ {t}</li>)}</ul>
        <p className="hint">Quellenreihenfolge zur Orientierung: Bundeserlasse (Fedlex) – kantonale Erlasse – kommunale Erlasse und rechtskräftige Auflagen – Normen (nach ihrem rechtlichen Stellenwert) – amtliche Vollzugshilfen – interne Standards. Im konkreten Konfliktfall entscheiden Behörde bzw. juristische Klärung; die App behauptet keine Rangfolge. Quellen mit veralteten Begriffen (z. B. SIA 431 von 1997, TVA) als historischen Stand behandeln.</p>
      </Section>
    </div>
  );
}
