import type { Lesson } from '../types';

// Modul 10 «ISO 14001 und Umweltmanagement».
// ISO 14001 ist eine kostenpflichtige Norm; die App gibt keinen Normtext wieder. Abschnittsnummern
// stammen aus der Ausgabe 2015 und sind für die Ausgabe 2026 NICHT verglichen – überall so vermerkt.
// Aussagen zu Zertifizierung und Auditpraxis sinngemäss und ohne Prüfung an den Originalregelwerken.
// Prüfstatus: Entwurf.

const M = 'm10';
const E = 'entwurf' as const;

export const M10_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm10-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'ISO 14001 verstehen: Aufbau, Kontext und Führung',
    topics: ['m10-system'],
    objectives: [
      'Erklären, was ein Umweltmanagementsystem nach ISO 14001 ist – und was nicht',
      'Den Aufbau der Norm und den Regelkreis Planen – Umsetzen – Prüfen – Verbessern beschreiben',
      'Kontext, Führung und Rollen im eigenen Unternehmen einordnen',
    ],
    steps: [
      { id: 'm10-l1-situation', kind: 'situation', title: 'Einstieg: «Wir haben doch das Zertifikat»', text: `Ein Polier zeigt auf das gerahmte ISO-14001-Zertifikat im Baubüro: «Wir sind zertifiziert, also machen wir alles richtig. Wozu noch deine Begehungen?» Eine Woche später findet die Gemeinde auf derselben Baustelle Zementwasser im Meteorschacht.

Was sagt ein Zertifikat aus – und was nicht?` },
      { id: 'm10-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m10-q01', 'm10-q02'] },
      { id: 'm10-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**ISO 14001** ist eine internationale Norm für **Umweltmanagementsysteme (UMS)**. Sie beschreibt, **wie** ein Unternehmen seine Umweltthemen systematisch steuert – nicht, **welche** Umweltleistung es erreichen muss.

**Drei Verpflichtungen** stehen im Zentrum: Schutz der Umwelt (inkl. Vermeidung von Umweltbelastungen), **Erfüllung der bindenden Verpflichtungen** (Recht, Auflagen, Verträge) und **fortlaufende Verbesserung**.

**Der Aufbau** folgt dem Regelkreis **Planen – Umsetzen – Prüfen – Verbessern** (PDCA).

**Die Zertifizierung ist freiwillig.** Ein Zertifikat bestätigt, dass das System die Norm erfüllt – nicht, dass auf jeder Baustelle jeden Tag alles stimmt.

**Die oberste Leitung** trägt die Verantwortung; sie kann Aufgaben delegieren, nicht die Rechenschaft.` },
      { id: 'm10-l1-explain', kind: 'explain', title: 'Aufbau der Norm', text: `### Die Kapitel im Überblick

| Kapitel | Inhalt | Frage dahinter |
|---|---|---|
| 4 Kontext der Organisation | Umfeld, interessierte Parteien, Anwendungsbereich | Wo stehen wir, wer erwartet was von uns? |
| 5 Führung | Verpflichtung der Leitung, Umweltpolitik, Rollen | Wer steht dafür ein? |
| 6 Planung | Risiken und Chancen, Umweltaspekte, bindende Verpflichtungen, Ziele | Was ist wesentlich, was müssen und wollen wir erreichen? |
| 7 Unterstützung | Ressourcen, Kompetenz, Bewusstsein, Kommunikation, dokumentierte Information | Was brauchen wir dazu? |
| 8 Betrieb | Betriebliche Planung und Steuerung, Notfallvorsorge | Wie machen wir es im Alltag – auch auf der Baustelle? |
| 9 Bewertung der Leistung | Überwachung und Messung, Bewertung der Einhaltung, internes Audit, Managementbewertung | Wirkt es? |
| 10 Verbesserung | Nichtkonformität und Korrekturmassnahmen, fortlaufende Verbesserung | Was lernen wir daraus? |

Diese Gliederung teilt ISO 14001 mit anderen Managementsystem-Normen wie ISO 9001 (Qualität) und ISO 45001 (Arbeitssicherheit und Gesundheitsschutz) – deshalb lassen sich die Systeme zusammenführen (Lektion 5).

### Der Regelkreis
- **Planen** (Kapitel 4–6): Kontext, Aspekte, Verpflichtungen, Ziele.
- **Umsetzen** (Kapitel 7–8): Mittel, Kompetenz, Abläufe.
- **Prüfen** (Kapitel 9): messen, auditieren, bewerten.
- **Verbessern** (Kapitel 10): korrigieren, Ursachen beseitigen, weiterentwickeln.

§> Kapitelstruktur nach ISO 14001:2015. Seit April 2026 gibt es die Ausgabe ISO 14001:2026; laut Zertifizierern mit moderaten Änderungen und einer Übergangsfrist für bestehende Zertifikate. Die Abschnittsnummern der neuen Ausgabe wurden für die App nicht verglichen – massgebend ist die Norm, die Ihre Firma erworben hat.` },
      { id: 'm10-l1-diagram', kind: 'diagram', title: 'Schema: Der Regelkreis nach ISO 14001', diagram: 'iso-regelkreis', caption: 'Vereinfachte Lernhilfe nach der Struktur von ISO 14001:2015; kein Normtext.' },
      { id: 'm10-l1-explain-2', kind: 'explain', title: 'Kontext, Führung und Rollen', text: `### Kontext und interessierte Parteien
Das Unternehmen klärt, welche äusseren und inneren Themen sein Umweltmanagement beeinflussen (z. B. Rechtsentwicklung, Erwartungen öffentlicher Bauherrschaften, Fachkräftemangel, Standorte in Gewässernähe) und wer welche Erwartungen hat: Bauherrschaften, Behörden, Anwohnende, Mitarbeitende, Subunternehmer, Eigentümer. Erwartungen, die das Unternehmen erfüllen **muss oder will**, werden zu **bindenden Verpflichtungen** (Lektion 2).

### Anwendungsbereich
Der Anwendungsbereich legt fest, **wofür das System gilt**: welche Standorte, Niederlassungen und Tätigkeiten. Für eine Bauunternehmung gehören die **Baustellen** dazu – sie sind der Ort, an dem die wesentlichen Umweltauswirkungen entstehen. Ein System, das nur den Hauptsitz und den Werkhof abdeckt, ist für eine Baufirma wenig glaubwürdig.

### Führung
Die oberste Leitung
- übernimmt die **Rechenschaft** für die Wirksamkeit des Systems,
- legt die **Umweltpolitik** fest (mit den drei Verpflichtungen),
- sorgt für **Ressourcen** und dafür, dass das Umweltmanagement in die Geschäftsprozesse eingebunden ist (Offerte, AVOR, Ausführung, Einkauf),
- weist **Verantwortlichkeiten und Befugnisse** zu.

### Rollen
Die Norm verlangt, dass Verantwortlichkeiten für das System und für die Berichterstattung an die Leitung zugewiesen sind. Wie die Funktion heisst (Umweltbeauftragte/r, Leitung Qualität/Umwelt/Sicherheit), ist Sache der Firma. Wichtig für Sie: Sie **betreiben und pflegen** das System und **berichten** – die Umweltverantwortung in den Projekten bleibt in der **Linie** (Projektleitung, Bauführung, Polier).

§> Aussagen sinngemäss nach ISO 14001:2015, Kapitel 4 und 5; kein Normtext, Ausgabe 2026 nicht verglichen.` },
      { id: 'm10-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: System auf dem Papier', context: 'Hochbau', text: `Eine Hochbaufirma mit 120 Mitarbeitenden ist seit Jahren zertifiziert. Das Handbuch liegt im Intranet, die Poliere kennen es nicht. Im Überwachungsaudit fragt die Auditorin einen Polier nach den wichtigsten Umweltthemen seiner Baustelle; er verweist auf «das Büro». Ergebnis: eine Abweichung zu Bewusstsein und betrieblicher Steuerung. Die Firma reagiert mit einer einseitigen «Umweltkarte Baustelle» (fünf Regeln, Notfallnummern, Ansprechperson) und einem festen Umweltpunkt in der Startsitzung.

**Lernpunkt**: Ein Managementsystem ist nur so gut wie das, was auf der Baustelle davon ankommt.` },
      { id: 'm10-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Zertifikat als Zuschlagshilfe', context: 'Tiefbau', text: `Ein Kanton verlangt in einer Strassenbau-Ausschreibung den Nachweis eines Umweltmanagementsystems «nach ISO 14001 oder gleichwertig». Die Tiefbauunternehmung legt ihr Zertifikat bei. Nach dem Zuschlag verlangt die Bauherrschaft an der Startsitzung, die Umweltorganisation des Projekts zu sehen: Wer ist zuständig, wie wird kontrolliert, wie wird berichtet? Die Unternehmung kann ihr Kontrollkonzept und den Massnahmenplan aus dem System ableiten.

**Lernpunkt**: Das Zertifikat öffnet die Tür – überzeugen muss das gelebte System im Projekt.` },
      { id: 'm10-l1-deep', kind: 'deep', title: 'Fachvertiefung: Was ein Umweltmanagementsystem leistet', text: `### 1. System statt Einzelmassnahmen
Ohne System hängt Umweltschutz an einzelnen Personen: am erfahrenen Polier, an der engagierten Bauführerin. Wechseln sie, geht das Wissen. Ein Managementsystem macht aus guter Praxis einen **Standard**: Es legt fest, was gilt, wer zuständig ist, wie geprüft wird und wie aus Fehlern gelernt wird. Die Module 8 (AVOR, Massnahmenplan) und 9 (Kontrolle, Nachverfolgung) sind genau die Bausteine, die ISO 14001 auf Unternehmensebene zusammenführt.

### 2. Was die Norm nicht tut
- Sie legt **keine Grenzwerte** und keine bestimmte Umweltleistung fest. Zwei zertifizierte Firmen können sehr unterschiedlich gut sein.
- Sie **ersetzt kein Recht**. Die Einhaltung des Rechts ist eine der Verpflichtungen des Systems – aber das Zertifikat ist kein behördlicher Nachweis der Rechtskonformität.
- Sie schreibt **keine bestimmte Dokumentation** in Form eines dicken Handbuchs vor. Verlangt ist «dokumentierte Information», soweit sie nötig ist, damit das System wirkt und nachweisbar ist.

### 3. Was ein Zertifikat aussagt
Eine akkreditierte Zertifizierungsstelle hat in Stichproben geprüft, ob das System die Anforderungen der Norm erfüllt und angewendet wird. Das ist eine Aussage über das **System**, mit Stichprobencharakter. Ein Vorfall auf einer Baustelle widerlegt das Zertifikat nicht automatisch – entscheidend ist, **wie das System darauf reagiert**: Wird er erkannt, behandelt, die Ursache beseitigt, daraus gelernt?

### 4. Die drei Verpflichtungen der Umweltpolitik
- **Schutz der Umwelt**, einschliesslich Vermeidung von Umweltbelastungen – und weiterer für das Unternehmen wichtiger Themen (z. B. Ressourcen, Klima).
- **Erfüllung der bindenden Verpflichtungen**.
- **Fortlaufende Verbesserung** des Systems, um die Umweltleistung zu verbessern.
Eine Umweltpolitik, die nur aus allgemeinen Sätzen besteht, hilft niemandem. Gut ist sie, wenn ein Polier darin erkennt, was von ihm erwartet wird.

### 5. Führung zeigt sich im Alltag
Auditoren fragen die Geschäftsleitung nicht nach Paragraphen, sondern: Welche Umweltthemen sind für Ihr Unternehmen wesentlich? Welche Ziele haben Sie gesetzt, und wie stehen Sie da? Was haben Sie nach dem letzten Vorfall entschieden? Führung heisst: Ressourcen geben, nachfragen, entscheiden – und selbst die Regeln einhalten, auch unter Termindruck.

### 6. Ihre Rolle im System
Als Umweltbeauftragte/r sind Sie Architekt/in und Hüter/in des Systems: Sie halten es schlank und aktuell, schulen, auditieren (oder organisieren Audits), werten aus und berichten der Leitung. Sie sind **nicht** verantwortlich für die Umweltleistung jeder Baustelle – das ist die Linie. Wenn Sie anfangen, die Arbeit der Linie zu übernehmen («das macht ja der Umweltbeauftragte»), wird das System schwächer, nicht stärker.

### 7. Typische Schwächen in Bauunternehmen
- System beschreibt das Büro, nicht die Baustelle.
- Umweltaspekte einmal bewertet und nie mehr angeschaut.
- Rechtskataster ohne Bezug zu Bewilligungsauflagen der Projekte.
- Ziele ohne Massnahmen, Kennzahlen ohne Entscheid.
- Interne Audits als Dokumentenkontrolle statt als Blick auf die Praxis.
- Subunternehmer ausserhalb des Systems.

### 8. Verbindung zu den anderen Modulen
Rechtskataster (Modul 1), Fachanforderungen (Module 2–7), AVOR und Massnahmenplan (Modul 8), Kontrolle und Korrekturmassnahmen (Modul 9) sind die Inhalte – ISO 14001 ist der Rahmen, der sie verbindet und am Leben hält.

§> Sinngemäss nach ISO 14001:2015; kein Normtext. Aussagen zur Zertifizierung allgemein (Akkreditierung in der Schweiz durch die Schweizerische Akkreditierungsstelle SAS); Regeln der Zertifizierungsstellen nicht geprüft.` },
      { id: 'm10-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm10-q03' },
      { id: 'm10-l1-abw', kind: 'decision', title: 'Abwägung: Nur der Hauptsitz im Zertifikat?', questionId: 'm10-d01' },
      { id: 'm10-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Umweltkarte für die Baustelle', taskId: 'm10-t1' },
      { id: 'm10-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m10-q04', 'm10-q05'] },
      { id: 'm10-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm10-p1' },
      { id: 'm10-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'ISO 14001 beschreibt, wie Umweltthemen gesteuert werden – nicht, welche Umweltleistung erreicht sein muss.',
        'Drei Verpflichtungen: Umwelt schützen, bindende Verpflichtungen erfüllen, fortlaufend verbessern.',
        'Aufbau: Kontext, Führung, Planung, Unterstützung, Betrieb, Bewertung, Verbesserung (PDCA).',
        'Zertifikat = geprüftes System in Stichproben, keine Garantie für jede Baustelle.',
        'Die Leitung trägt die Rechenschaft, die Linie die Umsetzung, Sie das System.',
      ] },
      { id: 'm10-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'iso9001', 'iso45001', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm10-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Planung: Umweltaspekte, bindende Verpflichtungen, Ziele',
    topics: ['m10-planung'],
    objectives: [
      'Umweltaspekte einer Bauunternehmung ermitteln und die bedeutenden bestimmen',
      'Bindende Verpflichtungen systematisch erfassen und aktuell halten',
      'Aus Aspekten, Verpflichtungen, Risiken und Chancen sinnvolle Umweltziele ableiten',
    ],
    steps: [
      { id: 'm10-l2-situation', kind: 'situation', title: 'Einstieg: Die Liste von 2019', text: `Sie übernehmen das Umweltmanagement und finden die Tabelle «Umweltaspekte» von 2019: 64 Zeilen, vom Papierverbrauch im Büro bis zur Kaffeemaschine. «Baustellenabwasser» steht auf Zeile 41 mit der Bewertung «mittel». Als Umweltziel für dieses Jahr steht: «Papierverbrauch um 5 % senken.»

Was stimmt an diesem Bild nicht?` },
      { id: 'm10-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m10-q06', 'm10-q07'] },
      { id: 'm10-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Umweltaspekt**: der Teil einer Tätigkeit, der auf die Umwelt einwirken kann (z. B. Betonieren → alkalisches Waschwasser). **Umweltauswirkung**: die Veränderung der Umwelt, die daraus folgt (z. B. Schädigung eines Gewässers).

**Bedeutende Umweltaspekte** sind jene mit den grössten möglichen Auswirkungen. Auf sie richtet sich das System aus – nicht auf die Kaffeemaschine.

**Bindende Verpflichtungen**: Rechtsvorschriften und Auflagen, die das Unternehmen erfüllen **muss**, und weitere Anforderungen, die es erfüllen **will** (Verträge, Labels, Selbstverpflichtungen).

**Umweltziele** setzen dort an, wo Bedeutung, Verpflichtungen, Risiken und Chancen zusammenkommen – messbar, mit Massnahmen, Verantwortlichen, Mitteln und Terminen.` },
      { id: 'm10-l2-explain', kind: 'explain', title: 'Umweltaspekte ermitteln und bewerten', text: `### Vorgehen
1. **Tätigkeiten auflisten** – entlang des Bauablaufs und der Standorte: Offerte und AVOR, Installation, Rückbau, Aushub und Erdbau, Wasserhaltung, Betonarbeiten, Belagsarbeiten, Transporte, Werkhof, Büro, Einkauf.
2. **Aspekte zuordnen**: Was kann dabei auf Wasser, Boden, Luft, Nachbarschaft, Ressourcen, Klima einwirken – im Normalbetrieb, bei **besonderen Zuständen** (Starkregen, Inbetriebnahme, Stillstand) und im **Notfall** (Leckage, Brand)?
3. **Bewerten** nach festen Kriterien, z. B. Schwere und Umkehrbarkeit der Auswirkung, Häufigkeit bzw. Wahrscheinlichkeit, rechtliche Relevanz, Beeinflussbarkeit, Anliegen interessierter Parteien.
4. **Bedeutende Aspekte festlegen** und begründen.
5. **Aktuell halten**: bei neuen Tätigkeiten, Verfahren, Standorten, nach Ereignissen und in festem Rhythmus.

### Lebenswegbetrachtung
Die Norm verlangt, die Aspekte **unter Berücksichtigung des Lebenswegs** zu betrachten: nicht nur die eigene Baustelle, sondern auch, was vorher (Baustoffe, Transporte, Subunternehmer) und nachher (Entsorgung, Rückbaubarkeit) geschieht – soweit das Unternehmen es steuern oder beeinflussen kann. Eine vollständige Ökobilanz ist damit nicht gemeint.

### Typische bedeutende Aspekte einer Bauunternehmung

| Tätigkeit | Aspekt | Mögliche Auswirkung |
|---|---|---|
| Betonarbeiten, Wasserhaltung | alkalisches bzw. trübes Abwasser | Gewässerschädigung |
| Betankung, Lagerung, Maschinenbetrieb | Treibstoff- und Ölverlust | Boden- und Grundwasserverschmutzung |
| Rückbau | Bauschadstoffe, Bauabfälle | Gesundheits- und Umweltgefährdung, Ressourcenverlust |
| Erdbau | Befahren und Umlagern von Boden | Verdichtung, Verlust der Bodenfruchtbarkeit |
| Maschinen, Transporte | Abgase, Staub, Lärm, CO₂ | Luftbelastung, Belästigung, Klimawirkung |
| Einkauf Baustoffe | Zement, Stahl, Primärkies | graue Emissionen, Ressourcenverbrauch |

§> Sinngemäss nach ISO 14001:2015, Abschnitt 6.1.2 (Ausgabe 2026 nicht verglichen). Die Bewertungsmethode ist frei wählbar; sie muss nachvollziehbar sein.` },
      { id: 'm10-l2-explain-2', kind: 'explain', title: 'Bindende Verpflichtungen und Ziele', text: `### Bindende Verpflichtungen erfassen
Drei Ebenen gehören in eine Bauunternehmung:
- **Unternehmensebene**: Umweltrecht von Bund und Standortkantonen, das die Tätigkeiten betrifft (Umweltrechtskataster, Modul 1); Verpflichtungen aus Verbänden, Labels, Konzernvorgaben.
- **Standortebene**: Bewilligungen und Auflagen für Werkhöfe, Lager, Tankanlagen, Recyclingplätze.
- **Projektebene**: Bewilligungsauflagen und Verträge jedes Bauprojekts (Auflagenliste, Modul 8).

Die Projektebene wird oft vergessen – dabei entstehen dort die meisten konkreten Pflichten. Ein Rechtskataster allein genügt nicht.

### Aktuell halten und Einhaltung bewerten
Das Unternehmen legt fest, **wer** Änderungen verfolgt (Recht, Vollzugshilfen, Normen), **wie** sie in die Abläufe gelangen (Standards, Schulung, Checklisten) und **wie** die Einhaltung regelmässig bewertet wird (Lektion 5).

### Risiken und Chancen
Was könnte verhindern, dass das System seine Ergebnisse erreicht – und wo liegen Chancen? Beispiele: neuer Rechtsstand (Kreislaufwirtschaft), Abhängigkeit von einzelnen Fachpersonen, Wetterextreme auf Baustellen; Chancen durch Recyclingbaustoffe, emissionsarme Maschinen, Nachhaltigkeitskriterien in Vergaben.

### Umweltziele
Gute Ziele
- beziehen sich auf **bedeutende Aspekte** oder **Verpflichtungen**,
- sind **messbar** (wo machbar) und werden überwacht,
- haben **Massnahmen, Verantwortliche, Mittel, Termine**,
- sind in der Linie **bekannt**.

Beispiele: «Auf allen Baustellen mit Betonarbeiten ist vor der ersten Betonage eine Lösung für das Waschwasser im Installationsplan festgelegt (Nachweis: AVOR-Checkliste; Zielwert 100 %).» – «Anteil getrennt erfasster Bauabfälle auf Hochbaustellen von … auf … % bis Ende Jahr.»

§> Sinngemäss nach ISO 14001:2015, Abschnitte 6.1.1, 6.1.3 und 6.2 (Ausgabe 2026 nicht verglichen). Zielwerte in den Beispielen sind frei gewählt.` },
      { id: 'm10-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Von 64 Zeilen auf 8', context: 'Hochbau', text: `Die neue Umweltbeauftragte überarbeitet die Aspekte-Tabelle mit zwei Bauführern und einem Polier in einem halben Tag. Sie ordnen nach Bauablauf, bewerten mit drei Kriterien (Schwere, Wahrscheinlichkeit, rechtliche Relevanz) und kommen auf acht bedeutende Aspekte – Baustellenabwasser und wassergefährdende Stoffe zuoberst. Der Papierverbrauch bleibt als «nicht bedeutend» in der Liste. Zwei der drei neuen Jahresziele betreffen den Gewässerschutz auf Baustellen.

**Lernpunkt**: Wer die Leute aus der Praxis an den Tisch holt, erhält eine Liste, die stimmt – und die später auch mitgetragen wird.` },
      { id: 'm10-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Auflage rutscht durch', context: 'Tiefbau', text: `Eine Tiefbaufirma führt einen sauberen Umweltrechtskataster. Trotzdem wird auf einer Leitungsbaustelle eine Auflage zur bodenkundlichen Baubegleitung übersehen – sie stand nur in der Bewilligung des Projekts. Im internen Audit wird klar: Das System kennt die Gesetze, aber es gibt keinen festen Schritt, in dem die Auflagen jedes Projekts erfasst werden. Die Firma ergänzt die AVOR um die Auflagenliste und nimmt sie als Kontrollpunkt in die Projektfreigabe auf.

**Lernpunkt**: Bindende Verpflichtungen entstehen im Bau mit jedem Projekt neu. Das System braucht dafür einen festen Ort im Ablauf.` },
      { id: 'm10-l2-deep', kind: 'deep', title: 'Fachvertiefung: Planung, die auf der Baustelle ankommt', text: `### 1. Die Aspektebewertung ist kein Selbstzweck
Sie beantwortet eine einzige Frage: **Worauf konzentrieren wir uns?** Alles Weitere – Ziele, Schulungen, Standards, Kontrollen, Audits – richtet sich danach. Eine Bewertung, bei der am Ende 40 Aspekte «bedeutend» sind, beantwortet die Frage nicht. Ebenso wenig eine, bei der die grössten Risiken unter «mittel» verschwinden, weil ein Punkteschema Büro- und Baustellenthemen gleich behandelt.

### 2. Normalbetrieb, besondere Zustände, Notfälle
Viele Tabellen bewerten nur den Normalbetrieb. Auf Baustellen entstehen die grossen Schäden aber oft bei **besonderen Zuständen** (Starkregen, erste Betonage, Umbau der Wasserhaltung, Stillstand über Ferien) und in **Notfällen** (Schlauchbruch, Überlauf, Brand). Fragen Sie bei jeder Tätigkeit: Was passiert, wenn es anders läuft als geplant?

### 3. Steuern und beeinflussen
Aspekte, die das Unternehmen **selbst steuert** (eigene Baustellen, eigene Maschinen), werden direkt geregelt. Aspekte, die es nur **beeinflussen** kann (Subunternehmer, Lieferanten, Planung der Bauherrschaft), werden über Verträge, Auswahl, Instruktion und Beratung angegangen. Für eine Bauunternehmung ist der Einfluss in der Offert- und AVOR-Phase am grössten – z. B. mit einem Unternehmervorschlag für Recyclingbeton oder ein anderes Bauverfahren.

### 4. Verpflichtungen: muss und will
Die Norm unterscheidet rechtliche Verpflichtungen und weitere Anforderungen, die das Unternehmen sich zu eigen macht. Sobald eine freiwillige Anforderung übernommen ist (z. B. ein Label oder eine Zusage in einer Offerte), wird sie im System **gleich verbindlich** behandelt. Überlegen Sie deshalb, bevor etwas versprochen wird, ob es eingehalten und nachgewiesen werden kann.

### 5. Den Rechtskataster lebendig halten
Ein Kataster ist nur nützlich, wenn drei Dinge geregelt sind: **Wer** verfolgt Änderungen (und woher – Fedlex, BAFU, Kantone, Verbände, ein Rechtsdienst)? **Was** ändert dadurch im Betrieb? **Wer** erfährt es? Halten Sie zu jeder Vorschrift fest, welche Tätigkeit sie betrifft und in welchem Standard oder welcher Checkliste sie umgesetzt ist. Eine Liste von Gesetzestiteln ohne diesen Bezug ist eine Bibliothek, kein Managementinstrument.

### 6. Ziele, die etwas verändern
Ein Ziel sollte eine **Entscheidung** auslösen oder ein **Verhalten** ändern. Prüfen Sie jedes Ziel: Wer muss was anders machen? Woran merken wir, ob es wirkt? Was kostet es, und ist das bewilligt? Lieber drei Ziele mit Massnahmen als zehn mit Absichtserklärungen. Und: Ziele dürfen auch die **Verlässlichkeit** betreffen (z. B. «keine Baustelle ohne Auflagenliste»), nicht nur Mengen und Prozente.

### 7. Planung von Änderungen
Neue Verfahren, Maschinen, Standorte, Subunternehmer oder Organisationsformen können neue Aspekte und Verpflichtungen bringen. Das System sollte dafür einen einfachen Auslöser haben – etwa die Frage «Umweltfolgen geprüft?» im Änderungs- oder Beschaffungsprozess (Modul 8). Laut Zertifizierern legt die Ausgabe 2026 auf das Änderungsmanagement mehr Gewicht; Einzelheiten sind an der Norm zu prüfen.

### 8. Dokumentation mit Augenmass
Festgehalten werden: die Kriterien und das Ergebnis der Aspektebewertung, die bindenden Verpflichtungen, Risiken und Chancen, soweit nötig, sowie die Ziele mit ihrer Planung. Wie umfangreich, bestimmt das Unternehmen. Eine Seite, die gelesen wird, ist mehr wert als ein Ordner, den niemand öffnet.

§> Sinngemäss nach ISO 14001:2015, Kapitel 6; kein Normtext. Hinweis zur Ausgabe 2026 laut Angaben von Zertifizierern, nicht an der Norm geprüft.` },
      { id: 'm10-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm10-q08' },
      { id: 'm10-l2-abw', kind: 'decision', title: 'Abwägung: Welches Umweltziel?', questionId: 'm10-d02' },
      { id: 'm10-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Umweltaspekte einer Strassenbaustelle', taskId: 'm10-t2' },
      { id: 'm10-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m10-q09', 'm10-q10'] },
      { id: 'm10-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm10-p2' },
      { id: 'm10-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Aspekt = Einwirkung einer Tätigkeit; Auswirkung = Veränderung der Umwelt.',
        'Bewerten nach festen Kriterien – auch besondere Zustände und Notfälle; wenige bedeutende Aspekte.',
        'Bindende Verpflichtungen auf drei Ebenen: Unternehmen, Standort, Projekt.',
        'Ziele an bedeutenden Aspekten und Verpflichtungen ausrichten, mit Massnahmen, Verantwortlichen, Mitteln, Terminen.',
        'Praktiker einbeziehen; Dokumentation mit Augenmass.',
      ] },
      { id: 'm10-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'usg', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm10-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Umsetzung: Kompetenz, Betrieb, Notfallvorsorge',
    topics: ['m10-betrieb'],
    objectives: [
      'Kompetenz, Bewusstsein und Kommunikation im Unternehmen sicherstellen',
      'Die betriebliche Steuerung auf Baustellen und bei Subunternehmern gestalten',
      'Notfallvorsorge planen, üben und auswerten',
    ],
    steps: [
      { id: 'm10-l3-situation', kind: 'situation', title: 'Einstieg: Der Ordner im Container', text: `Im Baucontainer steht ein Ordner «Umweltmanagement» mit 14 Verfahrensanweisungen. Der Polier hat ihn nie geöffnet. Als ein Fass Trennmittel umkippt, weiss niemand, wo das Bindemittel liegt und wen man anrufen muss. Die Notfallnummern stehen im Ordner – auf Seite 87.

Wie muss ein System aussehen, das in diesem Moment hilft?` },
      { id: 'm10-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m10-q11', 'm10-q12'] },
      { id: 'm10-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Kompetenz**: Wer Arbeiten ausführt, die die Umweltleistung beeinflussen, muss dafür befähigt sein – durch Ausbildung, Schulung oder Erfahrung. Das wird nachgewiesen.

**Bewusstsein**: Alle kennen die Umweltpolitik, die bedeutenden Aspekte ihrer Arbeit, ihren Beitrag und die Folgen, wenn Vorgaben nicht eingehalten werden.

**Betriebliche Steuerung**: Für Tätigkeiten mit bedeutenden Aspekten gibt es klare Vorgaben – in einer Form, die auf der Baustelle ankommt (Standard, Checkliste, Installationsplan). Das gilt auch für **Subunternehmer und Lieferanten**.

**Notfallvorsorge**: Mögliche Notfälle sind bekannt, die Reaktion ist geplant, das Material vorhanden – und es wird **geübt**.` },
      { id: 'm10-l3-explain', kind: 'explain', title: 'Kompetenz, Bewusstsein, Kommunikation', text: `### Kompetenz planen
- **Wer** braucht **was**? Geschäftsleitung (Verantwortung, Entscheide), Projektleitung und Bauführung (Auflagen, AVOR, Vertrag), Poliere (Umsetzung, Eigenkontrolle, Notfall), Maschinisten und Bauarbeiter (richtige Handgriffe), Werkhof (Lagerung, Wartung), Einkauf (Anforderungen an Lieferanten), Auditoren.
- **Wie**? Einführung neuer Mitarbeitender, Startinstruktion je Baustelle, Kurzschulungen am Objekt (10 Minuten am Waschplatz wirken mehr als zwei Stunden im Saal), externe Kurse für Fachfunktionen.
- **Nachweis**: Teilnehmerlisten, Schulungsplan, Qualifikationen – und der Blick ins Feld: Wird es angewendet?

### Bewusstsein
Fragen, die jede Person auf der Baustelle beantworten können sollte: Was kann bei meiner Arbeit die Umwelt schädigen? Was tue ich dagegen? Was mache ich, wenn etwas ausläuft? An wen wende ich mich?

### Kommunikation
- **Intern**: Umweltpunkt in Start- und Baustellensitzungen, Rückmeldung aus Begehungen, Information über Vorfälle und Lehren daraus, Meldeweg für Hinweise von Mitarbeitenden.
- **Extern**: Wer spricht mit Behörden, Bauherrschaften, Anwohnenden, Medien? Das Unternehmen legt fest, was, wann, an wen und durch wen kommuniziert wird – und stellt sicher, dass die Angaben stimmen.

### Dokumentierte Information
So viel wie nötig: aktuell, auffindbar, in der richtigen Fassung am richtigen Ort. Für die Baustelle heisst das: wenige, kurze, bildhafte Unterlagen. Nachweise (Protokolle, Berichte, Belege) werden geordnet abgelegt und nach Firmenregel aufbewahrt.

§> Sinngemäss nach ISO 14001:2015, Kapitel 7 (Ausgabe 2026 nicht verglichen).` },
      { id: 'm10-l3-explain-2', kind: 'explain', title: 'Betriebliche Steuerung und Notfallvorsorge', text: `### Steuerung im Bauablauf
Das System wirkt, wenn seine Vorgaben in den **normalen Arbeitsschritten** stecken:

| Phase | Steuerung | Instrument |
|---|---|---|
| Offerte | Umweltanforderungen erkennen und kalkulieren | Checkliste Offertprüfung |
| AVOR | Auflagen, Installationsplan, Massnahmenplan | Auflagenliste, Umweltmassnahmenplan (Modul 8) |
| Start | Instruktion, Zuständigkeiten | Startsitzung, Umweltkarte |
| Ausführung | Standards, Eigenkontrolle | Checklisten, Kontrollkonzept (Modul 9) |
| Einkauf, Subunternehmer | Anforderungen vereinbaren und überwachen | Vertragsbeilage, Instruktion, Kontrolle |
| Abschluss | Nachweise, Auswertung | Entsorgungsbilanz, Erfahrungsrückfluss |

### Ausgegliederte Prozesse und Lieferkette
Was Subunternehmer und Lieferanten für das Unternehmen tun, bleibt Teil seiner Umweltverantwortung im System: Anforderungen festlegen, mitteilen, Einhaltung überwachen. Art und Tiefe der Steuerung richten sich nach dem Risiko (ein Belagsbauer mit Tankanhänger braucht mehr als ein Gerüstbauer).

### Notfallvorsorge
1. **Mögliche Notfälle bestimmen**: Leckage von Treibstoff oder Öl, Austritt von Zement- oder Schlammwasser, Brand, Fund von Schadstoffen, Hochwasser auf der Baustelle.
2. **Reaktion planen**: Sofortmassnahmen, Alarmierung, Zuständigkeiten, Material (Bindemittel, Abdeckungen, Schachtblasen), Erreichbarkeit.
3. **Bekannt machen**: Notfallblatt an Tankstelle, Waschplatz, im Container – nicht auf Seite 87.
4. **Üben**: einfache Übungen (z. B. «Schlauch geplatzt – was jetzt?») und Kontrolle des Materials.
5. **Auswerten**: nach Übungen und nach echten Ereignissen – was hat funktioniert, was wird geändert?

§> Sinngemäss nach ISO 14001:2015, Kapitel 8 (Ausgabe 2026 nicht verglichen). Sofortmassnahmen und Alarmierung siehe Modul 2; gesetzliche Meldepflichten gelten unabhängig vom System.` },
      { id: 'm10-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Zehn Minuten am Waschplatz', context: 'Hochbau', text: `Statt einer jährlichen Saalschulung führt eine Hochbaufirma «Zehn-Minuten-Instruktionen» ein: Die Umweltbeauftragte kommt bei der ersten Betonage auf die Baustelle und zeigt der Equipe am Waschplatz, wohin das Wasser läuft, wie die Neutralisation funktioniert und was bei einem Überlauf zu tun ist. Die Teilnahme wird auf einer Liste festgehalten. Im nächsten Audit beantworten drei zufällig befragte Arbeiter die Frage nach dem Waschwasser ohne Zögern.

**Lernpunkt**: Schulung am Ort der Tätigkeit schafft Kompetenz und Bewusstsein in einem – und ist als Nachweis ebenso gültig.` },
      { id: 'm10-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Notfallübung mit Überraschung', context: 'Tiefbau', text: `Auf einer Strassenbaustelle am Bach spielt der Umweltbeauftragte mit dem Polier eine Übung durch: «Der Tankanhänger verliert Diesel.» Die Equipe reagiert rasch – bis jemand die Schachtblase holen will: Sie liegt im Werkhof. Das Notfallblatt nennt zudem eine Telefonnummer, die seit einem Jahr nicht mehr gilt. Beides wird am selben Tag behoben, die Lehre geht per Kurzmitteilung an alle Poliere der Firma.

**Lernpunkt**: Ein Notfallplan, der nie geübt wurde, ist eine Vermutung. Zehn Minuten Übung zeigen, was fehlt.` },
      { id: 'm10-l3-deep', kind: 'deep', title: 'Fachvertiefung: Das System in den Alltag bringen', text: `### 1. Prozesse statt Parallelwelt
Der häufigste Fehler ist ein Umweltmanagement **neben** dem Tagesgeschäft: eigene Formulare, eigene Sitzungen, eigener Ordner. Wirksam ist es, wenn die Umweltanforderungen in den Abläufen stecken, die ohnehin gelebt werden: in der Offertprüfung, der AVOR-Checkliste, dem Installationsplan, der Startsitzung, dem Wochenrapport, der Bestellung. Fragen Sie bei jeder neuen Vorgabe: In welchen bestehenden Schritt gehört sie?

### 2. Standards für wiederkehrende Risiken
Für die bedeutenden Aspekte lohnt sich je ein kurzer **Firmenstandard**: Baustellenabwasser, Betankung und Lagerung, Abfalltrennung, Boden, Staub und Lärm, Notfall. Ein guter Standard passt auf eine Seite, zeigt Bilder von «richtig» und «falsch», nennt die Mindestausrüstung und sagt, wer zuständig ist. Er unterscheidet klar zwischen **Pflicht** (Gesetz, Auflage) und **Firmenregel** – damit die Baustelle weiss, wo Abweichungen möglich sind und wer sie bewilligt.

### 3. Kompetenz ist mehr als Kursbesuch
Kompetent ist, wer es **kann und tut**. Prüfen Sie Kompetenz deshalb nicht nur über Listen, sondern im Feld: bei Begehungen, in Audits, mit kurzen Fragen. Planen Sie besonders für **neue Mitarbeitende, Temporäre und Subunternehmer** – dort liegen erfahrungsgemäss die meisten Lücken. Fremdsprachige Equipen brauchen Bilder und Vormachen statt Text.

### 4. Subunternehmer steuern
Vier Schritte: **auswählen** (Umweltkriterien bei der Vergabe, z. B. Maschinennachweise), **vereinbaren** (Vertragsbeilage, Modul 8), **instruieren** (vor Ort, bevor die Arbeit beginnt), **überwachen** (in die eigene Kontrolle einbeziehen, Feststellungen zurückmelden). Wiederholte Verstösse gehören in die Lieferantenbeurteilung und haben Folgen für künftige Aufträge.

### 5. Beschaffung
Mit dem Einkauf werden Umweltaspekte eingekauft: Maschinen (Emissionen, Lärm, Verbrauch), Hilfsstoffe (wassergefährdende Stoffe, Alternativen), Baustoffe (Recyclinganteil, Herkunft). Das System legt fest, wo Umweltkriterien verlangt werden und wer entscheidet, wenn sie mit Kosten oder Terminen kollidieren.

### 6. Notfälle: realistisch planen
Ein Notfallplan ist gut, wenn die erste Person vor Ort nach 30 Sekunden weiss, was sie tun soll: Eigenschutz, Quelle stoppen, Ausbreitung verhindern, alarmieren. Dafür braucht es Material am richtigen Ort und Nummern, die stimmen. Prüfen Sie das Material bei jeder Begehung mit; üben Sie mindestens dort, wo Gewässer oder Grundwasser nahe sind. Nach jedem Ereignis wird der Plan überprüft.

### 7. Niederlassungen und Abteilungen
In grösseren Unternehmen gilt ein System für mehrere Standorte. Bewährt hat sich: **einheitliche Grundsätze und Standards** zentral, **lokale Ergänzungen** (kantonale Vorgaben, Standortbewilligungen, örtliche Entsorgungswege) je Niederlassung, eine **Ansprechperson** pro Standort und ein regelmässiger Austausch. Unterschiede zwischen Hoch- und Tiefbau sind normal – die Grundlogik bleibt dieselbe.

### 8. Dokumentierte Information lenken
Achten Sie auf drei Dinge: Es gibt **eine gültige Fassung** (keine alten Checklisten in Umlauf), sie ist **dort verfügbar, wo gearbeitet wird**, und **Nachweise** sind geordnet abgelegt und geschützt (Zugriff, Aufbewahrung, Datenschutz – siehe Modul 9).

§> Sinngemäss nach ISO 14001:2015, Kapitel 7 und 8; kein Normtext, Ausgabe 2026 nicht verglichen.` },
      { id: 'm10-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm10-q13' },
      { id: 'm10-l3-abw', kind: 'decision', title: 'Abwägung: Wie schulen?', questionId: 'm10-d03' },
      { id: 'm10-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Notfallvorsorge für eine Baustelle am Bach', taskId: 'm10-t3' },
      { id: 'm10-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m10-q14', 'm10-q15'] },
      { id: 'm10-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm10-p3' },
      { id: 'm10-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Kompetenz = können und tun; Nachweis über Listen und über den Blick ins Feld.',
        'Vorgaben gehören in die bestehenden Arbeitsschritte, nicht in eine Parallelwelt.',
        'Subunternehmer: auswählen, vereinbaren, instruieren, überwachen.',
        'Notfallvorsorge: bestimmen, planen, bekannt machen, üben, auswerten.',
        'Kurze Standards am Ort der Arbeit; eine gültige Fassung.',
      ] },
      { id: 'm10-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'kvu-lagerung', 'notruf', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm10-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Interne Audits und Zertifizierung',
    topics: ['m10-audit'],
    objectives: [
      'Ein internes Audit planen, durchführen und berichten',
      'Auditnachweise sachlich erheben und Feststellungen einstufen',
      'Den Ablauf einer Zertifizierung und den Umgang mit Abweichungen erklären',
    ],
    steps: [
      { id: 'm10-l4-situation', kind: 'situation', title: 'Einstieg: «Zeigen Sie mir das bitte»', text: `Überwachungsaudit. Die externe Auditorin sagt freundlich: «Sie schreiben, dass jede Baustelle mit bedeutenden Umweltaspekten mindestens einmal pro Quartal begangen wird. Zeigen Sie mir bitte die Berichte der Baustelle Bahnhofstrasse vom letzten Jahr.» Sie finden zwei Berichte. Es hätten vier sein müssen. Ein Kollege flüstert: «Die anderen zwei schreibe ich dir bis nach dem Mittag.»

Was tun Sie?` },
      { id: 'm10-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m10-q16', 'm10-q17'] },
      { id: 'm10-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Audit** prüft systematisch und unabhängig, ob das Managementsystem die eigenen Vorgaben und die Norm erfüllt – und ob es **wirksam** ist.

**Internes Audit**: vom Unternehmen selbst organisiert, nach einem **Auditprogramm**. Auditoren prüfen **nicht ihre eigene Arbeit**.

**Zertifizierungsaudit**: durch eine akkreditierte Zertifizierungsstelle; danach in der Regel jährliche Überwachungsaudits und nach drei Jahren die Rezertifizierung.

**Auditnachweise** sind überprüfbare Tatsachen: Dokumente, Aufzeichnungen, Beobachtungen, Aussagen. Bewertet wird das **System**, nicht die Person.

**Nachweise werden nie nachträglich hergestellt.** Eine ehrliche Lücke ist eine Abweichung – ein gefälschter Nachweis zerstört das Vertrauen in das ganze System.` },
      { id: 'm10-l4-explain', kind: 'explain', title: 'Das interne Audit', text: `### Auditprogramm (über das Jahr bzw. den Zyklus)
Legt fest: Was wird wann auditiert, durch wen, mit welchem Schwerpunkt? Es berücksichtigt die **Umweltbedeutung** der Bereiche, **Änderungen** und die **Ergebnisse früherer Audits**. Für eine Baufirma heisst das: Baustellen mit hohen Risiken und neue Abläufe häufiger, Verwaltung seltener.

### Ablauf eines Audits

| Schritt | Inhalt |
|---|---|
| Planen | Ziel, Umfang, Kriterien (Norm, eigene Vorgaben, Auflagen); Auditplan mit Zeiten und Gesprächspartnern; Unterlagen sichten |
| Eröffnen | Zweck erklären: Es geht um das System, nicht um Schuld |
| Erheben | Befragen, beobachten, Unterlagen und Aufzeichnungen einsehen – **auf der Baustelle**, nicht nur im Büro |
| Bewerten | Nachweise mit den Kriterien vergleichen; Feststellungen formulieren |
| Abschliessen | Feststellungen vor Ort besprechen, Einverständnis über die Fakten herstellen |
| Berichten | Kurzer Bericht: Umfang, Feststellungen, Stärken, Verbesserungspotenzial |
| Nachverfolgen | Korrekturen und Korrekturmassnahmen, Wirksamkeit prüfen (Modul 9) |

### Feststellungen einstufen
Üblich sind **Abweichung** (Anforderung nicht erfüllt; oft unterteilt in schwerwiegend und geringfügig), **Verbesserungspotenzial** und **positive Feststellung**. Die Bezeichnungen legt die Firma bzw. die Zertifizierungsstelle fest.

### Audit und Begehung
Eine **Begehung** (Modul 9) fragt: Ist diese Baustelle in Ordnung? Ein **Audit** fragt: Funktioniert das System, das dafür sorgen soll? Ein offener Schacht ist in der Begehung ein Mangel der Baustelle – im Audit ein Hinweis darauf, dass AVOR, Instruktion oder Kontrolle nicht greifen.

§> Sinngemäss nach ISO 14001:2015, Abschnitt 9.2, und dem Leitfaden ISO 19011 (Auditierung von Managementsystemen); kein Normtext, Ausgaben nicht geprüft.` },
      { id: 'm10-l4-explain-2', kind: 'explain', title: 'Zertifizierung und Umgang mit Abweichungen', text: `### Ablauf (üblich)
- **Zertifizierungsaudit** in zwei Stufen: zuerst Bereitschaft und Dokumentation, dann die Umsetzung im Betrieb – mit Stichproben auf Baustellen.
- **Überwachungsaudits**, in der Regel jährlich.
- **Rezertifizierung** nach drei Jahren.
- Bei mehreren Standorten prüft die Zertifizierungsstelle nach ihren Regeln eine **Stichprobe** der Standorte.

### Verhalten im Audit
- **Ehrlich und sachlich** antworten. «Das weiss ich nicht, ich kläre es» ist eine gute Antwort.
- Nur zeigen, was es gibt. **Nichts nachträglich erstellen, rückdatieren oder ergänzen.**
- Baustellen nicht «aufräumen» lassen, um einen falschen Eindruck zu erzeugen – ordentliche Vorbereitung ist in Ordnung, Kulissen sind es nicht.
- Mitarbeitende vorbereiten, indem man ihnen erklärt, **worum es geht**, nicht indem man Antworten einübt.

### Wenn eine Abweichung festgestellt wird
1. Fakten anerkennen bzw. sachlich klären.
2. **Korrektur**: den konkreten Mangel beheben.
3. **Ursache** ermitteln.
4. **Korrekturmassnahme**: Ursache beseitigen; prüfen, ob dasselbe andernorts vorkommt.
5. **Wirksamkeit** prüfen.
6. Fristgerecht an die Zertifizierungsstelle berichten (bei externen Audits).
Schwerwiegende Abweichungen können die Erteilung oder Aufrechterhaltung des Zertifikats gefährden, bis sie behoben sind.

!> Ein nachträglich hergestellter oder rückdatierter Nachweis ist eine Täuschung. Sie gefährdet das Zertifikat, die Glaubwürdigkeit der Firma und kann für die Beteiligten persönliche Folgen haben. Die Lücke offenzulegen ist immer der bessere Weg.

§> Ablauf der Zertifizierung sinngemäss nach der üblichen Praxis akkreditierter Zertifizierungsstellen; die Regelwerke (z. B. zur Stichprobe bei mehreren Standorten) wurden nicht geprüft. Massgebend sind der Vertrag und die Regeln Ihrer Zertifizierungsstelle.` },
      { id: 'm10-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Audit auf dem Gerüst', context: 'Hochbau', text: `Der interne Auditor (ein Bauführer aus einer anderen Abteilung) beginnt das Audit nicht im Büro, sondern auf der Baustelle. Er lässt sich vom Polier zeigen, wie die Abfalltrennung organisiert ist, fragt zwei Arbeiter nach dem Vorgehen bei einem Ölverlust und verfolgt dann eine Auflage aus der Bewilligung rückwärts: Steht sie in der Auflagenliste? Im Massnahmenplan? Wurde sie kontrolliert? Er findet die Auflage in der Bewilligung, aber nicht in der Liste – und dieselbe Lücke bei einem zweiten Projekt.

**Lernpunkt**: Einem Faden zu folgen (von der Anforderung bis zum Nachweis) zeigt mehr als das Abhaken einer Dokumentenliste.` },
      { id: 'm10-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die offene Antwort', context: 'Tiefbau', text: `Im Fall aus dem Einstieg sagt die Umweltbeauftragte: «Es gibt zwei Berichte. Zwei Begehungen haben nicht stattgefunden – ich war im dritten und vierten Quartal mit zwei Grossbaustellen ausgelastet.» Die Auditorin notiert eine geringfügige Abweichung. In der Ursachenanalyse zeigt sich: Der Begehungsrhythmus hängt an einer einzigen Person. Die Firma bildet zwei Bauführer als interne Begeher aus und verteilt die Baustellen. Im nächsten Audit wird die Massnahme als wirksam bestätigt.

**Lernpunkt**: Die ehrliche Lücke wurde zum Anlass für eine echte Verbesserung. Zwei nachträglich geschriebene Berichte hätten das Problem verdeckt – und das Vertrauen zerstört, wenn es aufgeflogen wäre.` },
      { id: 'm10-l4-deep', kind: 'deep', title: 'Fachvertiefung: Auditieren mit Wirkung', text: `### 1. Wozu interne Audits wirklich da sind
Nicht für das Zertifikat, sondern für die Geschäftsleitung: Sie sind ihr eigener Blick auf die Frage, ob das System tut, was es soll. Ein internes Audit, das nur «keine Feststellungen» meldet, ist entweder das Zeichen eines perfekten Systems – oder eines Audits, das nicht genau hingeschaut hat. Erfahrungsgemäss meist das zweite.

### 2. Unabhängigkeit praktisch lösen
Auditoren sollen objektiv und unparteilich sein und nicht die eigene Tätigkeit prüfen. In mittleren Firmen gelingt das mit **Kreuzaudits**: Der Bauführer Hochbau auditiert den Tiefbau und umgekehrt; die Umweltbeauftragte auditiert nicht das von ihr selbst geführte Umweltmanagement – dafür kommt eine Kollegin aus Qualität oder Arbeitssicherheit oder eine externe Person. Wichtig ist eine kurze Ausbildung der Auditoren: fragen, zuhören, Nachweise beurteilen, Feststellungen formulieren.

### 3. Fragetechnik
- **Offene Fragen**: «Wie gehen Sie vor, wenn …?», «Zeigen Sie mir …», «Woher wissen Sie, dass …?»
- **Dem Faden folgen**: von einer Anforderung (Auflage, Ziel, Standard) über die Umsetzung bis zum Nachweis – oder umgekehrt von einem Ereignis zurück zur Planung.
- **Stichproben** bewusst wählen: riskante Tätigkeiten, neue Mitarbeitende, Subunternehmer, Randzeiten.
- **Zuhören**: Die wertvollsten Hinweise kommen oft nebenbei («Eigentlich sollten wir, aber …»).

### 4. Nachweise beurteilen
Ein Nachweis ist stark, wenn er **überprüfbar** ist (Dokument mit Datum, Beobachtung vor Ort, übereinstimmende Aussagen). Eine einzelne Aussage ohne Beleg ist ein Hinweis, dem nachzugehen ist. Halten Sie fest, **was** Sie gesehen haben (welche Baustelle, welches Dokument, welches Datum), damit die Feststellung nachvollziehbar ist.

### 5. Feststellungen formulieren
Drei Teile: **Anforderung** (woran wird gemessen?), **Nachweis** (was wurde festgestellt?), **Bewertung** (Abweichung, Potenzial, Stärke). Beispiel: «Gemäss Verfahren Begehungen wird jede Baustelle mit bedeutenden Aspekten vierteljährlich begangen. Für die Baustelle Bahnhofstrasse liegen für das letzte Jahr zwei Berichte vor (Q1, Q2). Abweichung.» Keine Namen, keine Schuldzuweisung.

### 6. System, nicht Person
Hinter fast jeder Abweichung steht eine Schwäche im System: unklare Zuständigkeit, fehlende Mittel, unrealistische Vorgabe, fehlende Schulung. Wenn eine Vorgabe auf den meisten Baustellen nicht eingehalten wird, ist die Frage nicht «Wer ist schuld?», sondern «Ist die Vorgabe richtig – und wenn ja, warum kann sie nicht eingehalten werden?». Manchmal ist die richtige Korrekturmassnahme, eine unrealistische Vorgabe zu ändern.

### 7. Umgang mit externen Audits
Die Zertifizierungsstelle ist kein Gegner, aber auch keine Beraterin. Sie stellt fest, ob Anforderungen erfüllt sind. Legen Sie offen, was Sie selbst gefunden haben (interne Audits, Vorfälle) und was Sie daraus gemacht haben – ein System, das seine Schwächen kennt und bearbeitet, wirkt stärker als eines, das makellos scheint. Über Feststellungen, die Sie für sachlich falsch halten, darf man sprechen; über Fakten nicht hinwegtäuschen.

### 8. Integrität
Der Druck, im Audit «gut dazustehen», ist real. Trotzdem: keine rückdatierten Protokolle, keine nachträglich ausgefüllten Checklisten, keine instruierten Falschaussagen. Wenn Sie dazu aufgefordert werden, lehnen Sie ab und sprechen es bei Ihrer vorgesetzten Stelle an. Ihre Glaubwürdigkeit ist das wichtigste Arbeitsmittel in dieser Funktion – und sie lässt sich nur einmal verlieren.

§> Sinngemäss nach ISO 14001:2015 (9.2, 10.2) und ISO 19011; kein Normtext. Einstufung und Fristen bei Abweichungen richten sich nach den Regeln der Zertifizierungsstelle.` },
      { id: 'm10-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm10-q18' },
      { id: 'm10-l4-abw', kind: 'decision', title: 'Abwägung: Die fehlenden Berichte', questionId: 'm10-d04' },
      { id: 'm10-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Auditplan für eine Baustelle', taskId: 'm10-t4' },
      { id: 'm10-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m10-q19', 'm10-q20'] },
      { id: 'm10-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm10-p4' },
      { id: 'm10-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem Polier (Feynman-Methode)', feynmanId: 'm10-f1' },
      { id: 'm10-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Audit prüft das System und seine Wirksamkeit – nicht die Person.',
        'Auditprogramm nach Umweltbedeutung, Änderungen und früheren Ergebnissen; Auditoren prüfen nicht die eigene Arbeit.',
        'Auf der Baustelle auditieren und einem Faden von der Anforderung zum Nachweis folgen.',
        'Feststellung = Anforderung, Nachweis, Bewertung.',
        'Nachweise nie nachträglich herstellen; Lücken offenlegen und Ursache beseitigen.',
      ] },
      { id: 'm10-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'iso19011', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm10-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Bewerten und verbessern: Kennzahlen, Managementbewertung, integriertes System',
    topics: ['m10-verbesserung'],
    objectives: [
      'Sinnvolle Umweltkennzahlen für eine Bauunternehmung auswählen',
      'Die Einhaltung der bindenden Verpflichtungen bewerten und eine Managementbewertung vorbereiten',
      'Umwelt-, Qualitäts- und Arbeitssicherheitsmanagement sinnvoll verbinden – auch über Niederlassungen hinweg',
    ],
    steps: [
      { id: 'm10-l5-situation', kind: 'situation', title: 'Einstieg: Zwanzig Folien, keine Entscheidung', text: `Managementbewertung. Sie präsentieren zwanzig Folien: Stromverbrauch der Büros, Papier, Anzahl Schulungen, 31 Kennzahlen. Nach einer Stunde sagt der Geschäftsführer: «Danke. Und was sollen wir jetzt entscheiden?» Sie haben keine Antwort vorbereitet.

Wie müsste diese Stunde aussehen, damit sie etwas bewirkt?` },
      { id: 'm10-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m10-q21', 'm10-q22'] },
      { id: 'm10-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Überwachen und messen**: Das Unternehmen legt fest, **was** es überwacht, **wie**, **wann** und wie es die Ergebnisse auswertet – ausgerichtet auf bedeutende Aspekte, Verpflichtungen und Ziele.

**Bewertung der Einhaltung**: Regelmässig wird geprüft, ob die bindenden Verpflichtungen erfüllt sind – und das Unternehmen kennt seinen Stand.

**Managementbewertung**: Die oberste Leitung beurteilt in geplanten Abständen, ob das System geeignet, angemessen und wirksam ist – und **entscheidet** über Verbesserungen, Änderungen und Mittel.

**Fortlaufende Verbesserung**: aus Feststellungen, Ereignissen, Kennzahlen und Ideen wird das System schrittweise besser.

**Integriertes Managementsystem**: Qualität, Umwelt und Arbeitssicherheit teilen Aufbau und Abläufe – ein System statt drei.` },
      { id: 'm10-l5-explain', kind: 'explain', title: 'Kennzahlen und Bewertung der Einhaltung', text: `### Gute Kennzahlen
Eine Kennzahl ist gut, wenn sie **eine Entscheidung stützt**, **beeinflussbar** ist, **mit vertretbarem Aufwand** erhoben wird und **verstanden** wird. Unterscheiden Sie:
- **Ergebnis-Kennzahlen** (was ist geschehen?): Anzahl Umweltereignisse, Anteil verwerteter Bauabfälle, Treibstoffverbrauch je Maschinenstunde, CO₂-Emissionen der eigenen Flotte.
- **Früh-Kennzahlen** (wie gut steuern wir?): Anteil Baustellen mit Auflagenliste vor Baustart, Anteil fristgerecht erledigter Massnahmen aus Begehungen, Anteil instruierter Subunternehmer, durchgeführte Begehungen gegenüber Plan.

Für die Steuerung sind Früh-Kennzahlen oft wertvoller: Sie zeigen Schwächen, bevor etwas passiert.

### Vorsicht bei Vergleichen
Baustellen sind verschieden. Absolute Zahlen (Tonnen Abfall, Liter Diesel) sagen wenig ohne Bezug (Bausumme, Maschinenstunden, Bauart). Und: Eine Kennzahl «Anzahl gemeldeter Ereignisse» sinkt auch dann, wenn nur weniger gemeldet wird. Belohnen Sie das Melden, nicht die Null.

### Bewertung der Einhaltung
Das Unternehmen legt fest, wie oft und wie es prüft, ob die bindenden Verpflichtungen erfüllt sind. Quellen: Begehungs- und Auditergebnisse, Auflagenlisten und Massnahmenpläne der Projekte, Behördenkontrollen und Verfügungen, Ereignisse, Prüfung der Standortbewilligungen. Ergebnis ist eine ehrliche Aussage: Wo erfüllen wir, wo nicht, was tun wir dagegen?

§> Sinngemäss nach ISO 14001:2015, Abschnitte 9.1.1 und 9.1.2 (Ausgabe 2026 nicht verglichen). Die Bewertung der Einhaltung ist eine interne Beurteilung und kein behördlicher Nachweis der Rechtskonformität.` },
      { id: 'm10-l5-explain-2', kind: 'explain', title: 'Managementbewertung und integriertes System', text: `### Managementbewertung: Eingaben
- Stand der Massnahmen aus der letzten Bewertung
- Änderungen: Recht, Erwartungen interessierter Parteien, bedeutende Aspekte, Risiken und Chancen
- Zielerreichung
- Umweltleistung: Ereignisse und Abweichungen mit Korrekturmassnahmen, Kennzahlen, Einhaltung der Verpflichtungen, Auditergebnisse
- Angemessenheit der Mittel
- Rückmeldungen und Beschwerden
- Möglichkeiten zur Verbesserung

### Ergebnisse
Schlussfolgerungen zur Eignung und Wirksamkeit des Systems und **Entscheide**: Verbesserungen, Änderungen am System, Mittel, Massnahmen bei verfehlten Zielen, Folgerungen für die strategische Ausrichtung. Die Ergebnisse werden festgehalten.

### So wird sie wirksam
Bereiten Sie **Entscheidungsvorlagen** vor statt Datensammlungen: «Lage – Bewertung – Antrag». Drei bis fünf Themen, je mit Varianten, Kosten und Empfehlung (Modul 12).

### Integriertes Managementsystem (IMS)
ISO 9001, ISO 14001 und ISO 45001 haben dieselbe Grundstruktur. Gemeinsam nutzbar sind: Kontext und interessierte Parteien, Politik und Ziele, Rollen, Kompetenz und Schulung, dokumentierte Information, Lieferantensteuerung, interne Audits, Korrekturmassnahmen, Managementbewertung. Fachspezifisch bleiben: Umweltaspekte bzw. Gefährdungsermittlung, die jeweiligen Rechtsgebiete, Notfallthemen. Auf der Baustelle ist die Integration ohnehin gelebte Praxis: **eine** Startsitzung, **eine** Begehung mit Blick auf Sicherheit und Umwelt, **eine** Massnahmenliste.

§> Sinngemäss nach ISO 14001:2015, Abschnitte 9.3 und 10.3, sowie der gemeinsamen Grundstruktur der Managementsystem-Normen; kein Normtext, aktuelle Ausgaben von ISO 9001 und ISO 45001 nicht geprüft.` },
      { id: 'm10-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Drei Anträge statt zwanzig Folien', context: 'Hochbau', text: `Im folgenden Jahr bringt die Umweltbeauftragte drei Seiten in die Managementbewertung. Erstens: Sieben von zwölf Baustellen hatten offene Schachtabdeckungen – Antrag: Standard-Abdeckungen beschaffen und Punkt in die AVOR-Checkliste (Kosten, Wirkung, Verantwortung). Zweitens: Nur 60 % der Subunternehmer wurden vor Arbeitsbeginn instruiert – Antrag: Instruktion als Bedingung für den Baustellenzutritt. Drittens: Ziel Abfalltrennung erreicht – Antrag: neues Ziel zu Recyclingbeton. Die Geschäftsleitung entscheidet in vierzig Minuten über alle drei.

**Lernpunkt**: Die Managementbewertung ist eine Entscheidungssitzung. Wer Anträge bringt, erhält Entscheide.` },
      { id: 'm10-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Drei Niederlassungen, ein System', context: 'Tiefbau', text: `Eine Tiefbaugruppe hat Niederlassungen in drei Kantonen. Jede hatte eigene Checklisten und eigene Kennzahlen; ein Vergleich war nicht möglich. Die Gruppe einigt sich auf sechs gemeinsame Standards, fünf gemeinsame Kennzahlen und eine Ansprechperson Umwelt je Niederlassung. Kantonale Besonderheiten (Merkblätter, Entsorgungswege, Meldestellen) stehen in einem kurzen lokalen Anhang. Die drei Ansprechpersonen auditieren sich gegenseitig und tauschen viermal im Jahr Feststellungen aus.

**Lernpunkt**: Einheitlich in den Grundsätzen, lokal in den Details – und der Austausch zwischen den Standorten ist die günstigste Verbesserungsquelle.` },
      { id: 'm10-l5-deep', kind: 'deep', title: 'Fachvertiefung: Vom Messen zum Verbessern', text: `### 1. Wenige Kennzahlen, die gelesen werden
Ein bewährter Satz für eine Bauunternehmung umfasst fünf bis acht Kennzahlen, z. B.: Umweltereignisse (mit Einstufung), Anteil Baustellen mit Auflagenliste und Massnahmenplan vor Baustart, durchgeführte Begehungen gegenüber Plan, Anteil fristgerecht und wirksam abgeschlossener Massnahmen, Anteil getrennt erfasster bzw. verwerteter Bauabfälle, Treibstoffverbrauch bzw. CO₂ der Maschinen und Fahrzeuge, Anteil Maschinen mit aktuellem Emissionsnachweis. Jede Kennzahl hat eine verantwortliche Funktion, eine Datenquelle und einen Rhythmus. Was niemand ansieht, wird gestrichen.

### 2. Zahlen ehrlich lesen
- **Trend vor Einzelwert**: Ein Quartal sagt wenig, drei Jahre viel.
- **Bezugsgrösse** angeben.
- **Meldekultur** mitdenken: Mehr gemeldete Beinahe-Ereignisse können ein gutes Zeichen sein.
- **Datenqualität** benennen: Woher kommt die Zahl, wie sicher ist sie? Eine geschätzte Zahl wird als Schätzung ausgewiesen.

### 3. Einhaltung bewerten – ohne sich etwas vorzumachen
Die Bewertung der Einhaltung ist der Moment der Ehrlichkeit. Ein Vorgehen, das funktioniert: einmal jährlich die Verpflichtungen der Unternehmens- und Standortebene durchgehen (Rechtskataster, Bewilligungen), dazu die Ergebnisse aus Projekten zusammenziehen (Begehungen, Behördenkontrollen, Ereignisse). Für jede festgestellte Nichteinhaltung gibt es eine Massnahme. Die Aussage «Wir halten alles ein» ohne diese Grundlage ist eine Behauptung – und im Ernstfall belastend.

### 4. Die Managementbewertung vorbereiten
Vier Wochen vorher: Daten zusammenstellen, mit den Bereichsleitungen vorbesprechen, Anträge formulieren. In der Sitzung: kurzer Überblick (eine Seite), dann die Anträge. Danach: Entscheide mit Verantwortlichen und Terminen festhalten und im Unternehmen bekannt machen. Die Bewertung kann mit jener für Qualität und Arbeitssicherheit zusammengelegt werden – das spart Zeit und zeigt Zusammenhänge.

### 5. Fortlaufende Verbesserung
Verbesserung muss nicht spektakulär sein. Sie entsteht aus vielen kleinen Schritten: einer besseren Checkliste, einer Standard-Ausrüstung, einem geänderten Ablauf nach einem Vorfall. Wichtig ist, dass Ideen aus der Praxis einen Weg ins System finden (Rückmeldung nach Projekten, Vorschläge von Polieren) und dass Gelerntes **alle** Baustellen erreicht.

### 6. Integration: Chancen und Grenzen
Ein integriertes System spart Doppelspurigkeiten und passt zur Realität der Baustelle. Achten Sie aber darauf, dass kein Thema untergeht: In vielen Firmen dominiert die Arbeitssicherheit (mit gutem Grund), und die Umwelt wird zum Anhängsel. Sichern Sie für die Umweltthemen eigene Kontrollpunkte in gemeinsamen Checklisten, eigene Ziele und einen festen Platz in der Managementbewertung. Zielkonflikte (z. B. Staubbindung mit Wasser gegen Abwasseranfall) werden offen benannt und gelöst.

### 7. Grosse Unternehmen und Niederlassungen
Je grösser die Organisation, desto wichtiger sind klare Ebenen: Was regelt die Gruppe (Politik, Standards, Kennzahlen, Auditprogramm)? Was die Niederlassung (lokale Verpflichtungen, Umsetzung, Schulung)? Was das Projekt (Auflagen, Massnahmenplan)? Die Umweltfunktion der Gruppe führt **fachlich** – die Linie der Niederlassung führt **disziplinarisch**. Dieses Zusammenspiel braucht regelmässigen Austausch und die Rückendeckung der Geschäftsleitung (Modul 12).

### 8. Das System schlank halten
Jedes Jahr eine Frage an das eigene System: Was können wir weglassen? Formulare, die niemand auswertet; Kennzahlen, die nichts auslösen; Vorgaben, die niemand einhalten kann. Ein schlankes System, das gelebt wird, ist jedem umfangreichen System überlegen, das nur für das Audit existiert.

§> Sinngemäss nach ISO 14001:2015, Kapitel 9 und 10; kein Normtext. Die Beispiele für Kennzahlen sind Vorschläge ohne Richtwerte.` },
      { id: 'm10-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm10-q23' },
      { id: 'm10-l5-abw', kind: 'decision', title: 'Abwägung: Welche Kennzahl?', questionId: 'm10-d05' },
      { id: 'm10-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Vorlage für die Managementbewertung', taskId: 'm10-t5' },
      { id: 'm10-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m10-q24', 'm10-q25'] },
      { id: 'm10-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm10-p5' },
      { id: 'm10-l5-feynman', kind: 'feynman', title: 'Erklären Sie es der Geschäftsleitung (Feynman-Methode)', feynmanId: 'm10-f2' },
      { id: 'm10-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Kennzahlen: wenige, beeinflussbar, mit Bezug – Früh-Kennzahlen zeigen Schwächen vor dem Ereignis.',
        'Bewertung der Einhaltung: ehrliche interne Standortbestimmung mit Massnahmen.',
        'Managementbewertung ist eine Entscheidungssitzung: Lage – Bewertung – Antrag.',
        'Integriertes System: gemeinsame Abläufe, eigene Kontrollpunkte für die Umwelt.',
        'Einheitlich in den Grundsätzen, lokal in den Details; das System schlank halten.',
      ] },
      { id: 'm10-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'iso9001', 'iso45001', 'praxis'] },
    ],
  },
];
