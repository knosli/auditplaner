import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm5';

// ---------- Baustellenaufgaben (fiktive Daten) ----------
export const M5_SITETASKS: SiteTask[] = [
  {
    id: 'm5-t1', moduleId: M, topic: 'm5-grundlagen', level: 2, setting: 'Hochbau',
    title: 'Luftquellen eines Rückbaus',
    situation: 'Rückbau eines dreigeschossigen Gewerbebaus (fiktiv) von 1975 in einem Wohnquartier; danach Neubau. Bewilligung: Stufe B Luft. Schadstoffsanierung (Asbest in Bodenbelägen) ist vorgesehen.',
    data: [
      'Innenrückbau, dann maschineller Abbruch mit Bagger und Zange',
      'Wohnhäuser auf zwei Seiten in 5–15 m, Kindergarten gegenüber',
      'Abtransport von ca. 4 000 t Material über eine Quartierstrasse',
      'Zwei Subunternehmer mit eigenen Maschinen; ein Stromaggregat geplant',
    ],
    assignment: 'Listen Sie die Luftquellen (inkl. Mitarbeiterschutz) und ordnen Sie jeder eine Massnahme zu.',
    rubric: [
      { id: 'k1', text: 'Asbestsanierung vor Abbruch, mit Schutz und Freigabe', keywords: ['asbest', 'sanierung', 'vor', 'freigabe'] },
      { id: 'k2', text: 'Abbruchstaub: Benetzung, Zange, Abschirmung zur Wohnseite/Kindergarten', keywords: ['benetz', 'zange', 'staubschutzwand', 'kindergarten', 'wohn'] },
      { id: 'k3', text: 'Maschinen: Nachweise auch für Subunternehmer; Aggregat durch Baustrom ersetzen', keywords: ['maschinenliste', 'nachweis', 'subunternehm', 'aggregat', 'baustrom'] },
      { id: 'k4', text: 'Transporte: abdecken, Reifenreinigung, Strasse nass reinigen, Motor aus', keywords: ['transport', 'abdeck', 'reifen', 'strasse', 'motor aus'] },
      { id: 'k5', text: 'Innenrückbau: Schuttrutsche, Absaugung, Quarzstaub-Schutz', keywords: ['schuttrutsche', 'absaug', 'quarz', 'innen'] },
    ],
    solution: `| Quelle | Massnahme |
|---|---|
| Asbest in Bodenbelägen | Sanierung durch anerkannte Firma **vor** dem Rückbau, mit Freigabe des Bereichs (Modul 3) |
| Innenrückbau (Staub, Quarzstaub) | Geschlossene Schuttrutsche in abgedeckte Mulde, Absaugung beim Schleifen und Schneiden, Atemschutz nach Suva, Industriesauger statt Besen |
| Maschineller Abbruch | Sprühnebel an der Abbruchkante, Zange statt Hammer, von oben nach unten, kleine Abwurfhöhen, Staubschutzwand zu Wohnhäusern und Kindergarten |
| Bagger, Lader, Subunternehmer-Maschinen | Maschinenliste mit Nachweisen vor dem ersten Einsatz |
| Stromaggregat | Baustrom beantragen; falls nicht möglich: Aggregat mit Nachweis, nicht über Nacht laufen lassen |
| Transporte | Ladung abdecken, Reifenreinigung an der Ausfahrt, Quartierstrasse nass reinigen, Motor aus beim Warten, Wartezone auf dem Areal |
| Zwischenlager Abbruchmaterial | Befeuchten bzw. abdecken, kurz halten |

Dazu: Information der Anwohnenden und des Kindergartens über staubintensive Phasen, Ansprechperson auf der Bautafel.`,
    sources: ['bafu-luft', 'lrv', 'suva-staub', 'suva-asbest'],
  },
  {
    id: 'm5-t2', moduleId: M, topic: 'm5-staub', level: 2, setting: 'Hochbau',
    title: 'Staubkonzept für einen Abbruch',
    situation: 'Abbruch eines Anbaus (fiktiv) 3 m neben einem bewohnten Mehrfamilienhaus. Hof mit Meteorschacht. Sommer, Trockenperiode.',
    data: [
      'Material: Beton, Mauerwerk, Ziegeldach',
      'Wasseranschluss vorhanden',
      'Platz für eine Mulde im Hof',
      'Bewilligung: Stufe A',
    ],
    assignment: 'Entwerfen Sie das Staubkonzept: Verfahren, Benetzung, Abschirmung, Abwasser, Reinigung, Kontrolle.',
    rubric: [
      { id: 'k1', text: 'Staubarmes Verfahren (Zange, von oben, kleine Abwurfhöhe)', keywords: ['zange', 'von oben', 'abwurf'] },
      { id: 'k2', text: 'Benetzung dosiert (Sprühnebel) an der Quelle', keywords: ['sprühnebel', 'benetz', 'dosiert', 'quelle'] },
      { id: 'k3', text: 'Abschirmung zum Nachbarhaus', keywords: ['staubschutzwand', 'abschirm', 'netz'] },
      { id: 'k4', text: 'Abwasser: Meteorschacht abdecken, Wasser zurückhalten', keywords: ['meteorschacht', 'abdeck', 'zurückhalt', 'schwelle'] },
      { id: 'k5', text: 'Mulde abdecken, nass reinigen, Kontrolle über die Grenze', keywords: ['mulde', 'abdeck', 'nass', 'kontroll', 'grenze'] },
    ],
    solution: `- **Verfahren**: Abbruch mit Zange von oben nach unten, Material direkt in die Mulde, kleine Abwurfhöhe; Ziegel zuerst von Hand bzw. mit Rutsche.
- **Benetzung**: Sprühnebel auf die Abbruchkante, wenig Wasser; Material vor dem Abwurf befeuchten.
- **Abschirmung**: Staubschutzwand bzw. Netz an der Seite zum Mehrfamilienhaus, Fenster der Nachbarn vorab informieren.
- **Abwasser**: Meteorschacht im Hof abdecken, Abfluss mit Schwelle auf der Baustelle halten, Schlamm aufnehmen (Modul 2).
- **Mulde**: abdecken, sobald nicht befüllt wird.
- **Reinigung**: Hof und Zufahrt nass reinigen, kein Laubbläser.
- **Kontrolle**: Polier prüft laufend, ob Staub über die Grenze zieht; bei Wind gegen das Nachbarhaus Arbeiten anpassen.

Obwohl nur Stufe A angeordnet ist, verlangt die Lage (3 m zum Nachbarhaus) wirksame Massnahmen – Vorsorge gilt unabhängig von der Stufe.`,
    sources: ['bafu-luft', 'gschg', 'usg'],
  },
  {
    id: 'm5-t3', moduleId: M, topic: 'm5-maschinen', level: 2, setting: 'Tiefbau',
    title: 'Maschinenliste prüfen',
    situation: 'Werkleitungsbau (fiktiv) mit Stufe B. Sie prüfen die Maschinenliste vor Baubeginn.',
    data: [
      'Eigener Raupenbagger 20 t, Nachweis vorhanden',
      'Gemieteter Mobilbagger, Nachweis «folgt»',
      'Dumper des Subunternehmers, Baujahr unbekannt, kein Nachweis',
      'Stromaggregat 30 kW, kein Nachweis; Baustrom wäre ab Woche 2 möglich',
      'Benzin-Rüttelplatte und Trennscheibe',
      'Lastwagen von drei Transportunternehmen',
    ],
    assignment: 'Beurteilen Sie jede Position und legen Sie fest, was vor dem ersten Einsatz geschehen muss.',
    rubric: [
      { id: 'k1', text: 'Mietbagger: Nachweis vor Einsatz, sonst nicht einsetzen', keywords: ['mietbagger', 'mobilbagger', 'vor einsatz', 'nachweis'] },
      { id: 'k2', text: 'Dumper Subunternehmer: Baujahr und Nachweis klären, sonst ersetzen', keywords: ['dumper', 'baujahr', 'ersetzen', 'subunternehm'] },
      { id: 'k3', text: 'Aggregat: Baustrom bevorzugen; Überbrückung nur mit Nachweis', keywords: ['aggregat', 'baustrom', 'überbrück'] },
      { id: 'k4', text: 'Kleingeräte: Alkylatbenzin bzw. elektrisch, Nassschnitt', keywords: ['alkylat', 'elektrisch', 'akku', 'nassschnitt'] },
      { id: 'k5', text: 'Lastwagen: Anforderungen gemäss Vertrag, Motor aus, Reinigung', keywords: ['lastwagen', 'abgasnorm', 'motor aus', 'vertrag'] },
    ],
    solution: `| Position | Beurteilung | Vor dem Einsatz |
|---|---|---|
| Raupenbagger (eigen) | Nachweis vorhanden | Gültigkeit der Wartung prüfen |
| Mobilbagger (Miete) | Nachweis fehlt | Beim Vermieter einfordern; ohne Nachweis kein Einsatz |
| Dumper (Subunternehmer) | Baujahr und Nachweis unbekannt | Subunternehmer muss Nachweis bringen oder konforme Maschine stellen |
| Stromaggregat 30 kW | Nachweis fehlt | Baustrom ab Woche 2; für Woche 1 nur ein Aggregat mit Nachweis oder Arbeiten ohne Strombedarf vorziehen |
| Rüttelplatte, Trennscheibe (Benzin) | unter der Leistungsgrenze, aber Abgase in Atemhöhe | Alkylatbenzin oder Akku/elektrisch; Trennscheibe nur nass bzw. mit Absaugung |
| Lastwagen | eigene Typengenehmigung | Anforderungen gemäss Vertrag bzw. Ausschreibung; Regeln «Motor aus», Reifenreinigung |

Die Liste wird mit den Nachweisen in der Baustellenablage geführt und bei jeder neuen Maschine nachgeführt.

*Ob einzelne Maschinen unter die Partikelanforderungen fallen, hängt von Motorart, Leistung und Baujahr ab – Wortlaut der LRV und kantonale Vollzugsunterlagen prüfen.*`,
    sources: ['lrv', 'bafu-luft', 'praxis'],
  },
  {
    id: 'm5-t4', moduleId: M, topic: 'm5-transporte', level: 3, setting: 'Tiefbau',
    title: 'Transportkonzept einer Grossbaustelle',
    situation: 'Neubau einer Überbauung (fiktiv) mit 60 000 m³ Aushub und 15 000 m³ Beton. Zufahrt durch ein Wohnquartier mit Schule; ein Anschlussgleis liegt 1 km entfernt.',
    data: [
      'Aushub: 40 % wieder einbaubar (Hinterfüllung, Umgebung), Rest abführen',
      'Spitzen von 120 Fahrten pro Tag erwartet',
      'Schulweg kreuzt die Zufahrt',
      'Bewilligung: Stufe B Luft; Gemeinde verlangt Strassenreinigung',
    ],
    assignment: 'Entwerfen Sie ein Transportkonzept mit Massnahmen für Luft und Nachbarschaft.',
    rubric: [
      { id: 'k1', text: 'Fahrten vermeiden: Wiedereinbau vor Ort, Zwischenlager', keywords: ['wiedereinbau', 'vor ort', 'zwischenlager', 'massenbilanz'] },
      { id: 'k2', text: 'Bahn prüfen (Anschlussgleis)', keywords: ['bahn', 'gleis'] },
      { id: 'k3', text: 'Route, Zeiten (Schulweg), Wartezone', keywords: ['route', 'schulweg', 'zeiten', 'wartezone'] },
      { id: 'k4', text: 'Saubere Fahrzeuge, Motor aus, Ladung abdecken', keywords: ['fahrzeug', 'abgasnorm', 'motor aus', 'abdeck'] },
      { id: 'k5', text: 'Reifenreinigung, Strassenreinigung, Kontrolle', keywords: ['reifen', 'strassenreinigung', 'kontroll'] },
    ],
    solution: `1. **Fahrten vermeiden**: 40 % des Aushubs vor Ort zwischenlagern und wieder einbauen (rund 24 000 m³ weniger Abtransport); Massenbilanz in der AVOR.
2. **Bahn prüfen**: Für den Rest Umschlag am Anschlussgleis klären (Kosten, Kapazität, Strecke 1 km durch weniger empfindliches Gebiet?).
3. **Route und Zeiten**: Fahrten nicht zu Schulbeginn und -schluss über den Schulweg; Verkehrsdienst an der Kreuzung; Route mit Gemeinde abstimmen.
4. **Wartezone** auf dem Areal statt im Quartier, Motor aus.
5. **Fahrzeuge**: Anforderungen an Abgasnormen in der Vergabe der Transporte; Ladung abdecken.
6. **Sauberkeit**: Reifenwaschanlage an der Ausfahrt, befestigte Ausfahrt, tägliche Nassreinigung der Quartierstrasse (Auflage).
7. **Kontrolle und Information**: Polier kontrolliert Strasse und Wartezone; Anwohnende und Schule erhalten den Transportplan; Ansprechperson.

*Zahlen fiktiv; die Bahnvariante ist eine Prüfoption, keine Empfehlung ohne Abklärung.*`,
    sources: ['bafu-luft', 'praxis'],
  },
  {
    id: 'm5-t5', moduleId: M, topic: 'm5-planung', level: 3, setting: 'Hochbau',
    title: 'Luftkonzept für ein Schulhaus',
    situation: 'Ersatzneubau eines Schulhaustrakts (fiktiv); der übrige Schulbetrieb läuft weiter. Bewilligung: «Es gilt Massnahmenstufe B gemäss BAFU-Richtlinie Luftreinhaltung auf Baustellen.»',
    data: [
      'Phasen: Rückbau (2 Monate), Baugrube (1 Monat), Rohbau (6 Monate), Ausbau (5 Monate), Umgebung (1 Monat)',
      'Pausenplatz und Lüftungsansaugung des Nachbartrakts 20 m von der Baustelle',
      'LV enthält Benetzung, aber keine Staubschutzwand und keine Reifenreinigung',
      'Herbstferien fallen in die Rückbauphase',
    ],
    assignment: 'Erstellen Sie ein Luftkonzept nach Phasen (Massnahme, Verantwortung, Kontrolle) und nennen Sie, was mit Bauleitung und Schule zu klären ist.',
    rubric: [
      { id: 'k1', text: 'Massnahmen je Phase passend zu Tätigkeiten', keywords: ['rückbau', 'baugrube', 'rohbau', 'ausbau', 'umgebung'] },
      { id: 'k2', text: 'Rückbau an Schulseite in den Herbstferien; Lüftungsansaugung berücksichtigen', keywords: ['herbstferien', 'lüftung', 'ansaug', 'pausenplatz'] },
      { id: 'k3', text: 'LV-Lücken melden (Wand, Reifenreinigung), Anspruch prüfen lassen', keywords: ['lv', 'lücke', 'melden', 'nachtrag', 'anspruch'] },
      { id: 'k4', text: 'Maschinenliste, elektrischer Kran', keywords: ['maschinenliste', 'elektrisch', 'kran'] },
      { id: 'k5', text: 'Kontrolle, Information, Ansprechperson', keywords: ['kontroll', 'information', 'schulleitung', 'ansprechperson'] },
    ],
    solution: `| Phase | Massnahmen | Verantwortlich | Kontrolle |
|---|---|---|---|
| Rückbau | Schadstoffe vorher saniert; Sprühnebel, Zange, Staubschutzwand zur Schulseite; Abbruch an der Schulseite in den Herbstferien; Mulden abdecken | Polier/in | täglich; Fotos |
| Baugrube | Piste befestigt, Reifenreinigung, Strasse nass reinigen, Lastwagen Motor aus, Wartezone | Polier/in | täglich Strasse |
| Rohbau | Maschinenliste mit Nachweisen; Kran und Pumpen elektrisch; Schneiden nass | Bauführer/in | vor Einsatz; Begehung |
| Ausbau | Absaugung bei Schleif- und Schneidarbeiten, Industriesauger, lösemittelarme Produkte | Subunternehmer, Polier/in | Begehung |
| Umgebung | Befeuchten bei Trockenheit, rasch begrünen | Polier/in | Begehung |

**Mit der Bauleitung klären**: Staubschutzwand und Reifenreinigung fehlen im LV → schriftlich anzeigen, Massnahmen trotzdem rechtzeitig umsetzen, Anspruch prüfen lassen (Modul 8).

**Mit der Schule klären**: Lage der Lüftungsansaugung (Staub und Abgase nicht in der Nähe erzeugen, Mulden und Wartezone weg davon), Pausenzeiten für staubintensive Arbeiten, Information der Eltern, Ansprechperson.`,
    sources: ['bafu-luft', 'lrv', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M5_TASKS: PracticeTask[] = [
  { id: 'm5-p1', moduleId: M, topic: 'm5-grundlagen', title: 'Luftquellen auf der eigenen Baustelle',
    goal: 'Die Luftquellen einer realen Baustelle erkennen und bewerten.',
    steps: ['Gehen Sie über eine Baustelle und notieren Sie alle Quellen von Staub, Abgasen und Gerüchen.', 'Notieren Sie, wo die Belastung hingeht (Nachbarn, Strasse, Mitarbeitende).', 'Prüfen Sie, welche Stufe angeordnet ist und welche Massnahmen umgesetzt sind.', 'Besprechen Sie drei Verbesserungen mit dem Polier.'],
    deliverable: 'Liste der Quellen mit Wirkung und Massnahmen, drei vereinbarte Verbesserungen.',
    criteria: ['Quellen vollständig', 'Betroffene erkannt', 'Stufe geprüft', 'Verbesserungen vereinbart'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm5-p2', moduleId: M, topic: 'm5-staub', title: 'Staubkontrolle bei Trockenheit',
    goal: 'Die Wirksamkeit der Staubmassnahmen an einem trockenen, windigen Tag prüfen.',
    steps: ['Wählen Sie einen trockenen Tag mit Wind.', 'Beobachten Sie die Grundstücksgrenze und die Strasse: Staubwolken, Schmutz.', 'Prüfen Sie Benetzung, Abschirmung, Pisten, Reinigung.', 'Vereinbaren Sie Sofortmassnahmen und kontrollieren Sie sie.'],
    deliverable: 'Kurzbericht mit Fotos (ohne Personen) und Massnahmen.',
    criteria: ['Unter realistischen Bedingungen geprüft', 'Ursachen gefunden', 'Massnahmen umgesetzt', 'Nachkontrolle'], confirmer: 'Polier/in' },
  { id: 'm5-p3', moduleId: M, topic: 'm5-maschinen', title: 'Maschinenliste einführen',
    goal: 'Für eine Baustelle eine vollständige Maschinenliste mit Nachweisen erstellen.',
    steps: ['Erfassen Sie alle Baumaschinen und Geräte, auch Mietmaschinen und Subunternehmer.', 'Prüfen Sie Nachweise gemäss kantonalem Vollzug.', 'Klären Sie fehlende Nachweise vor dem Einsatz.', 'Prüfen Sie, welche Geräte elektrisch ersetzt werden könnten.'],
    deliverable: 'Maschinenliste mit Status und Vorschlägen.',
    criteria: ['Vollständig inkl. Subunternehmer', 'Nachweise geprüft', 'Lücken geklärt', 'Elektrische Alternativen geprüft'], confirmer: 'Bauführer/in' },
  { id: 'm5-p4', moduleId: M, topic: 'm5-transporte', title: 'Leerlauf und Strassenschmutz',
    goal: 'Vermeidbare Abgase und Verschmutzungen durch Transporte reduzieren.',
    steps: ['Beobachten Sie eine Stunde lang Zufahrt und Wartebereich.', 'Zählen Sie Fahrzeuge mit laufendem Motor beim Warten und schauen Sie auf die Strasse.', 'Vereinbaren Sie Regeln (Wartezone, Motor aus, Reinigung) mit dem Polier.', 'Wiederholen Sie die Beobachtung nach zwei Wochen.'],
    deliverable: 'Vorher-nachher-Vergleich mit Massnahmen.',
    criteria: ['Beobachtung strukturiert', 'Regeln vereinbart', 'Wiederholung durchgeführt', 'Wirkung beschrieben'], confirmer: 'Polier/in oder Bauführer/in' },
  { id: 'm5-p5', moduleId: M, topic: 'm5-planung', title: 'Luftkonzept für ein reales Projekt',
    goal: 'Eine angeordnete Massnahmenstufe in ein Konzept übersetzen.',
    steps: ['Wählen Sie ein Projekt mit angeordneter Stufe.', 'Beschaffen Sie Richtlinie und kantonale Unterlagen.', 'Erstellen Sie das Konzept nach Phasen und gleichen Sie es mit dem LV ab.', 'Stellen Sie es an der Startsitzung vor.'],
    deliverable: 'Luftkonzept und Liste der LV-Lücken.',
    criteria: ['Phasen vollständig', 'Massnahmen passend', 'LV abgeglichen', 'Vorgestellt'], confirmer: 'Bauführer/in oder Projektleiter/in' },
];

// ---------- Feynman ----------
export const M5_FEYNMAN: FeynmanTask[] = [
  { id: 'm5-f1', moduleId: M, topic: 'm5-transporte', audience: 'Lastwagenchauffeur',
    prompt: 'Erklären Sie einem Lastwagenchauffeur in 5–7 Sätzen, warum er beim Warten den Motor abstellen und vor der Ausfahrt durch die Reifenreinigung fahren soll.',
    rubric: [
      { id: 'f1', text: 'Abgase im Quartier und für ihn selbst', keywords: ['abgas', 'quartier', 'atmen', 'selbst'] },
      { id: 'f2', text: 'Leerlauf bringt nichts, kostet Diesel', keywords: ['leerlauf', 'diesel', 'kosten'] },
      { id: 'f3', text: 'Schmutz auf der Strasse wird Staub und Unfallgefahr', keywords: ['schmutz', 'staub', 'rutsch', 'unfall'] },
      { id: 'f4', text: 'Beschwerden und Kontrollen vermeiden', keywords: ['beschwerde', 'kontrolle', 'gemeinde'] },
      { id: 'f5', text: 'Respektvoll und kurz', keywords: [] },
    ] },
  { id: 'm5-f2', moduleId: M, topic: 'm5-planung', audience: 'Bauherr (Gemeinde)',
    prompt: 'Erklären Sie einem Gemeinderat in 5–7 Sätzen, was «Massnahmenstufe B Luft» für sein Schulhausprojekt bedeutet und warum es Geld kostet.',
    rubric: [
      { id: 'f1', text: 'Stufe B = zusätzliche Massnahmen wegen Grösse, Dauer, Lage', keywords: ['zusätzlich', 'grösse', 'dauer', 'lage'] },
      { id: 'f2', text: 'Konkrete Beispiele (Benetzung, Wand, Reifenreinigung, Maschinen)', keywords: ['benetz', 'wand', 'reifen', 'maschine'] },
      { id: 'f3', text: 'Gesundheit von Kindern und Mitarbeitenden', keywords: ['kinder', 'gesundheit', 'schüler'] },
      { id: 'f4', text: 'Kosten gehören ins LV; Pflicht aus der Bewilligung', keywords: ['lv', 'kosten', 'bewilligung', 'pflicht'] },
      { id: 'f5', text: 'Verständlich, ohne Fachjargon', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M5_CARDS: Card[] = [
  { id: 'm5-c01', moduleId: M, topic: 'm5-grundlagen', level: 1, front: 'Hauptschadstoffe von Baustellen?', back: '**Feinstaub**, **Dieselruss**, Stickoxide, **VOC**; für Mitarbeitende zusätzlich **Quarzfeinstaub** und Asbest.', sources: ['bafu-luft', 'suva-staub'] },
  { id: 'm5-c02', moduleId: M, topic: 'm5-grundlagen', level: 1, front: 'Warum ist Dieselruss problematisch?', back: 'Sehr feine Partikel, **tief in die Lunge**, gelten als **krebserregend**.', sources: ['bafu-luft'] },
  { id: 'm5-c03', moduleId: M, topic: 'm5-grundlagen', level: 1, front: 'Massnahmenstufen Luft?', back: '**A**: alle Baustellen (Basis). **B**: zusätzlich bei grösseren, längeren Baustellen in empfindlicher Lage. Angeordnet in der Bewilligung.', sources: ['bafu-luft'] },
  { id: 'm5-c04', moduleId: M, topic: 'm5-grundlagen', level: 2, front: 'Massnahmen nur bei Beschwerden?', back: '**Nein** – Vorsorgeprinzip: an der Quelle begrenzen, unabhängig von Beschwerden.', sources: ['usg'] },
  { id: 'm5-c05', moduleId: M, topic: 'm5-staub', level: 1, front: 'Rangfolge gegen Staub?', back: '**Vermeiden** (Verfahren) → **Erfassen** (nass, Absaugung) → **Abschirmen** → Schutz der Betroffenen.', sources: ['bafu-luft'] },
  { id: 'm5-c06', moduleId: M, topic: 'm5-staub', level: 1, front: 'Staubende Piste?', back: '**Befestigen**, befeuchten, **Tempo** begrenzen, Reifen reinigen, Strasse **nass** reinigen.', sources: ['bafu-luft'] },
  { id: 'm5-c07', moduleId: M, topic: 'm5-staub', level: 2, front: 'Benetzen – worauf achten?', back: '**Sprühnebel** statt Schwall; Abfluss **nicht in Meteorschächte**; Schlamm aufnehmen.', sources: ['bafu-luft', 'gschg'] },
  { id: 'm5-c08', moduleId: M, topic: 'm5-staub', level: 2, front: 'Reinigen ohne neue Staubwolke?', back: '**Nass** wischen oder **saugen** (Filter). Kein Laubbläser, kein trockenes Kehren.', sources: ['bafu-luft'] },
  { id: 'm5-c09', moduleId: M, topic: 'm5-maschinen', level: 1, front: 'Partikelanforderungen – für wen?', back: 'Baumaschinen mit **Dieselmotor über 18 kW** (LRV Art. 19a, Anh. 4 Ziff. 3), Übergangsregeln nach Baujahr.', sources: ['lrv'] },
  { id: 'm5-c10', moduleId: M, topic: 'm5-maschinen', level: 1, front: 'Wie prüfen?', back: '**Nachweis** gemäss Vollzug, nicht Augenschein. Liste – Nachweis – Sichtprüfung – Freigabe.', sources: ['lrv'] },
  { id: 'm5-c11', moduleId: M, topic: 'm5-maschinen', level: 2, front: 'Mietmaschine ohne Nachweis?', back: '**Nicht einsetzen**, bis Nachweis vorliegt oder ersetzt. Unternehmung ist verantwortlich.', sources: ['lrv'] },
  { id: 'm5-c12', moduleId: M, topic: 'm5-maschinen', level: 2, front: 'Abgase im Betrieb vermeiden?', back: '**Motor aus**, richtig dimensionieren, **warten**, **elektrisch** wo möglich, Alkylatbenzin für Kleingeräte.', sources: ['bafu-luft'] },
  { id: 'm5-c13', moduleId: M, topic: 'm5-transporte', level: 1, front: 'Offenes Verbrennen auf der Baustelle?', back: '**Verboten.** Lösung: Abfalltrennung.', sources: ['usg', 'lrv'] },
  { id: 'm5-c14', moduleId: M, topic: 'm5-transporte', level: 1, front: 'Hebel bei Transporten?', back: '**Vermeiden**, bündeln, saubere Fahrzeuge, **Motor aus**, Ladung abdecken, Strasse sauber.', sources: ['bafu-luft'] },
  { id: 'm5-c15', moduleId: M, topic: 'm5-transporte', level: 2, front: 'Mobiler Brecher – was klären?', back: '**Verfahren** mit Behörde (kantonal), **Standort**, **Bedüsung**, Betriebszeiten, Antrieb, Information.', sources: ['bafu-luft'] },
  { id: 'm5-c16', moduleId: M, topic: 'm5-planung', level: 1, front: 'Stufe in der Bewilligung – was tun?', back: '**Luftkonzept** nach Phasen: Massnahme, Verantwortung, Kontrolle, Nachweis → Massnahmenplan; **LV abgleichen**.', sources: ['bafu-luft'] },
  { id: 'm5-c17', moduleId: M, topic: 'm5-planung', level: 2, front: 'Beschwerde über Staub/Abgase?', back: '**Aufnehmen – anschauen – handeln – zurückmelden – dokumentieren.**', sources: ['praxis'] },
  { id: 'm5-c18', moduleId: M, topic: 'm5-planung', level: 2, front: 'Schnellste Wirksamkeitskontrolle?', back: 'Blick über die **Grundstücksgrenze** und auf die **Strasse**.', sources: ['praxis'] },
];

// ---------- Simulation ----------
export const M5_SCENARIO: Scenario = {
  id: 'sim-k', code: 'K', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Staubwolke neben dem Schulhaus',
  setting: 'Rückbau', level: 3, minutes: 20,
  topics: ['m5-staub', 'm5-maschinen', 'm5-planung'],
  intro: 'Rückbau eines Gewerbebaus (fiktiv) direkt neben einem Schulhaus. Die Bewilligung ordnet Stufe B Luft an. Dienstag, 10.15 Uhr, grosse Pause. Die Schulleiterin ruft Sie an: Über den Pausenplatz zieht eine Staubwolke.',
  facts: [
    'Ein Bagger mit Abbruchzange arbeitet an der Fassade zur Schulseite.',
    'Der Sprühnebel-Kanon ist laut Polier «seit gestern kaputt»; benetzt wird mit einem Schlauch.',
    'Eine Staubschutzwand ist bestellt, aber noch nicht montiert.',
    'Ein Subunternehmer hat heute einen gemieteten Lader gebracht; die Maschinenliste wurde nicht nachgeführt.',
  ],
  stages: [
    {
      id: 'k1', title: 'Der Anruf', type: 'single', criteria: ['risiko', 'prioritaet', 'recht'],
      situation: 'Die Schulleiterin: «Die Kinder husten. Was machen Sie jetzt?» Sie sind 10 Minuten entfernt und erreichen den Polier am Telefon.',
      prompt: 'Was veranlassen Sie?',
      options: [
        { id: 'o1', points: 2, text: 'Polier: Abbruch an der Schulseite sofort unterbrechen, Arbeiten an der abgewandten Seite oder ohne Staub vorziehen. Der Schulleiterin zusagen, dass die Arbeit ruht, und dass Sie in 10 Minuten vor Ort sind.', feedback: 'Richtig: Die Belastung wird an der Quelle sofort gestoppt; die Arbeit geht anderswo weiter.' },
        { id: 'o2', points: 0, critical: true, text: 'Polier: Mit dem Schlauch stärker benetzen und weitermachen, die Pause ist ja bald vorbei.', feedback: 'Kritischer Fehler: Die vorhandene Massnahme wirkt sichtbar nicht; Weiterarbeiten nimmt die Belastung der Kinder in Kauf.', consequence: 'Eltern beschweren sich bei der Gemeinde; die Behörde verfügt einen Baustopp für den Abbruch.' },
        { id: 'o3', points: 1, text: 'Die Schulleiterin bitten, die Kinder hereinzuholen, und den Polier weiterarbeiten lassen, bis Sie da sind.', feedback: 'Teilweise: schützt die Kinder kurzfristig, setzt aber nicht an der Quelle an.' },
      ],
    },
    {
      id: 'k2', title: 'Vor Ort', type: 'ask', criteria: ['unsicherheit', 'fachlich'], pick: 3,
      situation: 'Sie sind auf der Baustelle. Die Arbeit an der Schulseite ruht.',
      prompt: 'Welche drei Dinge klären Sie zuerst?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Was am Sprühnebel-Kanon defekt ist und wann er repariert bzw. ersetzt werden kann', reveal: 'Pumpe defekt; Ersatzgerät beim Vermieter heute ab 14 Uhr verfügbar.', feedback: 'Zentral: Ohne wirksame Benetzung kein Abbruch an der Schulseite.' },
        { id: 'u2', points: 2, relevant: true, text: 'Wann die Staubschutzwand montiert wird', reveal: 'Lieferung morgen früh; Montage bis Mittag möglich.', feedback: 'Zentral: Abschirmung zur Schulseite ist Teil des Konzepts.' },
        { id: 'u3', points: 2, relevant: true, text: 'Ob der gemietete Lader einen Nachweis hat', reveal: 'Nachweis nicht vorhanden; der Vermieter kann ihn per Mail schicken.', feedback: 'Zentral: Bei Stufe B und neben der Schule – ohne Nachweis kein Einsatz.' },
        { id: 'u4', points: 0, relevant: false, text: 'Wer den Sprühnebel-Kanon gestern zuletzt benutzt hat', reveal: '—', feedback: 'Für die Massnahmen heute nicht nötig.' },
        { id: 'u5', points: 1, relevant: true, text: 'Wann die nächsten Pausen der Schule sind', reveal: 'Mittagspause 11.50–13.30 Uhr, Nachmittagspause 14.45–15.00 Uhr.', feedback: 'Nützlich für die Planung – nachdem die Massnahmen geklärt sind.' },
      ],
    },
    {
      id: 'k3', title: 'Bis die Massnahmen wirken', type: 'multi', criteria: ['fachlich', 'risiko'],
      situation: 'Der Sprühnebel kommt um 14 Uhr, die Wand morgen.',
      prompt: 'Was gilt bis dahin? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Kein Abbruch an der Schulseite, bis Sprühnebel läuft und die Wand steht bzw. eine gleichwertige Abschirmung vorhanden ist', feedback: 'Richtig.' },
        { id: 'm2', points: 2, text: 'Arbeiten an der abgewandten Seite oder Innenrückbau mit Absaugung vorziehen', feedback: 'Richtig: Die Equipe bleibt produktiv.' },
        { id: 'm3', points: 2, text: 'Lader erst einsetzen, wenn der Nachweis vorliegt', feedback: 'Richtig.' },
        { id: 'm4', points: 2, text: 'Platz und Zufahrt nass reinigen, abgelagerten Staub nicht aufwirbeln', feedback: 'Richtig.' },
        { id: 'm5', points: 0, critical: true, text: 'Den Abbruch an der Schulseite während der Unterrichtszeit fortsetzen, da dann keine Kinder draussen sind', feedback: 'Kritischer Fehler: Staub dringt über Fenster und Lüftung ins Schulhaus; ohne wirksame Massnahmen wird die Belastung nur verschoben.', consequence: 'Die Lüftungsanlage der Schule saugt Staub an; ein Klassenzimmer muss geräumt werden.' },
        { id: 'm6', points: 0, text: 'Mit dem Laubbläser den Staub vom Pausenplatz blasen', feedback: 'Falsch: wirbelt den Staub wieder auf.' },
      ],
    },
    {
      id: 'k4', title: 'Reihenfolge', type: 'rank', criteria: ['prioritaet', 'zusammenarbeit'],
      situation: 'Sie ordnen die nächsten Schritte für heute und morgen.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Schulleitung informieren: was passiert ist, was jetzt gilt, Ansprechperson' },
        { id: 'n2', text: 'Ersatz-Sprühnebel organisieren und Nachweis des Laders einfordern' },
        { id: 'n3', text: 'Abbruch an der Schulseite wieder aufnehmen – erst mit laufendem Sprühnebel und montierter Wand' },
        { id: 'n4', text: 'Maschinenliste nachführen; Regel «Nachweis vor Einsatz» mit dem Subunternehmer klären' },
        { id: 'n5', text: 'Ursache klären: Warum ging der Abbruch trotz defektem Sprühnebel weiter? Massnahme im Kontrollkonzept' },
      ],
      rankOrder: ['n1', 'n2', 'n4', 'n3', 'n5'],
      rankGroups: [['n1', 'n2'], ['n4'], ['n3'], ['n5']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Die Schulleitung muss sofort wissen, was passiert ist und was ab jetzt gilt.' }],
      rankExplanation: 'Information der Schule und Organisation der Massnahmen laufen sofort parallel. Danach Maschinenliste nachführen. Der Abbruch an der Schulseite wird erst wieder aufgenommen, wenn die Massnahmen stehen. Die Ursachenanalyse folgt – damit ein Defekt künftig zum Stopp führt statt zum Weiterarbeiten.',
    },
    {
      id: 'k5', title: 'Der Bauführer', type: 'single', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Der Bauführer: «Wir sind schon zwei Tage im Verzug. Der Abbruch an der Schulseite muss heute Nachmittag weitergehen, auch ohne Wand – der Sprühnebel ist ja ab 14 Uhr da.»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Vorschlagen: ab 14 Uhr mit Sprühnebel an Teilen der Fassade, die nicht direkt zum Pausenplatz zeigen, und nur ausserhalb der Pausen; Wirkung laufend prüfen (Blick über die Grenze); den direkt zugewandten Teil erst nach Montage der Wand. Mit Schulleitung absprechen.', feedback: 'Richtig: Termin und Schutz werden zusammen gelöst – mit Bedingungen und Kontrolle.' },
        { id: 'r2', points: 0, text: 'Zustimmen – Stufe B ist mit Sprühnebel erfüllt.', feedback: 'Falsch: Die Wand ist Teil des Konzepts; direkt an der Schulseite reicht der Sprühnebel allein heute nachweislich nicht.' },
        { id: 'r3', points: 1, text: 'Ablehnen – nichts an der Schulseite bis morgen.', feedback: 'Teilweise: sicher, aber es wird keine Lösung gesucht, die den Verzug mindert.' },
      ],
    },
    {
      id: 'k6', title: 'Rückmeldung an die Schule', type: 'justify', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Sie schreiben der Schulleiterin eine kurze Nachricht.',
      prompt: 'Schreiben Sie 4–6 Sätze: was passiert ist, was getan wurde, was ab jetzt gilt, an wen sie sich wenden kann.',
      rubric: [
        { id: 'b1', text: 'Sachlich: Ursache (Benetzung ausgefallen) ohne Ausreden', keywords: ['benetzung', 'ausgefallen', 'defekt', 'ursache'] },
        { id: 'b2', text: 'Sofortmassnahme: Arbeit an der Schulseite unterbrochen', keywords: ['unterbroch', 'gestoppt', 'sofort'] },
        { id: 'b3', text: 'Was ab jetzt gilt: Sprühnebel, Wand, Zeiten ausserhalb der Pausen', keywords: ['sprühnebel', 'wand', 'pause', 'zeiten'] },
        { id: 'b4', text: 'Ansprechperson mit Erreichbarkeit', keywords: ['ansprechperson', 'telefon', 'erreichbar', 'melden'] },
        { id: 'b5', text: 'Entschuldigung bzw. Verständnis, ohne Schuldzuweisung', keywords: ['entschuldig', 'bedauern', 'verständnis'] },
      ],
    },
  ],
  debrief: 'Die Staubwolke war kein Naturereignis, sondern die Folge eines ausgefallenen Geräts, das niemanden zum Anhalten gebracht hatte. Wirksame Luftreinhaltung heisst: Wenn die Massnahme ausfällt, ruht die staubintensive Arbeit – und die Arbeit wird so umgestellt, dass der Termin trotzdem möglichst gehalten wird. Dazu gehört, dass nur Maschinen mit Nachweis fahren und dass die Nachbarschaft weiss, an wen sie sich wenden kann.',
  sources: ['bafu-luft', 'lrv', 'usg', 'praxis'],
};
