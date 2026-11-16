import type { Lesson } from '../types';

// Modul 0 «Grundlagen auffrischen». Kurzes Auffrischungsformat (format: 'auffrischung'):
// Einstieg, Vorwissen, Kurz erklärt, Erklärung, Schema, Beispiele Hoch- und Tiefbau, Zusammenfassung,
// Wiederholung, Quellen. Vertiefung, Abwägung und Baustellenaufgaben folgen in den Fachmodulen.
const M = 'm0';
const E = 'entwurf' as const;
const F = 'auffrischung' as const;

export const M0_LESSONS: Lesson[] = [
  {
    id: 'm0-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 10, format: F,
    title: 'Wie Umweltschäden entstehen: Quelle, Weg, Schutzgut',
    topics: ['m0-wirkung'],
    objectives: [
      'Jede Umweltgefahr mit «Quelle – Weg – Schutzgut» beschreiben',
      'Emission und Immission unterscheiden',
      'Erklären, warum Massnahmen zuerst an der Quelle ansetzen',
    ],
    steps: [
      { id: 'm0-l1-situation', kind: 'situation', title: 'Einstieg: Drei Probleme, ein Muster', text: `Montagmorgen auf drei Baustellen: Auf der ersten läuft graues Waschwasser in einen Schacht. Auf der zweiten beschweren sich Anwohnende über einen Abbauhammer. Auf der dritten fährt ein Dumper über nassen Ackerboden.

Drei verschiedene Themen – Wasser, Lärm, Boden. Und doch lassen sich alle drei mit derselben Frage ordnen: **Woher kommt es, wie gelangt es dorthin, und wen oder was trifft es?**` },
      { id: 'm0-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q01', 'm0-q02'] },
      { id: 'm0-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `Jede Umweltgefahr hat drei Glieder: die **Quelle** (wo es entsteht), den **Weg** (wie es sich ausbreitet) und das **Schutzgut** (wen oder was es trifft). Das Umweltschutzgesetz nennt Lärm, Luftverunreinigungen, Erschütterungen und Strahlen an der Quelle **[[emission|Emission]]**, am Ort der Wirkung **[[immission|Immission]]**. Massnahmen setzen zuerst an der Quelle an – vorsorglich, auch wenn sich niemand beschwert.` },
      { id: 'm0-l1-explain', kind: 'explain', title: 'Das Grundmuster aller Module', text: `### Drei Glieder
- **Quelle**: Maschine, Verfahren, Material oder Tätigkeit – z. B. Waschen von Geräten, Abbauhammer, Dieselmotor, Bodenabtrag bei Nässe.
- **Weg**: wie sich die Einwirkung ausbreitet – über Schächte und Leitungen, durch die Luft, durch den Boden ins Grundwasser, als Schall über Strassen und Fassaden.
- **Schutzgut**: wer oder was betroffen ist – Bach und Fische, Grundwasser, Boden, Anwohnende, Arbeitnehmende, Klima.

### Wo ansetzen?
1. **An der Quelle** – am wirksamsten und gesetzlich vorrangig: Art. 11 Abs. 1 USG verlangt, Luftverunreinigungen, Lärm, Erschütterungen und Strahlen durch Massnahmen bei der Quelle zu begrenzen.
2. **Am Weg** – wenn die Quelle nicht ganz zu vermeiden ist: Schacht abdecken, Auffangwanne, Abschirmung, Distanz.
3. **Beim Schutzgut** – nur ergänzend: z. B. Information der Nachbarschaft, Kontrolle des Bachs.

### Vorsorge und Verursacher
Das **[[vorsorgeprinzip|Vorsorgeprinzip]]** (Art. 1 Abs. 2 USG) verlangt, Einwirkungen, die schädlich oder lästig werden könnten, frühzeitig zu begrenzen. Das **[[verursacherprinzip|Verursacherprinzip]]** (Art. 2 USG) sagt, wer die Kosten trägt: wer die Massnahmen verursacht.

§> Begriffe und Grundsätze nach Art. 1, 2, 7 und 11 USG (Fedlex-Fassung verglichen, automatisierter Abgleich am 16.11.2026). «Quelle – Weg – Schutzgut» ist ein didaktisches Denkmuster, kein Gesetzesbegriff.` },
      { id: 'm0-l1-diagram', kind: 'diagram', title: 'Schema: Von der Quelle zur Wirkung', diagram: 'emission', caption: 'Dasselbe Schema gilt für Wasser, Luft, Lärm und Boden. Zuerst an der Quelle ansetzen.' },
      { id: 'm0-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der Waschplatz', context: 'Hochbau', text: `Beim Rohbau eines Mehrfamilienhauses werden Kübel und Pumpenschlauch auf dem Vorplatz gewaschen. **Quelle**: das alkalische Waschwasser. **Weg**: Vorplatz – Schacht – Meteorleitung. **Schutzgut**: der Bach 200 m weiter.

Die Polierin stoppt das Waschen, unterbricht den Weg (Schacht abdecken) und richtet danach einen Waschplatz mit Absetzen und Neutralisation ein – Massnahme an der Quelle.` },
      { id: 'm0-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Der Kompressor', context: 'Tiefbau', text: `Beim Leitungsbau in einer Wohnstrasse läuft ein Dieselkompressor direkt vor einem Schlafzimmerfenster. **Quelle**: Kompressor. **Weg**: Luftschall über 4 m. **Schutzgut**: Anwohnende.

Wirksam ist zuerst die Quelle (leiserer bzw. elektrischer Kompressor), dann der Weg (Standort weiter weg, hinter Material oder Container). Ein Brief an die Nachbarn ist gut – ersetzt aber keine Massnahme.` },
      { id: 'm0-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Jede Umweltgefahr: Quelle → Weg → Schutzgut.',
        'Emission an der Quelle, Immission am Ort der Wirkung (Art. 7 Abs. 2 USG).',
        'Zuerst an der Quelle ansetzen (Art. 11 USG), dann am Weg, beim Schutzgut nur ergänzend.',
        'Vorsorge (Art. 1 Abs. 2 USG) und Verursacherprinzip (Art. 2 USG) gelten immer.',
        'Vertieft in Modul 1 (Umweltrecht) und in jedem Fachmodul.',
      ] },
      { id: 'm0-l1-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q03', 'm0-q04', 'm0-q05', 'm0-q06'] },
      { id: 'm0-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'gschg', 'praxis'] },
    ],
  },
  {
    id: 'm0-l2', moduleId: M, level: 1, order: 2, review: E, minutes: 12, format: F,
    title: 'Wasser: Grundwasser, Bäche und was ihnen schadet',
    topics: ['m0-wasser'],
    objectives: [
      'Den Weg des Wassers auf der Baustelle verstehen: Regen, Schächte, Leitungen, Gewässer, Grundwasser',
      'Erklären, warum Trübung, hoher pH-Wert und Öl Gewässer schädigen',
      'Die Grundregel des Gewässerschutzes (Art. 6 GSchG) kennen',
    ],
    steps: [
      { id: 'm0-l2-situation', kind: 'situation', title: 'Einstieg: «Da ist doch gar kein Bach»', text: `Ein Lernender kippt den Rest aus dem Farbkübel neben dem Container auf den Kies: «Hier ist weit und breit kein Bach.» Die Bauführerin schüttelt den Kopf. Was weiss sie, was der Lernende nicht weiss?` },
      { id: 'm0-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q07', 'm0-q08'] },
      { id: 'm0-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Gewässer** sind nicht nur Bäche und Seen, sondern auch das **Grundwasser** unter unseren Füssen. In der Schweiz werden laut BAFU **mehr als 80 %** des Trink- und Brauchwassers aus Grundwasser gewonnen. Was auf der Baustelle versickert oder in einen Schacht läuft, kann ein Gewässer erreichen. Darum gilt: Stoffe, die Wasser verunreinigen können, gehören weder in Schächte noch ins Erdreich (Art. 6 GSchG).` },
      { id: 'm0-l2-explain', kind: 'explain', title: 'Wie Wasser auf der Baustelle unterwegs ist', text: `### Der Weg des Wassers
- **Regen** fällt auf Plätze, Dächer und offene Baugruben.
- **[[meteorwasser|Meteorwasser]]** (Regenwasser) fliesst im **[[trennsystem|Trennsystem]]** über eigene Leitungen direkt oder über eine Versickerung in ein Gewässer – **ohne Reinigung** in der Kläranlage.
- **[[schmutzwasser|Schmutzwasser]]** fliesst zur Kläranlage (ARA). Auch dort darf nicht alles hinein – die ARA ist für häusliches Abwasser ausgelegt.
- **Versickerung** bringt Wasser durch den Boden ins **Grundwasser**.

Welcher Schacht wohin führt, steht im Entwässerungsplan der Gemeinde. Ohne Plan gilt: Jeder Schacht kann direkt in einen Bach führen.

### Was Gewässern schadet
- **Trübung** (Feinstoffe aus Aushub und Wasserhaltung): verschlammt das Bachbett und erstickt Kleinlebewesen und Fischlaich.
- **Hoher [[ph|pH-Wert]]** (Zement, Beton): Frisches Betonwaschwasser ist stark alkalisch (oft pH 11–13) und für Fische giftig.
- **Öl, Treibstoff, Chemikalien**: Schon kleine Mengen bilden einen Film und schädigen Lebewesen; im Grundwasser bleiben sie lange.

### Die Grundregel
Art. 6 GSchG untersagt, Stoffe, die Wasser verunreinigen können, mittelbar oder unmittelbar in ein Gewässer einzubringen oder versickern zu lassen. Verschmutztes Abwasser muss behandelt werden (Art. 7 GSchG).

§> Art. 6 und 7 GSchG mit der Fedlex-Fassung verglichen (automatisierter Abgleich am 16.11.2026). Anteil Grundwasser laut BAFU-Seite «Grundwasser» (veröffentlicht 25.2.2025). Einleitbedingungen und Behandlung: Modul 2.` },
      { id: 'm0-l2-diagram', kind: 'diagram', title: 'Welches Wasser darf wohin?', diagram: 'wasserwege', caption: 'Wählen Sie eine Wasserart. Vertieft in Modul 2, Lektion 2.' },
      { id: 'm0-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Farbreste im Kies', context: 'Hochbau', text: `Die Bauführerin aus dem Einstieg erklärt: Unter dem Kies liegt der Untergrund, darunter das Grundwasser. Lösungsmittel und Farbreste können dorthin gelangen – und dort lange bleiben. Farbreste gehören in den vorgesehenen Behälter und werden fachgerecht entsorgt.` },
      { id: 'm0-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die trübe Wasserhaltung', context: 'Tiefbau', text: `In einer Baugrube fördert eine Tauchpumpe lehmiges Wasser direkt in einen Strassenschacht. Zehn Minuten später ist der Bach unterhalb der Einleitstelle milchig-braun. **Quelle**: Feinstoffe in der Baugrube. **Weg**: Pumpe – Schacht – Meteorleitung. **Schutzgut**: Bach.

Richtig: Pumpe stoppen, sofern die Baugrube sicher bleibt, und das Wasser über ein Absetzbecken gemäss Bewilligung führen – vertieft in Modul 2, Lektion 4.` },
      { id: 'm0-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Gewässer sind auch das Grundwasser – mehr als 80 % des Trink- und Brauchwassers stammen daraus (BAFU).',
        'Meteorwasser fliesst ungereinigt in Gewässer; nichts Verschmutztes in Meteorschächte.',
        'Trübung, hoher pH-Wert und Öl sind die typischen Baustellen-Gefahren für Gewässer.',
        'Art. 6 GSchG: nichts einbringen oder versickern lassen, was Wasser verunreinigen kann.',
        'Vertieft in Modul 2 (Gewässerschutz) und Modul 7 (Gefahrstoffe).',
      ] },
      { id: 'm0-l2-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q09', 'm0-q10', 'm0-q11', 'm0-q12'] },
      { id: 'm0-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'bafu-grundwasser', 'gemeinde-entwaesserung', 'kanton-merkblatt'] },
    ],
  },
  {
    id: 'm0-l3', moduleId: M, level: 1, order: 3, review: E, minutes: 10, format: F,
    title: 'Boden: Aufbau, Funktionen und warum er so empfindlich ist',
    topics: ['m0-boden'],
    objectives: [
      'Boden im Sinne des Umweltrechts von Aushub unterscheiden',
      'Ober- und Unterboden erkennen',
      'Erklären, warum Verdichtung so schwer rückgängig zu machen ist',
    ],
    steps: [
      { id: 'm0-l3-situation', kind: 'situation', title: 'Einstieg: «Ist doch nur Dreck»', text: `Für eine Leitung quer über eine Wiese soll ein Graben gezogen werden. Der Maschinist will die ganze Erde auf einen Haufen schieben und später wieder einfüllen: «Ist doch nur Dreck.» Ein Jahr später wächst auf dem Streifen kaum etwas, und nach jedem Regen steht Wasser.` },
      { id: 'm0-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q13', 'm0-q14'] },
      { id: 'm0-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Boden** ist laut Umweltschutzgesetz nur die oberste, unversiegelte Erdschicht, in der Pflanzen wachsen können (Art. 7 Abs. 4bis USG). Er besteht aus **[[oberboden|Oberboden]]** und **Unterboden**; darunter liegt der Untergrund. Boden braucht Jahrhunderte, um zu entstehen. Er wird getrennt abgetragen, gelagert und wieder eingebaut – und nur bei geeigneter Feuchte befahren, sonst droht **[[verdichtung|Verdichtung]]**.` },
      { id: 'm0-l3-explain', kind: 'explain', title: 'Was Boden leistet und was ihn zerstört', text: `### Aufbau
- **Oberboden** (A-Horizont): dunkel, humusreich, stark belebt.
- **Unterboden** (B-Horizont): heller, durchwurzelt; gibt Struktur für Wasser und Luft.
- **Untergrund** (C-Horizont): verwittertes Ausgangsgestein – gilt beim Bauen als Aushub, nicht mehr als Boden.

### Funktionen
Boden speichert und filtert Wasser, ist Lebensraum für Pflanzen und unzählige Bodenlebewesen, Grundlage der Nahrungsmittelproduktion und Teil des Wasser- und Kohlenstoffkreislaufs. Diese Funktionen hängen an seiner **Struktur**: an Poren für Luft und Wasser.

### Was ihn zerstört
- **Verdichtung**: Schwere Maschinen auf nassem Boden zerdrücken die Poren. Besonders im Unterboden ist das kaum oder nur über sehr lange Zeit rückgängig zu machen.
- **Vermischung**: Ober- und Unterboden zusammen abgetragen – die Schichten lassen sich nicht mehr trennen.
- **Erosion**: ungeschützte Depots und Böschungen werden ausgewaschen.
- **Schadstoffe**: Öl, Treibstoff und belastetes Material machen Boden zu Sonderabfall.

### Die Feuchte entscheidet
Je nasser der Boden, desto leichter wird er verdichtet. Ob befahren werden darf, wird anhand der Bodenfeuchte beurteilt (Modul 4).

§> Bodenbegriff nach Art. 7 Abs. 4bis USG (Fedlex-Fassung verglichen, automatisierter Abgleich am 16.11.2026). Aufbau und Umgang nach der BAFU-Vollzugshilfe «Bodenschutz beim Bauen» sinngemäss; Einzelheiten in Modul 4.` },
      { id: 'm0-l3-diagram', kind: 'diagram', title: 'Schema: Die Schichten', diagram: 'bodenschichten', caption: 'Ober- und Unterboden getrennt abtragen, lagern und wieder einbauen.' },
      { id: 'm0-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der Gartenstreifen', context: 'Hochbau', text: `Beim Einfamilienhaus wird der Garten als Installationsplatz genutzt. Ohne Schutz fahren Betonmischer wochenlang darüber. Danach versickert dort kein Regen mehr. Besser: vorher Oberboden abtragen und lagern oder die Fläche mit Lastverteilung (z. B. Platten) schützen und nur bei trockenem Boden befahren.` },
      { id: 'm0-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Der Leitungsgraben', context: 'Tiefbau', text: `Zurück zum Einstieg: Richtig wäre gewesen, Oberboden, Unterboden und Untergrund **getrennt** abzutragen und in umgekehrter Reihenfolge wieder einzubauen – und bei nassem Wetter zu pausieren. Dann wächst die Wiese im nächsten Jahr wieder. Vertieft in Modul 4.` },
      { id: 'm0-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Boden = oberste, unversiegelte Schicht, in der Pflanzen wachsen (Art. 7 Abs. 4bis USG); darunter ist Aushub.',
        'Oberboden dunkel und belebt, Unterboden heller; beide getrennt behandeln.',
        'Verdichtung ist kaum rückgängig zu machen – Bodenfeuchte beachten.',
        'Vertieft in Modul 4 (Bodenschutz) und Modul 3 (Aushub).',
      ] },
      { id: 'm0-l3-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q15', 'm0-q16', 'm0-q17', 'm0-q18'] },
      { id: 'm0-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'bafu-boden-bauen', 'vbbo', 'vvea'] },
    ],
  },
  {
    id: 'm0-l4', moduleId: M, level: 1, order: 4, review: E, minutes: 12, format: F,
    title: 'Luft und Lärm: Staub, Abgase und Dezibel',
    topics: ['m0-luftlaerm'],
    objectives: [
      'Feinstaub, Dieselruss und Staub auf der Baustelle einordnen',
      'Die logarithmische Dezibel-Skala mit drei Faustregeln anwenden',
      'Wissen, wie Baulärm geregelt ist (Massnahmen statt Grenzwerte)',
    ],
    steps: [
      { id: 'm0-l4-situation', kind: 'situation', title: 'Einstieg: «Zwei Hämmer, doppelt so schnell – doppelt so laut?»', text: `Der Polier will die Abbrucharbeiten beschleunigen und einen zweiten Abbauhammer einsetzen. Eine Anwohnerin fürchtet: «Dann ist es ja doppelt so laut!» Und auf dem Platz stäubt es bei jedem Windstoss. Wer hat recht – und was davon ist eigentlich gefährlich?` },
      { id: 'm0-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q19', 'm0-q20'] },
      { id: 'm0-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**[[feinstaub|Feinstaub]]** (z. B. PM10: Partikel bis etwa 10 Mikrometer) ist oft unsichtbar und gelangt tief in die Atemwege; auf Baustellen entsteht er beim Abbruch, Schneiden, Fräsen und durch Dieselmotoren. **Schall** wird in **[[dezibel|Dezibel]]** gemessen – einer logarithmischen Skala: Zwei gleich laute Quellen ergeben **+3 dB**, «doppelt so laut» empfinden wir etwa **+10 dB**, doppelter Abstand bringt im Freien etwa **–6 dB**.` },
      { id: 'm0-l4-explain', kind: 'explain', title: 'Was man über Luft und Lärm wissen muss', text: `### Luft
- **Grober Staub** sieht man und spürt man – er verschmutzt und belästigt.
- **Feinstaub** (PM10, PM2.5) sieht man kaum; er wird eingeatmet und belastet Atemwege und Herz-Kreislauf-System.
- **Dieselruss** aus Baumaschinen und Aggregaten ist besonders problematisch; darum gelten für Baumaschinen Partikelanforderungen (LRV) – Modul 5.
- **Quarzfeinstaub** beim Schneiden und Schleifen von Beton und Stein betrifft vor allem die Arbeitnehmenden (Suva).

Wirksam ist die Begrenzung an der Quelle: benetzen, staubarme Verfahren, Partikelfilter, Leerlauf vermeiden.

### Lärm: die Dezibel-Skala
Dezibel werden nicht einfach addiert. Drei Faustregeln (für idealisierte Bedingungen):
- **+3 dB**: zwei gleich laute Quellen.
- **+10 dB**: wird etwa als doppelt so laut empfunden.
- **–6 dB**: doppelter Abstand zu einer einzelnen Quelle im Freien. Hauswände und Gassen reflektieren und verringern diesen Gewinn.

### Wie Baulärm geregelt ist
Für Baulärm gibt es **keine Belastungsgrenzwerte** wie für Strassenlärm. Die **Baulärm-Richtlinie des BAFU** legt bauliche und betriebliche Massnahmen fest (Massnahmenstufen A, B, C). Für die Baustelle verbindlich wird die Stufe über die Bewilligung bzw. Auflage – dazu kommen kantonale und kommunale Arbeits- und Ruhezeiten.

§> Luft: LRV und BAFU-Richtlinie «Luftreinhaltung auf Baustellen» sinngemäss (Modul 5). Lärm: Baulärm-Richtlinie des BAFU (Stand 2011), Rechtsnatur siehe Quelle; Faustregeln gelten unter idealisierten Bedingungen (Modul 6).` },
      { id: 'm0-l4-diagram', kind: 'diagram', title: 'Drei Faustregeln für Dezibel', diagram: 'db-regeln', caption: 'Faustregeln unter idealisierten Bedingungen – keine Messung.' },
      { id: 'm0-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der zweite Hammer', context: 'Hochbau', text: `Zurück zum Einstieg: Der zweite Hammer erhöht den Pegel um etwa 3 dB – deutlich hörbar, aber nicht «doppelt so laut». Die Belastung verkürzt sich dafür zeitlich. Ob das für die Nachbarschaft besser ist, hängt von Dauer, Zeitfenstern und Auflagen ab. Noch wirksamer: Abbruchzange statt Hammer, wo möglich – Modul 6.` },
      { id: 'm0-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Staub auf der Piste', context: 'Tiefbau', text: `Auf der Baupiste einer Erschliessung wirbelt jeder Lastwagen Staub auf, der bis zu den Häusern zieht. Quelle ist die trockene, unbefestigte Piste. Massnahmen an der Quelle: Piste benetzen, Geschwindigkeit begrenzen, Ausfahrt mit Reifenwäsche – vertieft in Modul 5.` },
      { id: 'm0-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Feinstaub (PM10) ist oft unsichtbar und gelangt tief in die Atemwege; Dieselruss und Quarzfeinstaub sind besonders problematisch.',
        'Dezibel: +3 dB zwei gleiche Quellen, +10 dB etwa doppelt so laut, –6 dB bei doppeltem Abstand (idealisiert).',
        'Baulärm: keine Grenzwerte, sondern Massnahmenstufen über Bewilligung bzw. Auflage.',
        'Vertieft in Modul 5 (Luft) und Modul 6 (Baulärm).',
      ] },
      { id: 'm0-l4-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q21', 'm0-q22', 'm0-q23', 'm0-q24'] },
      { id: 'm0-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['lrv', 'bafu-luft', 'suva-staub', 'bafu-baulaerm', 'lsv'] },
    ],
  },
  {
    id: 'm0-l5', moduleId: M, level: 1, order: 5, review: E, minutes: 15, format: F,
    title: 'Stoffe und Zahlen: Konzentration, pH, Durchfluss',
    topics: ['m0-stoffe'],
    objectives: [
      'pH-Werte lesen und die logarithmische Skala verstehen',
      'Konzentrationsangaben (mg/l, mg/kg) und Durchflüsse (l/s, m³/h) umrechnen',
      'Gefahrenpiktogramme für gewässergefährdende Stoffe erkennen',
    ],
    steps: [
      { id: 'm0-l5-situation', kind: 'situation', title: 'Einstieg: Zahlen auf dem Messprotokoll', text: `Im Baucontainer liegt das Protokoll der Absetzanlage: «Zulauf 3 l/s, pH 11.8, nach Neutralisation pH 8.4, abfiltrierbare Stoffe 35 mg/l.» Der neue Bauführer fragt: «Ist das jetzt gut oder schlecht?» Um das zu beantworten, braucht es ein paar Grundbegriffe – und etwas Rechnen.` },
      { id: 'm0-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q25', 'm0-q27'] },
      { id: 'm0-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `Der **[[ph|pH-Wert]]** zeigt, wie sauer (unter 7) oder alkalisch (über 7) Wasser ist; die Skala ist **logarithmisch** – jede Stufe ist ein Faktor 10. **mg/l** (Milligramm pro Liter) gibt an, wie viel eines Stoffes im Wasser ist, **mg/kg** dasselbe für Boden und Material. **1 l/s = 3,6 m³/h.** Das Piktogramm mit totem Fisch und Baum kennzeichnet **gewässergefährdende** Stoffe.` },
      { id: 'm0-l5-explain', kind: 'explain', title: 'Das Zahlen-Werkzeug für die Baustelle', text: `### pH-Wert
- **7** neutral, **unter 7** sauer, **über 7** alkalisch (basisch).
- Logarithmisch: pH 12 ist 10-mal alkalischer als pH 11 und rund **10 000-mal** alkalischer als pH 8.
- Frisches Betonwaschwasser liegt oft bei **pH 11–13**. Kantonale Merkblätter wenden für die Ableitung den Bereich **pH 6.5–9.0** an (Modul 2).
- **Verdünnen ist keine Behandlung**: Um pH 12 auf pH 9 zu bringen, bräuchte es rechnerisch rund das Tausendfache an neutralem Wasser.

### Konzentrationen
- **mg/l** für Wasser; 1 mg/l entspricht 1 g/m³.
- **mg/kg** für Boden, Aushub und Rückbaumaterial (z. B. PAK-Gehalt im Ausbauasphalt).
- **ppm** («parts per million») = Millionstel; in Wasser ungefähr 1 mg/l.

### Mengen und Durchfluss
- **1 l/s = 3,6 m³/h** (3600 Sekunden × 1 Liter).
- **1 m³ = 1000 Liter.**
- Faustrechnung: Füllzeit = Volumen ÷ Zufluss. 20 m³ bei 2 l/s → 20 000 l ÷ 2 l/s = 10 000 s ≈ 2 ¾ Stunden.

### Stoffe erkennen
GHS-Piktogramme und H-Sätze auf dem Etikett zeigen die Gefahr; das **[[sicherheitsdatenblatt|Sicherheitsdatenblatt]]** gibt Auskunft über Lagerung, Schutzmassnahmen und Entsorgung. Gewässergefährdend: Piktogramm «Umwelt», H-Sätze der Reihe H400 (Modul 7).

§> pH-Bereich 6.5–9.0: wie in Modul 2 (GSchV Anhang 3.2, von kantonalen Merkblättern für Baustellenabwasser angewendet). Umrechnungen sind Grundrechenarten. Kennzeichnung nach ChemV sinngemäss.` },
      { id: 'm0-l5-diagram', kind: 'diagram', title: 'Die pH-Skala', diagram: 'ph-skala', caption: 'Logarithmisch: jede Stufe ein Faktor 10.' },
      { id: 'm0-l5-diagram-2', kind: 'diagram', title: 'Umrechnungen auf einen Blick', diagram: 'einheiten', caption: 'Merkhilfe – keine Grenzwerte.' },
      { id: 'm0-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Das Messprotokoll', context: 'Hochbau', text: `Zurück zum Einstieg: Zulauf 3 l/s = 10,8 m³/h. pH 11.8 vor der Neutralisation ist typisch; **nach** der Neutralisation pH 8.4 liegt im Bereich 6.5–9.0, den die kantonalen Merkblätter anwenden. Ob 35 mg/l abfiltrierbare Stoffe zulässig sind, steht in der Einleitbewilligung – die Zahl allein sagt es nicht.` },
      { id: 'm0-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Wie lange darf das Wasser absetzen?', context: 'Tiefbau', text: `Eine Wasserhaltung pumpt 5 l/s = 18 m³/h in einen Absetzcontainer mit 20 m³. Der Container ist also nach gut einer Stunde einmal «durchgespült». Reicht das, damit sich die Feinstoffe absetzen? Genau solche Abschätzungen sind die Grundlage für die Bemessung – Modul 2, Lektion 4, mit Rechner.` },
      { id: 'm0-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'pH: 7 neutral, logarithmisch; Betonwaschwasser oft pH 11–13; verdünnen ist keine Behandlung.',
        'mg/l für Wasser, mg/kg für Boden und Material.',
        '1 l/s = 3,6 m³/h; 1 m³ = 1000 l; Füllzeit = Volumen ÷ Zufluss.',
        'Piktogramm «Umwelt» und H400er-Sätze: gewässergefährdend.',
        'Vertieft in Modul 2 (Wasserbehandlung) und Modul 7 (Stoffe).',
      ] },
      { id: 'm0-l5-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q26', 'm0-q28', 'm0-q29', 'm0-q30'] },
      { id: 'm0-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschv', 'kanton-merkblatt', 'chemv', 'praxis'] },
    ],
  },
  {
    id: 'm0-l6', moduleId: M, level: 1, order: 6, review: E, minutes: 12, format: F,
    title: 'Recht in 15 Minuten: Wer regelt was, und wie verbindlich?',
    topics: ['m0-recht'],
    objectives: [
      'Gesetz, Verordnung, Vollzugshilfe, Norm, Auflage und Vertrag unterscheiden',
      'Die Rollen von Bund, Kantonen und Gemeinden kennen',
      'Vorsorge- und Verursacherprinzip anwenden',
    ],
    steps: [
      { id: 'm0-l6-situation', kind: 'situation', title: 'Einstieg: «Das ist doch nur eine Richtlinie»', text: `Bei der Startsitzung sagt der Subunternehmer: «Die Baulärm-Richtlinie ist doch nur eine Empfehlung, die gilt nicht für uns.» Die Bauleiterin zeigt auf Seite 4 der Baubewilligung. Wer hat recht?` },
      { id: 'm0-l6-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q31', 'm0-q32'] },
      { id: 'm0-l6-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Gesetze** (Parlament) und **Verordnungen** (Bundesrat) gelten direkt. **[[vollzugshilfe|Vollzugshilfen]]** des BAFU richten sich an die Behörden; für die Baustelle verbindlich werden sie über **Bewilligung und Auflagen**. **Normen** (z. B. SIA) gelten, wenn sie vereinbart oder verlangt sind. Den Vollzug machen in der Regel die **Kantone** (Art. 36 USG) – darum unterscheiden sich Merkblätter und Abläufe.` },
      { id: 'm0-l6-explain', kind: 'explain', title: 'Sechs Arten von Regeln', text: `| Art | Wer erlässt sie? | Wie verbindlich? | Beispiel |
|---|---|---|---|
| Gesetz | Bundesversammlung | direkt verbindlich | USG, GSchG |
| Verordnung | Bundesrat | direkt verbindlich | LRV, VVEA, GSchV |
| Vollzugshilfe | BAFU | für Behörden; für die Baustelle über Bewilligung bzw. Auflage | Baulärm-Richtlinie |
| Norm | Fachverbände (SIA, VSS) | wenn im Vertrag oder in der Bewilligung verlangt; sonst Regel der Technik | SIA 431 |
| Auflage | Bewilligungsbehörde | verbindlich für dieses Projekt | Arbeitszeiten, Massnahmenstufe |
| Vertrag | Bauherrschaft und Unternehmung | verbindlich zwischen den Parteien | Recyclingbeton im Werkvertrag |

### Bund, Kanton, Gemeinde
- **Bund**: Gesetze und Verordnungen, Vollzugshilfen (BAFU).
- **Kantone**: vollziehen das Bundesrecht (Art. 36 USG), erlassen eigene Vorschriften und Merkblätter, erteilen Bewilligungen, kontrollieren.
- **Gemeinden**: je nach Kanton Baubewilligung, Entwässerungsreglement, Arbeits- und Ruhezeiten.

### Zwei Prinzipien, die immer gelten
- **[[vorsorgeprinzip|Vorsorge]]** (Art. 1 Abs. 2 USG): frühzeitig begrenzen, was schädlich oder lästig werden könnte.
- **[[verursacherprinzip|Verursacher]]** (Art. 2 USG): wer Massnahmen verursacht, trägt die Kosten.

§> Art. 1, 2 und 36 USG mit der Fedlex-Fassung verglichen (automatisierter Abgleich am 16.11.2026). Rechtsnatur der Vollzugshilfen laut den Publikationen selbst; Einzelheiten in Modul 1.` },
      { id: 'm0-l6-diagram', kind: 'diagram', title: 'Wie verbindlich ist was?', diagram: 'verbindlichkeit', caption: 'Dieselben Kategorien in allen Modulen.' },
      { id: 'm0-l6-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Seite 4 der Bewilligung', context: 'Hochbau', text: `Zurück zum Einstieg: Auf Seite 4 der Baubewilligung steht «Baulärm-Massnahmenstufe B gemäss Baulärm-Richtlinie». Damit ist die Richtlinie für diese Baustelle verbindlich – als Auflage. Die Bauleiterin hat recht; der Subunternehmer muss die Massnahmen der Stufe B umsetzen.` },
      { id: 'm0-l6-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Zwei Kantone, zwei Merkblätter', context: 'Tiefbau', text: `Eine Unternehmung baut eine Leitung über die Kantonsgrenze. Auf beiden Seiten gilt dasselbe Gewässerschutzgesetz – aber die kantonalen Merkblätter zur Baustellenentwässerung und die zuständigen Stellen unterscheiden sich. Darum: für jeden Standort die kantonalen Unterlagen prüfen (in der App unter «Kanton & Standort»).` },
      { id: 'm0-l6-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Gesetz und Verordnung gelten direkt; Vollzugshilfe über Bewilligung bzw. Auflage; Norm über Vertrag oder Bewilligung.',
        'Auflagen sind für das Projekt verbindlich – sie gehören in AVOR und Instruktion.',
        'Den Vollzug machen die Kantone (Art. 36 USG); Abläufe unterscheiden sich je Kanton.',
        'Vorsorge- und Verursacherprinzip gelten immer.',
        'Vertieft in Modul 1 (Umweltrecht) und Modul 8 (Planung und AVOR).',
      ] },
      { id: 'm0-l6-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q33', 'm0-q34', 'm0-q35', 'm0-q36'] },
      { id: 'm0-l6-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'bv', 'bafu-baulaerm', 'sia431', 'fedlex'] },
    ],
  },
  {
    id: 'm0-l7', moduleId: M, level: 1, order: 7, review: E, minutes: 10, format: F,
    title: 'Klima und Ressourcen in Kürze',
    topics: ['m0-klima'],
    objectives: [
      'CO₂-Äquivalente und graue Emissionen erklären',
      'Das Netto-Null-Ziel des Klimagesetzes kennen',
      'Die Grundsätze der Abfallwirtschaft (vermeiden, verwerten, entsorgen) anwenden',
    ],
    steps: [
      { id: 'm0-l7-situation', kind: 'situation', title: 'Einstieg: «Was hat die Baustelle mit dem Klima zu tun?»', text: `Die Bauherrschaft verlangt im Werkvertrag eine «CO₂-Bilanz der Bauphase». Der Bauführer ist ratlos: «Wir verbrennen doch nur ein bisschen Diesel.» Stimmt das?` },
      { id: 'm0-l7-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m0-q37', 'm0-q38'] },
      { id: 'm0-l7-brief', kind: 'brief', title: 'Kurz erklärt', text: `Treibhausgase werden in **CO₂-Äquivalenten** (t CO₂-eq) zusammengezählt. Beim Bauen entsteht ein grosser Teil nicht auf der Baustelle, sondern bei der **Herstellung der Baustoffe** – das sind die **[[graue-emissionen|grauen Emissionen]]**. Das Klimagesetz setzt das Ziel **Netto-Null bis 2050** (Art. 3 KlG). Bei Abfällen gilt: vermeiden, wo möglich; verwerten, wo möglich; den Rest umweltverträglich entsorgen (Art. 30 USG).` },
      { id: 'm0-l7-explain', kind: 'explain', title: 'Klima und Ressourcen beim Bauen', text: `### Wo Treibhausgase entstehen
- **Baustoffe** (graue Emissionen): Zement, Stahl, Aluminium, Glas, Dämmstoffe.
- **Transporte**: Material, Aushub, Abbruch.
- **Bauprozess**: Dieselmaschinen, Aggregate, Baustrom, Heizung von Provisorien.
- **Nutzung**: Heizen, Kühlen, Strom – über Jahrzehnte.
- **Rückbau**: Abbruch, Verwertung, Deponie.

### Scope 1, 2, 3 – drei Schubladen
Eine Treibhausgasbilanz eines Unternehmens ordnet nach dem **[[scope|GHG Protocol]]**: **Scope 1** eigene direkte Emissionen (z. B. eigener Diesel), **Scope 2** eingekaufte Energie (Strom, Fernwärme), **Scope 3** die übrige Wertschöpfungskette (z. B. Baustoffe, Transporte von Lieferanten).

### Rechtlicher Rahmen in einem Satz
Das Klimagesetz verlangt Netto-Null-Treibhausgasemissionen bis 2050 (Art. 3 KlG); nach Art. 5 Abs. 1 KlG müssen alle Unternehmen spätestens 2050 Netto-Null-Emissionen aufweisen. Konkrete Anforderungen an Baustellen kommen heute meist über **Verträge und Ausschreibungen**.

### Ressourcen: vermeiden, verwerten, entsorgen
Art. 30 USG: Die Erzeugung von Abfällen soll soweit möglich vermieden werden; Abfälle müssen soweit möglich verwertet und umweltverträglich entsorgt werden. Auf der Baustelle heisst das: sortenrein trennen, mineralische Rückbaustoffe verwerten, Bauteile wenn möglich wiederverwenden.

§> Art. 3 und 5 KlG sowie Art. 30 USG mit der Fedlex-Fassung verglichen (automatisierter Abgleich am 16.11.2026). Scope-Einteilung nach GHG Protocol sinngemäss; Einzelheiten in Modul 11 und 3.` },
      { id: 'm0-l7-diagram', kind: 'diagram', title: 'Schema: Lebenszyklus eines Gebäudes', diagram: 'lebenszyklus', caption: 'Wo entstehen Emissionen, und wer hat welchen Hebel?' },
      { id: 'm0-l7-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die CO₂-Bilanz der Bauphase', context: 'Hochbau', text: `Zurück zum Einstieg: Der Diesel ist nur ein Teil. Die Bilanz der Bauphase umfasst je nach Vertrag auch Transporte und oft die Baustoffe. Was die Baustelle direkt beeinflusst: Baustrom statt Aggregat, Leerlauf vermeiden, Transporte bündeln, Material sortenrein trennen. Wie man eine Bilanz aufbaut: Modul 11.` },
      { id: 'm0-l7-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Aushub nicht spazieren fahren', context: 'Tiefbau', text: `Bei einer Erschliessung fallen 4000 m³ sauberer Aushub an. Wird er vor Ort oder in der Nähe verwertet statt weit weg deponiert, spart das Transporte, Deponievolumen und Emissionen. Voraussetzung: Er ist sauber und eignet sich – das klärt man vorher (Modul 3).` },
      { id: 'm0-l7-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Treibhausgase werden in CO₂-Äquivalenten gezählt; Baustoffe verursachen die grauen Emissionen.',
        'Scope 1 eigene Emissionen, Scope 2 eingekaufte Energie, Scope 3 Lieferkette.',
        'Klimagesetz: Netto-Null bis 2050 (Art. 3 KlG).',
        'Abfälle: vermeiden, verwerten, umweltverträglich entsorgen (Art. 30 USG).',
        'Vertieft in Modul 11 (Nachhaltigkeit) und Modul 3 (Bauabfälle).',
      ] },
      { id: 'm0-l7-review', kind: 'review', title: 'Wiederholung', questionIds: ['m0-q39', 'm0-q40', 'm0-q41', 'm0-q42'] },
      { id: 'm0-l7-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['klg', 'usg', 'vvea', 'ghg-protocol', 'kbob-oekobilanz'] },
    ],
  },
];
