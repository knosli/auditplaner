import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm4';

// ---------- Baustellenaufgaben ----------
export const M4_SITETASKS: SiteTask[] = [
  {
    id: 'm4-t1', moduleId: M, topic: 'm4-grundlagen', level: 2, setting: 'Hochbau',
    title: 'Bodenschutz für ein Einfamilienhaus',
    situation: 'Neubau eines Einfamilienhauses (fiktiv) auf einer bisherigen Wiese am Siedlungsrand, Parzelle 800 m², Bauzeit 9 Monate. Keine BBB-Auflage.',
    data: ['Oberboden ca. 25 cm, Unterboden ca. 50 cm (Sondierung des Planers)', 'Gebäude und Zufahrt beanspruchen 300 m²; Rest wird Garten', 'Zufahrt für Lastwagen über die Wiese nötig', 'Platz für Depots am Parzellenrand vorhanden'],
    assignment: 'Legen Sie die Bodenschutzmassnahmen fest: Schutzflächen, Abtrag, Depots, Zufahrt, Wiedereinbau, Instruktion.',
    rubric: [
      { id: 'k1', text: 'Gartenflächen, die nicht gebraucht werden, als Schutzfläche abgrenzen', keywords: ['schutzfläche', 'abgrenz', 'zaun', 'nicht befahr'] },
      { id: 'k2', text: 'Ober- und Unterboden getrennt abtragen, bei trockenem Boden', keywords: ['getrennt', 'oberboden', 'unterboden', 'trocken'] },
      { id: 'k3', text: 'Depots getrennt, locker, begrenzt hoch, begrünt', keywords: ['depot', 'locker', 'begrün', 'höhe'] },
      { id: 'k4', text: 'Zufahrt als Piste bzw. auf der späteren Zufahrtsfläche', keywords: ['piste', 'zufahrt', 'kies', 'vlies'] },
      { id: 'k5', text: 'Wiedereinbau in richtiger Reihenfolge, Instruktion', keywords: ['reihenfolge', 'einbau', 'instru'] },
    ],
    solution: `- **Schutzflächen**: Gartenteile, die nicht für Bau oder Installation gebraucht werden, mit Bauzaun abgrenzen («nicht befahren, kein Material»).
- **Zufahrt**: auf der Fläche der späteren Zufahrt – Oberboden dort zuerst abtragen und Kiespiste anlegen; Lastwagen nur auf der Piste.
- **Abtrag**: nur bei abgetrocknetem Boden; zuerst Oberboden (ca. 25 cm), dann Unterboden im Gebäudebereich separat; nicht mit Untergrund mischen.
- **Depots**: am Parzellenrand, Ober- und Unterboden getrennt, locker geschüttet, nicht befahren, niedrig (Oberboden niedriger als Unterboden, Richtwerte der Vollzugshilfe), rasch begrünt, beschriftet.
- **Wiedereinbau**: nach dem Rohbau, Bauabfälle vorher entfernen; Unterboden, dann Oberboden locker einbauen, bei trockenem Wetter; fertige Flächen nicht mehr befahren.
- **Instruktion**: Baggerführer und Chauffeure kennen Schutzflächen, Pistenpflicht und Depotregeln.
- **Überschuss**: Boden, der nicht gebraucht wird, verwerten (Art. 18 VVEA) statt deponieren.`,
    sources: ['bafu-boden-bauen', 'vvea'],
  },
  {
    id: 'm4-t2', moduleId: M, topic: 'm4-verdichtung', level: 3, setting: 'Tiefbau',
    title: 'Pisten- und Maschinenkonzept',
    situation: 'Bau einer Abwasserleitung (fiktiv) über 1,2 km durch Ackerland, Grabentiefe 2,5 m, Bauzeit Mai bis September. BBB-Auflage mit Freigabe nach Saugspannung.',
    data: ['Verfügbare Maschinen: Raupenbagger 22 t, Pneubagger 18 t, Dumper auf Raupen 6 t, Lastwagen 4-Achser', 'Arbeitsstreifen 15 m breit', 'Zufahrt ab Gemeindestrasse an beiden Enden'],
    assignment: 'Erstellen Sie ein Pisten- und Maschinenkonzept: wo fährt welche Maschine, welche Pisten braucht es, was gilt bei zu nassem Boden?',
    rubric: [
      { id: 'k1', text: 'Piste im Arbeitsstreifen (Kies auf Vlies), Lastwagen nur auf Piste', keywords: ['piste', 'vlies', 'kies', 'lastwagen'] },
      { id: 'k2', text: 'Raupenbagger für Bodenabtrag, vor Kopf bzw. von der Piste', keywords: ['raupe', 'vor kopf', 'abtrag'] },
      { id: 'k3', text: 'Pneubagger und Lastwagen nicht auf Boden', keywords: ['pneu', 'nicht auf', 'boden'] },
      { id: 'k4', text: 'Freigabe durch BBB; Unterbruch bei Nässe; Ausweicharbeiten', keywords: ['freigabe', 'bbb', 'unterbruch', 'ausweich', 'nass'] },
      { id: 'k5', text: 'Rückbau der Piste und Rekultivierung', keywords: ['rückbau', 'rekultiv'] },
    ],
    solution: `**Aufteilung des Arbeitsstreifens**: Depotstreifen (Ober- und Unterboden getrennt) | Pistenstreifen | Graben | Aushubdepot (Untergrund).

**Pisten**: Oberboden im Pistenstreifen bei Freigabe abtragen, Kiespiste auf Geotextil einbauen. Lastwagen, Pneubagger und Rohrtransporte nur auf der Piste.

**Bodenabtrag**: Raupenbagger, arbeitet vor Kopf bzw. von der Piste aus; Raupendumper für kurze Wege nur bei Freigabe.

**Nässe**: Ohne Freigabe der BBB keine Bodenarbeiten; Ausweicharbeiten auf der Piste und im Graben (Rohrverlegung, Schächte), soweit kein Boden befahren wird.

**Ende**: Piste vollständig zurückbauen (inkl. Vlies), Fläche durch BBB prüfen lassen, Unterboden und Oberboden bei Freigabe einbauen, Folgebewirtschaftung mit Landwirt vereinbaren.

Hinweis: Konkrete Saugspannungsgrenzen und Maschinenkategorien gemäss Auflage bzw. BAFU-Vollzugshilfe.`,
    sources: ['bafu-boden-bauen', 'kanton-boden'],
  },
  {
    id: 'm4-t3', moduleId: M, topic: 'm4-abtrag', level: 3, setting: 'Hochbau',
    title: 'Depot- und Rekultivierungsplan',
    situation: 'Wohnüberbauung (fiktiv) mit 4 Häusern auf 1,2 ha Wiese. Bauzeit 22 Monate. 40 % der Fläche wird Umgebung (Rasen, Pflanzbeete, Spielplatz).',
    data: ['Oberboden total ca. 3 000 m³, Unterboden ca. 4 500 m³', 'Für die Umgebung gebraucht: ca. 1 200 m³ Oberboden, 1 800 m³ Unterboden', 'Auf einer Teilfläche wächst Berufkraut', 'Platz für Depots: Nordrand der Parzelle'],
    assignment: 'Planen Sie Depots (Anordnung, Pflege, Kennzeichnung), den Umgang mit dem Überschuss und die Rekultivierung der Umgebung.',
    rubric: [
      { id: 'k1', text: 'Getrennte Depots für Ober-/Unterboden und für Neophytenboden', keywords: ['getrennt', 'neophyt', 'berufkraut', 'separat'] },
      { id: 'k2', text: 'Depotpflege über 22 Monate (Begrünung, Mähen, Neophyten)', keywords: ['begrün', 'mäh', 'pflege', 'neophyt'] },
      { id: 'k3', text: 'Überschuss früh verwerten statt lange lagern', keywords: ['überschuss', 'verwert', 'abnehmer', 'früh'] },
      { id: 'k4', text: 'Rekultivierung: Reihenfolge, trockener Boden, nicht befahren', keywords: ['reihenfolge', 'trocken', 'nicht befahr', 'locker'] },
      { id: 'k5', text: 'Spielplatz: Bodenqualität besonders beachten', keywords: ['spielplatz', 'kinder', 'qualität', 'analys'] },
    ],
    solution: `**Depots**: Am Nordrand je ein Depot Oberboden und Unterboden für den Eigenbedarf; Neophytenboden (Berufkraut-Fläche) separat, gekennzeichnet, nicht für die Umgebung verwenden ohne Abklärung. Depots locker, begrenzte Höhe, begrünt, eingezäunt, beschriftet (Herkunft, Datum, «nicht befahren»).

**Pflege**: Mähen vor der Samenreife, Berufkraut ausreissen und fachgerecht entsorgen, kein Fremdmaterial.

**Überschuss** (ca. 1 800 m³ Oberboden, 2 700 m³ Unterboden): früh einen Abnehmer mit Bewilligung suchen (Fachstelle, Bodenbörse wo vorhanden) und direkt abführen – lange Lagerung schadet und kostet Platz.

**Rekultivierung**: Bauabfälle und Verdichtungen im Untergrund beseitigen, Unterboden und Oberboden in Schichten locker einbauen, nur bei trockenem Boden; fertige Flächen abzäunen.

**Spielplatz**: Für Spielflächen nur Boden mit nachgewiesener Eignung (Analyse) verwenden; im Zweifel Fachperson.`,
    sources: ['bafu-boden-bauen', 'vvea', 'frsv', 'vbbo'],
  },
  {
    id: 'm4-t4', moduleId: M, topic: 'm4-belastung', level: 3, setting: 'Tiefbau',
    title: 'Verwertungskonzept für Boden entlang einer Strasse',
    situation: 'Ausbau einer Kantonsstrasse (fiktiv) mit neuem Rad- und Gehweg. Die Böschungen liegen im kantonalen Prüfperimeter.',
    data: ['Analyse Oberboden Böschung: Blei und PAK über Richtwert, unter Prüfwert', 'Analyse Oberboden angrenzendes Ackerland (10 m Abstand): unter Richtwert', 'Neue Böschungen brauchen 600 m³ Oberboden; anfallend 900 m³ Böschungsboden, 400 m³ Ackerboden'],
    assignment: 'Erstellen Sie ein Verwertungskonzept: welcher Boden wohin, mit welchen Bedingungen und Nachweisen?',
    rubric: [
      { id: 'k1', text: 'Böschungsboden in neuen Böschungen am Entnahmeort wiederverwenden', keywords: ['böschung', 'entnahmeort', 'wieder'] },
      { id: 'k2', text: 'Überschuss Böschungsboden nicht auf Landwirtschaftsflächen; eingeschränkt verwerten bzw. entsorgen', keywords: ['überschuss', 'eingeschränkt', 'nicht', 'landwirtschaft', 'entsorg'] },
      { id: 'k3', text: 'Ackerboden getrennt, verwertbar (z. B. Rückgabe an Landwirtschaft)', keywords: ['ackerboden', 'getrennt', 'verwert', 'landwirt'] },
      { id: 'k4', text: 'Getrennte Depots und Transporte, kein Mischen', keywords: ['depot', 'getrennt', 'misch'] },
      { id: 'k5', text: 'Nachweise und Abstimmung mit Fachstelle/Fachperson', keywords: ['nachweis', 'fachstelle', 'fachperson'] },
    ],
    solution: `| Boden | Einstufung | Weg | Bedingungen |
|---|---|---|---|
| Böschungsboden (900 m³) | über Richtwert, unter Prüfwert | 600 m³ in neue Böschungen derselben Strasse | gleichartige Nutzung, Fachperson bestätigt |
| Überschuss Böschungsboden (300 m³) | wie oben | eingeschränkt verwerten auf vergleichbar belasteten Flächen oder entsorgen | nie auf Landwirtschafts- oder Gartenflächen |
| Ackerboden (400 m³) | unter Richtwert | verwerten, z. B. auf landwirtschaftlichen Flächen (mit Bewilligung) | getrennt abtragen, Neophyten prüfen |

Organisation: getrennte, beschriftete Depots; Transporte mit Herkunft und Einstufung; Abstimmung mit kantonaler Fachstelle; Einstufung und Freigaben durch Fachperson. Grundlagen: VBBo, Art. 18 VVEA, BAFU-Vollzugshilfe 2021 (Kategorien sinngemäss).`,
    sources: ['vbbo', 'vvea', 'bafu-boden-verwertung', 'kanton-boden'],
  },
  {
    id: 'm4-t5', moduleId: M, topic: 'm4-planung', level: 3, setting: 'Tiefbau',
    title: 'Bodenschutz in der AVOR einer Leitungsbaustelle',
    situation: 'Fernwärmeleitung (fiktiv) über 2 km, davon 1,5 km Landwirtschaftsland, 0,5 km Siedlungsgebiet. Bewilligung mit BBB-Auflage und Bodenschutzkonzept. Baubeginn im März.',
    data: ['Bodenschutzkonzept der BBB liegt vor', 'Sechs Landwirte betroffen', 'Terminplan des Bauherrn sieht Fertigstellung Ende Oktober vor', 'Werkvertrag regelt Regentage nicht'],
    assignment: 'Listen Sie die AVOR-Schritte für den Bodenschutz auf und begründen Sie die wichtigsten Punkte gegenüber dem Bauführer.',
    rubric: [
      { id: 'k1', text: 'Konzept in Installationsplan übersetzen (Pisten, Depots, Schutzflächen)', keywords: ['installationsplan', 'piste', 'depot', 'schutzfläche'] },
      { id: 'k2', text: 'Terminplan: Bodenarbeiten trocken, Reserve, Etappen; März kritisch', keywords: ['termin', 'reserve', 'etapp', 'märz', 'frühling'] },
      { id: 'k3', text: 'Regentage im Vertrag nachregeln (Nachtrag)', keywords: ['regentag', 'vertrag', 'nachtrag'] },
      { id: 'k4', text: 'Zustandsaufnahme und Information der Landwirte', keywords: ['zustand', 'landwirt', 'inform', 'foto'] },
      { id: 'k5', text: 'Instruktion, Freigabeprozess, Kontrolle', keywords: ['instru', 'freigabe', 'kontroll', 'begehung'] },
    ],
    solution: `1. **Konzept übernehmen**: Installationsplan mit Pisten, Depots, Schutzflächen, Installationsplätzen ausserhalb von Boden.
2. **Terminplan**: Im März sind Böden oft nass – Bodenarbeiten im Kulturland eher ab Frühsommer, zuerst Siedlungsabschnitt; Reserve für Regentage; Etappen so, dass Rekultivierung im Spätsommer möglich ist.
3. **Vertrag**: Regentage und Stillstand als Nachtrag mit der Bauherrschaft regeln – sonst entsteht Druck, trotzdem zu arbeiten.
4. **Landwirte**: Zustandsaufnahme mit Fotos vor Baubeginn, Information über Ablauf und Ansprechperson, Folgebewirtschaftung vorbereiten.
5. **Maschinen**: Liste mit Bodendruck; Lastwagen nur auf Piste.
6. **Instruktion**: Startinstruktion mit BBB für alle Maschinisten und Chauffeure.
7. **Freigabeprozess**: tägliche Freigabe der BBB, wer fragt an, wie wird informiert.
8. **Kontrolle**: Begehungen mit Fotos, Abweichungen, Abnahme der Rekultivierung.

Begründung gegenüber dem Bauführer: Verdichtung ist bleibend und teuer (Entschädigungen), die Auflage ist verbindlich, und ein geregelter Ablauf mit Reserven verhindert Konflikte mitten in der Saison.`,
    sources: ['bafu-boden-bauen', 'kanton-boden'],
  },
];

