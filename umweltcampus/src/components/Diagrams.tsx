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
    case 'emission': return <Kette steps={EMISSION} />;
    case 'bewilligungsweg': return <Kette steps={BEWILLIGUNG} />;
    case 'verordnungen': return <Verordnungen />;
    case 'deponietypen': return <Kette steps={DEPONIEN} />;
    case 'bodenschichten': return <Kette steps={BODEN} />;
    case 'auflagenkette': return <Kette steps={AUFLAGEN} />;
    case 'ubb-rollen': return <Kette steps={UBB_ROLLEN} />;
    case 'iso-regelkreis': return <Kette steps={ISO_REGELKREIS} />;
    case 'stoffpruefung': return <Kette steps={STOFFPRUEFUNG} />;
    case 'feststellungsweg': return <Kette steps={FESTSTELLUNG} />;
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

const DEPONIEN = [
  { t: 'Typ A', d: 'Unverschmutztes Aushub- und Ausbruchmaterial', who: 'nur wenn Verwertung nicht möglich' },
  { t: 'Typ B', d: 'Inertstoffe, z. B. mineralische Bauabfälle mit eingehaltenen Grenz- und Eluatwerten', who: 'früher «Inertstoffdeponie»' },
  { t: 'Typ C', d: 'Bestimmte anorganische, schwer lösliche Abfälle', who: 'Zuordnung nach Anhang 5 VVEA' },
  { t: 'Typ D', d: 'Verbrennungsrückstände (z. B. KVA-Schlacke)', who: 'Zuordnung nach Anhang 5 VVEA' },
  { t: 'Typ E', d: 'Stärker belastete Abfälle, z. B. verschmutzter Aushub über den Typ-B-Werten', who: 'teuerster Weg – vorher Behandlung prüfen' },
];
const BODEN = [
  { t: 'Oberboden (A-Horizont)', d: 'Humusreich, dunkel, stark belebt, meist 20–30 cm', who: 'separat abtragen und lagern' },
  { t: 'Unterboden (B-Horizont)', d: 'Heller, durchwurzelt, Struktur für Wasser und Luft', who: 'separat abtragen, nie mit Oberboden mischen' },
  { t: 'Untergrund (C-Horizont)', d: 'Verwittertes Ausgangsgestein unter dem Boden', who: 'in der Regel als Aushub behandelt (Modul 3)' },
];

const AUFLAGEN = [
  { t: 'Anforderung', d: 'Fundstelle in Bewilligung, Gesetz, Vertrag oder Norm', who: 'mit Rechtsnatur festhalten' },
  { t: 'Massnahme', d: 'Konkret und prüfbar: was, wo, wie', who: 'nicht «Gewässerschutz beachten»' },
  { t: 'Verantwortung', d: 'Funktion, nicht Name', who: 'z. B. Polier/in Rohbau' },
  { t: 'Termin / Phase', d: 'Inkl. Vorlaufzeiten (Bewilligung, Analyse, Meldung)', who: 'im Terminplan als Vorgänger' },
  { t: 'Kontrolle', d: 'Wer prüft wie oft?', who: 'Eigenkontrolle bleibt bei der Unternehmung' },
  { t: 'Nachweis', d: 'Protokoll, Foto, Liefer-, Wäge-, Begleitschein', who: 'so viel wie nötig, so wenig wie möglich' },
];

