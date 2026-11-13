import type { Lesson } from '../types';

// Modul 3 «Bauabfälle, Rückbau und Kreislaufwirtschaft».
// «bestätigt» = am 13.11.2026 über BAFU-, Suva-/EKAS- bzw. kantonale Unterlagen abgeglichen
// (nicht am Fedlex-Volltext). Übrige Rechtsaussagen sinngemäss, zu prüfen.

const M = 'm3';
const E = 'entwurf' as const;

export const M3_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm3-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Abfallarten, Klassierung und Entsorgungswege',
    topics: ['m3-klassierung'],
    objectives: [
      'Den Abfallbegriff und die Grundsätze «vermeiden – verwerten – umweltverträglich entsorgen» anwenden',
      'Sonderabfälle, andere kontrollpflichtige Abfälle und übrige Bauabfälle unterscheiden',
      'Die Deponietypen A bis E grob zuordnen',
      'Die Trennpflicht auf der Baustelle umsetzen',
    ],
    steps: [
      { id: 'm3-l1-situation', kind: 'situation', title: 'Einstieg: Die eine Mulde', text: `Auf einer kleinen Umbaustelle steht eine einzige Mulde. Darin: Backstein, Gipsplatten, Holzlatten, Kunststofffolie, ein leerer Farbkessel, zwei Spraydosen und Dachpappe. Der Polier: «Das sortiert die Anlage. Eine zweite Mulde hat keinen Platz.»

Was ist daran falsch – und was ist es dem Unternehmen wert, das zu ändern?` },
      { id: 'm3-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m3-q01', 'm3-q02'] },
      { id: 'm3-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Abfall ist, was man loswerden will – oder loswerden muss.** Für Abfälle gilt die Reihenfolge: vermeiden, verwerten, umweltverträglich entsorgen.

**Sonderabfälle** (z. B. Asbest, ölhaltige Abfälle, Farbreste, Spraydosen) werden getrennt gesammelt und nur mit **Begleitschein** an berechtigte Entsorger übergeben.

**Übrige Bauabfälle** werden auf der Baustelle **getrennt** – nur wo das betrieblich nicht geht, in einer Sortieranlage.

**Deponien gibt es in fünf Typen (A–E)**: A für unverschmutzten Aushub, B für mineralische Abfälle mit geprüften Werten, bis E für stärker belastete Abfälle. Je höher der Typ, desto teurer. Die Stichworte sind vereinfacht – welche Abfälle eine Deponie annehmen darf, bestimmen die Annahmekriterien und Grenzwerte in Anhang 5 VVEA und die Analysen.` },
      { id: 'm3-l1-explain', kind: 'explain', title: 'Abfallbegriff, Grundsätze, Kategorien', text: `### Was ist Abfall?
Abfälle sind bewegliche Sachen, deren sich der Inhaber entledigt oder deren Entsorgung im öffentlichen Interesse geboten ist (Art. 7 Abs. 6 USG, sinngemäss). Abbruchmaterial, Verpackungen, Restbeton, Aushub, Schlamm – alles Abfall im Rechtssinn, auch wenn es später wieder verwertet wird.

### Grundsätze
Abfälle sollen vermieden, verwertet und umweltverträglich entsorgt werden; die Entsorgung soll, soweit möglich und sinnvoll, im Inland erfolgen (Art. 30 USG, sinngemäss). Die **VVEA** (SR 814.600) konkretisiert das, für Baustellen insbesondere Art. 16 (Entsorgungsangaben), Art. 17 (Trennung), Art. 18 (Boden), Art. 19 (Aushub) und Art. 20 (mineralische Bauabfälle, Ausbauasphalt).

### Kategorien im Verkehr mit Abfällen
Die Verordnung über den Verkehr mit Abfällen (**VeVA**) und das Abfallverzeichnis (**LVA**) ordnen jeden Abfall einem **Code** zu:
- **Sonderabfälle (S)**: z. B. asbesthaltige Abfälle, ölverschmutztes Material, Farb- und Lösungsmittelreste, PCB-haltige Abfälle. Abgabe nur an berechtigte Entsorgungsunternehmen, mit **Begleitschein**.
- **Andere kontrollpflichtige Abfälle (ak)**: z. B. bestimmte Holzabfälle; Abgabe an berechtigte Empfänger, oft mit vereinfachtem Nachweis.
- **Übrige Abfälle**: z. B. Betonabbruch, Mischabbruch, unverschmutzter Aushub, Metalle – mit Lieferschein bzw. Waagschein.
Die UVEK-Zuordnungsliste hilft, Abfälle LVA- und VVEA-Codes zuzuordnen.

§> USG Art. 7 und 30 sinngemäss; VVEA, VeVA, LVA gesetzlich verbindlich. Codes und Einzelzuordnungen im Abfallverzeichnis prüfen.` },
      { id: 'm3-l1-diagram', kind: 'diagram', title: 'Schema: Deponietypen A bis E', diagram: 'deponietypen', caption: 'Vereinfachte Lernhilfe. Die Zuordnung im Einzelfall richtet sich nach Anhang 5 VVEA und den Analysen.' },
      { id: 'm3-l1-explain-2', kind: 'explain', title: 'Trennen auf der Baustelle', text: `### Was Art. 17 VVEA verlangt
Bei Bauarbeiten sind Sonderabfälle getrennt von den übrigen Abfällen zu entsorgen. Die übrigen Bauabfälle sind auf der Baustelle zu trennen – mindestens in die Fraktionen, die die Verordnung bzw. der Kanton vorgibt (typisch: unverschmutzter Aushub, mineralische Bauabfälle wie Beton- und Mischabbruch, brennbare Abfälle, Metalle). Ist das betrieblich nicht möglich, muss in geeigneten Anlagen getrennt werden. Die Behörde kann eine weitergehende Trennung verlangen, wenn dadurch zusätzlich verwertet werden kann (bestätigt).

### Warum sich Trennen lohnt
- **Kosten**: Gemischte Bauabfälle sind deutlich teurer als sortenreine Fraktionen; Sortieranlagen verrechnen den Aufwand.
- **Verwertung**: Sortenreiner Betonabbruch wird zu Recyclinggranulat; im Gemisch landet er oft in der Verbrennung oder Deponie.
- **Risiko**: Ein Sonderabfall in der gemischten Mulde (z. B. Asbestplatte, Spraydose) kann die ganze Ladung zum Sonderabfall machen.

### Praktische Umsetzung
- **Muldenkonzept** im Installationsplan: Anzahl, Fraktionen, Standorte, Beschriftung mit Bildern.
- **Sonderabfall-Sammelstelle**: abschliessbar, gedeckt, auf Auffangwanne, beschriftete Gebinde.
- **Instruktion** inkl. Subunternehmer; **Kontrolle** in der Wochenbegehung; **Entsorgungsnachweise** sammeln.
- Wenig Platz? Kleinmulden, Big Bags, Abholung nach Bedarf – oder Trennung im Werkhof.` },
      { id: 'm3-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Muldenkonzept beim Umbau', context: 'Hochbau', text: `Umbau eines Mehrfamilienhauses mit engem Vorplatz. Statt einer grossen Mischmulde stehen drei kleine Mulden (Mischabbruch, Holz, Brennbares), dazu Big Bags für Metall und ein abschliessbarer Kasten für Sonderabfälle (Farbreste, Spraydosen, Kartuschen). Jede Mulde trägt ein Schild mit Bildern, was hinein darf.

Ergebnis nach drei Monaten: Entsorgungskosten rund ein Drittel tiefer als bei einem vergleichbaren Umbau mit Mischmulde (Erfahrungswert des Unternehmens, projektabhängig), keine Reklamation des Entsorgers.

**Lernpunkt**: Trennen ist eine Frage der Organisation, nicht des Platzes.` },
      { id: 'm3-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Grabenaushub und Belag', context: 'Tiefbau', text: `Werkleitungsersatz in einer Quartierstrasse: Ausbauasphalt, Fundationsschicht (Kies), Aushub, alte Gussrohre, ein Abschnitt mit dunklem, nach Teer riechendem Belag.

Getrennt werden: Ausbauasphalt (vorab auf PAK untersucht), Kiesfundation (Verwertung als Recyclingmaterial), Aushub (Triage nach Verschmutzung), Metall. Der verdächtige Abschnitt wird separat abgetragen und beprobt.

**Lernpunkt**: Im Tiefbau entscheidet die Triage vor dem Abtransport über Kosten und Rechtssicherheit.` },
      { id: 'm3-l1-deep', kind: 'deep', title: 'Fachvertiefung: Codes, Begleitscheine, Deponien, Verantwortung', text: `### 1. Vom Abfall zum Code
Jeder Abfall erhält im Abfallverzeichnis (LVA) einen sechsstelligen Code und eine Einstufung (S, ak oder ohne Kennzeichnung). Für die Baustelle zählen vor allem die Codes aus dem Kapitel «Bau- und Abbruchabfälle». Die Einstufung hängt vom **Schadstoffgehalt** ab: Dasselbe Material kann je nach Analyse unverschmutzt, schwach oder stark belastet sein.

### 2. Begleitschein und Nachweise
Für Sonderabfälle schreibt die VeVA einen Begleitschein vor; er dokumentiert Abgeber, Transporteur und Empfänger. Die Abgabe ist nur an Unternehmen mit Bewilligung für den betreffenden Code zulässig. Für die übrigen Abfälle genügen Lieferscheine bzw. Waagscheine – sie sind trotzdem die Grundlage für die Entsorgungsbilanz, die viele Bauherrschaften und Behörden verlangen.

### 3. Deponietypen A bis E
Die VVEA unterscheidet fünf Typen (Anhang 5, bestätigt):
- **Typ A**: unverschmutztes Aushub- und Ausbruchmaterial.
- **Typ B**: Inertstoffe, z. B. mineralische Bauabfälle, die Grenz- und Eluatwerte nachweislich einhalten (früher «Inertstoffdeponie»).
- **Typ C**: bestimmte anorganische, schwer lösliche Abfälle.
- **Typ D**: Verbrennungsrückstände (z. B. KVA-Schlacke).
- **Typ E**: stärker belastete Abfälle, z. B. verschmutzter Aushub oberhalb der Typ-B-Werte.
Ablagern ist der letzte Weg; vorher ist zu prüfen, ob verwertet werden kann bzw. muss.

### 4. Wer ist verantwortlich?
- Der **Inhaber** des Abfalls trägt die Kosten der Entsorgung (Verursacherprinzip, Art. 32 USG sinngemäss).
- Die **Bauherrschaft** liefert mit dem Baugesuch die Angaben zur Entsorgung (Art. 16 VVEA).
- Die **Unternehmung** trennt, lagert, übergibt an berechtigte Entsorger und sammelt die Nachweise.
- Der **Entsorger** braucht die Bewilligung für die angenommenen Codes.
Eine illegale Ablagerung (z. B. Bauschutt im Wald, Aushub auf einem Acker ohne Bewilligung) ist strafbar und wird teuer.

### 5. Typische Fehler
- Sonderabfälle in der Mischmulde (Spraydosen, Kartuschen, Asbestplatten).
- Fehlende Begleitscheine bei Sonderabfällen.
- Abgabe an Entsorger ohne Bewilligung für den Code.
- «Kleine Mengen» nebenbei im Werkhof entsorgen.
- Nachweise nicht gesammelt – bei der Abnahme fehlt die Entsorgungsbilanz.

### 6. Entsorgungskonzept vor Baubeginn
Bei Bauvorhaben mit voraussichtlich mehr als 200 m³ Bauabfällen oder bei zu erwartenden Bauschadstoffen verlangt die Behörde im Baubewilligungsverfahren Angaben zu Art, Qualität und Menge der Abfälle und zu ihrer Entsorgung (Art. 16 VVEA, bestätigt; Kantone können tiefere Schwellen kennen). Für die Unternehmung ist das Konzept die Grundlage für Muldenplanung, Kalkulation und Entsorgungsbilanz. Fehlt es oder ist es offensichtlich unvollständig, melden Sie das der Bauleitung vor dem Start – nicht erst bei der ersten vollen Mulde.

§> USG, VVEA, VeVA gesetzlich verbindlich; Deponietypen bestätigt (BAFU, kantonale Unterlagen). Codes, Grenz- und Eluatwerte im Original prüfen.` },
      { id: 'm3-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm3-q03' },
      { id: 'm3-l1-abw', kind: 'decision', title: 'Abwägung: Kein Platz für Mulden', questionId: 'm3-d01' },
      { id: 'm3-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Muldenkonzept erstellen', taskId: 'm3-t1' },
      { id: 'm3-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m3-q04', 'm3-q05'] },
      { id: 'm3-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm3-p1' },
      { id: 'm3-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Abfall: vermeiden – verwerten – umweltverträglich entsorgen.',
        'Sonderabfälle getrennt, nur an berechtigte Entsorger, mit Begleitschein.',
        'Übrige Bauabfälle auf der Baustelle trennen (Art. 17 VVEA); sonst in Anlagen.',
        'Deponietypen A–E; Ablagern ist der letzte Weg.',
        'Muldenkonzept, Instruktion, Kontrolle und Nachweise organisieren.',
      ] },
      { id: 'm3-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'vvea', 'veva', 'lva', 'bafu-bauabfaelle'] },
    ],
  },
  // =====================================================================
  {
    id: 'm3-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 20,
    title: 'Rückbau und Bauschadstoffe',
    topics: ['m3-rueckbau'],
    objectives: [
      'Typische Bauschadstoffe (Asbest, PCB, PAK, Blei) und ihr Vorkommen kennen',
      'Die Pflichten rund um Schadstoffermittlung, Sanierung und Entsorgung einordnen',
      'Einen Rückbau in der richtigen Reihenfolge planen',
      'Bei einem unerwarteten Fund richtig reagieren',
    ],
    steps: [
      { id: 'm3-l2-situation', kind: 'situation', title: 'Einstieg: Der Plattenleger', text: `Umbau einer Wohnung in einem Haus von 1968. Der Plattenleger reisst den alten Bodenbelag heraus, darunter ein schwarzer Kleber. Er fragt: «Darf ich den abschleifen? Im Schadstoffbericht steht nur etwas über die Fassade.»

Was antworten Sie – und was passiert als Nächstes?` },
      { id: 'm3-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m3-q06', 'm3-q07'] },
      { id: 'm3-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ältere Gebäude enthalten oft Bauschadstoffe**: Asbest (in der Schweiz seit 1990 verboten), PCB in Fugen und Anstrichen, PAK in Teerprodukten, Blei in Farben.

**Vor Umbau und Rückbau wird ermittelt**, ob Schadstoffe vorhanden sind (Schadstoffermittlung). Sie bestimmt Entsorgungskonzept, Arbeitsschutz und Ablauf.

**Asbest mit erheblicher Faserfreisetzung** darf nur eine **Suva-anerkannte Sanierungsfirma** entfernen; Sanierungen werden vorgängig der Suva gemeldet.

**Unerwarteter Fund**: Arbeit sofort stoppen, Bereich sperren, melden, beproben lassen – nicht weiterarbeiten.` },
      { id: 'm3-l2-explain', kind: 'explain', title: 'Bauschadstoffe und wo sie stecken', text: `### Asbest
Bis zum Verbot 1990 (Übergangsfristen für einzelne Produkte bis 1994) in vielen Produkten verbaut: Faserzementplatten (Fassaden, Dächer), Bodenbeläge und deren Kleber, Spritzasbest, Dichtungen, Brandschutzplatten, Fensterkitt (bestätigt: Verbot 1990). Gefährlich sind freigesetzte Fasern – beim Bohren, Schleifen, Brechen.

### PCB (polychlorierte Biphenyle)
In Fugendichtungen (v. a. Bauten der 1950er- bis 1970er-Jahre), Korrosionsschutzanstrichen und Kondensatoren. PCB sind langlebig und reichern sich in der Umwelt an.

### PAK (polyzyklische aromatische Kohlenwasserstoffe)
In teerhaltigen Produkten: alte Strassenbeläge, Dachpappe, Korkplatten, Parkettkleber. Bei Abbruch und Ausbauasphalt besonders relevant (Lektion 3).

### Blei und weitere
Bleihaltige Farben und Rostschutz, Bleirohre; dazu z. B. künstliche Mineralfasern älterer Bauart, Quecksilber in Schaltern.

### Pflichten im Überblick
- **Abfallrecht**: Bei zu erwartenden Bauschadstoffen verlangt die Behörde Angaben zur Entsorgung (Art. 16 VVEA, bestätigt). Kantonale Checklisten raten bei älteren Gebäuden grundsätzlich zur Schadstoffermittlung.
- **Arbeitssicherheit**: Besteht Verdacht auf besonders gesundheitsgefährdende Stoffe wie Asbest oder PCB, sind die Gefahren vor Beginn der Arbeiten zu ermitteln und die Schutzmassnahmen festzulegen (Art. 3 Bauarbeitenverordnung, BauAV – laut Suva und Fachunterlagen). Wer die Kosten der Ermittlung trägt, richtet sich nach Werkvertrag und Verfahren; in der Praxis beauftragt meist die Bauherrschaft die Schadstoffermittlung. Für Asbest gilt die **EKAS-Richtlinie 6503** (Fassung vom 27. Juni 2025, bestätigt).
- **Suva-anerkannte Firmen**: Arbeiten, bei denen erheblich Asbestfasern freigesetzt werden können, dürfen nur von der Suva anerkannte Asbestsanierungsunternehmen ausführen (Art. 82 BauAV). Solche Sanierungen sind der Suva mindestens 14 Tage vor Beginn zu melden (laut Suva; die Quellen ordnen die Meldepflicht Art. 86 BauAV zu – Artikel am Original prüfen). Nicht jede Tätigkeit an asbesthaltigem Material fällt darunter – welche Arbeiten mit welchen Schutzmassnahmen zulässig sind, regelt die EKAS-Richtlinie 6503.

### Entscheidungsweg bei Asbestverdacht
1. **Abklären**: Ist das Material untersucht? Baujahr vor 1990 ist ein Verdachtsindikator, kein Befund.
2. **Tätigkeit bestimmen**: Was genau soll mit dem Material geschehen (entfernen, bohren, schneiden, überdecken)?
3. **Risiko einstufen**: Kann es zu erheblicher Faserfreisetzung kommen? Beurteilung gemäss EKAS 6503 bzw. durch Fachperson.
4. **Anerkennung und Meldung**: Bei erheblicher Freisetzung Suva-anerkannte Firma, Meldung an die Suva.
5. **Entsorgung**: als Sonderabfall mit Begleitschein; Freigabe nach Sanierung.

§> Bauschadstoffe betreffen Umwelt- und Arbeitsrecht zugleich. Hier verbinden sich Ihre beiden Fachgebiete – Arbeitssicherheit und Umwelt.` },
      { id: 'm3-l2-explain-2', kind: 'explain', title: 'Rückbau richtig planen', text: `### Reihenfolge eines geordneten Rückbaus
1. **Schadstoffermittlung** durch eine Fachperson (Begehung, Proben, Bericht mit Mengen und Lage).
2. **Entsorgungskonzept** mit Fraktionen, Mengen, Entsorgungswegen (Teil des Baugesuchs).
3. **Schadstoffsanierung** vor allen anderen Arbeiten (Asbest durch anerkannte Firma, PCB-Fugen, belastete Anstriche), mit Freigabemessung wo nötig.
4. **Entkernung**: Ausbau von Holz, Kunststoffen, Metallen, Glas, Haustechnik – sortenrein.
5. **Rückbau der Tragstruktur**: Beton, Mauerwerk – getrennt, möglichst als Recyclingrohstoff.
6. **Nachweise**: Begleitscheine, Waagscheine, Entsorgungsbilanz, ggf. Freigabe nach Sanierung.

### Unerwarteter Fund
Auch der beste Bericht ist nicht vollständig (verdeckte Bauteile, nicht zugängliche Räume). Dann gilt: **Stopp – sperren – melden – beproben – entscheiden**. Wer weiterarbeitet, verschleppt Fasern und Schadstoffe, gefährdet Menschen und macht saubere Fraktionen zu Sonderabfall.` },
      { id: 'm3-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Schulhaus mit PCB-Fugen', context: 'Hochbau', text: `Der Schadstoffbericht für ein Schulhaus von 1970 findet PCB in den Fugen zwischen Betonelementen und Asbest in Bodenbelägen. Die Sanierung erfolgt in den Sommerferien: Fugen werden durch eine Fachfirma ausgefräst, das Material als Sonderabfall entsorgt; die Asbestbeläge entfernt eine Suva-anerkannte Firma, nach Meldung an die Suva. Erst nach der Freigabe beginnt die Entkernung.

**Lernpunkt**: Die Sanierung bestimmt den Terminplan. Wer sie zu spät einplant, verschiebt den ganzen Umbau.` },
      { id: 'm3-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Teerhaltige Abdichtung im Graben', context: 'Tiefbau', text: `Beim Ersatz einer alten Leitung stösst der Bagger auf eine schwarze, stark riechende Abdichtung an einem Schachtbauwerk. Der Polier stoppt, lässt das Material separat abtragen und in eine abgedeckte Mulde legen; eine Probe zeigt hohe PAK-Gehalte. Entsorgung als Sonderabfall mit Begleitschein.

**Lernpunkt**: Bauschadstoffe gibt es auch im Tiefbau – Geruch, Farbe und Baujahr sind Warnzeichen.` },
      { id: 'm3-l2-deep', kind: 'deep', title: 'Fachvertiefung: Schadstoffermittlung, Verantwortung, Arbeitsschutz', text: `### 1. Was eine gute Schadstoffermittlung enthält
- Umfang: welche Bauteile untersucht, welche nicht zugänglich (wichtig für spätere Funde!).
- Probenahme und Analysen mit Lage, Material, Schadstoff, Gehalt.
- Mengenabschätzung je Schadstoff und Bauteil.
- Empfehlungen zu Sanierung, Schutzmassnahmen und Entsorgung.
Lesen Sie den Bericht vor Baubeginn mit dem Bauführer – insbesondere die Liste der **nicht untersuchten Bereiche**.

### 2. Verantwortung entlang der Kette
- **Bauherrschaft**: lässt ermitteln, reicht Entsorgungsangaben ein, beauftragt Sanierung und trägt die Kosten.
- **Unternehmer**: ermittelt bei Verdacht die Gefahren für seine Arbeitnehmenden, setzt Schutzmassnahmen um, stoppt bei unerwarteten Funden, entsorgt korrekt.
- **Sanierungsfirma**: Suva-Anerkennung für Asbestarbeiten mit erheblicher Faserfreisetzung, Meldung an die Suva, Schutz- und Messkonzept.
- **Entsorger**: Bewilligung für die Codes.

### 3. Arbeitsschutz und Umwelt gehören zusammen
Asbest ist zuerst ein Gesundheitsrisiko für Arbeitnehmende; die EKAS-Richtlinie 6503 und die Bauarbeitenverordnung regeln die Schutzmassnahmen. Gleichzeitig ist asbesthaltiges Material Sonderabfall. Ihr Profil als Spezialist Arbeitssicherheit ist hier ein Vorteil: Sie können beide Sichten in einer Instruktion verbinden.

### 4. Typische Fehlerquellen
- Bericht nur für die Fassade, Innenausbau «vergessen».
- Subunternehmer (Plattenleger, Elektriker) kennen den Bericht nicht.
- Kernbohrungen durch asbesthaltige Platten ohne Abklärung.
- Sanierung und Rückbau gleichzeitig statt nacheinander.
- Sonderabfälle in Mischmulden.

### 5. Wenn trotzdem etwas passiert
Bei Faserfreisetzung: Bereich sperren, Lüftung abstellen, Personen informieren, Fachfirma und Suva beiziehen; Abfall als Sonderabfall entsorgen; Ereignis dokumentieren und Ursache analysieren. Bei Unklarheit über Gesundheitsfolgen: arbeitsmedizinische Abklärung.

### 6. Schnittstellen im Terminplan
Die Schadstoffsanierung ist oft der kritische Pfad eines Umbaus: Ermittlung, Offerten der Sanierungsfirmen, Meldung an die Suva, Sanierung, Freigabe. Planen Sie diese Schritte in der AVOR rückwärts vom Start der Entkernung. Typische Stolpersteine sind bewohnte Gebäude (Zugänglichkeit), Ferienzeiten bei Schulhäusern und nachträglich entdeckte Bereiche. Ein Puffer für Nachuntersuchungen ist realistischer als ein Terminplan, der von einem vollständigen Bericht ausgeht.

### 7. Kommunikation
Mitarbeitende und Anwohnende reagieren auf das Wort «Asbest» oft mit Angst. Sachliche Information (was wurde gefunden, wie wird geschützt, wer ist Ansprechperson) schafft Vertrauen. Betroffene Mitarbeitende nach einer möglichen Exposition nicht allein lassen: informieren, dokumentieren, bei Bedarf arbeitsmedizinisch abklären lassen.

§> EKAS 6503 (Fassung vom 27.6.2025), Suva-Anerkennung (Art. 82 BauAV) und Meldung 14 Tage bestätigt (Suva/EKAS); Ermittlungspflicht Art. 3 BauAV laut Suva/Fachunterlagen. Verbot 1990 bestätigt. Einzelfragen zum Arbeitsschutz nach der aktuellen Richtlinie bzw. mit der Suva klären.` },
      { id: 'm3-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm3-q08' },
      { id: 'm3-l2-abw', kind: 'decision', title: 'Abwägung: Schwarzer Kleber unter dem Boden', questionId: 'm3-d02' },
      { id: 'm3-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Schadstoffbericht lesen', taskId: 'm3-t2' },
      { id: 'm3-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m3-q09', 'm3-q10'] },
      { id: 'm3-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm3-p2' },
      { id: 'm3-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Asbest (verboten seit 1990), PCB, PAK, Blei: typisch in älteren Bauten.',
        'Schadstoffermittlung vor Umbau/Rückbau; sie bestimmt Entsorgung, Arbeitsschutz und Termine.',
        'Asbest mit erheblicher Faserfreisetzung nur durch Suva-anerkannte Firmen, Meldung an die Suva.',
        'Reihenfolge: ermitteln – Konzept – sanieren – entkernen – Tragstruktur – Nachweise.',
        'Unerwarteter Fund: stoppen, sperren, melden, beproben.',
      ] },
      { id: 'm3-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['vvea', 'ekas6503', 'suva-asbest', 'bafu-bauabfaelle'] },
    ],
  },
  // =====================================================================
  {
    id: 'm3-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Mineralische Rückbaumaterialien, Recyclingbeton und Ausbauasphalt',
    topics: ['m3-mineralisch'],
    objectives: [
      'Die Verwertungspflicht für mineralische Bauabfälle erklären',
      'Recyclingbaustoffe und ihre Einsatzgrenzen in Grundzügen kennen',
      'Ausbauasphalt nach PAK-Gehalt richtig entsorgen',
    ],
    steps: [
      { id: 'm3-l3-situation', kind: 'situation', title: 'Einstieg: Der alte Belag', text: `Für eine Strassensanierung werden 1 200 t Asphalt gefräst. Der Bauführer will das Fräsgut wie immer zur Belagsanlage bringen. Der Projektleiter der Gemeinde fragt: «Ist der Belag auf PAK untersucht? Die Strasse ist von 1975.»

Warum ist diese Frage so wichtig?` },
      { id: 'm3-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m3-q11', 'm3-q12'] },
      { id: 'm3-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Mineralische Bauabfälle sollen verwertet werden**, z. B. Betonabbruch als Recyclinggranulat für Recyclingbeton oder Fundationen.

**Ausbauasphalt mit höchstens 250 mg PAK pro kg** soll möglichst vollständig als Rohstoff verwertet werden; **mit mehr als 250 mg/kg darf er nicht verwertet werden** (Art. 20 VVEA).

**Ältere Beläge** können teerhaltig sein – deshalb vor dem Ausbau untersuchen.

**Recyclingbaustoffe** haben Einsatzgrenzen (z. B. Grundwasser, Schutzzonen) – die Vollzugshilfe des BAFU regelt, wo was eingesetzt werden darf.` },
      { id: 'm3-l3-explain', kind: 'explain', title: 'Verwerten statt deponieren', text: `### Mineralische Rückbaumaterialien
Dazu gehören Betonabbruch, Mischabbruch (Mauerwerk, Beton, Keramik), Strassenaufbruch und Ausbauasphalt. Die VVEA verlangt, mineralische Bauabfälle möglichst vollständig zu verwerten (Art. 20, sinngemäss). Das BAFU hat dazu die Vollzugshilfe «Verwertung mineralischer Rückbaumaterialien» erarbeitet; sie regelt Aufbereitung, Qualitäten und Einsatzbereiche.

### Recyclingbaustoffe
- **Recyclinggranulate** aus Beton- oder Mischabbruch für Fundations- und Kofferschichten, Sickerpackungen (mit Einschränkungen) und als Gesteinskörnung.
- **Recyclingbeton**: Beton mit Recyclinggranulat als Teil der Gesteinskörnung; für viele Bauteile normkonform einsetzbar (Normen und Merkblätter des SIA – Details im Original).
- **Einsatzgrenzen**: Je nach Material sind Recyclingbaustoffe in Grundwasserschutzzonen, im Grundwasser oder ungebunden in der Nähe von Trinkwasserfassungen eingeschränkt. Massgebend sind Vollzugshilfe und kantonale Vorgaben.

### Ausbauasphalt
Art. 20 VVEA (bestätigt):
- Asphalt mit **höchstens 250 mg PAK pro kg** soll möglichst vollständig als Rohstoff für Baustoffe verwertet werden.
- Asphalt mit **mehr als 250 mg PAK pro kg** darf **nicht verwertet** werden.
### Übergangsbestimmungen (Art. 52 VVEA, Fassung 2022)

| Zeitraum | Ausbauasphalt > 250 mg PAK/kg | Ausbauasphalt ≤ 250 mg PAK/kg |
|---|---|---|
| bis 31.12.2025 | Verwertung bei Bauarbeiten unter Bedingungen noch zulässig (Abs. 1) | verwerten |
| 1.1.2026 – 31.12.2027 | **keine Verwertung mehr**; Ablagerung auf Deponie Typ E noch zulässig (Abs. 2) | verwerten; Ablagerung auf Deponie Typ B noch zulässig (Abs. 3) |
| ab 1.1.2028 | keine Verwertung; Ablagerung nach Ablauf der Übergangsfrist nicht mehr gestützt auf Abs. 2 – Entsorgung z. B. thermisch, gemäss Kanton | verwerten |

Heute (November 2026) heisst das: Asphalt über 250 mg PAK/kg darf nicht mehr verwertet werden; bis Ende 2027 ist die Ablagerung auf einer Deponie Typ E noch möglich. Ältere kantonale Merkblätter mit anderen Daten stammen meist aus der Zeit vor der Änderung von 2022.

> Quelle: VVEA Art. 52 Abs. 1–3 in der Fassung von 2022 (AS 2022 161), bestätigt über die Bundespublikation und eine externe Prüfung anhand einer Lesefassung vom 1.8.2026. Die Fristen gelten unabhängig vom Kanton; die Entsorgungswege ab 2028 klärt der Kanton.

§> VVEA Art. 20 (250-mg/kg-Grenze) und Art. 52 Abs. 1–3 (Fristen 31.12.2025 bzw. 31.12.2027) bestätigt (AS 2022 161, Lesefassung 1.8.2026).` },
      { id: 'm3-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Recyclingbeton im Neubau', context: 'Hochbau', text: `Für einen Schulhausneubau schreibt die Gemeinde Recyclingbeton für Innenwände und Decken vor. Der Betonabbruch des Vorgängerbaus wird vor Ort sortenrein getrennt und im Recyclingwerk zu Granulat aufbereitet, das in den neuen Beton zurückfliesst.

**Lernpunkt**: Saubere Trennung beim Rückbau ist die Voraussetzung für hochwertige Verwertung. Mischabbruch eignet sich nur eingeschränkt.` },
      { id: 'm3-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: PAK-Triage beim Fräsen', context: 'Tiefbau', text: `Vor dem Fräsen einer Kantonsstrasse werden Bohrkerne entnommen und schichtweise auf PAK untersucht. Ergebnis: Deckschicht unter 250 mg/kg, eine tiefere Binderschicht deutlich darüber. Die Fräsarbeiten werden schichtweise ausgeführt; die belastete Schicht wird separat geladen, mit Nachweis zu einer Anlage für thermische Behandlung gebracht.

**Lernpunkt**: Schichtweise Untersuchung und Ausbau sparen viel Geld – und verhindern, dass belastetes Material in neue Beläge gelangt.` },
      { id: 'm3-l3-deep', kind: 'deep', title: 'Fachvertiefung: Qualität, Einsatz, Wirtschaftlichkeit', text: `### 1. Qualität beginnt beim Rückbau
Recyclingbaustoffe sind nur so gut wie das Ausgangsmaterial. Störstoffe wie Gips, Holz, Kunststoff, Dämmstoffe oder Schadstoffe mindern die Qualität und können eine Verwertung verhindern. Deshalb: Schadstoffe vorher entfernen, entkernen, Tragstruktur sortenrein abbrechen (Beton getrennt von Mauerwerk).

### 2. Wo darf was eingesetzt werden?
Die Vollzugshilfe unterscheidet Materialien nach Herkunft und Qualität und legt fest, ob sie gebunden (in Beton, Belag) oder ungebunden (Fundation, Auffüllung) eingesetzt werden dürfen – und wo nicht (z. B. in Grundwasserschutzzonen oder unter dem Grundwasserspiegel). Diese Regeln sollen verhindern, dass aus Recyclingmaterial Schadstoffe ausgewaschen werden. Für die Baustelle: Lieferschein mit Materialbezeichnung prüfen und Einsatzort abgleichen.

### 3. Ausbauasphalt im Detail
- **Untersuchen**: bei Belägen unklaren Alters bzw. Verdacht auf Teer immer, schichtweise.
- **Trennen**: belastete Schichten separat ausbauen und transportieren.
- **Dokumentieren**: Analysen, Mengen, Entsorgungswege, Nachweise.
- **Schutz**: Fräsen teerhaltiger Beläge erzeugt Staub und Dämpfe mit PAK – Arbeitsschutz beachten.

### 4. Wirtschaftlichkeit
Recyclingbaustoffe sind oft günstiger als Primärmaterial und sparen Deponieraum und Transporte. In der Offerte lohnt es sich, Verwertungswege früh zu klären (Recyclingwerke in der Nähe, Annahmebedingungen). Bauherrschaften – insbesondere öffentliche – verlangen zunehmend Recyclinganteile.

### 5. Ihre Rolle
- In der AVOR: Entsorgungskonzept auf Verwertung prüfen, Analysen einfordern, Trennung planen.
- In der Ausführung: Kontrolle der Trennung, Nachweise.
- Im Unternehmen: Verwertungsquote als Kennzahl, Erfahrungen mit Recyclingbaustoffen sammeln (Modul 11).

### 6. Typische Fehler
- Fräsgut aus älteren Strassen ohne Analyse ins Belagswerk.
- Belastete und unbelastete Schichten gemeinsam gefräst.
- Recyclinggranulat in einer Grundwasserschutzzone eingebaut, ohne die Einsatzregeln zu prüfen.
- Gips- und Dämmstoffreste im Betonabbruch – das Recyclingwerk weist die Ladung zurück oder verrechnet Zuschläge.
- Mischen von Ausbauasphalt mit Neumaterial, um Werte zu «verdünnen» – unzulässig.

### 7. Zusammenarbeit mit Bauherrschaft und Planer
Öffentliche Bauherrschaften schreiben PAK-Untersuchungen oft bereits in der Ausschreibung vor. Fehlen sie, fragen Sie in der Offertphase nach und kalkulieren Sie die Varianten transparent. So vermeiden Sie Nachtragsstreit, wenn sich der Belag als teerhaltig herausstellt.

§> VVEA gesetzlich verbindlich; Vollzugshilfe des BAFU und kantonale Vorgaben konkretisieren. Normen zu Recyclingbeton (SIA) kostenpflichtig – Details im Original.` },
      { id: 'm3-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm3-q13' },
      { id: 'm3-l3-abw', kind: 'decision', title: 'Abwägung: Belag ohne Analyse', questionId: 'm3-d03' },
      { id: 'm3-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Entsorgungswege für eine Strassensanierung', taskId: 'm3-t3' },
      { id: 'm3-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m3-q14', 'm3-q15'] },
      { id: 'm3-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm3-p3' },
      { id: 'm3-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Mineralische Bauabfälle möglichst vollständig verwerten.',
        'Recyclingbaustoffe mit Einsatzgrenzen (Grundwasser, Schutzzonen) gemäss Vollzugshilfe.',
        'Ausbauasphalt: ≤ 250 mg PAK/kg verwerten; > 250 mg/kg nicht verwerten (Art. 20 VVEA).',
        'Übergang (Art. 52): Verwertung > 250 mg/kg nur bis 31.12.2025; Deponie Typ E bzw. B noch bis 31.12.2027.',
        'Qualität beginnt beim sortenreinen, schadstofffreien Rückbau.',
      ] },
      { id: 'm3-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['vvea', 'bafu-mineral', 'bafu-bauabfaelle'] },
    ],
  },
  // =====================================================================
  {
    id: 'm3-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Aushub, Ausbruch und belastetes Material',
    topics: ['m3-aushub'],
    objectives: [
      'Die Verwertungspflicht für Aushub- und Ausbruchmaterial anwenden',
      'Verdachtsmomente für belastetes Material erkennen und richtig handeln',
      'Den Umgang mit belasteten Standorten in den Grundzügen einordnen',
    ],
    steps: [
      { id: 'm3-l4-situation', kind: 'situation', title: 'Einstieg: Der Geruch in der Baugrube', text: `Aushub für ein Gewerbegebäude auf dem Areal einer ehemaligen Garage. In 2 m Tiefe riecht der Boden nach Öl, das Material ist dunkel verfärbt. Der Baggerführer lädt weiter auf den Lastwagen, der zur Aushubdeponie Typ A fährt.

Was muss jetzt passieren?` },
      { id: 'm3-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m3-q16', 'm3-q17'] },
      { id: 'm3-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Unverschmutzter Aushub soll möglichst vollständig verwertet werden** – als Baustoff auf Baustellen oder für Rekultivierungen (Art. 19 VVEA).

**Verschmutztes Material** wird je nach Belastung behandelt, verwertet oder auf einer Deponie Typ B bzw. E abgelagert.

**Verdacht** (Geruch, Verfärbung, Fremdstoffe, Areal im Kataster der belasteten Standorte): Stopp, separat lagern und abdecken, beproben, Fachperson beiziehen.

**Belastete Standorte** stehen im Kataster des Kantons; Bauen darauf verlangt Abklärungen vor Baubeginn.` },
      { id: 'm3-l4-explain', kind: 'explain', title: 'Aushub verwerten, Belastungen erkennen', text: `### Verwertung von Aushub- und Ausbruchmaterial (Art. 19 VVEA, bestätigt)
- **Unverschmutztes** Material (Anforderungen nach Anhang 3 Ziff. 1) soll möglichst vollständig verwertet werden: als Baustoff auf Baustellen, für Geländeanpassungen, zum Auffüllen von Materialentnahmestellen oder auf Deponien.
- Material, das die Anforderungen nach Anhang 3 Ziff. 2 erfüllt, soll als Rohstoff für hydraulisch oder bituminös gebundene Baustoffe dienen (bestätigt).
- **Abgetragener Boden** (Ober- und Unterboden) ist separat geregelt (Art. 18 VVEA, Modul 4).
Das BAFU hat dazu das Vollzugshilfe-Modul «Aushubmaterial» veröffentlicht.

### Wann ist Aushub verschmutzt?
Hinweise sind: frühere Nutzung (Garage, Tankstelle, Gewerbe, Schiessanlage, Deponie), Eintrag im **Kataster der belasteten Standorte** des Kantons, Geruch, Verfärbung, Fremdstoffe (Bauschutt, Schlacke, Asche). Dann wird das Material untersucht und je nach Gehalt als schwach oder stark verschmutzt eingestuft, mit entsprechenden Entsorgungswegen.

### Belastete Standorte
Die **Altlasten-Verordnung** (AltlV) regelt, wie belastete Standorte erfasst, untersucht und – falls sie Altlasten sind – saniert werden. Art. 3 AltlV regelt Bauvorhaben auf belasteten Standorten: Sie sind zulässig, wenn der Standort nicht sanierungsbedürftig ist und durch das Vorhaben nicht wird, oder wenn die Sanierung nicht wesentlich erschwert wird bzw. gleichzeitig erfolgt (sinngemäss, laut BAFU-Vollzugshilfe «Bauvorhaben und belastete Standorte» und Kanton ZH). Für die Baustelle heisst das: Bauen auf einem Kataster-Standort ist möglich, wenn die Abklärungen vor Baubeginn erfolgen und Aushub sowie Baugrubenwasser korrekt behandelt werden. Die zuständige kantonale Fachstelle begleitet das.

§> VVEA Art. 19 und Anhang 3 bestätigt; AltlV sinngemäss. Grenzwerte und Einstufung im Original bzw. mit Fachperson.` },
      { id: 'm3-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Neubau auf Gewerbeareal', context: 'Hochbau', text: `Ein Wohnbau entsteht auf einem Areal, das als belasteter Standort eingetragen ist (ehemalige Schreinerei mit Lackiererei). Vor Baubeginn untersucht ein Altlastenbüro den Untergrund und erstellt ein Aushubkonzept: Triage in Zonen, Beprobung während des Aushubs, Zwischenlager auf dichter Fläche mit Abdeckung, Entsorgungswege nach Belastung.

Während des Aushubs ist eine Fachperson zeitweise vor Ort und entscheidet über die Zuteilung jeder Ladung.

**Lernpunkt**: Mit Konzept und Begleitung ist Bauen auf belasteten Standorten gut planbar – ohne beides wird es teuer.` },
      { id: 'm3-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Tunnelausbruch verwerten', context: 'Tiefbau', text: `Bei einem Strassentunnel fallen grosse Mengen Ausbruchmaterial an. Ein Teil eignet sich als Rohstoff für Beton (Anforderungen nach Anhang 3 Ziff. 2) und wird vor Ort aufbereitet; ein weiterer Teil dient für Dämme im Projekt; der Rest geht in Materialentnahmestellen zur Auffüllung.

**Lernpunkt**: Bei grossen Projekten ist die Materialbewirtschaftung ein eigener Planungsbereich – mit grossem Einfluss auf Kosten, Transporte und CO₂ (Modul 11).` },
      { id: 'm3-l4-deep', kind: 'deep', title: 'Fachvertiefung: Triage, Zwischenlager, Nachweise', text: `### 1. Triage während des Aushubs
Bei Verdacht wird nicht «nach Gefühl» geladen. Bewährt ist:
- **Zonen** nach Voruntersuchung festlegen (Raster, Tiefen).
- **Vor-Ort-Beurteilung** (Geruch, Farbe, Fremdstoffe) durch eine Fachperson, ergänzt mit Analysen.
- **Separate Zwischenlager** je Kategorie, dicht und abgedeckt, damit Regen keine Schadstoffe ausschwemmt (Bezug Modul 2: Baugrubenwasser).
- **Zuteilung** jeder Ladung mit Lieferschein bzw. Begleitschein.

### 2. Zwischenlager
Zwischenlager für Abfälle können bewilligungspflichtig sein (VVEA, kantonaler Vollzug). Auch ohne Bewilligungspflicht gilt: kein Lager im Gewässerraum oder in Schutzzonen, Schutz vor Auswaschung, klare Kennzeichnung.

### 3. Kosten und Risiken
Die Kosten für verschmutzten Aushub hängen stark von der Kategorie ab. Unerwartet verschmutzter Aushub ist eines der grössten Kostenrisiken im Tiefbau. Wer die Mehrkosten trägt, hängt vom Werkvertrag und vom Sachverhalt ab (Baugrundrisiko, Vertragsklauseln, Nachträge); im öffentlichen Recht kommen die Kostenregeln des Altlastenrechts dazu. Für die Unternehmung heisst das: Verdacht sofort melden, Mehraufwand dokumentieren, Nachtrag anmelden – und das Thema schon in der Offerte ansprechen.

### 4. Was der Polier wissen muss
- Woran erkennt er Verdacht?
- Wen ruft er an?
- Wohin mit dem Material bis zur Klärung?
- Was darf er auf keinen Fall (weiterladen, mit sauberem Material mischen)?
Das Mischen von belastetem mit sauberem Material, um Grenzwerte zu unterschreiten, ist unzulässig (Vermischungsverbot; kantonale Unterlagen verweisen auf Art. 9 VVEA – Wortlaut am Original prüfen).

### 5. Grenzen der eigenen Kompetenz
Die Beurteilung von Altlasten und die Einstufung von Aushub gehören zu spezialisierten Fachleuten (Altlastenbüros). Ihre Aufgabe als Umweltbeauftragter ist, Verdacht früh zu erkennen, die Fachperson beizuziehen und die Abläufe auf der Baustelle zu organisieren.

### 6. Kommunikation und Dokumentation
Halten Sie jeden Verdachtsfall mit Datum, Ort (Plan, Koordinaten, Tiefe), Fotos, Beobachtung und getroffenen Massnahmen fest. Diese Dokumentation ist die Grundlage für die Abrechnung von Mehrkosten, für die Meldung an die Behörde und für spätere Fragen der Eigentümerin. Informieren Sie die Bauherrschaft sofort – sie ist meist Inhaberin des Baugrunds und muss über Untersuchungen und Kosten entscheiden.

### 7. Verbindung zu Gewässer- und Bodenschutz
Belasteter Aushub betrifft nicht nur das Abfallrecht: Regenwasser aus Zwischenlagern und Baugrubenwasser können Schadstoffe ins Gewässer tragen (Modul 2), und belasteter Oberboden wird nach den Regeln des Bodenschutzes beurteilt (Modul 4). Ein gutes Aushubkonzept denkt diese Bereiche zusammen.

§> VVEA und AltlV gesetzlich verbindlich; Art. 3 AltlV über BAFU-/kantonale Unterlagen bestätigt. Vermischungsverbot (Art. 9 VVEA laut kantonaler Unterlage) und Bewilligungspflicht für Zwischenlager: genauen Artikel bzw. kantonales Recht im Einzelfall prüfen.` },
      { id: 'm3-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm3-q18' },
      { id: 'm3-l4-abw', kind: 'decision', title: 'Abwägung: Verdacht in der Baugrube', questionId: 'm3-d04' },
      { id: 'm3-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Aushubkonzept für ein Garagenareal', taskId: 'm3-t4' },
      { id: 'm3-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m3-q19', 'm3-q20', 'm3-q21'] },
      { id: 'm3-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm3-p4' },
      { id: 'm3-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Unverschmutzter Aushub möglichst vollständig verwerten (Art. 19 VVEA).',
        'Verdacht: frühere Nutzung, Kataster, Geruch, Verfärbung, Fremdstoffe.',
        'Bei Verdacht: stoppen, separat lagern und abdecken, beproben, Fachperson.',
        'Kein Vermischen von belastetem und sauberem Material.',
        'Kostenrisiko «verschmutzter Aushub» vertraglich regeln.',
      ] },
      { id: 'm3-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['vvea', 'bafu-aushub', 'altlv'] },
    ],
  },
  // =====================================================================
  {
    id: 'm3-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Nachweise, Wiederverwendung und Kreislaufwirtschaft',
    topics: ['m3-kreislauf'],
    objectives: [
      'Entsorgungsnachweise und Entsorgungsbilanz führen',
      'Wiederverwendung von Bauteilen und Verwertung als Strategie verstehen',
      'Die Entwicklung zur Kreislaufwirtschaft im Umweltrecht einordnen',
      'Kennzahlen für das Unternehmen vorschlagen',
    ],
    steps: [
      { id: 'm3-l5-situation', kind: 'situation', title: 'Einstieg: «Zeigen Sie uns die Entsorgungsbilanz»', text: `Bei der Abnahme eines grossen Umbaus verlangt die Bauherrschaft – ein institutioneller Investor mit Nachhaltigkeitszielen – eine Entsorgungsbilanz mit Verwertungsquote. Der Bauführer findet einen Stapel Lieferscheine, einige Begleitscheine fehlen.

Was hätte es gebraucht – und wie machen Sie es im Unternehmen künftig standardmässig richtig?` },
      { id: 'm3-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m3-q22', 'm3-q23'] },
      { id: 'm3-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Nachweise sind Pflicht und Visitenkarte**: Begleitscheine für Sonderabfälle, Liefer- und Waagscheine für alle anderen Abfälle.

**Eine Entsorgungsbilanz** zeigt je Fraktion Menge, Entsorgungsweg und Verwertungsanteil – und vergleicht mit dem Entsorgungskonzept.

**Kreislaufwirtschaft** geht weiter: Bauteile wiederverwenden, Materialien sortenrein zurückgewinnen, Recyclingbaustoffe einsetzen. Das Parlament hat dazu 2024 eine Revision des Umweltschutzgesetzes beschlossen.

**Für das Unternehmen** lohnen sich Kennzahlen wie Verwertungsquote und Kosten pro Tonne.` },
      { id: 'm3-l5-explain', kind: 'explain', title: 'Nachweise und Entsorgungsbilanz', text: `### Welche Nachweise?
- **Sonderabfälle**: Begleitschein gemäss VeVA (Abgeber, Transporteur, Empfänger, Code, Menge).
- **Andere kontrollpflichtige Abfälle**: Nachweise gemäss VeVA bzw. Vorgaben des Empfängers.
- **Übrige Abfälle**: Liefer- bzw. Waagscheine mit Material, Menge, Datum, Empfänger.
- **Freigaben** nach Schadstoffsanierung, Analysen von Aushub und Asphalt.

### Entsorgungsbilanz
Sie stellt dem Entsorgungskonzept die tatsächlichen Mengen gegenüber: je Fraktion Menge (t oder m³), Empfänger, Entsorgungsweg (Verwertung, Verbrennung, Deponie mit Typ), Abweichungen mit Begründung. Viele Kantone und Bauherrschaften verlangen sie; für das Unternehmen ist sie die Grundlage für Kennzahlen.

### Organisation
- Nachweise **laufend** sammeln (digital, pro Baustelle), nicht erst bei der Abnahme.
- Entsorger mit Bewilligung für die Codes auswählen (Liste im Einkauf).
- Monatlich Mengen nachführen; Abweichungen zum Konzept früh erkennen.` },
      { id: 'm3-l5-explain-2', kind: 'explain', title: 'Wiederverwendung und Kreislaufwirtschaft', text: `### Hierarchie
1. **Vermeiden**: weniger Abfall durch Planung (Massgenauigkeit, Vorfertigung, Mehrwegverpackungen).
2. **Wiederverwenden**: Bauteile ausbauen und erneut einsetzen (z. B. Stahlträger, Fenster, Sanitärapparate, Natursteinplatten).
3. **Verwerten**: Materialien zu Rohstoffen aufbereiten (Recyclinggranulat, Metallrecycling).
4. **Energetisch nutzen**: brennbare Abfälle in KVA.
5. **Ablagern**: der letzte Weg.

### Rechtliche Entwicklung
Das Parlament hat im März 2024 die parlamentarische Initiative 20.433 «Schweizer Kreislaufwirtschaft stärken» mit einer Revision von USG, Energiegesetz und Beschaffungsrecht verabschiedet; das USG erhält ein neues Kapitel zur Schonung der natürlichen Ressourcen und Stärkung der Kreislaufwirtschaft (bestätigt). Der Bundesrat hat die neuen Bestimmungen **grösstenteils auf den 1. Januar 2025 in Kraft gesetzt**; die Bestimmungen zum Littering folgen später (Bundesrat, 13.11.2024). Die Ausführungsbestimmungen in den Verordnungen (u. a. VVEA) werden gestaffelt angepasst – deshalb im Umweltrechtskataster (Modul 1) zwischen geltendem Gesetz, bereits geänderten und noch ausstehenden Verordnungsbestimmungen unterscheiden.

### Für die Baustelle
Wiederverwendung braucht **Zeit im Rückbau** (sorgfältiger Ausbau), **Lagerplatz**, **Abnehmer** und eine **Bauherrschaft**, die mitzieht. Sie ist heute meist eine freiwillige oder vertraglich vereinbarte Leistung.

§> Revision USG (Pa.Iv. 20.433): Schlussabstimmung 15.3.2024, grösstenteils in Kraft seit 1.1.2025 (bestätigt, Bundesrat). Verordnungsänderungen gestaffelt – Stand jeweils auf Fedlex/BAFU prüfen.` },
      { id: 'm3-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Bauteilbörse', context: 'Hochbau', text: `Beim Rückbau eines Bürogebäudes werden vorab Stahlträger, Brandschutztüren, Lavabos und Teppichfliesen ausgebaut und über eine Bauteilbörse vermittelt bzw. im Neubau wiederverwendet. Der Rückbau dauert zwei Wochen länger; die Bauherrschaft hatte das im Auftrag vorgesehen.

**Lernpunkt**: Wiederverwendung funktioniert, wenn sie früh geplant und bezahlt wird – nicht als Improvisation im Rückbau.` },
      { id: 'm3-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Materialkreislauf im Strassenbau', context: 'Tiefbau', text: `Ein Strassenbauunternehmen führt für jede Baustelle eine Materialbilanz: Ausbauasphalt (nach PAK-Triage) zurück ins eigene Belagswerk, Kiesfundation aufbereitet und wieder eingebaut, Aushub für Geländeanpassungen in einem Nachbarprojekt. Die Verwertungsquote liegt bei über 90 % (Kennzahl des Unternehmens).

**Lernpunkt**: Im Tiefbau ist Kreislaufwirtschaft oft wirtschaftlich attraktiv – sie braucht aber Logistik, Triage und Zwischenlager.` },
      { id: 'm3-l5-deep', kind: 'deep', title: 'Fachvertiefung: Steuerung im Unternehmen', text: `### 1. Kennzahlen, die etwas aussagen
- **Verwertungsquote** je Baustelle und Sparte (verwertete Menge ÷ Gesamtmenge).
- **Anteil Mischabfälle** (Indikator für die Trennqualität).
- **Entsorgungskosten pro m² bzw. pro Projekt** (Steuerung, Kalkulation).
- **Anteil Baustellen mit vollständigen Nachweisen** (Compliance).
Wichtig: Kennzahlen nur erheben, wenn sie ausgewertet und für Entscheide genutzt werden.

### 2. Standardisieren
- Vorlage Entsorgungskonzept und Entsorgungsbilanz für alle Baustellen.
- Muldenkonzept als Standard im Installationsplan.
- Rahmenverträge mit bewilligten Entsorgern; Liste der Codes je Entsorger.
- Digitale Ablage der Nachweise pro Baustelle.

### 3. Beschaffung und Offerte
Öffentliche Bauherrschaften gewichten Recyclinganteile und Wiederverwendung zunehmend in der Vergabe (revidiertes Beschaffungsrecht mit Nachhaltigkeitskriterien). Wer Verwertungsquoten belegen kann, hat einen Vorteil.

### 4. Kreislaufwirtschaft und Klima
Verwertung spart Primärrohstoffe, Deponieraum und oft Transporte; Recyclingbeton allein senkt die CO₂-Emissionen allerdings nur begrenzt, weil der Zement den grössten Anteil hat. Diese Zusammenhänge vertieft Modul 11.

### 5. Ihre Rolle
Sie bringen Recht (Pflicht zur Trennung, Verwertung, Nachweise), Wirtschaft (Kosten, Wettbewerb) und Nachhaltigkeit (Ressourcen, Klima) zusammen und schlagen der Geschäftsleitung realistische Ziele vor – z. B. «Mischabfallanteil unter X % bis Ende Jahr» mit Massnahmenplan.

### 6. Wiederverwendung organisieren
Wiederverwendung gelingt, wenn vier Fragen früh geklärt sind: **Was** eignet sich (Zustand, Schadstofffreiheit, Normen und Zulassungen, z. B. bei Brandschutzbauteilen)? **Wer** nimmt es ab (eigenes Projekt, Bauteilbörse, Händler)? **Wie** wird es ausgebaut, gelagert und transportiert, ohne Schaden? **Wer bezahlt** den Mehraufwand und trägt die Gewährleistung? Ohne Antworten bleibt Wiederverwendung eine gute Absicht.

### 7. Berichterstattung im Managementsystem
Im Umweltmanagement nach ISO 14001 sind Abfälle meist ein bedeutender Umweltaspekt. Kennzahlen zur Entsorgung fliessen in die Managementbewertung ein; Abweichungen werden als Korrekturmassnahmen bearbeitet (Modul 10). Eine saubere Datengrundlage aus den Baustellen ist dafür die Voraussetzung.

### 8. Typische Fehler
- Gesamtquote ohne Aufschlüsselung (Aushub dominiert).
- Kennzahlen erheben, aber nie besprechen.
- Ziele ohne Ausgangswert und ohne Verantwortliche.
- Neue Rechtspflichten ankündigen, bevor sie in Kraft sind.

§> Kennzahlen und Zielwerte sind betriebliche Festlegungen. Rechtlich verbindlich sind die Pflichten aus USG, VVEA und VeVA.` },
      { id: 'm3-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm3-q24' },
      { id: 'm3-l5-abw', kind: 'decision', title: 'Abwägung: Wiederverwendung unter Zeitdruck', questionId: 'm3-d05' },
      { id: 'm3-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Entsorgungsbilanz auswerten', taskId: 'm3-t5' },
      { id: 'm3-l5-feynman', kind: 'feynman', title: 'Erklären Sie es der Geschäftsleitung (Feynman-Methode)', feynmanId: 'm3-f1' },
      { id: 'm3-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m3-q25', 'm3-q26', 'm3-q27'] },
      { id: 'm3-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm3-p5' },
      { id: 'm3-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Begleitscheine für Sonderabfälle, Liefer-/Waagscheine für alle anderen Abfälle – laufend sammeln.',
        'Entsorgungsbilanz: Menge, Weg, Verwertungsanteil, Abweichungen zum Konzept.',
        'Hierarchie: vermeiden – wiederverwenden – verwerten – energetisch nutzen – ablagern.',
        'USG-Revision zur Kreislaufwirtschaft grösstenteils seit 1.1.2025 in Kraft; Verordnungen folgen gestaffelt.',
        'Kennzahlen nur, wenn sie zur Steuerung genutzt werden.',
      ] },
      { id: 'm3-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['veva', 'vvea', 'usg-kreislauf', 'bafu-bauabfaelle'] },
    ],
  },
];
