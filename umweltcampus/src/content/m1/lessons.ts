import type { Lesson } from '../types';

// Modul 1 «Umweltgrundlagen und Schweizer Umweltrecht».
// Rechtsaussagen mit «bestätigt» wurden am 13.11.2026 über kantonale
// Vollzugshilfen, BAFU-Unterlagen, Bundesgerichtsentscheide bzw. Kommentare
// abgeglichen (nicht am Fedlex-Volltext). Übrige: sinngemäss, zu prüfen.

const M = 'm1';
const E = 'entwurf' as const;

export const M1_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm1-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Grundbegriffe und Prinzipien des Umweltrechts',
    topics: ['m1-grundlagen'],
    objectives: [
      'Emission, Immission und Einwirkung unterscheiden und auf Baustellen anwenden',
      'Vorsorge-, Verursacher- und Kooperationsprinzip erklären',
      'Das zweistufige Konzept der Emissionsbegrenzung des USG verstehen',
      'Erkennen, warum Baustellen meist über Richtlinien statt Grenzwerte geregelt sind',
    ],
    steps: [
      { id: 'm1-l1-situation', kind: 'situation', title: 'Einstieg: «Wir halten doch alle Grenzwerte ein»', text: `Abbruch eines Gewerbebaus mitten im Wohnquartier. Ein Anwohner beschwert sich über Staub und Lärm. Der Bauführer sagt am Telefon: «Es gibt für Baustellen keine Grenzwerte, also halten wir alles ein. Und gemessen hat ja niemand.»

Hat er recht? Was verlangt das Umweltrecht von einer Baustelle, wenn es keine Zahl gibt, an der man sich messen kann?` },
      { id: 'm1-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m1-q01', 'm1-q02'] },
      { id: 'm1-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Emissionen entstehen an der Quelle, Immissionen kommen bei den Betroffenen an.** Das Umweltrecht setzt zuerst an der Quelle an.

**Vorsorge**: Belastungen werden begrenzt, bevor sie schädlich werden – so weit es technisch und betrieblich möglich und wirtschaftlich tragbar ist.

**Verursacherprinzip**: Wer eine Massnahme nötig macht, trägt die Kosten.

**Für Baustellen gibt es meist keine Grenzwerte**, sondern Richtlinien mit Massnahmen (Luft, Lärm). Wer die Massnahmen nicht umsetzt, hält das Recht nicht ein – auch ohne Messung.` },
      { id: 'm1-l1-explain', kind: 'explain', title: 'Einwirkungen, Emissionen, Immissionen', text: `Das [[usg|Umweltschutzgesetz]] schützt Menschen, Tiere und Pflanzen, ihre Lebensgemeinschaften und Lebensräume gegen schädliche oder lästige Einwirkungen und erhält die Bodenfruchtbarkeit (Art. 1 USG, sinngemäss).

**Einwirkungen** sind u. a. Luftverunreinigungen, Lärm, Erschütterungen, Strahlen, Gewässerverunreinigungen und Bodenbelastungen (Art. 7 USG, sinngemäss). Für die Baustelle wichtig ist die Unterscheidung:
- [[emission|Emissionen]]: was **an der Quelle** austritt – Abgas des Baggers, Lärm des Abbauhammers, Staub beim Abbruch.
- [[immission|Immissionen]]: was **am Ort der Einwirkung** ankommt – im Schlafzimmer der Nachbarin, im Bach, im Boden.

### Das zweistufige Konzept
1. **Vorsorgliche Emissionsbegrenzung an der Quelle**: so weit, wie es technisch und betrieblich möglich und wirtschaftlich tragbar ist (Art. 11 Abs. 1–2 USG). Das gilt **unabhängig** davon, ob jemand gestört wird.
2. **Verschärfte Begrenzung**, wenn feststeht oder zu erwarten ist, dass die Einwirkungen schädlich oder lästig werden (Art. 11 Abs. 3 USG).

Für dauerhafte Anlagen konkretisieren Verordnungen das mit Grenzwerten. Für **Baustellen** hat der Bund Richtlinien mit Massnahmenkatalogen erlassen: die Baulärm-Richtlinie (enthält bewusst keine Grenzwerte) und die Richtlinie «Luftreinhaltung auf Baustellen». Massstab ist dort die **Umsetzung der Massnahmen**, nicht ein Messwert.

§> Gesetzlich verbindlich (USG, sinngemäss; Art. 11 Abs. 2 «Stand der Technik und wirtschaftliche Tragbarkeit» über BAFU-Unterlagen bestätigt). Richtlinien: Vollzugshilfen, in Bewilligungen meist verbindlich angeordnet.` },
      { id: 'm1-l1-diagram', kind: 'diagram', title: 'Schema: Von der Quelle zur Wirkung', diagram: 'emission', caption: 'Wo ansetzen? An der Quelle (vorsorglich, immer), auf dem Ausbreitungsweg, beim Betroffenen (als letzte Möglichkeit).' },
      { id: 'm1-l1-explain-2', kind: 'explain', title: 'Prinzipien, die Sie in jeder Beratung brauchen', text: `### Vorsorgeprinzip
Einwirkungen, die schädlich oder lästig werden **könnten**, sind frühzeitig zu begrenzen (Art. 1 Abs. 2 USG, sinngemäss). Man wartet nicht, bis jemand krank ist oder der Bach geschädigt.

### Verursacherprinzip
Wer Massnahmen nach dem USG verursacht, trägt die Kosten (Art. 2 USG). Auf der Baustelle heisst das: Die Kosten für Staubschutz, Lärmschutz, Abwasserbehandlung und Entsorgung gehören in die Kalkulation – sie sind kein «Zusatz».

### Gesamtbetrachtung
Einwirkungen werden einzeln und gesamthaft sowie nach ihrem Zusammenwirken beurteilt (Art. 8 USG, sinngemäss). Ein Beispiel: Ein trockenes Abtragsverfahren löst das Abwasserproblem, verursacht aber Staub. Gute Beratung verschiebt Probleme nicht nur.

### Kooperation
Behörden arbeiten mit der Wirtschaft zusammen und können Branchenvereinbarungen fördern (Art. 41a USG, sinngemäss). Für Sie heisst das: Ein guter Draht zur Fachstelle ist kein Zeichen von Schwäche, sondern Teil des Systems.` },
      { id: 'm1-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Abbruch im Quartier', context: 'Hochbau', text: `Abbruch eines Gewerbebaus in Olten, angrenzend Wohnhäuser. Die Baubewilligung ordnet Massnahmenstufe B der Baulärm-Richtlinie und Stufe B der Richtlinie Luft an. Die Unternehmung setzt um: Benetzung beim Abbruch, Staubschutzwand zur Wohnseite, Abbruchzange statt Abbauhammer, wo möglich, lärmintensive Arbeiten nur in den bewilligten Zeitfenstern, Information der Anwohnenden mit Kontaktnummer.

Als die Beschwerde kommt, kann der Bauführer zeigen, welche Massnahmen umgesetzt sind und wann gearbeitet wurde. **Das Vorsorgeprinzip wird über Massnahmen und Nachweise erfüllt, nicht über eine Messung.**` },
      { id: 'm1-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Maschinenpark', context: 'Tiefbau', text: `Für einen Strassenbau setzt eine Unternehmung zwölf Baumaschinen ein. Die Luftreinhalte-Verordnung verlangt für Baumaschinen über 18 kW Partikelfilter bzw. die Einhaltung der Partikelanforderungen (Art. 19a und Anhang 4 Ziff. 3 LRV, bestätigt). Ein Subunternehmer bringt einen älteren Bagger ohne Nachweis.

Die Bauleitung lässt den Bagger nicht einsetzen, bis der Nachweis vorliegt. **Emissionsbegrenzung an der Quelle** heisst hier: Die Maschine selbst muss die Anforderungen erfüllen – egal, ob in der Nähe jemand wohnt.` },
      { id: 'm1-l1-deep', kind: 'deep', title: 'Fachvertiefung: Wie das Umweltrecht denkt', text: `### 1. Aufbau des USG – eine Landkarte
Das USG ist das Rahmengesetz für fast alle Umweltbereiche ausser dem Gewässerschutz (eigenes Gesetz, GSchG), dem Natur- und Heimatschutz (NHG) und dem Wald (WaG). Es enthält allgemeine Grundsätze (Zweck, Prinzipien, Begriffe), Regeln zur Begrenzung von Einwirkungen (Luft, Lärm, Erschütterungen, Strahlen), Bestimmungen zu umweltgefährdenden Stoffen, Abfällen, Boden und belasteten Standorten, die Umweltverträglichkeitsprüfung, Haftung und Strafbestimmungen. Die Details stehen in Verordnungen: LRV (Luft), LSV (Lärm), VVEA (Abfall), VBBo (Boden), UVPV (UVP) u. a.

### 2. Emissionsbegrenzung: was «technisch und betrieblich möglich» heisst
- **Technisch möglich**: Es gibt erprobte Technik (z. B. Partikelfilter, lärmarme Verfahren, Benetzung).
- **Betrieblich möglich**: Sie lässt sich im Bauablauf einsetzen (Platz, Logistik, Sicherheit).
- **Wirtschaftlich tragbar**: Massstab ist ein mittlerer, wirtschaftlich gesunder Betrieb der Branche – nicht die Kasse des einzelnen Projekts.
Das Bundesrecht spricht hier vom fortschrittlichen Stand der Technik (bestätigt über BAFU-Unterlagen). Wer sagt «zu teuer», muss das begründen können.

### 3. Grenzwerte, Richtwerte, Massnahmenkataloge
- **Immissionsgrenzwerte** (Art. 13 USG) legen fest, ab wann Einwirkungen schädlich oder lästig sind – z. B. für Luftqualität oder Strassenlärm.
- **Emissionsgrenzwerte** begrenzen den Ausstoss von Anlagen (z. B. Partikelanforderungen für Baumaschinen in der LRV).
- **Massnahmenkataloge** (Baulärm, Luft auf Baustellen) ersetzen Grenzwerte, wo Messungen nicht praktikabel sind. Die Behörde ordnet je nach Baustelle eine Massnahmenstufe an.
Für die Beratung heisst das: Fragen Sie nie nur «Halten wir den Grenzwert ein?», sondern «Setzen wir die verlangten Massnahmen um, und können wir das nachweisen?»

### 4. Verursacherprinzip in der Praxis
Das Prinzip regelt die **Kosten**, nicht die Schuld. Es gilt im Verwaltungsrecht (wer zahlt die Massnahme) und wird durch Strafrecht (wer wird bestraft) und Haftpflicht (wer zahlt Schadenersatz) ergänzt – dazu Lektion 5. In Werkverträgen wird oft geregelt, wer welche Umweltmassnahmen erbringt und bezahlt. Fehlt das, entstehen Streitigkeiten genau dann, wenn die Massnahme gebraucht wird.

### 5. Typische Denkfehler
- «Keine Beschwerde = alles in Ordnung»: Vorsorge gilt unabhängig von Beschwerden.
- «Kein Grenzwert = keine Pflicht»: Massnahmen aus Richtlinien und Bewilligung sind verbindlich.
- «Das Problem lösen wir am Empfänger»: Schallschutzfenster oder Staubschutz beim Nachbarn sind höchstens Ergänzung, nie Ersatz für Massnahmen an der Quelle.

§> Gesetzlich verbindlich (USG, sinngemäss). Detailfragen zur wirtschaftlichen Tragbarkeit entscheidet die Behörde im Einzelfall.` },
      { id: 'm1-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm1-q03' },
      { id: 'm1-l1-abw', kind: 'decision', title: 'Abwägung: Staubbeschwerde', questionId: 'm1-d01' },
      { id: 'm1-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Einwirkungen erkennen und einordnen', taskId: 'm1-t1' },
      { id: 'm1-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m1-q04', 'm1-q05'] },
      { id: 'm1-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm1-p1' },
      { id: 'm1-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Emission = an der Quelle; Immission = am Ort der Einwirkung.',
        'Zweistufig: vorsorglich an der Quelle begrenzen (Stand der Technik, wirtschaftlich tragbar), verschärft bei schädlichen oder lästigen Einwirkungen.',
        'Verursacherprinzip: Wer Massnahmen nötig macht, trägt die Kosten.',
        'Baustellen: Richtlinien mit Massnahmenstufen statt Grenzwerte – Pflicht ist die Umsetzung mit Nachweis.',
        'Einwirkungen gesamthaft beurteilen; Probleme nicht nur verschieben.',
      ] },
      { id: 'm1-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'lrv', 'bafu-luft', 'bafu-baulaerm'] },
    ],
  },
  // =====================================================================
  {
    id: 'm1-l2', moduleId: M, level: 1, order: 2, review: E, minutes: 15,
    title: 'Wer regelt was? Bund, Kanton, Gemeinde und die Rangordnung der Regeln',
    topics: ['m1-rechtsordnung'],
    objectives: [
      'Die Zuständigkeiten von Bund, Kanton und Gemeinde im Umweltrecht erklären',
      'Gesetz, Verordnung, Vollzugshilfe, Norm, Auflage und internen Standard unterscheiden',
      'Rechtsquellen finden und richtig zitieren (SR-Nummer, Artikel, Fassung)',
      'Den Zweck eines Umweltrechtskatasters für das Unternehmen erklären',
    ],
    steps: [
      { id: 'm1-l2-situation', kind: 'situation', title: 'Einstieg: Zwei Kantone, zwei Antworten', text: `Ihr Unternehmen baut gleichzeitig in Aarau und in Luzern. Ein Polier, der zwischen beiden Baustellen wechselt, fragt: «In Aarau musste ich ein Formular für die Baumaschinen ausfüllen und das Merkblatt war anders. Gilt in der Schweiz nicht überall das gleiche Recht?»

Wie erklären Sie ihm, was überall gleich ist – und was nicht?` },
      { id: 'm1-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m1-q06', 'm1-q07'] },
      { id: 'm1-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Der Bund macht die Umweltgesetze, die Kantone setzen sie um.** Deshalb gilt überall dasselbe Grundrecht, aber Merkblätter, Formulare, Zuständigkeiten und Kontrollen unterscheiden sich.

**Die Gemeinde** erteilt oft die Baubewilligung, betreibt die Kanalisation und kontrolliert vor Ort.

**Rangordnung**: Gesetz → Verordnung → Bewilligung mit Auflagen. Normen, Merkblätter und Firmenstandards konkretisieren, ersetzen aber nie das Gesetz.

**Ein Umweltrechtskataster** listet, was für Ihr Unternehmen gilt – und wird gepflegt, wenn sich etwas ändert.` },
      { id: 'm1-l2-explain', kind: 'explain', title: 'Die Ebenen des Umweltrechts', text: `### Bund
Die Bundesverfassung beauftragt den Bund, Vorschriften zum Schutz des Menschen und seiner natürlichen Umwelt zu erlassen; für den Vollzug sind die Kantone zuständig, soweit das Gesetz ihn nicht dem Bund vorbehält (Art. 74 BV, sinngemäss). Der Bund erlässt Gesetze (USG, GSchG, NHG, WaG) und Verordnungen (LRV, LSV, VVEA, GSchV …). Das **BAFU** veröffentlicht Vollzugshilfen und Richtlinien.

### Kanton
Die Kantone erlassen Einführungsgesetze, bestimmen die zuständigen Fachstellen (z. B. Amt für Umwelt), erteilen viele Umweltbewilligungen, erstellen Karten (Gewässerschutz, belastete Standorte) und Merkblätter und kontrollieren. Sie dürfen eigene Vorschriften erlassen, soweit der Bund ein Gebiet nicht abschliessend geregelt hat.

### Gemeinde
Gemeinden erteilen je nach Kanton die Baubewilligung (und koordinieren dabei kantonale Nebenbewilligungen), betreiben Kanalisation und Abfallsammlung, erlassen Bau- und Zonenreglemente und kontrollieren Baustellen vor Ort.

### Die Rangordnung
1. **Verfassung und Gesetz** – gelten für alle.
2. **Verordnung** – konkretisiert das Gesetz, gilt ebenfalls für alle.
3. **Bewilligung bzw. Verfügung** mit **Auflagen** – gilt für dieses Projekt.
4. **Vollzugshilfen, Richtlinien, Merkblätter** – Massstab der Behörde; oft in der Bewilligung verbindlich erklärt.
5. **Technische Normen** (SIA, SN, ISO) – verbindlich durch Vertrag oder Behörde, als anerkannte Regel der Technik Massstab der Sorgfalt.
6. **Interne Standards** – verbindlich im Unternehmen.

§> Art. 74 BV sinngemäss wiedergegeben (Wortlaut nicht selbst geprüft).` },
      { id: 'm1-l2-diagram', kind: 'diagram', title: 'Wie verbindlich ist was?', diagram: 'verbindlichkeit', caption: 'Dieselben sechs Kategorien wie in Modul 2 – sie gelten für alle Umweltbereiche.' },
      { id: 'm1-l2-explain-2', kind: 'explain', title: 'Rechtsquellen finden und lesen', text: `### Die Systematische Rechtssammlung
Bundesrecht steht auf **Fedlex** (fedlex.admin.ch) in der Systematischen Rechtssammlung (SR). Die Nummer verrät das Gebiet: **814** steht für Umweltschutz (z. B. USG 814.01, GSchG 814.20, LRV 814.318.142.1, LSV 814.41, VVEA 814.600). Kantonales Recht steht in den kantonalen Gesetzessammlungen; die Plattform LexFind bündelt sie.

### Richtig zitieren
Ein Zitat besteht aus **Erlass, Artikel, Absatz, Buchstabe** – z. B. «Art. 11 Abs. 2 USG». Prüfen Sie immer die **Fassung** («Stand am …»): Verordnungen ändern oft, und Merkblätter verweisen manchmal auf alte Fassungen.

### Vom Text zur Baustelle
Gesetzestexte sind abstrakt. Für die Baustelle übersetzen Vollzugshilfen und Bewilligungen sie in konkrete Massnahmen. Gute Praxis: Bei jeder Massnahme im Umweltmassnahmenplan steht, **woher** sie kommt und **wie verbindlich** sie ist.

!> Kantone, Gemeinden, Bewilligungsauflagen und besondere Projektbedingungen können zusätzliche Anforderungen stellen. Für jede Baustelle gilt die Rechtslage am Standort.` },
      { id: 'm1-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Merkblätter in zwei Kantonen', context: 'Hochbau', text: `Ein Generalunternehmer erstellt in zwei Kantonen gleichartige Wohnbauten. Der eine Kanton verlangt mit der Baueingabe ein Formular zu den Baumaschinen und ordnet die Baulärm-Massnahmen per Formular an; der andere regelt dasselbe in der Baubewilligung mit Verweis auf sein Merkblatt.

Die Umweltfachperson baut einen **internen Standard** mit den Anforderungen, die überall gelten (Bundesrecht, Richtlinien), und eine **Kantonsliste** mit den Besonderheiten. So weiss jede Bauleitung, was fix ist und was sie am Standort klären muss.` },
      { id: 'm1-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Leitung über die Kantonsgrenze', context: 'Tiefbau', text: `Eine Transportleitung quert die Grenze zwischen zwei Kantonen und einen Bach. Für jeden Abschnitt sind die Fachstellen des jeweiligen Kantons zuständig: Gewässerschutz, Fischerei, Bodenschutz. Die Bauherrschaft koordiniert die Gesuche, damit sich die Auflagen nicht widersprechen.

**Lernpunkt**: Bei Projekten über Grenzen hinweg gibt es mehrere zuständige Behörden mit eigenen Merkblättern. Die Bauleitung braucht pro Abschnitt eine klare Liste der Auflagen.` },
      { id: 'm1-l2-deep', kind: 'deep', title: 'Fachvertiefung: Rechtskataster, Änderungen, Grauzonen', text: `### 1. Das Umweltrechtskataster
Ein Umweltrechtskataster (auch Rechtsregister) ist die Liste der **bindenden Verpflichtungen** eines Unternehmens: Gesetze, Verordnungen, Bewilligungen, kantonale Vorgaben, Normen aus Verträgen, Kundenanforderungen und eigene Standards. ISO 14001 verlangt, diese Verpflichtungen zu bestimmen, zugänglich zu haben und ihre Einhaltung zu bewerten (Abschnitte 6.1.3 und 9.1.2) – mehr dazu in Modul 10.

Für ein Bauunternehmen mit vielen Baustellen bewährt sich eine **zweistufige Struktur**:
- **Unternehmensebene**: Was gilt für alle Baustellen und den Werkhof (USG, GSchG, LRV, LSV, VVEA, ChemRRV, Richtlinien)? Wer ist verantwortlich, wie wird die Einhaltung geprüft?
- **Projektebene**: Was gilt zusätzlich für diese Baustelle (Bewilligungsauflagen, kantonale Merkblätter, Gewässerschutzbereich, Vertragsnormen)? Das gehört in den Umweltmassnahmenplan des Projekts (Modul 8).

### 2. Änderungen verfolgen
Umweltrecht ändert laufend. Praktikabel ist: Newsletter bzw. Medienmitteilungen von BAFU und den Fachstellen der Kantone abonnieren, in denen das Unternehmen baut; Verbandsinformationen (z. B. Baumeisterverband, VSA) nutzen; einmal jährlich das Kataster systematisch überprüfen und datieren. Wichtig ist nicht Vollständigkeit um jeden Preis, sondern **dass relevante Änderungen ankommen** und umgesetzt werden.

### 3. Wer darf was verlangen?
- Eine **Behörde** kann nur verlangen, was sich auf eine Rechtsgrundlage stützt. Auflagen in einer Bewilligung müssen verhältnismässig sein; sind sie unklar oder unverhältnismässig, kann die Bauherrschaft sie innert Frist anfechten.
- Ein **Auftraggeber** kann vertraglich mehr verlangen als das Gesetz (z. B. strengere Maschinenstandards). Das ist dann privatrechtlich verbindlich.
- **Ihr Unternehmen** kann sich selbst strengere Standards geben. Kommunizieren Sie klar, dass es sich um einen internen Standard handelt – das stärkt die Glaubwürdigkeit, wenn Sie über gesetzliche Pflichten sprechen.

### 4. Grauzonen benennen
Nicht alles ist eindeutig: Merkblätter widersprechen sich, Begriffe sind unbestimmt («verhältnismässig», «nach Stand der Technik»), Zuständigkeiten sind unklar. In diesen Fällen: Fachstelle schriftlich anfragen, Antwort dokumentieren, im Zweifel die vorsichtigere Variante wählen und offen kommunizieren, dass es sich um eine Auslegung handelt.

§> Verfassung und Gesetze gesetzlich verbindlich; ISO 14001 ist eine freiwillige Norm, für zertifizierte Unternehmen aber Teil der eigenen Verpflichtungen.` },
      { id: 'm1-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm1-q08' },
      { id: 'm1-l2-abw', kind: 'decision', title: 'Abwägung: Widersprüchliche Vorgaben', questionId: 'm1-d02' },
      { id: 'm1-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Vorgaben einer Baustelle ordnen', taskId: 'm1-t2' },
      { id: 'm1-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m1-q09', 'm1-q10'] },
      { id: 'm1-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm1-p2' },
      { id: 'm1-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Bund: Gesetze und Verordnungen; Kantone: Vollzug, Fachstellen, Merkblätter; Gemeinden: oft Baubewilligung, Kanalisation, Kontrolle vor Ort.',
        'Rangordnung: Gesetz/Verordnung → Bewilligung mit Auflagen; Vollzugshilfen, Normen und Firmenstandards konkretisieren.',
        'Bundesrecht auf Fedlex (SR 814 = Umweltschutz), kantonales Recht in kantonalen Sammlungen; immer Fassung prüfen.',
        'Umweltrechtskataster: Unternehmensebene plus Projektebene, jährlich überprüft.',
        'Grauzonen schriftlich mit der Fachstelle klären und dokumentieren.',
      ] },
      { id: 'm1-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bv', 'usg', 'fedlex', 'iso14001'] },
    ],
  },
  // =====================================================================
  {
    id: 'm1-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 20,
    title: 'Die Verordnungen, die jede Baustelle betreffen',
    topics: ['m1-verordnungen'],
    objectives: [
      'Für Luft, Lärm, Abfall, Boden und Gewässer die massgebenden Erlasse und Vollzugshilfen nennen',
      'Partikelfilterpflicht, Massnahmenstufen und Entsorgungskonzept auf Baustellen anwenden',
      'Erkennen, welche Anforderungen schon in der Offerte und AVOR berücksichtigt werden müssen',
    ],
    steps: [
      { id: 'm1-l3-situation', kind: 'situation', title: 'Einstieg: Das Startgespräch', text: `Startsitzung für den Umbau eines Schulhauses aus dem Jahr 1972. Die Bauherrschaft fragt: «Welche Umweltvorschriften sind für Sie als Unternehmer eigentlich relevant?» Der Projektleiter schaut Sie an.

Sie haben fünf Minuten. Welche Bereiche und Erlasse nennen Sie – und was heisst jeder davon konkret für diese Baustelle?` },
      { id: 'm1-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m1-q11', 'm1-q12'] },
      { id: 'm1-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Luft (LRV)**: Baumaschinen über 18 kW brauchen Partikelfilter bzw. müssen die Partikelanforderungen erfüllen; die BAFU-Richtlinie Luft legt Massnahmen nach Stufe A oder B fest.

**Lärm (LSV)**: Die Baulärm-Richtlinie des BAFU regelt Massnahmen nach Stufe A, B oder C – ohne Grenzwerte.

**Abfall (VVEA)**: Ab mehr als 200 m³ Bauabfall oder bei Verdacht auf Schadstoffe braucht es Angaben zur Entsorgung (Entsorgungskonzept); Bauabfälle sind zu trennen.

**Boden (VBBo)** und **Gewässer (GSchG/GSchV)** kommen dazu, sobald Boden bewegt oder Wasser abgeleitet wird.` },
      { id: 'm1-l3-explain', kind: 'explain', title: 'Luft und Lärm', text: `### Luftreinhaltung
- **Luftreinhalte-Verordnung (LRV)**: Baumaschinen mit mehr als 18 kW müssen die Anforderungen von Art. 19a in Verbindung mit Anhang 4 Ziff. 3 LRV erfüllen – praktisch heisst das Partikelfilter bzw. gleichwertige Partikelbegrenzung, mit Übergangsregeln nach Baujahr und Leistungsklasse (bestätigt). Nachweis: Kennzeichnung bzw. Dokument der Maschine.
- **Richtlinie «Luftreinhaltung auf Baustellen»** des BAFU (ergänzte Ausgabe 2016): **Stufe A** = Basismassnahmen für alle Baustellen; **Stufe B** = zusätzliche Massnahmen für grosse oder lange Baustellen. Die Stufe hängt u. a. von Lage (Agglomeration oder ländlich), Grösse und Dauer ab und wird im Baubewilligungsverfahren angeordnet (bestätigt). Typische Massnahmen: Benetzen bei Staub, Pisten befestigen und reinigen, Abdecken von Schüttgut, Verzicht auf offenes Verbrennen.

### Lärm
- **Lärmschutz-Verordnung (LSV)**: Art. 6 LSV beauftragt das BAFU mit Richtlinien zum Baulärm (bestätigt).
- **Baulärm-Richtlinie**: enthält **keine Grenzwerte**, sondern einen Massnahmenkatalog in den **Stufen A, B und C** (C am strengsten); für Bautransporte A und B. Die Stufe richtet sich nach Dauer und Intensität der lärmigen Arbeiten und der Distanz zu lärmempfindlichen Räumen (bestätigt). Typische Massnahmen: lärmarme Verfahren und Geräte, Abschirmungen, Einschränkung der Betriebszeiten für lärmintensive Arbeiten, Information der Anwohnenden.

§> LRV und LSV gesetzlich verbindlich; die Richtlinien sind Vollzugshilfen und werden in Bewilligungen in der Regel verbindlich angeordnet. Konkrete Schwellen für die Stufen stehen in den Richtlinien selbst – die App gibt sie nicht wieder.` },
      { id: 'm1-l3-diagram', kind: 'diagram', title: 'Übersicht: Umweltbereiche auf der Baustelle', diagram: 'verordnungen', caption: 'Wählen Sie einen Bereich: Erlass, Vollzugshilfe, typische Auflage und wer sie umsetzt.' },
      { id: 'm1-l3-explain-2', kind: 'explain', title: 'Abfall, Boden, Gewässer, Chemikalien', text: `### Abfall: VVEA
- **Art. 16 VVEA**: Fallen voraussichtlich **mehr als 200 m³ Bauabfälle** an oder sind Bauabfälle mit umwelt- oder gesundheitsgefährdenden Stoffen (z. B. PCB, PAK, Blei, Asbest) zu erwarten, verlangt die Behörde im Baubewilligungsverfahren Angaben zu Art, Qualität und Menge der Abfälle und zu den Entsorgungswegen – das [[entsorgungskonzept|Entsorgungskonzept]] (bestätigt). Kantone können tiefere Schwellen kennen.
- **Art. 17 VVEA**: Sonderabfälle sind getrennt von anderen Abfällen zu entsorgen; die übrigen Bauabfälle sind auf der Baustelle zu trennen, sonst in geeigneten Anlagen; die Behörde kann eine weitergehende Trennung verlangen (bestätigt).
- Bei Gebäuden mit älterem Baujahr empfehlen kantonale Checklisten, Bauschadstoffe grundsätzlich zu erwarten und vor dem Umbau eine **Schadstoffermittlung** durchzuführen. Vertiefung in Modul 3.

### Boden: VBBo
Die Verordnung über Belastungen des Bodens verlangt, Boden so zu behandeln, dass seine Fruchtbarkeit nicht dauerhaft beeinträchtigt wird – auf Baustellen vor allem: Verdichtung und Erosion vermeiden, abgetragenen Boden fachgerecht lagern und wieder verwerten (sinngemäss, Artikel nicht selbst geprüft). Vertiefung in Modul 4.

### Gewässer: GSchG, GSchV
Siehe Modul 2: Verunreinigungsverbot, Abwasser, Gewässerschutzbereiche, SIA 431.

### Chemikalien: ChemRRV und Chemikalienrecht
Für Stoffe und Produkte mit Umweltrisiken gibt es Verwendungsbeschränkungen (ChemRRV) und Kennzeichnungs- sowie Informationspflichten (Sicherheitsdatenblätter). Vertiefung in Modul 7.

!> Für die Offerte zählt: Massnahmenstufen, Entsorgungskonzept, Maschinenanforderungen und Bodenschutz kosten Geld und Zeit. Sie gehören in die Kalkulation und AVOR – nicht erst auf die Baustelle.` },
      { id: 'm1-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Schulhaus aus den 1970er-Jahren', context: 'Hochbau', text: `Für den Umbau verlangt die Gemeinde mit der Baueingabe ein Entsorgungskonzept, weil mehr als 200 m³ Abbruchmaterial anfallen und das Baujahr Bauschadstoffe erwarten lässt. Die Schadstoffermittlung findet asbesthaltige Bodenbeläge und PCB-haltige Fugen.

Folgen für die Unternehmung: Sanierung durch eine anerkannte Fachfirma vor dem Rückbau, getrennte Entsorgung der Sonderabfälle, Muldenkonzept für die übrigen Fraktionen, Nachweise für die Bauherrschaft. Gleichzeitig ordnet die Bewilligung Baulärm-Stufe B an, weil der Schulbetrieb im Nachbartrakt weiterläuft.

**Lernpunkt**: Die Umweltauflagen beeinflussen Ablauf und Termine massiv – sie müssen in der AVOR stehen.` },
      { id: 'm1-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Strassensanierung', context: 'Tiefbau', text: `Sanierung einer Kantonsstrasse über zwei Kilometer. Die Ausschreibung verlangt Baumaschinen gemäss LRV, Massnahmenstufe B Luft wegen Dauer und Agglomerationslage, Baulärm-Stufe B für Nachtarbeiten, ein Konzept für den Ausbauasphalt (Prüfung auf PAK, getrennte Verwertung bzw. Entsorgung) und Bodenschutz für die temporäre Installationsfläche auf einer Wiese.

**Lernpunkt**: Im Tiefbau steht vieles schon in der Ausschreibung. Wer offeriert, muss die Anforderungen lesen und einpreisen – sonst fehlen Geld und Zeit für die Umsetzung.` },
      { id: 'm1-l3-deep', kind: 'deep', title: 'Fachvertiefung: Anforderungen richtig übersetzen', text: `### 1. Von der Verordnung zur Checkliste
Für jede Baustelle sollten fünf Fragen in der AVOR beantwortet sein:
1. **Luft**: Welche Massnahmenstufe? Erfüllen alle Maschinen über 18 kW die LRV-Anforderungen (auch die der Subunternehmer)? Welche Staubmassnahmen sind vorgesehen?
2. **Lärm**: Welche Baulärm-Stufe? Welche lärmintensiven Arbeiten, wann, mit welchen Massnahmen? Wer informiert die Anwohnenden?
3. **Abfall**: Liegt ein Entsorgungskonzept vor? Wurden Bauschadstoffe ermittelt? Welche Mulden und Entsorgungswege?
4. **Boden**: Wird Boden abgetragen, befahren oder zwischengelagert? Braucht es eine bodenkundliche Baubegleitung?
5. **Wasser**: Welche Abwässer, welche Risikostufe nach SIA 431:2022, welche Bewilligungen?

### 2. Nachweise, die eine Kontrolle sehen will
- Maschinenliste mit Nachweisen zu den Partikelanforderungen;
- Baulärm: Massnahmenblatt, Arbeitszeiten, Information der Anwohnenden;
- Abfall: Entsorgungskonzept, Entsorgungsnachweise, Begleitscheine für Sonderabfälle;
- Boden: Protokolle zur Befahrbarkeit, wenn verlangt;
- Wasser: Entwässerungskonzept, Messprotokolle.
Wer diese Nachweise in einem Ordner bzw. einer digitalen Ablage pro Baustelle führt, besteht eine Kontrolle in Minuten.

### 3. Häufige Missverständnisse
- **«Partikelfilter ist Sache des Maschinenvermieters»**: Die Pflicht gilt für den Einsatz auf der Baustelle; die Bauleitung muss sicherstellen, dass nur konforme Maschinen arbeiten – auch die der Subunternehmer.
- **«Baulärm-Richtlinie hat keine Grenzwerte, also ist sie unverbindlich»**: Die angeordnete Massnahmenstufe ist verbindlich.
- **«Entsorgungskonzept ist Bauherrensache»**: Die Bauherrschaft reicht es ein; die Unternehmung setzt es um und liefert die Nachweise. Fehlen die Angaben zu Bauschadstoffen, ist das ein Risiko für Arbeitssicherheit und Termine.
- **«Kleine Baustelle = keine Pflichten»**: Basismassnahmen (Stufe A) und Trennpflichten gelten auch auf kleinen Baustellen.

### 4. Kosten und Termine
Umweltmassnahmen werden dann teuer, wenn sie spät kommen: Ein Partikelfilter nachrüsten mitten im Projekt, eine Schadstoffsanierung nach Baustart, eine Bodenschutzmassnahme nach der Verdichtung. Ihre stärkste Wirkung als Umweltbeauftragter haben Sie in **Offerte und AVOR**.

§> Verordnungen gesetzlich verbindlich; Richtlinien als Vollzugshilfen meist durch Bewilligung verbindlich. Ausgewählte Inhalte (LRV Art. 19a, Richtlinie Luft Stufen A/B, Baulärm A/B/C ohne Grenzwerte, VVEA Art. 16/17) über BAFU- und kantonale Unterlagen bestätigt.` },
      { id: 'm1-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm1-q13' },
      { id: 'm1-l3-abw', kind: 'decision', title: 'Abwägung: Bagger ohne Nachweis', questionId: 'm1-d03' },
      { id: 'm1-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Umweltanforderungen für die AVOR', taskId: 'm1-t3' },
      { id: 'm1-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m1-q14', 'm1-q15', 'm1-q16'] },
      { id: 'm1-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm1-p3' },
      { id: 'm1-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'LRV: Baumaschinen über 18 kW mit Partikelfilter bzw. Partikelanforderungen; Richtlinie Luft Stufen A/B.',
        'LSV Art. 6 / Baulärm-Richtlinie: Massnahmenstufen A/B/C ohne Grenzwerte; angeordnete Stufe ist verbindlich.',
        'VVEA Art. 16: Entsorgungsangaben ab mehr als 200 m³ oder bei Bauschadstoffen; Art. 17: Trennpflicht.',
        'VBBo (Boden) und GSchG/GSchV (Wasser) ergänzen; Chemikalien in Modul 7.',
        'Grösste Wirkung in Offerte und AVOR; Nachweise pro Baustelle griffbereit.',
      ] },
      { id: 'm1-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['lrv', 'bafu-luft', 'lsv', 'bafu-baulaerm', 'vvea', 'vbbo'] },
    ],
  },
];
