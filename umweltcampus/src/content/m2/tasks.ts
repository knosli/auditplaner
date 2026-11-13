import type { FeynmanTask, PracticeTask } from '../types';

const M = 'm2';

// Praxisaufträge: Übertragung auf eine reale Baustelle oder einen betrieblichen
// Prozess. Status «bestätigt» setzt eine dokumentierte Bestätigung voraus –
// ein Klick auf «Erledigt» genügt nicht.
export const M2_TASKS: PracticeTask[] = [
  {
    id: 'm2-p1', moduleId: M, topic: 'recht', title: 'Gewässerschutz-Steckbrief einer laufenden Baustelle',
    goal: 'Die rechtlichen Rahmenbedingungen einer realen Baustelle erheben und verständlich zusammenfassen.',
    steps: [
      'Wählen Sie eine laufende Baustelle Ihres Unternehmens.',
      'Bestimmen Sie auf der kantonalen Gewässerschutzkarte (GIS) den Gewässerschutzbereich bzw. eine allfällige Schutzzone.',
      'Lesen Sie die Gewässerschutz-Auflagen der Baubewilligung heraus.',
      'Klären Sie, welches kantonale Merkblatt gilt und wer bei der Gemeinde für Einleitungen zuständig ist.',
      'Fassen Sie alles auf einer A4-Seite für den Polier zusammen und ordnen Sie jede Anforderung einer Verbindlichkeitsstufe zu.',
    ],
    deliverable: 'Steckbrief (1 Seite) mit Gewässerschutzbereich, Auflagen, Zuständigen und Verbindlichkeitsstufe je Anforderung.',
    criteria: ['Gewässerschutzbereich korrekt bestimmt (Quelle: Karte)', 'Alle Auflagen der Bewilligung erfasst', 'Verbindlichkeit je Anforderung richtig zugeordnet', 'Für den Polier verständlich formuliert'],
    confirmer: 'Bauführer/in oder Vorgesetzte/r Umwelt',
  },
  {
    id: 'm2-p2', moduleId: M, topic: 'entwaesserung', title: 'Schacht-Check: Wohin fliesst das Wasser?',
    goal: 'Auf einer realen Baustelle alle Schächte im Arbeitsbereich dem Entwässerungssystem zuordnen.',
    steps: [
      'Beschaffen Sie den Kanalisationskataster der Gemeinde für die Baustelle (wichtigste Grundlage, aber nicht unfehlbar: alte oder umgebaute Anschlüsse bei Unsicherheit von der Gemeinde bzw. einer Fachperson überprüfen lassen).',
      'Begehen Sie die Baustelle und erfassen Sie alle Schächte und Einläufe im Arbeits- und Installationsbereich.',
      'Ordnen Sie jedem Schacht zu: Meteor, Schmutz oder Misch – mit Quelle.',
      'Markieren Sie im Installationsplan, welche Meteorschächte abgedeckt werden müssen.',
      'Besprechen Sie das Ergebnis mit dem Polier und halten Sie vereinbarte Massnahmen fest.',
    ],
    deliverable: 'Installationsplan mit markierten Schächten und Massnahmenliste.',
    criteria: ['Kataster als Quelle verwendet', 'Alle Schächte im Arbeitsbereich erfasst', 'Massnahmen mit Verantwortlichem vereinbart'],
    confirmer: 'Polier/in oder Bauführer/in',
  },
  {
    id: 'm2-p3', moduleId: M, topic: 'alkalisch', title: 'Waschplatz-Standard für Betonarbeiten',
    goal: 'Einen einfachen, umsetzbaren Standard für die Reinigung von Pumpe, Kübeln und Fahrmischern auf Hochbaustellen entwerfen.',
    steps: [
      'Beobachten Sie auf einer Baustelle, wo und wie heute gereinigt wird (Fotos ohne Personen).',
      'Klären Sie mit einem Betonwerk, ob Trommelreinigung im Werk möglich ist.',
      'Skizzieren Sie einen Waschplatz mit Absetzbehälter und Neutralisation, inkl. Ableitweg und Zuständigkeit.',
      'Schätzen Sie Mietkosten und Aufwand grob ab.',
      'Stellen Sie den Entwurf einem Bauführer vor und holen Sie Rückmeldung ein.',
    ],
    deliverable: 'Standard-Entwurf (max. 2 Seiten) mit Skizze, Ablauf, Zuständigkeiten, Kosten und Rückmeldung.',
    criteria: ['Behandlungskette vollständig', 'Ableitung nur mit Zustimmung/Bewilligung', 'Kosten realistisch abgeschätzt', 'Rückmeldung der Praxis eingearbeitet'],
    confirmer: 'Bauführer/in oder Leitung Qualität/Umwelt',
  },
  {
    id: 'm2-p4', moduleId: M, topic: 'havarie', title: 'Notfallkarte Gewässerschutz für eine Baustelle',
    goal: 'Eine baustellenspezifische Notfallkarte erstellen und die Notfallausrüstung überprüfen.',
    steps: [
      'Erfassen Sie Notrufnummern, interne Alarmkette und Standort des Notfallmaterials.',
      'Prüfen Sie vor Ort: Ölbindemittel, Schachtabdeckungen, Auffangwannen – vorhanden, zugänglich, in Ordnung?',
      'Halten Sie auf der Karte fest: Nach der eigenen Sicherheit laufen Eindämmung und Alarmierung gleichzeitig; keine Arbeiten in Schächten oder im Gewässer ohne Einsatzkräfte.',
      'Erstellen Sie eine Notfallkarte (A5) mit den Sofortmassnahmen und baustellenspezifischen Angaben.',
      'Instruieren Sie Polier und Maschinisten in 10 Minuten anhand der Karte.',
    ],
    deliverable: 'Notfallkarte und Kurzprotokoll der Instruktion (Datum, Teilnehmende als Funktion, Inhalt).',
    criteria: ['Sofortmassnahmen korrekt: Sicherheit zuerst, dann Eindämmung und Alarmierung parallel', 'Baustellenspezifische Angaben vollständig', 'Mängel am Notfallmaterial erkannt und behoben', 'Instruktion durchgeführt'],
    confirmer: 'Polier/in oder Bauführer/in',
  },
  {
    id: 'm2-p5', moduleId: M, topic: 'konzept', title: 'Entwässerungskonzept prüfen und Rückmeldung geben',
    goal: 'Ein reales Entwässerungskonzept (oder das Fehlen eines solchen) anhand der sechs Leitfragen prüfen und schriftlich beraten.',
    steps: [
      'Beschaffen Sie das Entwässerungskonzept eines Projekts in Vorbereitung oder Ausführung.',
      'Prüfen Sie es mit der Checkliste «Entwässerungskonzept» aus der Wissensbibliothek – zuerst die Risikostufe nach SIA 431:2022 (gewässerkritische Bauprozesse, Bauchemikalien, belastete Standorte, Schutzgüter).',
      'Formulieren Sie eine schriftliche Rückmeldung (max. 1 Seite): Pflicht vs. Empfehlung, Varianten, Kostenhinweise, nächste Schritte.',
      'Besprechen Sie die Rückmeldung mit der verantwortlichen Projekt- oder Bauleitung.',
    ],
    deliverable: 'Ausgefüllte Checkliste und schriftliche Rückmeldung.',
    criteria: ['Risikostufe nach SIA 431:2022 begründet', 'Alle sechs Leitfragen geprüft', 'Pflicht und Empfehlung unterschieden', 'Konkrete, umsetzbare Vorschläge', 'Grenzen der eigenen Kompetenz benannt'],
    confirmer: 'Projektleiter/in oder Bauführer/in',
  },
  {
    id: 'm2-p6', moduleId: M, topic: 'truebstoffe', title: 'Notfallregel «Starkregen» für eine Tiefbaustelle',
    goal: 'Eine einfache, verbindliche Regel festlegen, was bei Trübung oder Überlauf der Behandlungsanlage zu tun ist.',
    steps: [
      'Erheben Sie auf einer Tief- oder Hochbaustelle mit Aushub: Pumpen, Becken, Einleitstelle, Bewilligungsbedingungen.',
      'Legen Sie fest, woran «zu trüb» erkannt wird: einfache Sichtprüfung und Foto als Frühwarnung, dazu die objektiven Kriterien der Bewilligung (z. B. Sichttiefe, GUS, pH) mit klaren Auslösewerten.',
      'Formulieren Sie die Regel: Wer stellt ab, wohin wird zurückgehalten (nur soweit die Standsicherheit der Grube das zulässt), wer meldet sofort an die Behörde bzw. 117, wer gibt die Einleitung wieder frei.',
      'Stimmen Sie die Regel mit Polier und Bauführer ab und hängen Sie sie bei der Anlage aus.',
    ],
    deliverable: 'Ausgehängte Regel (Foto) und kurze Notiz zur Abstimmung.',
    criteria: ['Auslösekriterium eindeutig', 'Rückhaltemöglichkeit geklärt', 'Melde- und Informationsweg festgelegt', 'Mit Verantwortlichen abgestimmt'],
    confirmer: 'Polier/in oder Bauführer/in',
  },
];