const STOFFPRUEFUNG = [
  { t: 'Etikett lesen', d: 'Produktname, Piktogramme, H-Sätze (H400er: Gewässer)', who: 'kein Etikett: sichern, nicht verwenden' },
  { t: 'SDB holen', d: 'Abschnitte 2, 6, 7, 8, 12, 13', who: 'beim Lieferanten bzw. Subunternehmer' },
  { t: 'Ersatz prüfen', d: 'Gibt es ein weniger gefährliches Produkt?', who: '«bio» bleibt wassergefährdend' },
  { t: 'Lager und Arbeitsplatz', d: 'Wanne, Dach, Trennung, weg von Schächten; Abfüllen über Rückhalt', who: 'kantonale Vorgaben' },
  { t: 'Notfall', d: 'Was tun, wenn es ausläuft? Material am Ort, Alarmierung', who: '118 / 117 bei Gefahr für Wasser oder Boden' },
  { t: 'Entsorgung', d: 'Reste, Gebinde, Lappen – meist Sonderabfall', who: 'berechtigter Entsorger, Begleitschein' },
];
const ISO_REGELKREIS = [
  { t: 'Kontext und Führung', d: 'Umfeld, interessierte Parteien, Anwendungsbereich; Politik, Rollen', who: 'oberste Leitung trägt die Rechenschaft' },
  { t: 'Planen', d: 'Umweltaspekte, bindende Verpflichtungen, Risiken und Chancen, Ziele', who: 'Worauf konzentrieren wir uns?' },
  { t: 'Umsetzen', d: 'Mittel, Kompetenz, Kommunikation; betriebliche Steuerung, Notfallvorsorge', who: 'Linie – in den normalen Arbeitsschritten' },
  { t: 'Prüfen', d: 'Überwachen und messen, Einhaltung bewerten, internes Audit, Managementbewertung', who: 'Wirkt es?' },
  { t: 'Verbessern', d: 'Korrekturmassnahmen, fortlaufende Verbesserung', who: 'zurück zur Planung' },
];
const UBB_ROLLEN = [
  { t: 'Behörde', d: 'Bewilligt, ordnet an, kontrolliert (Vollzug)', who: 'Kanton, Gemeinde' },
  { t: 'Bauherrschaft', d: 'Trägt die Auflagen; beauftragt Planer, Bauleitung, UBB', who: 'in der Regel Adressatin der Bewilligung' },
  { t: 'Umweltbaubegleitung (UBB)', d: 'Begleitet, kontrolliert, berichtet – gemäss Pflichtenheft', who: 'im Auftrag der Bauherrschaft, wenn verlangt' },
  { t: 'Bauleitung', d: 'Koordiniert, weist die Unternehmung an, nimmt ab', who: 'im Auftrag der Bauherrschaft' },
  { t: 'Unternehmung: Bauführung und Polier', d: 'Setzen um, kontrollieren sich selbst (Eigenkontrolle), führen Nachweise', who: 'Weisungsrecht in der Linie' },
  { t: 'Interne Umweltfachperson', d: 'Berät, instruiert, kontrolliert stichprobenweise, verfolgt nach', who: 'Sie – für die Unternehmung, ohne Weisungsrecht in der Linie' },
];
const FESTSTELLUNG = [
  { t: 'Beobachten', d: 'Was, wo, wann – mit Foto oder Messung', who: 'Beobachtung von Vermutung trennen' },
  { t: 'Einstufen', d: 'Kritisch, Abweichung oder Hinweis – mit Bezug zur Anforderung', who: 'im Zweifel höher einstufen' },
  { t: 'Sofortmassnahme', d: 'Bei kritisch: Quelle stoppen, Ausbreitung verhindern, alarmieren bzw. melden', who: 'sofort, Linie einschalten' },
  { t: 'Korrektur', d: 'Mangel beheben', who: 'verantwortliche Funktion, Termin' },
  { t: 'Ursache und Korrekturmassnahme', d: 'Mehrmals «Warum?» – Ursache beseitigen', who: 'bei kritischen und wiederholten Feststellungen' },
  { t: 'Nachkontrolle', d: 'Umgesetzt und wirksam?', who: 'erst dann abschliessen' },
  { t: 'Vorbeugung', d: 'Standard, AVOR, Instruktion für andere Baustellen', who: 'Lernen im Unternehmen' },
];

