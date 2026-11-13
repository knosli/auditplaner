import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm3';

// ---------- Baustellenaufgaben ----------
export const M3_SITETASKS: SiteTask[] = [
  {
    id: 'm3-t1', moduleId: M, topic: 'm3-klassierung', level: 2, setting: 'Hochbau',
    title: 'Muldenkonzept erstellen',
    situation: 'Umbau eines Mehrfamilienhauses (fiktiv, Baujahr 1995, Schadstoffbericht ohne Befund). Rückbau von Küchen, Bädern und nichttragenden Wänden, danach Neuausbau. Vorplatz ca. 8 × 5 m, Kran auf der Hofseite.',
    data: ['Erwartete Abfälle: Mischabbruch (Backstein, Keramik), Gipsplatten, Holz, Metalle (Rohre, Profile), Kunststoffe/Verpackungen, Sanitärapparate', 'Sonderabfälle in kleinen Mengen: Farbreste, Silikonkartuschen, Spraydosen', 'Bauzeit 5 Monate, 3 Subunternehmer'],
    assignment: 'Erstellen Sie ein Muldenkonzept: Fraktionen, Behälter (Art/Grösse), Standorte, Abholrhythmus, Sonderabfall-Sammelstelle, Instruktion und Kontrolle, Nachweise.',
    rubric: [
      { id: 'k1', text: 'Fraktionen nach Art. 17 VVEA und Konzept (mineralisch, brennbar, Holz, Metall, ggf. Gips separat)', keywords: ['mineral', 'brennbar', 'holz', 'metall', 'gips'] },
      { id: 'k2', text: 'Behälter und Standorte passend zum Platz (Kleinmulden, Big Bags, Abruf)', keywords: ['big bag', 'mulde', 'abruf', 'standort', 'kran'] },
      { id: 'k3', text: 'Sonderabfall-Sammelstelle abschliessbar, gedeckt, Auffangwanne, beschriftet', keywords: ['sonderabfall', 'abschliess', 'wanne', 'beschrift'] },
      { id: 'k4', text: 'Beschriftung mit Bildern, Instruktion inkl. Subunternehmer, Kontrolle in der Begehung', keywords: ['bild', 'instru', 'sub', 'kontroll', 'begehung'] },
      { id: 'k5', text: 'Nachweise (Liefer-/Waagscheine, Begleitscheine) und Entsorgungsbilanz', keywords: ['nachweis', 'lieferschein', 'begleitschein', 'bilanz'] },
    ],
    solution: `| Fraktion | Behälter | Standort | Abholung | Hinweis |
|---|---|---|---|---|
| Mischabbruch (mineralisch) | Mulde 7 m³ | Vorplatz links | nach Abruf | keine Gipsplatten, kein Holz |
| Gipsplatten | Big Bag | Vorplatz, gedeckt | nach Abruf | Gips stört die Verwertung von Mischabbruch – separat (Annahmebedingungen des Entsorgers prüfen) |
| Holz | Mulde 5 m³ | Vorplatz rechts | wöchentlich | ohne Metallteile |
| Brennbares (Kunststoff, Verpackung) | Mulde 5 m³ mit Deckel | Hofseite am Kran | wöchentlich | – |
| Metall | Big Bag | Hofseite | nach Abruf | oft Erlös |
| Sanitärapparate | auf Palette | Hofseite | mit Mischabbruch oder separat | ggf. Wiederverwendung prüfen |
| Sonderabfälle | abschliessbarer Kasten mit Auffangwanne | Hofseite, gedeckt | nach Bedarf, mit Begleitschein | Farbreste, Kartuschen, Spraydosen getrennt in beschrifteten Gebinden |

Organisation: Schilder mit Bildern an jeder Mulde; Startinstruktion für alle Subunternehmer (Unterschrift); Muldenkontrolle in der Wochenbegehung mit Foto; Nachweise digital pro Baustelle; Mengen monatlich nachführen für die Entsorgungsbilanz.`,
    sources: ['vvea', 'veva'],
  },
  {
    id: 'm3-t2', moduleId: M, topic: 'm3-rueckbau', level: 3, setting: 'Hochbau',
    title: 'Schadstoffbericht lesen und umsetzen',
    situation: 'Gesamtsanierung eines Schulhauses (fiktiv, Baujahr 1966). Auszug aus dem Schadstoffbericht:',
    data: [
      'Asbest: Bodenbeläge (Vinyl) in 8 Schulzimmern inkl. schwarzem Kleber, ca. 560 m²; Faserzement-Fensterbänke, ca. 40 Stück',
      'PCB: Fugen zwischen Fassadenelementen, ca. 900 lfm, Gehalt über dem Wert für Sonderabfall',
      'PAK: Korkdämmung im Flachdach, ca. 300 m²',
      'Nicht untersucht: Technikräume im Untergeschoss (verschlossen), Hohlräume hinter Wandverkleidungen',
      'Geplanter Start der Entkernung: 1. Juli (Sommerferien)',
    ],
    assignment: 'Leiten Sie aus dem Bericht die Konsequenzen ab: Reihenfolge, Vergabe, Meldungen, Schutz der Mitarbeitenden, Entsorgung, offene Punkte.',
    rubric: [
      { id: 'k1', text: 'Asbest durch Suva-anerkannte Firma, Meldung an die Suva rechtzeitig (≥ 14 Tage)', keywords: ['suva', 'anerkannt', 'meld', '14'] },
      { id: 'k2', text: 'Reihenfolge: Sanierung (Asbest, PCB, PAK) vor Entkernung, Freigabe', keywords: ['vor', 'reihenfolge', 'freigabe', 'zuerst'] },
      { id: 'k3', text: 'Entsorgung als Sonderabfall mit Begleitscheinen, berechtigte Entsorger', keywords: ['sonderabfall', 'begleitschein', 'entsorger', 'bewilligung'] },
      { id: 'k4', text: 'Nicht untersuchte Bereiche vor Arbeitsbeginn abklären lassen', keywords: ['nicht untersucht', 'technikr', 'hohlr', 'nachuntersuch', 'ergänz'] },
      { id: 'k5', text: 'Instruktion aller Unternehmer, Kennzeichnung, Vorgehen bei Funden', keywords: ['instru', 'kennzeich', 'fund', 'stopp'] },
    ],
    solution: `**Reihenfolge und Termine**
1. Sofort: ergänzende Untersuchung der Technikräume und Hohlräume beauftragen (Bauherrschaft), damit die Sanierung vollständig geplant werden kann.
2. Vergabe Asbestsanierung an Suva-anerkannte Firma; Meldung an die Suva mindestens 14 Tage vor Beginn (laut Suva) – bei Start 1. Juli also spätestens Mitte Juni, besser früher.
3. PCB-Fugen und PAK-Korkdämmung durch geeignete Fachfirmen sanieren; Schutzkonzept.
4. Freigabe der sanierten Bereiche (bei Asbest gemäss EKAS 6503 bzw. Vorgaben der Suva).
5. Erst danach Entkernung und Rückbau.

**Entsorgung**: Alle drei Schadstoffe als Sonderabfälle mit Begleitschein an Entsorger mit Bewilligung für die Codes. Mengen im Entsorgungskonzept ergänzen.

**Mitarbeitende**: Bereiche kennzeichnen und absperren; alle Unternehmer vor Arbeitsbeginn instruieren (was ist wo, was ist verboten, Vorgehen bei Verdacht).

**Offene Punkte**: Termin kritisch – die Sanierung in acht Wochen Sommerferien ist ambitioniert; Bauherrschaft früh informieren. Lernpunkt: Der Bericht ist nur so gut wie seine Abdeckung – nicht untersuchte Bereiche sind Risiken, keine Freigaben.`,
    sources: ['ekas6503', 'suva-asbest', 'veva', 'vvea'],
  },
  {
    id: 'm3-t3', moduleId: M, topic: 'm3-mineralisch', level: 3, setting: 'Tiefbau',
    title: 'Entsorgungswege für eine Strassensanierung',
    situation: 'Sanierung einer Gemeindestrasse (fiktiv, Baujahr ca. 1970), 400 m lang, Werkleitungsersatz im Strassenkörper.',
    data: [
      'Belag: Deckschicht 3 cm (1995 erneuert), Tragschicht 8 cm (Originalbelag)',
      'PAK-Analyse der Bohrkerne: Deckschicht 40 mg/kg, Tragschicht 1 800 mg/kg',
      'Fundation: Kies, ca. 1 200 m³, optisch sauber',
      'Grabenaushub: ca. 900 m³, teils mit Ziegelresten',
      'Alte Wasserleitung: Grauguss',
    ],
    assignment: 'Legen Sie für jede Fraktion den Entsorgungsweg fest, begründen Sie ihn und nennen Sie Nachweise und Ausführungshinweise.',
    rubric: [
      { id: 'k1', text: 'Deckschicht ≤ 250 mg/kg → Verwertung als Rohstoff', keywords: ['deckschicht', 'verwert', '250'] },
      { id: 'k2', text: 'Tragschicht > 250 mg/kg → keine Verwertung, z. B. thermische Behandlung, mit Nachweis', keywords: ['tragschicht', 'nicht verwert', 'thermisch', '250'] },
      { id: 'k3', text: 'Schichtweise fräsen, nicht vermischen', keywords: ['schicht', 'getrennt', 'vermisch', 'separat'] },
      { id: 'k4', text: 'Fundation und Aushub: Verwertung prüfen, Ziegelreste → Triage/Analyse', keywords: ['fundation', 'aushub', 'ziegel', 'triage', 'analys'] },
      { id: 'k5', text: 'Metall verwerten; Nachweise je Fraktion', keywords: ['metall', 'guss', 'nachweis', 'waagschein'] },
    ],
    solution: `| Fraktion | Einstufung | Weg | Hinweise |
|---|---|---|---|
| Deckschicht | 40 mg PAK/kg (≤ 250) | Verwertung als Rohstoff im Belagswerk (Art. 20 VVEA) | zuerst separat abfräsen |
| Tragschicht | 1 800 mg PAK/kg (> 250) | keine Verwertung (seit 1.1.2026 auch keine Ausnahme mehr); Ablagerung auf Deponie Typ E bis 31.12.2027 zulässig, sonst z. B. thermische Behandlung – mit Nachweis, gemäss Kanton | separat fräsen und transportieren; Staub- und Dampfschutz (PAK) für Mitarbeitende |
| Kiesfundation | voraussichtlich unverschmutzt | Aufbereitung und Wiedereinbau bzw. Verwertung | Stichproben, falls Auffälligkeiten |
| Grabenaushub | Ziegelreste → Verdacht auf Fremdstoffe | Triage: sauberer Anteil verwerten, auffälliger Anteil beproben und nach Ergebnis entsorgen | nicht vermischen |
| Grauguss | Metall | Altmetall-Verwertung | Waagschein |

Nachweise: Analysen, Liefer-/Waagscheine je Fraktion, Entsorgungsbilanz. Übergangsfristen nach Art. 52 VVEA: Ausnahmeverwertung über 250 mg/kg endete am 31.12.2025, Ablagerung Typ E bzw. B bis 31.12.2027.`,
    sources: ['vvea', 'bafu-mineral'],
  },
  {
    id: 'm3-t4', moduleId: M, topic: 'm3-aushub', level: 3, setting: 'Tiefbau',
    title: 'Aushubkonzept für ein Garagenareal',
    situation: 'Neubau eines Gewerbegebäudes (fiktiv) auf dem Areal einer ehemaligen Autogarage mit Werkstatt und Tankstelle. Eintrag im Kataster der belasteten Standorte. Aushub ca. 6 000 m³, Grundwasser 1 m unter Baugrubensohle.',
    data: ['Voruntersuchung: Kohlenwasserstoffe im Bereich der ehemaligen Tanks und der Werkstattgrube', 'Restliches Areal: Auffüllungen mit Bauschutt, teilweise Schlacke', 'Platz für Zwischenlager: ca. 400 m² asphaltierte Fläche'],
    assignment: 'Skizzieren Sie die Organisation des Aushubs: Rollen, Triage, Zwischenlager, Wasser, Nachweise, Vorgehen bei Überraschungen.',
    rubric: [
      { id: 'k1', text: 'Altlastenbüro als Fachbegleitung, Abstimmung mit kantonaler Fachstelle', keywords: ['altlast', 'fachperson', 'fachstelle', 'begleit'] },
      { id: 'k2', text: 'Zonen/Triage mit Beprobung, Zuordnung je Ladung', keywords: ['zone', 'triage', 'beprob', 'ladung'] },
      { id: 'k3', text: 'Zwischenlager dicht, abgedeckt, getrennt nach Kategorie, Entwässerung', keywords: ['zwischenlager', 'abgedeckt', 'dicht', 'kategor'] },
      { id: 'k4', text: 'Baugrubenwasser fassen, behandeln, Einleitbewilligung', keywords: ['wasser', 'behandl', 'bewillig', 'ölabscheid', 'einleit'] },
      { id: 'k5', text: 'Nachweise je Ladung, kein Vermischen, Arbeitsschutz (Dämpfe)', keywords: ['nachweis', 'vermisch', 'dämpf', 'schutz', 'begleitschein'] },
    ],
    solution: `**Rollen**: Bauherrschaft beauftragt Altlastenbüro (Fachbegleitung, Einstufung); Unternehmer organisiert Aushub, Lager und Transporte; kantonale Fachstelle wird nach deren Vorgaben einbezogen.

**Triage**: Zonen nach Voruntersuchung (Tankbereich, Werkstattgrube, Auffüllungen, natürlicher Untergrund). Vor-Ort-Beurteilung durch Fachperson, ergänzende Analysen. Jede Ladung wird einer Kategorie und einem Entsorgungsweg zugeordnet (Lieferschein bzw. Begleitschein).

**Zwischenlager**: auf der asphaltierten Fläche getrennte Boxen je Kategorie, abgedeckt, Entwässerung gefasst (kein Abfluss in Meteorleitung).

**Wasser**: Baugrubenwasser im Tankbereich wahrscheinlich mit Kohlenwasserstoffen belastet – fassen, behandeln (z. B. Absetzen, Ölabscheidung, ggf. weitere Stufen), Einleitung nur mit Bewilligung (Modul 2).

**Arbeitsschutz**: Dämpfe im Tankbereich messen, Schutzmassnahmen.

**Überraschungen**: Unbekannte Tanks oder Fässer → stoppen, sperren, Fachperson und Feuerwehr bzw. Fachstelle nach Lage informieren.

**Nachweise**: Analysen, Ladungsprotokoll, Begleit-/Lieferscheine, Schlussbericht des Altlastenbüros.`,
    sources: ['vvea', 'altlv', 'bafu-aushub', 'gschg'],
  },
  {
    id: 'm3-t5', moduleId: M, topic: 'm3-kreislauf', level: 3, setting: 'Hochbau',
    title: 'Entsorgungsbilanz auswerten',
    situation: 'Abschluss eines Umbaus (fiktiv). Entsorgungskonzept und Ist-Mengen:',
    data: [
      'Betonabbruch: Konzept 300 t, Ist 280 t, Recyclingwerk',
      'Mischabbruch: Konzept 150 t, Ist 90 t, Recyclingwerk',
      'Gemischte Bauabfälle: Konzept 20 t, Ist 85 t, Sortieranlage',
      'Holz: Konzept 30 t, Ist 12 t, Verbrennung',
      'Asbest (Sonderabfall): Konzept 4 t, Ist 4 t – für 1 t fehlt der Begleitschein',
    ],
    assignment: 'Werten Sie die Bilanz aus: Was fällt auf, welche Ursachen vermuten Sie, was ist sofort zu tun und was ändern Sie für künftige Baustellen?',
    rubric: [
      { id: 'k1', text: 'Gemischte Bauabfälle stark über Konzept, Mischabbruch und Holz darunter → Trennung hat versagt', keywords: ['gemischt', 'trenn', 'mischabbruch', 'holz', 'abweich'] },
      { id: 'k2', text: 'Fehlender Begleitschein: sofort nachfordern bzw. Verbleib klären', keywords: ['begleitschein', 'fehlt', 'nachford', 'kläre'] },
      { id: 'k3', text: 'Ursachen: Platz, Instruktion, Subunternehmer, Kontrolle', keywords: ['ursach', 'instru', 'sub', 'kontroll', 'platz'] },
      { id: 'k4', text: 'Massnahmen: Muldenkonzept, Startinstruktion, monatliche Mengenkontrolle', keywords: ['muldenkonzept', 'monat', 'standard', 'startinstruk'] },
      { id: 'k5', text: 'Kosten benannt (Mischabfälle teurer)', keywords: ['kosten', 'teur', 'mehrkosten'] },
    ],
    solution: `**Auffälligkeiten**: Gemischte Bauabfälle 85 statt 20 t, gleichzeitig Mischabbruch (−60 t) und Holz (−18 t) unter Konzept → diese Fraktionen landeten offensichtlich in der Mischmulde. Für 1 t Asbest fehlt der Begleitschein.

**Sofort**: Verbleib der 1 t Asbest klären und Begleitschein beim Entsorger nachfordern; ohne Nachweis ist die korrekte Entsorgung nicht belegt (Pflicht nach VeVA).

**Ursachen (Hypothesen, im Gespräch prüfen)**: Mischmulde stand am bequemsten Ort; Subunternehmer nicht instruiert; keine Kontrolle; Mengen erst am Schluss angeschaut.

**Für künftige Baustellen**: Muldenkonzept im Installationsplan; Startinstruktion mit Unterschrift; Muldenkontrolle in der Wochenbegehung; monatliche Mengenkontrolle gegen Konzept; Begleitscheine bei Übergabe prüfen.

**Kosten**: Mischabfälle sind deutlich teurer als sortenreine Fraktionen – die Abweichung hat Geld gekostet.`,
    sources: ['vvea', 'veva'],
  },
];

