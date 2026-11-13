import type { Scenario } from '../types';

// Baustellensimulationen. Mehrere Entscheidungsstufen, Verzweigungen bei
// schweren Fehlern, Bewertung nach sieben Kriterien.

export const SCENARIOS: Scenario[] = [
  // =====================================================================
  {
    id: 'sim-a', code: 'A', moduleId: 'm2', status: 'verfuegbar', rev: 3,
    title: 'Betonwaschwasser am Freitagnachmittag',
    setting: 'Hochbau', level: 2, minutes: 15,
    topics: ['alkalisch', 'entwaesserung', 'havarie', 'recht'],
    intro: 'Neubau Mehrfamilienhaus mit 18 Wohnungen in einem Wohnquartier im Kanton Aargau. Die Decke über dem 2. OG wurde heute betoniert. Es ist Freitag, 15.40 Uhr. Sie kommen für eine kurze Umweltbegehung auf die Baustelle.',
    facts: [
      'Auf dem Vorplatz reinigt ein Mitarbeiter Betonkübel und den Schlauch der Autobetonpumpe.',
      'Er hat einen Wasserschlauch gelegt; das graue Wasser fliesst Richtung eines Schachts am Rand des Vorplatzes.',
      'Laut Plan des Unternehmens wäre ein Waschplatz mit Absetzcontainer vorgesehen – er ist nicht eingerichtet.',
      'Der Polier ist bereits gegangen, der Bauführer ist telefonisch erreichbar.',
    ],
    stages: [
      {
        id: 'a1', title: 'Problem erkennen', type: 'single', criteria: ['risiko', 'prioritaet'], next: 'a2',
        situation: 'Sie sehen aus 20 m Entfernung, wie das graue Wasser über den Vorplatz in Richtung Schacht läuft.',
        prompt: 'Was tun Sie als Erstes?',
        options: [
          { id: 'x1', points: 2, text: 'Sofort zum Mitarbeiter gehen, den Wasserfluss stoppen lassen und weiteres Abfliessen verhindern.', feedback: 'Richtig. Jede Minute gelangt weiteres alkalisches Wasser in den Schacht. Zuerst die Quelle stoppen, dann klären.' },
          { id: 'x2', points: 0, critical: true, next: 'a-hav', text: 'Ihn fertig machen lassen und am Montag mit dem Polier besprechen.', feedback: 'Schwerer Fehler: Sie haben eine laufende Verunreinigung erkannt und nicht unterbunden. Das widerspricht der Sorgfaltspflicht.', consequence: 'Der Mitarbeiter reinigt weitere 20 Minuten. Rund 300 Liter Waschwasser gelangen in den Schacht.' },
          { id: 'x3', points: 0, critical: true, next: 'a-hav', text: 'Zuerst den Bauführer anrufen und fragen, was er dazu meint, während der Mitarbeiter weiterarbeitet.', feedback: 'Rückfrage ist gut, aber nicht vor dem Stoppen. Während des Telefonats läuft das Waschwasser weiter.', consequence: 'Das Telefonat dauert 10 Minuten. In dieser Zeit fliessen rund 300 Liter Waschwasser in den Schacht.' },
          { id: 'x4', points: 0, critical: true, next: 'a-hav', text: 'Ihm zurufen, er solle «aufpassen», und die Begehung fortsetzen.', feedback: 'Kritischer Fehler: Ein Zuruf stellt nicht sicher, dass die laufende Einleitung aufhört. Gehen Sie hin, stoppen Sie den Wasserfluss und klären Sie die Alternative.', consequence: 'Der Mitarbeiter nickt und reinigt weiter. In den nächsten 20 Minuten gelangen rund 300 Liter Waschwasser in den Schacht.' },
        ],
      },
      {
        id: 'a-hav', title: 'Die Lage hat sich verschärft', type: 'single', criteria: ['risiko', 'recht', 'zusammenarbeit'], next: 'a3',
        situation: 'Als Sie zurückkommen, ist der Schacht grau. Ein Anwohner ruft über den Zaun: «Der Dorfbach unten ist milchig, da treiben tote Fische!» Laut Kataster führt der Schacht als Meteorleitung in den Dorfbach, 300 m entfernt.',
        prompt: 'Was tun Sie jetzt?',
        options: [
          { id: 'h1', points: 2, text: 'Sofort 118 bzw. 117 alarmieren, Reinigung definitiv stoppen, Schacht abdichten, restliches Wasser auffangen, Bauführer informieren und alles dokumentieren.', feedback: 'Richtig. Bei einer eingetretenen Gewässerverschmutzung wird sofort alarmiert. Die Einsatzkräfte bieten das kantonale Pikett auf, das die Lage beurteilt und Massnahmen am Gewässer anordnet. Massnahmen im Bach selbst (z. B. Absperrungen, Abfischen) sind Sache der Einsatzkräfte und Fachstellen, nicht der Baustelle.' },
          { id: 'h2', points: 0, critical: true, text: 'Nichts melden und hoffen, dass sich der Bach von selbst erholt.', feedback: 'Sehr schwerer Fehler. Verschweigen verhindert Schadensbegrenzung und verschärft die rechtlichen Folgen erheblich.', consequence: 'Mögliche Folge (Simulation, kein zwangsläufiger Verlauf): Der Fischereiaufseher findet am Abend tote Fische und Kleinlebewesen. Die Spur führt zur Baustelle. Es folgen eine Strafanzeige, Kosten für Abklärungen, Fischereiersatz und ein Medienbericht.' },
          { id: 'h3', points: 0, critical: true, text: 'Den Schacht mit viel Frischwasser durchspülen, damit es sich verdünnt.', feedback: 'Falsch. Spülen drückt den Schadstoff schneller und in grösserer Menge in den Bach. Verdünnen ist keine Behandlung und keine Notfallmassnahme.', consequence: 'Der grau-milchige Schwall erreicht den Bach in einem Stoss. Der Schaden vergrössert sich.' },
        ],
      },
      {
        id: 'a2', title: 'Fehlende Informationen erfragen', type: 'ask', criteria: ['unsicherheit', 'risiko'], pick: 4,
        situation: 'Der Mitarbeiter hat das Wasser abgestellt. Ein Teil (geschätzt ein Eimer) ist bereits im Schacht. In Kübeln, Pumpe und einer Wanne stehen noch rund 400 Liter graues Wasser.',
        prompt: 'Bevor Sie entscheiden: Welche vier Informationen holen Sie ein? (Die Antworten werden aufgedeckt.)',
        options: [
          { id: 'q1', points: 2, relevant: true, text: 'Wohin führt der Schacht? (Kataster)', reveal: 'Laut Kanalisationskataster: Meteorleitung, Auslauf in den Dorfbach ca. 300 m unterhalb.', feedback: 'Zentral: Entscheidet, ob ein Gewässer betroffen ist.' },
          { id: 'q2', points: 2, relevant: true, text: 'Ist bereits Wasser im Schacht bzw. im Bach angekommen?', reveal: 'Im Schacht steht etwas graues Wasser. Am Bachauslauf ist (noch) keine Färbung sichtbar – kontrolliert um 15.50 Uhr.', feedback: 'Zentral. Wichtig: Ist bereits Waschwasser in der Meteorleitung, ist das Gewässer konkret gefährdet – dann wird umgehend gemeldet (117/118), auch wenn am Bach noch nichts sichtbar ist. Die Sichtkontrolle ersetzt die Meldung nicht.' },
          { id: 'q3', points: 2, relevant: true, text: 'Was sieht das Entwässerungskonzept bzw. die Bewilligung vor?', reveal: 'Konzept: Waschplatz mit Absetzcontainer, Ableitung nach Neutralisation in den Schmutzwasserkanal mit Zustimmung des Abwasserverbands. Waschplatz nie eingerichtet.', feedback: 'Wichtig: zeigt den vorgesehenen Weg und einen Organisationsmangel.' },
          { id: 'q4', points: 2, relevant: true, text: 'Welche Mittel sind vor Ort verfügbar? (Behälter, Mulde, Schachtabdeckung, pH-Streifen)', reveal: 'Vorhanden: leere Mulde, zwei IBC-Container, pH-Teststreifen im Magazin. Keine Schachtabdeckung.', feedback: 'Wichtig für die sofort mögliche Lösung.' },
          { id: 'q5', points: 1, relevant: true, text: 'Ist Regen angesagt?', reveal: 'Heute Nacht leichter Regen.', feedback: 'Hilfreich: Offene Behälter könnten überlaufen. Aber nicht die dringendste Frage.' },
          { id: 'q6', points: 0, relevant: false, text: 'Welche Betonsorte wurde verwendet?', reveal: 'NPK C, C30/37.', feedback: 'Für die Entscheidung nicht relevant: Waschwasser jedes Normalbetons ist stark alkalisch.' },
          { id: 'q7', points: 0, relevant: false, text: 'Wie heisst der Mitarbeiter und seit wann ist er im Betrieb?', reveal: 'Temporärer Mitarbeiter, zweite Woche.', feedback: 'Für die Sofortentscheidung nicht relevant – für die spätere Ursachenanalyse (Instruktion) schon.' },
        ],
      },
      {
        id: 'a3', title: 'Folgen beurteilen', type: 'multi', criteria: ['risiko', 'fachlich', 'recht'],
        situation: 'Sie müssen dem Bauführer am Telefon in einem Satz sagen, was auf dem Spiel stand bzw. steht.',
        prompt: 'Welche Folgen sind möglich, wenn Betonwaschwasser über die Meteorleitung in den Dorfbach gelangt? (Risiken – sie treten nicht zwangsläufig alle ein; alle zutreffenden wählen)',
        options: [
          { id: 'f1', points: 2, text: 'Schädigung oder Tod von Fischen und Kleinlebewesen durch hohen pH', feedback: 'Zutreffend.' },
          { id: 'f2', points: 2, text: 'Ablagerung von Feinstoffen in der Bachsohle (Kolmation)', feedback: 'Zutreffend.' },
          { id: 'f3', points: 2, text: 'Strafverfahren wegen Gewässerverunreinigung, auch bei Fahrlässigkeit', feedback: 'Zutreffend (Art. 70 ff. GSchG).' },
          { id: 'f4', points: 2, text: 'Kosten für Abklärungen und Massnahmen zulasten des Verursachers', feedback: 'Zutreffend (Art. 54 GSchG).' },
          { id: 'f5', points: 0, text: 'Keine Folgen, weil sich Zement im Wasser schnell auflöst', feedback: 'Falsch: Die Alkalität wirkt sofort, Feinstoffe lagern sich ab.' },
          { id: 'f6', points: 0, text: 'Keine Folgen, weil Meteorleitungen über die ARA gereinigt werden', feedback: 'Falsch: Im Trennsystem führt die Meteorleitung ins Gewässer.' },
        ],
      },
      {
        id: 'a4', title: 'Sofortmassnahmen priorisieren', type: 'rank', criteria: ['prioritaet', 'fachlich', 'recht'],
        situation: 'Die Reinigung ist gestoppt. Im Meteorschacht steht graues Waschwasser – es ist bereits in der Leitung zum Bach. 400 Liter warten in Kübeln und Pumpe. Ein Vorarbeiter ist noch auf der Baustelle.',
        prompt: 'Bringen Sie die Massnahmen in eine sinnvolle Reihenfolge (oben = zuerst). Massnahmen, die zwei Personen gleichzeitig erledigen können, dürfen Sie in beliebiger Reihenfolge nebeneinander stellen.',
        rankItems: [
          { id: 's1', text: 'Schacht abdichten bzw. abdecken (notfalls mit Folie und Sandsäcken)' },
          { id: 's2', text: '117 bzw. 118 alarmieren: Waschwasser ist in die Meteorleitung gelangt (durch die zweite Person, parallel)' },
          { id: 's3', text: 'Restliches Waschwasser in Mulde/IBC fassen, nichts mehr ableiten' },
          { id: 's4', text: 'Bauführer informieren und Vorgehen fürs Wochenende abstimmen' },
          { id: 's5', text: 'Geschehen dokumentieren (Zeit, Mengen, Fotos, Beobachtungen)' },
        ],
        rankOrder: ['s1', 's2', 's3', 's4', 's5'],
        rankGroups: [['s1', 's2'], ['s3'], ['s4', 's5']],
        rankEarly: [{ id: 's2', maxPos: 2, why: 'Die Alarmierung kommt zu spät: Waschwasser ist bereits in der Meteorleitung, das Gewässer ist konkret gefährdet. Gemeldet wird sofort, parallel zur sicheren Eindämmung.' }],
        rankExplanation: 'Sofort und gleichzeitig: die Verbindung zum Gewässer unterbrechen (Schacht) und alarmieren – Sie vor Ort, der Vorarbeiter am Telefon. Ob schon eine Färbung im Bach sichtbar ist, ändert daran nichts: Bei bekannter Einleitung in eine Meteorleitung entscheiden die Einsatzkräfte bzw. das kantonale Pikett, nicht die Baustelle. Danach das restliche Wasser sicher fassen. Information des Bauführers und Dokumentation können parallel laufen; Zeiten notieren Sie mit Vorteil von Anfang an. Keine gefährlichen Handlungen (z. B. Einsteigen in Schächte) ohne Einsatzkräfte.',
      },
      {
        id: 'a5', title: 'Vorgehen für das Restwasser', type: 'single', criteria: ['fachlich', 'recht'],
        situation: '400 Liter alkalisches, trübes Wasser sind in einer Mulde und zwei IBC gefasst. Am Wochenende arbeitet niemand.',
        prompt: 'Welches Vorgehen schlagen Sie dem Bauführer vor?',
        options: [
          { id: 'v1', points: 2, text: 'Übers Wochenende absetzen lassen (abgedeckt); am Montag Klarwasser mit CO₂-Mietgerät neutralisieren, pH messen und protokollieren, Ableitung in den Schmutzwasserkanal gemäss Zustimmung des Abwasserverbands; Schlamm entsorgen.', feedback: 'Fachlich richtig und verhältnismässig – unter harten Bedingungen: dichte, abgedeckte Behälter (Regen am Wochenende), geeignete Technik, die Zustimmung zur Einleitung liegt tatsächlich vor, Messung vor und während der Ableitung (nicht nur einmal), Nachkontrolle und Entsorgungsnachweis für den Schlamm.' },
          { id: 'v2', points: 2, text: 'Ein Entsorgungsunternehmen mit Saugwagen bestellen und das Wasser mit Nachweis entsorgen lassen.', feedback: 'Gleichwertig gut: fachgerecht, sicher und ohne Bewilligungsfrage. Teurer als eine Behandlung vor Ort, für einmalige Mengen aber oft die einfachste saubere Lösung. Das Grundproblem (fehlender Waschplatz) wird in Schritt 6 gelöst.' },
          { id: 'v3', points: 0, critical: true, text: 'Mit dem Gartenschlauch verdünnen, bis es klar aussieht, und dann in den Meteorschacht.', feedback: 'Schwerer Fehler: Verdünnen ist keine Behandlung, und der Meteorschacht führt in den Bach.', consequence: 'Der pH bleibt trotz Verdünnung deutlich erhöht, die Fracht ist dieselbe – nur auf mehr Wasser verteilt. Ein Gewässerschaden ist wahrscheinlich.' },
          { id: 'v4', points: 0, critical: true, text: 'Absetzen lassen und das Klarwasser ohne Messung in den Schmutzwasserkanal leiten.', feedback: 'Kritischer Fehler: Auch klares Waschwasser ist meist noch stark alkalisch. Ohne Neutralisation, Messung und Zustimmung ist die Einleitung unzulässig.', consequence: 'Die Gemeinde stellt bei einer Kontrolle des Schachts stark alkalisches Wasser fest und verlangt Abklärungen; die Einleitbedingungen sind verletzt.' },
        ],
      },
      {
        id: 'a6', title: 'Wiederholung verhindern', type: 'single', criteria: ['zusammenarbeit', 'fachlich'],
        situation: 'Am Montag besprechen Sie den Vorfall mit Bauführer und Polier.',
        prompt: 'Welche Massnahme schlagen Sie vor?',
        options: [
          { id: 'w1', points: 2, text: 'Waschplatz gemäss Konzept bis Dienstag einrichten (Absetzcontainer, CO₂), Meteorschacht im Arbeitsbereich dauerhaft abdecken, kurze Instruktion aller inkl. Temporärer, Kontrolle in der Wochenbegehung; Vorfall als Korrekturmassnahme erfassen.', feedback: 'Richtig: Technik, Organisation, Instruktion und Kontrolle – und Lernen für andere Baustellen.' },
          { id: 'w2', points: 0, text: 'Den temporären Mitarbeiter verwarnen.', feedback: 'Greift zu kurz: Das eigentliche Problem ist der fehlende Waschplatz und fehlende Instruktion. Schuldzuweisung verhindert offene Meldungen.' },
          { id: 'w3', points: 1, text: 'Ein Merkblatt im Baucontainer aufhängen.', feedback: 'Hilft wenig ohne Waschplatz und Kontrolle. Information allein ändert selten das Verhalten.' },
        ],
      },
      {
        id: 'a7', title: 'Begründung', type: 'justify', criteria: ['begruendung', 'zusammenarbeit', 'recht'],
        situation: 'Der Bauführer bittet um eine kurze schriftliche Zusammenfassung für den Projektleiter.',
        prompt: 'Begründen Sie Ihr Vorgehen in 4–6 Sätzen: Was war das Risiko, was haben Sie veranlasst, was ist rechtlich relevant, was ist der nächste Schritt?',
        rubric: [
          { id: 'b1', text: 'Risiko benannt: alkalisches Wasser, Meteorleitung führt in Bach', keywords: ['alkal', 'ph', 'meteor', 'bach', 'gewässer'] },
          { id: 'b2', text: 'Sofortmassnahmen und Meldung beschrieben (stoppen, Schacht, Alarmierung 117/118, fassen)', keywords: ['stopp', 'schacht', 'gefasst', 'mulde', '117', '118', 'alarm', 'gemeldet', 'abgedeckt'] },
          { id: 'b3', text: 'Rechtlicher Bezug (Verunreinigungsverbot / Bewilligung / Konzept)', keywords: ['gschg', 'verbot', 'bewilligung', 'konzept', 'gesetz', 'art'] },
          { id: 'b4', text: 'Ursache und Systemmassnahme (fehlender Waschplatz, Instruktion)', keywords: ['waschplatz', 'instru', 'ursach', 'konzept', 'massnahm'] },
          { id: 'b5', text: 'Klarer nächster Schritt mit Termin/Verantwortung', keywords: ['montag', 'dienstag', 'bis', 'verantwort', 'termin', 'nächst'] },
        ],
      },
    ],
    debrief: 'Betonwaschwasser ist eines der häufigsten Gewässerschutzprobleme auf Hochbaustellen. Ursache ist fast immer ein Organisationsmangel: kein Waschplatz, keine Instruktion, keine Kontrolle. Ihr Hebel als Umweltfachperson liegt in der AVOR (Waschplatz im Installationsplan), in klaren Standards und in kurzen, regelmässigen Kontrollen.',
    sources: ['gschg', 'sia431', 'kanton-merkblatt', 'gemeinde-entwaesserung', 'notruf'],
  },
  // =====================================================================
  {
    id: 'sim-b', code: 'B', moduleId: 'm2', status: 'verfuegbar', rev: 3,
    title: 'Grosser Aushub bei Starkregen',
    setting: 'Tiefbau', level: 3, minutes: 20,
    topics: ['truebstoffe', 'wasserhaltung', 'konzept', 'recht'],
    intro: 'Erschliessung eines Gewerbegebiets am Siedlungsrand im Kanton Luzern: Aushub für Strasse und Werkleitungen auf rund 2 ha, lehmiger Boden. Seit gestern Abend regnet es stark. Es ist Dienstag, 7.00 Uhr.',
    facts: [
      'In der Baugrube steht braunes Wasser. Eine Tauchpumpe fördert es über einen Schlauch in einen Strassengraben.',
      'Der Strassengraben mündet nach rund 200 m in einen kleinen Bach.',
      'Zwei Bagger und ein Dumper fahren auf aufgeweichtem, noch nicht abgetragenem Boden.',
      'Das Oberbodendepot am Rand ist nicht begrünt; an der Böschung sind Erosionsrinnen sichtbar.',
      'Die Bewilligung schreibt eine bodenkundliche Baubegleitung (BBB) vor.',
    ],
    stages: [
      {
        id: 'b1', title: 'Lage erfassen', type: 'ask', criteria: ['unsicherheit', 'risiko', 'recht'], pick: 4,
        situation: 'Sie stehen am Grubenrand. Der Polier wartet auf Ihre Einschätzung.',
        prompt: 'Welche vier Informationen holen Sie zuerst ein?',
        options: [
          { id: 'i1', points: 2, relevant: true, text: 'Was erlaubt die Bewilligung für Wasserhaltung und Einleitung?', reveal: 'Bewilligung: Einleitung in den Bach nur über die beiden Absetzcontainer und nur «klar, ohne Ölfilm». Bei Überschreitung Meldung an die kantonale Fachstelle.', feedback: 'Zentral: legt fest, was zulässig ist und ob gemeldet werden muss.' },
          { id: 'i2', points: 2, relevant: true, text: 'Sind die Absetzcontainer in Betrieb?', reveal: 'Die Container sind voll Schlamm. Der Maschinist hat die Pumpe deshalb um 6 Uhr direkt in den Graben gelegt.', feedback: 'Zentral: erklärt die Ursache.' },
          { id: 'i3', points: 2, relevant: true, text: 'Was gilt für das Befahren des Bodens? (BBB, Vorgaben)', reveal: 'Pflichtenheft BBB: Befahren von nicht abgetragenem Boden nur bei ausreichend trockenem Boden gemäss Messung (Saugspannung); bei Nässe nur auf Baupisten. Die BBB ist heute nicht vor Ort.', feedback: 'Zentral: Bodenverdichtung ist kaum rückgängig zu machen.' },
          { id: 'i4', points: 2, relevant: true, text: 'Wie ist die Wetterprognose?', reveal: 'Regen hält bis zum Nachmittag an, danach abklingend.', feedback: 'Wichtig: Bestimmt, wie lange Rückhalt nötig ist.' },
          { id: 'i5', points: 2, relevant: true, text: 'Wie trüb ist der Bach unterhalb der Einmündung – ist er bereits belastet?', reveal: 'Der Bach ist deutlich braun, oberhalb der Einmündung nur leicht trüb.', feedback: 'Zentral: Der Bach ist bereits sichtbar belastet. Das verlangt eine sofortige Meldung – die Abklärung darf das Stoppen der Einleitung aber nicht verzögern.' },
          { id: 'i6', points: 0, relevant: false, text: 'Wie viele Lastwagenfahrten sind heute geplant?', reveal: '24 Fahrten Aushub in die Deponie.', feedback: 'Für die Sofortentscheidung zweitrangig.' },
          { id: 'i7', points: 0, relevant: false, text: 'Wer hat die Pumpe gelegt?', reveal: 'Der Maschinist, auf eigene Initiative.', feedback: 'Für die Ursachenanalyse später relevant, nicht für die Sofortentscheidung.' },
        ],
      },
      {
        id: 'b2', title: 'Prioritäten setzen', type: 'rank', criteria: ['prioritaet', 'risiko'],
        situation: 'Sie haben die Lage erfasst. Der Polier fragt: «Was zuerst?»',
        prompt: 'Ordnen Sie die Massnahmen nach Priorität (oben = zuerst).',
        rankItems: [
          { id: 'p1', text: 'Pumpe abstellen bzw. Einleitung in den Graben stoppen; Wasser in der Grube zurückhalten' },
          { id: 'p2', text: 'Befahren des nassen, nicht abgetragenen Bodens einstellen; Maschinen auf Baupisten' },
          { id: 'p3', text: 'Melden: Der Bach ist sichtbar belastet – sofort Fachstelle gemäss Bewilligung bzw. 117; Bauleitung und BBB informieren (parallel durch zweite Person)' },
          { id: 'p4', text: 'Absetzcontainer entleeren und wieder in Betrieb nehmen' },
          { id: 'p5', text: 'Oberbodendepot und Böschung gegen Erosion sichern (abdecken, Wasser ableiten)' },
        ],
        rankOrder: ['p1', 'p3', 'p2', 'p4', 'p5'],
        rankGroups: [['p1', 'p3'], ['p2'], ['p4', 'p5']],
        rankEarly: [{ id: 'p3', maxPos: 2, why: 'Die Meldung kommt zu spät: Der Bach ist bereits sichtbar belastet. Gemeldet wird sofort, parallel zum Stoppen der Einleitung.' }],
        rankExplanation: 'Sofort und gleichzeitig: die Einleitung in den Graben stoppen (die Grube dient als Puffer, sofern ihre Standsicherheit das zulässt) und melden, weil der Bach bereits belastet ist. Gleich danach wird die Verdichtung gestoppt – sie entsteht mit jeder Überfahrt und ist praktisch nicht reparierbar. Danach Behandlung wiederherstellen und Erosion sichern; beides kann parallel laufen.',
      },
      {
        id: 'b3', title: 'Termindruck', type: 'single', criteria: ['recht', 'zusammenarbeit', 'fachlich'],
        situation: 'Der Bauleiter ruft an: «Wir sind schon zwei Wochen im Verzug. Die Bagger müssen weiterarbeiten.»',
        prompt: 'Wie antworten Sie?',
        options: [
          { id: 'd1', points: 2, text: 'Auf nicht abgetragenem, nassem Boden wird nicht gefahren – das verlangt die Bewilligung bzw. das BBB-Pflichtenheft. Wo Baupisten oder bereits abgetragene Flächen vorhanden sind, kann nach Rücksprache mit der BBB weitergearbeitet werden. Ich kläre das heute Vormittag.', feedback: 'Richtig: klare Grenze mit Begründung, gleichzeitig ein lösungsorientiertes Angebot.' },
          { id: 'd2', points: 0, critical: true, text: 'Termin geht vor – weiterarbeiten wie bisher.', feedback: 'Schwerer Fehler: Verstösst gegen Auflagen; Verdichtung des Unterbodens ist langfristig und teuer zu beheben.', consequence: 'Nach zwei Tagen sind 3000 m² Unterboden tief verdichtet und verschmiert. Die BBB verlangt eine Lockerung und Folgebewirtschaftung, die Rekultivierung verzögert sich um ein Jahr. Die Mehrkosten übersteigen den Terminverlust deutlich.' },
          { id: 'd3', points: 1, text: 'Alle Arbeiten für eine Woche einstellen.', feedback: 'Sicher, aber unverhältnismässig ohne Abklärung: Arbeiten auf Pisten und abgetragenen Flächen sind oft möglich. Gute Beratung zeigt Spielraum auf.' },
        ],
      },
      {
        id: 'b4', title: 'Wasserbehandlung verbessern', type: 'multi', criteria: ['fachlich', 'recht'],
        situation: 'Die Einleitung ist gestoppt. Sie müssen bis Mittag eine tragfähige Lösung für die nächsten Regentage vorschlagen.',
        prompt: 'Welche Massnahmen schlagen Sie vor? (Alle sinnvollen wählen)',
        options: [
          { id: 'm1', points: 2, text: 'Fremdwasser oberhalb der Grube mit Randgraben abfangen und sauber ableiten', feedback: 'Sinnvoll: Weniger Wasser in der Grube = kleinere Behandlung.' },
          { id: 'm2', points: 2, text: 'Pumpensumpf mit Kiesfilter; Pumpe nicht am Grund, sondern Oberflächenwasser abziehen', feedback: 'Sinnvoll als Teilmassnahme: verhindert Aufwirbeln von Schlamm. Allein nicht genügend – massgebend ist die Wirksamkeit der ganzen Anlage, belegt am Auslauf.' },
          { id: 'm3', points: 2, text: 'Wirksame Absetzfläche erhöhen (Container parallel oder Lamellenklärer, Leistung durch Lieferant nachgewiesen), regelmässige Schlammentnahme mit Zuständigkeit', feedback: 'Sinnvoll: Kapazität und Betrieb sichern. Achtung: Container in Serie verbessern vor allem die Strömung; mehr wirksame Fläche bringt erst die Parallelschaltung bzw. ein Lamellenklärer.' },
          { id: 'm4', points: 2, text: 'Einfache Kontrolle am Auslauf (Sichtprobe/Foto zweimal täglich, Protokoll) und Regel «bei Trübung abstellen»', feedback: 'Sinnvoll: macht die Einhaltung nachvollziehbar.' },
          { id: 'm5', points: 0, text: 'Flockungsmittel in Eigenregie zugeben, damit das Wasser schneller klar wird', feedback: 'Nicht ohne Abklärung mit der Fachstelle: Flockungsmittel sind selbst gewässerrelevant.' },
          { id: 'm6', points: 0, critical: true, text: 'Das trübe Wasser in der angrenzenden Wiese versickern lassen', feedback: 'Unzulässig: Versickern von verschmutztem Wasser ist bewilligungspflichtig; zudem Verschlämmung des Bodens.', consequence: 'Die Wiese verschlämmt, der Landwirt reklamiert, und die Fachstelle beanstandet eine nicht bewilligte Versickerung.' },
        ],
      },
      {
        id: 'b5', title: 'Kommunikation mit der Behörde', type: 'single', criteria: ['recht', 'zusammenarbeit'],
        situation: 'Laut Bewilligung muss eine Überschreitung gemeldet werden. Der Polier meint: «Jetzt ist es ja gestoppt, das müssen wir doch nicht mehr melden.»',
        prompt: 'Wie gehen Sie vor?',
        options: [
          { id: 'k1', points: 2, text: 'Sofort melden – über den in der Bewilligung festgelegten Weg bzw. bei bereits sichtbarer Gewässerbelastung über 117: was passiert ist, seit wann, welche Massnahmen getroffen wurden; danach schriftlich nachreichen, was bis wann verbessert wird.', feedback: 'Richtig: Die Meldepflicht entfällt nicht durch das Stoppen, und bei bereits beobachteter Belastung wird nicht bis am Abend gewartet. Eine sofortige, sachliche Meldung schafft Vertrauen.' },
          { id: 'k2', points: 0, critical: true, text: 'Nicht melden, da gestoppt.', feedback: 'Falsch: Verstoss gegen die Bewilligung. Wird die Trübung später festgestellt, ist die Glaubwürdigkeit dahin.' },
          { id: 'k3', points: 0, text: 'Den Polier bitten, bei Gelegenheit anzurufen.', feedback: 'Ungenügend: «Bei Gelegenheit» ist bei einer bereits belasteten Bachstrecke zu spät, und ohne Zuständigkeit geht die Meldung leicht vergessen.' },
        ],
      },
      {
        id: 'b6', title: 'Lagebericht', type: 'justify', criteria: ['begruendung', 'prioritaet', 'zusammenarbeit'],
        situation: 'Der Projektleiter will um 11 Uhr einen kurzen Lagebericht.',
        prompt: 'Schreiben Sie 5–7 Sätze: Lage, Risiken (Gewässer und Boden), getroffene Massnahmen, Prioritäten für heute, offene Punkte und wer was bis wann erledigt.',
        rubric: [
          { id: 'l1', text: 'Lage und Ursache benannt (Container voll, Direkteinleitung, Befahren nasser Boden)', keywords: ['container', 'graben', 'einleit', 'pumpe', 'befahr'] },
          { id: 'l2', text: 'Beide Risiken benannt: Gewässer (Trübung/Kolmation) und Boden (Verdichtung/Erosion)', keywords: ['bach', 'gewässer', 'trüb', 'boden', 'verdicht', 'erosion'] },
          { id: 'l3', text: 'Getroffene Sofortmassnahmen', keywords: ['gestoppt', 'abgestellt', 'eingestellt', 'pisten', 'zurückgehalten'] },
          { id: 'l4', text: 'Erfolgte Meldung (Zeitpunkt, an wen) und Einbezug BBB; Wiederaufnahme der Einleitung erst nach Kontrolle bzw. Freigabe', keywords: ['fachstelle', 'kanton', 'gemeldet', 'meldung', 'bbb', 'freigabe'] },
          { id: 'l5', text: 'Nächste Schritte mit Verantwortung und Termin', keywords: ['bis', 'verantwort', 'heute', 'morgen', 'termin', 'uhr'] },
        ],
      },
    ],
    debrief: 'Bei Erdbau und Regen treffen Gewässer- und Bodenschutz aufeinander. Typisch ist eine Kette kleiner Versäumnisse: Container nicht geleert, keine Regel für Trübung, Termindruck beim Befahren. Wirksam ist eine vorbereitete Regel für Starkregen, eine klare Zuständigkeit für den Betrieb der Anlagen und die frühe Abstimmung mit der bodenkundlichen Baubegleitung. Bodenschutz wird in Modul 4 vertieft.',
    sources: ['gschg', 'kanton-merkblatt', 'sia431', 'praxis'],
  },
  // =====================================================================
  {
    id: 'sim-c', code: 'C', moduleId: 'm6', status: 'in_entwicklung', title: 'Lärmbeschwerden beim Rückbau im Wohngebiet', setting: 'Rückbau', level: 3, minutes: 20,
    topics: [], intro: 'Rückbau eines Gewerbebaus in einem Wohngebiet: Technische, organisatorische und kommunikative Massnahmen bei Beschwerden beurteilen.', facts: [], stages: [], debrief: '', sources: [],
  },
];

export const CRITERION_LABEL: Record<string, string> = {
  risiko: 'Erkennen von Risiken',
  fachlich: 'Fachliche Richtigkeit',
  prioritaet: 'Prioritätensetzung',
  unsicherheit: 'Umgang mit Unsicherheit',
  recht: 'Rechtliche Einordnung',
  zusammenarbeit: 'Zusammenarbeit',
  begruendung: 'Qualität der Begründung',
};
