import type { Lesson } from '../types';

// Modul 4 «Bodenschutz und Aushub».
// «bestätigt» = am 13.11.2026 über BAFU- bzw. kantonale Unterlagen (Sekundärquellen) abgeglichen,
// nicht am Fedlex-Volltext. Zahlenwerte (Saugspannung, Schütthöhen, Richtwerte) bewusst NICHT
// angegeben: Original der Vollzugshilfe bzw. kantonale Vorgaben verwenden.

const M = 'm4';
const E = 'entwurf' as const;

export const M4_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm4-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Boden: Funktionen, Aufbau und Rechtsgrundlagen',
    topics: ['m4-grundlagen'],
    objectives: [
      'Die Funktionen des Bodens und seine Verletzlichkeit erklären',
      'Oberboden, Unterboden und Untergrund unterscheiden',
      'Die Rechtsgrundlagen des Bodenschutzes auf der Baustelle einordnen',
    ],
    steps: [
      { id: 'm4-l1-situation', kind: 'situation', title: 'Einstieg: «Ist doch nur Dreck»', text: `Für eine neue Werkleitung quer durch eine Wiese wird ein 6 m breiter Streifen benötigt. Der Baggerführer schiebt die Grasnarbe mit allem darunter zu einem Haufen zusammen und fährt mit dem Dumper auf der nassen Wiese hin und her. Zwei Jahre später steht der Bauer im Büro: Das Gras im Leitungsstreifen wächst kaum, nach Regen bleibt das Wasser stehen.

Was ist hier schiefgelaufen – und warum lässt es sich kaum mehr reparieren?` },
      { id: 'm4-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m4-q01', 'm4-q02'] },
      { id: 'm4-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Boden ist die oberste, belebte Schicht** der Erdkruste. Er braucht Jahrhunderte bis Jahrtausende, um sich zu bilden – und kann in einer Stunde Baggerarbeit dauerhaft geschädigt werden.

**Er besteht aus Oberboden und Unterboden.** Beide werden **getrennt** abgetragen, gelagert und wieder eingebaut.

**Das Recht schützt die Bodenfruchtbarkeit**: Boden darf physikalisch nur so belastet werden, dass seine Fruchtbarkeit nicht nachhaltig beeinträchtigt wird (Art. 33 Abs. 2 USG). Die **VBBo** (Art. 6 und 7) und die BAFU-Vollzugshilfe «Bodenschutz beim Bauen» konkretisieren das; abgetragener Boden soll verwertet werden, wenn er dafür geeignet ist (Art. 18 VVEA).

**Grösste Gefahr auf der Baustelle: Verdichtung** durch Befahren bei zu nassem Boden.` },
      { id: 'm4-l1-explain', kind: 'explain', title: 'Was Boden leistet und wie er aufgebaut ist', text: `### Funktionen
Boden ist Lebensraum (ein Grossteil der Lebewesen an Land lebt im Boden), Standort für Pflanzen und Landwirtschaft, Filter und Speicher für Wasser (Grundwasserneubildung, Hochwasserrückhalt), Kohlenstoffspeicher und Archiv der Natur- und Kulturgeschichte. Diese Leistungen hängen an seiner **Struktur**: einem Gefüge aus Krümeln und Poren, durch die Wasser, Luft und Wurzeln dringen.

### Aufbau
- **Oberboden** (A-Horizont): dunkel, humusreich, stark belebt; meist einige Dezimeter mächtig.
- **Unterboden** (B-Horizont): heller, weniger Humus, noch durchwurzelt; wichtig für Wasserspeicherung und Wurzelraum.
- **Untergrund** (C-Horizont): Ausgangsgestein; wird beim Bauen in der Regel als Aushub behandelt (Modul 3).
Die Mächtigkeit ist von Ort zu Ort sehr verschieden – deshalb wird sie vor dem Abtrag bestimmt (Bodenkartierung, Sondierungen).

### Rechtsgrundlagen
- **USG Art. 33 Abs. 2**: Boden darf nur so weit physikalisch belastet werden, dass seine Fruchtbarkeit nicht nachhaltig beeinträchtigt wird (bestätigt).
- **VBBo** (SR 814.12): Bodenfruchtbarkeit, Richt-, Prüf- und Sanierungswerte für Schadstoffe. **Art. 6**: Wer Anlagen erstellt oder den Boden bearbeitet, muss Maschinen und Verfahren so wählen und einsetzen, dass keine langfristige Verdichtung und Erosion entstehen. **Art. 7**: Ober- und Unterboden sind getrennt abzutragen und zu lagern und so wieder einzubauen, dass die Fruchtbarkeit möglichst wenig beeinträchtigt wird (sinngemäss, bestätigt über Lesefassung 2025).
- **VVEA Art. 18**: Abgetragener Ober- und Unterboden soll möglichst vollständig verwertet werden – **wenn** er sich dafür eignet, die Richtwerte der VBBo einhält und keine Fremdstoffe bzw. invasiven gebietsfremden Organismen enthält (bestätigt). Es gibt also keine unbedingte Verwertungspflicht: Ungeeigneter oder belasteter Boden wird anders behandelt (Lektion 4).
- **BAFU-Vollzugshilfe «Bodenschutz beim Bauen»**, Modul «Sachgerechter Umgang mit Boden beim Bauen» (2022, ersetzt den früheren BUWAL-Leitfaden) – konkretisiert Befahrbarkeit, Abtrag, Lagerung und Rekultivierung.
- **Kantonale Vorgaben**: Bodenschutzfachstellen, Merkblätter, Auflagen in der Baubewilligung (z. B. bodenkundliche Baubegleitung).

§> USG Art. 33 Abs. 2, VBBo Art. 6/7 und VVEA Art. 18 bestätigt (externe Prüfung anhand Lesefassungen 2025/2026, nicht am Fedlex-Volltext). Vollzugshilfe des BAFU = Massstab der Behörde.` },
      { id: 'm4-l1-diagram', kind: 'diagram', title: 'Schema: Bodenschichten', diagram: 'bodenschichten', caption: 'Vereinfachte Lernhilfe. Mächtigkeiten und Bezeichnungen variieren je Standort.' },
      { id: 'm4-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Einfamilienhaus am Siedlungsrand', context: 'Hochbau', text: `Ein Einfamilienhaus entsteht auf einer bisherigen Wiese. Vor dem Aushub wird der Oberboden auf der ganzen Bauparzelle abgetragen und am Rand als niedrige Miete gelagert, der Unterboden separat daneben. Nach dem Rohbau wird für den Garten zuerst der Unterboden, dann der Oberboden locker eingebaut – bei trockenem Wetter, ohne Befahren der fertigen Flächen.

**Lernpunkt**: Auch bei kleinen Hochbauten entscheidet der Umgang mit dem Boden, ob später ein Garten gedeiht oder eine verdichtete «Lehmwüste» entsteht.` },
      { id: 'm4-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Leitungsbau im Kulturland', context: 'Tiefbau', text: `Eine Gasleitung wird über 3 km durch Ackerland gebaut. Die Baubewilligung verlangt eine bodenkundliche Baubegleitung. Vor Baubeginn werden die Böden kartiert, eine Baupiste aus Kies auf Vlies angelegt, Ober- und Unterboden getrennt abgetragen und in Depots gelagert. Bei Regen wird die Arbeit auf der Piste weitergeführt, Bodenarbeiten ruhen.

**Lernpunkt**: Im Tiefbau über Kulturland ist Bodenschutz ein zentraler Teil der Bauorganisation – mit grossem Einfluss auf Termine und Kosten.` },
      { id: 'm4-l1-deep', kind: 'deep', title: 'Fachvertiefung: Warum Bodenschäden so schwer wiegen', text: `### 1. Boden entsteht langsam
Aus Gestein, Klima, Pflanzen und Lebewesen entsteht Boden über sehr lange Zeiträume. Ein abgetragener, verdichteter oder vermischter Boden lässt sich nicht «neu bestellen». Rekultivierte Flächen erreichen ihre frühere Fruchtbarkeit oft erst nach Jahren – oder gar nicht.

### 2. Die Struktur ist das Kapital
Entscheidend ist nicht nur das Material, sondern das Gefüge: grobe Poren leiten Wasser und Luft, feine Poren speichern Wasser. Druck durch schwere Maschinen presst die groben Poren zusammen – vor allem, wenn der Boden nass ist, weil das Wasser dann wie ein Schmiermittel wirkt. **Verdichtung im Unterboden** ist praktisch nicht mehr rückgängig zu machen, weil weder Bearbeitung noch Frost so tief reichen.

### 3. Drei Arten von Bodenschäden auf Baustellen
- **Physikalisch**: Verdichtung, Erosion, Vermischung von Ober- und Unterboden mit Untergrund oder Bauschutt.
- **Chemisch**: Eintrag von Schadstoffen (Zementwasser, Öl, belastetes Material) und Verwertung von belastetem Boden am falschen Ort.
- **Biologisch**: Verschleppung invasiver gebietsfremder Pflanzen mit dem Bodenmaterial.

### 4. Wer ist zuständig?
- **Bauherrschaft**: Bodenschutz im Projekt, ggf. Bodenschutzkonzept und Beizug einer Fachperson.
- **Planer**: Installationsplan, Pisten, Depots, Rekultivierung, Ausschreibung.
- **Unternehmung**: Ausführung gemäss Auflagen; richtige Maschinen, Arbeitsunterbruch bei zu nassem Boden.
- **Kantonale Bodenschutzfachstelle**: Auflagen, Kontrolle.
- **Bodenkundliche Baubegleitung (BBB)**: Fachperson, die bei grösseren Projekten berät und kontrolliert (Lektion 5).

### 5. Verbindung zu anderen Modulen
Bodenschutz berührt den Gewässerschutz (Erosion, Schlamm in Bächen – Modul 2), die Abfallwirtschaft (Verwertung abgetragenen Bodens – Modul 3) und die Planung (Installationsflächen, Termine – Modul 8). Er ist ein klassischer Querschnittsbereich.

### 6. Typische Missverständnisse
- «Boden ist Aushub» – nein: Ober- und Unterboden werden getrennt vom Untergrund behandelt.
- «Was oben grün ist, ist in Ordnung» – Verdichtungen im Unterboden sieht man nicht sofort.
- «Rekultivierung macht der Gärtner» – die Grundlage legt die Baustelle.

### 7. Was das für Ihre Rolle bedeutet
Als künftiger leitender Umweltbeauftragter müssen Sie den Bodenschutz nicht selbst bodenkundlich beurteilen. Sie müssen aber erkennen, wann Boden betroffen ist, die Auflagen in der AVOR verankern, Poliere und Maschinisten instruieren und eingreifen, wenn auf nassem Boden gearbeitet wird. Das beginnt bei der einfachen Frage auf jeder Baustelle: «Wo liegt hier noch gewachsener Boden – und wer fährt darüber?»

§> Rechtliche Aussagen sinngemäss; Details der VBBo und der Vollzugshilfe im Original. Die Rolle der BBB richtet sich nach Bewilligung und kantonaler Praxis.` },
      { id: 'm4-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm4-q03' },
      { id: 'm4-l1-abw', kind: 'decision', title: 'Abwägung: Boden für den Garten', questionId: 'm4-d01' },
      { id: 'm4-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Bodenschutz für ein Einfamilienhaus', taskId: 'm4-t1' },
      { id: 'm4-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m4-q04', 'm4-q05'] },
      { id: 'm4-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm4-p1' },
      { id: 'm4-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Boden entsteht sehr langsam; Schäden sind kaum reparierbar.',
        'Oberboden und Unterboden getrennt behandeln; Untergrund ist Aushub.',
        'Bodenfruchtbarkeit ist rechtlich geschützt (USG, VBBo); abgetragener Boden wird verwertet (Art. 18 VVEA).',
        'BAFU-Vollzugshilfe «Bodenschutz beim Bauen» (2022) ist der Massstab.',
        'Grösstes Baustellenrisiko: Verdichtung bei nassem Boden.',
      ] },
      { id: 'm4-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'vbbo', 'vvea', 'bafu-boden-bauen', 'kanton-boden'] },
    ],
  },
  // =====================================================================
  {
    id: 'm4-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Verdichtung vermeiden: Befahrbarkeit, Bodenfeuchte, Maschinen',
    topics: ['m4-verdichtung'],
    objectives: [
      'Erklären, warum nasser Boden besonders verdichtungsgefährdet ist',
      'Die Befahrbarkeit anhand der Bodenfeuchte beurteilen lassen und die Konsequenzen umsetzen',
      'Massnahmen gegen Verdichtung planen (Pisten, Maschinenwahl, Arbeitsunterbruch)',
    ],
    steps: [
      { id: 'm4-l2-situation', kind: 'situation', title: 'Einstieg: Nach dem Gewitter', text: `Montagmorgen, nach einem Wochenende mit viel Regen. Auf dem Plan steht: Oberboden auf 3 000 m² abtragen. Der Bagger steht bereit, die Lastwagen sind bestellt. Der Boden glänzt, in den Fahrspuren steht Wasser.

Der Bauführer fragt Sie: «Fangen wir an?»` },
      { id: 'm4-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m4-q06', 'm4-q07'] },
      { id: 'm4-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Nasser Boden ist weich und verdichtet stark.** Ob er befahren und bearbeitet werden darf, hängt von der **Bodenfeuchte** ab – gemessen wird sie als **Saugspannung** (z. B. mit Tensiometern).

**Grenzen** für Befahren und Bodenarbeiten stehen in der Vollzugshilfe bzw. in den Auflagen; ist der Boden zu nass, gilt **Arbeitsunterbruch** für Bodenarbeiten.

**Schonend arbeiten**: leichte Maschinen mit tiefem Bodendruck (Raupen, breite Reifen), Baupisten statt Befahren des Bodens, kurze Wege, Boden nie mit Lastwagen befahren.` },
      { id: 'm4-l2-explain', kind: 'explain', title: 'Bodenfeuchte und Befahrbarkeit', text: `### Warum Nässe so kritisch ist
Wassergefüllte Poren machen den Boden plastisch: Unter Druck verformt er sich, die Poren werden zusammengepresst und bleiben es. Trockener Boden ist tragfähiger und verträgt mehr Belastung.

### Wie man die Befahrbarkeit beurteilt
- **Saugspannung**: Je trockener der Boden, desto stärker «saugt» er Wasser – die Saugspannung steigt. Sie wird mit **Tensiometern** in verschiedenen Tiefen gemessen. Die Vollzugshilfe des BAFU und kantonale Merkblätter legen fest, ab welcher Saugspannung Befahren bzw. Bodenarbeiten mit welchen Maschinen zulässig sind (Werte im Original, kantonal teils konkretisiert).
- **Hilfsgrössen**: Niederschlag der letzten Tage, Fingerprobe (Ausrollprobe) durch Fachpersonen, Sichtbefund (Glanz, Spurtiefe, Wasser in Spuren).
- **Bei grossen Projekten**: Messnetz mit Tensiometern und täglicher Freigabe durch die bodenkundliche Baubegleitung.

### Maschinen und Bodendruck
Entscheidend ist der Druck auf den Boden (Gewicht je Auflagefläche) und die Gesamtlast. Raupenfahrzeuge und breite Niederdruckreifen verteilen das Gewicht; Lastwagen mit hoher Achslast gehören nie auf den Boden, sondern auf Pisten. Die Vollzugshilfe verbindet Maschineneinsatz und Bodenfeuchte (sinngemäss: je schwerer die Maschine, desto trockener muss der Boden sein).

§> Konkrete Saugspannungs-Grenzwerte und Maschinenkategorien gemäss BAFU-Vollzugshilfe bzw. Auflage – in der App bewusst nicht angegeben.` },
      { id: 'm4-l2-explain-2', kind: 'explain', title: 'Massnahmen gegen Verdichtung', text: `### Planung
- **Baupisten** aus Kies (oft auf Geotextil) auf dem Unterboden oder – je nach Vorgabe – auf dem Oberboden; nach Bauende vollständig zurückbauen.
- **Installationsflächen** nicht auf unbefestigtem Boden.
- **Flächen ausscheiden**, die nicht befahren werden dürfen (abzäunen!).
- **Termine** für Bodenarbeiten in trockene Jahreszeiten legen und Reserven für Regentage einplanen.

### Ausführung
- Bodenarbeiten nur bei ausreichend abgetrocknetem Boden; sonst Unterbruch.
- Abtrag «rückschreitend» bzw. «vor Kopf»: Der Bagger steht auf dem noch nicht abgetragenen Boden oder auf der Piste, Lastwagen nur auf Pisten.
- Leichte Maschinen mit tiefem Bodendruck einsetzen.
- Keine Wendemanöver auf dem Boden.

### Bei Regen
Bodenarbeiten stoppen, andere Arbeiten (auf Pisten, im Untergrund) weiterführen. Der Arbeitsunterbruch kostet – deshalb gehört er in Terminplan und Vertrag (Regentage, Abrechnung).` },
      { id: 'm4-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Gewerbebau mit Wartefristen', context: 'Hochbau', text: `Für eine Gewerbehalle auf Ackerland verlangt die Bewilligung, dass Oberboden nur bei ausreichender Saugspannung abgetragen wird. Die Bauunternehmung hat im Terminplan zwei Wochen Reserve für Regentage eingebaut und im Werkvertrag die Abrechnung von Stillstand geregelt. Im nassen April wird die Reserve vollständig gebraucht – ohne Streit, weil es vorher geregelt war.

**Lernpunkt**: Bodenschutz scheitert selten an der Technik, sondern an fehlenden Reserven und ungeklärten Kosten.` },
      { id: 'm4-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Grabenbau mit Baupiste', context: 'Tiefbau', text: `Bei einem Kanalisationsbau durch eine Wiese wird zuerst der Oberboden im Pistenbereich abgetragen und eine Kiespiste auf Geotextil eingebaut. Bagger und Lastwagen bewegen sich nur auf der Piste. Nach Abschluss wird die Piste vollständig entfernt, der darunterliegende Unterboden bei trockenem Wetter gelockert (soweit die Fachperson das empfiehlt) und der Oberboden wieder aufgetragen.

**Lernpunkt**: Die Piste schützt den Boden und macht die Baustelle wetterunabhängiger – sie ist meist günstiger als die Folgekosten einer Verdichtung.` },
      { id: 'm4-l2-deep', kind: 'deep', title: 'Fachvertiefung: Verdichtung verstehen und vermeiden', text: `### 1. Was bei Verdichtung passiert
Die Last einer Maschine wird nach unten in den Boden übertragen. Oberflächennah bestimmt vor allem der **Kontaktdruck** (Reifendruck, Auflagefläche) die Verdichtung, in der Tiefe die **Gesamtlast** (Radlast, Achslast). Deshalb verdichtet ein schwerer Lastwagen auch mit breiten Reifen den Unterboden – das Gewicht wirkt in die Tiefe. Mehrfaches Überfahren verstärkt den Effekt.

### 2. Folgen
- Wasser versickert schlechter → Staunässe, Oberflächenabfluss, Erosion.
- Wurzeln dringen nicht mehr durch → Ertragseinbussen, kümmerliche Bepflanzung.
- Bodenleben leidet unter Sauerstoffmangel.
- Kosten: Mindererträge, Nachbesserungen, Entschädigungen, Streit mit Grundeigentümern.

### 3. Die drei Stellschrauben
1. **Bodenfeuchte**: Arbeiten nur bei ausreichend trockenem Boden. Das ist die wirksamste Massnahme.
2. **Last und Druck**: leichte Maschinen, Raupen, breite Reifen mit tiefem Luftdruck, Lastwagen nur auf Pisten.
3. **Fahrten**: Anzahl Überfahrten minimieren, feste Fahrspuren bzw. Pisten, kurze Wege.

### 4. Messen statt schätzen
Der Augenschein täuscht: Ein oberflächlich trockener Boden kann darunter noch nass sein. Tensiometer in mehreren Tiefen liefern eine objektive Grundlage. Bei grösseren Projekten richtet die bodenkundliche Baubegleitung ein Messnetz ein und gibt Bodenarbeiten frei – oder eben nicht. Für Ihre Rolle heisst das: Die Freigabe ist Teil der Arbeitsorganisation, nicht ein Hindernis.

### 5. Verdichtung erkennen
Hinweise sind tiefe Fahrspuren, glänzende, verschmierte Oberflächen, Wasser in Spuren, plattiges Gefüge in einer Spatenprobe, schlechter Wuchs und Staunässe nach der Rekultivierung. Eine Spatenprobe vor und nach Arbeiten ist ein gutes, einfaches Kontrollinstrument.

### 6. Was tun, wenn es passiert ist?
Lockerung kann oberflächliche Verdichtungen teilweise beheben; Verdichtungen im Unterboden bleiben oft dauerhaft. Darum: sofort stoppen, Fachperson beiziehen, dokumentieren, Bauherrschaft informieren. Folgebewirtschaftung (z. B. schonende Begrünung über mehrere Jahre) legt die Fachperson fest.

### 7. Ihre Argumente gegenüber der Bauführung
- Verdichtung ist bleibend; der Arbeitsunterbruch dauert Tage.
- Auflagen zur Befahrbarkeit sind verbindlich; Verstösse können Wiederherstellungspflichten nach sich ziehen.
- Regentage sind planbar: Reserve im Terminplan, Regelung im Vertrag, Ausweicharbeiten.

§> Physikalische Zusammenhänge allgemein anerkannt; Grenzwerte, Maschinenkategorien und Lockerungsempfehlungen gemäss BAFU-Vollzugshilfe und Fachperson.` },
      { id: 'm4-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm4-q08' },
      { id: 'm4-l2-abw', kind: 'decision', title: 'Abwägung: Termin oder Boden?', questionId: 'm4-d02' },
      { id: 'm4-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Pisten- und Maschinenkonzept', taskId: 'm4-t2' },
      { id: 'm4-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m4-q09', 'm4-q10'] },
      { id: 'm4-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm4-p2' },
      { id: 'm4-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Nasser Boden verdichtet stark; Unterbodenverdichtung ist praktisch irreversibel.',
        'Befahrbarkeit nach Bodenfeuchte (Saugspannung, Tensiometer) gemäss Vollzugshilfe und Auflagen.',
        'Stellschrauben: Feuchte, Last/Druck, Anzahl Fahrten.',
        'Baupisten, leichte Maschinen, Lastwagen nie auf dem Boden.',
        'Regentage in Termin und Vertrag einplanen.',
      ] },
      { id: 'm4-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'vbbo', 'bafu-boden-bauen', 'kanton-boden'] },
    ],
  },
  // =====================================================================
  {
    id: 'm4-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Abtrag, Bodendepots und Rekultivierung',
    topics: ['m4-abtrag'],
    objectives: [
      'Ober- und Unterboden fachgerecht abtragen',
      'Bodendepots richtig anlegen und pflegen',
      'Die Rekultivierung und Folgebewirtschaftung organisieren',
    ],
    steps: [
      { id: 'm4-l3-situation', kind: 'situation', title: 'Einstieg: Der grosse Haufen', text: `Auf einer Baustelle liegt seit acht Monaten ein 4 m hoher Haufen aus Boden, mit Brennnesseln, Disteln und Berufkraut bewachsen. Darin stecken Ober- und Unterboden gemischt, dazu etwas Bauschutt. Für den Garten der Überbauung soll er nun verwendet werden.

Was ist alles nicht in Ordnung – und was hätte man anders machen müssen?` },
      { id: 'm4-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m4-q11', 'm4-q12'] },
      { id: 'm4-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Abtrag**: zuerst Oberboden, dann Unterboden – jeweils getrennt, bei trockenem Boden, ohne den Boden zu befahren.

**Bodendepots**: Ober- und Unterboden getrennt, locker geschüttet (nicht befahren), mit **begrenzter Höhe**, rasch **begrünt**, gegen Vernässung geschützt, frei von Fremdmaterial und von invasiven Neophyten.

**Rekultivierung**: in umgekehrter Reihenfolge (Unterboden, dann Oberboden), locker, bei trockenem Wetter; danach eine **schonende Folgebewirtschaftung** über mehrere Jahre.` },
      { id: 'm4-l3-explain', kind: 'explain', title: 'Abtragen und Lagern', text: `### Abtrag
1. Vegetation entfernen (bei Bedarf mähen; invasive Neophyten vorher fachgerecht entfernen).
2. **Oberboden** abtragen – Bagger steht auf dem noch nicht abgetragenen Boden oder auf der Piste, Abtransport nur über Pisten.
3. **Unterboden** separat abtragen, wenn er ebenfalls entfernt werden muss.
4. Mächtigkeiten gemäss Bodenkartierung bzw. Angaben der Fachperson einhalten; nicht mit Untergrund vermischen.

### Bodendepots (Zwischenlager)
- **Getrennt** nach Ober- und Unterboden (und nach Bodenqualität, falls belastet – Lektion 4).
- **Locker schütten**, z. B. mit dem Bagger von der Seite; nicht mit Raupen oder Lastwagen befahren.
- **Höhe begrenzen**: Je höher das Depot, desto mehr Druck und Sauerstoffmangel im Innern. Richtwerte für Ober- und Unterboden in der Vollzugshilfe (Oberboden niedriger als Unterboden).
- **Form**: Trapez- oder Mietenform mit Gefälle, damit Wasser abfliesst; Standort nicht in Senken.
- **Begrünen** möglichst rasch (tiefwurzelnde Mischungen), um Erosion, Vernässung und Unkraut zu verhindern.
- **Pflege**: mähen, Neophyten bekämpfen, Fremdmaterial fernhalten.
- **Kennzeichnung**: Herkunft, Bodenart, Datum.

§> Konkrete Schütthöhen und Begrünungsmischungen gemäss BAFU-Vollzugshilfe bzw. Fachperson.` },
      { id: 'm4-l3-explain-2', kind: 'explain', title: 'Rekultivierung und Folgebewirtschaftung', text: `### Wiederherstellen
- **Untergrund** vorbereiten: keine Bauabfälle, keine Verdichtungen (ggf. lockern nach Anweisung der Fachperson).
- **Unterboden** in der ursprünglichen Mächtigkeit locker einbauen, nicht befahren.
- **Oberboden** darüber, ebenfalls locker; keine Feinplanie mit schweren Maschinen.
- Nur bei trockenem Boden und Wetter.
- Pisten vollständig zurückbauen (inkl. Geotextil), darunterliegende Flächen prüfen.

### Folgebewirtschaftung
Ein rekultivierter Boden ist anfangs instabil. Die Fachperson empfiehlt in der Regel eine mehrjährige schonende Nutzung (z. B. Kunstwiese mit tiefwurzelnden Pflanzen, kein Befahren bei Nässe, keine intensive Nutzung). Diese Phase wird mit dem Bewirtschafter vereinbart – oft gegen Entschädigung.

### Abnahme
Bei grösseren Projekten erfolgt eine Abnahme der Rekultivierung durch die bodenkundliche Baubegleitung bzw. die Fachstelle, mit Protokoll (Mächtigkeiten, Zustand, Empfehlungen).` },
      { id: 'm4-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Überbauung mit Umgebungsarbeiten', context: 'Hochbau', text: `Für eine Wohnüberbauung wird der Oberboden in einem niedrigen, begrünten Depot am Rand gelagert, der Unterboden in einem zweiten. Ein Schild «Bodendepot – nicht befahren, kein Material ablagern» und ein Bauzaun verhindern, dass das Depot als Lagerplatz missbraucht wird. Für die Umgebung wird der Boden nach dem Rohbau wieder eingebaut; Berufkraut, das im Depot aufkam, wurde jeweils vor der Samenreife entfernt.

**Lernpunkt**: Ein gutes Depot ist abgegrenzt, beschriftet, begrünt und gepflegt.` },
      { id: 'm4-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Rekultivierung einer Leitungstrasse', context: 'Tiefbau', text: `Nach dem Bau einer Wasserleitung durch Ackerland wird die Piste zurückgebaut, die Bodenoberfläche darunter von der Fachperson geprüft und bei trockenem Wetter Unter- und Oberboden aus den Depots eingebaut. Mit dem Landwirt wird eine dreijährige Folgebewirtschaftung als Kunstwiese vereinbart; danach folgt eine Abnahme.

**Lernpunkt**: Die Rekultivierung endet nicht mit dem Einbau – die Folgebewirtschaftung gehört dazu.` },
      { id: 'm4-l3-deep', kind: 'deep', title: 'Fachvertiefung: Was in Depots passiert und wie Rekultivierung gelingt', text: `### 1. Das Innere eines Depots
In einem hohen, verdichteten oder vernässten Depot fehlt Sauerstoff. Bodenlebewesen sterben ab, es entstehen Fäulnisprozesse, die Struktur zerfällt. Je länger die Lagerung, desto wichtiger sind lockere Schüttung, begrenzte Höhe, Begrünung und Entwässerung. Deshalb gilt auch: Depots nur so lange wie nötig, und direkter Wiedereinbau ist besser als langes Zwischenlagern.

### 2. Vermischung vermeiden
Ober- und Unterboden haben unterschiedliche Eigenschaften. Wer sie mischt, verdünnt den Humus und verschlechtert beide. Noch schlimmer ist die Vermischung mit Untergrund, Bauschutt oder Belagsresten: Dann ist der Boden für eine hochwertige Verwertung oft verloren.

### 3. Invasive Neophyten
Pflanzen wie Japanknöterich, Berufkraut oder Ambrosia verbreiten sich über Samen und Wurzelteile im Bodenmaterial. Boden mit solchen Pflanzen darf am Entnahmeort verwertet oder nur so entsorgt werden, dass eine Weiterverbreitung ausgeschlossen ist (Art. 15 Abs. 3 FrSV für Organismen nach Anhang 2, bestätigt über kantonale Unterlagen). Praktisch heisst das: Bestände vor Baubeginn erfassen, getrennt behandeln, Depots pflegen, Material nicht an unbelastete Orte bringen. Kantone haben dazu Merkblätter.

### 4. Organisation der Rekultivierung
- Rekultivierungsplan: Flächen, Mächtigkeiten, Reihenfolge, Maschinen, Zeitfenster.
- Abstimmung mit Bewirtschaftern und Grundeigentümern.
- Wetterabhängigkeit: Rekultivierung oft im Spätsommer, wenn Böden trocken sind.
- Dokumentation: Fotos, Mächtigkeiten, Freigaben, Abnahmeprotokoll.

### 5. Verwertung von Überschussboden
Fällt mehr Boden an, als vor Ort gebraucht wird, soll er – sofern geeignet, unter den Richtwerten und frei von Fremdstoffen und invasiven Organismen – möglichst vollständig verwertet werden (Art. 18 VVEA), z. B. zur Aufwertung degradierter Landwirtschaftsflächen oder für Rekultivierungen andernorts. Solche Terrainveränderungen sind meist bewilligungspflichtig; die Qualität des Bodens (Schadstoffe, Neophyten) muss passen. Boden auf eine Deponie zu bringen, ist der falsche Weg.

### 6. Typische Fehler
- Depots auf Vorrat aufgeschüttet und befahren.
- Depots als Lagerplatz für Paletten und Schalungen genutzt.
- Rekultivierung im Herbst bei nassem Boden, um «fertig zu werden».
- Folgebewirtschaftung nicht vereinbart – der Bauer pflügt im ersten Frühling tief.

### 7. Kontrollfragen für die Begehung
- Sind die Depots noch locker, begrünt und frei von Fremdmaterial?
- Gibt es Fahrspuren auf Depots oder Schutzflächen?
- Ist Wasser in Senken am Depotfuss gestaut?
- Wachsen Neophyten, und werden sie vor der Samenreife entfernt?

§> Art. 18 VVEA und Art. 15 Abs. 3 FrSV bestätigt. Fachliche Details (Schütthöhen, Begrünung, Folgebewirtschaftung) gemäss Vollzugshilfe und Fachperson.` },
      { id: 'm4-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm4-q13' },
      { id: 'm4-l3-abw', kind: 'decision', title: 'Abwägung: Wohin mit dem Überschussboden?', questionId: 'm4-d03' },
      { id: 'm4-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Depot- und Rekultivierungsplan', taskId: 'm4-t3' },
      { id: 'm4-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m4-q14', 'm4-q15'] },
      { id: 'm4-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm4-p3' },
      { id: 'm4-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Oberboden zuerst, dann Unterboden – getrennt, trocken, ohne Befahren.',
        'Depots getrennt, locker, begrenzt hoch, begrünt, gepflegt, beschriftet.',
        'Rekultivierung in umgekehrter Reihenfolge, locker, bei trockenem Boden.',
        'Folgebewirtschaftung über mehrere Jahre vereinbaren.',
        'Überschussboden verwerten (Art. 18 VVEA); Neophyten nicht verschleppen.',
      ] },
      { id: 'm4-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['vvea', 'bafu-boden-bauen', 'frsv', 'kanton-boden'] },
    ],
  },
  // =====================================================================
  {
    id: 'm4-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Belasteter Boden: erkennen, beurteilen, verwerten',
    topics: ['m4-belastung'],
    objectives: [
      'Richt-, Prüf- und Sanierungswerte der VBBo in ihrer Bedeutung unterscheiden',
      'Typische Verdachtsflächen für belasteten Boden kennen',
      'Abgetragenen Boden nach seiner Verwertbarkeit einordnen lassen',
    ],
    steps: [
      { id: 'm4-l4-situation', kind: 'situation', title: 'Einstieg: Der Familiengarten', text: `Für eine Schulhauserweiterung wird ein Areal mit ehemaligen Familiengärten überbaut. Der Gemeinderat schlägt vor, den schönen, dunklen Gartenboden für den neuen Pausenplatz-Rasen zu verwenden. Die kantonale Karte zeigt die Parzelle in einem Prüfperimeter für Bodenaushub.

Was bedeutet das – und dürfen Sie den Boden einfach wiederverwenden?` },
      { id: 'm4-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m4-q16', 'm4-q17'] },
      { id: 'm4-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Boden kann mit Schadstoffen belastet sein** – z. B. entlang von Strassen, in Familiengärten, Rebbergen, Obstanlagen, bei Schiessanlagen oder auf Industrieflächen.

**Die VBBo kennt drei Werte**: **Richtwert** (Fruchtbarkeit langfristig nicht mehr gewährleistet → Ursachen angehen), **Prüfwert** (Gefährdung möglich → untersuchen; nur wenn eine konkrete Gefährdung besteht, Nutzung einschränken), **Sanierungswert** (Gefährdung → bestimmte Nutzungen verboten).

**Abgetragener Boden** wird je nach Belastung verwertet, eingeschränkt verwertet (z. B. nur am Entnahmeort) oder ist nicht verwertbar. Viele Kantone führen **Prüfperimeter** (Bezeichnung und Rechtsfolgen kantonal verschieden) – dort ist vor einer Verschiebung nach den Vorgaben des Kantons abzuklären.` },
      { id: 'm4-l4-explain', kind: 'explain', title: 'Werte, Verdachtsflächen, Verwertung', text: `### Richt-, Prüf- und Sanierungswerte (VBBo, sinngemäss)
- **Richtwert**: Bei Überschreitung ist die Fruchtbarkeit langfristig nicht mehr gewährleistet. Die Kantone klären die Ursachen ab und sorgen dafür, dass die Belastung nicht weiter zunimmt.
- **Prüfwert**: Bei Überschreitung wird geprüft, ob Menschen, Tiere oder Pflanzen konkret gefährdet sind; nur wenn das der Fall ist, wird die Nutzung eingeschränkt – nicht automatisch.
- **Sanierungswert**: Bei Überschreitung sind bestimmte Nutzungen (z. B. Nahrungspflanzen, Kinderspielplätze) verboten.
Die Zahlenwerte stehen in den Anhängen der VBBo; sie unterscheiden sich je Schadstoff und teils je Nutzung (bestätigte Logik; Zahlen hier bewusst nicht wiedergegeben).

### Typische Verdachtsflächen
Strassenränder (Blei, PAK aus Verkehr), Bahnböschungen, Familien- und Hausgärten (Asche, Schwermetalle, Pflanzenschutzmittel), Rebberge und Obstanlagen (Kupfer), Schiessanlagen (Blei, Antimon), Industrie- und Gewerbeareale, Auffüllungen, Flächen unter Hochspannungsmasten mit altem Korrosionsschutz. Viele Kantone fassen solche Flächen in **Prüfperimetern** zusammen (Bezeichnung kantonal verschieden).

### Verwertung abgetragenen Bodens (Art. 18 VVEA, BAFU-Vollzugshilfe 2021)
Die Vollzugshilfe von 2021 unterscheidet vier Klassen: **verwertungspflichtiger Boden** (vp, Art. 18 VVEA), **eingeschränkt verwertbarer Boden** (evI), **nur am Entnahmeort verwertbarer Boden** (evII) und **nicht verwertbarer Boden** (nv), der als Abfall entsorgt wird. Neben Schadstoffen ist auch die biologische Belastung mit invasiven Organismen ein Kriterium. Die Einstufung erfolgt aufgrund von Analysen durch Fachpersonen nach den Kriterien der Vollzugshilfe.

§> Logik der drei Werte und Art. 18 VVEA bestätigt (BAFU/kantonale Unterlagen). Zahlenwerte und genaue Klassen im Original.` },
      { id: 'm4-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Schulhaus auf Gartenareal', context: 'Hochbau', text: `Die Analysen des Gartenbodens zeigen Bleigehalte über dem Prüfwert. Ein Wiedereinbau auf dem Pausenplatz – also dort, wo Kinder spielen – kommt nicht in Frage. Die Fachperson empfiehlt, den Boden als belastet zu entsorgen bzw. eingeschränkt zu verwerten; für den Rasen wird unbelasteter Boden aus einer anderen Baustelle zugeführt (mit Analyse).

**Lernpunkt**: «Schöner» Boden ist nicht automatisch sauberer Boden. Die Nutzung entscheidet mit, was zulässig ist.` },
      { id: 'm4-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Strassenböschung', context: 'Tiefbau', text: `Bei der Verbreiterung einer Kantonsstrasse wird der Oberboden der Böschung abgetragen. Er liegt im Prüfperimeter (Strassenrand). Die Analysen zeigen eine Belastung über dem Richtwert, aber unter dem Prüfwert. Der Boden wird am Entnahmeort, in der neuen Böschung, wieder eingebaut – nicht in einem Gemüsegarten oder auf einer Landwirtschaftsfläche.

**Lernpunkt**: Leicht belasteter Boden kann oft am Ort bleiben; verschoben werden darf er nur auf vergleichbar belastete Flächen und gemäss Vorgaben.` },
      { id: 'm4-l4-deep', kind: 'deep', title: 'Fachvertiefung: Vom Verdacht zum Entsorgungsweg', text: `### 1. Abklärung im Projekt
1. **Prüfperimeter und Kataster** auf dem kantonalen Geoportal prüfen (belastete Standorte → Modul 3; Prüfperimeter für Boden).
2. **Historische Nutzung** klären (Gärten, Gewerbe, Auffüllungen).
3. **Probenahme und Analyse** durch eine Fachperson, mit Probenahmeplan nach den anerkannten Methoden.
4. **Einstufung** und **Verwertungskonzept**: welcher Boden wohin.
5. **Abstimmung mit der kantonalen Fachstelle**, wo verlangt.

### 2. Boden ist nicht gleich Aushub
Belasteter Oberboden ist nach den Regeln des Bodenschutzes und der VVEA (Art. 18) zu beurteilen; belasteter Untergrund nach den Regeln für Aushub (Modul 3). In der Praxis werden beide in einem Konzept behandelt, aber mit unterschiedlichen Grundlagen.

### 3. Nutzung als Massstab
Ob belasteter Boden ein Problem ist, hängt davon ab, wie er genutzt wird: Ein Gemüsegarten oder Kinderspielplatz ist sensibler als eine Strassenböschung. Darum unterscheiden die Werte der VBBo teils nach Nutzung, und die Verwertung wird auf geeignete Flächen beschränkt.

### 4. Logistik auf der Baustelle
- Belasteten und unbelasteten Boden getrennt abtragen, lagern und transportieren.
- Depots für belasteten Boden kennzeichnen, vor Erosion schützen.
- Nachweise je Ladung (Herkunft, Einstufung, Empfänger).
- Keine «Verdünnung» durch Mischen.

### 5. Kosten und Verantwortung
Die Abklärungen und Mehrkosten für belasteten Boden sind meist Sache der Bauherrschaft; im Werkvertrag sollte geregelt sein, wie Unvorhergesehenes abgerechnet wird. Für die Unternehmung wichtig: Verdacht melden, nicht eigenmächtig verschieben, dokumentieren.

### 6. Typische Fehler
- Gartenboden «weil schön» für Spielplätze verwendet.
- Boden aus Prüfperimetern ohne Analyse an Landwirte abgegeben.
- Belastete und unbelastete Böden im selben Depot.
- Analysen nur vom Untergrund, nicht vom Oberboden.

### 7. Grenzen der eigenen Kompetenz
Probenahme, Analysenbeurteilung und Einstufung gehören zu Fachpersonen. Ihre Aufgabe: Verdacht früh erkennen, Abklärungen auslösen, die Umsetzung auf der Baustelle organisieren und kontrollieren.

### 8. Arbeitsschutz
Bei stärker belasteten Böden (z. B. Schiessanlagen, Industrieareale) können Staub und Hautkontakt ein Gesundheitsrisiko sein. Die Fachperson gibt Hinweise; der Arbeitgeber legt Schutzmassnahmen fest (Staubvermeidung durch Befeuchten, Hygiene, Schutzausrüstung). Hier verbinden sich Umwelt- und Arbeitssicherheit erneut.

§> Vorgehen sinngemäss nach BAFU-Vollzugshilfe und kantonalen Unterlagen; Prüfperimeter-Bezeichnungen kantonal verschieden.` },
      { id: 'm4-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm4-q18' },
      { id: 'm4-l4-abw', kind: 'decision', title: 'Abwägung: Boden im Prüfperimeter', questionId: 'm4-d04' },
      { id: 'm4-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Verwertungskonzept für Boden', taskId: 'm4-t4' },
      { id: 'm4-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m4-q19', 'm4-q20', 'm4-q21'] },
      { id: 'm4-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm4-p4' },
      { id: 'm4-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Richtwert – Prüfwert – Sanierungswert: Ursachen angehen – Gefährdung abklären – Nutzungen verbieten.',
        'Verdacht: Strassenränder, Gärten, Rebberge, Schiessanlagen, Industrie, Auffüllungen.',
        'Prüfperimeter prüfen; vor Verschiebung analysieren.',
        'Verwertbar, eingeschränkt verwertbar, nicht verwertbar – Einstufung durch Fachperson.',
        'Getrennt abtragen, lagern, transportieren; nicht mischen.',
      ] },
      { id: 'm4-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['vbbo', 'vvea', 'bafu-boden-verwertung', 'kanton-boden'] },
    ],
  },
  // =====================================================================
  {
    id: 'm4-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Bodenschutz planen: AVOR, Erosion, bodenkundliche Baubegleitung',
    topics: ['m4-planung'],
    objectives: [
      'Bodenschutz in der AVOR und im Installationsplan verankern',
      'Erosion auf Baustellen verhindern',
      'Rolle und Grenzen der bodenkundlichen Baubegleitung und der eigenen Fachkompetenz kennen',
    ],
    steps: [
      { id: 'm4-l5-situation', kind: 'situation', title: 'Einstieg: Die Auflage im Kleingedruckten', text: `In der Baubewilligung für eine Erschliessungsstrasse steht: «Für die Bauarbeiten ist eine bodenkundliche Baubegleitung (BBB) beizuziehen. Ein Bodenschutzkonzept ist vor Baubeginn der Fachstelle einzureichen.» Die Offerte Ihrer Unternehmung enthält dazu nichts, die Arbeiten beginnen in drei Wochen.

Was tun Sie jetzt?` },
      { id: 'm4-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m4-q22', 'm4-q23'] },
      { id: 'm4-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Bodenschutz wird in der Planung gewonnen**: Installationsplan, Pisten, Depots, Termine und Reserven entscheiden, ob er auf der Baustelle gelingt.

**Erosion** – Abschwemmen von Boden durch Regen – trifft offene Flächen, Depots und Böschungen; sie verschmutzt Strassen und Gewässer. Gegenmittel: rasch begrünen, abdecken, Wasser fassen.

**Die bodenkundliche Baubegleitung (BBB)** ist eine Fachperson, die bei grösseren Projekten das Bodenschutzkonzept erstellt oder prüft, die Bodenarbeiten freigibt und kontrolliert. Wann sie verlangt wird, bestimmen Bewilligung und Kanton.

**Grenzen**: Bodenkundliche Beurteilungen gehören zur Fachperson – Ihre Aufgabe ist Organisation, Umsetzung und Kontrolle.` },
      { id: 'm4-l5-explain', kind: 'explain', title: 'Bodenschutz in der AVOR', text: `### Bodenschutzkonzept
Es beschreibt sinngemäss: betroffene Flächen und Böden (Kartierung), Schutzflächen (nicht beanspruchen), Pisten und Installationsflächen, Abtrag, Depots, Rekultivierung, Maschinen und Befahrbarkeitsregeln, Zuständigkeiten und Kontrollen. Bei grösseren Projekten erstellt es die BBB im Auftrag der Bauherrschaft.

### Was die AVOR daraus macht
- **Installationsplan**: Pisten, Depots, Schutzflächen (abgezäunt), Waschplätze und Tankstellen nicht auf Boden.
- **Terminplan**: Bodenarbeiten in trockene Perioden, Reserve für Regentage, Ausweicharbeiten.
- **Maschinenliste**: Bodendruck, Raupen, Pistenpflicht für Lastwagen.
- **Instruktion**: Baggerführer und Chauffeure kennen die Regeln (Befahrbarkeit, Depots, Schutzflächen).
- **Vertrag**: Regentage, Stillstand, Pisten und Rekultivierung als Positionen.
- **Kontrolle**: Begehungen, Fotos, Protokoll der Freigaben.

### Erosion
Offene Böden, frische Depots und Böschungen sind bei Starkregen gefährdet. Massnahmen: Flächen nur so lange wie nötig offen lassen, rasch begrünen oder abdecken (Mulch, Vlies), Hangwasser fassen und ableiten, Absetzbecken für Schlammwasser (Bezug Modul 2), Fahrwege sauber halten.` },
      { id: 'm4-l5-explain-2', kind: 'explain', title: 'Bodenkundliche Baubegleitung und Grenzen der Kompetenz', text: `### Was die BBB tut (sinngemäss, je nach Auftrag)
- Bodenschutzkonzept erstellen oder prüfen.
- Instruktion der Beteiligten vor Baubeginn.
- Bodenfeuchte überwachen und Bodenarbeiten freigeben.
- Abtrag, Depots, Rekultivierung begleiten und kontrollieren.
- Berichte an Bauherrschaft und Fachstelle, Abnahme der Rekultivierung.
Die Bodenkundliche Gesellschaft der Schweiz (BGS) anerkennt Fachpersonen für die bodenkundliche Baubegleitung und führt eine Liste (laut externer Prüfung); welche Qualifikation verlangt wird, bestimmen Bewilligung und Kanton.

### Wann wird eine BBB verlangt?
Typisch bei grösseren Eingriffen in Kulturland, Leitungsbauten über lange Strecken, Materialabbau und Deponien, Terrainveränderungen mit Bodenverschiebungen. Eine schweizweit einheitliche Flächenschwelle gibt es nicht: Einzelne Kantone nennen in ihren Merkblättern Richtgrössen (z. B. der Kanton Zürich), andere entscheiden projektbezogen. Massgebend ist die Auflage in der Bewilligung.

### Ihre Rolle als Umweltbeauftragter
- Auflagen zum Boden in der AVOR erkennen und umsetzen.
- Zusammenarbeit mit der BBB organisieren (Ansprechperson, Freigaben, Kommunikation an die Poliere).
- Baustelle kontrollieren und Abweichungen melden.
- Eigene Grenzen kennen: keine bodenkundlichen Gutachten, keine Einstufung von Belastungen, keine Freigaben anstelle der Fachperson.

§> BBB-Anerkennung durch die BGS laut externer Prüfung; keine bundesweite Flächenschwelle – kantonales Merkblatt und Bewilligung massgebend.` },
      { id: 'm4-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Logistikzentrum auf der grünen Wiese', context: 'Hochbau', text: `Für ein Logistikzentrum auf 4 ha Ackerland erstellt die BBB ein Bodenschutzkonzept. Die AVOR der Bauunternehmung übernimmt es in den Installationsplan: Schutzflächen für die spätere Grünzone sind abgezäunt, die Pisten aus Kies auf Vlies, die Depots am Rand. Der Polier ruft jeden Morgen die Freigabe der BBB ab; an zwei Wochen im Herbst ruhen Bodenarbeiten, die Equipe arbeitet am Fundament.

**Lernpunkt**: Wenn die Regeln im Ablauf verankert sind, wird Bodenschutz Routine statt Störung.` },
      { id: 'm4-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Erosion an einer neuen Böschung', context: 'Tiefbau', text: `Nach dem Bau einer Erschliessungsstrasse ist eine 15 m hohe Böschung noch nicht begrünt. Ein Gewitter schwemmt Boden auf die Strasse und in den Bach. Die Gemeinde verlangt die Reinigung, die Fachstelle prüft eine Anzeige. Danach werden Böschungen sofort nach Fertigstellung angesät und mit Erosionsschutzmatten gesichert, das Hangwasser oben abgefangen.

**Lernpunkt**: Erosionsschutz ist Teil der Bauetappe, nicht eine spätere Gartenarbeit.` },
      { id: 'm4-l5-deep', kind: 'deep', title: 'Fachvertiefung: Bodenschutz als Planungs- und Führungsaufgabe', text: `### 1. Die Kostenfalle
Bodenschutzmassnahmen (Pisten, Depots, Reserve für Regentage, BBB) kosten sichtbar Geld. Die Folgekosten von Bodenschäden (Entschädigungen, Nachbesserung, Streit, Verfahren) sind unsichtbar – bis sie anfallen. Deshalb gehören die Massnahmen in Offerte und Vertrag: als eigene Positionen, mit klarer Abrechnung für Regentage.

### 2. Wenn die Auflage in der Offerte fehlt
Fehlen Auflagen zum Boden in der Ausschreibung, ist das ein Mangel der Ausschreibung – aber die Auflagen gelten trotzdem. Richtig ist: sofort die Bauleitung bzw. Bauherrschaft informieren, Mehraufwand als Nachtrag anmelden, die Umsetzung sicherstellen. Arbeiten ohne die verlangte BBB zu beginnen, ist keine Option.

### 3. Kommunikation auf der Baustelle
Baggerführer und Chauffeure entscheiden im Minutentakt, wo sie fahren. Sie brauchen einfache Regeln: «Lastwagen nur auf der Piste», «Depot nicht befahren», «bei Regen keine Bodenarbeiten – Polier fragen». Sichtbare Massnahmen (Zäune, Schilder) helfen mehr als lange Konzepte.

### 4. Zusammenarbeit mit Landwirten und Grundeigentümern
Beim Leitungsbau über Kulturland sind Landwirte wichtige Partner: Sie kennen ihre Böden, sie bewirtschaften danach, und sie haben Anspruch auf Entschädigung. Eine Zustandsaufnahme vor Baubeginn (mit Fotos), regelmässige Information und eine vereinbarte Folgebewirtschaftung vermeiden Konflikte.

### 5. Kontrolle und Dokumentation
- Begehungsprotokolle mit Fotos (Pisten, Depots, Spuren, Erosion).
- Freigaben der BBB (Datum, Flächen).
- Abweichungen mit Massnahmen.
- Abnahmeprotokoll der Rekultivierung.
Diese Dokumentation schützt die Unternehmung, wenn später Ertragsausfälle geltend gemacht werden.

### 6. Grenzen der eigenen Fachkompetenz
Bodenkunde ist ein eigenes Fachgebiet. Gute Umweltbeauftragte erkennen, wann eine Fachperson nötig ist, stellen die richtigen Fragen und setzen deren Empfehlungen in der Baustellenorganisation um. Eine Einstufung von Böden, eine Beurteilung von Verdichtungen oder eine Freigabe von Bodenarbeiten ohne Fachperson kann teuer werden – fachlich und rechtlich.

### 7. Verbindung zum Managementsystem
Im ISO-14001-System ist Boden ein Umweltaspekt vor allem im Tief- und Leitungsbau. Ein Firmenstandard (z. B. «Bodenschutz-Startcheck» mit Pisten, Depots, Instruktion) macht die Anforderungen auf allen Baustellen gleich.

### 8. Typische Fehler
- Bodenschutzkonzept liegt im Container, aber niemand hat es gelesen.
- Schutzflächen nicht abgezäunt – nach zwei Wochen sind sie Lagerplatz.
- Regentage nicht geregelt, deshalb Druck zum Weiterarbeiten.
- Neue Subunternehmer ohne Instruktion.

§> Vertragliche Aussagen allgemein; massgebend sind Werkvertrag, Bewilligung und kantonale Vorgaben.` },
      { id: 'm4-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm4-q24' },
      { id: 'm4-l5-abw', kind: 'decision', title: 'Abwägung: BBB fehlt in der Offerte', questionId: 'm4-d05' },
      { id: 'm4-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Bodenschutz in der AVOR einer Leitungsbaustelle', taskId: 'm4-t5' },
      { id: 'm4-l5-feynman', kind: 'feynman', title: 'Erklären Sie es dem Baggerführer (Feynman-Methode)', feynmanId: 'm4-f1' },
      { id: 'm4-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m4-q25', 'm4-q26', 'm4-q27'] },
      { id: 'm4-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm4-p5' },
      { id: 'm4-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Bodenschutz wird in AVOR, Installationsplan, Terminplan und Vertrag gewonnen.',
        'Erosion: Flächen kurz offen, rasch begrünen/abdecken, Wasser fassen.',
        'BBB: Konzept, Freigaben, Kontrolle, Abnahme – wenn Bewilligung oder Kanton es verlangen.',
        'Fehlende Auflagen in der Offerte: melden, Nachtrag, trotzdem umsetzen.',
        'Eigene Grenzen kennen: Bodenkundliche Beurteilung durch Fachperson.',
      ] },
      { id: 'm4-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-boden-bauen', 'kanton-boden', 'vbbo', 'gschg'] },
    ],
  },
];
