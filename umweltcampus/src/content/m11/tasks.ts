import type { Card, FeynmanTask, PracticeTask, Scenario, SiteTask } from '../types';

const M = 'm11';

// ---------- Baustellenaufgaben (fiktive Daten) ----------
export const M11_SITETASKS: SiteTask[] = [
  {
    id: 'm11-t1', moduleId: M, topic: 'm11-grundlagen', level: 2, setting: 'Hochbau',
    title: 'Anforderungen einer Ausschreibung einordnen',
    situation: 'Ausschreibung (fiktiv) einer Gemeinde für ein Schulhaus. Sie prüfen die Nachhaltigkeitsanforderungen vor der Offerte.',
    data: [
      'Standard: Minergie-P-ECO (Zertifizierung durch die Bauherrschaft)',
      'Beton für Innenwände: Recyclingbeton; Zementart nicht vorgegeben',
      'Zuschlagskriterium «Nachhaltigkeit» (15 %): Konzept für Baustelle (Energie, Maschinen, Transporte)',
      'Unternehmervorschläge zulässig',
      'Hinweis der Gemeinde: «Ziel Netto-Null der Gemeinde bis 2040»',
    ],
    assignment: 'Ordnen Sie jede Anforderung ein (Gesetz, vertraglich bei Zuschlag, Zuschlagskriterium, Ziel der Bauherrschaft) und notieren Sie, was Ihre Offerte dazu enthalten muss.',
    rubric: [
      { id: 'k1', text: 'Label und Recyclingbeton = vertragliche Anforderung bei Zuschlag', keywords: ['vertrag', 'minergie', 'recyclingbeton', 'geschuldet'] },
      { id: 'k2', text: 'Zuschlagskriterium: Konzept wird bewertet und Vertragsbestandteil', keywords: ['zuschlag', 'konzept', 'bewert', 'bestandteil'] },
      { id: 'k3', text: 'Netto-Null der Gemeinde = Ziel der Bauherrschaft, keine direkte Pflicht der Unternehmung', keywords: ['ziel', 'gemeinde', 'keine pflicht', 'bauherrschaft'] },
      { id: 'k4', text: 'Unternehmervorschlag (z. B. klinkerärmerer Zement) mit Daten', keywords: ['unternehmervorschlag', 'zement', 'klinker', 'variante'] },
      { id: 'k5', text: 'Nur zusagen, was machbar und nachweisbar ist', keywords: ['machbar', 'nachweis', 'umsetzbar'] },
    ],
    solution: `| Anforderung | Einordnung | Inhalt der Offerte |
|---|---|---|
| Minergie-P-ECO | Vertraglich (Standard der Bauherrschaft) | Bestätigung, ECO-Anforderungen an Baustoffe beachten (Produktwahl, Deklarationen) |
| Recyclingbeton Innenwände | Vertraglich bei Zuschlag | Betonsorte mit Werk geklärt, Lieferbarkeit bestätigt |
| Zuschlagskriterium Baustellenkonzept | Wird bewertet und Vertragsbestandteil | Baustrom ab wann, Akku-Kleingeräte, Leerlaufregel, Transportplanung, Datenerfassung – nur Machbares |
| Netto-Null der Gemeinde | Ziel der Bauherrschaft, keine Pflicht der Unternehmung | Hinweis, wie das Konzept dazu beiträgt |
| Unternehmervorschläge | Möglichkeit | Variante: klinkerärmerer Zement in Decken, belegt mit Deklaration des Werks; Freigabe durch Ingenieur |

**Wichtig**: Jede Zusage im Konzept ist bei Zuschlag geschuldet – Machbarkeit (Baustrom-Anschluss, Geräte im Magazin, Lieferbarkeit) vor dem Einreichen prüfen.`,
    sources: ['boeb', 'klg', 'praxis'],
  },
  {
    id: 'm11-t2', moduleId: M, topic: 'm11-bilanz', level: 2, setting: 'Tiefbau',
    title: 'Emissionen einer Baustelle zuordnen',
    situation: 'Werkleitungs- und Strassenbau (fiktiv), 8 Monate. Sie sollen die Emissionsquellen für die Firmenbilanz zuordnen.',
    data: [
      'Eigene Bagger, Walzen, Lastwagen (Diesel, Tankanlage im Werkhof)',
      'Baustellen-Container mit Ölheizung (eigener Tank)',
      'Baustrom über Anschluss der Unternehmung',
      'Asphalt und Beton eingekauft; Kies durch Transportfirma geliefert',
      'Subunternehmer für Belagseinbau mit eigenen Maschinen',
      'Aushub zur Deponie durch Transportfirma',
    ],
    assignment: 'Ordnen Sie jede Quelle Scope 1, 2 oder 3 zu und nennen Sie die Datenquelle.',
    rubric: [
      { id: 'k1', text: 'Eigener Diesel und Ölheizung: Scope 1', keywords: ['scope 1', 'diesel', 'heizöl', 'öl'] },
      { id: 'k2', text: 'Baustrom: Scope 2', keywords: ['scope 2', 'strom'] },
      { id: 'k3', text: 'Asphalt, Beton, Transporte Dritter, Subunternehmer, Deponie: Scope 3', keywords: ['scope 3', 'asphalt', 'beton', 'subunternehm', 'transport'] },
      { id: 'k4', text: 'Datenquellen (Tankanlage, Rechnungen, Lieferscheine, Angaben Subunternehmer)', keywords: ['tank', 'rechnung', 'lieferschein', 'angaben'] },
      { id: 'k5', text: 'Systemgrenze und Schätzungen kennzeichnen', keywords: ['systemgrenze', 'schätz', 'annahme'] },
    ],
    solution: `| Quelle | Scope | Datenquelle |
|---|---|---|
| Diesel eigener Maschinen und Lastwagen | 1 | Tankanlage Werkhof mit Baustellen- und Maschinennummer |
| Ölheizung Container | 1 | Lieferrechnungen Heizöl |
| Baustrom (Anschluss der Unternehmung) | 2 | Stromrechnung, Produkt des Lieferanten |
| Asphalt, Beton (Herstellung) | 3 | Lieferscheine (t bzw. m³) × Ökobilanzdaten bzw. Deklaration |
| Kieslieferung durch Transportfirma | 3 | Fahrten bzw. Tonnenkilometer |
| Subunternehmer Belagseinbau | 3 | Angaben des Subunternehmers (Diesel) oder Schätzung |
| Aushubtransporte und Deponie | 3 | Deponiebelege, Fahrten |

**Hinweise**: Systemgrenze dokumentieren; Schätzungen (Subunternehmer, Transporte) kennzeichnen. Für das Projekt lassen sich dieselben Daten auch der Bauherrschaft liefern.`,
    sources: ['ghg-protocol', 'kbob-oekobilanz'],
  },
  {
    id: 'm11-t3', moduleId: M, topic: 'm11-material', level: 3, setting: 'Hochbau',
    title: 'Betonvariante für einen Wohnbau',
    situation: 'Wohnüberbauung (fiktiv) mit drei Mehrfamilienhäusern, Ausführung Sommer bis Winter. Ausgeschrieben: Standardbeton; Unternehmervorschläge zulässig.',
    data: [
      'Rund 4000 m³ Beton (Bodenplatten, Wände, Decken)',
      'Betonwerk bietet eine Sorte mit klinkerärmerem Zement und Recyclingbeton an (Deklarationen vorhanden)',
      'Decken der Häuser 2 und 3 fallen in die Monate November bis Januar',
      'Ingenieur offen für Varianten, Bauherrschaft interessiert an Nachhaltigkeit',
    ],
    assignment: 'Formulieren Sie einen Unternehmervorschlag: Was schlagen Sie vor, wie belegen Sie es, welche Risiken und Freigaben sind nötig, wie kontrollieren Sie die Umsetzung?',
    rubric: [
      { id: 'k1', text: 'Variante konkret (welche Bauteile, welche Sorte)', keywords: ['decke', 'wand', 'sorte', 'klinker', 'recycling'] },
      { id: 'k2', text: 'Beleg mit Deklarationen, Vergleich auf gleicher Basis', keywords: ['deklaration', 'vergleich', 'daten', 'funktional'] },
      { id: 'k3', text: 'Freigabe Ingenieur und Bauherrschaft; Lieferbarkeit', keywords: ['ingenieur', 'freigabe', 'bauherrschaft', 'liefer'] },
      { id: 'k4', text: 'Winter: Festigkeitsentwicklung, Ausschalfristen, Ausnahmeregel', keywords: ['winter', 'festigkeit', 'ausschal', 'ausnahme'] },
      { id: 'k5', text: 'Kontrolle über Lieferscheine', keywords: ['lieferschein', 'kontroll'] },
    ],
    solution: `**Vorschlag**: Wände und Decken mit klinkerärmerem Zement; Innenwände zusätzlich mit rezyklierter Gesteinskörnung. Bodenplatten nach Vorgabe des Ingenieurs (Exposition).

**Beleg**: Deklarationen des Werks für beide Sorten und die Standardsorte; Vergleich je m³ gleicher Festigkeitsklasse und Exposition; Mengen aus dem Ausmass. Ergebnis als Schätzung mit Quelle.

**Freigaben**: Ingenieur (Festigkeit, Dauerhaftigkeit, Ausschalfristen), Bauherrschaft (Vertrag, Kosten), Werk (Lieferbarkeit bestätigt).

**Risiken**: Winterdecken Häuser 2 und 3 – langsamere Festigkeitsentwicklung. Vorschlag: Nachbehandlung und Taktplanung anpassen; falls nötig, vereinbarte Ausnahmeregel (welche Bauteile, welche Temperatur, wer entscheidet).

**Umsetzung**: Sorte in jeder Bestellung; Kontrolle der Lieferscheine bei jeder Betonage; Abweichungen sofort an die Bauleitung; Mengen je Sorte für den Schlussbericht.`,
    sources: ['kbob-oekobilanz', 'sia118', 'praxis'],
  },
  {
    id: 'm11-t4', moduleId: M, topic: 'm11-kreislauf', level: 3, setting: 'Hochbau',
    title: 'Rückbauinventar und Kreislauf',
    situation: 'Rückbau (fiktiv) eines Bürogebäudes aus den 1990er-Jahren, 5 Geschosse, Stahlbeton mit vorgehängter Fassade. Danach Neubau.',
    data: [
      'Schadstoffermittlung: keine Schadstoffe in Fenstern, Trägern, Doppelböden; PCB-haltige Fugen in der Fassade',
      'Vorhanden: 120 Fenster, 400 m² Doppelboden, Stahlträger im Dach, Natursteinplatten Eingangshalle',
      'Beton- und Mischabbruch ca. 6000 t',
      'Bauherrschaft offen für Wiederverwendung, wenn der Termin hält',
    ],
    assignment: 'Erstellen Sie eine Übersicht: Material/Bauteil – Weg (wiederverwenden, verwerten, entsorgen) – Voraussetzungen – Verantwortung.',
    rubric: [
      { id: 'k1', text: 'Wiederverwendung für Fenster, Doppelboden, Träger, Natursteinplatten mit Abnehmer', keywords: ['fenster', 'doppelboden', 'träger', 'naturstein', 'abnehmer'] },
      { id: 'k2', text: 'PCB-Fugen: Sanierung vor dem Rückbau, Sonderabfall', keywords: ['pcb', 'fugen', 'sonderabfall', 'vor'] },
      { id: 'k3', text: 'Betonabbruch hochwertig verwerten (Gesteinskörnung)', keywords: ['betonabbruch', 'gesteinskörnung', 'recycling', 'verwert'] },
      { id: 'k4', text: 'Ausbau im Terminplan, Lagerung, Dokumentation', keywords: ['termin', 'ausbau', 'lager', 'dokument'] },
      { id: 'k5', text: 'Einverständnis Bauherrschaft', keywords: ['bauherrschaft', 'einverständ', 'eigentum'] },
    ],
    solution: `| Material/Bauteil | Weg | Voraussetzungen | Verantwortung |
|---|---|---|---|
| PCB-haltige Fugen | Fachgerechte Sanierung vor dem Rückbau, Sonderabfall | Sanierungskonzept, Fachfirma (Modul 3) | Bauherrschaft/Fachfirma, Kontrolle Umweltfachperson |
| Fenster (geeignete) | Wiederverwenden | Abnehmer, Zustand geprüft, zerstörungsfreier Ausbau | Projektleitung mit Abnehmer |
| Doppelboden | Wiederverwenden (Händler/Bauteilbörse) | Abnehmer, Lagerung trocken | Projektleitung |
| Stahlträger | Wiederverwenden, sonst Metallverwertung | Prüfung durch Ingenieur des Abnehmers | Abnehmer |
| Natursteinplatten | Wiederverwenden | Sorgfältiger Ausbau | Polier/in |
| Beton- und Mischabbruch | Hochwertig verwerten (Gesteinskörnung) | Sortenreiner Rückbau, Störstoffe vorher entfernen | Bauführer/in, Recyclingwerk |
| Übrige Fraktionen | Getrennt verwerten bzw. entsorgen (VVEA) | Mulden nach Entsorgungskonzept | Polier/in |

**Vorgehen**: Einverständnis der Bauherrschaft schriftlich; Ausbau der Bauteile als eigene Phase vor dem maschinellen Rückbau im Terminplan; Herkunftsblatt je Bauteilgruppe; Materialbilanz am Ende.`,
    sources: ['vvea', 'bafu-mineral', 'usg-kreislauf', 'praxis'],
  },
  {
    id: 'm11-t5', moduleId: M, topic: 'm11-umsetzung', level: 3, setting: 'Hochbau',
    title: 'Nachhaltigkeitszusagen prüfen',
    situation: 'Sie erhalten vor dem Einreichen einer Offerte (fiktiv) das Nachhaltigkeitskonzept des Kalkulators zur Prüfung.',
    data: [
      '«Die Baustelle wird klimaneutral betrieben.»',
      '«Ausschliesslich elektrische Maschinen.» (Firma hat zwei Elektro-Minibagger, sonst Diesel)',
      '«Baustrom ab Tag 1.» (Anschluss gemäss EW frühestens nach 6 Wochen)',
      '«Recyclinganteil 100 %.» (gemeint: Gesteinskörnung im Beton der Innenwände)',
      '«Wir erfassen den Dieselverbrauch und berichten monatlich.»',
    ],
    assignment: 'Prüfen Sie jede Aussage auf Machbarkeit und Belegbarkeit und formulieren Sie sie neu.',
    rubric: [
      { id: 'k1', text: '«Klimaneutral» streichen bzw. durch konkrete Massnahmen ersetzen', keywords: ['klimaneutral', 'streichen', 'konkret'] },
      { id: 'k2', text: 'Elektrisch nur, wo vorhanden: Minibagger, Kleingeräte', keywords: ['minibagger', 'kleingerät', 'wo möglich', 'elektrisch'] },
      { id: 'k3', text: 'Baustrom realistisch (ab Woche X, vorher Überbrückung)', keywords: ['woche', 'überbrück', 'aggregat', 'baustrom'] },
      { id: 'k4', text: 'Recyclinganteil präzisieren (welche Bauteile, welcher Anteil gemäss Lieferschein)', keywords: ['innenwände', 'gesteinskörnung', 'präzis', 'lieferschein'] },
      { id: 'k5', text: 'Dieselerfassung beibehalten, Methode nennen', keywords: ['diesel', 'tank', 'monatlich', 'erfass'] },
    ],
    solution: `| Aussage | Problem | Neue Formulierung |
|---|---|---|
| «Klimaneutral» | Keine Bilanz, keine Kompensation – nicht belegbar | Streichen. «Wir reduzieren die Emissionen der Baustelle mit folgenden Massnahmen: …» |
| «Ausschliesslich elektrisch» | Nicht machbar | «Elektro-Minibagger für Aushub im Hof; Akku-Kleingeräte; Kran elektrisch; übrige Maschinen Diesel mit Leerlaufregel.» |
| «Baustrom ab Tag 1» | Anschluss erst nach 6 Wochen | «Baustrom ab Anschluss durch das EW (geplant Woche 6), bis dahin Aggregat mit Partikelfilter, Laufzeit minimiert.» |
| «Recyclinganteil 100 %» | Missverständlich | «Beton der Innenwände mit rezyklierter Gesteinskörnung gemäss Sortenblatt des Werks.» |
| Dieselerfassung | Gut | «Erfassung über Tankbelege mit Baustellennummer, monatlicher Bericht an die Bauleitung.» |

**Grundsatz**: Nur zusagen, was machbar, kalkuliert und nachweisbar ist – jede Zusage wird bei Zuschlag geschuldet.`,
    sources: ['boeb', 'uwg', 'praxis'],
  },
];

