import type { Lesson } from '../types';

// Modul 5 «Luftreinhaltung».
// Rechtliche Aussagen sinngemäss, nicht am Fedlex-Volltext geprüft. Keine Grenzwerte,
// Schwellen für Massnahmenstufen, Baujahrgrenzen oder Kontrollfristen genannt – diese stehen in
// LRV und BAFU-Richtlinie. Stufenlogik A/B und Partikelanforderungen wie in Modul 1 (bestätigt
// über BAFU- und kantonale Unterlagen). Prüfstatus: Entwurf.

const M = 'm5';
const E = 'entwurf' as const;

export const M5_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm5-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Luftschadstoffe auf Baustellen: Wirkung und Rechtsrahmen',
    topics: ['m5-grundlagen'],
    objectives: [
      'Die wichtigsten Luftschadstoffe von Baustellen und ihre Wirkung nennen',
      'Den Rechtsrahmen (USG, LRV, BAFU-Richtlinie) einordnen',
      'Zwischen Umweltschutz und Arbeitnehmerschutz bei Staub unterscheiden',
    ],
    steps: [
      { id: 'm5-l1-situation', kind: 'situation', title: 'Einstieg: «Ist doch nur Staub»', text: `Rückbau eines Lagerhauses in einem Wohnquartier. Ein Bagger mit Abbruchzange arbeitet bei trockenem, windigem Wetter; eine graue Wolke zieht über den Spielplatz nebenan. Ein Vater filmt mit dem Handy. Der Maschinist zuckt die Schultern: «Das ist nur Staub, der setzt sich.»

Was ist «nur Staub» – und wer muss hier was tun?` },
      { id: 'm5-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m5-q01', 'm5-q02'] },
      { id: 'm5-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Baustellen** belasten die Luft vor allem mit **Feinstaub** (aus Abbruch, Erdbau, Schneiden, Verkehr), **Dieselruss** aus Maschinen und Lastwagen, **Stickoxiden** und **flüchtigen organischen Verbindungen** (VOC, z. B. aus Lösungsmitteln und Bitumen).

**Dieselruss** ist besonders problematisch: sehr feine Partikel, die tief in die Lunge gelangen; er gilt als krebserregend.

**Rechtsrahmen**: Das **USG** verlangt, Emissionen vorsorglich an der Quelle zu begrenzen. Die **Luftreinhalte-Verordnung (LRV)** enthält u. a. die Partikelanforderungen für Baumaschinen. Die **BAFU-Richtlinie «Luftreinhaltung auf Baustellen»** legt Massnahmen nach **Stufe A** (alle Baustellen) und **Stufe B** (grössere, längere Baustellen in empfindlicher Lage) fest.

**Staub betrifft auch die Mitarbeitenden** – z. B. Quarzfeinstaub. Dafür gelten zusätzlich die Regeln des Arbeitnehmerschutzes (Suva).` },
      { id: 'm5-l1-explain', kind: 'explain', title: 'Was in die Luft gelangt', text: `### Schadstoffe und Quellen

| Schadstoff | Typische Quellen auf der Baustelle | Wirkung |
|---|---|---|
| Grobstaub | Erdbau, Pisten, Abbruch, Schüttgut | Verschmutzung, Belästigung, Reizung |
| Feinstaub (PM10, PM2.5) | Abbruch, Schneiden, Fräsen, Brecher, Verkehr | Atemwege, Herz-Kreislauf |
| Dieselruss (ultrafeine Partikel) | Baumaschinen, Lastwagen, Aggregate | dringt tief in die Lunge, krebserregend |
| Stickoxide (NOx) | Verbrennungsmotoren | Atemwege, Ozonbildung |
| VOC | Lösungsmittel, Farben, Bitumen, Klebstoffe | Ozonbildung, Geruch, Gesundheit |
| Quarzfeinstaub | Schneiden und Schleifen von Beton, Stein, Mörtel | Silikose, krebserregend (Arbeitnehmerschutz) |
| Asbestfasern | Rückbau schadstoffhaltiger Bauteile | krebserregend (Modul 3) |

### Emission und Immission
Die **Emission** entsteht an der Quelle (Abgas, Staubwolke), die **Immission** wirkt dort, wo Menschen und Umwelt betroffen sind (Spielplatz, Balkon, Garten). Das USG setzt zuerst an der Quelle an – unabhängig davon, ob sich jemand beschwert (Vorsorgeprinzip, Modul 1).

### Warum Baustellen zählen
Baumaschinen und Bautransporte tragen in Städten und Agglomerationen spürbar zur Belastung mit Dieselruss und Feinstaub bei. Deshalb gelten für sie eigene Anforderungen – und deshalb sind Massnahmen auf der Baustelle keine Schikane, sondern ein Beitrag zur Gesundheit der Nachbarschaft und der eigenen Leute.

§> Wirkungen allgemein nach BAFU und Suva, sinngemäss. Immissionsgrenzwerte der LRV nicht wiedergegeben.` },
      { id: 'm5-l1-explain-2', kind: 'explain', title: 'Rechtsrahmen und Zuständigkeiten', text: `### Gesetz und Verordnung
- **USG**: Vorsorgliche Emissionsbegrenzung an der Quelle, soweit technisch und betrieblich möglich und wirtschaftlich tragbar; verschärft, wenn Einwirkungen schädlich oder lästig werden (Art. 11 USG, sinngemäss).
- **LRV**: Konkretisiert die Begrenzung von Emissionen. Für Baustellen besonders wichtig: die **Partikelanforderungen an Baumaschinen** mit Dieselmotor und mehr als 18 kW (Art. 19a LRV mit Anhang 4 Ziff. 3) und die Bestimmungen zu Baustellen, die auf die BAFU-Richtlinie verweisen.

### BAFU-Richtlinie «Luftreinhaltung auf Baustellen»
- **Stufe A**: Basismassnahmen für alle Baustellen (z. B. Benetzen bei Staub, Abdecken von Schüttgut, Verzicht auf offenes Verbrennen, Motoren abstellen).
- **Stufe B**: zusätzliche Massnahmen für grössere bzw. länger dauernde Baustellen, je nach Lage (z. B. Agglomeration) – angeordnet im Baubewilligungsverfahren.
Die Kriterien und Schwellen stehen in der Richtlinie; die App nennt sie nicht.

### Wer ist zuständig?
- **Behörde** (Kanton, Gemeinde): ordnet die Stufe an, kontrolliert Baustellen und Maschinen.
- **Bauherrschaft**: Adressatin der Bewilligung, schreibt die Massnahmen aus.
- **Unternehmung**: setzt um, setzt nur konforme Maschinen ein, führt Nachweise – auch für Subunternehmer.

### Arbeitnehmerschutz
Staub und Abgase gefährden auch die Mitarbeitenden. Für Quarzfeinstaub, Dieselabgase in geschlossenen Räumen und Asbest gelten zusätzlich die Vorgaben des Arbeitnehmerschutzes (Suva, Grenzwerte am Arbeitsplatz). Viele Massnahmen wirken doppelt: Benetzen beim Schneiden schützt die Nachbarn und den Arbeiter an der Maschine.

§> Art. 11 USG und Art. 19a LRV mit Anhang 4 Ziff. 3 sinngemäss (Modul 1, über BAFU- und kantonale Unterlagen bestätigt). Ob die Schwelle «über» oder «ab» 18 kW lautet, ist in den Quellen uneinheitlich – Wortlaut der LRV prüfen. Bestimmungen der LRV zu Baustellen (Anhang 2) nicht am Original geprüft.` },
      { id: 'm5-l1-diagram', kind: 'diagram', title: 'Schema: Quelle – Ausbreitung – Wirkung', diagram: 'emission', caption: 'Zuerst an der Quelle begrenzen, dann die Ausbreitung, zuletzt am Ort der Wirkung. Vereinfachte Lernhilfe.' },
      { id: 'm5-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Fassadensanierung in der Altstadt', context: 'Hochbau', text: `Bei einer Fassadensanierung werden Sandsteinflächen geschliffen und Fugen ausgefräst. Die Bewilligung ordnet Stufe B an. Die Unternehmung setzt Geräte mit Absaugung und Wasserbenetzung ein, umschliesst das Gerüst mit Staubschutznetzen und reinigt Gerüst und Gasse täglich feucht statt mit dem Laubbläser. Die Mitarbeitenden tragen Atemschutz gemäss Suva-Vorgaben, weil Quarzfeinstaub entsteht.

**Lernpunkt**: Dieselben Massnahmen schützen Nachbarn und Mitarbeitende – Absaugung an der Quelle ist besser als Atemschutz allein.` },
      { id: 'm5-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Kiespiste im Sommer', context: 'Tiefbau', text: `Für eine Umfahrungsstrasse fahren täglich 80 Lastwagen über eine Kiespiste neben einem Weiler. Nach drei trockenen Wochen beschweren sich die Anwohnenden über Staub auf Wäsche und Gemüse. Die Bauleitung lässt die Piste mit einem Wasserwagen befeuchten, die Geschwindigkeit begrenzen und den Abschnitt beim Weiler mit Recyclingasphalt befestigen.

**Lernpunkt**: Pisten sind oft die grösste Staubquelle – und lassen sich mit einfachen Mitteln entschärfen.` },
      { id: 'm5-l1-deep', kind: 'deep', title: 'Fachvertiefung: Warum Luftreinhaltung auf Baustellen zählt', text: `### 1. Unsichtbare Belastung
Die sichtbare Staubwolke ist nur ein Teil. Die gesundheitlich relevantesten Partikel sind so fein, dass man sie nicht sieht: Dieselruss und ultrafeine Partikel. Sie gelangen tief in die Lunge und teilweise in den Blutkreislauf. Deshalb setzt das Schweizer Recht bei Baumaschinen nicht bei der sichtbaren Rauchfahne an, sondern verlangt Partikelanforderungen, die in der Praxis wirksame Partikelfilter bedingen.

### 2. Vorsorge an der Quelle
Das USG folgt einer einfachen Reihenfolge: zuerst an der Quelle begrenzen (saubere Maschinen, nasse Verfahren, Absaugung), dann die Ausbreitung verhindern (Abschirmung, Abdecken, Abstand), zuletzt – wenn nötig – am Ort der Wirkung schützen. Für die Baustelle heisst das: Die wirksamste Massnahme ist meist die Wahl des Verfahrens und der Maschine in der AVOR (Modul 8), nicht die Staubschutzwand im Nachhinein.

### 3. Stufe A ist Pflicht für alle
Manche verstehen Stufe A als «nichts Besonderes». Das stimmt nicht: Stufe A enthält Basismassnahmen, die auf jeder Baustelle gelten – auch wenn die Bewilligung nichts dazu sagt. Stufe B kommt bei grösseren, längeren Baustellen in empfindlicher Lage dazu.

### 4. Typische Konflikte
- **Wasser gegen Staub – und Abwasser**: Benetzen bindet Staub, erzeugt aber Abwasser bzw. Schlamm. Wassermenge dosieren, Abfluss nicht in Meteorschächte leiten (Modul 2).
- **Termindruck**: Bei Trockenheit und Wind zu arbeiten, ist manchmal unvermeidlich – dann braucht es mehr Massnahmen, nicht weniger.
- **Kosten**: Filter, Wasserwagen, Absaugung kosten Geld. Die Pflichten sind aber nicht verhandelbar; über das *Wie* lässt sich reden (Modul 8).

### 5. Luft und Klima
Viele Massnahmen wirken doppelt: Motoren abstellen statt laufen lassen, Fahrten vermeiden, effiziente Maschinen einsetzen – das senkt Schadstoffe und CO₂ (Modul 11). Ein Partikelfilter reduziert allerdings nur Partikel, nicht CO₂.

### 6. Arbeitnehmerschutz mitdenken
Bei Quarzfeinstaub (Schneiden, Schleifen, Bohren von Beton und Stein), bei Arbeiten in Tunneln, Tiefgaragen und Innenräumen mit Verbrennungsmotoren und bei Asbest stehen die Mitarbeitenden im Zentrum. Die Suva gibt Grenzwerte am Arbeitsplatz und Schutzmassnahmen vor. Ihr Hintergrund in der Arbeitssicherheit ist hier ein Vorteil: Sie können beide Sichtweisen verbinden – und Massnahmen wählen, die beides lösen.

### 7. Ihre Rolle
Sie sorgen dafür, dass Stufe und Massnahmen in der AVOR bekannt und eingeplant sind, dass nur konforme Maschinen auf die Baustelle kommen (auch von Subunternehmern und Vermietern), und dass die Massnahmen bei Begehungen kontrolliert werden. Bei Beschwerden reagieren Sie sachlich und rasch – oft lässt sich mit wenig Aufwand viel verbessern.

§> USG (Vorsorge, Art. 11) sinngemäss; Arbeitnehmerschutz nach Suva-Vorgaben, in der App ohne Grenzwerte. Gesundheitliche Wirkungen allgemein nach BAFU und Suva.` },
      { id: 'm5-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm5-q03' },
      { id: 'm5-l1-abw', kind: 'decision', title: 'Abwägung: Staub über dem Spielplatz', questionId: 'm5-d01' },
      { id: 'm5-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Luftquellen eines Rückbaus', taskId: 'm5-t1' },
      { id: 'm5-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m5-q04', 'm5-q05'] },
      { id: 'm5-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm5-p1' },
      { id: 'm5-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Hauptschadstoffe: Feinstaub, Dieselruss, Stickoxide, VOC; für Mitarbeitende zusätzlich Quarzfeinstaub und Asbest.',
        'USG: vorsorglich an der Quelle begrenzen – unabhängig von Beschwerden.',
        'LRV: Partikelanforderungen für Baumaschinen mit Dieselmotor über 18 kW.',
        'BAFU-Richtlinie: Stufe A für alle Baustellen, Stufe B zusätzlich nach Grösse, Dauer, Lage.',
        'Viele Massnahmen schützen Nachbarn und Mitarbeitende zugleich.',
      ] },
      { id: 'm5-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'lrv', 'bafu-luft', 'suva-staub', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm5-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Staub an der Quelle begrenzen',
    topics: ['m5-staub'],
    objectives: [
      'Staubintensive Arbeiten erkennen',
      'Massnahmen an der Quelle, gegen Ausbreitung und bei Pisten und Schüttgut wählen',
      'Wassereinsatz gegen Staub mit dem Gewässerschutz vereinbaren',
    ],
    steps: [
      { id: 'm5-l2-situation', kind: 'situation', title: 'Einstieg: Die Trennscheibe', text: `Ein Arbeiter schneidet mit einer Trennscheibe Randsteine zu – trocken, ohne Absaugung. Eine weisse Wolke zieht über die Strasse. Der Polier meint: «Mit Wasser gibt es Schlamm auf der Strasse, das ist auch nicht besser.»

Hat er recht – und wie lässt sich beides vermeiden?` },
      { id: 'm5-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m5-q06', 'm5-q07'] },
      { id: 'm5-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Staubintensive Arbeiten**: Abbruch, Fräsen, Schneiden, Schleifen, Bohren, Sandstrahlen, Erdbau bei Trockenheit, Umschlag von Schüttgut, Brechen und Sieben, Befahren unbefestigter Pisten, Reinigen mit Besen oder Laubbläser.

**An der Quelle**: nasse Verfahren, Geräte mit Absaugung, staubarme Verfahren (z. B. Zange statt Hammer, Seilsäge statt Trennscheibe), geringe Abwurfhöhen.

**Gegen Ausbreitung**: Abdecken von Schüttgut, Staubschutznetze und -wände, Arbeiten bei starkem Wind unterbrechen oder anpassen.

**Pisten und Strassen**: befestigen, befeuchten, Geschwindigkeit begrenzen, Reifen reinigen, Strassen nass reinigen.

**Wasser mit Mass**: gezielt benetzen (Nebel statt Schwall), Abfluss nicht in Meteorschächte.` },
      { id: 'm5-l2-explain', kind: 'explain', title: 'Massnahmen nach Tätigkeit', text: `| Tätigkeit | Massnahmen an der Quelle | Gegen Ausbreitung |
|---|---|---|
| Abbruch, Rückbau | Benetzen (Wasser, Sprühnebel), Abbruchzange statt Abbauhammer, kleine Fallhöhen, Material vor dem Abwurf befeuchten | Staubschutzwände bzw. -netze zur empfindlichen Seite, Arbeiten bei Sturm anpassen |
| Schneiden, Schleifen, Bohren | Nassschnitt oder Absaugung an der Maschine | Abschirmung, Arbeitsort wählen |
| Fräsen von Belägen | Fräsen mit Wasserbedüsung bzw. Absaugung | Material sofort laden und abdecken |
| Erdbau | Befeuchten bei Trockenheit, offene Flächen klein halten, rasch begrünen | Windschutz, Arbeitsunterbruch bei Sturm |
| Schüttgut, Zwischenlager | Abdecken, befeuchten, geringe Abwurfhöhen | Lager windgeschützt anordnen |
| Brecher, Siebe | Bedüsung an Aufgabe und Austrag | Standort weg von empfindlichen Nutzungen |
| Pisten, Zufahrten | Befestigen (Asphalt, Recyclingmaterial), befeuchten, Tempo begrenzen | Reifenwaschanlage oder Reinigungsstrecke, Strassen nass reinigen |
| Reinigung | Nass wischen, Industriesauger mit Filter | Kein Laubbläser, kein trockenes Kehren |

### Wasser gegen Staub – und der Gewässerschutz
- **Dosiert benetzen**: Sprühnebel bindet Staub mit wenig Wasser; ein Schlauch im Vollstrahl erzeugt Schlamm.
- **Abfluss planen**: Wasser vom Abbruch oder Schneiden kann zementhaltig, trüb oder verschmutzt sein – es darf nicht in Meteorschächte oder Gewässer (Modul 2).
- **Nassschnitt**: Schlamm auffangen (Wanne, Saugen), nicht in den Schacht spülen.

§> Massnahmenkatalog sinngemäss nach der BAFU-Richtlinie «Luftreinhaltung auf Baustellen» (Stufen A und B); die genaue Zuordnung der Massnahmen zu den Stufen steht in der Richtlinie.` },
      { id: 'm5-l2-explain-2', kind: 'explain', title: 'Wetter, Wind und Kontrolle', text: `### Wetter vorausschauen
Trockenheit und Wind verstärken Staub. In der Wochenplanung lohnt ein Blick auf die Prognose: staubintensive Arbeiten (Abbruch an der Grundstücksgrenze, Erdbau neben Wohnhäusern) möglichst nicht bei starkem Wind in Richtung der Nachbarn. Wenn sie nicht verschiebbar sind, braucht es zusätzliche Massnahmen.

### Kontrolle auf der Baustelle
- **Sichtkontrolle**: Zieht eine Staubwolke über die Grundstücksgrenze? Liegen Staub oder Schlamm auf der Strasse?
- **Ursache suchen**: Fehlt das Wasser? Ist die Absaugung defekt? Wird zu hoch abgeworfen?
- **Sofort handeln**: Arbeit unterbrechen, bis die Massnahme wirkt – nicht weiterarbeiten «bis Feierabend».
- **Dokumentieren**: Massnahmen und Ausrüstung (z. B. Fotos von Bedüsung und Netzen) gehören zu den Nachweisen bei Stufe B.

### Beschwerden
Beschwerden über Staub sind häufig und oft berechtigt. Ernst nehmen, vor Ort anschauen, Ursache beheben, zurückmelden. Eine Ansprechperson mit Telefonnummer auf der Bautafel entschärft viele Konflikte.

§> Kontroll- und Nachweispflichten im Einzelfall gemäss Bewilligung bzw. Richtlinie (Stufe B).` },
      { id: 'm5-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Abbruch an der Grenze', context: 'Hochbau', text: `Ein zweigeschossiger Anbau wird abgebrochen, 3 m neben einem Mehrfamilienhaus. Die Unternehmung stellt eine 4 m hohe Staubschutzwand auf, setzt einen Sprühnebel-Kanon ein, der den Abbruchbereich benetzt, und bricht mit der Zange von oben nach unten ab. Abgeworfen wird direkt in die Mulde, die danach abgedeckt wird. Das Benetzungswasser versickert nicht im Garten des Nachbarn, sondern wird mit einer Schwelle auf der Baustelle gehalten.

**Lernpunkt**: Abschirmen, benetzen, Verfahren wählen – und das Wasser mitdenken.` },
      { id: 'm5-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Fräsen in der Innenstadt', context: 'Tiefbau', text: `Eine Belagssanierung in der Innenstadt verlangt Stufe B. Die Fräse arbeitet mit Wasserbedüsung, das Fräsgut wird direkt auf den Lastwagen geladen und abgedeckt. Eine Kehrmaschine mit Nassreinigung fährt hinter der Fräse. Die Lastwagen fahren über eine Reinigungsstrecke, bevor sie auf die Hauptstrasse einbiegen.

**Lernpunkt**: Bei Strassenarbeiten entsteht der meiste Staub nicht an der Maschine, sondern auf der Strasse danach – Reinigung gehört zum Verfahren.` },
      { id: 'm5-l2-deep', kind: 'deep', title: 'Fachvertiefung: Staubarm bauen', text: `### 1. Die Hierarchie der Massnahmen
Wie im Arbeitsschutz gilt: **Vermeiden** (staubarmes Verfahren) vor **Erfassen an der Quelle** (Absaugung, Nassverfahren) vor **Abschirmen** (Wände, Netze) vor **Schutz der Betroffenen** (Atemschutz, Fenster schliessen). Wer nur auf die letzte Stufe setzt, hat zu spät angefangen.

### 2. Staubarme Verfahren
- **Abbruchzange und Pulverisierer** statt Abbauhammer, wo statisch und technisch möglich.
- **Seil- und Wandsägen** mit Wasser statt Trennscheiben im Trockenschnitt.
- **Kernbohren nass** statt Schlagbohren.
- **Hochdruckwasserstrahlen** statt Sandstrahlen (Abwasser beachten).
- **Vorkonfektionierte Bauteile**, die nicht auf der Baustelle geschnitten werden müssen.
Die Wahl fällt in der AVOR – später ist sie oft nicht mehr möglich.

### 3. Benetzen richtig gemacht
Wasser bindet Staub, wenn es dort ist, wo der Staub entsteht: an der Abbruchkante, an der Schneidstelle, an der Aufgabe des Brechers. Sprühnebel (feine Tropfen) binden Feinstaub besser als grobe Strahlen und brauchen weniger Wasser. Bei Frost ist Benetzen schwierig – dann sind andere Massnahmen gefragt (Abschirmung, Verfahren, Zeitpunkt).

### 4. Pisten: die unterschätzte Quelle
Unbefestigte Pisten erzeugen bei Trockenheit grosse Mengen Staub, und Lastwagen tragen Schmutz auf öffentliche Strassen. Massnahmen in der Reihenfolge ihrer Wirkung: Pisten befestigen (Asphalt, gebundenes Recyclingmaterial), befeuchten, Tempo begrenzen, Reifen reinigen, Strassen nass reinigen. Für Bodenschutz-Pisten (Modul 4) gelten zusätzliche Anforderungen.

### 5. Reinigung ohne neue Wolken
Laubbläser und trockenes Kehren wirbeln Staub auf – genau das, was vermieden werden soll. Nass reinigen oder saugen (Industriesauger mit Feinstaubfilter); Kehrmaschinen mit Wasser. Das gilt auch für Innenräume und Gerüste.

### 6. Nachbarschaft
Staub ist die sichtbarste Belastung einer Baustelle und löst die meisten Reklamationen aus. Information vor Beginn (Dauer, staubintensive Phasen, Ansprechperson), rasches Reagieren und sichtbare Massnahmen schaffen Vertrauen. Wo Schäden geltend gemacht werden (verschmutzte Fassaden, Autos), werden die Fälle über die Bauleitung bzw. Versicherung abgewickelt; dokumentierte Massnahmen helfen.

### 7. Zusammenhang mit Arbeitsschutz
Bei Quarzfeinstaub reicht Staubbindung für die Nachbarn oft nicht für die Mitarbeitenden: Wer direkt an der Maschine steht, braucht Absaugung bzw. Nassverfahren **und** gegebenenfalls Atemschutz gemäss Suva. Umgekehrt helfen die Massnahmen des Arbeitsschutzes fast immer auch der Umgebung.

§> Massnahmen sinngemäss nach BAFU-Richtlinie Luft und Suva-Informationen zu Quarzstaub; keine Grenzwerte wiedergegeben.` },
      { id: 'm5-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm5-q08' },
      { id: 'm5-l2-abw', kind: 'decision', title: 'Abwägung: Benetzen und Abwasser', questionId: 'm5-d02' },
      { id: 'm5-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Staubkonzept für einen Abbruch', taskId: 'm5-t2' },
      { id: 'm5-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m5-q09', 'm5-q10'] },
      { id: 'm5-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm5-p2' },
      { id: 'm5-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Vermeiden vor Erfassen vor Abschirmen vor Schutz der Betroffenen.',
        'Nass oder abgesaugt schneiden, schleifen, fräsen; Zange statt Hammer, wo möglich.',
        'Pisten befestigen, befeuchten, Tempo begrenzen, Strassen nass reinigen.',
        'Benetzen dosiert – Abwasser nicht in Meteorschächte.',
        'Bei Wind vorausschauend planen; Beschwerden rasch und sachlich behandeln.',
      ] },
      { id: 'm5-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-luft', 'lrv', 'suva-staub', 'gschg', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm5-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Baumaschinen: Partikelfilter, Nachweise, Betrieb',
    topics: ['m5-maschinen'],
    objectives: [
      'Die Partikelanforderungen an Baumaschinen einordnen',
      'Nachweise prüfen – auch bei Mietmaschinen und Subunternehmern',
      'Den Betrieb so organisieren, dass Abgase vermieden werden',
    ],
    steps: [
      { id: 'm5-l3-situation', kind: 'situation', title: 'Einstieg: Der Mietbagger', text: `Ein Subunternehmer bringt für drei Wochen einen gemieteten Raupenbagger auf Ihre Baustelle (Stufe B). Bei der Begehung fällt Ihnen auf: Am Auspuff gibt es keinen sichtbaren Filter, ein Kleber oder Ausweis ist nicht zu finden. Der Maschinist sagt: «Der ist neu, der braucht das nicht.»

Stimmt das – und was tun Sie?` },
      { id: 'm5-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m5-q11', 'm5-q12'] },
      { id: 'm5-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Baumaschinen mit Dieselmotor** und mehr als 18 kW Leistung müssen die **Partikelanforderungen der LRV** erfüllen. In der Praxis heisst das: ein wirksames Partikelfiltersystem oder ein Motor, der die Anforderungen nachweislich erfüllt; für ältere Maschinen gelten Übergangsregeln nach Baujahr.

**Massgebend ist der Nachweis**, nicht das Aussehen: Typenprüfung bzw. Konformität, Filternachweis, Wartung – je nach Maschine. Ein sichtbarer Filter allein beweist nichts, und ein fehlender sichtbarer Filter beweist nicht das Gegenteil.

**Die Unternehmung** ist verantwortlich, dass nur konforme Maschinen eingesetzt werden – auch Mietmaschinen und solche von Subunternehmern.

**Betrieb**: Motoren abstellen statt laufen lassen, Maschinen warten, richtig dimensionieren, Leerlauf und unnötige Fahrten vermeiden.` },
      { id: 'm5-l3-explain', kind: 'explain', title: 'Partikelanforderungen und Nachweise', text: `### Was gilt (Grundsatz)
- **Geltungsbereich**: Baumaschinen mit Dieselmotor (Selbstzündung) und mehr als 18 kW, die auf Baustellen eingesetzt werden. Ob die Schwelle «über» oder «ab» 18 kW lautet, ist in den verfügbaren Quellen uneinheitlich – Wortlaut der LRV prüfen.
- **Anforderung**: Partikelanzahl bzw. -masse gemäss LRV Anhang 4 Ziff. 3; in der Praxis erfüllt durch geschlossene Partikelfiltersysteme oder Motoren, deren Typengenehmigung die Anforderungen abdeckt.
- **Übergangsregeln**: Für ältere Maschinen gelten Regeln nach Baujahr bzw. Inverkehrbringen; die App nennt die Jahrgänge nicht.
- **Wartung**: Partikelfiltersysteme und Motoren müssen gewartet werden; die LRV und die Vollzugsunterlagen der Kantone regeln Nachweise (z. B. Wartungsdokument, Kennzeichnung) – Details im Original.

### Was Sie prüfen
1. **Liste**: Welche Maschinen über der Leistungsgrenze sind auf der Baustelle? (eigene, gemietete, Subunternehmer)
2. **Nachweis je Maschine**: Konformität bzw. Filternachweis und gültige Wartung gemäss den kantonalen Vollzugsunterlagen.
3. **Sichtprüfung**: Filter vorhanden und unbeschädigt (falls vorgesehen)? Schwarzer Rauch beim Gasgeben ist ein Warnzeichen.
4. **Fehlt der Nachweis**: Maschine nicht einsetzen, bis er vorliegt – oder ersetzen.

### Andere Maschinen und Geräte
Auch Stromaggregate, Kompressoren, Pumpen und Kleingeräte erzeugen Abgase. Für Kleingeräte mit Benzinmotor ist **Alkylatbenzin** eine einfache Verbesserung (weniger Schadstoffe für den Bediener). Wo Netzstrom verfügbar ist, sind elektrische Geräte und Maschinen die beste Lösung.

§> Art. 19a LRV mit Anhang 4 Ziff. 3 sinngemäss (über BAFU- und kantonale Unterlagen bestätigt, nicht am Fedlex-Text geprüft). Nachweisformen und Wartungspflichten im Einzelnen gemäss LRV und kantonalem Vollzug – in der App nicht wiedergegeben.` },
      { id: 'm5-l3-explain-2', kind: 'explain', title: 'Betrieb: Abgase vermeiden', text: `### Organisatorische Massnahmen
- **Motor aus** bei Wartezeiten (Lastwagen beim Abladen, Bagger in der Pause, Aggregate über Nacht).
- **Maschinen richtig dimensionieren**: Eine zu grosse Maschine im Teillastbetrieb verbraucht mehr und filtert schlechter (Regeneration).
- **Wartung** nach Herstellerangaben: Luftfilter, Einspritzung, Filtersysteme. Ein verstopfter oder beschädigter Filter verliert seine Wirkung.
- **Fahrwege kurz**, Fahrten bündeln (Lektion 4).
- **Elektrische Alternativen** prüfen: Kran, Pumpen, Kompressoren, kleine Bagger und Rüttler gibt es elektrisch; Baustrom früh einplanen.

### Geschlossene Räume
In Tiefgaragen, Tunneln, Hallen und Untergeschossen reichern sich Abgase an. Hier stehen die Mitarbeitenden im Zentrum: Lüftung, elektrische Geräte, Gasmessung nach Suva-Vorgaben. Benzin- und Dieselgeräte ohne Absaugung gehören nicht in geschlossene Räume.

### Subunternehmer und Mietmaschinen
Was auf Ihrer Baustelle fährt, liegt in Ihrer Verantwortung. Deshalb gehören die Anforderungen in den Subunternehmervertrag und in die Mietbestellung (Modul 8), und die Maschinenliste mit Nachweisen wird **vor** dem ersten Einsatz geprüft – nicht erst bei der Behördenkontrolle.

§> Arbeitnehmerschutz in geschlossenen Räumen nach Suva-Vorgaben (ohne Grenzwerte).` },
      { id: 'm5-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die Maschinenliste vor dem Start', context: 'Hochbau', text: `Für einen Wohnbau mit Stufe B verlangt die Bauleitung vor Baubeginn eine Maschinenliste. Die Umweltbeauftragte sammelt die Angaben für eigene Maschinen, Mietgeräte und drei Subunternehmer: Typ, Leistung, Baujahr, Nachweis. Für einen Kompressor des Bohrunternehmers fehlt der Nachweis. Er wird durch ein elektrisches Gerät ersetzt, weil Baustrom vorhanden ist.

**Lernpunkt**: Die Liste vor dem Start erspart Diskussionen auf der Baustelle – und öffnet den Blick für elektrische Alternativen.` },
      { id: 'm5-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die Kontrolle am Montag', context: 'Tiefbau', text: `Bei einer kantonalen Kontrolle auf einer Strassenbaustelle werden vier Maschinen geprüft. Bei einer Walze eines Subunternehmers fehlt der gültige Wartungsnachweis. Die Behörde verfügt, dass die Walze bis zum Nachweis nicht eingesetzt werden darf. Der Belagseinbau verzögert sich um einen Tag. Die Unternehmung nimmt die Prüfung der Maschinennachweise in die Startinstruktion für Subunternehmer auf.

**Lernpunkt**: Fehlende Nachweise kosten Zeit – vorher prüfen ist günstiger.` },
      { id: 'm5-l3-deep', kind: 'deep', title: 'Fachvertiefung: Saubere Maschinen als Standard', text: `### 1. Warum Partikelfilter
Dieselruss besteht aus sehr feinen Partikeln, die in die Lunge eindringen und als krebserregend gelten. Moderne geschlossene Partikelfiltersysteme halten den grössten Teil davon zurück. Deshalb hat die Schweiz für Baumaschinen früh Partikelanforderungen eingeführt, die in der Praxis Filter bzw. entsprechend ausgerüstete Motoren bedingen.

### 2. Nachweis statt Augenschein
Ob eine Maschine die Anforderungen erfüllt, sieht man ihr nicht zuverlässig an: Filter können im Motorraum verbaut sein, und ein sichtbares Rohr kann defekt oder ausgeräumt sein. Massgebend sind die Nachweise, die der Vollzug verlangt. Bauen Sie sich eine einfache Routine auf: Liste – Nachweis – Sichtprüfung – Freigabe.

### 3. Verantwortung entlang der Kette
- **Hersteller und Händler**: bringen Maschinen und Filtersysteme in Verkehr, die den Anforderungen genügen.
- **Halter** (Eigentümer, Vermieter): sorgen für Nachweis und Wartung.
- **Unternehmung auf der Baustelle**: setzt nur konforme Maschinen ein und kann das belegen.
- **Behörde**: kontrolliert und kann den Einsatz untersagen.
Für die Unternehmung heisst das: Mietverträge und Subunternehmerverträge müssen die Anforderungen enthalten, und die Prüfung erfolgt vor dem Einsatz.

### 4. Wartung und Regeneration
Partikelfilter müssen regelmässig regenerieren (Russ verbrennen). Maschinen, die lange im Leerlauf oder in Teillast laufen, regenerieren schlecht; der Filter verstopft. Instruieren Sie Maschinisten zu Warnanzeigen und Wartung, und planen Sie Einsätze so, dass Maschinen sinnvoll ausgelastet sind.

### 5. Elektrifizierung
Elektrische Baumaschinen und -geräte werden häufiger: Turmdrehkrane, Pumpen, Kompressoren, Minibagger, Rüttler, Hebebühnen. Sie vermeiden Abgase und Lärm vor Ort. Voraussetzung ist ein frühzeitig geplanter Baustromanschluss mit ausreichender Leistung. In der Ausschreibung können elektrische Maschinen ein Zuschlagskriterium sein (Modul 8).

### 6. Kleingeräte
Trennscheiben, Rüttler, Stampfer und Motorsägen mit Benzinmotor stossen viele Schadstoffe direkt in Atemhöhe aus. Alkylatbenzin reduziert das deutlich; elektrische bzw. Akkugeräte vermeiden es.

### 7. Kontrolle und Dokumentation
Bei Stufe B verlangt die Bewilligung oft eine Maschinenliste mit Nachweisen. Auch wo das nicht verlangt ist, ist die Liste ein einfaches Instrument der Eigenkontrolle. Sie gehört in die Baustellenablage und wird bei neuen Maschinen nachgeführt.

### 8. Typische Fehler
- Nur eigene Maschinen geprüft, Mietgeräte und Subunternehmer vergessen.
- Nachweis «ist im Büro» – auf der Baustelle nicht verfügbar.
- Aggregate laufen über Nacht für eine Pumpe, die elektrisch betrieben werden könnte.
- Filter-Warnanzeige ignoriert.

§> Rollen und Nachweise sinngemäss; massgebend sind LRV und kantonaler Vollzug (Nachweisformen, Wartung, Kennzeichnung). Keine Baujahrgrenzen oder Fristen wiedergegeben.` },
      { id: 'm5-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm5-q13' },
      { id: 'm5-l3-abw', kind: 'decision', title: 'Abwägung: Mietbagger ohne Nachweis', questionId: 'm5-d03' },
      { id: 'm5-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Maschinenliste prüfen', taskId: 'm5-t3' },
      { id: 'm5-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m5-q14', 'm5-q15'] },
      { id: 'm5-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm5-p3' },
      { id: 'm5-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Baumaschinen mit Dieselmotor über 18 kW: Partikelanforderungen der LRV (Übergangsregeln nach Baujahr).',
        'Nachweis zählt, nicht Augenschein – Liste, Nachweis, Sichtprüfung, Freigabe.',
        'Auch Mietmaschinen und Subunternehmer: Anforderungen vertraglich, Prüfung vor dem Einsatz.',
        'Motor aus, richtig dimensionieren, warten; elektrische Alternativen prüfen.',
        'Geschlossene Räume: Mitarbeiterschutz nach Suva im Zentrum.',
      ] },
      { id: 'm5-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['lrv', 'bafu-luft', 'suva-staub', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm5-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Transporte, Rückbau, Erdbau und Aufbereitung',
    topics: ['m5-transporte'],
    objectives: [
      'Die Luftbelastung durch Bautransporte einschätzen und senken',
      'Luftmassnahmen für Rückbau, Erdbau und mobile Aufbereitung planen',
      'Offenes Verbrennen und Geruchsquellen vermeiden',
    ],
    steps: [
      { id: 'm5-l4-situation', kind: 'situation', title: 'Einstieg: Der Brecher im Quartier', text: `Für einen Strassenneubau soll ein mobiler Brecher Abbruchbeton direkt vor Ort aufbereiten. Das spart über tausend Lastwagenfahrten. Die nächsten Wohnhäuser stehen 80 m entfernt. Der Projektleiter ist begeistert, die Gemeinde skeptisch.

Wie beurteilen Sie das aus Sicht der Luftreinhaltung?` },
      { id: 'm5-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m5-q16', 'm5-q17'] },
      { id: 'm5-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Bautransporte** verursachen Abgase, Staub (aufgewirbelt und verschleppt) und CO₂. Am wirksamsten: **Fahrten vermeiden** (Material vor Ort verwerten, volle Fahrten, Rückfrachten), **saubere Fahrzeuge** einsetzen, **Leerlauf vermeiden**, Strassen sauber halten.

**Rückbau und Erdbau** sind staubintensiv: benetzen, abschirmen, Abwurfhöhen klein, Material abdecken.

**Mobile Aufbereitung** (Brecher, Siebe) spart Fahrten, erzeugt aber Staub und Lärm vor Ort: Standort, Bedüsung, Betriebszeiten – und je nach Kanton Melde- oder Bewilligungspflicht.

**Offenes Verbrennen** von Abfällen auf Baustellen ist verboten.

**Gerüche** (Bitumen, Lösungsmittel) belästigen Anwohnende: Verfahren und Zeitpunkt wählen, Information.` },
      { id: 'm5-l4-explain', kind: 'explain', title: 'Transporte und Aufbereitung', text: `### Transporte

| Hebel | Beispiele |
|---|---|
| Fahrten vermeiden | Aushub vor Ort wieder einbauen, Recycling vor Ort, Massenbilanz (Modul 8) |
| Fahrten bündeln | Volle Ladungen, Rückfrachten, Anlieferungen koordinieren |
| Verkehrsmittel | Bahn bei grossen Mengen und Anschlussgleis prüfen |
| Fahrzeuge | Moderne Abgasnormen, in der Ausschreibung verlangt bzw. bewertet |
| Betrieb | Motor aus beim Warten und Abladen, Wartezonen auf dem Areal |
| Sauberkeit | Reifenreinigung, Strassenreinigung nass, Ladung abdecken |

### Mobile Aufbereitungsanlagen
- **Vorteil**: Fahrten und Primärmaterial werden eingespart (Modul 3, Kreislaufwirtschaft).
- **Belastung vor Ort**: Staub an Aufgabe, Brechraum und Austrag; Lärm; Dieselabgase des Antriebs.
- **Massnahmen**: Bedüsung an Aufgabe und Austrag, Standort weg von Wohnhäusern und windabgewandt, Halden abdecken bzw. befeuchten, Betriebszeiten begrenzen, Maschinen mit Partikelfilter bzw. elektrisch.
- **Verfahren**: Ob eine Meldung, eine Bewilligung oder eine Zustimmung der Behörde nötig ist, hängt vom Kanton, vom Standort und von der Anlage ab – frühzeitig über die Bauherrschaft klären.

### Offenes Verbrennen
Abfälle dürfen auf Baustellen nicht offen verbrannt werden – weder Verpackungen noch Holzreste, Kabel oder Kunststoffe. Ausnahmen für natürliche Wald-, Feld- und Gartenabfälle regeln Bund und Kantone eng; auf Baustellen sind sie praktisch nie gegeben.

§> Verbot der Abfallverbrennung ausserhalb von Anlagen sinngemäss nach USG (Art. 30c Abs. 2) bzw. LRV; Artikel nicht am Original geprüft. Verfahren für mobile Anlagen kantonal.` },
      { id: 'm5-l4-explain-2', kind: 'explain', title: 'Rückbau, Erdbau, Gerüche', text: `### Rückbau
- **Schadstoffe zuerst** (Modul 3): Asbest, PCB, PAK werden vor dem Rückbau durch Fachfirmen entfernt – unter eigenen Schutzmassnahmen.
- **Staub beim Abbruch**: Benetzen, Abbruchzange, von oben nach unten, kleine Abwurfhöhen, Staubschutzwände zur empfindlichen Seite.
- **Innenrückbau**: Schuttrutschen geschlossen, Container abgedeckt, Absaugung bei Schleifarbeiten.

### Erdbau
- Offene Flächen klein halten und rasch begrünen bzw. abdecken.
- Bei Trockenheit befeuchten; bei Sturm staubintensive Arbeiten anpassen.
- Depots und Halden abdecken oder begrünen (auch Bodenschutz, Modul 4).

### Gerüche
Bitumenarbeiten, Abdichtungen, Lösungsmittel und manche Bauchemikalien riechen stark. Gerüche sind zwar oft nicht gesundheitsschädlich, aber lästig – und das USG schützt auch vor lästigen Einwirkungen.
- Produkte mit weniger Lösungsmittel wählen (Modul 7).
- Heissbitumen: Temperatur nicht höher als nötig, Kocher mit Deckel.
- Zeitpunkt: geruchsintensive Arbeiten nicht direkt vor offenen Fenstern von Schulen oder Spitälern, Information vorab.

§> Lästige Einwirkungen sinngemäss nach USG (Art. 11 Abs. 3, Modul 1). Schutzmassnahmen beim Rückbau schadstoffhaltiger Bauteile nach Suva und EKAS (Modul 3).` },
      { id: 'm5-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Innenrückbau eines Bürogebäudes', context: 'Hochbau', text: `Für den Innenrückbau eines Bürogebäudes, das teilweise in Betrieb bleibt, legt die AVOR fest: geschlossene Schuttrutsche in eine abgedeckte Mulde, Industriesauger statt Besen, Abschottung der Geschosse mit Folie und Unterdruck in den Bereichen, wo geschliffen wird. Die Mulde steht auf der Hofseite, nicht unter den Fenstern der Büros. Die Mieter erhalten einen Wochenplan der staubintensiven Arbeiten.

**Lernpunkt**: Bei Rückbau im bewohnten oder genutzten Gebäude entscheiden Abschottung und Reinigung, ob das Projekt ohne Konflikte läuft.` },
      { id: 'm5-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Brecher mit Auflagen', context: 'Tiefbau', text: `Im Fall aus dem Einstieg klärt die Bauherrschaft mit dem Kanton die Voraussetzungen. Ergebnis: Der Brecher darf an einem Standort 200 m von den Wohnhäusern arbeiten, mit Bedüsung, elektrischem Antrieb über Baustrom, Betriebszeiten 7–12 und 13–17 Uhr, abgedeckten Halden und einer Kontrolle durch die Bauleitung. Die Gemeinde informiert die Anwohnenden. Statt 1 200 Fahrten durch das Quartier gibt es 300.

**Lernpunkt**: Eine gute Idee wird mit sauberer Planung und den richtigen Auflagen umsetzbar – Fahrten sparen und Belastung vor Ort begrenzen gehen zusammen.` },
      { id: 'm5-l4-deep', kind: 'deep', title: 'Fachvertiefung: Luft und Logistik', text: `### 1. Transporte als grösste Quelle
Auf vielen Baustellen verursachen die Transporte zu und von der Baustelle mehr Abgase und aufgewirbelten Staub als die Maschinen vor Ort. Gleichzeitig ist ihr Einfluss auf die Nachbarschaft gross: Lärm, Staub, Schmutz auf Strassen, Verkehr. Luftreinhaltung beginnt deshalb bei der Massenbilanz und der Transportplanung in der AVOR (Modul 8).

### 2. Verwertung vor Ort – mit Augenmass
Aufbereitung vor Ort spart Fahrten, Kies und CO₂, verlagert aber Belastung in die Nachbarschaft. Die richtige Entscheidung entsteht aus dem Vergleich: Wie viele Fahrten werden eingespart, durch welche Quartiere wären sie gefahren? Wie nah sind empfindliche Nutzungen am Standort der Anlage? Lassen sich Staub und Lärm vor Ort beherrschen? Diese Abwägung gehört in die Entscheidungsvorlage – nicht ins Bauchgefühl.

### 3. Fahrzeuge
Für Lastwagen gelten die Abgasnormen der Typengenehmigung; neuere Fahrzeuge stossen deutlich weniger Schadstoffe aus. Öffentliche Bauherrschaften bewerten in Ausschreibungen zunehmend Fahrzeugnormen, alternative Antriebe oder Transportkonzepte (Modul 8). Was angeboten wird, wird Vertragsbestandteil und muss nachgewiesen werden.

### 4. Leerlauf
Laufende Motoren beim Warten, beim Abladen oder in der Pause sind eine vermeidbare Quelle. Eine klare Regel («Motor aus, wenn länger als kurz gewartet wird») und Wartezonen auf dem Areal statt im Quartier helfen. Bei Kälte laufen Motoren oft zum Heizen – dann helfen Pausenräume.

### 5. Schmutz auf öffentlichen Strassen
Erde und Schlamm, die von Lastwagen auf öffentliche Strassen getragen werden, trocknen und werden zu Staub; sie sind auch eine Unfallgefahr. Reifenwaschanlagen oder Reinigungsstrecken, befestigte Ausfahrten und regelmässige Nassreinigung gehören zur Grundausstattung grösserer Erdbaustellen. Gemeinden verlangen oft, dass die Strasse täglich gereinigt wird.

### 6. Offenes Verbrennen – kein Kavaliersdelikt
Das Verbrennen von Verpackungen, Holzresten oder Kabeln auf der Baustelle setzt Russ, Dioxine und andere Schadstoffe frei. Es ist verboten und wird gebüsst. Die Lösung ist eine funktionierende Abfalltrennung (Modul 3), nicht das Feuer im Fass.

### 7. Gerüche und Information
Viele Klagen betreffen Gerüche (Bitumen, Farben, Abgase). Wer vor geruchsintensiven Arbeiten informiert (wann, wie lange, warum), verhindert viele Beschwerden. Bei Schulen, Spitälern und Altersheimen lohnt eine direkte Absprache über Zeitfenster.

### 8. Rückbau und Schadstoffe
Bei Rückbauten mit Bauschadstoffen (Asbest, PCB, PAK) stehen der Schutz der Mitarbeitenden und die korrekte Entsorgung im Vordergrund (Modul 3). Für die Luft heisst das: Schadstoffsanierung abgeschlossen und freigegeben, bevor staubintensiver Rückbau beginnt – sonst werden Fasern und belasteter Staub in die Umgebung getragen.

§> Sinngemäss nach USG, LRV und BAFU-Richtlinie; Abgasnormen für Fahrzeuge allgemein. Verfahren für mobile Anlagen und Vorgaben zur Strassenreinigung kantonal bzw. kommunal.` },
      { id: 'm5-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm5-q18' },
      { id: 'm5-l4-abw', kind: 'decision', title: 'Abwägung: Brecher vor Ort?', questionId: 'm5-d04' },
      { id: 'm5-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Transportkonzept einer Grossbaustelle', taskId: 'm5-t4' },
      { id: 'm5-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m5-q19', 'm5-q20'] },
      { id: 'm5-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm5-p4' },
      { id: 'm5-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem Lastwagenchauffeur (Feynman-Methode)', feynmanId: 'm5-f1' },
      { id: 'm5-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Transporte: vermeiden, bündeln, saubere Fahrzeuge, Motor aus, Strassen sauber.',
        'Mobile Aufbereitung spart Fahrten, braucht aber Standort, Bedüsung, Zeiten – und je nach Kanton ein Verfahren.',
        'Rückbau und Erdbau: benetzen, abschirmen, abdecken; Schadstoffsanierung vorher abgeschlossen.',
        'Offenes Verbrennen auf Baustellen ist verboten.',
        'Gerüche sind lästige Einwirkungen: Verfahren, Zeitpunkt, Information.',
      ] },
      { id: 'm5-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'lrv', 'bafu-luft', 'vvea', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm5-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Massnahmenstufen planen, umsetzen und kontrollieren',
    topics: ['m5-planung'],
    objectives: [
      'Die angeordnete Massnahmenstufe in Ausschreibung, AVOR und Ausführung übersetzen',
      'Ein einfaches Luftkonzept für eine Baustelle erstellen',
      'Die Umsetzung kontrollieren, dokumentieren und bei Beschwerden richtig reagieren',
    ],
    steps: [
      { id: 'm5-l5-situation', kind: 'situation', title: 'Einstieg: «Stufe B – und jetzt?»', text: `In der Baubewilligung für einen Schulhausneubau steht ein Satz: «Es gilt Massnahmenstufe B gemäss BAFU-Richtlinie Luftreinhaltung auf Baustellen.» Mehr nicht. Der Bauführer fragt Sie: «Was heisst das konkret für uns – und was kostet es?»

Wie gehen Sie vor?` },
      { id: 'm5-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m5-q21', 'm5-q22'] },
      { id: 'm5-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Die Stufe** wird im Bewilligungsverfahren angeordnet; die **Massnahmen** stehen in der BAFU-Richtlinie (und in kantonalen Vollzugshilfen). Die Bewilligung macht sie verbindlich.

**Übersetzen in die Baustelle**: Für jede Bauphase festlegen, welche Massnahmen gelten, wer sie umsetzt, womit und wie es kontrolliert wird – im **Umweltmassnahmenplan** (Modul 8).

**Kosten**: Massnahmen gehören in Ausschreibung und Offerte. Fehlen sie, gilt die Auflage trotzdem (Modul 8, Nachtragsrecht).

**Kontrolle**: Eigenkontrolle auf der Baustelle, Begehungen, Maschinenliste; bei Stufe B oft mit Nachweisen für die Behörde.

**Beschwerden**: ernst nehmen, anschauen, Ursache beheben, zurückmelden, dokumentieren.` },
      { id: 'm5-l5-explain', kind: 'explain', title: 'Vom Satz in der Bewilligung zum Luftkonzept', text: `### Vorgehen
1. **Richtlinie und kantonale Unterlagen** zur angeordneten Stufe beschaffen (Massnahmenkatalog).
2. **Bauphasen** durchgehen: Rückbau, Baugrube und Erdbau, Rohbau, Ausbau, Umgebung.
3. **Massnahmen je Phase** auswählen, die auf die Tätigkeiten passen (Lektionen 2–4).
4. **Maschinenliste** mit Nachweisen (Lektion 3).
5. **Transport- und Zufahrtskonzept** (Lektion 4).
6. **Verantwortung, Kontrolle, Nachweis** festlegen und in den Massnahmenplan übernehmen.
7. **Kosten** abschätzen und mit Ausschreibung und Vertrag abgleichen.

### Beispiel eines Luftkonzepts (Ausschnitt)

| Phase | Tätigkeit | Massnahme | Verantwortlich | Kontrolle / Nachweis |
|---|---|---|---|---|
| Rückbau | Abbruch Altbau | Sprühnebel, Zange, Staubschutzwand zur Schule, Abwurf in abgedeckte Mulde | Polier/in | täglich Sichtkontrolle; Fotos |
| Baugrube | Aushub, Transporte | Piste befestigt, Reifenreinigung, Strasse nass reinigen, Tempo 20 | Polier/in | Rapport; Kontrolle Strasse |
| Rohbau | Maschinen | Nur Maschinen mit Nachweis; Kran elektrisch | Bauführer/in | Maschinenliste vor Einsatz |
| Ausbau | Schleifen, Schneiden | Nassschnitt, Absaugung, Industriesauger | Subunternehmer | Begehung |
| Umgebung | Erdarbeiten | Befeuchten bei Trockenheit, rasch begrünen | Polier/in | Begehung |

§> Massnahmenkatalog nach der BAFU-Richtlinie (in der App nicht vollständig wiedergegeben). Verbindlich wird die Stufe durch die Bewilligung.` },
      { id: 'm5-l5-explain-2', kind: 'explain', title: 'Kontrolle, Nachweise, Beschwerden', text: `### Eigenkontrolle
- **Täglich** (Polier): Staubwolken über die Grenze? Strasse sauber? Wasser für Benetzung vorhanden? Motoren aus bei Wartezeit?
- **Bei Begehungen** (Bauführung, Umweltfachperson): Massnahmen je Phase vorhanden, angewendet, wirksam (Modul 9); Maschinenliste aktuell.
- **Bei neuen Maschinen und Subunternehmern**: Nachweis vor dem ersten Einsatz.

### Nachweise
Maschinenliste mit Nachweisen, Fotos der Massnahmen, Begehungsberichte, Beschwerdeprotokoll. Bei Stufe B verlangt die Bewilligung oft eine Dokumentation, die die Behörde einsehen kann.

### Behördenkontrolle
Kantone und Gemeinden kontrollieren Baustellen und Maschinen, oft unangemeldet. Fehlen Nachweise, kann der Einsatz einer Maschine untersagt werden. Verhalten: Leitfaden aus Modul 1 (Zutritt, Verantwortliche holen, sachlich Auskunft geben, Mängel beheben).

### Beschwerden
1. **Aufnehmen**: Wer, wann, was genau (Staub, Geruch, Abgase), wo?
2. **Anschauen**: Möglichst rasch vor Ort, Ursache suchen.
3. **Handeln**: Massnahme verstärken oder anpassen.
4. **Zurückmelden**: Der beschwerdeführenden Person sagen, was getan wurde.
5. **Dokumentieren**: Beschwerde, Befund, Massnahme.
Beschwerden sind wertvolle Hinweise – sie zeigen, wo die Massnahmen nicht reichen.

§> Kontrollbefugnisse der Behörden sinngemäss (USG); Nachweisanforderungen gemäss Bewilligung und kantonalem Vollzug.` },
      { id: 'm5-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Stufe B beim Schulhaus', context: 'Hochbau', text: `Im Fall aus dem Einstieg erstellt die Umweltbeauftragte ein zweiseitiges Luftkonzept nach Bauphasen und stellt fest: Staubschutzwand und Reifenreinigung fehlen im Leistungsverzeichnis. Sie meldet es der Bauleitung (Modul 8), stellt das Konzept an der Startsitzung vor und vereinbart mit der Schulleitung, dass staubintensive Abbrucharbeiten an der Schulseite in den Herbstferien stattfinden. Die Maschinenliste wird vor dem ersten Einsatz geprüft.

**Lernpunkt**: Ein Satz in der Bewilligung wird erst durch das Konzept zur Arbeitsanweisung.` },
      { id: 'm5-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Beschwerde über Abgase', context: 'Tiefbau', text: `Während einer Leitungssanierung beschwert sich eine Anwohnerin, dass jeden Morgen um 6.45 Uhr Lastwagen mit laufendem Motor vor ihrem Fenster warten. Der Umweltbeauftragte schaut am nächsten Morgen nach: Die Lastwagen warten, bis das Tor um 7 Uhr öffnet. Massnahme: Wartezone auf dem Areal, Tor um 6.45 Uhr geöffnet, Regel «Motor aus» an der Einfahrt. Er ruft die Anwohnerin zurück und erklärt die Änderung.

**Lernpunkt**: Viele Beschwerden haben einfache Ursachen – wer hinschaut und zurückmeldet, löst sie.` },
      { id: 'm5-l5-deep', kind: 'deep', title: 'Fachvertiefung: Luftreinhaltung im Projektablauf', text: `### 1. Früh einplanen
Die wirksamsten Entscheidungen für die Luft fallen in Planung und AVOR: Verfahren (Zange statt Hammer, Nassschnitt), Maschinen (Filter, elektrisch), Logistik (Verwertung vor Ort, Pisten, Zufahrt), Installation (Lage der Mulden, Brecher, Wartezonen). Was dort nicht eingeplant ist, wird auf der Baustelle teuer oder gar nicht umgesetzt.

### 2. Ausschreibung und Vertrag
Massnahmen der angeordneten Stufe gehören ins Leistungsverzeichnis: Benetzungsanlagen, Staubschutzwände, Reifenreinigung, Strassenreinigung, Maschinenanforderungen. Fehlen sie, gilt die Auflage trotzdem; die Kostenfrage richtet sich nach dem Vertrag (Modul 8). Für Subunternehmer und Mietmaschinen werden die Anforderungen weitergegeben.

### 3. Wirksamkeit statt Ausrüstung
Eine Benetzungsanlage, die nicht läuft, eine Staubschutzwand mit Lücken, eine Reifenreinigung, die umfahren wird – Massnahmen wirken nur, wenn sie angewendet werden. Bei Begehungen gilt die Frage aus Modul 9: vorhanden, angewendet, wirksam? Die einfachste Wirksamkeitsprüfung ist der Blick über die Grundstücksgrenze und auf die Strasse.

### 4. Messungen
Bei grossen Baustellen in empfindlicher Lage kann die Bewilligung Staubmessungen verlangen (z. B. Staubniederschlag). Solche Messungen werden von Fachstellen nach festgelegten Verfahren durchgeführt; Ergebnisse dienen der Kontrolle der Massnahmen. Eigene Schätzungen ersetzen sie nicht.

### 5. Zusammenarbeit
- **Bauleitung**: Massnahmen und Kosten klären, Kontrolle.
- **UBB**: bei grossen Projekten Begleitung und Bericht an die Behörde (Modul 9).
- **Nachbarn und sensible Nutzungen**: Information, Zeitfenster, Ansprechperson.
- **Behörde**: bei Unklarheiten über Massnahmen früh fragen (über die Bauherrschaft).

### 6. Typische Lücken
- Stufe in der Bewilligung, aber keine Massnahmen im LV.
- Maschinenliste nur für eigene Maschinen.
- Reifenreinigung vorhanden, aber nicht benutzt.
- Benetzung im Sommer, aber nicht im windigen Herbst.
- Keine Ansprechperson für Anwohnende.

### 7. Wirtschaftlichkeit
Luftmassnahmen kosten – aber oft weniger als gedacht, und sie sparen anderswo: weniger Reinigung von Nachbarfassaden und Autos, weniger Konflikte und Verzögerungen, bessere Arbeitsbedingungen. Elektrische Geräte und Verwertung vor Ort sparen zudem Treibstoff und Transporte. Diese Argumente gehören in die Entscheidungsvorlage (Modul 8 und 12).

### 8. Ihre Rolle
Sie übersetzen die Stufe in ein Konzept, sorgen dafür, dass es in Vertrag und AVOR ankommt, prüfen die Maschinen, kontrollieren stichprobenweise und helfen bei Beschwerden. Die Umsetzung bleibt in der Linie; die Verantwortung für die Auflage bei der Bauherrschaft und – vertraglich – bei der Unternehmung.

§> Sinngemäss nach BAFU-Richtlinie Luft und kantonalem Vollzug; Messverfahren und Beurteilungswerte nicht wiedergegeben.` },
      { id: 'm5-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm5-q23' },
      { id: 'm5-l5-abw', kind: 'decision', title: 'Abwägung: Massnahmen fehlen im LV', questionId: 'm5-d05' },
      { id: 'm5-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Luftkonzept für ein Schulhaus', taskId: 'm5-t5' },
      { id: 'm5-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m5-q24', 'm5-q25'] },
      { id: 'm5-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm5-p5' },
      { id: 'm5-l5-feynman', kind: 'feynman', title: 'Erklären Sie es dem Bauherrn (Feynman-Methode)', feynmanId: 'm5-f2' },
      { id: 'm5-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Stufe aus der Bewilligung + Massnahmenkatalog der Richtlinie = verbindliche Pflichten.',
        'Luftkonzept nach Bauphasen: Massnahme, Verantwortung, Kontrolle, Nachweis – im Massnahmenplan.',
        'Massnahmen in LV und Subunternehmerverträgen; fehlende Positionen ändern die Pflicht nicht.',
        'Kontrolle: vorhanden, angewendet, wirksam – Blick über die Grenze und auf die Strasse.',
        'Beschwerden: aufnehmen, anschauen, handeln, zurückmelden, dokumentieren.',
      ] },
      { id: 'm5-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-luft', 'lrv', 'usg', 'praxis'] },
    ],
  },
];
