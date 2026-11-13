import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm1';

// ---------- Baustellenaufgaben ----------
export const M1_SITETASKS: SiteTask[] = [
  {
    id: 'm1-t1', moduleId: M, topic: 'm1-grundlagen', level: 2, setting: 'Hochbau',
    title: 'Einwirkungen erkennen und einordnen',
    situation: 'Ersatzneubau eines Mehrfamilienhauses in einem Wohnquartier (fiktiv). Abbruch des bestehenden Hauses, Aushub, Rohbau. Nachbarhäuser 8 m entfernt, Schulweg entlang der Baustelle.',
    data: ['Abbruch mit Bagger und Abbauhammer (4 Wochen)', 'Aushub 1 800 m³, Abtransport mit Lastwagen', 'Rohbau mit Kran und Betonpumpe (6 Monate)', 'Bewilligung: Baulärm Stufe B, Luft Stufe A'],
    assignment: 'Listen Sie je Bauphase die wichtigsten Einwirkungen auf (Emission an der Quelle → Immission bei wem), ordnen Sie jede einem Rechtsbereich zu und nennen Sie eine Massnahme an der Quelle.',
    rubric: [
      { id: 'k1', text: 'Lärm (Abbau, Maschinen) mit Massnahme an der Quelle (lärmarme Verfahren, Zeitfenster, Abschirmung) – LSV/Baulärm-Richtlinie', keywords: ['lärm', 'abbau', 'zeitfenster', 'lärmarm'] },
      { id: 'k2', text: 'Staub und Abgase (Abbruch, Pisten, Maschinen) mit Benetzung, Partikelfilter – LRV/Richtlinie Luft', keywords: ['staub', 'benetz', 'partikel', 'abgas'] },
      { id: 'k3', text: 'Erschütterungen bei Abbruch/Verdichtung und Schutz der Nachbarbauten', keywords: ['erschütter', 'nachbar', 'riss'] },
      { id: 'k4', text: 'Abfälle (Abbruch) und Abwasser (Rohbau) als weitere Einwirkungsbereiche', keywords: ['abfall', 'mulde', 'abwasser', 'waschplatz'] },
      { id: 'k5', text: 'Immissionsort korrekt benannt (Nachbarn, Schulweg) und Information der Anwohnenden', keywords: ['nachbar', 'schul', 'inform', 'anwohn'] },
    ],
    solution: `| Phase | Emission (Quelle) | Immission (wo, bei wem) | Rechtsbereich | Massnahme an der Quelle |
|---|---|---|---|---|
| Abbruch | Lärm Abbauhammer, Bagger | Wohnungen, Schulweg | LSV / Baulärm-Richtlinie Stufe B | Abbruchzange statt Hammer wo möglich, lärmintensive Arbeiten in Zeitfenstern, Abschirmung |
| Abbruch | Staub | Balkone, Fenster, Schulweg | LRV / Richtlinie Luft Stufe A | Benetzen, Abdeckung, Fahrwege reinigen |
| Abbruch | Erschütterungen | Nachbarhäuser | USG (Erschütterungen) | erschütterungsarme Verfahren, Zustandsaufnahme der Nachbarbauten vorab |
| Abbruch | Abfälle | – | VVEA | Schadstoffermittlung, Trennung, Entsorgungsnachweise |
| Aushub | Abgase, Staub, Verkehr | Quartierstrassen | LRV, Baulärm (Transporte) | Maschinen mit Partikelfilter, Radwaschanlage, Routen und Zeiten |
| Rohbau | Lärm Kran/Pumpe, Waschwasser | Nachbarn, Kanalisation/Gewässer | LSV, GSchG | lärmarme Geräte, Waschplatz mit Absetzen und Neutralisation |

Querschnitt: Anwohnende vor dem Abbruch informieren (Kontakt, Zeitplan), Sicherung des Schulwegs (Arbeitssicherheit). Merke: Die Massnahmen setzen an der Quelle an; Schutz beim Betroffenen ergänzt nur.`,
    sources: ['usg', 'lsv', 'bafu-baulaerm', 'lrv', 'bafu-luft', 'vvea'],
  },
  {
    id: 'm1-t2', moduleId: M, topic: 'm1-rechtsordnung', level: 2, setting: 'Tiefbau',
    title: 'Vorgaben einer Baustelle ordnen',
    situation: 'Werkleitungsbau in einer Gemeinde (fiktiv). Folgende Vorgaben liegen auf dem Tisch des Bauführers:',
    data: [
      'Art. 6 GSchG (Verunreinigungsverbot)',
      'Baubewilligung Ziff. 7: «Baulärm-Massnahmen gemäss Richtlinie, Stufe B»',
      'Kantonales Merkblatt «Gewässerschutz auf Baustellen»',
      'Werkvertrag: «SIA 431 ist Vertragsbestandteil»',
      'Firmenstandard: «Auf allen Baustellen Schachtabdeckungen im Arbeitsbereich»',
      'LRV Anhang 4 Ziff. 3 (Baumaschinen)',
    ],
    assignment: 'Ordnen Sie jede Vorgabe einer Verbindlichkeitsstufe zu (Gesetz/Verordnung, Auflage, Vollzugshilfe, Norm, interner Standard), begründen Sie kurz, warum sie für die Baustelle gilt, und nennen Sie, wo man sie nachschlägt.',
    rubric: [
      { id: 'k1', text: 'GSchG und LRV als Gesetz/Verordnung (Fedlex) eingeordnet', keywords: ['gesetz', 'verordnung', 'fedlex'] },
      { id: 'k2', text: 'Ziff. 7 als behördliche Auflage, die die Richtlinie für dieses Projekt verbindlich macht', keywords: ['auflage', 'bewilligung', 'verbindlich'] },
      { id: 'k3', text: 'Merkblatt als Vollzugshilfe (Massstab der Behörde)', keywords: ['vollzugshilfe', 'merkblatt', 'massstab'] },
      { id: 'k4', text: 'SIA 431 als Norm, hier vertraglich verbindlich', keywords: ['norm', 'vertrag', 'sia'] },
      { id: 'k5', text: 'Firmenstandard als interner Standard, verbindlich im Unternehmen', keywords: ['intern', 'standard', 'firma', 'unternehmen'] },
    ],
    solution: `- **Art. 6 GSchG** – Gesetz; gilt für alle, überall. Fedlex, SR 814.20.
- **LRV Anhang 4 Ziff. 3** – Verordnung; gilt für alle Baumaschinen über 18 kW. Fedlex, SR 814.318.142.1.
- **Baubewilligung Ziff. 7** – behördliche Auflage; macht die Baulärm-Richtlinie (Vollzugshilfe des BAFU) mit Stufe B für dieses Projekt verbindlich. Bewilligungsdossier.
- **Kantonales Merkblatt** – Vollzugshilfe; Massstab der Behörde, oft in der Bewilligung verbindlich erklärt; Abweichungen nur mit gleichwertigem Schutz. Website der kantonalen Fachstelle.
- **SIA 431** – technische Norm; hier durch den Werkvertrag ausdrücklich verbindlich (sonst als anerkannte Regel der Technik Massstab der Sorgfalt). SIA-Shop (kostenpflichtig).
- **Firmenstandard** – interner Standard; verbindlich im Unternehmen, auch wo das Gesetz es nicht ausdrücklich verlangt. Managementsystem.

Lernpunkt: Für die Baustelle sind alle sechs verbindlich – aus unterschiedlichen Gründen. Die Einordnung hilft, im Konflikt zu entscheiden und gegenüber Polieren glaubwürdig zu argumentieren.`,
    sources: ['gschg', 'lrv', 'bafu-baulaerm', 'sia431'],
  },
  {
    id: 'm1-t3', moduleId: M, topic: 'm1-verordnungen', level: 3, setting: 'Hochbau',
    title: 'Umweltanforderungen für die AVOR',
    situation: 'Umbau und Aufstockung eines Bürogebäudes aus dem Jahr 1968 in der Agglomeration (fiktiv), Bauzeit 14 Monate, angrenzend Wohnhäuser und ein Kindergarten.',
    data: ['Rückbau Innenausbau ca. 450 m³', 'Neue Liftschächte mit Kernbohrungen und Abbrucharbeiten', 'Baustellenzufahrt über Quartierstrasse', 'Bewilligung: Luft Stufe B, Baulärm Stufe B, Entsorgungskonzept verlangt'],
    assignment: 'Erstellen Sie die Umwelt-Checkliste für die AVOR: Luft, Lärm, Abfall, Boden, Wasser – je Anforderung, Massnahme, Verantwortlich, Nachweis.',
    rubric: [
      { id: 'k1', text: 'Abfall: Schadstoffermittlung vor Rückbau (Baujahr), Entsorgungskonzept, Trennung, Sonderabfälle getrennt', keywords: ['schadstoff', 'asbest', 'pcb', 'entsorgungskonzept', 'trenn'] },
      { id: 'k2', text: 'Luft Stufe B: Maschinen mit Nachweis, Staubschutz bei Rückbau und Kernbohrungen', keywords: ['partikel', 'nachweis', 'staub', 'stufe b'] },
      { id: 'k3', text: 'Lärm Stufe B: Zeitfenster, lärmarme Verfahren, Information Kindergarten/Anwohnende', keywords: ['zeitfenster', 'kindergarten', 'inform', 'lärmarm'] },
      { id: 'k4', text: 'Wasser: Bohr- und Schleifwasser fassen, Waschplatz, Schächte schützen', keywords: ['bohrwasser', 'schleif', 'waschplatz', 'schacht'] },
      { id: 'k5', text: 'Verantwortliche und Nachweise je Punkt', keywords: ['verantwort', 'nachweis', 'protokoll'] },
    ],
    solution: `| Bereich | Anforderung | Massnahme | Verantwortlich | Nachweis |
|---|---|---|---|---|
| Abfall | VVEA Art. 16/17, Baujahr 1968 | Schadstoffermittlung vor Rückbau (wahrscheinlich Asbest/PCB); Sanierung durch Fachfirma; Muldenkonzept mit Trennung; Sonderabfälle separat | Bauherrschaft (Ermittlung), Bauführung (Umsetzung) | Schadstoffbericht, Entsorgungskonzept, Entsorgungsnachweise, Begleitscheine |
| Luft | LRV, Richtlinie Luft Stufe B | Maschinenliste mit Nachweisen (auch Subunternehmer), Staubschutz und Absaugung bei Abbruch und Kernbohrungen, Fahrwege reinigen | Polier | Maschinenliste, Begehungsprotokolle |
| Lärm | Baulärm-Richtlinie Stufe B | lärmintensive Arbeiten in Zeitfenstern (Absprache Kindergarten), Seilsägen/Kernbohren statt Abbauhammer, Information mit Kontaktperson | Bauführung | Info-Schreiben, Arbeitszeitplan |
| Wasser | GSchG, SIA 431 Stufe 1 | Bohr- und Schleifwasser mit Saugern fassen, Absetzbehälter, Bodenabläufe abdecken, Waschplatz | Polier | pH-/Kontrollprotokoll |
| Boden | VBBo | kein Bodeneingriff, Zufahrt auf befestigter Fläche | – | – |

Wichtigster Punkt: Die Schadstoffermittlung bestimmt den ganzen Ablauf – ohne sie kein sicherer Rückbau (Arbeitssicherheit und Umwelt).`,
    sources: ['vvea', 'lrv', 'bafu-luft', 'bafu-baulaerm', 'sia431'],
  },
  {
    id: 'm1-t4', moduleId: M, topic: 'm1-natur', level: 3, setting: 'Tiefbau',
    title: 'Installationsplan auf Natur prüfen',
    situation: 'Ersatz einer Brücke über einen kleinen Fluss am Dorfrand (fiktiv). Der Entwurf des Installationsplans sieht vor:',
    data: [
      'Installationsplatz auf einer extensiv genutzten Wiese am Waldrand',
      'Materialdepot im Uferbereich unter Erlen',
      'Baupiste über eine Hecke hinweg zur Strasse',
      'Baubeginn 1. April, Bauzeit 8 Monate',
      'Bewilligung: Rodung von 200 m² Wald für die Brückenrampe, mit Ersatzaufforstung',
    ],
    assignment: 'Beurteilen Sie den Installationsplan aus Sicht Natur und Landschaft: Welche Konflikte sehen Sie, was ist zu klären, welche Alternativen schlagen Sie vor?',
    rubric: [
      { id: 'k1', text: 'Depot unter Erlen = Eingriff in Ufervegetation (Art. 21 NHG): verschieben', keywords: ['ufer', 'erlen', 'nhg', 'depot', 'verschieb'] },
      { id: 'k2', text: 'Hecke: Schutzstatus klären, Piste umlegen oder Bewilligung', keywords: ['hecke', 'schutz', 'piste'] },
      { id: 'k3', text: 'Wiese/Waldrand: Bodenschutz, Waldgrenze, Inventar prüfen', keywords: ['wiese', 'wald', 'boden', 'inventar'] },
      { id: 'k4', text: 'Zeitfenster: Brutzeit (Gehölze ab April), Schonzeit Fische', keywords: ['brut', 'schonzeit', 'april', 'fisch'] },
      { id: 'k5', text: 'Rodung nur im bewilligten Perimeter, Ersatz und Wiederherstellung einplanen', keywords: ['rodung', 'perimeter', 'ersatz', 'wiederherst'] },
    ],
    solution: `**Konflikte**
- **Materialdepot unter Erlen am Ufer**: Ufervegetation darf weder gerodet noch überschüttet noch geschädigt werden (Art. 21 NHG). → Depot ausserhalb des Uferbereichs.
- **Baupiste über die Hecke**: Hecken sind schützenswerte Lebensräume (Art. 18 NHG, oft kantonal/kommunal geschützt). → Piste umlegen; falls unvermeidbar, Bewilligung und Ersatz klären.
- **Installationsplatz auf extensiver Wiese am Waldrand**: Boden (Verdichtung) und möglicher Naturwert (Inventar Trockenwiesen prüfen), Waldabstand. → Geoportal prüfen; Bodenschutz mit Baupiste/Lastverteilung oder anderer Standort.
- **Rodung**: nur im bewilligten Perimeter (200 m²), vorab markieren; Ersatzaufforstung terminieren.

**Zeitfenster**: Baubeginn 1. April fällt in die Brutzeit – Gehölzschnitte vorher (Winter) bzw. Regeln des Kantons klären; Arbeiten im Gewässer nach fischereirechtlicher Bewilligung ausserhalb der Schonzeit.

**Vorgehen**: Konflikte der Bauherrschaft melden, Installationsplan anpassen lassen, Schutzzäune und Perimeter vor Ort markieren, Zustand vor Baubeginn fotografieren, Wiederherstellung terminieren.`,
    sources: ['nhg', 'wag', 'bgf', 'vbbo'],
  },
  {
    id: 'm1-t5', moduleId: M, topic: 'm1-verantwortung', level: 3, setting: 'Hochbau',
    title: 'Rollenmatrix für ein Projekt',
    situation: 'Neubau Pflegeheim (fiktiv): Bauherrschaft Stiftung, Architekt mit Bauleitung, Ihre Firma als Baumeister, Subunternehmer für Aushub und Spezialtiefbau.',
    data: ['Bewilligungsauflagen zu Entwässerung, Baulärm Stufe B, Entsorgungskonzept', 'Wasserhaltung mit kantonaler Bewilligung', 'Ihre Firma betreibt Waschplatz und Tankstelle'],
    assignment: 'Erstellen Sie eine Rollenmatrix (verantwortlich / mitwirkend / informiert) für sechs Umweltaufgaben und begründen Sie die heikelsten Zuordnungen.',
    rubric: [
      { id: 'k1', text: 'Bewilligungen und Konzepte bei Bauherrschaft/Planer', keywords: ['bauherr', 'planer', 'bewilligung', 'konzept'] },
      { id: 'k2', text: 'Betrieb eigener Anlagen (Waschplatz, Tank) bei der eigenen Firma als Inhaberin', keywords: ['inhaber', 'waschplatz', 'tank', 'betrieb'] },
      { id: 'k3', text: 'Subunternehmer für eigene Maschinen und Arbeiten verantwortlich, Einbindung durch Hauptunternehmer', keywords: ['sub', 'maschine', 'einbind', 'vertrag'] },
      { id: 'k4', text: 'Umweltfachperson berät/kontrolliert, Linie verantwortet Umsetzung', keywords: ['berät', 'kontroll', 'linie', 'umweltfachperson'] },
      { id: 'k5', text: 'Meldungen an Behörden mit klarer Zuständigkeit', keywords: ['meldung', 'behörde', 'zuständig'] },
    ],
    solution: `| Aufgabe | Bauherrschaft | Architekt/Bauleitung | Baumeister (Ihre Firma) | Subunternehmer | Umweltfachperson |
|---|---|---|---|---|---|
| Bewilligungen, Auflagen weitergeben | V | M | I | I | I |
| Entwässerungs- und Entsorgungskonzept | V (lässt erstellen) | M/V je Auftrag | M | I | M (Beratung) |
| Waschplatz, Tankstelle betreiben | I | I | V (Inhaberin) | – | M (Kontrolle) |
| Wasserhaltung inkl. Messungen | I | M | M | V (falls beauftragt) | M |
| Maschinen gemäss LRV | I | M (Kontrolle) | V für eigene, M für Sub | V für eigene | M |
| Meldung an Behörde bei Ereignis | I | M | V (Bauführer) | M | M |

**Heikle Punkte**: Die Wasserhaltung liegt beim Spezialtiefbauer, die Bewilligung aber bei der Bauherrschaft – Messungen und Meldungen müssen vertraglich klar zugeordnet sein. Für Waschplatz und Tank ist Ihre Firma Inhaberin (Sorgfalts- und Anlagenpflichten). Die Umweltfachperson berät und kontrolliert; die Linie (Bauführer, Polier) verantwortet die Umsetzung.`,
    sources: ['usg', 'gschg', 'praxis'],
  },
  {
    id: 'm1-t6', moduleId: M, topic: 'm1-vollzug', level: 3, setting: 'Tiefbau',
    title: 'Auflagenmatrix aus einer Plangenehmigung',
    situation: 'Auszug aus der Plangenehmigung für eine Kantonsstrasse mit Velostreifen (fiktiv):',
    data: [
      'A1: Für die Bauphase ist eine Umweltbaubegleitung (UBB) einzusetzen, die quartalsweise berichtet.',
      'A2: Bodenschutz gemäss Bodenschutzkonzept; Befahren nur bei geeigneter Bodenfeuchte, mit bodenkundlicher Baubegleitung.',
      'A3: Baulärm-Massnahmenstufe C im Bereich der Wohnsiedlung Ost.',
      'A4: Eingriffe in die Hecke H3 sind auf 30 m Länge beschränkt; Ersatzpflanzung im Folgejahr.',
      'A5: Ausbauasphalt ist auf PAK zu untersuchen und entsprechend zu verwerten bzw. zu entsorgen.',
    ],
    assignment: 'Erstellen Sie eine Auflagenmatrix (Auflage, Rechtsnatur, Massnahme, Verantwortlich, Termin, Nachweis) und markieren Sie Punkte, die vor Baubeginn zu erledigen sind.',
    rubric: [
      { id: 'k1', text: 'Alle Auflagen als verbindlich (behördliche Auflage) erkannt', keywords: ['auflage', 'verbindlich'] },
      { id: 'k2', text: 'Vor Baubeginn: UBB beauftragen, Bodenschutzkonzept, Hecken-Perimeter markieren, PAK-Untersuchung', keywords: ['vor baubeginn', 'ubb', 'markier', 'pak', 'untersuch'] },
      { id: 'k3', text: 'Verantwortliche sinnvoll zugeordnet (Bauherrschaft, Bauleitung, Unternehmer, UBB, BBB)', keywords: ['bauherr', 'ubb', 'bbb', 'bauleitung'] },
      { id: 'k4', text: 'Nachweise je Auflage benannt', keywords: ['nachweis', 'bericht', 'protokoll', 'analys'] },
      { id: 'k5', text: 'Termine/Phasen inkl. Folgejahr (Ersatzpflanzung) festgehalten', keywords: ['termin', 'folgejahr', 'phase', 'quartal'] },
    ],
    solution: `| Auflage | Rechtsnatur | Massnahme | Verantwortlich | Termin | Nachweis |
|---|---|---|---|---|---|
| A1 UBB | Behördliche Auflage | UBB beauftragen, Pflichtenheft, Berichtswesen | Bauherrschaft | **vor Baubeginn** | Auftrag, Quartalsberichte |
| A2 Bodenschutz | Behördliche Auflage | Bodenschutzkonzept umsetzen, BBB, Befahrbarkeit messen, Pisten | Bauherrschaft (BBB), Unternehmer (Umsetzung) | **vor Baubeginn** und laufend | Konzept, Messprotokolle |
| A3 Baulärm C | Behördliche Auflage (Richtlinie verbindlich) | Massnahmen Stufe C, Zeitfenster, Information Siedlung Ost | Unternehmer | ab Baubeginn | Massnahmenblatt, Info-Schreiben |
| A4 Hecke H3 | Behördliche Auflage (NHG) | Perimeter 30 m markieren, Schutzzaun, Schnitt ausserhalb Brutzeit, Ersatzpflanzung | Unternehmer, Bauleitung | **vor Baubeginn** markieren; Ersatz im Folgejahr | Fotos, Abnahme Ersatz |
| A5 PAK | Behördliche Auflage (VVEA) | Untersuchung, Triage nach Gehalt, Verwertung/Entsorgung | Bauherrschaft (Untersuchung), Unternehmer (Entsorgung) | **vor Ausbau** | Analysenbericht, Entsorgungsnachweise |

Die Matrix wird in der Bausitzung wöchentlich nachgeführt und ist das zentrale Dokument für UBB und Behörde.`,
    sources: ['usg', 'nhg', 'vvea', 'bafu-baulaerm', 'vbbo'],
  },
];

