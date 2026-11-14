import type { Lesson } from '../types';

// Modul 12 «Führung und strategische Umweltverantwortung».
// Überwiegend bewährte Managementpraxis. Rechtliche Aussagen (Verantwortung der Organe, Delegation,
// Strafbarkeit) sinngemäss, nicht am Fedlex-Volltext geprüft und keine Rechtsberatung.
// Prüfstatus: Entwurf.

const M = 'm12';
const E = 'entwurf' as const;

export const M12_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm12-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Umweltorganisation: Verantwortung, Rollen und Delegation',
    topics: ['m12-organisation'],
    objectives: [
      'Unterscheiden, wer für Umweltpflichten verantwortlich ist und wer berät',
      'Eine Umweltorganisation mit klaren Rollen und Schnittstellen beschreiben',
      'Die Grundsätze einer wirksamen Delegation erklären',
    ],
    steps: [
      { id: 'm12-l1-situation', kind: 'situation', title: 'Einstieg: «Sie sind ja jetzt verantwortlich für die Umwelt»', text: `Sie wurden zum leitenden Umweltbeauftragten ernannt. An der ersten Kadersitzung sagt ein Bereichsleiter: «Super, dann ist die Umwelt jetzt Ihr Thema. Wenn auf einer Baustelle etwas passiert, rufen wir Sie an.»

Ist das richtig? Was antworten Sie?` },
      { id: 'm12-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m12-q01', 'm12-q02'] },
      { id: 'm12-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Verantwortung bleibt in der Linie.** Für die Einhaltung der Umweltvorschriften auf einer Baustelle sind diejenigen verantwortlich, die die Arbeit anordnen und leiten: Geschäftsleitung, Bereichs- und Projektleitung, Bauführung, Polier. Die Oberleitung und Organisation des Unternehmens liegt bei Verwaltungsrat und Geschäftsleitung.

**Die Umweltfachstelle** berät, schult, kontrolliert, entwickelt Standards und meldet. Sie **ersetzt die Linie nicht**.

**Delegation** ist möglich und nötig – aber nur wirksam, wenn Aufgaben, Kompetenzen und Mittel klar zugeteilt sind und die Vorgesetzten **sorgfältig auswählen, instruieren und überwachen**.

**Umweltorganisation**: wer macht was – Leitung, Fachstelle, Linie, Kontaktpersonen in Niederlassungen, Werkhof, Einkauf, Subunternehmer. Schriftlich festgelegt und bekannt.` },
      { id: 'm12-l1-explain', kind: 'explain', title: 'Wer ist wofür verantwortlich?', text: `### Rollen im Überblick

| Rolle | Aufgabe im Umweltschutz |
|---|---|
| Verwaltungsrat | Oberleitung, Organisation und Oberaufsicht – auch über Risiken wie Umweltschäden |
| Geschäftsleitung | Umweltpolitik, Ziele, Mittel, Organisation; Vorbild |
| Bereichs- und Projektleitung | Umsetzung in Projekten: Planung, Budget, Auflagen, Personal |
| Bauführung und Polier | Umsetzung auf der Baustelle: Massnahmen, Instruktion, Kontrolle |
| Umweltfachstelle (Sie) | Beratung, Standards, Schulung, Kontrollen, Rechtskataster, Berichte, Eskalation |
| Umweltkontaktpersonen (Niederlassungen, Werkhof) | Ansprechpersonen vor Ort, Bindeglied zur Fachstelle |
| Mitarbeitende | Vorgaben einhalten, Mängel melden, im Notfall richtig handeln |
| Subunternehmer | Pflichten aus Vertrag und Recht; Koordination durch die Bauführung |

### Linie und Stab
Die Umweltfachstelle ist meist eine **Stabsstelle**: Sie hat Fachautorität, aber keine Weisungsbefugnis gegenüber der Linie – ausser dort, wo sie ausdrücklich zugeteilt ist (z. B. Recht, eine gefährliche Arbeit sofort zu stoppen). Diese Kompetenz sollte schriftlich geregelt sein.

§> Aufgaben des Verwaltungsrats sinngemäss nach OR (unübertragbare Aufgaben, Art. 716a OR – nicht am Original geprüft). Keine Rechtsberatung.` },
      { id: 'm12-l1-explain-2', kind: 'explain', title: 'Delegation und Haftung', text: `### Wirksam delegieren
Pflichten lassen sich übertragen – die Verantwortung für die Übertragung bleibt. Wer delegiert, muss:
- **sorgfältig auswählen**: Die Person ist fachlich und persönlich geeignet.
- **instruieren**: Aufgabe, Ziel, Vorgaben, Grenzen sind klar.
- **ausstatten**: Kompetenzen, Zeit und Mittel reichen.
- **überwachen**: stichprobenweise kontrollieren und bei Mängeln eingreifen.

### Folgen bei Verstössen (Grundzüge)
- **Strafrecht**: Umweltgesetze (z. B. USG, GSchG) enthalten Strafbestimmungen. Bestraft werden in erster Linie natürliche Personen, die handeln oder pflichtwidrig nicht handeln. Ein Unternehmen wird nach Art. 102 Abs. 1 StGB nur subsidiär bestraft, wenn ein Verbrechen oder Vergehen wegen mangelhafter Organisation keiner bestimmten Person zugerechnet werden kann (Busse bis 5 Mio. Franken); die weitergehende Haftung nach Abs. 2 betrifft nur dort aufgezählte Delikte, keine Umweltdelikte. Ob im Einzelfall eine Strafbarkeit vorliegt, hängt von den Umständen ab – keine pauschale Haftungsformel.
- **Verwaltungsrecht**: Verfügungen, Baustopp, Kosten für Massnahmen und Sanierungen.
- **Zivilrecht und Vertrag**: Schadenersatz, Vertragsfolgen, Ausschluss von Vergaben.

### Was heisst das für Sie?
Als Fachstelle beraten Sie und sind für die Qualität Ihrer Beratung und Kontrollen verantwortlich. Eine Stabsfunktion schützt nicht vor persönlicher Verantwortung: Wer falsch berät, eine übernommene Aufgabe vernachlässigt, eigene Anweisungen gibt oder eine Pflicht kennt und nichts unternimmt, kann – je nach Aufgaben, Befugnissen und Organisation – selbst verantwortlich werden. Wer eine Ihnen ausdrücklich übertragene Aufgabe hat (z. B. Rechtskataster aktuell halten), ist dafür verantwortlich. Schreiben Sie Ihre Rolle deshalb klar auf – auch, was **nicht** Ihre Aufgabe ist.

§> Art. 102 StGB mit der Fedlex-Fassung vom 1.11.2026 verglichen (automatisierter Abgleich); Grundsätze der Delegation sinngemäss; Strafbestimmungen der Umweltgesetze nicht im Detail wiedergegeben. Im Einzelfall Rechtsberatung beiziehen.` },
      { id: 'm12-l1-diagram', kind: 'diagram', title: 'Schema: Der Führungskreislauf im Umweltschutz', diagram: 'fuehrungskreis', caption: 'Vereinfachte Lernhilfe. Die Fachstelle unterstützt jeden Schritt, entscheidet aber nicht an Stelle der Leitung.' },
      { id: 'm12-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die Kompetenz zum Stopp', context: 'Hochbau', text: `Eine Hochbaufirma legt im Umweltreglement fest: Die Umweltfachstelle und die Umweltkontaktpersonen dürfen Arbeiten sofort stoppen, wenn eine unmittelbare Gefahr für Gewässer oder Boden besteht; der Entscheid über die Fortsetzung liegt bei der Bauführung, nach Behebung. Als ein Subunternehmer Zementschlämme in einen Schacht leitet, stoppt die Kontaktperson die Arbeit, informiert den Bauführer, und dieser veranlasst die Sanierung und Meldung.

**Lernpunkt**: Klare, schriftliche Kompetenzen verhindern Diskussionen im entscheidenden Moment.` },
      { id: 'm12-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die Umweltkontaktpersonen', context: 'Tiefbau', text: `Ein Tiefbauunternehmen mit sechs Niederlassungen hat eine Umweltfachstelle mit 1,5 Stellen. Jede Niederlassung bestimmt eine Umweltkontaktperson (Bauführer/in mit 10 % Pensum), die zweimal jährlich geschult wird, Begehungen macht und Fragen beantwortet. Die Fachstelle führt die Kontaktpersonen fachlich, die Niederlassungsleitung disziplinarisch.

**Lernpunkt**: Eine kleine Fachstelle wirkt über ein Netz vor Ort – mit klarer fachlicher Führung.` },
      { id: 'm12-l1-deep', kind: 'deep', title: 'Fachvertiefung: Eine Umweltorganisation aufbauen', text: `### 1. Ausgangslage klären
Was ist heute geregelt? Wer kümmert sich tatsächlich um Umweltfragen? Wo passieren Fehler? Welche Pflichten ergeben sich aus Recht, Bewilligungen, Verträgen und Zertifizierung (Modul 10)? Eine ehrliche Bestandsaufnahme ist die Grundlage.

### 2. Rollen schriftlich festlegen
Ein Umweltreglement oder eine Funktionsbeschreibung regelt: Aufgaben, Kompetenzen, Verantwortung je Rolle; Schnittstellen (Arbeitssicherheit, Qualität, Einkauf, Werkhof, Personal); Eskalationswege. Eine **Verantwortlichkeitsmatrix** (wer ist verantwortlich, wer wirkt mit, wer wird informiert) macht das übersichtlich.

### 3. Die Fachstelle richtig positionieren
- **Direkter Zugang zur Geschäftsleitung**: Für Eskalationen und Berichte.
- **Fachautorität**: Standards und Vorgaben, die von der Geschäftsleitung in Kraft gesetzt werden.
- **Unabhängigkeit bei Kontrollen**: Wer kontrolliert, sollte nicht die eigene Arbeit prüfen.
- **Ressourcen**: realistisch zur Grösse und zum Risiko des Unternehmens.

### 4. Integration mit Arbeitssicherheit und Qualität
Viele Unternehmen führen Umwelt, Arbeitssicherheit und Qualität gemeinsam (Modul 10). Das spart Doppelspurigkeiten (Schulungen, Begehungen, Dokumente), braucht aber klare Fachverantwortung je Thema. Ihr Hintergrund in der Arbeitssicherheit ist hier ein Vorteil: Viele Werkzeuge (Gefährdungsermittlung, Sicherheitskultur, Instruktion) lassen sich übertragen.

### 5. Rechtskataster als Führungsinstrument
Das Umweltrechtskataster (Modul 1 und 10) zeigt, welche Vorschriften gelten und wer sie umsetzt. Für die Führung ist entscheidend: Wer verfolgt Änderungen? Wer informiert die Betroffenen? Wie wird die Einhaltung bewertet?

### 6. Grösse und Struktur
Ein KMU mit 50 Mitarbeitenden braucht eine andere Organisation als ein Konzern mit vielen Niederlassungen. Grundsatz: so einfach wie möglich, so klar wie nötig. In grossen Unternehmen kommen Konzernvorgaben, Niederlassungen und Tochterfirmen dazu – die fachliche Führung über Standorte muss geregelt sein.

### 7. Typische Stolpersteine
- Die Fachstelle wird zur «Feuerwehr», die jedes Problem selbst löst – die Linie fühlt sich nicht mehr zuständig.
- Kontaktpersonen ohne Zeit und ohne Schulung: Sie stehen nur auf dem Papier.
- Unklare Zuständigkeit für Subunternehmer, Mietmaschinen und Werkhof.
- Organisation nicht nachgeführt nach Reorganisationen oder Übernahmen.

### 8. Ihre Rolle
Sie gestalten die Organisation mit, schlagen sie der Geschäftsleitung vor und sorgen dafür, dass sie gelebt wird. Sie nehmen keine Verantwortung an, die bei der Linie liegt – und Sie lassen sich nicht als «Umweltpolizei» einspannen, die alles allein lösen soll.

§> Organisationsgrundsätze als bewährte Praxis; Bezüge zum OR und StGB sinngemäss.` },
      { id: 'm12-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm12-q03' },
      { id: 'm12-l1-abw', kind: 'decision', title: 'Abwägung: Die Fachstelle als Feuerwehr?', questionId: 'm12-d01' },
      { id: 'm12-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Verantwortlichkeitsmatrix', taskId: 'm12-t1' },
      { id: 'm12-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m12-q04', 'm12-q05'] },
      { id: 'm12-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm12-p1' },
      { id: 'm12-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Verantwortung für die Einhaltung bleibt in der Linie; die Fachstelle berät, schult, kontrolliert.',
        'Verwaltungsrat und Geschäftsleitung: Oberleitung, Organisation, Mittel.',
        'Delegation: auswählen, instruieren, ausstatten, überwachen.',
        'Rollen, Kompetenzen (z. B. Stopp) und Eskalationswege schriftlich festlegen.',
        'Kleine Fachstelle wirkt über Kontaktpersonen vor Ort.',
      ] },
      { id: 'm12-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['or-vr', 'stgb', 'usg', 'iso14001', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm12-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Strategie, Jahresplan, Ziele und Kennzahlen',
    topics: ['m12-planung'],
    objectives: [
      'Eine Umweltstrategie aus Risiken, Pflichten und Chancen ableiten',
      'Einen Umweltjahresplan mit realistischen Prioritäten erstellen',
      'Ziele und Kennzahlen so wählen, dass sie Entscheidungen stützen',
    ],
    steps: [
      { id: 'm12-l2-situation', kind: 'situation', title: 'Einstieg: Zwanzig Ideen, eine Stelle', text: `Nach drei Monaten haben Sie zwanzig Verbesserungsideen gesammelt: neue Schulungen, Checklisten, Treibhausgasbilanz, Rechtskataster überarbeiten, Werkhof sanieren, Kontaktpersonen ausbilden, Begehungen verdoppeln … Sie haben eine Stelle und ein kleines Budget.

Wie entscheiden Sie, was Sie nächstes Jahr tun?` },
      { id: 'm12-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m12-q06', 'm12-q07'] },
      { id: 'm12-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Umweltstrategie** (mehrjährig): Wohin will das Unternehmen? Abgeleitet aus **Risiken** (wo können schwere Schäden entstehen?), **Pflichten** (Recht, Auflagen, Kunden), **Chancen** (Ausschreibungen, Kosten, Image) und dem **heutigen Stand**.

**Umweltjahresplan** (ein Jahr): wenige Schwerpunkte, mit Massnahmen, Verantwortlichen, Terminen, Ressourcen und Kennzahlen. Der Plan wird von der Geschäftsleitung **verabschiedet**.

**Priorisieren**: Zuerst, was schwere Schäden und Rechtsverstösse verhindert; dann, was viele Baustellen erreicht; dann Chancen.

**Ziele und Kennzahlen**: wenige, messbar, beeinflussbar – Früh-Kennzahlen (Massnahmen umgesetzt) und Spät-Kennzahlen (Vorfälle).` },
      { id: 'm12-l2-explain', kind: 'explain', title: 'Von der Strategie zum Jahresplan', text: `### Strategie in vier Fragen
1. **Wo stehen wir?** Vorfälle, Begehungsergebnisse, Auditfeststellungen, Rechtskataster, Kundenanforderungen.
2. **Was sind die grössten Risiken?** Typischerweise: Gewässer (Betonwasser, Öl), Bauabfälle und Altlasten, Boden, gefährliche Stoffe, Nachbarn (Lärm, Staub).
3. **Was wird von uns erwartet?** Gesetz, Bewilligungen, Bauherrschaften, Zertifizierung, Klimaanforderungen (Modul 11).
4. **Wo wollen wir in drei bis fünf Jahren sein?** Wenige, klare Aussagen.

### Der Jahresplan

| Schwerpunkt | Massnahme | Verantwortlich | Termin | Ressourcen | Kennzahl |
|---|---|---|---|---|---|
| Gewässerschutz Betonwasser | Standard-Ausrüstung für alle Hochbaustellen; Kurzschulung Poliere | Leiter Werkhof; Fachstelle | Q1–Q2 | Investition, 1 Halbtag je Polier | Anteil Baustellen mit Ausrüstung in Begehungen |
| Rechtskataster | Überarbeitung, Verteilung an Projektleitende | Fachstelle | Q2 | 10 Tage | Aktualisierung erfolgt |
| Subunternehmer | Umweltanforderungen im Vertrag | Einkauf | Q3 | – | Anteil Verträge mit Klausel |

### Realistisch planen
Rechnen Sie Ihre Zeit: Wie viele Tage gehen ohnehin weg für Beratung, Vorfälle, Anfragen, Audits? Was bleibt für Projekte? Ein Plan, der zu 80 % umgesetzt wird, ist besser als einer mit doppelt so vielen Vorhaben, der zur Hälfte liegen bleibt.

§> Bewährte Managementpraxis; Bezüge zu ISO 14001 (Umweltziele, Planung) sinngemäss (Modul 10).` },
      { id: 'm12-l2-explain-2', kind: 'explain', title: 'Ziele und Kennzahlen, die führen', text: `### Gute Ziele
- **Spezifisch und messbar**: «Bis Ende Jahr haben alle Hochbaustellen ein Absetzbecken mit Neutralisation» statt «Gewässerschutz verbessern».
- **Beeinflussbar**: Die Verantwortlichen können das Ziel erreichen.
- **Mit Bezug zum Risiko**: Das Ziel verhindert etwas Wichtiges.
- **Wenige**: drei bis fünf Ziele pro Jahr.

### Kennzahlen-Set

| Art | Beispiel | Nutzen |
|---|---|---|
| Früh-Kennzahl (Massnahme) | Anteil Baustellen mit Entsorgungskonzept vor Baubeginn | Zeigt, ob vorgebeugt wird |
| Früh-Kennzahl (Kompetenz) | Anteil Poliere mit Umweltschulung in den letzten zwei Jahren | Zeigt Wissen |
| Prozess | Anteil Begehungsfeststellungen fristgerecht behoben | Zeigt, ob das System wirkt |
| Spät-Kennzahl | Anzahl meldepflichtiger Ereignisse | Zeigt Ergebnis – aber selten und zufallsabhängig |
| Ressourcen | Verwertungsquote Bauabfälle, Diesel je Maschinenstunde | Zeigt Leistung (Modul 11) |

### Fallen
- **Was man misst, wird gemacht – auch falsch**: Eine Kennzahl «Anzahl Vorfälle» kann dazu führen, dass Vorfälle nicht mehr gemeldet werden. Meldungen von Beinahe-Ereignissen positiv werten.
- **Zu viele Kennzahlen**: Niemand liest sie.
- **Kennzahl ohne Entscheid**: Wenn niemand reagiert, ist die Kennzahl Dekoration.

§> Bewährte Praxis; Begriffe Früh- und Spät-Kennzahl wie in Modul 10.` },
      { id: 'm12-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Drei Schwerpunkte statt zwanzig', context: 'Hochbau', text: `Der Umweltbeauftragte einer Hochbaufirma ordnet seine zwanzig Ideen nach Risiko, Reichweite und Aufwand. Er schlägt der Geschäftsleitung drei Schwerpunkte vor: Betonwasser (zwei Vorfälle im Vorjahr), Schadstoffermittlung vor Umbauten (Kundenanforderung, Asbestrisiko) und Umweltkontaktpersonen in den Niederlassungen. Die übrigen Ideen kommen auf eine Liste für die Folgejahre. Die Geschäftsleitung verabschiedet den Plan mit Budget.

**Lernpunkt**: Priorisieren heisst auch, bewusst Dinge nicht zu tun – und das offen zu sagen.` },
      { id: 'm12-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die Kennzahl, die schadete', context: 'Tiefbau', text: `Ein Tiefbauunternehmen führte als Zielgrösse «null Umweltvorfälle» mit Bonus für die Niederlassungsleitung ein. Im Folgejahr meldeten die Niederlassungen keine Vorfälle – bis eine Behörde einen Ölschaden feststellte, der intern bekannt gewesen war. Die Geschäftsleitung ersetzte die Kennzahl durch «Anteil Beinahe-Ereignisse gemeldet und ausgewertet» und «Anteil Massnahmen fristgerecht umgesetzt».

**Lernpunkt**: Kennzahlen können Verhalten verzerren. Melden muss belohnt werden, nicht Schweigen.` },
      { id: 'm12-l2-deep', kind: 'deep', title: 'Fachvertiefung: Strategisch führen mit wenig Ressourcen', text: `### 1. Risiko vor Aktivität
Die wichtigste Frage für jede Planung: Wo kann in unserem Unternehmen ein schwerer Umweltschaden oder ein schwerer Rechtsverstoss entstehen? Dorthin gehören die ersten Mittel. Eine einfache Risikomatrix (Wahrscheinlichkeit × Schwere) aus den Umweltaspekten (Modul 10) hilft beim Begründen.

### 2. Reichweite
Eine Massnahme, die alle Baustellen erreicht (Standardausrüstung, Checkliste in der AVOR, Klausel in Subunternehmerverträgen), wirkt mehr als eine Einzelberatung. Suchen Sie Hebel in bestehenden Abläufen: Offerte, AVOR, Einkauf, Startsitzung, Abnahme.

### 3. Ressourcen ehrlich planen
Rechnen Sie in Tagen. Planen Sie Reserve für Unvorhergesehenes (Vorfälle, Behördenanfragen, neue Projekte). Wenn der Plan grösser ist als die Ressourcen, ist das eine Entscheidung für die Geschäftsleitung: mehr Mittel oder weniger Vorhaben – nicht Ihr stilles Problem.

### 4. Verbindlichkeit
Ein Plan, den die Geschäftsleitung nur «zur Kenntnis nimmt», hat wenig Gewicht. Lassen Sie ihn verabschieden, mit Verantwortlichen aus der Linie und mit Budget. Berichten Sie über den Fortschritt regelmässig (Lektion 4).

### 5. Ziele kaskadieren
Unternehmensziele werden in Ziele für Bereiche und Niederlassungen übersetzt, wo nötig auch in Zielvereinbarungen von Führungskräften. Vorsicht bei Boni: Sie sollten an Massnahmen und Meldekultur geknüpft sein, nicht an «null Vorfälle».

### 6. Strategie und Markt
Umweltleistung ist zunehmend ein Wettbewerbsfaktor: Zuschlagskriterien, Kundenanfragen zu Emissionen, Wiederverwendung, Labels. Eine Strategie verbindet Risikovorsorge mit Chancen – ohne Versprechen, die das Unternehmen nicht halten kann (Modul 11).

### 7. Überprüfen und anpassen
Einmal jährlich, typischerweise in der Managementbewertung (Modul 10): Was wurde erreicht? Was hat gewirkt? Was ändern wir? Strategie und Jahresplan sind lebende Dokumente.

### 8. Typische Fehler
- Der Plan enthält alles, was wünschbar ist – und nichts wird fertig.
- Ziele ohne Verantwortliche aus der Linie: Die Fachstelle soll alles allein umsetzen.
- Kennzahlen, die niemand anschaut, oder solche, die Melden bestrafen.
- Kein Bezug zu Budget und Investitionsplanung: Die Massnahme scheitert am fehlenden Geld.
- Kein Zwischenbericht: Verzögerungen werden erst am Jahresende sichtbar.

### 9. Ihre Rolle
Sie bereiten Strategie und Plan vor, begründen Prioritäten, rechnen Ressourcen und holen Entscheide ein. Die Leitung entscheidet und stellt Mittel bereit; die Linie setzt um.

§> Bewährte Managementpraxis; Verbindung zu ISO 14001 sinngemäss.` },
      { id: 'm12-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm12-q08' },
      { id: 'm12-l2-abw', kind: 'decision', title: 'Abwägung: Bonus für null Vorfälle?', questionId: 'm12-d02' },
      { id: 'm12-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Umweltjahresplan', taskId: 'm12-t2' },
      { id: 'm12-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m12-q09', 'm12-q10'] },
      { id: 'm12-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm12-p2' },
      { id: 'm12-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Strategie aus Risiken, Pflichten, Chancen und Ist-Stand.',
        'Jahresplan: wenige Schwerpunkte mit Verantwortlichen, Terminen, Ressourcen, Kennzahlen – verabschiedet.',
        'Priorität: schwere Schäden und Rechtsverstösse zuerst, dann Reichweite, dann Chancen.',
        'Wenige, messbare, beeinflussbare Ziele; Früh- und Spät-Kennzahlen.',
        'Kennzahlen dürfen Melden nicht bestrafen.',
      ] },
      { id: 'm12-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm12-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Schulung und Wirksamkeit: Wissen, das auf der Baustelle ankommt',
    topics: ['m12-wirkung'],
    objectives: [
      'Ein Schulungskonzept nach Zielgruppen und Risiken aufbauen',
      'Schulungen praxisnah und kurz gestalten',
      'Die Wirksamkeit von Schulungen und Massnahmen überprüfen',
    ],
    steps: [
      { id: 'm12-l3-situation', kind: 'situation', title: 'Einstieg: «Die wurden doch geschult!»', text: `Nach einem Vorfall mit Betonwaschwasser sagt der Bereichsleiter: «Das kann nicht sein, alle Poliere waren letztes Jahr an der Umweltschulung.» Die Schulung war ein zweistündiger Vortrag mit 60 Folien.

Was lernen Sie daraus für Ihr Schulungskonzept?` },
      { id: 'm12-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m12-q11', 'm12-q12'] },
      { id: 'm12-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Schulungskonzept**: Wer muss was können? Zielgruppen (Geschäftsleitung, Projektleitung, Bauführung, Poliere, Maschinisten, Werkhof, Einkauf, neue Mitarbeitende, Subunternehmer) × Themen nach Risiko.

**Praxisnah**: kurz, auf der Baustelle oder am Objekt, mit Übungen und Beispielen aus dem eigenen Betrieb. Lieber oft kurz als selten lang.

**Wirksamkeit** auf vier Ebenen: Zufriedenheit – Wissen – **Verhalten auf der Baustelle** – **Ergebnis** (weniger Feststellungen, Vorfälle). Entscheidend sind Verhalten und Ergebnis.

**Schulung ist nicht immer die Lösung**: Fehlt Ausrüstung, Zeit oder eine klare Vorgabe, hilft keine Schulung.` },
      { id: 'm12-l3-explain', kind: 'explain', title: 'Ein Schulungskonzept aufbauen', text: `### Zielgruppen und Inhalte

| Zielgruppe | Schwerpunkt | Form |
|---|---|---|
| Geschäftsleitung | Verantwortung, Risiken, Kennzahlen, Entscheide | Kurzinput an GL-Sitzung |
| Projektleitung, Kalkulation | Auflagen, Entsorgungskonzept, Ausschreibung, Nachträge (Modul 8) | Workshop mit Fallbeispielen |
| Bauführung | Umweltkonzept, Kontrolle, Subunternehmer, Vorfälle | Workshop, Begehung |
| Poliere | Massnahmen vor Ort, Instruktion der Equipe, Notfall | Halbtag auf einer Baustelle |
| Maschinisten, Mitarbeitende | Konkrete Handgriffe: Betonwasser, Öl, Trennung, Notfall | Kurzinstruktion (Toolbox-Meeting) |
| Werkhof | Lager, Waschplatz, Abscheider, Entsorgung (Modul 7) | Vor Ort |
| Einkauf | Anforderungen an Lieferanten und Subunternehmer | Kurzworkshop |
| Neue Mitarbeitende | Grundregeln, Notfall, Ansprechpersonen | Einführung |
| Subunternehmer | Baustellenregeln | Startsitzung, Baustelleneinführung |

### Gute Schulung auf der Baustelle
- Ein Thema, 15–30 Minuten, am konkreten Objekt (Absetzbecken, Ölbindemittel, Mulde).
- Selber machen lassen (pH messen, Notfallset auslegen).
- Fehlerbilder zeigen – möglichst eigene Fotos.
- Warum erklären, nicht nur was.
- Dokumentieren: wer, wann, was.

### Wiederholung
Wissen verblasst. Kurze Auffrischungen (z. B. Toolbox-Meetings zu Saisonbeginn: Winterbau, Starkregen) sind wirksamer als eine grosse Schulung alle paar Jahre.

§> Bewährte Praxis der Erwachsenenbildung und Arbeitssicherheit; Pflichten zur Instruktion nicht im Detail wiedergegeben.` },
      { id: 'm12-l3-explain-2', kind: 'explain', title: 'Wirksamkeit prüfen', text: `### Vier Ebenen

| Ebene | Frage | Wie prüfen |
|---|---|---|
| 1 Reaktion | Hat es gefallen, war es verständlich? | Kurze Rückmeldung |
| 2 Lernen | Wissen und Können die Teilnehmenden es? | Fragen, praktische Übung |
| 3 Verhalten | Tun sie es auf der Baustelle? | Begehungen, Beobachtung, Gespräch mit Polier |
| 4 Ergebnis | Hat sich etwas verbessert? | Feststellungen, Vorfälle, Kennzahlen |

Die meisten Schulungen werden nur auf Ebene 1 bewertet. Für die Führung zählen Ebene 3 und 4.

### Ursachen statt Schulung
Bevor Sie schulen, fragen Sie: Wissen die Leute es nicht – oder können oder dürfen sie es nicht? Typische Nicht-Wissens-Ursachen:
- Ausrüstung fehlt (kein Absetzbecken, kein Notfallset).
- Zeitdruck, Termin geht vor.
- Unklare Zuständigkeit.
- Vorgesetzte leben es anders vor.
Dann braucht es Ausrüstung, Planung, Klarheit oder Führung – keine Schulung.

### Wirksamkeit anderer Massnahmen
Dasselbe gilt für Standards, Checklisten und Investitionen: Nach einer gewissen Zeit prüfen, ob sie genutzt werden und wirken (Modul 9 und 10: Nachkontrolle, Korrekturmassnahmen).

§> Vier Ebenen nach einem verbreiteten Modell der Bildungsevaluation (sinngemäss).` },
      { id: 'm12-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Vom Vortrag zum Halbtag', context: 'Hochbau', text: `Nach dem Vorfall aus dem Einstieg ersetzt die Umweltbeauftragte den Vortrag durch einen Halbtag auf einer laufenden Baustelle: Absetzbecken und Neutralisation anschauen und selber messen, Fotos eigener Fehler besprechen, Notfallset auslegen. Gleichzeitig stellt sie fest, dass zwei Baustellen kein Absetzbecken hatten – der Werkhof hatte zu wenige. Die Geschäftsleitung kauft fünf zusätzliche Anlagen. In den Begehungen der folgenden Monate wird gezielt auf Betonwasser geachtet; die Feststellungen gehen zurück.

**Lernpunkt**: Wirksamkeit entsteht aus Schulung, Ausrüstung und Kontrolle zusammen.` },
      { id: 'm12-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Toolbox-Meeting im Herbst', context: 'Tiefbau', text: `Eine Tiefbaufirma führt vor jeder Saison ein 15-minütiges Toolbox-Meeting auf allen Baustellen durch, vorbereitet von der Fachstelle mit einem einseitigen Blatt und drei Fotos: im Herbst zu Starkregen und Gewässerschutz, im Frühling zu Bodenschutz bei Nässe. Die Poliere führen es durch und bestätigen mit Unterschriften der Teilnehmenden. Bei den Begehungen fragt die Fachstelle stichprobenweise nach.

**Lernpunkt**: Kurz, regelmässig, durch die Linie – und überprüft.` },
      { id: 'm12-l3-deep', kind: 'deep', title: 'Fachvertiefung: Lernen im Unternehmen organisieren', text: `### 1. Vom Risiko zur Kompetenz
Leiten Sie aus den bedeutenden Umweltaspekten (Modul 10) ab, wer welche Kompetenz braucht. Eine einfache **Kompetenzmatrix** (Funktion × Thema × Niveau) zeigt Lücken und ist zugleich Nachweis für Audits.

### 2. Die Linie schult
Die Fachstelle kann nicht alle Mitarbeitenden selbst schulen. Wirksamer ist es, Poliere und Bauführer zu befähigen, ihre Equipen zu instruieren: mit kurzen Unterlagen, Bildern, klaren Botschaften. Das stärkt zugleich ihre Verantwortung.

### 3. Lernen aus Ereignissen
Vorfälle und Beinahe-Ereignisse sind die besten Lernanlässe – wenn sie offen und ohne Schuldzuweisung ausgewertet werden. Eine kurze Fallbeschreibung («Was ist passiert, warum, was haben wir geändert?») an alle Bauführer wirkt stärker als jede Folie.

### 4. Subunternehmer und Temporäre
Ein grosser Teil der Arbeiten wird von Personen ausgeführt, die nicht an internen Schulungen teilnehmen. Baustelleneinführung, klare Regeln im Vertrag und Kontrolle durch die Bauführung sind hier die Hebel. Sprache beachten: Bilder und Piktogramme helfen.

### 5. Digitale Hilfen
Lern-Apps, Kurzvideos, QR-Codes an Anlagen (z. B. am Absetzbecken) können Präsenzschulungen ergänzen – nicht ersetzen. Die praktische Übung am Objekt bleibt wichtig.

### 6. Wirksamkeit messen, ohne zu überfordern
Nicht jede Schulung braucht eine Evaluation auf vier Ebenen. Für die Schwerpunkte des Jahresplans aber schon: Legen Sie vorher fest, woran Sie den Erfolg erkennen (z. B. Anteil Baustellen mit korrekt betriebenem Absetzbecken in den Begehungen).

### 7. Dokumentation
Teilnahmelisten und Inhalte gehören in die Dokumentation (Nachweis für Audits und im Ereignisfall). Wichtiger als die Liste ist aber, dass die Leute es können.

### 8. Typische Fehler
- Eine grosse Schulung im Saal statt vieler kurzer am Objekt.
- Schulung als Antwort auf jedes Problem, auch wenn Ausrüstung oder Zeit fehlen.
- Nur Teilnahmelisten als Nachweis, keine Beobachtung auf der Baustelle.
- Unterlagen, die zu lang und zu theoretisch sind, um auf der Baustelle verwendet zu werden.
- Temporäre und Subunternehmer vergessen, obwohl sie einen grossen Teil der Arbeiten ausführen.
- Keine Auffrischung: Was vor drei Jahren geschult wurde, ist heute weitgehend vergessen.

### 9. Ihre Rolle
Sie erstellen das Konzept, befähigen die Linie, liefern Unterlagen, schulen die Schlüsselpersonen und prüfen die Wirkung. Sie unterscheiden Wissensprobleme von Ausrüstungs-, Zeit- und Führungsproblemen.

§> Bewährte Praxis; Instruktionspflichten aus Arbeitsrecht und Arbeitssicherheit nicht im Detail.` },
      { id: 'm12-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm12-q13' },
      { id: 'm12-l3-abw', kind: 'decision', title: 'Abwägung: Noch eine Schulung?', questionId: 'm12-d03' },
      { id: 'm12-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Schulungskonzept', taskId: 'm12-t3' },
      { id: 'm12-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m12-q14', 'm12-q15'] },
      { id: 'm12-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm12-p3' },
      { id: 'm12-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Schulungskonzept: Zielgruppen × Themen nach Risiko.',
        'Kurz, praxisnah, am Objekt, regelmässig – die Linie instruiert.',
        'Wirksamkeit: Verhalten auf der Baustelle und Ergebnis zählen.',
        'Erst Ursachen klären: Fehlt Wissen – oder Ausrüstung, Zeit, Klarheit, Führung?',
        'Lernen aus Ereignissen ohne Schuldzuweisung.',
      ] },
      { id: 'm12-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm12-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Führungskräfte beraten: Entscheidungsvorlagen und Managementberichte',
    topics: ['m12-beratung'],
    objectives: [
      'Führungskräfte so beraten, dass sie gut entscheiden können',
      'Eine Entscheidungsvorlage mit Varianten, Kosten und Risiken erstellen',
      'Einen kurzen, ehrlichen Managementbericht schreiben',
    ],
    steps: [
      { id: 'm12-l4-situation', kind: 'situation', title: 'Einstieg: Zehn Minuten an der GL-Sitzung', text: `Sie haben an der nächsten Geschäftsleitungssitzung zehn Minuten. Sie möchten ein Budget für eine zentrale Waschanlage im Werkhof und für Umweltkontaktpersonen. Letztes Mal haben Sie 25 Folien gezeigt; am Schluss hiess es: «Interessant, wir schauen das an.» Passiert ist nichts.

Wie bereiten Sie sich diesmal vor?` },
      { id: 'm12-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m12-q16', 'm12-q17'] },
      { id: 'm12-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Beraten heisst**: der Führung helfen, eine gute Entscheidung zu treffen – nicht die eigene Meinung durchsetzen und nicht die Verantwortung übernehmen.

**Entscheidungsvorlage** (1–2 Seiten): **Ausgangslage – Problem/Risiko – Varianten (inkl. «nichts tun») mit Kosten, Nutzen, Risiken – Empfehlung – Antrag** (was genau soll beschlossen werden).

**Managementbericht**: kurz, regelmässig, ehrlich: Kennzahlen mit Trend, Vorfälle, Stand Jahresplan, Risiken, Anträge.

**Sprache der Führung**: Risiko, Kosten, Termine, Kunden, Reputation, Recht – mit Zahlen, wo möglich, und klarer Unterscheidung zwischen Pflicht und Empfehlung.` },
      { id: 'm12-l4-explain', kind: 'explain', title: 'Die Entscheidungsvorlage', text: `### Aufbau

| Teil | Inhalt | Hinweis |
|---|---|---|
| Ausgangslage | Was ist passiert bzw. was ist die Lage? | Fakten, kurz |
| Problem / Risiko | Was droht, wenn nichts geschieht? | Pflicht oder Empfehlung? Schwere, Wahrscheinlichkeit |
| Varianten | 2–3 Varianten inkl. «nichts tun» | Kosten, Nutzen, Risiken, Aufwand, Termin |
| Empfehlung | Welche Variante und warum | Begründung nachvollziehbar |
| Antrag | Was genau beschlossen werden soll | Budget, Verantwortlich, Termin |

### Pflicht oder Empfehlung?
Ehrlich unterscheiden:
- **Pflicht** (Gesetz, Auflage, Vertrag): Die Frage ist nicht ob, sondern wie.
- **Empfehlung** (Risiko senken, Chancen): Die Führung entscheidet nach Abwägung.
Wer alles als Pflicht darstellt, verliert Glaubwürdigkeit. Wer Pflichten als Empfehlung verkauft, setzt das Unternehmen einem Risiko aus.

### Zahlen
Kosten der Massnahme gegenüber möglichen Kosten von Vorfällen (Sanierung, Baustopp, Busse, Reputation, Ausschluss von Vergaben) – mit realistischen, belegten Annahmen. Wo keine Zahlen vorhanden sind, qualitativ und ehrlich bewerten.

§> Bewährte Praxis.` },
      { id: 'm12-l4-explain-2', kind: 'explain', title: 'Der Managementbericht', text: `### Inhalt (quartalsweise oder halbjährlich, 1–2 Seiten)
1. **Lage in drei Sätzen**: Was ist gut, was nicht?
2. **Kennzahlen** mit Trend und kurzer Deutung (Lektion 2).
3. **Vorfälle und Beinahe-Ereignisse**: was, Ursache, Massnahme, Stand.
4. **Stand Jahresplan**: erledigt, im Plan, verzögert (mit Grund).
5. **Neue Anforderungen**: Recht, Kunden, Behörden.
6. **Risiken und Anträge**: was die Leitung entscheiden muss.

### Ehrlich berichten
- Schlechte Nachrichten früh und klar – nicht in einem Nebensatz.
- Keine Beschönigung, keine Dramatisierung.
- Eigene Fehler und Verzögerungen nennen.
- Behördliche Feststellungen nie weglassen.

### Beraten im Alltag
Viel Beratung passiert nicht in Sitzungen, sondern am Telefon, auf der Baustelle, im Gang: «Können wir das so machen?» Auch dort gilt: Lage verstehen, Pflichten und Risiken klar benennen, Optionen zeigen, Entscheid bei der zuständigen Person lassen – und wichtige Ratschläge kurz schriftlich festhalten.

§> Bewährte Praxis; Managementbewertung nach ISO 14001 siehe Modul 10.` },
      { id: 'm12-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Zwei Seiten statt 25 Folien', context: 'Hochbau', text: `Die Umweltbeauftragte bereitet eine zweiseitige Vorlage vor: Ausgangslage (zwei Betonwasser-Vorfälle, eine Verwarnung durch das Amt), Risiko (weitere Vorfälle, Kosten, Ruf bei einer Pensionskasse als wichtigem Kunden), drei Varianten (nichts tun; mobile Anlagen für alle Baustellen; zusätzlich zentrale Waschanlage im Werkhof) mit Kosten und Wirkung, Empfehlung Variante 2 jetzt, Variante 3 im Folgejahr prüfen. Antrag: Budget, Verantwortlicher Werkhofleiter, Termin. Die Geschäftsleitung beschliesst in zehn Minuten.

**Lernpunkt**: Eine klare Vorlage mit Antrag macht den Entscheid leicht.` },
      { id: 'm12-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die schlechte Nachricht', context: 'Tiefbau', text: `Bei einer internen Kontrolle stellt der Umweltbeauftragte fest, dass auf drei Baustellen Ausbauasphalt ohne PAK-Analyse verwertet wurde. Er informiert sofort den Bereichsleiter und schreibt im Quartalsbericht an erster Stelle: Feststellung, mögliches Risiko, eingeleitete Abklärungen mit der Fachstelle des Kantons, Massnahmen im Ablauf. Der CEO dankt für die Offenheit; die Abklärung ergibt bei zwei Baustellen unbedenkliche Werte, bei einer ist eine Nachbesserung nötig.

**Lernpunkt**: Schlechte Nachrichten gehören nach vorne – früh und mit einem Plan.` },
      { id: 'm12-l4-deep', kind: 'deep', title: 'Fachvertiefung: Wirksam beraten', text: `### 1. Die Rolle klären
Berater/innen tragen Verantwortung für die Qualität ihres Rats, nicht für den Entscheid. Machen Sie deutlich, was Pflicht ist und was Empfehlung, und lassen Sie die zuständige Person entscheiden. Dokumentieren Sie wichtige Empfehlungen – nicht um sich abzusichern, sondern damit klar ist, auf welcher Grundlage entschieden wurde.

### 2. Die Perspektive der Führung verstehen
Führungskräfte entscheiden unter Zeit-, Kosten- und Termindruck. Wer ihre Ziele kennt (Marge, Termin, Kundenbeziehung, Mitarbeitende), kann Umweltanliegen besser verbinden: «Das Absetzbecken schützt den Termin, weil ein Vorfall einen Baustopp auslösen kann.»

### 3. Lösungen statt Probleme
Bringen Sie zu jedem Problem mindestens eine machbare Lösung mit. «Das geht nicht» ohne Alternative führt dazu, dass Sie nicht mehr gefragt werden.

### 4. Grenzen setzen
Bei Pflichten, schweren Risiken oder Täuschung (z. B. falsche Angaben an Behörden oder Kunden) ist Ihre Beratung nicht verhandelbar. Hier eskalieren Sie (Lektion 5) und halten Ihre Position schriftlich fest.

### 5. Berichte, die gelesen werden
Kurz, gleiche Struktur jedes Mal, das Wichtigste zuerst, Grafiken mit Trend statt Tabellenwüsten. Ein Bericht ist erfolgreich, wenn er zu Entscheiden führt.

### 6. Der richtige Zeitpunkt
Umweltfragen früh einbringen: in der Strategie, im Budgetprozess, in der Offertphase, in der AVOR. Später wird jede Änderung teurer – und die Bereitschaft geringer.

### 7. Verbündete
Arbeitssicherheit, Qualität, Einkauf, Kalkulation, Verkauf: Viele haben ähnliche Anliegen. Gemeinsame Vorlagen (z. B. integriertes Managementsystem, gemeinsame Begehungen) haben mehr Gewicht.

### 8. Typische Fehler
- Informationsflut ohne Antrag: Die Führung nimmt Kenntnis, entscheidet aber nichts.
- Nur eine Variante: Die Führung fühlt sich vor vollendete Tatsachen gestellt.
- Alles als Pflicht verkaufen – oder Pflichten als «Empfehlung» abschwächen, um Konflikte zu vermeiden.
- Zahlen ohne Quelle oder mit übertriebenen Schadensszenarien.
- Schlechte Nachrichten im Anhang verstecken oder zu spät bringen.
- Nach dem Entscheid nicht nachfassen: Beschlüsse bleiben liegen, weil niemand ihre Umsetzung verfolgt.
- Ratschläge im Alltag nur mündlich geben: Später weiss niemand mehr, was empfohlen und was entschieden wurde.

### 9. Ihre Rolle
Sie sind Übersetzer/in zwischen Fachwelt und Führung: fachlich korrekt, verständlich, mit Optionen und Zahlen, ehrlich bei Pflichten und schlechten Nachrichten.

§> Bewährte Beratungs- und Managementpraxis.` },
      { id: 'm12-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm12-q18' },
      { id: 'm12-l4-abw', kind: 'decision', title: 'Abwägung: Den Vorfall im Bericht weglassen?', questionId: 'm12-d04' },
      { id: 'm12-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Entscheidungsvorlage', taskId: 'm12-t4' },
      { id: 'm12-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m12-q19', 'm12-q20'] },
      { id: 'm12-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm12-p4' },
      { id: 'm12-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem CEO (Feynman-Methode)', feynmanId: 'm12-f1' },
      { id: 'm12-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Beraten: helfen, gut zu entscheiden – Entscheid bei der zuständigen Person.',
        'Entscheidungsvorlage: Lage, Risiko, Varianten, Empfehlung, Antrag.',
        'Pflicht und Empfehlung ehrlich unterscheiden.',
        'Managementbericht: kurz, regelmässig, Kennzahlen mit Trend, schlechte Nachrichten zuerst.',
        'Lösungen mitbringen; bei Pflichten und Täuschung Grenzen setzen.',
      ] },
      { id: 'm12-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['iso14001', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm12-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Widerstand, Kultur und Integrität',
    topics: ['m12-kultur'],
    objectives: [
      'Widerstand verstehen und konstruktiv damit umgehen',
      'Eine Umweltkultur fördern, in der Melden und Mitdenken selbstverständlich sind',
      'Bei Konflikten zwischen Termin, Kosten und Umwelt integer handeln und richtig eskalieren',
    ],
    steps: [
      { id: 'm12-l5-situation', kind: 'situation', title: 'Einstieg: «Die Umweltleute bremsen nur»', text: `Ein erfahrener Bauführer sagt in der Kantine laut: «Die Umweltleute bremsen nur. Früher ging es auch ohne.» Einige lachen. Am nächsten Tag weist er seinen Polier an, das Absetzbecken «wegen Platzmangel» abzubauen.

Wie gehen Sie mit dem Widerstand um – und mit der Anweisung?` },
      { id: 'm12-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m12-q21', 'm12-q22'] },
      { id: 'm12-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Widerstand** hat Gründe: Zeitdruck, Kosten, fehlendes Verständnis, schlechte Erfahrungen, Gefühl von Kontrolle. Zuhören und Gründe verstehen ist der erste Schritt.

**Kultur** zeigt sich darin, was passiert, wenn niemand hinschaut: Wird gemeldet? Wird bei Termindruck die Umwelt geopfert? Leben die Vorgesetzten es vor?

**Integrität**: Pflichten werden eingehalten, auch unter Druck. Bei einem Konflikt zwischen Termin und Pflicht wird **eskaliert**, nicht verschwiegen.

**Eskalation**: sachlich, auf dem Dienstweg, dokumentiert – zuerst mit der Person, dann mit der vorgesetzten Stelle, bei schweren Fällen bis zur Geschäftsleitung. Bei unmittelbarer Gefahr: sofort handeln (Stopp-Kompetenz, Notfall).` },
      { id: 'm12-l5-explain', kind: 'explain', title: 'Mit Widerstand umgehen', text: `### Ursachen und Antworten

| Ursache | Typische Aussage | Was hilft |
|---|---|---|
| Zeitdruck | «Dafür haben wir keine Zeit.» | Massnahmen in AVOR und Terminplan einplanen, einfache Lösungen |
| Kosten | «Das zahlt niemand.» | Kalkulation, Nachträge (Modul 8), Kosten von Vorfällen zeigen |
| Nicht verstanden | «Das bisschen Wasser.» | Warum erklären, konkrete Folgen, Beispiele |
| Schlechte Erfahrung | «Die Vorschriften ändern dauernd.» | Verlässliche Standards, frühe Information |
| Kontrollgefühl | «Die wollen uns nur erwischen.» | Unterstützen statt nur kontrollieren, Erfolge anerkennen |
| Gewohnheit | «Früher ging es auch.» | Vorbilder, Erfahrene als Botschafter gewinnen |

### Haltung
- **Zuhören**: Oft steckt ein berechtigtes Problem dahinter (Platz, Zeit, Ausrüstung).
- **Nicht moralisieren**: Fakten, Folgen, Lösungen.
- **Gemeinsam lösen**: Die Praktiker kennen oft die beste Lösung.
- **Klar bleiben bei Pflichten**: Verständnis heisst nicht, Verstösse zu akzeptieren.

§> Bewährte Praxis aus Change-Management und Arbeitssicherheit.` },
      { id: 'm12-l5-explain-2', kind: 'explain', title: 'Kultur, Integrität und Eskalation', text: `### Merkmale einer guten Umweltkultur
- Mängel und Beinahe-Ereignisse werden gemeldet – und das wird anerkannt.
- Vorgesetzte fragen auf der Baustelle nach Umweltthemen, nicht nur nach Termin und Kosten.
- Bei Vorfällen wird nach Ursachen gesucht, nicht nach Schuldigen.
- Wer eine Arbeit wegen eines Umweltrisikos stoppt, wird unterstützt.
- Umweltmassnahmen sind in Kalkulation und Terminplan enthalten.

### Eskalation in Stufen
1. **Direkt**: mit der Person sprechen, Lösung suchen.
2. **Vorgesetzte Stelle**: wenn keine Lösung oder Pflicht verletzt wird.
3. **Geschäftsleitung**: bei wiederholten oder schweren Verstössen, bei Konflikt mit der Linie.
4. **Sofort handeln**: bei unmittelbarer Gefahr für Umwelt oder Menschen (Stopp, Notfall, Meldung).

Jede Stufe sachlich und dokumentiert. Eine Eskalation ist kein Angriff, sondern ein Teil der Organisation.

### Wenn die Führung selbst eine Pflicht missachten will
Wenn Sie aufgefordert werden, eine Meldung an die Behörde zu unterlassen, Unterlagen zu ändern oder Kunden zu täuschen: Nicht mitmachen, Ihre Position schriftlich festhalten, auf der nächsthöheren Ebene eskalieren (bis Verwaltungsrat), wo vorhanden die interne Meldestelle nutzen. Meldepflichten im Notfall (Modul 2 und 7) gehen jeder internen Anweisung vor.

Unterscheiden Sie drei Wege: **gesetzliche Notfallmeldung** (z. B. Art. 22 Abs. 6 GSchG – sofort, ohne interne Freigabe), **interne Eskalation** (Dienstweg, Meldestelle) und **freiwillige externe Hinweise** an Behörden oder Medien ausserhalb einer Meldepflicht. Für den dritten Weg gibt es in der Schweiz nach heutigem Kenntnisstand keinen umfassenden gesetzlichen Schutz von Hinweisgebenden in der Privatwirtschaft; die arbeitsrechtliche Treuepflicht kann berührt sein. Lassen Sie sich vorher rechtlich beraten.

§> Bewährte Praxis; arbeits- und strafrechtliche Fragen (z. B. Meldungen an Behörden durch Mitarbeitende) im Einzelfall rechtlich klären – nicht vertieft.` },
      { id: 'm12-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der Bauführer aus der Kantine', context: 'Hochbau', text: `Im Fall aus dem Einstieg geht der Umweltbeauftragte noch am selben Tag auf die Baustelle. Der Abbau des Absetzbeckens wird gestoppt – Betonwasser darf nicht ungereinigt abgeleitet werden. Im Gespräch zeigt sich: Der Platz fehlt tatsächlich, weil der Kran versetzt wurde. Gemeinsam finden sie einen neuen Standort und eine kleinere Anlage. Später bittet der Umweltbeauftragte den Bauführer, an der nächsten Polierschulung zu zeigen, wie er das Platzproblem gelöst hat.

**Lernpunkt**: Klar in der Pflicht, offen in der Lösung – und Kritiker einbinden.` },
      { id: 'm12-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die Stopp-Karte', context: 'Tiefbau', text: `Ein Tiefbauunternehmen gibt allen Mitarbeitenden eine «Stopp-Karte»: Wer ein unmittelbares Umwelt- oder Sicherheitsrisiko sieht, darf die Arbeit stoppen, ohne Nachteile befürchten zu müssen. Die Geschäftsleitung erwähnt jeden gerechtfertigten Stopp positiv im internen Newsletter. Nach einem Jahr berichten die Poliere, dass Maschinisten häufiger Leckagen und offene Schächte melden.

**Lernpunkt**: Kultur entsteht, wenn die Führung das gewünschte Verhalten sichtbar unterstützt.` },
      { id: 'm12-l5-deep', kind: 'deep', title: 'Fachvertiefung: Kultur prägen als Umweltbeauftragte/r', text: `### 1. Kultur ist Verhalten
Kultur ist nicht, was im Leitbild steht, sondern was geschieht, wenn es schwierig wird: Termin knapp, Kosten hoch, niemand schaut hin. Sie zeigt sich in kleinen Signalen: Fragt der Bereichsleiter bei der Baustellenbegehung nach dem Absetzbecken? Wird eine Meldung verdankt oder kritisiert?

### 2. Vorbild der Führung
Mitarbeitende orientieren sich an dem, was Vorgesetzte tun, nicht an dem, was sie sagen. Helfen Sie Führungskräften, sichtbar zu handeln: Umwelt als festes Traktandum, Fragen auf Begehungen, Anerkennung guter Lösungen, konsequente Reaktion auf bewusste Verstösse.

### 3. Gerechte Kultur
Fehler passieren. Unterscheiden Sie: menschlicher Fehler (Systemverbesserung, Unterstützung), riskantes Verhalten (Coaching, Klarheit), bewusster Verstoss (Konsequenzen). Wer jeden Fehler bestraft, erhält keine Meldungen mehr; wer bewusste Verstösse duldet, verliert Glaubwürdigkeit.

### 4. Botschafter gewinnen
Erfahrene Poliere und Bauführer, die Umweltanliegen überzeugend vertreten, sind wirksamer als jede Fachstelle. Binden Sie sie in die Entwicklung von Standards und in Schulungen ein.

### 5. Ihre eigene Integrität
Als Umweltbeauftragte/r stehen Sie oft zwischen den Interessen. Ihre Glaubwürdigkeit ist Ihr wichtigstes Kapital: fachlich korrekt, verlässlich, fair, ehrlich – auch wenn es unbequem ist. Machen Sie keine Ausnahmen bei Pflichten, aber seien Sie pragmatisch bei Lösungen.

### 6. Konflikte aushalten
Nicht jeder Konflikt ist zu vermeiden. Ein sachlicher Konflikt über eine Pflicht ist besser als ein stiller Verstoss. Dokumentieren Sie, bleiben Sie respektvoll, suchen Sie Verbündete und eskalieren Sie, wenn nötig.

### 7. Sich selbst schützen
Klare Rolle (Lektion 1), schriftliche Kompetenzen, dokumentierte Empfehlungen, Austausch mit Fachkolleg/innen ausserhalb des Unternehmens, Weiterbildung. Bei Druck, rechtswidrig zu handeln: nicht mitmachen, Rat einholen.

### 8. Typische Fehler
- Kultur mit einem Leitbild oder einer Kampagne verwechseln.
- Kritiker ausgrenzen statt einbinden.
- Bei bewussten Verstössen wegschauen, weil die Person angesehen oder der Termin wichtig ist.
- Erfolge nicht sichtbar machen: Wer nie hört, dass sich etwas verbessert hat, verliert die Motivation.

### 9. Langfristig denken
Kultur verändert sich langsam – über Jahre. Feiern Sie kleine Fortschritte, bleiben Sie beharrlich, und messen Sie die Entwicklung (Meldungen, Begehungsergebnisse, Rückmeldungen der Mitarbeitenden).

§> Bewährte Praxis aus Sicherheits- und Umweltkultur; rechtliche Fragen zum Schutz von Hinweisgebenden nicht vertieft.` },
      { id: 'm12-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm12-q23' },
      { id: 'm12-l5-abw', kind: 'decision', title: 'Abwägung: Die Meldung «intern regeln»?', questionId: 'm12-d05' },
      { id: 'm12-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Widerstand auf der Baustelle', taskId: 'm12-t5' },
      { id: 'm12-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m12-q24', 'm12-q25'] },
      { id: 'm12-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm12-p5' },
      { id: 'm12-l5-feynman', kind: 'feynman', title: 'Erklären Sie es einem neuen Bauführer (Feynman-Methode)', feynmanId: 'm12-f2' },
      { id: 'm12-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Widerstand hat Gründe – zuhören, verstehen, gemeinsam lösen, bei Pflichten klar bleiben.',
        'Kultur zeigt sich unter Druck; Vorbild der Führung ist entscheidend.',
        'Gerechte Kultur: Fehler – riskantes Verhalten – bewusster Verstoss unterschiedlich behandeln.',
        'Eskalation in Stufen, sachlich und dokumentiert; bei Gefahr sofort handeln.',
        'Bei Druck zu Rechtsverstoss oder Täuschung: nicht mitmachen, festhalten, eskalieren, Rat holen.',
      ] },
      { id: 'm12-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'usg', 'stgb', 'praxis'] },
    ],
  },
];
