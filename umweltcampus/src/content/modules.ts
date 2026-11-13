import type { ModuleMeta, Topic } from './types';

export const MODULES: ModuleMeta[] = [
  {
    id: 'm1', no: 1, title: 'Umweltgrundlagen und Schweizer Umweltrecht', short: 'Umweltrecht', pathOrder: 4, status: 'verfuegbar',
    topics: ['Grundbegriffe des Umweltschutzes', 'Schweizer Umweltgesetzgebung', 'Umweltschutzgesetz (USG)', 'GSchG und Verordnungen', 'Abfallverordnung (VVEA)', 'Luftreinhalte-Verordnung (LRV)', 'Lärmschutz-Verordnung (LSV)', 'Natur- und Heimatschutz', 'Bund, Kanton, Gemeinde', 'Verantwortung der Beteiligten', 'Umweltauflagen und Bewilligungen', 'Vollzug und behördliche Kontrollen'],
  },
  {
    id: 'm2', no: 2, title: 'Gewässerschutz auf Baustellen', short: 'Gewässerschutz', pathOrder: 1, status: 'verfuegbar', deep: true,
    topics: ['Grundlagen und Rechtsrahmen', 'Baustellenentwässerung und SIA 431', 'Betonwaschwasser und alkalisches Wasser', 'Trübstoffe, Sedimentation, Neutralisation', 'Wasserhaltung, Einleitung, Versickerung', 'Grundwasser und Gewässerschutzbereiche', 'Öl- und Treibstoffverluste, Havarien', 'Werkhof und Installationsplatz', 'Entwässerungskonzept', 'Typische Fehler Hoch- und Tiefbau'],
  },
  {
    id: 'm3', no: 3, title: 'Bauabfälle, Rückbau und Kreislaufwirtschaft', short: 'Bauabfälle', pathOrder: 2, status: 'verfuegbar',
    topics: ['Abfallarten und Klassierung', 'VVEA und Vollzugshilfen', 'Entsorgungskonzepte', 'Materialtrennung', 'Mineralische Rückbaumaterialien', 'Recyclingbeton', 'Aushub- und Ausbruchmaterial', 'Belastete Materialien', 'Bauschadstoffe', 'Sonderabfälle', 'Nachweise und Dokumentation', 'Wiederverwendung', 'Kreislaufwirtschaft'],
  },
  {
    id: 'm4', no: 4, title: 'Bodenschutz und Aushub', short: 'Bodenschutz', pathOrder: 3, status: 'verfuegbar',
    topics: ['Bodenfunktionen', 'Ober- und Unterboden', 'Bodenschutzrecht', 'Bodenverdichtung', 'Befahrbarkeit und Bodenfeuchte', 'Bodenabtrag', 'Bodendepots', 'Rekultivierung', 'Erosion', 'Belasteter Boden', 'Bodenschutz in der AVOR', 'Bodenkundliche Baubegleitung', 'Grenzen der eigenen Fachkompetenz'],
  },
  {
    id: 'm5', no: 5, title: 'Luftreinhaltung', short: 'Luft', pathOrder: 9, status: 'in_entwicklung',
    topics: ['Luftschadstoffe', 'Baustellenstaub', 'Staubintensive Arbeiten', 'Maschinenemissionen', 'Anforderungen an Baumaschinen', 'Partikelfilter', 'Staubreduktion', 'Transporte', 'Rückbau und Erdbau', 'Planung und Kontrolle'],
  },
  {
    id: 'm6', no: 6, title: 'Baulärm und Erschütterungen', short: 'Baulärm', pathOrder: 10, status: 'in_entwicklung',
    topics: ['Schall und Lärm', 'BAFU-Baulärm-Richtlinie', 'Massnahmenstufen', 'Lärmschutzkonzepte', 'Lärmarme Verfahren', 'Arbeitszeiten und Auflagen', 'Erschütterungen', 'Beschwerdemanagement', 'Information Anwohnende', 'Baustellenplanung'],
  },
  {
    id: 'm7', no: 7, title: 'Wassergefährdende und umweltgefährliche Stoffe', short: 'Gefahrstoffe', pathOrder: 8, status: 'in_entwicklung',
    topics: ['Treibstoffe und Öle', 'Lagerung und Umschlag', 'Auffangwannen', 'Kennzeichnung', 'Sicherheitsdatenblätter', 'Chemikalien auf Baustellen', 'Havariekonzepte', 'Umweltnotfälle', 'Erste Massnahmen bei Leckagen', 'Alarmierung und Meldestellen', 'Werkhofkontrollen'],
  },
  {
    id: 'm8', no: 8, title: 'Umwelt in Bauplanung und AVOR', short: 'Planung & AVOR', pathOrder: 5, status: 'verfuegbar', deep: true,
    topics: ['Umweltprüfung vor Baustart', 'Bewilligungsauflagen prüfen', 'Ausschreibung und Werkvertrag', 'Umweltmassnahmen in der AVOR', 'Installationsplanung', 'Entwässerung und Lagerflächen', 'Materialbewirtschaftung', 'Transportplanung', 'Lärm- und Staubschutz', 'Umweltmassnahmenplan', 'Zuständigkeiten', 'Kontroll- und Nachweispflichten', 'Zusammenarbeit Bauherrschaft/Planer', 'Kosten- und Terminfolgen'],
  },
  {
    id: 'm9', no: 9, title: 'Umweltbaubegleitung und Baustellenkontrollen', short: 'Baubegleitung', pathOrder: 6, status: 'verfuegbar', deep: true,
    topics: ['Aufgaben der UBB', 'Interne Beratung vs. formelle UBB', 'Kontrollkonzepte', 'Umweltbegehungen', 'Auditchecklisten', 'Feststellungen und Abweichungen', 'Risikobeurteilung', 'Sofortmassnahmen', 'Korrektur- und Vorbeugemassnahmen', 'Kommunikation mit Bauleitung', 'Fotodokumentation', 'Kontrollberichte', 'Nachverfolgung', 'Eskalation'],
  },
  {
    id: 'm10', no: 10, title: 'ISO 14001 und Umweltmanagement', short: 'ISO 14001', pathOrder: 7, status: 'verfuegbar',
    topics: ['Systematik', 'Kontext der Organisation', 'Umweltaspekte', 'Compliance-Verpflichtungen', 'Umweltziele', 'Rollen', 'Risikobasierter Ansatz', 'Interne Audits', 'Korrekturmassnahmen', 'Managementbewertung', 'Kontinuierliche Verbesserung', 'Kennzahlen', 'Grossunternehmen und Niederlassungen', 'Integriertes Managementsystem 9001/14001/45001'],
  },
  {
    id: 'm11', no: 11, title: 'Klima, Ressourcen und Nachhaltigkeit', short: 'Nachhaltigkeit', pathOrder: 11, status: 'in_entwicklung',
    topics: ['Klimawirkung des Bauens', 'CO₂-Emissionen', 'Scope 1, 2, 3', 'THG-Bilanzierung', 'Graue Emissionen', 'Materialkreisläufe', 'Energieeffizienz', 'Nachhaltige Beschaffung', 'Kennzahlen', 'Ressourcenschonende Verfahren', 'Pflicht, Norm oder freiwillig'],
  },
  {
    id: 'm12', no: 12, title: 'Führung und strategische Umweltverantwortung', short: 'Führung', pathOrder: 12, status: 'in_entwicklung',
    topics: ['Umweltorganisation', 'Umweltjahresplan', 'Fachliche Führung', 'Ziele und Kennzahlen', 'Schulungskonzepte', 'Beratung von Führungskräften', 'Managementberichte', 'Entscheidungsvorlagen', 'Wirksamkeitskontrollen', 'Umgang mit Widerstand', 'Unternehmenskultur', 'Umweltrechtskataster', 'Umweltstrategie'],
  },
];