// ---------- Praxisaufträge ----------
export const M1_TASKS: PracticeTask[] = [
  { id: 'm1-p1', moduleId: M, topic: 'm1-grundlagen', title: 'Einwirkungen einer realen Baustelle erfassen',
    goal: 'Auf einer laufenden Baustelle Emissionen, Immissionen und Massnahmen an der Quelle systematisch erfassen.',
    steps: ['Wählen Sie eine laufende Baustelle.', 'Erfassen Sie bei einer Begehung die wichtigsten Emissionen (Lärm, Staub, Abgase, Erschütterungen, Abwasser, Abfall).', 'Bestimmen Sie die Immissionsorte (wer ist betroffen?).', 'Prüfen Sie, welche Massnahmen an der Quelle umgesetzt sind und welche fehlen.', 'Besprechen Sie das Ergebnis mit dem Polier.'],
    deliverable: 'Tabelle Emission – Immission – Massnahme – Lücke, mit vereinbarten Verbesserungen.',
    criteria: ['Emissionen vollständig erfasst', 'Immissionsorte benannt', 'Massnahmen an der Quelle bewertet', 'Verbesserungen vereinbart'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm1-p2', moduleId: M, topic: 'm1-rechtsordnung', title: 'Umweltrechtskataster prüfen oder aufbauen',
    goal: 'Das bestehende Rechtskataster Ihres Unternehmens prüfen (oder einen Entwurf erstellen) und die Pflege organisieren.',
    steps: ['Beschaffen Sie das bestehende Kataster bzw. Rechtsregister aus dem ISO-14001-System.', 'Prüfen Sie: Sind USG, GSchG, LRV, LSV, VVEA, VBBo, NHG, WaG und die Richtlinien enthalten? Mit Fassung und Verantwortlichen?', 'Ergänzen Sie die Kantone, in denen gebaut wird, mit ihren Merkblättern.', 'Legen Sie fest, wie Änderungen erkannt werden (Abos, Verband, jährliche Prüfung).'],
    deliverable: 'Prüfbericht oder Entwurf des Katasters mit Pflegekonzept.',
    criteria: ['Bundesrecht vollständig', 'Kantonale Besonderheiten erfasst', 'Verantwortlichkeiten und Prüfdatum', 'Pflegekonzept realistisch'], confirmer: 'Leitung Qualität/Umwelt oder Managementsystem-Verantwortliche/r' },
  { id: 'm1-p3', moduleId: M, topic: 'm1-verordnungen', title: 'Maschinen- und Nachweis-Check',
    goal: 'Auf einer Baustelle prüfen, ob die Nachweise für Luft, Lärm und Abfall vorhanden sind.',
    steps: ['Erstellen Sie die Maschinenliste (inkl. Subunternehmer) mit Leistung und Nachweis zu den Partikelanforderungen.', 'Prüfen Sie die angeordneten Massnahmenstufen Luft und Lärm und deren Umsetzung.', 'Prüfen Sie Entsorgungskonzept und Entsorgungsnachweise.', 'Legen Sie fehlende Nachweise mit Termin nach.'],
    deliverable: 'Nachweis-Checkliste mit Lücken und Massnahmen.',
    criteria: ['Alle Maschinen über 18 kW erfasst', 'Massnahmenstufen geprüft', 'Abfallnachweise geprüft', 'Lücken mit Termin'], confirmer: 'Bauführer/in' },
  { id: 'm1-p4', moduleId: M, topic: 'm1-natur', title: 'Naturcheck vor Baubeginn',
    goal: 'Für ein kommendes Projekt Natur- und Landschaftsfragen vor Baubeginn klären.',
    steps: ['Prüfen Sie das Projekt auf dem kantonalen Geoportal (Inventare, Wald, Gewässerraum, Schutzzonen).', 'Lesen Sie die Bewilligungsauflagen zu Bäumen, Hecken, Ufern.', 'Begehen Sie den Perimeter und fotografieren Sie den Ausgangszustand.', 'Halten Sie Konflikte mit dem Installationsplan fest und melden Sie sie der Bauleitung.'],
    deliverable: 'Kurzbericht mit Karte, Fotos und Konfliktliste.',
    criteria: ['Geoportal geprüft', 'Auflagen erfasst', 'Ausgangszustand dokumentiert', 'Konflikte gemeldet'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm1-p5', moduleId: M, topic: 'm1-verantwortung', title: 'Pflichtenheft und Subunternehmerverträge prüfen',
    goal: 'Die eigene Rolle und die Einbindung der Subunternehmer im Unternehmen klären.',
    steps: ['Prüfen Sie Ihr Pflichtenheft: Aufgaben, Befugnisse, Eskalationsweg, Ressourcen.', 'Prüfen Sie zwei Subunternehmerverträge auf Umweltklauseln.', 'Formulieren Sie Verbesserungsvorschläge.', 'Besprechen Sie sie mit Ihrer vorgesetzten Stelle.'],
    deliverable: 'Vorschlag für Pflichtenheft und Musterklauseln für Subunternehmer.',
    criteria: ['Befugnisse geklärt', 'Eskalationsweg definiert', 'Vertragsklauseln konkret', 'Mit Vorgesetzten besprochen'], confirmer: 'Vorgesetzte/r oder Geschäftsleitungsmitglied' },
  { id: 'm1-p6', moduleId: M, topic: 'm1-vollzug', title: 'Auflagenmatrix für ein laufendes Projekt',
    goal: 'Für ein reales Projekt die Umweltauflagen in eine Auflagenmatrix übersetzen und die Steuerung einführen.',
    steps: ['Beschaffen Sie die Bewilligung(en) eines laufenden oder kommenden Projekts.', 'Erstellen Sie die Matrix: Auflage, Rechtsnatur, Massnahme, Verantwortlich, Termin, Nachweis, Status.', 'Markieren Sie Vorlaufpunkte vor Baubeginn.', 'Vereinbaren Sie mit der Bauleitung, wie die Matrix nachgeführt wird.'],
    deliverable: 'Auflagenmatrix und vereinbarter Nachführungsprozess.',
    criteria: ['Alle Auflagen erfasst', 'Vorlaufpunkte markiert', 'Verantwortliche zugeordnet', 'Nachführung vereinbart'], confirmer: 'Bauführer/in oder Projektleiter/in' },
];

// ---------- Feynman ----------
export const M1_FEYNMAN: FeynmanTask[] = [
  { id: 'm1-f1', moduleId: M, topic: 'm1-verantwortung', audience: 'Geschäftsleitung eines Bauunternehmens',
    prompt: 'Erklären Sie der Geschäftsleitung in 6–8 Sätzen, wer bei einem Umweltereignis auf einer Baustelle wofür einstehen muss (Kosten, Strafe, Schaden) und was das Unternehmen tun kann, um gut dazustehen.',
    rubric: [
      { id: 'f1', text: 'Drei Verfahren unterschieden: Kosten (Verursacher), Strafe (persönliche Schuld), Schaden (Haftpflicht)', keywords: ['kosten', 'strafe', 'haft', 'schaden'] },
      { id: 'f2', text: 'Personen und ggf. Vorgesetzte; Unternehmen nur unter Voraussetzungen (Art. 102 StGB)', keywords: ['vorgesetzt', 'person', 'unternehmen', '102'] },
      { id: 'f3', text: 'Organisation: Auswahl, Instruktion, Ausrüstung, Kontrolle', keywords: ['instru', 'kontroll', 'organisation', 'ausrüst'] },
      { id: 'f4', text: 'Dokumentation als Nachweis', keywords: ['dokument', 'nachweis', 'protokoll'] },
      { id: 'f5', text: 'Für Führungskräfte verständlich, ohne Juristendeutsch', keywords: [] },
    ] },
  { id: 'm1-f2', moduleId: M, topic: 'm1-vollzug', audience: 'Vorarbeiter auf einer Baustelle',
    prompt: 'Erklären Sie einem Vorarbeiter in 5–7 Sätzen, wie er sich verhält, wenn eine Behörde unangemeldet die Baustelle kontrolliert.',
    rubric: [
      { id: 'f1', text: 'Zutritt gewähren, begleiten, Sicherheitsregeln', keywords: ['zutritt', 'begleit', 'sicherheit', 'helm'] },
      { id: 'f2', text: 'Polier/Bauführer sofort informieren', keywords: ['polier', 'bauführer', 'anruf', 'inform'] },
      { id: 'f3', text: 'Ehrlich Auskunft geben, nichts verstecken oder schnell aufräumen', keywords: ['ehrlich', 'versteck', 'aufräum', 'offen'] },
      { id: 'f4', text: 'Feststellungen notieren, eigene Fotos', keywords: ['notier', 'foto', 'aufschreib'] },
      { id: 'f5', text: 'Verständlich und praktisch formuliert', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M1_CARDS: Card[] = [
  { id: 'm1-c01', moduleId: M, topic: 'm1-grundlagen', level: 1, front: 'Emission vs. Immission?', back: '**Emission**: tritt an der Quelle aus. **Immission**: kommt am Ort der Einwirkung an.', sources: ['usg'] },
  { id: 'm1-c02', moduleId: M, topic: 'm1-grundlagen', level: 1, front: 'Zweistufiges Konzept der Emissionsbegrenzung (Art. 11 USG)?', back: '1. **Vorsorglich** an der Quelle, soweit technisch/betrieblich möglich und wirtschaftlich tragbar. 2. **Verschärft**, wenn Einwirkungen schädlich oder lästig werden.', sources: ['usg'] },
  { id: 'm1-c03', moduleId: M, topic: 'm1-grundlagen', level: 1, front: 'Drei Prinzipien des USG für die Beratung?', back: '**Vorsorge** (früh begrenzen), **Verursacher** (wer verursacht, zahlt), **Gesamtbetrachtung** (Einwirkungen zusammen beurteilen).', sources: ['usg'] },
  { id: 'm1-c04', moduleId: M, topic: 'm1-grundlagen', level: 2, front: 'Gibt es Grenzwerte für Baulärm?', back: '**Nein.** Die Baulärm-Richtlinie (Art. 6 LSV) arbeitet mit Massnahmenstufen **A, B, C**. Die angeordnete Stufe ist verbindlich.', sources: ['bafu-baulaerm'] },
  { id: 'm1-c05', moduleId: M, topic: 'm1-rechtsordnung', level: 1, front: 'Wer erlässt, wer vollzieht Umweltrecht?', back: '**Bund** erlässt Gesetze und Verordnungen; **Kantone** vollziehen (Fachstellen, Bewilligungen, Kontrollen); **Gemeinden** oft Baubewilligung, Kanalisation, Kontrolle vor Ort.', sources: ['bv'] },
  { id: 'm1-c06', moduleId: M, topic: 'm1-rechtsordnung', level: 1, front: 'Was bedeutet SR 814 auf Fedlex?', back: 'Das Sachgebiet **Umweltschutz** (z. B. USG 814.01, GSchG 814.20, LSV 814.41, VVEA 814.600). Immer die Fassung prüfen.', sources: ['fedlex'] },
  { id: 'm1-c07', moduleId: M, topic: 'm1-rechtsordnung', level: 2, front: 'Zwei Ebenen eines Umweltrechtskatasters?', back: '**Unternehmen** (gilt für alle Baustellen) und **Projekt** (Bewilligungsauflagen, kantonale Merkblätter, Vertragsnormen). Jährlich überprüfen.', sources: ['iso14001'] },
  { id: 'm1-c08', moduleId: M, topic: 'm1-verordnungen', level: 1, front: 'Partikelanforderungen für Baumaschinen?', back: 'LRV Art. 19a, Anhang 4 Ziff. 3: Maschinen **über 18 kW**, mit Übergangsregeln nach Baujahr. Gilt auch für Subunternehmer-Maschinen.', sources: ['lrv'] },
  { id: 'm1-c09', moduleId: M, topic: 'm1-verordnungen', level: 2, front: 'Wann braucht es Entsorgungsangaben nach Art. 16 VVEA?', back: 'Bei voraussichtlich **mehr als 200 m³** Bauabfällen **oder** wenn **Bauschadstoffe** (PCB, PAK, Blei, Asbest) zu erwarten sind.', sources: ['vvea'] },
  { id: 'm1-c10', moduleId: M, topic: 'm1-verordnungen', level: 2, front: 'Richtlinie Luft: Stufe A und B?', back: '**A**: Basismassnahmen für alle Baustellen. **B**: zusätzliche Massnahmen für grosse bzw. lange Baustellen, je nach Lage.', sources: ['bafu-luft'] },
  { id: 'm1-c11', moduleId: M, topic: 'm1-natur', level: 1, front: 'Was gilt für Ufervegetation (Art. 21 NHG)?', back: 'Nicht **roden**, nicht **überschütten**, nicht anders **zum Absterben bringen**. Ausnahmen nur mit Bewilligung (Art. 22 NHG).', sources: ['nhg'] },
  { id: 'm1-c12', moduleId: M, topic: 'm1-natur', level: 1, front: 'Ist eine vorübergehende Nutzung von Wald eine Rodung?', back: '**Ja.** Auch die vorübergehende Zweckentfremdung von Waldboden braucht eine Rodungsbewilligung.', sources: ['wag'] },
  { id: 'm1-c13', moduleId: M, topic: 'm1-natur', level: 2, front: 'Reihenfolge beim Biotopschutz?', back: '**Vermeiden** → minimieren/schützen → **wiederherstellen** → angemessen **ersetzen**.', sources: ['nhg'] },
  { id: 'm1-c14', moduleId: M, topic: 'm1-verantwortung', level: 2, front: 'Drei Verfahren nach einem Umweltereignis?', back: '**Kosten** (Verwaltungsrecht, Verursacher), **Strafe** (persönliche Schuld), **Schaden** (Haftpflicht).', sources: ['usg'] },
  { id: 'm1-c15', moduleId: M, topic: 'm1-verantwortung', level: 2, front: 'Strafrahmen USG?', back: 'Art. 60 (Vergehen): bis **3 Jahre** Freiheitsstrafe oder Geldstrafe. Art. 61 (Übertretung): Busse bis **20 000 Fr.**, Fahrlässigkeit strafbar.', sources: ['usg'] },
  { id: 'm1-c16', moduleId: M, topic: 'm1-verantwortung', level: 3, front: 'Vier Bedingungen wirksamer Delegation?', back: '**Auswahl**, **Instruktion**, **Ausrüstung**, **Kontrolle** – und nachweisbar dokumentiert.', sources: ['praxis'] },
  { id: 'm1-c17', moduleId: M, topic: 'm1-vollzug', level: 1, front: 'Was verlangt Art. 25a RPG?', back: 'Mehrere Bewilligungen für ein Vorhaben sind **materiell** (widerspruchsfrei) und soweit möglich **formell** zu koordinieren.', sources: ['rpg'] },
  { id: 'm1-c18', moduleId: M, topic: 'm1-vollzug', level: 2, front: 'Sechs Schritte bei einer Behördenkontrolle?', back: 'Zutritt + Begleitung → Verantwortliche informieren → sachlich Auskunft → Feststellungen notieren/Fotos → Mängel beheben und dokumentieren → Ursachen analysieren.', sources: ['praxis'] },
];

// ---------- Baustellenfall F ----------
export const M1_SCENARIO: Scenario = {
  id: 'sim-f', code: 'F', moduleId: 'm1', status: 'verfuegbar', rev: 3,
  title: 'Unangemeldete Kontrolle der kantonalen Fachstelle',
  setting: 'Hochbau', level: 3, minutes: 15,
  topics: ['m1-vollzug', 'm1-verordnungen', 'm1-verantwortung'],
  intro: 'Umbau eines Geschäftshauses aus den 1970er-Jahren in einer Agglomerationsgemeinde. Bewilligung mit Baulärm-Stufe B, Luft-Stufe B und Entsorgungskonzept. Mittwoch, 7.40 Uhr: Eine Mitarbeiterin des kantonalen Amts für Umwelt meldet sich am Tor. Sie sind zufällig auf der Baustelle.',
  facts: [
    'Ein Anwohner hat gestern gemeldet, dass ab 6.30 Uhr mit dem Abbauhammer gearbeitet werde.',
    'In der Mulde liegen Bauschutt, Gipsplatten, Holz und Kunststoff gemischt.',
    'Ein Kompaktbagger (45 kW) des Abbruch-Subunternehmers hat keine sichtbare Kennzeichnung zu den Partikelanforderungen.',
    'Polier und Bauführer sind noch nicht vor Ort.',
  ],
  stages: [
    {
      id: 'f1', title: 'Die ersten Minuten', type: 'single', criteria: ['zusammenarbeit', 'recht'],
      situation: 'Die Kontrolleurin stellt sich vor und möchte die Baustelle ansehen. Der Vorarbeiter flüstert: «Sag, sie soll später kommen.»',
      prompt: 'Wie reagieren Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Zutritt gewähren, PSA ausgeben und sie begleiten; Bauführer und Polier sofort telefonisch informieren; Notizen machen.', feedback: 'Richtig: Vollzugsbehörden haben in der Regel Zutritts- und Auskunftsrechte (Umfang je nach Gesetz und kantonalem Verfahren). Begleitung und Information der Verantwortlichen sind professionell.' },
        { id: 'o2', points: 0, text: 'Bitten, später wiederzukommen, wenn der Bauführer da ist.', feedback: 'Ungeeignet: Eine Verzögerung wirkt, als hätte die Baustelle etwas zu verbergen, und ist je nach kantonalem Recht nicht zulässig.' },
        { id: 'o3', points: 0, critical: true, text: 'Zuerst schnell die Mulde umschichten lassen, dann einlassen.', feedback: 'Kritischer Fehler: Mängel vor der Kontrolle zu verbergen, zerstört Vertrauen und kann rechtlich als Behinderung gewertet werden.', consequence: 'Die Kontrolleurin sieht vom Tor aus, wie Material umgeschichtet wird. Sie protokolliert den Vorgang; das Gespräch beginnt mit Misstrauen.' },
      ],
    },
    {
      id: 'f2', title: 'Was zuerst klären?', type: 'ask', criteria: ['unsicherheit', 'recht'], pick: 3,
      situation: 'Während des Rundgangs haben Sie Gelegenheit, im Baucontainer Unterlagen zu holen.',
      prompt: 'Welche drei Unterlagen bzw. Informationen holen Sie?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Baubewilligung mit Auflagen (Arbeitszeiten, Massnahmenstufen)', reveal: 'Auflage 12: lärmintensive Arbeiten Mo–Fr 7.00–12.00 und 13.00–17.00 Uhr. Stufe B Luft und Lärm.', feedback: 'Zentral: zeigt, was verlangt ist.' },
        { id: 'u2', points: 2, relevant: true, text: 'Entsorgungskonzept und Schadstoffbericht', reveal: 'Konzept verlangt Trennung in fünf Fraktionen; Schadstoffbericht: Asbest in Bodenbelägen (saniert, Nachweis vorhanden).', feedback: 'Zentral: Abfalltrennung und Schadstoffe sind geregelt – die Mulde verletzt das Konzept.' },
        { id: 'u3', points: 2, relevant: true, text: 'Maschinenliste mit Nachweisen der Subunternehmer', reveal: 'Für den Kompaktbagger fehlt der Nachweis; laut Subunternehmer hat er einen Filter.', feedback: 'Zentral: Nachweis fehlt – Einsatz klären.' },
        { id: 'u4', points: 0, relevant: false, text: 'Kostenvoranschlag für die Mulden', reveal: '—', feedback: 'Für die Kontrolle nicht relevant.' },
        { id: 'u5', points: 0, relevant: false, text: 'Personalliste der Baustelle', reveal: '—', feedback: 'Nicht relevant und datenschutzrechtlich heikel.' },
      ],
    },
    {
      id: 'f3', title: 'Sofortmassnahmen', type: 'multi', criteria: ['fachlich', 'recht', 'prioritaet'],
      situation: 'Die Kontrolleurin hält drei Mängel fest: gemischte Mulde, Maschine ohne Nachweis, Hinweis auf Arbeiten vor 7 Uhr. Sie fragt, was Sie sofort veranlassen.',
      prompt: 'Welche Sofortmassnahmen veranlassen Sie? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Mulde heute sortieren lassen, Muldenkonzept beschriften, Gipsplatten separat', feedback: 'Richtig: Trennpflicht (Art. 17 VVEA) und Konzept umsetzen.' },
        { id: 'm2', points: 2, text: 'Kompaktbagger stilllegen, bis der Nachweis vorliegt; sonst Ersatzmaschine', feedback: 'Richtig: Ohne Nachweis kein Einsatz.' },
        { id: 'm3', points: 2, text: 'Arbeitszeiten heute mit allen Equipen inkl. Subunternehmer instruieren und kontrollieren', feedback: 'Richtig: Ursache der Beschwerde direkt angehen.' },
        { id: 'm4', points: 2, text: 'Bauherrschaft über Kontrolle und Mängel informieren', feedback: 'Richtig: Sie ist Adressatin der Bewilligung.' },
        { id: 'm5', points: 0, critical: true, text: 'Bagger weiterlaufen lassen, weil der Abbruch sonst still steht', feedback: 'Kritischer Fehler: bewusster Einsatz einer nicht nachgewiesenen Maschine nach behördlicher Feststellung.', consequence: 'Die Fachstelle verfügt die Stilllegung und prüft eine Anzeige.' },
        { id: 'm6', points: 0, text: 'Die gemischte Mulde so lassen, die Sortieranlage trennt ja', feedback: 'Falsch: Trennung auf der Baustelle ist Pflicht, wo betrieblich möglich; das Konzept verlangt sie.' },
      ],
    },
    {
      id: 'f4', title: 'Wer ist verantwortlich?', type: 'single', criteria: ['recht', 'zusammenarbeit'],
      situation: 'Der Bauführer kommt und sagt: «Der Bagger gehört dem Subunternehmer – das ist nicht unser Problem.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 0, text: 'Er hat recht, nur der Subunternehmer ist verantwortlich.', feedback: 'Zu kurz: Der Subunternehmer ist für seine Maschine verantwortlich, aber die Bauleitung muss sicherstellen, dass auf der Baustelle nur konforme Maschinen arbeiten, und die Bauherrschaft muss die Auflagen durchsetzen.' },
        { id: 'r2', points: 2, text: 'Der Subunternehmer ist als Inhaber für seine Maschine verantwortlich; wir müssen ihn einbinden (Vertrag, Kontrolle) und dürfen die Maschine ohne Nachweis nicht arbeiten lassen. Gegenüber Bauherrschaft und Behörde stehen wir für unsere Baustellenorganisation ein.', feedback: 'Richtig: Verantwortung liegt bei mehreren – je nach Rolle.' },
        { id: 'r3', points: 1, text: 'Nur die Bauherrschaft ist verantwortlich, weil sie die Bewilligung hat.', feedback: 'Teilweise: Die Bauherrschaft ist Adressatin, aber Unternehmer und Subunternehmer haben eigene Pflichten.' },
      ],
    },
    {
      id: 'f5', title: 'Nachbereitung', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Die Fachstelle setzt eine Frist von zehn Tagen für eine Stellungnahme mit Nachweisen.',
      prompt: 'Ordnen Sie die Nachbereitung (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Mängel beheben und mit Fotos und Dokumenten belegen' },
        { id: 'n2', text: 'Ursachen analysieren (warum gemischte Mulde, fehlender Nachweis, falsche Arbeitszeiten?)' },
        { id: 'n3', text: 'Fristgerechte Stellungnahme an die Fachstelle mit Nachweisen' },
        { id: 'n4', text: 'Standard anpassen: Muldenkonzept, Maschinen-Check beim Start von Subunternehmern, Arbeitszeiten in der Startinstruktion' },
        { id: 'n5', text: 'Wirksamkeit bei der nächsten Begehung prüfen' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1'], ['n2', 'n3'], ['n4'], ['n5']],
      rankEarly: [{ id: 'n1', maxPos: 1, why: 'Die Mängelbehebung kommt zuerst – ohne sie fehlen die Nachweise für die Stellungnahme, und die Verstösse dauern an.' }],
      rankExplanation: 'Zuerst beheben und belegen. Ursachenanalyse und Stellungnahme laufen parallel innerhalb der Frist. Danach wird der Standard angepasst, damit die Mängel auf anderen Baustellen nicht auftreten, und die Wirksamkeit geprüft (Korrekturmassnahme nach ISO 14001, Abschnitt 10.2 der Ausgabe 2015).',
    },
    {
      id: 'f6', title: 'Bericht an die Geschäftsleitung', type: 'justify', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Die Geschäftsleitung möchte einen kurzen Bericht über die Kontrolle.',
      prompt: 'Schreiben Sie 5–7 Sätze: Was wurde festgestellt, was wurde sofort getan, was sind die Ursachen, was ändern wir im Unternehmen, und was ist das Risiko, wenn nichts passiert?',
      rubric: [
        { id: 'b1', text: 'Feststellungen sachlich benannt (Mulde, Maschine, Arbeitszeiten)', keywords: ['mulde', 'maschine', 'bagger', 'arbeitszeit'] },
        { id: 'b2', text: 'Sofortmassnahmen und Frist', keywords: ['sortiert', 'stillgelegt', 'instruiert', 'frist'] },
        { id: 'b3', text: 'Ursachen (Organisation, Subunternehmer-Einbindung)', keywords: ['ursach', 'sub', 'organisation', 'instruktion'] },
        { id: 'b4', text: 'Massnahmen im Unternehmen (Standard, Startcheck)', keywords: ['standard', 'check', 'vertrag', 'schulung'] },
        { id: 'b5', text: 'Risiko benannt (Verfügung, Strafe, Reputation)', keywords: ['risiko', 'verfüg', 'straf', 'reputation', 'anzeige'] },
      ],
    },
  ],
  debrief: 'Behördenkontrollen zeigen schonungslos, wo die Organisation nicht funktioniert. Wer offen kooperiert, Mängel sofort behebt und die Ursachen angeht, macht aus einer Kontrolle eine Verbesserung. Die häufigste Ursache ist fehlende Einbindung der Subunternehmer und fehlende Kontrolle beim Start.',
  sources: ['vvea', 'lrv', 'bafu-baulaerm', 'usg'],
};
