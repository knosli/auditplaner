import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm6';

// ---------- Baustellenaufgaben (fiktive Daten) ----------
export const M6_SITETASKS: SiteTask[] = [
  {
    id: 'm6-t1', moduleId: M, topic: 'm6-grundlagen', level: 2, setting: 'Hochbau',
    title: 'Lärmquellen und Betroffene',
    situation: 'Ersatzneubau (fiktiv) eines Mehrfamilienhauses in einer Wohnzone. Nachbarn: Wohnhäuser auf drei Seiten (6–20 m), eine Kita gegenüber, eine Arztpraxis im Erdgeschoss nebenan.',
    data: [
      'Phasen: Rückbau, Baugrube mit Verbau, Rohbau, Ausbau, Umgebung',
      'Geplant: Abbauhammer, Bagger mit Zange, Spundwand (geschlagen), Kran, Betonpumpe, Kompressor, Trennscheiben',
      'Bewilligung: Stufe B Baulärm',
    ],
    assignment: 'Listen Sie die Lärmquellen je Phase, die Betroffenen mit ihren empfindlichen Zeiten und je Quelle eine Massnahme an der Quelle.',
    rubric: [
      { id: 'k1', text: 'Lärmquellen je Phase vollständig, besonders lärmige markiert', keywords: ['hammer', 'spundwand', 'rammen', 'trennscheibe', 'kompressor'] },
      { id: 'k2', text: 'Betroffene mit empfindlichen Zeiten (Kita: Schlaf, Praxis: Sprechstunden)', keywords: ['kita', 'praxis', 'schlaf', 'mittag', 'sprechstunde'] },
      { id: 'k3', text: 'Verfahren an der Quelle (Zange, Bohren, Säge, elektrisch)', keywords: ['zange', 'bohr', 'säge', 'elektrisch'] },
      { id: 'k4', text: 'Abschirmung und Standorte (Kompressor, Mulden)', keywords: ['abschirm', 'standort', 'container', 'wand'] },
      { id: 'k5', text: 'Zeitfenster und Information', keywords: ['zeitfenster', 'information', 'absprache'] },
    ],
    solution: `| Phase | Lärmquelle | Massnahme an der Quelle | Weitere Massnahmen |
|---|---|---|---|
| Rückbau | Abbauhammer (**besonders lärmig**), Zange, Umschlag | Zange und Säge statt Hammer, wo möglich | Abschirmung zur Kita; Zeitfenster |
| Baugrube | Spundwand schlagen (**besonders lärmig**, Erschütterungen) | Bohrpfahlwand bzw. Einpressen prüfen (Geotechnik) | Zustandsaufnahme Nachbarn (Lektion 4) |
| Rohbau | Kran, Pumpe, Kompressor | Kran und Kompressor elektrisch; Kompressor hinter Container | Pumpe nicht vor Arbeitsbeginn |
| Ausbau | Trennscheiben, Kernbohren | Wandsäge, Nassbohren, Einhausung | Zeitfenster |
| Umgebung | Rüttelplatte | Kleine Geräte nahe Gebäuden | – |

**Betroffene**: Kita (Mittagsschlaf, Spielzeiten im Freien) → besonders lärmige Arbeiten nicht über Mittag; Arztpraxis (Sprechstunden) → Absprache über ruhigere Zeiten; Wohnungen (früh, abends, Samstag) → Reglement einhalten.

**Information**: Flyer vor Baubeginn, persönliche Gespräche mit Kita und Praxis, Ansprechperson auf der Bautafel.`,
    sources: ['bafu-baulaerm', 'lsv', 'praxis'],
  },
  {
    id: 'm6-t2', moduleId: M, topic: 'm6-massnahmen', level: 2, setting: 'Hochbau',
    title: 'Lärmmassnahmen für einen Abbruch',
    situation: 'Abbruch eines zweigeschossigen Gewerbebaus (fiktiv), 8 m neben einem dreigeschossigen Wohnhaus. Bewilligung: Stufe B.',
    data: [
      'Stahlbeton mit Mauerwerk; Bagger mit Zange verfügbar, Abbauhammer für Fundamente',
      'Platz für Mulden auf zwei Seiten (Wohnseite oder Strassenseite)',
      'Rückfahrwarner mit Piepton an allen Maschinen',
      'Kompressor diesel, Baustrom ab Woche 2',
    ],
    assignment: 'Legen Sie die Massnahmen fest: Verfahren, Maschinen, Abschirmung, Standorte, Zeiten, Verhalten.',
    rubric: [
      { id: 'k1', text: 'Zange statt Hammer; Hammer nur für Fundamente in Zeitfenstern', keywords: ['zange', 'hammer', 'fundament', 'zeitfenster'] },
      { id: 'k2', text: 'Mulden auf Strassenseite, kleine Abwurfhöhe, Gummiauflage', keywords: ['mulde', 'strassenseite', 'abwurf', 'gummi'] },
      { id: 'k3', text: 'Abschirmung zur Wohnseite, dicht, ausreichend hoch – Grenzen bei oberen Geschossen', keywords: ['abschirm', 'wand', 'dicht', 'geschoss'] },
      { id: 'k4', text: 'Kompressor elektrisch ab Baustrom, bis dahin weg von Wohnungen', keywords: ['kompressor', 'elektrisch', 'baustrom'] },
      { id: 'k5', text: 'Breitband-Warner (mit Arbeitssicherheit), Verhalten (Motor aus, nicht werfen)', keywords: ['breitband', 'warner', 'motor aus', 'werfen'] },
    ],
    solution: `- **Verfahren**: Abbruch mit Zange von oben nach unten; Abbauhammer nur für Fundamente, gebündelt in festen Zeitfenstern ausserhalb der Mittagszeit.
- **Mulden**: auf der Strassenseite, Gummimatten in den Mulden, kleine Abwurfhöhe.
- **Abschirmung**: mobile Lärmschutzelemente bzw. Container zur Wohnseite, dicht gestellt; sie schützen vor allem Erdgeschoss und 1. OG – für das 2. OG zählen Verfahren und Zeiten.
- **Maschinen**: Kompressor ab Woche 2 elektrisch; in Woche 1 auf der Strassenseite hinter Container; Motoren aus bei Pausen.
- **Rückfahrwarner**: mit Arbeitssicherheit und Vermieter klären, ob Breitband-Warner eingesetzt werden können; Fahrwege mit wenig Rückwärtsfahren.
- **Verhalten**: Material nicht werfen, keine Radios, kein Warmlaufen vor Arbeitsbeginn.
- **Information**: Flyer mit lauten Tagen und Ansprechperson.`,
    sources: ['bafu-baulaerm', 'suva-laerm', 'praxis'],
  },
  {
    id: 'm6-t3', moduleId: M, topic: 'm6-planung', level: 2, setting: 'Hochbau',
    title: 'Lärmschutzkonzept neben einem Spital',
    situation: 'Neubau eines Bettentrakts (fiktiv) auf dem Areal eines Spitals im Betrieb. Bewilligung: Stufe C für die Baugrube, Stufe B übrige Phasen.',
    data: [
      'Patientenzimmer 30 m von der Baugrube; Operationstrakt 60 m (erschütterungsempfindlich)',
      'Verbau: Bohrpfähle; Aushub mit Abtransport über die Spitalzufahrt',
      'Spital: Ruhezeiten 12–14 Uhr und ab 20 Uhr; Notfallzufahrt muss jederzeit frei bleiben',
      'Gemeindereglement: übliche Arbeitszeiten werktags',
    ],
    assignment: 'Erstellen Sie ein Lärmschutzkonzept (Phase, Tätigkeit, Massnahme, Zeit, Verantwortlich) und nennen Sie, was mit dem Spital vereinbart werden muss.',
    rubric: [
      { id: 'k1', text: 'Konzept nach Phasen mit besonders lärmigen Arbeiten in Zeitfenstern ausserhalb der Spital-Ruhezeiten', keywords: ['phase', 'zeitfenster', 'ruhezeit', '12', '14'] },
      { id: 'k2', text: 'Erschütterungen OP-Trakt: Messung, Schwellen mit Fachleuten', keywords: ['erschütter', 'op', 'messung', 'fachleute'] },
      { id: 'k3', text: 'Transporte: Notfallzufahrt frei, Wartezone, Motor aus', keywords: ['notfall', 'zufahrt', 'wartezone', 'motor aus'] },
      { id: 'k4', text: 'Maschinen elektrisch/lärmarm; Abschirmung', keywords: ['elektrisch', 'lärmarm', 'abschirm'] },
      { id: 'k5', text: 'Vereinbarung mit Spital: Ansprechpersonen, Information, Meldeweg', keywords: ['spital', 'ansprechperson', 'vereinbar', 'meldeweg'] },
    ],
    solution: `| Phase | Tätigkeit | Massnahme | Zeit | Verantwortlich |
|---|---|---|---|---|
| Baugrube (Stufe C) | Bohrpfähle, Aushub | Bohrgerät mit Schalldämpfung, Abschirmung zur Bettenseite | besonders lärmige Arbeiten nicht 12–14 Uhr | Polier/in |
| Baugrube | Transporte | Wartezone abseits der Notfallzufahrt, Motor aus, keine Rückwärtsfahrten an der Bettenseite | Anlieferungen ausserhalb Besuchszeiten | Bauführer/in |
| Rohbau | Kran, Pumpe, Schalung | Kran elektrisch, Pumpe hinter Abschirmung, Schalung ablegen | Betonagen planen und ankündigen | Polier/in |
| Ausbau | Bohren, Schneiden | Nass, Einhausung | in Zeitfenstern | Subunternehmer, Polier/in |

**Erschütterungen**: Fachperson legt Messorte und Schwellen am Operationstrakt fest; Alarm an Polier und Spitaltechnik; bei Überschreitung Unterbruch.

**Vereinbarung mit dem Spital**: Ansprechpersonen beidseitig, Wochenplan der lauten Arbeiten, Meldeweg bei Störungen (auch kurzfristig, z. B. bei heiklen Operationen), Notfallzufahrt, Information der Patienten.`,
    sources: ['bafu-baulaerm', 'sn640312', 'kanton-laerm', 'praxis'],
  },
  {
    id: 'm6-t4', moduleId: M, topic: 'm6-erschuetterung', level: 3, setting: 'Tiefbau',
    title: 'Erschütterungsvorsorge für eine Baugrube',
    situation: 'Baugrube (fiktiv) für eine Tiefgarage, 5 m neben einem denkmalgeschützten Wohnhaus aus dem 19. Jahrhundert und 12 m neben einem modernen Geschäftshaus.',
    data: [
      'Verbau: Spundwand vorgesehen (Variante Vibrieren); Verdichtung mit Vibrowalze',
      'Baugrund: weiche, wassergesättigte Schichten über Molasse',
      'Eigentümer des Altbaus besorgt; Geschäftshaus hat Server im Untergeschoss',
    ],
    assignment: 'Planen Sie die Erschütterungsvorsorge: Verfahren, Zustandsaufnahme, Messprogramm, Reaktionsplan, Information.',
    rubric: [
      { id: 'k1', text: 'Verfahren mit Fachleuten prüfen (Bohren, Einpressen, resonanzfrei)', keywords: ['bohr', 'einpress', 'resonanz', 'geotechn', 'fachleute'] },
      { id: 'k2', text: 'Zustandsaufnahme beider Gebäude vor Baubeginn, neutrale Fachperson', keywords: ['zustandsaufnahme', 'neutral', 'vor baubeginn', 'rissmarke'] },
      { id: 'k3', text: 'Messprogramm mit Schwellen aus Norm/Gutachten', keywords: ['messung', 'schwelle', 'norm', 'gutachten'] },
      { id: 'k4', text: 'Reaktionsplan bei Überschreitung', keywords: ['alarm', 'unterbr', 'reaktion', 'anpass'] },
      { id: 'k5', text: 'Information Eigentümer, empfindliche Nutzung (Server)', keywords: ['information', 'eigentümer', 'server', 'empfindlich'] },
    ],
    solution: `1. **Verfahren**: Mit Geotechniker und Erschütterungsfachperson prüfen, ob Bohrpfähle oder eingepresste Spundbohlen statt Vibrieren möglich sind; falls vibriert wird: Gerät mit resonanzfreiem An- und Auslauf. Verdichtung im Nahbereich des Altbaus ohne Vibration bzw. mit kleinen Geräten.
2. **Zustandsaufnahme**: Vor Baubeginn beide Gebäude innen und aussen durch neutrale Fachperson, Rissmarken am Altbau, Protokoll mit den Eigentümern; Denkmalpflege informieren.
3. **Messprogramm**: Messstellen am Fundament beider Gebäude während Verbau und Verdichtung; Schwellen nach SN 640 312a bzw. Gutachten (Altbau: empfindliche Kategorie); Messung im Serverraum nach Angaben des Betreibers.
4. **Reaktionsplan**: Bei Warnschwelle Information an Polier und Fachperson; bei Alarmschwelle sofortiger Unterbruch, Ursache klären, Verfahren anpassen.
5. **Information**: Eigentümer und Mieter vor Beginn (Ablauf, Messungen, Ansprechperson); Betreiber des Servers über kritische Tage.
6. **Abschluss**: Schlussaufnahme nach Fertigstellung des Verbaus.`,
    sources: ['sn640312', 'praxis'],
  },
  {
    id: 'm6-t5', moduleId: M, topic: 'm6-kommunikation', level: 3, setting: 'Hochbau',
    title: 'Informationsplan für einen Rückbau',
    situation: 'Rückbau (fiktiv) einer Fabrikhalle in einem Wohnquartier, Dauer drei Monate, danach Neubau. Etwa 60 Haushalte in der Umgebung, eine Primarschule in 80 m.',
    data: [
      'Besonders lärmige Phasen: Abbruch Hallendach (2 Wochen), Fundamente (2 Wochen), Brechen von Beton vor Ort (1 Woche)',
      'Bauherrschaft wünscht, dass die Unternehmung die Information übernimmt',
      'Bisher keine Kontakte zur Nachbarschaft',
    ],
    assignment: 'Erstellen Sie einen Informationsplan: was, wann, wie, durch wen – inklusive Umgang mit Beschwerden.',
    rubric: [
      { id: 'k1', text: 'Information vor Baubeginn (Flyer/Infoanlass) mit Phasen, Zeiten, Massnahmen, Ansprechperson', keywords: ['vor baubeginn', 'flyer', 'phase', 'ansprechperson'] },
      { id: 'k2', text: 'Laufende Information vor besonders lauten Phasen', keywords: ['vor', 'laut', 'hinweis', 'aktualis'] },
      { id: 'k3', text: 'Persönliches Gespräch mit der Schule', keywords: ['schule', 'gespräch', 'prüfung', 'pausen'] },
      { id: 'k4', text: 'Beschwerdeablauf mit Dokumentation und Rückmeldung', keywords: ['beschwerde', 'aufnehm', 'rückmeld', 'dokument'] },
      { id: 'k5', text: 'Rollen mit Bauherrschaft abgestimmt; ehrliche Formulierungen', keywords: ['bauherr', 'abgestimmt', 'ehrlich', 'freigabe'] },
    ],
    solution: `| Wann | Was | Wie | Wer |
|---|---|---|---|
| 3 Wochen vor Beginn | Projekt, Dauer, laute Phasen, Massnahmen (Zange, Abschirmung, Bedüsung beim Brecher), Arbeitszeiten, Ansprechperson | Flyer an 60 Haushalte, Aushang an der Bautafel | Unternehmung (Text von der Bauherrschaft freigegeben) |
| 2 Wochen vor Beginn | Gespräch mit Schulleitung: Prüfungstermine, Pausen, Schulweg | persönlich | Bauführer/in, Umweltfachperson |
| 1 Woche vor Beginn | Infoabend (optional, bei grossem Interesse) | Gemeindesaal | Bauherrschaft und Unternehmung |
| Vor jeder lauten Phase | Hinweis mit Daten und Zeiten | Aushang, E-Mail-Liste (freiwillig) | Polier/in |
| Laufend | Beschwerden: aufnehmen, am selben Tag prüfen, handeln oder erklären, zurückmelden, dokumentieren | Telefon, E-Mail | Ansprechperson |
| Nach Abschluss | Dank und Ausblick auf den Neubau | Flyer | Bauherrschaft |

**Grundsätze**: ehrlich formulieren («sehr laut zwischen 8 und 11 Uhr»), keine Versprechen, die nicht zu halten sind; Beschwerdeliste wöchentlich auswerten; Medienanfragen an die Bauherrschaft.`,
    sources: ['bafu-baulaerm', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M6_TASKS: PracticeTask[] = [
  { id: 'm6-p1', moduleId: M, topic: 'm6-grundlagen', title: 'Lärm- und Zeitvorschriften für einen Standort',
    goal: 'Die für eine reale Baustelle geltenden Lärmvorschriften zusammentragen.',
    steps: ['Suchen Sie in der Bewilligung die Massnahmenstufe und Auflagen zum Lärm.', 'Beschaffen Sie das Reglement der Gemeinde mit Arbeits- und Ruhezeiten.', 'Erfassen Sie die empfindlichen Nachbarn (Schulen, Heime, Praxen).', 'Fassen Sie alles auf einer Seite für den Polier zusammen.'],
    deliverable: 'Einseitige Übersicht «Lärm auf dieser Baustelle».',
    criteria: ['Stufe und Auflagen korrekt', 'Zeitvorschriften mit Quelle', 'Empfindliche Nachbarn erfasst', 'Für den Polier verständlich'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm6-p2', moduleId: M, topic: 'm6-massnahmen', title: 'Lärmrundgang',
    goal: 'Vermeidbaren Lärm auf einer Baustelle erkennen und reduzieren.',
    steps: ['Gehen Sie zu Arbeitsbeginn und in der Mittagszeit über die Baustelle.', 'Notieren Sie Lärmquellen, die vermeidbar sind (Leerlauf, Werfen, Warmlaufen, Radios, defekte Schalldämpfer).', 'Prüfen Sie Abschirmungen auf Dichtheit.', 'Vereinbaren Sie Verbesserungen mit dem Polier.'],
    deliverable: 'Liste vermeidbarer Lärmquellen und vereinbarter Massnahmen.',
    criteria: ['Zu kritischen Zeiten beobachtet', 'Vermeidbares erkannt', 'Massnahmen vereinbart', 'Nachkontrolle'], confirmer: 'Polier/in' },
  { id: 'm6-p3', moduleId: M, topic: 'm6-planung', title: 'Lärmschutzkonzept erstellen',
    goal: 'Für ein reales Projekt ein Lärmschutzkonzept nach Phasen erstellen.',
    steps: ['Wählen Sie ein Projekt mit angeordneter Stufe.', 'Erstellen Sie das Konzept nach Lektion 3.', 'Gleichen Sie es mit LV und Terminplan ab.', 'Stellen Sie es an der Startsitzung vor.'],
    deliverable: 'Lärmschutzkonzept und Liste der offenen Punkte.',
    criteria: ['Phasen vollständig', 'Massnahmen passend', 'Zeiten mit Quelle', 'Vorgestellt'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm6-p4', moduleId: M, topic: 'm6-erschuetterung', title: 'Erschütterungsrisiko prüfen',
    goal: 'Für ein kommendes Projekt das Erschütterungsrisiko einschätzen lassen.',
    steps: ['Erfassen Sie erschütterungsintensive Arbeiten und Nachbargebäude (Alter, Zustand, Nutzung, Abstand).', 'Klären Sie mit der Bauleitung, ob Zustandsaufnahmen und Messungen vorgesehen sind.', 'Schlagen Sie bei Bedarf den Beizug einer Fachperson vor.', 'Halten Sie den Entscheid fest.'],
    deliverable: 'Kurze Risikoeinschätzung mit Entscheid.',
    criteria: ['Arbeiten und Gebäude erfasst', 'Zustandsaufnahme geklärt', 'Fachperson bei Bedarf', 'Entscheid dokumentiert'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm6-p5', moduleId: M, topic: 'm6-kommunikation', title: 'Beschwerdeliste führen und auswerten',
    goal: 'Beschwerden auf einer Baustelle systematisch bearbeiten und Muster erkennen.',
    steps: ['Führen Sie während eines Monats eine Beschwerdeliste (Datum, Inhalt, Befund, Massnahme, Rückmeldung).', 'Prüfen Sie jede Beschwerde vor Ort.', 'Werten Sie die Liste aus: Zeiten, Quellen, Wiederholungen.', 'Leiten Sie zwei Verbesserungen ab und setzen Sie sie um.'],
    deliverable: 'Beschwerdeliste mit Auswertung und zwei umgesetzten Verbesserungen.',
    criteria: ['Liste vollständig', 'Rückmeldungen erfolgt', 'Muster erkannt', 'Verbesserungen umgesetzt'], confirmer: 'Bauführer/in' },
];

// ---------- Feynman ----------
export const M6_FEYNMAN: FeynmanTask[] = [
  { id: 'm6-f1', moduleId: M, topic: 'm6-kommunikation', audience: 'Polier',
    prompt: 'Erklären Sie einem Polier in 5–7 Sätzen, warum er eine Anwohnerin, die sich beschwert, nicht mit «Wir halten alles ein» abwimmeln soll – und was er stattdessen tut.',
    rubric: [
      { id: 'f1', text: 'Beschwerde ernst nehmen, zuhören', keywords: ['zuhören', 'ernst', 'verständnis'] },
      { id: 'f2', text: 'Prüfen, ob doch ein Fehler vorliegt', keywords: ['prüfen', 'fehler', 'vor ort'] },
      { id: 'f3', text: 'Rückmelden, was getan wird', keywords: ['rückmeld', 'zurückrufen', 'sagen'] },
      { id: 'f4', text: 'Nutzen: weniger Eskalation, Ruhe auf der Baustelle', keywords: ['eskal', 'ruhe', 'gemeinde', 'weniger'] },
      { id: 'f5', text: 'Praktisch, ohne Fachjargon', keywords: [] },
    ] },
  { id: 'm6-f2', moduleId: M, topic: 'm6-grundlagen', audience: 'Maschinist',
    prompt: 'Erklären Sie einem Maschinisten in 5–7 Sätzen, warum zwei Abbauhammer nicht doppelt so laut sind wie einer – und warum die Zange trotzdem besser ist.',
    rubric: [
      { id: 'f1', text: 'Zwei gleiche Quellen ≈ +3 dB, nicht doppelt', keywords: ['3 db', 'nicht doppelt', 'drei'] },
      { id: 'f2', text: 'Doppelt so laut empfunden ≈ +10 dB', keywords: ['10 db', 'doppelt so laut', 'zehn'] },
      { id: 'f3', text: 'Dauer zählt auch', keywords: ['dauer', 'länger', 'woche'] },
      { id: 'f4', text: 'Zange vermeidet Schläge an der Quelle', keywords: ['zange', 'quelle', 'schläge'] },
      { id: 'f5', text: 'Gehör der eigenen Leute', keywords: ['gehör', 'ohren', 'gehörschutz'] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M6_CARDS: Card[] = [
  { id: 'm6-c01', moduleId: M, topic: 'm6-grundlagen', level: 1, front: 'Zwei gleich laute Quellen?', back: 'Etwa **+3 dB** – nicht doppelt so laut. «Doppelt so laut» empfunden: etwa **+10 dB**.', sources: ['praxis'] },
  { id: 'm6-c02', moduleId: M, topic: 'm6-grundlagen', level: 1, front: 'Doppelter Abstand (Freifeld)?', back: 'Etwa **–6 dB** bei einer Punktquelle.', sources: ['praxis'] },
  { id: 'm6-c03', moduleId: M, topic: 'm6-grundlagen', level: 1, front: 'Grenzwerte für Baulärm?', back: '**Keine.** Massnahmen nach **Baulärm-Richtlinie** (Art. 6 LSV) + kommunale **Zeitvorschriften**.', sources: ['lsv', 'bafu-baulaerm'] },
  { id: 'm6-c04', moduleId: M, topic: 'm6-grundlagen', level: 1, front: 'Stufen Baulärm?', back: 'Bauarbeiten **A, B, C**; Bautransporte **A, B**.', sources: ['bafu-baulaerm'] },
  { id: 'm6-c05', moduleId: M, topic: 'm6-massnahmen', level: 1, front: 'Wirksamste Lärmmassnahme?', back: '**Leiseres Verfahren**: bohren statt rammen, Zange statt Hammer, Säge statt Trennscheibe.', sources: ['bafu-baulaerm'] },
  { id: 'm6-c06', moduleId: M, topic: 'm6-massnahmen', level: 1, front: 'Drei Arten von Massnahmen?', back: '**Baulich** (Abschirmung), **betrieblich** (Zeiten, Verfahren, Verhalten), **technisch** (lärmarme Maschinen) – plus **Information**.', sources: ['bafu-baulaerm'] },
  { id: 'm6-c07', moduleId: M, topic: 'm6-massnahmen', level: 2, front: 'Lärmschutzwand – wo und wie?', back: 'Nah an **Quelle** oder **Betroffenen**, **dicht**, Sichtverbindung unterbrochen. Begrenzte Wirkung für obere Geschosse.', sources: ['bafu-baulaerm'] },
  { id: 'm6-c08', moduleId: M, topic: 'm6-massnahmen', level: 2, front: 'Rückfahrwarner stört?', back: 'Mit Arbeitssicherheit: **Breitband-Warner** und Fahrwege mit wenig **Rückwärtsfahren**.', sources: ['suva-laerm'] },
  { id: 'm6-c09', moduleId: M, topic: 'm6-planung', level: 1, front: 'Wo stehen Arbeits- und Ruhezeiten?', back: '**Kommunale/kantonale** Vorschriften und **Bewilligung** – je Standort prüfen.', sources: ['kanton-laerm'] },
  { id: 'm6-c10', moduleId: M, topic: 'm6-planung', level: 1, front: 'Nacht- oder Wochenendarbeit?', back: '**Ausnahmebewilligung** mit Begründung, Massnahmen, Information – rechtzeitig. Verzug ist selten ein Grund.', sources: ['kanton-laerm'] },
  { id: 'm6-c11', moduleId: M, topic: 'm6-planung', level: 2, front: 'Lärmschutzkonzept?', back: 'Je **Phase**: lärmige Tätigkeit, **Massnahme**, **Zeit**, Verantwortung, Kontrolle → Massnahmenplan.', sources: ['bafu-baulaerm'] },
  { id: 'm6-c12', moduleId: M, topic: 'm6-erschuetterung', level: 1, front: 'Erschütterungsquellen?', back: '**Rammen**, **Vibrieren**, **Verdichten**, Abbruch, schwerer Verkehr, Sprengen.', sources: ['sn640312'] },
  { id: 'm6-c13', moduleId: M, topic: 'm6-erschuetterung', level: 1, front: 'Zustandsaufnahme wozu?', back: 'Zustand **vor** den Arbeiten belegen – damit klar ist, was neu ist. Schützt **beide Seiten**.', sources: ['praxis'] },
  { id: 'm6-c14', moduleId: M, topic: 'm6-erschuetterung', level: 2, front: 'Messprogramm – was festlegen?', back: '**Messorte**, **Schwellen** (Norm/Gutachten), **wer** alarmiert wird, **was** dann geschieht.', sources: ['sn640312'] },
  { id: 'm6-c15', moduleId: M, topic: 'm6-erschuetterung', level: 2, front: 'Neuer Riss gemeldet?', back: '**Aufnehmen**, Fachperson und **Versicherung**, Verfahren prüfen – **nicht abstreiten, nicht zusagen**.', sources: ['praxis'] },
  { id: 'm6-c16', moduleId: M, topic: 'm6-kommunikation', level: 1, front: 'Gute Information enthält?', back: '**Was**, **wann laut**, **wie lange**, **was wird getan**, **wer erreichbar**.', sources: ['bafu-baulaerm'] },
  { id: 'm6-c17', moduleId: M, topic: 'm6-kommunikation', level: 1, front: 'Beschwerdeablauf?', back: '**Aufnehmen – prüfen – handeln/erklären – zurückmelden – dokumentieren.**', sources: ['praxis'] },
  { id: 'm6-c18', moduleId: M, topic: 'm6-kommunikation', level: 2, front: '«Wir halten alles ein»?', back: 'Eine **Feststellung**, keine **Antwort**. Zuhören, prüfen, informieren.', sources: ['praxis'] },
];

// ---------- Simulation (ersetzt den Platzhalter sim-c) ----------
export const M6_SCENARIO: Scenario = {
  id: 'sim-c', code: 'C', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Lärmbeschwerden beim Rückbau im Wohngebiet',
  setting: 'Rückbau', level: 3, minutes: 20,
  topics: ['m6-massnahmen', 'm6-planung', 'm6-kommunikation'],
  intro: 'Rückbau eines Gewerbebaus (fiktiv) in einem Wohnquartier. Die Bewilligung ordnet Baulärm-Stufe B an; das Gemeindereglement erlaubt lärmige Arbeiten werktags zu den üblichen Zeiten. Nach zwei Wochen ruft die Gemeinde an: Es seien 15 Beschwerden eingegangen, und für Montag sei ein Termin vor Ort angesetzt.',
  facts: [
    'Abbruch mit Bagger und Abbauhammer; eine Zange ist auf der Baustelle, wird aber selten eingesetzt.',
    'Der Kompressor (Diesel) steht an der Grundstücksgrenze zu den Wohnhäusern.',
    'Eine Information an die Nachbarschaft gab es nicht; an der Bautafel steht keine Telefonnummer.',
    'Der Polier lässt ab 6.40 Uhr Maschinen warmlaufen, «damit wir um 7 Uhr loslegen können».',
  ],
  stages: [
    {
      id: 'c1', title: 'Der Anruf der Gemeinde', type: 'single', criteria: ['zusammenarbeit', 'recht'],
      situation: 'Die Gemeindevertreterin fragt: «Was sagen Sie zu den Beschwerden?»',
      prompt: 'Wie antworten Sie?',
      options: [
        { id: 'o1', points: 2, text: '«Danke für den Hinweis. Ich gehe heute noch auf die Baustelle, prüfe Zeiten, Maschinen und Massnahmen und melde mich vor Montag mit einer ersten Einschätzung und Sofortmassnahmen.»', feedback: 'Richtig: ernst nehmen, prüfen, zurückmelden.' },
        { id: 'o2', points: 0, text: '«Wir halten alle Auflagen ein. Baustellen sind nun einmal laut.»', feedback: 'Falsch: Sie wissen noch nicht, ob alles eingehalten ist – und die Antwort verschärft den Konflikt.' },
        { id: 'o3', points: 1, text: '«Das muss die Bauherrschaft beantworten.»', feedback: 'Teilweise: Die Bauherrschaft muss informiert werden, aber die Prüfung auf der Baustelle ist Ihre Aufgabe.' },
      ],
    },
    {
      id: 'c2', title: 'Was prüfen?', type: 'ask', criteria: ['unsicherheit', 'fachlich'], pick: 3,
      situation: 'Sie sind auf der Baustelle.',
      prompt: 'Welche drei Dinge klären Sie zuerst?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Wann die ersten Maschinen laufen und wann gearbeitet wird', reveal: 'Ab 6.40 Uhr laufen Bagger und Kompressor warm; Arbeitsbeginn laut Reglement 7 Uhr.', feedback: 'Zentral: Lärm vor Arbeitsbeginn ist ein Verstoss und ein häufiger Beschwerdegrund.' },
        { id: 'u2', points: 2, relevant: true, text: 'Welche Verfahren eingesetzt werden und warum der Hammer statt der Zange', reveal: 'Der Maschinist ist mit dem Hammer «schneller»; die Zange würde für die meisten Wände gehen.', feedback: 'Zentral: Verfahren ist der wirksamste Hebel.' },
        { id: 'u3', points: 2, relevant: true, text: 'Ob und wie die Nachbarschaft informiert wurde', reveal: 'Keine Information, keine Ansprechperson an der Bautafel.', feedback: 'Zentral: Information ist eine Massnahme der Richtlinie.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wer die Beschwerden eingereicht hat', reveal: '—', feedback: 'Nicht nötig für die Lösung; Personendaten der Beschwerdeführenden sind nicht Ihr Thema.' },
        { id: 'u5', points: 1, relevant: true, text: 'Ob Baustrom für einen elektrischen Kompressor verfügbar ist', reveal: 'Ja, seit letzter Woche.', feedback: 'Nützlich für eine schnelle Verbesserung.' },
      ],
    },
    {
      id: 'c3', title: 'Sofortmassnahmen', type: 'multi', criteria: ['fachlich', 'prioritaet'],
      situation: 'Bis Montag sind es noch drei Arbeitstage.',
      prompt: 'Was veranlassen Sie sofort? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Kein Warmlaufen vor Arbeitsbeginn; Maschinen erst ab der erlaubten Zeit starten', feedback: 'Richtig.' },
        { id: 'm2', points: 2, text: 'Zange statt Hammer, wo technisch möglich; Hammerarbeiten bündeln und in feste Zeitfenster legen', feedback: 'Richtig.' },
        { id: 'm3', points: 2, text: 'Kompressor elektrisch betreiben und von der Grenze weg hinter einen Container stellen', feedback: 'Richtig.' },
        { id: 'm4', points: 2, text: 'Flyer mit Ablauf, lauten Phasen, Zeiten und Ansprechperson; Telefonnummer an die Bautafel', feedback: 'Richtig.' },
        { id: 'm5', points: 0, critical: true, text: 'Um schneller fertig zu werden, ab nächster Woche auch samstags den ganzen Tag abbrechen', feedback: 'Kritischer Fehler: Lärmige Samstagsarbeit ohne Bewilligung verletzt das Reglement und verschärft den Konflikt.', consequence: 'Am Samstag ruft die Polizei an; es folgt eine Anzeige und die Gemeinde verlangt einen Arbeitsunterbruch.' },
        { id: 'm6', points: 0, text: 'Den Polier vor der Equipe zurechtweisen', feedback: 'Falsch: Die Ursachen liegen in Instruktion und Planung; Blossstellung hilft nicht.' },
      ],
    },
    {
      id: 'c4', title: 'Reihenfolge', type: 'rank', criteria: ['prioritaet', 'zusammenarbeit'],
      situation: 'Sie planen die Schritte bis zum Termin am Montag und danach.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Sofortmassnahmen auf der Baustelle (Zeiten, Zange, Kompressor)' },
        { id: 'n2', text: 'Bauleitung und Bauherrschaft informieren' },
        { id: 'n3', text: 'Flyer mit Phasenplan und Ansprechperson verteilen' },
        { id: 'n4', text: 'Termin mit der Gemeinde: Befund, Massnahmen, weiteres Vorgehen' },
        { id: 'n5', text: 'Beschwerdeliste führen und nach zwei Wochen auswerten' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1', 'n2'], ['n3'], ['n4'], ['n5']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Fehler, die Lärm verursachen (Warmlaufen vor Arbeitsbeginn), werden sofort behoben – nicht erst nach Gesprächen.' }],
      rankExplanation: 'Sofortmassnahmen und Information der Linie laufen parallel. Der Flyer sollte vor dem Termin verteilt sein, damit Sie dort Massnahmen vorweisen können. Die Auswertung der Beschwerden zeigt danach, ob es reicht.',
    },
    {
      id: 'c5', title: 'Der Projektleiter', type: 'single', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Der Projektleiter: «Die Zange ist langsamer. Das kostet uns eine Woche. Am Montag sagen wir einfach, wir halten die Stufe B ein.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass Lärm vor Arbeitsbeginn und fehlende Information Mängel sind, die am Montag ohnehin auf den Tisch kommen; vorschlagen, Zange als Standard und den Hammer nur gebündelt in Zeitfenstern einzusetzen, und den Mehraufwand transparent mit der Bauherrschaft zu besprechen.', feedback: 'Richtig: ehrlich, lösungsorientiert, mit Blick auf Kosten.' },
        { id: 'r2', points: 0, text: 'Zustimmen und am Montag nur auf die Stufe verweisen.', feedback: 'Falsch: Die Gemeinde wird die Mängel sehen; die Haltung führt zu Auflagen oder Anzeige.' },
        { id: 'r3', points: 1, text: 'Auf der Zange bestehen, ohne über Kosten und Zeit zu sprechen.', feedback: 'Teilweise: richtig im Ziel, aber ohne Lösung für die Projektleitung.' },
      ],
    },
    {
      id: 'c6', title: 'Am Montag', type: 'justify', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Beim Termin vor Ort mit der Gemeinde und zwei Anwohnenden.',
      prompt: 'Formulieren Sie in 5–7 Sätzen, was Sie sagen: Befund, Massnahmen, weiteres Vorgehen.',
      rubric: [
        { id: 'b1', text: 'Mängel offen benennen (Warmlaufen, Hammer statt Zange, keine Information)', keywords: ['warmlaufen', 'hammer', 'information', 'mängel', 'fehler'] },
        { id: 'b2', text: 'Umgesetzte Sofortmassnahmen', keywords: ['zange', 'kompressor', 'elektrisch', 'zeiten', 'flyer'] },
        { id: 'b3', text: 'Weiteres Vorgehen mit Zeitfenstern und Ansprechperson', keywords: ['zeitfenster', 'ansprechperson', 'telefon', 'phasenplan'] },
        { id: 'b4', text: 'Beschwerden aufnehmen und zurückmelden', keywords: ['beschwerde', 'rückmeld', 'auswert'] },
        { id: 'b5', text: 'Ton: Verständnis, keine Rechtfertigung', keywords: ['verständnis', 'entschuldig', 'bedauern'] },
      ],
    },
  ],
  debrief: 'Die Baustelle «hielt die Stufe B ein» – und hatte trotzdem 15 Beschwerden. Ursachen waren Lärm vor Arbeitsbeginn, das bequemere statt des leiseren Verfahrens und fehlende Information. Alles drei liess sich in wenigen Tagen beheben. Lärmschutz ist mehr als die Stufe in der Bewilligung: Er umfasst Verfahren, Zeiten, Verhalten – und die Menschen nebenan.',
  sources: ['bafu-baulaerm', 'lsv', 'kanton-laerm', 'praxis'],
};
