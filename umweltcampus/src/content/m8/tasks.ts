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
      { id: 'k3', text: 'Merkblatt durch Verweis verbindlich (Fassung und Reichweite klären); Entwässerungskonzept erstellen', keywords: ['merkblatt', 'verbindlich', 'entwässerungskonzept', 'fassung'] },
      { id: 'k4', text: 'Kataster-Nachbarparzelle: Hinweis, kein Befund – Abklärung durch Fachperson veranlassen; Zwischenlager erst bei bestätigtem Verdacht', keywords: ['kataster', 'belastet', 'abklär', 'verdacht', 'fachperson', 'hinweis'] },
      { id: 'k5', text: 'Rechtsnatur je Anforderung korrekt', keywords: ['auflage', 'gesetz', 'vollzugshilfe', 'rechtsnatur'] },
    ],
    solution: `| Anforderung | Quelle | Rechtsnatur | Nächster Schritt |
|---|---|---|---|
| Bewilligung Wasserhaltung | Ziff. 3.2; GSchG (Au, Grundwasser) | Behördliche Auflage, gesetzliche Grundlage | **Fehlt** – schriftlich an Bauleitung; **No-Go**: Aushub unter GW-Spiegel erst nach Bewilligung. Einleitung des gepumpten Wassers separat klären |
| Massnahmenstufe B Luft | Ziff. 5.1; BAFU-Richtlinie | Auflage (Vollzugshilfe durch Verweis verbindlich) | Maschinenliste mit Filternachweisen (LRV), Massnahmen in Massnahmenplan, im LV prüfen |
| Merkblatt Baustellenentwässerung | Ziff. 6.4 | Auflage (Vorgaben des Merkblatts durch Verweis verbindlich; Empfehlungen und Beispiele darin bleiben Empfehlungen) | Merkblatt in der gemeinten Fassung beschaffen; Entwässerungskonzept **fehlt** – erstellen und mit Gemeinde abstimmen |
| Belastete Nachbarparzelle | Kataster belasteter Standorte | Hinweis – **kein Befund** für die eigene Parzelle | Über die Bauleitung klären lassen, ob die Baugrube im Einflussbereich liegt (Geschichte, Baugrundbericht, Fachperson Altlasten); Zwischenlager und Triage erst einplanen, wenn sich der Verdacht bestätigt |
| Verunreinigungsverbot | GSchG | Gesetz | gilt immer; Schächte nach Kanalisationskataster markieren |

**Lücken, schriftlich vor Baustart**: Wasserhaltungsbewilligung, Entwässerungskonzept, Klärung Belastungsverdacht; dazu prüfen, ob die Baufreigabe vorliegt, wo der Kanton eine solche kennt. Wer das Gesuch für die Wasserhaltung stellt, ergibt sich aus Bewilligung und Vertrag (in der Regel die Bauherrschaft). Sie legen keine Auflage selbst aus und ersetzen keine Fachperson (Hydrogeologie, Altlasten).`,
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
    assignment: 'Welche Fragen stellen Sie in der Fragerunde, wie gehen Sie vor, wenn Fragen unbeantwortet bleiben, und was offerieren Sie beim Kriterium Nachhaltigkeit?',
    rubric: [
      { id: 'k1', text: 'Frage zur PAK-Analyse bzw. Entsorgung nach Klassen (Einheitspreise)', keywords: ['pak', 'analyse', 'klasse', 'einheitspreis', 'bohrkern'] },
      { id: 'k2', text: 'Frage zur Abgeltung Lärmschutz Stufe B und Information', keywords: ['lärm', 'stufe b', 'information', 'abgelt', 'position'] },
      { id: 'k3', text: 'Fragerunde hat Vorrang; kein Vorbehalt als Standard (Ausschlussrisiko) – ausschreibungskonformes Grundangebot, Prüfung durch Fachperson Vergabe', keywords: ['fragerunde', 'vorbehalt', 'ausschluss', 'grundangebot', 'vergabe', 'prüf'] },
      { id: 'k4', text: 'Nachhaltigkeit: nur Leistbares, mit Nachweis', keywords: ['nachweis', 'maschinen', 'filter', 'transport', 'leist'] },
    ],
    solution: `**Fragen in der Fragerunde**
1. Liegen PAK-Analysen des Belags vor? Wenn nein: Kann die Position in Einheitspreise je Klasse (unter/über 250 mg PAK/kg bzw. gemäss VVEA) aufgeteilt werden?
2. Wie sind Massnahmenstufe B Lärm (z. B. lärmarme Verfahren, Abschirmungen, Zeitfenster) und die Information der Anwohnenden abzugelten?
3. Gibt es Vorgaben zu Arbeitszeiten oder Transportrouten?

**Wenn Fragen unbeantwortet bleiben**: Bei dieser öffentlichen Vergabe ist ein Vorbehalt in der Offerte **keine sichere Lösung** – materielle Vorbehalte können zum Ausschluss führen und garantieren keinen Nachtrag. Vorgehen: die Vergabestelle nochmals schriftlich um Präzisierung ersuchen; sonst ein ausschreibungskonformes Grundangebot kalkulieren, das die Auflagen (Lärm Stufe B, Information) und das Entsorgungsrisiko des Belags abdeckt; die Annahmen intern dokumentieren. Ob ein Hinweis oder eine Variante zulässig ist, prüft die Fachperson Vergabe bzw. Bauvertrag – nicht die Umweltfachperson.

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
      'Mulden und Kompressor an der Grenze zur Wohnüberbauung; Bürocontainer auf der vom Wohngebiet abgewandten Seite',
      'Bodendepot auf der Fläche des späteren Pausenplatzes; Zufahrt über die Wiese ohne Piste',
      'Massnahmenstufe A Luft, B Lärm',
    ],
    assignment: 'Nennen Sie die Mängel, schlagen Sie eine bessere Anordnung vor und begründen Sie sie in je einem Satz.',
    rubric: [
      { id: 'k1', text: 'Tankcontainer weg vom Meteorschacht, auf Wanne/befestigter Fläche', keywords: ['tank', 'meteor', 'wanne', 'befestigt', 'abstand'] },
      { id: 'k2', text: 'Waschplatz weg vom Bach, gefasst, Absetzen/Neutralisieren', keywords: ['waschplatz', 'bach', 'absetz', 'neutralis', 'gefasst'] },
      { id: 'k3', text: 'Lärmquellen möglichst weit weg von Wohnungen; Abstand, Schallausbreitung und Abschirmung prüfen', keywords: ['lärm', 'kompressor', 'mulde', 'wohn', 'abschirm', 'abstand'] },
      { id: 'k4', text: 'Bodendepot nicht auf später benötigter Fläche (Standort nach Bodenschutzkonzept); Zufahrt als Piste', keywords: ['depot', 'piste', 'zufahrt', 'boden', 'pausenplatz'] },
      { id: 'k5', text: 'Begründung über Quelle–Weg–Schutzgut', keywords: ['quelle', 'weg', 'schutzgut', 'risiko'] },
    ],
    solution: `- **Tankcontainer**: weg vom Meteorschacht auf eine befestigte Fläche mit Auffangwanne, Ölbindemittel daneben; Meteorschacht im Plan rot markieren. *Ein Tropfverlust ginge sonst direkt in den Bach.*
