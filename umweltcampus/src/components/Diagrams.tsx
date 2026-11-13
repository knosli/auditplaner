import { useState } from 'react';
import { AbsetzRechner } from './Calculator';

// Interaktive Schemata. Daten stehen bewusst hier beim Schema, weil sie an
// die Darstellung gebunden sind; Texte sind kurz und verweisen auf Lektionen.

export function Diagram({ id }: { id: string }) {
  switch (id) {
    case 'wasserwege': return <Wasserwege />;
    case 'ph-skala': return <PhSkala />;
    case 'behandlungskette': return <Kette steps={KETTE} />;
    case 'sofortmassnahmen': return <Kette steps={SOFORT} variant="alarm" />;
    case 'verbindlichkeit': return <Verbindlichkeit />;
    case 'kontrollkreis': return <Kontrollkreis />;
    case 'absetzrechner': return <AbsetzRechner />;
    case 'sia-stufen': return <SiaStufen />;
    default: return <p className="hint">Schema «{id}» nicht gefunden.</p>;
  }
}

type Route = 'schmutz' | 'meteor' | 'versick' | 'entsorg' | 'werk';
const ROUTES: Record<Route, string> = {
  schmutz: 'Schmutzwasserkanal → ARA',
  meteor: 'Meteorschacht → Gewässer',
  versick: 'Versickerung → Grundwasser',
  entsorg: 'Entsorgung (Saugwagen, nach Abfallklassierung)',
  werk: 'Rückgabe ans Betonwerk',
};
const WASSER: { id: string; label: string; vor: string; ok: Route[]; bedingt: Route[]; nie: Route[]; note: string }[] = [
  { id: 'beton', label: 'Betonwaschwasser', vor: 'Absetzen, Neutralisieren (CO₂), pH messen', ok: ['werk'], bedingt: ['schmutz', 'entsorg'], nie: ['meteor', 'versick'], note: 'Schmutzwasserkanal nur behandelt und mit Zustimmung/Bewilligung. Am besten: Entstehung vermeiden, Trommel im Werk reinigen.' },
  { id: 'trueb', label: 'Trübes Baugrubenwasser', vor: 'Absetzen (genug wirksame Fläche; Container parallel bzw. in Serie gegen Kurzschluss)', ok: [], bedingt: ['meteor', 'schmutz', 'versick'], nie: [], note: 'Jede Ableitung nur gemäss Bewilligung und erst nach Absetzen («klar»). Versickerung nur mit Bewilligung.' },
  { id: 'oel', label: 'Ölhaltiges Wasser', vor: 'Rückhalten, ggf. Ölabscheider', ok: ['entsorg'], bedingt: ['schmutz'], nie: ['meteor', 'versick'], note: 'Kleine Mengen mit Bindemittel aufnehmen und als Sonderabfall entsorgen. Über Abscheider nur, wenn bewilligt.' },
  { id: 'haeusl', label: 'WC- und Waschwasser', vor: 'keine', ok: ['schmutz'], bedingt: ['entsorg'], nie: ['meteor', 'versick'], note: 'Anschluss an Schmutzwasserkanal oder Fäkalientank mit Entsorgung.' },
  { id: 'regen', label: 'Sauberes Regenwasser', vor: 'Von verschmutzten Flächen fernhalten', ok: ['versick', 'meteor'], bedingt: [], nie: [], note: 'Nach Vorgaben der Gemeinde. Darf nicht über Waschplatz, Lager oder Baugrube fliessen – sonst wird es Baustellenabwasser.' },
  { id: 'gw', label: 'Gepumptes Grundwasser', vor: 'Qualität prüfen (Trübung, pH bei Frischbeton)', ok: [], bedingt: ['versick', 'meteor', 'schmutz'], nie: [], note: 'Wasserhaltung und Ableitung sind bewilligungspflichtig; die Bewilligung bestimmt Weg und Qualität.' },
];

