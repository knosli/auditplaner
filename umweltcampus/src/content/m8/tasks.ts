import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm8';

// ---------- Baustellenaufgaben (fiktive Projektdaten) ----------
export const M8_SITETASKS: SiteTask[] = [
  {
    id: 'm8-t1', moduleId: M, topic: 'm8-grundlagen', level: 2, setting: 'Hochbau',
    title: 'Auflagenliste für einen Wohnbau',
    situation: 'Mehrfamilienhaus mit Tiefgarage (fiktiv), 24 Wohnungen, Baustart in fünf Wochen. Sie erhalten Bewilligung, Pläne und Werkvertrag.',
    data: [
      'Bewilligung Ziff. 3.2: «Für die Wasserhaltung ist vor Baubeginn eine Bewilligung des kantonalen Amts einzuholen.»',
      'Bewilligung Ziff. 5.1: «Massnahmenstufe B gemäss BAFU-Richtlinie Luftreinhaltung auf Baustellen.»',
      'Bewilligung Ziff. 6.4: «Das Merkblatt Baustellenentwässerung des Kantons ist einzuhalten.»',
      'Geoportal: Gewässerschutzbereich Au; Kataster der belasteten Standorte: Nachbarparzelle eingetragen (ehemalige Werkstatt)',
      'Baugrundbericht: Grundwasser ca. 2 m über Baugrubensohle',
      'Im Ordner keine Wasserhaltungsbewilligung, kein Entwässerungskonzept',
    ],
    assignment: 'Erstellen Sie eine Auflagenliste (Anforderung, Quelle, Rechtsnatur, nächster Schritt) und nennen Sie die Lücken, die Sie vor Baustart melden.',
    rubric: [
      { id: 'k1', text: 'Wasserhaltungsbewilligung fehlt → schriftlich melden, Arbeiten unter GW-Spiegel nicht vor Bewilligung', keywords: ['wasserhaltung', 'bewilligung', 'fehlt', 'grundwasser', 'melden'] },
      { id: 'k2', text: 'Stufe B Luft: Maschinenliste, Massnahmen, ins LV/Massnahmenplan', keywords: ['stufe b', 'luft', 'maschinen', 'partikelfilter'] },
      { id: 'k3', text: 'Merkblatt durch Verweis verbindlich; Entwässerungskonzept erstellen', keywords: ['merkblatt', 'verbindlich', 'entwässerungskonzept'] },
      { id: 'k4', text: 'Kataster-Nachbarparzelle: Verdacht abklären, Zwischenlager/Triage einplanen', keywords: ['kataster', 'belastet', 'zwischenlager', 'abklär', 'verdacht'] },
      { id: 'k5', text: 'Rechtsnatur je Anforderung korrekt', keywords: ['auflage', 'gesetz', 'vollzugshilfe', 'rechtsnatur'] },
    ],
    solution: `| Anforderung | Quelle | Rechtsnatur | Nächster Schritt |
|---|---|---|---|
| Bewilligung Wasserhaltung | Ziff. 3.2; GSchG (Au, Grundwasser) | Behördliche Auflage, gesetzliche Grundlage | **Fehlt** – schriftlich an Bauleitung; Aushub unter GW-Spiegel erst nach Bewilligung |
| Massnahmenstufe B Luft | Ziff. 5.1; BAFU-Richtlinie | Auflage (Vollzugshilfe durch Verweis verbindlich) | Maschinenliste mit Filternachweisen (LRV), Massnahmen in Massnahmenplan, im LV prüfen |
| Merkblatt Baustellenentwässerung | Ziff. 6.4 | Auflage (Merkblatt durch Verweis verbindlich) | Merkblatt beschaffen; Entwässerungskonzept **fehlt** – erstellen und mit Gemeinde abstimmen |
| Belastete Nachbarparzelle | Kataster belasteter Standorte | Hinweis, löst Abklärung aus | Mit Bauleitung klären, ob Untersuchung nötig; Zwischenlager für verdächtigen Aushub einplanen |
| Verunreinigungsverbot | GSchG | Gesetz | gilt immer; Schächte nach Kanalisationskataster markieren |

**Lücken, schriftlich vor Baustart**: Wasserhaltungsbewilligung, Entwässerungskonzept, Klärung Belastungsverdacht. Sie legen keine Auflage selbst aus und ersetzen keine Fachperson (Hydrogeologie, Altlasten).`,
    sources: ['gschg', 'bafu-luft', 'lrv', 'kanton-merkblatt', 'altlv'],
  },
  {
    id: 'm8-t2', moduleId: M, topic: 'm8-vertrag', level: 2, setting: 'Tiefbau',
    title: 'Offerte auf Umweltlücken prüfen',
    situation: 'Ausschreibung einer Gemeinde (fiktiv): Ersatz einer Wasserleitung und Belagssanierung über 800 m im Wohnquartier. Eingabe in zehn Tagen, Fragerunde bis in drei Tagen.',
    data: [
      'LV-Position «Belag abbrechen und entsorgen, pauschal»; keine Angaben zum PAK-Gehalt',
      'Besondere Bestimmungen: «Die Auflagen der Bewilligung sind einzuhalten.» Bewilligung liegt bei, verlangt Baulärm-Massnahmenstufe B und Information der Anwohnenden',
      'Keine LV-Positionen für Lärmschutz oder Information',
      'Zuschlagskriterien: Preis 60 %, Termine 20 %, Nachhaltigkeit (Transporte, Maschinen) 20 %',
    ],
    assignment: 'Welche Fragen stellen Sie in der Fragerunde, welche Vorbehalte wären allenfalls nötig, und was offerieren Sie beim Kriterium Nachhaltigkeit?',
    rubric: [
      { id: 'k1', text: 'Frage zur PAK-Analyse bzw. Entsorgung nach Klassen (Einheitspreise)', keywords: ['pak', 'analyse', 'klasse', 'einheitspreis', 'bohrkern'] },
      { id: 'k2', text: 'Frage zur Abgeltung Lärmschutz Stufe B und Information', keywords: ['lärm', 'stufe b', 'information', 'abgelt', 'position'] },
      { id: 'k3', text: 'Fragen vor Vorbehalten; Vorbehalte konkret', keywords: ['fragerunde', 'vorbehalt', 'konkret'] },
      { id: 'k4', text: 'Nachhaltigkeit: nur Leistbares, mit Nachweis', keywords: ['nachweis', 'maschinen', 'filter', 'transport', 'leist'] },
    ],
    solution: `**Fragen in der Fragerunde**
1. Liegen PAK-Analysen des Belags vor? Wenn nein: Kann die Position in Einheitspreise je Klasse (unter/über 250 mg PAK/kg bzw. gemäss VVEA) aufgeteilt werden?
2. Wie sind Massnahmenstufe B Lärm (z. B. lärmarme Verfahren, Abschirmungen, Zeitfenster) und die Information der Anwohnenden abzugelten?
3. Gibt es Vorgaben zu Arbeitszeiten oder Transportrouten?

**Vorbehalte** nur, wenn die Fragen nicht beantwortet werden – und dann konkret: «Preis gilt für Ausbauasphalt unter 250 mg PAK/kg; bei höherem Gehalt Nachtrag nach Analyse.» Bei öffentlichen Vergaben können Vorbehalte zum Ausschluss führen; deshalb zuerst fragen.

**Nachhaltigkeit**: nur offerieren, was die Baustelle leisten kann, mit Nachweis – z. B. Maschinenliste mit Partikelfiltern (LRV), Anteil Verwertung des Ausbauasphalts, Transportkonzept mit vollen Fahrten. Das Angebot wird Vertragsbestandteil.`,
    sources: ['vvea', 'bafu-baulaerm', 'boeb', 'lrv'],
  },
  {
    id: 'm8-t3', moduleId: M, topic: 'm8-installation', level: 2, setting: 'Hochbau',
    title: 'Installationsplan prüfen',
    situation: 'Schulhaus-Neubau (fiktiv) am Dorfrand. Der Polier legt den Installationsplan für die Rohbauphase vor.',
    data: [
      'Tankcontainer neben dem Strassenschacht an der Zufahrt (laut Kanalisationskataster: Meteor)',
      'Waschplatz in der Ecke beim Bach, am tiefsten Punkt des Areals',
      'Mulden und Kompressor an der Grenze zur Wohnüberbauung; Bürocontainer an der ruhigen Ostseite',
      'Bodendepot auf der Fläche des späteren Pausenplatzes; Zufahrt über die Wiese ohne Piste',
      'Massnahmenstufe A Luft, B Lärm',
    ],
    assignment: 'Nennen Sie die Mängel, schlagen Sie eine bessere Anordnung vor und begründen Sie sie in je einem Satz.',
    rubric: [
      { id: 'k1', text: 'Tankcontainer weg vom Meteorschacht, auf Wanne/befestigter Fläche', keywords: ['tank', 'meteor', 'wanne', 'befestigt', 'abstand'] },
      { id: 'k2', text: 'Waschplatz weg vom Bach, gefasst, Absetzen/Neutralisieren', keywords: ['waschplatz', 'bach', 'absetz', 'neutralis', 'gefasst'] },
      { id: 'k3', text: 'Lärmquellen weg von Wohnungen, Abschirmung', keywords: ['lärm', 'kompressor', 'mulde', 'wohn', 'abschirm'] },
      { id: 'k4', text: 'Bodendepot nicht auf späterer Nutzfläche; Zufahrt als Piste', keywords: ['depot', 'piste', 'zufahrt', 'boden', 'pausenplatz'] },
      { id: 'k5', text: 'Begründung über Quelle–Weg–Schutzgut', keywords: ['quelle', 'weg', 'schutzgut', 'risiko'] },
    ],
    solution: `- **Tankcontainer**: weg vom Meteorschacht auf eine befestigte Fläche mit Auffangwanne, Ölbindemittel daneben; Meteorschacht im Plan rot markieren. *Ein Tropfverlust ginge sonst direkt in den Bach.*
- **Waschplatz**: auf befestigte, gefasste Fläche mit Abstand zum Bach, Absetzbecken und Neutralisation, Ableitung gemäss Entwässerungskonzept. *Am tiefsten Punkt beim Bach führt jeder Überlauf ins Gewässer.*
- **Mulden und Kompressor**: auf die Ostseite, Bürocontainer als Abschirmung zur Wohnüberbauung. *Lärmquellen gehören weg von empfindlichen Nutzungen (Stufe B Lärm).*
- **Bodendepot**: ausserhalb späterer Bau- und Verkehrsflächen, getrennt Ober-/Unterboden. *Sonst muss es mehrfach umgelagert werden.*
- **Zufahrt**: auf der späteren Zufahrtsfläche als Kiespiste auf Vlies; Reinigung vor der Strasse. *Schützt Boden und Strasse.*`,
    sources: ['sia431', 'kvu-lagerung', 'bafu-baulaerm', 'bafu-boden-bauen'],
  },
  {
    id: 'm8-t4', moduleId: M, topic: 'm8-massnahmenplan', level: 3, setting: 'Tiefbau',
    title: 'Massnahmenplan für einen Kanalisationsersatz',
    situation: 'Kanalisationsersatz (fiktiv) über 400 m in einer Quartierstrasse, Grabentiefe bis 4 m, teilweise im Grundwasser. Bauzeit fünf Monate.',
    data: [
      'Bewilligung Wasserhaltung: tägliche Kontrolle Trübung und pH des abgepumpten Wassers; Wochenmeldung der Pumpmengen',
      'Bewilligung: Baulärm-Massnahmenstufe B; Anwohnende vor Baubeginn informieren',
      'Entsorgungskonzept: Aushub teilweise verschmutzt (Analyse liegt vor), Ausbauasphalt unter 250 mg PAK/kg',
      'Ein Subunternehmer für Belagsarbeiten',
    ],
    assignment: 'Erstellen Sie einen Massnahmenplan mit mindestens sechs Zeilen (Anforderung, Massnahme, Verantwortlich, Termin, Kontrolle, Nachweis).',
    rubric: [
      { id: 'k1', text: 'Wasserhaltung: Messung, Protokoll, Wochenmeldung, Reaktion bei Überschreitung', keywords: ['trüb', 'ph', 'protokoll', 'meldung', 'pumpmenge'] },
      { id: 'k2', text: 'Lärm: Verfahren, Zeiten, Information Anwohnende', keywords: ['lärm', 'information', 'anwohn', 'zeit'] },
      { id: 'k3', text: 'Entsorgung: Triage, Nachweise (Liefer-/Wäge-/Begleitscheine)', keywords: ['triage', 'entsorgung', 'wäge', 'nachweis', 'aushub'] },
      { id: 'k4', text: 'Subunternehmer: Pflichten weitergeben, Instruktion', keywords: ['subunternehm', 'instru', 'weitergeb'] },
      { id: 'k5', text: 'Funktionen statt Namen, Termine/Phasen, Kontrollen', keywords: ['polier', 'bauführ', 'funktion', 'wöchentlich', 'täglich'] },
    ],
    solution: `| Anforderung | Massnahme | Verantwortlich | Termin | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| Bewilligung Wasserhaltung | Trübung und pH täglich messen; bei Überschreitung Pumpe stoppen, Sofortmassnahme, Meldung gemäss Bewilligung | Maschinist/in Wasserhaltung | täglich ab Inbetriebnahme | Bauführer/in wöchentlich | Messprotokoll |
| Bewilligung Wasserhaltung | Pumpmengen wöchentlich melden | Bauführer/in | jeden Freitag | Projektleiter/in monatlich | Meldungen (Kopie) |
| Baulärm Stufe B | Lärmarme Verfahren, lärmintensive Arbeiten im Zeitfenster, Abschirmung Kompressor | Polier/in | ganze Bauzeit | Bauführer/in bei Begehung | Begehungsprotokoll |
| Information Anwohnende | Flyer mit Ablauf, lauten Phasen, Kontakt | Bauführer/in | 2 Wochen vor Start | Projektleiter/in | Flyer, Verteilliste (ohne Personendaten) |
| Entsorgungskonzept | Aushub nach Analyse trennen; verschmutzter Aushub separat | Polier/in | ab Aushub | Bauführer/in wöchentlich | Liefer-/Wägescheine, Bilanz |
| Ausbauasphalt | Getrennt verwerten gemäss Konzept | Subunternehmer Belag | Belagsarbeiten | Bauführer/in | Wägescheine |
| Subunternehmer | Umweltanforderungen im Vertrag, Startinstruktion | Bauführer/in | vor Einsatz | – | Vertrag, Instruktionsliste |`,
    sources: ['gschg', 'bafu-baulaerm', 'vvea', 'praxis'],
  },
  {
    id: 'm8-t5', moduleId: M, topic: 'm8-steuerung', level: 3, setting: 'Hochbau',
    title: 'Entscheidungsvorlage für die Projektleitung',
    situation: 'Wohnüberbauung (fiktiv). Die Bauherrschaft will die Umweltkosten von 180 000 CHF um die Hälfte senken. Sie sollen eine Entscheidungsvorlage erstellen.',
    data: [
      'Absetzanlage mit Neutralisation: 45 000 CHF (Auflage)',
      'Staubschutz Massnahmenstufe B: 30 000 CHF (Auflage)',
      'Bodenschutz Garten (Depots, Piste): 35 000 CHF (Bodenschutzkonzept, Auflage)',
      'Zusätzliche Trennung Bauabfälle in 8 statt 5 Fraktionen: 20 000 CHF Mehraufwand, ca. 25 000 CHF tiefere Entsorgungskosten (interner Standard)',
      'Lärmschutzwand über die gesamte Bauzeit: 50 000 CHF (Empfehlung, nicht verlangt; Auflage verlangt Stufe A Lärm)',
    ],
    assignment: 'Ordnen Sie die Massnahmen nach Rechtsnatur, zeigen Sie Sparmöglichkeiten und Risiken und formulieren Sie eine Empfehlung.',
    rubric: [
      { id: 'k1', text: 'Rechtsnatur korrekt (Auflagen vs. interner Standard vs. Empfehlung)', keywords: ['auflage', 'pflicht', 'empfehlung', 'intern', 'rechtsnatur'] },
      { id: 'k2', text: 'Pflichten optimieren, nicht streichen (z. B. Rückführung, kleinere Anlage)', keywords: ['optimier', 'variante', 'rückführ', 'kleiner'] },
      { id: 'k3', text: 'Abfalltrennung rechnet sich (netto Einsparung)', keywords: ['trennung', 'einspar', 'netto', 'günstiger'] },
      { id: 'k4', text: 'Lärmschutzwand: Verzicht oder Reduktion möglich, Alternativen', keywords: ['lärmschutzwand', 'verzicht', 'reduz', 'alternativ'] },
      { id: 'k5', text: 'Entscheid durch Verantwortliche, schriftlich', keywords: ['entscheid', 'schriftlich', 'bauherr'] },
    ],
    solution: `| Massnahme | Rechtsnatur | Spielraum |
|---|---|---|
| Absetzanlage | Auflage | Nur das *Wie*: z. B. Rückführung in Fahrmischer, kleinere Anlage – mit Entwässerungskonzept abstimmen |
| Staubschutz Stufe B | Auflage | Nur das *Wie*: wirksame, günstigere Massnahmen gemäss Richtlinie |
| Bodenschutz Garten | Auflage (Konzept) | Varianten nur mit Zustimmung der Fachperson bzw. Behörde |
| 8 Fraktionen | interner Standard | **Beibehalten** – netto ca. 5 000 CHF günstiger und mehr Verwertung |
| Lärmschutzwand | Empfehlung | **Verzicht oder Teilwand möglich**; Alternative: lärmarme Verfahren, Zeitfenster, Information |

**Empfehlung**: Lärmschutzwand streichen oder auf die lauteste Phase begrenzen (Einsparung bis 50 000 CHF), Abfalltrennung beibehalten (Einsparung), Absetzanlage und Staubschutz technisch optimieren. Risiken bei Streichung von Auflagen: Baustopp, Bussen, Gewässer- oder Bodenschäden. Entscheid durch die Bauherrschaft, schriftlich im Protokoll. *Zahlen fiktiv.*`,
    sources: ['praxis', 'bafu-luft', 'bafu-baulaerm', 'sia431'],
  },
];

