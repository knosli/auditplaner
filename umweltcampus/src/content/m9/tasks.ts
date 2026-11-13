import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm9';

// ---------- Baustellenaufgaben (fiktive Projektdaten) ----------
export const M9_SITETASKS: SiteTask[] = [
  {
    id: 'm9-t1', moduleId: M, topic: 'm9-rolle', level: 2, setting: 'Tiefbau',
    title: 'Rollen an der Startsitzung klären',
    situation: 'Neubau einer Umfahrungsstrasse (fiktiv), Bauzeit zwei Jahre. Die Bewilligung verlangt eine UBB und eine BBB. Sie sind interne Umweltfachperson der ausführenden Unternehmung und bereiten die Startsitzung vor.',
    data: [
      'UBB: externes Umweltbüro, beauftragt von der Bauherrschaft; Pflichtenheft liegt Ihnen nicht vor',
      'BBB: Bodenkundlerin, beauftragt von der Bauherrschaft; Freigabe der Bodenarbeiten laut Auflage',
      'Bauleitung: Ingenieurbüro',
      'Ihre Firma: Bauführer, zwei Poliere, drei Subunternehmer',
    ],
    assignment: 'Welche Fragen zu Rollen, Berichtswegen und Befugnissen stellen Sie an der Startsitzung? Halten Sie fest, was Ihre Firma selbst organisiert.',
    rubric: [
      { id: 'k1', text: 'Pflichtenheft bzw. Aufgaben der UBB: Umfang, Rhythmus, Berichte', keywords: ['pflichtenheft', 'aufgabe', 'rhythmus', 'bericht'] },
      { id: 'k2', text: 'Befugnisse: Antrags-/Weisungsrecht, Unterbruch bei Gefahr; Weg über Bauleitung', keywords: ['befugnis', 'weisung', 'unterbr', 'bauleitung', 'stopp'] },
      { id: 'k3', text: 'Freigabeprozess BBB: wer fragt an, wie wird informiert', keywords: ['freigabe', 'bbb', 'anfrag', 'boden'] },
      { id: 'k4', text: 'Ansprechpersonen und Meldewege, auch bei Ereignissen', keywords: ['ansprechperson', 'meldeweg', 'ereignis', 'notfall', 'alarm'] },
      { id: 'k5', text: 'Eigene Organisation: Eigenkontrolle, Nachweise, Instruktion Subunternehmer', keywords: ['eigenkontrolle', 'nachweis', 'instru', 'subunternehm'] },
    ],
    solution: `**Fragen an der Startsitzung**
1. Was umfasst der Auftrag der UBB (Umweltbereiche, Bauphasen, Messungen)? Können wir das Pflichtenheft bzw. die für uns wichtigen Teile erhalten?
2. Wie oft begeht die UBB die Baustelle, und wie erfahren wir von Feststellungen (vor Ort, Bericht, Sitzung)?
3. An wen berichtet die UBB – und was geht an die Behörde?
4. Welche Befugnisse hat die UBB gegenüber der Unternehmung: Antrag an die Bauleitung, direkte Weisung, Unterbruch bei unmittelbarer Gefahr?
5. Wie läuft die Freigabe der Bodenarbeiten durch die BBB: Wer fragt an, bis wann, wie wird die Freigabe mitgeteilt und dokumentiert?
6. Wer ist bei einem Umweltereignis zu informieren, in welcher Reihenfolge (neben der Alarmierung über Polizei bzw. Feuerwehr)?
7. Wer ist Ansprechperson auf jeder Seite?

**Eigene Organisation der Unternehmung**
- Ansprechperson für UBB und BBB benennen (interne Umweltfachperson), Stellvertretung regeln.
- Eigenkontrolle: Poliere laufend, Bauführung und Umweltfachperson periodisch; Kontrollpunkte aus dem Massnahmenplan.
- Nachweise sammeln und bereithalten.
- Subunternehmer instruieren (inkl. Freigabeprozess Boden).

Die Antworten gehören ins Protokoll der Startsitzung. Befugnisse werden nicht angenommen, sondern geklärt.`,
    sources: ['bafu-ubb', 'kanton-boden', 'praxis'],
  },
  {
    id: 'm9-t2', moduleId: M, topic: 'm9-kontrolle', level: 2, setting: 'Hochbau',
    title: 'Kontrollkonzept für einen Rohbau',
    situation: 'Wohn- und Geschäftshaus (fiktiv) mit zwei Untergeschossen im Grundwasser, Rohbauphase acht Monate. Keine UBB-Auflage. Die Bewilligung verlangt ein Entwässerungskonzept und die Einhaltung der Bedingungen der Wasserhaltungsbewilligung.',
    data: [
      'Wasserhaltung mit Absetzanlage und Neutralisation, Einleitung in die Kanalisation mit Zustimmung',
      'Betonarbeiten zwei- bis dreimal pro Woche',
      'Tankstelle mit Auffangwanne, drei Meteorschächte im Arbeitsbereich',
      'Zwei Subunternehmer (Bewehrung, Gerüst)',
      'Bach 60 m entfernt, über die Meteorleitung verbunden',
    ],
    assignment: 'Entwerfen Sie ein Kontrollkonzept: Kontrollpunkte, wer, wie oft, womit, Nachweis. Nennen Sie die Schwerpunkte und begründen Sie sie.',
    rubric: [
      { id: 'k1', text: 'Schwerpunkt Gewässerschutz (Wasserhaltung, Waschwasser, Meteorschächte) risikobasiert begründet', keywords: ['wasserhaltung', 'meteor', 'waschwasser', 'risiko', 'bach'] },
      { id: 'k2', text: 'Drei Ebenen: Polier laufend, Bauführung/Umweltfachperson periodisch, Dritte', keywords: ['polier', 'täglich', 'bauführ', 'periodisch', 'begehung'] },
      { id: 'k3', text: 'Messungen/Protokolle gemäss Bewilligung', keywords: ['ph', 'protokoll', 'messung', 'bewilligung'] },
      { id: 'k4', text: 'Auslöser für zusätzliche Kontrollen (Starkregen, neuer Sub, neue Phase)', keywords: ['regen', 'subunternehm', 'phase', 'auslöser'] },
      { id: 'k5', text: 'Umgang mit dem Ergebnis: Massnahmenliste, Sitzung', keywords: ['massnahmenliste', 'sitzung', 'nachverfolg', 'bericht'] },
    ],
    solution: `| Kontrollpunkt | Wer | Wie oft (Vorschlag) | Womit | Nachweis |
|---|---|---|---|---|
| Absetzanlage und Neutralisation in Betrieb, Überlauf richtig geführt | Polier/in | täglich und vor jeder Betonage | Sichtkontrolle, Kurzcheck | Rapport |
| Messwerte der Wasserhaltung (z. B. pH, Trübung) | gemäss Bewilligung bezeichnete Funktion | gemäss Bewilligung | Messgerät nach Vorgabe | Messprotokoll |
| Meteorschächte abgedeckt und dicht | Polier/in | täglich | Sichtkontrolle | Rapport, Foto bei Mängeln |
| Tankstelle: Wanne leer und dicht, Bindemittel vorhanden | Polier/in | wöchentlich | Checkliste | Checkliste |
| Mulden, Lager, Subunternehmer | Bauführer/in | alle zwei Wochen | Begehung | Kurzprotokoll |
| Gesamtbegehung mit Schwerpunkt Gewässerschutz | interne Umweltfachperson | je Bauphase und etwa monatlich | Checkliste, Stichprobenmessung | Kontrollbericht |

**Schwerpunkte und Begründung**: Der Bach ist über die Meteorleitung in Minuten erreichbar, Zementwasser und Öl wirken dort sofort. Deshalb werden Wasserhaltung, Waschwasser und Schächte am häufigsten kontrolliert; Mulden und Lager stichprobenweise.

**Zusätzliche Kontrollen**: nach Starkregen, bei Inbetriebnahme oder Umbau der Wasserhaltung, beim ersten Einsatz eines Subunternehmers, vor Ferien.

**Ergebnis**: Feststellungen kommen in die Massnahmenliste und sind Traktandum der Baustellensitzung.

*Die Häufigkeiten sind Vorschläge. Verbindlich sind die Bedingungen der Wasserhaltungsbewilligung und des Entwässerungskonzepts.*`,
    sources: ['sia431', 'gschg', 'praxis'],
  },
  {
    id: 'm9-t3', moduleId: M, topic: 'm9-feststellung', level: 2, setting: 'Hochbau',
    title: 'Feststellungen einstufen',
    situation: 'Begehung einer Umbau-Baustelle (fiktiv) in der Rückbauphase. Sie notieren sechs Beobachtungen.',
    data: [
      '1. Mischmulde enthält Holz, Gips und Metall; die Trennung in Fraktionen ist im Entsorgungskonzept vorgesehen',
      '2. Im 2. OG werden Bodenbeläge herausgerissen; laut Schadstoffbericht sind sie asbesthaltig, die Sanierung ist für nächste Woche geplant',
      '3. Auffangwanne unter dem Hydraulikölfass zur Hälfte mit Regenwasser gefüllt',
      '4. Kompressor läuft in der Mittagspause; Bewilligung verlangt Ruhe von 12 bis 13 Uhr',
      '5. Ölbindemittel liegt im Magazin statt bei der Tankstelle',
      '6. Staubbindung beim Abbruch funktioniert gut, der Wasserschlauch ist fest installiert',
    ],
    assignment: 'Stufen Sie jede Beobachtung ein (kritisch, Abweichung, Hinweis, positiv) und nennen Sie die nächste Handlung.',
    rubric: [
      { id: 'k1', text: 'Nr. 2 als kritisch: Arbeit sofort unterbrechen lassen, Bereich sperren, Linie informieren', keywords: ['asbest', 'kritisch', 'unterbr', 'stopp', 'sperr'] },
      { id: 'k2', text: 'Nr. 1, 3, 4 als Abweichungen mit Massnahme und Termin', keywords: ['abweichung', 'mulde', 'wanne', 'kompressor', 'termin'] },
      { id: 'k3', text: 'Nr. 5 als Hinweis bzw. leichte Abweichung, Nr. 6 positiv', keywords: ['hinweis', 'bindemittel', 'positiv', 'staub'] },
      { id: 'k4', text: 'Bezug zur Anforderung je Feststellung', keywords: ['entsorgungskonzept', 'schadstoffbericht', 'bewilligung', 'standard', 'auflage'] },
    ],
    solution: `| Nr. | Einstufung | Bezug | Nächste Handlung |
|---|---|---|---|
| 2 | **Kritisch** | Schadstoffbericht; Arbeiten an asbesthaltigem Material vor der Sanierung | Arbeit sofort unterbrechen lassen, Bereich sperren, Polier und Bauführung holen; weiteres Vorgehen (Fachfirma, allfällige Meldung, Reinigung, Freigabe) durch die Zuständigen – Sie legen das Verfahren nicht selbst fest |
| 1 | Abweichung | Entsorgungskonzept, Trennpflicht | Trennung wiederherstellen, Mulden beschriften, Equipe instruieren – Polier/in, Termin |
| 3 | Abweichung | Firmenstandard Lagerung bzw. kantonales Merkblatt | Wanne leeren (Wasser auf Öl prüfen), überdachen – Polier/in, Termin |
| 4 | Abweichung | Auflage der Bewilligung (Ruhezeit) | Sofort abstellen; Regel mit Equipe und Subunternehmern klären |
| 5 | Hinweis (je nach Firmenstandard Abweichung) | Notfallorganisation | Bindemittel zur Tankstelle |
| 6 | Positiv | Massnahmen Luftreinhaltung | Im Bericht erwähnen |

Reihenfolge vor Ort: zuerst Nr. 2, alles andere danach. Die Einstufung ist ein internes Hilfsmittel, keine rechtliche Beurteilung.`,
    sources: ['suva-asbest', 'vvea', 'kvu-lagerung', 'praxis'],
  },
  {
    id: 'm9-t4', moduleId: M, topic: 'm9-bericht', level: 3, setting: 'Tiefbau',
    title: 'Feststellungen für den Bericht formulieren',
    situation: 'Nach einer Begehung auf einer Kanalisationsbaustelle (fiktiv) haben Sie diese Notizen im Handy:',
    data: [
      '«Tanken wieder mal katastrophal, Kanister überall»',
      '«Subunternehmer X macht was er will, Fässer am Graben, zum 2. Mal!!»',
      '«Absetzbecken top, Polier hat neues Protokoll»',
      '«Mulden – na ja»',
      'Fotos 1–9, Datum 22.05., Begehung 9.00–9.45 Uhr; Wasserhaltung und Depots nicht angeschaut',
    ],
    assignment: 'Formulieren Sie daraus sachliche Berichtseinträge. Was fehlt Ihnen an Informationen, um sie vollständig zu schreiben?',
    rubric: [
      { id: 'k1', text: 'Beobachtbar formuliert (was, wo), ohne Wertungen und Ausrufe', keywords: ['kanister', 'fässer', 'graben', 'ohne wanne', 'ort'] },
      { id: 'k2', text: 'Bezug, Einstufung, Massnahme mit Funktion und Termin', keywords: ['bezug', 'abweichung', 'massnahme', 'termin', 'polier'] },
      { id: 'k3', text: 'Wiederholung als Tatsache mit Datum der Erstfeststellung; Eskalationsstufe', keywords: ['wiederhol', 'zweite', 'datum', 'bauführ', 'eskal'] },
      { id: 'k4', text: 'Positives und Umfang (nicht angeschaut) aufgeführt', keywords: ['positiv', 'protokoll', 'nicht angeschaut', 'umfang'] },
      { id: 'k5', text: 'Fehlende Informationen benannt («na ja» ist keine Feststellung)', keywords: ['fehlt', 'unklar', 'nachfragen', 'genau'] },
    ],
    solution: `**Kopf**: 22.05., 9.00–9.45 Uhr; angeschaut: Tankstelle, Lager, Absetzbecken, Mulden. **Nicht angeschaut**: Wasserhaltung, Depots.

| Nr. | Feststellung | Bezug | Einstufung | Massnahme |
|---|---|---|---|---|
| 1 | Tankstelle: [Anzahl] Kanister stehen ausserhalb der Auffangwanne auf dem Kiesplatz (Fotos …) | Firmenstandard Betankung bzw. kantonales Merkblatt | Abweichung | Kanister in die Wanne, Platz ordnen – Polier/in – Termin |
| 2 | Lager des Subunternehmers [Gewerk]: [Anzahl] Fässer [Inhalt] ohne Auffangwanne, ca. [x] m vom Entwässerungsgraben (Fotos …). Bereits am [Datum] festgestellt | wie Nr. 1; Umweltanforderungen im Subunternehmervertrag | Abweichung, wiederholt | Wanne bereitstellen, Frist setzen – Bauführer/in (zweite Stufe) – Termin; Nachkontrolle |
| 3 | Absetzbecken in Betrieb; Protokoll seit [Datum] lückenlos geführt | Entwässerungskonzept | Positiv | – |

**Was fehlt**: Zu den Mulden gibt es keine Beobachtung («na ja») – entweder vor Ort nachsehen oder weglassen und als «nicht beurteilt» vermerken. Bei Nr. 1 und 2 fehlen Anzahl, Inhalt und Distanz; ohne diese Angaben lässt sich das Risiko nicht einschätzen (liegt der Graben in Fliessrichtung zu einem Gewässer, könnte Nr. 2 höher einzustufen sein).

Nicht in den Bericht gehören: «katastrophal», «macht was er will», Ausrufezeichen, Firmennamen als Schuldzuweisung (Funktion bzw. Gewerk genügt).`,
    sources: ['kvu-lagerung', 'praxis'],
  },
  {
    id: 'm9-t5', moduleId: M, topic: 'm9-nachverfolgung', level: 3, setting: 'Hochbau',
    title: 'Ursache finden und Massnahmen ableiten',
    situation: 'Auf einer Hochbaustelle (fiktiv) wird das pH-Protokoll der Absetzanlage zum dritten Mal lückenhaft vorgefunden: An Betoniertagen fehlen die Einträge. Die Bewilligung verlangt eine Messung vor jeder Ableitung.',
    data: [
      'Zuständig laut Massnahmenplan: «Polier»',
      'An Betoniertagen ist der Polier ab 6 Uhr bei der Pumpe',
      'Das Messgerät liegt im Bürocontainer, 150 m von der Anlage',
      'Der Maschinist der Wasserhaltung (Subunternehmer) ist täglich an der Anlage, wurde aber nie instruiert',
      'Bisherige Massnahme laut Bericht (zweimal): «Polier an Protokoll erinnern»',
    ],
    assignment: 'Führen Sie eine kurze Ursachenanalyse durch und schlagen Sie Korrektur, Korrekturmassnahmen und Vorbeugung vor. Wie prüfen Sie die Wirksamkeit?',
    rubric: [
      { id: 'k1', text: 'Ursachen: Zuständigkeit passt nicht zum Tagesablauf, Gerät nicht am Ort, Sub nicht instruiert', keywords: ['zuständig', 'tagesablauf', 'gerät', 'instru', 'ursache'] },
      { id: 'k2', text: 'Korrektur: Messung sofort sicherstellen; No-Go: keine Ableitung ohne Messung', keywords: ['sofort', 'messung', 'keine ableitung', 'no-go', 'bewilligung'] },
      { id: 'k3', text: 'Korrekturmassnahme: Zuständigkeit neu, Gerät an die Anlage, Instruktion, Stellvertretung', keywords: ['maschinist', 'stellvertret', 'an die anlage', 'neu'] },
      { id: 'k4', text: 'Vorbeugung: Standard/AVOR für andere Baustellen', keywords: ['andere baustellen', 'standard', 'avor', 'vorbeug'] },
      { id: 'k5', text: 'Wirksamkeit: Nachkontrolle des Protokolls an Betoniertagen', keywords: ['nachkontroll', 'wirksam', 'betoniertag', 'prüf'] },
    ],
    solution: `**Ursachen (mehrmals «Warum?»)**
- Warum fehlen Einträge? – An Betoniertagen misst niemand.
- Warum? – Der Polier ist zuständig, steht dann aber an der Pumpe.
- Warum misst kein anderer? – Es gibt keine Stellvertretung; der Maschinist an der Anlage ist nicht instruiert.
- Warum ist es mühsam? – Das Messgerät liegt 150 m entfernt.
«Polier erinnern» hat zweimal nicht gewirkt, weil die Ursache nicht beim Erinnern liegt.

**Korrektur (sofort)**: Ab heute wird vor jeder Ableitung gemessen und eingetragen. Ohne Messung keine Ableitung – das ist eine Bedingung der Bewilligung (No-Go), nicht nur ein Formular. Die Bauführung wird über die bisherigen Lücken informiert und entscheidet, ob und wem das zu melden ist (gemäss Bewilligung).

**Korrekturmassnahmen (Ursache)**
- Zuständigkeit an die Funktion, die an der Anlage ist (Maschinist/in Wasserhaltung), mit Stellvertretung; im Subunternehmervertrag bzw. schriftlich festhalten.
- Messgerät und Protokoll wettergeschützt an der Anlage.
- Instruktion vor Ort: Messung, Vorgehen bei Überschreitung, Eintrag.
- Kontrolle: Bauführer/in sieht das Protokoll wöchentlich ein.

**Vorbeugung (andere Baustellen)**: Im Firmenstandard und in der AVOR-Checkliste: Messzuständigkeit an die Funktion vor Ort, Gerät an der Anlage, Stellvertretung.

**Wirksamkeit**: Nachkontrolle nach zwei und nach sechs Wochen gezielt an Betoniertagen; abgeschlossen erst, wenn das Protokoll lückenlos ist.`,
    sources: ['sia431', 'gschg', 'iso14001', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M9_TASKS: PracticeTask[] = [
  { id: 'm9-p1', moduleId: M, topic: 'm9-rolle', title: 'Rollenlandkarte für ein Projekt',
    goal: 'Für ein laufendes Projekt klären, wer in Umweltfragen welche Rolle hat.',
    steps: ['Wählen Sie ein laufendes oder kommendes Projekt.', 'Listen Sie auf: Bauherrschaft, Bauleitung, UBB/BBB (falls vorhanden), Behörden, Bauführung, Poliere, Subunternehmer, Sie selbst.', 'Halten Sie je Rolle fest: Auftraggeber, Aufgabe, Befugnis, Berichtsweg – und woher Sie das wissen (Bewilligung, Vertrag, Pflichtenheft, Annahme).', 'Klären Sie die als «Annahme» markierten Punkte mit dem Bauführer.'],
    deliverable: 'Rollenlandkarte (eine Seite) mit geklärten Punkten.',
    criteria: ['Alle Rollen erfasst', 'Quelle je Angabe', 'Annahmen geklärt', 'Mit Bauführer besprochen'], confirmer: 'Bauführer/in oder Projektleiter/in' },
  { id: 'm9-p2', moduleId: M, topic: 'm9-kontrolle', title: 'Begehung mit Risikoschwerpunkt',
    goal: 'Eine Umweltbegehung risikobasiert vorbereiten und durchführen.',
    steps: ['Bereiten Sie eine Begehung vor: Massnahmenplan, letzter Bericht, Wetter, heutige Arbeiten.', 'Legen Sie drei Schwerpunkte fest und begründen Sie sie.', 'Führen Sie die Begehung durch: dem Wasser, den Stoffen, den Abfällen, der Grenze nach.', 'Prüfen Sie an zwei Massnahmen die drei Fragen: vorhanden, angewendet, wirksam.', 'Schliessen Sie vor Ort mit dem Polier ab.'],
    deliverable: 'Vorbereitungsnotiz mit Schwerpunkten und kurzes Begehungsprotokoll (inkl. «nicht angeschaut»).',
    criteria: ['Schwerpunkte begründet', 'Drei Prüffragen angewendet', 'Abschluss vor Ort', 'Umfang dokumentiert'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm9-p3', moduleId: M, topic: 'm9-feststellung', title: 'Einstufung und Stopp-Regel der Firma klären',
    goal: 'Ein gemeinsames Verständnis der Einstufungen und des Vorgehens bei unmittelbarer Gefahr schaffen.',
    steps: ['Prüfen Sie, wie Ihre Firma Feststellungen einstuft und was bei unmittelbarer Gefahr gilt (Stopp-Regel, Alarmierung).', 'Formulieren Sie je Stufe zwei Beispiele aus Ihren Baustellen.', 'Besprechen Sie die Beispiele mit zwei Polieren: Würden sie gleich einstufen?', 'Halten Sie Unterschiede fest und schlagen Sie der zuständigen Stelle eine Klärung vor.'],
    deliverable: 'Einseitige Übersicht «Einstufung und Sofortmassnahmen» mit Beispielen.',
    criteria: ['Bestehende Regeln geprüft', 'Beispiele je Stufe', 'Mit Polieren besprochen', 'Vorschlag eingereicht'], confirmer: 'Leitung Qualität/Umwelt oder Bauführer/in' },
  { id: 'm9-p4', moduleId: M, topic: 'm9-bericht', title: 'Kontrollbericht auf einer Seite',
    goal: 'Einen kurzen, priorisierten Kontrollbericht schreiben und seine Wirkung prüfen.',
    steps: ['Schreiben Sie nach einer Begehung einen Bericht nach der Vorlage in der Fachbibliothek – höchstens eine Seite plus Fotos.', 'Gehen Sie ihn vor dem Versand mit dem Polier durch.', 'Prüfen Sie Fotos und Text auf Personendaten und unsachliche Formulierungen.', 'Fragen Sie nach einer Woche zwei Empfänger: Was war klar, was nicht?'],
    deliverable: 'Bericht und Rückmeldungen der Empfänger.',
    criteria: ['Kritisches zuerst, Massnahmen mit Funktion und Termin', 'Umfang und Positives enthalten', 'Keine unnötigen Personendaten', 'Rückmeldung eingeholt'], confirmer: 'Bauführer/in' },
  { id: 'm9-p5', moduleId: M, topic: 'm9-nachverfolgung', title: 'Massnahmenliste und Wiederholungen auswerten',
    goal: 'Offene Massnahmen systematisch nachverfolgen und wiederkehrende Feststellungen erkennen.',
    steps: ['Führen Sie für eine Baustelle (oder alle) eine Massnahmenliste mit Status «offen / umgesetzt / wirksam abgeschlossen».', 'Kontrollieren Sie drei «umgesetzte» Massnahmen auf ihre Wirksamkeit.', 'Suchen Sie Feststellungen, die mehr als einmal vorkommen, und fragen Sie bei einer davon mehrmals «Warum?».', 'Schlagen Sie eine Korrekturmassnahme vor und besprechen Sie sie mit der Bauführung.'],
    deliverable: 'Massnahmenliste und kurze Ursachenanalyse mit Vorschlag.',
    criteria: ['Status ehrlich geführt', 'Wirksamkeit geprüft', 'Ursache statt Symptom', 'Vorschlag besprochen'], confirmer: 'Bauführer/in oder Leitung Qualität/Umwelt' },
];

// ---------- Feynman ----------
export const M9_FEYNMAN: FeynmanTask[] = [
  { id: 'm9-f1', moduleId: M, topic: 'm9-bericht', audience: 'Polier',
    prompt: 'Erklären Sie einem Polier in 5–7 Sätzen, warum Sie einen kritischen Befund in den Bericht schreiben, obwohl er ihn sofort behoben hat – und warum das für ihn spricht.',
    rubric: [
      { id: 'f1', text: 'Bericht als Nachweis sorgfältigen Handelns (festgestellt und behoben)', keywords: ['nachweis', 'beleg', 'behoben', 'sorgfalt'] },
      { id: 'f2', text: 'Weglassen ist riskant, wenn es später bekannt wird', keywords: ['später', 'bekannt', 'vertusch', 'risiko'] },
      { id: 'f3', text: 'Ursache finden, damit es nicht wieder passiert', keywords: ['ursache', 'wieder', 'lernen'] },
      { id: 'f4', text: 'Sachlich, ohne Schuldzuweisung – Funktion statt Name', keywords: ['sachlich', 'schuld', 'funktion'] },
      { id: 'f5', text: 'Respektvoll und auf Augenhöhe', keywords: [] },
    ] },
  { id: 'm9-f2', moduleId: M, topic: 'm9-nachverfolgung', audience: 'Projektleiter',
    prompt: 'Erklären Sie einem Projektleiter in 5–7 Sätzen den Unterschied zwischen einer Korrektur und einer Korrekturmassnahme – am Beispiel des Schachts, der dreimal offen war.',
    rubric: [
      { id: 'f1', text: 'Korrektur behebt den Mangel (Schacht abdecken)', keywords: ['korrektur', 'abdecken', 'mangel', 'symptom'] },
      { id: 'f2', text: 'Korrekturmassnahme beseitigt die Ursache (befahrbare Abdeckung, Fahrspur)', keywords: ['ursache', 'befahrbar', 'fahrspur', 'dauerhaft'] },
      { id: 'f3', text: 'Wiederholung als Signal', keywords: ['wiederhol', 'dreimal', 'signal'] },
      { id: 'f4', text: 'Wirksamkeit prüfen; Vorbeugung für andere Baustellen', keywords: ['wirksam', 'nachkontroll', 'andere baustellen', 'avor'] },
      { id: 'f5', text: 'Kurz, mit Nutzen für das Projekt (Kosten, Risiko)', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M9_CARDS: Card[] = [
  { id: 'm9-c01', moduleId: M, topic: 'm9-rolle', level: 1, front: 'Was ist eine UBB?', back: 'Fachperson bzw. Team, das die Umsetzung der Umweltauflagen **begleitet, kontrolliert und berichtet** – in der Regel **im Auftrag der Bauherrschaft**, meist per Auflage.', sources: ['bafu-ubb'] },
  { id: 'm9-c02', moduleId: M, topic: 'm9-rolle', level: 1, front: 'Vier Arten von Kontrolle?', back: '**Eigenkontrolle** (Unternehmung), **interne Umweltberatung**, **UBB** (Bauherrschaft), **Behörde**. Keine ersetzt die andere.', sources: ['praxis'] },
  { id: 'm9-c03', moduleId: M, topic: 'm9-rolle', level: 2, front: 'Was darf die UBB anordnen?', back: 'Was **Pflichtenheft und Bewilligung** vorsehen – oft Antragsrecht an die Bauleitung, bei unmittelbarer Gefahr häufig Unterbruch. **An der Startsitzung klären.**', sources: ['bafu-ubb'] },
  { id: 'm9-c04', moduleId: M, topic: 'm9-rolle', level: 2, front: 'Ihre Rolle als interne Umweltfachperson?', back: 'Beraten, instruieren, kontrollieren, verbessern – **für die Unternehmung**. Kein Weisungsrecht in der Linie, keine formelle UBB.', sources: ['praxis'] },
  { id: 'm9-c05', moduleId: M, topic: 'm9-kontrolle', level: 1, front: 'Kontrollkonzept – fünf Fragen?', back: '**Was**, **wer**, **wie oft**, **womit** – und **was geschieht mit dem Ergebnis**?', sources: ['praxis'] },
  { id: 'm9-c06', moduleId: M, topic: 'm9-kontrolle', level: 1, front: 'Drei Prüffragen zu jeder Massnahme?', back: '**Vorhanden?** **Angewendet?** **Wirksam?**', sources: ['praxis'] },
  { id: 'm9-c07', moduleId: M, topic: 'm9-kontrolle', level: 2, front: 'Reihenfolge beim Rundgang?', back: 'Dem **Wasser** nach, dann den **Stoffen**, den **Abfällen/Material**, der **Grenze** (Nachbarn, Strasse).', sources: ['praxis'] },
  { id: 'm9-c08', moduleId: M, topic: 'm9-kontrolle', level: 2, front: 'Gute Zeitpunkte für Begehungen?', back: 'Neue Bauphase, erste Betonage, neuer Subunternehmer, **nach Starkregen**, vor Wochenende/Ferien.', sources: ['praxis'] },
  { id: 'm9-c09', moduleId: M, topic: 'm9-feststellung', level: 1, front: 'Bestandteile einer Feststellung?', back: '**Was, wo, wann** (beobachtbar), Beleg, **Bezug zur Anforderung**, Einstufung. Keine Schuldzuweisung.', sources: ['praxis'] },
  { id: 'm9-c10', moduleId: M, topic: 'm9-feststellung', level: 1, front: 'Drei Stufen?', back: '**Kritisch** (Sofortmassnahme), **Abweichung** (Massnahme mit Termin), **Hinweis** (Empfehlung).', sources: ['praxis'] },
  { id: 'm9-c11', moduleId: M, topic: 'm9-feststellung', level: 2, front: 'Kritisch ohne dass etwas ausläuft?', back: 'Ja: wenn für eine **laufende Arbeit eine zwingende Freigabe oder Bewilligung fehlt** (z. B. Bodenarbeiten ohne Freigabe, Rückbau vor Schadstoffsanierung).', sources: ['praxis'] },
  { id: 'm9-c12', moduleId: M, topic: 'm9-feststellung', level: 1, front: 'Reihenfolge bei Umweltgefahr?', back: 'Eigenschutz → **Quelle stoppen** → **Ausbreitung verhindern** → **alarmieren/melden** → dokumentieren.', sources: ['notruf', 'gschg'] },
  { id: 'm9-c13', moduleId: M, topic: 'm9-bericht', level: 1, front: 'Aufbau Kontrollbericht?', back: 'Kopf, **Umfang (auch: nicht angeschaut)**, Feststellungen, Massnahmen (Funktion, Termin, Status), Positives, Nachverfolgung.', sources: ['praxis'] },
  { id: 'm9-c14', moduleId: M, topic: 'm9-bericht', level: 2, front: 'Regeln für Fotos?', back: '**Übersicht + Detail**, vorher/nachher, Datum und Ort, **Sachverhalte statt Personen**, Originale unverändert, Ablage in der Firma.', sources: ['dsg', 'praxis'] },
  { id: 'm9-c15', moduleId: M, topic: 'm9-bericht', level: 2, front: '«Schreib das nicht auf» – was tun?', back: 'Befund **mit Sofortmassnahme und Behebung** dokumentieren. Das spricht für die Baustelle; Weglassen ist riskant.', sources: ['praxis'] },
  { id: 'm9-c16', moduleId: M, topic: 'm9-nachverfolgung', level: 1, front: 'Korrektur vs. Korrekturmassnahme?', back: '**Korrektur**: Mangel beheben. **Korrekturmassnahme**: **Ursache** beseitigen. **Vorbeugung**: andernorts verhindern.', sources: ['iso14001'] },
  { id: 'm9-c17', moduleId: M, topic: 'm9-nachverfolgung', level: 2, front: 'Wann ist eine Massnahme abgeschlossen?', back: 'Wenn die **Nachkontrolle** zeigt, dass sie **wirkt** – nicht, wenn jemand «erledigt» sagt.', sources: ['praxis'] },
  { id: 'm9-c18', moduleId: M, topic: 'm9-nachverfolgung', level: 2, front: 'Richtig eskalieren?', back: '**Stufenweise, angekündigt, dokumentiert, mit Lösungsvorschlag.** Alarmierung und Pflichtmeldungen scheitern nie an internen Entscheiden.', sources: ['praxis'] },
];

// ---------- Baustellensimulation ----------
export const M9_SCENARIO: Scenario = {
  id: 'sim-i', code: 'I', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Begehung am Betoniertag',
  setting: 'Hochbau', level: 3, minutes: 20,
  topics: ['m9-kontrolle', 'm9-feststellung', 'm9-bericht', 'm9-nachverfolgung'],
  intro: 'Sie sind interne Umweltfachperson einer Bauunternehmung und kommen zu einer vereinbarten Stichprobe auf eine Hochbaustelle (fiktiv): Rohbau, zwei Untergeschosse, Wasserhaltung mit Absetzanlage. Heute wird die Decke über dem 1. UG betoniert. Keine UBB-Auflage. Sie haben sich beim Polier angemeldet; er hat wenig Zeit.',
  facts: [
    'Laut Kanalisationskataster führen die drei Schächte an der Zufahrt als Meteorleitung in einen Bach in 60 m Entfernung.',
    'Der letzte Bericht (vor vier Wochen) nennt: «Schacht 2 an der Zufahrt offen – abdecken – Polier – sofort».',
    'Ein neuer Subunternehmer pumpt heute zum ersten Mal Beton auf dieser Baustelle.',
    'Die Bewilligung verlangt die Ableitung des Baustellenabwassers über die Absetzanlage mit Neutralisation.',
  ],
  stages: [
    {
      id: 'i1', title: 'Wohin zuerst?', type: 'single', criteria: ['prioritaet', 'risiko'],
      situation: 'Sie haben etwa 30 Minuten. Der Fahrmischer steht bereit, die Betonpumpe des Subunternehmers ist an der Zufahrt aufgestellt.',
      prompt: 'Womit beginnen Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Mit der Zufahrt: Standort der Betonpumpe, die drei Schächte und wohin Wasch- und Restwasser der Pumpe gehen; danach Absetzanlage.', feedback: 'Richtig: Das heutige Risiko liegt bei der Betonpumpe des neuen Subunternehmers und den Meteorschächten.' },
        { id: 'o2', points: 1, text: 'Mit der Absetzanlage der Wasserhaltung, danach die Zufahrt.', feedback: 'Teilweise: wichtig, aber die Pumpe an den Meteorschächten ist heute das dringendere Risiko.' },
        { id: 'o3', points: 0, text: 'Mit den Mulden und dem Magazin, weil sie auf der Checkliste zuoberst stehen.', feedback: 'Falsch: Die Reihenfolge der Checkliste ist nicht die Reihenfolge des Risikos.' },
      ],
    },
    {
      id: 'i2', title: 'Der Schlauch', type: 'single', criteria: ['risiko', 'fachlich', 'recht'],
      situation: 'An der Zufahrt spült der Maschinist der Betonpumpe den Einfülltrichter mit dem Schlauch. Graues Wasser läuft über den Asphalt auf Schacht 2 zu. Die Abdeckung liegt zerbrochen daneben. Der Polier ist auf der Decke.',
      prompt: 'Was tun Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Den Maschinisten bitten, das Spülen sofort zu stoppen; mit ihm bzw. Arbeitern in der Nähe den Schacht provisorisch abdichten und das Wasser zurückhalten; den Polier holen; prüfen, ob Wasser in den Schacht gelangt ist – wenn ja oder unklar, alarmieren.', feedback: 'Richtig: Quelle stoppen, Ausbreitung verhindern, Linie einschalten, im Zweifel alarmieren.' },
        { id: 'o2', points: 0, critical: true, text: 'Fotos machen und warten, bis der Polier Zeit hat – Sie haben kein Weisungsrecht.', feedback: 'Kritischer Fehler: Bei unmittelbarer Gefahr abzuwarten, lässt Zementwasser über die Meteorleitung in den Bach laufen.', consequence: 'Das Spülwasser erreicht den Schacht. Zwanzig Minuten später meldet ein Anwohner trübes Wasser im Bach.' },
        { id: 'o3', points: 0, critical: true, text: 'Dem Maschinisten sagen, er solle mit mehr Wasser nachspülen, damit es sich verdünnt.', feedback: 'Kritischer Fehler: Verdünnen ist keine Behandlung und treibt das alkalische Wasser erst recht in den Schacht.', consequence: 'Eine grössere Menge alkalisches Wasser gelangt in die Meteorleitung.' },
      ],
    },
    {
      id: 'i3', title: 'Was klären?', type: 'ask', criteria: ['unsicherheit', 'zusammenarbeit'], pick: 3,
      situation: 'Das Spülen ist gestoppt, der Schacht provisorisch abgedichtet. Der Polier ist da.',
      prompt: 'Welche drei Informationen holen Sie jetzt?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Ob und wie viel Wasser in den Schacht gelangt ist', reveal: 'Der Schachtrand ist nass, im Schacht steht leicht trübes Wasser. Wie viel hineingelaufen ist, kann niemand sagen.', feedback: 'Zentral: Bei unklarer Lage wird alarmiert – nicht abgewartet.' },
        { id: 'u2', points: 2, relevant: true, text: 'Wo und wie der Subunternehmer seine Pumpe am Ende reinigen soll und ob er instruiert wurde', reveal: 'Der Subunternehmer hat keine Instruktion erhalten. Ein Waschplatz für die Pumpe ist nicht festgelegt.', feedback: 'Zentral: Die Ursache liegt bei Planung und Instruktion, nicht beim Maschinisten.' },
        { id: 'u3', points: 2, relevant: true, text: 'Warum die Abdeckung von Schacht 2 wieder fehlt', reveal: 'Sie wurde nach dem letzten Bericht ersetzt und von einem Lastwagen zerdrückt. Der Schacht liegt in der Fahrspur.', feedback: 'Zentral: Wiederholung – die Ursache ist nicht behoben.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wie der Maschinist heisst und seit wann er bei der Firma arbeitet', reveal: '—', feedback: 'Für die Massnahmen nicht nötig; Personendaten nur, wenn erforderlich.' },
        { id: 'u5', points: 1, relevant: true, text: 'Ob die Absetzanlage der Wasserhaltung heute in Betrieb ist', reveal: 'In Betrieb; das pH-Protokoll ist geführt.', feedback: 'Nützlich, aber im Moment nicht das Dringendste.' },
      ],
    },
    {
      id: 'i4', title: 'Reihenfolge', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Im Schacht steht trübes Wasser; ob etwas in die Leitung gelangt ist, ist unklar. Die Betonage soll weitergehen.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Alarmierung über Polizei bzw. Feuerwehr auslösen lassen und Bauführer informieren (unklare Lage, Meteorleitung zum Bach)' },
        { id: 'n2', text: 'Schacht dicht abdecken und Restwasser auf dem Platz aufnehmen bzw. zur Absetzanlage führen' },
        { id: 'n3', text: 'Mit dem Subunternehmer festlegen, wo die Pumpe gereinigt wird (gefasst, zur Absetzanlage bzw. Rückführung); erst dann weiterpumpen' },
        { id: 'n4', text: 'Zeiten, Mengen, Fotos und informierte Stellen festhalten' },
        { id: 'n5', text: 'Kontrollbericht schreiben und Ursachen mit Polier und Bauführer besprechen' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1', 'n2'], ['n3'], ['n4'], ['n5']],
      rankEarly: [
        { id: 'n1', maxPos: 2, why: 'Bei möglicher Gewässerverschmutzung wird sofort alarmiert – nicht erst nach dem Dokumentieren.' },
        { id: 'n2', maxPos: 2, why: 'Die Ausbreitung muss sofort verhindert werden.' },
      ],
      rankExplanation: 'Alarmieren und Abdichten laufen gleichzeitig und zuerst. Dann wird geklärt, wie die Pumpe sicher gereinigt wird – vorher wird nicht weitergepumpt (No-Go). Dokumentiert wird, wenn die Lage stabil ist; Bericht und Ursachenanalyse folgen.',
    },
    {
      id: 'i5', title: 'Die Bitte des Poliers', type: 'single', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Die Feuerwehr war da, hat die Leitung gespült und im Bach nichts Auffälliges gefunden. Der Polier nimmt Sie zur Seite: «Lass den Schacht im Bericht weg. Der stand schon letztes Mal drin – wenn das der Chef liest, bin ich dran.»',
      prompt: 'Wie reagieren Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass der Vorfall mit Alarmierung ohnehin bekannt ist und ein lückenhafter Bericht ihm schadet; den Befund sachlich aufnehmen – mit der raschen Reaktion und der Ursache (Schacht in der Fahrspur, Subunternehmer nicht instruiert) – und gemeinsam eine dauerhafte Lösung vorschlagen.', feedback: 'Richtig: ehrlich, fair und lösungsorientiert. Die Ursache liegt nicht bei der Person.' },
        { id: 'r2', points: 0, text: 'Den Schacht weglassen und nur das Spülwasser erwähnen.', feedback: 'Falsch: Der Bericht wäre unvollständig, die Wiederholung bliebe unbearbeitet – und die Lücke fiele bei der nächsten Kontrolle auf.' },
        { id: 'r3', points: 1, text: 'Alles aufnehmen und dazuschreiben, dass der Polier die Massnahme des letzten Berichts nicht umgesetzt hat.', feedback: 'Teilweise: vollständig, aber als Schuldzuweisung formuliert – und sachlich falsch, denn die Abdeckung wurde ersetzt und dann zerstört.' },
      ],
    },
    {
      id: 'i6', title: 'Bericht und Massnahmen', type: 'justify', criteria: ['begruendung', 'fachlich'],
      situation: 'Sie schreiben am Nachmittag den Berichtseintrag.',
      prompt: 'Schreiben Sie 5–8 Sätze: Feststellung, Sofortmassnahmen, Ursachen, Korrekturmassnahmen mit Funktion und Termin, Nachkontrolle.',
      rubric: [
        { id: 'b1', text: 'Feststellung sachlich: was, wo, wann; Einstufung kritisch', keywords: ['schacht', 'spül', 'uhr', 'kritisch', 'zufahrt'] },
        { id: 'b2', text: 'Sofortmassnahmen und Alarmierung mit Zeiten', keywords: ['gestoppt', 'abgedichtet', 'alarm', 'feuerwehr', 'sofort'] },
        { id: 'b3', text: 'Ursachen: Schacht in der Fahrspur, Subunternehmer nicht instruiert, kein Reinigungsplatz', keywords: ['fahrspur', 'instru', 'subunternehm', 'ursache', 'reinigungsplatz'] },
        { id: 'b4', text: 'Korrekturmassnahmen mit Funktion und Termin (befahrbare Abdeckung, Reinigungsplatz, Instruktion)', keywords: ['befahrbar', 'abdeckung', 'termin', 'bauführ', 'polier'] },
        { id: 'b5', text: 'Nachkontrolle und Vorbeugung (AVOR, andere Baustellen); ohne Schuldzuweisung', keywords: ['nachkontroll', 'avor', 'andere baustellen', 'wirksam'] },
      ],
    },
  ],
  debrief: 'Eine Begehung ist dann gut, wenn sie am richtigen Ort beginnt, bei Gefahr sofort handelt und danach die Ursache findet. Der offene Schacht war kein Versäumnis einer Person, sondern die Folge eines Schachts in der Fahrspur und eines nicht instruierten Subunternehmers – beides lässt sich dauerhaft lösen. Und: Der ehrliche Bericht schützt die Baustelle mehr als das Weglassen.',
  sources: ['gschg', 'sia431', 'notruf', 'gemeinde-entwaesserung', 'praxis'],
};