- **Waschplatz**: auf befestigte, gefasste Fläche mit Abstand zum Bach, Absetzbecken und Neutralisation, Ableitung gemäss Entwässerungskonzept. *Am tiefsten Punkt beim Bach führt jeder Überlauf ins Gewässer.*
- **Mulden und Kompressor**: möglichst weit weg von der Wohnüberbauung; Abstand, Schallausbreitung und Zufahrt am Plan prüfen. Container können abschirmen, ersetzen aber keine geprüfte Abschirmung – Wirkung gemäss Massnahmen der Stufe B beurteilen. *Lärmquellen gehören weg von empfindlichen Nutzungen.*
- **Bodendepot**: ausserhalb später benötigter Bau- und Verkehrsflächen, getrennt Ober-/Unterboden, Standort gemäss Bodenschutzkonzept (falls verlangt). *Sonst muss es mehrfach umgelagert werden.*
- **Zufahrt**: auf der späteren Zufahrtsfläche als Kiespiste auf Vlies; Reinigung vor der Strasse. *Schützt Boden und Strasse.*
- **Für jede Bauphase und für Starkregen prüfen**: Wohin läuft das Wasser, wenn es stark regnet – und steht der Waschplatz in der nächsten Phase im Weg?`,
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
| Bewilligung Wasserhaltung | Pumpmengen wöchentlich melden | Bauführer/in | wöchentlich (fester Wochentag, intern festgelegt) | Projektleiter/in monatlich | Meldungen (Kopie) und Empfangsbestätigung |
| Baulärm Stufe B | Lärmarme Verfahren, lärmintensive Arbeiten im Zeitfenster, Abschirmung Kompressor | Polier/in | ganze Bauzeit | Bauführer/in bei Begehung | Begehungsprotokoll |
| Information Anwohnende | Flyer mit Ablauf, lauten Phasen, Kontakt | Bauführer/in | vor Baubeginn (intern: z. B. 2 Wochen vorher) | Projektleiter/in | Flyer, Verteilliste (ohne Personendaten) |
| Entsorgungskonzept | Aushub nach Analyse trennen; verschmutzter Aushub separat | Polier/in | ab Aushub | Bauführer/in wöchentlich | Liefer-/Wägescheine, Bilanz |
| Ausbauasphalt | Getrennt verwerten gemäss Konzept | Subunternehmer Belag | Belagsarbeiten | Bauführer/in | Wägescheine |
| Subunternehmer | Umweltanforderungen im Vertrag, Startinstruktion | Bauführer/in | vor Einsatz | – | Vertrag, Instruktionsliste |

**Reaktion bei Überschreitung (Wasserhaltung)**: Pumpe stoppen bzw. Wasser zurückhalten → Ursache suchen und beheben → Meldung an die in der Bewilligung genannte Stelle → Wiederaufnahme erst, wenn die Werte eingehalten sind; alles im Protokoll.

*Wochentag und «2 Wochen vorher» sind interne Beispieltermine. Verbindlich sind Frist, Form und Empfänger gemäss Bewilligung.*`,
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
      { id: 'k3', text: 'Brutto/Netto gerechnet (Abfalltrennung netto Einsparung) und Abstand zum Sparziel ausgewiesen', keywords: ['trennung', 'einspar', 'netto', 'brutto', 'sparziel', 'lücke'] },
      { id: 'k4', text: 'Lärmschutzwand: Verzicht oder Reduktion nur nach fachlicher Prüfung (Stufe A bleibt einzuhalten), Alternativen', keywords: ['lärmschutzwand', 'verzicht', 'reduz', 'alternativ', 'prüf'] },
      { id: 'k5', text: 'Entscheid durch Verantwortliche, schriftlich', keywords: ['entscheid', 'schriftlich', 'bauherr'] },
    ],
    solution: `| Massnahme | Rechtsnatur | Spielraum |
|---|---|---|
| Absetzanlage | Auflage | Nur das *Wie*: z. B. Rückführung in Fahrmischer, kleinere Anlage – mit Entwässerungskonzept abstimmen |
| Staubschutz Stufe B | Auflage | Nur das *Wie*: wirksame, günstigere Massnahmen gemäss Richtlinie |
| Bodenschutz Garten | Auflage (Konzept) | Varianten nur mit Zustimmung der Fachperson bzw. Behörde |
| 8 Fraktionen | interner Standard | **Beibehalten** – netto ca. 5 000 CHF günstiger und mehr Verwertung |
| Lärmschutzwand | Empfehlung | Verzicht oder Teilwand **prüfbar** – vorher fachlich beurteilen, ob die Massnahmen der Stufe A auch ohne Wand eingehalten sind; Alternative: lärmarme Verfahren, Zeitfenster, Information |

**Rechnung (fiktive Zahlen)**

| Posten | CHF |
|---|---|
| Umweltmassnahmen brutto (45 + 30 + 35 + 20 + 50) | 180 000 |
| abzüglich tiefere Entsorgungskosten dank Trennung | – 25 000 |
| Umweltkosten netto | 155 000 |
| Sparziel der Bauherrschaft (Hälfte von 180 000) | 90 000 |
| Verzicht auf Lärmschutzwand (falls fachlich vertretbar) | – 50 000 |
| verbleibend brutto / netto | 130 000 / 105 000 |
| **Abstand zum Sparziel** brutto / netto | **40 000 / 15 000** |

**Empfehlung**: Das Sparziel «Hälfte» ist ohne Verletzung von Auflagen **nicht erreichbar**. Möglich sind: Lärmschutzwand nach fachlicher Prüfung streichen oder auf die lauteste Phase begrenzen (bis 50 000 CHF), Abfalltrennung beibehalten (netto 5 000 CHF günstiger), Absetzanlage und Staubschutz technisch optimieren (Einsparung offen, Varianten offerieren lassen). Der Rest sind Auflagen. Risiken bei Streichung von Auflagen: Baustopp, Bussen, Gewässer- oder Bodenschäden. Entscheid durch die Bauherrschaft, schriftlich im Protokoll; Abweichungen von Auflagen nur mit Zustimmung der Behörde.`,
    sources: ['praxis', 'bafu-luft', 'bafu-baulaerm', 'sia431'],
  },
];

