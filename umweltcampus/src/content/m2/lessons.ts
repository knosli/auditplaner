import type { Lesson } from '../types';
import { EXTRA } from './lesson-extras';

// Lektionen Modul 2. Textauszeichnung (siehe components/RichText.tsx):
// Absatz = Leerzeile, "- " Aufzählung, "### " Zwischentitel, **fett**,
// [[begriff-id|Text]] = Fachbegriff (öffnet Nachschlagewerk),
// "> " Hinweis, "!> " kritischer Hinweis, "§> " Rechtsnatur-Hinweis.

const M = 'm2';
const E = 'entwurf' as const;

export const M2_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm2-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Rechtsrahmen: Was der Gewässerschutz von der Baustelle verlangt',
    topics: ['recht', 'wasserhaltung'],
    objectives: [
      'Die drei Kernpflichten des GSchG für Baustellen sinngemäss wiedergeben (Sorgfalt, Verunreinigungsverbot, Abwasserbeseitigung)',
      'Gesetz, Auflage, Norm, Vollzugshilfe, Praxis und internen Standard unterscheiden',
      'Gewässerschutzbereiche und Schutzzonen auf der Karte einordnen',
      'Die Zuständigkeiten von Bund, Kanton und Gemeinde erklären',
    ],
    steps: [
      { id: 'm2-l1-situation', kind: 'situation', title: 'Einstieg: Montagmorgen in Langenthal', text: `Neubau Mehrfamilienhaus, Aushub abgeschlossen, Bodenplatte nächste Woche. Der Polier fragt Sie beim Kaffee: «Die Gemeinde hat in der Bewilligung etwas von Gewässerschutzbereich Au und Entwässerungskonzept geschrieben. Ist das wieder so ein Papier für die Schublade?»

Sie merken: Die Antwort entscheidet, ob er die Auflagen ernst nimmt. Dafür müssen Sie selbst sicher wissen, **was verbindlich ist**, **woher es kommt** und **wer zuständig ist**.` },
      { id: 'm2-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen (vor der Erklärung)', questionIds: ['m2-q01', 'm2-q04'] },
      EXTRA['m2-l1'].brief,
      { id: 'm2-l1-explain', kind: 'explain', title: 'Drei Kernpflichten aus dem Gewässerschutzgesetz', text: `Das [[gschg|Gewässerschutzgesetz (GSchG, SR 814.20)]] ist für Baustellen die wichtigste Grundlage. Drei Bestimmungen sollten Sie sinngemäss auswendig können:

### 1. Sorgfaltspflicht (Art. 3)
Jedermann muss die nach den Umständen gebotene Sorgfalt anwenden, um nachteilige Einwirkungen auf Gewässer zu vermeiden. Das ist der Massstab für alles Handeln auf der Baustelle – auch dort, wo keine konkrete Vorschrift existiert.

### 2. Verunreinigungsverbot (Art. 6)
Es ist untersagt, Stoffe, die Wasser verunreinigen **können**, mittelbar oder unmittelbar in ein Gewässer einzubringen oder [[versickerung|versickern]] zu lassen. Drei Wörter sind entscheidend:
- **können**: Ein Schaden muss nicht nachgewiesen sein.
- **mittelbar**: Auch der Umweg über einen [[meteorwasser|Meteorschacht]], einen Graben oder den Boden zählt.
- **versickern**: Auch das Grundwasser ist geschützt.

### 3. Abwasserbeseitigung (Art. 7)
Verschmutztes Abwasser muss behandelt werden. Wer Abwasser in ein Gewässer einleiten oder versickern lassen will, braucht eine Bewilligung der kantonalen Behörde. Für die Einleitung in die Kanalisation gelten die Bedingungen von Gemeinde bzw. Abwasserverband.

§> Gesetzlich verbindlich. Artikel sinngemäss wiedergegeben – Wortlaut auf Fedlex prüfen.

### Wer macht was?
- **Bund**: Gesetz (GSchG) und Verordnung ([[gschv|GSchV]]), Vollzugshilfen des BAFU.
- **Kanton**: Vollzug – Bewilligungen für Einleitungen und Eingriffe ins Grundwasser, Gewässerschutzkarte, Merkblätter, Kontrollen, Pikettdienst.
- **Gemeinde**: Kanalisation, [[kataster|Kanalisationskataster]], Entwässerungsreglement, oft Baubewilligung mit Auflagen.

> Kantone, Gemeinden, Bewilligungsauflagen und besondere Projektbedingungen können zusätzliche Anforderungen stellen. Prüfen Sie immer die Vorgaben am Standort.` },
      { id: 'm2-l1-diagram', kind: 'diagram', title: 'Wie verbindlich ist was?', diagram: 'verbindlichkeit', caption: 'Die sechs Kategorien, die diese App bei jedem Inhalt ausweist. Tippen Sie auf eine Stufe für Beispiele.' },
      { id: 'm2-l1-explain-2', kind: 'explain', title: 'Gewässerschutzbereiche und Schutzzonen', text: `Die Kantone teilen ihr Gebiet in Bereiche ein (Grundlage: GSchG Art. 19–20 und [[gschv|GSchV]] Anhang 4). Sie finden sie auf der **kantonalen Gewässerschutzkarte** (GIS):

- [[au|Bereich Au]]: schützt nutzbares Grundwasser. Grosse Teile des Mittellandes liegen im Au.
- **Bereich Ao**: schützt oberirdische Gewässer, wo dies besonders nötig ist.
- **Zuströmbereiche Zu/Zo**: Einzugsgebiet von Fassungen bzw. Gewässern mit Belastungsproblemen.
- [[schutzzone|Grundwasserschutzzonen S1–S3]]: um Trinkwasserfassungen, mit strengen Einschränkungen und einem Schutzzonenreglement.
- **Übriger Bereich (üB)**: die restlichen Flächen.

In den besonders gefährdeten Bereichen brauchen Bauten, Grabungen und Erdbewegungen eine kantonale Bewilligung, wenn sie Gewässer gefährden können. Daraus ergeben sich die typischen Auflagen in der Baubewilligung.

!> Die Lage zur Gewässerschutzkarte gehört in jede Umweltprüfung vor Baustart (Modul 8). Ein Installationsplatz in einer S-Zone ist ein Planungsfehler, kein Ausführungsdetail.` },
      { id: 'm2-l1-example', kind: 'example', title: 'Beispiel aus dem Tiefbau', context: 'Tiefbau', text: `Werkleitungsbau in einer Gemeinde im Kanton Solothurn: Der Graben quert auf 80 m eine Grundwasserschutzzone S3. Die Bewilligung verlangt u. a.: keine Betankung in der Zone, Maschinen täglich auf Leckagen prüfen, Ölbindemittel auf jeder Maschine, sofortige Meldung bei Ereignissen.

Der Polier organisiert einen Betankungsplatz ausserhalb der Zone und führt eine kurze tägliche Sichtkontrolle mit Unterschrift ein. Bei der Kontrolle durch das Amt kann er die Einhaltung belegen. **Die Auflage wurde wirksam, weil sie in eine konkrete Tätigkeit mit Verantwortlichem übersetzt wurde.**` },
      EXTRA['m2-l1'].example,
      EXTRA['m2-l1'].deep,
      { id: 'm2-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q05' },
      EXTRA['m2-l1'].decision,
      EXTRA['m2-l1'].task,
      { id: 'm2-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q02', 'm2-q03', 'm2-q33', 'm2-q39', 'm2-q41'] },
      { id: 'm2-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p1' },
      { id: 'm2-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Drei Kernpflichten: Sorgfalt (Art. 3), Verunreinigungsverbot inkl. Versickern (Art. 6), Abwasser behandeln und Einleitungen bewilligen lassen (Art. 7).',
        'Schon die Möglichkeit einer Verunreinigung genügt – auch auf dem Umweg über Schacht oder Boden.',
        'Bund setzt Recht, Kanton vollzieht, Gemeinde regelt die Kanalisation.',
        'Gewässerschutzkarte prüfen: Au, Ao, Zu/Zo, S1–S3 bestimmen die Auflagen.',
        'Verbindlichkeit immer einordnen: Gesetz, Auflage, Norm, Vollzugshilfe, Praxis, interner Standard.',
      ] },
      { id: 'm2-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'gschv', 'usg', 'bafu-wasser', 'kanton-merkblatt', 'bgf'] },
    ],
  },
  // =====================================================================
  {
    id: 'm2-l2', moduleId: M, level: 1, order: 2, review: E, minutes: 15,
    title: 'Baustellenentwässerung: Welches Wasser darf wohin?',
    topics: ['entwaesserung'],
    objectives: [
      'Arten von Baustellenabwasser unterscheiden und einstufen',
      'Trenn- und Mischsystem und die Bedeutung des Meteorschachts erklären',
      'Das Prinzip «Vermeiden – Trennen – Behandeln – Ableiten» anwenden',
      'Die Rolle der Norm SIA 431 einordnen',
    ],
    steps: [
      { id: 'm2-l2-situation', kind: 'situation', title: 'Einstieg: Der graue Bach', text: `Ein Fischer meldet der Polizei einen grau gefärbten Bach. Die Spur führt zu einem Regenwasserauslauf – 400 m weiter oben liegt Ihre Baustelle. Dort wurde am Morgen die Betonpumpe auf dem Vorplatz gereinigt. Der Maschinist schwört: «Ich habe das Wasser in die Kanalisation laufen lassen, die geht doch in die ARA.»

Der Schacht auf dem Vorplatz war ein **Meteorschacht**. Wie konnte das passieren – und wie verhindern Sie es auf allen Baustellen?` },
      { id: 'm2-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q06'] },
      EXTRA['m2-l2'].brief,
      { id: 'm2-l2-explain', kind: 'explain', title: 'Abwasserarten auf der Baustelle', text: `Auf einer Baustelle fallen sehr unterschiedliche Wässer an. Für jede Art stellt sich dieselbe Frage: **Ist es verschmutzt, und wohin darf es?**

- **Unverschmutztes Regenwasser** (saubere Dächer, Containerdächer, unbelastete Flächen): darf in der Regel nach Vorgaben der Gemeinde versickern oder abgeleitet werden. Es darf nicht über verschmutzte Flächen fliessen.
- **Trübes Wasser** (Baugrube, Erdbau, Fahrspuren nach Regen): enthält Feinstoffe → Absetzen, siehe Lektion 4.
- **Alkalisches Wasser** (Betonwaschwasser, Spritzbeton, Bohrpfähle, Schleif- und Bohrwasser): pH 11–13 → Absetzen und Neutralisieren, siehe Lektion 3.
- **Öl- und treibstoffhaltiges Wasser** (Betankungs-, Wasch- und Abstellplätze): → Rückhalt, ggf. Ölabscheider oder Entsorgung nach Abfallklassierung, häufig als Sonderabfall.
- **Häusliches Abwasser** (WC, Waschanlagen der Unterkünfte): → [[schmutzwasser|Schmutzwasserkanal]] bzw. Fäkalientank.
- **Gepumptes Grundwasser** (Wasserhaltung): oft sauber, aber häufig trüb oder durch Frischbeton alkalisch → Bewilligung regelt Qualität und Ableitung.

### Trennsystem und Mischsystem
Im [[trennsystem|Trennsystem]] hat jedes Grundstück zwei Leitungen: Schmutzwasser zur [[ara|ARA]], Regenwasser über die [[meteorwasser|Meteorleitung]] direkt in ein Gewässer oder eine Versickerung. Im [[mischsystem|Mischsystem]] fliesst alles zusammen zur ARA – bei Starkregen entlasten aber Regenüberläufe ungereinigtes Mischwasser ins Gewässer.

!> Ein Meteorschacht ist praktisch eine Direktleitung in den Bach. Welcher Schacht wohin führt, zeigt nur der **Kanalisationskataster** der Gemeinde – nicht der Deckel und nicht das Bauchgefühl.

### Das Grundprinzip
**Vermeiden – Trennen – Behandeln – kontrolliert Ableiten.** Je weniger verschmutztes Wasser entsteht und je sauberer die Ströme getrennt bleiben, desto kleiner und günstiger die Behandlung. [[verduennung|Verdünnen]] ist keine Behandlung.` },
      { id: 'm2-l2-diagram', kind: 'diagram', title: 'Interaktives Schema: Wasserwege auf der Baustelle', diagram: 'wasserwege', caption: 'Wählen Sie eine Abwasserart. Das Schema zeigt den in der Regel zulässigen Weg und die typischen Fehlwege. Massgebend sind immer Bewilligung, Gemeinde und Kanton.' },
      { id: 'm2-l2-explain-2', kind: 'explain', title: 'SIA 431: Die Norm zur Baustellenentwässerung', text: `Die Norm [[sia431|SIA 431 «Entwässerung von Baustellen»]] ist die technische Grundlage für Planung und Betrieb. Sie beschreibt, wie Abwasser auf Baustellen nach Herkunft und Verschmutzung eingeteilt, wie es behandelt und wohin es abgeleitet wird, und wie die Entwässerung geplant, betrieben und kontrolliert wird.

Rechtlich wird die Norm verbindlich, wenn sie im **Werkvertrag vereinbart** oder von der **Behörde verlangt** wird (häufig in Baubewilligungen und kantonalen Merkblättern). Unabhängig davon gilt sie als anerkannte Regel der Technik.

§> Technische Norm (kostenpflichtig, SIA). Diese App gibt nur eine eigene Zusammenfassung der Grundprinzipien wieder – Details, Tabellen und Werte bitte im Original nachlesen. Ausgabe prüfen.` },
      { id: 'm2-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau', context: 'Hochbau', text: `Wohnüberbauung mit Einstellhalle in Aarau: Die AVOR markiert im Installationsplan alle Schächte im Baustellenbereich mit Farbe nach Kataster (blau = Meteor, braun = Schmutz). Meteorschächte im Arbeitsbereich werden mit **Schachtabdeckungen** gesichert. Der Waschplatz für Pumpe und Kübel liegt auf einer befestigten Fläche mit Absetzcontainer und Neutralisation; der Ablauf ist an den Schmutzwasserkanal angeschlossen – mit Zustimmung des Abwasserverbands.

Der Aufwand: ein halber Tag Planung und eine Mietanlage. Der Nutzen: keine Diskussion auf der Baustelle, wohin das Wasser darf.` },
      EXTRA['m2-l2'].example,
      EXTRA['m2-l2'].deep,
      { id: 'm2-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q31' },
      EXTRA['m2-l2'].decision,
      EXTRA['m2-l2'].task,
      { id: 'm2-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q07', 'm2-q08', 'm2-q09', 'm2-q37'] },
      { id: 'm2-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p2' },
      { id: 'm2-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Jede Abwasserart einzeln einstufen: trüb, alkalisch, ölhaltig, häuslich, unverschmutzt.',
        'Meteorschacht = Weg in den Bach oder ins Grundwasser. Kataster prüfen, Schächte im Arbeitsbereich abdecken.',
        'Vermeiden – Trennen – Behandeln – kontrolliert Ableiten. Verdünnen ist keine Behandlung.',
        'SIA 431 ist die technische Grundlage; verbindlich durch Vertrag oder Behörde.',
        'Die Kanalisation ist kein freier Entsorgungsweg: Einleitungen brauchen Zustimmung bzw. Bewilligung.',
      ] },
      { id: 'm2-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['sia431', 'gschg', 'gemeinde-entwaesserung', 'vsa', 'kanton-merkblatt', 'merkblatt-ag'] },
    ],
  },
  // =====================================================================
  {
    id: 'm2-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 20,
    title: 'Betonwaschwasser und alkalisches Wasser',
    topics: ['alkalisch'],
    objectives: [
      'Die Gefährlichkeit alkalischen Wassers chemisch und ökologisch begründen',
      'Die Behandlungskette Absetzen – Neutralisieren – Kontrollieren – Ableiten anwenden',
      'Das passende Neutralisationsmittel begründet wählen',
      'Quellen alkalischen Wassers im Hoch- und Tiefbau erkennen',
    ],
    steps: [
      { id: 'm2-l3-situation', kind: 'situation', title: 'Einstieg: «Ist doch nur Wasser»', text: `Freitag, 15.30 Uhr, Hochbaustelle in Wohnquartier. Die Decke über dem 2. OG ist betoniert. Ein Mitarbeiter will die Kübel und die Pumpe reinigen und das graue Wasser in den Schacht am Strassenrand laufen lassen: «Ist doch nur Wasser mit etwas Zement, das löst sich auf.»

Wie erklären Sie ihm in zwei Sätzen, warum das nicht geht – und was er stattdessen tun soll?` },
      { id: 'm2-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q10', 'm2-q11'] },
      EXTRA['m2-l3'].brief,
      { id: 'm2-l3-explain', kind: 'explain', title: 'Warum Betonwaschwasser so gefährlich ist', text: `Zement reagiert mit Wasser und bildet unter anderem Calciumhydroxid. Waschwasser von Frischbeton ist deshalb **stark alkalisch, typischerweise pH 11–13**, und enthält viele Feinstoffe.

Der [[ph|pH-Wert]] ist logarithmisch: Jeder Schritt bedeutet einen Faktor 10. Wasser mit pH 12 ist 10 000-mal alkalischer als Wasser mit pH 8.

### Wirkung im Gewässer
- **Verätzung**: Kiemen und Schleimhäute von Fischen und Kleinlebewesen werden geschädigt.
- **Ammoniak**: Bei hohem pH verschiebt sich das Gleichgewicht von Ammonium zum giftigen Ammoniak.
- **Feinstoffe**: setzen sich in der Gewässersohle ab ([[kolmation|Kolmation]]) und zerstören Laichplätze.

In einem kleinen Bach können wenige hundert Liter Waschwasser ein Fischsterben über hunderte Meter auslösen. Das ist kein Bagatellschaden.

!> Betonwaschwasser darf nie in Meteorschacht, Graben, Bach oder Versickerung. Auch in den Schmutzwasserkanal nur behandelt und mit Zustimmung bzw. Bewilligung.` },
      { id: 'm2-l3-diagram', kind: 'diagram', title: 'pH-Skala: Wo liegt was?', diagram: 'ph-skala', caption: 'Logarithmische Skala. Die eingetragenen Bereiche sind typische Grössenordnungen; massgebend sind die Werte in Bewilligung und kantonalem Merkblatt.' },
      { id: 'm2-l3-explain-2', kind: 'explain', title: 'Die Behandlungskette', text: `### 1. Vermeiden und klein halten
- Fahrmischer-Trommeln im Betonwerk reinigen lassen; auf der Baustelle nur Rutsche über einem Behälter abspritzen.
- [[restbeton|Restbeton]] nicht ausspülen, sondern zurückgeben oder geordnet verwerten.
- Einen festen **Waschplatz** einrichten – sonst wird dort gewaschen, wo gerade Wasser abfliesst.

### 2. Absetzen
Feststoffe zuerst zurückhalten ([[absetzbecken|Absetzbecken bzw. -container]]). Sonst stören sie die Neutralisation und lagern sich in Leitungen ab. Den Schlamm regelmässig entfernen und als mineralischen Abfall entsorgen.

### 3. Neutralisieren
Bevorzugt mit **CO₂** ([[neutralisation|Neutralisation]]): Es bildet Kohlensäure, eine schwache Säure, lässt sich gut dosieren, und es müssen keine starken Mineralsäuren gelagert werden. Eine Garantie gegen Übersäuerung ist das nicht: Auch mit CO₂ wird der pH laufend gemessen, und die Ableitung stoppt bei Abweichung. Mineralsäuren (z. B. Salzsäure) nur mit Fachwissen und Arbeitssicherheitsmassnahmen.

### 4. Kontrollieren und dokumentieren
pH vor der Ableitung messen: im Chargenbetrieb mit einem vor Gebrauch kalibrierten Handgerät, im Dauerbetrieb mit einer Sonde mit Aufzeichnung, Alarm und automatischer Abschaltung. Protokoll mit Datum, Zeit, Wert, Visum, Massnahme bei Abweichung.

### 5. Ableiten gemäss Bewilligung
In der Regel in den Schmutzwasserkanal, mit Zustimmung bzw. Bewilligung von Gemeinde oder Kanton und unter deren Bedingungen. Für die Ableitung gilt in der Regel ein pH zwischen **6.5 und 9.0** (GSchV Anhang 3.2 Ziff. 2, von kantonalen Merkblättern für Baustellenabwasser angewendet). Nach der Neutralisation braucht es eine **pH-Endkontrolle**.

§> pH-Bereich und Endkontrolle bestätigt über die Merkblätter der Kantone Aargau und Schwyz (Abgleich 12.11.2026). Massgebend ist die konkrete Bewilligung.` },
      { id: 'm2-l3-diagram-2', kind: 'diagram', title: 'Schema: Behandlungskette', diagram: 'behandlungskette', caption: 'Reihenfolge der Behandlung. Jeder Schritt hat eine verantwortliche Person und einen Nachweis.' },
      { id: 'm2-l3-example', kind: 'example', title: 'Beispiel aus dem Tiefbau', context: 'Tiefbau', text: `Bohrpfahlwand für eine Baugrube in Winterthur: Beim Betonieren der Pfähle wird Grundwasser und Stützflüssigkeit verdrängt – das Wasser ist trüb und alkalisch. Die Unternehmung stellt eine Absetz- und CO₂-Neutralisationsanlage mit automatischer pH-Messung und **Abschaltung bei Grenzwertüberschreitung** auf. Die Messwerte werden aufgezeichnet und wöchentlich der Bauleitung übergeben.

Als die CO₂-Flasche an einem Samstag leer ist, schaltet die Anlage ab – das Wasser bleibt in der Grube statt im Kanal. Die Alarmierung per SMS an den Polier war im Konzept vorgesehen.` },
      EXTRA['m2-l3'].example,
      EXTRA['m2-l3'].deep,
      { id: 'm2-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q36' },
      EXTRA['m2-l3'].decision,
      EXTRA['m2-l3'].task,
      { id: 'm2-l3-feynman', kind: 'feynman', title: 'Erklären Sie es dem Polier (Feynman-Methode)', feynmanId: 'm2-f1' },
      { id: 'm2-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q12', 'm2-q13', 'm2-q14', 'm2-q40'] },
      { id: 'm2-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p3' },
      { id: 'm2-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Betonwaschwasser: pH 11–13, Feinstoffe – akut giftig für Gewässerlebewesen.',
        'Kette: Vermeiden → Absetzen → Neutralisieren → Kontrollieren/Dokumentieren → Ableiten gemäss Bewilligung.',
        'CO₂ ist das bevorzugte Neutralisationsmittel; Verdünnen ist keine Behandlung.',
        'Auch Spritzbeton, Pfähle, Kernbohren und HDW erzeugen alkalisches Wasser.',
        'Ableitwerte stehen in Bewilligung und Merkblatt – nicht raten.',
      ] },
      { id: 'm2-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['kanton-merkblatt', 'sia431', 'gschv', 'gemeinde-entwaesserung', 'praxis', 'merkblatt-ag', 'merkblatt-sz'] },
    ],
  },
  // =====================================================================
  {
    id: 'm2-l4', moduleId: M, level: 2, order: 4, review: E, minutes: 15,
    title: 'Trübstoffe, Absetzbecken und Wasserhaltung',
    topics: ['truebstoffe', 'wasserhaltung'],
    objectives: [
      'Die ökologische Wirkung von Trübstoffen erklären (Kolmation)',
      'Funktionsprinzip und Grenzen von Absetzbecken beurteilen',
      'Bewilligungspflichten bei Wasserhaltung, Einleitung und Versickerung erkennen',
      'Bei Starkregen richtig priorisieren',
    ],
    steps: [
      { id: 'm2-l4-situation', kind: 'situation', title: 'Einstieg: Lehmbrühe nach dem Gewitter', text: `Grosser Aushub für ein Gewerbegebäude, lehmiger Boden. Nach einem nächtlichen Gewitter steht 40 cm braunes Wasser in der Baugrube. Der Maschinist hat um 6 Uhr die Tauchpumpe eingeschaltet, der Schlauch führt über den Zaun in den Strassengraben. Am Grabenende fliesst die Brühe in einen kleinen Bach.

Sie kommen um 7 Uhr auf die Baustelle. Was tun Sie zuerst?` },
      { id: 'm2-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q15'] },
      EXTRA['m2-l4'].brief,
      { id: 'm2-l4-rechner', kind: 'diagram', title: 'Rechner: Absetzfläche abschätzen', diagram: 'absetzrechner', caption: 'Physikalische Abschätzung nach Stokes und Hazen für Quarzkörner. Ersetzt keine Bemessung durch Fachplaner oder Anlagenlieferant.' },
      { id: 'm2-l4-explain', kind: 'explain', title: 'Trübstoffe: unterschätzter Schaden', text: `Trübes Wasser enthält Feinstoffe (Ton, Silt, Feinsand), die als [[gus|ungelöste Stoffe]] mitgeführt werden. Im Gewässer
- trüben sie das Wasser und reduzieren das Licht,
- verkleben Kiemen,
- lagern sich im Kies der Sohle ab ([[kolmation|Kolmation]]) und zerstören den Lebensraum von Kleinlebewesen sowie die Laichplätze von Fischen.

Kolmation ist ein **Langzeitschaden**: Die Sohle kann über Monate geschädigt bleiben, auch wenn das Wasser längst wieder klar ist.

### Absetzbecken: Prinzip und Grenzen
Ein [[absetzbecken|Absetzbecken]] funktioniert, wenn das Wasser lange genug ruhig darin bleibt. Entscheidend sind:
- genügend **Oberfläche** im Verhältnis zur Zuflussmenge,
- beruhigter **Einlauf** und Abzug an der Oberfläche (keine Kurzschlussströmung),
- regelmässige **Schlammentnahme**,
- mehrere Kammern oder Container: **in Serie** beruhigen sie die Strömung und verhindern Kurzschluss, **parallel** geschaltet erhöhen sie die wirksame Fläche.

Sand setzt sich schnell ab, Silt langsam, feiner Ton kaum. Bei tonigen Böden stossen einfache Becken an Grenzen. Dann helfen: Wasseranfall reduzieren, grössere Becken, Filtration, oder – nur nach Abklärung – [[flockungsmittel|Flockungsmittel]].

> Die Bemessung gehört in die Planung (Entwässerungskonzept, Fachplaner). Die App enthält bewusst keine Bemessungswerte.` },
      { id: 'm2-l4-explain-2', kind: 'explain', title: 'Wasserhaltung, Einleitung, Versickerung', text: `[[wasserhaltung|Wasserhaltung]] (offene Wasserhaltung, Brunnen, Grundwasserabsenkung) greift ins Grundwasser ein und ist in der Regel **bewilligungspflichtig**. Die Bewilligung regelt typischerweise:
- Entnahmemenge und Dauer,
- wohin das Wasser geht (Rückgabe ins Grundwasser, Gewässer, Kanalisation),
- welche Qualität verlangt ist (z. B. klar, ohne Ölfilm, pH-Bereich),
- Überwachung und Dokumentation, Meldepflichten bei Abweichungen.

Für **Einleitung in ein Gewässer** und [[versickerung|Versickerung]] von Abwasser braucht es eine kantonale Bewilligung (Art. 7 GSchG). Verschmutztes Wasser darf nicht «einfach versickern» – der Boden ist kein unbegrenzter Filter, und Feinstoffe verschlämmen ihn zusätzlich (Bezug zu Modul 4 Bodenschutz).

!> Bauten unter dem mittleren Grundwasserspiegel sind im Bereich Au grundsätzlich unzulässig; Ausnahmen nur, wenn der Grundwasserdurchfluss um höchstens 10 % vermindert wird (GSchV Anhang 4 Ziff. 211, bestätigt über kantonale Vollzugshilfen). Das ist eine Planungs- und Bewilligungsfrage vor Baubeginn.` },
      { id: 'm2-l4-example', kind: 'example', title: 'Beispiel: Starkregen auf Tiefbaustelle', context: 'Tiefbau', text: `Kanalisationsersatz in einer Talsohle. Das Entwässerungskonzept sieht drei Absetzcontainer in Serie und eine Notfallregel vor: «Bei sichtbarer Trübung am Auslauf Pumpen abstellen, Polier informiert Bauleitung, Rückhalt in der Grube.» Nach einem Gewitter wird genau so gehandelt. Die Grube dient zwei Stunden als Puffer, danach ist das Wasser nach dem Absetzen klar.

Ohne diese vorbereitete Regel hätte der Maschinist weiter gepumpt – um die Arbeit nicht zu verzögern.` },
      EXTRA['m2-l4'].example,
      EXTRA['m2-l4'].deep,
      { id: 'm2-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q30' },
      EXTRA['m2-l4'].decision,
      EXTRA['m2-l4'].task,
      { id: 'm2-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q16', 'm2-q17', 'm2-q18', 'm2-q34', 'm2-q38'] },
      { id: 'm2-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p6' },
      { id: 'm2-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Trübstoffe verursachen Kolmation – ein Langzeitschaden an der Gewässersohle.',
        'Absetzbecken: Oberfläche, Aufenthaltszeit, ruhige Strömung, Schlammentnahme. Feinster Ton setzt sich kaum ab.',
        'Flockungsmittel nur nach Abklärung mit der Fachstelle.',
        'Wasserhaltung, Einleitung in Gewässer und Versickerung sind in der Regel bewilligungspflichtig.',
        'Notfallregel für Starkregen vorbereiten: Einleitung stoppen, zurückhalten, melden.',
      ] },
      { id: 'm2-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'gschv', 'sia431', 'kanton-merkblatt', 'bafu-wasser', 'bgf'] },
    ],
  },
  // =====================================================================
  {
    id: 'm2-l5', moduleId: M, level: 2, order: 5, review: E, minutes: 15,
    title: 'Öl, Treibstoff, Installationsplatz und Havarie',
    topics: ['oel', 'havarie'],
    objectives: [
      'Betankungs- und Lagerplätze fachgerecht einrichten und kontrollieren',
      'Sofortmassnahmen bei einem Ölaustritt in der richtigen Reihenfolge ausführen',
      'Die Alarmierung intern und extern korrekt auslösen',
      'Ein Ereignis wirksam nachbereiten',
    ],
    steps: [
      { id: 'm2-l5-situation', kind: 'situation', title: 'Einstieg: Schlauchplatzer', text: `Ein Bagger arbeitet am Rand des Installationsplatzes. Mit einem Knall platzt ein Hydraulikschlauch, Öl spritzt auf den Kies und läuft Richtung Meteorschacht, 15 m entfernt. Der Maschinist steht unter Schock. Sie sind zufällig 30 m entfernt.

Was tun Sie in den nächsten zwei Minuten?` },
      { id: 'm2-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q20'] },
      EXTRA['m2-l5'].brief,
      { id: 'm2-l5-explain', kind: 'explain', title: 'Vorsorge: Betankung, Lagerung, Maschinen', text: `Öle und Treibstoffe sind [[wassergefaehrdend|wassergefährdende Flüssigkeiten]]. Das GSchG verlangt, dass Anlagen damit so erstellt und betrieben werden, dass keine Gewässer gefährdet werden (Art. 22 GSchG). Auf der Baustelle heisst das:

### Betankungsplatz
- dichte, befestigte Fläche oder mobile Tankwanne, kein Meteorschacht im Abflussbereich,
- Abstand zu Gewässern und Böschungen, nicht in Schutzzonen,
- [[oelbinder|Ölbindemittel]] und Schachtabdeckung griffbereit,
- Betankung nicht unbeaufsichtigt, Zapfpistole nicht arretieren.

### Lagerung
- Gebinde auf [[auffangwanne|Auffangwannen]] mit genügendem Volumen, **überdacht** oder abgedeckt, gegen Anfahren geschützt,
- Volumen und Anforderungen gemäss kantonalen Vorgaben (Leitfaden Lagerung gefährlicher Stoffe),
- Sicherheitsdatenblätter verfügbar (Modul 7).

### Maschinen
- tägliche Sichtkontrolle auf Leckagen, Wartung der Hydraulikschläuche,
- Notfallset auf grossen Maschinen,
- biologisch schnell abbaubare Hydrauliköle prüfen – sie reduzieren Folgen, sind aber **kein Freipass**.

§> Art. 22 GSchG gesetzlich verbindlich (sinngemäss). Konkrete Lagervorgaben: kantonale Vollzugshilfe.` },
      { id: 'm2-l5-diagram', kind: 'diagram', title: 'Notfallkarte: Sofortmassnahmen bei Austritt', diagram: 'sofortmassnahmen', caption: 'Die ersten Minuten. Nach der eigenen Sicherheit laufen Eindämmung und Alarmierung gleichzeitig – nicht nacheinander.' },
      { id: 'm2-l5-explain-2', kind: 'explain', title: 'Havarie: Was in den ersten Minuten zählt', text: `Eine [[havarie|Havarie]] ist ein unerwartetes Ereignis mit Austritt von Stoffen. Die ersten Minuten entscheiden über die Grösse des Schadens.

1. **Eigene Sicherheit**: Zündquellen, Dämpfe, laufende Maschinen beachten. Keine gefährlichen Rettungsversuche, nicht in Schächte oder ins Gewässer steigen.
2. **Gleichzeitig stoppen, eindämmen und alarmieren**: Maschine abstellen, Leck abdichten, Schächte abdecken, Bindemittel streuen – und sobald Gewässer, Kanalisation oder Untergrund konkret gefährdet sind, **sofort 118 oder 117** alarmieren. Sind Sie zu zweit, alarmiert die zweite Person sofort; allein alarmieren Sie, sobald die Gefährdung erkennbar ist, und dämmen dann weiter ein. Intern nach Alarmplan (Polier, Bauführer, Umweltfachperson).
3. **Weitere sichere Massnahmen** bis zum Eintreffen der Einsatzkräfte; Ölsperren im Gewässer nur durch instruierte Personen vom sicheren Ufer aus – sonst Sache der Feuerwehr bzw. Ölwehr.
4. **Aufnehmen und entsorgen**: verschmutztes Bindemittel, Erdreich und Schachtinhalt nach Abfallklassierung durch einen berechtigten Entsorger (meist Sonderabfall mit Begleitschein).
5. **Dokumentieren**: Zeiten, Mengen, Fotos, Massnahmen, Meldungen – Zeiten am besten von Anfang an notieren.

§> Meldepflicht: Das GSchG verpflichtet Inhaber von Anlagen mit wassergefährdenden Flüssigkeiten, Flüssigkeitsverluste unverzüglich zu melden und zumutbare Abwehrmassnahmen zu treffen (laut externem Prüfbericht Art. 22 Abs. 6 GSchG – Wortlaut nicht selbst verifiziert, auf Fedlex prüfen).

!> Nie mit Wasser wegspülen und nie «abwarten, ob es reicht». Frühe Meldung ist professionell; Verschweigen verschlimmert Schaden und rechtliche Folgen.` },
      { id: 'm2-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Kleine Menge, grosse Wirkung', context: 'Hochbau', text: `Ein Mitarbeiter kippt beim Betanken eines Rüttlers etwa 3 Liter Benzin auf den Platz. Er streut Bindemittel, sammelt es ein – und meldet nichts. Ein Teil war bereits in einen Meteorschacht gelaufen. Zwei Tage später meldet ein Anwohner Ölschimmer und Geruch am Bach. Die Polizei ermittelt; die Kosten für Spülung des Leitungsabschnitts und Abklärungen trägt der Verursacher.

Die Lehre: Schon wenige Liter im Meteorschacht sind meldepflichtig relevant. Und: Wer meldet, kann Schaden begrenzen.` },
      EXTRA['m2-l5'].example,
      EXTRA['m2-l5'].deep,
      { id: 'm2-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q35' },
      EXTRA['m2-l5'].decision,
      EXTRA['m2-l5'].task,
      { id: 'm2-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q21', 'm2-q22', 'm2-q23', 'm2-q24'] },
      { id: 'm2-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p4' },
      { id: 'm2-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Betankung und Lagerung: dicht, überdacht, mit Rückhalt, fern von Gewässern und Schutzzonen.',
        'Sofortmassnahmen: eigene Sicherheit → gleichzeitig stoppen/eindämmen UND sofort alarmieren (118/117) → aufnehmen, nach Klassierung entsorgen → dokumentieren.',
        'Nie wegspülen, nie abwarten. Frühe Meldung begrenzt den Schaden.',
        'Nachbereitung = Ursachenanalyse und wirksame Vorbeugemassnahmen.',
      ] },
      { id: 'm2-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'kvu-lagerung', 'notruf', 'kanton-merkblatt', 'praxis', 'bgf', 'veva'] },
    ],
  },
  // =====================================================================
  {
    id: 'm2-l6', moduleId: M, level: 3, order: 6, review: E, minutes: 20,
    title: 'Entwässerungskonzept, Kontrolle und Beratung',
    topics: ['konzept', 'entwaesserung'],
    objectives: [
      'Ein Entwässerungskonzept für die Bauphase auf Vollständigkeit prüfen',
      'Typische Planungs- und Ausführungsfehler im Hoch- und Tiefbau erkennen',
      'Kontrollen so festlegen, dass sie nachvollziehbar sind',
      'Bauführer und Projektleiter zu Kosten, Risiken und Alternativen beraten',
    ],
    steps: [
      { id: 'm2-l6-situation', kind: 'situation', title: 'Einstieg: Das Konzept auf einer Seite', text: `Sie erhalten von einem Projektleiter das Entwässerungskonzept für eine Überbauung mit zwei Untergeschossen, Baugrube mit Rühlwand, Grundwasserabsenkung. Es besteht aus einem Plan und einem Satz: «Baustellenabwasser wird über Absetzbecken in die Kanalisation geleitet.»

Der Projektleiter: «Kannst du das bis morgen absegnen? Der Kanton will es haben.»` },
      { id: 'm2-l6-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q25'] },
      EXTRA['m2-l6'].brief,
      { id: 'm2-l6-explain', kind: 'explain', title: 'Aufbau eines Entwässerungskonzepts für die Bauphase', text: `Ein brauchbares [[entwaesserungskonzept|Entwässerungskonzept]] beantwortet sechs Fragen – je Bauphase (Aushub, Spezialtiefbau, Rohbau, Ausbau):

1. **Was fällt an?** Abwasserarten, Herkunft, Mengen (inkl. Regen und Grundwasser).
2. **Wie wird getrennt?** Fremdwasser fernhalten, Ströme getrennt führen.
3. **Wie wird behandelt?** Anlagen, Bemessung, Standorte, Betrieb (Schlamm, CO₂).
4. **Wohin wird abgeleitet?** Einleitstellen gemäss Kataster, Bewilligungen, Bedingungen.
5. **Wer kontrolliert was?** Zuständigkeiten, Messungen, Häufigkeit, Protokolle, Meldungen.
6. **Was tun im Notfall?** Starkregen, Anlagenausfall, Havarie: Regeln, Material, Alarmierung.

Zusätzlich: Plan mit Schächten (Meteor/Schmutz), Waschplatz, Betankung, Lager, Anlagen.

### Typische Fehler
- **Hochbau**: kein Waschplatz eingeplant; Meteorschächte im Arbeitsbereich nicht abgedeckt; Kernbohr- und Schleifwasser in Bodenabläufe; Fahrmischer-Reinigung auf der Strasse; Auffangwannen voll Regenwasser.
- **Tiefbau**: alle Wässer in ein einziges, zu kleines Becken; keine Neutralisation bei Pfählen/Spritzbeton; keine Regel für Starkregen; Wasserhaltung ohne Bewilligung oder ohne Messungen; Betankung in Gewässernähe.
- **Organisation**: Konzept existiert, aber Polier und Maschinisten kennen es nicht; keine Zuständigkeit für Kontrollen; Konzept wird bei Phasenwechsel nicht angepasst.` },
      { id: 'm2-l6-diagram', kind: 'diagram', title: 'Schema: Kontrollkreis', diagram: 'kontrollkreis', caption: 'Planen – Umsetzen – Kontrollieren – Verbessern: Wo im Ablauf Ihre Rolle liegt.' },
      { id: 'm2-l6-explain-2', kind: 'explain', title: 'Beraten statt absegnen', text: `In Ihrer Rolle als Umweltfachperson **beraten** Sie. Die Verantwortung für Planung und Ausführung bleibt bei Projekt- bzw. Bauleitung. Gute Beratung:

- benennt die **Risiken** konkret (Was kann passieren? Wie wahrscheinlich? Wie schwer?),
- trennt **Pflicht** (Gesetz, Auflage) von **Empfehlung** (Norm, Praxis),
- zeigt **Varianten** mit Kosten- und Terminfolgen,
- schliesst mit einer klaren **Empfehlung** und dem nächsten Schritt,
- dokumentiert kritische Hinweise schriftlich.

> Wenn Sie etwas nicht beurteilen können (z. B. Hydrogeologie, Bemessung, Rechtsfragen), sagen Sie das und empfehlen die Beiziehung einer Fachperson. Das ist Kompetenz, keine Schwäche.

!> Ein «Absegnen» unter Zeitdruck ohne Prüfung kann Ihnen später als Mitverantwortung ausgelegt werden. Geben Sie eine schriftliche Rückmeldung mit den offenen Punkten.` },
      { id: 'm2-l6-example', kind: 'example', title: 'Beispiel: Rückmeldung an den Projektleiter', context: 'Hochbau', text: `«Danke für das Konzept. Für die Eingabe beim Kanton fehlen aus meiner Sicht noch vier Punkte: (1) Behandlung des alkalischen Wassers aus Rühlwand-Betonage und Bodenplatte – Neutralisation einplanen; (2) Bemessung des Absetzbeckens für Grundwasserabsenkung plus Regen; (3) Zustimmung des Abwasserverbands zur Einleitung und Bedingungen; (4) Kontrollen und Notfallregel mit Zuständigkeit. Ich kann dir bis Donnerstag einen Vorschlag für die Punkte 1 und 4 machen. Für Punkt 2 empfehle ich, den Fachplaner Baugrube beizuziehen.»

Kurz, konkret, mit Angebot und klarer Abgrenzung.` },
      EXTRA['m2-l6'].example,
      EXTRA['m2-l6'].deep,
      { id: 'm2-l6-decision', kind: 'decision', title: 'Entscheidungsaufgabe: Beratung', questionId: 'm2-q27' },
      EXTRA['m2-l6'].decision,
      EXTRA['m2-l6'].task,
      { id: 'm2-l6-feynman', kind: 'feynman', title: 'Erklären Sie es dem Bauführer (Feynman-Methode)', feynmanId: 'm2-f2' },
      { id: 'm2-l6-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q26', 'm2-q29', 'm2-q28'] },
      { id: 'm2-l6-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p5' },
      { id: 'm2-l6-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Ein Konzept beantwortet je Bauphase: Was fällt an, wie getrennt, wie behandelt, wohin, wer kontrolliert, was im Notfall.',
        'Typische Fehler sind meist Planungs- und Organisationsfehler, nicht Einzelversagen.',
        'Kontrollen sind nachvollziehbar, wenn Wer, Wann, Was, Wert und Massnahme dokumentiert sind.',
        'Beraten heisst: Risiken, Pflicht vs. Empfehlung, Varianten mit Kosten, klare Empfehlung, schriftlich.',
        'Grenzen der eigenen Fachkompetenz benennen und Fachpersonen beiziehen.',
      ] },
      { id: 'm2-l6-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['sia431', 'kanton-merkblatt', 'gemeinde-entwaesserung', 'gschg', 'praxis'] },
    ],
  },
];
