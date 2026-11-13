import type { Card, Lesson, PracticeTask, Question, SiteTask } from '../types';

// Lektion 7 (Bewertungsfassung 3): Risikobeurteilung nach SIA 431:2022.
// Verwendet nur öffentlich bestätigte Grundzüge (Wegleitung SIA, kantonale
// Unterlagen, Geltungsbereich des interkantonalen Merkblatts). Kriterien und
// Berechnungsverfahren der kostenpflichtigen Norm werden NICHT wiedergegeben.

const M = 'm2';
const E = 'entwurf' as const;

export const M2_L7: Lesson = {
  id: 'm2-l7', moduleId: M, level: 3, order: 7, review: E, minutes: 20,
  title: 'SIA 431:2022: Gewässerrisiken einer Baustelle in drei Stufen beurteilen',
  topics: ['konzept', 'recht'],
  objectives: [
    'Das dreistufige Verfahren der SIA 431:2022 in seinen Grundzügen erklären',
    'Erkennen, wann eine Baustelle über die Standardmassnahmen (Stufe 1) hinausgeht',
    'Den Geltungsbereich des interkantonalen Merkblatts «Gewässerschutz auf Baustellen» richtig einordnen',
    'Zuständigkeiten klären: wann Planer, wann Fachspezialist, wann Behörde',
  ],
  steps: [
    { id: 'm2-l7-situation', kind: 'situation', title: 'Einstieg: Drei Projekte auf dem Tisch', text: `Montagssitzung der AVOR. Auf dem Tisch liegen drei neue Projekte: ein Mehrfamilienhaus auf der grünen Wiese, die Instandsetzung einer Strassenbrücke über einen Fluss mit Abtrag der alten Beschichtung und ein Leitungsstollen, der im Sprengvortrieb unter einem Bach hindurchführt.

Der Leiter AVOR sagt: «Für die Entwässerung nehmen wir überall das Merkblatt vom Kanton, wie immer.» Sie haben Zweifel. **Bei welchem Projekt reicht das – und woran machen Sie das fest?**` },
    { id: 'm2-l7-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q42', 'm2-q45'] },
    { id: 'm2-l7-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Die Norm SIA 431:2022 beurteilt das Gewässerrisiko einer Baustelle in drei Stufen.** Stufe 1 ist die normale Baustelle: Hier genügen die bekannten Grundmassnahmen (sie entsprechen der früheren Empfehlung von 1997).

**Sobald gewässerkritische Bauprozesse oder empfindliche Schutzgüter dazukommen**, braucht es eine vertiefte Beurteilung (Stufe 2) oder Berechnungen mit einem Fachspezialisten (Stufe 3). Beispiele für kritische Prozesse: Oberflächenabtrag, Sprengungen, Bauen auf belasteten Standorten.

**Das interkantonale Merkblatt gilt nur für Stufe 1.** Wer es auf eine Stufe-3-Baustelle anwendet, plant zu wenig.

**Die Grundmassnahmen gelten immer** – auch auf Stufe 2 und 3.` },
    { id: 'm2-l7-explain', kind: 'explain', title: 'Warum drei Stufen?', text: `Die frühere Empfehlung SIA 431 (1997) behandelte Baustellen weitgehend gleich: Abwasserarten erkennen, trennen, behandeln, ableiten. Für die meisten Hochbaustellen genügt das bis heute. Es gibt aber Bauvorhaben, deren Abwasser mehr enthält als Feinstoffe und Lauge – etwa Schadstoffe aus alten Beschichtungen, Rückstände von Sprengstoffen oder belastetes Grundwasser – oder die neben besonders empfindlichen Gewässern liegen.

Die Ausgabe **SIA 431:2022** (gültig ab 1. August 2022) ergänzt deshalb ein **dreistufiges Verfahren zur Beurteilung der gewässerrelevanten Risiken**:

- **Stufe 1** – herkömmliche Baustelle: Grundmassnahmen nach dem bewährten Prinzip «vermeiden – trennen – behandeln – kontrolliert ableiten». Entspricht der früheren Empfehlung.
- **Stufe 2** – vertiefte **Risikobeurteilung**, wenn gewässerkritische Bauprozesse oder Schutzgüter betroffen sind.
- **Stufe 3** – zusätzlich **Berechnungen** (öffentliche Zusammenfassungen nennen u. a. eine Verdünnungsrechnung für die Einleitung), in Zusammenarbeit mit einem Fachspezialisten.

### Was ist «gewässerkritisch»?
Das Risiko entsteht aus dem Zusammenspiel von **Bauprozess** und **Schutzgut**:
- **Prozesse**, die kantonale Unterlagen als kritisch nennen: Oberflächenabtrag (z. B. Abtrag von Beschichtungen), Einsatz von Sprengstoffen, Bauen auf belasteten Standorten. Der externe Prüfbericht nennt zusätzlich besondere Bauchemikalien – die genauen Kriterien stehen in der Norm.
- **Schutzgüter**: empfindliche Oberflächengewässer (z. B. kleine Fischgewässer), Grundwasser, Schutzzonen von Trinkwasserfassungen.

§> Technische Norm (kostenpflichtig). Die Grundzüge sind über die Wegleitung des SIA und kantonale Unterlagen bestätigt. Einstufungskriterien, Tabellen und Berechnungsverfahren gibt die App bewusst nicht wieder – sie stehen in den Anhängen der Norm.` },
    { id: 'm2-l7-diagram', kind: 'diagram', title: 'Schema: Welche Stufe?', diagram: 'sia-stufen', caption: 'Vereinfachte Lernhilfe zu den Grundzügen. Die verbindliche Einstufung erfolgt nach den Kriterien der Norm durch Planer bzw. Fachspezialisten.' },
    { id: 'm2-l7-explain-2', kind: 'explain', title: 'Merkblatt, Norm, Bewilligung: wer macht was?', text: `### Das interkantonale Merkblatt gilt nur für Stufe 1
Das von VSA und Kantonen herausgegebene Merkblatt «Gewässerschutz auf Baustellen» beschreibt die Massnahmen für Baustellen **ohne kritische Bauprozesse**, also für Stufe 1. Für komplexere Vorhaben verweist es auf die Norm SIA 431. Viele Kantone haben das Merkblatt übernommen (u. a. AG, SO, SZ, ZH).

### Wer ist zuständig?
Kantonale Unterlagen beschreiben die Arbeitsteilung so: Stufe 1 und 2 beurteilt in der Regel das **Planungsbüro**; ab Stufe 3 ist ein **Fachspezialist** (Umweltfachperson mit Erfahrung in Gewässerschutz und Siedlungsentwässerung) beizuziehen. Bei UVP-pflichtigen Projekten sind vertiefte Abklärungen zu gewässerkritischen Bauprozessen und Schutzgütern ohnehin Teil des Verfahrens.

### Ihre Rolle als Umweltbeauftragter des Unternehmens
Sie stufen nicht selbst verbindlich ein – Sie sorgen dafür, dass **die Frage gestellt wird**, bevor die AVOR das Standardvorgehen übernimmt:
1. Bei jedem Projekt in der AVOR prüfen: Gibt es kritische Prozesse? Liegt die Baustelle bei einem empfindlichen Schutzgut?
2. Wenn ja: beim Planer bzw. bei der Bauherrschaft nach der Risikostufe und dem Entwässerungskonzept fragen.
3. Im Werkvertrag klären, wer die Beurteilung und die besonderen Anlagen liefert und bezahlt.
4. Grundmassnahmen der Stufe 1 immer umsetzen – sie gelten auf allen Stufen.

!> Im Zweifel die höhere Stufe annehmen und klären lassen. Eine zu tiefe Einstufung führt dazu, dass Behandlung und Überwachung fehlen, wenn sie gebraucht werden.` },
    { id: 'm2-l7-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Fassadensanierung mit Abtrag', context: 'Hochbau', text: `Ein Schulhaus aus den 1960er-Jahren erhält eine neue Fassade. Die alte Beschichtung der Betonfassade soll mit Hochdruckwasserstrahlen abgetragen werden. Die Schadstoffermittlung vor dem Umbau zeigt PCB-haltige Fugendichtungen und eine Beschichtung, deren Zusammensetzung unklar ist.

Das ist ein **Oberflächenabtrag** auf einem Gebäude mit Schadstoffverdacht: Das Abtragswasser kann Schadstoffe enthalten, die ein Absetzcontainer nicht zurückhält. Die Bauleitung lässt die Risikostufe durch den Planer bestimmen; ergänzend werden die Beschichtung beprobt, das Abtragswasser vollständig gefasst und der Entsorgungsweg vorab mit der Fachstelle geklärt.

**Lernpunkt**: Auch im Hochbau gibt es Baustellen über Stufe 1. Die Schadstoffermittlung (Modul 3) liefert oft den ersten Hinweis.` },
    { id: 'm2-l7-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Stollen im Sprengvortrieb', context: 'Tiefbau', text: `Ein Werkleitungsstollen wird im Sprengvortrieb erstellt und unterquert einen kleinen Fischbach. Das Stollenwasser ist trüb, durch Spritzbeton alkalisch und kann Rückstände aus den Sprengstoffen enthalten. Es soll nach Behandlung in den Bach eingeleitet werden.

Hier treffen ein **kritischer Prozess** (Sprengungen) und ein **empfindliches Schutzgut** (kleiner Bach mit wenig Wasser zur Verdünnung) zusammen. Die Bauherrschaft beauftragt einen Fachspezialisten: Er beurteilt die Risiken und rechnet, welche Qualität und Menge der Bach aufnehmen kann. Daraus ergeben sich Behandlungsanlage, Überwachungsprogramm und Einleitbedingungen in der Bewilligung.

**Lernpunkt**: Ob eine Einleitung verträglich ist, hängt nicht nur vom Abwasser ab, sondern auch vom Gewässer, das es aufnehmen muss.` },
    { id: 'm2-l7-deep', kind: 'deep', title: 'Fachvertiefung: Einstufung in der Praxis, Grenzen und Beratung', text: `### 1. Von der Norm zur Bewilligung
Die Norm SIA 431:2022 ist eine technische Norm. Verbindlich wird sie durch Vertrag oder Behörde, und als anerkannte Regel der Technik prägt sie den Massstab der Sorgfalt (Art. 3 GSchG). In der Praxis verlangen Baubewilligungen bzw. kantonale Merkblätter zunehmend, dass für Vorhaben über Stufe 1 die Risikostufe und das Entwässerungskonzept nachgewiesen werden. Die Behörde legt dann in der Bewilligung die Einleitbedingungen und das Überwachungsprogramm fest.

### 2. Bauprozess × Schutzgut: eine Denkhilfe
Für die eigene Triage hilft eine einfache Frage in zwei Richtungen – ohne die Kriterien der Norm zu ersetzen:
- **Was kann im Abwasser sein, das ein Absetzbecken und eine Neutralisation nicht zurückhalten?** Gelöste oder an Feinstoffe gebundene Schadstoffe (z. B. aus Beschichtungen, belasteten Böden oder Bauchemikalien), Rückstände aus Sprengstoffen, Kohlenwasserstoffe.
- **Wie empfindlich ist das Gewässer, das es aufnimmt?** Ein kleiner Bach mit wenig Abfluss verträgt viel weniger als ein grosser Fluss; ein Grundwasser in einer Schutzzone verträgt gar nichts.
Sobald eine der beiden Fragen nicht klar mit «nichts Besonderes» beantwortet werden kann, gehört die Einstufung zum Planer bzw. Fachspezialisten.

### 3. Typische Fehleinschätzungen
- **«Wir machen es nach dem Merkblatt»** auf einer Baustelle mit Oberflächenabtrag oder Altlast: Das Merkblatt deckt diesen Fall nicht ab.
- **«Der Container hält das schon zurück»** bei gelösten Stoffen: Absetzen wirkt nur auf Partikel.
- **«Der Fluss ist gross genug»**: Verdünnung im Gewässer ist keine Behandlung und keine Rechtfertigung für eine Einleitung ohne Beurteilung; ob eine Einleitung verträglich ist, entscheidet die Beurteilung nach Norm und letztlich die Behörde.
- **Stufe nur einmal bestimmt**: Wenn sich im Bauablauf Verfahren ändern (z. B. Abtrag statt Abbruch, unerwartet belasteter Aushub), muss die Einstufung neu geprüft werden.

### 4. Belastete Standorte und belastetes Grundwasser
Steht ein Projekt auf einer Parzelle im Kataster der belasteten Standorte oder zeigt der Aushub Verdachtsmomente (Geruch, Verfärbung, Fremdmaterial), können Baugruben- und Grundwasser Schadstoffe enthalten. Das betrifft gleichzeitig Abfall- und Altlastenrecht (Modul 3/4) und verlangt Fachspezialisten. Einzelne Kantone haben für besondere Stoffgruppen (z. B. PFAS) eigene Unterlagen – die App behandelt sie noch nicht.

### 5. Beratung der Linie
- **In der AVOR**: Risikostufe als feste Frage in der Projektstart-Checkliste.
- **Gegenüber Projektleitern**: Kosten und Termine von Stufe-2/3-Massnahmen früh offenlegen – im Angebot oder als Nachtrag vor Baustart, nicht während der Ausführung.
- **Gegenüber Planern**: nach der Begründung der Einstufung fragen; sie gehört ins Entwässerungskonzept.
- **Grenzen**: Die App vermittelt Grundzüge. Für die Einstufung im Einzelfall brauchen Sie den Normtext oder den Fachspezialisten.

§> Grundzüge der Norm öffentlich bestätigt (Wegleitung SIA, kantonale Unterlagen); Geltungsbereich des interkantonalen Merkblatts bestätigt. Korrigendum SIA 431-C3:2026 (gültig ab 1.6.2026) ersetzt laut externer Prüfung Figuren 4 und 5 sowie Tabellen 9 und 13 – die App gibt diese Figuren und Tabellen nicht wieder; für Einstufung und Bemessung gilt die Norm inkl. Korrigendum. Laut Berner Schulungsunterlage gelten die Standardmassnahmen des Merkblatts auch auf Baustellen der Stufen 2 und 3.` },
    { id: 'm2-l7-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q44' },
    { id: 'm2-l7-abw', kind: 'decision', title: 'Abwägung: «Wie immer nach dem Merkblatt»', questionId: 'm2-d07' },
    { id: 'm2-l7-task', kind: 'sitetask', title: 'Baustellenaufgabe: Drei Projekte einstufen', taskId: 'm2-t7' },
    { id: 'm2-l7-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q43', 'm2-q46'] },
    { id: 'm2-l7-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p7' },
    { id: 'm2-l7-summary', kind: 'summary', title: 'Zusammenfassung', points: [
      'SIA 431:2022 (gültig ab 1.8.2022) beurteilt Gewässerrisiken in drei Stufen; Stufe 1 entspricht der Empfehlung von 1997.',
      'Kritisch wird es durch das Zusammenspiel von Bauprozess (z. B. Oberflächenabtrag, Sprengungen, belastete Standorte) und Schutzgut.',
      'Das interkantonale Merkblatt gilt nur für Stufe 1; Grundmassnahmen gelten auf allen Stufen.',
      'Stufe 1/2 in der Regel durch den Planer, ab Stufe 3 Fachspezialist.',
      'Ihre Rolle: die Frage nach der Stufe in jeder AVOR stellen, im Zweifel höher einstufen lassen.',
    ] },
    { id: 'm2-l7-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['sia431', 'sia-wegleitung', 'ikm-vsa', 'gschg'] },
  ],
};

export const M2_L7_QUESTIONS: Question[] = [
  {
    id: 'm2-q42', moduleId: M, topic: 'konzept', level: 1, type: 'single', review: E, rev: 3,
    objective: 'Die Neuerung der SIA 431:2022 benennen',
    prompt: 'Was ist die wesentliche Neuerung der Norm SIA 431:2022 gegenüber der Empfehlung von 1997?',
    options: [
      { id: 'a', text: 'Sie enthält verbindliche Grenzwerte, die das Gesetz ersetzen.' },
      { id: 'b', text: 'Sie ergänzt ein dreistufiges Verfahren zur Beurteilung der gewässerrelevanten Risiken einer Baustelle; Stufe 1 entspricht der bisherigen Empfehlung.' },
      { id: 'c', text: 'Sie gilt nur noch für Tiefbaustellen.' },
      { id: 'd', text: 'Sie schafft die Pflicht für Entwässerungskonzepte ab.' },
    ],
    correct: ['b'],
    explanation: 'Die Ausgabe 2022 (gültig ab 1. August 2022) baut auf der Empfehlung von 1997 auf und ergänzt ein dreistufiges Verfahren: Stufe 1 Grundmassnahmen, Stufe 2 Risikobeurteilung, Stufe 3 Berechnungen mit Fachspezialist. Eine Norm ersetzt nie das Gesetz. Seit 1.6.2026 gilt das Korrigendum C3:2026, das u. a. Figuren und Tabellen zur Einstufung ersetzt (laut externer Prüfung) – Einstufung immer mit der aktuellen Normfassung.',
    commonErrors: ['Norm mit Gesetz verwechseln.', 'Annahme, die Norm gelte nur im Tiefbau.'],
    sources: ['sia431', 'sia-wegleitung'],
  },
  {
    id: 'm2-q43', moduleId: M, topic: 'konzept', level: 2, type: 'multi', review: E, rev: 3,
    objective: 'Gewässerkritische Bauprozesse erkennen',
    prompt: 'Bei welchen Vorhaben reicht das interkantonale Merkblatt (Stufe 1) laut kantonalen Unterlagen in der Regel NICHT aus? (Mehrere Antworten)',
    options: [
      { id: 'a', text: 'Abtrag einer alten Beschichtung mit Hochdruckwasserstrahlen (Oberflächenabtrag)' },
      { id: 'b', text: 'Stollenbau im Sprengvortrieb' },
      { id: 'c', text: 'Aushub auf einer Parzelle im Kataster der belasteten Standorte' },
      { id: 'd', text: 'Rohbau eines Mehrfamilienhauses auf unbelastetem Grund mit Waschplatz und Neutralisation' },
    ],
    correct: ['a', 'b', 'c'],
    explanation: 'Kantonale Unterlagen nennen Oberflächenabtrag, den Einsatz von Sprengstoffen und das Bauen auf belasteten Standorten als Beispiele für kritische Bauprozesse, die über Stufe 1 hinausgehen. Ein normaler Rohbau ist die typische Stufe-1-Baustelle. Massgebend für die Einstufung im Einzelfall sind die Kriterien der Norm.',
    commonErrors: ['Jede Baustelle gleich behandeln.', 'Annahme, ein Absetzcontainer halte auch gelöste Schadstoffe zurück.'],
    sources: ['ikm-vsa', 'sia431'],
  },
  {
    id: 'm2-q44', moduleId: M, topic: 'konzept', level: 3, type: 'single', review: E, rev: 3,
    objective: 'Zuständigkeiten nach Risikostufe zuordnen',
    prompt: 'Der Planer stuft einen Werkleitungsstollen mit Sprengvortrieb neben einem kleinen Fischbach in Stufe 3 ein. Was folgt daraus für die Organisation?',
    options: [
      { id: 'a', text: 'Die Bauleitung erstellt das Konzept selbst nach dem interkantonalen Merkblatt.' },
      { id: 'b', text: 'Ein Fachspezialist wird beigezogen; er beurteilt die Risiken und rechnet u. a., was das Gewässer aufnehmen kann. Daraus folgen Behandlung, Überwachung und Einleitbedingungen in der Bewilligung.' },
      { id: 'c', text: 'Es genügt, die Absetzcontainer zu verdoppeln.' },
      { id: 'd', text: 'Stufe 3 bedeutet, dass nicht eingeleitet werden darf; alles Wasser wird abgeführt.' },
    ],
    correct: ['b'],
    explanation: 'Kantonale Unterlagen beschreiben: Stufe 1 und 2 in der Regel durch das Planungsbüro, ab Stufe 3 Beizug eines Fachspezialisten. Stufe 3 heisst nicht automatisch Einleitverbot – sondern dass die Verträglichkeit berechnet und das Vorgehen entsprechend festgelegt wird.',
    commonErrors: ['Stufe 3 mit Stufe-1-Massnahmen lösen wollen.', 'Stufe 3 mit Verbot gleichsetzen.'],
    sources: ['sia431', 'ikm-vsa'],
  },
  {
    id: 'm2-q45', moduleId: M, topic: 'konzept', level: 2, type: 'single', review: E, rev: 3,
    objective: 'Den Geltungsbereich des interkantonalen Merkblatts kennen',
    prompt: 'Für welche Baustellen ist das interkantonale Merkblatt «Gewässerschutz auf Baustellen» gedacht?',
    options: [
      { id: 'a', text: 'Für alle Baustellen der Schweiz ohne Ausnahme' },
      { id: 'b', text: 'Für Baustellen der Stufe 1 nach SIA 431:2022, also ohne kritische Bauprozesse wie Oberflächenabtrag, Sprengungen oder Bauen auf belasteten Standorten' },
      { id: 'c', text: 'Nur für Tunnelbaustellen' },
      { id: 'd', text: 'Nur für Baustellen in Schutzzonen' },
    ],
    correct: ['b'],
    explanation: 'Das Merkblatt nennt als Geltungsbereich Baustellen der Stufe 1 (bestätigt am Merkblatt bzw. kantonalen Fassungen). Seine Standardmassnahmen werden in der Praxis auch auf Baustellen der Stufen 2 und 3 angewendet – dort genügen sie aber allein nicht. Für komplexere Vorhaben verweist es auf die Norm SIA 431.',
    commonErrors: ['Merkblatt als vollständige Lösung für jede Baustelle verwenden.'],
    sources: ['ikm-vsa'],
  },
  {
    id: 'm2-q46', moduleId: M, topic: 'konzept', level: 3, type: 'single', review: E, rev: 3,
    objective: 'Das Verhältnis der Stufen zueinander verstehen',
    prompt: 'Eine Baustelle ist in Stufe 2 eingestuft. Welche Aussage ist richtig?',
    options: [
      { id: 'a', text: 'Die Grundmassnahmen der Stufe 1 (z. B. Schächte schützen, Waschplatz, Trennung) entfallen, weil eine Spezialanlage geplant wird.' },
      { id: 'b', text: 'Die Grundmassnahmen gelten weiterhin; dazu kommen die Massnahmen aus der vertieften Risikobeurteilung.' },
      { id: 'c', text: 'Stufe 2 ist nur eine Empfehlung ohne Folgen.' },
      { id: 'd', text: 'Die Einstufung gilt für die ganze Bauzeit unverändert, auch wenn sich Verfahren ändern.' },
    ],
    correct: ['b'],
    explanation: 'Die Stufen bauen aufeinander auf: Was auf jeder Baustelle gilt, gilt auch auf Stufe 2 und 3. Ändern sich Bauverfahren oder Befunde (z. B. belasteter Aushub), ist die Einstufung neu zu prüfen.',
    commonErrors: ['Grundmassnahmen auf «Spezialbaustellen» vernachlässigen.', 'Einstufung nie überprüfen.'],
    sources: ['sia431', 'sia-wegleitung'],
  },
  {
    id: 'm2-d07', moduleId: M, topic: 'konzept', level: 4, type: 'best', review: E, rev: 3,
    objective: 'Bei einem Vorhaben mit Oberflächenabtrag die richtige Beurteilung veranlassen',
    prompt: 'Instandsetzung einer Strassenbrücke über einen Fluss: Die alte Beschichtung des Betons wird mit Hochdruckwasserstrahlen abgetragen. Zusammensetzung der Beschichtung unbekannt. Der Bauführer: «Wir machen das wie immer nach dem Merkblatt, mit zwei Absetzcontainern.» Was empfehlen Sie?',
    options: [
      { id: 'a', text: 'Einverstanden – das Merkblatt ist die kantonale Vorgabe, und die Container halten den Abtrag zurück.', weight: 0,
        why: 'Ungeeignet: Oberflächenabtrag ist ein kritischer Prozess, für den das Merkblatt (Stufe 1) nicht gedacht ist. Container halten Partikel zurück, nicht gelöste oder fein gebundene Schadstoffe.',
        risks: 'Schadstoffeintrag in den Fluss, Verstoss gegen Einleitbedingungen, nachträgliche Sanierung und Entsorgung.' },
      { id: 'b', text: 'Vor Arbeitsbeginn die Beschichtung beproben lassen und vom Planer die Risikostufe nach SIA 431:2022 bestimmen lassen; bei Stufe 3 Fachspezialist beiziehen. Abtragswasser bis dahin vollständig fassen, Konzept und Entsorgungsweg mit der Fachstelle abstimmen.', weight: 1,
        why: 'Am besten geeignet: klärt, was im Abwasser ist, ordnet das Vorhaben korrekt ein und hält Wasser zurück, bis die Behandlung feststeht.',
        prerequisites: 'Zeit im Bauprogramm für Beprobung und Beurteilung, klare Kostenübernahme (Werkvertrag/Nachtrag), Fassung des Abtragswassers technisch machbar (Einhausung, Auffangwannen).',
        risks: 'Terminverzug, Mehrkosten – kalkulierbar und deutlich kleiner als ein Schadenfall.' },
      { id: 'c', text: 'Auf trockenes Abtragsverfahren (z. B. Strahlen oder Fräsen) wechseln, damit kein Abwasser entsteht.', weight: 0.5,
        why: 'Kann das Wasserproblem verkleinern, verlagert aber das Risiko: Schadstoffe gelangen als Staub in die Luft und an die Arbeitnehmenden; Abfall entsteht trotzdem. Nur nach Schadstoffabklärung und mit Staubschutz vertretbar.',
        prerequisites: 'Schadstoffabklärung, Arbeitssicherheits- und Luftreinhaltemassnahmen (Einhausung, Absaugung), Zustimmung von Bauherrschaft und Planer.',
        risks: 'Gesundheitsgefährdung, Staubemissionen, unklare Entsorgung.' },
      { id: 'd', text: 'Das Abtragswasser nach den Containern in den Fluss leiten – die Verdünnung ist dort sehr gross.', weight: 0, critical: true,
        why: 'Kritisch: Verdünnung ist keine Behandlung und keine Rechtfertigung einer Einleitung ohne Beurteilung und Bewilligung.',
        risks: 'Gewässerverunreinigung (Art. 6 GSchG), Strafverfahren, Kosten.' },
    ],
    correct: ['b'],
    explanation: 'Oberflächenabtrag ist ein typischer Fall über Stufe 1. Bevor über Technik entschieden wird, muss klar sein, was im Abwasser ist und wie empfindlich der Fluss ist – das leisten Beprobung und Einstufung nach SIA 431:2022.',
    commonErrors: ['Merkblatt auf jede Baustelle anwenden.', 'Verdünnung im Gewässer als Lösung betrachten.', 'Trockenverfahren ohne Blick auf Luft und Arbeitssicherheit wählen.'],
    sources: ['sia431', 'ikm-vsa', 'gschg'],
  },
];

export const M2_T7: SiteTask = {
  id: 'm2-t7', moduleId: M, topic: 'konzept', level: 3, setting: 'Tiefbau',
  title: 'Drei Projekte einstufen',
  situation: 'Die AVOR legt Ihnen drei fiktive Projekte vor und will wissen, wo das interkantonale Merkblatt genügt und wo nicht.',
  data: [
    'Projekt 1: Neubau Mehrfamilienhaus, ehemalige Wiese, Trennsystem, kein Gewässer in der Nähe, kein Schutzgebiet, Aushub über dem Grundwasser.',
    'Projekt 2: Umbau einer Industriehalle; die Parzelle ist im Kataster der belasteten Standorte eingetragen; Aushub 2 m tief für neue Fundamente, Grundwasser 4 m unter Terrain.',
    'Projekt 3: Leitungsstollen im Sprengvortrieb unter einem kleinen Fischbach; Einleitung des behandelten Stollenwassers in den Bach geplant.',
  ],
  assignment: 'Geben Sie für jedes Projekt eine begründete Einschätzung (Stufe 1 genügt / höhere Stufe wahrscheinlich), nennen Sie die kritischen Prozesse bzw. Schutzgüter, die nächsten Abklärungen und wer zuständig ist.',
  rubric: [
    { id: 'k1', text: 'Projekt 1 als typische Stufe-1-Baustelle erkannt (Merkblatt und Grundmassnahmen genügen, Konzept trotzdem nötig)', keywords: ['stufe 1', 'merkblatt', 'grundmassnahm'] },
    { id: 'k2', text: 'Projekt 2: belasteter Standort als kritischer Prozess erkannt; Altlasten-/Schadstoffabklärung, Einstufung durch Planer, Fachspezialist bei Bedarf', keywords: ['belastet', 'altlast', 'kataster', 'stufe 2', 'abklär'] },
    { id: 'k3', text: 'Projekt 3: Sprengungen plus empfindlicher Bach erkannt; Stufe 3 wahrscheinlich, Fachspezialist, Verträglichkeitsberechnung', keywords: ['spreng', 'stufe 3', 'fachspezialist', 'bach', 'berechn'] },
    { id: 'k4', text: 'Grundsatz festgehalten: Einstufung verbindlich durch Planer/Fachspezialist nach Normkriterien; im Zweifel höher einstufen', keywords: ['planer', 'zweifel', 'kriterien', 'norm'] },
    { id: 'k5', text: 'Grundmassnahmen gelten auf allen Stufen; Einstufung bei Änderungen überprüfen', keywords: ['alle stufen', 'immer', 'überprüf', 'änder'] },
  ],
  solution: `**Projekt 1 – Stufe 1 wahrscheinlich.** Keine kritischen Prozesse, kein empfindliches Schutzgut in der Nähe. Interkantonales Merkblatt und Grundmassnahmen (Schächte schützen, Waschplatz mit Absetzen und Neutralisation, Lagerung, Notfallkarte) genügen in der Regel. Ein Entwässerungskonzept braucht es trotzdem. Zuständig: Planer bzw. Bauführung.

**Projekt 2 – höhere Stufe möglich.** Bauen auf einem belasteten Standort ist ein kritischer Prozess. Aushub und allenfalls Baugrubenwasser können Schadstoffe enthalten. Nächste Schritte: Altlasten- bzw. Schadstoffabklärung (Untersuchung, Entsorgungskonzept – Modul 3/4), Einstufung durch den Planer, je nach Befund Fachspezialist. Das Grundwasser liegt zwar tiefer als der Aushub, Sickerwasser und Regenwasser in der Baugrube müssen aber beurteilt werden.

**Projekt 3 – Stufe 3 wahrscheinlich.** Sprengungen (Rückstände aus Sprengstoffen), Spritzbeton (alkalisch) und ein kleiner Fischbach als Vorfluter. Ein Fachspezialist beurteilt die Risiken und rechnet die Verträglichkeit der Einleitung; daraus folgen Behandlungsanlage, Überwachung und Einleitbedingungen. Zusätzlich fischereirechtliche Fragen (Art. 8 BGF), wenn am Bach selbst gearbeitet wird.

**Grundsätze**: Die verbindliche Einstufung erfolgt nach den Kriterien der Norm durch Planer bzw. Fachspezialist – Ihre Einschätzung ist eine Triage. Im Zweifel höher einstufen lassen. Grundmassnahmen gelten auf allen Stufen, und bei geänderten Verfahren oder Befunden wird neu eingestuft.`,
  sources: ['sia431', 'ikm-vsa', 'bgf'],
};

export const M2_P7: PracticeTask = {
  id: 'm2-p7', moduleId: M, topic: 'konzept', title: 'Risikostufe in der AVOR verankern',
  goal: 'Die Frage nach der Risikostufe nach SIA 431:2022 bei realen Projekten stellen und als festen Punkt in der AVOR verankern.',
  steps: [
    'Wählen Sie drei laufende oder kommende Projekte Ihres Unternehmens.',
    'Prüfen Sie je Projekt: kritische Bauprozesse (Oberflächenabtrag, Sprengungen, belastete Standorte, besondere Bauchemikalien) und empfindliche Schutzgüter (Gewässer, Grundwasser, Schutzzonen).',
    'Fragen Sie beim Planer bzw. der Bauherrschaft nach der Risikostufe und dem Entwässerungskonzept.',
    'Schlagen Sie vor, die Frage nach der Risikostufe in die Projektstart-Checkliste der AVOR aufzunehmen.',
  ],
  deliverable: 'Kurze Tabelle (Projekt, Prozesse, Schutzgüter, Stufe laut Planer, offene Punkte) und Vorschlag für die AVOR-Checkliste.',
  criteria: ['Prozesse und Schutzgüter je Projekt geprüft', 'Stufe beim Planer erfragt bzw. Lücke dokumentiert', 'Konkreter Vorschlag für die AVOR'],
  confirmer: 'Leiter/in AVOR oder Projektleiter/in',
};

export const M2_L7_CARDS: Card[] = [
  { id: 'm2-c31', moduleId: M, topic: 'konzept', level: 1, front: 'Was bringt SIA 431:2022 neu?', back: 'Ein **dreistufiges Verfahren** zur Beurteilung der Gewässerrisiken (gültig ab 1.8.2022). Stufe 1 = Grundmassnahmen wie in der Empfehlung von 1997.', sources: ['sia431', 'sia-wegleitung'] },
  { id: 'm2-c32', moduleId: M, topic: 'konzept', level: 2, front: 'Für welche Baustellen gilt das interkantonale Merkblatt?', back: 'Nur **Stufe 1** – ohne kritische Prozesse wie Oberflächenabtrag, Sprengungen, Bauen auf belasteten Standorten.', sources: ['ikm-vsa'] },
  { id: 'm2-c33', moduleId: M, topic: 'konzept', level: 3, front: 'Wer stuft ein – und ab wann braucht es einen Fachspezialisten?', back: 'Stufe 1/2 in der Regel der **Planer**, ab **Stufe 3 Fachspezialist**. Im Zweifel höher einstufen lassen; Grundmassnahmen gelten immer.', sources: ['sia431'] },
];
