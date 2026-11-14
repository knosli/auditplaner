import type { Lesson } from '../types';

// Modul 11 «Klima, Ressourcen und Nachhaltigkeit».
// Rechtliche Aussagen sinngemäss, nicht am Fedlex-Volltext geprüft. Keine Emissionsfaktoren,
// Anteile, Reduktionsziele in Zahlen oder Schwellenwerte für Berichtspflichten genannt. Klare
// Trennung: Pflicht (Gesetz, Auflage, Vertrag) – Norm/Label (vereinbart) – freiwillig.
// Prüfstatus: Entwurf.

const M = 'm11';
const E = 'entwurf' as const;

export const M11_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm11-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Klimawirkung des Bauens: Pflicht, Norm oder freiwillig?',
    topics: ['m11-grundlagen'],
    objectives: [
      'Erklären, wo beim Bauen Treibhausgase und Ressourcenverbrauch entstehen',
      'Den Rechtsrahmen für Klima und Ressourcen in Grundzügen einordnen',
      'Pflichten, vereinbarte Standards und freiwillige Ziele klar unterscheiden',
    ],
    steps: [
      { id: 'm11-l1-situation', kind: 'situation', title: 'Einstieg: «Sind wir jetzt klimaneutral?»', text: `Die Geschäftsleitung hat beschlossen, «nachhaltiger zu werden». Der Marketingchef möchte auf die Website schreiben: «Wir bauen klimaneutral.» Er fragt Sie, ob das stimmt, ob es Pflicht ist und was die Firma dafür tun muss.

Was antworten Sie?` },
      { id: 'm11-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m11-q01', 'm11-q02'] },
      { id: 'm11-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Das Bauen** verursacht Treibhausgase vor allem über die **Herstellung von Baustoffen** (Zement, Stahl, Aluminium, Glas, Dämmstoffe), über **Maschinen und Transporte** und später über den **Betrieb** der Gebäude. Es verbraucht zudem grosse Mengen **Rohstoffe** (Kies, Sand) und erzeugt den grössten Teil der Abfälle der Schweiz.

**Rechtsrahmen** (Grundzüge): Die Schweiz hat sich gesetzlich das Ziel **Netto-Null bis 2050** gesetzt (Klimagesetz). Das CO₂-Gesetz und das Energierecht regeln Abgaben, Vorschriften und Förderungen. Grosse Unternehmen von öffentlichem Interesse müssen über Klimabelange berichten. Die Kreislaufwirtschaft ist seit 2025 im USG gestärkt.

**Für eine Bauunternehmung** ist vieles davon **nicht direkte Pflicht**, sondern kommt über **Verträge** (Bauherrschaft verlangt z. B. Recyclingbeton, Labels), **Beschaffung** (Nachhaltigkeit als Zuschlagskriterium) und **eigene Ziele**.

**Wichtig**: Pflicht, vereinbart und freiwillig sauber trennen – und nur behaupten, was belegt ist.` },
      { id: 'm11-l1-explain', kind: 'explain', title: 'Wo die Klimawirkung entsteht', text: `### Lebenszyklus eines Bauwerks

| Phase | Was verursacht Emissionen bzw. Ressourcenverbrauch | Einfluss der Bauunternehmung |
|---|---|---|
| Herstellung der Baustoffe | Zement- und Stahlherstellung, Ziegel, Glas, Dämmstoffe, Kunststoffe | Mittel: Produktwahl, Unternehmervorschläge, Mengen |
| Transport | Lastwagen, Bahn, Schiff | Hoch: Logistik, Verwertung vor Ort |
| Bauprozess | Baumaschinen, Baustrom, Heizung von Containern und Bauteilen, Abfälle | Hoch: direkt steuerbar |
| Nutzung | Heizung, Kühlung, Strom, Unterhalt | Gering (Planung bei der Bauherrschaft) |
| Rückbau und Entsorgung | Abbruch, Transporte, Verwertung, Deponie | Hoch beim Rückbau anderer Bauwerke |

Bei Neubauten mit gutem Energiestandard macht die Herstellung der Baustoffe (die **grauen Emissionen**) oft einen grossen Teil der gesamten Klimawirkung über den Lebenszyklus aus. Deshalb rücken Baustoffe und Bauweise in den Fokus.

### Ressourcen
Bauen braucht vor allem mineralische Rohstoffe (Kies, Sand, Kalk, Ton) und erzeugt grosse Mengen Aushub und Rückbaumaterial. Je mehr davon verwertet wird, desto weniger Primärrohstoff und Deponieraum wird gebraucht (Modul 3).

§> Lebenszyklusphasen sinngemäss nach der üblichen Systematik von Ökobilanzen im Bauwesen; keine Anteile in Prozent genannt, weil sie stark vom Objekt abhängen.` },
      { id: 'm11-l1-explain-2', kind: 'explain', title: 'Pflicht, Norm oder freiwillig?', text: `### Gesetzlich (Grundzüge)
- **Klimagesetz**: Ziel Netto-Null bis 2050, Zwischenziele, Förderprogramme (u. a. für Unternehmen, die einen Fahrplan zur Emissionsminderung erstellen). Es schafft vor allem Ziele und Förderung, kaum direkte Pflichten für einzelne Bauunternehmen.
- **CO₂-Gesetz**: u. a. CO₂-Abgabe auf Brennstoffe (z. B. Heizöl, Gas – nicht auf Treibstoffe wie Diesel), Vorschriften für Gebäude und Fahrzeuge, Kompensationspflicht für Treibstoffimporteure.
- **Berichterstattung über Klimabelange**: Grosse Unternehmen von öffentlichem Interesse müssen nach Obligationenrecht und zugehöriger Verordnung über Klimabelange berichten. Mittlere Bauunternehmen sind meist nicht direkt erfasst – können aber als Lieferanten solcher Unternehmen Daten liefern müssen.
- **USG (Kreislaufwirtschaft)**: Schonung der Ressourcen, ressourcenschonendes Bauen, Verwertung (Modul 3).
- **Beschaffungsrecht**: Nachhaltigkeit als Ziel und möglicher Zuschlagskriterium bei öffentlichen Aufträgen (Modul 8).

### Vereinbart (vertraglich verbindlich, wenn im Vertrag)
- Anforderungen der Bauherrschaft (z. B. Recyclingbeton, CO₂-reduzierter Zement, Elektromaschinen).
- Labels und Standards (z. B. Minergie mit Zusatz ECO, Standard Nachhaltiges Bauen Schweiz SNBS), Merkblätter des SIA zur grauen Energie und zum Effizienzpfad.
- Zusagen in der Offerte (werden Vertragsbestandteil).

### Freiwillig
- Eigene Klimaziele der Firma, Treibhausgasbilanz, Kompensationen, Initiativen.

§> Klimagesetz, CO₂-Gesetz, Berichterstattungspflicht (OR und Verordnung über die Klimaberichterstattung) sinngemäss, ohne Artikel und Schwellenwerte; nicht am Fedlex-Text geprüft. Labels und SIA-Merkblätter nur als Beispiele genannt.` },
      { id: 'm11-l1-diagram', kind: 'diagram', title: 'Schema: Lebenszyklus eines Bauwerks', diagram: 'lebenszyklus', caption: 'Vereinfachte Lernhilfe. Der Einfluss der Bauunternehmung ist in Herstellung (Produktwahl), Transport, Bauprozess und Rückbau am grössten.' },
      { id: 'm11-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die Anfrage der Pensionskasse', context: 'Hochbau', text: `Eine Pensionskasse schreibt eine Wohnüberbauung nach SNBS aus und verlangt mit der Offerte Angaben zu Recyclinganteil, Zementart und Treibhausgasemissionen der Baustelle. Die Hochbaufirma hat bisher keine Zahlen. Sie liefert, was belegbar ist (Betonsorten mit Lieferantendaten, Maschinenliste, geschätzter Dieselverbrauch mit Annahmen) und kennzeichnet Schätzungen als solche. Nach dem Zuschlag wird vereinbart, die Daten während des Baus zu erfassen.

**Lernpunkt**: Nachhaltigkeit kommt oft als Vertragsanforderung – wer belegbare Daten hat, ist im Vorteil.` },
      { id: 'm11-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Unternehmervorschlag im Strassenbau', context: 'Tiefbau', text: `Ein Kanton schreibt einen Strassenneubau aus. Die Tiefbaufirma reicht einen Unternehmervorschlag ein: Aushub als Hinterfüllung vor Ort verwenden, Ausbauasphalt (nach PAK-Analyse) im Belag verwerten, Transporte mit der Bahn für den Abschnitt mit Anschlussgleis. Sie beziffert die eingesparten Fahrten und Primärmaterialien mit nachvollziehbaren Annahmen. Der Vorschlag wird angenommen und wird Vertragsbestandteil.

**Lernpunkt**: Im Tiefbau liegen die grössten Hebel in Massenbilanz, Verwertung und Logistik.` },
      { id: 'm11-l1-deep', kind: 'deep', title: 'Fachvertiefung: Klima und Ressourcen in der Bauunternehmung', text: `### 1. Warum das Thema die Baustelle erreicht
Lange war Klimaschutz im Bau vor allem ein Thema der Gebäudeenergie (Heizung, Dämmung). Heute rücken die grauen Emissionen der Baustoffe und die Ressourcen in den Vordergrund – und damit die Bauunternehmung. Bauherrschaften, Investoren, öffentliche Auftraggeber und Banken fragen zunehmend nach Daten, Varianten und Nachweisen.

### 2. Die wichtigsten Hebel einer Bauunternehmung
- **Unternehmervorschläge**: andere Baustoffe (z. B. Beton mit klinkerärmerem Zement, Recyclingbeton, Holz-Hybrid), andere Bauverfahren, Optimierung von Mengen.
- **Materialeffizienz**: Verschnitt und Überbestellungen vermeiden, Schalungen wiederverwenden, Reste verwerten.
- **Logistik**: Massenbilanz, Verwertung vor Ort, volle Fahrten, Bahn (Module 5 und 8).
- **Maschinen und Energie**: effiziente und elektrische Maschinen, Baustrom statt Aggregat, Leerlauf vermeiden, Container dämmen und Heizung regeln.
- **Kreislauf**: sortenreiner Rückbau, Wiederverwendung von Bauteilen, hochwertige Verwertung (Modul 3).

### 3. Pflicht, Vertrag, freiwillig – warum die Trennung wichtig ist
Die Trennung kennen Sie aus Modul 1 und 8. Hier ist sie besonders wichtig, weil viele Begriffe (klimaneutral, nachhaltig, grün) unscharf sind. Eine Pflicht ist einzuhalten; eine vertragliche Zusage ist geschuldet und muss nachgewiesen werden; ein freiwilliges Ziel ist eine Absicht. Wer das vermischt, verspricht zu viel oder übersieht, was geschuldet ist.

### 4. Vorsicht bei Begriffen
- **«Klimaneutral»** heisst in der Regel: Emissionen werden bilanziert, reduziert und der Rest kompensiert. Ohne belegte Bilanz und belegte Kompensation ist die Aussage nicht haltbar und kann irreführend sein.
- **«CO₂-reduziert»** braucht einen Vergleich: reduziert gegenüber was, um wie viel, nach welcher Methode?
- **«Recycling»** ist nicht gleich klimafreundlich: Recyclingbeton schont Kies, spart aber nur dann deutlich CO₂, wenn auch der Zementanteil oder die Zementart günstiger ist.

### 5. Daten statt Behauptungen
Ohne Daten keine glaubwürdigen Aussagen. Die Grundlage sind Treibhausgasbilanz (Lektion 2), Ökobilanzdaten der Baustoffe (Lektion 3) und Materialflüsse (Lektion 4). Schätzungen sind erlaubt, wenn sie als Schätzungen gekennzeichnet und die Annahmen offen sind.

### 6. Ihre Rolle
Sie sind nicht Klimaberater/in und nicht Ökobilanz-Spezialist/in. Sie bringen das Thema in die Abläufe (Offerte, AVOR, Einkauf, Baustelle), sorgen für saubere Daten, prüfen Aussagen auf Belegbarkeit und ziehen bei Ökobilanzen und Berichterstattung Fachleute bei.

§> Rechtsgrundlagen sinngemäss; Begriffe wie «klimaneutral» allgemein erläutert, ohne Bezug auf eine bestimmte Norm. Irreführende Aussagen können lauterkeitsrechtlich problematisch sein (UWG, sinngemäss – nicht vertieft).` },
      { id: 'm11-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm11-q03' },
      { id: 'm11-l1-abw', kind: 'decision', title: 'Abwägung: «Wir bauen klimaneutral»', questionId: 'm11-d01' },
      { id: 'm11-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Anforderungen einer Ausschreibung einordnen', taskId: 'm11-t1' },
      { id: 'm11-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m11-q04', 'm11-q05'] },
      { id: 'm11-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm11-p1' },
      { id: 'm11-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Klimawirkung: Baustoffe (graue Emissionen), Transporte, Maschinen, Betrieb, Rückbau.',
        'Gesetz: Netto-Null-Ziel, CO₂-Gesetz, Berichtspflicht für grosse Unternehmen, Kreislaufwirtschaft im USG.',
        'Für Bauunternehmen kommt vieles über Verträge, Labels und Beschaffung.',
        'Pflicht – vereinbart – freiwillig sauber trennen.',
        'Nur behaupten, was belegt ist; Schätzungen kennzeichnen.',
      ] },
      { id: 'm11-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['klg', 'co2g', 'klimabericht', 'usg-kreislauf', 'boeb', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm11-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Treibhausgasbilanz: Scope 1, 2, 3 und Kennzahlen',
    topics: ['m11-bilanz'],
    objectives: [
      'Scope 1, 2 und 3 für eine Bauunternehmung erklären und zuordnen',
      'Die Datengrundlage einer einfachen Treibhausgasbilanz aufbauen',
      'Sinnvolle Klimakennzahlen wählen und ehrlich darstellen',
    ],
    steps: [
      { id: 'm11-l2-situation', kind: 'situation', title: 'Einstieg: Die Excel-Tabelle', text: `Die Geschäftsleitung möchte bis Ende Jahr «unsere CO₂-Zahl». Sie haben Zugriff auf die Tankkarten, die Stromrechnungen der Werkhöfe und die Einkaufsdaten. Ein Kollege meint: «Diesel mal Faktor, fertig.»

Was fehlt in dieser Rechnung – und wo fangen Sie an?` },
      { id: 'm11-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m11-q06', 'm11-q07'] },
      { id: 'm11-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Das Greenhouse Gas Protocol** (GHG Protocol) teilt die Emissionen eines Unternehmens in drei Bereiche:

- **Scope 1** – direkte Emissionen aus eigenen Quellen: Diesel der eigenen Maschinen und Fahrzeuge, Heizöl und Gas in Werkhöfen und Containern.
- **Scope 2** – indirekte Emissionen aus eingekaufter Energie: Strom (auch Baustrom, wenn auf die Firma bezogen), Fernwärme.
- **Scope 3** – alle übrigen indirekten Emissionen der Wertschöpfungskette: **eingekaufte Baustoffe** (Zement, Beton, Stahl), Transporte durch Dritte, **Subunternehmer**, Entsorgung, Geschäftsreisen, Pendeln.

**Bei Bauunternehmen ist Scope 3 meist der grösste Teil** – vor allem die Baustoffe.

**Bilanz** = Aktivitätsdaten (Liter, kWh, Tonnen) × Emissionsfaktoren (kg CO₂-Äquivalente je Einheit), mit offen gelegten Annahmen.` },
      { id: 'm11-l2-explain', kind: 'explain', title: 'Scope 1, 2, 3 in der Bauunternehmung', text: `| Scope | Quelle | Datenquelle (Beispiele) |
|---|---|---|
| 1 | Diesel eigener Baumaschinen, Lastwagen, Lieferwagen | Tankkarten, Tankanlage Werkhof |
| 1 | Heizöl, Gas für Werkhof, Büros, Container | Lieferrechnungen |
| 1 | Kältemittelverluste (Klimaanlagen) | Wartungsprotokolle |
| 2 | Strom Werkhof, Büros, Baustellen (eigene Anschlüsse) | Stromrechnungen |
| 2 | Fernwärme | Rechnungen |
| 3 | Eingekaufte Baustoffe (Beton, Zement, Stahl, Asphalt, Dämmung) | Einkaufsmengen × Faktoren aus Ökobilanzdaten bzw. Produktdeklarationen |
| 3 | Transporte durch Dritte | Fahrten, Tonnenkilometer |
| 3 | Subunternehmer (Maschinen, Material) | Angaben der Subunternehmer oder Schätzungen |
| 3 | Entsorgung von Abfällen | Mengen nach Fraktion |
| 3 | Geschäftsreisen, Pendeln | Spesen, Umfrage |

### Zuordnung ist Definitionssache
Ob ein Baustrom-Anschluss zu Scope 2 der Unternehmung oder der Bauherrschaft gehört, hängt davon ab, wer ihn bezieht und bezahlt. Ob Baustoffe in die Bilanz der Unternehmung gehören (Scope 3) oder der Bauherrschaft zugerechnet werden, ist ebenfalls eine Frage der festgelegten Systemgrenze. **Wichtig ist, dass die Grenzen klar beschrieben und konsequent angewendet werden.**

### Emissionsfaktoren
Für Brenn- und Treibstoffe, Strom und Baustoffe gibt es veröffentlichte Faktoren (z. B. Ökobilanzdaten im Baubereich der KBOB, Angaben des Bundes, Produktdeklarationen der Hersteller). Für Strom hängt der Faktor stark vom bezogenen Produkt ab. Nennen Sie immer, welche Faktoren Sie verwenden – die App nennt keine Zahlen.

§> Scope-Systematik nach GHG Protocol (sinngemäss, Standard nicht im Original geprüft). Ökobilanzdaten im Baubereich (KBOB) als Quelle genannt; keine Faktoren wiedergegeben.` },
      { id: 'm11-l2-explain-2', kind: 'explain', title: 'Kennzahlen und ehrliche Darstellung', text: `### Sinnvolle Klimakennzahlen
- **Absolut**: Tonnen CO₂-Äquivalente je Jahr (Scope 1 und 2 getrennt von Scope 3).
- **Intensität**: z. B. je Million Franken Umsatz, je Maschinenstunde, je m³ verbautem Beton.
- **Steuerungsgrössen** (Früh-Kennzahlen, Modul 10): Anteil elektrischer Maschinen, Anteil Baustellen mit Baustrom statt Aggregat, Anteil CO₂-reduzierter Betonsorten, Anteil verwerteter Materialien.

### Ehrlich darstellen
- **Systemgrenze** und **Bezugsjahr** nennen.
- **Schätzungen** kennzeichnen, **Datenqualität** benennen.
- **Veränderungen erklären**: Sinkt die Bilanz, weil weniger gebaut wurde oder weil effizienter gebaut wurde?
- **Reduktion vor Kompensation**: Zertifikate kompensieren Emissionen anderswo; sie senken die eigene Bilanz nicht.
- **Scope 3 nicht weglassen**, nur weil es aufwendig ist – lieber als Schätzung mit Bandbreite ausweisen.

### Anfangen mit dem, was da ist
Ein erstes Jahr mit Scope 1 und 2 (Tankkarten, Rechnungen) und einer groben Schätzung der wichtigsten Baustoffe ist ein guter Start. Die Qualität steigt mit jedem Jahr.

§> Darstellungsgrundsätze als bewährte Praxis; Berichtsstandards (z. B. GHG Protocol) im Detail nicht wiedergegeben.` },
      { id: 'm11-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Das erste Jahr', context: 'Hochbau', text: `Eine Hochbaufirma mit 150 Mitarbeitenden erstellt ihre erste Bilanz. Scope 1 und 2 sind nach zwei Tagen fertig (Tankkarten, Heizöl, Strom). Für Scope 3 nimmt sie die Betonmengen aus dem Einkauf und die Stahlmengen aus den Lieferscheinen, multipliziert mit Ökobilanzdaten und kennzeichnet das Ergebnis als Schätzung. Ergebnis: Beton und Stahl sind ein Vielfaches von Scope 1 und 2. Die Geschäftsleitung beschliesst, bei Offerten systematisch CO₂-reduzierte Betonsorten als Variante anzubieten.

**Lernpunkt**: Schon eine grobe Scope-3-Schätzung zeigt, wo die grossen Hebel liegen.` },
      { id: 'm11-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Diesel je Maschinenstunde', context: 'Tiefbau', text: `Eine Tiefbaufirma wertet die Tankdaten je Maschine aus und vergleicht den Verbrauch je Betriebsstunde. Zwei ältere Bagger verbrauchen deutlich mehr als vergleichbare neuere Maschinen; bei einigen Maschinen zeigt die Telematik viel Leerlauf. Die Firma führt eine Leerlauf-Regel ein, schult die Maschinisten und plant den Ersatz der zwei Bagger vorzuziehen. Die Kennzahl «Diesel je Maschinenstunde» wird quartalsweise verfolgt.

**Lernpunkt**: Eine gute Kennzahl führt zu einer Entscheidung – und wird dort gemessen, wo man sie beeinflussen kann.` },
      { id: 'm11-l2-deep', kind: 'deep', title: 'Fachvertiefung: Eine Bilanz, die etwas bewirkt', text: `### 1. Zweck klären
Wofür wird die Bilanz gebraucht? Für die eigene Steuerung (wo sind die Hebel?), für Kunden (Ausschreibungen, Lieferantenanfragen), für Banken und Investoren, für eine Berichterstattung? Der Zweck bestimmt die Genauigkeit und die Darstellung. Für die Steuerung genügt oft eine ehrliche Schätzung; für eine externe Berichterstattung braucht es definierte Methoden und gegebenenfalls eine Prüfung.

### 2. Systemgrenzen festlegen
- **Organisatorisch**: Welche Gesellschaften, Niederlassungen, Werkhöfe?
- **Operativ**: Welche Scopes und welche Kategorien von Scope 3?
- **Zeitlich**: Kalenderjahr, Geschäftsjahr?
Schreiben Sie die Grenzen auf und ändern Sie sie nur begründet – sonst sind Jahre nicht vergleichbar.

### 3. Daten sammeln, wo sie entstehen
Tankkarten und Tankanlagen (Scope 1), Rechnungen (Scope 2), Einkaufssystem und Lieferscheine (Scope 3 Baustoffe), Entsorgungsbelege (Scope 3 Abfälle). Je besser die Daten in den normalen Abläufen erfasst werden (z. B. Maschine und Baustelle auf dem Tankbeleg), desto weniger Aufwand am Jahresende.

### 4. Faktoren mit Bedacht
Die Wahl der Emissionsfaktoren kann das Ergebnis stark beeinflussen. Verwenden Sie anerkannte, für die Schweiz passende Quellen; dokumentieren Sie die Quelle und das Jahr. Herstellerdeklarationen (Umweltproduktdeklarationen) sind für konkrete Produkte genauer als Durchschnittswerte – sofern sie vergleichbar sind.

### 5. Von der Bilanz zum Plan
Eine Bilanz ist kein Selbstzweck. Sie zeigt die grössten Positionen. Daraus entstehen Ziele und Massnahmen (Modul 10): z. B. CO₂-reduzierte Betonsorten als Standardvariante, Elektrifizierung kleiner Maschinen, Baustrom statt Aggregat, Leerlaufregel, Transportplanung. Wer einen Fahrplan zur Emissionsminderung erarbeitet, kann je nach Programm Förderung erhalten (Klimagesetz) – Voraussetzungen im Original prüfen.

### 6. Typische Fehler
- Nur Scope 1 und 2 ausweisen und den Eindruck erwecken, das sei «die» Bilanz.
- Kompensation von der Bilanz abziehen.
- Jahre vergleichen, obwohl Systemgrenzen geändert wurden.
- Zahlen ohne Quellen und Annahmen.
- Eine einzige Gesamtzahl ohne Bezug zur Bautätigkeit.

### 7. Lieferantenanfragen
Grosse Bauherrschaften und Generalunternehmer fragen zunehmend nach Emissionsdaten ihrer Lieferanten (für ihren eigenen Scope 3). Eine saubere eigene Bilanz und projektbezogene Daten (Beton, Diesel, Transporte) werden so zum Wettbewerbsvorteil.

### 8. Ihre Rolle
Sie organisieren die Datensammlung, sorgen für saubere Grenzen und Dokumentation, ziehen für Methode und externe Berichte Fachleute bei und übersetzen die Ergebnisse in Massnahmen und Kennzahlen.

§> Sinngemäss nach GHG Protocol und üblicher Bilanzierungspraxis; Förderprogramme nach Klimagesetz nur allgemein erwähnt, Voraussetzungen nicht geprüft.` },
      { id: 'm11-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm11-q08' },
      { id: 'm11-l2-abw', kind: 'decision', title: 'Abwägung: Scope 3 weglassen?', questionId: 'm11-d02' },
      { id: 'm11-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Emissionen einer Baustelle zuordnen', taskId: 'm11-t2' },
      { id: 'm11-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m11-q09', 'm11-q10'] },
      { id: 'm11-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm11-p2' },
      { id: 'm11-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Scope 1: eigene Treib- und Brennstoffe; Scope 2: eingekaufte Energie; Scope 3: Wertschöpfungskette.',
        'Bei Bauunternehmen ist Scope 3 (vor allem Baustoffe) meist am grössten.',
        'Bilanz = Aktivitätsdaten × Emissionsfaktoren; Quellen und Annahmen offenlegen.',
        'Systemgrenzen festlegen und konsequent anwenden.',
        'Reduktion vor Kompensation; Kompensation nicht von der Bilanz abziehen.',
      ] },
      { id: 'm11-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['ghg-protocol', 'kbob-oekobilanz', 'klg', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm11-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Graue Emissionen: Baustoffe, Beton und Varianten',
    topics: ['m11-material'],
    objectives: [
      'Erklären, warum Zement und Stahl die grauen Emissionen dominieren',
      'CO₂-reduzierte Varianten (Zementart, Recyclingbeton, Bauweise) richtig einordnen',
      'Unternehmervorschläge zu Baustoffen fachlich und vertraglich sauber einbringen',
    ],
    steps: [
      { id: 'm11-l3-situation', kind: 'situation', title: 'Einstieg: «Recyclingbeton ist CO₂-frei»', text: `In einer Projektsitzung sagt der Architekt: «Wir nehmen Recyclingbeton, dann ist das Gebäude klimafreundlich.» Der Bauführer nickt. Sie wissen: Im Beton steckt vor allem Zement – und den gibt es auch im Recyclingbeton.

Wie bringen Sie das sachlich ein?` },
      { id: 'm11-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m11-q11', 'm11-q12'] },
      { id: 'm11-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Graue Emissionen** sind die Treibhausgase aus Herstellung, Transport und Entsorgung von Baustoffen.

**Beton**: Der grösste Teil der Emissionen stammt aus dem **Zementklinker** (Brennen von Kalkstein). Hebel: **klinkerärmere Zemente**, **weniger Zement** (optimierte Rezepturen), **weniger Beton** (schlankere Bauteile, angepasste Festigkeiten).

**Recyclingbeton** (mit rezyklierter Gesteinskörnung) schont **Kies und Deponieraum** – spart aber CO₂ nur, wenn auch Zementmenge oder -art günstiger ist.

**Stahl**: hohe Emissionen bei Primärstahl; Bewehrungsstahl aus Elektrostahlwerken mit Schrott ist deutlich günstiger.

**Bauweise**: Holz und Holz-Hybrid, leichtere Konstruktionen, Erhalt statt Ersatz.

**Entscheiden** tun Bauherrschaft und Planer; die Unternehmung bringt **Varianten** ein – mit belegten Daten.` },
      { id: 'm11-l3-explain', kind: 'explain', title: 'Wo die grauen Emissionen stecken', text: `### Baustoffe im Überblick

| Baustoff | Haupttreiber der Emissionen | Hebel |
|---|---|---|
| Beton | Zementklinker | Zemente mit weniger Klinker, Rezepturen mit weniger Zement, Festigkeitsklasse nicht höher als nötig, Bauteile schlanker |
| Recyclingbeton | Zement (wie Beton) | Kies sparen; CO₂ nur mit angepasstem Zement |
| Bewehrungsstahl | Stahlherstellung | Stahl aus Schrott (Elektrostahl), Bewehrungsmengen optimieren |
| Asphalt | Bitumen, Erhitzen | Ausbauasphalt verwerten, Niedertemperaturverfahren |
| Mauerwerk, Ziegel | Brennen | Wiederverwendung, Alternativen |
| Dämmstoffe | Je nach Material sehr verschieden | Ökobilanzdaten vergleichen |
| Holz | Gering (bei nachhaltiger Herkunft), Kohlenstoffspeicher | Herkunft, Behandlung, Brandschutz |

### Wie man vergleicht
Mit **Ökobilanzdaten** (z. B. KBOB-Liste) bzw. **Umweltproduktdeklarationen** der Hersteller – immer bezogen auf dieselbe **funktionale Einheit** (z. B. 1 m² Decke mit gleicher Tragfähigkeit), nicht auf ein Kilogramm Baustoff. Ein «grünerer» Baustoff, von dem man mehr braucht, kann am Ende schlechter abschneiden.

### Normen und Zulassung
Betonsorten mit neuen Zementen oder rezyklierter Gesteinskörnung müssen den Normen und den Anforderungen des Bauwerks (Festigkeit, Dauerhaftigkeit, Expositionsklassen) entsprechen. Die Freigabe einer Variante liegt beim Tragwerksplaner bzw. Ingenieur.

§> Allgemeine Fachaussagen ohne Emissionsfaktoren und Anteile. Ökobilanzdaten KBOB als Quelle; Betonnormen (SN EN 206 u. a.) nicht im Detail geprüft.` },
      { id: 'm11-l3-explain-2', kind: 'explain', title: 'Varianten einbringen', text: `### Die Rolle der Unternehmung
- **Ausschreibung lesen**: Sind Betonsorten, Zementarten, Recyclinganteile vorgegeben? Gibt es Spielraum für Varianten?
- **Unternehmervorschlag**: Variante mit technischer Begründung, Auswirkung auf Kosten, Termine und Emissionen (mit Datenquelle).
- **Freigabe**: durch Bauherrschaft und Tragwerksplaner; Verfügbarkeit beim Betonwerk vorher klären.
- **Umsetzung**: Lieferscheine prüfen – wird geliefert, was vereinbart ist? Abweichungen melden.

### Verfügbarkeit und Risiko
Nicht jedes Werk liefert jede Sorte jederzeit. Neue Rezepturen können andere Eigenschaften haben (Abbinden, Festigkeitsentwicklung im Winter, Ausschalfristen). Das gehört in die AVOR: Termine, Nachbehandlung, Prüfungen.

### Was nicht geht
Eine vertraglich vereinbarte Sorte ohne Zustimmung durch eine andere ersetzen – auch nicht durch eine «grünere». Und umgekehrt: eine zugesagte CO₂-reduzierte Sorte stillschweigend durch eine Standardsorte ersetzen, weil sie gerade nicht verfügbar ist. Beides ist vertragswidrig; der zweite Fall kann zudem eine Täuschung der Bauherrschaft sein.

§> Vertragliche Aussagen allgemein (Modul 8); technische Freigabe beim Tragwerksplaner.` },
      { id: 'm11-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Decken mit weniger Zement', context: 'Hochbau', text: `Bei einem Wohnbau schlägt die Unternehmung vor, für die Decken eine Betonsorte mit klinkerärmerem Zement zu verwenden, und belegt die Einsparung mit den Umweltproduktdeklarationen des Werks. Der Ingenieur prüft Festigkeit und Ausschalfristen; im Winter wird für zwei Etappen auf die Standardsorte gewechselt, weil die Festigkeitsentwicklung zu langsam wäre – mit Zustimmung der Bauherrschaft und Dokumentation. Die Lieferscheine werden bei jeder Betonage kontrolliert.

**Lernpunkt**: Eine gute Variante ist technisch geprüft, vertraglich vereinbart und auf der Baustelle kontrolliert.` },
      { id: 'm11-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Stützmauer oder Böschung?', context: 'Tiefbau', text: `Für eine Strassenverbreiterung ist eine 120 m lange Betonstützmauer geplant. Die Unternehmung schlägt vor, auf 80 m eine bewehrte Erdböschung mit Aushub vor Ort zu bauen. Das spart Beton, Bewehrung und Transporte. Der Ingenieur prüft Platzbedarf und Standsicherheit; auf 60 m wird die Variante umgesetzt.

**Lernpunkt**: Die grösste Einsparung entsteht oft nicht durch einen anderen Baustoff, sondern durch eine andere Lösung.` },
      { id: 'm11-l3-deep', kind: 'deep', title: 'Fachvertiefung: Graue Emissionen steuern', text: `### 1. Warum Zement so wichtig ist
Beim Brennen von Kalkstein zu Zementklinker wird CO₂ aus dem Gestein selbst freigesetzt – zusätzlich zur Energie für den Ofen. Diese «prozessbedingten» Emissionen lassen sich nicht durch erneuerbare Energie vermeiden. Deshalb ist der Klinkeranteil der wichtigste Hebel: Zemente mit Anteilen von gebranntem Schiefer, Kalkstein, Hüttensand oder anderen Stoffen haben weniger Klinker.

### 2. Weniger ist mehr
Die einfachste Einsparung ist weniger Material: Festigkeitsklasse nicht höher als nötig, Bauteile optimiert, Überbestellungen und Restbeton vermeiden, Schalungen mehrfach verwenden. Restbeton, der zurückgeht oder entsorgt wird, hat die vollen Emissionen verursacht – ohne Nutzen.

### 3. Recyclingbeton richtig einordnen
Recyclingbeton (Beton mit rezyklierter Gesteinskörnung aus Betonabbruch oder Mischabbruch) ist ein wichtiger Teil der Kreislaufwirtschaft: Er schont Kiesvorkommen und Deponieraum. Für das Klima ist er nur dann besser, wenn der Zementanteil nicht steigt oder klinkerärmerer Zement eingesetzt wird. Ehrliche Kommunikation unterscheidet zwischen «ressourcenschonend» und «CO₂-reduziert».

### 4. Stahl
Bewehrungsstahl wird in der Schweiz zu einem grossen Teil aus Schrott in Elektrostahlwerken hergestellt; die Emissionen hängen vom Strommix und vom Werk ab. Importierter Primärstahl kann deutlich höhere Emissionen haben. Herkunft und Deklaration lohnen sich zu prüfen.

### 5. Erhalten statt ersetzen
Die klimafreundlichste Tonne Beton ist die, die nicht neu gegossen wird. Umbau und Sanierung statt Ersatzneubau, Wiederverwendung von Bauteilen (Lektion 4) – solche Entscheide trifft die Bauherrschaft. Als Unternehmung können Sie sie mit Erfahrung aus der Ausführung unterstützen (Machbarkeit, Kosten, Risiken).

### 6. Daten und Vergleiche
Vergleiche immer auf derselben funktionalen Einheit und mit derselben Datengrundlage. Achten Sie bei Umweltproduktdeklarationen auf Bezugsgrösse, Systemgrenzen und Gültigkeit. Wo Daten fehlen, mit Durchschnittswerten rechnen und das kennzeichnen.

### 7. Termine und Qualität
Klinkerärmere Betone können langsamer erhärten. Das beeinflusst Ausschalfristen, Taktplanung und Nachbehandlung, besonders bei Kälte. In der AVOR rechtzeitig mit Werk und Ingenieur klären – sonst wird bei Zeitdruck auf die Standardsorte ausgewichen.

### 8. Ihre Rolle
Sie bringen das Wissen in Offerte und AVOR, sorgen dafür, dass Varianten technisch und vertraglich sauber vereinbart werden, und kontrollieren auf der Baustelle (Lieferscheine), dass geliefert und eingebaut wird, was zugesagt ist.

§> Fachaussagen allgemein; keine Klinkeranteile, Emissionsfaktoren oder Einsparungen in Zahlen. Zementarten und Betonnormen nicht im Detail geprüft.` },
      { id: 'm11-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm11-q13' },
      { id: 'm11-l3-abw', kind: 'decision', title: 'Abwägung: Die Sorte ist nicht lieferbar', questionId: 'm11-d03' },
      { id: 'm11-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Betonvariante für einen Wohnbau', taskId: 'm11-t3' },
      { id: 'm11-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m11-q14', 'm11-q15'] },
      { id: 'm11-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm11-p3' },
      { id: 'm11-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Beton: Emissionen vor allem aus dem Zementklinker – klinkerärmer, weniger Zement, weniger Beton.',
        'Recyclingbeton schont Kies und Deponieraum; CO₂ nur mit angepasstem Zement.',
        'Vergleiche auf derselben funktionalen Einheit mit Ökobilanzdaten bzw. Produktdeklarationen.',
        'Varianten: technisch durch den Ingenieur, vertraglich durch die Bauherrschaft freigeben.',
        'Lieferscheine kontrollieren; keine stillschweigenden Sortenwechsel.',
      ] },
      { id: 'm11-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['kbob-oekobilanz', 'sia2032', 'bafu-mineral', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm11-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Ressourcen und Kreislauf: Wiederverwenden, Verwerten, Vermeiden',
    topics: ['m11-kreislauf'],
    objectives: [
      'Die Rangfolge Vermeiden – Wiederverwenden – Verwerten – Entsorgen anwenden',
      'Wiederverwendung von Bauteilen praktisch organisieren',
      'Materialflüsse einer Baustelle erfassen und verbessern',
    ],
    steps: [
      { id: 'm11-l4-situation', kind: 'situation', title: 'Einstieg: Die Fenster aus dem Rückbau', text: `Beim Rückbau eines Bürogebäudes aus den 1990er-Jahren fallen 120 intakte Fenster, 400 m² Doppelboden, Stahlträger und Natursteinplatten an. Alles soll in die Mulde. Ein Architekt aus einem anderen Projekt fragt, ob er Fenster und Träger übernehmen kann.

Was müssen Sie klären, bevor Sie Ja sagen?` },
      { id: 'm11-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m11-q16', 'm11-q17'] },
      { id: 'm11-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Rangfolge**: **Vermeiden** (weniger Material, Erhalt) vor **Wiederverwenden** (Bauteile als Bauteile) vor **Verwerten** (Material als Rohstoff, z. B. Recyclinggranulat) vor **Entsorgen**.

**Wiederverwendung** spart am meisten, ist aber anspruchsvoll: Bauteile müssen schadstofffrei, technisch geeignet, sorgfältig ausgebaut, gelagert und dokumentiert sein – und jemand muss sie abnehmen.

**Verwertung**: sortenrein trennen, hochwertige Verwertung vor Downcycling (Modul 3).

**Materialflüsse**: Eine Material- bzw. Massenbilanz zeigt, was rein- und rausgeht – Grundlage für Verbesserungen.

**Rechtsrahmen**: Das USG stärkt seit 2025 die Kreislaufwirtschaft und ressourcenschonendes Bauen; die VVEA regelt Verwertung und Trennung.` },
      { id: 'm11-l4-explain', kind: 'explain', title: 'Wiederverwendung von Bauteilen', text: `### Voraussetzungen

| Frage | Warum |
|---|---|
| Schadstofffrei? | Schadstoffermittlung vor dem Rückbau (Modul 3) – keine Wiederverwendung von belasteten Bauteilen |
| Technisch geeignet? | Zustand, Masse, Normen, Bauphysik, Brandschutz; Beurteilung durch Fachleute |
| Wer übernimmt? | Abnehmer muss feststehen (Projekt, Bauteilbörse, Händler) – sonst landet es doch in der Mulde |
| Ausbau? | Zerstörungsfreier Ausbau braucht Zeit, Methode und Platz – im Rückbauvertrag und Terminplan vorsehen |
| Lagerung und Transport? | Witterungsschutz, Kennzeichnung, Logistik |
| Dokumentation? | Herkunft, Masse, Zustand, Schadstofffreiheit – für den neuen Einsatz |
| Haftung und Gewährleistung? | Wer haftet für wiederverwendete Bauteile? Vertraglich klären |

### Typische Bauteile
Stahlträger und -stützen, Fenster und Türen, Fassadenplatten, Natursteinplatten, Doppelböden, Trennwände, Sanitärapparate, Leuchten, Ziegel, Pflastersteine, Randsteine.

### Wer entscheidet?
Ob wiederverwendet wird, entscheidet die Bauherrschaft des Rückbauprojekts (Eigentum am Material) zusammen mit dem Rückbauplan. Die Unternehmung kann das vorschlagen und organisieren – aber nicht eigenmächtig Material abgeben.

§> Wiederverwendung als bewährte Praxis; rechtliche Einordnung (Abfall oder Produkt) im Einzelfall – sinngemäss nach USG/VVEA, nicht vertieft.` },
      { id: 'm11-l4-explain-2', kind: 'explain', title: 'Materialflüsse und Verwertung', text: `### Material- und Massenbilanz

| Fluss | Erfassung | Hebel |
|---|---|---|
| Aushub | m³ bzw. t, Verwertung vor Ort / extern / Deponie | Wiedereinbau vor Ort, Verwertung statt Deponie |
| Rückbaumaterial | t nach Fraktion | Sortenreiner Rückbau, hochwertige Verwertung |
| Eingesetzte Baustoffe | Beton, Stahl, Asphalt usw. | Recyclinganteil, Mengenoptimierung, Restbeton vermeiden |
| Bauabfälle | t nach Fraktion | Trennung, Verpackung zurück an Lieferanten |

### Hochwertig verwerten
- **Beton- und Mischabbruch** als Gesteinskörnung für Beton (statt nur als Kofferung).
- **Ausbauasphalt** im Asphaltmischgut (nach PAK-Triage, Modul 3).
- **Aushub** wiedereinbauen oder als Rohstoff (Kieswerk, Ziegelei) statt Deponie.
- **Metalle, Holz, Kunststoffe** sortenrein.
Downcycling (z. B. Abbruch nur als Auffüllung) ist besser als Deponie, aber schlechter als hochwertige Verwertung.

### Vermeiden
Verpackungen reduzieren (Mehrweg, Rücknahme), Überbestellungen vermeiden, Schalungen und Gerüstmaterial mehrfach einsetzen, Restbeton vermeiden bzw. sinnvoll verwenden.

§> Verwertungspflichten nach VVEA (Modul 3) sinngemäss; Kreislaufwirtschaft im USG (Pa.Iv. 20.433) allgemein.` },
      { id: 'm11-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die Fenster aus dem Rückbau', context: 'Hochbau', text: `Im Fall aus dem Einstieg klärt die Umweltbeauftragte mit der Bauherrschaft des Rückbaus: Der Schadstoffbericht nennt keine Schadstoffe in Fenstern und Trägern; die Bauherrschaft ist einverstanden. Der Architekt lässt Masse und Zustand durch einen Fachplaner prüfen; 90 Fenster und alle Träger sind geeignet. Der Rückbau wird um vier Tage verlängert, damit sorgfältig ausgebaut wird; die Mehrkosten trägt der Abnehmer teilweise. Die Bauteile werden mit Herkunftsblatt übergeben.

**Lernpunkt**: Wiederverwendung gelingt, wenn Abnehmer, Schadstofffreiheit, Ausbau und Dokumentation geklärt sind – vor dem Abbruch.` },
      { id: 'm11-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Randsteine und Pflaster', context: 'Tiefbau', text: `Bei einer Strassensanierung werden Granit-Randsteine und Pflastersteine ausgebaut. Statt sie zu brechen, werden sie sortiert, gereinigt und im selben Projekt wieder eingesetzt; Überschüsse gehen an den Werkhof der Gemeinde. Der Bauführer plant dafür Platz auf dem Installationsplatz und eine Equipe für den Ausbau ein.

**Lernpunkt**: Im Tiefbau ist Wiederverwendung oft einfach – wenn sie eingeplant ist.` },
      { id: 'm11-l4-deep', kind: 'deep', title: 'Fachvertiefung: Kreislaufwirtschaft im Bauunternehmen', text: `### 1. Die Rangfolge ernst nehmen
Vermeiden, wiederverwenden, verwerten, entsorgen – diese Reihenfolge ist im Abfallrecht verankert und bestimmt, wo der grösste Nutzen liegt. Wiederverwendung erhält die Form und Funktion eines Bauteils; Verwertung erhält nur das Material; Deponie verliert beides.

### 2. Warum Wiederverwendung selten passiert
- Zeit: zerstörungsfreier Ausbau dauert länger als Abbruch.
- Abnehmer: Angebot und Nachfrage treffen sich selten zur richtigen Zeit.
- Unsicherheit: Normen, Gewährleistung, Bauphysik, Schadstoffe.
- Logistik: Lagerplatz, Transporte, Dokumentation.
Diese Hürden lassen sich verkleinern: früh planen (Rückbauinventar), Bauteilbörsen und Plattformen nutzen, Herkunftsblätter, klare Verträge.

### 3. Rückbauinventar
Vor einem Rückbau lohnt sich neben der Schadstoffermittlung ein **Bauteil- und Materialinventar**: Was ist vorhanden, in welchem Zustand, in welcher Menge? Das ist die Grundlage für Wiederverwendung, Verwertung und eine realistische Kalkulation.

### 4. Hochwertige Verwertung
Recyclingbaustoffe sind dann hochwertig verwertet, wenn sie Primärmaterial in ähnlicher Funktion ersetzen (z. B. Gesteinskörnung im Beton). Voraussetzung ist sortenreiner Rückbau: Mischabbruch mit Gips, Holz und Kunststoff lässt sich schlecht verwerten. Die Trennung auf der Baustelle ist deshalb nicht nur Pflicht (VVEA), sondern Voraussetzung für Kreislauf.

### 5. Materialbilanz als Steuerungsinstrument
Eine einfache Bilanz je Projekt (Aushub, Rückbaumaterial, Baustoffe, Abfälle) zeigt, wie viel im Kreislauf bleibt. Über alle Projekte zusammengeführt, ergibt sie Kennzahlen für die Firma (Verwertungsquote, Recyclinganteil). Achten Sie auf ehrliche Definitionen: Was zählt als «verwertet»?

### 6. Geschäftsmodelle
Einige Bauunternehmen betreiben eigene Recyclinganlagen, Bauteillager oder Mietsysteme für Schalungen und Container. Das kann wirtschaftlich interessant sein – erfordert aber Bewilligungen, Qualitätssicherung und Absatz.

### 7. Recht im Wandel
Mit der Revision des USG zur Kreislaufwirtschaft (in Kraft grösstenteils seit 2025) erhalten ressourcenschonendes Bauen und die Verwertung mehr Gewicht; Verordnungen werden schrittweise angepasst. Verfolgen Sie die Entwicklung (Rechtskataster, Modul 1 und 10).

### 8. Ihre Rolle
Sie bringen Kreislauf in die Abläufe: Rückbauinventar und Schadstoffermittlung vor dem Abbruch, Trennung auf der Baustelle, Verwertungswege, Materialbilanz, Vorschläge zur Wiederverwendung. Entscheide über Eigentum und Vertrag treffen Bauherrschaft und Projektleitung.

§> Sinngemäss nach VVEA und USG (Kreislaufwirtschaft); rechtliche Abgrenzung Abfall/Produkt bei Wiederverwendung nicht vertieft.` },
      { id: 'm11-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm11-q18' },
      { id: 'm11-l4-abw', kind: 'decision', title: 'Abwägung: Bauteile abgeben?', questionId: 'm11-d04' },
      { id: 'm11-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Rückbauinventar und Kreislauf', taskId: 'm11-t4' },
      { id: 'm11-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m11-q19', 'm11-q20'] },
      { id: 'm11-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm11-p4' },
      { id: 'm11-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem Bauherrn (Feynman-Methode)', feynmanId: 'm11-f1' },
      { id: 'm11-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Vermeiden – wiederverwenden – verwerten – entsorgen.',
        'Wiederverwendung: schadstofffrei, geeignet, Abnehmer, Ausbau, Lagerung, Dokumentation, Vertrag.',
        'Bauherrschaft entscheidet über ihr Material; die Unternehmung schlägt vor und organisiert.',
        'Sortenreiner Rückbau ist Voraussetzung für hochwertige Verwertung.',
        'Materialbilanz je Projekt; ehrliche Definition von «verwertet».',
      ] },
      { id: 'm11-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg-kreislauf', 'vvea', 'bafu-mineral', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm11-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Umsetzen und kommunizieren: Baustelle, Beschaffung, Glaubwürdigkeit',
    topics: ['m11-umsetzung'],
    objectives: [
      'Energie und Emissionen auf der Baustelle senken',
      'Nachhaltigkeit in Beschaffung und Offerten einbringen',
      'Glaubwürdig kommunizieren und Greenwashing vermeiden',
    ],
    steps: [
      { id: 'm11-l5-situation', kind: 'situation', title: 'Einstieg: Die «grüne Baustelle»', text: `Für eine Ausschreibung hat Ihre Firma «emissionsfreie Kleingeräte, Baustrom statt Aggregat und CO₂-reduzierten Beton» angeboten und den Zuschlag erhalten. Drei Monate später sehen Sie: zwei Dieselaggregate, Benzin-Trennscheiben, und das Werk liefert die vereinbarte Betonsorte nur zeitweise. Die Marketingabteilung plant einen Artikel über «unsere grüne Baustelle».

Was tun Sie?` },
      { id: 'm11-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m11-q21', 'm11-q22'] },
      { id: 'm11-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Auf der Baustelle**: Baustrom früh anschliessen, elektrische und effiziente Maschinen, Leerlauf vermeiden, Container dämmen und Heizung regeln, Transporte bündeln, Restbeton und Verschnitt vermeiden.

**In der Beschaffung**: Nachhaltigkeitskriterien bei Maschinen, Baustoffen, Subunternehmern und Transporten; Zusagen in Offerten nur, wenn sie umsetzbar und nachweisbar sind.

**Zusagen sind Vertrag**: Was in der Offerte steht, wird geschuldet. Abweichungen werden offen gemeldet und vereinbart.

**Kommunikation**: konkret, belegt, verhältnismässig. Keine pauschalen Begriffe wie «klimaneutral» oder «grün» ohne Grundlage – **Greenwashing** schadet der Glaubwürdigkeit und kann rechtlich problematisch sein.` },
      { id: 'm11-l5-explain', kind: 'explain', title: 'Energie und Emissionen auf der Baustelle', text: `| Bereich | Massnahmen |
|---|---|
| Strom | Baustrom früh beantragen, Aggregate nur als Überbrückung; Ökostrom-Produkt prüfen |
| Maschinen | Elektrisch wo möglich (Kran, Minibagger, Pumpen, Kompressoren, Kleingeräte); richtige Grösse; Leerlauf-Regel; Wartung |
| Container und Unterkünfte | Gedämmte Container, Heizung mit Thermostat und Zeitsteuerung, Türen zu, Licht aus |
| Winterbau | Beheizung und Austrocknung gezielt, Abdeckungen statt Heizen ins Freie |
| Transporte | Bündeln, volle Fahrten, Verwertung vor Ort, Bahn prüfen |
| Material | Restbeton vermeiden, Verschnitt optimieren, Verpackung zurück |
| Daten | Diesel und Strom je Baustelle erfassen (Tankbeleg mit Baustelle) |

Viele dieser Massnahmen sparen zugleich Kosten und verbessern die Luft und den Lärm (Module 5 und 6).

§> Bewährte Praxis; keine Einsparpotenziale in Zahlen.` },
      { id: 'm11-l5-explain-2', kind: 'explain', title: 'Beschaffung, Zusagen und Kommunikation', text: `### Nachhaltige Beschaffung
- **Maschinen und Fahrzeuge**: Verbrauch, Antrieb, Emissionsnachweis, Lärm.
- **Baustoffe**: Umweltproduktdeklarationen, Recyclinganteil, Herkunft (z. B. Holz, Naturstein).
- **Subunternehmer**: Maschinenpark, Umweltleistung, Bereitschaft zu Daten.
- **Lieferanten**: Mehrweg, Rücknahme von Verpackungen und Resten.

### Zusagen in Offerten
Bei öffentlichen Vergaben werden Nachhaltigkeitsangaben bewertet und Vertragsbestandteil (Modul 8). Bevor Sie etwas zusagen:
- Ist es technisch und logistisch machbar (z. B. Baustrom rechtzeitig, Betonsorte lieferbar)?
- Ist es kalkuliert?
- Wie wird es nachgewiesen?
- Was geschieht, wenn es zeitweise nicht geht?

### Glaubwürdig kommunizieren

| Statt | Besser |
|---|---|
| «Wir bauen klimaneutral.» | «Auf der Baustelle X setzen wir elektrische Kleingeräte und Baustrom ein; den Dieselverbrauch erfassen wir und berichten darüber.» |
| «Grüner Beton» | «Betonsorte mit klinkerärmerem Zement gemäss Deklaration des Werks; Einsatz in den Decken.» |
| «100 % recycelt» | «Gesteinskörnung aus Betonabbruch in den Innenwänden; Anteil gemäss Lieferschein.» |

Aussagen müssen **konkret, belegt und verhältnismässig** sein. Kompensation ist keine Reduktion. Was nicht erreicht wurde, wird offen gesagt.

§> Irreführende Aussagen können nach dem Gesetz gegen den unlauteren Wettbewerb (UWG) problematisch sein – sinngemäss, nicht vertieft. Beschaffungsrecht siehe Modul 8.` },
      { id: 'm11-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die Zusage wird eingelöst', context: 'Hochbau', text: `Im Fall aus dem Einstieg klärt die Umweltbeauftragte: Der Baustrom war verspätet beantragt worden, die Akku-Geräte fehlten im Magazin, und das Werk kann die Betonsorte im Winter nicht immer liefern. Sie meldet der Bauleitung die Abweichungen, vereinbart für die Wintermonate eine dokumentierte Ausnahme, beschafft Akku-Trennscheiben, und der Baustrom wird in zwei Wochen angeschlossen. Den Artikel lässt sie umformulieren: konkrete Massnahmen, ehrliche Hinweise auf die Ausnahmen, keine Superlative.

**Lernpunkt**: Glaubwürdigkeit entsteht, wenn Zusagen eingelöst und Abweichungen offen gemacht werden.` },
      { id: 'm11-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Diesel je Baustelle', context: 'Tiefbau', text: `Eine Tiefbaufirma ergänzt die Tankkarten um die Baustellennummer. Nach einem Jahr kann sie für jede Baustelle den Dieselverbrauch angeben. In Offerten nennt sie nun belegte Werte vergleichbarer Projekte und konkrete Massnahmen (Elektrobagger für Kleinbaustellen, Leerlaufregel). Ein Kanton bewertet das beim Zuschlag positiv.

**Lernpunkt**: Daten aus dem Alltag sind die Grundlage für glaubwürdige Zusagen.` },
      { id: 'm11-l5-deep', kind: 'deep', title: 'Fachvertiefung: Nachhaltigkeit glaubwürdig umsetzen', text: `### 1. Von der Absicht zur Routine
Nachhaltigkeit scheitert selten am Willen, häufig an der Umsetzung: Baustrom zu spät beantragt, Akku-Geräte nicht beschafft, Betonsorte nicht lieferbar, Daten nicht erfasst. Deshalb gehören die Massnahmen in die normalen Abläufe: Offertprüfung (Machbarkeit), AVOR (Baustrom, Geräte, Werk), Einkauf (Standards), Baustelle (Kontrolle, Daten).

### 2. Zusagen sind Vertrag
Was in der Offerte als Nachhaltigkeitsleistung angeboten wird, wird geschuldet. Wenn etwas zeitweise nicht möglich ist, wird das der Bauleitung gemeldet und eine Ausnahme vereinbart – nicht stillschweigend abgewichen. Bei öffentlichen Vergaben kann eine nicht eingehaltene Zusage den Zuschlag nachträglich in Frage stellen oder Folgen für künftige Vergaben haben.

### 3. Greenwashing erkennen
Warnzeichen: pauschale Begriffe (grün, klimaneutral, nachhaltig) ohne Erklärung; Ausblenden der grossen Positionen (Scope 3, Baustoffe); Kompensation als Reduktion dargestellt; Einzelbeispiele als Firmenstandard; Bilder statt Zahlen. Prüfen Sie jede Aussage: Was genau? Wie belegt? Im Verhältnis wozu?

### 4. Kompensation einordnen
Kompensationszertifikate finanzieren Emissionsminderungen anderswo. Sie können ein Beitrag sein, ersetzen aber nicht die eigene Reduktion und werden in Bilanzen getrennt ausgewiesen. Die Qualität von Zertifikaten ist sehr unterschiedlich; Aussagen wie «klimaneutral dank Kompensation» stehen zunehmend in der Kritik.

### 5. Wirtschaftlichkeit
Viele Massnahmen sparen Geld (Diesel, Heizung, Entsorgung, Transporte). Andere kosten (Akku-Geräte, Elektromaschinen, spezielle Betonsorten) und werden über Zuschlagskriterien, Kundenanforderungen oder Förderprogramme interessant. Rechnen Sie ehrlich – und zeigen Sie beides der Geschäftsleitung (Modul 12).

### 6. Mitarbeitende einbeziehen
Leerlauf vermeiden, Container-Türen schliessen, Restbeton melden, Verpackungen zurückgeben – vieles hängt am Verhalten. Erklären Sie das Warum, machen Sie es einfach, zeigen Sie Ergebnisse (z. B. Dieselverbrauch je Baustelle im Vergleich).

### 7. Berichten
Ob für eine Pflichtberichterstattung, einen Kunden oder die eigene Website: Systemgrenzen, Methoden, Datenqualität, Ziele und Fortschritt offenlegen – auch Rückschläge. Ein ehrlicher Bericht mit kleinen Fortschritten ist glaubwürdiger als ein Hochglanzprospekt.

### 8. Ihre Rolle
Sie prüfen Zusagen auf Machbarkeit, sorgen für Umsetzung und Daten, kontrollieren auf der Baustelle und prüfen Kommunikation auf Belegbarkeit. Sie bremsen übertriebene Aussagen – und helfen, die echten Fortschritte sichtbar zu machen.

§> Bewährte Praxis; rechtliche Aspekte von Werbeaussagen (UWG) und Vergaberecht nur allgemein.` },
      { id: 'm11-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm11-q23' },
      { id: 'm11-l5-abw', kind: 'decision', title: 'Abwägung: Der Artikel über die grüne Baustelle', questionId: 'm11-d05' },
      { id: 'm11-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Nachhaltigkeitszusagen prüfen', taskId: 'm11-t5' },
      { id: 'm11-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m11-q24', 'm11-q25'] },
      { id: 'm11-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm11-p5' },
      { id: 'm11-l5-feynman', kind: 'feynman', title: 'Erklären Sie es dem Marketing (Feynman-Methode)', feynmanId: 'm11-f2' },
      { id: 'm11-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Baustelle: Baustrom früh, elektrisch und effizient, Leerlauf vermeiden, Container und Winterbau im Griff.',
        'Beschaffung: Kriterien für Maschinen, Baustoffe, Subunternehmer, Lieferanten.',
        'Zusagen sind Vertrag – Machbarkeit prüfen, Abweichungen offen vereinbaren.',
        'Kommunikation konkret, belegt, verhältnismässig; Kompensation ist keine Reduktion.',
        'Daten aus dem Alltag (Diesel je Baustelle) machen Zusagen glaubwürdig.',
      ] },
      { id: 'm11-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['boeb', 'uwg', 'klg', 'praxis'] },
    ],
  },
];