// ---------- Praxisaufträge ----------
export const M3_TASKS: PracticeTask[] = [
  { id: 'm3-p1', moduleId: M, topic: 'm3-klassierung', title: 'Muldenkontrolle auf einer laufenden Baustelle',
    goal: 'Die Trennung auf einer laufenden Baustelle prüfen und mit dem Polier verbessern.',
    steps: ['Wählen Sie eine laufende Baustelle.', 'Fotografieren Sie alle Mulden und Behälter und beurteilen Sie den Inhalt (Fehlwürfe, Sonderabfälle).', 'Prüfen Sie Beschriftung, Standort und Sonderabfall-Sammelstelle.', 'Vereinbaren Sie mit dem Polier zwei bis drei Verbesserungen und kontrollieren Sie sie nach einer Woche.'],
    deliverable: 'Kurzprotokoll mit Fotos, Mängeln, vereinbarten Massnahmen und Nachkontrolle.',
    criteria: ['Alle Behälter beurteilt', 'Sonderabfälle geprüft', 'Massnahmen vereinbart', 'Nachkontrolle durchgeführt'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm3-p2', moduleId: M, topic: 'm3-rueckbau', title: 'Schadstoffbericht mit der Bauleitung durchgehen',
    goal: 'Einen realen Schadstoffbericht lesen und die Konsequenzen für die Baustelle ableiten.',
    steps: ['Beschaffen Sie den Schadstoffbericht eines Umbau- oder Rückbauprojekts.', 'Erstellen Sie eine Liste: Schadstoff – Bauteil – Menge – Massnahme – Zuständig.', 'Markieren Sie die nicht untersuchten Bereiche und klären Sie das Vorgehen.', 'Prüfen Sie, ob alle Subunternehmer instruiert sind.'],
    deliverable: 'Massnahmenliste aus dem Schadstoffbericht und Instruktionsnachweis.',
    criteria: ['Alle Befunde erfasst', 'Nicht untersuchte Bereiche benannt', 'Reihenfolge und Zuständigkeiten klar', 'Instruktion geprüft'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm3-p3', moduleId: M, topic: 'm3-mineralisch', title: 'Verwertungswege im Einzugsgebiet erfassen',
    goal: 'Die Verwertungs- und Entsorgungsanlagen in Ihrer Region mit Annahmebedingungen kennen.',
    steps: ['Erfassen Sie die Recyclingwerke, Belagswerke, Sortieranlagen und Deponien im Einzugsgebiet Ihrer Baustellen.', 'Notieren Sie je Anlage die angenommenen Materialien und Bedingungen (z. B. Analysen, Störstoffe).', 'Vergleichen Sie Preise sortenrein vs. gemischt (soweit zugänglich).', 'Stellen Sie die Liste dem Einkauf und den Bauführern zur Verfügung.'],
    deliverable: 'Übersicht der Anlagen mit Annahmebedingungen.',
    criteria: ['Anlagen vollständig', 'Bedingungen erfasst', 'Preisvergleich', 'Verteilt'], confirmer: 'Leitung Einkauf oder Bauführer/in' },
  { id: 'm3-p4', moduleId: M, topic: 'm3-aushub', title: 'Kataster-Check für kommende Projekte',
    goal: 'Für kommende Projekte prüfen, ob belastete Standorte betroffen sind.',
    steps: ['Prüfen Sie für zwei bis drei kommende Projekte den Kataster der belasteten Standorte auf dem kantonalen Geoportal.', 'Klären Sie frühere Nutzungen (Pläne, Ortskenntnis).', 'Prüfen Sie, ob Untersuchungen vorliegen und ob der Vertrag das Risiko «verschmutzter Aushub» regelt.', 'Melden Sie das Ergebnis der Projektleitung.'],
    deliverable: 'Kurzbericht je Projekt mit Kataster-Auszug, Risikoeinschätzung und Empfehlung.',
    criteria: ['Kataster geprüft', 'Frühere Nutzung geklärt', 'Vertrag geprüft', 'Empfehlung gemeldet'], confirmer: 'Projektleiter/in' },
  { id: 'm3-p5', moduleId: M, topic: 'm3-kreislauf', title: 'Entsorgungsbilanz einer abgeschlossenen Baustelle',
    goal: 'Eine Entsorgungsbilanz erstellen und Kennzahlen ableiten.',
    steps: ['Sammeln Sie die Nachweise einer abgeschlossenen Baustelle.', 'Erstellen Sie die Bilanz je Fraktion (Menge, Weg, Abweichung zum Konzept).', 'Berechnen Sie Verwertungsquote (ohne und mit Aushub) und Mischabfallanteil.', 'Leiten Sie zwei Verbesserungen ab und besprechen Sie sie mit der Bauführung.'],
    deliverable: 'Entsorgungsbilanz mit Kennzahlen und Verbesserungen.',
    criteria: ['Nachweise vollständig', 'Kennzahlen getrennt nach Fraktionen', 'Abweichungen erklärt', 'Verbesserungen besprochen'], confirmer: 'Bauführer/in oder Leitung Qualität/Umwelt' },
];

// ---------- Feynman ----------
export const M3_FEYNMAN: FeynmanTask[] = [
  { id: 'm3-f1', moduleId: M, topic: 'm3-kreislauf', audience: 'Geschäftsleitung eines Bauunternehmens',
    prompt: 'Erklären Sie der Geschäftsleitung in 6–8 Sätzen, warum sich konsequente Abfalltrennung und Nachweisführung für das Unternehmen lohnen.',
    rubric: [
      { id: 'f1', text: 'Rechtliche Pflicht (Trennung, Sonderabfälle, Nachweise)', keywords: ['pflicht', 'vvea', 'trenn', 'nachweis', 'gesetz'] },
      { id: 'f2', text: 'Kosten: gemischte Abfälle teurer, Sonderabfall in Mischmulde', keywords: ['kosten', 'teur', 'gemischt', 'sparen'] },
      { id: 'f3', text: 'Wettbewerb: Bauherrschaften und Beschaffung verlangen Bilanzen/Quoten', keywords: ['bauherr', 'vergabe', 'beschaff', 'wettbewerb', 'quote'] },
      { id: 'f4', text: 'Risiko: Kontrollen, Strafen, Reputation', keywords: ['risiko', 'kontroll', 'straf', 'reputation', 'busse'] },
      { id: 'f5', text: 'Verständlich für Führungskräfte, mit konkretem Vorschlag', keywords: [] },
    ] },
  { id: 'm3-f2', moduleId: M, topic: 'm3-rueckbau', audience: 'Lernender im ersten Lehrjahr',
    prompt: 'Erklären Sie einem Lernenden in 5–7 Sätzen, warum er in alten Gebäuden nicht einfach bohren oder schleifen darf und was er tun soll, wenn er etwas Verdächtiges findet.',
    rubric: [
      { id: 'f1', text: 'Schadstoffe in alten Gebäuden (Asbest vor 1990, PCB, PAK)', keywords: ['asbest', '1990', 'pcb', 'alt'] },
      { id: 'f2', text: 'Gefahr: Fasern/Staub beim Bohren und Schleifen', keywords: ['faser', 'staub', 'bohr', 'schleif', 'lunge'] },
      { id: 'f3', text: 'Stoppen, nicht anfassen, Bereich verlassen', keywords: ['stopp', 'aufhör', 'nicht', 'verlass'] },
      { id: 'f4', text: 'Sofort Polier/Vorgesetzten informieren', keywords: ['polier', 'chef', 'vorgesetzt', 'melden', 'sagen'] },
      { id: 'f5', text: 'Einfache Sprache, ohne Panik', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M3_CARDS: Card[] = [
  { id: 'm3-c01', moduleId: M, topic: 'm3-klassierung', level: 1, front: 'Grundsätze der Abfallwirtschaft?', back: '**Vermeiden – verwerten – umweltverträglich entsorgen** (Art. 30 USG sinngemäss).', sources: ['usg'] },
  { id: 'm3-c02', moduleId: M, topic: 'm3-klassierung', level: 1, front: 'Trennpflicht auf der Baustelle (Art. 17 VVEA)?', back: 'Sonderabfälle getrennt; übrige Bauabfälle **auf der Baustelle** trennen. In Anlagen nur, wenn auf der Baustelle **betrieblich nicht möglich**.', sources: ['vvea'] },
  { id: 'm3-c03', moduleId: M, topic: 'm3-klassierung', level: 1, front: 'Wann braucht es einen Begleitschein?', back: 'Für die Übergabe von **Sonderabfällen** an ein berechtigtes Entsorgungsunternehmen (VeVA).', sources: ['veva'] },
  { id: 'm3-c04', moduleId: M, topic: 'm3-klassierung', level: 2, front: 'Deponietypen A–E (grob)?', back: '**A** unverschmutzter Aushub · **B** Inertstoffe (mineralisch, Grenz-/Eluatwerte eingehalten) · **C** bestimmte anorganische Abfälle · **D** Verbrennungsrückstände · **E** stärker belastete Abfälle.', sources: ['vvea'] },
  { id: 'm3-c05', moduleId: M, topic: 'm3-rueckbau', level: 1, front: 'Seit wann ist Asbest in der Schweiz verboten?', back: 'Seit **1990** (Übergangsfristen für einzelne Produkte).', sources: ['suva-asbest'] },
  { id: 'm3-c06', moduleId: M, topic: 'm3-rueckbau', level: 2, front: 'Wer darf Asbest mit erheblicher Faserfreisetzung entfernen?', back: 'Nur **Suva-anerkannte** Asbestsanierungsunternehmen (Art. 82 BauAV); Meldung an die Suva **≥ 14 Tage** vor Beginn. Nicht jede Tätigkeit an Asbest fällt darunter – EKAS 6503.', sources: ['suva-asbest'] },
  { id: 'm3-c07', moduleId: M, topic: 'm3-rueckbau', level: 1, front: 'Typische Bauschadstoffe und Fundorte?', back: '**Asbest**: Faserzement, Beläge, Kleber · **PCB**: Fugen (1950–70er), Anstriche · **PAK**: Teerbeläge, Dachpappe, Kork · **Blei**: Farben, Rohre.', sources: ['bafu-bauabfaelle'] },
  { id: 'm3-c08', moduleId: M, topic: 'm3-rueckbau', level: 2, front: 'Reihenfolge eines geordneten Rückbaus?', back: 'Schadstoffe ermitteln → Entsorgungskonzept → **Sanierung** → Entkernung → Tragstruktur → Nachweise.', sources: ['vvea', 'ekas6503'] },
  { id: 'm3-c09', moduleId: M, topic: 'm3-rueckbau', level: 1, front: 'Unerwarteter Fund – was tun?', back: '**Stopp – sperren – melden – beproben – entscheiden.**', sources: ['suva-asbest'] },
  { id: 'm3-c10', moduleId: M, topic: 'm3-mineralisch', level: 1, front: 'Ausbauasphalt: PAK-Grenze für Verwertung?', back: '**≤ 250 mg PAK/kg**: möglichst vollständig verwerten. **> 250 mg/kg**: nicht verwerten (Art. 20 VVEA). Übergang (Art. 52): Ausnahmeverwertung bis 31.12.2025; Deponie Typ E bzw. B bis 31.12.2027.', sources: ['vvea'] },
  { id: 'm3-c11', moduleId: M, topic: 'm3-mineralisch', level: 2, front: 'Was bestimmt die Qualität von Recyclinggranulat?', back: 'Ein **sortenreiner, schadstofffreier** Rückbau (Schadstoffe saniert, entkernt, Beton getrennt von Mauerwerk).', sources: ['bafu-mineral'] },
  { id: 'm3-c12', moduleId: M, topic: 'm3-mineralisch', level: 2, front: 'Senkt Recyclingbeton das CO₂ stark?', back: '**Nur begrenzt**: Er spart Kies und Deponieraum; CO₂ kommt vor allem vom **Zement**.', sources: ['praxis'] },
  { id: 'm3-c13', moduleId: M, topic: 'm3-aushub', level: 1, front: 'Unverschmutzter Aushub (Art. 19 VVEA)?', back: '**Möglichst vollständig verwerten** – als Baustoff, für Geländeanpassungen, Auffüllungen von Materialentnahmestellen.', sources: ['vvea'] },
  { id: 'm3-c14', moduleId: M, topic: 'm3-aushub', level: 1, front: 'Hinweise auf verschmutzten Aushub?', back: '**Kataster**, frühere Nutzung (Garage, Tankstelle), **Geruch**, **Verfärbung**, **Fremdstoffe** (Schlacke, Asche, Bauschutt).', sources: ['altlv'] },
  { id: 'm3-c15', moduleId: M, topic: 'm3-aushub', level: 2, front: 'Darf man belasteten und sauberen Aushub mischen?', back: '**Nein** – Vermischen, um Grenzwerte zu unterschreiten, ist unzulässig.', sources: ['vvea'] },
  { id: 'm3-c16', moduleId: M, topic: 'm3-kreislauf', level: 1, front: 'Abfallhierarchie?', back: 'Vermeiden → **wiederverwenden** → verwerten → energetisch nutzen → ablagern.', sources: ['usg'] },
  { id: 'm3-c17', moduleId: M, topic: 'm3-kreislauf', level: 2, front: 'Inhalt einer Entsorgungsbilanz?', back: 'Je Fraktion **Ist-Menge**, Empfänger, Weg, **Abweichung zum Konzept**; Grundlage für Kennzahlen.', sources: ['veva'] },
  { id: 'm3-c18', moduleId: M, topic: 'm3-kreislauf', level: 2, front: 'Stand USG-Revision Kreislaufwirtschaft?', back: 'Pa.Iv. 20.433 – verabschiedet März 2024, **grösstenteils in Kraft seit 1.1.2025**; Verordnungen werden gestaffelt angepasst.', sources: ['usg-kreislauf'] },
];

// ---------- Baustellensimulation ----------
export const M3_SCENARIO: Scenario = {
  id: 'sim-g', code: 'G', moduleId: M, status: 'verfuegbar', rev: 4,
  title: 'Verdächtige Platten beim Rückbau',
  setting: 'Rückbau', level: 3, minutes: 15,
  topics: ['m3-rueckbau', 'm3-klassierung', 'm3-kreislauf'],
  intro: 'Rückbau einer Gewerbehalle aus dem Jahr 1978 in einer Industriezone. Der Schadstoffbericht hat Asbest in den Fassadenplatten festgestellt; diese wurden von einer anerkannten Firma entfernt, die Freigabe liegt vor. Heute beginnt die Entkernung des Bürotrakts. Um 9.15 Uhr ruft der Vorarbeiter an: «Hinter der Holzverkleidung im Büro sind graue Platten. Die Jungs reissen die gerade raus.»',
  facts: [
    'Der Schadstoffbericht nennt den Bürotrakt als «teilweise nicht zugänglich (Verkleidungen nicht geöffnet)».',
    'Im Bürotrakt arbeiten drei Mitarbeitende eines Abbruch-Subunternehmers ohne Atemschutz.',
    'Vor dem Gebäude stehen eine Mulde für Holz und eine für Mischabbruch.',
    'Der Abbruch der Tragstruktur ist in zehn Tagen geplant.',
  ],
  stages: [
    {
      id: 'g1', title: 'Der Anruf', type: 'single', criteria: ['risiko', 'prioritaet'],
      situation: 'Sie sind 20 Minuten von der Baustelle entfernt.',
      prompt: 'Was sagen Sie dem Vorarbeiter am Telefon?',
      options: [
        { id: 'o1', points: 2, text: 'Sofort aufhören, nichts mehr anfassen, die Leute aus dem Raum, Türen schliessen, Raum sperren. Bereits ausgebaute Platten liegen lassen. Ich komme und informiere die Bauleitung.', feedback: 'Richtig: Exposition sofort beenden, Verschleppung verhindern, Verantwortliche informieren.' },
        { id: 'o2', points: 0, critical: true, text: 'Fertig ausbauen, aber vorsichtig – die Platten in die Mischmulde, dann ist das erledigt.', feedback: 'Kritischer Fehler: Möglicherweise asbesthaltiges Material wird weiter bearbeitet und mit anderen Abfällen vermischt.', consequence: 'Die Mischmulde wird später positiv auf Asbest getestet und muss vollständig als Sonderabfall entsorgt werden; die drei Mitarbeitenden müssen arbeitsmedizinisch erfasst werden.' },
        { id: 'o3', points: 0, critical: true, text: 'Masken anziehen und weiterarbeiten, bis ich da bin.', feedback: 'Kritischer Fehler: Bei Asbestverdacht wird die Arbeit sofort eingestellt. Einfache Staubmasken schützen nicht ausreichend, und jedes weitere Brechen setzt Fasern frei und verschleppt sie.', consequence: 'In den 20 Minuten bis zu Ihrer Ankunft werden weitere Platten herausgebrochen; der kontaminierte Bereich und die Zahl der exponierten Personen wachsen.' },
      ],
    },
    {
      id: 'g2', title: 'Was klären Sie vor Ort?', type: 'ask', criteria: ['unsicherheit', 'risiko'], pick: 3,
      situation: 'Sie sind auf der Baustelle. Der Raum ist gesperrt.',
      prompt: 'Welche drei Informationen holen Sie zuerst?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Was sagt der Schadstoffbericht genau zum Bürotrakt?', reveal: '«Wandverkleidungen nicht geöffnet. Asbesthaltige Platten hinter Verkleidungen können nicht ausgeschlossen werden. Ergänzende Untersuchung vor Rückbau empfohlen.»', feedback: 'Zentral: Die Empfehlung wurde offenbar nicht umgesetzt.' },
        { id: 'u2', points: 2, relevant: true, text: 'Wie viel wurde ausgebaut, wie (Brechen, Schneiden?), und wohin kam das Material?', reveal: 'Ca. 6 Platten herausgebrochen, Bruchstücke auf dem Boden; zwei Platten bereits in der Mischmulde.', feedback: 'Zentral: Bestimmt den Umfang der Kontamination und der Entsorgung.' },
        { id: 'u3', points: 2, relevant: true, text: 'Wer war wie lange im Raum, mit welcher Schutzausrüstung?', reveal: 'Drei Personen, ca. 45 Minuten, ohne Atemschutz.', feedback: 'Zentral: Grundlage für Information und arbeitsmedizinische Abklärung.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wie viel kostet die Mulde?', reveal: '—', feedback: 'Jetzt nicht relevant.' },
        { id: 'u5', points: 0, relevant: false, text: 'Wann ist die Bauabnahme?', reveal: '—', feedback: 'Nicht relevant für die Sofortmassnahmen.' },
      ],
    },
    {
      id: 'g3', title: 'Massnahmen', type: 'multi', criteria: ['fachlich', 'recht', 'risiko'],
      situation: 'Eine Fachperson kann heute Nachmittag Proben nehmen; das Ergebnis liegt in 24 Stunden vor.',
      prompt: 'Was veranlassen Sie? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Raum gesperrt lassen, Zutritt verbieten, Kennzeichnung', feedback: 'Richtig.' },
        { id: 'm2', points: 2, text: 'Mischmulde sperren und abdecken, bis das Ergebnis vorliegt; nicht abtransportieren', feedback: 'Richtig: Sonst gelangt möglicherweise Asbest in eine Sortieranlage.' },
        { id: 'm3', points: 2, text: 'Proben der Platten (und ggf. Staub) durch Fachperson', feedback: 'Richtig.' },
        { id: 'm4', points: 2, text: 'Bauherrschaft, Bauleitung und Subunternehmer informieren; die drei Mitarbeitenden informieren und Exposition dokumentieren', feedback: 'Richtig: Transparenz und Grundlage für arbeitsmedizinische Abklärung.' },
        { id: 'm5', points: 0, critical: true, text: 'Bruchstücke schnell zusammenwischen und in Säcke geben, damit es ordentlich aussieht', feedback: 'Kritischer Fehler: Trockenes Wischen wirbelt Fasern auf; Reinigung gehört bei positivem Befund zur Sanierung durch eine anerkannte Firma.', consequence: 'Faserkonzentration im Raum steigt; die Kontamination breitet sich in den Gang aus.' },
        { id: 'm6', points: 0, text: 'In den übrigen Räumen des Bürotrakts mit der Entkernung weiterfahren', feedback: 'Falsch: Dort sind die Verkleidungen ebenfalls nicht untersucht – gleiche Gefahr.' },
      ],
    },
    {
      id: 'g4', title: 'Das Ergebnis', type: 'single', criteria: ['recht', 'zusammenarbeit'],
      situation: 'Das Labor bestätigt: Die Platten enthalten Asbest (Chrysotil). Der Subunternehmer bietet an, die restlichen Platten «mit Schutzanzügen selbst rauszunehmen – wir haben das schon oft gemacht».',
      prompt: 'Wie entscheiden Sie?',
      options: [
        { id: 'r1', points: 0, critical: true, text: 'Annehmen – er hat Erfahrung, und es spart Zeit.', feedback: 'Kritischer Fehler: Das Herausbrechen von Platten und die Reinigung eines kontaminierten Raums sind typischerweise Arbeiten mit erheblicher Faserfreisetzung – sie dürfen nur Suva-anerkannte Asbestsanierungsunternehmen ausführen (Art. 82 BauAV, laut Suva). Ohne Einstufung durch die Fachperson, Anerkennung und Meldung ist das Risiko nicht tragbar.', consequence: 'Bei einer Suva-Kontrolle werden die Arbeiten gestoppt.' },
        { id: 'r2', points: 2, text: 'Die Fachperson beurteilt Tätigkeit und Ausmass; für das Entfernen der Platten und die Reinigung des kontaminierten Raums und der Mulde eine Suva-anerkannte Firma beauftragen und der Suva melden; Freigabe nach der Sanierung; ergänzende Untersuchung des ganzen Bürotrakts; Terminplan anpassen.', feedback: 'Richtig: Einstufung, Sanierung, Freigabe und Untersuchung werden getrennt und vollständig geregelt; die ergänzende Untersuchung verhindert den nächsten Fund.' },
        { id: 'r3', points: 1, text: 'Anerkannte Firma nur für den einen Raum beauftragen, den Rest des Bürotrakts normal rückbauen.', feedback: 'Teilweise: Der betroffene Raum ist geregelt, aber die übrigen Verkleidungen sind weiterhin nicht untersucht.' },
      ],
    },
    {
      id: 'g5', title: 'Reihenfolge', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Sie planen die nächsten Schritte bis zum Abbruch der Tragstruktur.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Ergänzende Schadstoffuntersuchung des gesamten Bürotrakts' },
        { id: 'n2', text: 'Meldung an die Suva und Sanierung durch anerkannte Firma' },
        { id: 'n3', text: 'Freigabe nach Sanierung' },
        { id: 'n4', text: 'Entkernung des Bürotrakts' },
        { id: 'n5', text: 'Abbruch der Tragstruktur' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1', 'n2'], ['n3'], ['n4'], ['n5']],
      rankEarly: [{ id: 'n3', maxPos: 3, why: 'Ohne Freigabe nach der Sanierung dürfen Entkernung und Abbruch im betroffenen Bereich nicht weitergehen.' }],
      rankExplanation: 'Untersuchung und Sanierungsvorbereitung (Vergabe, Meldung an die Suva) können parallel laufen. Erst nach der Freigabe folgen Entkernung und Abbruch – Schadstoffe immer zuerst.',
    },
    {
      id: 'g6', title: 'Ursachen und Lehren', type: 'justify', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Die Geschäftsleitung fragt, wie es dazu kommen konnte und was sich ändern muss.',
      prompt: 'Schreiben Sie 5–7 Sätze: Ursache, Folgen, Sofortmassnahmen, Änderungen im Unternehmen.',
      rubric: [
        { id: 'b1', text: 'Ursache: Empfehlung des Berichts (nicht untersuchte Bereiche) nicht umgesetzt', keywords: ['nicht untersucht', 'empfehlung', 'bericht', 'ergänz'] },
        { id: 'b2', text: 'Folgen: Exposition von Mitarbeitenden, Sonderabfall, Verzug, Kosten', keywords: ['exposition', 'mitarbeit', 'sonderabfall', 'verzug', 'kosten'] },
        { id: 'b3', text: 'Sofortmassnahmen: Stopp, Sperrung, Proben, anerkannte Firma, Suva', keywords: ['stopp', 'sperr', 'probe', 'suva', 'anerkannt'] },
        { id: 'b4', text: 'Änderung: Bericht vor Start mit Bauleitung prüfen, nicht untersuchte Bereiche als Stopp-Punkt, Instruktion Subunternehmer', keywords: ['prüf', 'stopp-punkt', 'checkliste', 'instru', 'sub'] },
        { id: 'b5', text: 'Arbeitsmedizinische Abklärung bzw. Information der Betroffenen erwähnt', keywords: ['arbeitsmedizin', 'arzt', 'betroffen', 'gesundheit'] },
      ],
    },
  ],
  debrief: 'Die meisten Asbestfunde beim Rückbau sind keine «Überraschungen», sondern stehen als Lücke im Schadstoffbericht. Wer die nicht untersuchten Bereiche vor dem Start abklären lässt, vermeidet Exposition, Sonderabfall und Verzug. Bei einem Fund gilt immer: stoppen, sperren, melden, beproben – und die Sanierung nur durch eine anerkannte Firma.',
  sources: ['ekas6503', 'suva-asbest', 'vvea', 'veva'],
};
