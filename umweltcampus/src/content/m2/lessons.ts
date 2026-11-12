import type { Lesson } from '../types';

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
      { kind: 'situation', title: 'Einstieg: Montagmorgen in Langenthal', text: `Neubau Mehrfamilienhaus, Aushub abgeschlossen, Bodenplatte nächste Woche. Der Polier fragt Sie beim Kaffee: «Die Gemeinde hat in der Bewilligung etwas von Gewässerschutzbereich Au und Entwässerungskonzept geschrieben. Ist das wieder so ein Papier für die Schublade?»

Sie merken: Die Antwort entscheidet, ob er die Auflagen ernst nimmt. Dafür müssen Sie selbst sicher wissen, **was verbindlich ist**, **woher es kommt** und **wer zuständig ist**.` },
      { kind: 'quiz', title: 'Vorwissen prüfen (vor der Erklärung)', questionIds: ['m2-q01', 'm2-q04'] },
      { kind: 'explain', title: 'Drei Kernpflichten aus dem Gewässerschutzgesetz', text: `Das [[gschg|Gewässerschutzgesetz (GSchG, SR 814.20)]] ist für Baustellen die wichtigste Grundlage. Drei Bestimmungen sollten Sie sinngemäss auswendig können:

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
      { kind: 'diagram', title: 'Wie verbindlich ist was?', diagram: 'verbindlichkeit', caption: 'Die sechs Kategorien, die diese App bei jedem Inhalt ausweist. Tippen Sie auf eine Stufe für Beispiele.' },
      { kind: 'explain', title: 'Gewässerschutzbereiche und Schutzzonen', text: `Die Kantone teilen ihr Gebiet in Bereiche ein (Grundlage: GSchG Art. 19–20 und [[gschv|GSchV]] Anhang 4). Sie finden sie auf der **kantonalen Gewässerschutzkarte** (GIS):

- [[au|Bereich Au]]: schützt nutzbares Grundwasser. Grosse Teile des Mittellandes liegen im Au.
- **Bereich Ao**: schützt oberirdische Gewässer, wo dies besonders nötig ist.
- **Zuströmbereiche Zu/Zo**: Einzugsgebiet von Fassungen bzw. Gewässern mit Belastungsproblemen.
- [[schutzzone|Grundwasserschutzzonen S1–S3]]: um Trinkwasserfassungen, mit strengen Einschränkungen und einem Schutzzonenreglement.
- **Übriger Bereich (üB)**: die restlichen Flächen.

In den besonders gefährdeten Bereichen brauchen Bauten, Grabungen und Erdbewegungen eine kantonale Bewilligung, wenn sie Gewässer gefährden können. Daraus ergeben sich die typischen Auflagen in der Baubewilligung.

!> Die Lage zur Gewässerschutzkarte gehört in jede Umweltprüfung vor Baustart (Modul 8). Ein Installationsplatz in einer S-Zone ist ein Planungsfehler, kein Ausführungsdetail.` },
      { kind: 'example', title: 'Beispiel aus dem Tiefbau', context: 'Tiefbau', text: `Werkleitungsbau in einer Gemeinde im Kanton Solothurn: Der Graben quert auf 80 m eine Grundwasserschutzzone S3. Die Bewilligung verlangt u. a.: keine Betankung in der Zone, Maschinen täglich auf Leckagen prüfen, Ölbindemittel auf jeder Maschine, sofortige Meldung bei Ereignissen.

Der Polier organisiert einen Betankungsplatz ausserhalb der Zone und führt eine kurze tägliche Sichtkontrolle mit Unterschrift ein. Bei der Kontrolle durch das Amt kann er die Einhaltung belegen. **Die Auflage wurde wirksam, weil sie in eine konkrete Tätigkeit mit Verantwortlichem übersetzt wurde.**` },
      { kind: 'deep', title: 'Vertiefung: Haftung, Strafe, Kosten', text: `Gewässerverunreinigung ist strafbar – vorsätzlich und fahrlässig (Strafbestimmungen Art. 70 ff. GSchG). Strafverfahren richten sich gegen natürliche Personen: den Handelnden, aber auch Vorgesetzte, wenn Instruktion, Organisation oder Kontrolle ungenügend waren. Unabhängig davon trägt der Verursacher die Kosten von Sicherungs- und Behebungsmassnahmen (Art. 54 GSchG, Verursacherprinzip nach Art. 2 [[usg|USG]]).

Für Sie als Fachperson heisst das: **Dokumentierte Instruktion, klare Zuständigkeiten und nachvollziehbare Kontrollen** schützen die Umwelt und gleichzeitig die Führungskräfte. Rechtliche Einzelfragen (Haftung, Versicherung, Strafverfahren) gehören zur Rechtsabteilung bzw. zu einer Anwältin oder einem Anwalt.

§> Strafbestimmungen gesetzlich verbindlich; Zurechnung im Einzelfall entscheidet die Behörde bzw. das Gericht.` },
      { kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q05' },
      { kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q02', 'm2-q03', 'm2-q33'] },
      { kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p1' },
      { kind: 'summary', title: 'Zusammenfassung', points: [
        'Drei Kernpflichten: Sorgfalt (Art. 3), Verunreinigungsverbot inkl. Versickern (Art. 6), Abwasser behandeln und Einleitungen bewilligen lassen (Art. 7).',
        'Schon die Möglichkeit einer Verunreinigung genügt – auch auf dem Umweg über Schacht oder Boden.',
        'Bund setzt Recht, Kanton vollzieht, Gemeinde regelt die Kanalisation.',
        'Gewässerschutzkarte prüfen: Au, Ao, Zu/Zo, S1–S3 bestimmen die Auflagen.',
        'Verbindlichkeit immer einordnen: Gesetz, Auflage, Norm, Vollzugshilfe, Praxis, interner Standard.',
      ] },
      { kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'gschv', 'usg', 'bafu-wasser', 'kanton-merkblatt'] },
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
      { kind: 'situation', title: 'Einstieg: Der graue Bach', text: `Ein Fischer meldet der Polizei einen grau gefärbten Bach. Die Spur führt zu einem Regenwasserauslauf – 400 m weiter oben liegt Ihre Baustelle. Dort wurde am Morgen die Betonpumpe auf dem Vorplatz gereinigt. Der Maschinist schwört: «Ich habe das Wasser in die Kanalisation laufen lassen, die geht doch in die ARA.»

Der Schacht auf dem Vorplatz war ein **Meteorschacht**. Wie konnte das passieren – und wie verhindern Sie es auf allen Baustellen?` },
      { kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q06'] },
      { kind: 'explain', title: 'Abwasserarten auf der Baustelle', text: `Auf einer Baustelle fallen sehr unterschiedliche Wässer an. Für jede Art stellt sich dieselbe Frage: **Ist es verschmutzt, und wohin darf es?**

- **Unverschmutztes Regenwasser** (saubere Dächer, Containerdächer, unbelastete Flächen): darf in der Regel nach Vorgaben der Gemeinde versickern oder abgeleitet werden. Es darf nicht über verschmutzte Flächen fliessen.
- **Trübes Wasser** (Baugrube, Erdbau, Fahrspuren nach Regen): enthält Feinstoffe → Absetzen, siehe Lektion 4.
- **Alkalisches Wasser** (Betonwaschwasser, Spritzbeton, Bohrpfähle, Schleif- und Bohrwasser): pH 11–13 → Absetzen und Neutralisieren, siehe Lektion 3.
- **Öl- und treibstoffhaltiges Wasser** (Betankungs-, Wasch- und Abstellplätze): → Rückhalt, ggf. Ölabscheider oder Entsorgung als Sonderabfall.
- **Häusliches Abwasser** (WC, Waschanlagen der Unterkünfte): → [[schmutzwasser|Schmutzwasserkanal]] bzw. Fäkalientank.
- **Gepumptes Grundwasser** (Wasserhaltung): oft sauber, aber häufig trüb oder durch Frischbeton alkalisch → Bewilligung regelt Qualität und Ableitung.

### Trennsystem und Mischsystem
Im [[trennsystem|Trennsystem]] hat jedes Grundstück zwei Leitungen: Schmutzwasser zur [[ara|ARA]], Regenwasser über die [[meteorwasser|Meteorleitung]] direkt in ein Gewässer oder eine Versickerung. Im [[mischsystem|Mischsystem]] fliesst alles zusammen zur ARA – bei Starkregen entlasten aber Regenüberläufe ungereinigtes Mischwasser ins Gewässer.

!> Ein Meteorschacht ist praktisch eine Direktleitung in den Bach. Welcher Schacht wohin führt, zeigt nur der **Kanalisationskataster** der Gemeinde – nicht der Deckel und nicht das Bauchgefühl.

### Das Grundprinzip
**Vermeiden – Trennen – Behandeln – kontrolliert Ableiten.** Je weniger verschmutztes Wasser entsteht und je sauberer die Ströme getrennt bleiben, desto kleiner und günstiger die Behandlung. [[verduennung|Verdünnen]] ist keine Behandlung.` },
      { kind: 'diagram', title: 'Interaktives Schema: Wasserwege auf der Baustelle', diagram: 'wasserwege', caption: 'Wählen Sie eine Abwasserart. Das Schema zeigt den in der Regel zulässigen Weg und die typischen Fehlwege. Massgebend sind immer Bewilligung, Gemeinde und Kanton.' },
      { kind: 'explain', title: 'SIA 431: Die Norm zur Baustellenentwässerung', text: `Die Norm [[sia431|SIA 431 «Entwässerung von Baustellen»]] ist die technische Grundlage für Planung und Betrieb. Sie beschreibt, wie Abwasser auf Baustellen nach Herkunft und Verschmutzung eingeteilt, wie es behandelt und wohin es abgeleitet wird, und wie die Entwässerung geplant, betrieben und kontrolliert wird.

Rechtlich wird die Norm verbindlich, wenn sie im **Werkvertrag vereinbart** oder von der **Behörde verlangt** wird (häufig in Baubewilligungen und kantonalen Merkblättern). Unabhängig davon gilt sie als anerkannte Regel der Technik.

§> Technische Norm (kostenpflichtig, SIA). Diese App gibt nur eine eigene Zusammenfassung der Grundprinzipien wieder – Details, Tabellen und Werte bitte im Original nachlesen. Ausgabe prüfen.` },
      { kind: 'example', title: 'Beispiel aus dem Hochbau', context: 'Hochbau', text: `Wohnüberbauung mit Einstellhalle in Aarau: Die AVOR markiert im Installationsplan alle Schächte im Baustellenbereich mit Farbe nach Kataster (blau = Meteor, braun = Schmutz). Meteorschächte im Arbeitsbereich werden mit **Schachtabdeckungen** gesichert. Der Waschplatz für Pumpe und Kübel liegt auf einer befestigten Fläche mit Absetzcontainer und Neutralisation; der Ablauf ist an den Schmutzwasserkanal angeschlossen – mit Zustimmung des Abwasserverbands.

Der Aufwand: ein halber Tag Planung und eine Mietanlage. Der Nutzen: keine Diskussion auf der Baustelle, wohin das Wasser darf.` },
      { kind: 'deep', title: 'Vertiefung: Regenwasser von der Baustelle fernhalten', text: `Die grösste Wassermenge auf Baustellen ist Regen. Fliesst sauberes Regenwasser in die Baugrube oder über verschmutzte Flächen, wird es zu Baustellenabwasser – und muss behandelt werden. Wirkungsvolle Massnahmen:

- Fremdwasser oberhalb der Baugrube abfangen (Randgraben, Abschlauchung), sauber ableiten.
- Dachwasser von Containern und Neubauteilen separat fassen.
- Verschmutzte Flächen (Waschplatz, Betankung, Lager) klein halten und überdachen.
- Bauphasen beachten: Im Aushub dominiert Trübwasser, im Rohbau alkalisches Wasser, im Ausbau häusliches Abwasser und Reinigungswasser.

> Bewährte Praxis. Diese Trennung entscheidet über Grösse und Kosten jeder Behandlungsanlage.` },
      { kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q31' },
      { kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q07', 'm2-q08', 'm2-q09'] },
      { kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p2' },
      { kind: 'summary', title: 'Zusammenfassung', points: [
        'Jede Abwasserart einzeln einstufen: trüb, alkalisch, ölhaltig, häuslich, unverschmutzt.',
        'Meteorschacht = Weg in den Bach oder ins Grundwasser. Kataster prüfen, Schächte im Arbeitsbereich abdecken.',
        'Vermeiden – Trennen – Behandeln – kontrolliert Ableiten. Verdünnen ist keine Behandlung.',
        'SIA 431 ist die technische Grundlage; verbindlich durch Vertrag oder Behörde.',
        'Die Kanalisation ist kein freier Entsorgungsweg: Einleitungen brauchen Zustimmung bzw. Bewilligung.',
      ] },
      { kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['sia431', 'gschg', 'gemeinde-entwaesserung', 'vsa', 'kanton-merkblatt'] },
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
      { kind: 'situation', title: 'Einstieg: «Ist doch nur Wasser»', text: `Freitag, 15.30 Uhr, Hochbaustelle in Wohnquartier. Die Decke über dem 2. OG ist betoniert. Ein Mitarbeiter will die Kübel und die Pumpe reinigen und das graue Wasser in den Schacht am Strassenrand laufen lassen: «Ist doch nur Wasser mit etwas Zement, das löst sich auf.»

Wie erklären Sie ihm in zwei Sätzen, warum das nicht geht – und was er stattdessen tun soll?` },
      { kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q10', 'm2-q11'] },
      { kind: 'explain', title: 'Warum Betonwaschwasser so gefährlich ist', text: `Zement reagiert mit Wasser und bildet unter anderem Calciumhydroxid. Waschwasser von Frischbeton ist deshalb **stark alkalisch, typischerweise pH 11–13**, und enthält viele Feinstoffe.

Der [[ph|pH-Wert]] ist logarithmisch: Jeder Schritt bedeutet einen Faktor 10. Wasser mit pH 12 ist 10 000-mal alkalischer als Wasser mit pH 8.

### Wirkung im Gewässer
- **Verätzung**: Kiemen und Schleimhäute von Fischen und Kleinlebewesen werden geschädigt.
- **Ammoniak**: Bei hohem pH verschiebt sich das Gleichgewicht von Ammonium zum giftigen Ammoniak.
- **Feinstoffe**: setzen sich in der Gewässersohle ab ([[kolmation|Kolmation]]) und zerstören Laichplätze.

In einem kleinen Bach können wenige hundert Liter Waschwasser ein Fischsterben über hunderte Meter auslösen. Das ist kein Bagatellschaden.

!> Betonwaschwasser darf nie in Meteorschacht, Graben, Bach oder Versickerung. Auch in den Schmutzwasserkanal nur behandelt und mit Zustimmung bzw. Bewilligung.` },
      { kind: 'diagram', title: 'pH-Skala: Wo liegt was?', diagram: 'ph-skala', caption: 'Logarithmische Skala. Die eingetragenen Bereiche sind typische Grössenordnungen; massgebend sind die Werte in Bewilligung und kantonalem Merkblatt.' },
      { kind: 'explain', title: 'Die Behandlungskette', text: `### 1. Vermeiden und klein halten
- Fahrmischer-Trommeln im Betonwerk reinigen lassen; auf der Baustelle nur Rutsche über einem Behälter abspritzen.
- [[restbeton|Restbeton]] nicht ausspülen, sondern zurückgeben oder geordnet verwerten.
- Einen festen **Waschplatz** einrichten – sonst wird dort gewaschen, wo gerade Wasser abfliesst.

### 2. Absetzen
Feststoffe zuerst zurückhalten ([[absetzbecken|Absetzbecken bzw. -container]]). Sonst stören sie die Neutralisation und lagern sich in Leitungen ab. Den Schlamm regelmässig entfernen und als mineralischen Abfall entsorgen.

### 3. Neutralisieren
Bevorzugt mit **CO₂** ([[neutralisation|Neutralisation]]): Es bildet Kohlensäure, eine schwache Säure. Auch bei Überdosierung sinkt der pH kaum unter ca. 6, und es müssen keine starken Säuren gelagert werden. Mineralsäuren (z. B. Salzsäure) nur mit Fachwissen und Arbeitssicherheitsmassnahmen.

### 4. Kontrollieren und dokumentieren
pH vor der Ableitung messen (kalibriertes Gerät oder automatische Messung mit Abschaltung). Protokoll mit Datum, Zeit, Wert, Visum, Massnahme bei Abweichung.

### 5. Ableiten gemäss Bewilligung
In der Regel in den Schmutzwasserkanal, mit Zustimmung bzw. Bewilligung von Gemeinde oder Kanton und unter deren Bedingungen. Viele Merkblätter nennen als Zielbereich für die Ableitung einen pH zwischen etwa 6.5 und 9.

§> Zahlenwerte für die Ableitung sind in der Bewilligung bzw. im kantonalen Merkblatt festgelegt (Grundlage u. a. GSchV Anhang 3.2). Der genannte Zielbereich ist ein häufig genannter Richtwert – Prüfstatus: am Originaltext und kantonalen Merkblatt zu prüfen.` },
      { kind: 'diagram', title: 'Schema: Behandlungskette', diagram: 'behandlungskette', caption: 'Reihenfolge der Behandlung. Jeder Schritt hat eine verantwortliche Person und einen Nachweis.' },
      { kind: 'example', title: 'Beispiel aus dem Tiefbau', context: 'Tiefbau', text: `Bohrpfahlwand für eine Baugrube in Winterthur: Beim Betonieren der Pfähle wird Grundwasser und Stützflüssigkeit verdrängt – das Wasser ist trüb und alkalisch. Die Unternehmung stellt eine Absetz- und CO₂-Neutralisationsanlage mit automatischer pH-Messung und **Abschaltung bei Grenzwertüberschreitung** auf. Die Messwerte werden aufgezeichnet und wöchentlich der Bauleitung übergeben.

Als die CO₂-Flasche an einem Samstag leer ist, schaltet die Anlage ab – das Wasser bleibt in der Grube statt im Kanal. Die Alarmierung per SMS an den Polier war im Konzept vorgesehen.` },
      { kind: 'deep', title: 'Vertiefung: Weitere Quellen und Sonderfälle', text: `Alkalisches Wasser entsteht überall, wo Wasser mit frischem Zement oder Betonoberflächen in Kontakt kommt:
- **Spritzbeton** (Tunnel, Baugrubensicherung): Rückprall und Reinigungswasser.
- **Bohrpfähle, Schlitzwände, Injektionen**: verdrängtes Wasser, Suspensionen.
- **Kernbohren, Fräsen, Sägen**: kleine Mengen, aber sehr feinstoffreich und alkalisch – oft in Innenräumen über Bodenabläufe entsorgt.
- **Hochdruckwasserstrahlen (HDW)**: grosse Mengen, zusätzlich Abtragsmaterial (ggf. mit Schadstoffen, z. B. aus alten Beschichtungen – Bezug zu Modul 3).
- **Frischbeton im Grundwasser**: Bodenplatten und Wände im Grundwasser erhöhen lokal den pH des abgepumpten Wassers.

> Bewährte Praxis: Bohr- und Schleifwasser mit Saugern oder Wassersaugmatten fassen und über einen Absetzbehälter führen; Bodenabläufe im Neubau abdecken.` },
      { kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q36' },
      { kind: 'feynman', title: 'Erklären Sie es dem Polier (Feynman-Methode)', feynmanId: 'm2-f1' },
      { kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q12', 'm2-q13', 'm2-q14'] },
      { kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p3' },
      { kind: 'summary', title: 'Zusammenfassung', points: [
        'Betonwaschwasser: pH 11–13, Feinstoffe – akut giftig für Gewässerlebewesen.',
        'Kette: Vermeiden → Absetzen → Neutralisieren → Kontrollieren/Dokumentieren → Ableiten gemäss Bewilligung.',
        'CO₂ ist das bevorzugte Neutralisationsmittel; Verdünnen ist keine Behandlung.',
        'Auch Spritzbeton, Pfähle, Kernbohren und HDW erzeugen alkalisches Wasser.',
        'Ableitwerte stehen in Bewilligung und Merkblatt – nicht raten.',
      ] },
      { kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['kanton-merkblatt', 'sia431', 'gschv', 'gemeinde-entwaesserung', 'praxis'] },
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
      { kind: 'situation', title: 'Einstieg: Lehmbrühe nach dem Gewitter', text: `Grosser Aushub für ein Gewerbegebäude, lehmiger Boden. Nach einem nächtlichen Gewitter steht 40 cm braunes Wasser in der Baugrube. Der Maschinist hat um 6 Uhr die Tauchpumpe eingeschaltet, der Schlauch führt über den Zaun in den Strassengraben. Am Grabenende fliesst die Brühe in einen kleinen Bach.

Sie kommen um 7 Uhr auf die Baustelle. Was tun Sie zuerst?` },
      { kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q15'] },
      { kind: 'explain', title: 'Trübstoffe: unterschätzter Schaden', text: `Trübes Wasser enthält Feinstoffe (Ton, Silt, Feinsand), die als [[gus|ungelöste Stoffe]] mitgeführt werden. Im Gewässer
- trüben sie das Wasser und reduzieren das Licht,
- verkleben Kiemen,
- lagern sich im Kies der Sohle ab ([[kolmation|Kolmation]]) und zerstören den Lebensraum von Kleinlebewesen sowie die Laichplätze von Fischen.

Kolmation ist ein **Langzeitschaden**: Die Sohle kann über Monate geschädigt bleiben, auch wenn das Wasser längst wieder klar ist.

### Absetzbecken: Prinzip und Grenzen
Ein [[absetzbecken|Absetzbecken]] funktioniert, wenn das Wasser lange genug ruhig darin bleibt. Entscheidend sind:
- genügend **Oberfläche** im Verhältnis zur Zuflussmenge,
- beruhigter **Einlauf** und Abzug an der Oberfläche (keine Kurzschlussströmung),
- regelmässige **Schlammentnahme**,
- mehrere Kammern oder Container in Serie.

Sand setzt sich schnell ab, Silt langsam, feiner Ton kaum. Bei tonigen Böden stossen einfache Becken an Grenzen. Dann helfen: Wasseranfall reduzieren, grössere Becken, Filtration, oder – nur nach Abklärung – [[flockungsmittel|Flockungsmittel]].

> Die Bemessung gehört in die Planung (Entwässerungskonzept, Fachplaner). Die App enthält bewusst keine Bemessungswerte.` },
      { kind: 'explain', title: 'Wasserhaltung, Einleitung, Versickerung', text: `[[wasserhaltung|Wasserhaltung]] (offene Wasserhaltung, Brunnen, Grundwasserabsenkung) greift ins Grundwasser ein und ist in der Regel **bewilligungspflichtig**. Die Bewilligung regelt typischerweise:
- Entnahmemenge und Dauer,
- wohin das Wasser geht (Rückgabe ins Grundwasser, Gewässer, Kanalisation),
- welche Qualität verlangt ist (z. B. klar, ohne Ölfilm, pH-Bereich),
- Überwachung und Dokumentation, Meldepflichten bei Abweichungen.

Für **Einleitung in ein Gewässer** und [[versickerung|Versickerung]] von Abwasser braucht es eine kantonale Bewilligung (Art. 7 GSchG). Verschmutztes Wasser darf nicht «einfach versickern» – der Boden ist kein unbegrenzter Filter, und Feinstoffe verschlämmen ihn zusätzlich (Bezug zu Modul 4 Bodenschutz).

!> Bauten unter dem mittleren Grundwasserspiegel im Bereich Au sind eingeschränkt (GSchV Anhang 4). Das ist eine Planungs- und Bewilligungsfrage vor Baubeginn. Prüfstatus: Regelung sinngemäss – Detail im Original prüfen.` },
      { kind: 'example', title: 'Beispiel: Starkregen auf Tiefbaustelle', context: 'Tiefbau', text: `Kanalisationsersatz in einer Talsohle. Das Entwässerungskonzept sieht drei Absetzcontainer in Serie und eine Notfallregel vor: «Bei sichtbarer Trübung am Auslauf Pumpen abstellen, Polier informiert Bauleitung, Rückhalt in der Grube.» Nach einem Gewitter wird genau so gehandelt. Die Grube dient zwei Stunden als Puffer, danach ist das Wasser nach dem Absetzen klar.

Ohne diese vorbereitete Regel hätte der Maschinist weiter gepumpt – um die Arbeit nicht zu verzögern.` },
      { kind: 'deep', title: 'Vertiefung: Messen statt schätzen', text: `Wie trüb ist «trüb»? Für die Eigenkontrolle bewähren sich einfache Mittel: ein Klarsichtgefäss (Sichttiefe), Fotos am Auslauf zu festen Zeiten, Absetzprobe im Messbecher (Imhofftrichter). In Bewilligungen werden teilweise Werte für ungelöste Stoffe oder Trübung verlangt, die von einem Labor oder mit Messgeräten überprüft werden.

Wichtig für Ihre Rolle: Kontrollen müssen **vorher festgelegt** sein – wer misst wann, womit, und was passiert bei Überschreitung. Sonst entscheidet im Ernstfall der Zeitdruck.` },
      { kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q30' },
      { kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q16', 'm2-q17', 'm2-q18', 'm2-q34'] },
      { kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p6' },
      { kind: 'summary', title: 'Zusammenfassung', points: [
        'Trübstoffe verursachen Kolmation – ein Langzeitschaden an der Gewässersohle.',
        'Absetzbecken: Oberfläche, Aufenthaltszeit, ruhige Strömung, Schlammentnahme. Feinster Ton setzt sich kaum ab.',
        'Flockungsmittel nur nach Abklärung mit der Fachstelle.',
        'Wasserhaltung, Einleitung in Gewässer und Versickerung sind in der Regel bewilligungspflichtig.',
        'Notfallregel für Starkregen vorbereiten: Einleitung stoppen, zurückhalten, melden.',
      ] },
      { kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'gschv', 'sia431', 'kanton-merkblatt', 'bafu-wasser'] },
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
      { kind: 'situation', title: 'Einstieg: Schlauchplatzer', text: `Ein Bagger arbeitet am Rand des Installationsplatzes. Mit einem Knall platzt ein Hydraulikschlauch, Öl spritzt auf den Kies und läuft Richtung Meteorschacht, 15 m entfernt. Der Maschinist steht unter Schock. Sie sind zufällig 30 m entfernt.

Was tun Sie in den nächsten zwei Minuten?` },
      { kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q20'] },
      { kind: 'explain', title: 'Vorsorge: Betankung, Lagerung, Maschinen', text: `Öle und Treibstoffe sind [[wassergefaehrdend|wassergefährdende Flüssigkeiten]]. Das GSchG verlangt, dass Anlagen damit so erstellt und betrieben werden, dass keine Gewässer gefährdet werden (Art. 22 GSchG). Auf der Baustelle heisst das:

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
      { kind: 'diagram', title: 'Notfallkarte: Sofortmassnahmen bei Austritt', diagram: 'sofortmassnahmen', caption: 'Reihenfolge für die ersten Minuten. Bei mehreren Personen laufen Alarmierung und Eindämmung parallel.' },
      { kind: 'explain', title: 'Havarie: Was in den ersten Minuten zählt', text: `Eine [[havarie|Havarie]] ist ein unerwartetes Ereignis mit Austritt von Stoffen. Die ersten Minuten entscheiden über die Grösse des Schadens.

1. **Eigene Sicherheit**: Zündquellen, Dämpfe, laufende Maschinen beachten.
2. **Stoppen**: Maschine abstellen, Leck abdichten, Gebinde aufrichten.
3. **Eindämmen**: Schächte abdecken (Schachtabdeckmatte), Bindemittel streuen, Erddamm schieben.
4. **Alarmieren**: Bei Gefahr für Gewässer, Kanalisation oder Untergrund sofort **118** oder **117**. Intern nach Alarmplan (Polier, Bauführer, Umweltfachperson).
5. **Aufnehmen und entsorgen**: verschmutztes Bindemittel und Erdreich als Sonderabfall.
6. **Dokumentieren**: Zeiten, Mengen, Fotos, Massnahmen, Meldungen.

!> Nie mit Wasser wegspülen und nie «abwarten, ob es reicht». Frühe Meldung ist professionell; Verschweigen verschlimmert Schaden und rechtliche Folgen.` },
      { kind: 'example', title: 'Beispiel: Kleine Menge, grosse Wirkung', context: 'Hoch- und Tiefbau', text: `Ein Mitarbeiter kippt beim Betanken eines Rüttlers etwa 3 Liter Benzin auf den Platz. Er streut Bindemittel, sammelt es ein – und meldet nichts. Ein Teil war bereits in einen Meteorschacht gelaufen. Zwei Tage später meldet ein Anwohner Ölschimmer und Geruch am Bach. Die Polizei ermittelt; die Kosten für Spülung des Leitungsabschnitts und Abklärungen trägt der Verursacher.

Die Lehre: Schon wenige Liter im Meteorschacht sind meldepflichtig relevant. Und: Wer meldet, kann Schaden begrenzen.` },
      { kind: 'deep', title: 'Vertiefung: Nach dem Ereignis', text: `Nach dem Einsatz beginnt die eigentliche Arbeit:
- **Beweissicherung und Bericht**: Ablauf, Mengen, Fotos, Meldungen, Beteiligte.
- **Entsorgung** mit Nachweisen (Bindemittel, Erdreich, Schachtinhalt).
- **Ursachenanalyse**: Warum ist der Schlauch geplatzt? Wartung? Standort? Warum lag kein Bindemittel bereit?
- **Korrektur- und Vorbeugemassnahmen** mit Termin und Verantwortlichem – und Kontrolle der Wirksamkeit.
- **Übertragung** der Erkenntnisse auf andere Baustellen (Toolbox-Meeting, Standard).

Das ist die Logik der Korrekturmassnahmen in ISO 14001 (Modul 10).` },
      { kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm2-q35' },
      { kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q21', 'm2-q22', 'm2-q23', 'm2-q24'] },
      { kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p4' },
      { kind: 'summary', title: 'Zusammenfassung', points: [
        'Betankung und Lagerung: dicht, überdacht, mit Rückhalt, fern von Gewässern und Schutzzonen.',
        'Sofortmassnahmen: Sicherheit → Stoppen → Eindämmen → Alarmieren (118/117) → Aufnehmen → Dokumentieren.',
        'Nie wegspülen, nie abwarten. Frühe Meldung begrenzt den Schaden.',
        'Nachbereitung = Ursachenanalyse und wirksame Vorbeugemassnahmen.',
      ] },
      { kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'kvu-lagerung', 'notruf', 'kanton-merkblatt', 'praxis'] },
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
      { kind: 'situation', title: 'Einstieg: Das Konzept auf einer Seite', text: `Sie erhalten von einem Projektleiter das Entwässerungskonzept für eine Überbauung mit zwei Untergeschossen, Baugrube mit Rühlwand, Grundwasserabsenkung. Es besteht aus einem Plan und einem Satz: «Baustellenabwasser wird über Absetzbecken in die Kanalisation geleitet.»

Der Projektleiter: «Kannst du das bis morgen absegnen? Der Kanton will es haben.»` },
      { kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m2-q25'] },
      { kind: 'explain', title: 'Aufbau eines Entwässerungskonzepts für die Bauphase', text: `Ein brauchbares [[entwaesserungskonzept|Entwässerungskonzept]] beantwortet sechs Fragen – je Bauphase (Aushub, Spezialtiefbau, Rohbau, Ausbau):

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
      { kind: 'diagram', title: 'Schema: Kontrollkreis', diagram: 'kontrollkreis', caption: 'Planen – Umsetzen – Kontrollieren – Verbessern: Wo im Ablauf Ihre Rolle liegt.' },
      { kind: 'explain', title: 'Beraten statt absegnen', text: `In Ihrer Rolle als Umweltfachperson **beraten** Sie. Die Verantwortung für Planung und Ausführung bleibt bei Projekt- bzw. Bauleitung. Gute Beratung:

- benennt die **Risiken** konkret (Was kann passieren? Wie wahrscheinlich? Wie schwer?),
- trennt **Pflicht** (Gesetz, Auflage) von **Empfehlung** (Norm, Praxis),
- zeigt **Varianten** mit Kosten- und Terminfolgen,
- schliesst mit einer klaren **Empfehlung** und dem nächsten Schritt,
- dokumentiert kritische Hinweise schriftlich.

> Wenn Sie etwas nicht beurteilen können (z. B. Hydrogeologie, Bemessung, Rechtsfragen), sagen Sie das und empfehlen die Beiziehung einer Fachperson. Das ist Kompetenz, keine Schwäche.

!> Ein «Absegnen» unter Zeitdruck ohne Prüfung kann Ihnen später als Mitverantwortung ausgelegt werden. Geben Sie eine schriftliche Rückmeldung mit den offenen Punkten.` },
      { kind: 'example', title: 'Beispiel: Rückmeldung an den Projektleiter', context: 'Hochbau', text: `«Danke für das Konzept. Für die Eingabe beim Kanton fehlen aus meiner Sicht noch vier Punkte: (1) Behandlung des alkalischen Wassers aus Rühlwand-Betonage und Bodenplatte – Neutralisation einplanen; (2) Bemessung des Absetzbeckens für Grundwasserabsenkung plus Regen; (3) Zustimmung des Abwasserverbands zur Einleitung und Bedingungen; (4) Kontrollen und Notfallregel mit Zuständigkeit. Ich kann dir bis Donnerstag einen Vorschlag für die Punkte 1 und 4 machen. Für Punkt 2 empfehle ich, den Fachplaner Baugrube beizuziehen.»

Kurz, konkret, mit Angebot und klarer Abgrenzung.` },
      { kind: 'deep', title: 'Vertiefung: Kosten- und Terminfolgen', text: `Entwässerungsmassnahmen kosten Geld – Schäden kosten mehr. Für die Beratung hilfreich:
- **Frühe Planung** ist am günstigsten: Ein Waschplatz im Installationsplan kostet wenig; ein nachträglicher Umbau während des Rohbaus viel.
- **Mietanlagen** (Absetzcontainer, CO₂-Neutralisation) sind kalkulierbar und gehören in die Offerte bzw. das Leistungsverzeichnis.
- **Ausfallrisiko**: Ein Baustopp durch die Behörde oder eine Sanierung des Gewässers übersteigt die Präventionskosten in der Regel deutlich.
- **Verantwortung im Werkvertrag**: Wer stellt und betreibt die Anlagen? Wer misst? Unklare Schnittstellen sind ein häufiger Grund für Lücken.

Diese Themen vertieft Modul 8 (Umwelt in Bauplanung und AVOR).` },
      { kind: 'decision', title: 'Entscheidungsaufgabe: Beratung', questionId: 'm2-q27' },
      { kind: 'feynman', title: 'Erklären Sie es dem Bauführer (Feynman-Methode)', feynmanId: 'm2-f2' },
      { kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m2-q26', 'm2-q29', 'm2-q28'] },
      { kind: 'practice', title: 'Praxisauftrag', taskId: 'm2-p5' },
      { kind: 'summary', title: 'Zusammenfassung', points: [
        'Ein Konzept beantwortet je Bauphase: Was fällt an, wie getrennt, wie behandelt, wohin, wer kontrolliert, was im Notfall.',
        'Typische Fehler sind meist Planungs- und Organisationsfehler, nicht Einzelversagen.',
        'Kontrollen sind nachvollziehbar, wenn Wer, Wann, Was, Wert und Massnahme dokumentiert sind.',
        'Beraten heisst: Risiken, Pflicht vs. Empfehlung, Varianten mit Kosten, klare Empfehlung, schriftlich.',
        'Grenzen der eigenen Fachkompetenz benennen und Fachpersonen beiziehen.',
      ] },
      { kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['sia431', 'kanton-merkblatt', 'gemeinde-entwaesserung', 'gschg', 'praxis'] },
    ],
  },
];