// ---------- Praxisaufträge ----------
export const M8_TASKS: PracticeTask[] = [
  { id: 'm8-p1', moduleId: M, topic: 'm8-grundlagen', title: 'Umweltcheck für ein kommendes Projekt',
    goal: 'Den Umweltcheck vor Baustart an einem realen Projekt durchführen.',
    steps: ['Wählen Sie ein Projekt in der AVOR (mit Einverständnis der Projektleitung).', 'Sammeln Sie Bewilligung mit Beilagen, Nebenbewilligungen und Vertragsunterlagen.', 'Prüfen Sie den Standort im kantonalen Geoportal und im Kanalisationskataster.', 'Erstellen Sie eine Auflagenliste mit Rechtsnatur und markieren Sie Lücken.', 'Besprechen Sie die Lücken mit der Bauleitung.'],
    deliverable: 'Auflagenliste mit Lücken und vereinbarten nächsten Schritten (ohne vertrauliche Daten ausserhalb der Firma).',
    criteria: ['Unterlagen vollständig', 'Standortkarten geprüft', 'Rechtsnatur je Anforderung', 'Lücken schriftlich gemeldet'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm8-p2', moduleId: M, topic: 'm8-vertrag', title: 'Beilage «Umweltanforderungen für Subunternehmer»',
    goal: 'Eine wiederverwendbare Beilage für Subunternehmerverträge erstellen und anwenden.',
    steps: ['Sammeln Sie die Umweltpflichten, die Ihr Unternehmen typischerweise übernimmt.', 'Formulieren Sie eine Beilage von höchstens zwei Seiten (Maschinen, Entsorgung, Betankung, Waschplatz, Boden, Notfall, Instruktion).', 'Lassen Sie die Beilage durch die zuständige Stelle (Einkauf, Rechtsdienst) prüfen.', 'Wenden Sie sie bei einem Subunternehmervertrag an.'],
    deliverable: 'Beilage (Version 1) und Beispiel eines angewendeten Vertrags.',
    criteria: ['Alle Themen abgedeckt', 'Kurz und verständlich', 'Durch zuständige Stelle geprüft', 'Angewendet'], confirmer: 'Einkauf oder Leitung Qualität/Umwelt' },
  { id: 'm8-p3', moduleId: M, topic: 'm8-installation', title: 'Installationsplan mit dem Polier prüfen',
    goal: 'Einen Installationsplan auf Umweltrisiken prüfen und verbessern.',
    steps: ['Holen Sie den Installationsplan einer kommenden oder laufenden Baustelle.', 'Markieren Sie Schächte nach Kanalisationskataster.', 'Prüfen Sie Betankung, Lager, Waschplatz, Mulden, Depots, Zufahrten und Lärmquellen nach Quelle–Weg–Schutzgut.', 'Gehen Sie die Vorschläge mit dem Polier vor Ort durch.'],
    deliverable: 'Plan mit Markierungen und vereinbarten Anpassungen.',
    criteria: ['Schächte richtig markiert', 'Alle Elemente geprüft', 'Begründungen nachvollziehbar', 'Mit Polier vereinbart'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm8-p4', moduleId: M, topic: 'm8-massnahmenplan', title: 'Umweltmassnahmenplan erstellen und nutzen',
    goal: 'Einen Massnahmenplan für ein reales Projekt erstellen und in der Startsitzung einsetzen.',
    steps: ['Übernehmen Sie die Auflagenliste aus Praxisauftrag 1 oder einem anderen Projekt.', 'Erstellen Sie den Massnahmenplan mit der Vorlage aus der Fachbibliothek.', 'Legen Sie Kontrollen und Nachweise mit Augenmass fest.', 'Stellen Sie den Plan in der Startsitzung vor und holen Sie Rückmeldungen ein.'],
    deliverable: 'Massnahmenplan mit Status nach der Startsitzung.',
    criteria: ['Jede Anforderung mit Massnahme, Funktion, Termin, Kontrolle, Nachweis', 'Funktionen statt Namen', 'Vorlaufzeiten im Terminplan', 'In Startsitzung verwendet'], confirmer: 'Bauführer/in' },
  { id: 'm8-p5', moduleId: M, topic: 'm8-steuerung', title: 'Umweltfrage im Änderungsprozess verankern',
    goal: 'Erreichen, dass Projektänderungen auf Umweltfolgen geprüft werden.',
    steps: ['Prüfen Sie, wie Projektänderungen in Ihrem Unternehmen erfasst werden.', 'Schlagen Sie eine kurze Umweltfrage vor («Umweltfolgen geprüft? Ja/Nein, durch wen?»).', 'Besprechen Sie den Vorschlag mit der zuständigen Stelle.', 'Testen Sie ihn an einer realen Änderung.'],
    deliverable: 'Angepasstes Formular oder Prozessbeschreibung und ein Anwendungsbeispiel.',
    criteria: ['Bestehenden Prozess verstanden', 'Vorschlag schlank', 'Mit zuständiger Stelle abgestimmt', 'Getestet'], confirmer: 'Leitung Qualität/Umwelt oder Projektleiter/in' },
];

// ---------- Feynman ----------
export const M8_FEYNMAN: FeynmanTask[] = [
  { id: 'm8-f1', moduleId: M, topic: 'm8-massnahmenplan', audience: 'Bauführer',
    prompt: 'Erklären Sie einem Bauführer in 5–7 Sätzen, warum ein Umweltmassnahmenplan ihm Arbeit spart statt macht.',
    rubric: [
      { id: 'f1', text: 'Klare Zuständigkeiten statt «Ich dachte, das macht …»', keywords: ['zuständig', 'verantwort', 'wer'] },
      { id: 'f2', text: 'Vorlaufzeiten früh sichtbar, keine Blockaden', keywords: ['vorlauf', 'termin', 'früh', 'blockier', 'bewilligung'] },
      { id: 'f3', text: 'Nachweise bei Kontrolle sofort verfügbar', keywords: ['nachweis', 'kontrolle', 'beleg'] },
      { id: 'f4', text: 'Kosten früh bekannt, Nachträge rechtzeitig', keywords: ['kosten', 'nachtrag', 'kalkul'] },
      { id: 'f5', text: 'Praktisch, ohne Fachjargon', keywords: [] },
    ] },
  { id: 'm8-f2', moduleId: M, topic: 'm8-steuerung', audience: 'Bauherrschaft (Privatperson)',
    prompt: 'Erklären Sie einer privaten Bauherrin in 5–7 Sätzen, warum die Umweltmassnahmen auf ihrer Baustelle nötig sind und wo man trotzdem sparen kann.',
    rubric: [
      { id: 'f1', text: 'Auflagen sind verbindlich, sie ist Adressatin', keywords: ['auflage', 'bewilligung', 'verbindlich', 'pflicht'] },
      { id: 'f2', text: 'Folgen ohne Massnahme (Schaden, Baustopp, Kosten)', keywords: ['schaden', 'baustopp', 'kosten', 'busse'] },
      { id: 'f3', text: 'Sparen beim Wie, nicht beim Ob', keywords: ['wie', 'variante', 'günstiger', 'optimier'] },
      { id: 'f4', text: 'Beispiel: Abfalltrennung spart Geld', keywords: ['trenn', 'abfall', 'spar'] },
      { id: 'f5', text: 'Verständlich und respektvoll', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M8_CARDS: Card[] = [
  { id: 'm8-c01', moduleId: M, topic: 'm8-grundlagen', level: 1, front: 'Drei Fragen des Umweltchecks vor Baustart?', back: 'Was verlangt die **Bewilligung**? Was der **Vertrag**? Was der **Standort**?', sources: ['praxis'] },
  { id: 'm8-c02', moduleId: M, topic: 'm8-grundlagen', level: 1, front: 'Welche Standortkarten prüfen?', back: '**Gewässerschutzkarte**, **Kataster belasteter Standorte**, **Kanalisationskataster**, Prüfperimeter Boden, Natur/Wald, Lärmempfindlichkeitsstufen, Neophyten.', sources: ['gemeinde-entwaesserung', 'altlv'] },
  { id: 'm8-c03', moduleId: M, topic: 'm8-grundlagen', level: 2, front: 'Verweis auf Merkblatt in der Bewilligung?', back: 'Macht das Merkblatt **für das Projekt verbindlich** – Merkblatt beschaffen.', sources: ['kanton-merkblatt'] },
  { id: 'm8-c04', moduleId: M, topic: 'm8-grundlagen', level: 2, front: 'Adressat von Auflagen?', back: 'Formell die **Bauherrschaft**; Umsetzung über Verträge. Gesetzliche Pflichten gelten für **alle**.', sources: ['praxis'] },
  { id: 'm8-c05', moduleId: M, topic: 'm8-vertrag', level: 1, front: 'Auflage fehlt im LV – gilt sie?', back: '**Ja.** Offen ist nur, **wer bezahlt** (Werkvertrag).', sources: ['praxis'] },
  { id: 'm8-c06', moduleId: M, topic: 'm8-vertrag', level: 2, front: 'Lücke in der Offertphase?', back: '**Fragerunde** nutzen; sonst **konkreter** Vorbehalt. Nie stillschweigend.', sources: ['praxis'] },
  { id: 'm8-c07', moduleId: M, topic: 'm8-vertrag', level: 1, front: 'Wann gilt SIA 118?', back: 'Wenn sie im Werkvertrag **übernommen** ist.', sources: ['sia118'] },
  { id: 'm8-c08', moduleId: M, topic: 'm8-vertrag', level: 2, front: 'Neue Umweltanforderung nach Vertragsabschluss?', back: '**Bestellungsänderung**: Nachtrag anmelden, **bevor** geleistet wird – Massnahme aber umsetzen.', sources: ['sia118'] },
  { id: 'm8-c09', moduleId: M, topic: 'm8-installation', level: 1, front: 'Quelle – Weg – Schutzgut?', back: 'Was kann austreten, wohin gelangt es, was ist dort schützenswert? Quelle **weg** vom Schutzgut oder **Barriere** dazwischen.', sources: ['praxis'] },
  { id: 'm8-c10', moduleId: M, topic: 'm8-installation', level: 1, front: 'Massnahmenstufen Luft und Lärm?', back: 'Luft: **A, B** (BAFU-Richtlinie). Lärm: **A, B, C** für Bauarbeiten, A/B für Transporte (Baulärm-Richtlinie).', sources: ['bafu-luft', 'bafu-baulaerm'] },
  { id: 'm8-c11', moduleId: M, topic: 'm8-installation', level: 2, front: 'Kein Platz für Waschplatz?', back: '**Anderes Verfahren** (z. B. Rückführung in Fahrmischer) – nicht weniger Gewässerschutz.', sources: ['sia431'] },
  { id: 'm8-c12', moduleId: M, topic: 'm8-massnahmenplan', level: 1, front: 'Sechs Glieder einer Massnahme?', back: 'Anforderung → **Massnahme** → **Verantwortung** → **Termin** → **Kontrolle** → **Nachweis**.', sources: ['praxis'] },
  { id: 'm8-c13', moduleId: M, topic: 'm8-massnahmenplan', level: 1, front: 'Meldefrist Asbestsanierung?', back: 'Bei der Suva **mindestens 14 Tage** vor Beginn (anerkanntes Unternehmen).', sources: ['suva-asbest'] },
  { id: 'm8-c14', moduleId: M, topic: 'm8-massnahmenplan', level: 2, front: 'UBB beauftragt – Eigenkontrolle nötig?', back: '**Ja.** Umsetzung und Eigenkontrolle bleiben bei der Unternehmung.', sources: ['praxis'] },
  { id: 'm8-c15', moduleId: M, topic: 'm8-steuerung', level: 1, front: 'Wo gibt es Spielraum beim Sparen?', back: 'Bei **Empfehlungen** und internen Standards (begründet). Bei Pflichten nur beim **Wie**.', sources: ['praxis'] },
  { id: 'm8-c16', moduleId: M, topic: 'm8-steuerung', level: 2, front: 'Auflage unverhältnismässig?', back: 'Über die Bauherrschaft **begründetes Gesuch** an die Behörde; bis zum Entscheid gilt die Auflage.', sources: ['praxis'] },
  { id: 'm8-c17', moduleId: M, topic: 'm8-steuerung', level: 2, front: 'Projektänderung – Umweltfrage?', back: 'Ändern sich **Emissionen, Risiken, Schutzgüter**? Braucht es eine **Bewilligung**? Erst dann umsetzen.', sources: ['praxis'] },
];

// ---------- Baustellensimulation ----------
export const M8_SCENARIO: Scenario = {
  id: 'sim-d', code: 'D', moduleId: M, status: 'verfuegbar', rev: 4,
  title: 'Umweltprüfung in der AVOR',
  setting: 'AVOR', level: 3, minutes: 20,
  topics: ['m8-grundlagen', 'm8-installation', 'm8-massnahmenplan', 'm8-steuerung'],
  intro: 'Ihr Unternehmen hat den Zuschlag für den Umbau eines Gewerbebaus von 1972 zu Wohnungen erhalten (fiktiv). Das Areal grenzt an einen Bach. Baustart ist in vier Wochen. Der Bauführer bittet Sie um eine Umweltprüfung der AVOR.',
  facts: [
    'Die Bewilligung enthält 22 Auflagen, darunter Massnahmenstufe B Luft und einen Verweis auf das kantonale Merkblatt Baustellenentwässerung.',
    'Der Schadstoffbericht der Bauherrschaft nennt asbesthaltige Bodenbeläge im 1. OG.',
    'Der Terminplan sieht den Beginn der Rückbauarbeiten in Woche 1 vor.',
    'Der Installationsplan legt Waschplatz und Betankung auf den Kiesplatz am Bachufer.',
  ],
  stages: [
    {
      id: 'd1', title: 'Der Terminplan', type: 'single', criteria: ['risiko', 'recht', 'prioritaet'],
      situation: 'Der Bauführer: «Rückbau in Woche 1, Asbest machen wir parallel – die Sanierungsfirma ist noch nicht bestellt, aber das läuft schon.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Rückbau in den betroffenen Bereichen erst nach der Sanierung durch eine Suva-anerkannte Firma und nach der Abnahme. Die Sanierung muss mindestens 14 Tage vorher bei der Suva gemeldet werden – Sanierungsfirma sofort über die Bauherrschaft bestellen und den Terminplan anpassen.', feedback: 'Richtig: Die Sanierung bestimmt den Rückbau-Start, Meldefrist und Abnahme gehören in den Terminplan.' },
        { id: 'o2', points: 0, critical: true, text: 'Parallel geht schon, wir sperren das 1. OG einfach ab.', feedback: 'Kritischer Fehler: Rückbauarbeiten neben einer laufenden, noch nicht gemeldeten Asbestsanierung gefährden Arbeitnehmende und führen zu Faserverschleppung.', consequence: 'Fasern gelangen in andere Geschosse; die Suva verfügt einen Arbeitsunterbruch.' },
        { id: 'o3', points: 1, text: 'Ich kläre das mit der Bauleitung, der Terminplan bleibt vorerst.', feedback: 'Teilweise: Klärung ist richtig, aber der Terminplan ist so nicht umsetzbar – das muss jetzt klar gesagt werden.' },
      ],
    },
    {
      id: 'd2', title: 'Was fehlt?', type: 'ask', criteria: ['unsicherheit', 'recht'], pick: 3,
      situation: 'Sie haben einen Nachmittag für die Prüfung der Unterlagen.',
      prompt: 'Welche drei Informationen holen Sie zuerst?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Ob ein Entsorgungskonzept nach Art. 16 VVEA vorliegt', reveal: 'Ein Entsorgungskonzept liegt vor, nennt aber die Asbestbeläge nicht.', feedback: 'Zentral: Bauschadstoffe gehören ins Konzept; Lücke melden.' },
        { id: 'u2', points: 2, relevant: true, text: 'Was der Kanalisationskataster zu den Schächten am Kiesplatz sagt', reveal: 'Zwei Schächte am Kiesplatz sind Meteorschächte mit Ableitung direkt in den Bach.', feedback: 'Zentral: Der geplante Waschplatz läge direkt über einer Leitung in den Bach.' },
        { id: 'u3', points: 2, relevant: true, text: 'Was das kantonale Merkblatt Baustellenentwässerung verlangt', reveal: 'Waschplätze gefasst mit Absetzen und Neutralisation, Betankung auf befestigter Fläche mit Abstand zu Gewässern; Entwässerungskonzept vor Baubeginn.', feedback: 'Zentral: Durch den Verweis in der Bewilligung verbindlich.' },
        { id: 'u4', points: 0, relevant: false, text: 'Welche Farbe die neuen Fenster haben', reveal: 'Anthrazit.', feedback: 'Für die Umweltprüfung nicht relevant.' },
        { id: 'u5', points: 1, relevant: true, text: 'Wie viele Lastwagenfahrten der Rückbau verursacht', reveal: 'Rund 120 Fahrten in sechs Wochen.', feedback: 'Nützlich für Transportplanung, aber heute nicht vordringlich.' },
      ],
    },
    {
      id: 'd3', title: 'Installationsplan anpassen', type: 'multi', criteria: ['fachlich', 'risiko'],
      situation: 'Waschplatz und Betankung liegen laut Plan auf dem Kiesplatz am Bach, neben zwei Meteorschächten.',
      prompt: 'Was veranlassen Sie? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Waschplatz und Betankung auf eine befestigte Fläche mit Abstand zum Bach verlegen; Waschplatz gefasst mit Absetzen und Neutralisation', feedback: 'Richtig: Quelle weg vom Schutzgut.' },
        { id: 'm2', points: 2, text: 'Meteorschächte im Plan markieren und im Arbeitsbereich sichern', feedback: 'Richtig.' },
        { id: 'm3', points: 2, text: 'Entwässerungskonzept gemäss Merkblatt vor Baustart erstellen und mit der Gemeinde abstimmen', feedback: 'Richtig: Das Merkblatt ist durch den Verweis verbindlich.' },
        { id: 'm4', points: 0, critical: true, text: 'Plan so lassen, aber die Meteorschächte mit Kies auffüllen', feedback: 'Kritischer Fehler: Schächte zu verfüllen ist eine unzulässige Veränderung der Entwässerungsanlage und verschiebt das Problem; der Waschplatz bleibt am Bach.', consequence: 'Bei Starkregen läuft Zementwasser über den Kiesplatz in den Bach.' },
        { id: 'm5', points: 2, text: 'Ölbindemittel und Notfallmaterial beim Betankungsplatz einplanen', feedback: 'Richtig.' },
      ],
    },
    {
      id: 'd4', title: 'Reihenfolge der AVOR-Schritte', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Sie stellen die Schritte bis zum Baustart zusammen.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Lücken (Asbest im Entsorgungskonzept, Entwässerungskonzept, Terminplan) schriftlich an Bauleitung melden' },
        { id: 'n2', text: 'Auflagenliste mit Rechtsnatur fertigstellen' },
        { id: 'n3', text: 'Umweltmassnahmenplan mit Zuständigkeiten, Kontrollen und Nachweisen erstellen' },
        { id: 'n4', text: 'Startsitzung mit Umweltpunkt und Instruktion der Equipe und Subunternehmer' },
        { id: 'n5', text: 'Rückbau im 1. OG beginnen' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1', 'n2'], ['n3'], ['n4'], ['n5']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Lücken mit Vorlaufzeit (Sanierung, Meldung, Konzept) müssen sofort gemeldet werden.' }],
      rankExplanation: 'Lücken melden und Auflagenliste fertigstellen laufen parallel – die Meldung darf nicht warten. Daraus entsteht der Massnahmenplan, der in der Startsitzung vorgestellt wird. Der Rückbau im 1. OG kommt erst nach Sanierung und Abnahme.',
    },
    {
      id: 'd5', title: 'Kostendruck', type: 'single', criteria: ['zusammenarbeit', 'begruendung', 'recht'],
      situation: 'Der Projektleiter der Bauherrschaft: «Das Entwässerungskonzept und die Absetzanlage kosten zu viel. Bei einem Umbau braucht man das doch nicht.»',
      prompt: 'Wie reagieren Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass das Merkblatt durch die Bewilligung verbindlich ist und das Areal direkt an den Bach entwässert; Varianten für eine günstigere Umsetzung anbieten (z. B. kleinere Anlage, Rückführung in den Fahrmischer) und den Entscheid schriftlich festhalten.', feedback: 'Richtig: Pflicht klar, Varianten für das Wie, Entscheid dokumentiert.' },
        { id: 'r2', points: 0, critical: true, text: 'Zustimmen – beim Umbau fällt wenig Waschwasser an, das geht in den Schacht.', feedback: 'Kritischer Fehler: Ableitung von Zementwasser über Meteorschächte in den Bach.', consequence: 'Nach der ersten Betonage wird im Bach ein erhöhter pH gemessen; Fischereiaufsicht und Polizei sind vor Ort.' },
        { id: 'r3', points: 1, text: 'Auf die Bewilligung verweisen, ohne Varianten.', feedback: 'Teilweise: korrekt, aber ohne Lösung – Sie werden beim nächsten Mal umgangen.' },
      ],
    },
    {
      id: 'd6', title: 'Bericht an den Bauführer', type: 'justify', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Der Bauführer möchte eine kurze Zusammenfassung Ihrer Prüfung für die Projektsitzung.',
      prompt: 'Schreiben Sie 5–7 Sätze: wichtigste Befunde, Massnahmen, Zuständigkeiten und was vor Baustart erledigt sein muss.',
      rubric: [
        { id: 'b1', text: 'Asbest: Sanierung vor Rückbau, Meldung 14 Tage, Abnahme; Terminplan anpassen', keywords: ['asbest', 'sanierung', '14', 'suva', 'abnahme', 'termin'] },
        { id: 'b2', text: 'Waschplatz/Betankung verlegen, Meteorschächte sichern', keywords: ['waschplatz', 'betankung', 'meteor', 'bach', 'verleg'] },
        { id: 'b3', text: 'Entwässerungskonzept und Entsorgungskonzept ergänzen', keywords: ['entwässerungskonzept', 'entsorgungskonzept', 'ergänz', 'konzept'] },
        { id: 'b4', text: 'Massnahmenplan mit Zuständigkeiten, Startsitzung/Instruktion', keywords: ['massnahmenplan', 'zuständig', 'startsitzung', 'instru'] },
        { id: 'b5', text: 'Klare Unterscheidung Pflicht/Empfehlung; schriftlich', keywords: ['pflicht', 'auflage', 'schriftlich', 'empfehlung'] },
      ],
    },
  ],
  debrief: 'Die AVOR ist der Ort, an dem Umweltschutz am billigsten ist. Wer Bewilligung, Vertrag und Standort systematisch prüft, findet Lücken wie eine fehlende Sanierungsplanung oder einen Waschplatz über einer Bachleitung, solange sie noch mit einem Plan und einem Telefon zu beheben sind – und nicht erst mit einer Feuerwehr.',
  sources: ['vvea', 'suva-asbest', 'kanton-merkblatt', 'sia431', 'gemeinde-entwaesserung'],
};