// ---------- Praxisaufträge ----------
export const M11_TASKS: PracticeTask[] = [
  { id: 'm11-p1', moduleId: M, topic: 'm11-grundlagen', title: 'Nachhaltigkeitsanforderungen sammeln',
    goal: 'Überblick gewinnen, welche Klima- und Ressourcenanforderungen Ihre Firma heute treffen.',
    steps: ['Sammeln Sie aus drei aktuellen Ausschreibungen oder Verträgen alle Nachhaltigkeitsanforderungen.', 'Ordnen Sie sie ein: Gesetz, Vertrag/Label, Zuschlagskriterium, Ziel der Bauherrschaft.', 'Fragen Sie im Verkauf nach Kundenanfragen zu Emissionsdaten.', 'Fassen Sie das Ergebnis auf einer Seite zusammen.'],
    deliverable: 'Einseitige Übersicht der Anforderungen mit Einordnung.',
    criteria: ['Drei Projekte ausgewertet', 'Einordnung korrekt', 'Kundenanfragen erfasst', 'Für die Geschäftsleitung verständlich'], confirmer: 'Projektleiter/in oder Geschäftsleitung' },
  { id: 'm11-p2', moduleId: M, topic: 'm11-bilanz', title: 'Datenquellen für eine Bilanz prüfen',
    goal: 'Herausfinden, welche Daten für eine Treibhausgasbilanz bereits vorhanden sind.',
    steps: ['Klären Sie, wie Diesel, Heizöl und Strom heute erfasst werden (Tankkarten, Tankanlage, Rechnungen).', 'Prüfen Sie, ob Baustelle und Maschine auf den Belegen stehen.', 'Klären Sie, ob Einkaufsmengen für Beton und Stahl verfügbar sind.', 'Schlagen Sie eine Verbesserung der Erfassung vor.'],
    deliverable: 'Liste der Datenquellen mit Lücken und einem Verbesserungsvorschlag.',
    criteria: ['Scope 1 und 2 erfasst', 'Wichtigste Scope-3-Daten geprüft', 'Lücken benannt', 'Vorschlag umsetzbar'], confirmer: 'Leitung Finanzen oder Werkhof' },
  { id: 'm11-p3', moduleId: M, topic: 'm11-material', title: 'Betonsorten mit dem Werk klären',
    goal: 'Die Möglichkeiten für CO₂-reduzierte Betone bei Ihrem Hauptlieferanten kennen.',
    steps: ['Fragen Sie das Betonwerk nach verfügbaren Sorten mit klinkerärmerem Zement und rezyklierter Gesteinskörnung.', 'Beschaffen Sie die Deklarationen.', 'Klären Sie Lieferbarkeit, Preis und Besonderheiten (Winter, Ausschalfristen).', 'Stellen Sie das Ergebnis der Kalkulation vor.'],
    deliverable: 'Übersicht der Sorten mit Deklarationen und Hinweisen.',
    criteria: ['Sorten erfasst', 'Deklarationen vorhanden', 'Lieferbarkeit und Besonderheiten geklärt', 'Kalkulation informiert'], confirmer: 'Kalkulation oder Bauführer/in' },
  { id: 'm11-p4', moduleId: M, topic: 'm11-kreislauf', title: 'Materialbilanz einer Baustelle',
    goal: 'Für eine Baustelle die Materialflüsse erfassen und Verbesserungen ableiten.',
    steps: ['Erfassen Sie Aushub, Rückbaumaterial, Bauabfälle und eingesetzte Baustoffe (Mengen, Wege).', 'Bestimmen Sie den Anteil, der wiederverwendet oder verwertet wurde.', 'Suchen Sie zwei Verbesserungen (z. B. Wiedereinbau vor Ort, Verpackung zurück).', 'Besprechen Sie sie mit dem Bauführer.'],
    deliverable: 'Materialbilanz mit zwei vereinbarten Verbesserungen.',
    criteria: ['Mengen nachvollziehbar', 'Definition «verwertet» klar', 'Verbesserungen konkret', 'Vereinbart'], confirmer: 'Bauführer/in' },
  { id: 'm11-p5', moduleId: M, topic: 'm11-umsetzung', title: 'Kommunikation prüfen',
    goal: 'Die Nachhaltigkeitsaussagen Ihrer Firma auf Belegbarkeit prüfen.',
    steps: ['Sammeln Sie Aussagen zu Klima und Nachhaltigkeit auf Website, in Prospekten und Offerten.', 'Prüfen Sie jede Aussage: konkret, belegt, verhältnismässig?', 'Schlagen Sie für problematische Aussagen neue Formulierungen vor.', 'Besprechen Sie das mit dem Marketing.'],
    deliverable: 'Liste der Aussagen mit Bewertung und Vorschlägen.',
    criteria: ['Aussagen vollständig gesammelt', 'Bewertung nachvollziehbar', 'Vorschläge konkret', 'Mit Marketing besprochen'], confirmer: 'Marketing oder Geschäftsleitung' },
];

