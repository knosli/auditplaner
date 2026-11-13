import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm7';

// ---------- Baustellenaufgaben (fiktive Daten) ----------
export const M7_SITETASKS: SiteTask[] = [
  {
    id: 'm7-t1', moduleId: M, topic: 'm7-stoffe', level: 2, setting: 'Hochbau',
    title: 'Stoffinventar eines Rohbaus',
    situation: 'Rohbau eines Mehrfamilienhauses (fiktiv). Sie gehen durch Container, Magazin und Lagerplatz und finden die folgenden Produkte.',
    data: [
      'Dieselkanister 20 l (2 Stück), Alkylatbenzin 5 l',
      'Schalöl 200 l im Fass, angebrochen',
      'Betonverflüssiger 25 l, Abdichtungsschlämme 2 Eimer',
      'Bitumenvoranstrich 4 Eimer (zwei offen, halb leer)',
      'Bauschaum 12 Dosen, Silikon',
      'Zementschleierentferner 10 l',
      'Ein Kanister mit Filzstift «Reiniger», kein Etikett',
      'SDB vorhanden: nur für Schalöl und Verflüssiger',
    ],
    assignment: 'Erstellen Sie ein Stoffinventar (Produkt, Gefahr, Lagerort, Menge, SDB) und nennen Sie die fünf wichtigsten Massnahmen.',
    rubric: [
      { id: 'k1', text: 'Inventar mit Gefahren und SDB-Status', keywords: ['inventar', 'gefahr', 'sdb', 'menge', 'lagerort'] },
      { id: 'k2', text: 'Fehlende SDB beschaffen', keywords: ['sdb', 'beschaff', 'lieferant', 'fehlt'] },
      { id: 'k3', text: 'Offene Eimer schliessen; Brennbares (Benzin, Bauschaum, Voranstrich) weg von Zündquellen', keywords: ['schliess', 'brennbar', 'zündquelle', 'benzin'] },
      { id: 'k4', text: 'Unbeschrifteter Kanister sichern und klären', keywords: ['unbekannt', 'etikett', 'kennzeichn', 'klären'] },
      { id: 'k5', text: 'Trennung Säure (Zementschleierentferner) von anderem; Wannen', keywords: ['säure', 'trenn', 'wanne'] },
    ],
    solution: `| Produkt | Gefahr (gemäss Etikett/SDB zu prüfen) | Lagerort | Menge | SDB |
|---|---|---|---|---|
| Diesel, Alkylatbenzin | entzündbar, wassergefährdend | Wanne, Abstand zu Zündquellen | 45 l | fehlt |
| Schalöl | wassergefährdend | Wanne, überdacht | ca. 120 l | vorhanden |
| Betonverflüssiger | je nach Produkt reizend | Wanne | 25 l | vorhanden |
| Abdichtungsschlämme | reizend (zementhaltig) | trocken | 2 Eimer | fehlt |
| Bitumenvoranstrich | entzündbar, wassergefährdend | Wanne, geschlossen | 4 Eimer | fehlt |
| Bauschaum, Silikon | entzündbar (Druckgas), reizend | Schrank, kühl | 12 Dosen | fehlt |
| Zementschleierentferner | ätzend (Säure) | eigene Wanne | 10 l | fehlt |
| Kanister «Reiniger» | unbekannt | Wanne, gekennzeichnet «nicht verwenden» | ? | – |

**Fünf Massnahmen**
1. Fehlende SDB bei Einkauf bzw. Lieferanten beschaffen, Ordner im Container, Kurzfassung für die Equipe.
2. Offene Eimer Voranstrich schliessen; leere Gebinde verschlossen sammeln.
3. Brennbares (Benzin, Voranstrich, Bauschaum) getrennt und weg von Zündquellen; Säure in eigener Wanne.
4. Kanister «Reiniger» sichern, Herkunft klären, sonst als Sonderabfall entsorgen; Regel: Umgefülltes immer kennzeichnen.
5. Inventar an der nächsten Baustellensitzung vorstellen und bei neuen Produkten nachführen.

*Gefahrenangaben sind Beispiele; massgebend sind Etikett und SDB des konkreten Produkts.*`,
    sources: ['chemv', 'kvu-lagerung', 'praxis'],
  },
  {
    id: 'm7-t2', moduleId: M, topic: 'm7-lagerung', level: 2, setting: 'Tiefbau',
    title: 'Lager für eine Brückensanierung',
    situation: 'Sanierung einer Strassenbrücke über einen Fluss (fiktiv), Bauzeit acht Monate. Installationsplatz am Brückenkopf auf Kies, 20 m vom Ufer, leicht geneigt Richtung Fluss.',
    data: [
      'Benötigt: Diesel für Kompressor und Hebebühne, Hydrauliköl, Epoxidharze, Abdichtungsbitumen, Korrosionsschutz (lösemittelhaltig), Reinigungsverdünner',
      'Zwei Einlaufschächte am Brückenkopf führen direkt in den Fluss',
      'Platz für einen Container und eine kleine Fläche',
      'Kanton: Fluss mit Fischvorkommen; Bewilligung verlangt Massnahmen gegen Stoffeintrag',
    ],
    assignment: 'Planen Sie Lager und Umschlag: Standort, Rückhalt, Trennung, Material, Regeln für Abfüllen und Betanken.',
    rubric: [
      { id: 'k1', text: 'Standort mit Abstand und ohne Gefälle zum Fluss bzw. zu Schächten; befestigt', keywords: ['abstand', 'gefälle', 'befestigt', 'fluss', 'schacht'] },
      { id: 'k2', text: 'Rückhalt: Wannen bzw. Container mit Wanne, überdacht, Volumen nach Kanton', keywords: ['wanne', 'überdacht', 'container', 'volumen'] },
      { id: 'k3', text: 'Trennung brennbar/übrige; Mengen klein', keywords: ['trenn', 'brennbar', 'menge', 'klein'] },
      { id: 'k4', text: 'Schächte während Arbeiten sichern; Material bereit (Bindemittel, Abdeckungen, ggf. Sperren)', keywords: ['abdeck', 'bindemittel', 'ölsperre', 'material'] },
      { id: 'k5', text: 'Abfüllen und Betanken nur über Rückhalt, beaufsichtigt', keywords: ['abfüll', 'betank', 'beaufsichtigt', 'rückhalt'] },
    ],
    solution: `- **Standort**: Container mit integrierter Auffangwanne auf einer befestigten Fläche am höchsten Punkt des Platzes, möglichst weit vom Ufer; kein Gefälle zum Fluss oder zu den Schächten (ggf. Schwelle).
- **Rückhalt**: Alle Gebinde im Container bzw. in Wannen; überdacht; Volumen gemäss kantonalen Vorgaben.
- **Trennung**: Brennbares (Diesel, Verdünner, Korrosionsschutz) im Container mit Lüftung und Feuerlöscher, getrennt von Harzen und Bitumen; Mengen für ein bis zwei Wochen.
- **Schächte**: Einlaufschächte mit Abdeckmatten sichern, wenn auf dem Platz gearbeitet oder abgefüllt wird; Notfallmaterial in einer Kiste am Container (Bindemittel, Abdeckungen, Säcke), Ölsperren für den Fluss mit Feuerwehr bzw. Fachstelle abklären.
- **Abfüllen und Betanken**: nur über Wanne bzw. auf dichter Platte, mit Pumpe, nie unbeaufsichtigt; Kompressor und Hebebühne auf Tropfwannen.
- **Auf der Brücke**: nur die Tagesmenge, Gebinde in kleinen Wannen, Entwässerungsöffnungen während Arbeiten verschlossen.
- **Information**: Stoffinventar, SDB, Notfallblatt am Container; Instruktion aller Beteiligten.

*Ob für die Lagerung eine Bewilligung nötig ist, hängt vom Gewässerschutzbereich und den Mengen ab – mit der kantonalen Fachstelle klären.*`,
    sources: ['kvu-lagerung', 'gschg', 'gschv', 'praxis'],
  },
  {
    id: 'm7-t3', moduleId: M, topic: 'm7-chemikalien', level: 2, setting: 'Hochbau',
    title: 'Reinigungs- und Entsorgungskonzept Innenausbau',
    situation: 'Innenausbau eines Schulhauses (fiktiv) mit fünf Subunternehmern: Maler, Bodenleger (Epoxid), Plattenleger, Gipser, Elektriker. Bauzeit vier Monate.',
    data: [
      'Wasseranschluss im WC-Container und ein Aussenhahn neben einem Meteorschacht',
      'Abwasser des Containers in die Schmutzwasserkanalisation',
      'Bisher keine Regeln für Reinigung und Reste',
      'Entsorgung bisher: alles in die Mulde «Bauabfall gemischt»',
    ],
    assignment: 'Erstellen Sie ein einfaches Konzept: Reinigungsplatz, Sammlung der Reste, Entsorgung, Instruktion.',
    rubric: [
      { id: 'k1', text: 'Reinigungsplatz mit Vorreinigung, Absetzen, Sammelbehältern', keywords: ['reinigungsplatz', 'absetz', 'eimer', 'sammel'] },
      { id: 'k2', text: 'Lavabo und Aussenhahn nicht für Reinigung; Meteorschacht geschützt', keywords: ['lavabo', 'aussenhahn', 'meteor', 'schacht'] },
      { id: 'k3', text: 'Sonderabfälle getrennt (Harzreste, Lösungsmittel, Lappen) mit Begleitschein', keywords: ['sonderabfall', 'begleitschein', 'harz', 'lappen', 'lösungsmittel'] },
      { id: 'k4', text: 'Ausgehärtete Reste und trockene Gebinde getrennt nach Vorgabe', keywords: ['ausgehärtet', 'gebinde', 'trocken'] },
      { id: 'k5', text: 'Instruktion aller Subunternehmer, Kontrolle', keywords: ['instru', 'subunternehm', 'kontroll', 'koordination'] },
    ],
    solution: `**Reinigungsplatz** (Erdgeschoss, gut erreichbar): Wanne mit drei Eimern (Vorreinigung, Spülen, Absetzen), Abstreifgitter, Behälter mit Deckel für lösemittelhaltige Reinigung, Plakat mit Bildern.

**Regeln**
- Werkzeuge zuerst trocken vorreinigen (abstreifen, ausrollen).
- Wasserbasierte Farben: Spülwasser absetzen bzw. eintrocknen lassen; geklärtes Wasser nur nach Vorgabe der Gemeinde ableiten.
- Kleber, Mörtel, Gips: wie zementhaltiges Wasser – absetzen, nicht in Schächte.
- Epoxid: Reste aushärten lassen, wo das SDB es erlaubt; nicht ausgehärtete Reste sammeln.
- Lösemittelhaltiges: nur im geschlossenen Behälter, verschmutzter Verdünner wird gesammelt.
- Lavabo im Container und Aussenhahn: Schild «Keine Farben, Kleber, Mörtel»; Meteorschacht neben dem Hahn abdecken.

**Sammlung und Entsorgung**

| Behälter | Inhalt | Entsorgung |
|---|---|---|
| Fass Sonderabfall (in Wanne, beschriftet) | nicht ausgehärtete Harzreste, verschmutzter Verdünner, Lappen, Sprühdosen | berechtigter Entsorger, Begleitschein |
| Gebinde trocken/ausgehärtet | restentleerte, ausgehärtete Gebinde | nach Vorgabe Entsorger bzw. Rücknahme |
| Mulde Bauabfall | nur Bauabfälle ohne Chemikalienreste | wie bisher, aber kontrolliert |

**Instruktion**: An der Koordinationssitzung allen Subunternehmern erklären, SDB ihrer Produkte einsammeln, Kontrolle bei Begehungen (Lavabo, Mulde, hinter dem Container).`,
    sources: ['veva', 'vvea', 'gschg', 'praxis'],
  },
  {
    id: 'm7-t4', moduleId: M, topic: 'm7-havarie', level: 3, setting: 'Tiefbau',
    title: 'Havariekonzept auf einer Seite',
    situation: 'Werkleitungsbau (fiktiv) entlang einer Kantonsstrasse, 900 m, mit Bagger, Dumper, Tankanhänger und Belagsarbeiten am Schluss. Entlang der Strasse Einlaufschächte, die in einen Bach führen; ein Abschnitt liegt im Gewässerschutzbereich Au.',
    data: [
      'Equipe: Polier, sechs Mitarbeitende, zeitweise zwei Subunternehmer',
      'Notfallmaterial bisher: ein Sack Bindemittel im Werkhof',
      'Bewilligung: «Bei Ereignissen ist das kantonale Amt zu informieren»',
    ],
    assignment: 'Entwerfen Sie das Havariekonzept auf einer Seite.',
    rubric: [
      { id: 'k1', text: 'Mögliche Ereignisse und gefährdete Schutzgüter (Schächte, Bach, Au)', keywords: ['ereignis', 'schacht', 'bach', 'grundwasser', 'au'] },
      { id: 'k2', text: 'Sofortmassnahmen: Eigenschutz, stoppen, eindämmen, alarmieren gleichzeitig', keywords: ['eigenschutz', 'stopp', 'eindämm', 'gleichzeitig', 'alarm'] },
      { id: 'k3', text: 'Material am Ort (Tankanhänger, Maschinen) statt im Werkhof', keywords: ['material', 'bindemittel', 'abdeck', 'tankanhänger', 'am ort'] },
      { id: 'k4', text: 'Alarmierung: 118/117, interne Kette, Meldung an Amt gemäss Bewilligung', keywords: ['118', '117', 'amt', 'polier', 'bauführ'] },
      { id: 'k5', text: 'Bekannt machen und üben, inkl. Subunternehmer', keywords: ['instru', 'üben', 'aushang', 'subunternehm'] },
    ],
    solution: `**HAVARIEKONZEPT – Werkleitung Kantonsstrasse**

**Mögliche Ereignisse**: Leck am Tankanhänger oder beim Betanken; Hydraulikschlauch am Bagger; umgekippte Gebinde (Trennmittel, Bitumenemulsion); Zement- oder Schlammwasser aus dem Graben.

**Gefährdet**: Einlaufschächte an der Strasse → Bach. Abschnitt im Gewässerschutzbereich Au → Grundwasser. Offener Graben → Boden.

**Sofort**
1. Eigenschutz (Zündquellen, Verkehr absichern).
2. **Gleichzeitig**: Quelle stoppen (Maschine aus, Hahn zu) – Schächte abdecken, Bindemittel – **Feuerwehr 118** bzw. Polizei 117, sobald Schacht, Bach oder Boden betroffen sein können.
3. Polier → Bauführer → Umweltfachperson; Bauführer informiert das kantonale Amt gemäss Bewilligung.
4. Einsatzkräfte an der Zufahrt empfangen; Stoffinventar und Plan der Schächte bereithalten.

**Material** (Kiste am Tankanhänger, Notfallset auf Bagger): Bindemittel, Schachtabdeckmatten, Säcke, Handschuhe; Feuerlöscher.

**Danach**: Aufnahme und Entsorgung nach Vorgabe (Sonderabfall, Begleitschein), Ereignisbericht, Ursachen.

**Nummern**: 118 Feuerwehr · 117 Polizei · 144 Sanität · 145 Tox Info · Polier … · Bauführer … · Umwelt …

**Bekannt machen**: Aushang am Tankanhänger und im Container; Erklärung an der Startinstruktion, auch für Subunternehmer; kurze Übung in der ersten Woche.`,
    sources: ['notruf', 'gschg', 'kanton-merkblatt', 'praxis'],
  },
  {
    id: 'm7-t5', moduleId: M, topic: 'm7-werkhof', level: 3, setting: 'Tiefbau',
    title: 'Bestandesaufnahme Werkhof',
    situation: 'Werkhof einer Tiefbaufirma (fiktiv), in Betrieb seit 1988. Sie machen die erste Bestandesaufnahme.',
    data: [
      'Unterirdischer Dieseltank (Baujahr unbekannt), Zapfsäule auf Betonplatz',
      'Waschplatz mit Schlammfang und Ölabscheider; letzte Leerung unbekannt',
      'Werkstatt: Altöl in offenen Fässern, Filter in einer Mulde',
      'Lager: Öle, Bitumenprodukte, Trennmittel, Farben; teilweise ohne Wannen',
      'Platz für Rückschub: Gebinde und Material aus Baustellen, unsortiert',
      'Bewilligungen: «irgendwo im Archiv»',
    ],
    assignment: 'Strukturieren Sie die Bestandesaufnahme und legen Sie Prioritäten für die ersten drei Monate fest.',
    rubric: [
      { id: 'k1', text: 'Bestand: Anlagen, Bewilligungen, Pflichten, Nachweise', keywords: ['anlage', 'bewilligung', 'pflicht', 'nachweis', 'bestand'] },
      { id: 'k2', text: 'Priorität 1: akute Risiken (Altöl offen, Lager ohne Wannen, Abscheider)', keywords: ['altöl', 'wanne', 'abscheider', 'sofort', 'priorität'] },
      { id: 'k3', text: 'Tank: Zustand und Pflichten mit Fachstelle/Fachfirma klären', keywords: ['tank', 'fachfirma', 'kanton', 'kontrolle', 'leckanzeige'] },
      { id: 'k4', text: 'Rückschub-Regeln, Abfalltrennung, Entsorgung mit Begleitschein', keywords: ['rückschub', 'regel', 'trenn', 'begleitschein'] },
      { id: 'k5', text: 'Organisation: Verantwortliche/r, Jahresplan, Ablage, offene Bereinigung', keywords: ['verantwort', 'jahresplan', 'ablage', 'geschäftsleitung'] },
    ],
    solution: `**Struktur der Bestandesaufnahme**

| Anlage | Zustand | Bewilligung / Pflicht | Letzter Nachweis | Massnahme |
|---|---|---|---|---|
| Dieseltank unterirdisch | unbekannt | kantonale Pflichten für Tankanlagen | ? | Fachfirma: Zustand und Leckanzeige prüfen; bei Kanton Tankverzeichnis und Pflichten klären |
| Betankungsplatz | Beton, Ablauf? | Entwässerung über Abscheider? | – | Entwässerung prüfen |
| Waschplatz, Schlammfang, Ölabscheider | in Betrieb | Einleitbewilligung (suchen bzw. bei Gemeinde nachfragen) | ? | sofort leeren und prüfen lassen, Beleg |
| Werkstatt | Altöl offen, Filter in Mulde | Sonderabfall | – | Altöl in geschlossene Behälter in Wanne, Filter separat, Entsorger |
| Lager | teils ohne Wannen | kantonale Vorgaben Lagerung | – | Wannen, Trennung, Dach |
| Rückschubplatz | unsortiert | Abfallrecht | – | sichten, trennen, Annahmeregel |

**Prioritäten**
- *Monat 1*: Altöl und ungeschützte Gebinde in Wannen; Abscheider leeren und prüfen; Rückschubplatz sichten (unbekannte Gebinde sichern); Bewilligungen beschaffen (Archiv, Gemeinde, Kanton).
- *Monat 2*: Tank prüfen lassen; Pflichten mit kantonaler Fachstelle klären; Lager neu einrichten; Entsorgungsverträge und Begleitscheine.
- *Monat 3*: Verantwortliche/r mit Stellvertretung, Jahresplan mit Fristen, Ablage «Werkhof Umwelt», erste Werkhofkontrolle mit Checkliste; Rückschubregel einführen; Bericht an die Geschäftsleitung.

Versäumte Pflichten werden mit der Geschäftsleitung offen gegenüber der Behörde bereinigt – nicht mit nachträglichen Unterlagen.`,
    sources: ['gschg', 'kvu-lagerung', 'veva', 'altlv', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M7_TASKS: PracticeTask[] = [
  { id: 'm7-p1', moduleId: M, topic: 'm7-stoffe', title: 'Stoffinventar auf einer Baustelle',
    goal: 'Für eine laufende Baustelle ein Stoffinventar erstellen und die SDB vervollständigen.',
    steps: ['Gehen Sie mit dem Polier durch Container, Magazin und Lager.', 'Erfassen Sie Produkt, Gefahren (Piktogramme), Lagerort, Menge und ob ein SDB vorhanden ist.', 'Beschaffen Sie fehlende SDB.', 'Erstellen Sie für die drei wichtigsten Produkte eine Kurzfassung für die Equipe.'],
    deliverable: 'Stoffinventar und drei Kurzfassungen.',
    criteria: ['Alle Produkte erfasst', 'Fehlende SDB beschafft', 'Unbekanntes gesichert', 'Kurzfassungen verständlich'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm7-p2', moduleId: M, topic: 'm7-lagerung', title: 'Lagercheck auf drei Baustellen',
    goal: 'Lagerung und Umschlag auf mehreren Baustellen vergleichen.',
    steps: ['Prüfen Sie auf drei Baustellen Lager und Betankungsplatz mit der Checkliste aus Lektion 2.', 'Fotografieren Sie Befunde (ohne Personen).', 'Vereinbaren Sie Massnahmen mit den Polieren.', 'Leiten Sie aus wiederkehrenden Befunden einen Vorschlag für die Firma ab (z. B. Standard-Lagerbox).'],
    deliverable: 'Vergleich der drei Baustellen und ein Vorschlag.',
    criteria: ['Checkliste angewendet', 'Massnahmen vereinbart', 'Wiederholungen erkannt', 'Vorschlag begründet'], confirmer: 'Bauführer/in oder Leitung Qualität/Umwelt' },
  { id: 'm7-p3', moduleId: M, topic: 'm7-chemikalien', title: 'Reinigungsplatz einrichten',
    goal: 'Auf einer Baustelle mit Innenausbau einen funktionierenden Reinigungsplatz einführen.',
    steps: ['Klären Sie mit dem Polier, welche Produkte gereinigt werden.', 'Richten Sie einen Reinigungsplatz nach Lektion 3 ein.', 'Instruieren Sie die Subunternehmer.', 'Kontrollieren Sie nach zwei Wochen Lavabo, Schächte und Mulde.'],
    deliverable: 'Foto des Reinigungsplatzes, Instruktionsliste, Ergebnis der Nachkontrolle.',
    criteria: ['Platz funktionsfähig', 'Alle Subunternehmer instruiert', 'Nachkontrolle durchgeführt', 'Verbesserungen umgesetzt'], confirmer: 'Polier/in' },
  { id: 'm7-p4', moduleId: M, topic: 'm7-havarie', title: 'Havariekonzept erstellen und üben',
    goal: 'Für eine Baustelle ein einseitiges Havariekonzept erstellen und eine kurze Übung durchführen.',
    steps: ['Erstellen Sie das Konzept nach Lektion 4 (Vorlage Aufgabe m7-t4).', 'Prüfen Sie Material und Nummern vor Ort.', 'Führen Sie mit der Equipe eine Zehn-Minuten-Übung durch.', 'Passen Sie das Konzept nach der Übung an.'],
    deliverable: 'Havariekonzept (Version 2) und Kurzprotokoll der Übung.',
    criteria: ['Konzept vollständig und kurz', 'Material am Ort', 'Übung durchgeführt', 'Anpassungen vorgenommen'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm7-p5', moduleId: M, topic: 'm7-werkhof', title: 'Werkhofkontrolle',
    goal: 'Eine Werkhofkontrolle durchführen und den Jahresplan aufbauen.',
    steps: ['Führen Sie mit dem Werkhofchef eine Kontrolle mit der Checkliste aus der Fachbibliothek durch.', 'Prüfen Sie die Nachweise (Tank, Abscheider, Entsorgung).', 'Erstellen Sie einen Jahresplan mit allen Fristen.', 'Besprechen Sie offene Pflichten mit Ihrer vorgesetzten Stelle.'],
    deliverable: 'Kontrollbericht und Jahresplan.',
    criteria: ['Alle Bereiche geprüft', 'Nachweise vollständig erfasst', 'Jahresplan erstellt', 'Offene Punkte gemeldet'], confirmer: 'Werkhofchef/in oder Geschäftsleitung' },
];

// ---------- Feynman ----------
export const M7_FEYNMAN: FeynmanTask[] = [
  { id: 'm7-f1', moduleId: M, topic: 'm7-havarie', audience: 'Polier',
    prompt: 'Erklären Sie einem Polier in 5–7 Sätzen, warum er bei ein paar Litern Diesel im Schacht sofort 118 anrufen soll – auch am Freitagabend.',
    rubric: [
      { id: 'f1', text: 'Schacht führt in Bach bzw. Kanalisation – kleine Mengen wirken weit', keywords: ['schacht', 'bach', 'wenige liter', 'weit'] },
      { id: 'f2', text: 'Feuerwehr kann Schaden begrenzen (Ölwehr, Spülen)', keywords: ['feuerwehr', 'ölwehr', 'begrenzen', 'spülen'] },
      { id: 'f3', text: 'Meldepflicht; Verschweigen ist schlimmer', keywords: ['meldepflicht', 'melden', 'verschweig'] },
      { id: 'f4', text: 'Ablauf: stoppen, abdecken, anrufen – gleichzeitig', keywords: ['stopp', 'abdeck', 'gleichzeitig'] },
      { id: 'f5', text: 'Anerkennung statt Vorwurf für schnelles Melden', keywords: ['richtig', 'anerkennung', 'kein vorwurf'] },
    ] },
  { id: 'm7-f2', moduleId: M, topic: 'm7-werkhof', audience: 'Werkhofchef',
    prompt: 'Erklären Sie einem Werkhofchef in 5–7 Sätzen, warum der Ölabscheider regelmässig geleert werden muss und warum dabei Nachweise wichtig sind.',
    rubric: [
      { id: 'f1', text: 'Voller Abscheider trennt nicht mehr – Öl gelangt in die Kanalisation', keywords: ['voll', 'trennt nicht', 'kanalisation', 'öl'] },
      { id: 'f2', text: 'Reinigungsmittel können das Öl emulgieren', keywords: ['reinigungsmittel', 'emulg'] },
      { id: 'f3', text: 'Pflicht aus der Bewilligung', keywords: ['bewilligung', 'pflicht', 'auflage'] },
      { id: 'f4', text: 'Nachweis schützt bei Kontrollen und Ereignissen', keywords: ['nachweis', 'beleg', 'kontrolle'] },
      { id: 'f5', text: 'Praktisch, mit Jahresplan', keywords: ['jahresplan', 'termin'] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M7_CARDS: Card[] = [
  { id: 'm7-c01', moduleId: M, topic: 'm7-stoffe', level: 1, front: 'Typische wassergefährdende Stoffe auf Baustellen?', back: 'Treibstoffe, **Öle**, **Schalöle**, Bitumenprodukte, Betonzusatzmittel, **Harze**, Farben, Lösungs- und Reinigungsmittel.', sources: ['gschg'] },
  { id: 'm7-c02', moduleId: M, topic: 'm7-stoffe', level: 1, front: 'Piktogramm toter Fisch und Baum?', back: '**Gewässergefährdend** (Gefahrenhinweise Reihe **H400**).', sources: ['chemv'] },
  { id: 'm7-c03', moduleId: M, topic: 'm7-stoffe', level: 1, front: 'Wichtigste SDB-Abschnitte für die Baustelle?', back: '**2** Gefahren, **6** Freisetzung, **7** Lagerung, **8** Schutzausrüstung, **12** Umwelt, **13** Entsorgung.', sources: ['chemv'] },
  { id: 'm7-c04', moduleId: M, topic: 'm7-stoffe', level: 2, front: 'Gebinde ohne Etikett?', back: '**Sichern** (Wanne), **kennzeichnen** «nicht verwenden», **klären** – sonst als Sonderabfall entsorgen. Nie verwenden oder wegkippen.', sources: ['chemv', 'veva'] },
  { id: 'm7-c05', moduleId: M, topic: 'm7-stoffe', level: 2, front: '«Biologisch abbaubares» Öl?', back: 'Senkt die Folgen, bleibt aber **wassergefährdend** – gleich sorgfältig behandeln und melden.', sources: ['gschg'] },
  { id: 'm7-c06', moduleId: M, topic: 'm7-lagerung', level: 1, front: 'Gute Auffangwanne?', back: '**Dicht**, ausreichend gross (kantonal), **leer**, **überdacht**, gegen Anfahren geschützt.', sources: ['kvu-lagerung'] },
  { id: 'm7-c07', moduleId: M, topic: 'm7-lagerung', level: 1, front: 'Kritischster Moment?', back: '**Umschlag**: Abfüllen, Umfüllen, Betanken, Anliefern – nur über Rückhalt, nie unbeaufsichtigt.', sources: ['praxis'] },
  { id: 'm7-c08', moduleId: M, topic: 'm7-lagerung', level: 2, front: 'Verschmutztes Regenwasser in der Wanne?', back: '**Nicht auskippen** – wie den Stoff aufnehmen und entsorgen. Ursache: **Dach**.', sources: ['kvu-lagerung'] },
  { id: 'm7-c09', moduleId: M, topic: 'm7-lagerung', level: 2, front: 'Was trennt man im Lager?', back: '**Säuren**, **Laugen**, **Brennbares** je für sich; Brennbares weg von Zündquellen.', sources: ['chemv'] },
  { id: 'm7-c10', moduleId: M, topic: 'm7-chemikalien', level: 1, front: 'Wo nie Werkzeuge reinigen?', back: '**Lavabo**, **Meteorschacht**, **Wiese**. Reinigungsplatz einrichten.', sources: ['gschg'] },
  { id: 'm7-c11', moduleId: M, topic: 'm7-chemikalien', level: 1, front: 'Meist Sonderabfall?', back: 'Nicht ausgehärtete Reste, verschmutzter Verdünner, ölige **Lappen** und **Bindemittel**, **Altöl**, Sprühdosen.', sources: ['veva'] },
  { id: 'm7-c12', moduleId: M, topic: 'm7-chemikalien', level: 2, front: 'Reste mischen, um Gebinde zu sparen?', back: '**Nein** – Reaktionen möglich, Entsorgung schwieriger und teurer.', sources: ['praxis'] },
  { id: 'm7-c13', moduleId: M, topic: 'm7-havarie', level: 1, front: 'Wann sofort 118/117?', back: 'Sobald **Gewässer, Kanalisation oder Untergrund** betroffen sein **können** – unabhängig von der Menge.', sources: ['notruf', 'gschg'] },
  { id: 'm7-c14', moduleId: M, topic: 'm7-havarie', level: 1, front: 'Inhalt des Notrufs?', back: '**Wo** – **was** – **wohin** – **wer** – was ist getan.', sources: ['notruf'] },
  { id: 'm7-c15', moduleId: M, topic: 'm7-havarie', level: 2, front: 'Wichtige Nummern?', back: 'Feuerwehr **118**, Polizei **117**, Sanität **144**, Tox Info Suisse **145**, Euro-Notruf **112**.', sources: ['notruf'] },
  { id: 'm7-c16', moduleId: M, topic: 'm7-havarie', level: 2, front: 'Wasserhaltung bei Ölaustritt in der Baugrube?', back: '**Pumpe stoppen** – sonst wird das Öl weitergepumpt.', sources: ['praxis'] },
  { id: 'm7-c17', moduleId: M, topic: 'm7-werkhof', level: 1, front: 'Werkhof vs. Baustelle?', back: 'Werkhof = **dauerhafte Anlage** mit eigener Bewilligung, Auflagen und Inhaberpflichten.', sources: ['gschg'] },
  { id: 'm7-c18', moduleId: M, topic: 'm7-werkhof', level: 2, front: 'Wann wirkt ein Ölabscheider nicht?', back: 'Wenn er **nicht geleert/gewartet** ist oder **Reiniger das Öl emulgieren**.', sources: ['praxis'] },
  { id: 'm7-c19', moduleId: M, topic: 'm7-werkhof', level: 2, front: 'Versäumte Pflicht im Werkhof entdeckt?', back: 'Sofort beheben, **Geschäftsleitung** informieren, **offen** bereinigen – **nie rückdatieren**.', sources: ['praxis'] },
];

// ---------- Simulation ----------
export const M7_SCENARIO: Scenario = {
  id: 'sim-j', code: 'J', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Diesel am Freitagabend',
  setting: 'Tiefbau', level: 3, minutes: 20,
  topics: ['m7-havarie', 'm7-lagerung', 'm7-stoffe'],
  intro: 'Werkleitungsbau entlang einer Kantonsstrasse (fiktiv). Freitag, 17.40 Uhr. Die meisten Mitarbeitenden sind gegangen. Der Polier ruft Sie an: Beim Abkoppeln des Tankanhängers ist der Zapfschlauch abgerissen. Diesel läuft über den Kiesplatz Richtung Strasse.',
  facts: [
    'Entlang der Strasse liegen Einlaufschächte; laut Plan führen sie in einen Bach in 150 m Entfernung.',
    'Auf dem Platz ist der Polier mit einem Maschinisten.',
    'Bindemittel: ein angebrochener Sack im Container; Schachtabdeckungen: keine auf dem Platz.',
    'Die Bewilligung verlangt, das kantonale Amt bei Ereignissen zu informieren.',
  ],
  stages: [
    {
      id: 'j1', title: 'Der Anruf', type: 'single', criteria: ['risiko', 'recht', 'prioritaet'],
      situation: 'Der Polier: «Der Hahn ist zu, aber es ist schon einiges ausgelaufen und läuft Richtung Strasse. Ich habe Bindemittel gestreut. Muss ich jetzt wirklich jemanden anrufen?»',
      prompt: 'Was sagen Sie?',
      options: [
        { id: 'o1', points: 2, text: '«Ja, sofort 118 – es kann in die Schächte und in den Bach laufen. Der Maschinist soll gleichzeitig mit Brettern, Folie oder Erde die Schächte abdecken bzw. abdämmen, soweit es gefahrlos geht. Ich informiere den Bauführer und komme.»', feedback: 'Richtig: Der Weg des Stoffs entscheidet. Alarmieren und Eindämmen laufen gleichzeitig.' },
        { id: 'o2', points: 0, critical: true, text: '«Streu den Rest Bindemittel und schau, ob es reicht. Am Montag schauen wir es an.»', feedback: 'Kritischer Fehler: Diesel kann jetzt in die Schächte und in den Bach laufen. Abwarten vergrössert den Schaden und verletzt die Meldepflicht.', consequence: 'Über das Wochenende regnet es. Am Sonntag meldet ein Fischer einen Ölfilm am Bach; die Polizei ermittelt.' },
        { id: 'o3', points: 0, critical: true, text: '«Spül es mit dem Wasserschlauch zur Seite, damit es nicht auf die Strasse läuft.»', feedback: 'Kritischer Fehler: Wegspülen verteilt den Diesel und treibt ihn in die Schächte.', consequence: 'Der Diesel gelangt mit dem Spülwasser in zwei Einlaufschächte.' },
      ],
    },
    {
      id: 'j2', title: 'Was wissen müssen?', type: 'ask', criteria: ['unsicherheit', 'fachlich'], pick: 3,
      situation: 'Die Feuerwehr ist alarmiert. Der Polier fragt, was er ihr sagen soll. Sie haben zwei Minuten am Telefon.',
      prompt: 'Welche drei Angaben klären Sie mit ihm?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Wie viel ungefähr ausgelaufen ist und ob es noch läuft', reveal: 'Geschätzt 60–80 Liter; der Hahn ist zu, es läuft nichts mehr nach.', feedback: 'Zentral: Menge und Stand der Quelle.' },
        { id: 'u2', points: 2, relevant: true, text: 'Ob bereits etwas in einen Schacht gelangt ist und welche Schächte betroffen sein können', reveal: 'Ein Schacht direkt an der Einfahrt riecht nach Diesel; zwei weitere liegen in Fliessrichtung.', feedback: 'Zentral: Das ist der Weg zum Bach.' },
        { id: 'u3', points: 2, relevant: true, text: 'Wo die Feuerwehr empfangen wird und wer dort steht', reveal: 'Der Maschinist geht an die Einfahrt an der Kantonsstrasse.', feedback: 'Zentral: Die Einsatzkräfte verlieren sonst Zeit.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wer den Schlauch zuletzt kontrolliert hat', reveal: '—', feedback: 'Wichtig für die Ursache, aber nicht jetzt.' },
        { id: 'u5', points: 1, relevant: true, text: 'Ob noch andere Stoffe auf dem Platz sind', reveal: 'Ein Fass Trennmittel in einer Wanne, nicht betroffen.', feedback: 'Nützlich für die Einsatzkräfte, aber nicht vordringlich.' },
      ],
    },
    {
      id: 'j3', title: 'Bis die Feuerwehr kommt', type: 'multi', criteria: ['fachlich', 'risiko'],
      situation: 'Die Feuerwehr ist in etwa zehn Minuten da. Sie sind unterwegs.',
      prompt: 'Was soll vor Ort geschehen? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Schächte in Fliessrichtung mit Folie, Brettern oder Erde abdecken bzw. abdämmen, soweit gefahrlos', feedback: 'Richtig.' },
        { id: 'm2', points: 2, text: 'Zündquellen fernhalten, Motoren aus, nicht rauchen', feedback: 'Richtig: Eigenschutz.' },
        { id: 'm3', points: 2, text: 'Verbleibendes Bindemittel auf die Fliessfront streuen, um die Ausbreitung zu bremsen', feedback: 'Richtig.' },
        { id: 'm4', points: 2, text: 'Zeiten notieren (Ereignis, Alarmierung), sobald es die Lage erlaubt', feedback: 'Richtig: Erleichtert Bericht und Abklärungen.' },
        { id: 'm5', points: 0, critical: true, text: 'In den Schacht an der Einfahrt steigen und ihn mit Lappen auswischen', feedback: 'Kritischer Fehler: Dieseldämpfe im Schacht und Absturzgefahr – niemand steigt in Schächte.', consequence: 'Der Maschinist wird im Schacht schwindlig und muss von der Feuerwehr geborgen werden.' },
        { id: 'm6', points: 0, text: 'Spülmittel auf den Diesel geben, damit er sich auflöst', feedback: 'Falsch: Emulgiert den Diesel; er lässt sich dann schlechter zurückhalten und gelangt leichter ins Wasser.' },
      ],
    },
    {
      id: 'j4', title: 'Nach dem Einsatz', type: 'rank', criteria: ['prioritaet', 'fachlich', 'recht'],
      situation: 'Die Feuerwehr hat den Schacht an der Einfahrt abgesaugt und gespült, der Diesel ist gebunden. Es ist 19.30 Uhr.',
      prompt: 'Ordnen Sie die nächsten Schritte (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Kantonales Amt gemäss Bewilligung informieren (bzw. bestätigen, dass die Einsatzkräfte es aufgeboten haben)' },
        { id: 'n2', text: 'Verschmutztes Bindemittel und Kies sichern (in Behältern, abgedeckt) für die Entsorgung als Sonderabfall' },
        { id: 'n3', text: 'Tankanhänger sichern: Schlauch ersetzen lassen, bis dahin nicht benutzen' },
        { id: 'n4', text: 'Ereignisbericht mit Zeiten, Menge (Schätzung), Massnahmen, Fotos' },
        { id: 'n5', text: 'Ursachenanalyse und Massnahmen für alle Baustellen (Kupplung, Instruktion, Notfallmaterial am Tankanhänger)' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1', 'n2', 'n3'], ['n4'], ['n5']],
      rankEarly: [{ id: 'n1', maxPos: 3, why: 'Die Meldung an das kantonale Amt gemäss Bewilligung darf nicht erst nach Bericht und Ursachenanalyse erfolgen.' }],
      rankExplanation: 'Meldung, Sicherung des verschmutzten Materials und Sperrung des Tankanhängers laufen gleichzeitig und sofort. Der Bericht folgt zeitnah, die Ursachenanalyse danach – mit Lehren für alle Baustellen.',
    },
    {
      id: 'j5', title: 'Montagmorgen', type: 'single', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Der Bauführer am Montag: «Gut gemacht. Aber den Bericht an die Bauherrschaft halten wir kurz – kein Wort davon, dass ein Schacht schon Diesel abbekommen hat. Das gibt nur Fragen.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass Feuerwehr und Amt den Schacht kennen und ein unvollständiger Bericht dem Unternehmen schadet; den Bericht sachlich und vollständig schreiben – mit der raschen Reaktion und den Massnahmen –, und ihn vor dem Versand mit dem Bauführer durchgehen.', feedback: 'Richtig: Vollständigkeit schützt; die rasche Reaktion spricht für die Baustelle.' },
        { id: 'r2', points: 0, text: 'Den Schacht im Bericht weglassen.', feedback: 'Falsch: Der Bericht widerspräche den Angaben von Feuerwehr und Amt – das zerstört Vertrauen und kann rechtliche Folgen haben.' },
        { id: 'r3', points: 1, text: 'Den Schacht erwähnen, aber nur in einem Nebensatz ohne Massnahmen.', feedback: 'Teilweise: nicht falsch, aber ohne Massnahmen und Ursachen fehlt das, was die Bauherrschaft wissen muss.' },
      ],
    },
    {
      id: 'j6', title: 'Lehren für die Firma', type: 'justify', criteria: ['begruendung', 'fachlich'],
      situation: 'Die Geschäftsleitung bittet um Vorschläge, damit so etwas nicht wieder passiert.',
      prompt: 'Schreiben Sie 5–7 Sätze mit konkreten Massnahmen.',
      rubric: [
        { id: 'b1', text: 'Technik: Abreisskupplung mit Sicherung, Schlauchkontrolle', keywords: ['kupplung', 'abreiss', 'schlauch', 'kontroll'] },
        { id: 'b2', text: 'Notfallmaterial am Tankanhänger (Bindemittel, Schachtabdeckungen)', keywords: ['notfallmaterial', 'abdeck', 'bindemittel', 'tankanhänger'] },
        { id: 'b3', text: 'Instruktion Abkoppeln und Havarieablauf, Notfallblatt', keywords: ['instru', 'abkoppeln', 'notfallblatt', 'ablauf'] },
        { id: 'b4', text: 'Standort Tankanhänger: weg von Schächten', keywords: ['standort', 'schacht', 'abstand'] },
        { id: 'b5', text: 'Meldekultur: schnelles Alarmieren anerkennen; Lehre an alle Baustellen', keywords: ['anerkenn', 'melde', 'alle baustellen', 'lehre'] },
      ],
    },
  ],
  debrief: 'Der Polier hat die entscheidende Frage gestellt: «Muss ich anrufen?» Die Antwort ergibt sich aus dem Weg des Stoffs – und im Zweifel ist sie Ja. Was danach zählt: Material am richtigen Ort, ein vollständiger Bericht und eine Ursache, die behoben wird. Dass ein Schacht etwas abbekommen hatte, ist kein Makel, den man verstecken muss, sondern der Grund, warum die frühe Alarmierung richtig war.',
  sources: ['gschg', 'notruf', 'kvu-lagerung', 'veva', 'praxis'],
};
