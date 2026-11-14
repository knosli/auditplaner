import type { Lesson } from '../types';

// Modul 6 «Baulärm und Erschütterungen».
// Rechtliche Aussagen sinngemäss, nicht am Fedlex-Volltext geprüft. Baulärm: Art. 6 LSV und
// Baulärm-Richtlinie des BAFU (Stufen A/B/C, Transporte A/B, keine Grenzwerte) wie in Modul 1.
// Keine Kriterien für die Stufen, keine Richtwerte für Erschütterungen, keine Zeitfenster als
// allgemeine Regel genannt – diese stehen in Richtlinie, Normen und kommunalem Recht.
// Prüfstatus: Entwurf.

const M = 'm6';
const E = 'entwurf' as const;

export const M6_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm6-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Schall, Lärm und der Rechtsrahmen für Baulärm',
    topics: ['m6-grundlagen'],
    objectives: [
      'Die Grundbegriffe von Schall und Lärm verstehen (Dezibel, Abstand, Addition)',
      'Den Rechtsrahmen für Baulärm einordnen (USG, LSV, Baulärm-Richtlinie, kommunales Recht)',
      'Umweltschutz und Gehörschutz der Mitarbeitenden unterscheiden',
    ],
    steps: [
      { id: 'm6-l1-situation', kind: 'situation', title: 'Einstieg: «Zwei Hämmer sind doppelt so laut»', text: `Auf einer Baustelle neben einem Altersheim arbeiten zwei Abbauhammer gleichzeitig. Der Polier meint: «Wenn wir nur einen nehmen, ist es halb so laut – dann dauert es aber doppelt so lange.» Die Heimleiterin fragt, ob es eine Lärmgrenze für Baustellen gibt.

Was stimmt an beiden Aussagen – und was nicht?` },
      { id: 'm6-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m6-q01', 'm6-q02'] },
      { id: 'm6-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Schall** wird in **Dezibel (dB)** gemessen, einer logarithmischen Skala. Zwei gleich laute Quellen ergeben **+3 dB**, nicht das Doppelte. Als «doppelt so laut» empfinden wir etwa **+10 dB**. Mit doppeltem Abstand nimmt der Pegel einer Punktquelle im Freien um etwa **6 dB** ab.

**Lärm** ist Schall, der stört oder schadet. Er beeinträchtigt Schlaf, Konzentration und Gesundheit.

**Für Baulärm gibt es keine Grenzwerte.** Die Lärmschutz-Verordnung (Art. 6 LSV) verlangt, dass Baulärm nach den **Richtlinien des BAFU** begrenzt wird. Die **Baulärm-Richtlinie** legt **Massnahmenstufen A, B und C** (für Transporte A und B) fest. Dazu kommen Zeitvorschriften der Kantone und Gemeinden.

**Gehörschutz** der Mitarbeitenden ist ein eigenes Thema (Arbeitnehmerschutz, Suva).` },
      { id: 'm6-l1-explain', kind: 'explain', title: 'Schall verstehen', text: `### Dezibel – drei Faustregeln

| Situation | Veränderung | Wahrnehmung |
|---|---|---|
| Zweite, gleich laute Quelle | +3 dB | deutlich, aber nicht «doppelt» |
| Zehn gleich laute Quellen | +10 dB | etwa doppelt so laut empfunden |
| Abstand zur Punktquelle verdoppeln (Freifeld) | etwa –6 dB | spürbar leiser |
| Abschirmung (Wand, Container), die die Sichtverbindung unterbricht | oft spürbare Minderung | abhängig von Höhe, Länge, Lage |

Die Werte sind Faustregeln für die Lernhilfe; in der Praxis beeinflussen Reflexionen, Gelände und Wetter das Ergebnis.

### Was Lärm lästig macht
- **Pegel** (wie laut),
- **Dauer** und **Häufigkeit**,
- **Charakter**: Schläge, Kreischen, Tonhaltiges (Trennscheiben, Rammen) stören mehr als gleichmässiges Rauschen,
- **Tageszeit**: abends, nachts, am Wochenende und in Ruhezeiten stört Lärm mehr,
- **Vorhersehbarkeit**: Wer weiss, wann es laut wird und wie lange, erträgt mehr.

### Lärmempfindlichkeit
Die Nutzungszonen haben **Lärmempfindlichkeitsstufen** (I bis IV, zugeordnet in der Nutzungsplanung): z. B. Erholungszonen und Spitäler sehr empfindlich, Industriezonen wenig. Sie fliessen in die Wahl der Massnahmenstufe ein.

§> Faustregeln der Akustik allgemein. Empfindlichkeitsstufen nach LSV (sinngemäss, Art. 43 LSV – nicht am Original geprüft).` },
      { id: 'm6-l1-explain-2', kind: 'explain', title: 'Rechtsrahmen für Baulärm', text: `### Bund
- **USG**: Lärm wird vorsorglich an der Quelle begrenzt (technisch und betrieblich möglich, wirtschaftlich tragbar); verschärft, wenn er schädlich oder lästig wird (Art. 11 USG, sinngemäss).
- **LSV Art. 6**: Baulärm wird nach den Richtlinien des BAFU begrenzt – mit baulichen und betrieblichen Massnahmen.
- **Baulärm-Richtlinie des BAFU**: Massnahmenstufen **A, B, C** für Bauarbeiten, **A, B** für Bautransporte; Kriterien u. a. Empfindlichkeit der Umgebung, Dauer, Tageszeit, Abstand; Massnahmenkataloge. **Keine Grenzwerte.**
- **Maschinen**: Für Geräte und Maschinen, die im Freien verwendet werden, gelten Anforderungen an die Geräuschemission und Kennzeichnung (Maschinenlärmverordnung, abgestimmt auf EU-Regeln).

### Kantone und Gemeinden
- **Arbeitszeiten und Ruhezeiten** (abends, nachts, sonn- und feiertags, Mittagsruhe) regeln Kantone und Gemeinden, oft in Polizei- oder Lärmreglementen; Ausnahmen brauchen eine Bewilligung.
- **Bewilligung des Bauprojekts**: ordnet die Massnahmenstufe und weitere Auflagen an.

### Arbeitnehmerschutz
Lärm kann das Gehör der Mitarbeitenden schädigen. Pflichten zu Gehörschutz, Information und Gehörvorsorge regelt der Arbeitnehmerschutz (Suva). Lärmarme Verfahren schützen Nachbarn und eigene Leute zugleich.

§> Art. 11 USG, Art. 6 LSV sinngemäss (Modul 1, bestätigt über BAFU- und kantonale Unterlagen). Maschinenlärmverordnung (MaLV) nur allgemein, nicht geprüft. Zeitvorschriften kommunal – keine allgemeinen Zeitfenster in der App.` },
      { id: 'm6-l1-diagram', kind: 'diagram', title: 'Schema: Quelle – Ausbreitung – Wirkung', diagram: 'emission', caption: 'Auch beim Lärm: zuerst an der Quelle, dann auf dem Ausbreitungsweg, zuletzt am Ort der Wirkung. Vereinfachte Lernhilfe.' },
      { id: 'm6-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Zwei Hämmer oder einer?', context: 'Hochbau', text: `Im Fall aus dem Einstieg rechnet die Umweltbeauftragte vor: Ein zweiter, gleich lauter Hammer erhöht den Pegel um etwa 3 dB – das ist deutlich weniger als eine Verdoppelung. Mit einem Hammer dauert die Arbeit doppelt so lang, die Belastung verlängert sich. Besser ist, das Verfahren zu ändern: Betonzange und Seilsäge statt Abbauhammer, wo möglich, und die verbleibenden Hammerarbeiten in Zeitfenster legen, die mit dem Altersheim abgesprochen sind.

**Lernpunkt**: Weniger Maschinen gleichzeitig ist nicht automatisch leiser für die Nachbarn – entscheidend sind Verfahren, Dauer und Zeitpunkt.` },
      { id: 'm6-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Nachtarbeit an der Bahnlinie', context: 'Tiefbau', text: `Für eine Werkleitung unter einer Bahnlinie dürfen die Gleisbereiche nur nachts betreten werden. Die Gemeinde erteilt eine Ausnahmebewilligung für vier Nächte, mit Auflagen: keine Rammen, lärmarme Maschinen, Abschirmung zur Wohnseite, Information der Anwohnenden zwei Wochen vorher. Die Bauführung legt die lautesten Arbeiten (Belagsschnitt) in den Tag und nachts nur, was zwingend ist.

**Lernpunkt**: Nachtarbeit ist eine Ausnahme mit Bewilligung – und verlangt die strengsten Massnahmen.` },
      { id: 'm6-l1-deep', kind: 'deep', title: 'Fachvertiefung: Warum Baulärm anders geregelt ist', text: `### 1. Keine Grenzwerte – warum?
Für Strassen-, Bahn- und Industrielärm kennt die LSV Belastungsgrenzwerte. Für Baulärm nicht: Baustellen sind zeitlich begrenzt, sehr unterschiedlich und oft unvermeidbar laut. Statt eines Grenzwerts verlangt das Recht deshalb, den Lärm mit **Massnahmen** nach dem Stand der Technik zu begrenzen. Das heisst aber nicht «alles erlaubt»: Die Massnahmen der angeordneten Stufe sind verbindlich, und das Vorsorgeprinzip gilt immer.

### 2. Die Logik der Massnahmenstufen
Je empfindlicher die Umgebung, je länger die Arbeiten und je lärmiger die Tätigkeit, desto höher die Stufe und desto mehr Massnahmen. Die Richtlinie unterscheidet zwischen **lärmigen** und **besonders lärmigen** Arbeiten und zwischen **Bauarbeiten** und **Bautransporten**. Die genauen Kriterien und die Zuordnung der Massnahmen stehen in der Richtlinie; die Behörde ordnet die Stufe an.

### 3. Drei Arten von Massnahmen
- **Bauliche**: Abschirmungen (Lärmschutzwände, Container, Materiallager als Wall), Einhausungen, Anordnung der Installationen.
- **Betriebliche**: Arbeitszeiten, Pausen, Reihenfolge, Begrenzung der Dauer lauter Arbeiten, Verfahrenswahl, Wartung, Transportlogistik.
- **Technische**: lärmarme Maschinen und Geräte, Schalldämpfer, Elektroantrieb, lärmarme Rückfahrwarner.
Dazu kommt die **Information** der Betroffenen – sie ist in der Richtlinie selbst als Massnahme genannt.

### 4. Lärm und Zeit
Viele Konflikte entstehen weniger wegen des Pegels als wegen des Zeitpunkts: früh morgens, über Mittag, abends, am Samstag. Die kommunalen Vorschriften zu Arbeits- und Ruhezeiten sind deshalb ebenso wichtig wie die Massnahmenstufe. Kennen Sie sie für jeden Standort – sie unterscheiden sich von Gemeinde zu Gemeinde.

### 5. Gehör der Mitarbeitenden
Für die eigenen Leute geht es nicht um Belästigung, sondern um bleibende Gehörschäden. Lärmarme Verfahren sind auch hier der beste Schutz; Gehörschutz ergänzt. Ihr Hintergrund in der Arbeitssicherheit hilft: Was die Suva für die Mitarbeitenden verlangt (Verfahren, Abstand, Pausen, Gehörschutz), passt oft zu den Massnahmen für die Nachbarn.

### 6. Erschütterungen
Rammen, Vibrieren, Verdichten, Abbruch und Sprengungen erzeugen Erschütterungen. Sie können Menschen belästigen und Bauwerke beschädigen. Das USG behandelt Erschütterungen wie Lärm (Vorsorge, Begrenzung an der Quelle); konkrete Beurteilungen stützen sich auf Normen (Lektion 4).

### 7. Ihre Rolle
Sie sorgen dafür, dass Stufe, Zeitvorschriften und Massnahmen in der AVOR bekannt und eingeplant sind, dass lärmarme Verfahren gewählt werden, dass die Nachbarschaft informiert ist und dass Beschwerden rasch bearbeitet werden. Wo die Beurteilung fachlich anspruchsvoll wird (Messungen, Prognosen, Erschütterungen an empfindlichen Bauten), ziehen Sie Akustiker bzw. Erschütterungsfachleute bei.

§> Struktur der Baulärm-Richtlinie (Stufen, Massnahmenarten, Information) über BAFU- und kantonale Unterlagen bestätigt; Kriterien und Kataloge nicht wiedergegeben. Erschütterungen nach USG sinngemäss.` },
      { id: 'm6-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm6-q03' },
      { id: 'm6-l1-abw', kind: 'decision', title: 'Abwägung: Zwei Hämmer oder einer?', questionId: 'm6-d01' },
      { id: 'm6-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Lärmquellen und Betroffene', taskId: 'm6-t1' },
      { id: 'm6-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m6-q04', 'm6-q05'] },
      { id: 'm6-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm6-p1' },
      { id: 'm6-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Dezibel ist logarithmisch: zwei gleiche Quellen +3 dB, «doppelt so laut» etwa +10 dB, doppelter Abstand etwa –6 dB.',
        'Für Baulärm gibt es keine Grenzwerte, sondern Massnahmen nach der Baulärm-Richtlinie (Art. 6 LSV).',
        'Stufen A, B, C für Bauarbeiten, A und B für Transporte; angeordnet in der Bewilligung.',
        'Arbeits- und Ruhezeiten regeln Kantone und Gemeinden; Ausnahmen brauchen eine Bewilligung.',
        'Lärmarme Verfahren schützen Nachbarn und das Gehör der eigenen Leute.',
      ] },
      { id: 'm6-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'lsv', 'bafu-baulaerm', 'malv', 'suva-laerm', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm6-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Massnahmen gegen Baulärm: Verfahren, Maschinen, Abschirmung',
    topics: ['m6-massnahmen'],
    objectives: [
      'Lärmige und besonders lärmige Arbeiten erkennen',
      'Bauliche, betriebliche und technische Massnahmen auswählen',
      'Die Wirkung von Abschirmungen und Verfahrenswechseln einschätzen',
    ],
    steps: [
      { id: 'm6-l2-situation', kind: 'situation', title: 'Einstieg: Der Rückfahrwarner', text: `Auf einer Baustelle mitten im Wohnquartier ist die häufigste Beschwerde nicht der Bagger, sondern das «Piep-piep-piep» der Rückfahrwarner – ab 7 Uhr, den ganzen Tag. Der Polier: «Das ist Vorschrift wegen der Sicherheit, da kann man nichts machen.»

Stimmt das?` },
      { id: 'm6-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m6-q06', 'm6-q07'] },
      { id: 'm6-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Besonders lärmige Arbeiten**: Rammen und Vibrieren von Spundwänden und Pfählen, Abbauhammer, Trennscheiben und Fräsen, Abbruch, Brechen, Sprengen.

**An der Quelle zuerst**: lärmarme **Verfahren** (Bohren statt Rammen, Zange statt Hammer, Seilsäge statt Trennscheibe), lärmarme **Maschinen** (Kennzeichnung, Elektroantrieb), gute **Wartung**.

**Betrieblich**: lärmige Arbeiten bündeln und in Zeitfenster legen, Pausen, keine unnötigen Leerläufe, Wege so planen, dass wenig rückwärts gefahren wird.

**Abschirmen**: Wände, Container, Materiallager zwischen Quelle und Betroffenen – möglichst nah an der Quelle und die Sichtverbindung unterbrechend.

**Sicherheit und Lärm verbinden**: z. B. Rückfahrwarner mit Breitbandton (Rauschsignal) statt Piepton – sicher und weniger störend.` },
      { id: 'm6-l2-explain', kind: 'explain', title: 'Massnahmen nach Tätigkeit', text: `| Tätigkeit | Lärmarme Alternative bzw. Massnahme an der Quelle | Betrieblich / Abschirmung |
|---|---|---|
| Spundwände, Pfähle rammen | Bohrpfähle, Einpressen oder hochfrequentes Vibrieren statt Schlagrammen – wo geotechnisch möglich | Zeitfenster, Information, Abschirmung bei der Ramme selten wirksam genug |
| Abbruch | Zange, Pulverisierer, Seil- und Wandsägen statt Abbauhammer | Abschirmung zur empfindlichen Seite, Reihenfolge |
| Schneiden von Belag, Beton | Wandsäge, Fugenschneider mit Wasser; Trennscheibe nur, wo nötig | Schneidarbeiten bündeln, Abschirmung |
| Kompressoren, Aggregate | Elektrisch über Baustrom, schallgedämmte Ausführung | Standort weg von Wohnungen, hinter Container |
| Lastwagen, Bagger | Lärmarme Maschinen, Motor aus beim Warten | Wege ohne viel Rückwärtsfahren, Wartezone |
| Rückfahrwarner | Breitband-Warner (Rauschsignal) statt Piepton – Sicherheit klären | – |
| Material umschlagen | Kleine Abwurfhöhen, Gummiauflagen in Mulden | Muldenstandort weg von Wohnungen |
| Gerüst, Schalung | Nicht werfen, ablegen | – |

### Abschirmungen richtig einsetzen
- **Nah an der Quelle oder nah an den Betroffenen**, nicht in der Mitte.
- **Höhe und Länge**: Die Sichtverbindung zwischen Quelle und Fenster muss unterbrochen sein.
- **Dicht**: Lücken mindern die Wirkung stark.
- **Grenzen**: Bei hohen Gebäuden (obere Geschosse) und bei Rammen wirken Wände nur begrenzt.

§> Massnahmen sinngemäss nach der Baulärm-Richtlinie (Massnahmenkataloge nicht vollständig wiedergegeben). Wahl des Verfahrens im Einzelfall nach Geotechnik und Statik. Sicherheitsanforderungen an Rückfahrwarner mit Arbeitssicherheit bzw. Hersteller klären.` },
      { id: 'm6-l2-explain-2', kind: 'explain', title: 'Maschinen, Wartung und Verhalten', text: `### Lärmarme Maschinen
Geräte und Maschinen für den Einsatz im Freien tragen eine Kennzeichnung der Geräuschemission. Vergleichen Sie bei Beschaffung und Miete: Wenige Dezibel Unterschied bedeuten für Nachbarn viel. Elektrische Maschinen (Minibagger, Kompressoren, Pumpen, Kran) sind oft deutlich leiser.

### Wartung
Defekte Schalldämpfer, lose Bleche, schlagende Klappen, quietschende Ketten: Wartungsmängel machen Maschinen unnötig laut. Sie gehören in die tägliche Sichtkontrolle.

### Verhalten auf der Baustelle
- Motoren aus statt Leerlauf.
- Material nicht werfen, Schalungen und Gerüstteile ablegen.
- Keine Radios in voller Lautstärke, keine Hupen als Signal.
- Lärmige Arbeiten nicht vor dem erlaubten Arbeitsbeginn «vorbereiten» (Kompressor warmlaufen lassen).

### Wenn sich Lärm nicht vermeiden lässt
Dann zählen **Zeit** und **Information**: lärmige Arbeiten bündeln, in akzeptierte Zeitfenster legen, Pausen einhalten, die Betroffenen vorab informieren (wann, wie lange, warum).

§> Maschinenkennzeichnung nach Maschinenlärmverordnung (sinngemäss, nicht geprüft).` },
      { id: 'm6-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Baugrube mit Bohrpfählen statt Spundwand', context: 'Hochbau', text: `Für eine Baugrube in der Altstadt sah das Projekt geschlagene Spundwände vor. Nach Gesprächen mit Anwohnenden und dem Geotechniker wird eine gebohrte Pfahlwand gewählt – teurer im Bau, aber ohne Rammschläge, mit weniger Erschütterungen und ohne Risiko für die alten Nachbarhäuser. Die Mehrkosten werden zum Teil durch geringere Beweissicherungs- und Schadenrisiken aufgewogen.

**Lernpunkt**: Die grösste Lärmminderung entsteht bei der Verfahrenswahl – in der Planung, nicht auf der Baustelle.` },
      { id: 'm6-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Belagssanierung in der Nacht', context: 'Tiefbau', text: `Für eine Belagssanierung auf einer Hauptstrasse sind Nachtarbeiten bewilligt. Die Unternehmung schneidet die Fugen tagsüber, setzt nachts nur Fräse, Fertiger und Walzen ein, tauscht die Rückfahrwarner gegen Breitband-Warner und organisiert die Lastwagen so, dass sie vorwärts an- und abfahren. Die Anwohnenden werden mit einem Flyer informiert, inklusive Telefonnummer für die Nacht.

**Lernpunkt**: Bei Nachtarbeit lohnt sich jeder Handgriff – auch die kleinen wie Warner und Fahrwege.` },
      { id: 'm6-l2-deep', kind: 'deep', title: 'Fachvertiefung: Leiser bauen', text: `### 1. Die Hierarchie der Massnahmen
Wie bei Staub: **Vermeiden** (Verfahren) vor **Mindern an der Quelle** (lärmarme Maschine, Schalldämpfer) vor **Abschirmen** vor **Zeit und Information** vor **Schutz am Ort der Wirkung** (in seltenen Fällen z. B. Ersatzräume). Wer erst über die Lärmschutzwand nachdenkt, hat die wirksamsten Hebel schon verpasst.

### 2. Verfahrenswahl in der Planung
Rammen oder bohren, Hammer oder Zange, Trennscheibe oder Wandsäge – diese Entscheidungen fallen in Projektierung und AVOR (Modul 8). Lärmärmere Verfahren sind oft teurer im Bau, aber sie verkürzen Konflikte, verringern Erschütterungsrisiken und verbessern die Arbeitsbedingungen. Die Abwägung gehört in die Entscheidungsvorlage.

### 3. Abschirmungen realistisch einschätzen
Eine Wand nützt viel bei bodennahen Quellen und niedrigen Gebäuden, wenig bei hohen Gebäuden oder hoch liegenden Quellen (Kran, Ramme). Container und Materiallager können als Abschirmung dienen, wenn sie richtig stehen. Mobile Lärmschutzelemente direkt um eine Maschine (z. B. Kompressor, Fugenschneider) wirken oft besser als lange Wände an der Grundstücksgrenze.

### 4. Bündeln und takten
Lärm wird erträglicher, wenn er vorhersehbar ist: feste Zeitfenster für besonders lärmige Arbeiten, Pausen, ruhige Zeiten (z. B. Mittag). Bündeln heisst auch: lieber kurz mit mehreren Geräten als lange mit einem – solange die Spitzen in akzeptierten Zeiten liegen.

### 5. Sicherheit und Lärm
Rückfahrwarner, Hupen und Signale dienen der Sicherheit und sind nicht verhandelbar. Aber das *Wie* lässt sich gestalten: Breitband-Warner sind ortbar und für die Umgebung weniger störend; Verkehrsführung, die wenig Rückwärtsfahren erfordert, reduziert Warnsignale. Klären Sie Änderungen mit der Arbeitssicherheit und dem Hersteller.

### 6. Beschaffung und Miete
Geräuschemissionen in Ausschreibung und Miete einbeziehen: Kennzeichnung vergleichen, Elektroantrieb bevorzugen, Lärmschutzausrüstung (Schalldämpfer, Einhausung) mitbestellen. Subunternehmer werden auf die Anforderungen verpflichtet (Modul 8).

### 7. Messen?
Für die tägliche Steuerung genügen Hören und Beobachten. Messungen sind sinnvoll bei Streitfällen, bei Auflagen mit Messprogramm oder zur Beurteilung von Massnahmen. Sie gehören in die Hand von Fachleuten mit geeigneten Geräten; Handy-Apps geben höchstens einen groben Hinweis.

### 8. Gehör der Mitarbeitenden
Bei Abbauhammer, Trennscheibe, Ramme und Fräse sind die Pegel am Arbeitsplatz gehörschädigend. Gehörschutz ist dort Pflicht nach Arbeitnehmerschutz; lärmarme Verfahren senken die Belastung für alle.

§> Sinngemäss nach Baulärm-Richtlinie und Suva-Informationen; keine Pegel oder Grenzwerte wiedergegeben.` },
      { id: 'm6-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm6-q08' },
      { id: 'm6-l2-abw', kind: 'decision', title: 'Abwägung: Rammen oder bohren?', questionId: 'm6-d02' },
      { id: 'm6-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Lärmmassnahmen für einen Abbruch', taskId: 'm6-t2' },
      { id: 'm6-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m6-q09', 'm6-q10'] },
      { id: 'm6-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm6-p2' },
      { id: 'm6-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Besonders lärmig: Rammen, Abbauhammer, Trennscheibe, Fräse, Abbruch, Brecher.',
        'Verfahren zuerst: bohren statt rammen, Zange statt Hammer, Säge statt Trennscheibe.',
        'Lärmarme, gut gewartete Maschinen; elektrisch wo möglich; Motor aus.',
        'Abschirmen nah an Quelle oder Betroffenen, dicht, Sichtverbindung unterbrechen.',
        'Sicherheit und Lärm verbinden (z. B. Breitband-Warner, weniger Rückwärtsfahren).',
      ] },
      { id: 'm6-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-baulaerm', 'lsv', 'malv', 'suva-laerm', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm6-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Lärmschutzkonzept, Arbeitszeiten und Bewilligungen',
    topics: ['m6-planung'],
    objectives: [
      'Die angeordnete Massnahmenstufe in ein Lärmschutzkonzept übersetzen',
      'Arbeits- und Ruhezeiten sowie Ausnahmebewilligungen richtig einplanen',
      'Lärmschutz in Ausschreibung, AVOR und Kontrolle verankern',
    ],
    steps: [
      { id: 'm6-l3-situation', kind: 'situation', title: 'Einstieg: Samstagsarbeit', text: `Die Baustelle eines Schulhauses ist drei Wochen im Verzug. Der Bauführer plant für die nächsten vier Samstage Rohbauarbeiten mit Kran, Betonpumpe und Bohrhammer. «Am Samstag stört es die Schule nicht.» Die Bewilligung sagt zu Samstagen nichts; das Reglement der Gemeinde schon.

Was müssen Sie vorher klären?` },
      { id: 'm6-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m6-q11', 'm6-q12'] },
      { id: 'm6-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Das Lärmschutzkonzept** übersetzt die angeordnete Stufe in die Baustelle: Für jede Bauphase lärmige Tätigkeiten, Massnahmen, Zeiten, Verantwortung und Kontrolle.

**Arbeits- und Ruhezeiten** stehen in kantonalen und kommunalen Vorschriften und in der Bewilligung. Abends, nachts, an Sonn- und Feiertagen und oft auch am Samstag gelten Einschränkungen; **Ausnahmen brauchen eine Bewilligung** – rechtzeitig beantragen.

**In der Ausschreibung**: Massnahmen und Zeiten gehören ins LV; fehlen sie, gilt die Auflage trotzdem (Modul 8).

**In der AVOR**: Verfahren, Maschinen, Installationsplan (Lage von Kompressor, Mulden, Zufahrt), Terminplan mit lärmigen Phasen.

**Kontrolle**: Massnahmen vorhanden, angewendet, wirksam; Zeiten eingehalten.` },
      { id: 'm6-l3-explain', kind: 'explain', title: 'Vom Satz in der Bewilligung zum Lärmschutzkonzept', text: `### Vorgehen
1. **Grundlagen**: Bewilligung (Stufe, Auflagen), Baulärm-Richtlinie (Massnahmenkatalog), kommunale Zeitvorschriften, Lage der Empfindlichen (Wohnungen, Schulen, Spitäler, Heime).
2. **Lärmige Phasen** identifizieren: Abbruch, Baugrube (Spundwand, Anker), Rohbau (Kran, Pumpe, Schalung), Ausbau (Bohren, Schleifen), Umgebung (Verdichten).
3. **Massnahmen je Phase** auswählen (Lektion 2).
4. **Zeiten** festlegen: Arbeitszeiten, Zeitfenster für besonders lärmige Arbeiten, Pausen, ruhige Tage (z. B. Prüfungen in der Schule).
5. **Information** planen (Lektion 5).
6. **Verantwortung, Kontrolle, Nachweis** in den Massnahmenplan übernehmen (Modul 8).

### Beispiel (Ausschnitt)

| Phase | Lärmige Tätigkeit | Massnahme | Zeit | Verantwortlich |
|---|---|---|---|---|
| Abbruch | Hammer, Zange, Umschlag | Zange und Säge statt Hammer; Abschirmung zur Schule; Mulde auf der Hofseite | lärmige Arbeiten in abgesprochenen Fenstern | Polier/in |
| Baugrube | Verbau | Bohrpfahlwand statt Rammen | Arbeitszeit gemäss Reglement | Bauführer/in |
| Rohbau | Kran, Pumpe, Kompressor | Elektrischer Kran, Kompressor elektrisch hinter Container | – | Polier/in |
| Ausbau | Kernbohren, Schleifen | Nass, Einhausung, Fenster zur Schule geschlossen | nicht in Prüfungswochen | Subunternehmer, Polier/in |

§> Massnahmenkatalog nach der Baulärm-Richtlinie; Zeitvorschriften nach kantonalem und kommunalem Recht. Beispiel fiktiv.` },
      { id: 'm6-l3-explain-2', kind: 'explain', title: 'Arbeitszeiten und Ausnahmebewilligungen', text: `### Wo die Zeiten stehen
- **Kommunale Reglemente** (Polizei-, Lärm- oder Baureglement): übliche Arbeitszeiten, Mittagsruhe, Abend- und Nachtruhe, Sonn- und Feiertage, oft auch Samstag.
- **Kantonale Vorschriften**: teilweise ergänzend, z. B. Ruhetagsgesetz.
- **Bewilligung des Projekts**: kann engere Zeiten oder Zeitfenster für besonders lärmige Arbeiten festlegen.
Die App nennt keine Uhrzeiten, weil sie je nach Ort verschieden sind.

### Ausnahmen
Arbeiten ausserhalb der erlaubten Zeiten (Nacht, Wochenende) brauchen in der Regel eine **Ausnahmebewilligung** der zuständigen Behörde – mit Begründung (z. B. Bahn- oder Verkehrssperren, Betonierabschnitte, Sicherheit) und meist mit Auflagen (Massnahmen, Information, Begrenzung). Planen Sie die Bearbeitungszeit ein. Eine fehlende Bewilligung ist ein Go/No-Go-Punkt (Modul 8).

### Terminverzug ist keine Begründung
Behörden bewilligen Ausnahmen in der Regel aus zwingenden technischen oder betrieblichen Gründen, nicht um Verzug aufzuholen. Prüfen Sie zuerst andere Wege: mehr Personal, andere Reihenfolge, leise Arbeiten am Samstag (falls erlaubt).

### Notfälle
Arbeiten zur Abwendung einer unmittelbaren Gefahr (z. B. Sicherung einer Baugrube nach Starkregen) sind in den Reglementen meist ausdrücklich vorbehalten. Informieren Sie die Behörde danach.

§> Zuständigkeiten und Verfahren kantonal bzw. kommunal; in der App sinngemäss.` },
      { id: 'm6-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Die vier Samstage', context: 'Hochbau', text: `Im Fall aus dem Einstieg zeigt das Gemeindereglement: Samstags sind lärmige Arbeiten nur bis Mittag erlaubt, Betonieren mit Pumpe braucht eine Ausnahmebewilligung. Die Umweltbeauftragte schlägt vor: samstags nur leise Arbeiten (Bewehrung, Schalung ohne Hammer), keine Pumpe; Betonetappen unter der Woche mit zusätzlicher Equipe. Für einen Samstag mit Betonage wird ein Gesuch gestellt – mit Begründung, Massnahmen und Information der Nachbarn.

**Lernpunkt**: «Stört die Schule nicht» heisst nicht «stört niemanden» – und das Reglement gilt für alle Nachbarn.` },
      { id: 'm6-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Brücke mit Rammarbeiten', context: 'Tiefbau', text: `Für eine Brückenfundation sind Rammarbeiten nötig (Bohren ist geologisch nicht möglich). Die Bewilligung ordnet Stufe C an. Das Lärmschutzkonzept legt fest: Rammen nur werktags in zwei festen Zeitfenstern, Vorbohren zur Reduktion der Schläge, Information der Anwohnenden mit Plan der Rammtage, Erschütterungsmessung bei zwei Nachbarhäusern (Lektion 4), Ansprechperson auf der Bautafel.

**Lernpunkt**: Wo sich Lärm nicht vermeiden lässt, schaffen feste Zeiten, Information und Kontrolle Akzeptanz.` },
      { id: 'm6-l3-deep', kind: 'deep', title: 'Fachvertiefung: Lärmschutz im Projektablauf', text: `### 1. Früh planen
Die Stufe wird in der Bewilligung angeordnet, aber die wichtigsten Entscheidungen fallen vorher: Bauverfahren (bohren oder rammen), Installationsplan (wo stehen Kompressor, Mulden, Brecher, Zufahrt?), Terminplan (wann sind die lauten Phasen, fallen sie in Ferien oder Prüfungszeiten?). Wer die Stufe erst auf der Baustelle liest, kann nur noch abschirmen und entschuldigen.

### 2. Ausschreibung und Vertrag
Lärmschutzmassnahmen, Zeiten und Maschinenanforderungen gehören ins Leistungsverzeichnis und in die besonderen Bestimmungen. Fehlen sie, gilt die Auflage trotzdem; Mehrkosten werden angezeigt und nach Vertrag geprüft (Modul 8). Zeitfenster, die die Produktivität einschränken, gehören in die Kalkulation – sonst entsteht Druck, sie zu missachten.

### 3. Zeitfenster sinnvoll wählen
Gute Zeitfenster berücksichtigen die Nutzung der Nachbarschaft: Schulen (Unterricht, Prüfungen, Pausen), Spitäler und Heime (Ruhe- und Besuchszeiten), Büros (Konzentrationsphasen), Wohnquartiere (früher Morgen, Mittag, Abend). Absprachen mit den Betroffenen sind oft wirksamer als jede Wand.

### 4. Ausnahmebewilligungen
Nachtarbeit und Wochenendarbeit sind Ausnahmen. Ein gutes Gesuch erklärt, **warum** es nicht anders geht, **was** genau gemacht wird, **wie lange**, **welche Massnahmen** getroffen werden und **wie** informiert wird. Rechnen Sie mit Auflagen und Bearbeitungszeit. Arbeiten ohne die nötige Bewilligung sind ein Verstoss – auch wenn die Nachbarn nichts sagen.

### 5. Kontrolle
- **Täglich** (Polier): Zeiten eingehalten? Abschirmungen dicht? Maschinen gewartet, Motoren aus?
- **Bei Begehungen**: Massnahmen je Phase vorhanden, angewendet, wirksam (Modul 9).
- **Bei Beschwerden**: sofort prüfen (Lektion 5).
- **Messungen**: nur, wo verlangt oder zur Klärung – durch Fachleute.

### 6. Typische Lücken
- Stufe in der Bewilligung, aber kein Konzept.
- Zeitvorschriften der Gemeinde nicht bekannt.
- Lärmige Arbeiten beginnen vor der erlaubten Zeit («nur kurz den Kompressor anwerfen»).
- Subunternehmer kennen die Zeiten nicht.
- Ausnahmebewilligung zu spät beantragt.

### 7. Wirtschaftlichkeit
Lärmschutz kostet – Konflikte auch: Baustopps, Verzögerungen durch Einsprachen, Mehraufwand für Beschwerdebearbeitung, Reputationsschaden. Ein gutes Konzept mit realistischen Zeiten ist meist günstiger als ein Projekt, das jede Woche mit Beschwerden kämpft.

§> Sinngemäss nach Baulärm-Richtlinie und kommunalem Recht; Verfahren für Ausnahmebewilligungen örtlich verschieden.` },
      { id: 'm6-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm6-q13' },
      { id: 'm6-l3-abw', kind: 'decision', title: 'Abwägung: Samstag oder nicht?', questionId: 'm6-d03' },
      { id: 'm6-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Lärmschutzkonzept neben einem Spital', taskId: 'm6-t3' },
      { id: 'm6-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m6-q14', 'm6-q15'] },
      { id: 'm6-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm6-p3' },
      { id: 'm6-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Lärmschutzkonzept nach Phasen: Tätigkeit, Massnahme, Zeit, Verantwortung, Kontrolle.',
        'Arbeits- und Ruhezeiten stehen in kommunalen bzw. kantonalen Vorschriften und in der Bewilligung.',
        'Nacht- und Wochenendarbeit sind Ausnahmen mit Bewilligung – Terminverzug ist kein guter Grund.',
        'Massnahmen und Zeitfenster gehören in LV, Kalkulation und Subunternehmerverträge.',
        'Zeitfenster mit der Nutzung der Nachbarschaft abstimmen.',
      ] },
      { id: 'm6-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-baulaerm', 'lsv', 'kanton-laerm', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm6-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Erschütterungen: Risiken, Beweissicherung, Überwachung',
    topics: ['m6-erschuetterung'],
    objectives: [
      'Erschütterungsquellen auf Baustellen und ihre Wirkung auf Menschen und Bauwerke erklären',
      'Beweissicherung und Erschütterungsüberwachung planen',
      'Bei Rissen und Beschwerden richtig reagieren',
    ],
    steps: [
      { id: 'm6-l4-situation', kind: 'situation', title: 'Einstieg: Der Riss im Nachbarhaus', text: `Seit eine Rüttelplatte und eine Vibrowalze für den Strassenbau arbeiten, meldet ein Nachbar einen neuen Riss in seiner Küche. Er verlangt, dass die Arbeiten sofort aufhören, und droht mit dem Anwalt. Ob es den Riss schon vorher gab, weiss niemand – eine Zustandsaufnahme wurde nicht gemacht.

Was hätte man vorher tun sollen – und was tun Sie jetzt?` },
      { id: 'm6-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m6-q16', 'm6-q17'] },
      { id: 'm6-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Erschütterungen** entstehen beim Rammen und Vibrieren, Verdichten (Rüttelplatte, Vibrowalze), Abbruch, Bohren, schwerem Verkehr und Sprengen.

**Sie wirken auf Menschen** (Belästigung, Unruhe, Schlafstörung) und **auf Bauwerke** (von Haarrissen bis zu Schäden), besonders auf empfindliche oder alte Gebäude und empfindliche Einrichtungen (Labor, Spital).

**Beurteilt** werden Erschütterungen anhand von **Normen** (in der Schweiz für Bauwerke die VSS-Norm SN 640 312a); die App nennt keine Richtwerte.

**Vorbeugen**: erschütterungsarme Verfahren wählen, **Zustandsaufnahme** (Beweissicherung) vor Baubeginn, bei Risiko **Messungen** während der Arbeiten.

**Bei Rissen**: aufnehmen, Fachperson beiziehen, Versicherung informieren, Vorgehen anpassen – nicht abstreiten, nicht zusagen.` },
      { id: 'm6-l4-explain', kind: 'explain', title: 'Quellen, Wirkung, Beurteilung', text: `### Quellen und Gegenmassnahmen

| Quelle | Erschütterungsärmere Alternative bzw. Massnahme |
|---|---|
| Schlagrammen von Spundwänden und Pfählen | Bohren, Einpressen, hochfrequentes Vibrieren mit resonanzfreiem Anlauf – wo möglich |
| Verdichten mit Vibrowalze, Rüttelplatte | Kleinere Geräte nahe an Gebäuden, statische Walzen, Vibration ausschalten im Nahbereich |
| Abbruch | Zange statt Hammer, Material nicht fallen lassen |
| Lastwagenverkehr | Fahrbahn eben halten, Schachtdeckel bündig, Tempo reduzieren |
| Sprengungen | Fachplanung, Ladungsmengen, Messungen, Information (Spezialfall) |

### Wirkung
- **Menschen** spüren Erschütterungen schon bei Werten, die für Bauwerke unbedenklich sind. Belästigung ist deshalb häufiger als Schaden.
- **Bauwerke**: Risiken hängen von Erschütterungsstärke, Frequenz, Dauer, Abstand, Baugrund und Zustand des Gebäudes ab. Alte, schon geschädigte oder setzungsempfindliche Gebäude sind besonders gefährdet.
- **Empfindliche Einrichtungen**: Labors, Operationssäle, Präzisionsmaschinen können schon bei geringen Erschütterungen gestört werden.

### Beurteilung
Für die Beurteilung der Einwirkungen auf Bauwerke wird in der Schweiz die VSS-Norm **SN 640 312a** beigezogen; für die Einwirkung auf Menschen werden u. a. ausländische Normen (z. B. DIN 4150) verwendet. Die Beurteilung gehört in die Hand von Fachleuten. Die App nennt keine Richtwerte.

§> Erschütterungen werden nach USG wie Lärm vorsorglich begrenzt (sinngemäss). Normen SN 640 312a (VSS) und DIN 4150 nur als Referenz genannt, Inhalt nicht wiedergegeben und nicht geprüft.` },
      { id: 'm6-l4-explain-2', kind: 'explain', title: 'Beweissicherung und Überwachung', text: `### Zustandsaufnahme vor Baubeginn (Beweissicherung)
- **Wann**: bei erschütterungsintensiven Arbeiten, bei Baugruben neben Gebäuden, bei alten oder empfindlichen Nachbarbauten – im Zweifel immer.
- **Wer**: neutrale Fachperson (oft im Auftrag der Bauherrschaft), mit Einverständnis der Eigentümer.
- **Was**: Fotos und Beschreibung bestehender Risse und Schäden innen und aussen, ggf. Rissmarken; Protokoll von beiden Seiten unterschrieben.
- **Nach Bauende**: Schlussaufnahme zum Vergleich.

### Überwachung während der Arbeiten
- **Erschütterungsmessungen** an kritischen Gebäuden während der relevanten Arbeiten, mit Alarmschwellen nach Norm bzw. Fachgutachten.
- **Rissmonitoring** an bekannten Rissen.
- **Reaktion bei Überschreitung**: Arbeit unterbrechen, Ursache klären, Verfahren anpassen.

### Wenn ein Schaden gemeldet wird
1. Ernst nehmen, Termin vor Ort vereinbaren.
2. Befund aufnehmen (Fotos, Masse), mit der Zustandsaufnahme vergleichen.
3. Fachperson beiziehen; Haftpflichtversicherung und Bauherrschaft informieren.
4. Weder abstreiten noch Schuld anerkennen – die Klärung ist Sache der Fachleute und Versicherungen.
5. Arbeiten prüfen und, wenn nötig, anpassen (Verfahren, Abstand, Gerät).

§> Vorgehen als bewährte Praxis; Haftungsfragen richten sich nach Vertrag, Nachbarrecht und Versicherung – in der App nicht beurteilt.` },
      { id: 'm6-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Baugrube neben dem Altbau', context: 'Hochbau', text: `Für eine Tiefgarage neben einem 120-jährigen Wohnhaus lässt die Bauherrschaft vor Baubeginn eine Zustandsaufnahme machen; drei bestehende Risse werden markiert. Während des Verbaus wird an der Fassade gemessen; die Alarmschwelle stammt aus dem Gutachten des Erschütterungsfachmanns. Als beim Verdichten mit einer schweren Vibrowalze die Werte steigen, wird auf eine leichtere Walze ohne Vibration im Nahbereich gewechselt. Die markierten Risse bleiben unverändert – der Nachweis liegt vor.

**Lernpunkt**: Die Zustandsaufnahme schützt beide Seiten. Ohne sie wird jeder Riss zum Streitfall.` },
      { id: 'm6-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Der Riss in der Küche', context: 'Tiefbau', text: `Im Fall aus dem Einstieg nimmt der Umweltbeauftragte den Riss am selben Tag mit dem Polier auf (Fotos, Länge, Breite), informiert die Bauleitung und die Haftpflichtversicherung und schlägt vor, im Nahbereich des Hauses ohne Vibration zu verdichten. Er sagt dem Nachbarn, dass eine Fachperson den Riss beurteilt, und gibt ihm eine Kontaktperson. Für die nächsten Abschnitte der Strasse veranlasst die Bauleitung Zustandsaufnahmen der Anrainerhäuser.

**Lernpunkt**: Nicht abstreiten, nicht zusagen – aufnehmen, Fachleute beiziehen, Verfahren anpassen und für den Rest vorbeugen.` },
      { id: 'm6-l4-deep', kind: 'deep', title: 'Fachvertiefung: Erschütterungen beherrschen', text: `### 1. Warum Erschütterungen besonders heikel sind
Lärm hört auf, wenn die Maschine schweigt. Ein Riss bleibt. Erschütterungen führen deshalb schnell zu Haftungsfragen, Gutachten und Streit – und zu Misstrauen in der Nachbarschaft. Dabei sind viele Risse alt oder haben andere Ursachen (Setzungen, Temperatur, Schwinden). Ohne Zustandsaufnahme lässt sich das nicht belegen.

### 2. Was die Wirkung bestimmt
- **Stärke und Frequenz** der Erschütterung an der Gebäudefundation,
- **Dauer** (einzelne Schläge oder Dauererschütterung),
- **Abstand** und **Baugrund** (weiche Böden übertragen anders als Fels),
- **Gebäude**: Bauart, Alter, Zustand, Fundation, Empfindlichkeit von Nutzungen.
Gefährlich ist besonders die **Resonanz**: Wenn die Erregerfrequenz der Maschine mit der Eigenfrequenz eines Bauteils übereinstimmt, schaukelt sich die Schwingung auf. Vibratoren mit resonanzfreiem An- und Auslauf vermeiden das beim Starten und Stoppen.

### 3. Verfahren wählen
Wie beim Lärm entscheidet die Verfahrenswahl am meisten: Bohrpfähle statt Rammpfähle, Einpressen statt Schlagen, statische statt vibrierende Verdichtung im Nahbereich. Diese Entscheidungen gehören in die Projektierung und AVOR – mit Geotechniker und Erschütterungsfachleuten.

### 4. Überwachen mit klaren Regeln
Ein Messprogramm ist nur so gut wie die Reaktion darauf. Vor Beginn festlegen: Wo wird gemessen? Welche Schwellen gelten (aus Norm bzw. Gutachten)? Wer wird alarmiert, wenn eine Schwelle überschritten wird? Was passiert dann (Unterbruch, Anpassung)? Die Messdaten werden aufbewahrt – sie sind im Streitfall wertvoll.

### 5. Menschen informieren
Viele Anwohnende erschrecken bei Erschütterungen, auch wenn keine Schadensgefahr besteht. Information vorab (was, wann, wie lange, dass gemessen wird) reduziert Angst und Beschwerden. Wer weiss, dass sein Haus aufgenommen und überwacht wird, reagiert gelassener.

### 6. Haftung und Versicherung
Schäden an Nachbargebäuden werden über Vertrag, Nachbarrecht und Versicherungen abgewickelt. Für Sie als Umweltfachperson gilt: rasch und sachlich aufnehmen, Fachleute und Versicherung einschalten, keine Schuldanerkennung, keine Abwehrhaltung. Dokumentieren Sie, was Sie gesehen und veranlasst haben.

### 7. Sprengungen
Sprengungen im Bauwesen (Fels, Tunnel, Abbruch) sind ein Spezialgebiet mit eigenen Vorschriften und Fachpersonen. Ihre Rolle: sicherstellen, dass Fachplanung, Bewilligungen, Messungen und Information vorhanden sind.

### 8. Grenzen der eigenen Rolle
Sie beurteilen nicht, ob ein Riss durch die Baustelle verursacht wurde, und legen keine Alarmschwellen fest. Sie sorgen dafür, dass Zustandsaufnahmen und Überwachung dort geplant werden, wo sie nötig sind, dass die Baustelle bei Alarm reagiert und dass Meldungen sauber behandelt werden.

§> Allgemeine Fachgrundsätze; Beurteilung nach SN 640 312a bzw. Gutachten (nicht wiedergegeben). Haftung und Sprengrecht nicht vertieft.` },
      { id: 'm6-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm6-q18' },
      { id: 'm6-l4-abw', kind: 'decision', title: 'Abwägung: Zustandsaufnahme – ja oder nein?', questionId: 'm6-d04' },
      { id: 'm6-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Erschütterungsvorsorge für eine Baugrube', taskId: 'm6-t4' },
      { id: 'm6-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m6-q19', 'm6-q20'] },
      { id: 'm6-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm6-p4' },
      { id: 'm6-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Quellen: Rammen, Vibrieren, Verdichten, Abbruch, schwerer Verkehr, Sprengen.',
        'Menschen spüren Erschütterungen früher, als Bauwerke Schaden nehmen.',
        'Verfahren zuerst: bohren, einpressen, statisch verdichten im Nahbereich; Resonanz vermeiden.',
        'Zustandsaufnahme vor Baubeginn; Messungen mit klaren Schwellen und Reaktionen.',
        'Bei Rissen: aufnehmen, Fachleute und Versicherung, nicht abstreiten, nicht zusagen.',
      ] },
      { id: 'm6-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'sn640312', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm6-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Information, Beschwerdemanagement und Nachbarschaft',
    topics: ['m6-kommunikation'],
    objectives: [
      'Anwohnende wirksam informieren',
      'Beschwerden strukturiert bearbeiten',
      'Konflikte mit Nachbarn deeskalieren und Lehren daraus ziehen',
    ],
    steps: [
      { id: 'm6-l5-situation', kind: 'situation', title: 'Einstieg: Die Unterschriftenliste', text: `Nach drei Wochen Rückbau im Wohnquartier liegt eine Unterschriftenliste mit 40 Namen auf dem Tisch der Gemeinde: «Unerträglicher Lärm, keine Information, niemand zuständig.» Die Bauarbeiten entsprechen der Bewilligung. Der Projektleiter ist empört: «Wir halten alles ein!»

Wo liegt das Problem – und wie lösen Sie es?` },
      { id: 'm6-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m6-q21', 'm6-q22'] },
      { id: 'm6-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Information ist eine Massnahme** – die Baulärm-Richtlinie nennt sie ausdrücklich. Wer weiss, was kommt, wie lange es dauert und an wen er sich wenden kann, erträgt mehr.

**Vor Baubeginn**: Flyer, Aushang oder Infoabend mit Ablauf, lauten Phasen, Zeiten, Ansprechperson. **Laufend**: Hinweise vor besonders lauten Arbeiten, Anpassungen.

**Beschwerden**: aufnehmen, rasch anschauen, Ursache prüfen, handeln oder begründet erklären, zurückmelden, dokumentieren.

**Haltung**: Betroffene ernst nehmen, nicht belehren. «Wir halten alles ein» ist eine Feststellung, keine Antwort.

**Lernen**: Wiederkehrende Beschwerden zeigen, wo das Konzept nicht reicht.` },
      { id: 'm6-l5-explain', kind: 'explain', title: 'Gut informieren', text: `### Was die Nachbarschaft wissen will
- **Was** wird gebaut, **wie lange** dauert es?
- **Wann** wird es laut (Phasen, Tage, Zeiten)?
- **Was** wird gegen Lärm, Staub und Erschütterungen getan?
- **Wer** ist erreichbar – mit Telefonnummer, auch für dringende Fälle?

### Wie informieren

| Mittel | Wann sinnvoll |
|---|---|
| Flyer in die Briefkästen | vor Baubeginn, vor lauten Phasen |
| Aushang an der Bautafel mit Ansprechperson | ganze Bauzeit |
| Infoveranstaltung | grosse oder lange Projekte, sensible Umgebung |
| Persönliches Gespräch | direkte Nachbarn, Schulen, Spitäler, Heime |
| Website bzw. Newsletter | sehr grosse Projekte |

### Wer informiert?
Häufig die Bauherrschaft oder Bauleitung; die Unternehmung liefert die Angaben (Termine, laute Phasen) und stellt eine Ansprechperson vor Ort. Klären Sie das an der Startsitzung – und dass Zusagen an Anwohnende nur machen darf, wer sie auch einhalten kann.

### Ehrlich informieren
Nichts beschönigen («kaum hörbar»), keine Versprechen, die nicht zu halten sind. Lieber: «In der Woche vom 12. wird es zwischen 8 und 11 Uhr sehr laut, weil wir Beton abbrechen. Wir setzen eine Zange statt eines Hammers ein, wo es geht.»

§> Information als Massnahme nach der Baulärm-Richtlinie (BAFU, sinngemäss); ob sie Pflicht ist, ergibt sich aus der Auflage bzw. dem kantonalen oder kommunalen Recht.` },
      { id: 'm6-l5-explain-2', kind: 'explain', title: 'Beschwerden bearbeiten', text: `### Der Ablauf
1. **Aufnehmen**: Wer, wann, was (Lärm, Erschütterung, Uhrzeit, Art des Geräuschs), wo? Freundlich, ohne zu diskutieren.
2. **Rasch prüfen**: möglichst am selben Tag vor Ort; Massnahmen, Zeiten und Maschinen kontrollieren.
3. **Bewerten**: Liegt ein Fehler vor (Zeit überschritten, Abschirmung offen, Maschine defekt) – oder ist der Lärm trotz korrekter Massnahmen hoch?
4. **Handeln**: Fehler sofort beheben. Bei korrekter Ausführung prüfen, ob zusätzliche, verhältnismässige Massnahmen möglich sind (z. B. Zeitfenster verschieben, Abschirmung ergänzen).
5. **Zurückmelden**: Was wurde festgestellt, was wird getan – oder warum nicht.
6. **Dokumentieren**: Beschwerdeliste mit Datum, Inhalt, Befund, Massnahme, Rückmeldung.

### Deeskalation
- Zuhören, ausreden lassen, Verständnis zeigen («Ich verstehe, dass das am Morgen sehr belastend ist»).
- Keine Schuldzuweisung, keine Belehrung über Rechtslage am Anfang.
- Sachliche Information über Dauer und Massnahmen.
- Konkrete nächste Schritte und Rückruf zusagen – und einhalten.

### Wenn es eskaliert
Unterschriftenlisten, Anwälte, Medien, Behörde: Informieren Sie Bauleitung und Bauherrschaft sofort; kommuniziert wird über die festgelegten Stellen. Halten Sie Ihre Dokumentation bereit – sie zeigt, was getan wurde.

§> Bewährte Praxis; rechtliche Ansprüche Betroffener (Nachbarrecht, Einsprachen) in der App nicht beurteilt.` },
      { id: 'm6-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Nach der Unterschriftenliste', context: 'Hochbau', text: `Im Fall aus dem Einstieg zeigt sich: Es gab keine Information vor Baubeginn, keine Ansprechperson auf der Bautafel, und der Kompressor lief jeden Morgen ab 6.45 Uhr warm. Die Umweltbeauftragte schlägt vor: sofort Kompressor elektrisch und erst ab Arbeitsbeginn, Flyer mit Phasenplan und Telefonnummer, Infoabend nach zwei Wochen, Abbrucharbeiten an der Wohnseite in festen Zeitfenstern. Die Gemeinde lädt zu einem Gespräch; die Unterschriftenliste wird nicht weiterverfolgt.

**Lernpunkt**: «Wir halten alles ein» reicht nicht, wenn niemand weiss, was kommt, und niemand zuhört.` },
      { id: 'm6-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Die Telefonnummer in der Nacht', context: 'Tiefbau', text: `Bei nächtlichen Gleisbauarbeiten ruft ein Anwohner um 1.30 Uhr die Nummer auf dem Flyer an: Ein Lastwagen wartet mit laufendem Motor vor seinem Schlafzimmer. Der Nachtpolier geht hin, lässt den Motor abstellen und den Lastwagen umstellen. Am Morgen schreibt die Bauleitung eine kurze Nachricht an den Anwohner. Für die nächsten Nächte wird eine Wartezone ausserhalb des Wohngebiets festgelegt.

**Lernpunkt**: Eine erreichbare Ansprechperson macht aus einer Beschwerde eine gelöste Situation – und verhindert die nächste.` },
      { id: 'm6-l5-deep', kind: 'deep', title: 'Fachvertiefung: Nachbarschaft als Teil des Projekts', text: `### 1. Akzeptanz ist eine Projektressource
Ein Bauprojekt, das von der Nachbarschaft getragen wird, läuft ruhiger: weniger Beschwerden, weniger Kontrollen, weniger Verzögerungen, mehr Verständnis für Ausnahmen. Information und Beschwerdemanagement sind deshalb keine «weichen» Themen, sondern Teil der Projektsteuerung.

### 2. Warum Menschen sich beschweren
Selten nur wegen des Pegels. Häufige Gründe: Überraschung (niemand hat informiert), Ohnmacht (niemand ist erreichbar), Ungerechtigkeit (Arbeiten zu Zeiten, die als unnötig empfunden werden), Respektlosigkeit (laufende Motoren, Radios, Fluchen). Viele dieser Gründe lassen sich ohne grosse Kosten beseitigen.

### 3. Die Ansprechperson
Eine Person mit Namen, Telefonnummer und Kompetenz zu handeln – das ist das wichtigste Element. Sie muss erreichbar sein (auch nachts bei Nachtarbeit), zurückrufen und Probleme vor Ort lösen können. Sie sollte im Team Rückhalt haben: Wenn sie sagt «Der Kompressor wird verschoben», wird er verschoben.

### 4. Beschwerden als Daten
Eine Beschwerdeliste zeigt Muster: Immer derselbe Zeitraum? Immer dieselbe Maschine? Immer dieselbe Strasse? Daraus entstehen Verbesserungen für die Baustelle und – zusammengeführt über mehrere Projekte – für die Firma (Modul 9 und 10).

### 5. Besondere Nachbarn
Schulen, Spitäler, Heime, Kitas, Büros mit Publikumsverkehr, Kirchen, Gewerbe mit lärmempfindlichen Tätigkeiten: Mit ihnen lohnt ein persönliches Gespräch vor Baubeginn. Prüfungstermine, Operationszeiten, Gottesdienste, Ruhezeiten – wer sie kennt, kann darum herum planen.

### 6. Grenzen
Nicht jede Beschwerde lässt sich lösen. Wenn die Massnahmen der Stufe eingehalten sind und weitere Massnahmen unverhältnismässig wären, erklären Sie das sachlich – und bleiben trotzdem erreichbar. Rechtliche Auseinandersetzungen (Einsprachen, Ansprüche aus Nachbarrecht) gehören zu Bauherrschaft und Fachleuten.

### 7. Medien
Bei grösseren Konflikten interessieren sich Medien. Auskunft gibt die bezeichnete Stelle (Bauherrschaft, Geschäftsleitung). Mitarbeitende auf der Baustelle verweisen freundlich weiter und äussern sich nicht zu Ursachen oder Schuld.

### 8. Ihre Rolle
Sie sorgen dafür, dass Information und Beschwerdemanagement geplant sind (Startsitzung), dass die Ansprechperson benannt und befähigt ist, dass Beschwerden dokumentiert und ausgewertet werden und dass berechtigte Kritik zu Verbesserungen führt.

§> Bewährte Praxis; Kommunikation und rechtliche Fragen gemäss Rollen in Bauherrschaft, Bauleitung und Unternehmung.` },
      { id: 'm6-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm6-q23' },
      { id: 'm6-l5-abw', kind: 'decision', title: 'Abwägung: «Wir halten alles ein»', questionId: 'm6-d05' },
      { id: 'm6-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Informationsplan für einen Rückbau', taskId: 'm6-t5' },
      { id: 'm6-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m6-q24', 'm6-q25'] },
      { id: 'm6-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm6-p5' },
      { id: 'm6-l5-feynman', kind: 'feynman', title: 'Erklären Sie es dem Polier (Feynman-Methode)', feynmanId: 'm6-f1' },
      { id: 'm6-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Information ist eine Massnahme: was, wann, wie lange, was wird getan, wer ist erreichbar.',
        'Ansprechperson mit Telefonnummer und Kompetenz zu handeln.',
        'Beschwerden: aufnehmen, rasch prüfen, handeln oder erklären, zurückmelden, dokumentieren.',
        'Zuhören statt belehren; ehrlich statt beschönigen.',
        'Beschwerden als Daten nutzen – für Baustelle und Firma.',
      ] },
      { id: 'm6-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['bafu-baulaerm', 'kanton-laerm', 'praxis'] },
    ],
  },
];