// ---------- Feynman ----------
export const M11_FEYNMAN: FeynmanTask[] = [
  { id: 'm11-f1', moduleId: M, topic: 'm11-kreislauf', audience: 'Bauherr',
    prompt: 'Erklären Sie einem Bauherrn in 5–7 Sätzen, warum er vor dem Rückbau seines Gebäudes ein Bauteilinventar machen lassen sollte und was er davon hat.',
    rubric: [
      { id: 'f1', text: 'Wiederverwendung spart am meisten (Rangfolge)', keywords: ['wiederverwend', 'spart', 'rangfolge', 'vor verwert'] },
      { id: 'f2', text: 'Inventar zeigt, was brauchbar ist – vor dem Abbruch', keywords: ['inventar', 'vor', 'brauchbar', 'vorhanden'] },
      { id: 'f3', text: 'Zusammen mit Schadstoffermittlung', keywords: ['schadstoff'] },
      { id: 'f4', text: 'Nutzen: weniger Entsorgungskosten, Erlöse, Image, Kreislaufwirtschaft', keywords: ['kosten', 'entsorgung', 'erlös', 'image', 'kreislauf'] },
      { id: 'f5', text: 'Verständlich, ohne Fachjargon', keywords: [] },
    ] },
  { id: 'm11-f2', moduleId: M, topic: 'm11-umsetzung', audience: 'Marketing',
    prompt: 'Erklären Sie einer Marketingverantwortlichen in 5–7 Sätzen, warum «klimaneutral» heikel ist und wie sie stattdessen glaubwürdig über Klimaschutz berichten kann.',
    rubric: [
      { id: 'f1', text: '«Klimaneutral» braucht Bilanz, Reduktion, belegte Kompensation', keywords: ['bilanz', 'kompens', 'beleg', 'reduktion'] },
      { id: 'f2', text: 'Risiko: Irreführung, Glaubwürdigkeit, rechtlich', keywords: ['irreführ', 'glaubwürd', 'recht', 'risiko'] },
      { id: 'f3', text: 'Konkrete Massnahmen mit Zahlen und Quellen', keywords: ['konkret', 'massnahm', 'zahl', 'quelle'] },
      { id: 'f4', text: 'Ehrlich auch bei Einschränkungen; Ziele als Ziele', keywords: ['ehrlich', 'einschränk', 'ziel'] },
      { id: 'f5', text: 'Verständlich, ohne Fachjargon', keywords: [] },
    ] },
];

