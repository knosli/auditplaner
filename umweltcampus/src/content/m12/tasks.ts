import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm12';

// ---------- Baustellenaufgaben (fiktive Daten) ----------
export const M12_SITETASKS: SiteTask[] = [
  {
    id: 'm12-t1', moduleId: M, topic: 'm12-organisation', level: 2, setting: 'Hochbau',
    title: 'Verantwortlichkeitsmatrix',
    situation: 'Bauunternehmung (fiktiv) mit 250 Mitarbeitenden, Hoch- und Tiefbau, drei Niederlassungen und ein Werkhof. Sie erstellen eine Verantwortlichkeitsmatrix für die wichtigsten Umweltaufgaben.',
    data: [
      'Rollen: Geschäftsleitung, Bereichsleitung, Projektleitung, Bauführung, Polier, Umweltfachstelle, Umweltkontaktperson Niederlassung, Werkhofleitung, Einkauf',
      'Aufgaben: Umweltpolitik und Ziele; Rechtskataster; Auflagen ins Projekt übernehmen; Entsorgungskonzept; Massnahmen auf der Baustelle; Instruktion der Equipe; Begehungen; Notfall und Meldung; Anforderungen an Subunternehmer; Lager und Waschplatz im Werkhof',
    ],
    assignment: 'Ordnen Sie jeder Aufgabe zu, wer verantwortlich ist (V), wer mitwirkt (M) und wer informiert wird (I).',
    rubric: [
      { id: 'k1', text: 'GL verantwortlich für Politik, Ziele, Mittel', keywords: ['geschäftsleitung', 'politik', 'ziele', 'gl'] },
      { id: 'k2', text: 'Linie verantwortlich für Auflagen, Konzept, Massnahmen, Instruktion', keywords: ['projektleitung', 'bauführung', 'polier', 'linie'] },
      { id: 'k3', text: 'Fachstelle verantwortlich für Rechtskataster und Begehungen, sonst mitwirkend', keywords: ['fachstelle', 'rechtskataster', 'begehung', 'mitwirk'] },
      { id: 'k4', text: 'Notfall: Bauführung/Polier handeln und melden; Fachstelle informiert', keywords: ['notfall', 'melden', '118', 'polier'] },
      { id: 'k5', text: 'Einkauf und Werkhof mit eigenen Verantwortungen', keywords: ['einkauf', 'werkhof', 'subunternehmer', 'lager'] },
    ],
    solution: `| Aufgabe | GL | Bereichsl. | Projektl. | Bauführung | Polier | Fachstelle | Kontaktp. | Werkhof | Einkauf |
|---|---|---|---|---|---|---|---|---|---|
| Umweltpolitik und Ziele | V | M | I | I | I | M | I | I | I |
| Rechtskataster | I | I | I | I | – | V | M | I | – |
| Auflagen ins Projekt | – | I | V | M | I | M | – | – | – |
| Entsorgungskonzept | – | – | V | M | I | M | – | – | – |
| Massnahmen auf der Baustelle | – | I | M | V | M | M | M | – | – |
| Instruktion der Equipe | – | – | – | M | V | M | M | – | – |
| Begehungen | I | I | I | M | M | V | M | – | – |
| Notfall und Meldung | I | I | I | V | V (vor Ort) | I | I | – | – |
| Anforderungen an Subunternehmer | – | I | M | M | – | M | – | – | V |
| Lager und Waschplatz Werkhof | I | – | – | – | – | M | – | V | – |

**Hinweise**: Pro Aufgabe nur ein V (beim Notfall handelt, wer vor Ort ist). Die Fachstelle ist meist mitwirkend – verantwortlich nur für ausdrücklich übertragene Aufgaben. Matrix von der GL in Kraft setzen und bekannt machen.`,
    sources: ['or-vr', 'iso14001', 'praxis'],
  },
  {
    id: 'm12-t2', moduleId: M, topic: 'm12-planung', level: 2, setting: 'Hochbau',
    title: 'Umweltjahresplan',
    situation: 'Sie bereiten den Umweltjahresplan (fiktiv) für eine Hochbaufirma vor. Sie haben eine Stelle; davon gehen etwa 60 % für laufende Beratung, Vorfälle und Anfragen weg.',
    data: [
      'Vorjahr: zwei Vorfälle mit Betonwasser, eine Verwarnung des Amts',
      'Kunde (Pensionskasse) verlangt künftig Schadstoffermittlung vor Umbauten und Daten zu Recyclingbeton',
      'Rechtskataster seit drei Jahren nicht aktualisiert',
      'Ideen: Treibhausgasbilanz, Kontaktpersonen in Niederlassungen, neue Begehungs-App, Werkhof-Waschplatz sanieren, Biodiversität auf Baustellen',
    ],
    assignment: 'Erstellen Sie den Jahresplan mit höchstens vier Schwerpunkten (Massnahme, Verantwortlich, Termin, Ressourcen, Kennzahl) und begründen Sie, was Sie zurückstellen.',
    rubric: [
      { id: 'k1', text: 'Betonwasser als erster Schwerpunkt (Risiko, Vorfälle)', keywords: ['betonwasser', 'absetzbecken', 'vorfall', 'risiko'] },
      { id: 'k2', text: 'Rechtskataster aktualisieren (Pflichtgrundlage)', keywords: ['rechtskataster', 'aktualis'] },
      { id: 'k3', text: 'Kundenanforderung Schadstoffermittlung', keywords: ['schadstoff', 'kunde', 'umbau'] },
      { id: 'k4', text: 'Verantwortliche aus der Linie, Kennzahlen, realistische Ressourcen', keywords: ['verantwort', 'kennzahl', 'tage', 'ressourc'] },
      { id: 'k5', text: 'Zurückgestelltes begründet', keywords: ['zurück', 'später', 'folgejahr', 'begründ'] },
    ],
    solution: `| Schwerpunkt | Massnahme | Verantwortlich | Termin | Ressourcen | Kennzahl |
|---|---|---|---|---|---|
| Betonwasser | Absetzbecken mit Neutralisation für alle Hochbaustellen; Halbtag Praxis für Poliere | Werkhofleitung; Fachstelle | Q1–Q2 | Investition; 8 Tage Fachstelle | Anteil Baustellen mit korrekt betriebener Anlage in Begehungen |
| Rechtskataster | Aktualisierung, Verteilung an Projektleitende | Fachstelle | Q2 | 10 Tage | Erledigt; Änderungen kommuniziert |
| Schadstoffermittlung vor Umbauten | Ablauf in Offerte und AVOR verankern; Liste von Fachbüros | Bereichsleitung Umbau; Fachstelle | Q3 | 6 Tage | Anteil Umbauten mit Ermittlung vor Baubeginn |
| Recyclingbeton-Daten | Daten aus Lieferscheinen je Projekt erfassen | Einkauf | Q3–Q4 | 3 Tage | Daten für alle Projekte des Kunden verfügbar |

**Zurückgestellt** (Folgejahre): Treibhausgasbilanz (wichtig, aber zuerst Datenbasis aufbauen), Kontaktpersonen (nach Rechtskataster), Begehungs-App, Biodiversität. Waschplatz Werkhof: als Antrag für das Investitionsbudget des Folgejahres.

**Ressourcen**: rund 27 Tage Projektarbeit neben dem Tagesgeschäft – realistisch mit Reserve.`,
    sources: ['iso14001', 'praxis'],
  },
  {
    id: 'm12-t3', moduleId: M, topic: 'm12-wirkung', level: 3, setting: 'Tiefbau',
    title: 'Schulungskonzept',
    situation: 'Tiefbauunternehmen (fiktiv) mit 180 Mitarbeitenden, viele Temporäre und Subunternehmer. Bisher eine jährliche Umweltschulung im Saal für Bauführer.',
    data: [
      'Bedeutende Umweltaspekte: Gewässer (Pumpwasser, Betonwasser, Öl), Boden, Aushub und Altlasten, Lärm und Staub',
      'Häufigste Feststellungen in Begehungen: fehlende Notfallsets, ungeschützte Bodendepots, Pumpwasser ohne Absetzbecken',
      'Polieren fehlt Zeit für lange Schulungen',
    ],
    assignment: 'Erstellen Sie ein Schulungskonzept (Zielgruppe, Inhalt, Form, Häufigkeit, Verantwortlich) und legen Sie fest, wie Sie die Wirksamkeit prüfen.',
    rubric: [
      { id: 'k1', text: 'Zielgruppen differenziert (inkl. Temporäre, Subunternehmer)', keywords: ['bauführer', 'polier', 'maschinist', 'temporär', 'subunternehm'] },
      { id: 'k2', text: 'Inhalte nach Risiken und Feststellungen', keywords: ['notfall', 'boden', 'pumpwasser', 'absetzbecken'] },
      { id: 'k3', text: 'Kurze, praxisnahe Formen (Toolbox, am Objekt)', keywords: ['toolbox', 'kurz', 'vor ort', 'praxis', 'objekt'] },
      { id: 'k4', text: 'Linie instruiert, Fachstelle befähigt', keywords: ['polier', 'instruier', 'unterlage', 'befähig'] },
      { id: 'k5', text: 'Wirksamkeit über Begehungen und Kennzahlen', keywords: ['begehung', 'kennzahl', 'wirksam', 'verhalten'] },
    ],
    solution: `| Zielgruppe | Inhalt | Form | Häufigkeit | Verantwortlich |
|---|---|---|---|---|
| Bauführung | Umweltkonzept, Auflagen, Kontrolle, Notfall, Subunternehmer | Workshop mit eigenen Fällen | jährlich, 3 h | Fachstelle |
| Poliere | Pumpwasser, Bodendepot, Notfallset; wie instruiere ich meine Equipe | Halbtag auf einer Baustelle | alle 2 Jahre + Auffrischung | Fachstelle |
| Maschinisten, Mitarbeitende | Konkrete Handgriffe, Notfall | Toolbox-Meeting 15 min mit Blatt und Fotos | saisonal (Frühling Boden, Herbst Starkregen) | Polier/in |
| Temporäre | Grundregeln, Notfall, Ansprechperson | Baustelleneinführung mit Piktogrammen | beim ersten Einsatz | Polier/in |
| Subunternehmer | Baustellenregeln, Pflichten aus Vertrag | Startsitzung, Einführung | je Auftrag | Bauführung |
| Werkhof | Lager, Waschplatz, Abscheider | Vor Ort | jährlich | Werkhofleitung, Fachstelle |

**Wirksamkeit**: Vorab festgelegt – Anteil Baustellen mit Notfallset, mit geschütztem Bodendepot und mit Absetzbecken für Pumpwasser in den Begehungen; Vergleich vor und sechs Monate nach der Schulung. Stichprobenweise Fragen an Maschinisten bei Begehungen. Bei fehlender Wirkung: Ursachen prüfen (Ausrüstung, Zeit, Führung).`,
    sources: ['iso14001', 'praxis'],
  },
  {
    id: 'm12-t4', moduleId: M, topic: 'm12-beratung', level: 3, setting: 'Tiefbau',
    title: 'Entscheidungsvorlage',
    situation: 'Sie möchten bei der Geschäftsleitung (fiktiv) Umweltkontaktpersonen in den vier Niederlassungen einführen.',
    data: [
      'Fachstelle: 1 Stelle für 220 Mitarbeitende und rund 40 Baustellen gleichzeitig',
      'Begehungen erreichen nur etwa jede dritte Baustelle pro Quartal',
      'Vorschlag: je Niederlassung eine Bauführerin oder ein Bauführer mit 10 % Pensum',
      'Ein Grosskunde fragt nach der Umweltorganisation',
    ],
    assignment: 'Schreiben Sie die Entscheidungsvorlage (Ausgangslage, Risiko, Varianten mit Kosten und Nutzen, Empfehlung, Antrag).',
    rubric: [
      { id: 'k1', text: 'Ausgangslage mit Zahlen (Abdeckung der Begehungen)', keywords: ['ausgangslage', 'begehung', 'drittel', 'baustellen'] },
      { id: 'k2', text: 'Risiko benannt (Vorfälle, Kunde), Pflicht/Empfehlung eingeordnet', keywords: ['risiko', 'vorfall', 'kunde', 'empfehlung', 'pflicht'] },
      { id: 'k3', text: 'Mindestens zwei Varianten inkl. «nichts tun» mit Kosten', keywords: ['variante', 'nichts tun', 'kosten', 'pensum'] },
      { id: 'k4', text: 'Empfehlung begründet', keywords: ['empfehl', 'weil', 'begründ'] },
      { id: 'k5', text: 'Klarer Antrag (was, wer, bis wann)', keywords: ['antrag', 'beschluss', 'termin', 'verantwort'] },
    ],
    solution: `**Ausgangslage**: Die Fachstelle (1 Stelle) betreut rund 40 Baustellen gleichzeitig; Begehungen erreichen etwa jede dritte Baustelle pro Quartal. Ein Grosskunde fragt nach unserer Umweltorganisation.

**Risiko**: Mängel werden spät erkannt; Vorfälle mit Gewässern und Boden möglich. Kein gesetzliches Muss für Kontaktpersonen – es handelt sich um eine **Empfehlung** zur Risikosenkung; die Einhaltung der Umweltpflichten auf den Baustellen ist hingegen Pflicht.

**Varianten**:
1. *Nichts tun*: keine Kosten; Abdeckung bleibt gering.
2. *Kontaktpersonen* (4 × 10 % Pensum Bauführung + 2 Schulungstage pro Jahr): Kosten ≈ 0,4 Stelle; Begehungen auf allen Baustellen mindestens quartalsweise, schnellere Antworten vor Ort, Nachweis für Kunden.
3. *Zweite Stelle in der Fachstelle*: Kosten 1 Stelle; zentral, aber weniger Nähe zu den Niederlassungen.

**Empfehlung**: Variante 2 – bestes Verhältnis von Kosten und Wirkung, stärkt zugleich die Linie.

**Antrag**: Die GL beschliesst die Einführung von vier Umweltkontaktpersonen ab 1. April (10 % Pensum), bestimmt durch die Niederlassungsleitungen bis 15. März; fachliche Führung durch die Fachstelle; Überprüfung nach einem Jahr anhand der Begehungsabdeckung und der Feststellungen.`,
    sources: ['praxis'],
  },
  {
    id: 'm12-t5', moduleId: M, topic: 'm12-kultur', level: 3, setting: 'Hochbau',
    title: 'Widerstand auf der Baustelle',
    situation: 'Ein erfahrener Bauführer (fiktiv) lehnt Umweltmassnahmen offen ab («Früher ging es auch ohne») und hat seinen Polier angewiesen, das Absetzbecken abzubauen, weil wegen eines versetzten Krans der Platz fehlt.',
    data: [
      'Betonarbeiten laufen weiter; Waschwasser fliesst derzeit über eine Rinne Richtung Meteorschacht',
      'Der Bauführer ist im Team angesehen',
      'Die Bereichsleitung möchte keinen Konflikt',
    ],
    assignment: 'Beschreiben Sie Ihr Vorgehen: sofort, im Gespräch, in der Linie und längerfristig.',
    rubric: [
      { id: 'k1', text: 'Sofort: Ableitung in den Meteorschacht stoppen, Schacht sichern', keywords: ['sofort', 'stopp', 'schacht', 'abdecken', 'meteor'] },
      { id: 'k2', text: 'Gespräch: Platzproblem verstehen, gemeinsame Lösung', keywords: ['gespräch', 'platz', 'lösung', 'standort', 'zuhör'] },
      { id: 'k3', text: 'Pflicht klar: kein ungereinigtes Betonwasser', keywords: ['pflicht', 'betonwasser', 'gewässerschutz', 'nicht verhandel'] },
      { id: 'k4', text: 'Bereichsleitung informieren, dokumentieren', keywords: ['bereichsleitung', 'informier', 'dokument'] },
      { id: 'k5', text: 'Längerfristig: Kritiker einbinden, Platzbedarf in AVOR', keywords: ['einbind', 'botschafter', 'avor', 'installationsplan'] },
    ],
    solution: `1. **Sofort**: Ableitung stoppen lassen, Meteorschacht abdecken bzw. abdichten; Waschen nur noch in einen Container oder ein provisorisches Becken; prüfen, ob bereits verschmutztes Wasser ins Gewässer gelangt ist (dann Meldung nach Notfallablauf).
2. **Gespräch mit dem Bauführer** (unter vier Augen): Platzproblem anerkennen, gemeinsam einen neuen Standort oder eine kleinere Anlage suchen. Klar bleiben: Ungereinigtes Betonwasser darf nicht abgeleitet werden – das ist nicht verhandelbar.
3. **Linie**: Bereichsleitung sachlich informieren (Feststellung, Sofortmassnahme, vereinbarte Lösung); kurze Notiz zur Begehung.
4. **Nachkontrolle**: Nach einigen Tagen prüfen, ob die neue Anlage betrieben wird.
5. **Längerfristig**: Platz für Wasseraufbereitung im Installationsplan der AVOR vorsehen (Standard); den Bauführer einladen, seine Lösung in der Polierschulung zu zeigen. Bei wiederholter Weigerung: Eskalation an die Bereichsleitung bzw. GL.`,
    sources: ['gschg', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M12_TASKS: PracticeTask[] = [
  { id: 'm12-p1', moduleId: M, topic: 'm12-organisation', title: 'Rollen klären',
    goal: 'Die heutige Umweltorganisation Ihres Unternehmens sichtbar machen und Lücken erkennen.',
    steps: ['Erfassen Sie, wer heute welche Umweltaufgaben tatsächlich wahrnimmt.', 'Vergleichen Sie mit schriftlichen Regelungen (Reglement, Funktionsbeschreibungen).', 'Erstellen Sie einen Entwurf einer Verantwortlichkeitsmatrix.', 'Besprechen Sie ihn mit Ihrer vorgesetzten Person.'],
    deliverable: 'Verantwortlichkeitsmatrix (Entwurf) mit Liste der Lücken.',
    criteria: ['Ist-Zustand erfasst', 'Linie und Fachstelle klar getrennt', 'Lücken benannt', 'Besprochen'], confirmer: 'Vorgesetzte Person oder Geschäftsleitung' },
  { id: 'm12-p2', moduleId: M, topic: 'm12-planung', title: 'Jahresplan entwerfen',
    goal: 'Einen realistischen Umweltjahresplan für Ihr Unternehmen vorbereiten.',
    steps: ['Sammeln Sie Vorfälle, Begehungsergebnisse, Kundenanforderungen und Rechtsänderungen.', 'Bewerten Sie Ideen nach Risiko, Reichweite und Aufwand.', 'Wählen Sie höchstens vier Schwerpunkte mit Verantwortlichen und Kennzahlen.', 'Rechnen Sie Ihre Ressourcen in Tagen.'],
    deliverable: 'Jahresplan auf einer Seite mit Begründung der Prioritäten.',
    criteria: ['Grundlagen gesammelt', 'Prioritäten begründet', 'Verantwortliche aus der Linie', 'Ressourcen realistisch'], confirmer: 'Geschäftsleitung' },
  { id: 'm12-p3', moduleId: M, topic: 'm12-wirkung', title: 'Toolbox-Meeting durchführen lassen',
    goal: 'Eine kurze, praxisnahe Instruktion durch die Linie durchführen lassen und die Wirkung prüfen.',
    steps: ['Wählen Sie ein Thema mit häufigen Feststellungen.', 'Erstellen Sie ein einseitiges Blatt mit drei Fotos und drei Botschaften.', 'Lassen Sie einen Polier das Meeting durchführen; begleiten Sie das erste.', 'Prüfen Sie bei Begehungen in den Folgewochen, ob sich das Verhalten ändert.'],
    deliverable: 'Unterlage, Teilnehmerliste und Ergebnis der Wirkungskontrolle.',
    criteria: ['Thema risikobasiert gewählt', 'Unterlage kurz und verständlich', 'Durch die Linie durchgeführt', 'Wirkung geprüft'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm12-p4', moduleId: M, topic: 'm12-beratung', title: 'Entscheidungsvorlage schreiben',
    goal: 'Ein reales Anliegen als Entscheidungsvorlage der Führung vorlegen.',
    steps: ['Wählen Sie ein Anliegen, das einen Entscheid braucht.', 'Schreiben Sie eine Vorlage von höchstens zwei Seiten (Lage, Risiko, Varianten, Empfehlung, Antrag).', 'Lassen Sie sie von einer Kollegin oder einem Kollegen gegenlesen.', 'Legen Sie sie der zuständigen Stelle vor.'],
    deliverable: 'Entscheidungsvorlage und dokumentierter Entscheid.',
    criteria: ['Pflicht und Empfehlung unterschieden', 'Varianten mit Kosten', 'Klarer Antrag', 'Entscheid eingeholt'], confirmer: 'Entscheidende Stelle' },
  { id: 'm12-p5', moduleId: M, topic: 'm12-kultur', title: 'Kultur-Check',
    goal: 'Ein Bild der Umweltkultur in Ihrem Unternehmen gewinnen.',
    steps: ['Führen Sie kurze Gespräche mit fünf Personen aus verschiedenen Funktionen (z. B. Polier, Maschinist, Bauführerin, Einkauf, Bereichsleitung).', 'Fragen Sie: Was passiert, wenn jemand einen Umweltmangel meldet? Was geht vor, wenn der Termin drückt?', 'Fassen Sie Muster zusammen.', 'Leiten Sie zwei konkrete Massnahmen ab.'],
    deliverable: 'Kurze Auswertung mit zwei Massnahmen.',
    criteria: ['Verschiedene Funktionen befragt', 'Ehrliche Auswertung', 'Muster erkannt', 'Massnahmen konkret'], confirmer: 'Vorgesetzte Person' },
];

// ---------- Feynman ----------
export const M12_FEYNMAN: FeynmanTask[] = [
  { id: 'm12-f1', moduleId: M, topic: 'm12-beratung', audience: 'CEO',
    prompt: 'Erklären Sie einem CEO in 5–7 Sätzen, warum Umweltvorfälle im Bericht an den Verwaltungsrat vollständig erscheinen müssen – auch wenn sie «erledigt» sind.',
    rubric: [
      { id: 'f1', text: 'VR braucht vollständige Informationen für die Oberaufsicht', keywords: ['verwaltungsrat', 'oberaufsicht', 'vollständig'] },
      { id: 'f2', text: 'Risiko für Unternehmen und Personen bei unvollständiger Information', keywords: ['risiko', 'verantwort', 'haftung', 'vertrauen'] },
      { id: 'f3', text: 'Mit Ursache und Massnahmen darstellen – das zeigt Führung', keywords: ['ursache', 'massnahm', 'führung'] },
      { id: 'f4', text: 'Vertrauen und Glaubwürdigkeit', keywords: ['vertrauen', 'glaubwürd', 'offen'] },
      { id: 'f5', text: 'Kurz und ohne Fachjargon', keywords: [] },
    ] },
  { id: 'm12-f2', moduleId: M, topic: 'm12-kultur', audience: 'Bauführer',
    prompt: 'Erklären Sie einem neuen Bauführer in 5–7 Sätzen, warum er Beinahe-Ereignisse melden soll und was mit der Meldung passiert.',
    rubric: [
      { id: 'f1', text: 'Beinahe-Ereignisse zeigen Schwachstellen, bevor etwas passiert', keywords: ['beinahe', 'schwachstell', 'bevor', 'warnung'] },
      { id: 'f2', text: 'Keine Schuldzuweisung, Ursachen suchen', keywords: ['schuld', 'ursache', 'keine strafe'] },
      { id: 'f3', text: 'Was passiert: Auswertung, Massnahme, Rückmeldung', keywords: ['auswert', 'massnahm', 'rückmeld'] },
      { id: 'f4', text: 'Nutzen für ihn: weniger Vorfälle, Baustopps, Ärger', keywords: ['nutzen', 'baustopp', 'weniger', 'ärger'] },
      { id: 'f5', text: 'Praktisch, ohne Fachjargon', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M12_CARDS: Card[] = [
  { id: 'm12-c01', moduleId: M, topic: 'm12-organisation', level: 1, front: 'Wer ist für die Einhaltung auf der Baustelle verantwortlich?', back: 'Die **Linie** (Projektleitung, Bauführung, Polier), getragen von der **GL**. Die Fachstelle **berät, schult, kontrolliert**.', sources: ['praxis'] },
  { id: 'm12-c02', moduleId: M, topic: 'm12-organisation', level: 1, front: 'Wirksam delegieren?', back: '**Auswählen – instruieren – ausstatten – überwachen.**', sources: ['praxis'] },
  { id: 'm12-c03', moduleId: M, topic: 'm12-organisation', level: 2, front: 'Aufgabe des Verwaltungsrats?', back: '**Oberleitung, Organisation, Oberaufsicht** – auch über Umweltrisiken (sinngemäss Art. 716a OR).', sources: ['or-vr'] },
  { id: 'm12-c04', moduleId: M, topic: 'm12-organisation', level: 2, front: 'Was schriftlich regeln?', back: '**Rollen**, **Kompetenzen** (z. B. Stopp), **Schnittstellen**, **Eskalationswege** – Verantwortlichkeitsmatrix.', sources: ['praxis'] },
  { id: 'm12-c05', moduleId: M, topic: 'm12-planung', level: 1, front: 'Grundlagen der Strategie?', back: '**Risiken**, **Pflichten**, **Chancen**, **Ist-Stand**.', sources: ['iso14001'] },
  { id: 'm12-c06', moduleId: M, topic: 'm12-planung', level: 1, front: 'Prioritäten im Jahresplan?', back: '1. **Schwere Schäden und Rechtsverstösse** verhindern. 2. **Reichweite**. 3. **Chancen**. Wenige Schwerpunkte, verabschiedet.', sources: ['praxis'] },
  { id: 'm12-c07', moduleId: M, topic: 'm12-planung', level: 2, front: 'Gutes Ziel?', back: '**Spezifisch, messbar, terminiert, beeinflussbar**, mit Bezug zum **Risiko**.', sources: ['iso14001'] },
  { id: 'm12-c08', moduleId: M, topic: 'm12-planung', level: 2, front: 'Bonus für «null Vorfälle»?', back: 'Fehlanreiz: Vorfälle werden **verschwiegen**. Besser: **Früh-Kennzahlen** und **Meldekultur** belohnen.', sources: ['praxis'] },
  { id: 'm12-c09', moduleId: M, topic: 'm12-wirkung', level: 1, front: 'Gute Schulung auf der Baustelle?', back: '**Ein Thema**, kurz, **am Objekt**, selber machen, eigene Fehlerbilder, **Warum** erklären.', sources: ['praxis'] },
  { id: 'm12-c10', moduleId: M, topic: 'm12-wirkung', level: 1, front: 'Wirksamkeit – welche Ebenen zählen?', back: '**Verhalten** auf der Baustelle und **Ergebnis** (Feststellungen, Vorfälle).', sources: ['praxis'] },
  { id: 'm12-c11', moduleId: M, topic: 'm12-wirkung', level: 2, front: 'Vor der Schulung fragen?', back: 'Fehlt **Wissen** – oder **Ausrüstung**, **Zeit**, **Klarheit**, **Führung**?', sources: ['praxis'] },
  { id: 'm12-c12', moduleId: M, topic: 'm12-beratung', level: 1, front: 'Entscheidungsvorlage?', back: '**Lage – Risiko – Varianten (inkl. nichts tun) – Empfehlung – Antrag.** 1–2 Seiten.', sources: ['praxis'] },
  { id: 'm12-c13', moduleId: M, topic: 'm12-beratung', level: 1, front: 'Pflicht oder Empfehlung?', back: 'Pflicht: **wie**, nicht ob. Empfehlung: **Führung entscheidet**. Ehrlich unterscheiden.', sources: ['praxis'] },
  { id: 'm12-c14', moduleId: M, topic: 'm12-beratung', level: 2, front: 'Managementbericht?', back: 'Kurz, regelmässig; **Kennzahlen mit Trend**, **Vorfälle vorne**, Stand Plan, **Anträge**.', sources: ['praxis'] },
  { id: 'm12-c15', moduleId: M, topic: 'm12-kultur', level: 1, front: 'Umgang mit Widerstand?', back: '**Zuhören**, Gründe verstehen, **gemeinsam lösen** – bei **Pflichten klar** bleiben.', sources: ['praxis'] },
  { id: 'm12-c16', moduleId: M, topic: 'm12-kultur', level: 1, front: 'Eskalation?', back: '**Direkt → vorgesetzte Stelle → GL**; sachlich, dokumentiert. Bei Gefahr **sofort handeln**.', sources: ['praxis'] },
  { id: 'm12-c17', moduleId: M, topic: 'm12-kultur', level: 2, front: 'Gerechte Kultur?', back: 'Fehler → **System**; riskantes Verhalten → **Coaching**; bewusster Verstoss → **Konsequenzen**.', sources: ['praxis'] },
  { id: 'm12-c18', moduleId: M, topic: 'm12-kultur', level: 2, front: 'Druck zu Verstoss oder Täuschung?', back: '**Nicht mitmachen**, festhalten, **eskalieren**, Rat holen. **Meldepflichten im Notfall** gehen vor.', sources: ['gschg', 'praxis'] },
];

// ---------- Simulation ----------
export const M12_SCENARIO: Scenario = {
  id: 'sim-m', code: 'M', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Der zweite Vorfall',
  setting: 'Management', level: 3, minutes: 20,
  topics: ['m12-organisation', 'm12-beratung', 'm12-kultur'],
  intro: 'Bauunternehmung (fiktiv), 300 Mitarbeitende. Gestern ist auf einer Hochbaustelle zum zweiten Mal innert sechs Monaten Betonwaschwasser in einen Bach gelangt. Der Bauführer hat die Polizei alarmiert; Fischereiaufsicht und Amt waren vor Ort. Der CEO ruft Sie an: «In zwei Wochen ist Verwaltungsratssitzung. Ich brauche bis Freitag eine Lösung – und dem VR sagen wir, es war ein Einzelfall.»',
  facts: [
    'Nach dem ersten Vorfall gab es eine Schulung (Vortrag) für alle Poliere; weitere Massnahmen wurden nicht umgesetzt.',
    'Der Werkhof hat nur drei Absetzbecken für zwölf laufende Hochbaustellen.',
    'Im Umweltjahresplan war «Betonwasser» als Schwerpunkt vorgesehen; das Budget für Anlagen wurde gestrichen.',
    'Der betroffene Polier ist seit 20 Jahren im Unternehmen und gilt als zuverlässig.',
  ],
  stages: [
    {
      id: 'm1', title: 'Der Anruf des CEO', type: 'single', criteria: ['recht', 'zusammenarbeit'],
      situation: 'Der CEO wartet auf Ihre Antwort.',
      prompt: 'Wie antworten Sie?',
      options: [
        { id: 'o1', points: 2, text: '«Ich bereite bis Freitag eine Analyse und einen Vorschlag vor. Dem VR sollten wir offen sagen, dass es der zweite Vorfall ist – mit Ursachen und einem Plan. Das zeigt, dass wir es im Griff haben.»', feedback: 'Richtig: lösungsorientiert und ehrlich gegenüber dem Aufsichtsorgan.' },
        { id: 'o2', points: 0, critical: true, text: '«Einverstanden, wir stellen es als Einzelfall dar.»', feedback: 'Kritischer Fehler: Der VR würde über ein wiederkehrendes Risiko falsch informiert und könnte seine Oberaufsicht nicht wahrnehmen.', consequence: 'Drei Monate später fragt ein VR-Mitglied nach einem Zeitungsbericht über «wiederholte Verschmutzungen». Das Vertrauen in GL und Fachstelle ist beschädigt.' },
        { id: 'o3', points: 1, text: '«Ich mache eine Analyse. Was wir dem VR sagen, entscheiden Sie.»', feedback: 'Teilweise: Analyse richtig, aber Sie überlassen eine falsche Darstellung kommentarlos.' },
      ],
    },
    {
      id: 'm2', title: 'Was klären?', type: 'ask', criteria: ['unsicherheit', 'fachlich'], pick: 3,
      situation: 'Sie haben zwei Tage für die Analyse.',
      prompt: 'Welche drei Dinge klären Sie zuerst?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Ursachen beider Vorfälle im Vergleich', reveal: 'Beide Male fehlte ein Absetzbecken; es wurde im Bereich der Wasserhaltung gewaschen.', feedback: 'Zentral: gleiche Ursache – Systemproblem.' },
        { id: 'u2', points: 2, relevant: true, text: 'Verfügbarkeit von Anlagen und deren Planung in der AVOR', reveal: 'Drei Anlagen für zwölf Baustellen; in der AVOR-Checkliste kein Punkt dazu.', feedback: 'Zentral: Ausrüstung und Planung fehlen.' },
        { id: 'u3', points: 2, relevant: true, text: 'Was aus dem Jahresplan nach dem ersten Vorfall umgesetzt wurde', reveal: 'Nur die Schulung; das Budget für Anlagen wurde gestrichen.', feedback: 'Zentral: Entscheid mit Folgen – gehört in die Vorlage.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wie die Mitarbeitenden privat über den Polier denken', reveal: '—', feedback: 'Nicht relevant und keine Aufgabe der Fachstelle.' },
        { id: 'u5', points: 1, relevant: true, text: 'Kosten neuer Anlagen und mögliche Folgekosten', reveal: 'Anlagen mittlere fünfstellige Summe; Kosten des Vorfalls (Reinigung, Verfahren) noch offen.', feedback: 'Nützlich für die Vorlage.' },
      ],
    },
    {
      id: 'm3', title: 'Massnahmen', type: 'multi', criteria: ['fachlich', 'recht'],
      situation: 'Sie stellen das Massnahmenpaket zusammen.',
      prompt: 'Was schlagen Sie vor? (Alle sinnvollen wählen)',
      options: [
        { id: 'p1', points: 2, text: 'Sofort: Alle Hochbaustellen prüfen; wo kein Absetzbecken vorhanden ist, Waschen nur in Container bis zur Lieferung', feedback: 'Richtig: Risiko sofort senken.' },
        { id: 'p2', points: 2, text: 'Anlagen beschaffen, sodass jede Hochbaustelle eine hat; Punkt in AVOR-Checkliste und Installationsplan', feedback: 'Richtig: Ursache beheben.' },
        { id: 'p3', points: 2, text: 'Praxis-Halbtag für Poliere am Absetzbecken statt Vortrag', feedback: 'Richtig: wirksame Schulung.' },
        { id: 'p4', points: 2, text: 'Kennzahl in Begehungen: Anteil Baustellen mit korrekt betriebener Anlage; Wirksamkeitskontrolle nach drei Monaten', feedback: 'Richtig: Wirkung prüfen.' },
        { id: 'p5', points: 0, critical: true, text: 'Neue Regel: Bei Vorfällen zuerst die Fachstelle informieren, die über eine Meldung an die Behörde entscheidet', feedback: 'Kritischer Fehler: Eine Gewässerverschmutzung ist sofort über den Notruf zu melden; eine interne Vorprüfung verzögert die Meldung.', consequence: 'Beim nächsten Ereignis wartet ein Polier eine Stunde auf Rückruf; das Öl erreicht den Bach, die Meldung erfolgt zu spät.' },
        { id: 'p6', points: 0, text: 'Den Polier verwarnen und den Fall damit abschliessen', feedback: 'Falsch: Die Ursachen liegen im System (Ausrüstung, Budget, Planung).' },
      ],
    },
    {
      id: 'm4', title: 'Reihenfolge', type: 'rank', criteria: ['prioritaet', 'zusammenarbeit'],
      situation: 'Sie planen die Schritte bis zur VR-Sitzung und danach.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Sofortkontrolle aller Hochbaustellen, Übergangslösung' },
        { id: 'n2', text: 'Ursachenanalyse beider Vorfälle' },
        { id: 'n3', text: 'Entscheidungsvorlage an die GL mit Antrag und Kosten' },
        { id: 'n4', text: 'Offene Information des VR mit Ursachen und Plan' },
        { id: 'n5', text: 'Umsetzung: Anlagen, AVOR-Checkliste, Praxis-Halbtag' },
        { id: 'n6', text: 'Wirksamkeitskontrolle nach drei Monaten' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'],
      rankGroups: [['n1', 'n2'], ['n3'], ['n4', 'n5'], ['n6']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Das Risiko auf den übrigen Baustellen besteht jetzt – die Sofortkontrolle wartet nicht auf Analyse und Sitzungen.' }],
      rankExplanation: 'Sofortkontrolle und Analyse laufen parallel. Die Vorlage braucht die Analyse. Information des VR und Umsetzung können gleichzeitig laufen. Zuletzt die Prüfung, ob es wirkt.',
    },
    {
      id: 'm5', title: 'Die Frage im Verwaltungsrat', type: 'single', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Ein VR-Mitglied fragt: «Wer ist schuld? Der Polier oder die Umweltfachstelle?»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 2, text: '«Die Ursache liegt im System: zu wenige Anlagen, nicht in der AVOR geplant, und nach dem ersten Vorfall wurde nur geschult. Das Budget für Anlagen wurde gestrichen. Verantwortung tragen Linie und Leitung gemeinsam; der Plan behebt diese Ursachen.»', feedback: 'Richtig: sachlich, ehrlich, ohne Sündenbock – auch zum Budgetentscheid.' },
        { id: 'r2', points: 0, text: '«Der Polier hat einen Fehler gemacht.»', feedback: 'Falsch: verkürzt auf eine Person und verhindert Lernen.' },
        { id: 'r3', points: 1, text: '«Das sollten wir nicht im VR diskutieren.»', feedback: 'Teilweise: weicht aus; der VR hat Anspruch auf eine sachliche Antwort.' },
      ],
    },
    {
      id: 'm6', title: 'Die Entscheidungsvorlage', type: 'justify', criteria: ['begruendung', 'prioritaet'],
      situation: 'Sie schreiben den Kern der Vorlage für die GL.',
      prompt: 'Formulieren Sie in 5–7 Sätzen: Lage, Ursache, Varianten, Empfehlung, Antrag.',
      rubric: [
        { id: 'b1', text: 'Lage: zweiter Vorfall, gleiche Ursache', keywords: ['zweite', 'vorfall', 'gleiche', 'ursache'] },
        { id: 'b2', text: 'Systemursachen: Anlagen, AVOR, gestrichenes Budget', keywords: ['anlage', 'absetzbecken', 'avor', 'budget'] },
        { id: 'b3', text: 'Varianten mit Kosten (inkl. nichts tun)', keywords: ['variante', 'kosten', 'nichts tun'] },
        { id: 'b4', text: 'Klarer Antrag: Beschaffung, Verantwortlich, Termin', keywords: ['antrag', 'beschaff', 'verantwort', 'termin'] },
        { id: 'b5', text: 'Wirksamkeitskontrolle mit Kennzahl', keywords: ['wirksam', 'kennzahl', 'kontrolle', 'begehung'] },
      ],
    },
  ],
  debrief: 'Der zweite Vorfall war kein Pech, sondern die Folge eines Entscheids: Nach dem ersten Vorfall wurde nur geschult, die Anlagen wurden gestrichen. Wer ihn als Einzelfall darstellt, verhindert, dass die Leitung den Fehler korrigiert – und täuscht das Aufsichtsorgan. Gute Umweltführung heisst: Ursachen im System suchen, ehrlich berichten, mit einer klaren Vorlage einen Entscheid herbeiführen, umsetzen und die Wirkung prüfen. Und: Meldepflichten im Notfall gehen jeder internen Regel vor.',
  sources: ['or-vr', 'gschg', 'notruf', 'praxis'],
};