/** Bewertete Kompetenzfelder (für Fortschritt und Wissenslücken) */
export const TOPICS: Topic[] = [
  { id: 'm1-grundlagen', moduleId: 'm1', title: 'Grundbegriffe und Prinzipien' },
  { id: 'm1-rechtsordnung', moduleId: 'm1', title: 'Rechtsordnung Bund – Kanton – Gemeinde' },
  { id: 'm1-verordnungen', moduleId: 'm1', title: 'Verordnungen für Baustellen' },
  { id: 'm1-natur', moduleId: 'm1', title: 'Natur, Landschaft, Wald' },
  { id: 'm1-verantwortung', moduleId: 'm1', title: 'Verantwortung und Haftung' },
  { id: 'm1-vollzug', moduleId: 'm1', title: 'Bewilligungen und Vollzug' },
  { id: 'm3-klassierung', moduleId: 'm3', title: 'Abfallarten, Klassierung, Trennung' },
  { id: 'm3-rueckbau', moduleId: 'm3', title: 'Rückbau und Bauschadstoffe' },
  { id: 'm3-mineralisch', moduleId: 'm3', title: 'Mineralische Rückbaumaterialien und Ausbauasphalt' },
  { id: 'm3-aushub', moduleId: 'm3', title: 'Aushub und belastetes Material' },
  { id: 'm3-kreislauf', moduleId: 'm3', title: 'Nachweise und Kreislaufwirtschaft' },
  { id: 'm4-grundlagen', moduleId: 'm4', title: 'Boden: Funktionen, Aufbau, Recht' },
  { id: 'm4-verdichtung', moduleId: 'm4', title: 'Verdichtung und Befahrbarkeit' },
  { id: 'm4-abtrag', moduleId: 'm4', title: 'Abtrag, Depots, Rekultivierung' },
  { id: 'm4-belastung', moduleId: 'm4', title: 'Belasteter Boden und Verwertung' },
  { id: 'm4-planung', moduleId: 'm4', title: 'Planung, Erosion, Baubegleitung' },
  { id: 'm8-grundlagen', moduleId: 'm8', title: 'Umweltcheck vor Baustart und Auflagen' },
  { id: 'm8-vertrag', moduleId: 'm8', title: 'Ausschreibung und Werkvertrag' },
  { id: 'm8-installation', moduleId: 'm8', title: 'Installation, Logistik, Emissionen' },
  { id: 'm8-massnahmenplan', moduleId: 'm8', title: 'Massnahmenplan, Kontrollen, Nachweise' },
  { id: 'm8-steuerung', moduleId: 'm8', title: 'Kosten, Termine, Zusammenarbeit' },
  { id: 'm9-rolle', moduleId: 'm9', title: 'UBB: Aufgaben, Rollen, Abgrenzung' },
  { id: 'm9-kontrolle', moduleId: 'm9', title: 'Kontrollkonzept und Begehung' },
  { id: 'm9-feststellung', moduleId: 'm9', title: 'Feststellungen, Risiko, Sofortmassnahmen' },
  { id: 'm9-bericht', moduleId: 'm9', title: 'Dokumentation und Kontrollbericht' },
  { id: 'm9-nachverfolgung', moduleId: 'm9', title: 'Korrektur, Nachverfolgung, Eskalation' },
  { id: 'm10-system', moduleId: 'm10', title: 'System, Kontext, Führung' },
  { id: 'm10-planung', moduleId: 'm10', title: 'Umweltaspekte, Verpflichtungen, Ziele' },
  { id: 'm10-betrieb', moduleId: 'm10', title: 'Kompetenz, Betrieb, Notfallvorsorge' },
  { id: 'm10-audit', moduleId: 'm10', title: 'Interne Audits und Zertifizierung' },
  { id: 'm10-verbesserung', moduleId: 'm10', title: 'Kennzahlen, Managementbewertung, integriertes System' },
  { id: 'recht', moduleId: 'm2', title: 'Rechtsrahmen Gewässerschutz' },
  { id: 'entwaesserung', moduleId: 'm2', title: 'Baustellenentwässerung' },
  { id: 'alkalisch', moduleId: 'm2', title: 'Betonwaschwasser / alkalisches Wasser' },
  { id: 'truebstoffe', moduleId: 'm2', title: 'Trübstoffe und Sedimentation' },
  { id: 'wasserhaltung', moduleId: 'm2', title: 'Wasserhaltung und Grundwasser' },
  { id: 'oel', moduleId: 'm2', title: 'Öl, Treibstoff und Installationsplatz' },
  { id: 'havarie', moduleId: 'm2', title: 'Havarien und Sofortmassnahmen' },
  { id: 'konzept', moduleId: 'm2', title: 'Entwässerungskonzept und Kontrolle' },
];

export const LEVEL_LABEL: Record<number, string> = {
  1: 'Stufe 1 – Grundlagen',
  2: 'Stufe 2 – Praktische Anwendung',
  3: 'Stufe 3 – Fortgeschritten',
  4: 'Stufe 4 – Experte',
};

export const LEVEL_SHORT: Record<number, string> = { 1: 'Grundlagen', 2: 'Anwendung', 3: 'Fortgeschritten', 4: 'Experte' };