// ---------- Praxisaufträge ----------
export const M8_TASKS: PracticeTask[] = [
  { id: 'm8-p1', moduleId: M, topic: 'm8-grundlagen', title: 'Umweltcheck für ein kommendes Projekt',
    goal: 'Den Umweltcheck vor Baustart an einem realen Projekt durchführen.',
    steps: ['Wählen Sie ein Projekt in der AVOR (mit Einverständnis der Projektleitung).', 'Sammeln Sie Bewilligung mit Beilagen, Nebenbewilligungen und Vertragsunterlagen.', 'Prüfen Sie den Standort im kantonalen Geoportal und im Kanalisationskataster; notieren Sie das Datum der Abfrage.', 'Erstellen Sie eine Auflagenliste mit Rechtsnatur und Go/No-Go-Punkten und markieren Sie Lücken.', 'Besprechen Sie die Lücken mit der Bauleitung.'],
    deliverable: 'Auflagenliste mit Lücken und vereinbarten nächsten Schritten (ohne vertrauliche Daten ausserhalb der Firma).',
    criteria: ['Unterlagen vollständig', 'Standortkarten geprüft', 'Rechtsnatur je Anforderung', 'Lücken schriftlich gemeldet'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm8-p2', moduleId: M, topic: 'm8-vertrag', title: 'Beilage «Umweltanforderungen für Subunternehmer»',
    goal: 'Eine wiederverwendbare Beilage für Subunternehmerverträge erstellen und anwenden.',
    steps: ['Sammeln Sie die Umweltpflichten, die Ihr Unternehmen typischerweise übernimmt.', 'Formulieren Sie eine Beilage von höchstens zwei Seiten (Maschinen, Entsorgung, Betankung, Waschplatz, Boden, Notfall und Meldewege, Instruktion) – in einer Sprache, die die Mitarbeitenden verstehen.', 'Lassen Sie die Beilage durch die zuständige Stelle (Einkauf, Rechtsdienst) prüfen.', 'Wenden Sie sie bei einem Subunternehmervertrag an.'],
    deliverable: 'Beilage (Version 1) und Beispiel eines angewendeten Vertrags.',
    criteria: ['Alle Themen abgedeckt', 'Kurz und verständlich', 'Durch zuständige Stelle geprüft', 'Angewendet'], confirmer: 'Einkauf oder Leitung Qualität/Umwelt' },
  { id: 'm8-p3', moduleId: M, topic: 'm8-installation', title: 'Installationsplan mit dem Polier prüfen',
    goal: 'Einen Installationsplan auf Umweltrisiken prüfen und verbessern.',
    steps: ['Holen Sie den Installationsplan einer kommenden oder laufenden Baustelle.', 'Markieren Sie Schächte nach Kanalisationskataster.', 'Prüfen Sie Betankung, Lager, Waschplatz, Mulden, Depots, Zufahrten und Lärmquellen nach Quelle–Weg–Schutzgut.', 'Gehen Sie die Vorschläge mit dem Polier vor Ort durch.'],
    deliverable: 'Plan mit Markierungen und vereinbarten Anpassungen (mit Planversion und Datum).',
    criteria: ['Schächte richtig markiert', 'Alle Elemente geprüft', 'Begründungen nachvollziehbar', 'Mit Polier vereinbart'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm8-p4', moduleId: M, topic: 'm8-massnahmenplan', title: 'Umweltmassnahmenplan erstellen und nutzen',
    goal: 'Einen Massnahmenplan für ein reales Projekt erstellen und in der Startsitzung einsetzen.',
    steps: ['Übernehmen Sie die Auflagenliste aus Praxisauftrag 1 oder einem anderen Projekt.', 'Erstellen Sie den Massnahmenplan mit der Vorlage aus der Fachbibliothek.', 'Legen Sie Kontrollen und Nachweise mit Augenmass fest und trennen Sie vorgeschriebene Nachweise von freiwilligen.', 'Stellen Sie den Plan in der Startsitzung vor und holen Sie Rückmeldungen ein.'],
    deliverable: 'Massnahmenplan mit Status nach der Startsitzung.',
    criteria: ['Jede Anforderung mit Massnahme, Funktion, Termin, Kontrolle, Nachweis', 'Funktionen statt Namen', 'Vorlaufzeiten im Terminplan', 'In Startsitzung verwendet'], confirmer: 'Bauführer/in' },
  { id: 'm8-p5', moduleId: M, topic: 'm8-steuerung', title: 'Umweltfrage im Änderungsprozess verankern',
    goal: 'Erreichen, dass Projektänderungen auf Umweltfolgen geprüft werden.',
    steps: ['Prüfen Sie, wie Projektänderungen in Ihrem Unternehmen erfasst werden.', 'Schlagen Sie eine kurze Umweltfrage vor («Umweltfolgen geprüft? Neue Bewilligung oder Freigabe nötig? Ja/Nein, durch wen?»).', 'Besprechen Sie den Vorschlag mit der zuständigen Stelle.', 'Testen Sie ihn an einer realen Änderung.'],
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
  { id: 'm8-c03', moduleId: M, topic: 'm8-grundlagen', level: 2, front: 'Verweis auf Merkblatt in der Bewilligung?', back: 'Kann die **Vorgaben** des Merkblatts für das Projekt verbindlich machen – **Fassung und Reichweite** klären, Merkblatt beschaffen.', sources: ['kanton-merkblatt'] },
  { id: 'm8-c04', moduleId: M, topic: 'm8-grundlagen', level: 2, front: 'Adressat von Auflagen?', back: '**In der Regel** die Gesuchstellerin (meist Bauherrschaft) – konkreten Entscheid lesen; Umsetzung über Verträge. Gesetzliche Pflichten gelten für **alle**; einzelne Meldepflichten treffen je nach Kanton Bauleitung oder Unternehmung.', sources: ['praxis'] },
  { id: 'm8-c05', moduleId: M, topic: 'm8-vertrag', level: 1, front: 'Auflage fehlt im LV – gilt sie?', back: '**Ja.** Die Kostenfrage ist **separat** (ganzer Vertrag) – fehlende Position heisst **nicht automatisch** Nachtrag.', sources: ['praxis'] },
  { id: 'm8-c06', moduleId: M, topic: 'm8-vertrag', level: 2, front: 'Lücke in der Offertphase?', back: '**Fragerunde** nutzen. Vorbehalt ist **kein sicherer Ersatz** (öffentliche Vergabe: Ausschlussrisiko) – nur nach vergaberechtlicher Prüfung. Nie stillschweigend.', sources: ['praxis'] },
  { id: 'm8-c07', moduleId: M, topic: 'm8-vertrag', level: 1, front: 'Wann gilt SIA 118?', back: 'Wenn sie im Werkvertrag **übernommen** ist.', sources: ['sia118'] },
  { id: 'm8-c08', moduleId: M, topic: 'm8-vertrag', level: 2, front: 'Nicht kalkulierte Umweltanforderung nach Vertragsabschluss?', back: 'Vier Fälle: **bereits geschuldet**, **unklare Ausschreibung**, **neue Bestellung**, **neue behördliche Anordnung**. Immer: Massnahme umsetzen, **sofort schriftlich anzeigen**, Anspruch **prüfen lassen** – Anzeige ist nicht Anspruch.', sources: ['sia118', 'kbob-nachtrag'] },
  { id: 'm8-c09', moduleId: M, topic: 'm8-installation', level: 1, front: 'Quelle – Weg – Schutzgut?', back: 'Was kann austreten, wohin gelangt es, was ist dort schützenswert? Quelle **weg** vom Schutzgut oder **Barriere** dazwischen.', sources: ['praxis'] },
  { id: 'm8-c10', moduleId: M, topic: 'm8-installation', level: 1, front: 'Massnahmenstufen Luft und Lärm?', back: 'Luft: **A, B** (BAFU-Richtlinie). Lärm: **A, B, C** für Bauarbeiten, A/B für Transporte (Baulärm-Richtlinie).', sources: ['bafu-luft', 'bafu-baulaerm'] },
  { id: 'm8-c11', moduleId: M, topic: 'm8-installation', level: 2, front: 'Kein Platz für Waschplatz?', back: '**Anderes Verfahren** (z. B. Rückführung in Fahrmischer) – nicht weniger Gewässerschutz.', sources: ['sia431'] },
  { id: 'm8-c12', moduleId: M, topic: 'm8-massnahmenplan', level: 1, front: 'Sechs Glieder einer Massnahme?', back: 'Anforderung → **Massnahme** → **Verantwortung** → **Termin** → **Kontrolle** → **Nachweis**.', sources: ['praxis'] },
  { id: 'm8-c13', moduleId: M, topic: 'm8-massnahmenplan', level: 1, front: 'Meldefrist Asbestsanierung?', back: 'Bei Arbeiten mit **erheblicher Faserfreisetzung**: Meldung an die Suva **mindestens 14 Tage** vorher durch das **anerkannte Unternehmen**. Rückbau im Bereich erst nach **dokumentierter Freigabe**.', sources: ['suva-asbest'] },
  { id: 'm8-c14', moduleId: M, topic: 'm8-massnahmenplan', level: 2, front: 'UBB beauftragt – Eigenkontrolle nötig?', back: '**Ja.** Umsetzung und Eigenkontrolle bleiben bei der Unternehmung.', sources: ['praxis'] },
  { id: 'm8-c15', moduleId: M, topic: 'm8-steuerung', level: 1, front: 'Wo gibt es Spielraum beim Sparen?', back: 'Bei **Empfehlungen** und internen Standards (begründet). Bei Pflichten nur beim **Wie**.', sources: ['praxis'] },
  { id: 'm8-c16', moduleId: M, topic: 'm8-steuerung', level: 2, front: 'Auflage unverhältnismässig?', back: 'Über die Bauherrschaft **begründetes Gesuch** an die Behörde; bis zum Entscheid gilt die Auflage.', sources: ['praxis'] },
  { id: 'm8-c17', moduleId: M, topic: 'm8-steuerung', level: 2, front: 'Projektänderung – Umweltfrage?', back: 'Ändern sich **Emissionen, Risiken, Schutzgüter**? Braucht es eine **Bewilligung**? Erst dann umsetzen.', sources: ['praxis'] },
];

// ---------- Baustellensimulation ----------
export const M8_SCENARIO: Scenario = {
  id: 'sim-d', code: 'D', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Umweltprüfung in der AVOR',
  setting: 'AVOR', level: 3, minutes: 20,
  topics: ['m8-grundlagen', 'm8-installation', 'm8-massnahmenplan', 'm8-steuerung'],
  intro: 'Ihr Unternehmen hat den Zuschlag für den Umbau eines Gewerbebaus von 1972 zu Wohnungen erhalten (fiktiv). Das Areal grenzt an einen Bach. Baustart ist in vier Wochen. Der Bauführer bittet Sie um eine Umweltprüfung der AVOR.',
  facts: [
    'Die Bewilligung enthält 22 Auflagen, darunter Massnahmenstufe B Luft und einen Verweis auf das kantonale Merkblatt Baustellenentwässerung.',
    'Der Schadstoffbericht der Bauherrschaft nennt asbesthaltige Bodenbeläge im 1. OG, die nur mit erheblicher Faserfreisetzung entfernt werden können.',
    'Der Terminplan sieht den Beginn der Rückbauarbeiten in Woche 1 vor.',
    'Der Installationsplan legt Waschplatz und Betankung auf den Kiesplatz am Bachufer.',
  ],
  stages: [
    {
      id: 'd1', title: 'Der Terminplan', type: 'single', criteria: ['risiko', 'recht', 'prioritaet'],
      situation: 'Der Bauführer: «Rückbau in Woche 1, Asbest machen wir parallel – die Sanierungsfirma ist noch nicht bestellt, aber das läuft schon.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Rückbau im betroffenen Bereich erst nach der Sanierung und der dokumentierten Freigabe. Laut Schadstoffbericht ist das eine Arbeit mit erheblicher Faserfreisetzung: nur durch eine Suva-anerkannte Firma, mit Meldung mindestens 14 Tage vorher. Sanierungsfirma sofort über die Bauherrschaft bestellen, Bereich sperren, Terminplan anpassen; Arbeiten in nicht betroffenen Bereichen separat klären.', feedback: 'Richtig: Sanierungsart gemäss Bericht, Meldefrist, Kontrollen und schriftliche Freigabe des Bereichs sind No-Go-Punkte im Terminplan.' },
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
        { id: 'u6', points: 2, relevant: true, text: 'Ob die Sanierungsfirma beauftragt ist und welches Verfahren der Schadstoffbericht verlangt', reveal: 'Noch keine Firma beauftragt. Der Bericht verlangt die Sanierung durch ein Suva-anerkanntes Unternehmen und eine Kontrolle vor der Freigabe.', feedback: 'Zentral: Bestellung, Meldefrist und Freigabe bestimmen den frühesten Rückbau-Start.' },
        { id: 'u4', points: 0, relevant: false, text: 'Welche Farbe die neuen Fenster haben', reveal: 'Anthrazit.', feedback: 'Für die Umweltprüfung nicht relevant.' },
        { id: 'u5', points: 1, relevant: true, text: 'Wie viele Lastwagenfahrten der Rückbau verursacht', reveal: 'Rund 120 Fahrten in sechs Wochen.', feedback: 'Nützlich für Transportplanung, aber heute nicht vordringlich.' },
      ],
    },
    {
      id: 'd3', title: 'Installationsplan anpassen', type: 'multi', criteria: ['fachlich', 'risiko'],
      situation: 'Waschplatz und Betankung liegen laut Plan auf dem Kiesplatz am Bach, neben zwei Meteorschächten.',
      prompt: 'Was veranlassen Sie? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Waschplatz und Betankung auf eine befestigte Fläche mit Abstand zum Bach verlegen; Waschplatz gefasst mit Absetzen und Neutralisation, Ableitung nur gemäss Entwässerungskonzept und Zustimmung', feedback: 'Richtig: Quelle weg vom Schutzgut – und keine Ableitung ohne Zustimmung.' },
        { id: 'm2', points: 2, text: 'Meteorschächte im Plan markieren und im Arbeitsbereich sichern', feedback: 'Richtig.' },
        { id: 'm3', points: 2, text: 'Entwässerungskonzept gemäss Merkblatt vor Baustart erstellen und mit der Gemeinde abstimmen', feedback: 'Richtig: Das Merkblatt ist durch den Verweis verbindlich.' },
        { id: 'm4', points: 0, critical: true, text: 'Plan so lassen, aber die Meteorschächte mit Kies auffüllen', feedback: 'Kritischer Fehler: Schächte zu verfüllen ist eine unzulässige Veränderung der Entwässerungsanlage und verschiebt das Problem; der Waschplatz bleibt am Bach.', consequence: 'Bei Starkregen läuft Zementwasser über den Kiesplatz in den Bach.' },
        { id: 'm5', points: 2, text: 'Ölbindemittel und Notfallmaterial beim Betankungsplatz einplanen', feedback: 'Richtig.' },
      ],
    },
    {
      id: 'd4', title: 'Reihenfolge der AVOR-Schritte', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Sie stellen die Freigabekette für den Rückbau im 1. OG zusammen. Andere zulässige Arbeiten (Startsitzung, Installation, Arbeiten in nicht betroffenen Bereichen) können parallel laufen, soweit ihre eigenen Freigaben vorliegen.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Lücken schriftlich an die Bauleitung melden; Sanierungsfirma über die Bauherrschaft bestellen lassen' },
        { id: 'n2', text: 'Auflagenliste und Massnahmenplan mit Go/No-Go-Punkten erstellen' },
        { id: 'n3', text: 'Meldung der Sanierung an die Suva durch das anerkannte Unternehmen (mindestens 14 Tage vor Beginn)' },
        { id: 'n4', text: 'Asbestsanierung im gesperrten Bereich' },
        { id: 'n6', text: 'Kontrolle gemäss Verfahren und schriftliche Freigabe des Bereichs' },
        { id: 'n5', text: 'Rückbau im 1. OG beginnen' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n6', 'n5'],
      rankGroups: [['n1', 'n2'], ['n3'], ['n4'], ['n6'], ['n5']],
      rankEarly: [
        { id: 'n1', maxPos: 2, why: 'Lücken mit Vorlaufzeit (Bestellung der Sanierungsfirma, Meldefrist, Konzepte) müssen sofort gemeldet werden.' },
        { id: 'n3', maxPos: 5, why: 'No-Go: Der Rückbau darf nicht vor der Meldung der Sanierung stehen.' },
        { id: 'n4', maxPos: 5, why: 'No-Go: Rückbau vor der Asbestsanierung.' },
        { id: 'n6', maxPos: 5, why: 'No-Go: Rückbau vor der dokumentierten Freigabe des sanierten Bereichs.' },
      ],
      rankExplanation: 'Die Kette für den betroffenen Bereich ist zwingend: Sanierungsfirma bestellen → Meldung an die Suva (mindestens 14 Tage vorher, bei Arbeiten mit erheblicher Faserfreisetzung) → Sanierung → Kontrolle und schriftliche Freigabe → erst dann Rückbau. Lücken melden und Auflagenliste bzw. Massnahmenplan laufen am Anfang parallel. Steht der Rückbau vor einem dieser Glieder, ist das ein No-Go – unabhängig davon, wie gut der Rest geordnet ist.',
    },
    {
      id: 'd5', title: 'Kostendruck', type: 'single', criteria: ['zusammenarbeit', 'begruendung', 'recht'],
      situation: 'Der Projektleiter der Bauherrschaft: «Das Entwässerungskonzept und die Absetzanlage kosten zu viel. Bei einem Umbau braucht man das doch nicht.»',
      prompt: 'Wie reagieren Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass die Vorgaben des Merkblatts durch die Bewilligung verbindlich sind und das Areal direkt an den Bach entwässert; Varianten für eine günstigere Umsetzung innerhalb der Auflage anbieten (z. B. kleinere Anlage, Rückführung in den Fahrmischer) und den Entscheid schriftlich festhalten. Eine Abweichung von der Auflage wäre nur mit Zustimmung der Behörde möglich.', feedback: 'Richtig: Pflicht klar, Varianten nur für das Wie innerhalb der Auflage, Entscheid dokumentiert – die Bauherrschaft kann eine Auflage nicht selbst ändern.' },
        { id: 'r2', points: 0, critical: true, text: 'Zustimmen – beim Umbau fällt wenig Waschwasser an, das geht in den Schacht.', feedback: 'Kritischer Fehler: Ableitung von Zementwasser über Meteorschächte in den Bach.', consequence: 'Nach der ersten Betonage wird im Bach ein erhöhter pH gemessen; Fischereiaufsicht und Polizei sind vor Ort.' },
        { id: 'r3', points: 1, text: 'Auf die Bewilligung verweisen, ohne Varianten.', feedback: 'Teilweise: korrekt, aber ohne Lösung – Sie werden beim nächsten Mal umgangen.' },
      ],
    },
    {
      id: 'd6', title: 'Bericht an den Bauführer', type: 'justify', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Der Bauführer möchte eine kurze Zusammenfassung Ihrer Prüfung für die Projektsitzung.',
      prompt: 'Schreiben Sie 5–7 Sätze: wichtigste Befunde und Risiken, Massnahmen, Zuständigkeiten und Fristen – und was bis zu welcher Freigabe nicht beginnen darf (No-Go).',
      rubric: [
        { id: 'b1', text: 'Asbest: Sanierung vor Rückbau, Meldung 14 Tage, Kontrolle und Freigabe; Terminplan anpassen', keywords: ['asbest', 'sanierung', '14', 'suva', 'abnahme', 'freigabe', 'termin'] },
        { id: 'b2', text: 'Waschplatz/Betankung verlegen, Meteorschächte sichern', keywords: ['waschplatz', 'betankung', 'meteor', 'bach', 'verleg'] },
        { id: 'b3', text: 'Entwässerungskonzept und Entsorgungskonzept ergänzen', keywords: ['entwässerungskonzept', 'entsorgungskonzept', 'ergänz', 'konzept'] },
        { id: 'b4', text: 'Massnahmenplan mit Zuständigkeiten, Startsitzung/Instruktion', keywords: ['massnahmenplan', 'zuständig', 'startsitzung', 'instru'] },
        { id: 'b5', text: 'No-Go klar benannt (kein Rückbau im 1. OG vor Freigabe, keine Ableitung ohne Zustimmung); Pflicht/Empfehlung unterschieden; schriftlich an Bauleitung', keywords: ['no-go', 'erst nach', 'freigabe', 'kein rückbau', 'zustimmung', 'pflicht', 'schriftlich'] },
      ],
    },
  ],
  debrief: 'Die AVOR ist der Ort, an dem Umweltschutz am billigsten ist. Wer Bewilligung, Vertrag und Standort systematisch prüft, findet Lücken wie eine fehlende Sanierungsplanung oder einen Waschplatz über einer Bachleitung, solange sie noch mit einem Plan und einem Telefon zu beheben sind – und nicht erst mit einer Feuerwehr.',
  sources: ['vvea', 'suva-asbest', 'kanton-merkblatt', 'sia431', 'gemeinde-entwaesserung'],
};