// ---------- Wiederholungskarten ----------
export const M11_CARDS: Card[] = [
  { id: 'm11-c01', moduleId: M, topic: 'm11-grundlagen', level: 1, front: 'Wo entsteht die Klimawirkung des Bauens?', back: '**Baustoffe** (graue Emissionen), **Transporte**, **Maschinen**, **Betrieb**, **Rückbau**.', sources: ['kbob-oekobilanz'] },
  { id: 'm11-c02', moduleId: M, topic: 'm11-grundlagen', level: 1, front: 'Pflicht, vereinbart, freiwillig?', back: '**Gesetz** (z. B. CO₂-Gesetz, VVEA) – **Vertrag/Label** (geschuldet, wenn vereinbart) – **freiwillig** (eigene Ziele).', sources: ['praxis'] },
  { id: 'm11-c03', moduleId: M, topic: 'm11-grundlagen', level: 1, front: 'CO₂-Abgabe worauf?', back: 'Auf fossile **Brennstoffe** (Heizöl, Gas) – **nicht** auf Treibstoffe wie Diesel.', sources: ['co2g'] },
  { id: 'm11-c04', moduleId: M, topic: 'm11-grundlagen', level: 2, front: 'Berichtspflicht über Klimabelange?', back: '**Grosse Unternehmen** von öffentlichem Interesse (OR + Verordnung). Mittlere Firmen oft **indirekt** über Kundenanfragen.', sources: ['klimabericht'] },
  { id: 'm11-c05', moduleId: M, topic: 'm11-bilanz', level: 1, front: 'Scope 1, 2, 3?', back: '**1**: eigene Treib- und Brennstoffe. **2**: eingekaufte Energie. **3**: Wertschöpfungskette (Baustoffe, Dritte, Entsorgung).', sources: ['ghg-protocol'] },
  { id: 'm11-c06', moduleId: M, topic: 'm11-bilanz', level: 1, front: 'Grösster Teil bei Bauunternehmen?', back: 'Meist **Scope 3** – vor allem **eingekaufte Baustoffe**.', sources: ['ghg-protocol'] },
  { id: 'm11-c07', moduleId: M, topic: 'm11-bilanz', level: 2, front: 'Kompensation in der Bilanz?', back: '**Getrennt** ausweisen – senkt die eigenen Emissionen **nicht**. Reduktion vor Kompensation.', sources: ['ghg-protocol'] },
  { id: 'm11-c08', moduleId: M, topic: 'm11-bilanz', level: 2, front: 'Bilanz ehrlich darstellen?', back: '**Systemgrenze**, **Bezugsjahr**, **Faktoren und Quellen**, **Schätzungen** kennzeichnen, Veränderungen **erklären**.', sources: ['praxis'] },
  { id: 'm11-c09', moduleId: M, topic: 'm11-material', level: 1, front: 'Haupttreiber Beton?', back: '**Zementklinker** – Hebel: klinkerärmerer Zement, weniger Zement, weniger Beton.', sources: ['kbob-oekobilanz'] },
  { id: 'm11-c10', moduleId: M, topic: 'm11-material', level: 1, front: 'Recyclingbeton = klimafreundlich?', back: 'Schont **Kies** und **Deponieraum**; CO₂ nur weniger mit **angepasstem Zement**.', sources: ['bafu-mineral'] },
  { id: 'm11-c11', moduleId: M, topic: 'm11-material', level: 2, front: 'Baustoffe vergleichen – worauf?', back: 'Auf dieselbe **funktionale Einheit** (z. B. 1 m² Decke gleicher Tragfähigkeit), nicht pro kg.', sources: ['kbob-oekobilanz'] },
  { id: 'm11-c12', moduleId: M, topic: 'm11-material', level: 2, front: 'Vereinbarte Sorte nicht lieferbar?', back: '**Bauleitung informieren**, Alternativen prüfen, Ausnahme **mit Zustimmung** – nie stillschweigend wechseln.', sources: ['praxis'] },
  { id: 'm11-c13', moduleId: M, topic: 'm11-kreislauf', level: 1, front: 'Rangfolge Kreislauf?', back: '**Vermeiden – wiederverwenden – verwerten – entsorgen.**', sources: ['vvea'] },
  { id: 'm11-c14', moduleId: M, topic: 'm11-kreislauf', level: 2, front: 'Wiederverwendung – Voraussetzungen?', back: '**Schadstofffrei**, **geeignet**, **Abnehmer**, **Einverständnis Eigentümer**, **Ausbau**, **Lagerung**, **Dokumentation**.', sources: ['praxis'] },
  { id: 'm11-c15', moduleId: M, topic: 'm11-kreislauf', level: 2, front: 'Hochwertige Verwertung?', back: 'Ersetzt **Primärmaterial in ähnlicher Funktion** (z. B. Gesteinskörnung im Beton). Voraussetzung: **sortenreiner Rückbau**.', sources: ['bafu-mineral'] },
  { id: 'm11-c16', moduleId: M, topic: 'm11-umsetzung', level: 1, front: 'Massnahmen auf der Baustelle?', back: '**Baustrom** früh, **elektrisch** wo möglich, **Leerlauf** vermeiden, **Container** und Winterbau, **Transporte** bündeln, **Restbeton** vermeiden.', sources: ['praxis'] },
  { id: 'm11-c17', moduleId: M, topic: 'm11-umsetzung', level: 1, front: 'Nachhaltigkeit in der Offerte?', back: 'Ist bei Zuschlag **geschuldet** – nur zusagen, was **machbar**, **kalkuliert** und **nachweisbar** ist.', sources: ['boeb'] },
  { id: 'm11-c18', moduleId: M, topic: 'm11-umsetzung', level: 2, front: 'Glaubwürdig kommunizieren?', back: '**Konkret**, **belegt**, **verhältnismässig**; Ziele als Ziele; Einschränkungen offen. Kein «klimaneutral» ohne Grundlage.', sources: ['uwg'] },
];

