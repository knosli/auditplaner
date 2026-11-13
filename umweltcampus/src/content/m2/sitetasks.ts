import type { SiteTask } from '../types';

// Praktische Baustellenaufgaben (fiktive Projektdaten). Ablauf in der App:
// Lösung schriftlich erarbeiten → am Raster selbst bewerten → Musterlösung vergleichen.

const M = 'm2';

export const M2_SITETASKS: SiteTask[] = [
  {
    id: 'm2-t1', moduleId: M, topic: 'recht', level: 2, setting: 'Hochbau',
    title: 'Auflagen in Massnahmen übersetzen',
    situation: 'Wohnüberbauung «Mattenhof» (fiktiv), 3 Häuser, 1 Untergeschoss, Gewässerschutzbereich Au. Aus der Baubewilligung (Auszug Gewässerschutz):',
    data: [
      'Ziff. 4.1 Für die Bauphase ist vor Baubeginn ein Entwässerungskonzept der Gemeinde zur Genehmigung einzureichen.',
      'Ziff. 4.2 Baustellenabwasser darf nur nach ausreichender Vorbehandlung (Absetzen, Neutralisation) und mit Zustimmung der Gemeinde in die Schmutzwasserkanalisation eingeleitet werden. Der pH-Wert ist laufend zu überwachen.',
      'Ziff. 4.3 Wassergefährdende Flüssigkeiten sind auf Auffangwannen und vor Niederschlag geschützt zu lagern.',
      'Ziff. 4.4 Allfällige Grundwasserabsenkungen bedürfen einer separaten Bewilligung des kantonalen Amts für Umwelt.',
      'Ziff. 4.5 Gewässerverunreinigungen sind unverzüglich der Polizei (117) zu melden.',
      'Ziff. 4.6 Es wird empfohlen, die Norm SIA 431 anzuwenden.',
    ],
    assignment: 'Erstellen Sie für jede Ziffer eine Zeile: (1) Verbindlichkeit (Auflage, Empfehlung …), (2) konkrete Massnahme auf der Baustelle, (3) verantwortliche Funktion, (4) Termin bzw. Bauphase, (5) Nachweis. Markieren Sie, wo Sie vor Baubeginn etwas klären müssen.',
    rubric: [
      { id: 'k1', text: 'Ziff. 4.1–4.5 als verbindliche Auflagen erkannt, Ziff. 4.6 als Empfehlung (Norm nicht vereinbart)', keywords: ['auflage', 'empfehlung', 'verbindlich'] },
      { id: 'k2', text: 'Konzept als Termin vor Baubeginn mit Verantwortlichem geplant', keywords: ['vor baubeginn', 'konzept', 'einreich'] },
      { id: 'k3', text: 'Für 4.2: Anlage, Zustimmung Gemeinde und pH-Überwachung mit Protokoll konkret geplant', keywords: ['ph', 'protokoll', 'neutralis', 'gemeinde'] },
      { id: 'k4', text: 'Klärungsbedarf erkannt: Wird eine Grundwasserabsenkung nötig? (Geologie prüfen, ggf. Gesuch rechtzeitig)', keywords: ['absenkung', 'geolog', 'gesuch', 'grundwasser'] },
      { id: 'k5', text: 'Meldeweg 4.5 in Notfallkarte und Instruktion übernommen, Nachweise je Zeile benannt', keywords: ['notfall', 'instru', 'nachweis', '117'] },
    ],
    solution: `**Ziff. 4.1** – Behördliche Auflage. Massnahme: Konzept erstellen bzw. beim Planer einfordern, mit Gemeinde abstimmen. Verantwortlich: Bauführung (bzw. gemäss Werkvertrag Bauherrschaft/Planer). Termin: so früh, dass die Genehmigung vor Installationsbeginn vorliegt (die «3–4 Wochen» sind eine Annahme für das fiktive Projekt – Fristen bei der Gemeinde erfragen). Nachweis: genehmigtes Konzept.

**Ziff. 4.2** – Behördliche Auflage. Massnahme: Waschplatz mit Absetzcontainer und CO₂-Neutralisation, automatische oder protokollierte pH-Messung; Zustimmung der Gemeinde mit Einleitstelle und Bedingungen einholen. Verantwortlich: Bauführung (Anlage), Polier (Betrieb, Protokoll). Termin: vor der ersten Betonage. Nachweis: Zustimmung, pH-Protokoll, Kalibrierprotokoll.

**Ziff. 4.3** – Behördliche Auflage. Massnahme: Lagerplatz mit Wannen und Dach, Betankungsplatz. Verantwortlich: Polier. Termin: ab Installation. Nachweis: Begehungscheckliste, Fotos.

**Ziff. 4.4** – Behördliche Auflage, **Klärungspunkt vor Baubeginn**: Geologiebericht prüfen – reicht der Aushub ins Grundwasser? Falls ja: Gesuch beim Kanton mit Vorlauf (Wochen!). Verantwortlich: Bauführung mit Geologe.

**Ziff. 4.5** – Behördliche Auflage (deckt sich mit der allgemeinen Pflicht). Massnahme: Notfallkarte mit 117/118 und interner Kette, Instruktion beim Baustart. Verantwortlich: Polier. Nachweis: Instruktionsprotokoll.

**Ziff. 4.6** – Empfehlung der Behörde in diesem Musterfall; ausdrücklich verbindlich wird die Norm durch den Werkvertrag. Unabhängig davon gelten das Gesetz und die anerkannten Regeln der Technik, als die SIA 431:2022 gilt – deshalb anwenden und die Risikostufe des Projekts bestimmen.

**Wichtigste Erkenntnis**: Zwei Punkte haben lange Vorlaufzeiten (Konzeptgenehmigung, allfällige Absenkbewilligung). Sie gehören ins Bauprogramm, nicht in die erste Bauwoche.`,
    sources: ['gschg', 'gschv', 'sia431', 'gemeinde-entwaesserung'],
  },
  {
    id: 'm2-t2', moduleId: M, topic: 'entwaesserung', level: 2, setting: 'Hochbau',
    title: 'Schächte zuordnen und Waschplatz festlegen',
    situation: 'Ersatzneubau Gewerbehaus in einer Gemeinde mit Trennsystem. Auf dem Installationsplatz und angrenzend liegen folgende Schächte (Angaben aus Kataster und Begehung):',
    data: [
      'S1: Hofeinlauf auf Vorplatz, Kataster «Regenabwasser» → Bach 300 m. Hier ist der Kranstandort mit Betonkübel-Umschlag geplant.',
      'S2: Kontrollschacht Hausanschluss, Kataster «Schmutzabwasser», 15 m vom Vorplatz.',
      'S3: Strasseneinlauf vor der Ausfahrt, Kataster «Regenabwasser».',
      'S4: Schacht neben dem geplanten Containerdorf, Kataster unklar (alte Liegenschaftsentwässerung).',
      'S5: Sickerschacht im Garten der Nachbarliegenschaft, 5 m hinter dem Bauzaun.',
      'Geplant: Betonieren mit Pumpe und Kübel, Fassadenarbeiten mit Waschen von Werkzeug, Betankung eines Dumpers.',
    ],
    assignment: 'Legen Sie für jeden Schacht fest: abdecken / nutzen wofür / abklären. Bestimmen Sie einen geeigneten Standort für Waschplatz und Betankung und begründen Sie ihn. Welche Abklärungen machen Sie vor Baustart?',
    rubric: [
      { id: 'k1', text: 'S1 und S3 als Meteor erkannt: dauerhaft schützen (Abdeckung bzw. Filtersack), kein Umschlag ohne Schutz', keywords: ['s1', 's3', 'abdeck', 'meteor', 'filter'] },
      { id: 'k2', text: 'S2 als möglicher Anschluss für behandeltes Waschwasser – nur mit Zustimmung der Gemeinde', keywords: ['s2', 'zustimmung', 'gemeinde', 'schmutz'] },
      { id: 'k3', text: 'S4 abklären (Kataster nachfragen, Färbeversuch/Kanal-TV) und bis dahin wie Meteor behandeln', keywords: ['s4', 'abkl', 'färb', 'kanal-tv', 'unklar'] },
      { id: 'k4', text: 'S5 erkannt: Abfluss Richtung Nachbar verhindern (Gefälle, Abschrankung)', keywords: ['s5', 'nachbar', 'sicker'] },
      { id: 'k5', text: 'Waschplatz und Betankung auf befestigter Fläche ohne Meteorschacht, nahe S2, mit Absetzen/Neutralisation bzw. Tankwanne', keywords: ['waschplatz', 'betank', 'wanne', 'befestigt', 'neutralis'] },
    ],
    solution: `- **S1 (Meteor, Kranstandort)**: kritischster Punkt. Dicht abdecken bzw. Einlauf stilllegen und die Fläche getrennt fassen; Kübelumschlag über einer Auffangwanne. Kein Waschen in diesem Bereich.
- **S2 (Schmutz)**: geeigneter Anschluss für behandeltes Waschwasser und Containerabwasser – mit Zustimmung der Gemeinde und Bedingungen (pH 6.5–9.0, absetzbare Stoffe).
- **S3 (Strasseneinlauf, Meteor)**: Filtersack einsetzen, regelmässig leeren; Strassenreinigung trocken bzw. mit Saugkehrmaschine. **Achtung**: Ein Filtersack hält nur Feststoffe zurück – nicht alkalisches Wasser, Öl oder gelöste Stoffe. Wo solche Stoffe hingelangen können, braucht es eine dichte Abdeckung oder Abtrennung.
- **S4 (unklar)**: bei der Gemeinde nachfragen, ggf. Färbeversuch oder Kanal-TV. Bis zur Klärung wie Meteorschacht behandeln und abdecken. Containerdorf-Abwasser nicht anschliessen, bevor geklärt.
- **S5 (Sickerschacht Nachbar)**: Gefälle und Abfluss Richtung Nachbar verhindern (Randabschluss, Sandsäcke), Nachbar informieren.
- **Waschplatz**: befestigte Fläche nahe S2, mit Absetzcontainer und Neutralisation, gedeckter Bereich für Werkzeugreinigung der Fassadenarbeiten.
- **Betankung**: auf mobiler Tankwanne auf einer Fläche ohne Schacht im Abflussbereich (Abstand allein genügt nicht – Gefälle prüfen), Notfallmaterial (Schachtabdeckmatte, Bindemittel) daneben.
- **Vor Baustart**: Zustimmung Gemeinde für S2, Klärung S4, Installationsplan mit eingezeichneten Schächten, Instruktion des Poliers und der Subunternehmer (Fassade!).`,
    sources: ['gemeinde-entwaesserung', 'sia431', 'kanton-merkblatt'],
  },
  {
    id: 'm2-t3', moduleId: M, topic: 'alkalisch', level: 3, setting: 'Tiefbau',
    title: 'Behandlung für eine Spritzbeton-Baugrube planen',
    situation: 'Baugrubensicherung mit Nagelwand und Spritzbeton für eine Tiefgarage (fiktiv). Dauer der Spritzbetonarbeiten ca. 8 Wochen, anschliessend Bodenplatte und Wände.',
    data: [
      'Erwarteter Wasseranfall: Hangwasser 1–2 l/s dauernd, Reinigungs- und Rückprallwasser während der Spritzarbeiten, Regen.',
      'Einleitung: Schmutzwasserkanalisation in der Strasse, Zustimmung der Gemeinde in Aussicht, Bedingungen: pH 6.5–9.0, absetzbare Stoffe begrenzt.',
      'Platz für Anlagen: 6 × 10 m neben der Zufahrt, Stromanschluss vorhanden.',
      'Arbeitszeiten: Mo–Fr, Anlage läuft auch an Wochenenden (Hangwasser).',
    ],
    assignment: 'Beschreiben Sie die Behandlungskette mit Anlagenkomponenten, wer sie betreibt und kontrolliert, wie Sie Wochenenden und Störungen absichern, wie Sie den Schlamm entsorgen und welche Arbeitssicherheitspunkte zu beachten sind.',
    rubric: [
      { id: 'k1', text: 'Trennung: Hangwasser möglichst sauber fassen und getrennt ableiten (wenn bewilligt), damit die Behandlungsanlage kleiner wird', keywords: ['hangwasser', 'trenn', 'getrennt', 'sauber'] },
      { id: 'k2', text: 'Kette: Pumpensumpf → Absetzen → CO₂-Neutralisation → pH-Endkontrolle → Ableitung', keywords: ['absetz', 'co2', 'co₂', 'neutralis', 'endkontroll'] },
      { id: 'k3', text: 'Automatische Messung mit Abschaltung und Alarm (Wochenende), Zuständigkeit für Betrieb und Kontrolle', keywords: ['automat', 'abschalt', 'alarm', 'wochenende', 'zuständig'] },
      { id: 'k4', text: 'Schlammentsorgung als Abfall mit Nachweis, Kontrolle des Schlammstands', keywords: ['schlamm', 'entsorg', 'nachweis', 'abfall'] },
      { id: 'k5', text: 'Arbeitssicherheit: CO₂-Flaschen sichern, Erstickungsgefahr in Gruben/Schächten, Schutzausrüstung', keywords: ['erstick', 'flasche', 'sicher', 'schacht', 'psa'] },
    ],
    solution: `**Risikostufe zuerst**: Spritzbeton mit Zusatzmitteln (z. B. Beschleuniger) kann eine höhere Stufe nach SIA 431:2022 begründen – Stufe mit dem Planer bestimmen; ab Stufe 3 Fachspezialist.

**Trennung**: Hangwasser an der Nagelwand mit Drainagen fassen und – wenn es sauber ist und der Kanton zustimmt – getrennt versickern oder einleiten. So muss nur das Spritzbeton- und Grubenwasser behandelt werden.

**Kette**: Pumpensumpf mit Kiesfilter → Absetzcontainer (zwei Kammern) → CO₂-Neutralisation mit automatischer pH-Regelung → pH-Endkontrolle mit Messwertaufzeichnung → Ableitung in die Schmutzwasserkanalisation gemäss Zustimmung.

**Betrieb und Kontrolle**: Anlage gemietet mit Servicevertrag; Polier verantwortlich für täglichen Rundgang (Schlammstand, CO₂-Vorrat, Messwerte), Messwerte wöchentlich an Bauführung. **Wochenende**: automatische Abschaltung bei pH ausserhalb 6.5–9.0 und bei Störung, SMS-Alarm an einen geregelten Pikettdienst (24/7, mit Stellvertretung), Rückhaltevolumen für Hangwasser und Starkregen ausserhalb der Arbeitszeit nachgewiesen (Pumpenausfall!).

**Störung**: Notfallregel am Container (Pumpen stoppen, Pikett, Gemeinde/Kanton gemäss Zustimmung informieren).

**Schlamm**: regelmässig absaugen, nach Abfallklassierung (VVEA, LVA) über einen berechtigten Entsorger, Nachweis ablegen.

**Arbeitssicherheit**: CO₂-Flaschen gesichert und belüftet aufstellen, keine Arbeiten in Schächten/Containern ohne Freimessen (CO₂ sammelt sich am Boden), Schutzbrille und Handschuhe beim Umgang mit alkalischem Wasser und Schlamm.

**Danach**: Bei Bodenplatte und Wänden fällt erneut alkalisches Wasser an – Anlage nicht zu früh abbauen.`,
    sources: ['kanton-merkblatt', 'gschv', 'praxis'],
  },
  {
    id: 'm2-t4', moduleId: M, topic: 'truebstoffe', level: 3, setting: 'Tiefbau',
    title: 'Reicht der Absetzcontainer?',
    situation: 'Werkleitungsgraben in siltigem Boden. Die Pumpe fördert durchschnittlich 8 l/s Grubenwasser. Vorgesehen ist ein Absetzcontainer mit 2.4 m × 6.0 m Wasseroberfläche. Wassertemperatur ca. 10 °C. Die Bewilligung verlangt klares Wasser bei Einleitung in den Bach.',
    data: [
      'Kornverteilung laut Geologe: viel Mittelsilt (um 0.02 mm), Anteil Feinsilt und Ton.',
      'Sinkgeschwindigkeit Mittelsilt bei 10 °C: ca. 0.28 mm/s (≈ 1 m/h).',
      'Annahme Zuschlag für Turbulenz und Kurzschluss: Faktor 2.',
      'Tipp: Rechner «Absetzfläche» in dieser Lektion bzw. unter Praxiswerkzeuge.',
    ],
    assignment: 'Schätzen Sie ab, welche Oberfläche für Mittelsilt nötig wäre, und vergleichen Sie mit dem Container. Was bedeutet das für Feinsilt und Ton? Welche Massnahmen schlagen Sie vor?',
    rubric: [
      { id: 'k1', text: 'Rechnung: 8 l/s = 28.8 m³/h; A ≈ 28.8 / 1 ≈ 29 m², mit Zuschlag ≈ 58 m²', keywords: ['28.8', '29', '58', '57', '60'] },
      { id: 'k2', text: 'Vergleich: Container ≈ 14.4 m² – etwa ein Viertel der nötigen Fläche', keywords: ['14.4', '14', 'viertel', 'zu klein'] },
      { id: 'k3', text: 'Erkannt: Feinsilt und Ton setzen sich praktisch nicht ab', keywords: ['ton', 'feinsilt', 'nicht ab'] },
      { id: 'k4', text: 'Massnahmen: Zufluss reduzieren, mehrere Container/Lamellenklärer, Flockung nur mit Fachstelle', keywords: ['reduz', 'lamelle', 'flock', 'fachstelle', 'serie'] },
      { id: 'k5', text: 'Kontrolle und Notfallregel am Auslauf festgelegt', keywords: ['kontroll', 'auslauf', 'abstell', 'foto', 'notfall'] },
    ],
    solution: `**Rechnung**: Q = 8 l/s = 0.008 m³/s × 3600 = **28.8 m³/h**. Sinkgeschwindigkeit Mittelsilt ≈ 1 m/h → A ≈ 28.8 m² ≈ **29 m²**; mit Zuschlag Faktor 2 ≈ **58 m²**.
Container: 2.4 × 6.0 = **14.4 m²** → rund **ein Viertel** der nötigen Fläche. Er hält bei 8 l/s im Wesentlichen Sand und Grobsilt zurück, Mittelsilt nur teilweise.

**Feinsilt (≈ 0.09 m/h) und Ton (≈ 0.01 m/h)**: nötig wären mehrere hundert bis mehrere tausend Quadratmeter – mit Absetzen allein nicht lösbar.

**Massnahmen**:
1. Zufluss senken: Grabenabschnitte kurz halten, Fremdwasser oberhalb abfangen, Pumpe im Pumpensumpf mit Kiesfilter.
2. Fläche erhöhen: zweiter und dritter Container **parallel** (in Serie verbessern sie vor allem die Strömung, nicht die Fläche) oder Lamellenklärer (viel Fläche auf wenig Platz). Die Leistung muss der Lieferant nachweisen.
3. Für Feinsilt/Ton: Flockung oder Filtration nach Abklärung mit der kantonalen Fachstelle.
4. Kontrolle: Sichtprobe und Foto am Auslauf zweimal täglich, Regel «bei Trübung Pumpe aus, zurückhalten, melden».

**Grenze der Rechnung**: idealisiertes Modell (kugelförmige Einzelkörner, ruhige Strömung, keine Flockung); der Zuschlag Faktor 2 ist eine Annahme, kein Normwert. Die Bemessung gehört zum Anlagenlieferanten bzw. Fachplaner – die Abschätzung zeigt Ihnen aber, ob ein Angebot plausibel ist.`,
    sources: ['sia431', 'kanton-merkblatt', 'praxis'],
  },
  {
    id: 'm2-t5', moduleId: M, topic: 'havarie', level: 3, setting: 'Tiefbau',
    title: 'Notfallorganisation Installationsplatz am Bach',
    situation: 'Hochwasserschutzprojekt (fiktiv): Installationsplatz 30 m neben einem Fischgewässer, ausserhalb des Gewässerraums. Auf dem Platz: Dieseltank 1000 l (doppelwandig), zwei Bagger, ein Raupendumper, Lager mit Schalöl und Bitumenemulsion. Ein Meteorschacht entwässert den Platz direkt in den Bach.',
    data: [
      'Arbeiten teilweise im Bachbett (fischereirechtliche Bewilligung vorhanden).',
      'Nächste Feuerwehr: 12 Minuten Anfahrt.',
      'Baustelle arbeitet mit zwei Subunternehmern.',
    ],
    assignment: 'Legen Sie die Notfallorganisation fest: Vorsorge auf dem Platz, Notfallmaterial (was, wie viel ungefähr, wo), Alarmierung, Sofortmassnahmen-Ablauf, Instruktion und Übung.',
    rubric: [
      { id: 'k1', text: 'Meteorschacht als Hauptrisiko: Absperrschieber oder Schachtabdeckung bereit, Platzentwässerung über Rückhalt', keywords: ['schacht', 'abdeck', 'schieber', 'rückhalt'] },
      { id: 'k2', text: 'Material: Schachtabdeckmatten, Bindemittel, Ölsperre für den Bach, Vliese, Behälter – an Tank, Lager und Arbeitsstelle', keywords: ['ölsperre', 'bindemittel', 'matte', 'vlies'] },
      { id: 'k3', text: 'Alarmierung 118/117, interne Kette, Fischereiaufsicht/Fachstelle gemäss Bewilligung', keywords: ['118', '117', 'fischerei', 'alarm', 'kette'] },
      { id: 'k4', text: 'Sofortmassnahmen-Ablauf in richtiger Reihenfolge, Zuständigkeiten auch für Subunternehmer', keywords: ['stopp', 'eindämm', 'sub', 'zuständig'] },
      { id: 'k5', text: 'Instruktion beim Start und kurze Übung (z. B. Ölsperre setzen)', keywords: ['instru', 'übung', 'üben', 'start'] },
    ],
    solution: `**Vorsorge**: Tank auf befestigter Fläche mit Rückhalt, Anfahrschutz, abschliessbar; Lager überdacht auf Wannen; Betankung nur am Tankplatz. Platzentwässerung: Meteorschacht mit Absperrschieber oder dauerhaftem Rückhalt (Schlammsammler/Abscheider nach Abklärung) – sonst ist jeder Tropfen in Sekunden im Bach.

**Material** (Richtgrössen festlegen mit Lieferant und Feuerwehr):
- am Tank und Lager: Schachtabdeckmatte, Bindemittel (mehrere Säcke), Auffangbehälter;
- auf jeder Maschine im Bachbett: Bindevlies und kleines Notfallset;
- am Bachufer unterhalb: Ölsperre bereitgelegt – setzen nur durch instruierte Personen vom sicheren Ufer aus, nie im strömenden Wasser; sonst ist das Aufgabe der Feuerwehr bzw. Ölwehr.

**Alarmierung**: 118/117; intern Polier → Bauführer → Umweltfachperson; gemäss Bewilligung Fachstelle und Fischereiaufsicht. Nummern auf Notfallkarte an Tank, Container und in jeder Kabine.

**Sofortmassnahmen**: eigene Sicherheit → **gleichzeitig**: Maschine abstellen/Leck stoppen, Schacht abdecken bzw. Schieber schliessen **und sofort 118/117 alarmieren** (zweite Person; bei 12 Minuten Anfahrt zählt jede Minute) → Ölsperre nur, wenn gefahrlos und instruiert → aufnehmen, nach Abfallklassierung (meist Sonderabfall mit Begleitschein) entsorgen → dokumentieren.

**Subunternehmer**: Notfallregeln im Vertrag und in der Startinstruktion; eigenes Notfallset auf ihren Maschinen.

**Instruktion und Übung**: 15 Minuten beim Start mit Notfallkarte; eine kurze praktische Übung (Alarmierung, Schacht abdecken, Ölsperre vom Ufer aus auslegen – mit der Feuerwehr abgesprochen) in der ersten Woche. Wiederholung bei Personalwechsel.`,
    sources: ['gschg', 'bgf', 'notruf', 'kvu-lagerung', 'praxis'],
  },
  {
    id: 'm2-t6', moduleId: M, topic: 'konzept', level: 3, setting: 'Hochbau',
    title: 'Kontrollplan für eine Hochbaustelle',
    situation: 'Neubau Schulhaus (fiktiv), Rohbau 10 Monate, Trennsystem, Waschplatz mit CO₂-Neutralisation, Einleitung in die Schmutzwasserkanalisation mit Zustimmung der Gemeinde. Tankwanne für Kleingeräte, ein Meteorschacht im Arbeitsbereich.',
    data: [
      'Personal: Polier, zwei Vorarbeiter, Bauführer (2 Tage/Woche vor Ort), Umweltfachperson (Besuch alle 4–6 Wochen).',
      'Behörde: Gemeinde kontrolliert stichprobenweise.',
    ],
    assignment: 'Erstellen Sie einen schlanken Kontrollplan: Was wird geprüft, wie oft, durch wen, womit, wo dokumentiert, was passiert bei Abweichung? Höchstens 8 Kontrollpunkte.',
    rubric: [
      { id: 'k1', text: 'Tägliche Eigenkontrolle durch Polier/Vorarbeiter (Anlage, pH, Schachtabdeckung, Auslauf)', keywords: ['täglich', 'polier', 'vorarbeiter', 'eigenkontroll'] },
      { id: 'k2', text: 'Messmittel und Kalibrierung geregelt', keywords: ['kalibr', 'messgerät', 'puffer'] },
      { id: 'k3', text: 'Wöchentliche Kontrolle Bauführer, periodische Fremdkontrolle Umweltfachperson', keywords: ['wöchentlich', 'bauführer', 'umweltfachperson', 'stichprob'] },
      { id: 'k4', text: 'Dokumentation festgelegt (Protokoll, Ablage) und für Behörde griffbereit', keywords: ['protokoll', 'ablage', 'ordner', 'dokument'] },
      { id: 'k5', text: 'Regel bei Abweichung: Sofortmassnahme, Information, Massnahme mit Termin', keywords: ['abweich', 'sofort', 'termin', 'massnahm', 'melden'] },
    ],
    solution: `| Was | Wie oft | Wer | Womit | Dokumentation | Bei Abweichung |
|---|---|---|---|---|---|
| pH-Endkontrolle Neutralisation | bei jeder Ableitung bzw. Aufzeichnung täglich prüfen | Vorarbeiter | pH-Elektrode | pH-Protokoll | Ableitung stoppen, Polier informieren |
| Kalibrierung pH-Messung | Handgerät: vor Gebrauch; Dauersonde: gemäss Bewilligung bzw. Hersteller (hier interner Standard: wöchentlich) | Polier | Puffer pH 7/10 | Kalibrierprotokoll | Gerät ersetzen, Ableitung stoppen |
| Schlammstand und CO₂-Vorrat | täglich | Vorarbeiter | Sicht, Messlatte | Tagesrapport | Absaugen bestellen |
| Meteorschacht abgedeckt | täglich | Polier | Sicht | Tagesrapport | sofort abdecken |
| Tankwanne leer, Notfallset vollständig | wöchentlich | Polier | Checkliste | Checkliste | ergänzen, entleeren |
| Wochenkontrolle Gewässerschutz | wöchentlich | Bauführer | Checkliste Begehung | Checkliste | Massnahme mit Termin |
| Begehung | alle 4–6 Wochen | Umweltfachperson | Begehungsbericht | Bericht | Nachverfolgung |
| Ordner für Behörde | laufend | Bauführer | – | Ordner/Ablage | – |

**Hinweis**: Die Intervalle sind ein Vorschlag bzw. interner Standard; verbindliche Intervalle stehen in der Bewilligung. Bei Dauerbetrieb gehören Alarm, automatische Abschaltung und eine Messwerthistorie dazu.

**Prinzip**: wenige Punkte, klare Personen, einfache Mittel. Bei Abweichungen gilt immer: Sofortmassnahme vor Ort, Information an die nächsthöhere Stufe, Massnahme mit Termin und Kontrolle der Erledigung.`,
    sources: ['sia431', 'praxis'],
  },
];
