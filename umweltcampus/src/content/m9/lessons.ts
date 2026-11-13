import type { Lesson } from '../types';

// Modul 9 «Umweltbaubegleitung und Baustellenkontrollen».
// Rechtliche Aussagen sinngemäss und nicht am Fedlex-Volltext geprüft. Ob eine UBB verlangt ist,
// welche Befugnisse sie hat und wer wem meldet, ergibt sich aus Bewilligung, Pflichtenheft und
// kantonaler Praxis – in der App bewusst nicht pauschal festgelegt. Prüfstatus: Entwurf.

const M = 'm9';
const E = 'entwurf' as const;

export const M9_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm9-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Umweltbaubegleitung: Aufgaben, Rollen und Abgrenzung',
    topics: ['m9-rolle'],
    objectives: [
      'Erklären, was eine Umweltbaubegleitung (UBB) ist und wann sie verlangt wird',
      'Formelle UBB, Eigenkontrolle der Unternehmung, interne Umweltberatung und Behördenkontrolle unterscheiden',
      'Die eigene Rolle als interne Umweltfachperson richtig einordnen',
    ],
    steps: [
      { id: 'm9-l1-situation', kind: 'situation', title: 'Einstieg: «Du bist doch unsere UBB»', text: `An der Startsitzung einer Strassenbaustelle stellt der Bauführer Sie vor: «Das ist unser Umweltbeauftragter – er macht bei uns die UBB.» Am Tisch sitzt auch eine Frau vom Ingenieurbüro, die von der Bauherrschaft als Umweltbaubegleitung beauftragt wurde. Sie schaut irritiert auf.

Wer von Ihnen beiden ist die UBB – und warum ist die Unterscheidung wichtig?` },
      { id: 'm9-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m9-q01', 'm9-q02'] },
      { id: 'm9-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Die Umweltbaubegleitung (UBB)** ist eine Fachperson oder ein Team, das die Umsetzung der Umweltauflagen eines Projekts begleitet, kontrolliert und darüber berichtet – in der Regel **im Auftrag der Bauherrschaft**.

**Verlangt wird sie** meist durch eine Auflage in der Bewilligung, oft bei grösseren oder UVP-pflichtigen Vorhaben. Ihre Aufgaben und Befugnisse stehen im **Pflichtenheft**.

**Sie ersetzt nicht** die Eigenkontrolle der Unternehmung und nicht die Kontrolle der Behörde.

**Ihre eigene Rolle** als interne Umweltfachperson der Unternehmung ist eine andere: Sie beraten und kontrollieren die eigenen Baustellen im Auftrag Ihrer Firma. Sie sind keine formelle UBB – ausser Ihre Firma wird ausdrücklich damit beauftragt.` },
      { id: 'm9-l1-explain', kind: 'explain', title: 'Vier Arten von Kontrolle auf der Baustelle', text: `### Wer kontrolliert was – und für wen?

| Kontrolle | Wer | Auftraggeber | Zweck |
|---|---|---|---|
| **Eigenkontrolle** | Polier, Bauführung | Unternehmung | Eigene Arbeit laufend prüfen: Sind die Massnahmen umgesetzt und wirksam? |
| **Interne Umweltberatung** | Umweltfachperson der Unternehmung (Sie) | Unternehmung | Baustellen beraten, stichprobenweise begehen, Standards der Firma sichern |
| **Umweltbaubegleitung (UBB)** | Externe Fachperson bzw. Büro | Bauherrschaft (meist per Auflage) | Umsetzung der Auflagen begleiten, kontrollieren, berichten |
| **Behördenkontrolle** | Kanton, Gemeinde | Staat (Vollzug) | Einhaltung von Recht und Auflagen durchsetzen |

Dazu kommen Fachbegleitungen mit eigenem Gebiet, z. B. die bodenkundliche Baubegleitung (BBB, Modul 4) oder Fachpersonen für Schadstoffe, Altlasten und Gewässer.

### Typische Aufgaben einer UBB
- Beratung der Bauherrschaft und der Bauleitung in Umweltfragen
- Mitwirkung bei Ausschreibung, Startsitzung und Instruktion
- regelmässige Begehungen und Kontrollen, Messungen wo verlangt
- Feststellungen dokumentieren, Massnahmen vorschlagen, Umsetzung nachverfolgen
- Berichte an Bauherrschaft und – wenn so verlangt – an die Behörde
- Mitwirkung bei der Umweltbauabnahme und beim Schlussbericht

### Befugnisse
Was die UBB anordnen darf, ergibt sich aus **Pflichtenheft und Bewilligung**. Häufig hat sie ein **Antragsrecht an die Bauleitung** und kein direktes Weisungsrecht gegenüber der Unternehmung; für Fälle unmittelbarer Umweltgefährdung ist oft geregelt, dass sie Arbeiten unterbrechen lassen kann. Verlassen Sie sich nicht auf Annahmen – klären Sie es an der Startsitzung.

§> Aufgaben und Stellung der UBB sinngemäss nach der BAFU-Publikation «Umweltbaubegleitung mit integrierter Erfolgskontrolle» und der Praxis; die Publikation wurde nicht am Original geprüft. Verbindlich sind Bewilligung und Pflichtenheft des Projekts.` },
      { id: 'm9-l1-diagram', kind: 'diagram', title: 'Schema: Rollen bei Umweltkontrollen', diagram: 'ubb-rollen', caption: 'Vereinfachte Lernhilfe. Wer wem meldet und wer was anordnen darf, regeln Bewilligung, Pflichtenheft und Verträge.' },
      { id: 'm9-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Spitalneubau mit UBB-Auflage', context: 'Hochbau', text: `Die Bewilligung für einen Spitalneubau verlangt eine UBB «mit Berichterstattung an das kantonale Amt alle drei Monate». Die Bauherrschaft beauftragt ein Umweltbüro. An der Startsitzung wird geklärt: Die UBB begeht die Baustelle alle zwei Wochen, meldet Feststellungen an die Bauleitung, die Bauleitung weist die Unternehmung an. Die Umweltbeauftragte der Bauunternehmung ist Ansprechperson der UBB, organisiert die Eigenkontrolle (Polier täglich, sie selbst monatlich) und sammelt die Nachweise.

**Lernpunkt**: UBB und interne Umweltfachperson arbeiten zusammen, aber mit getrennten Aufträgen – die eine für die Bauherrschaft, die andere für die Unternehmung.` },
      { id: 'm9-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Leitungsbau ohne UBB-Auflage', context: 'Tiefbau', text: `Ein Werkleitungsersatz in einem Wohnquartier hat keine UBB-Auflage. Die Bewilligung enthält aber Auflagen zu Entwässerung, Lärm und Entsorgung. Niemand von aussen kontrolliert regelmässig. Der Umweltbeauftragte der Unternehmung vereinbart mit dem Bauführer: Checkliste für den Polier, eine Begehung zu Beginn jeder Bauphase und ein kurzer Bericht an die Bauführung.

**Lernpunkt**: Ohne UBB gibt es nicht weniger Pflichten – nur weniger Kontrolle von aussen. Umso wichtiger ist die Eigenkontrolle.` },
      { id: 'm9-l1-deep', kind: 'deep', title: 'Fachvertiefung: Rollenklarheit als Grundlage', text: `### 1. Woher die UBB kommt
Grosse Bauvorhaben haben viele Umweltauflagen, die über Jahre und durch viele Hände umgesetzt werden müssen. Die Behörde kann nicht ständig vor Ort sein, die Bauherrschaft ist für die Einhaltung verantwortlich, hat aber selten das Fachwissen. Die UBB schliesst diese Lücke: Sie ist das fachliche Auge der Bauherrschaft auf der Baustelle. Bei UVP-pflichtigen Vorhaben wird sie häufig schon im Umweltverträglichkeitsbericht vorgesehen und in der Bewilligung zur Auflage gemacht; bei kleineren Vorhaben verlangen Kantone oder Gemeinden sie je nach Empfindlichkeit des Standorts. Eine allgemeine, schweizweit gleiche Schwelle gibt es nicht.

### 2. Was im Pflichtenheft stehen sollte
- Auftraggeber und Berichtswege (an wen, wie oft, in welcher Form)
- Umfang: Welche Umweltbereiche, welche Bauphasen, welche Messungen
- Befugnisse: Antragsrecht, Weisungsrecht, Recht zur Unterbrechung bei Gefahr
- Zusammenarbeit mit Bauleitung, Unternehmung und anderen Fachbegleitungen (z. B. BBB)
- Teilnahme an Sitzungen, Abnahmen und am Schlussbericht
Fehlt eine dieser Angaben, entstehen später Konflikte – meist dann, wenn zum ersten Mal etwas schiefgeht.

### 3. Unabhängigkeit und Interessenkonflikte
Eine UBB soll fachlich unabhängig urteilen können. Deshalb ist es heikel, wenn dieselbe Person plant, ausführt und kontrolliert. Wird Ihre eigene Firma gebeten, «die UBB gleich mitzumachen», ist das eine Frage für die Bauherrschaft und – wenn die UBB eine Auflage ist – für die Behörde: Akzeptiert sie diese Lösung? Welche Qualifikation wird verlangt? Entscheiden Sie das nicht selbst.

### 4. Ihre Rolle als interne Umweltfachperson
Sie sind Teil der Unternehmung. Ihr Auftrag: beraten, instruieren, kontrollieren, verbessern – damit die eigenen Baustellen Recht, Auflagen und Firmenstandards einhalten. Ihre Stärken: Sie kennen die Abläufe, sprechen die Sprache der Poliere und sind früh dabei. Ihre Grenzen: Sie haben in der Regel **kein Weisungsrecht in der Linie** (das hat die Bauführung), Sie vertreten nicht die Bauherrschaft, und Sie ersetzen keine verlangte externe Fachbegleitung.

### 5. Zusammenarbeit mit der UBB
Sehen Sie die UBB als Partnerin, nicht als Gegnerin: Sie will dasselbe – eine Baustelle ohne Umweltschaden. Praktisch heisst das: Ansprechperson benennen, Unterlagen bereithalten (Massnahmenplan, Nachweise), an Begehungen teilnehmen, Feststellungen ernst nehmen und rasch beheben. Fachliche Differenzen werden sachlich und über die Bauleitung geklärt.

### 6. Behördenkontrollen
Behörden können Baustellen kontrollieren, auch unangemeldet. Wer betroffen ist, muss die für den Vollzug nötigen Auskünfte geben und Abklärungen dulden (sinngemäss Art. 46 USG). Für die Baustelle gilt der Leitfaden aus Modul 1: Zutritt gewähren, Verantwortliche informieren, sachlich Auskunft geben, nichts verändern oder verstecken.

### 7. Typische Missverständnisse
- «Die UBB ist verantwortlich, wenn etwas passiert.» – Nein: Verantwortlich bleibt, wer die Arbeit ausführt und wer sie anordnet; die UBB kontrolliert und berät.
- «Wenn die UBB nichts sagt, ist alles in Ordnung.» – Nein: Sie ist nicht ständig vor Ort.
- «Ohne UBB-Auflage braucht es keine Kontrollen.» – Nein: Die Pflichten gelten trotzdem.

§> Art. 46 USG (Auskunftspflicht) sinngemäss, nicht am Original geprüft. Ob und in welchem Umfang eine UBB verlangt ist, bestimmt die Bewilligung; Anforderungen an ihre Qualifikation sind kantonal verschieden.` },
      { id: 'm9-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm9-q03' },
      { id: 'm9-l1-abw', kind: 'decision', title: 'Abwägung: «Macht doch ihr die UBB»', questionId: 'm9-d01' },
      { id: 'm9-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Rollen an der Startsitzung klären', taskId: 'm9-t1' },
      { id: 'm9-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m9-q04', 'm9-q05'] },
      { id: 'm9-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm9-p1' },
      { id: 'm9-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'UBB: begleitet, kontrolliert und berichtet – in der Regel im Auftrag der Bauherrschaft, meist per Auflage.',
        'Aufgaben und Befugnisse stehen im Pflichtenheft – an der Startsitzung klären.',
        'Eigenkontrolle der Unternehmung bleibt, auch wenn eine UBB da ist.',
        'Interne Umweltfachperson: berät und kontrolliert für die eigene Firma, ohne Weisungsrecht in der Linie.',
        'Ohne UBB-Auflage gelten die Pflichten trotzdem.',
      ] },
      { id: 'm9-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-ubb', 'usg', 'uvpv', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm9-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Kontrollkonzept und Umweltbegehung',
    topics: ['m9-kontrolle'],
    objectives: [
      'Ein risikobasiertes Kontrollkonzept für eine Baustelle aufstellen',
      'Eine Umweltbegehung vorbereiten und strukturiert durchführen',
      'Checklisten sinnvoll einsetzen, ohne den Blick für das Unerwartete zu verlieren',
    ],
    steps: [
      { id: 'm9-l2-situation', kind: 'situation', title: 'Einstieg: Zwanzig Minuten Zeit', text: `Sie kommen unangemeldet auf eine Hochbaustelle in der Rohbauphase. Der Polier hat zwanzig Minuten für Sie, dann kommt der Beton. Die Baustelle ist gross: Baugrube mit Wasserhaltung, Kran, Waschplatz, Tankstelle, Mulden, Magazin.

Wohin gehen Sie zuerst – und was lassen Sie heute weg?` },
      { id: 'm9-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m9-q06', 'm9-q07'] },
      { id: 'm9-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Kontrollkonzept** legt fest: **Was** wird kontrolliert, **wer** kontrolliert, **wie oft**, **womit** und **was geschieht mit dem Ergebnis**.

**Risikobasiert** heisst: Dort am genauesten und häufigsten hinschauen, wo ein Fehler den grössten Schaden anrichten kann – und in Bauphasen mit hohem Risiko (Betonarbeiten, Wasserhaltung, Rückbau, Bodenarbeiten).

**Eine Begehung** hat drei Teile: Vorbereitung (Unterlagen, offene Punkte), Rundgang (beobachten, fragen, festhalten), Abschluss vor Ort (Feststellungen besprechen, Massnahmen vereinbaren).

**Checklisten** sichern die Vollständigkeit – sie ersetzen nicht den offenen Blick.` },
      { id: 'm9-l2-explain', kind: 'explain', title: 'Das Kontrollkonzept', text: `### Drei Ebenen

| Ebene | Wer | Häufigkeit (Beispiel) | Mittel |
|---|---|---|---|
| Laufende Eigenkontrolle | Polier/in, Vorarbeiter/in | täglich bzw. vor kritischen Arbeiten | Kurzcheck, Rapport |
| Periodische Kontrolle | Bauführer/in, interne Umweltfachperson | je Bauphase bzw. in festem Rhythmus | Begehung mit Checkliste, Bericht |
| Kontrolle durch Dritte | UBB, Bauleitung, Behörde | gemäss Pflichtenheft bzw. nach eigenem Ermessen | Begehung, Messung, Bericht |

Die Häufigkeiten sind Beispiele – verbindlich sind die Vorgaben aus Bewilligung, Konzepten und Pflichtenheft.

### Risikobasiert planen
Fragen Sie für jede Bauphase:
- **Was kann passieren?** (z. B. Zementwasser im Bach, Öl im Boden, Asbestfasern, Verdichtung, Lärmbeschwerden)
- **Wie schwer und wie rasch wäre der Schaden?** (Gewässer und Grundwasser: schnell und kaum umkehrbar)
- **Wie gut ist die Massnahme abgesichert?** (technische Barriere oder nur Anweisung?)
Daraus ergeben sich **Schwerpunkte**: Was wird bei jeder Begehung angeschaut, was nur stichprobenweise?

### Kontrollpunkte mit Auflagen verbinden
Die Kontrollpunkte kommen aus dem **Umweltmassnahmenplan** (Modul 8): Jede Massnahme hat eine Kontrolle und einen Nachweis. Das Kontrollkonzept bündelt diese Kontrollen zu einem praktikablen Rhythmus.

§> Das Kontrollkonzept ist bewährte Praxis und – in zertifizierten Firmen – Teil des Umweltmanagements. Verbindliche Kontrollen und Messungen ergeben sich aus der Bewilligung.` },
      { id: 'm9-l2-explain-2', kind: 'explain', title: 'Die Begehung: vorbereiten, durchführen, abschliessen', text: `### Vorbereitung (10 Minuten, die sich lohnen)
- Massnahmenplan und Auflagen der aktuellen Bauphase
- Bericht der letzten Begehung: Welche Massnahmen sind offen?
- Wetter der letzten Tage (Regen: Entwässerung, Erosion, Bodenfeuchte)
- Anmelden oder unangemeldet? Beides hat seinen Wert: Angemeldet zeigt den Soll-Zustand, unangemeldet den Alltag. Sicherheitsregeln und PSA gelten immer; melden Sie sich beim Polier, sobald Sie auf dem Platz sind.

### Rundgang
Gehen Sie **dem Wasser nach** (vom höchsten zum tiefsten Punkt, bis zum Schacht oder Gewässer), dann **den Stoffen** (Tankstelle, Lager, Waschplatz), dann **den Abfällen und dem Material** (Mulden, Depots, Zwischenlager), dann **der Grenze** (Nachbarn, Staub, Lärm, Strasse).
- **Beobachten**: Was sehe, rieche, höre ich? Spuren sind ehrlicher als Auskünfte (Schlieren am Schacht, Ölflecken, Fahrspuren im Boden).
- **Fragen**: «Zeig mir, wie ihr das macht» statt «Macht ihr das richtig?».
- **Festhalten**: Ort, Zeit, Foto, kurze sachliche Beschreibung – sofort, nicht aus der Erinnerung.

### Abschluss vor Ort
Besprechen Sie die Feststellungen **mit dem Polier, bevor Sie gehen**: Was ist kritisch und wird sofort behoben? Was wird bis wann erledigt? Wer macht es? Niemand soll aus dem Bericht etwas erfahren, das er nicht schon vor Ort gehört hat.

### Checklisten
Eine gute Checkliste ist kurz, auf die Bauphase zugeschnitten und fragt nach **Beobachtbarem** («Meteorschächte im Arbeitsbereich abgedeckt?» statt «Gewässerschutz in Ordnung?»). Lassen Sie am Ende immer Platz für «Weitere Beobachtungen».` },
      { id: 'm9-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Zwanzig Minuten richtig nutzen', context: 'Hochbau', text: `Der Umweltbeauftragte aus dem Einstieg entscheidet sich: Heute wird betoniert, also zuerst Waschplatz und Absetzanlage (läuft sie, wohin fliesst der Überlauf, gibt es pH-Protokolle?), dann der Meteorschacht an der Zufahrt, dann die Tankstelle. Mulden und Magazin lässt er weg und notiert sie für die nächste Begehung. Am Waschplatz findet er den Überlauf der Absetzanlage auf einen abgedeckten Schacht gerichtet – die Abdeckung liegt daneben. Der Polier lässt den Schacht sofort wieder abdecken, bevor der Beton kommt.

**Lernpunkt**: Wenig Zeit ist kein Grund, auf die Begehung zu verzichten – sondern ein Grund, sie auf das heutige Risiko auszurichten.` },
      { id: 'm9-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Begehung nach Starkregen', context: 'Tiefbau', text: `Nach einem Gewitter in der Nacht fährt die Umweltbeauftragte am Morgen auf eine Strassenbaustelle am Hang. Sie geht dem Wasser nach: Wo ist es gelaufen, wo hat es Material mitgenommen, wo steht es noch? Sie findet eine ausgespülte Böschung, Schlamm im Strassengraben und ein volles Absetzbecken. Mit dem Polier vereinbart sie: Becken leeren, Böschung abdecken, Graben oberhalb mit einem Strohballen-Damm sichern. Die Fotos vom Morgen und vom Nachmittag kommen in den Bericht.

**Lernpunkt**: Die beste Zeit für eine Begehung ist oft die unbequemste – nach Regen zeigt sich, ob die Entwässerung wirklich funktioniert.` },
      { id: 'm9-l2-deep', kind: 'deep', title: 'Fachvertiefung: Wirksam kontrollieren', text: `### 1. Kontrolle ist kein Misstrauen
Auf Baustellen wird Kontrolle oft als Vorwurf verstanden. Erklären Sie Ihren Zweck: Fehler finden, **bevor** sie zum Schaden werden – und der Baustelle helfen, bei einer Behördenkontrolle gut dazustehen. Wer nur kommt, um Mängel zu notieren, bekommt beim nächsten Mal eine aufgeräumte Kulisse statt der Wirklichkeit.

### 2. Was eine wirksame Kontrolle prüft
Drei Fragen in dieser Reihenfolge:
1. **Ist die Massnahme vorhanden?** (Die Wanne steht.)
2. **Wird sie angewendet?** (Das Fass steht in der Wanne.)
3. **Wirkt sie?** (Die Wanne ist nicht voll Regenwasser, das Volumen reicht.)
Viele Checklisten bleiben bei Frage 1 stehen. Die grössten Risiken liegen bei 2 und 3.

### 3. Stichprobe und Schwerpunkt
Niemand kann alles kontrollieren. Legen Sie **feste Schwerpunkte** fest (Gewässerschutz bei jeder Begehung) und **wechselnde Stichproben** (heute Mulden und Entsorgungsbelege, nächstes Mal Maschinenliste). Dokumentieren Sie, was Sie **nicht** angeschaut haben – ein Bericht ohne diesen Hinweis wird als «alles geprüft» gelesen.

### 4. Zeitpunkt
Die aussagekräftigsten Momente sind: Beginn einer neuen Bauphase, erste Betonage, Inbetriebnahme der Wasserhaltung, Einsatz eines neuen Subunternehmers, nach Starkregen, vor Ferien und Wochenenden (was bleibt unbeaufsichtigt?), Freitagnachmittag.

### 5. Befragen ohne zu verhören
Offene Fragen bringen mehr als Ja/Nein-Fragen: «Wohin geht das Wasser von hier?», «Was machst du, wenn der Schlauch platzt?», «Wo ist das Ölbindemittel?». Fragen Sie auch die Leute an der Maschine, nicht nur den Polier. Wenn jemand etwas nicht weiss, ist das eine Feststellung zur **Instruktion**, nicht zur Person.

### 6. Sicherheit und Befugnis
Sie bewegen sich auf einer Baustelle: PSA tragen, sich anmelden, Gefahrenbereiche respektieren. Greifen Sie nicht selbst in Anlagen ein (Pumpen, Schieber, Maschinen) – ausser, um eine unmittelbare Gefahr abzuwenden und soweit es sicher möglich ist. Anordnen ist Sache der Linie; Ihre Aufgabe ist, die richtige Person sofort einzuschalten.

### 7. Messungen
Einfache Messungen stützen die Beobachtung: pH-Streifen oder Handmessgerät, Sichttiefe bzw. Trübung, Füllstände. Halten Sie Datum, Uhrzeit, Ort und Gerät fest. Messungen, die eine Auflage verlangt, folgen den dort festgelegten Verfahren und werden von den dafür Zuständigen gemacht; Ihre Stichprobe ersetzt sie nicht.

### 8. Von der Begehung zum System
Einzelne Begehungen zeigen einzelne Baustellen. Wenn dieselbe Feststellung auf mehreren Baustellen auftaucht (z. B. offene Meteorschächte), ist das kein Polier-Problem mehr, sondern ein Thema für Instruktion, AVOR oder Firmenstandard (Lektion 5, Modul 10).

§> Inhalte als bewährte Praxis. Verbindliche Kontrollen, Messverfahren und Häufigkeiten ergeben sich aus Bewilligung, Konzepten und Pflichtenheft.` },
      { id: 'm9-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm9-q08' },
      { id: 'm9-l2-abw', kind: 'decision', title: 'Abwägung: Angemeldet oder unangemeldet?', questionId: 'm9-d02' },
      { id: 'm9-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Kontrollkonzept für einen Rohbau', taskId: 'm9-t2' },
      { id: 'm9-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m9-q09', 'm9-q10'] },
      { id: 'm9-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm9-p2' },
      { id: 'm9-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Kontrollkonzept: was, wer, wie oft, womit, was geschieht mit dem Ergebnis.',
        'Risikobasiert: Schwerpunkt dort, wo ein Fehler rasch und schwer schadet.',
        'Begehung: vorbereiten, dem Wasser und den Stoffen nachgehen, vor Ort abschliessen.',
        'Drei Fragen: vorhanden – angewendet – wirksam?',
        'Checklisten kurz und beobachtbar; festhalten, was nicht geprüft wurde.',
      ] },
      { id: 'm9-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-ubb', 'sia431', 'iso14001', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm9-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Feststellungen beurteilen: Risiko und Sofortmassnahmen',
    topics: ['m9-feststellung'],
    objectives: [
      'Feststellungen sachlich formulieren und nach Dringlichkeit einstufen',
      'Bei unmittelbarer Umweltgefahr die richtigen Sofortmassnahmen auslösen',
      'Beobachtung, Bewertung und Vermutung auseinanderhalten',
    ],
    steps: [
      { id: 'm9-l3-situation', kind: 'situation', title: 'Einstieg: Der milchige Graben', text: `Auf einer Begehung sehen Sie, wie aus einem Schlauch milchig-graues Wasser in den Strassengraben läuft. Der Graben führt nach etwa 80 Metern in einen Bach. Der Maschinist winkt ab: «Das ist nur ein bisschen Waschwasser, das machen wir immer so.» Der Polier ist im Büro.

Was tun Sie in den nächsten zwei Minuten – und was schreiben Sie später auf?` },
      { id: 'm9-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m9-q11', 'm9-q12'] },
      { id: 'm9-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Eine Feststellung** beschreibt, was beobachtet wurde: **Was, wo, wann** – sachlich, ohne Schuldzuweisung, mit Bezug zur Anforderung.

**Einstufen** nach Dringlichkeit:
- **Kritisch**: Umweltschaden tritt ein oder droht unmittelbar, oder eine zwingende Freigabe fehlt → **Sofortmassnahme**, Linie sofort informieren.
- **Abweichung**: Anforderung nicht erfüllt, aber kein unmittelbarer Schaden → Massnahme mit Termin.
- **Hinweis**: Verbesserungsmöglichkeit → Empfehlung.

**Bei unmittelbarer Gefahr** gilt die Reihenfolge: Quelle stoppen, Ausbreitung verhindern, alarmieren bzw. melden, dann dokumentieren.

**Trennen Sie** Beobachtung («milchiges Wasser läuft in den Graben») von Bewertung («Zementwasser») und Vermutung («schon seit Wochen»).` },
      { id: 'm9-l3-explain', kind: 'explain', title: 'Feststellungen formulieren und einstufen', text: `### Eine gute Feststellung

| Bestandteil | Beispiel |
|---|---|
| Was (beobachtbar) | Aus dem Schlauch am Betonsilo läuft milchig-graues Wasser in den Strassengraben. |
| Wo | Zufahrt Nord, Graben entlang der Kantonsstrasse, ca. 80 m oberhalb des Bachs |
| Wann | 14.03., 10.20 Uhr |
| Messung / Beleg | pH-Streifen im Graben: stark alkalisch; Fotos 3–6 |
| Anforderung | Verunreinigungsverbot (GSchG); Entwässerungskonzept Ziff. 3: Waschwasser über Absetzanlage |
| Einstufung | Kritisch |

Schlecht wäre: «Der Maschinist verschmutzt absichtlich den Bach.» – das ist eine Schuldzuweisung und eine Vermutung.

### Einstufung in drei Stufen

| Stufe | Merkmal | Folge |
|---|---|---|
| Kritisch | Schaden tritt ein oder droht unmittelbar; zwingende Freigabe oder Bewilligung fehlt für eine laufende Arbeit | Sofortmassnahme, Arbeit unterbrechen lassen, Linie sofort informieren, je nach Fall Alarmierung |
| Abweichung | Anforderung (Gesetz, Auflage, Norm im Vertrag, Standard) nicht erfüllt, ohne unmittelbaren Schaden | Massnahme mit verantwortlicher Funktion und Termin |
| Hinweis | Kein Verstoss; es ginge besser | Empfehlung, bei nächster Begehung ansprechen |

Die Bezeichnungen der Stufen sind Firmensache; wichtig ist, dass alle dasselbe darunter verstehen.

### Risiko einschätzen
Zwei Fragen genügen meistens: **Wie schwer wäre der Schaden** (Gewässer, Grundwasser, Boden, Menschen)? **Wie nah ist er** (Weg zum Schutzgut, Wetter, laufende Arbeit)? Je schwerer und näher, desto höher die Stufe. Im Zweifel stufen Sie höher ein und klären nach.

§> Die Einstufung ist ein internes Hilfsmittel, keine rechtliche Beurteilung. Ob ein Verstoss vorliegt und welche Folgen er hat, beurteilt die zuständige Behörde.` },
      { id: 'm9-l3-diagram', kind: 'diagram', title: 'Schema: Sofortmassnahmen bei Umweltgefahr', diagram: 'sofortmassnahmen', caption: 'Reihenfolge aus Modul 2. Eigenschutz geht vor; Alarmierung über Polizei oder Feuerwehr.' },
      { id: 'm9-l3-explain-2', kind: 'explain', title: 'Sofortmassnahmen und Meldung', text: `### Reihenfolge bei unmittelbarer Gefahr
1. **Eigenschutz** – keine Gefährdung für sich und andere.
2. **Quelle stoppen** – Pumpe aus, Schieber zu, Arbeit unterbrechen lassen.
3. **Ausbreitung verhindern** – Schacht abdecken, Graben abdämmen, Bindemittel.
4. **Alarmieren bzw. melden** – intern (Polier, Bauführung) und, wenn Stoffe in ein Gewässer, die Kanalisation oder den Boden gelangt sind oder gelangen können, **sofort** über Polizei bzw. Feuerwehr (Modul 2). Weitere Meldungen gemäss Bewilligung (z. B. an die Fachstelle oder die UBB).
5. **Dokumentieren** – erst jetzt: Fotos, Zeiten, Mengen, wer informiert wurde.

### Wer darf stoppen?
Anordnungen in der Linie gibt die Bauführung bzw. der Polier. Aber: **Bei unmittelbarer Gefahr soll jede Person die gefährdende Tätigkeit unterbrechen lassen und sofort die zuständige Person holen** – das ist in den meisten Firmen ausdrücklich so geregelt und entspricht der Sorgfaltspflicht. Klären Sie mit Ihrer Geschäftsleitung, wie Ihr Stopp-Recht formuliert ist, bevor Sie es brauchen.

### Nicht verharmlosen, nicht dramatisieren
«Nur ein bisschen» ist keine Einstufung. Umgekehrt ist nicht jede Pfütze ein Notfall. Halten Sie sich an das Beobachtete und an den Weg zum Schutzgut.

!> Bei einer möglichen Gewässerverschmutzung wird nicht zuerst abgeklärt, ob sich eine Meldung «lohnt». Im Zweifel alarmieren – die Einsatzkräfte entscheiden über das weitere Vorgehen.` },
      { id: 'm9-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Hydraulikschlauch geplatzt', context: 'Hochbau', text: `Während einer Begehung platzt am Bagger in der Baugrube ein Hydraulikschlauch. Der Maschinist stellt die Maschine ab, zwei Arbeiter streuen Bindemittel. Die Umweltbeauftragte prüft: Die Baugrube liegt im Grundwasser, die Wasserhaltung pumpt in die Absetzanlage. Sie lässt die Pumpe stoppen, damit kein Öl in die Anlage gelangt, und informiert den Bauführer. Gemeinsam wird über die Polizei die Fachstelle aufgeboten. Der ölhaltige Aushub wird separat gelagert.

**Lernpunkt**: Die Equipe hat richtig reagiert – der Blick der Umweltfachperson ergänzt den Weg, an den niemand gedacht hat (die Pumpe).` },
      { id: 'm9-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Fehlende Freigabe', context: 'Tiefbau', text: `Auf einer Leitungsbaustelle im Kulturland sieht der Umweltbeauftragte, wie ein Bagger Oberboden abträgt. Es hat in der Nacht geregnet; die Freigabe der BBB für den heutigen Tag fehlt. Es fliesst nichts aus, es riecht nach nichts – trotzdem stuft er die Feststellung als **kritisch** ein: Eine zwingende Freigabe fehlt, und der Schaden (Verdichtung) entsteht mit jeder Baggerschaufel. Er bittet den Maschinisten zu warten und ruft den Polier. Die Arbeit wird unterbrochen, die BBB angefragt.

**Lernpunkt**: Kritisch ist nicht nur, was ausläuft. Auch eine fehlende Freigabe für eine laufende Arbeit ist ein Stopp-Fall.` },
      { id: 'm9-l3-deep', kind: 'deep', title: 'Fachvertiefung: Sachlich feststellen, richtig reagieren', text: `### 1. Beobachtung, Bewertung, Vermutung
- **Beobachtung**: mit den Sinnen oder einem Messgerät erfasst. «Im Graben steht milchiges Wasser; pH-Streifen zeigt stark alkalisch.»
- **Bewertung**: Vergleich mit einer Anforderung. «Das widerspricht dem Entwässerungskonzept.»
- **Vermutung**: Annahme über Ursache, Dauer oder Absicht. «Das läuft wohl schon länger.»
Im Bericht steht die Beobachtung zuerst, die Bewertung mit Bezug zur Anforderung danach. Vermutungen gehören als solche gekennzeichnet in die Ursachenanalyse – oder gar nicht in den Bericht.

### 2. Die Anforderung nennen
Eine Feststellung ohne Bezug ist eine Meinung. Nennen Sie, woran Sie messen: Gesetz, Auflage (mit Ziffer), Norm im Vertrag, Konzept oder Firmenstandard. Das zwingt zur Ehrlichkeit: Ist es wirklich eine Abweichung – oder nur nicht so, wie Sie es selbst machen würden? Letzteres ist ein Hinweis.

### 3. Typische kritische Feststellungen
- Zement- oder Schmutzwasser läuft in Meteorschacht, Graben, Gewässer oder versickert.
- Treibstoff, Öl oder Chemikalien treten aus oder lagern ungeschützt über einem Schacht bzw. am Gewässer.
- Rückbau in einem Bereich mit Schadstoffverdacht ohne Freigabe.
- Bodenarbeiten ohne die verlangte Freigabe bzw. bei offensichtlich zu nassem Boden.
- Wasserhaltung oder Einleitung ohne Bewilligung bzw. ausserhalb ihrer Bedingungen.
- Verdächtiges Material (Geruch, Farbe, Fremdstoffe) wird mit sauberem Aushub abgeführt.

### 4. Typische Abweichungen
Fehlende Beschriftung von Mulden, vermischte Fraktionen, Auffangwanne voll Regenwasser, fehlende Nachweise (Maschinenliste, pH-Protokoll), Ölbindemittel nicht am Platz, Instruktion des Subunternehmers nicht belegt, Depot nicht begrünt.

### 5. Wenn der Verursacher widerspricht
«Das machen wir immer so» ist ein häufiger Satz. Bleiben Sie beim Beobachteten und beim Weg: «Das Wasser läuft in den Graben, der Graben führt in den Bach. Das müssen wir jetzt stoppen – über das Warum reden wir nachher mit dem Polier.» Diskutieren Sie die Grundsatzfrage nicht am Schlauch.

### 6. Eigene Grenzen
Sie beurteilen, ob eine Gefahr besteht und wer geholt werden muss. Sie beurteilen **nicht** abschliessend, ob ein Gewässer geschädigt ist, ob eine Straftat vorliegt oder ob Material belastet ist – dafür sind Fachstellen, Behörden und Fachpersonen da. Schreiben Sie deshalb «milchiges, stark alkalisches Wasser» und nicht «Gewässerverschmutzung nach Art. … GSchG».

### 7. Nach dem Ereignis
Wenn die Lage stabil ist: Zeiten und Abläufe festhalten, solange die Erinnerung frisch ist. Wer hat was wann gesehen, getan, gemeldet? Welche Mengen? Welche Fotos? Diese Chronologie ist für die Behörde, die Versicherung und die Ursachenanalyse (Lektion 5) wertvoll – und sie schützt die Beteiligten, wenn sie korrekt gehandelt haben.

### 8. Positives festhalten
Auch gut gelöste Punkte sind Feststellungen. Sie zeigen, was funktioniert, machen den Bericht glaubwürdig und geben der Baustelle Anerkennung. Eine Begehung, die nur Mängel sucht, findet beim nächsten Mal verschlossene Türen.

§> Verunreinigungsverbot und Sorgfaltspflicht nach GSchG sinngemäss (Modul 2). Meldewege bei Ereignissen: Polizei bzw. Feuerwehr; zusätzliche Meldepflichten gemäss Bewilligung und kantonalem Recht.` },
      { id: 'm9-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm9-q13' },
      { id: 'm9-l3-abw', kind: 'decision', title: 'Abwägung: Der Polier ist nicht erreichbar', questionId: 'm9-d03' },
      { id: 'm9-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Feststellungen einstufen', taskId: 'm9-t3' },
      { id: 'm9-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m9-q14', 'm9-q15'] },
      { id: 'm9-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm9-p3' },
      { id: 'm9-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Feststellung: was, wo, wann – beobachtbar, mit Bezug zur Anforderung, ohne Schuldzuweisung.',
        'Drei Stufen: kritisch (Sofortmassnahme), Abweichung (Massnahme mit Termin), Hinweis (Empfehlung).',
        'Kritisch ist auch eine fehlende Freigabe für eine laufende Arbeit.',
        'Reihenfolge: Eigenschutz, Quelle stoppen, Ausbreitung verhindern, alarmieren bzw. melden, dokumentieren.',
        'Beobachtung, Bewertung und Vermutung trennen; eigene Grenzen kennen.',
      ] },
      { id: 'm9-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'notruf', 'bafu-ubb', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm9-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Dokumentation: Fotos, Kontrollbericht, Kommunikation',
    topics: ['m9-bericht'],
    objectives: [
      'Aussagekräftige Fotos machen und datenschutzgerecht verwenden',
      'Einen kurzen, nachvollziehbaren Kontrollbericht schreiben',
      'Feststellungen so kommunizieren, dass sie zu Massnahmen führen',
    ],
    steps: [
      { id: 'm9-l4-situation', kind: 'situation', title: 'Einstieg: Der Bericht, den niemand liest', text: `Sie haben nach einer Begehung einen sechsseitigen Bericht mit 34 Fotos geschrieben und an Bauführer, Polier und Projektleiter gemailt. Drei Wochen später ist bei der nächsten Begehung nichts erledigt. Der Bauführer sagt: «Ich habe ihn überflogen. Was war denn wichtig?»

Was müsste an Bericht und Vorgehen anders sein?` },
      { id: 'm9-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m9-q16', 'm9-q17'] },
      { id: 'm9-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Kontrollbericht** hält fest: Was wurde wann und von wem angeschaut, was wurde festgestellt, was wird bis wann von wem getan.

**Kurz und priorisiert**: Kritisches zuerst, dann Abweichungen, dann Hinweise – und Positives. Eine Seite mit klaren Massnahmen wirkt mehr als sechs Seiten Text.

**Fotos** belegen den Zustand: Übersicht und Detail, mit Datum und Ort, ohne erkennbare Personen, wo es nicht nötig ist.

**Kommunikation**: Erst mündlich vor Ort, dann schriftlich. Der Bericht geht an die, die handeln müssen – nicht an alle.

**Sachlich bleiben**: Ein Bericht kann Jahre später von Behörden, Versicherungen oder Gerichten gelesen werden.` },
      { id: 'm9-l4-explain', kind: 'explain', title: 'Der Kontrollbericht', text: `### Aufbau (siehe Vorlage in der Fachbibliothek)
1. **Kopf**: Baustelle, Datum, Uhrzeit, Teilnehmende (Funktion), Bauphase, Wetter, Anlass (regulär, nach Ereignis, Nachkontrolle).
2. **Umfang**: Was wurde angeschaut – und was **nicht**.
3. **Feststellungen**: Nummer, Ort, Beschreibung, Foto, Bezug zur Anforderung, Einstufung.
4. **Massnahmen**: je Feststellung Massnahme, verantwortliche Funktion, Termin, Status.
5. **Positives**.
6. **Nachverfolgung**: offene Massnahmen der letzten Begehung mit Status.

### Sprache
- **Beobachtbar und konkret**: «Auffangwanne der Tankstelle zu etwa zwei Dritteln mit Regenwasser gefüllt» statt «Tankstelle ungenügend».
- **Ohne Schuldzuweisung**: Funktionen statt Namen, Sachverhalt statt Urteil über Personen.
- **Ohne rechtliche Würdigung**: «entspricht nicht Ziff. 3 des Entwässerungskonzepts» statt «strafbare Gewässerverschmutzung».
- **Ohne Beschönigung**: Was kritisch war, steht als kritisch im Bericht – mit der getroffenen Sofortmassnahme.

### Verteiler
Der Bericht geht an die Funktionen, die Massnahmen umsetzen oder verantworten (Polier, Bauführung), und an die, die informiert sein müssen (Projektleitung; je nach Firmenregel Leitung Qualität/Umwelt). Ob und was an Bauleitung, UBB oder Bauherrschaft geht, richtet sich nach Vertrag und Firmenregel – interne Berichte sind nicht automatisch für Dritte bestimmt.

§> Der interne Kontrollbericht ist ein Instrument der Eigenkontrolle. Berichte, die eine Auflage verlangt (z. B. der UBB an die Behörde), folgen den dort festgelegten Vorgaben.` },
      { id: 'm9-l4-explain-2', kind: 'explain', title: 'Fotodokumentation und Datenschutz', text: `### Gute Fotos
- **Übersicht und Detail**: zuerst die Situation (wo ist das?), dann der Befund (was ist es?).
- **Massstab und Bezug**: Schacht, Maschine, Meterstab im Bild; Blickrichtung notieren.
- **Vorher und nachher**: dieselbe Perspektive nach der Massnahme – der beste Nachweis.
- **Sofort zuordnen**: Nummer der Feststellung, Datum, Ort im Dateinamen oder in der Bildlegende.
- **Unverändert aufbewahren**: Originale nicht bearbeiten; Markierungen nur auf Kopien.

### Datenschutz und Vertraulichkeit
- Fotografieren Sie **Sachverhalte, nicht Personen**. Sind Personen erkennbar und für den Befund nicht nötig: anderen Ausschnitt wählen oder unkenntlich machen.
- Kontrollschilder, Firmenlogos Dritter und Nachbargrundstücke nur, wenn sie für den Befund nötig sind.
- Fotos und Berichte gehören in die **Projektablage der Firma**, nicht in private Chats oder private Cloud-Speicher.
- Projektunterlagen und Fotos **nicht ungeprüft an externe Dienste** (auch nicht an KI-Dienste) weitergeben; es gelten die Regeln Ihrer Firma und die Vertraulichkeitsklauseln des Vertrags.
- Aufbewahrung und Löschung nach Firmenregel.

§> Grundsätze der Datenbearbeitung (Verhältnismässigkeit, Zweckbindung) sinngemäss nach dem Datenschutzgesetz (DSG); nicht am Original geprüft. Massgebend sind die Datenschutzregeln Ihrer Firma.` },
      { id: 'm9-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Eine Seite statt sechs', context: 'Hochbau', text: `Die Umweltbeauftragte stellt ihren Bericht um: oben ein Kasten «Sofort erledigt» (Schacht abgedeckt), darunter drei Abweichungen mit Funktion und Termin, zwei Hinweise, zwei positive Punkte, am Schluss die vier offenen Punkte der letzten Begehung mit Status. Sechs Fotos statt 34. Vor dem Versand geht sie die Seite mit dem Polier am Baucontainer durch; der Bauführer erhält den Bericht mit dem Satz: «Drei Punkte bis Freitag, Nachkontrolle am 28.»

**Lernpunkt**: Ein Bericht ist kein Tätigkeitsnachweis der Verfasserin, sondern eine Arbeitsliste für die Baustelle.` },
      { id: 'm9-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Der Bericht vor Gericht', context: 'Tiefbau', text: `Zwei Jahre nach einem Kanalisationsbau klagt ein Fischereiverein wegen eines Fischsterbens. Der Kanton verlangt die Unterlagen der Baustelle. Die Kontrollberichte zeigen: Am Vortag des Ereignisses wurde die Absetzanlage kontrolliert (Foto, pH-Protokoll), eine Abweichung an der Tankstelle war fristgerecht behoben. Ein früherer Bericht enthält allerdings den Satz: «Polier M. ist das Thema Gewässerschutz offensichtlich egal.»

**Lernpunkt**: Saubere Berichte entlasten – unsachliche Sätze belasten. Schreiben Sie so, dass Sie jeden Satz in zwei Jahren vor Dritten vertreten können.` },
      { id: 'm9-l4-deep', kind: 'deep', title: 'Fachvertiefung: Dokumentieren, damit gehandelt wird', text: `### 1. Zwei Zwecke – ein Dokument
Der Kontrollbericht ist **Arbeitsinstrument** (was ist zu tun?) und **Nachweis** (was wurde kontrolliert und veranlasst?). Der erste Zweck verlangt Kürze und Priorität, der zweite Vollständigkeit und Sachlichkeit. Beides gelingt mit fester Struktur: wenig Fliesstext, klare Tabelle der Feststellungen, Fotos im Anhang.

### 2. Der Nachweis der Sorgfalt
Im Schadenfall wird gefragt: Hat die Unternehmung ihre Leute sorgfältig ausgewählt, instruiert und überwacht? Regelmässige, sachliche Kontrollberichte mit nachverfolgten Massnahmen sind ein starkes Indiz dafür. Umgekehrt ist ein Bericht, der einen kritischen Befund festhält, auf den **nichts** folgte, belastend. Deshalb gilt: Wer feststellt, muss nachverfolgen (Lektion 5).

### 3. Ehrlichkeit vor Bequemlichkeit
Es gibt immer wieder den Wunsch, einen Befund «nicht in den Bericht zu nehmen». Ein geschönter Bericht ist wertlos als Nachweis und gefährlich, wenn später das Gegenteil belegt wird. Der richtige Weg: Befund aufnehmen, **Sofortmassnahme und Behebung gleich mit dokumentieren**. Ein Bericht, der zeigt «festgestellt um 10.20, behoben um 10.40», spricht für die Baustelle.

### 4. Mündlich vor schriftlich
Kein Bericht ersetzt das Gespräch. Die Reihenfolge: vor Ort mit dem Polier besprechen → bei kritischen Befunden sofort Bauführung anrufen → Bericht innert kurzer Frist (am besten gleichentags) → Thema an der nächsten Baustellensitzung. Schriftliches, das überrascht, wird als Angriff gelesen.

### 5. Der richtige Ton
- Ich-Botschaft und Sachverhalt: «Ich habe gesehen, dass …» statt «Ihr habt wieder …».
- Folgen benennen: «Wenn es regnet, läuft das in den Schacht.»
- Lösung anbieten: «Eine zweite Abdeckung liegt im Werkhof, ich kann sie morgen bringen lassen.»
- Zuständigkeit respektieren: Sie empfehlen, die Linie entscheidet und ordnet an.

### 6. Fotos als Beweismittel
Ein Foto belegt einen Zustand zu einem Zeitpunkt – nicht mehr. Notieren Sie deshalb, was das Bild **nicht** zeigt (z. B. «Abfluss zum Schacht nicht im Bild, verläuft entlang der Randsteine»). Bewahren Sie die Originaldateien mit ihren Aufnahmedaten auf. Markierungen (Pfeile, Kreise) helfen dem Leser, gehören aber auf eine Kopie.

### 7. Ablage und Zugriff
Berichte und Fotos brauchen einen festen Ort in der Projektablage, eine einheitliche Benennung (Projekt, Datum, Art) und geregelte Zugriffsrechte. Wer das Projekt verlässt, nimmt keine Kopien auf privaten Geräten mit. Am Projektende gehören die Berichte zu den Unterlagen, die mit den übrigen Nachweisen aufbewahrt werden.

### 8. Digitale Hilfsmittel
Apps für Begehungen sparen Zeit (Foto, Ort, Zeit, Zuordnung in einem Schritt). Prüfen Sie vor dem Einsatz mit der zuständigen Stelle Ihrer Firma: Wo liegen die Daten, wer hat Zugriff, was geschieht mit den Fotos? Das gilt auch für KI-Funktionen, die Texte oder Bilder auswerten: Projektdaten Dritter dürfen nicht unkontrolliert an externe Dienste gehen.

§> Aussagen zu Sorgfaltsnachweis und Haftung allgemein und sinngemäss (Modul 1); die rechtliche Beurteilung im Einzelfall ist Sache von Behörden, Gerichten und Fachpersonen Recht.` },
      { id: 'm9-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm9-q18' },
      { id: 'm9-l4-abw', kind: 'decision', title: 'Abwägung: «Schreib das bitte nicht auf»', questionId: 'm9-d04' },
      { id: 'm9-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Feststellungen für den Bericht formulieren', taskId: 'm9-t4' },
      { id: 'm9-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m9-q19', 'm9-q20'] },
      { id: 'm9-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm9-p4' },
      { id: 'm9-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem Polier (Feynman-Methode)', feynmanId: 'm9-f1' },
      { id: 'm9-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Bericht = Arbeitsliste und Nachweis: kurz, priorisiert, sachlich.',
        'Festhalten, was angeschaut wurde – und was nicht.',
        'Fotos: Übersicht und Detail, vorher und nachher, Sachverhalte statt Personen.',
        'Erst mündlich vor Ort, dann schriftlich an die, die handeln müssen.',
        'Nichts beschönigen: Befund mit Sofortmassnahme und Behebung dokumentieren.',
      ] },
      { id: 'm9-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['dsg', 'bafu-ubb', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm9-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Korrigieren, vorbeugen, nachverfolgen, eskalieren',
    topics: ['m9-nachverfolgung'],
    objectives: [
      'Sofortmassnahme, Korrektur, Korrekturmassnahme und Vorbeugung unterscheiden',
      'Ursachen von Abweichungen finden, statt nur Symptome zu beheben',
      'Offene Massnahmen nachverfolgen und bei Bedarf stufengerecht eskalieren',
    ],
    steps: [
      { id: 'm9-l5-situation', kind: 'situation', title: 'Einstieg: Zum dritten Mal derselbe Schacht', text: `Dritte Begehung auf derselben Baustelle. Zum dritten Mal ist der Meteorschacht an der Zufahrt offen. Zweimal stand im Bericht «Schacht abdecken – Polier – sofort». Zweimal wurde er abgedeckt, zweimal war die Abdeckung beim nächsten Mal wieder weg. Der Polier zuckt die Schultern: «Die Chauffeure fahren sie immer kaputt.»

Was läuft falsch – und was tun Sie jetzt anders?` },
      { id: 'm9-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m9-q21', 'm9-q22'] },
      { id: 'm9-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Vier Arten von Massnahmen:**
- **Sofortmassnahme**: Gefahr jetzt abwenden (Pumpe stoppen).
- **Korrektur**: den Mangel beheben (Schacht abdecken).
- **Korrekturmassnahme**: die **Ursache** beseitigen, damit der Mangel nicht wiederkommt (befahrbare Abdeckung, Zufahrt verlegen).
- **Vorbeugung**: dasselbe Problem auf **anderen** Baustellen verhindern (Standard, AVOR-Checkliste, Instruktion).

**Nachverfolgen**: Jede Massnahme hat eine Funktion, einen Termin und einen Status – und wird kontrolliert, bis sie **wirksam** erledigt ist.

**Eskalieren**: Wenn Massnahmen wiederholt nicht umgesetzt werden oder ein kritischer Zustand andauert, geht das Thema stufenweise an die nächste Ebene – sachlich, dokumentiert und angekündigt.` },
      { id: 'm9-l5-explain', kind: 'explain', title: 'Von der Korrektur zur Ursache', text: `### Warum Korrekturen oft nicht halten
Eine Korrektur behebt das Symptom. Kommt der Mangel wieder, liegt die Ursache tiefer. Fragen Sie mehrmals **«Warum?»**:
- Warum ist der Schacht offen? – Die Abdeckung ist kaputt.
- Warum ist sie kaputt? – Lastwagen fahren darüber.
- Warum fahren sie darüber? – Der Schacht liegt in der Fahrspur der Zufahrt.
- Warum liegt er dort? – Im Installationsplan war die Schachtart nicht markiert.
Erst die letzte Antwort zeigt, wo eine Korrekturmassnahme ansetzt: befahrbare Abdeckung jetzt – und Schächte in der AVOR markieren künftig.

### Ursachen liegen selten bei einer Person
Typische Ursachen: fehlende Planung (AVOR), ungeeignete oder fehlende Mittel, unklare Zuständigkeit, fehlende Instruktion (besonders bei Subunternehmern), Zeitdruck, widersprüchliche Vorgaben. «Der Polier hat nicht aufgepasst» ist fast nie die ganze Antwort – und führt zu keiner Verbesserung.

### Wirksamkeit prüfen
Eine Massnahme ist nicht erledigt, wenn sie **umgesetzt** ist, sondern wenn sie **wirkt**: Ist der Schacht bei der nächsten und übernächsten Begehung noch abgedeckt? Planen Sie die Nachkontrolle gleich mit.

§> Die Unterscheidung von Korrektur und Korrekturmassnahme folgt sinngemäss dem Sprachgebrauch der Managementsystem-Normen (ISO 14001, Abschnitt Nichtkonformität und Korrekturmassnahmen); Norm kostenpflichtig, Abschnittsnummern der Ausgabe 2026 nicht verglichen. Vertiefung in Modul 10.` },
      { id: 'm9-l5-diagram', kind: 'diagram', title: 'Schema: Von der Feststellung zum Abschluss', diagram: 'feststellungsweg', caption: 'Eine Feststellung ist erst abgeschlossen, wenn die Massnahme wirkt. Vereinfachte Lernhilfe.' },
      { id: 'm9-l5-explain-2', kind: 'explain', title: 'Nachverfolgen und eskalieren', text: `### Die Massnahmenliste
Eine einzige Liste je Baustelle (oder für alle Baustellen): Nr., Feststellung, Einstufung, Massnahme, verantwortliche Funktion, Termin, Status (offen / umgesetzt / wirksam abgeschlossen), Datum der Nachkontrolle. Sie ist Traktandum jeder Baustellensitzung.

### Stufenweise eskalieren

| Stufe | Auslöser (Beispiel) | Adressat | Form |
|---|---|---|---|
| 1 | Feststellung | Polier/in vor Ort | mündlich, Bericht |
| 2 | Termin verstrichen bzw. Mangel wiederholt | Bauführer/in | Gespräch, schriftlich bestätigt |
| 3 | Weiterhin offen oder kritischer Zustand dauert an | Projektleitung bzw. Bereichsleitung | schriftlich, mit Verlauf |
| 4 | Grundsätzliches Problem, Risiko für die Firma | Geschäftsleitung (über Leitung Qualität/Umwelt) | Entscheidungsvorlage |

Die Stufen und Auslöser legt Ihre Firma fest. Wichtig: **ankündigen** («Wenn das bis Freitag nicht erledigt ist, bespreche ich es mit dem Bauführer») und die Stufe nicht überspringen – ausser bei unmittelbarer Gefahr.

### Eskalation nach aussen
Über Meldungen an Bauleitung, Bauherrschaft, UBB oder Behörde entscheidet in der Regel die Linie Ihrer Firma, gestützt auf Vertrag und Bewilligung. **Ausnahmen**: die sofortige Alarmierung bei einem Umweltereignis (Polizei bzw. Feuerwehr) und Meldungen, zu denen die Firma gesetzlich oder gemäss Auflage verpflichtet ist – diese dürfen nicht an einem internen Entscheid scheitern. Wenn Sie den Eindruck haben, dass eine solche Pflicht verletzt wird, wenden Sie sich an die in Ihrer Firma dafür vorgesehene Stelle (Vorgesetzte, Geschäftsleitung, Compliance-Stelle).

!> Eskalieren ist kein Petzen, sondern Teil des Auftrags. Wer einen andauernden kritischen Zustand kennt und nichts unternimmt, trägt mit.` },
      { id: 'm9-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der Schacht in der Zufahrt', context: 'Hochbau', text: `Im Fall aus dem Einstieg ändert der Umweltbeauftragte das Vorgehen. Er bespricht mit Polier und Bauführer die Ursache (Schacht in der Fahrspur) und drei Varianten: befahrbare Stahlplatte mit Dichtung, Verlegung der Zufahrt um zwei Meter, Schachteinsatz mit Absperrblase. Der Bauführer entscheidet sich für die Stahlplatte und markiert die Fahrspur. Nachkontrolle nach einer und nach vier Wochen: Platte liegt, Schacht dicht. In die AVOR-Checkliste der Firma kommt ein Punkt: «Schächte in Fahrspuren: befahrbare Abdeckung einplanen».

**Lernpunkt**: Dreimal dieselbe Korrektur ist ein Zeichen, dass die Ursache nicht gefunden wurde.` },
      { id: 'm9-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Eskalation mit Ankündigung', context: 'Tiefbau', text: `Auf einer Strassenbaustelle lagert ein Subunternehmer seit vier Wochen Fässer mit Trennmittel ohne Wanne neben dem Entwässerungsgraben. Die Umweltbeauftragte hat es zweimal im Bericht festgehalten; der Polier sagt: «Das ist Sache des Subunternehmers.» Sie kündigt an: «Der Graben führt zum Bach. Wenn die Fässer morgen Mittag nicht in einer Wanne stehen, rufe ich den Bauführer an.» Am nächsten Tag ruft sie an und bestätigt das Gespräch per Mail. Der Bauführer setzt dem Subunternehmer eine Frist von 24 Stunden und lässt eine Wanne aus dem Werkhof bringen.

**Lernpunkt**: Die Unternehmung bleibt für ihre Subunternehmer verantwortlich. Eine angekündigte, sachliche Eskalation wird akzeptiert – eine überraschende als Angriff empfunden.` },
      { id: 'm9-l5-deep', kind: 'deep', title: 'Fachvertiefung: Aus Feststellungen lernen', text: `### 1. Der Regelkreis
Kontrollieren hat nur Sinn, wenn daraus Verbesserung entsteht: planen → umsetzen → kontrollieren → verbessern. Die Begehung ist der dritte Schritt; ohne den vierten wiederholen sich dieselben Befunde. Die Massnahmenliste verbindet beides.

### 2. Ursachenanalyse mit Augenmass
Nicht jede Abweichung braucht eine Analyse. Sinnvoll ist sie bei **kritischen** Feststellungen, bei **Wiederholungen** und bei **Ereignissen**. Einfache Methoden genügen: mehrmals «Warum?» fragen; Ursachen in Gruppen ordnen (Planung, Mittel, Organisation, Instruktion, Umfeld); mit den Beteiligten statt über sie sprechen. Ziel ist nicht der Schuldige, sondern der Hebel.

### 3. Gute Korrekturmassnahmen
Die wirksamsten Massnahmen machen den Fehler **unmöglich oder unwahrscheinlich**, statt nur davor zu warnen:
- **Technisch**: befahrbare Abdeckung, feste Verrohrung zur Absetzanlage, Wanne mit Dach.
- **Organisatorisch**: Zuständigkeit benennen, Kontrolle im Tagesablauf verankern, Punkt in der AVOR-Checkliste.
- **Personenbezogen**: Instruktion, Schulung, Hinweisschild.
Technisch wirkt am längsten, personenbezogen am kürzesten – eine Instruktion allein ist selten eine ausreichende Korrekturmassnahme für ein wiederkehrendes Problem.

### 4. Termine und Status ehrlich führen
«Umgesetzt» heisst: Jemand hat es gesehen. «Wirksam abgeschlossen» heisst: Es hält. Schliessen Sie keine Massnahme auf Zuruf. Wenn ein Termin nicht realistisch war, wird er mit Begründung neu gesetzt – nicht stillschweigend verschoben.

### 5. Eskalation ohne Gesichtsverlust
Eskalieren bedeutet, ein Thema dorthin zu bringen, wo es entschieden werden kann – etwa weil Geld, Termine oder ein Subunternehmer betroffen sind. Das gelingt, wenn Sie (a) die Stufen kennen, (b) ankündigen, (c) den Verlauf sachlich belegen und (d) eine Lösung vorschlagen. Lassen Sie dem Polier die Möglichkeit, es selbst zu lösen; viele Eskalationen erübrigen sich mit der Ankündigung.

### 6. Wenn die Linie nicht reagiert
Reagiert auch die nächste Stufe nicht und besteht ein erhebliches Risiko, halten Sie Ihre Feststellung und Ihre Empfehlung schriftlich fest und wenden sich an die dafür vorgesehene Stelle der Firma. Ihre Aufgabe ist, dass die Verantwortlichen **wissen**, worüber sie entscheiden. Entscheiden müssen sie. Bei unmittelbarer Gefahr für die Umwelt gelten ohnehin Sofortmassnahmen und Alarmierung.

### 7. Lernen über die Baustelle hinaus
Führen Sie die Feststellungen aller Baustellen zusammen: Welche Themen kommen am häufigsten? Wo wiederholen sie sich? Daraus entstehen Schwerpunkte für Schulungen, Anpassungen der AVOR-Checkliste, Beschaffungen (z. B. Standard-Abdeckungen, Wannen) und Beiträge für die Managementbewertung (Modul 10). Wenige, klare Auswertungen genügen – z. B. die fünf häufigsten Feststellungen des Jahres und was dagegen getan wurde.

### 8. Anerkennung
Zeigen Sie auch, was sich verbessert hat. Eine Baustelle, die nach drei Begehungen keine offenen Punkte mehr hat, verdient eine Erwähnung – vor der Geschäftsleitung, nicht nur im Bericht.

§> Inhalte als bewährte Praxis und sinngemäss nach dem Verständnis von Managementsystemen. Meldepflichten gegenüber Behörden ergeben sich aus Gesetz und Bewilligung; interne Meldewege und Anlaufstellen regelt die Firma.` },
      { id: 'm9-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm9-q23' },
      { id: 'm9-l5-abw', kind: 'decision', title: 'Abwägung: Die Massnahme bleibt liegen', questionId: 'm9-d05' },
      { id: 'm9-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Ursache finden und Massnahmen ableiten', taskId: 'm9-t5' },
      { id: 'm9-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m9-q24', 'm9-q25'] },
      { id: 'm9-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm9-p5' },
      { id: 'm9-l5-feynman', kind: 'feynman', title: 'Erklären Sie es dem Projektleiter (Feynman-Methode)', feynmanId: 'm9-f2' },
      { id: 'm9-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Sofortmassnahme – Korrektur – Korrekturmassnahme (Ursache) – Vorbeugung (andere Baustellen).',
        'Mehrmals «Warum?» fragen; Ursachen liegen selten bei einer Person.',
        'Technische Massnahmen wirken länger als Instruktionen.',
        'Erledigt ist eine Massnahme erst, wenn sie wirkt – Nachkontrolle einplanen.',
        'Stufenweise, angekündigt und dokumentiert eskalieren; Alarmierung und Pflichtmeldungen scheitern nie an internen Entscheiden.',
      ] },
      { id: 'm9-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'bafu-ubb', 'gschg', 'praxis'] },
    ],
  },
];