// ---------- Simulation ----------
export const M11_SCENARIO: Scenario = {
  id: 'sim-l', code: 'L', moduleId: M, status: 'verfuegbar', rev: 5,
  title: 'Die Klimazusage, die nicht hält',
  setting: 'Management', level: 3, minutes: 20,
  topics: ['m11-material', 'm11-bilanz', 'm11-umsetzung'],
  intro: 'Ihre Firma hat einen Schulhausneubau (fiktiv) einer Gemeinde gewonnen – auch dank eines Nachhaltigkeitskonzepts: CO₂-reduzierter Beton für Wände und Decken, Baustrom statt Aggregat, Elektro-Minibagger und monatliche Dieselberichte. Drei Monate nach Baubeginn bittet Sie die Geschäftsleitung, für den Jahresbericht einen Beitrag «Unsere klimaneutrale Schulhausbaustelle» freizugeben.',
  facts: [
    'Das Betonwerk liefert die vereinbarte Sorte seit vier Wochen nur noch für die Wände; für zwei Decken wurde ohne Rücksprache die Standardsorte bestellt.',
    'Wegen eines verspäteten Gesuchs lief bis letzte Woche ein Dieselaggregat; jetzt ist Baustrom angeschlossen.',
    'Die Dieselberichte wurden zweimal nicht erstellt.',
    'Eine Treibhausgasbilanz der Baustelle oder Kompensationen gibt es nicht.',
  ],
  stages: [
    {
      id: 'l1', title: 'Die Anfrage', type: 'single', criteria: ['recht', 'begruendung'],
      situation: 'Die Kommunikationsverantwortliche schickt den Textentwurf mit dem Titel «Unsere klimaneutrale Schulhausbaustelle».',
      prompt: 'Wie reagieren Sie zuerst?',
      options: [
        { id: 'o1', points: 2, text: 'Freigabe zurückstellen: Ich prüfe zuerst, ob die Zusagen tatsächlich eingehalten werden, und melde mich mit Fakten und einem Formulierungsvorschlag.', feedback: 'Richtig: Erst prüfen, dann kommunizieren – und konstruktiv bleiben.' },
        { id: 'o2', points: 0, critical: true, text: 'Freigeben – das Konzept war ja Teil der Offerte.', feedback: 'Kritischer Fehler: «Klimaneutral» ist ohne Bilanz und Kompensation unbelegt, und Sie wissen nicht, ob die Zusagen eingehalten sind.', consequence: 'Der Bericht erscheint. Ein Lokaljournalist fragt nach der Bilanz; die Gemeinde verlangt eine Stellungnahme.' },
        { id: 'o3', points: 1, text: 'Nur das Wort «klimaneutral» durch «klimafreundlich» ersetzen und freigeben.', feedback: 'Teilweise: besseres Wort, aber Sie prüfen nicht, ob die Zusagen stimmen.' },
      ],
    },
    {
      id: 'l2', title: 'Was prüfen?', type: 'ask', criteria: ['unsicherheit', 'fachlich'], pick: 3,
      situation: 'Sie gehen auf die Baustelle und ins Büro der Bauleitung.',
      prompt: 'Welche drei Dinge klären Sie zuerst?',
      options: [
        { id: 'u1', points: 2, relevant: true, text: 'Welche Betonsorten tatsächlich geliefert wurden (Lieferscheine)', reveal: 'Wände: vereinbarte Sorte. Zwei Decken: Standardsorte, ohne Rücksprache bestellt.', feedback: 'Zentral: Abweichung von einer vertraglichen Zusage.' },
        { id: 'u2', points: 2, relevant: true, text: 'Seit wann Baustrom läuft und wie lange das Aggregat lief', reveal: 'Aggregat zwölf Wochen, Baustrom seit einer Woche; das Gesuch wurde zu spät eingereicht.', feedback: 'Zentral: Zusage «Baustrom statt Aggregat» war lange nicht erfüllt.' },
        { id: 'u3', points: 2, relevant: true, text: 'Ob die Dieselberichte erstellt und an die Bauleitung geschickt wurden', reveal: 'Zwei von drei Monatsberichten fehlen; Tankbelege sind aber vorhanden.', feedback: 'Zentral: Die Daten lassen sich nachliefern.' },
        { id: 'u4', points: 0, relevant: false, text: 'Welche Farbe die Fassade bekommt', reveal: '—', feedback: 'Für die Frage nicht relevant.' },
        { id: 'u5', points: 1, relevant: true, text: 'Warum das Werk die Sorte nicht liefert', reveal: 'Engpass beim Zement im Winter; ab Februar wieder lieferbar, ein anderes Werk hätte sie.', feedback: 'Nützlich für die Lösung.' },
      ],
    },
    {
      id: 'l3', title: 'Sofortmassnahmen', type: 'multi', criteria: ['recht', 'prioritaet'],
      situation: 'Sie haben die Abweichungen bestätigt.',
      prompt: 'Was veranlassen Sie? (Alle sinnvollen wählen)',
      options: [
        { id: 'm1', points: 2, text: 'Bauleitung und Bauherrschaft offen über die Abweichungen beim Beton und beim Aggregat informieren', feedback: 'Richtig: Transparenz gegenüber der Vertragspartnerin.' },
        { id: 'm2', points: 2, text: 'Für die nächsten Decken Alternativen prüfen (anderes Werk) bzw. eine dokumentierte Ausnahme mit Zustimmung und technischer Freigabe vereinbaren', feedback: 'Richtig.' },
        { id: 'm3', points: 2, text: 'Fehlende Dieselberichte aus den Tankbelegen nachliefern und die monatliche Erstellung festlegen', feedback: 'Richtig.' },
        { id: 'm4', points: 2, text: 'Mit Einkauf und Polier regeln, dass Sortenwechsel nur mit Freigabe bestellt werden', feedback: 'Richtig: Ursache beheben.' },
        { id: 'm5', points: 0, critical: true, text: 'Die Lieferscheine der zwei Decken aus dem Projektordner nehmen, damit es keine Diskussion gibt', feedback: 'Kritischer Fehler: Unterlagen verschwinden zu lassen ist Täuschung und kann strafrechtliche Folgen haben.', consequence: 'Bei der Schlussabnahme verlangt die Bauleitung die Lieferscheine beim Werk; die Lücke fällt auf, das Vertrauen ist zerstört.' },
        { id: 'm6', points: 0, text: 'Abwarten, ob die Bauherrschaft es bemerkt', feedback: 'Falsch: Verschweigen verschiebt das Problem und verschärft es.' },
      ],
    },
    {
      id: 'l4', title: 'Reihenfolge', type: 'rank', criteria: ['prioritaet', 'zusammenarbeit'],
      situation: 'Sie planen die nächsten Schritte.',
      prompt: 'Ordnen Sie (oben = zuerst). Was gleichzeitig laufen kann, darf nebeneinander stehen.',
      rankItems: [
        { id: 'n1', text: 'Bauleitung und Bauherrschaft über die Abweichungen informieren' },
        { id: 'n2', text: 'Weitere Bestellungen der Standardsorte stoppen (Einkauf, Polier)' },
        { id: 'n3', text: 'Lösung für die nächsten Decken vereinbaren (anderes Werk oder Ausnahme)' },
        { id: 'n4', text: 'Fehlende Dieselberichte nachliefern' },
        { id: 'n5', text: 'Text für den Jahresbericht neu formulieren und freigeben' },
      ],
      rankOrder: ['n1', 'n2', 'n3', 'n4', 'n5'],
      rankGroups: [['n1', 'n2'], ['n3', 'n4'], ['n5']],
      rankEarly: [{ id: 'n1', maxPos: 2, why: 'Die Vertragspartnerin muss über Abweichungen von Zusagen sofort informiert werden – nicht erst, wenn die Lösung steht.' }],
      rankExplanation: 'Weitere Abweichungen stoppen und die Bauherrschaft informieren laufen sofort und parallel. Danach Lösung für den Beton und Nachlieferung der Daten. Der Text kommt zuletzt – auf Grundlage dessen, was tatsächlich umgesetzt ist.',
    },
    {
      id: 'l5', title: 'Die Geschäftsleitung', type: 'single', criteria: ['zusammenarbeit', 'begruendung'],
      situation: 'Der Geschäftsführer: «Wir haben doch viel gemacht. Können wir nicht einfach Zertifikate kaufen und dann klimaneutral schreiben?»',
      prompt: 'Was antworten Sie?',
      options: [
        { id: 'r1', points: 2, text: 'Erklären, dass Kompensation keine Reduktion ist und ohne Bilanz der Baustelle (inkl. Beton) keine belegbare Aussage möglich ist; vorschlagen, die tatsächlichen Massnahmen konkret zu beschreiben, die Abweichungen ehrlich zu erwähnen und eine Bilanz für künftige Projekte aufzubauen.', feedback: 'Richtig: zeigt einen glaubwürdigen Weg statt nur «geht nicht».' },
        { id: 'r2', points: 0, text: 'Zustimmen – mit Zertifikaten ist es erlaubt.', feedback: 'Falsch: Ohne Bilanz ist unklar, was kompensiert würde; die Aussage bliebe angreifbar.' },
        { id: 'r3', points: 1, text: 'Ablehnen, ohne eine Alternative anzubieten.', feedback: 'Teilweise: richtig im Ergebnis, aber ohne Lösung für die Geschäftsleitung.' },
      ],
    },
    {
      id: 'l6', title: 'Der neue Text', type: 'justify', criteria: ['begruendung', 'recht'],
      situation: 'Sie formulieren den Beitrag für den Jahresbericht neu.',
      prompt: 'Schreiben Sie in 5–7 Sätzen den Kern des Beitrags.',
      rubric: [
        { id: 'b1', text: 'Konkrete Massnahmen (Beton in Wänden, Baustrom, Elektro-Minibagger, Dieselerfassung)', keywords: ['beton', 'wände', 'baustrom', 'minibagger', 'diesel'] },
        { id: 'b2', text: 'Ehrlich: Einschränkungen (Decken, Aggregat bis Woche X)', keywords: ['decke', 'aggregat', 'einschränk', 'nicht immer', 'zeitweise'] },
        { id: 'b3', text: 'Kein «klimaneutral», keine Superlative', keywords: ['kein', 'nicht klimaneutral', 'reduzier'] },
        { id: 'b4', text: 'Was daraus gelernt wurde bzw. nächste Schritte', keywords: ['gelernt', 'künftig', 'nächst', 'bilanz'] },
        { id: 'b5', text: 'Belegbar (Lieferscheine, Daten)', keywords: ['beleg', 'lieferschein', 'daten', 'erfass'] },
      ],
    },
  ],
  debrief: 'Das Konzept war gut – die Umsetzung nicht. Ein Engpass beim Werk, ein verspätetes Gesuch und fehlende Routinen führten zu Abweichungen, die niemand meldete. Hätte der Beitrag «klimaneutral» behauptet, wären aus Umsetzungsfehlern Glaubwürdigkeits- und Vertragsprobleme geworden. Nachhaltigkeit braucht dieselbe Disziplin wie jede andere Vertragsleistung: zusagen, was machbar ist, umsetzen, kontrollieren, offen melden – und erst dann berichten.',
  sources: ['boeb', 'uwg', 'ghg-protocol', 'kbob-oekobilanz', 'praxis'],
};
