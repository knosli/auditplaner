import type { Lesson } from '../types';

const M = 'm1';
const E = 'entwurf' as const;

export const M1_LESSONS_2: Lesson[] = [
  // =====================================================================
  {
    id: 'm1-l4', moduleId: M, level: 2, order: 4, review: E, minutes: 15,
    title: 'Natur, Landschaft und Wald auf der Baustelle',
    topics: ['m1-natur'],
    objectives: [
      'Schutz von Biotopen, Ufervegetation und Wald in den Grundzügen erklären',
      'Erkennen, wann vor Baubeginn eine Bewilligung oder Fachabklärung nötig ist',
      'Typische Konflikte auf Installationsplätzen, Zufahrten und Depots vermeiden',
    ],
    steps: [
      { id: 'm1-l4-situation', kind: 'situation', title: 'Einstieg: «Die Büsche stören nur»', text: `Für eine Werkleitung entlang eines Bachs braucht es eine Zufahrt für den Bagger. Am Ufer stehen Erlen und Weiden. Der Polier will sie am Montag schneiden: «Das wächst wieder nach, und der Bauherr hat das Land.»

Darf er das? Und was müssen Sie wissen, bevor Sie antworten?` },
      { id: 'm1-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m1-q17', 'm1-q18'] },
      { id: 'm1-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ufervegetation darf weder gerodet noch überschüttet noch anders zum Absterben gebracht werden** – Ausnahmen gibt es nur mit Bewilligung (Art. 21/22 NHG).

**Wald darf nicht ohne Bewilligung gerodet werden** – auch nicht vorübergehend für eine Baustelle.

**Biotope und Inventarobjekte** (z. B. Auen, Moore, Trockenwiesen, BLN) sind besonders geschützt; Eingriffe brauchen Abklärung und oft Ersatzmassnahmen.

**Vor jedem Eingriff in Gehölze, Uferbereiche oder Wiesen am Rand der Baustelle**: Pläne und kantonale Karten prüfen, im Zweifel die Fachstelle fragen.` },
      { id: 'm1-l4-explain', kind: 'explain', title: 'Was geschützt ist', text: `### Natur- und Heimatschutzgesetz (NHG)
- **Biotope** (Art. 18 NHG, sinngemäss): Das Aussterben einheimischer Tier- und Pflanzenarten ist durch die Erhaltung genügend grosser Lebensräume zu verhindern. Besonders zu schützen sind u. a. Uferbereiche, Riedgebiete, Moore, Hecken, Feldgehölze und Trockenrasen. Lassen sich Eingriffe nicht vermeiden, sind Schutz-, Wiederherstellungs- oder Ersatzmassnahmen zu treffen.
- **Ufervegetation** (Art. 21 NHG): Sie darf weder gerodet noch überschüttet noch auf andere Weise zum Absterben gebracht werden (bestätigt). Ausnahmen sind nur für standortgebundene Vorhaben mit Bewilligung möglich (Art. 22 Abs. 2 NHG, bestätigt). Das Bundesgericht hat entschieden, dass Wald am Ufer zugleich als Ufervegetation gilt.
- **Inventare des Bundes**: Landschaften und Naturdenkmäler (BLN), Auen, Hoch- und Flachmoore, Amphibienlaichgebiete, Trockenwiesen. Sie sind auf den Geoportalen von Bund und Kantonen ersichtlich.

### Waldgesetz (WaG)
Rodungen – also die dauernde oder vorübergehende Zweckentfremdung von Waldboden – sind grundsätzlich verboten; Ausnahmen brauchen eine Rodungsbewilligung mit Ersatzpflicht (sinngemäss). **Auch eine temporäre Installation oder Zufahrt im Wald ist eine Rodung.** Was Wald ist, bestimmt nicht der Plan des Bauherrn, sondern die Bestockung vor Ort und das kantonale Recht.

§> NHG Art. 21/22 bestätigt (u. a. BGE 130 II 313, kantonale Unterlagen); Art. 18 NHG und WaG sinngemäss – Wortlaut prüfen.` },
      { id: 'm1-l4-explain-2', kind: 'explain', title: 'Weitere Themen am Rand der Baustelle', text: `### Gewässerraum und Fischerei
Siehe Modul 2: Im Gewässerraum sind Anlagen stark eingeschränkt (Art. 41c GSchV); Eingriffe in Gewässer, Ufer und Gewässergrund brauchen eine fischereirechtliche Bewilligung (Art. 8 BGF).

### Brutzeit
Viele Kantone und Gemeinden schränken das Schneiden von Hecken und Gehölzen während der Brut- und Setzzeit ein. Die Regeln sind kantonal – fragen Sie nach, bevor Sie im Frühling Gehölze entfernen.

### Invasive gebietsfremde Pflanzen (Neophyten)
Aushub mit Wurzeln oder Samen invasiver Pflanzen (z. B. Japanischer Knöterich) kann die Pflanzen weiterverbreiten. Für den Umgang gibt es bundesrechtliche Sorgfaltspflichten und kantonale Merkblätter (Freisetzungsverordnung; Details nicht selbst geprüft). Belastetes Material wird gesondert behandelt und entsorgt.

### Landschaft und Ortsbild
Installationen, Depots und Zufahrten sind vorübergehend, können aber Spuren hinterlassen (Verdichtung, Bodenverlust, Schäden an Gehölzen). Gute Praxis: vor Baubeginn Zustand dokumentieren (Fotos), Schutzzäune um zu erhaltende Bäume, Wurzelbereich nicht befahren, Wiederherstellung planen.

!> Eingriffe in geschützte Natur sind nicht «rückgängig» zu machen – und oft strafbar. Im Zweifel vor dem Eingriff klären.` },
      { id: 'm1-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Bäume auf dem Nachbargrundstück', context: 'Hochbau', text: `Neubau eines Wohnhauses; am Rand der Parzelle stehen zwei alte Linden, deren Wurzelbereich auf die Baustelle reicht. Die Baubewilligung verlangt ihren Erhalt. Der Kran soll genau dort stehen.

Die AVOR verschiebt den Kranstandort, stellt einen Schutzzaun im Abstand der Krone auf und legt eine Baupiste mit Lastverteilplatten, wo Fahrzeuge den Wurzelbereich queren müssen. Eine Baumpflegefachperson begleitet den Aushub nahe der Wurzeln.

**Lernpunkt**: Schutzauflagen für Bäume betreffen Kran, Lager, Zufahrt und Aushub – sie gehören in den Installationsplan.` },
      { id: 'm1-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Leitung am Bach', context: 'Tiefbau', text: `Für eine Werkleitung entlang eines Bachs braucht der Bagger eine Zufahrt durch die Ufervegetation. Die Bauherrschaft klärt vor Baubeginn mit dem Kanton: Die Leitung ist standortgebunden, eine Ausnahmebewilligung nach Art. 22 NHG wird erteilt – mit Auflagen: Schnitt nur ausserhalb der Brutzeit, so schmal wie möglich, Wurzelstöcke belassen, Wiederbepflanzung mit einheimischen Arten, fischereirechtliche Bewilligung für die Bachquerung.

**Lernpunkt**: Die Bewilligung ist möglich, aber sie braucht Zeit und bestimmt den Bauablauf (Brutzeit, Schonzeit).` },
      { id: 'm1-l4-deep', kind: 'deep', title: 'Fachvertiefung: Naturschutz in Planung und Ausführung', text: `### 1. Vor Baubeginn: was zu prüfen ist
- **Geoportale** von Bund und Kanton: Inventare (BLN, Auen, Moore, Trockenwiesen, Amphibien), Gewässerraum, Waldgrenzen, Naturschutzzonen der Gemeinde.
- **Baubewilligung**: Auflagen zu Bäumen, Hecken, Ufer, Ersatzpflanzungen.
- **Begehung**: Was steht tatsächlich am Rand der Baustelle (Gehölze, Feuchtstellen, Hecken)? Was ist im Plan nicht eingezeichnet?
- **Zeitfenster**: Brutzeit, Schonzeiten der Fische, Amphibienwanderung – sie können Arbeiten im Frühling blockieren.

### 2. Schützen, wiederherstellen, ersetzen
Das NHG kennt eine Reihenfolge: Eingriffe vermeiden, wenn nicht möglich minimieren, Wiederherstellung, und wo das nicht geht, angemessener Ersatz (Art. 18 Abs. 1ter NHG, sinngemäss). Für die Ausführung heisst das: Schutzzäune, enge Arbeitskorridore, Bodenschutz auf Pisten, und am Schluss die vorgesehene Wiederherstellung tatsächlich ausführen und dokumentieren.

### 3. Wer entscheidet was?
- Die **Bauherrschaft** beantragt Bewilligungen (Rodung, Ausnahmen NHG, Fischerei) und trägt die Verantwortung für das Projekt.
- Der **Planer** stellt das Projekt so auf, dass Eingriffe minimiert werden.
- Die **Unternehmung** hält sich an Bewilligung und Installationsplan, schützt, was zu schützen ist, und meldet Konflikte, bevor sie handelt.
- Ihre Rolle als Umweltbeauftragter: In der AVOR die Fragen stellen, die Poliere sensibilisieren, bei Abweichungen stoppen lassen und klären.

### 4. Typische Fehler
- Zufahrt durch Ufergehölz «weil es schneller geht».
- Materialdepot auf einer Magerwiese oder im Wurzelbereich geschützter Bäume.
- Rodung eines «Gestrüpps», das rechtlich Wald oder Hecke ist.
- Gehölzschnitt in der Brutzeit ohne Abklärung.
- Wiederherstellung vergessen, weil der Rückbau unter Zeitdruck läuft.

### 5. Folgen
Unerlaubte Eingriffe können zu Wiederherstellungsverfügungen, Ersatzmassnahmen, Baustopps und Strafverfahren führen (NHG, WaG und kantonales Recht kennen Strafbestimmungen; Einzelheiten juristisch prüfen). Für das Unternehmen kommen Reputationsschäden dazu – Naturschutzorganisationen und Anwohnende beobachten Baustellen am Gewässer genau.

### 6. Installationsflächen und Wiederherstellung richtig planen
Installationsplätze, Depots und Pisten liegen oft auf Wiesen oder Brachen, die nach Bauende wieder Natur sein sollen. Damit das gelingt:
- **Ausgangszustand festhalten**: Fotos, Pflanzenbestand, Bodenart – sonst lässt sich später nicht zeigen, was wiederhergestellt werden muss.
- **Fläche minimieren**: nur so gross wie nötig, klar abgegrenzt; nichts ausserhalb des Perimeters ablagern.
- **Boden schützen**: Oberboden abtragen und getrennt lagern oder mit Lastverteilung überdecken, nur bei geeigneter Bodenfeuchte befahren (Modul 4).
- **Wiederherstellung terminieren**: Saatgut bzw. Pflanzen, Zeitpunkt (Vegetationsperiode) und Pflege im Folgejahr gehören in den Bauvertrag – sie werden sonst beim Rückbau unter Zeitdruck vergessen.
- **Abnahme dokumentieren**: Gemeinsam mit Bauherrschaft und gegebenenfalls Fachstelle abnehmen; Fotos im Projektdossier ablegen.

§> NHG und WaG gesetzlich verbindlich. Art. 21/22 NHG bestätigt; übrige Artikel sinngemäss. Brutzeit-Regeln und Neophyten-Vorgaben sind kantonal bzw. nicht selbst geprüft.` },
      { id: 'm1-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm1-q19' },
      { id: 'm1-l4-abw', kind: 'decision', title: 'Abwägung: Zufahrt durch das Ufergehölz', questionId: 'm1-d04' },
      { id: 'm1-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Installationsplan auf Natur prüfen', taskId: 'm1-t4' },
      { id: 'm1-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m1-q20', 'm1-q21'] },
      { id: 'm1-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm1-p4' },
      { id: 'm1-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Ufervegetation: nicht roden, überschütten oder absterben lassen; Ausnahmen nur mit Bewilligung (Art. 21/22 NHG).',
        'Wald: Rodung (auch vorübergehend) nur mit Bewilligung und Ersatz.',
        'Biotope und Inventare: vermeiden, minimieren, wiederherstellen, ersetzen.',
        'Vor Baubeginn: Geoportale, Bewilligung, Begehung, Zeitfenster (Brutzeit, Schonzeit).',
        'Konflikte melden und klären, bevor gehandelt wird – Eingriffe sind oft nicht rückgängig zu machen.',
      ] },
      { id: 'm1-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['nhg', 'wag', 'bgf', 'gschv'] },
    ],
  },
  // =====================================================================
  {
    id: 'm1-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 20,
    title: 'Verantwortung, Haftung und Strafbarkeit der Beteiligten',
    topics: ['m1-verantwortung'],
    objectives: [
      'Die Rollen von Bauherrschaft, Planer, Unternehmer und Subunternehmer im Umweltschutz abgrenzen',
      'Verwaltungsrecht (Kosten, Massnahmen), Strafrecht und Haftpflicht unterscheiden',
      'Die eigene Rolle als Umweltbeauftragter rechtlich und organisatorisch einordnen',
    ],
    steps: [
      { id: 'm1-l5-situation', kind: 'situation', title: 'Einstieg: «Wer ist denn jetzt schuld?»', text: `Nach einem Ölaustritt aus einem Bagger eines Subunternehmers gelangte Öl in einen Bach. Die Polizei ermittelt. In der Krisensitzung fragt der Geschäftsführer: «Wer ist verantwortlich? Der Subunternehmer, unser Polier, der Bauherr – oder Sie als Umweltbeauftragter, weil Sie die Baustelle letzte Woche kontrolliert haben?»

Was antworten Sie – ohne Juristerei, aber korrekt?` },
      { id: 'm1-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m1-q22', 'm1-q23'] },
      { id: 'm1-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Drei Fragen, drei Verfahren**: Wer zahlt die Massnahmen der Behörde (Verwaltungsrecht, Verursacherprinzip)? Wer wird bestraft (Strafrecht, persönliche Schuld)? Wer zahlt den Schaden (Haftpflicht)?

**Verantwortung liegt bei mehreren**: bei dem, der handelt, und bei denen, die organisieren, instruieren und kontrollieren müssen.

**Als Umweltbeauftragter beraten und kontrollieren Sie** – die Linie entscheidet. Dokumentierte Hinweise und klare Zuständigkeiten schützen alle.

**Rechtsfragen im Einzelfall** gehören zu Juristen.` },
      { id: 'm1-l5-explain', kind: 'explain', title: 'Rollen auf dem Bau', text: `### Bauherrschaft
Stellt das Baugesuch, ist Adressatin der Bewilligung und ihrer Auflagen, beauftragt Planer und Unternehmer. Sie muss dafür sorgen, dass die Auflagen in die Verträge kommen und umgesetzt werden.

### Planer und Bauleitung
Projektieren so, dass Umweltanforderungen erfüllt werden können (z. B. Entwässerungskonzept, Entsorgungskonzept, Installationsplan), schreiben Leistungen aus und überwachen je nach Auftrag die Ausführung.

### Unternehmung
Führt aus, betreibt Maschinen, Anlagen und Lager, setzt Personal ein. Sie trägt die Sorgfaltspflicht für ihre Tätigkeit, muss Mitarbeitende instruieren und kontrollieren und ist Inhaberin ihrer Anlagen (z. B. Tank, Neutralisation).

### Subunternehmer
Haben dieselben Pflichten für ihre Arbeiten und Maschinen. Die Hauptunternehmung muss sie einbinden: Vorgaben im Vertrag, Instruktion vor Ort, Kontrolle.

### Umweltbeauftragte Person im Unternehmen
Berät, schult, kontrolliert stichprobenweise und meldet Abweichungen. Sie ersetzt nicht die Führungsverantwortung der Linie, kann aber selbst verantwortlich werden, wenn sie konkrete Pflichten übernommen und nicht erfüllt hat. Deshalb sind Pflichtenheft, Befugnisse und Dokumentation wichtig.` },
      { id: 'm1-l5-explain-2', kind: 'explain', title: 'Drei Verfahren: Kosten, Strafe, Schaden', text: `### 1. Verwaltungsrecht: Massnahmen und Kosten
Die Behörde ordnet Massnahmen an (z. B. Sofortmassnahmen, Sanierung) und überbindet die Kosten dem Verursacher (Art. 59 USG; für Gewässer Art. 54 GSchG, sinngemäss). Verursacher kann sein, wer handelt, aber auch, wer über die Sache verfügt. Das Verfahren fragt nicht nach Schuld.

### 2. Strafrecht: persönliche Schuld
- **USG Art. 60 (Vergehen)**: vorsätzliche Verstösse u. a. gegen zentrale Vorschriften – Freiheitsstrafe bis drei Jahre oder Geldstrafe (bestätigt).
- **USG Art. 61 (Übertretungen)**: Busse bis 20 000 Franken; Fahrlässigkeit ist strafbar (bestätigt).
- **GSchG Art. 70/71** (Modul 2).
- Bestraft werden natürliche Personen: wer handelt, und unter Umständen Vorgesetzte, die ihre Pflichten verletzt haben. Ein **Unternehmen** kann nur unter den Voraussetzungen von Art. 102 StGB bestraft werden – nicht automatisch: nach Abs. 1 subsidiär, wenn ein Verbrechen oder Vergehen wegen mangelhafter Organisation keiner bestimmten Person zugerechnet werden kann; Abs. 2 gilt nur für dort aufgezählte Delikte (keine Umweltdelikte).

### 3. Haftpflicht: Schadenersatz
- **Gefährdungshaftung nach Art. 59a USG**: Der Inhaber eines Betriebs oder einer Anlage, mit denen eine besondere Gefahr für die Umwelt verbunden ist, haftet für den Schaden aus Einwirkungen – ohne Verschulden; befreit ist, wer höhere Gewalt oder grobes Verschulden des Geschädigten oder eines Dritten beweist (bestätigt). Das gilt nicht für jeden Baubetrieb, sondern für Schäden aus der Verwirklichung der besonderen Umweltgefahr eines Betriebs oder einer Anlage – im Übrigen gilt das allgemeine Haftpflichtrecht.
- **Nachbarrecht**: Übermässige Einwirkungen auf Nachbargrundstücke (Lärm, Staub, Erschütterungen) können zivilrechtliche Ansprüche auslösen (ZGB, sinngemäss).
- **Vertrag**: Werkverträge regeln, wer welche Umweltleistungen schuldet und wer bei Verstössen haftet.

§> USG Art. 59a, 60, 61 über Sekundärquellen bestätigt; übrige Artikel sinngemäss. Zurechnung im Einzelfall durch Behörde, Gericht bzw. Juristen.` },
      { id: 'm1-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Asbest unerwartet gefunden', context: 'Hochbau', text: `Bei Umbauarbeiten stösst ein Plattenleger auf einen alten Bodenbelag, der im Schadstoffbericht nicht erfasst ist. Er will weiterarbeiten. Der Polier stoppt die Arbeiten, sperrt den Bereich, informiert Bauleitung und Bauherrschaft; eine Fachperson beprobt.

Rechtlich: Die Bauherrschaft muss die Schadstoffermittlung nachführen lassen, die Unternehmung muss Mitarbeitende schützen (Arbeitssicherheit) und darf nicht unkontrolliert entsorgen. Wer weiterarbeitet und Asbest verschleppt, riskiert Strafverfahren und Sanierungskosten.

**Lernpunkt**: Stoppen und melden ist die richtige Reaktion – auch wenn es den Terminplan stört.` },
      { id: 'm1-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Ölaustritt beim Subunternehmer', context: 'Tiefbau', text: `Der Bagger eines Subunternehmers verliert Hydrauliköl, ein Teil gelangt in einen Bach. Die Behörde ordnet Sofortmassnahmen an und stellt die Kosten dem Verursacher in Rechnung. Die Strafbehörde prüft, wer fahrlässig gehandelt hat: Wartung der Maschine, Instruktion, Notfallmaterial. Der Fischereiberechtigte verlangt Schadenersatz.

Die Hauptunternehmung kann zeigen: Notfallvorgaben im Subunternehmervertrag, Instruktion beim Start (Protokoll), wöchentliche Kontrolle mit Mängelliste. Das ersetzt nicht die Prüfung im Einzelfall, verbessert aber ihre Lage deutlich.

**Lernpunkt**: Was nicht dokumentiert ist, gilt im Ernstfall als nicht gemacht.` },
      { id: 'm1-l5-deep', kind: 'deep', title: 'Fachvertiefung: Organisationsverantwortung und Ihre Rolle', text: `### 1. Organisationsverantwortung
In einem Unternehmen mit vielen Baustellen kann niemand alles selbst tun. Verantwortung wird delegiert – aber Delegation hat Bedingungen:
- **Auswahl**: geeignete Personen mit der nötigen Ausbildung.
- **Instruktion**: Sie wissen, was verlangt ist (Standards, Auflagen, Notfallregeln).
- **Ausrüstung**: Sie haben die Mittel (Notfallmaterial, Anlagen, Zeit).
- **Kontrolle**: Stichproben und Reaktion auf Mängel.
Fehlt eines davon, bleibt Verantwortung bei der delegierenden Stelle. Für die Umweltorganisation heisst das: Standards, Schulungen, Begehungen und Massnahmenverfolgung sind nicht Bürokratie, sondern Nachweis guter Organisation.

### 2. Ihr Pflichtenheft
Klären Sie schriftlich:
- Welche Aufgaben haben Sie (Beratung, Schulung, Kontrolle, Ereignisbearbeitung, Berichterstattung)?
- Welche **Befugnisse** (z. B. Arbeitsunterbruch bei unmittelbarer Umweltgefahr anordnen)?
- An wen melden Sie, und was passiert, wenn die Linie nicht reagiert?
- Welche Ressourcen haben Sie (Zeit, Budget, Unterstützung)?
Ein Pflichtenheft ohne Befugnis schafft Verantwortung ohne Handlungsmöglichkeit – das ist für Sie riskant.

### 3. Dokumentation, die schützt
- Begehungsberichte mit Feststellung, Massnahme, Termin, Verantwortlichem und Erledigung.
- Schulungsnachweise (Datum, Inhalt, Teilnehmende nach Funktion).
- Schriftliche Hinweise bei kritischen Abweichungen («Ich empfehle …, weil …»).
- Ereignisberichte mit Ursachenanalyse.
Halten Sie Dokumente sachlich: Beobachtung, Bewertung und Empfehlung trennen.

### 4. Werkverträge und Subunternehmer
Umweltpflichten gehören in die Verträge: Einhaltung der Bewilligungsauflagen, Maschinenanforderungen, Entsorgungsnachweise, Notfallorganisation, Teilnahme an Instruktionen, Folgen bei Verstössen. Die Norm SIA 118 (Allgemeine Bedingungen für Bauarbeiten) bildet oft die Vertragsgrundlage; projektspezifische Umweltanforderungen müssen zusätzlich festgehalten werden (sinngemäss).

### 5. Grenzen der eigenen Kompetenz
Strafrecht, Haftpflicht und Versicherungsfragen sind Fachgebiete von Juristen und Versicherern. Ihre Aufgabe ist, Risiken früh zu erkennen und die richtigen Stellen beizuziehen – nicht, Rechtsfragen abschliessend zu beurteilen.

### 6. Typische Vertragskonstellationen
- **Arbeitsgemeinschaft (ARGE)**: Mehrere Unternehmen führen gemeinsam aus. Klären Sie im ARGE-Vertrag, welcher Partner welche Umweltaufgaben (Anlagen, Kontrollen, Meldungen) übernimmt – sonst verlässt sich jeder auf den anderen.
- **General- bzw. Totalunternehmer**: Übernimmt die Gesamtverantwortung gegenüber der Bauherrschaft, oft auch Planungsleistungen. Dann liegen Konzepte (Entwässerung, Entsorgung) und deren Umsetzung in einer Hand – mit entsprechend höherer Verantwortung.
- **Bauherrenvertretung bzw. Bauleitung des Architekten**: Überwacht die Ausführung im Auftrag der Bauherrschaft. Sie kann Weisungen erteilen, nimmt der Unternehmung aber die Sorgfalt bei der eigenen Arbeit nicht ab.

§> Zusammenfassung allgemeiner Grundsätze; keine Rechtsberatung. Einzelfragen durch Rechtsdienst bzw. Anwalt klären.` },
      { id: 'm1-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm1-q24' },
      { id: 'm1-l5-abw', kind: 'decision', title: 'Abwägung: Polier ignoriert Ihren Hinweis', questionId: 'm1-d05' },
      { id: 'm1-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Rollenmatrix für ein Projekt', taskId: 'm1-t5' },
      { id: 'm1-l5-feynman', kind: 'feynman', title: 'Erklären Sie es der Geschäftsleitung (Feynman-Methode)', feynmanId: 'm1-f1' },
      { id: 'm1-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m1-q25', 'm1-q26', 'm1-q27'] },
      { id: 'm1-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm1-p5' },
      { id: 'm1-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Bauherrschaft, Planer, Unternehmer und Subunternehmer tragen je eigene Pflichten.',
        'Drei getrennte Verfahren: Kosten (Verursacher), Strafe (persönliche Schuld), Schaden (Haftpflicht).',
        'USG: Vergehen bis 3 Jahre (Art. 60), Übertretungen Busse bis 20 000 Fr. (Art. 61), Gefährdungshaftung (Art. 59a).',
        'Delegation braucht Auswahl, Instruktion, Ausrüstung und Kontrolle – und Nachweise.',
        'Pflichtenheft mit Befugnissen; Rechtsfragen im Einzelfall an Juristen.',
      ] },
      { id: 'm1-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'gschg', 'stgb'] },
    ],
  },
  // =====================================================================
  {
    id: 'm1-l6', moduleId: M, level: 3, order: 6, review: E, minutes: 20,
    title: 'Bewilligungen, Auflagen, Vollzug und Kontrollen',
    topics: ['m1-vollzug'],
    objectives: [
      'Baubewilligung, Nebenbewilligungen und Koordinationspflicht erklären',
      'Die Rolle der Umweltverträglichkeitsprüfung (UVP) einordnen',
      'Auflagen lesen und in Massnahmen übersetzen',
      'Professionell mit behördlichen Kontrollen umgehen',
    ],
    steps: [
      { id: 'm1-l6-situation', kind: 'situation', title: 'Einstieg: Die Fachstelle steht am Tor', text: `Dienstag, 9 Uhr. Eine Mitarbeiterin des kantonalen Amts für Umwelt meldet sich am Baustellentor: «Kontrolle Baustellenentwässerung und Abfall.» Der Polier ist im Untergeschoss, der Bauführer an einer Sitzung.

Der Vorarbeiter ruft Sie an: «Muss ich die reinlassen? Und was sage ich?»` },
      { id: 'm1-l6-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m1-q28', 'm1-q29'] },
      { id: 'm1-l6-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Bauprojekt braucht oft mehrere Bewilligungen** (Baubewilligung, Gewässerschutz, Rodung, Fischerei, Abfall). Sie müssen inhaltlich aufeinander abgestimmt sein (Koordinationspflicht, Art. 25a RPG).

**Grosse Anlagen** brauchen eine Umweltverträglichkeitsprüfung (UVP); deren Ergebnisse stehen als Auflagen in der Bewilligung, oft mit Umweltbaubegleitung.

**Auflagen sind verbindlich**, sobald die Bewilligung rechtskräftig ist. Jede Auflage braucht Massnahme, Verantwortlichen, Termin und Nachweis.

**Bei Kontrollen**: Zutritt gewähren, begleiten, sachlich auskunft geben, nichts vertuschen, Mängel beheben und dokumentieren.` },
      { id: 'm1-l6-explain', kind: 'explain', title: 'Bewilligungen und ihre Koordination', text: `### Baubewilligung und Nebenbewilligungen
Die **Baubewilligung** (je nach Kanton von der Gemeinde oder vom Kanton) prüft, ob ein Bauvorhaben den öffentlich-rechtlichen Vorschriften entspricht. Viele Umweltfragen werden über **Nebenbewilligungen** bzw. Stellungnahmen kantonaler Fachstellen geregelt, z. B.:
- Gewässerschutz (Bauen im Bereich Au, Grundwasserabsenkung, Einleitungen),
- Rodung (Wald), Eingriffe in Ufervegetation (NHG), fischereirechtliche Bewilligung,
- Entsorgung (Entsorgungskonzept, VVEA), Bodenschutz, Lärm- und Luftmassnahmen.

### Koordinationspflicht
Braucht ein Vorhaben Verfügungen mehrerer Behörden, sind diese **materiell** (inhaltlich widerspruchsfrei) und soweit möglich **formell** (z. B. gemeinsame öffentliche Auflage) zu koordinieren (Art. 25a RPG, bestätigt). Für die Baustelle heisst das: Widersprechen sich zwei Auflagen, ist das ein Fehler im Verfahren – nicht etwas, das der Polier selbst auflöst.

### Umweltverträglichkeitsprüfung (UVP)
Anlagen, die Umweltbereiche erheblich belasten können, unterliegen einer UVP (Art. 10a USG; welche Anlagen, bestimmt die UVP-Verordnung). Der **Umweltverträglichkeitsbericht** beschreibt Auswirkungen und Massnahmen, auch für die Bauphase. Die Behörde übernimmt Massnahmen als Auflagen; oft wird eine **Umweltbaubegleitung** verlangt, die die Umsetzung kontrolliert und berichtet (Modul 9).

§> RPG Art. 25a bestätigt; USG Art. 10a sinngemäss.` },
      { id: 'm1-l6-diagram', kind: 'diagram', title: 'Schema: Vom Gesuch zur Abnahme', diagram: 'bewilligungsweg', caption: 'Wo Umweltanforderungen entstehen und wo sie umgesetzt werden. Ihre grösste Wirkung liegt vor dem Baustart.' },
      { id: 'm1-l6-explain-2', kind: 'explain', title: 'Auflagen umsetzen und Kontrollen begleiten', text: `### Auflagen lesen
- **Wer ist Adressat?** Meist die Bauherrschaft – sie muss die Auflagen an Planer und Unternehmer weitergeben (Vertrag, Leistungsverzeichnis).
- **Was genau wird verlangt?** Massnahme, Zeitpunkt (vor Baubeginn, laufend, bei Abschluss), Nachweis, Meldung an wen.
- **Was ist unklar?** Unklare Auflagen früh bei der Behörde klären – nach Rechtskraft lässt sich wenig ändern.
- **Rechtsmittel**: Ist eine Auflage unverhältnismässig, kann die Bauherrschaft sie innert Frist anfechten. Die Frist steht in der Rechtsmittelbelehrung.

### Vollzug und Kontrollen
Behörden kontrollieren Baustellen angemeldet oder unangemeldet. Sie haben in der Regel ein Zutrittsrecht und können Auskünfte und Unterlagen verlangen. Bei Mängeln können sie Massnahmen verfügen (Fristen, Arbeitsunterbruch, Ersatzvornahme auf Kosten der Pflichtigen) und Strafanzeige erstatten (sinngemäss; Befugnisse im Einzelfall nach kantonalem Recht).

### Professionell begleiten
1. Zutritt gewähren, Person begleiten, Sicherheitsregeln der Baustelle erklären (PSA).
2. Verantwortliche (Polier, Bauführer, Umweltfachperson) sofort informieren.
3. Sachlich Auskunft geben und Unterlagen zeigen; nichts beschönigen, nichts verstecken, nichts vor ihren Augen «schnell aufräumen».
4. Feststellungen mitschreiben, eigene Fotos machen, Fristen notieren.
5. Mängel umgehend beheben, Behebung dokumentieren und fristgerecht melden.
6. Ursachen analysieren und im Unternehmen lernen (Modul 9/10).

!> Beweise zu verändern oder Mängel zu vertuschen, verschlimmert die Lage rechtlich und zerstört Vertrauen. Ein offener Umgang mit Fehlern ist Ihr bestes Argument bei der nächsten Kontrolle.` },
      { id: 'm1-l6-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Unangemeldete Kontrolle', context: 'Hochbau', text: `Die Gemeinde kontrolliert eine Wohnbaustelle. Sie stellt fest: Mulde mit gemischtem Bauabfall (Gips, Holz, Kunststoff), ein Meteorschacht nicht abgedeckt. Der Polier begleitet, zeigt das Entsorgungskonzept und gibt zu, dass die Mulde falsch befüllt wurde. Noch am selben Tag werden ein Muldenkonzept mit Beschriftung eingeführt, die Mulde umsortiert und der Schacht abgedeckt; Fotos gehen an die Gemeinde.

**Lernpunkt**: Die Kontrolle endete mit einer Frist und ohne Anzeige – weil die Mängel klar benannt und schnell behoben wurden.` },
      { id: 'm1-l6-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: UVP-pflichtiges Strassenprojekt', context: 'Tiefbau', text: `Bei einem Umfahrungsstrassen-Projekt enthält die Plangenehmigung über 80 Auflagen aus dem Umweltverträglichkeitsbericht: Bodenschutz mit bodenkundlicher Baubegleitung, Gewässerschutz mit Messprogramm, Baulärm-Stufe C bei einer Brücke, Schutz eines Amphibienlaichgebiets während der Wanderzeit, Umweltbaubegleitung mit Quartalsberichten.

Die Unternehmung erstellt mit der Umweltbaubegleitung eine **Auflagenmatrix**: Auflage, Massnahme, Verantwortlich, Termin, Nachweis, Status. Jede Woche wird sie in der Bausitzung besprochen.

**Lernpunkt**: Bei grossen Projekten ist die Auflagenverwaltung eine eigene Aufgabe – mit klarer Zuständigkeit.` },
      { id: 'm1-l6-deep', kind: 'deep', title: 'Fachvertiefung: Vom Verfahren zur Baustelle', text: `### 1. Phasen und Ihre Ansatzpunkte
- **Projektierung/Baueingabe**: Umweltanforderungen werden definiert (Bauherrschaft, Planer). Ihr Einfluss als Unternehmer ist gering – ausser bei Totalunternehmer- oder Planungsaufträgen.
- **Ausschreibung/Offerte**: Auflagen erscheinen im Leistungsverzeichnis. Hier entscheiden Sie mit, ob die Kosten eingerechnet werden. Fehlende Leistungen frühzeitig mit Vorbehalt bzw. Rückfrage anmerken.
- **Vergabe/Werkvertrag**: Umweltpflichten, Nachweise und Zuständigkeiten festhalten.
- **AVOR**: Auflagen in Massnahmen, Installationsplan, Termine und Verantwortlichkeiten übersetzen (Modul 8).
- **Ausführung**: Umsetzung, Eigenkontrolle, Begleitung von Fremdkontrollen, Abweichungsmanagement.
- **Abnahme/Abschluss**: Nachweise übergeben (Entsorgung, Wiederherstellung, Messungen), Erfahrungen auswerten.

### 2. Die Auflagenmatrix
Eine einfache Tabelle hilft bei jedem Projekt: Nummer und Wortlaut der Auflage | Rechtsnatur | Massnahme | Verantwortlich | Termin/Phase | Nachweis | Status. Sie dient der Steuerung, der Kommunikation mit der Bauherrschaft und als Beweis bei Kontrollen. Vorlage: Wissensbibliothek («Umweltmassnahmenplan»).

### 3. Widersprüche und Lücken
- **Widersprüchliche Auflagen** (z. B. Lärmschutz verlangt Arbeiten tagsüber, Verkehrsauflagen nur nachts): Bauherrschaft informieren, Klärung bei der koordinierenden Behörde verlangen; bis dahin die schützendere Variante wählen und dokumentieren.
- **Lücken** (Auflage verlangt Massnahme, die im Leistungsverzeichnis fehlt): Nachtrag bzw. Bestellungsänderung klären, bevor ausgeführt wird – aber eine Gefahr für die Umwelt nicht wegen einer Kostenfrage in Kauf nehmen.
- **Neue Erkenntnisse** (z. B. Schadstoffe, höheres Grundwasser): Projektänderung kann eine neue Bewilligung erfordern (Modul 2, Lektion 1).

### 4. Rechtskraft und Fristen
Eine Bewilligung wird rechtskräftig, wenn die Rechtsmittelfrist unbenutzt abgelaufen ist oder Rechtsmittel erledigt sind. Vorher zu bauen, ist riskant und meist unzulässig. Fristen für Meldungen und Nachweise stehen in der Bewilligung – tragen Sie sie in den Terminplan ein.

### 5. Verhältnis zur Behörde
Behörden sind keine Gegner. Sie haben den gesetzlichen Auftrag, die Umwelt zu schützen, und meist Interesse an praktikablen Lösungen. Wer früh fragt, gute Unterlagen liefert und Fehler offen behandelt, wird als verlässlicher Partner wahrgenommen. Diese Glaubwürdigkeit ist für ein grosses Bauunternehmen viel wert – bei jeder künftigen Bewilligung.

§> Verfahrensrecht ist weitgehend kantonal; Zuständigkeiten, Fristen und Befugnisse unterscheiden sich. RPG Art. 25a bestätigt; übrige Aussagen allgemeine Grundsätze.` },
      { id: 'm1-l6-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm1-q30' },
      { id: 'm1-l6-abw', kind: 'decision', title: 'Abwägung: Unklare Auflage kurz vor Baustart', questionId: 'm1-d06' },
      { id: 'm1-l6-task', kind: 'sitetask', title: 'Baustellenaufgabe: Auflagenmatrix aus einer Plangenehmigung', taskId: 'm1-t6' },
      { id: 'm1-l6-feynman', kind: 'feynman', title: 'Erklären Sie es dem Vorarbeiter (Feynman-Methode)', feynmanId: 'm1-f2' },
      { id: 'm1-l6-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m1-q31', 'm1-q32', 'm1-q33'] },
      { id: 'm1-l6-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm1-p6' },
      { id: 'm1-l6-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Baubewilligung plus Nebenbewilligungen; Verfügungen mehrerer Behörden sind zu koordinieren (Art. 25a RPG).',
        'UVP für Anlagen mit erheblicher Umweltbelastung; Massnahmen als Auflagen, oft mit Umweltbaubegleitung.',
        'Auflagen: Adressat, Massnahme, Termin, Nachweis; Unklarheiten vor Rechtskraft klären.',
        'Kontrollen: Zutritt, Begleitung, offene Auskunft, Mängel beheben und dokumentieren – nie vertuschen.',
        'Auflagenmatrix als Steuerungs- und Nachweisinstrument.',
      ] },
      { id: 'm1-l6-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['rpg', 'usg', 'vvea', 'nhg'] },
    ],
  },
];