export const M2_FEYNMAN: FeynmanTask[] = [
  {
    id: 'm2-f1', moduleId: M, topic: 'alkalisch', audience: 'Polier auf einer Hochbaustelle',
    prompt: 'Erklären Sie einem Polier in eigenen Worten (5–8 Sätze), warum Betonwaschwasser nicht in den Schacht darf und was seine Leute stattdessen tun sollen. Vermeiden Sie Fachchinesisch.',
    rubric: [
      { id: 'f1', text: 'Nennt die starke Alkalität (pH 11–13) bzw. ätzende Wirkung verständlich', keywords: ['ph', 'alkal', 'ätz', 'lauge', 'basisch'] },
      { id: 'f2', text: 'Erklärt, dass Meteorschächte direkt in Bach/Grundwasser führen', keywords: ['bach', 'meteor', 'gewässer', 'grundwasser', 'direkt'] },
      { id: 'f3', text: 'Nennt Folgen für Fische/Gewässer und rechtliche Folgen', keywords: ['fisch', 'straf', 'verboten', 'anzeige', 'tier'] },
      { id: 'f4', text: 'Gibt eine konkrete Handlungsanweisung (Waschplatz, Absetzbehälter, Rutsche über Behälter, Trommel im Werk) und sagt, was zu tun ist, wenn schon etwas im Schacht ist (sofort melden)', keywords: ['waschplatz', 'absetz', 'behälter', 'werk', 'container', 'mulde'] },
      { id: 'f5', text: 'Ist verständlich und praxisnah formuliert (kurze Sätze, keine unerklärten Fachbegriffe)', keywords: [] },
    ],
  },
  {
    id: 'm2-f2', moduleId: M, topic: 'konzept', audience: 'Bauführer, der unter Kosten- und Termindruck steht',
    prompt: 'Erklären Sie einem Bauführer (5–8 Sätze), warum ein Entwässerungskonzept vor Baustart mehr ist als ein Papier für den Kanton – und was es konkret enthalten muss.',
    rubric: [
      { id: 'f1', text: 'Verknüpft das Konzept mit Kosten/Termin (frühe Planung günstiger, Baustopp-Risiko)', keywords: ['kosten', 'termin', 'baustopp', 'günstig', 'geld'] },
      { id: 'f2', text: 'Nennt die Kerninhalte (Abwasserarten, Behandlung, Einleitstellen, Bewilligungen)', keywords: ['abwasser', 'behandl', 'einleit', 'bewilligung', 'schacht'] },
      { id: 'f3', text: 'Nennt Zuständigkeiten und Kontrollen', keywords: ['zuständig', 'kontroll', 'verantwort', 'protokoll', 'mess'] },
      { id: 'f4', text: 'Nennt Notfallregeln (Starkregen, Havarie)', keywords: ['notfall', 'regen', 'havarie', 'alarm'] },
      { id: 'f5', text: 'Bietet konkrete Unterstützung bzw. nächsten Schritt an', keywords: ['helfe', 'unterstütz', 'vorschlag', 'gemeinsam', 'nächst'] },
    ],
  },
];
