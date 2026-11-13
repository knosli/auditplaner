import { useStore } from '../store';
import { Section } from '../components/ui';
import { DataPanel } from './Progress';
import { inArtifact } from '../lib/platform';
import type { Settings } from '../lib/state';

export function SettingsView() {
  const { s, update, ai, aiChecked, sync } = useStore();
  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => update((x) => ({ ...x, settings: { ...x.settings, [k]: v } }));
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
        <p>UmweltCampus Bau CH · Academy, Version 0.13 (Bewertungsfassung 5). Verfügbar: Modul 1 «Umweltgrundlagen und Schweizer Umweltrecht», Modul 2 «Gewässerschutz auf Baustellen», Modul 3 «Bauabfälle, Rückbau und Kreislaufwirtschaft» und Modul 4 «Bodenschutz und Aushub» – nach einer externen KI-Fachprüfung (13.11.2026) korrigiert – sowie Modul 8 «Umwelt in Bauplanung und AVOR», ebenfalls nach externer KI-Fachprüfung (13.11.2026) korrigiert, sowie Modul 7 «Wassergefährdende und umweltgefährliche Stoffe», Modul 9 «Umweltbaubegleitung und Baustellenkontrollen» und Modul 10 «ISO 14001 und Umweltmanagement» (alle drei noch nicht extern geprüft). Keines ist durch eine menschliche Fachperson freigegeben. Prüfstatus Entwurf – keine fachliche oder betriebliche Freigabe. Die Kompetenzstufen der App sind interne Lernstände und keine staatlich oder offiziell anerkannten Qualifikationen.</p>
        <p className="hint">Vorbereitet für eine spätere Unternehmensversion (in Entwicklung): Benutzerrollen, Lernpfade für Poliere, Bauführer, Projektleiter und Umweltkontaktpersonen, Pflichtschulungen, Lernnachweise, firmeninterne Standards, Auswertungen pro Niederlassung, Inhaltsverwaltung durch Fachverantwortliche.</p>
      </Section>
    </div>
  );
}