function Wasserwege() {
  const [sel, setSel] = useState('beton');
  const w = WASSER.find((x) => x.id === sel)!;
  const state = (r: Route) => (w.ok.includes(r) ? 'ok' : w.bedingt.includes(r) ? 'bedingt' : w.nie.includes(r) ? 'nie' : 'na');
  const lab = { ok: 'in der Regel zulässig', bedingt: 'nur mit Bewilligung / Bedingungen', nie: 'unzulässig', na: 'nicht üblich' } as const;
  return (
    <div className="diagram wasserwege">
      <div className="chips" role="tablist" aria-label="Abwasserart wählen">
        {WASSER.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={sel === x.id} className={'chip' + (sel === x.id ? ' on' : '')} onClick={() => setSel(x.id)}>{x.label}</button>
        ))}
      </div>
      <div className="ww-grid">
        <div className="ww-src">
          <span className="eyebrow">Anfall</span>
          <strong>{w.label}</strong>
          <span className="eyebrow">Vorbehandlung</span>
          <span>{w.vor}</span>
        </div>
        <ul className="ww-routes">
          {(Object.keys(ROUTES) as Route[]).map((r) => {
            const st = state(r);
            return (
              <li key={r} className={'route st-' + st}>
                <span className="route-line" aria-hidden="true" />
                <span className="route-name">{ROUTES[r]}</span>
                <span className="route-state">{lab[st]}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="ww-note">{w.note}</p>
    </div>
  );
}

function PhSkala() {
  const marks = [
    { from: 6.5, to: 9, label: 'häufig genannter Zielbereich für Ableitung (gemäss Bewilligung prüfen)', cls: 'ok' },
    { from: 7.5, to: 8.5, label: 'typisch für viele Fliessgewässer', cls: 'nat' },
    { from: 11, to: 13, label: 'Betonwaschwasser, Spritzbeton', cls: 'crit' },
  ];
  return (
    <div className="diagram ph">
      <div className="ph-scale" aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => <span key={i} className="ph-cell" style={{ background: `var(--ph-${i})` }}>{i}</span>)}
      </div>
      <ul className="ph-marks">
        {marks.map((m) => (
          <li key={m.label} className={'ph-mark ' + m.cls}>
            <span className="ph-range" style={{ marginLeft: `${(m.from / 14) * 100}%`, width: `${((m.to - m.from) / 14) * 100}%` }} />
            <span className="ph-text"><span className="mono">pH {String(m.from).replace('.', '.')}–{m.to}</span> {m.label}</span>
          </li>
        ))}
      </ul>
      <p className="hint">sauer ← 7 neutral → alkalisch. Ein Schritt = Faktor 10: pH 12 ist 10 000-mal alkalischer als pH 8.</p>
    </div>
  );
}

const KETTE = [
  { t: 'Vermeiden', d: 'Trommel im Werk, Restbeton zurück, fester Waschplatz', who: 'AVOR / Bauführung' },
  { t: 'Absetzen', d: 'Feststoffe zurückhalten, Schlamm regelmässig entfernen', who: 'Polier' },
  { t: 'Neutralisieren', d: 'bevorzugt CO₂', who: 'Polier / Anlagenbetreiber' },
  { t: 'Kontrollieren', d: 'pH messen, kalibriertes Gerät, Protokoll', who: 'Polier' },
  { t: 'Ableiten', d: 'nur gemäss Zustimmung/Bewilligung', who: 'Bauführung' },
];
const SOFORT = [
  { t: 'Sicherheit', d: 'Zündquellen, Dämpfe, Maschinen', who: 'alle' },
  { t: 'Stoppen + eindämmen', d: 'Maschine aus, Leck dicht, Schacht abdecken, Bindemittel', who: 'vor Ort – gleichzeitig mit:' },
  { t: 'Alarmieren', d: 'sofort 118 / 117 bei Gefahr für Gewässer oder Kanalisation · intern nach Alarmplan', who: 'zweite Person, sonst sofort selbst' },
  { t: 'Aufnehmen', d: 'nach Abfallklassierung entsorgen (meist Sonderabfall)', who: 'Polier / Entsorger' },
  { t: 'Dokumentieren', d: 'Zeiten, Mengen, Fotos, Meldungen', who: 'Bauführung' },
];

function Kette({ steps, variant }: { steps: { t: string; d: string; who: string }[]; variant?: 'alarm' }) {
  return (
    <ol className={'diagram kette' + (variant ? ' ' + variant : '')}>
      {steps.map((s, i) => (
        <li key={s.t}>
          <span className="k-no mono">{i + 1}</span>
          <strong>{s.t}</strong>
          <span>{s.d}</span>
          <span className="k-who">{s.who}</span>
        </li>
      ))}
    </ol>
  );
}

const STUFEN = [
  { k: 'gesetz', t: 'Gesetz / Verordnung', d: 'Gilt für alle, ohne Vereinbarung.', b: 'GSchG, GSchV, USG' },
  { k: 'auflage', t: 'Behördliche Auflage', d: 'Gilt für dieses Projekt, sobald rechtskräftig.', b: 'Auflagen der Baubewilligung, Einleitbewilligung' },
  { k: 'norm', t: 'Technische Norm', d: 'Verbindlich durch Vertrag oder Behörde; sonst anerkannte Regel der Technik.', b: 'SIA 431' },
  { k: 'vollzugshilfe', t: 'Vollzugshilfe / Empfehlung', d: 'Massstab der Behörde. Abweichen nur mit gleichwertiger Lösung.', b: 'Kantonales Merkblatt, BAFU-Vollzugshilfe' },
  { k: 'praxis', t: 'Bewährte Praxis', d: 'Erfahrungswissen, nicht verbindlich.', b: 'Schachtabdeckung im Arbeitsbereich' },
  { k: 'intern', t: 'Interner Standard', d: 'Verbindlich im Unternehmen (Weisung).', b: 'Waschplatz-Standard der Firma' },
];

