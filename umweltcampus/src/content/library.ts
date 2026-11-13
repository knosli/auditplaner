import type { LibraryEntry } from './types';

// Wissensbibliothek: Checklisten, Vorlagen, Matrizen, Problemkatalog.
export const LIBRARY: LibraryEntry[] = [
  {
    id: 'cl-begehung-gewaesser', category: 'checkliste', moduleId: 'm2',
    title: 'Checkliste Umweltbegehung Gewässerschutz',
    summary: 'Kurze Kontrolle für die wöchentliche Begehung von Hoch- und Tiefbaustellen.',
    tags: ['Begehung', 'Kontrolle', 'Gewässerschutz', 'Audit', 'Checkliste'],
    items: [
      { group: 'Grundlagen', points: ['Gewässerschutzbereich/Schutzzone bekannt und auf Plan vermerkt', 'Entwässerungskonzept vorhanden, aktuelle Bauphase berücksichtigt', 'Bewilligungsauflagen zum Gewässerschutz bekannt (Polier)', 'Kanalisationskataster vorhanden; Schächte nach Meteor/Schmutz markiert'] },
      { group: 'Abwasser und Behandlung', points: ['Meteorschächte im Arbeitsbereich abgedeckt', 'Waschplatz eingerichtet und benutzt', 'Absetzbecken/-container: Schlammstand in Ordnung, keine Kurzschlussströmung', 'Neutralisation in Betrieb, CO₂-Vorrat ausreichend', 'pH-Protokoll aktuell, Messgerät kalibriert', 'Auslauf klar, kein Ölfilm (Sichtkontrolle)'] },
      { group: 'Wassergefährdende Stoffe', points: ['Gebinde auf Auffangwannen, Wannen leer und überdacht', 'Betankungsplatz dicht, kein Schacht im Abflussbereich', 'Maschinen ohne sichtbare Leckagen', 'Ölbindemittel und Schachtabdeckung griffbereit'] },
      { group: 'Notfall und Organisation', points: ['Notfallkarte ausgehängt (118/117, interne Kette)', 'Mitarbeitende inkl. Temporäre instruiert', 'Offene Massnahmen der letzten Begehung erledigt'] },
    ],
    sources: ['sia431', 'kanton-merkblatt', 'praxis'],
  },
  {
    id: 'cl-entwaesserungskonzept', category: 'checkliste', moduleId: 'm2',
    title: 'Checkliste Entwässerungskonzept (Prüfung)',
    summary: 'Prüfraster für Entwässerungskonzepte der Bauphase nach sechs Leitfragen.',
    tags: ['Entwässerungskonzept', 'AVOR', 'Planung', 'SIA 431', 'Checkliste'],
    items: [
      { group: '1 Was fällt an?', points: ['Abwasserarten je Bauphase erfasst (trüb, alkalisch, ölhaltig, häuslich, Grundwasser, Regen)', 'Mengen abgeschätzt, inkl. Starkregen'] },
      { group: '2 Wie wird getrennt?', points: ['Fremdwasser wird ferngehalten', 'Unverschmutztes Wasser getrennt geführt'] },
      { group: '0 Risikostufe nach SIA 431:2022', points: ['Gewässerkritische Bauprozesse geprüft (z. B. Oberflächenabtrag, Sprengungen, Bauen auf belasteten Standorten, Bauchemikalien)', 'Betroffene Schutzgüter geprüft (Gewässer, Grundwasser, Schutzzonen)', 'Stufe 1, 2 oder 3 festgelegt; ab Stufe 3 Fachspezialist beigezogen'] },
      { group: '3 Wie wird behandelt?', points: ['Anlagen bemessen (durch Fachplaner oder Lieferant)', 'Neutralisation für alkalisches Wasser vorgesehen', 'Betrieb geregelt (Schlamm, CO₂, Wartung)'] },
      { group: '4 Wohin wird abgeleitet?', points: ['Einleitstellen gemäss Kataster', 'Bewilligungen bzw. Zustimmungen vorhanden, Bedingungen bekannt'] },
      { group: '5 Wer kontrolliert was?', points: ['Zuständigkeiten namentlich bzw. nach Funktion', 'Messungen, Häufigkeit, Protokolle festgelegt', 'Meldewege bei Überschreitung festgelegt'] },
      { group: '6 Was gilt im Notfall?', points: ['Regel für Starkregen / Anlagenausfall', 'Havarieorganisation und Material', 'Alarmierung intern/extern'] },
    ],
    sources: ['sia431', 'kanton-merkblatt'],
  },
  {
    id: 'vl-massnahmenplan', category: 'vorlage', moduleId: 'm8',
    title: 'Vorlage Umweltmassnahmenplan (Ausschnitt Gewässerschutz)',
    summary: 'Tabellarische Vorlage, um Auflagen in konkrete Massnahmen mit Verantwortung und Nachweis zu übersetzen.',
    tags: ['Massnahmenplan', 'Vorlage', 'AVOR', 'Auflagen', 'Umweltmassnahmenplan'],
    table: {
      head: ['Anforderung / Quelle', 'Verbindlichkeit', 'Massnahme', 'Verantwortlich', 'Termin / Phase', 'Nachweis'],
      rows: [
        ['Bewilligung Ziff. … : Entwässerungskonzept', 'Behördliche Auflage', 'Konzept erstellen, mit Gemeinde abstimmen', 'Bauführer/in', 'vor Baustart', 'Konzept + Zustimmung'],
        ['GSchG Verunreinigungsverbot', 'Gesetz', 'Meteorschächte im Arbeitsbereich abdecken', 'Polier/in', 'ab Installation', 'Begehungsprotokoll'],
        ['SIA 431 (Werkvertrag)', 'Norm (vereinbart)', 'Waschplatz mit Absetzen + CO₂', 'Polier/in', 'vor 1. Betonage', 'Foto, pH-Protokoll'],
        ['Interner Standard Betankung', 'Interner Standard', 'Betankungsplatz mit Tankwanne', 'Werkhof', 'ab Installation', 'Checkliste'],
      ],
    },
    text: 'Leere Zeilen für das eigene Projekt ergänzen. Jede Auflage braucht eine Massnahme, eine verantwortliche Funktion, einen Termin und einen Nachweis – sonst bleibt sie Papier.',
    sources: ['praxis'],
  },
  {
    id: 'vl-kontrollbericht', category: 'vorlage', moduleId: 'm9',
    title: 'Vorlage Kontrollbericht Umweltbegehung',
    summary: 'Gliederung eines kurzen, nachvollziehbaren Begehungsberichts.',
    tags: ['Kontrollbericht', 'Bericht', 'Begehung', 'Vorlage', 'Fotodokumentation'],
    text: `### Kopf
Baustelle, Datum, Uhrzeit, Teilnehmende (Funktion), Bauphase, Wetter.

### Feststellungen
Je Feststellung: Nr., Ort, Beschreibung (sachlich, beobachtbar), Foto-Nr., Einstufung (kritisch / Abweichung / Hinweis), Bezug (Gesetz, Auflage, Norm, Standard).

### Massnahmen
Je Feststellung: Massnahme, verantwortlich, Termin, Status. Kritische Feststellungen: Sofortmassnahme und Information der Bauführung noch vor Ort.

### Positives
Was gut umgesetzt ist – stärkt die Zusammenarbeit.

### Nachverfolgung
Offene Massnahmen der letzten Begehung mit Status.

> Fotos ohne erkennbare Personen; Dateiname mit Datum und Nr. der Feststellung.`,
    sources: ['praxis'],
  },
  {
    id: 'mx-verantwortung-gewaesser', category: 'matrix', moduleId: 'm2',
    title: 'Verantwortlichkeitsmatrix Gewässerschutz Baustelle',
    summary: 'Typische Rollenverteilung (V = verantwortlich, M = mitwirkend, I = informiert). Projektspezifisch anpassen.',
    tags: ['Verantwortung', 'RACI', 'Rollen', 'Matrix', 'Zuständigkeit'],
    table: {
      head: ['Aufgabe', 'Bauherrschaft / Planer', 'Projektleitung', 'Bauführung', 'Polier', 'Umweltfachperson'],
      rows: [
        ['Entwässerungskonzept erstellen', 'V / M (vertraglich)', 'M', 'M', 'I', 'M (Beratung)'],
        ['Bewilligungen einholen', 'V', 'M', 'M', 'I', 'M'],
        ['Anlagen einrichten und betreiben', 'I', 'I', 'V', 'M', 'M'],
        ['Tägliche Kontrolle, pH-Protokoll', '–', '–', 'I', 'V', 'I'],
        ['Instruktion Mitarbeitende', '–', 'I', 'V', 'M', 'M'],
        ['Begehung / interne Kontrolle', 'I', 'I', 'M', 'M', 'V'],
        ['Havarie: Sofortmassnahmen, Alarmierung', 'I', 'I', 'M', 'V', 'M'],
        ['Meldung an Behörde', 'I', 'M', 'V', 'M', 'M'],
      ],
    },
    sources: ['praxis'],
  },
  {
    id: 'pr-meteorschacht', category: 'problem', moduleId: 'm2',
    title: 'Häufiges Problem: Reinigung über dem Meteorschacht',
    summary: 'Pumpe, Kübel, Mörtelmischer oder Werkzeug werden dort gereinigt, wo Wasser abfliesst.',
    tags: ['Betonwaschwasser', 'Meteorschacht', 'Hochbau', 'typischer Fehler'],
    text: `**Ursache**: Kein Waschplatz eingeplant, Schacht nicht abgedeckt, Mitarbeitende kennen die Bedeutung des Schachts nicht.

**Folge**: Alkalisches, trübes Wasser gelangt ungereinigt in den Bach.

**Massnahmen**: Waschplatz im Installationsplan (AVOR), Meteorschächte abdecken, Instruktion inkl. Temporärer, Kontrolle in der Begehung, Vereinbarung mit Betonwerk (Trommelreinigung im Werk).`,
    sources: ['praxis', 'gschg'],
  },
  {
    id: 'pr-truebwasser', category: 'problem', moduleId: 'm2',
    title: 'Häufiges Problem: Trübes Baugrubenwasser nach Regen',
    summary: 'Absetzanlage überlastet oder umgangen, Direkteinleitung in Graben oder Bach.',
    tags: ['Trübstoffe', 'Wasserhaltung', 'Tiefbau', 'Starkregen', 'typischer Fehler'],
    text: `**Ursache**: Anlage zu klein oder voll Schlamm, keine Regel für Starkregen, Termindruck.

**Folge**: Kolmation, Verstoss gegen Bewilligung, Meldepflicht.

**Massnahmen**: Fremdwasser fernhalten, mehr wirksame Fläche (Container parallel, Lamellenklärer; in Serie gegen Kurzschluss), Schlammentnahme mit Zuständigkeit, Notfallregel «bei Trübung abstellen», Grube als Puffer.`,
    sources: ['kanton-merkblatt', 'praxis'],
  },
  {
    id: 'ms-sofort-oel', category: 'massnahme', moduleId: 'm2',
    title: 'Sofortmassnahmen bei Öl- oder Treibstoffaustritt',
    summary: 'Ablauf für die ersten Minuten.',
    tags: ['Havarie', 'Öl', 'Notfall', 'Sofortmassnahmen', 'Alarmierung', '118', '117'],
    text: `1. **Eigene Sicherheit**: Zündquellen, Dämpfe, Maschinen.
2. **Gleichzeitig**: Maschine abstellen, Leck abdichten, Schächte abdecken, Bindemittel – **und** bei konkreter Gefahr für Gewässer, Kanalisation oder Untergrund **sofort 118 oder 117** (zu zweit: eine Person alarmiert sofort); intern nach Alarmplan.
3. **Weitere sichere Massnahmen**; Ölsperren im Gewässer nur durch Instruierte vom sicheren Ufer, sonst Feuerwehr/Ölwehr.
4. **Aufnehmen und entsorgen**: nach Abfallklassierung, meist Sonderabfall mit Begleitschein.
5. **Dokumentieren**: Zeiten, Mengen, Fotos, Massnahmen, Meldungen.

!> Nie wegspülen. Nie abwarten.`,
    sources: ['notruf', 'praxis'],
  },
  {
    id: 'rg-gewaesser', category: 'recht', moduleId: 'm2',
    title: 'Rechtsgrundlagen Gewässerschutz – Übersicht',
    summary: 'Welche Grundlagen auf Baustellen zusammenwirken und wie verbindlich sie sind.',
    tags: ['Recht', 'GSchG', 'GSchV', 'SIA 431', 'Merkblatt', 'Verbindlichkeit'],
    table: {
      head: ['Grundlage', 'Art', 'Für die Baustelle wichtig'],
      rows: [
        ['GSchG (SR 814.20)', 'Gesetz', 'Sorgfalt, Verunreinigungsverbot, Abwasser, Bereiche, Strafen'],
        ['GSchV (SR 814.201)', 'Verordnung', 'Einleitbedingungen, Gewässerschutzbereiche, Schutzzonen'],
        ['Baubewilligung / Einleitbewilligung', 'Behördliche Auflage', 'Projektspezifische Pflichten und Werte'],
        ['SIA 431', 'Technische Norm', 'Planung und Betrieb der Baustellenentwässerung'],
        ['Kantonale Merkblätter', 'Vollzugshilfe', 'Konkrete Vorgaben und Meldewege im Kanton'],
        ['Interner Standard', 'Interner Standard', 'Einheitliches Vorgehen im Unternehmen'],
      ],
    },
    text: '> Kantone, Gemeinden, Bewilligungsauflagen und besondere Projektbedingungen können zusätzliche Anforderungen stellen.',
    sources: ['gschg', 'gschv', 'sia431', 'kanton-merkblatt'],
  },
  {
    id: 'vl-rechtskataster', category: 'vorlage', moduleId: 'm1',
    title: 'Vorlage Umweltrechtskataster (Unternehmensebene)',
    summary: 'Struktur für die bindenden Umweltverpflichtungen eines Bauunternehmens mit Zuständigkeiten und Prüfung.',
    tags: ['Rechtskataster', 'Rechtsregister', 'ISO 14001', 'Compliance', 'Vorlage'],
    table: {
      head: ['Erlass / Verpflichtung', 'Art', 'Relevante Anforderung', 'Betrifft', 'Verantwortlich', 'Einhaltung geprüft durch / wann'],
      rows: [
        ['USG (SR 814.01)', 'Gesetz', 'Vorsorge, Emissionsbegrenzung, Abfälle, Haftung', 'alle Baustellen', 'GL / Umweltbeauftragte/r', 'Begehungen, jährlich'],
        ['GSchG/GSchV (SR 814.20/.201)', 'Gesetz/Verordnung', 'Baustellenentwässerung, Lagerung', 'alle Baustellen, Werkhof', 'Bauführung', 'Begehungen'],
        ['LRV (SR 814.318.142.1)', 'Verordnung', 'Baumaschinen über 18 kW', 'Maschinenpark, Subunternehmer', 'Werkhof / Bauführung', 'Maschinenliste, Startcheck'],
        ['Baulärm-Richtlinie / Richtlinie Luft', 'Vollzugshilfe', 'Massnahmenstufen gemäss Bewilligung', 'Projekte', 'Bauführung', 'AVOR-Checkliste'],
        ['VVEA (SR 814.600)', 'Verordnung', 'Entsorgungskonzept, Trennung', 'Projekte, Werkhof', 'Bauführung', 'Entsorgungsnachweise'],
        ['Kantonale Merkblätter (je Kanton)', 'Vollzugshilfe', 'Kantonale Besonderheiten', 'Projekte im Kanton', 'Umweltbeauftragte/r', 'jährliche Aktualisierung'],
        ['Interner Standard «Waschplatz»', 'Interner Standard', 'Waschplatz bei jeder Betonbaustelle', 'Hochbau', 'Bauführung', 'Begehungen'],
      ],
    },
    text: 'Projektspezifische Auflagen gehören in den Umweltmassnahmenplan bzw. die Auflagenmatrix des Projekts. Fassung und Prüfdatum je Zeile nachführen.',
    sources: ['iso14001', 'usg'],
  },
  {
    id: 'ms-kontrolle', category: 'massnahme', moduleId: 'm1',
    title: 'Leitfaden: Verhalten bei Behördenkontrollen',
    summary: 'Sechs Schritte für Vorarbeiter, Poliere und Bauführer.',
    tags: ['Kontrolle', 'Behörde', 'Vollzug', 'Inspektion'],
    text: `1. **Zutritt gewähren**, Person begleiten, Sicherheitsregeln erklären (PSA).
2. **Verantwortliche informieren** (Polier, Bauführer, Umweltfachperson).
3. **Sachlich Auskunft geben**, Unterlagen zeigen – nichts beschönigen, nichts verstecken, nichts «schnell aufräumen».
4. **Feststellungen notieren**, eigene Fotos, Fristen festhalten.
5. **Mängel beheben** und mit Fotos/Dokumenten belegen; fristgerecht melden.
6. **Ursachen analysieren** und Standard anpassen.

!> Beweise verändern oder Mängel vertuschen verschlimmert die Lage rechtlich und zerstört Vertrauen.`,
    sources: ['praxis'],
  },
  {
    id: 'cl-rueckbau', category: 'checkliste', moduleId: 'm3',
    title: 'Checkliste Rückbau und Bauschadstoffe',
    summary: 'Kontrolle vor und während Umbau- und Rückbauarbeiten an älteren Gebäuden.',
    tags: ['Rückbau', 'Asbest', 'PCB', 'Schadstoffe', 'Checkliste'],
    items: [
      { group: 'Vor Arbeitsbeginn', points: ['Schadstoffbericht vorhanden und gelesen (inkl. nicht untersuchte Bereiche)', 'Nicht untersuchte Bereiche ergänzend abgeklärt oder als Stopp-Punkt markiert', 'Sanierung vergeben (Asbest: Suva-anerkannte Firma) und gemeldet', 'Entsorgungskonzept mit Schadstoffmengen ergänzt', 'Alle Unternehmer instruiert (Unterschrift)'] },
      { group: 'Während der Arbeiten', points: ['Reihenfolge eingehalten: Sanierung → Freigabe → Entkernung → Tragstruktur', 'Belastete Bauteile gekennzeichnet', 'Sonderabfälle getrennt, beschriftet, unter Verschluss', 'Mulden ohne Fehlwürfe'] },
      { group: 'Bei Verdacht', points: ['Stoppen, Bereich sperren', 'Bauleitung und Bauherrschaft informieren', 'Probe durch Fachperson', 'Betroffene Mitarbeitende erfassen'] },
      { group: 'Nachweise', points: ['Begleitscheine vollständig', 'Freigaben nach Sanierung abgelegt', 'Entsorgungsbilanz nachgeführt'] },
    ],
    sources: ['suva-asbest', 'ekas6503', 'vvea', 'veva'],
  },
  {
    id: 'vl-entsorgungsbilanz', category: 'vorlage', moduleId: 'm3',
    title: 'Vorlage Entsorgungsbilanz',
    summary: 'Gegenüberstellung von Entsorgungskonzept und tatsächlichen Mengen je Fraktion.',
    tags: ['Entsorgungsbilanz', 'Nachweise', 'Kennzahlen', 'Vorlage'],
    table: {
      head: ['Fraktion', 'Konzept (t)', 'Ist (t)', 'Empfänger / Anlage', 'Weg (Verwertung, Verbrennung, Deponie Typ)', 'Nachweis', 'Abweichung / Begründung'],
      rows: [
        ['Betonabbruch', '', '', '', 'Verwertung', 'Waagscheine', ''],
        ['Mischabbruch', '', '', '', 'Verwertung', 'Waagscheine', ''],
        ['Ausbauasphalt ≤ 250 mg PAK/kg', '', '', '', 'Verwertung', 'Analyse, Waagscheine', ''],
        ['Ausbauasphalt > 250 mg PAK/kg', '', '', '', 'keine Verwertung', 'Analyse, Nachweis', ''],
        ['Unverschmutzter Aushub', '', '', '', 'Verwertung / Typ A', 'Lieferscheine', ''],
        ['Brennbare Abfälle / Holz', '', '', '', 'Verbrennung / Verwertung', 'Waagscheine', ''],
        ['Sonderabfälle (je Code)', '', '', '', 'berechtigter Entsorger', 'Begleitscheine', ''],
      ],
    },
    sources: ['vvea', 'veva'],
  },
  {
    id: 'cl-bodenschutz', category: 'checkliste', moduleId: 'm4',
    title: 'Bodenschutz-Startcheck',
    summary: 'Kurzcheck vor Baubeginn für Baustellen mit Eingriffen in unversiegelten Boden.',
    tags: ['Bodenschutz', 'Verdichtung', 'Depot', 'BBB', 'AVOR', 'Checkliste'],
    items: [
      { group: 'Grundlagen', points: ['Auflagen zum Boden aus der Bewilligung bekannt', 'Bodenschutzkonzept vorhanden (falls verlangt)', 'BBB beauftragt und Ansprechperson bekannt (falls verlangt)', 'Prüfperimeter/Kataster geprüft; Analysen vorhanden, wo nötig', 'Invasive Neophyten erfasst'] },
      { group: 'Installation', points: ['Pisten geplant (Kies auf Vlies), Lastwagen nur auf Pisten', 'Schutzflächen abgezäunt und beschriftet', 'Depotflächen festgelegt (getrennt Ober-/Unterboden)', 'Installationsplätze, Waschplatz, Tankstelle nicht auf Boden'] },
      { group: 'Ablauf', points: ['Befahrbarkeit: Messung und Freigabe geregelt', 'Ausweicharbeiten für Regentage bekannt', 'Regentage im Vertrag geregelt', 'Maschinenliste mit Gewicht/Fahrwerk'] },
      { group: 'Menschen und Nachweise', points: ['Startinstruktion inkl. Subunternehmer', 'Zustandsaufnahme mit Fotos (v. a. bei Kulturland)', 'Landwirte/Grundeigentümer informiert', 'Rekultivierung und Folgebewirtschaftung vorbereitet'] },
    ],
    sources: ['bafu-boden-bauen', 'kanton-boden', 'vvea'],
  },
  {
    id: 'cl-avor-umwelt', category: 'checkliste', moduleId: 'm8',
    title: 'Umweltcheck in der AVOR',
    summary: 'Kurzcheck vor Baustart: Bewilligung, Vertrag, Standort, Installation, Massnahmenplan.',
    tags: ['AVOR', 'Auflagen', 'Installationsplan', 'Massnahmenplan', 'Checkliste', 'Baustart'],
    items: [
      { group: 'Bewilligung', points: ['Bewilligung vollständig gelesen, inkl. Beilagen und Verweise auf Merkblätter', 'Nebenbewilligungen vorhanden (Wasserhaltung, Einleitung, Rodung, Nachtarbeit …)', 'Baufreigabe vorhanden (wo der Kanton eine solche kennt)', 'Auflagenliste mit Fundstelle und Rechtsnatur erstellt', 'Bei Merkblatt-Verweisen: Fassung und verbindliche Vorgaben geklärt', 'Unklarheiten und Widersprüche schriftlich gemeldet'] },
      { group: 'Go/No-Go vor Beginn der betreffenden Arbeit', points: ['Wasserhaltung: Bewilligung liegt vor', 'Einleitung: Zustimmung bzw. Bewilligung liegt vor', 'Schadstoffe: Sanierung gemäss Bericht, Meldung (falls meldepflichtig), Kontrolle und schriftliche Freigabe des Bereichs vor Rückbau', 'Bodenarbeiten: Freigabe gemäss Konzept bzw. BBB', 'Eingriffe in Wald, Hecken, Ufer: Bewilligung und Schonzeiten geklärt'] },
      { group: 'Vertrag', points: ['Umweltauflagen im LV abgebildet – Lücken in der Fragerunde geklärt bzw. nach Vertragsabschluss schriftlich angezeigt und Anspruch geprüft', 'Konzepte vorhanden (Entsorgung, Entwässerung, Boden, Schadstoffe)', 'Umweltpflichten an Subunternehmer weitergegeben'] },
      { group: 'Standort', points: ['Gewässerschutzkarte und Schutzzonen geprüft', 'Kataster belasteter Standorte geprüft', 'Schächte nach Kanalisationskataster markiert', 'Boden, Natur, Lärmempfindlichkeit der Umgebung geprüft', 'Je nach Projekt: Neophyten, Gewässerraum, Licht, Erschütterungen, Strassenbenützung, Störfallbetriebe in der Umgebung'] },
      { group: 'Installation und Ablauf', points: ['Betankung, Lager, Waschplatz weg von Schächten und Gewässern', 'Depots, Zwischenlager, Pisten eingeplant', 'Transportrouten und Materialbilanz', 'Massnahmenstufen Luft/Lärm in Verfahren, Maschinen und Zeiten übersetzt', 'Umweltbedingte Zeitfenster und Vorlaufzeiten im Terminplan'] },
      { group: 'Organisation', points: ['Umweltmassnahmenplan mit Funktion, Termin, Kontrolle, Nachweis', 'Umweltpunkt in der Startsitzung', 'Instruktion der Equipe und Subunternehmer geplant', 'Notfallorganisation festgelegt', 'Anwohnende informiert (falls verlangt)'] },
    ],
    sources: ['praxis', 'vvea', 'kanton-merkblatt', 'suva-asbest'],
  },
  {
    id: 'cl-umweltbegehung', category: 'checkliste', moduleId: 'm9',
    title: 'Ablauf einer Umweltbegehung',
    summary: 'Vorbereitung, Rundgang und Abschluss – für alle Umweltbereiche, auf die Bauphase zuzuschneiden.',
    tags: ['Begehung', 'Kontrolle', 'Checkliste', 'Eigenkontrolle', 'UBB'],
    items: [
      { group: 'Vorbereitung', points: ['Massnahmenplan und Auflagen der aktuellen Bauphase gelesen', 'Offene Massnahmen der letzten Begehung bekannt', 'Wetter der letzten Tage und heutige Arbeiten bekannt', 'Drei Schwerpunkte nach Risiko festgelegt', 'PSA dabei; beim Eintreffen beim Polier angemeldet'] },
      { group: 'Rundgang', points: ['Dem Wasser nach: vom höchsten Punkt bis zu Schacht bzw. Gewässer', 'Den Stoffen nach: Tankstelle, Lager, Waschplatz', 'Abfälle und Material: Mulden, Depots, Zwischenlager', 'Grenze: Nachbarn, Staub, Lärm, Strasse', 'Je Massnahme: vorhanden – angewendet – wirksam?', 'Leute an der Arbeit gefragt («Zeig mir, wie ihr das macht»)', 'Fotos: Übersicht und Detail, ohne erkennbare Personen'] },
      { group: 'Bei kritischem Befund', points: ['Eigenschutz', 'Quelle stoppen lassen', 'Ausbreitung verhindern', 'Polier bzw. Bauführung sofort holen; bei möglicher Gewässer- oder Bodenverschmutzung alarmieren', 'Erst danach dokumentieren'] },
      { group: 'Abschluss vor Ort', points: ['Feststellungen mit dem Polier besprochen', 'Massnahmen mit Funktion und Termin vereinbart', 'Positives genannt', 'Notiert, was nicht angeschaut wurde'] },
      { group: 'Nachbereitung', points: ['Bericht kurz und priorisiert, möglichst gleichentags', 'Massnahmenliste nachgeführt', 'Nachkontrolle terminiert', 'Wiederholungen erkannt und Ursache angesprochen'] },
    ],
    sources: ['praxis', 'bafu-ubb'],
  },
  {
    id: 'vl-massnahmenliste', category: 'vorlage', moduleId: 'm9',
    title: 'Vorlage Massnahmenliste (Nachverfolgung)',
    summary: 'Eine Liste je Baustelle: von der Feststellung bis zum wirksamen Abschluss.',
    tags: ['Massnahmenliste', 'Nachverfolgung', 'Vorlage', 'Korrekturmassnahme', 'Eskalation'],
    table: {
      head: ['Nr.', 'Datum', 'Feststellung', 'Einstufung', 'Massnahme (K = Korrektur, KM = Korrekturmassnahme)', 'Verantwortlich', 'Termin', 'Status', 'Nachkontrolle'],
      rows: [
        ['1', '…', 'Schacht 2 an der Zufahrt offen, Abdeckung zerbrochen', 'Abweichung, wiederholt', 'K: abdecken · KM: befahrbare Stahlplatte, Fahrspur markieren', 'Polier/in · Bauführer/in', '…', 'umgesetzt', 'nach 1 und 4 Wochen'],
        ['2', '…', 'Fässer des Subunternehmers ohne Auffangwanne am Graben', 'Abweichung', 'K: Wanne · KM: Umweltanforderungen im Subunternehmervertrag, Instruktion', 'Bauführer/in', '…', 'offen (Stufe 2)', '…'],
      ],
    },
    text: 'Status: offen – umgesetzt – wirksam abgeschlossen. Eine Massnahme wird erst geschlossen, wenn die Nachkontrolle zeigt, dass sie wirkt. Funktionen statt Namen; die Liste ist Traktandum jeder Baustellensitzung.',
    sources: ['praxis'],
  },
  {
    id: 'vl-umweltaspekte', category: 'vorlage', moduleId: 'm10',
    title: 'Vorlage Umweltaspekte-Bewertung (Bauunternehmung)',
    summary: 'Tabelle, um Tätigkeiten, Aspekte und Auswirkungen zu erfassen und die bedeutenden Aspekte zu bestimmen.',
    tags: ['Umweltaspekte', 'ISO 14001', 'Vorlage', 'Bewertung', 'Planung'],
    table: {
      head: ['Tätigkeit', 'Aspekt', 'Auswirkung', 'Zustand (normal / besonders / Notfall)', 'Schwere', 'Wahrscheinlichkeit', 'Rechtlich relevant', 'Bedeutend?', 'Steuerung (Standard, Checkliste)'],
      rows: [
        ['Betonarbeiten', 'Alkalisches Waschwasser', 'Gewässerschädigung', 'normal / besonders (Starkregen)', 'hoch', 'mittel', 'ja', 'ja', 'Standard Baustellenabwasser; AVOR-Checkliste'],
        ['Betankung', 'Treibstoffverlust', 'Boden- und Grundwasserverschmutzung', 'normal / Notfall', 'hoch', 'mittel', 'ja', 'ja', 'Standard Betankung; Notfallblatt'],
        ['Büro', 'Papierverbrauch', 'Ressourcenverbrauch', 'normal', 'tief', 'hoch', 'nein', 'nein', '–'],
      ],
    },
    text: 'Die Kriterien und Stufen legt die Firma fest; sie müssen nachvollziehbar sein. Beispielwerte ohne Anspruch auf Allgemeingültigkeit. Mit Leuten aus der Praxis erarbeiten und bei Änderungen, nach Ereignissen und in festem Rhythmus überprüfen.',
    sources: ['iso14001', 'praxis'],
  },
  {
    id: 'cl-internes-audit', category: 'checkliste', moduleId: 'm10',
    title: 'Internes Audit auf der Baustelle',
    summary: 'Ablauf und Leitfragen für ein internes Umweltaudit – mit Blick auf das System, nicht auf die Person.',
    tags: ['Audit', 'ISO 14001', 'Checkliste', 'Baustelle', 'Nachweise'],
    items: [
      { group: 'Vorbereitung', points: ['Ziel, Umfang und Kriterien festgelegt (Norm, eigene Vorgaben, Auflagen)', 'Auditor/in prüft nicht den eigenen Bereich', 'Ergebnisse früherer Audits und offene Korrekturmassnahmen gesichtet', 'Auditplan mit Zeiten und Gesprächspartnern verschickt'] },
      { group: 'Eröffnung', points: ['Zweck erklärt: System, nicht Person', 'Ablauf und Sicherheit geklärt'] },
      { group: 'Erheben', points: ['Einem Faden gefolgt: Anforderung → Umsetzung → Kontrolle → Nachweis', 'Auf der Baustelle beobachtet (vorhanden – angewendet – wirksam)', 'Offene Fragen gestellt, auch an Arbeiter und Subunternehmer', 'Nachweise mit Datum und Fundort notiert', 'Nichts nachträglich erstellen lassen'] },
      { group: 'Abschluss', points: ['Feststellungen als Anforderung – Nachweis – Bewertung vorgestellt', 'Fakten abgeglichen', 'Stärken genannt'] },
      { group: 'Nachbereitung', points: ['Kurzer Bericht', 'Korrektur und Korrekturmassnahmen durch die auditierte Stelle', 'Wirksamkeit geprüft', 'Ergebnisse in die Managementbewertung'] },
    ],
    sources: ['iso14001', 'iso19011', 'praxis'],
  },
  {
    id: 'cl-lager-gefahrstoffe', category: 'checkliste', moduleId: 'm7',
    title: 'Baustellenlager für wassergefährdende Stoffe',
    summary: 'Kurzcheck für Lager, Betankungs- und Abfüllplatz auf der Baustelle.',
    tags: ['Lagerung', 'Auffangwanne', 'Gefahrstoffe', 'Checkliste', 'Betankung', 'SDB'],
    items: [
      { group: 'Ort', points: ['Befestigte, dichte Fläche', 'Kein Schacht und kein Gefälle Richtung Schacht, Böschung oder Gewässer', 'Nicht in einer Grundwasserschutzzone (sonst Vorgaben prüfen)', 'Gegen Anfahren geschützt, abschliessbar'] },
      { group: 'Rückhalt', points: ['Alle Gebinde in Wanne bzw. doppelwandig', 'Wanne dicht, leer, überdacht', 'Volumen gemäss kantonalen Vorgaben'] },
      { group: 'Gebinde und Trennung', points: ['Gebinde geschlossen und beschriftet', 'Umgefülltes gekennzeichnet; keine Getränkeflaschen', 'Säuren, Laugen, Brennbares getrennt', 'Brennbares weg von Zündquellen; Gasflaschen stehend gesichert', 'Leere Gebinde verschlossen gelagert'] },
      { group: 'Umschlag', points: ['Abfüllen und Betanken nur über Rückhalt', 'Pumpe bzw. Auslaufhahn statt Kippen', 'Nie unbeaufsichtigt'] },
      { group: 'Information und Notfall', points: ['Stoffinventar aktuell', 'SDB vorhanden und zugänglich', 'Bindemittel und Schachtabdeckungen am Platz', 'Notfallblatt mit Nummern sichtbar'] },
    ],
    sources: ['kvu-lagerung', 'gschg', 'chemv'],
  },
  {
    id: 'cl-werkhofkontrolle', category: 'checkliste', moduleId: 'm7',
    title: 'Werkhofkontrolle Umwelt',
    summary: 'Periodische Kontrolle von Tankanlage, Waschplatz, Werkstatt, Lager, Rückschub und Nachweisen.',
    tags: ['Werkhof', 'Tankanlage', 'Ölabscheider', 'Kontrolle', 'Checkliste', 'Sonderabfall'],
    items: [
      { group: 'Tankanlage', points: ['Leckanzeige in Betrieb, keine Störung', 'Keine Ölspuren an Zapfsäule und Leitungen', 'Betankungsplatz dicht, entwässert über Abscheider', 'Nachweis der letzten Kontrolle vorhanden'] },
      { group: 'Waschplatz und Abscheider', points: ['Schlammfang und Abscheider nicht übervoll', 'Letzte Leerung mit Beleg', 'Nur abscheiderverträgliche Reiniger', 'Kein Waschen ausserhalb des Platzes', 'Einleitbewilligung vorhanden'] },
      { group: 'Werkstatt und Lager', points: ['Altöl in geschlossenen Behältern in Wanne', 'Filter, Batterien, Lappen getrennt gesammelt', 'Lager wie Baustellenlager (Checkliste)', 'Stoffinventar aktuell'] },
      { group: 'Rückschub und Abfälle', points: ['Gebinde nur mit Etikett und Herkunft angenommen', 'Unbekanntes gesichert und gemeldet', 'Sonderabfälle mit Begleitschein entsorgt'] },
      { group: 'Entwässerung und Notfall', points: ['Schächte sauber, Platzwasser verschmutzter Flächen behandelt', 'Notfallmaterial an Tankstelle, Waschplatz, Lager', 'Notfallblatt aktuell'] },
      { group: 'Organisation', points: ['Verantwortliche/r und Stellvertretung bestimmt', 'Jahresplan mit allen Fristen', 'Ablage mit Bewilligungen, Kontrollen, Belegen', 'Offene Massnahmen aus letzter Kontrolle erledigt'] },
    ],
    sources: ['gschg', 'kvu-lagerung', 'veva', 'praxis'],
  },
  {
    id: 'cl-luft-baustelle', category: 'checkliste', moduleId: 'm5',
    title: 'Luftreinhaltung auf der Baustelle',
    summary: 'Kurzcheck für Staub, Maschinen und Transporte – für Stufe A und B auf die Bauphase zuschneiden.',
    tags: ['Luft', 'Staub', 'Partikelfilter', 'Massnahmenstufe', 'Checkliste', 'Transporte'],
    items: [
      { group: 'Grundlagen', points: ['Angeordnete Stufe bekannt (A/B)', 'Luftkonzept nach Phasen vorhanden', 'Massnahmen im LV bzw. Lücken gemeldet', 'Ansprechperson für Anwohnende auf der Bautafel'] },
      { group: 'Staub', points: ['Staubintensive Arbeiten nass oder mit Absaugung', 'Benetzung funktioniert (Sprühnebel), Abwasser nicht in Meteorschächte', 'Abschirmung zur empfindlichen Seite', 'Schüttgut und Mulden abgedeckt', 'Pisten befestigt bzw. befeuchtet, Tempo begrenzt', 'Reinigung nass, kein Laubbläser'] },
      { group: 'Maschinen', points: ['Maschinenliste mit Nachweisen, auch Miete und Subunternehmer', 'Nachweis vor dem ersten Einsatz geprüft', 'Motoren aus bei Wartezeiten', 'Elektrische Alternativen genutzt, wo Baustrom vorhanden', 'Kleingeräte mit Alkylatbenzin oder elektrisch'] },
      { group: 'Transporte', points: ['Fahrten minimiert (Verwertung vor Ort, Bündelung)', 'Wartezone auf dem Areal', 'Reifenreinigung und Strassenreinigung', 'Ladung abgedeckt'] },
      { group: 'Kontrolle', points: ['Blick über die Grundstücksgrenze und auf die Strasse', 'Bei Ausfall einer Massnahme: staubintensive Arbeit unterbrechen', 'Beschwerden aufgenommen und beantwortet', 'Kein offenes Verbrennen'] },
    ],
    sources: ['bafu-luft', 'lrv', 'praxis'],
  },
];

export const LIB_CATEGORY_LABEL: Record<LibraryEntry['category'], string> = {
  checkliste: 'Checkliste',
  vorlage: 'Vorlage',
  matrix: 'Verantwortlichkeitsmatrix',
  problem: 'Häufiges Problem',
  massnahme: 'Schutzmassnahme',
  recht: 'Rechtsgrundlage',
};