const EMISSION = [
  { t: 'Quelle', d: 'Emission: Bagger, Abbauhammer, Abbruch, Waschplatz', who: 'hier zuerst begrenzen (vorsorglich, immer)' },
  { t: 'Ausbreitung', d: 'Luft, Schall, Boden, Wasser – Abschirmung, Distanz, Wind', who: 'Abschirmung, Lage der Installation' },
  { t: 'Betroffene', d: 'Immission: Wohnung, Schule, Bach, Grundwasser', who: 'Schutz hier nur ergänzend' },
  { t: 'Beurteilung', d: 'Grenzwert oder Massnahmenstufe gemäss Richtlinie und Bewilligung', who: 'Behörde ordnet an' },
];
const BEWILLIGUNG = [
  { t: 'Projektierung', d: 'Umweltabklärungen, ggf. UVP, Konzepte (Entwässerung, Entsorgung, Boden)', who: 'Bauherrschaft, Planer' },
  { t: 'Gesuch und Bewilligung', d: 'Baubewilligung plus Nebenbewilligungen, koordiniert (Art. 25a RPG); Auflagen', who: 'Behörden' },
  { t: 'Ausschreibung und Vertrag', d: 'Auflagen ins Leistungsverzeichnis und den Werkvertrag', who: 'Bauherrschaft, Planer – Unternehmer offeriert' },
  { t: 'AVOR', d: 'Auflagenmatrix, Installationsplan, Termine, Zuständigkeiten', who: 'Unternehmer – hier wirken Sie am stärksten' },
  { t: 'Ausführung', d: 'Umsetzung, Eigenkontrolle, Behördenkontrollen, Meldungen', who: 'Unternehmer, Bauleitung, UBB' },
  { t: 'Abschluss', d: 'Nachweise, Wiederherstellung, Erfahrungen auswerten', who: 'alle' },
];

const BEREICHE = [
  { id: 'luft', label: 'Luft', erlass: 'USG, LRV (SR 814.318.142.1)', hilfe: 'BAFU-Richtlinie «Luftreinhaltung auf Baustellen» (Stufen A/B)', auflage: 'Massnahmenstufe B; Maschinen über 18 kW mit Nachweis', wer: 'Bauführung, Polier; Subunternehmer für eigene Maschinen' },
  { id: 'laerm', label: 'Lärm', erlass: 'USG, LSV Art. 6 (SR 814.41)', hilfe: 'Baulärm-Richtlinie BAFU (Stufen A/B/C, keine Grenzwerte)', auflage: 'Stufe B; lärmintensive Arbeiten nur in Zeitfenstern', wer: 'Bauführung, Polier' },
  { id: 'abfall', label: 'Abfall', erlass: 'USG, VVEA Art. 16/17 (SR 814.600)', hilfe: 'BAFU-Vollzugshilfe, kantonale Merkblätter zu Bauabfällen', auflage: 'Entsorgungskonzept; Trennung; Sonderabfälle separat', wer: 'Bauherrschaft (Konzept), Unternehmer (Umsetzung, Nachweise)' },
  { id: 'boden', label: 'Boden', erlass: 'USG, VBBo (SR 814.12)', hilfe: 'BAFU-/kantonale Vollzugshilfen Bodenschutz beim Bauen', auflage: 'Befahren nur bei geeigneter Bodenfeuchte; bodenkundliche Baubegleitung', wer: 'Bauherrschaft (BBB), Unternehmer' },
  { id: 'wasser', label: 'Wasser', erlass: 'GSchG (SR 814.20), GSchV', hilfe: 'SIA 431:2022, interkantonales Merkblatt (Stufe 1)', auflage: 'Entwässerungskonzept; pH 6.5–9.0; Meldung bei Ereignissen', wer: 'Bauherrschaft/Planer (Konzept), Unternehmer (Betrieb)' },
  { id: 'natur', label: 'Natur und Wald', erlass: 'NHG (SR 451), WaG (SR 921.0), BGF', hilfe: 'Kantonale Merkblätter (Ufer, Hecken, Brutzeit)', auflage: 'Schutzzaun; kein Eingriff in Ufervegetation; Rodung nur im bewilligten Perimeter', wer: 'Bauherrschaft (Bewilligungen), Unternehmer (Schutz vor Ort)' },
];

function Verordnungen() {
  const [sel, setSel] = useState('luft');
  const b = BEREICHE.find((x) => x.id === sel)!;
  return (
    <div className="diagram">
      <div className="chips" role="tablist">{BEREICHE.map((x) => <button key={x.id} type="button" role="tab" aria-selected={sel === x.id} className={'chip' + (sel === x.id ? ' on' : '')} onClick={() => setSel(x.id)}>{x.label}</button>)}</div>
      <dl className="src-meta vo">
        <dt>Gesetz / Verordnung</dt><dd>{b.erlass}</dd>
        <dt>Vollzugshilfe / Norm</dt><dd>{b.hilfe}</dd>
        <dt>Typische Auflage</dt><dd>{b.auflage}</dd>
        <dt>Wer setzt um</dt><dd>{b.wer}</dd>
      </dl>
    </div>
  );
}
