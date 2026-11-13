import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm10';

// ---------- Baustellenaufgaben (fiktive Daten) ----------
export const M10_SITETASKS: SiteTask[] = [
  {
    id: 'm10-t1', moduleId: M, topic: 'm10-system', level: 2, setting: 'Hochbau',
    title: 'Umweltkarte für die Baustelle',
    situation: 'Ihre Firma (fiktiv, Hochbau, zertifiziert nach ISO 14001) hat ein Umwelthandbuch mit 60 Seiten. Im letzten Audit konnten Poliere die wichtigsten Umweltthemen ihrer Baustelle nicht nennen. Sie sollen eine «Umweltkarte Baustelle» entwerfen – eine A5-Karte für alle Mitarbeitenden.',
    data: [
      'Umweltpolitik der Firma: drei Verpflichtungen, zwei Seiten Text',
      'Bedeutende Aspekte laut Bewertung: Baustellenabwasser, wassergefährdende Stoffe, Bauabfälle, Staub und Lärm',
      'Equipen teils fremdsprachig; viele Temporäre und Subunternehmer',
      'Notfallnummern stehen im Handbuch',
    ],
    assignment: 'Entwerfen Sie den Inhalt der Karte (höchstens fünf Regeln plus Notfallteil) und begründen Sie Ihre Auswahl. Wie führen Sie die Karte ein?',
    rubric: [
      { id: 'k1', text: 'Höchstens fünf Regeln, an den bedeutenden Aspekten ausgerichtet', keywords: ['wasser', 'schacht', 'öl', 'tank', 'abfall', 'trenn'] },
      { id: 'k2', text: 'Notfallteil: stoppen, eindämmen, melden; Nummern und Ansprechperson', keywords: ['notfall', 'stopp', 'melden', 'nummer', 'alarm'] },
      { id: 'k3', text: 'Einfache Sprache, Bilder', keywords: ['bild', 'piktogramm', 'einfach', 'sprache'] },
      { id: 'k4', text: 'Einführung über Startinstruktion, auch für Subunternehmer', keywords: ['startinstru', 'startsitzung', 'subunternehm', 'einführ'] },
      { id: 'k5', text: 'Bezug zu Umweltpolitik/System (Karte ersetzt das Handbuch nicht)', keywords: ['politik', 'system', 'handbuch', 'ersetzt nicht'] },
    ],
    solution: `**Vorderseite – fünf Regeln (mit Bild)**
1. **Kein Schmutz- oder Zementwasser in Schacht, Bach oder Boden.** Waschen nur am Waschplatz.
2. **Tanken und Lagern nur auf der Wanne.** Bindemittel liegt daneben.
3. **Abfälle trennen.** Mulde ist beschriftet – im Zweifel fragen.
4. **Staub und Lärm klein halten.** Wasser gegen Staub, Motor aus, Ruhezeiten einhalten.
5. **Unsicher? Stopp und Polier fragen.** Unbekanntes Material, Geruch, Verfärbung: nicht weiterarbeiten.

**Rückseite – Notfall**
Eigenschutz → Quelle stoppen → Ausbreitung verhindern (Schacht abdecken, Bindemittel) → Polier holen → bei Gefahr für Wasser oder Boden: Feuerwehr 118 bzw. Polizei 117. Ansprechperson Umwelt der Firma: [Funktion, Telefon].

**Begründung**: Die Regeln decken die bedeutenden Aspekte ab und sind beobachtbar. Die Umweltpolitik steht als ein Satz zuunterst («Wir halten Recht und Auflagen ein, schützen Wasser und Boden und werden jedes Jahr besser.»). Die Karte ersetzt weder Handbuch noch Projektauflagen – sie macht das Wichtigste verfügbar.

**Einführung**: Abgabe und Erklärung an jeder Startinstruktion (auch an Temporäre und Subunternehmer), Aushang im Container, Kontrolle im Feld («Was machst du, wenn …?») bei Begehungen und im internen Audit.`,
    sources: ['iso14001', 'notruf', 'praxis'],
  },
  {
    id: 'm10-t2', moduleId: M, topic: 'm10-planung', level: 2, setting: 'Tiefbau',
    title: 'Umweltaspekte einer Strassenbaustelle',
    situation: 'Für die Überarbeitung der Aspektebewertung nehmen Sie eine typische Strassensanierung (fiktiv) als Beispiel: Belagsersatz, Werkleitungen, Randabschlüsse, 600 m, innerorts, Bach in 40 m Entfernung.',
    data: [
      'Tätigkeiten: Belag fräsen und abbrechen, Aushub Leitungsgraben, Betonarbeiten (Schächte, Randsteine), Belagseinbau, Transporte',
      'Maschinen: Fräse, Bagger, Walzen, Lastwagen, Tankanhänger',
      'Belag aus den 1970er-Jahren (PAK-Gehalt unbekannt)',
      'Meteorschächte entlang der Strasse führen in den Bach',
    ],
    assignment: 'Ermitteln Sie mindestens sechs Umweltaspekte mit Auswirkung, bewerten Sie sie grob (hoch / mittel / tief) mit Begründung und nennen Sie die drei bedeutendsten. Denken Sie auch an besondere Zustände und Notfälle.',
    rubric: [
      { id: 'k1', text: 'Aspekt und Auswirkung sauber unterschieden', keywords: ['aspekt', 'auswirkung'] },
      { id: 'k2', text: 'Abwasser/Meteorschächte und Treibstoff als hoch', keywords: ['schacht', 'zementwasser', 'diesel', 'öl', 'bach'] },
      { id: 'k3', text: 'Ausbauasphalt/PAK erkannt', keywords: ['pak', 'belag', 'asphalt', 'analyse'] },
      { id: 'k4', text: 'Lärm, Staub, Transporte, CO₂', keywords: ['lärm', 'staub', 'transport', 'co2', 'abgas'] },
      { id: 'k5', text: 'Besondere Zustände und Notfall (Starkregen, Leckage)', keywords: ['starkregen', 'notfall', 'leck', 'regen'] },
    ],
    solution: `| Tätigkeit | Aspekt | Auswirkung | Bewertung | Begründung |
|---|---|---|---|---|
| Betonarbeiten | Zementhaltiges Waschwasser | Gewässerschädigung über Meteorschächte | **hoch** | Bach in Minuten erreichbar, Schaden sofort |
| Betankung, Maschinen | Treibstoff- und Ölverlust (auch Notfall: Leck am Tankanhänger) | Gewässer- und Bodenverschmutzung | **hoch** | Meteorschächte, geringe Mengen wirken |
| Belagsabbruch | Ausbauasphalt mit unbekanntem PAK-Gehalt | Falsche Verwertung bzw. Entsorgung, Schadstoffverschleppung | **hoch** | Rechtlich geregelt (VVEA), Analyse nötig |
| Aushub | Aushubmaterial, evtl. belastet | Ressourcenverlust, falsche Entsorgung | mittel | Menge klein, aber innerorts Auffüllungen möglich |
| Fräsen, Abbruch, Verdichten | Lärm, Staub, Erschütterungen | Belästigung der Anwohnenden | mittel bis hoch | Innerorts; je nach Auflage (Massnahmenstufe) |
| Transporte, Maschinen | Abgase, CO₂ | Luftbelastung, Klimawirkung | mittel | Dauerhaft, aber wenig standortspezifisch |
| Starkregen (besonderer Zustand) | Abschwemmung von Feinmaterial | Trübung des Bachs | mittel bis hoch | Offene Flächen, Schächte |
| Belagseinbau | Bindemitteldämpfe, Trennmittel | Geruch, Stoffeintrag | tief bis mittel | Kurzzeitig; Trennmittel richtig lagern |

**Die drei bedeutendsten**: Baustellenabwasser, wassergefährdende Stoffe, Ausbauasphalt.

*Die Bewertung ist ein Beispiel. Im System der Firma gelten deren festgelegte Kriterien; die Einstufung des Belags richtet sich nach der Analyse.*`,
    sources: ['iso14001', 'vvea', 'gschg', 'praxis'],
  },
  {
    id: 'm10-t3', moduleId: M, topic: 'm10-betrieb', level: 2, setting: 'Tiefbau',
    title: 'Notfallvorsorge für eine Baustelle am Bach',
    situation: 'Brückeninstandsetzung (fiktiv) über einen Bach, Bauzeit sechs Monate. Installationsplatz auf einer Kiesfläche 15 m vom Ufer. Sie überprüfen die Notfallvorsorge.',
    data: [
      'Tankanhänger 900 l Diesel, Hydraulikbagger, Betonpumpe an Betoniertagen',
      'Notfallblatt der Firma hängt im Container; Telefonnummer der Ansprechperson stammt von 2022',
      'Ölbindemittel: ein Sack im Magazin; Schachtabdeckungen: keine; Ölsperre für Gewässer: keine',
      'Equipe von sieben Personen, zwei Temporäre; eine Notfallübung gab es nie',
    ],
    assignment: 'Beurteilen Sie die Notfallvorsorge nach den fünf Schritten (bestimmen, planen, bekannt machen, üben, auswerten) und schlagen Sie Massnahmen vor.',
    rubric: [
      { id: 'k1', text: 'Notfälle bestimmt: Dieselleck, Hydraulikschlauch, Zementwasser, Hochwasser', keywords: ['diesel', 'hydraulik', 'zementwasser', 'hochwasser', 'leck'] },
      { id: 'k2', text: 'Material am Ort und ausreichend (Bindemittel, Abdeckung, ggf. Ölsperre)', keywords: ['bindemittel', 'ölsperre', 'abdeck', 'material', 'am platz'] },
      { id: 'k3', text: 'Notfallblatt aktuell und an den Risikoorten', keywords: ['notfallblatt', 'nummer', 'aktuell', 'tankstelle', 'aushang'] },
      { id: 'k4', text: 'Übung mit Equipe inkl. Temporäre', keywords: ['übung', 'üben', 'temporär', 'equipe'] },
      { id: 'k5', text: 'Auswertung und Rückfluss ins System', keywords: ['auswert', 'lehre', 'andere baustellen', 'system'] },
    ],
    solution: `| Schritt | Befund | Massnahme |
|---|---|---|
| Bestimmen | Nicht festgehalten | Notfälle für diese Baustelle benennen: Leck am Tankanhänger, Hydraulikschlauch über dem Wasser, Zement- bzw. Pumpenwasser, Hochwasser mit Abschwemmung |
| Planen | Material ungenügend und am falschen Ort | Bindemittel in ausreichender Menge **an Tankplatz und Brücke**; Auffangmöglichkeit unter Maschinen über dem Wasser; mit der Firma bzw. der Feuerwehr klären, welche Mittel für das Gewässer nötig sind (z. B. Ölsperre) und wer sie stellt |
| Bekannt machen | Notfallblatt mit veralteter Nummer, nur im Container | Blatt aktualisieren; Aushang an Tankplatz und im Container; Instruktion der ganzen Equipe inkl. Temporäre |
| Üben | Nie geübt | Kurze Übung «Diesel läuft aus» in der ersten Woche; Material dabei prüfen |
| Auswerten | – | Ergebnis festhalten, Lücken schliessen; Hinweis an die Firma: Nummern auf allen Notfallblättern prüfen |

**Reihenfolge im Ereignis** (auf dem Blatt): Eigenschutz → Quelle stoppen → Ausbreitung verhindern → alarmieren (Feuerwehr 118 bzw. Polizei 117) → Polier/Bauführung → dokumentieren.

*Welche Mittel am Gewässer vorgehalten werden müssen, ergibt sich aus Bewilligung, kantonalen Vorgaben und dem Konzept des Projekts; die Tabelle ist ein Vorschlag.*`,
    sources: ['iso14001', 'kvu-lagerung', 'notruf', 'gschg'],
  },
  {
    id: 'm10-t4', moduleId: M, topic: 'm10-audit', level: 3, setting: 'Hochbau',
    title: 'Auditplan für eine Baustelle',
    situation: 'Sie sollen als interne/r Auditor/in eine Hochbaustelle (fiktiv) einer anderen Abteilung auditieren: Rohbau, Wasserhaltung, drei Subunternehmer. Zeit: drei Stunden vor Ort.',
    data: [
      'Auditkriterien: Verfahren «Projektstart Umwelt», Standard Baustellenabwasser, Standard Betankung/Lagerung, Bewilligungsauflagen des Projekts',
      'Letztes internes Audit im Unternehmen: Abweichung «Auflagen der Projekte nicht systematisch erfasst»',
      'Gesprächspartner verfügbar: Bauführer, Polier, Maschinist Wasserhaltung (Subunternehmer), zwei Bauarbeiter',
    ],
    assignment: 'Erstellen Sie einen Auditplan (Ablauf mit Zeiten, Themen, Gesprächspartnern) und formulieren Sie je Thema ein bis zwei gute Fragen. Welchem «Faden» folgen Sie?',
    rubric: [
      { id: 'k1', text: 'Eröffnung und Abschluss vor Ort eingeplant', keywords: ['eröffnung', 'abschluss', 'besprech'] },
      { id: 'k2', text: 'Grossteil der Zeit auf der Baustelle, nicht im Büro', keywords: ['baustelle', 'rundgang', 'vor ort', 'beobacht'] },
      { id: 'k3', text: 'Faden: von einer Auflage über Auflagenliste/Massnahmenplan bis zum Nachweis', keywords: ['auflage', 'auflagenliste', 'massnahmenplan', 'nachweis', 'faden'] },
      { id: 'k4', text: 'Offene Fragen, auch an Arbeiter und Subunternehmer', keywords: ['wie', 'zeigen', 'subunternehm', 'arbeiter', 'offen'] },
      { id: 'k5', text: 'Wirksamkeit der früheren Korrekturmassnahme geprüft', keywords: ['letztes audit', 'wirksam', 'korrekturmassnahme', 'früher'] },
    ],
    solution: `| Zeit | Thema | Mit wem | Fragen / Vorgehen |
|---|---|---|---|
| 0.00–0.15 | Eröffnung | Bauführer/in, Polier/in | Zweck: Wir prüfen, ob unser System hier funktioniert – nicht Sie. Ablauf, Sicherheit. |
| 0.15–0.45 | Projektstart, Auflagen | Bauführer/in | «Zeigen Sie mir, wie Sie die Auflagen dieses Projekts erfasst haben.» Eine Auflage auswählen und verfolgen: Auflagenliste → Massnahmenplan → Kontrolle → Nachweis. |
| 0.45–1.45 | Rundgang: Wasserhaltung, Waschplatz, Schächte, Tankplatz, Mulden | Polier/in, Maschinist/in, Bauarbeiter | «Wohin geht dieses Wasser?» «Was tun Sie, wenn der pH zu hoch ist?» «Wo ist das Bindemittel?» Beobachten: vorhanden – angewendet – wirksam. |
| 1.45–2.15 | Subunternehmer | Polier/in, Maschinist/in | «Wie wurden Sie auf dieser Baustelle instruiert?» Vertragsbeilage und Instruktionsnachweis einsehen. |
| 2.15–2.40 | Nachweise | Bauführer/in | Stichprobe: Messprotokolle, Entsorgungsbelege, letzter Begehungsbericht und Stand der Massnahmen. |
| 2.40–3.00 | Abschluss | Bauführer/in, Polier/in | Feststellungen mit Nachweisen vorstellen, Fakten abgleichen, Stärken nennen, weiteres Vorgehen. |

**Faden**: Die frühere Abweichung («Auflagen nicht systematisch erfasst») wird an diesem Projekt geprüft – so zeigt das Audit, ob die Korrekturmassnahme wirkt.

**Danach**: kurzer Bericht (Umfang, Feststellungen als Anforderung – Nachweis – Bewertung, Stärken, Potenzial); Korrekturmassnahmen durch die auditierte Stelle; Nachverfolgung.`,
    sources: ['iso14001', 'iso19011', 'praxis'],
  },
  {
    id: 'm10-t5', moduleId: M, topic: 'm10-verbesserung', level: 3, setting: 'Hochbau',
    title: 'Vorlage für die Managementbewertung',
    situation: 'Sie bereiten die jährliche Managementbewertung Ihrer Firma (fiktiv, Hoch- und Tiefbau, 180 Mitarbeitende) vor. Folgende Daten liegen vor:',
    data: [
      'Umweltereignisse: 6 gemeldet (Vorjahr 4), davon 2 mit Alarmierung; 4 betrafen Subunternehmer',
      'Begehungen: 38 von 52 geplanten durchgeführt',
      'Massnahmen aus Begehungen: 61 % fristgerecht abgeschlossen',
      'Ziel «Abfalltrennung auf Hochbaustellen»: erreicht',
      'Ziel «Auflagenliste vor Baustart auf allen Projekten»: 14 von 22 Projekten',
      'Internes Audit: Instruktion der Subunternehmer nur auf 5 von 9 Baustellen belegt',
      'Neue Norm-Ausgabe ISO 14001:2026 veröffentlicht; Übergangsfrist läuft',
    ],
    assignment: 'Wählen Sie drei Themen aus und formulieren Sie je einen Antrag nach «Lage – Bewertung – Antrag». Was lassen Sie bewusst weg?',
    rubric: [
      { id: 'k1', text: 'Subunternehmer als Schwerpunkt erkannt (Ereignisse + Auditbefund)', keywords: ['subunternehm', 'instru', 'ereignis'] },
      { id: 'k2', text: 'Auflagenliste: Ziel verfehlt, Ursache und Antrag', keywords: ['auflagenliste', '14', '22', 'ziel', 'avor'] },
      { id: 'k3', text: 'Begehungen/Massnahmen: Kapazität bzw. Nachverfolgung', keywords: ['begehung', '38', 'kapazität', 'massnahmen', '61'] },
      { id: 'k4', text: 'Antrag mit Kosten/Mitteln, Verantwortung, Termin', keywords: ['antrag', 'kosten', 'verantwort', 'termin', 'mittel'] },
      { id: 'k5', text: 'Ehrliche Lesart der Ereigniszahl; Norm-Umstellung als Planungspunkt', keywords: ['meldekultur', 'gemeldet', '2026', 'umstellung', 'übergang'] },
    ],
    solution: `**Antrag 1 – Subunternehmer**
- *Lage*: 4 von 6 Ereignissen betrafen Subunternehmer; Instruktion nur auf 5 von 9 auditierten Baustellen belegt.
- *Bewertung*: grösstes erkennbares Risiko; Ursache vermutlich fehlender fester Schritt vor Arbeitsbeginn.
- *Antrag*: Umweltinstruktion als Bedingung für den Arbeitsbeginn jedes Subunternehmers (Vertragsbeilage, Unterschrift auf der Instruktionsliste), Verantwortung Bauführung, ab nächstem Quartal; Kontrolle in Begehungen. Aufwand: gering.

**Antrag 2 – Auflagenliste**
- *Lage*: Ziel 100 %, erreicht 14 von 22 Projekten.
- *Bewertung*: bindende Verpflichtungen der Projekte nicht verlässlich erfasst; frühere Auditabweichung nicht wirksam behoben.
- *Antrag*: Auflagenliste als Pflichtpunkt der Projektfreigabe (kein Baustart ohne); Verantwortung Projektleitung; Unterstützung durch die Umweltfachperson in der AVOR. Ziel beibehalten.

**Antrag 3 – Begehungen und Nachverfolgung**
- *Lage*: 38 von 52 Begehungen; 61 % der Massnahmen fristgerecht.
- *Bewertung*: Kapazität hängt an einer Person; Nachverfolgung zu schwach.
- *Antrag*: zwei Bauführer als interne Begeher ausbilden; Massnahmenliste als festes Traktandum der Baustellensitzung; Zielwert für fristgerechte Erledigung festlegen. Mittel: Ausbildung und Zeitbudget.

**Kurz erwähnt**: Abfallziel erreicht (neues Ziel vorschlagen); Umstellung auf ISO 14001:2026 mit der Zertifizierungsstelle planen. Die Zunahme der gemeldeten Ereignisse wird nicht als Verschlechterung dargestellt, ohne die Meldekultur zu prüfen – mehr Meldungen können ein gutes Zeichen sein.

**Bewusst weggelassen**: Detailzahlen ohne Entscheidungsbedarf (Büroverbrauch, Anzahl Schulungsstunden).`,
    sources: ['iso14001', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M10_TASKS: PracticeTask[] = [
  { id: 'm10-p1', moduleId: M, topic: 'm10-system', title: 'Das eigene System lesen',
    goal: 'Das Umweltmanagementsystem der eigenen Firma kennen und seinen Bezug zur Baustelle beurteilen.',
    steps: ['Beschaffen Sie Umweltpolitik, Anwendungsbereich und Organigramm bzw. Rollenbeschrieb.', 'Prüfen Sie: Sind die Baustellen im Anwendungsbereich? Wer hat welche Verantwortung?', 'Fragen Sie drei Personen auf Baustellen nach den wichtigsten Umweltthemen ihrer Arbeit.', 'Halten Sie fest, wo System und Praxis übereinstimmen und wo nicht.'],
    deliverable: 'Einseitige Standortbestimmung mit drei Stärken und drei Lücken.',
    criteria: ['Unterlagen gelesen', 'Rollen verstanden', 'Praxis befragt', 'Lücken sachlich benannt'], confirmer: 'Leitung Qualität/Umwelt oder Geschäftsleitung' },
  { id: 'm10-p2', moduleId: M, topic: 'm10-planung', title: 'Aspektebewertung mit Praktikern überprüfen',
    goal: 'Die Liste der bedeutenden Umweltaspekte mit Leuten aus der Praxis plausibilisieren.',
    steps: ['Nehmen Sie die aktuelle Aspektebewertung der Firma.', 'Gehen Sie sie mit einem Bauführer und einem Polier entlang eines typischen Bauablaufs durch.', 'Prüfen Sie besondere Zustände und Notfälle.', 'Vergleichen Sie die bedeutenden Aspekte mit den Feststellungen und Ereignissen des letzten Jahres.', 'Schlagen Sie Anpassungen vor.'],
    deliverable: 'Kommentierte Aspekteliste mit Vorschlägen.',
    criteria: ['Praktiker einbezogen', 'Besondere Zustände geprüft', 'Mit Ereignissen verglichen', 'Vorschläge begründet'], confirmer: 'Leitung Qualität/Umwelt' },
  { id: 'm10-p3', moduleId: M, topic: 'm10-betrieb', title: 'Notfallübung in zehn Minuten',
    goal: 'Die Notfallvorsorge auf einer Baustelle praktisch überprüfen.',
    steps: ['Vereinbaren Sie mit einem Polier eine kurze Übung (z. B. «Diesel läuft aus»).', 'Lassen Sie die Equipe reagieren; greifen Sie nicht ein.', 'Prüfen Sie: Material am Ort? Nummern aktuell? Reihenfolge richtig?', 'Besprechen Sie das Ergebnis mit der Equipe und halten Sie Lehren fest.', 'Melden Sie Lehren, die alle Baustellen betreffen, weiter.'],
    deliverable: 'Kurzprotokoll der Übung mit Massnahmen.',
    criteria: ['Übung durchgeführt', 'Material und Nummern geprüft', 'Mit Equipe ausgewertet', 'Lehren weitergegeben'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm10-p4', moduleId: M, topic: 'm10-audit', title: 'Internes Audit begleiten oder durchführen',
    goal: 'Auditmethodik an einem realen Audit üben.',
    steps: ['Nehmen Sie als Beobachter/in oder Co-Auditor/in an einem internen Audit teil – nicht im eigenen Verantwortungsbereich.', 'Folgen Sie einem Faden von einer Anforderung bis zum Nachweis.', 'Formulieren Sie zwei Feststellungen nach dem Muster Anforderung – Nachweis – Bewertung.', 'Besprechen Sie Ihre Feststellungen mit der leitenden Auditperson.'],
    deliverable: 'Zwei ausformulierte Feststellungen und eine kurze Reflexion zur Fragetechnik.',
    criteria: ['Nicht den eigenen Bereich auditiert', 'Faden verfolgt', 'Feststellungen sachlich', 'Rückmeldung eingeholt'], confirmer: 'Leitende/r Auditor/in' },
  { id: 'm10-p5', moduleId: M, topic: 'm10-verbesserung', title: 'Kennzahlen entrümpeln',
    goal: 'Die Umweltkennzahlen der Firma auf ihren Nutzen prüfen.',
    steps: ['Listen Sie alle Umweltkennzahlen auf, die Ihre Firma erhebt.', 'Fragen Sie zu jeder: Wer sieht sie an? Welche Entscheidung stützt sie? Ist sie beeinflussbar?', 'Schlagen Sie vor, welche bleiben, welche wegfallen und welche Früh-Kennzahl fehlt.', 'Besprechen Sie den Vorschlag mit der zuständigen Stelle.'],
    deliverable: 'Kennzahlenliste mit Empfehlung (behalten / streichen / neu).',
    criteria: ['Alle Kennzahlen erfasst', 'Nutzen je Kennzahl beurteilt', 'Früh-Kennzahl vorgeschlagen', 'Vorschlag besprochen'], confirmer: 'Leitung Qualität/Umwelt oder Geschäftsleitung' },
];

// ---------- Feynman ----------
export const M10_FEYNMAN: FeynmanTask[] = [
  { id: 'm10-f1', moduleId: M, topic: 'm10-audit', audience: 'Polier',
    prompt: 'Erklären Sie einem Polier in 5–7 Sätzen, was ein internes Audit auf seiner Baustelle ist, warum es nicht gegen ihn gerichtet ist und warum er nichts «schönmachen» soll.',
    rubric: [
      { id: 'f1', text: 'Geprüft wird das System, nicht die Person', keywords: ['system', 'nicht die person', 'nicht gegen'] },
      { id: 'f2', text: 'Ziel: Schwächen finden, bevor etwas passiert', keywords: ['schwäche', 'bevor', 'verbesser'] },
      { id: 'f3', text: 'Ehrliche Antworten und echte Nachweise; nichts nachträglich erstellen', keywords: ['ehrlich', 'echt', 'nachträglich', 'nicht schön'] },
      { id: 'f4', text: 'Nutzen für ihn (bessere Mittel, klarere Vorgaben)', keywords: ['nutzen', 'mittel', 'hilft', 'vorgabe'] },
      { id: 'f5', text: 'Respektvoll, ohne Fachjargon', keywords: [] },
    ] },
  { id: 'm10-f2', moduleId: M, topic: 'm10-verbesserung', audience: 'Geschäftsleitung',
    prompt: 'Erklären Sie der Geschäftsleitung in 5–7 Sätzen, warum die Managementbewertung eine Entscheidungssitzung sein soll und was Sie von ihr brauchen.',
    rubric: [
      { id: 'f1', text: 'Leitung trägt die Rechenschaft für die Wirksamkeit', keywords: ['rechenschaft', 'verantwortung', 'leitung'] },
      { id: 'f2', text: 'Wenige Themen mit Anträgen statt Zahlenflut', keywords: ['antrag', 'wenige', 'entscheid'] },
      { id: 'f3', text: 'Benötigt: Entscheide, Mittel, Rückendeckung', keywords: ['mittel', 'rückendeckung', 'ressourcen'] },
      { id: 'f4', text: 'Nutzen: weniger Ereignisse, Risiken, Kosten; Glaubwürdigkeit', keywords: ['risiko', 'kosten', 'glaubwürdig', 'ereignis'] },
      { id: 'f5', text: 'Kurz und auf den Punkt', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M10_CARDS: Card[] = [
  { id: 'm10-c01', moduleId: M, topic: 'm10-system', level: 1, front: 'Was regelt ISO 14001?', back: 'Anforderungen an ein **Umweltmanagementsystem** – das *Wie* der Steuerung, **keine Grenzwerte** und keine bestimmte Umweltleistung.', sources: ['iso14001'] },
  { id: 'm10-c02', moduleId: M, topic: 'm10-system', level: 1, front: 'Drei Verpflichtungen der Umweltpolitik?', back: '**Umwelt schützen**, **bindende Verpflichtungen erfüllen**, **fortlaufend verbessern**.', sources: ['iso14001'] },
  { id: 'm10-c03', moduleId: M, topic: 'm10-system', level: 1, front: 'Was sagt ein Zertifikat aus?', back: 'Das **System** erfüllt die Norm – geprüft in **Stichproben**. Keine Garantie für jede Baustelle, kein behördlicher Nachweis.', sources: ['iso14001'] },
  { id: 'm10-c04', moduleId: M, topic: 'm10-system', level: 2, front: 'Wer trägt was?', back: '**Oberste Leitung**: Rechenschaft. **Linie**: Umsetzung im Projekt. **Umweltfachperson**: System, Beratung, Kontrolle, Bericht.', sources: ['iso14001', 'praxis'] },
  { id: 'm10-c05', moduleId: M, topic: 'm10-planung', level: 1, front: 'Aspekt vs. Auswirkung?', back: '**Aspekt**: Einwirkung einer Tätigkeit (Waschwasser fällt an). **Auswirkung**: Veränderung der Umwelt (Gewässer geschädigt).', sources: ['iso14001'] },
  { id: 'm10-c06', moduleId: M, topic: 'm10-planung', level: 2, front: 'Bindende Verpflichtungen – drei Ebenen?', back: '**Unternehmen** (Rechtskataster), **Standort** (Bewilligungen Werkhof), **Projekt** (Auflagen, Verträge).', sources: ['iso14001', 'praxis'] },
  { id: 'm10-c07', moduleId: M, topic: 'm10-planung', level: 2, front: 'Gutes Umweltziel?', back: 'Bezug zu **bedeutendem Aspekt** oder Verpflichtung, **messbar**, mit **Massnahmen, Verantwortlichen, Mitteln, Termin**.', sources: ['iso14001'] },
  { id: 'm10-c08', moduleId: M, topic: 'm10-planung', level: 1, front: 'Lebenswegbetrachtung?', back: 'Auch **vor- und nachgelagerte** Stufen berücksichtigen, soweit steuer- oder beeinflussbar. **Keine** vollständige Ökobilanz.', sources: ['iso14001'] },
  { id: 'm10-c09', moduleId: M, topic: 'm10-betrieb', level: 1, front: 'Kompetenz?', back: '**Können und tun.** Nachweis über Listen **und** den Blick ins Feld.', sources: ['iso14001'] },
  { id: 'm10-c10', moduleId: M, topic: 'm10-betrieb', level: 1, front: 'Fünf Schritte der Notfallvorsorge?', back: '**Bestimmen – planen – bekannt machen – üben – auswerten.**', sources: ['iso14001'] },
  { id: 'm10-c11', moduleId: M, topic: 'm10-betrieb', level: 2, front: 'Subunternehmer steuern?', back: '**Auswählen, vereinbaren, instruieren, überwachen** – abgestuft nach Risiko.', sources: ['iso14001', 'praxis'] },
  { id: 'm10-c12', moduleId: M, topic: 'm10-betrieb', level: 2, front: 'Wo gehören Umweltvorgaben hin?', back: 'In die **bestehenden Arbeitsschritte** (Offerte, AVOR, Startsitzung, Rapport, Bestellung) – nicht in eine Parallelwelt.', sources: ['praxis'] },
  { id: 'm10-c13', moduleId: M, topic: 'm10-audit', level: 1, front: 'Begehung vs. Audit?', back: '**Begehung**: Ist diese Baustelle in Ordnung? **Audit**: Funktioniert das **System**, das dafür sorgt?', sources: ['iso19011'] },
  { id: 'm10-c14', moduleId: M, topic: 'm10-audit', level: 1, front: 'Aufbau einer Auditfeststellung?', back: '**Anforderung – Nachweis – Bewertung.** Ohne Namen, ohne Schuldzuweisung.', sources: ['iso19011'] },
  { id: 'm10-c15', moduleId: M, topic: 'm10-audit', level: 2, front: 'Nachweis fehlt im Audit?', back: '**Offenlegen.** Nie nachträglich erstellen oder rückdatieren – das ist Täuschung. Lücke = Abweichung, die sich beheben lässt.', sources: ['iso19011', 'praxis'] },
  { id: 'm10-c16', moduleId: M, topic: 'm10-audit', level: 2, front: 'Wonach richtet sich das Auditprogramm?', back: '**Umweltbedeutung**, **Änderungen**, **Ergebnisse früherer Audits**. Auditoren prüfen nicht die eigene Arbeit.', sources: ['iso14001'] },
  { id: 'm10-c17', moduleId: M, topic: 'm10-verbesserung', level: 1, front: 'Gute Kennzahl?', back: 'Stützt eine **Entscheidung**, ist **beeinflussbar**, mit vertretbarem Aufwand erhebbar, **verständlich**.', sources: ['praxis'] },
  { id: 'm10-c18', moduleId: M, topic: 'm10-verbesserung', level: 2, front: 'Früh- vs. Ergebnis-Kennzahl?', back: '**Früh**: wie gut steuern wir (z. B. erledigte Massnahmen). **Ergebnis**: was ist geschehen (z. B. Ereignisse). Zusammen lesen.', sources: ['praxis'] },
  { id: 'm10-c19', moduleId: M, topic: 'm10-verbesserung', level: 1, front: 'Managementbewertung?', back: 'Die **oberste Leitung** beurteilt Eignung und Wirksamkeit und **entscheidet**: Verbesserungen, Änderungen, Mittel.', sources: ['iso14001'] },
  { id: 'm10-c20', moduleId: M, topic: 'm10-verbesserung', level: 2, front: 'Integriertes Managementsystem?', back: 'Qualität, Umwelt, Arbeitssicherheit mit **gemeinsamen Abläufen** (Audit, Schulung, Massnahmen, Bewertung) – Umwelt behält **eigene Kontrollpunkte und Ziele**.', sources: ['iso14001', 'iso9001', 'iso45001'] },
];

// ---------- Simulation ----------
export const M10_SCENARIO: Scenario = {
  id: 'sim-e', code: 'E', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'ISO-14001-Audit: Kontrollen nicht nachvollziehbar',
  setting: 'Management', level: 4, minutes: 25,
  topics: ['m10-audit', 'm10-verbesserung', 'm10-betrieb'],
  intro: 'Sie sind Umweltbeauftragte/r einer Bauunternehmung (fiktiv, Hoch- und Tiefbau, zertifiziert nach ISO 14001). Heute ist Überwachungsaudit. Die externe Auditorin prüft das Verfahren «Umweltbegehungen»: Laut Vorgabe wird jede Baustelle mit bedeutenden Umweltaspekten einmal pro Quartal begangen und der Bericht abgelegt.',
  facts: [
    'Im letzten Jahr gab es zwölf solcher Baustellen. Geplant waren 48 Begehungen.',
    'In der Ablage finden sich 29 Berichte. Für vier Baustellen gibt es je nur einen.',
    'Sie selbst führen alle Begehungen allein durch und waren im zweiten Halbjahr mit zwei Grossprojekten ausgelastet.',
    'Die Massnahmen aus den Berichten werden in keiner gemeinsamen Liste nachverfolgt.',
  ],
  stages: [
    {
      id: 'e1', title: 'Die Frage der Auditorin', type: 'single', criteria: ['recht', 'begruendung', 'zusammenarbeit'],
      situation: 'Die Auditorin: «Zeigen Sie mir bitte die vier Quartalsberichte der Baustelle Bahnhofstrasse.» Es gibt zwei. Der Bereichsleiter flüstert Ihnen zu: «Sag, die anderen liegen auf der Baustelle. Ich lasse sie über Mittag schreiben.»',
      prompt: 'Was tun Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Der Auditorin offen sagen, dass für diese Baustelle zwei Berichte vorliegen und zwei Begehungen nicht stattgefunden haben; anbieten, den Gesamtstand aller Baustellen zu zeigen.', feedback: 'Richtig: Die Lücke ist eine Abweichung, die sich beheben lässt. Offenheit zeigt ein System, das seine Schwächen kennt.' },
        { id: 'o2', points: 0, critical: true, text: 'Dem Vorschlag folgen und die fehlenden Berichte über Mittag nachträglich schreiben lassen.', feedback: 'Kritischer Fehler: Nachträglich hergestellte Nachweise sind eine Täuschung der Zertifizierungsstelle.', consequence: 'Die Auditorin bemerkt gleiche Fotos und ein Wetter, das nicht zum Datum passt. Sie unterbricht das Audit und informiert ihre Zertifizierungsstelle; das Zertifikat steht in Frage.' },
        { id: 'o3', points: 0, text: 'Ausweichen: «Die Berichte müssen irgendwo sein, ich suche sie später.»', feedback: 'Falsch: Sie wissen, dass es sie nicht gibt. Eine unwahre Auskunft untergräbt Ihre Glaubwürdigkeit – und das Problem bleibt.' },
      ],
    },
    {
      id: 'e2', title: 'Die Fakten', type: 'ask', criteria: ['unsicherheit', 'fachlich'], pick: 3,
      situation: 'Die Auditorin notiert eine Abweichung und bittet um Ihre Einschätzung der Ursachen bis zum Abschlussgespräch.',
      prompt: 'Welche drei Informationen holen Sie in der Mittagspause?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Verteilung der fehlenden Begehungen nach Baustelle und Quartal', reveal: 'Fast alle Lücken liegen im dritten und vierten Quartal und auf den vier kleineren Baustellen.', feedback: 'Zentral: zeigt ein Kapazitätsproblem, kein zufälliges Vergessen.' },
        { id: 'u2', points: 2, relevant: true, text: 'Wer ausser Ihnen Begehungen durchführen darf und kann', reveal: 'Niemand. Im Verfahren steht «Umweltbeauftragte/r»; eine Stellvertretung gibt es nicht.', feedback: 'Zentral: Die Vorgabe hängt an einer einzigen Person.' },
        { id: 'u3', points: 2, relevant: true, text: 'Was aus den Massnahmen der 29 Berichte geworden ist', reveal: 'Stichprobe von 20 Massnahmen: 9 nachweislich erledigt, 11 unklar. Eine gemeinsame Liste fehlt.', feedback: 'Zentral: Die Wirksamkeit der Kontrollen ist nicht nachvollziehbar – das wiegt schwerer als die fehlenden Berichte.' },
        { id: 'u4', points: 0, relevant: false, text: 'Welcher Polier sich am meisten über Begehungen beschwert hat', reveal: '—', feedback: 'Führt zur Person statt zum System.' },
        { id: 'u5', points: 1, relevant: true, text: 'Ob auf den nicht begangenen Baustellen Ereignisse aufgetreten sind', reveal: 'Ein gemeldetes Ereignis (Hydrauliköl, behoben).', feedback: 'Nützlich für die Risikoeinschätzung.' },
      ],
    },
    {
      id: 'e3', title: 'Ursachen', type: 'multi', criteria: ['fachlich', 'begruendung'],
      situation: 'Sie bereiten die Ursachenanalyse vor.',
      prompt: 'Welche Ursachen halten Sie fest? (Alle zutreffenden wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Die Durchführung hängt an einer einzigen Person ohne Stellvertretung', feedback: 'Richtig.' },
        { id: 'm2', points: 2, text: 'Der Rhythmus «alle Baustellen vierteljährlich» ist nicht nach Risiko abgestuft und mit den vorhandenen Mitteln nicht leistbar', feedback: 'Richtig: Eine unrealistische Vorgabe ist selbst eine Ursache.' },
        { id: 'm3', points: 2, text: 'Es gibt keine gemeinsame Massnahmenliste und keinen festen Ort für die Nachverfolgung', feedback: 'Richtig.' },
        { id: 'm4', points: 2, text: 'Niemand überwacht unterjährig, ob das Begehungsprogramm eingehalten wird', feedback: 'Richtig: Eine Früh-Kennzahl fehlt.' },
        { id: 'm5', points: 0, text: 'Die Poliere sind nicht motiviert', feedback: 'Falsch: nicht belegt und keine Ursache für fehlende Begehungen durch die Fachstelle.' },
        { id: 'm6', points: 0, text: 'Die Auditorin ist zu streng', feedback: 'Falsch: Die Feststellung beruht auf der eigenen Vorgabe der Firma.' },
      ],
    },
    {
      id: 'e4', title: 'Vorgehen nach der Abweichung', type: 'rank', criteria: ['prioritaet', 'fachlich'],
      situation: 'Die Zertifizierungsstelle verlangt innert Frist eine Stellungnahme mit Korrekturmassnahmen.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Sachverhalt anerkennen und Umfang feststellen (alle Baustellen, alle Quartale)' },
        { id: 'n2', text: 'Korrektur: laufende Baustellen mit hohem Risiko jetzt begehen' },
        { id: 'n3', text: 'Ursachen ermitteln' },
        { id: 'n4', text: 'Korrekturmassnahmen festlegen und von der Geschäftsleitung entscheiden lassen (Rhythmus nach Risiko, weitere Begeher, Massnahmenliste, Kennzahl)' },
        { id: 'n5', text: 'Umsetzen und fristgerecht an die Zertifizierungsstelle berichten' },
        { id: 'n6', text: 'Wirksamkeit prüfen (z. B. im nächsten internen Audit)' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'],
      rankGroups: [['n1'], ['n2', 'n3'], ['n4'], ['n5'], ['n6']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Ohne den tatsächlichen Umfang zu kennen, lassen sich weder Korrektur noch Ursachen richtig bestimmen.' }],
      rankExplanation: 'Zuerst die Fakten, dann parallel die Korrektur (Risiko jetzt abdecken) und die Ursachen. Darauf folgen Korrekturmassnahmen mit Entscheid der Leitung, Umsetzung mit Bericht und zuletzt die Wirksamkeitsprüfung.',
    },
    {
      id: 'e5', title: 'Der Vorschlag der Geschäftsleitung', type: 'single', criteria: ['begruendung', 'zusammenarbeit'],
      situation: 'Der Geschäftsführer: «Dann schreiben wir der Zertifizierungsstelle: Alle Mitarbeitenden werden nochmals geschult, und künftig machen wir die Begehungen wie vorgeschrieben. Das reicht doch?»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass Schulung die Ursachen nicht trifft, und drei Anträge vorlegen: Begehungsrhythmus nach Risiko abstufen, zwei Bauführer als Begeher ausbilden, Massnahmenliste mit Quartalskennzahl an die Geschäftsleitung – mit Aufwand und Wirkung.', feedback: 'Richtig: Korrekturmassnahmen müssen an den Ursachen ansetzen; die Leitung entscheidet auf einer klaren Grundlage.' },
        { id: 'r2', points: 0, text: 'Zustimmen – so ist das Thema am schnellsten erledigt.', feedback: 'Falsch: Die Ursachen bleiben, die Abweichung kommt wieder – beim nächsten Mal schwerer gewichtet.' },
        { id: 'r3', points: 1, text: 'Die Vorgabe streichen, damit es keine Abweichung mehr geben kann.', feedback: 'Teilweise: Eine unrealistische Vorgabe anzupassen ist legitim – sie ersatzlos zu streichen lässt die bedeutenden Aspekte aber ohne Überwachung.' },
      ],
    },
    {
      id: 'e6', title: 'Stellungnahme', type: 'justify', criteria: ['begruendung', 'fachlich'],
      situation: 'Sie entwerfen die Stellungnahme an die Zertifizierungsstelle.',
      prompt: 'Schreiben Sie 5–8 Sätze: Sachverhalt, Korrektur, Ursachen, Korrekturmassnahmen mit Verantwortung und Termin, Wirksamkeitsprüfung.',
      rubric: [
        { id: 'b1', text: 'Sachverhalt ehrlich mit Zahlen (29 von 48)', keywords: ['29', '48', 'nicht durchgeführt', 'sachverhalt'] },
        { id: 'b2', text: 'Korrektur: risikoreiche Baustellen sofort begangen', keywords: ['sofort', 'korrektur', 'begangen', 'risiko'] },
        { id: 'b3', text: 'Ursachen: eine Person, Rhythmus nicht risikobasiert, keine Nachverfolgung, keine Überwachung', keywords: ['ursache', 'stellvertret', 'kapazität', 'nachverfolg', 'risikobasiert'] },
        { id: 'b4', text: 'Korrekturmassnahmen mit Verantwortung und Termin', keywords: ['begeher', 'massnahmenliste', 'kennzahl', 'termin', 'verantwort'] },
        { id: 'b5', text: 'Wirksamkeitsprüfung geplant', keywords: ['wirksam', 'internes audit', 'überprüf', 'quartal'] },
      ],
    },
  ],
  debrief: 'Die fehlenden Berichte waren nur das Symptom. Dahinter standen eine Vorgabe, die mit den vorhandenen Mitteln nicht leistbar war, eine Abhängigkeit von einer Person und eine fehlende Nachverfolgung. Ein Audit ist dann ein Gewinn, wenn die Lücke offen auf dem Tisch liegt – wer sie mit nachträglichen Papieren zudeckt, verliert die Chance zur Verbesserung und riskiert das Vertrauen in das ganze System.',
  sources: ['iso14001', 'iso19011', 'praxis'],
};
