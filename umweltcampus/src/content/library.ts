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

**Massnahmen**: Fremdwasser fernhalten, Container in Serie, Schlammentnahme mit Zuständigkeit, Notfallregel «bei Trübung abstellen», Grube als Puffer.`,
    sources: ['kanton-merkblatt', 'praxis'],
  },
  {
    id: 'ms-sofort-oel', category: 'massnahme', moduleId: 'm2',
    title: 'Sofortmassnahmen bei Öl- oder Treibstoffaustritt',
    summary: 'Ablauf für die ersten Minuten.',
    tags: ['Havarie', 'Öl', 'Notfall', 'Sofortmassnahmen', 'Alarmierung', '118', '117'],
    text: `1. **Eigene Sicherheit**: Zündquellen, Dämpfe, Maschinen.
2. **Stoppen**: Maschine abstellen, Leck abdichten, Gebinde aufrichten.
3. **Eindämmen**: Schächte abdecken, Bindemittel, Erddamm.
4. **Alarmieren**: bei Gefahr für Gewässer, Kanalisation oder Untergrund **118** oder **117**; intern nach Alarmplan.
5. **Aufnehmen und entsorgen**: als Sonderabfall, mit Nachweis.
6. **Dokumentieren**: Zeiten, Mengen, Fotos, Massnahmen, Meldungen.

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
];

export const LIB_CATEGORY_LABEL: Record<LibraryEntry['category'], string> = {
  checkliste: 'Checkliste',
  vorlage: 'Vorlage',
  matrix: 'Verantwortlichkeitsmatrix',
  problem: 'Häufiges Problem',
  massnahme: 'Schutzmassnahme',
  recht: 'Rechtsgrundlage',
};
