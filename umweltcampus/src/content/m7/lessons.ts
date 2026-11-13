import type { Lesson } from '../types';

// Modul 7 «Wassergefährdende und umweltgefährliche Stoffe».
// Baut auf Modul 2 (Betankung, erste Minuten einer Havarie) auf und vertieft Stoffkenntnis,
// Lagerung, Bauchemikalien, Havariekonzept und Werkhof. Rechtliche Aussagen sinngemäss, nicht am
// Fedlex-Volltext geprüft. Keine Rückhaltevolumen, Mengenschwellen oder Prüffristen genannt:
// Diese stehen in kantonalen Vorgaben bzw. in den Verordnungen. Prüfstatus: Entwurf.

const M = 'm7';
const E = 'entwurf' as const;

export const M7_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm7-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Stoffe erkennen: Kennzeichnung und Sicherheitsdatenblatt',
    topics: ['m7-stoffe'],
    objectives: [
      'Wassergefährdende und umweltgefährliche Stoffe auf der Baustelle erkennen',
      'Gefahrenpiktogramme und Gefahrenhinweise lesen',
      'Das Sicherheitsdatenblatt gezielt für Lagerung, Notfall und Entsorgung nutzen',
    ],
    steps: [
      { id: 'm7-l1-situation', kind: 'situation', title: 'Einstieg: Der Kanister ohne Etikett', text: `Im Baucontainer finden Sie einen 20-Liter-Kanister, halb voll, mit Filzstift beschriftet: «Schalöl neu». Daneben drei Gebinde mit Betonzusatzmittel, eine Dose Epoxidharz und ein Eimer mit einer grauen, zähen Flüssigkeit ohne Aufschrift. Der Polier sagt: «Das ist alles harmlos, das brauchen wir jeden Tag.»

Woran erkennen Sie, was davon die Umwelt gefährden kann – und was tun Sie mit dem Eimer?` },
      { id: 'm7-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m7-q01', 'm7-q02'] },
      { id: 'm7-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Wassergefährdend** sind Flüssigkeiten, die Gewässer verunreinigen können – auf Baustellen vor allem Treibstoffe, Öle, Schalöle, Bitumenprodukte, Betonzusatzmittel, Harze, Farben, Lösungs- und Reinigungsmittel.

**Die Kennzeichnung** nach dem global harmonisierten System (GHS) zeigt die Gefahren auf einen Blick: **Gefahrenpiktogramme** (rot umrandete Rauten) und **Gefahrenhinweise** (H-Sätze). Das Piktogramm «Umwelt» (toter Fisch und Baum) steht für Gewässergefährdung.

**Das Sicherheitsdatenblatt (SDB)** hat 16 Abschnitte. Für Sie besonders wichtig: Gefahren (2), Freisetzung (6), Lagerung (7), Schutzausrüstung (8), Umwelt (12), Entsorgung (13).

**Ohne Etikett kein Einsatz**: Unbekannte Stoffe werden gesichert und geklärt, nicht verwendet oder weggekippt.` },
      { id: 'm7-l1-explain', kind: 'explain', title: 'Gefahrenkennzeichnung lesen', text: `### Gefahrenpiktogramme (Auswahl)

| Piktogramm | Bedeutung | Beispiele auf der Baustelle |
|---|---|---|
| Umwelt (Fisch und Baum) | Gewässergefährdend | Einige Schalöle, Holzschutzmittel, Harzkomponenten, Diesel |
| Flamme | Entzündbar | Benzin, Lösungsmittel, Sprühdosen, Gasflaschen |
| Ätzwirkung | Ätzend für Haut, Augen, Metalle | Zementschlämme-Reiniger, Säuren, Laugen |
| Ausrufezeichen | Reizend, sensibilisierend, gesundheitsschädlich | Viele Bauchemikalien |
| Gesundheitsgefahr | Krebserzeugend, sensibilisierend der Atemwege u. a. | Epoxid- und Isocyanat-Komponenten, bestimmte Lösungsmittel |
| Totenkopf | Akut giftig | Selten auf Baustellen |
| Gasflasche | Gas unter Druck | Propan, Sauerstoff |

### Gefahrenhinweise zur Umwelt
Die H-Sätze der Reihe **H400** betreffen Gewässer: z. B. «Sehr giftig für Wasserorganismen» (H400) oder «Giftig für Wasserorganismen, mit langfristiger Wirkung» (H411). Wo kein Umwelt-Piktogramm steht, kann ein Stoff trotzdem wassergefährdend sein – fast alle Öle, Treibstoffe und Bauchemikalien sind es in grösseren Mengen.

### Was die Kennzeichnung nicht sagt
Sie sagt nichts über die **Menge** und den **Ort**: Ein Liter Schalöl im Meteorschacht schadet mehr als ein Fass in einer gedeckten Wanne. Die Kennzeichnung ist der Anfang der Beurteilung, nicht das Ende.

§> Kennzeichnung nach GHS; in der Schweiz über das Chemikalienrecht (ChemG, ChemV) eingeführt, abgestimmt auf die EU-Regeln (sinngemäss, Artikel nicht genannt). Piktogramm-Beispiele ohne Gewähr für das einzelne Produkt – massgebend sind Etikett und SDB.` },
      { id: 'm7-l1-explain-2', kind: 'explain', title: 'Das Sicherheitsdatenblatt gezielt nutzen', text: `### Die 16 Abschnitte – was Sie wo finden

| Abschnitt | Inhalt | Wofür Sie ihn brauchen |
|---|---|---|
| 1 | Bezeichnung, Lieferant, Notrufnummer | Wer kann im Notfall Auskunft geben? |
| 2 | Mögliche Gefahren, Kennzeichnung | Ist es wassergefährdend, entzündbar, ätzend? |
| 6 | Massnahmen bei unbeabsichtigter Freisetzung | Was tun, wenn es ausläuft? |
| 7 | Handhabung und Lagerung | Wie und wo lagern, was nicht zusammen? |
| 8 | Expositionsbegrenzung, persönliche Schutzausrüstung | Welche Handschuhe, Brille, Atemschutz? |
| 12 | Umweltbezogene Angaben | Wie schädlich für Gewässer, abbaubar? |
| 13 | Hinweise zur Entsorgung | Reste und Gebinde – wohin? |
| 14 | Angaben zum Transport | Gefahrgut beim Transport? |

Die übrigen Abschnitte (Zusammensetzung, Erste Hilfe, Brandbekämpfung, physikalische und toxikologische Angaben, Rechtsvorschriften, sonstige Angaben) sind für Spezialisten und Einsatzkräfte wichtig.

### Wo die SDB hingehören
- Der Lieferant muss beruflichen Verwendern das SDB zur Verfügung stellen. Verlangen Sie es bei jeder neuen Bestellung.
- Auf der Baustelle: eine **aktuelle Sammlung** der dort verwendeten Produkte, für alle zugänglich (Ordner im Container oder digital mit Zugang ohne Passwort-Hürde).
- Für die Equipe: eine **Kurzfassung** der wichtigsten Punkte (Betriebsanweisung) in verständlicher Sprache.

### Unbekannte Stoffe
Gebinde ohne Etikett oder mit unklarer Beschriftung werden nicht verwendet: in eine Wanne stellen, beschriften («Inhalt unbekannt – nicht verwenden»), klären, woher sie stammen. Lässt sich der Inhalt nicht klären, wird das Gebinde als Sonderabfall entsorgt.

§> Pflicht zur Abgabe des SDB an berufliche Verwender sinngemäss nach Chemikalienrecht; Pflichten des Arbeitgebers zum Schutz der Mitarbeitenden nach Arbeitsrecht (Suva, EKAS). Artikel nicht genannt.` },
      { id: 'm7-l1-diagram', kind: 'diagram', title: 'Schema: Vom Etikett zur Massnahme', diagram: 'stoffpruefung', caption: 'Vereinfachte Lernhilfe. Massgebend sind Etikett, Sicherheitsdatenblatt und kantonale Vorgaben.' },
      { id: 'm7-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Das Epoxid im Treppenhaus', context: 'Hochbau', text: `Für eine Bodenbeschichtung liefert ein Subunternehmer Epoxidharz in zwei Komponenten. Die Umweltbeauftragte lässt sich das SDB geben: Komponente B trägt die Piktogramme Ätzwirkung, Ausrufezeichen und Umwelt. Abschnitt 7 verlangt Lagerung in geschlossenen Gebinden, geschützt vor Frost; Abschnitt 13: Reste und nicht ausgehärtete Gebinde als Sonderabfall. Gemeinsam mit dem Subunternehmer wird festgelegt: Lager in einer Wanne im Untergeschoss, Mischplatz auf Folie, Reste aushärten lassen bzw. separat sammeln, kein Auswaschen der Werkzeuge im Lavabo.

**Lernpunkt**: Fünf Minuten mit dem SDB ergeben fast alle Regeln für Lagerung, Arbeit und Entsorgung.` },
      { id: 'm7-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Fässer am Belagsplatz', context: 'Tiefbau', text: `Auf einer Strassenbaustelle stehen zwei Fässer mit Bitumenemulsion und ein Kanister Trennmittel für die Walzen am Strassenrand, direkt neben einem Einlaufschacht. Der Polier kennt die Produkte seit Jahren – das SDB nicht. Ein Blick hinein zeigt: Das Trennmittel ist als gewässergefährdend gekennzeichnet; Abschnitt 6 verlangt, ein Eindringen in die Kanalisation zu verhindern. Die Fässer kommen auf eine Wanne mit Abstand zum Schacht, der Schacht wird während der Belagsarbeiten abgedeckt.

**Lernpunkt**: Vertraute Produkte werden am häufigsten unterschätzt.` },
      { id: 'm7-l1-deep', kind: 'deep', title: 'Fachvertiefung: Stoffkenntnis als Grundlage', text: `### 1. Warum schon kleine Mengen zählen
Öle und Treibstoffe bilden auf Wasser einen Film, der den Gasaustausch behindert und Wasserlebewesen schädigt. Viele Bauchemikalien sind in kleinen Konzentrationen giftig für Fische und Kleinlebewesen. Über einen Meteorschacht gelangt ein ausgelaufener Kanister in Minuten in einen Bach. Im Grundwasser bleiben Verunreinigungen lange bestehen und können Trinkwasserfassungen gefährden. Deshalb ist die Frage nicht «Ist das giftig?», sondern «Was passiert, wenn das hier ausläuft?».

### 2. Typische Stoffe auf Baustellen

| Gruppe | Beispiele | Typisches Risiko |
|---|---|---|
| Treibstoffe | Diesel, Benzin (Kleingeräte), Alkylatbenzin | Betankung, Tankleck, Brand |
| Öle | Hydraulik-, Motor-, Getriebeöl | Schlauchbruch, Wartung im Feld |
| Schalöle, Trennmittel | Schalung, Walzen, Fertiger | Abtropfen, Regen spült ab |
| Bitumenprodukte | Emulsionen, Voranstriche, Kaltasphalt | Verschütten, Reinigung der Geräte |
| Betonzusatzmittel | Verflüssiger, Verzögerer, Beschleuniger | Überdosierung, Reste |
| Harze, Klebstoffe | Epoxid, Polyurethan | Mischplatz, Reste, Werkzeugreinigung |
| Farben, Lösungsmittel | Markierungen, Grundierungen, Verdünner | Reinigung von Pinseln und Geräten |
| Reinigungsmittel | Zementschleierentferner (oft säurehaltig) | Abwasser |
| Frostschutz, Kühlmittel | Maschinen | Wartung |

### 3. Das SDB kritisch lesen
SDB werden von Lieferanten erstellt und sind unterschiedlich gut. Achten Sie auf das **Ausgabedatum** und darauf, dass das SDB zum **gelieferten Produkt** passt (genaue Bezeichnung). Bei Widersprüchen oder unklaren Angaben fragen Sie den Lieferanten. Ein SDB in einer Sprache, die auf der Baustelle niemand versteht, erfüllt seinen Zweck nicht – verlangen Sie die Landessprache bzw. machen Sie eine Kurzfassung.

### 4. Substitution: der wirksamste Schutz
Bevor über Lagerung und Notfall nachgedacht wird, lohnt die Frage: **Gibt es ein weniger gefährliches Produkt?** Beispiele: biologisch schnell abbaubare Schal- und Hydrauliköle, lösemittelfreie Produkte, Gebinde in kleineren Grössen, vorkonfektionierte Mengen statt Abfüllen. Ein «biologisch abbaubares» Öl bleibt aber wassergefährdend und wird gleich sorgfältig behandelt (Modul 2).

### 5. Kennzeichnung auf der Baustelle
Was umgefüllt wird, muss **gekennzeichnet** bleiben: Produktname und Gefahren auf dem Gebinde. Getränkeflaschen sind für Chemikalien tabu – Verwechslungen führen immer wieder zu Vergiftungen. Unbeschriftete Gebinde sind ein Sicherheits- und Umweltrisiko, weil im Ereignis niemand weiss, womit er es zu tun hat.

### 6. Verbindung zur Arbeitssicherheit
Viele umweltgefährliche Stoffe sind auch für die Mitarbeitenden gefährlich (Haut, Atemwege). Die Pflicht des Arbeitgebers, Gefährdungen zu ermitteln und Schutzmassnahmen zu treffen, ergibt sich aus dem Arbeitsrecht; Suva und EKAS konkretisieren sie. Für Sie als Fachperson mit Hintergrund Arbeitssicherheit ist das eine Stärke: Umwelt- und Gesundheitsschutz lassen sich mit denselben Instrumenten (SDB, Betriebsanweisung, Instruktion) angehen.

### 7. Ihre Rolle
Sie müssen nicht jedes Produkt chemisch beurteilen können. Sie sorgen dafür, dass bekannt ist, **was** auf der Baustelle ist, **wo** es steht, **was im Ereignis zu tun ist** und **wer** zuständig ist. Bei unbekannten oder besonders gefährlichen Stoffen ziehen Sie den Lieferanten, eine Fachperson oder die kantonale Fachstelle bei.

§> Chemikalienrecht (ChemG, ChemV) und Arbeitsrecht sinngemäss, Artikel nicht genannt und nicht am Original geprüft. Einstufung einzelner Produkte nur gemäss deren Etikett und SDB.` },
      { id: 'm7-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm7-q03' },
      { id: 'm7-l1-abw', kind: 'decision', title: 'Abwägung: Der Eimer ohne Etikett', questionId: 'm7-d01' },
      { id: 'm7-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Stoffinventar eines Rohbaus', taskId: 'm7-t1' },
      { id: 'm7-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m7-q04', 'm7-q05'] },
      { id: 'm7-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm7-p1' },
      { id: 'm7-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Fast alle Öle, Treibstoffe und Bauchemikalien sind wassergefährdend – auch ohne Umwelt-Piktogramm.',
        'GHS-Piktogramme und H-Sätze zeigen die Gefahren; die Reihe H400 betrifft Gewässer.',
        'SDB: Abschnitte 2, 6, 7, 8, 12, 13 sind für die Baustelle zentral.',
        'Umgefülltes kennzeichnen; unbekannte Stoffe sichern und klären, nicht verwenden.',
        'Substitution prüfen – «biologisch abbaubar» bleibt wassergefährdend.',
      ] },
      { id: 'm7-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['chemg', 'chemv', 'gschg', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm7-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Lagerung und Umschlag auf der Baustelle',
    topics: ['m7-lagerung'],
    objectives: [
      'Die Grundsätze für die Lagerung wassergefährdender Stoffe auf Baustellen anwenden',
      'Umschlag und Abfüllen sicher organisieren',
      'Unverträgliche Stoffe trennen und Brandschutz mitdenken',
    ],
    steps: [
      { id: 'm7-l2-situation', kind: 'situation', title: 'Einstieg: Die Wanne im Regen', text: `Montag nach einem Regenwochenende. Die Auffangwanne neben dem Container ist randvoll mit Wasser, auf dem ein Ölfilm schimmert. Darin stehen drei Fässer, eines ist offen. Daneben liegen zwei Gasflaschen auf dem Boden, und ein Kanister Verdünner steht neben der Wanne.

Was ist hier alles falsch – und womit beginnen Sie?` },
      { id: 'm7-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m7-q06', 'm7-q07'] },
      { id: 'm7-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Grundsatz**: Wassergefährdende Stoffe werden so gelagert, dass nichts in Boden, Kanalisation oder Gewässer gelangen kann – auch nicht bei einem Leck, bei Regen oder beim Abfüllen.

**Auffangwanne**: dicht, ausreichend gross (Volumen gemäss kantonalen Vorgaben), **leer**, **überdacht** oder abgedeckt, gegen Anfahren geschützt.

**Ort**: auf befestigter Fläche, weg von Schächten, Gewässern und Böschungen; in Grundwasserschutzzonen gelten strenge Einschränkungen.

**Umschlag**: Abfüllen und Betanken nur über einer Wanne oder auf einer dichten Fläche, mit Bindemittel in Reichweite, nie unbeaufsichtigt.

**Trennen**: Unverträgliche Stoffe (z. B. Säuren und Laugen, Oxidationsmittel und Brennbares) nicht in derselben Wanne. Brennbares weg von Zündquellen.` },
      { id: 'm7-l2-explain', kind: 'explain', title: 'Lagerung: worauf es ankommt', text: `### Checkliste Baustellenlager

| Punkt | Anforderung (Grundsatz) |
|---|---|
| Fläche | Befestigt, dicht, ohne Gefälle zu Schacht oder Böschung |
| Rückhalt | Auffangwanne bzw. doppelwandiger Behälter; Volumen gemäss kantonalen Vorgaben |
| Witterung | Überdacht oder abgedeckt – Regenwasser in der Wanne nimmt Volumen weg und wird selbst verschmutzt |
| Schutz | Gegen Anfahren (Abstand, Abschrankung), gegen Unbefugte (abschliessbar) |
| Gebinde | Geschlossen, dicht, beschriftet, für den Stoff geeignet |
| Trennung | Unverträgliche Stoffe getrennt; Brennbares weg von Zündquellen und Wärme |
| Material | Bindemittel, Schachtabdeckung, Handschuhe in Reichweite |
| Information | Liste der gelagerten Produkte, SDB zugänglich, Notfallblatt |

### Mengen klein halten
Nur so viel auf der Baustelle, wie in absehbarer Zeit gebraucht wird. Grosse Mengen verlangen mehr Rückhalt, mehr Kontrolle und können eine Bewilligung auslösen.

### Bewilligungen und kantonale Vorgaben
Lageranlagen für wassergefährdende Flüssigkeiten können in **besonders gefährdeten Bereichen** bewilligungspflichtig sein; in **Grundwasserschutzzonen** sind sie stark eingeschränkt. Rückhaltevolumen, Abstände und Ausnahmen für Kleinmengen regeln die Kantone in ihren Vorgaben – die App nennt bewusst keine Zahlen.

### Regenwasser in der Wanne
Wasser in einer Auffangwanne ist ein häufiger Befund. Es darf nicht einfach ausgekippt werden, wenn es verschmutzt sein kann (Ölfilm, Geruch, Verfärbung): Es wird wie die Flüssigkeit selbst behandelt und entsorgt. Die Ursache wird behoben – mit einer Überdachung.

§> Grundsätze sinngemäss nach Art. 22 GSchG und den kantonalen Vorgaben zur Lagerung gefährlicher Stoffe (KVU-Leitfaden bzw. kantonale Merkblätter). Bewilligungspflicht in besonders gefährdeten Bereichen sinngemäss nach GSchG/GSchV; Schwellen und Volumen nicht wiedergegeben.` },
      { id: 'm7-l2-explain-2', kind: 'explain', title: 'Umschlag, Abfüllen, Transport', text: `### Umschlag ist der kritischste Moment
Die meisten Verluste entstehen nicht beim Lagern, sondern beim **Bewegen**: Abfüllen, Umfüllen, Betanken, Anliefern, Abholen.

- **Abfüllen** nur über einer Wanne oder auf einer dichten Fläche mit Rückhalt, mit geeigneter Pumpe oder Auslaufhahn statt Kippen.
- **Betanken** nur auf dem Betankungsplatz (Modul 2); Zapfpistole nicht arretieren, nicht unbeaufsichtigt.
- **Anlieferung** von Tankwagen: Platz vorher festlegen, Schacht abdecken, Fahrer und Polier anwesend.
- **Leere Gebinde** sind nicht leer: Reste darin sind wassergefährdend. Gebinde verschliessen und wie volle lagern, bis sie zurückgegeben oder entsorgt werden.

### Transport auf der Strasse
Treibstoffe und viele Bauchemikalien sind beim Transport **Gefahrgut**. Für den Strassentransport gilt in der Schweiz die SDR, die das europäische ADR übernimmt. Für Kleinmengen und Handwerkertransporte gibt es Erleichterungen; Voraussetzungen und Grenzen sind dort geregelt. Klären Sie mit der zuständigen Stelle Ihrer Firma (Gefahrgutbeauftragte/r, falls vorhanden), was für Ihre Fahrzeuge gilt – z. B. für den Transport von Dieselkanistern oder eines Tankanhängers.

### Mobile Tankanlagen
Tankanhänger und Tankcontainer sind Lageranlagen auf Rädern: doppelwandig oder in Wanne, Zapfstelle mit Abtropfschutz, abschliessbar, mit Notfallmaterial. Bei längerer Standzeit gelten dieselben Anforderungen an Ort und Rückhalt wie für ein festes Lager.

§> SDR (Gefahrgut Strasse) sinngemäss, Freistellungen nicht wiedergegeben und nicht geprüft. Anforderungen an mobile Tankanlagen gemäss Herstellerangaben und kantonalen Vorgaben.` },
      { id: 'm7-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Das Lager im Untergeschoss', context: 'Hochbau', text: `Auf einer engen Stadtbaustelle gibt es keinen Platz für ein Aussenlager. Die AVOR richtet im 2. Untergeschoss einen abschliessbaren Raum ein: Bodenabläufe abgedichtet, Regal mit Wannen, Bindemittel an der Tür, Liste der Produkte und SDB-Ordner an der Wand. Brennbares (Verdünner, Sprühdosen) steht in einem separaten Schrank. Abgefüllt wird nur über der Wanne.

**Lernpunkt**: Auch ohne Aussenfläche lässt sich ein sicheres Lager einrichten – wenn es geplant wird.` },
      { id: 'm7-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Tankanhänger an der Leitungsbaustelle', context: 'Tiefbau', text: `Für einen Leitungsbau über mehrere Kilometer wandert ein Tankanhänger mit. Der Umweltbeauftragte legt mit dem Polier fest: Standplatz jeweils auf befestigter Fläche, nie neben Einlaufschächten oder im Gewässerraum, Schachtabdeckung und Bindemittel im Anhänger, Zapfpistole abschliessbar. Bei einem Abschnitt in einer Grundwasserschutzzone wird der Anhänger ausserhalb der Zone abgestellt und die Maschinen werden dort betankt.

**Lernpunkt**: Eine mobile Anlage braucht an jedem neuen Standort dieselbe Prüfung wie ein festes Lager.` },
      { id: 'm7-l2-deep', kind: 'deep', title: 'Fachvertiefung: Lager, die auch im Ernstfall halten', text: `### 1. Denken in Ereignissen
Ein gutes Lager ist nicht eines, das im Normalbetrieb ordentlich aussieht, sondern eines, das bei einem **Fehler** hält: Fass kippt um, Hahn bleibt offen, Gabelstapler sticht in ein Gebinde, Starkregen, Brand. Fragen Sie für jedes Lager: Wohin läuft es, wenn das grösste Gebinde ausläuft? Reicht die Wanne? Was passiert mit Löschwasser?

### 2. Rückhaltevolumen
Wie gross eine Wanne sein muss, legen die kantonalen Vorgaben fest; sie richten sich in der Regel nach dem grössten Gebinde und der Gesamtmenge. Wichtig für die Praxis: Das Volumen nützt nur, wenn die Wanne **leer** ist. Eine halb mit Regenwasser gefüllte Wanne erfüllt die Vorgabe nicht mehr.

### 3. Unverträglichkeiten
Manche Stoffe reagieren miteinander: Säuren und Laugen (Wärme, Spritzer), Oxidationsmittel und Brennbares (Brand), bestimmte Reinigungsmittel und Chlorprodukte (giftige Gase). Abschnitt 7 und 10 des SDB nennen Unverträglichkeiten. Auf Baustellen genügt meist eine einfache Regel: Säuren, Laugen und Brennbares je in einer eigenen Wanne.

### 4. Brand und Löschwasser
Ein Brand im Lager kann Gebinde zerstören, und das Löschwasser nimmt die Stoffe mit. Grössere Lager brauchen deshalb ein Konzept für Löschwasserrückhalt; bei Baustellenlagern hilft vor allem: kleine Mengen, Abstand zu Gebäuden und Zündquellen, Feuerlöscher, Absprache mit der Feuerwehr bei grösseren Mengen.

### 5. Störfallvorsorge
Betriebe, die bestimmte Mengen gefährlicher Stoffe lagern, unterstehen der Störfallverordnung (StFV) mit eigenen Pflichten. Baustellen erreichen die Mengenschwellen meist nicht; grössere **Werkhöfe** mit Tankanlagen oder Chemikalienlagern können aber betroffen sein. Ob das zutrifft, klären Sie mit der kantonalen Fachstelle – die App nennt keine Schwellen.

### 6. Kontrolle
Ein Lager braucht eine verantwortliche Person und eine regelmässige Kontrolle: Wanne leer und dicht? Gebinde geschlossen und beschriftet? Material vorhanden? Liste aktuell? Für feste Tankanlagen gelten zusätzlich die Kontroll- und Unterhaltspflichten des Inhabers nach Gewässerschutzrecht (Lektion 5).

### 7. Typische Fehler
- Wanne voll Regenwasser, kein Dach.
- Fässer neben statt in der Wanne («nur kurz»).
- Leere Gebinde offen herumstehend.
- Umgefüllte Stoffe in unbeschrifteten Kanistern oder Getränkeflaschen.
- Lager direkt an der Zufahrt, ohne Anfahrschutz.
- Gasflaschen liegend und ungesichert.
- Bindemittel im abgeschlossenen Magazin, Schlüssel beim Polier.

§> Grundsätze sinngemäss nach GSchG, kantonalen Vorgaben zur Lagerung gefährlicher Stoffe und StFV (Geltungsbereich, ohne Mengenschwellen). Brandschutz nach kantonalen Brandschutzvorschriften (in der App nicht vertieft).` },
      { id: 'm7-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm7-q08' },
      { id: 'm7-l2-abw', kind: 'decision', title: 'Abwägung: Wasser in der Wanne', questionId: 'm7-d02' },
      { id: 'm7-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Lager für eine Brückensanierung', taskId: 'm7-t2' },
      { id: 'm7-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m7-q09', 'm7-q10'] },
      { id: 'm7-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm7-p2' },
      { id: 'm7-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Lager so, dass auch bei Leck, Regen und Abfüllen nichts in Boden, Kanalisation oder Gewässer gelangt.',
        'Wanne dicht, ausreichend, leer, überdacht, gegen Anfahren geschützt; Volumen nach kantonalen Vorgaben.',
        'Umschlag ist der kritischste Moment – nur über Rückhalt und nie unbeaufsichtigt.',
        'Unverträgliches trennen, Brennbares weg von Zündquellen; Mengen klein halten.',
        'Leere Gebinde sind nicht leer; Transport als Gefahrgut beachten.',
      ] },
      { id: 'm7-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'gschv', 'kvu-lagerung', 'sdr', 'stfv', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm7-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Bauchemikalien sicher einsetzen und entsorgen',
    topics: ['m7-chemikalien'],
    objectives: [
      'Den Einsatz von Bauchemikalien so planen, dass Reste und Abwasser vermieden werden',
      'Reinigung von Werkzeugen und Geräten umweltgerecht organisieren',
      'Reste, Gebinde und verschmutzte Materialien richtig entsorgen',
    ],
    steps: [
      { id: 'm7-l3-situation', kind: 'situation', title: 'Einstieg: Der Pinsel im Lavabo', text: `Am Ende des Tages wäscht ein Maler im WC-Container die Pinsel und Rollen aus. Das Abwasser des Containers läuft in die Schmutzwasserkanalisation. Draussen spült ein Plattenleger seinen Eimer mit Fliesenkleber am Hydranten aus, das Wasser läuft über den Platz. Und hinter dem Container stehen zehn «leere» Eimer Bitumenanstrich.

Was davon ist ein Problem – und wie organisieren Sie es besser?` },
      { id: 'm7-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m7-q11', 'm7-q12'] },
      { id: 'm7-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Bauchemikalien** – Farben, Lacke, Harze, Kleber, Bitumenprodukte, Betonzusatzmittel, Reiniger – sind oft wassergefährdend und bei Resten **Sonderabfall**.

**Vermeiden vor Entsorgen**: richtige Mengen bestellen, Gebindegrössen passend wählen, Reste aufbrauchen oder zurückgeben, weniger gefährliche Produkte bevorzugen.

**Reinigung**: Werkzeuge nicht in Lavabo, Schacht oder Wiese auswaschen. Möglichst trocken vorreinigen, Reste aushärten lassen oder sammeln, Reinigungswasser auffangen und nach Vorgabe behandeln bzw. entsorgen.

**Entsorgung**: Reste, nicht ausgehärtete Gebinde, verschmutzte Lappen und Bindemittel nach SDB Abschnitt 13 und Abfallklassierung – Sonderabfälle mit Begleitschein an berechtigte Entsorger (Modul 3).` },
      { id: 'm7-l3-explain', kind: 'explain', title: 'Einsatz planen, Reste vermeiden', text: `### Vor dem Einsatz
- **Produkt wählen**: gleiche Wirkung mit weniger Gefahr? Wasserbasiert statt lösemittelhaltig, vorkonfektionierte Mengen, kleinere Gebinde.
- **Menge planen**: so bestellen, dass möglichst wenig übrig bleibt; Rücknahme nicht angebrochener Gebinde mit dem Lieferanten vereinbaren.
- **Arbeitsplatz einrichten**: Mischplatz auf Folie oder in einer Wanne, weg von Schächten und Abläufen, Bindemittel bereit.
- **Instruktion**: Wer das Produkt verwendet, kennt Gefahren, Schutzmassnahmen und Entsorgungsweg (Kurzfassung des SDB).

### Während des Einsatzes
- Nur so viel anmischen, wie verarbeitet werden kann.
- Gebinde nach Gebrauch sofort verschliessen.
- Nichts in Schächte, Abläufe, Böden oder Gewässer gelangen lassen – auch kein «bisschen» Spülwasser.

### Subunternehmer
Die meisten Bauchemikalien bringen Subunternehmer (Maler, Bodenleger, Abdichter, Belagsbauer). Ihre Produkte, ihr Lager und ihre Reinigung gehören in Ihre Steuerung: SDB anfordern, Lagerort zuweisen, Reinigungsplatz festlegen, Entsorgung klären (Modul 8 und 10).

§> Grundsätze sinngemäss; produktspezifische Vorgaben im SDB. Entsorgungspflichten nach VVEA und VeVA (Modul 3).` },
      { id: 'm7-l3-explain-2', kind: 'explain', title: 'Reinigung und Entsorgung', text: `### Werkzeuge und Geräte reinigen

| Produktart | Vorgehen (Grundsatz) |
|---|---|
| Wasserbasierte Farben, Dispersionen | Trocken vorreinigen (abstreifen, ausrollen), dann in Gebinde mit wenig Wasser auswaschen; Reste absetzen bzw. eintrocknen lassen, nach Vorgabe der Gemeinde bzw. des Herstellers entsorgen – nicht in den Meteorschacht |
| Lösemittelhaltige Produkte | Mit wenig Verdünner in geschlossenem Behälter reinigen; verschmutzten Verdünner sammeln (Sonderabfall) |
| Zementgebundene Produkte (Kleber, Mörtel) | Wie Betonwaschwasser: auffangen, absetzen, neutralisieren (Modul 2) |
| Bitumenprodukte | Möglichst trocken; Reste und Lappen als Sonderabfall |
| Zwei-Komponenten-Harze | Reste aushärten lassen, wo das SDB es erlaubt; nicht ausgehärtete Reste als Sonderabfall |

Wie Reinigungswasser im Einzelfall abgeleitet werden darf, regeln Entwässerungskonzept, Gemeinde und Hersteller – im Zweifel sammeln und entsorgen.

### Was wohin?
- **Reste und nicht ausgehärtete Gebinde**: meist Sonderabfall – Abschnitt 13 SDB und Abfallklassierung.
- **Ausgehärtete Reste und trockene Gebinde**: je nach Produkt und Vorgabe als Bauabfall – nur, wenn sie wirklich ausgehärtet bzw. restentleert sind.
- **Verschmutzte Lappen, Bindemittel, Filter**: in der Regel Sonderabfall.
- **Altöl**: separat sammeln, nicht mischen (Sonderabfall).
- **Sprühdosen**: separat, Sonderabfall bzw. nach Vorgabe der Annahmestelle.

!> Nie verschiedene Reste zusammenschütten, um Gebinde zu sparen: Unverträgliche Stoffe können reagieren, und gemischte Abfälle sind schwerer und teurer zu entsorgen.

§> Entsorgung nach VVEA, VeVA und den Vorgaben der Annahmestellen; Einstufung im Einzelfall durch den Entsorger. In der App sinngemäss, ohne Abfallcodes.` },
      { id: 'm7-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der Reinigungsplatz für den Innenausbau', context: 'Hochbau', text: `Im Innenausbau eines Bürogebäudes arbeiten fünf Subunternehmer gleichzeitig. Die Umweltbeauftragte richtet mit dem Polier im Erdgeschoss einen Reinigungsplatz ein: Wanne mit drei Eimern (Vorreinigung, Spülen, Absetzen), Sammelbehälter für lösemittelhaltige Reste, Fass für verschmutzte Lappen, Plakat mit Bildern. Das Lavabo im WC-Container erhält ein Schild: «Keine Farben, Kleber, Mörtel». An der Koordinationssitzung erklärt sie den Platz allen Subunternehmern.

**Lernpunkt**: Wenn es einen guten Ort zum Reinigen gibt, wird er benutzt. Wenn nicht, wird das Lavabo benutzt.` },
      { id: 'm7-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Abdichtung einer Brückenplatte', context: 'Tiefbau', text: `Für die Abdichtung einer Brückenplatte über einem Fluss werden Epoxidgrundierung und Bitumenbahnen eingesetzt. Die AVOR legt fest: Anmischen nur auf der Brücke in einer Wanne mit Abstand zu den Entwässerungsöffnungen, die während der Arbeiten verschlossen sind; Reste aushärten lassen bzw. separat sammeln; keine Reinigung auf der Brücke. Ein Gebinde kippt trotzdem um – weil die Öffnungen abgedichtet sind, bleibt alles auf der Platte und wird mit Bindemittel aufgenommen.

**Lernpunkt**: Über Gewässern zählt jeder Tropfen – die Vorbereitung entscheidet, ob ein Missgeschick zum Ereignis wird.` },
      { id: 'm7-l3-deep', kind: 'deep', title: 'Fachvertiefung: Chemikalienmanagement auf der Baustelle', text: `### 1. Ein Stoffinventar für jede Baustelle
Wer nicht weiss, was auf der Baustelle ist, kann weder lagern noch im Ereignis richtig reagieren. Ein einfaches Inventar genügt: Produkt, Lieferant bzw. Subunternehmer, Gefahren (Piktogramme), Lagerort, Menge, SDB vorhanden. Es wird bei der Startsitzung angelegt und bei neuen Produkten ergänzt. Bei einem Ereignis ist es das erste Dokument, das die Feuerwehr fragt.

### 2. Freigabe neuer Produkte
In vielen Firmen werden Bauchemikalien ohne Prüfung bestellt. Ein einfacher Freigabeschritt hilft: Vor der ersten Bestellung eines neuen Produkts wird das SDB angeschaut – gibt es eine weniger gefährliche Alternative? Was braucht es für Lager, Arbeit und Entsorgung? Für Standardprodukte genügt eine Positivliste der Firma.

### 3. Betonzusatzmittel und Reiniger
Betonzusatzmittel werden meist im Werk zugegeben; auf der Baustelle sind sie bei Spritzbeton, Mörtel und Reparaturen ein Thema. Zementschleierentferner und Fassadenreiniger sind oft säurehaltig: Abwasser auffangen, neutralisieren bzw. entsorgen, nie in den Meteorschacht. Beides verschiebt den pH-Wert und kann Fische schädigen.

### 4. Schalöl und Trennmittel
Schalöle werden in grossen Mengen und oft unsorgfältig eingesetzt. Sparsam auftragen (Sprühgerät statt Kübel), Schalungen nicht über Schächten oder Gewässern einölen, abgetropftes Öl aufnehmen. Biologisch schnell abbaubare Produkte senken die Folgen, sind aber kein Freipass.

### 5. Entsorgung organisieren
Sonderabfälle brauchen einen **berechtigten Entsorger** und in der Regel einen **Begleitschein** (VeVA, Modul 3). Auf Baustellen bewährt sich ein Sammelbehälter für Sonderabfälle (abschliessbar, in Wanne, beschriftet) und eine feste Abholung. Kleinmengen werden oft über die Rücknahme des Lieferanten oder eine Sammelstelle entsorgt – Belege aufbewahren.

### 6. Was nicht passieren darf
- Reste in Schacht, Kanalisation, Boden oder Gewässer leeren.
- Reste «verdünnen», bis sie unauffällig sind.
- Sonderabfälle in die Mulde für Bauabfälle werfen.
- Gebinde mit Resten verbrennen.
Das ist nicht nur umweltschädlich, sondern kann strafbar sein. Und es ist meist auch teurer, wenn es entdeckt wird.

### 7. Ihr Beitrag
Sie machen das Richtige einfach: ein Reinigungsplatz, der funktioniert; ein Sammelbehälter, der da ist; eine Kurzfassung, die verstanden wird; eine Abholung, die läuft. Und Sie schauen hin, wo niemand hinschaut – hinter den Container und ins Lavabo.

§> Entsorgungspflichten nach VVEA und VeVA sinngemäss; Strafbarkeit allgemein nach Umweltrecht (Modul 1). Produktspezifische Angaben im SDB.` },
      { id: 'm7-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm7-q13' },
      { id: 'm7-l3-abw', kind: 'decision', title: 'Abwägung: Wohin mit dem Reinigungswasser?', questionId: 'm7-d03' },
      { id: 'm7-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Reinigungs- und Entsorgungskonzept Innenausbau', taskId: 'm7-t3' },
      { id: 'm7-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m7-q14', 'm7-q15'] },
      { id: 'm7-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm7-p3' },
      { id: 'm7-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Vermeiden vor Entsorgen: Produktwahl, passende Mengen, Rücknahme.',
        'Reinigung nie in Lavabo, Schacht oder Wiese – Reinigungsplatz einrichten.',
        'Reste, nicht ausgehärtete Gebinde, Lappen, Bindemittel meist Sonderabfall.',
        'Nichts zusammenschütten; Altöl separat.',
        'Subunternehmer und ihre Produkte gehören in die eigene Steuerung.',
      ] },
      { id: 'm7-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['chemv', 'vvea', 'veva', 'gschg', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm7-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Havariekonzept, Alarmierung und Ereignisbewältigung',
    topics: ['m7-havarie'],
    objectives: [
      'Ein Havariekonzept für eine Baustelle aufbauen',
      'Alarmierung und Meldewege bei Umweltereignissen sicher anwenden',
      'Ein Ereignis nachbereiten: Entsorgung, Dokumentation, Lehren',
    ],
    steps: [
      { id: 'm7-l4-situation', kind: 'situation', title: 'Einstieg: Freitag, 17.40 Uhr', text: `Der Polier ruft an: Beim Abkoppeln des Tankanhängers ist ein Schlauch abgerissen. Diesel läuft über den Platz Richtung Strasse. Die meisten Arbeiter sind schon weg. Er hat Bindemittel gestreut, «aber es ist mehr, als ich dachte». Er fragt: «Muss ich da jetzt wirklich jemanden anrufen?»

Was sagen Sie ihm – und was muss in den nächsten zehn Minuten geschehen?` },
      { id: 'm7-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m7-q16', 'm7-q17'] },
      { id: 'm7-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Havariekonzept** legt fest, welche Ereignisse möglich sind, wie reagiert wird, wer was tut, welches Material wo liegt und wer alarmiert wird.

**Die ersten Minuten** (Modul 2): eigene Sicherheit – dann gleichzeitig **stoppen, eindämmen, alarmieren**.

**Alarmierung**: Sobald ein Gewässer, die Kanalisation oder der Untergrund betroffen ist oder sein könnte, **sofort Feuerwehr 118 oder Polizei 117**. Sie bieten Ölwehr und das kantonale Pikett auf. Inhaber von Anlagen mit wassergefährdenden Flüssigkeiten müssen Verluste unverzüglich melden.

**Danach**: Material fachgerecht aufnehmen und entsorgen, Ereignis dokumentieren, Ursachen klären, Lehren ziehen – und die Kosten trägt in der Regel der Verursacher.` },
      { id: 'm7-l4-explain', kind: 'explain', title: 'Das Havariekonzept der Baustelle', text: `### Inhalt

| Teil | Inhalt |
|---|---|
| Mögliche Ereignisse | Leck an Tank oder Maschine, umgekippte Gebinde, Austritt von Bauchemikalien, Brand im Lager, Austritt von Zement- oder Schlammwasser, Starkregen |
| Gefährdete Schutzgüter | Schächte (Meteor/Schmutz), Gewässer, Grundwasser und Schutzzonen, Boden – mit Plan |
| Sofortmassnahmen | Je Ereignisart: stoppen, eindämmen, alarmieren – in einfacher Sprache und mit Bildern |
| Material | Bindemittel, Schachtabdeckungen, Auffangbehälter, ggf. Ölsperren – Menge und Standort |
| Alarmierung | Notrufnummern, interne Kette (Polier, Bauführung, Umweltfachperson), Nummern gemäss Bewilligung |
| Zuständigkeiten | Wer entscheidet vor Ort? Wer spricht mit Einsatzkräften und Behörden? |
| Nach dem Ereignis | Entsorgung, Dokumentation, Meldung an Bauherrschaft bzw. UBB gemäss Vertrag |

### Einfach und sichtbar
Das Konzept passt auf **eine Seite** pro Baustelle, hängt am Betankungsplatz, beim Lager und im Container und wird an der Startinstruktion erklärt – auch Subunternehmern. Grössere oder heikle Baustellen (Gewässer, Schutzzonen) üben es (Modul 10).

### Wichtige Nummern
Feuerwehr **118**, Polizei **117**, Sanität **144**, Tox Info Suisse **145** (Vergiftungen), Euro-Notruf **112**. Kantonale Pikettnummern und Fachstellen gemäss Bewilligung bzw. kantonalem Merkblatt – die Alarmierung läuft aber auch ohne sie über 118 oder 117.

§> Notrufnummern allgemein bekannt; Organisation der Ölwehr und des Gewässerschutz-Piketts ist kantonal. Inhalt des Havariekonzepts als bewährte Praxis; verbindlich sind Auflagen der Bewilligung.` },
      { id: 'm7-l4-explain-2', kind: 'explain', title: 'Alarmieren, melden, übergeben', text: `### Wann alarmieren?
**Sofort**, sobald ein Stoff in ein Gewässer, die Kanalisation oder den Untergrund gelangt ist oder gelangen kann – unabhängig von der Menge. Wenige Liter Diesel in einem Meteorschacht können einen Bach auf einer langen Strecke schädigen. Ist das sicher ausgeschlossen (z. B. kleine Menge auf dichter Fläche, vollständig aufgenommen), wird intern gemeldet und dokumentiert.

### Meldepflicht
Inhaber und Betreiber von Anlagen mit wassergefährdenden Flüssigkeiten müssen einen festgestellten Flüssigkeitsverlust unverzüglich melden und zumutbare Abwehrmassnahmen treffen. Auf der Baustelle betrifft das die Unternehmung, die Tank und Maschinen betreibt. Die Meldepflicht hängt nicht davon ab, ob man den Schaden «selbst im Griff» hat.

### Was beim Notruf sagen?
1. **Wo**: Adresse, Baustelle, Zufahrt, Treffpunkt.
2. **Was**: Stoff (Diesel, Hydrauliköl, Produktname), geschätzte Menge, läuft es noch?
3. **Wohin**: Schacht, Strasse, Bach, Boden – Fliessrichtung.
4. **Wer**: Name, Telefonnummer für Rückfragen.
5. **Was ist getan**: gestoppt, Schacht abgedeckt, Bindemittel.

### Übergabe an die Einsatzkräfte
Eine Person empfängt die Einsatzkräfte an der Zufahrt, kennt die Lage, hat das Stoffinventar bzw. SDB und den Entwässerungsplan. Ab dann führt die Einsatzleitung; die Baustelle unterstützt.

!> Nicht mit Wasser verdünnen oder wegspülen, keine Reinigungsmittel ins Wasser geben, nicht abwarten «ob es reicht». Frühes Alarmieren ist professionell – Verschweigen verschlimmert Schaden und Folgen.

§> Meldepflicht sinngemäss nach Art. 22 GSchG (in Modul 2 laut externer Prüfung Abs. 6; Wortlaut nicht selbst am Original geprüft). Kostentragung nach dem Verursacherprinzip (Art. 2 USG, Art. 54 GSchG, sinngemäss).` },
      { id: 'm7-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die Hydraulikleitung im Untergeschoss', context: 'Hochbau', text: `In der Baugrube platzt an einem Bohrgerät eine Hydraulikleitung; rund 30 Liter Öl laufen auf die Sauberkeitsschicht und in den Pumpensumpf der Wasserhaltung. Der Maschinist stellt ab, der Polier stoppt die Pumpe und alarmiert über 118, weil das Wasser der Wasserhaltung in die Kanalisation geleitet wird. Die Feuerwehr bindet das Öl, die Fachstelle lässt das Wasser im Sumpf abpumpen und entsorgen. Der verschmutzte Beton und das Bindemittel werden als Sonderabfall entsorgt; der Ereignisbericht geht an Bauleitung und Fachstelle.

**Lernpunkt**: Die Pumpe der Wasserhaltung ist ein Weg nach draussen – im Havariekonzept muss sie vorkommen.` },
      { id: 'm7-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Der abgerissene Schlauch', context: 'Tiefbau', text: `Im Fall aus dem Einstieg sagt die Umweltbeauftragte dem Polier: «Ja, ruf sofort 118 an – Diesel läuft Richtung Strasse, dort sind Einlaufschächte.» Sie bittet ihn, die Schächte an der Strasse abzudecken, soweit es gefahrlos geht, und den Feuerwehrleuten an der Einfahrt den Weg zu zeigen. Sie selbst informiert den Bauführer und fährt hin. Die Feuerwehr dichtet zwei Schächte ab und bindet den Diesel; ein Schacht hatte schon etwas aufgenommen und wird gespült. Am Montag ersetzt die Firma die Abreisskupplung durch eine mit Sicherung und nimmt das Abkoppeln in die Instruktion auf.

**Lernpunkt**: Die Frage «Muss ich anrufen?» beantwortet sich mit dem Weg des Stoffs – und im Zweifel mit Ja.` },
      { id: 'm7-l4-deep', kind: 'deep', title: 'Fachvertiefung: Ereignisse bewältigen und daraus lernen', text: `### 1. Vorbereitung entscheidet
Ob ein Ereignis klein bleibt, entscheidet sich vorher: Gibt es Material am richtigen Ort? Kennen die Leute die Reihenfolge? Sind die Schächte im Plan bekannt? Ist klar, wer alarmiert? Ein Havariekonzept, das nur im Ordner steht, nützt um 17.40 Uhr am Freitag nichts.

### 2. Gleichzeitig statt nacheinander
In Modul 2 wurde betont: Nach der eigenen Sicherheit laufen Stoppen, Eindämmen und Alarmieren **gleichzeitig**. Sind zwei Personen da, alarmiert eine sofort. Ist eine Person allein, alarmiert sie, sobald die Gefährdung erkennbar ist, und dämmt dann weiter ein. Zeit mit internen Rückfragen zu verlieren, ist der häufigste Fehler.

### 3. Grenzen des Eingreifens
Eigenschutz geht vor: Bei Brandgefahr (Benzin, Lösungsmittel), Dämpfen in Schächten und Gruben oder bei unbekannten Stoffen halten Sie Abstand, sperren ab und warten auf die Einsatzkräfte. Niemand steigt in Schächte oder ins Gewässer. Ölsperren im Gewässer setzen nur instruierte Personen vom sicheren Ufer aus – sonst die Feuerwehr bzw. Ölwehr.

### 4. Nach dem Einsatz
- **Aufnahme und Entsorgung**: Verschmutztes Bindemittel, Erdreich, Schachtinhalt und Wasser werden nach den Vorgaben der Fachstelle aufgenommen und durch berechtigte Entsorger entsorgt – meist als Sonderabfall mit Begleitschein.
- **Untersuchungen**: Die Fachstelle kann Abklärungen verlangen (z. B. Bodenproben). Folgen Sie den Anordnungen und dokumentieren Sie sie.
- **Kosten**: Einsatz der Feuerwehr, Reinigung, Entsorgung und Abklärungen werden in der Regel dem Verursacher in Rechnung gestellt; Versicherung und Vertrag klären die interne Verteilung.

### 5. Der Ereignisbericht
Zeitnah und sachlich: Zeitpunkt, Ort, Stoff, Menge (geschätzt, als Schätzung gekennzeichnet), Ablauf, Sofortmassnahmen, Alarmierung (wann, wer, an wen), betroffene Schutzgüter, Entsorgung, Kosten, Ursachen, Massnahmen. Fotos von Anfang an. Der Bericht geht an die Linie und – je nach Vertrag und Auflage – an Bauherrschaft, UBB und Behörde. Für Stil und Ablage gilt, was in Modul 9 für Kontrollberichte gesagt wurde.

### 6. Ursachen und Lehren
Typische Ursachen: fehlende oder falsche Ausrüstung (Kupplung ohne Sicherung, Wanne zu klein), Wartungsmängel (alte Hydraulikschläuche), Zeitdruck (Abkoppeln im Dunkeln), fehlende Instruktion (Subunternehmer), Planung (Tankplatz neben Schacht). Die Korrekturmassnahme setzt dort an – und die Lehre geht an **alle** Baustellen (Modul 9 und 10).

### 7. Kommunikation
Bei grösseren Ereignissen interessieren sich Anwohnende, Medien und Bauherrschaft. Wer spricht? In der Regel die Einsatzleitung bzw. Behörde und für die Firma eine bezeichnete Person (Geschäftsleitung). Mitarbeitende auf der Baustelle verweisen freundlich an diese Stellen und äussern keine Vermutungen über Ursachen oder Schuld.

### 8. Kultur
Ereignisse werden nur gemeldet, wenn Melden nicht bestraft wird. Ein Polier, der sofort alarmiert und sauber dokumentiert, verdient Anerkennung – auch wenn der Schlauch auf seiner Baustelle gerissen ist. Wer verschweigt, gefährdet die Umwelt, die Firma und sich selbst.

§> Meldepflicht und Kostentragung sinngemäss nach GSchG und USG; Organisation der Ereignisbewältigung kantonal. Strafbarkeit allgemein (Modul 1).` },
      { id: 'm7-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm7-q18' },
      { id: 'm7-l4-abw', kind: 'decision', title: 'Abwägung: «Wir haben es ja aufgenommen»', questionId: 'm7-d04' },
      { id: 'm7-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Havariekonzept auf einer Seite', taskId: 'm7-t4' },
      { id: 'm7-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m7-q19', 'm7-q20'] },
      { id: 'm7-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm7-p4' },
      { id: 'm7-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem Polier (Feynman-Methode)', feynmanId: 'm7-f1' },
      { id: 'm7-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Havariekonzept auf einer Seite: Ereignisse, Schutzgüter, Sofortmassnahmen, Material, Alarmierung, Zuständigkeiten.',
        'Eigene Sicherheit, dann gleichzeitig stoppen, eindämmen, alarmieren.',
        'Sofort 118 oder 117, wenn Gewässer, Kanalisation oder Untergrund betroffen sein können – unabhängig von der Menge.',
        'Notruf: wo, was, wohin, wer, was ist getan.',
        'Danach: fachgerecht entsorgen, Ereignisbericht, Ursachen beseitigen, Lehren für alle Baustellen.',
      ] },
      { id: 'm7-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'usg', 'notruf', 'kanton-merkblatt', 'veva', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm7-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Werkhof, Tankanlagen und Kontrollen',
    topics: ['m7-werkhof'],
    objectives: [
      'Die Umweltrisiken eines Werkhofs erkennen',
      'Pflichten für Tankanlagen und Waschplätze einordnen',
      'Eine wirksame Werkhofkontrolle durchführen',
    ],
    steps: [
      { id: 'm7-l5-situation', kind: 'situation', title: 'Einstieg: Der Werkhof seit 1988', text: `Der Werkhof Ihrer Firma steht seit 1988 am Ortsrand. Es gibt eine Dieseltankstelle mit unterirdischem Tank, einen Waschplatz für Maschinen mit Ölabscheider, ein Lager mit Ölen und Bauchemikalien, eine Werkstatt und einen Platz für zurückgebrachtes Material von den Baustellen. Niemand weiss genau, wann der Tank zuletzt kontrolliert und der Ölabscheider geleert wurde.

Wo beginnen Sie?` },
      { id: 'm7-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m7-q21', 'm7-q22'] },
      { id: 'm7-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Werkhof** ist eine dauerhafte Anlage mit konzentrierten Risiken: Tankanlagen, Waschplätze, Werkstatt, Lager, Abfälle, zurückgebrachtes Material.

**Tankanlagen**: Der Inhaber muss sie so erstellen, betreiben und **regelmässig kontrollieren** lassen, dass keine Gewässer gefährdet werden. Je nach Anlage und Kanton gibt es Bewilligungs-, Melde- und Kontrollpflichten.

**Waschplätze und Werkstätten**: Abwasser mit Öl und Schlamm wird über geeignete Anlagen (z. B. Schlammfang, Ölabscheider) behandelt und nur mit Bewilligung eingeleitet; die Anlagen werden gewartet und entleert.

**Kontrolle**: Eine regelmässige, dokumentierte Werkhofkontrolle mit klaren Verantwortlichen – und Nachweisen für Tankkontrollen, Abscheider-Leerungen und Entsorgungen.` },
      { id: 'm7-l5-explain', kind: 'explain', title: 'Risiken und Pflichten im Werkhof', text: `### Risiken nach Bereichen

| Bereich | Risiko | Typische Massnahmen |
|---|---|---|
| Tankanlage | Leck im Tank oder in Leitungen, Überfüllen, Betankungsverluste | Doppelwandig bzw. Rückhalt, Leckanzeige, Überfüllsicherung, dichter Betankungsplatz mit Abscheider, Kontrollen |
| Waschplatz | Öl, Schlamm, Reinigungsmittel im Abwasser | Schlammfang und Ölabscheider, Wartung, Einleitbewilligung, keine aggressiven Reiniger |
| Werkstatt | Altöl, Filter, Batterien, Lösungsmittel | Auffangwannen, getrennte Sammlung, Entsorgung mit Nachweis |
| Lager | Wie Baustellenlager, aber grössere Mengen | Rückhalt, Trennung, Brandschutz, ggf. Störfallabklärung |
| Platz für Rückschub | Belastetes Material, Reste, Gebinde von Baustellen | Getrennte, befestigte und gedeckte Flächen; Annahme kontrollieren |
| Entwässerung | Platzwasser von verschmutzten Flächen | Trennung sauber/verschmutzt, Behandlung, Kataster der Leitungen |

### Rechtsrahmen (Überblick)
- **Gewässerschutz**: Pflichten des Inhabers von Anlagen mit wassergefährdenden Flüssigkeiten (Art. 22 GSchG); weitere Vorschriften zu Lageranlagen und zur Bewilligungspflicht in besonders gefährdeten Bereichen in der GSchV; kantonale Vorgaben zu Bau, Betrieb und Kontrolle.
- **Abwasser**: Einleitung von Betriebsabwasser nur mit Bewilligung bzw. Zustimmung, Vorbehandlung nach Stand der Technik.
- **Abfälle**: Sonderabfälle mit Begleitschein (VeVA), Trennung (VVEA).
- **Störfallvorsorge**: StFV, falls Mengenschwellen erreicht werden.
- **Standortbewilligungen**: Baubewilligung des Werkhofs mit Auflagen.

§> Rechtsrahmen sinngemäss; Artikel der GSchV zu Lageranlagen, Kontrollfristen und Mengenschwellen bewusst nicht genannt und nicht geprüft. Massgebend sind kantonale Vorgaben und die Bewilligungen des Standorts.` },
      { id: 'm7-l5-explain-2', kind: 'explain', title: 'Die Werkhofkontrolle', text: `### Rhythmus und Zuständigkeit
Eine verantwortliche Person (z. B. Werkhofchef/in) kontrolliert laufend; die Umweltfachperson macht periodisch eine Kontrolle mit Checkliste und prüft die Nachweise. Externe Kontrollen (Tankanlage, Abscheider) gemäss kantonalen Vorgaben bzw. Bewilligung.

### Was kontrolliert wird
- **Tankanlage**: Leckanzeige funktioniert, keine Ölspuren, Betankungsplatz sauber, Nachweis der letzten Kontrolle.
- **Abscheider und Schlammfang**: Füllstand, letzte Leerung, Entsorgungsbeleg.
- **Waschplatz**: Nur geeignete Reinigungsmittel, kein Waschen ausserhalb, Abläufe intakt.
- **Lager und Werkstatt**: wie Baustellenlager (Lektion 2), Altöl und Filter getrennt, Batterien geschützt.
- **Rückschubplatz**: Material getrennt, beschriftet, kein Verdacht auf Belastung ohne Abklärung.
- **Entwässerung**: Schächte sauber, Platzwasser von verschmutzten Flächen behandelt.
- **Nachweise**: Kontrollberichte, Leerungen, Begleitscheine, Bewilligungen – an einem Ort.

### Typische Befunde
Leckanzeige seit Monaten im Störungsmodus, Abscheider nie geleert, Maschinen werden neben dem Waschplatz gereinigt, Altöl in alten Getränkekisten, Rückschub mit unbekannten Gebinden, Bewilligung des Waschplatzes nicht auffindbar.

§> Häufigkeit und Umfang externer Kontrollen gemäss kantonalen Vorgaben und Bewilligung – in der App nicht wiedergegeben.` },
      { id: 'm7-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Der Ölabscheider, den keiner kannte', context: 'Hochbau', text: `Bei der ersten Werkhofkontrolle einer Hochbaufirma findet die neue Umweltbeauftragte einen Ölabscheider unter einer Stahlplatte im Waschplatz. Niemand weiss, wann er zuletzt geleert wurde; eine Einleitbewilligung ist nicht auffindbar. Sie lässt den Abscheider durch eine Fachfirma leeren und kontrollieren (Beleg), fragt bei der Gemeinde nach der Bewilligung und legt einen Wartungsplan an. Ergebnis: Die Bewilligung existiert und verlangt eine jährliche Leerung mit Meldung – die seit Jahren nicht gemacht wurde. Die Firma meldet das nach Rücksprache mit der Geschäftsleitung und holt die Leerungen nach.

**Lernpunkt**: Die alten Anlagen sind oft die vergessenen – und die Bewilligung sagt, was geschuldet ist.` },
      { id: 'm7-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Rückschub mit Überraschung', context: 'Tiefbau', text: `Von einer Strassenbaustelle kommen mit dem Rückschub zwei angerostete Fässer ohne Etikett in den Werkhof. Der Werkhofchef stellt sie in eine Wanne im gedeckten Bereich und meldet sie. Abklärungen ergeben: Sie stammen von einem Subunternehmer und enthalten alte Bitumenemulsion. Der Subunternehmer muss sie über einen berechtigten Entsorger zurücknehmen. Die Firma führt eine Regel ein: Kein Rückschub von Gebinden ohne Etikett und Herkunftsangabe.

**Lernpunkt**: Der Werkhof wird schnell zur Sammelstelle für alles, was auf Baustellen niemand will – ohne Regeln für die Annahme.` },
      { id: 'm7-l5-deep', kind: 'deep', title: 'Fachvertiefung: Den Werkhof als Anlage führen', text: `### 1. Werkhof ist Betrieb, nicht Lager
Anders als eine Baustelle ist ein Werkhof eine **dauerhafte Anlage** mit eigener Bewilligung, eigenen Auflagen und einem Inhaber, der für Bau, Betrieb und Unterhalt verantwortlich ist. Viele Werkhöfe sind über Jahrzehnte gewachsen: Anlagen wurden ergänzt, Bewilligungen sind verstreut, Verantwortlichkeiten unklar. Der erste Schritt ist deshalb eine **Bestandesaufnahme**: Welche Anlagen gibt es, welche Bewilligungen, welche Pflichten, welche Nachweise?

### 2. Tankanlagen
Für Tankanlagen gelten Pflichten zu Bau, Betrieb und Kontrolle, die je nach Grösse, Bauart (ober- oder unterirdisch, ein- oder doppelwandig) und Standort verschieden sind. Viele Kantone führen ein Verzeichnis der Tankanlagen und verlangen Meldungen bei Änderungen, Ausserbetriebnahme und Ereignissen. Klären Sie mit der kantonalen Fachstelle, was für Ihre Anlagen gilt, und führen Sie die Nachweise vollständig. Ausser Betrieb genommene Tanks werden fachgerecht entleert, gereinigt und gesichert oder entfernt – nicht einfach stehen gelassen.

### 3. Abwasser des Werkhofs
Waschplatz, Werkstatt und Betankungsplatz erzeugen Abwasser mit Öl, Schlamm und Reinigungsmitteln. Es wird über Schlammfang und Abscheider vorbehandelt und mit Bewilligung in die Schmutzwasserkanalisation geleitet. Probleme entstehen, wenn: Abscheider nicht gewartet werden (dann wirken sie nicht), Reinigungsmittel das Öl emulgieren (dann trennt der Abscheider nicht mehr), oder verschmutztes Platzwasser in die Meteorleitung gelangt. Fragen Sie Lieferanten nach abscheiderverträglichen Reinigern.

### 4. Abfälle und Rückschub
Der Werkhof sammelt Abfälle aus allen Baustellen: Altöl, Filter, Batterien, Bindemittel, Reste von Bauchemikalien, Gebinde. Getrennt sammeln, beschriften, in Wannen und gedeckt lagern, mit berechtigten Entsorgern und Begleitschein entsorgen. Für den Rückschub von Baustellen braucht es Regeln: Was darf zurück, wie gekennzeichnet, wer prüft?

### 5. Altlastenrisiko
Werkhöfe, die seit Jahrzehnten betrieben werden, können selbst zu belasteten Standorten werden – durch Tropfverluste, alte Tanks, versickertes Waschwasser. Ein Eintrag im Kataster der belasteten Standorte ist möglich. Saubere Anlagen und Nachweise schützen nicht nur die Umwelt, sondern auch den Wert des Grundstücks.

### 6. Organisation
- Eine verantwortliche Person mit Stellvertretung.
- Ein Ordner bzw. eine digitale Ablage «Werkhof Umwelt» mit Bewilligungen, Plänen, Kontrollen, Wartungen, Entsorgungsbelegen.
- Ein Jahresplan mit allen Fristen.
- Eine Werkhofkontrolle mit Checkliste (Fachbibliothek) und Nachverfolgung (Modul 9).
- Einbezug in das Umweltmanagementsystem: Werkhof als Standort mit eigenen Aspekten und Verpflichtungen (Modul 10).

### 7. Notfall im Werkhof
Auch der Werkhof braucht ein Havariekonzept – mit grösseren Mengen und oft mit Anlagen, die über die Kanalisation direkt mit der ARA verbunden sind. Notfallmaterial an Tankstelle, Waschplatz und Lager; Absperrschieber, wo vorhanden, bekannt und geübt.

### 8. Ihre Rolle
Sie sorgen für den Überblick: Was ist geschuldet, was ist gemacht, was fehlt? Die Umsetzung liegt beim Werkhof. Wo Pflichten seit Jahren nicht erfüllt wurden, sprechen Sie das offen an und schlagen mit der Geschäftsleitung den Weg zur Bereinigung vor – auch gegenüber der Behörde.

§> Pflichten für Tankanlagen und Betriebsabwasser sinngemäss nach GSchG/GSchV und kantonalen Vorgaben; Altlasten nach AltlV (sinngemäss). Keine Fristen oder Schwellen wiedergegeben.` },
      { id: 'm7-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm7-q23' },
      { id: 'm7-l5-abw', kind: 'decision', title: 'Abwägung: Versäumte Pflichten im Werkhof', questionId: 'm7-d05' },
      { id: 'm7-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Bestandesaufnahme Werkhof', taskId: 'm7-t5' },
      { id: 'm7-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m7-q24', 'm7-q25'] },
      { id: 'm7-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm7-p5' },
      { id: 'm7-l5-feynman', kind: 'feynman', title: 'Erklären Sie es dem Werkhofchef (Feynman-Methode)', feynmanId: 'm7-f2' },
      { id: 'm7-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Werkhof = dauerhafte Anlage mit Bewilligung, Inhaberpflichten und konzentrierten Risiken.',
        'Tankanlagen: bauen, betreiben, kontrollieren lassen – Pflichten nach Bauart, Grösse und Kanton.',
        'Waschplatz und Werkstatt: Vorbehandlung (Schlammfang, Abscheider), Wartung, Einleitbewilligung.',
        'Rückschub und Abfälle mit klaren Regeln; Sonderabfälle mit Begleitschein.',
        'Bestandesaufnahme, Jahresplan, Kontrolle mit Nachweisen; Versäumtes offen bereinigen.',
      ] },
      { id: 'm7-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['gschg', 'gschv', 'kvu-lagerung', 'veva', 'stfv', 'altlv', 'praxis'] },
    ],
  },
];