// ---------- Praxisaufträge ----------
export const M4_TASKS: PracticeTask[] = [
  { id: 'm4-p1', moduleId: M, topic: 'm4-grundlagen', title: 'Spatenprobe auf einer Baustelle',
    goal: 'Ober- und Unterboden im Gelände erkennen und den Zustand beurteilen.',
    steps: ['Wählen Sie eine Baustelle mit unbebautem Boden (mit Einverständnis der Bauleitung).', 'Machen Sie je eine Spatenprobe in einer unberührten und einer befahrenen Fläche.', 'Beschreiben Sie Farbe, Schichtung, Gefüge, Durchwurzelung, Geruch.', 'Vergleichen Sie und besprechen Sie das Ergebnis mit dem Polier.'],
    deliverable: 'Kurzprotokoll mit Fotos der beiden Proben und Ihrem Vergleich.',
    criteria: ['Ober- und Unterboden erkannt', 'Unterschiede beschrieben', 'Verdichtungsmerkmale benannt', 'Mit Polier besprochen'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm4-p2', moduleId: M, topic: 'm4-verdichtung', title: 'Maschinen- und Pistencheck',
    goal: 'Auf einer Tiefbaustelle prüfen, ob Maschinen und Fahrwege bodenschonend organisiert sind.',
    steps: ['Erfassen Sie die eingesetzten Maschinen (Typ, Gewicht, Fahrwerk).', 'Prüfen Sie, ob Lastwagen nur auf Pisten fahren und Schutzflächen eingehalten werden.', 'Prüfen Sie, wie über die Befahrbarkeit entschieden wird (Messung, Freigabe).', 'Halten Sie Verbesserungen fest.'],
    deliverable: 'Checkliste mit Befunden und Verbesserungen.',
    criteria: ['Maschinen vollständig', 'Fahrwege geprüft', 'Entscheidungsprozess beschrieben', 'Verbesserungen vereinbart'], confirmer: 'Bauführer/in' },
  { id: 'm4-p3', moduleId: M, topic: 'm4-abtrag', title: 'Bodendepots beurteilen',
    goal: 'Bestehende Bodendepots beurteilen und verbessern.',
    steps: ['Suchen Sie eine Baustelle mit Bodendepots.', 'Beurteilen Sie Trennung, Höhe, Form, Begrünung, Befahrung, Fremdmaterial, Neophyten, Kennzeichnung.', 'Fotografieren Sie Mängel.', 'Vereinbaren Sie Verbesserungen und kontrollieren Sie sie.'],
    deliverable: 'Depotbeurteilung mit Fotos und Massnahmen.',
    criteria: ['Alle Kriterien beurteilt', 'Mängel dokumentiert', 'Massnahmen vereinbart', 'Nachkontrolle'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm4-p4', moduleId: M, topic: 'm4-belastung', title: 'Prüfperimeter-Check für kommende Projekte',
    goal: 'Für kommende Projekte Bodenbelastungen früh erkennen.',
    steps: ['Prüfen Sie für zwei bis drei kommende Projekte die kantonalen Prüfperimeter und den Kataster der belasteten Standorte.', 'Klären Sie die frühere Nutzung.', 'Prüfen Sie, ob Analysen geplant sind und ob die Verwertung des Bodens geregelt ist.', 'Melden Sie das Ergebnis der Projektleitung.'],
    deliverable: 'Kurzbericht je Projekt mit Karte, Einschätzung, Empfehlung.',
    criteria: ['Prüfperimeter geprüft', 'Nutzung geklärt', 'Analysen/Verwertung geprüft', 'Empfehlung gemeldet'], confirmer: 'Projektleiter/in' },
  { id: 'm4-p5', moduleId: M, topic: 'm4-planung', title: 'Bodenschutz-Startcheck einführen',
    goal: 'Einen Startcheck für Bodenschutz auf einer realen Baustelle anwenden.',
    steps: ['Erstellen Sie aus Lektion 5 einen Startcheck (max. 1 Seite).', 'Wenden Sie ihn mit dem Bauführer auf einer kommenden Baustelle an.', 'Halten Sie offene Punkte mit Verantwortlichen fest.', 'Holen Sie Rückmeldungen ein und verbessern Sie den Check.'],
    deliverable: 'Startcheck (Version 2) und ausgefülltes Exemplar.',
    criteria: ['Check vollständig und kurz', 'Auf realer Baustelle angewendet', 'Offene Punkte mit Verantwortlichen', 'Verbessert nach Rückmeldung'], confirmer: 'Bauführer/in oder Leitung Qualität/Umwelt' },
];

// ---------- Feynman ----------
export const M4_FEYNMAN: FeynmanTask[] = [
  { id: 'm4-f1', moduleId: M, topic: 'm4-verdichtung', audience: 'Baggerführer',
    prompt: 'Erklären Sie einem erfahrenen Baggerführer in 5–7 Sätzen, warum er bei nassem Boden keine Bodenarbeiten machen darf und warum Lastwagen auf der Piste bleiben müssen.',
    rubric: [
      { id: 'f1', text: 'Nasser Boden wird zusammengedrückt, Poren gehen verloren', keywords: ['nass', 'poren', 'zusammen', 'verdicht'] },
      { id: 'f2', text: 'Schaden bleibt, vor allem im Unterboden', keywords: ['bleib', 'dauer', 'unterboden', 'nie mehr'] },
      { id: 'f3', text: 'Gewicht der Lastwagen wirkt in die Tiefe', keywords: ['gewicht', 'lastwagen', 'tief', 'last'] },
      { id: 'f4', text: 'Folgen für Landwirt/Garten (Staunässe, schlechter Wuchs)', keywords: ['landwirt', 'wasser', 'wachs', 'ertrag'] },
      { id: 'f5', text: 'Respektvoll, praktisch, ohne Fachjargon', keywords: [] },
    ] },
  { id: 'm4-f2', moduleId: M, topic: 'm4-belastung', audience: 'Gemeinderat (Bauherrschaft)',
    prompt: 'Erklären Sie einem Gemeinderat in 5–7 Sätzen, warum der schöne Boden aus den alten Familiengärten nicht ohne Analyse für den neuen Spielplatz verwendet werden darf.',
    rubric: [
      { id: 'f1', text: 'Gärten oft belastet (Asche, Schwermetalle, Pflanzenschutz)', keywords: ['garten', 'blei', 'schwermetall', 'asche', 'belast'] },
      { id: 'f2', text: 'Kinder als sensible Nutzung', keywords: ['kinder', 'spiel', 'sensib', 'mund'] },
      { id: 'f3', text: 'Analyse durch Fachperson vor Verwendung', keywords: ['analys', 'fachperson', 'probe'] },
      { id: 'f4', text: 'Alternativen und Kosten', keywords: ['alternativ', 'kosten', 'anderer boden'] },
      { id: 'f5', text: 'Verständlich, ohne Panik', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M4_CARDS: Card[] = [
  { id: 'm4-c01', moduleId: M, topic: 'm4-grundlagen', level: 1, front: 'Funktionen des Bodens?', back: 'Lebensraum, Pflanzenstandort, **Wasserfilter und -speicher**, Kohlenstoffspeicher, Archiv.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c02', moduleId: M, topic: 'm4-grundlagen', level: 1, front: 'Ober-, Unterboden, Untergrund?', back: '**Oberboden**: humusreich, belebt. **Unterboden**: Wurzelraum, Wasserspeicher. **Untergrund**: Ausgangsgestein, i. d. R. Aushub.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c03', moduleId: M, topic: 'm4-grundlagen', level: 2, front: 'Rechtsgrundlagen Bodenschutz Bau?', back: '**USG** (Bodenfruchtbarkeit), **VBBo**, **Art. 18 VVEA** (abgetragenen Boden verwerten), BAFU-Vollzugshilfe «Bodenschutz beim Bauen» (2022), kantonale Vorgaben.', sources: ['usg', 'vbbo', 'vvea', 'bafu-boden-bauen'] },
  { id: 'm4-c04', moduleId: M, topic: 'm4-verdichtung', level: 1, front: 'Wann verdichtet Boden am stärksten?', back: 'Wenn er **nass** ist.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c05', moduleId: M, topic: 'm4-verdichtung', level: 1, front: 'Wie wird die Befahrbarkeit beurteilt?', back: 'Über die **Saugspannung** (Tensiometer); Grenzen gemäss Vollzugshilfe/Auflage; Freigabe ggf. durch BBB.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c06', moduleId: M, topic: 'm4-verdichtung', level: 2, front: 'Drei Stellschrauben gegen Verdichtung?', back: '**Bodenfeuchte**, **Last/Druck** (leichte Maschinen, Raupen), **Anzahl Fahrten** (Pisten, feste Spuren).', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c07', moduleId: M, topic: 'm4-verdichtung', level: 2, front: 'Breite Reifen – Problem gelöst?', back: '**Nein**: Kontaktdruck sinkt, aber die **Gesamtlast** verdichtet den Unterboden. Lastwagen auf die Piste.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c08', moduleId: M, topic: 'm4-abtrag', level: 1, front: 'Reihenfolge Abtrag/Einbau?', back: 'Abtrag: **Ober-, dann Unterboden**. Einbau: **Unter-, dann Oberboden**.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c09', moduleId: M, topic: 'm4-abtrag', level: 1, front: 'Gutes Bodendepot?', back: 'Getrennt, **locker**, nicht befahren, **begrenzte Höhe**, rasch **begrünt**, gepflegt, beschriftet.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c10', moduleId: M, topic: 'm4-abtrag', level: 2, front: 'Warum Folgebewirtschaftung?', back: 'Rekultivierter Boden ist anfangs **instabil**; Wurzeln und Bodenleben bauen das Gefüge wieder auf.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c11', moduleId: M, topic: 'm4-abtrag', level: 2, front: 'Boden mit invasiven Neophyten?', back: 'Getrennt behandeln; so verwerten/entsorgen, dass sie sich **nicht weiterverbreiten** (FrSV sinngemäss, kantonale Merkblätter).', sources: ['frsv'] },
  { id: 'm4-c12', moduleId: M, topic: 'm4-belastung', level: 1, front: 'Richt-, Prüf-, Sanierungswert?', back: '**Richtwert**: Ursachen angehen. **Prüfwert**: Gefährdung untersuchen, nur bei Gefährdung Nutzung einschränken. **Sanierungswert**: bestimmte Nutzungen verboten.', sources: ['vbbo'] },
  { id: 'm4-c13', moduleId: M, topic: 'm4-belastung', level: 1, front: 'Typische Verdachtsflächen für Bodenbelastung?', back: 'Strassenränder, Bahnböschungen, **Gärten**, Rebberge/Obstanlagen, **Schiessanlagen**, Industrie, Auffüllungen.', sources: ['vbbo'] },
  { id: 'm4-c14', moduleId: M, topic: 'm4-belastung', level: 2, front: 'Prüfperimeter – was tun?', back: 'Vor der Verschiebung **analysieren** lassen; je nach Ergebnis verwerten, eingeschränkt verwerten oder entsorgen.', sources: ['kanton-boden', 'bafu-boden-verwertung'] },
  { id: 'm4-c15', moduleId: M, topic: 'm4-planung', level: 1, front: 'Aufgaben der BBB?', back: 'Bodenschutzkonzept, Instruktion, **Freigaben**, Kontrolle, Abnahme – wenn Bewilligung/Kanton es verlangen.', sources: ['kanton-boden'] },
  { id: 'm4-c16', moduleId: M, topic: 'm4-planung', level: 2, front: 'Bodenschutz in der AVOR?', back: 'Installationsplan (Pisten, Depots, Schutzflächen), Terminreserve, Maschinenliste, Instruktion, **Regentage im Vertrag**, Kontrolle.', sources: ['bafu-boden-bauen'] },
  { id: 'm4-c17', moduleId: M, topic: 'm4-planung', level: 1, front: 'Erosionsschutz?', back: 'Flächen kurz offen, **rasch begrünen/abdecken**, Hangwasser fassen, Schlammwasser absetzen.', sources: ['bafu-boden-bauen', 'gschg'] },
];

// ---------- Baustellensimulation ----------
export const M4_SCENARIO: Scenario = {
  id: 'sim-h', code: 'H', moduleId: M, status: 'verfuegbar', rev: 4,
  title: 'Regenwoche auf der Leitungsbaustelle',
  setting: 'Tiefbau', level: 3, minutes: 15,
  topics: ['m4-verdichtung', 'm4-abtrag', 'm4-planung'],
  intro: 'Bau einer Wasserleitung über 1,5 km Ackerland. Die Bewilligung verlangt eine bodenkundliche Baubegleitung (BBB) mit Freigabe der Bodenarbeiten. Die Piste ist auf den ersten 600 m gebaut. Seit Sonntag regnet es. Montag, 7.00 Uhr: Der Polier ruft an.',
  facts: [
    'Der Werkvertrag regelt Regentage nicht.',
    'Der Landwirt will in drei Wochen auf den angrenzenden Flächen säen.',
    'Die BBB ist erreichbar und hat am Freitag die nächsten 200 m freigegeben – vor dem Regen.',
    'Ein Lastwagen-Subunternehmer ist neu auf der Baustelle.',
  ],
  stages: [
    {
      id: 'h1', title: 'Der Anruf', type: 'single', criteria: ['risiko', 'recht'],
      situation: 'Der Polier: «Die BBB hat die 200 m am Freitag freigegeben. Wir tragen heute den Oberboden ab, die Lastwagen sind bestellt.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Die Freigabe galt für die Bedingungen vom Freitag. Nach dem Regen keine Bodenarbeiten ohne neue Freigabe. Ich kläre das sofort mit der BBB; bis dahin Arbeiten auf der bestehenden Piste und im Graben.', feedback: 'Richtig: Freigaben hängen von der aktuellen Bodenfeuchte ab.' },
        { id: 'o2', points: 0, critical: true, text: 'Freigabe ist Freigabe – fangt an.', feedback: 'Kritischer Fehler: Bodenarbeiten bei nassem Boden ohne gültige Freigabe verletzen die Auflage und riskieren bleibende Verdichtung.', consequence: 'Die Lastwagen hinterlassen 30 cm tiefe Spuren; die BBB meldet den Vorfall der Fachstelle.' },
        { id: 'o3', points: 0, critical: true, text: 'Nur mit dem Raupenbagger abtragen, Lastwagen warten am Pistenende.', feedback: 'Kritischer Fehler: Auch ein Raupenbagger verdichtet nassen Boden. Ohne neue Freigabe der BBB sind Bodenarbeiten nach dem Regen nicht zulässig – die Maschinenwahl ersetzt die Freigabe nicht.', consequence: 'Der Unterboden im Arbeitsstreifen wird verdichtet; die BBB meldet den Verstoss gegen die Auflage.' },
      ],
    },
    {
      id: 'h2', title: 'Was klären?', type: 'ask', criteria: ['unsicherheit', 'zusammenarbeit'], pick: 3,
      situation: 'Sie haben 15 Minuten, bevor die Lastwagen kommen.',
      prompt: 'Welche drei Informationen holen Sie?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Aktuelle Saugspannung bzw. Einschätzung der BBB', reveal: 'BBB: «Tensiometer zeigen zu nassen Boden. Frühestens Donnerstag neu beurteilen, wenn es trocken bleibt.»', feedback: 'Zentral: Grundlage des Entscheids.' },
        { id: 'u2', points: 2, relevant: true, text: 'Welche Arbeiten ohne Bodeneingriff möglich sind', reveal: 'Rohrverlegung und Schächte auf den ersten 600 m (Piste vorhanden) sind möglich, ca. 4 Tage Arbeit.', feedback: 'Zentral: Ausweicharbeiten halten die Equipe produktiv.' },
        { id: 'u3', points: 2, relevant: true, text: 'Ob die Lastwagen umdisponiert oder abbestellt werden können', reveal: 'Zwei von vier Lastwagen werden für Rohrtransporte auf der Piste gebraucht; zwei können abbestellt werden.', feedback: 'Zentral: Kosten begrenzen.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wetterprognose für nächsten Monat', reveal: 'Unsicher.', feedback: 'Für den heutigen Entscheid nicht hilfreich.' },
        { id: 'u5', points: 0, relevant: false, text: 'Wer den Lastwagen-Subunternehmer empfohlen hat', reveal: '—', feedback: 'Nicht relevant.' },
      ],
    },
    {
      id: 'h3', title: 'Massnahmen für die Woche', type: 'multi', criteria: ['fachlich', 'prioritaet'],
      situation: 'Die Bodenarbeiten ruhen voraussichtlich bis Donnerstag.',
      prompt: 'Was veranlassen Sie? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Ausweicharbeiten auf der Piste (Rohre, Schächte) planen', feedback: 'Richtig.' },
        { id: 'm2', points: 2, text: 'Neuen Lastwagen-Subunternehmer instruieren: nur Piste, nie auf Boden, nicht wenden', feedback: 'Richtig: Neue Beteiligte sind das grösste Risiko.' },
        { id: 'm3', points: 2, text: 'Bauherrschaft schriftlich über Unterbruch, Grund und Ausweicharbeiten informieren; Regentage als Nachtrag ansprechen', feedback: 'Richtig: Transparenz und Kostenklärung.' },
        { id: 'm4', points: 2, text: 'Depots und offene Flächen auf Erosion und Wasserabfluss prüfen, Schlammwasser zurückhalten', feedback: 'Richtig: Regen ist auch ein Erosionsrisiko.' },
        { id: 'm5', points: 0, critical: true, text: 'Fahrzeuge zum Wenden kurz auf den Acker neben der Piste fahren lassen', feedback: 'Kritischer Fehler: Befahren von nassem Ackerboden ausserhalb der Piste.', consequence: 'Tiefe Spuren auf dem Acker des Landwirts; Entschädigung und Konflikt.' },
        { id: 'm6', points: 0, text: 'Mit Kalk den Boden trocknen, um schneller abtragen zu können', feedback: 'Falsch: Kalkstabilisierung ist bei Oberboden, der wieder als Boden verwendet wird, nicht geeignet.' },
      ],
    },
    {
      id: 'h4', title: 'Der Landwirt', type: 'single', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Der Landwirt ruft an: «Ihr seid zu langsam. Wenn ihr nicht fertig werdet, kann ich nicht säen. Fahrt halt einfach!»',
      prompt: 'Wie reagieren Sie?',
      options: [
        { id: 'r1', points: 0, text: 'Ihm recht geben und die Arbeiten aufnehmen.', feedback: 'Falsch: Verdichtung würde gerade seinen Boden dauerhaft schädigen; die Auflage gilt trotzdem.' },
        { id: 'r2', points: 2, text: 'Erklären, dass Arbeiten auf nassem Boden seinen Acker langfristig schädigen würden; gemeinsam mit BBB und Bauherrschaft eine Lösung suchen (Etappierung, Saat auf nicht betroffenen Teilflächen, Entschädigung für Verzögerung).', feedback: 'Richtig: ernst nehmen, Gründe erklären, Lösung gemeinsam suchen.' },
        { id: 'r3', points: 1, text: 'Auf die Bewilligung verweisen und das Gespräch beenden.', feedback: 'Teilweise: korrekt, aber ohne Lösung – der Konflikt bleibt.' },
      ],
    },
    {
      id: 'h5', title: 'Wenn es wieder trocken ist', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Ab Donnerstag ist es trocken; die Arbeiten sollen weitergehen.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Neue Freigabe der BBB für die nächsten Abschnitte einholen' },
        { id: 'n2', text: 'Pistenbau im freigegebenen Abschnitt' },
        { id: 'n3', text: 'Oberboden- und Unterbodenabtrag im Arbeitsstreifen' },
        { id: 'n4', text: 'Grabenaushub und Rohrverlegung' },
        { id: 'n5', text: 'Terminplan mit Reserve und Regentage-Regelung aktualisieren' },
      ],
      rankOrder: ['n1', 'n5', 'n2', 'n3', 'n4'],
      rankGroups: [['n1', 'n5'], ['n2'], ['n3'], ['n4']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Ohne neue Freigabe der BBB dürfen keine Bodenarbeiten beginnen.' }],
      rankExplanation: 'Freigabe einholen und Terminplan nachführen laufen parallel. Danach Piste, dann Bodenabtrag, dann Graben – so wird der Boden nur einmal und nur trocken bearbeitet.',
    },
    {
      id: 'h6', title: 'Lehren für das Unternehmen', type: 'justify', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Die Geschäftsleitung fragt, was künftig bei Leitungsbauten im Kulturland anders laufen soll.',
      prompt: 'Schreiben Sie 5–7 Sätze mit konkreten Vorschlägen.',
      rubric: [
        { id: 'b1', text: 'Regentage und Stillstand in Offerte/Vertrag', keywords: ['regentag', 'vertrag', 'offerte', 'stillstand'] },
        { id: 'b2', text: 'Terminreserve und Etappierung', keywords: ['reserve', 'etapp', 'termin'] },
        { id: 'b3', text: 'Startinstruktion inkl. Subunternehmer', keywords: ['instru', 'sub', 'chauffeur', 'start'] },
        { id: 'b4', text: 'Freigabeprozess klar (wer fragt, wer informiert)', keywords: ['freigabe', 'bbb', 'prozess'] },
        { id: 'b5', text: 'Kommunikation mit Landwirten', keywords: ['landwirt', 'kommunik', 'inform', 'zustandsaufnahme'] },
      ],
    },
  ],
  debrief: 'Bodenschutz scheitert selten an fehlendem Wissen, sondern an Termindruck und ungeklärten Kosten. Wer Regentage im Vertrag regelt, Ausweicharbeiten plant, alle Beteiligten instruiert und die Freigabe der Fachperson respektiert, schützt den Boden – und die Beziehung zu Bauherrschaft und Landwirten.',
  sources: ['bafu-boden-bauen', 'kanton-boden', 'vbbo'],
};
