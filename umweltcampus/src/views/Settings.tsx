import { useStore } from '../store';
import { Section } from '../components/ui';
import { DataPanel } from './Progress';
import { inArtifact } from '../lib/platform';
import type { Settings, SiteSettings } from '../lib/state';
import { CANTONS, cantonOf, LANG_LABEL } from '../content/cantons';

export function SettingsView() {
  const { s, update, ai, aiChecked, sync } = useStore();
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => update((x) => ({ ...x, settings: { ...x.settings, [k]: v } }));
  const setSite = (p: Partial<SiteSettings>) => update((x) => ({ ...x, settings: { ...x.settings, site: { ...x.settings.site, ...p } } }));
  return (
    <div className="page">
      <header className="page-head"><span className="eyebrow">Persönlich</span><h1>Einstellungen.</h1><p className="lead">Darstellung, Lernhilfen, KI-Coach, Speicherung und Datensicherung.</p></header>
      <Section title="Darstellung">
        <div className="seg" role="radiogroup" aria-label="Farbschema">
          {(['system', 'hell', 'dunkel'] as const).map((t) => (
            <label key={t} className={s.settings.theme === t ? 'on' : ''}><input type="radio" name="theme" checked={s.settings.theme === t} onChange={() => set('theme', t)} />{{ system: 'wie System', hell: 'Hell', dunkel: 'Dunkel' }[t]}</label>
          ))}
        </div>
      </Section>
      <Section title="Baustellenstandort">
        <p className="hint">Für den Bereich «Vor Ort prüfen» in den Modulen und den Projektcheck. Gespeichert werden nur Kanton, Sprache und Gemeindename – keine Adresse. Die Lerninhalte bleiben beim Wechsel unverändert.</p>
        <label className="field"><span>Kanton der Baustelle</span>
          <select id="site-canton" value={s.settings.site?.canton ?? ''} onChange={(e) => setSite({ canton: e.target.value || undefined, lang: undefined, municipality: undefined })}>
            <option value="">– kein Kanton (nur Schweizer Grundlagen) –</option>
            {CANTONS.map((c) => <option key={c.code} value={c.code}>{c.code} – {c.name}</option>)}
          </select>
        </label>
        {(cantonOf(s.settings.site?.canton)?.langs.length ?? 0) > 1 && (
          <label className="field"><span>Sprache der Unterlagen (mehrsprachiger Kanton)</span>
            <select id="site-lang" value={s.settings.site?.lang ?? ''} onChange={(e) => setSite({ lang: (e.target.value || undefined) as SiteSettings['lang'] })}>
              <option value="">– nicht festgelegt –</option>
              {cantonOf(s.settings.site?.canton)!.langs.map((l) => <option key={l} value={l}>{LANG_LABEL[l]}</option>)}
            </select>
          </label>
        )}
        {s.settings.site?.canton && (
          <label className="field"><span>Standortgemeinde (optional)</span>
            <input id="site-muni" type="text" maxLength={60} value={s.settings.site?.municipality ?? ''} placeholder="z. B. Gemeindename" onChange={(e) => setSite({ municipality: e.target.value || undefined })} />
          </label>
        )}
        <p><a href="#kanton">Quellenkarte und Projektcheck öffnen →</a></p>
      </Section>
      <Section title="Lernen">
        <label className="switch"><input type="checkbox" checked={s.settings.askConfidence} onChange={(e) => set('askConfidence', e.target.checked)} /> Nach jeder Antwort fragen, wie sicher ich bin (empfohlen – steuert Wiederholungen und Lückenanalyse)</label>
      </Section>
      <Section title="KI-Lerncoach">
        <p>Status: {!aiChecked ? 'wird geprüft …' : ai ? 'verfügbar (Claude über Ihr Claude-Konto)' : s.settings.aiEnabled ? 'nicht verfügbar in dieser Umgebung – der Coach arbeitet regelbasiert ohne KI' : 'ausgeschaltet'}</p>
        <label className="switch"><input type="checkbox" checked={s.settings.aiEnabled} onChange={(e) => set('aiEnabled', e.target.checked)} /> KI-Funktionen verwenden, wenn verfügbar</label>
        <p className="hint">Mit KI werden Ihre Coach-Nachrichten und freien Antworten (bei «KI-Feedback») an Claude gesendet. Geben Sie keine vertraulichen Projektdaten, Namen oder Pläne ein. Ohne KI bleibt alles in der App.</p>
        <label className="field"><span>Standardmodus</span>
          <select id="coach-mode-default" value={s.settings.coachMode} onChange={(e) => set('coachMode', e.target.value as Settings['coachMode'])}>
            <option value="erklaeren">Erklären – direkte Antworten mit Quellen</option>
            <option value="trainieren">Trainieren – Hinweise und Rückfragen</option>
            <option value="pruefen">Prüfen – keine Hilfe bis zum Abschluss</option>
          </select>
        </label>
      </Section>
      <Section title="Speicherung und Datenschutz">
        <p>Speicherort: {sync === 'konto' ? 'Ihr Claude-Konto (privat) und dieser Browser' : sync === 'kein_speicher' ? 'keiner – der Browser blockiert die Speicherung. Bitte Lernstand regelmässig exportieren.' : sync === 'fehler' ? 'dieser Browser (Konto-Speicherung fehlgeschlagen)' : 'dieser Browser'}.</p>
        <ul className="plain">
          <li>Die App erhebt keine Personendaten. Es gibt kein Tracking.</li>
          <li>Freitexte (Notizen, Reflexionen, Antworten) bleiben in Ihrem Lernstand. Reale Baustellendaten bitte nur neutral bezeichnet erfassen.</li>
          {inArtifact() && <li>Im Konto liegt der Lernstand in einem privaten Bereich, den auch die Herausgeberin der App nicht lesen kann.</li>}
        </ul>
      </Section>
      <DataPanel />
      <Section title="Über diese App">
        <p>UmweltCampus Bau CH · Academy, Version 0.21 (Bewertungsfassung 7). Verfügbar: alle 12 Module. Modul 1–4 und 8 wurden nach einer ersten externen KI-Fachprüfung (13.11.2026) korrigiert. Am 14.11.2026 wurden alle 12 Module in einer externen KI-Gesamtprüfung erneut geprüft; die Korrekturen werden schrittweise umgesetzt (umgesetzt: kritische Bewertungsfehler, ein automatisierter Abgleich der wichtigsten Rechtsangaben mit Fedlex und den BAFU-Originalen vom 14.11.2026 sowie die übrigen Befunde in Bewertungsfassung 7). Neu: kantonales Quellenregister für 21 Kantone («Kanton & Standort») – Quellenhinweise, keine geprüften kantonalen Pflichten. Keines ist durch eine menschliche Fachperson freigegeben. Prüfstatus Entwurf – keine fachliche oder betriebliche Freigabe. Die Kompetenzstufen der App sind interne Lernstände und keine staatlich oder offiziell anerkannten Qualifikationen.</p>
        <p className="hint">Vorbereitet für eine spätere Unternehmensversion (in Entwicklung): Benutzerrollen, Lernpfade für Poliere, Bauführer, Projektleiter und Umweltkontaktpersonen, Pflichtschulungen, Lernnachweise, firmeninterne Standards, Auswertungen pro Niederlassung, Inhaltsverwaltung durch Fachverantwortliche.</p>
      </Section>
    </div>
  );
}