function Verbindlichkeit() {
  const [open, setOpen] = useState<string | null>('gesetz');
  return (
    <ul className="diagram stufen">
      {STUFEN.map((s, i) => (
        <li key={s.k} className={'kind-' + s.k + (open === s.k ? ' open' : '')} style={{ marginLeft: `${i * 4}%` }}>
          <button type="button" onClick={() => setOpen(open === s.k ? null : s.k)} aria-expanded={open === s.k}>
            <span className="mono">{i + 1}</span> {s.t}
          </button>
          {open === s.k && <div className="stufe-detail"><p>{s.d}</p><p className="muted">Beispiel: {s.b}</p></div>}
        </li>
      ))}
    </ul>
  );
}

function Kontrollkreis() {
  const items = [
    { t: 'Planen', d: 'Konzept, Bewilligungen, Installationsplan', r: 'Projektleitung, Planer – Sie beraten' },
    { t: 'Umsetzen', d: 'Anlagen, Instruktion, Betrieb', r: 'Bauführung, Polier' },
    { t: 'Kontrollieren', d: 'Eigenkontrolle, Begehung, Messungen', r: 'Polier täglich – Sie stichprobenweise' },
    { t: 'Verbessern', d: 'Abweichungen, Ursachen, Standards', r: 'Sie koordinieren, Linie entscheidet' },
  ];
  return (
    <div className="diagram kreis">
      {items.map((x, i) => (
        <div key={x.t} className="kreis-item">
          <span className="k-no mono">{i + 1}</span>
          <strong>{x.t}</strong>
          <span>{x.d}</span>
          <span className="k-who">{x.r}</span>
        </div>
      ))}
    </div>
  );
}

function SiaStufen() {
  const [proc, setProc] = useState(false);
  const [gut, setGut] = useState(false);
  const [calc, setCalc] = useState(false);
  const stufe = !proc && !gut ? 1 : calc ? 3 : 2;
  const box = [
    { n: 1, t: 'Stufe 1 – Grundmassnahmen', d: 'Herkömmliche Baustelle. Interkantonales Merkblatt; vermeiden – trennen – behandeln – kontrolliert ableiten.', who: 'Planer / Bauführung' },
    { n: 2, t: 'Stufe 2 – Risikobeurteilung', d: 'Gewässerkritischer Prozess oder empfindliches Schutzgut. Vertiefte Beurteilung, zusätzliche Massnahmen; Grundmassnahmen gelten weiter.', who: 'in der Regel Planer' },
    { n: 3, t: 'Stufe 3 – Berechnung', d: 'Verträglichkeit muss rechnerisch nachgewiesen werden (u. a. Verdünnungsrechnung). Behandlung, Überwachung, Einleitbedingungen daraus.', who: 'Fachspezialist' },
  ];
  return (
    <div className="diagram sia">
      <fieldset className="checklist">
        <legend>Triage – Lernhilfe, ersetzt die Normkriterien nicht</legend>
        <label><input type="checkbox" checked={proc} onChange={() => setProc(!proc)} /> Gewässerkritischer Bauprozess (z. B. Oberflächenabtrag, Sprengungen, Bauen auf belastetem Standort)</label>
        <label><input type="checkbox" checked={gut} onChange={() => setGut(!gut)} /> Empfindliches Schutzgut betroffen (z. B. kleines Fischgewässer als Vorfluter, Grundwasser, Schutzzone)</label>
        <label><input type="checkbox" checked={calc} disabled={!proc && !gut} onChange={() => setCalc(!calc)} /> Einleitung, deren Verträglichkeit sich nicht ohne Berechnung beurteilen lässt</label>
      </fieldset>
      <div className="kreis">
        {box.map((b) => (
          <div key={b.n} className={'kreis-item' + (b.n === stufe ? ' sia-on' : '')}>
            <span className="k-no mono">{b.n}</span>
            <strong>{b.t}</strong>
            <span>{b.d}</span>
            <span className="k-who">{b.who}</span>
          </div>
        ))}
      </div>
      <p className="hint">Tendenz: Stufe {stufe}. Die verbindliche Einstufung erfolgt nach den Kriterien der SIA 431:2022 durch Planer bzw. Fachspezialist; im Zweifel höher einstufen lassen.</p>
    </div>
  );
}
