// Kantonales Quellenregister (21 Kantone mit Deutsch als Amtssprache).
// Grundlage: Quellenregister des Nutzers, Link-Recherche 14.11.2026. Die Einträge sind Quellenhinweise
// auf amtliche Websites und Dokumente – KEINE geprüften kantonalen Pflichten. Prüfstatus aller Einträge:
// «nicht geprüft», bis eine Fundstelle in einer datierten Originalquelle geprüft und eingetragen ist.
import { SOURCES } from './sources';
import type { Source } from './types';

export type CantonLang = 'de' | 'fr' | 'it' | 'rm';
export type CantonTheme = 'allgemein' | 'gewaesser' | 'abfall' | 'boden' | 'luft_laerm' | 'natur' | 'bewilligung' | 'notfall';
export type CantonNature = 'portal' | 'merkblatt' | 'formular' | 'erlass';
export type CantonCheck = 'nicht_geprueft' | 'geprueft';

export interface CantonSource {
  id: string;
  canton: string;
  title: string;
  url: string;
  issuer: string;
  themes: CantonTheme[];
  /** Ausgabe bzw. Stand laut Dokument; null = unbekannt */
  edition: string | null;
  /** Datum der Link-Recherche (nicht der fachlichen Prüfung) */
  retrieved: string;
  nature: CantonNature;
  status: CantonCheck;
  /** Geprüfte Fundstelle (Dokument, Seite/Ziffer, Fassung); nur bei status 'geprueft' */
  checkedRef?: string;
  /** Verantwortliche prüfende Person (optional, nur Funktion) */
  reviewer?: string;
  hint: string;
}

export interface Canton { code: string; name: string; langs: CantonLang[]; office: string; hint: string }

export const CANTONS: Canton[] = [
  { code: "AG", name: "Aargau", langs: ["de"], office: "Departement Bau, Verkehr und Umwelt", hint: "Zusätzlich Abwasser und Bodenschutz am konkreten Standort prüfen" },
  { code: "AI", name: "Appenzell Innerrhoden", langs: ["de"], office: "Amt für Umwelt", hint: "Gemeinsame Merkblätter AR/AI berücksichtigen, Aktualität prüfen" },
  { code: "AR", name: "Appenzell Ausserrhoden", langs: ["de"], office: "Amt für Umwelt", hint: "Unterschiedliche Zuständigkeiten für Gemeinde und Kanton beachten" },
  { code: "BE", name: "Bern", langs: ["de", "fr"], office: "Amt für Wasser und Abfall", hint: "Mehrsprachiger Kanton; kommunale Vorgaben und Planungsauflagen zusätzlich prüfen" },
  { code: "BL", name: "Basel-Landschaft", langs: ["de"], office: "Amt für Umweltschutz und Energie", hint: "Getrennt von Basel-Stadt prüfen" },
  { code: "BS", name: "Basel-Stadt", langs: ["de"], office: "Amt für Umwelt und Energie", hint: "BS-Anforderungen nicht mit BL gleichsetzen" },
  { code: "FR", name: "Freiburg", langs: ["de", "fr"], office: "Amt für Umwelt (AfU / SEn)", hint: "Freiburg ist zweisprachig; französische Originaltexte bei Bedarf abgleichen" },
  { code: "GL", name: "Glarus", langs: ["de"], office: "Kanton Glarus, Bau und Umwelt", hint: "Dieses Dokument betrifft Liegenschaftsentwässerung, nicht alle Baustellenpflichten; spezifische aktuelle Baustellenvorgaben ergänzen" },
  { code: "GR", name: "Graubünden", langs: ["de", "it", "rm"], office: "Amt für Natur und Umwelt (ANU)", hint: "Mehrsprachig; für Bauten ausserhalb Bauzone gelten andere Leitbehörden" },
  { code: "LU", name: "Luzern", langs: ["de"], office: "Dienststelle Umwelt und Energie (uwe)", hint: "Unterseiten zu Bauabfällen und Gewässer separat erfassen" },
  { code: "NW", name: "Nidwalden", langs: ["de"], office: "Amt für Umwelt", hint: "Bewilligung und Gemeindeangaben projektbezogen prüfen" },
  { code: "OW", name: "Obwalden", langs: ["de"], office: "Amt für Landwirtschaft und Umwelt", hint: "Amtliche Umweltfachstelle ergänzen; Formular ist kein allgemeines Gesetz" },
  { code: "SG", name: "St. Gallen", langs: ["de"], office: "Amt für Umwelt (AFU)", hint: "Unter AFU 002 Baustellen-Merkblatt auffindbar" },
  { code: "SH", name: "Schaffhausen", langs: ["de"], office: "Interkantonales Labor (IKL)", hint: "Umweltvollzug beim Interkantonalen Labor; weitere Themen getrennt prüfen" },
  { code: "SO", name: "Solothurn", langs: ["de"], office: "Amt für Umwelt", hint: "Kommunale Baubehörde und kantonale Nebenbewilligungen unterscheiden" },
  { code: "SZ", name: "Schwyz", langs: ["de"], office: "Amt für Gewässer", hint: "PDF-Fassung und elektronisches Bewilligungsverfahren nach Stand prüfen" },
  { code: "TG", name: "Thurgau", langs: ["de"], office: "Amt für Umwelt", hint: "Links zu Rückbau, Entsorgung und Recycling von dieser Seite aus verfolgen" },
  { code: "UR", name: "Uri", langs: ["de"], office: "Amt für Umwelt", hint: "Viele einzelne Themenblätter nach UB-Nummer" },
  { code: "VS", name: "Wallis", langs: ["de", "fr"], office: "Dienststelle für Umwelt (DUW/SEN)", hint: "Deutschsprachige Regionen; kantonale / kommunale Sprache und Bewilligungen beachten" },
  { code: "ZG", name: "Zug", langs: ["de"], office: "Amt für Umwelt", hint: "Zentralschweizer Merkblätter und ZUBI, kantonale Bewilligung prüfen" },
  { code: "ZH", name: "Zürich", langs: ["de"], office: "AWEL / kantonale Fachstellen", hint: "Umfangreiche kantonale Textbausteine, Kontrollen und Merkblätter" },
];

const R = '2026-11-14';
export const CANTON_SOURCES: CantonSource[] = [
  { id: "ag-einstieg", canton: "AG", title: "Bauabfälle, Entsorgungskonzepte, Recycling", url: "https://www.ag.ch/de/themen/umwelt-natur/abfall-rohstoffe/abfallwirtschaft/bauabfaelle", issuer: "Departement Bau, Verkehr und Umwelt", themes: ["abfall"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Zusätzlich Abwasser und Bodenschutz am konkreten Standort prüfen" },
  { id: "ai-einstieg", canton: "AI", title: "Umweltschutz auf Baustellen, Abfall, Wasser, Boden", url: "https://www.ai.ch/organisation/bau-und-umweltdepartement/amt-fuer-umwelt", issuer: "Amt für Umwelt", themes: ["allgemein", "gewaesser", "abfall", "boden"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Gemeinsame Merkblätter AR/AI berücksichtigen, Aktualität prüfen" },
  { id: "ar-einstieg", canton: "AR", title: "Bauen und Umweltschutz, Baustellenkontrollen", url: "https://ar.ch/verwaltung/departement-bau-und-volkswirtschaft/amt-fuer-umwelt/bauen-und-umweltschutz/", issuer: "Amt für Umwelt", themes: ["allgemein", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Unterschiedliche Zuständigkeiten für Gemeinde und Kanton beachten" },
  { id: "be-einstieg", canton: "BE", title: "Bauabfälle, Entsorgung, Bewilligungen", url: "https://www.bvd.be.ch/de/start/themen/abfall.html", issuer: "Amt für Wasser und Abfall", themes: ["abfall", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Mehrsprachiger Kanton; kommunale Vorgaben und Planungsauflagen zusätzlich prüfen" },
  { id: "bl-einstieg", canton: "BL", title: "Bauabfälle, Rückbau und Recycling", url: "https://www.baselland.ch/politik-und-behorden/direktionen/bau-und-umweltschutzdirektion/umweltschutz-energie/abfall/abfaelle-von-gewerbe-und-industrie/bauabfaelle", issuer: "Amt für Umweltschutz und Energie", themes: ["abfall"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Getrennt von Basel-Stadt prüfen" },
  { id: "bs-einstieg", canton: "BS", title: "Baustellenentwässerung, Gewässer, Fassadenreinigung", url: "https://www.bs.ch/wsu/aue/abteilung-gewaesser-und-boden/baustellenentwaesserung-und-fassadenreinigung", issuer: "Amt für Umwelt und Energie", themes: ["gewaesser"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "BS-Anforderungen nicht mit BL gleichsetzen" },
  { id: "fr-einstieg", canton: "FR", title: "Abwasserbewirtschaftung auf der Baustelle", url: "https://www.fr.ch/de/document/217736", issuer: "Amt für Umwelt (AfU / SEn)", themes: ["gewaesser"], edition: null, retrieved: R, nature: "merkblatt", status: 'nicht_geprueft', hint: "Freiburg ist zweisprachig; französische Originaltexte bei Bedarf abgleichen" },
  { id: "gl-einstieg", canton: "GL", title: "Liegenschaftsentwässerung und Umweltvollzug", url: "https://www.gl.ch/public/upload/assets/28935/Vollzugsrichtlinie%20zu%20Zustandserfassung%20und%20Sanierung%20der%20Liegenschaftsentw%C3%A4sserung.pdf", issuer: "Kanton Glarus, Bau und Umwelt", themes: ["gewaesser"], edition: "Erlassen am 1. März 2020 (laut Dokument, Abruf 15.11.2026)", retrieved: R, nature: "merkblatt", status: 'nicht_geprueft', hint: "Dieses Dokument betrifft Liegenschaftsentwässerung, nicht alle Baustellenpflichten; spezifische aktuelle Baustellenvorgaben ergänzen" },
  { id: "gr-einstieg", canton: "GR", title: "Bauen, Natur und Umwelt, Bewilligungsverfahren", url: "https://www.gr.ch/DE/institutionen/verwaltung/ekud/anu/themen/bauen/Seiten/info.aspx", issuer: "Amt für Natur und Umwelt (ANU)", themes: ["allgemein", "natur", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Mehrsprachig; für Bauten ausserhalb Bauzone gelten andere Leitbehörden" },
  { id: "lu-einstieg", canton: "LU", title: "Bauen, Wasser, Abfall, Boden, Lärm, Luft", url: "https://uwe.lu.ch/dienstleistungen/bau_und_umwelt", issuer: "Dienststelle Umwelt und Energie (uwe)", themes: ["allgemein", "gewaesser", "abfall", "boden", "luft_laerm"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Unterseiten zu Bauabfällen und Gewässer separat erfassen" },
  { id: "nw-einstieg", canton: "NW", title: "Bauabfälle, belastete Standorte und VeVA", url: "https://www.nw.ch/umwelt/323", issuer: "Amt für Umwelt", themes: ["abfall"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Bewilligung und Gemeindeangaben projektbezogen prüfen" },
  { id: "ow-einstieg", canton: "OW", title: "Bauen und Grabungen im Grundwasser", url: "https://www.ow.ch/online-schalter/1166/download", issuer: "Amt für Landwirtschaft und Umwelt", themes: ["gewaesser"], edition: "Stand März 2025 (laut Dokument, Abruf 15.11.2026)", retrieved: R, nature: "formular", status: 'nicht_geprueft', hint: "Amtliche Umweltfachstelle ergänzen; Formular ist kein allgemeines Gesetz" },
  { id: "sg-einstieg", canton: "SG", title: "Publikationen: Umweltschutz auf Baustellen", url: "https://www.sg.ch/umwelt-natur/umwelt/publikationen---umwelt.html", issuer: "Amt für Umwelt (AFU)", themes: ["allgemein"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Unter AFU 002 Baustellen-Merkblatt auffindbar" },
  { id: "sh-einstieg", canton: "SH", title: "Recyclingbaustoffe und Umweltvollzug", url: "https://sh.ch/CMS/get/file/61d09db4-3c76-40cb-a8db-d6c9bc919c07", issuer: "Interkantonales Labor (IKL)", themes: ["abfall"], edition: "Stand Mai 2025 (laut Dokument, Abruf 15.11.2026)", retrieved: R, nature: "merkblatt", status: 'nicht_geprueft', hint: "Umweltvollzug beim Interkantonalen Labor; weitere Themen getrennt prüfen" },
  { id: "so-einstieg", canton: "SO", title: "Umweltschutz beim Bauen, Bewilligungen", url: "https://so.ch/verwaltung/bau-und-justizdepartement/amt-fuer-umwelt/umweltschutz-beim-bauen/", issuer: "Amt für Umwelt", themes: ["allgemein", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Kommunale Baubehörde und kantonale Nebenbewilligungen unterscheiden" },
  { id: "sz-einstieg", canton: "SZ", title: "Baustellenentwässerung, Gewässerschutz", url: "https://www.sz.ch/public/upload/assets/58130/Merkblatt_Gewaesserschutz_auf_Baustellen.pdf", issuer: "Amt für Gewässer", themes: ["gewaesser"], edition: "Juni 2024 (laut Dokument, Abruf 15.11.2026)", retrieved: R, nature: "merkblatt", status: 'nicht_geprueft', hint: "PDF-Fassung und elektronisches Bewilligungsverfahren nach Stand prüfen" },
  { id: "tg-einstieg", canton: "TG", title: "Bauabfälle, Erdarbeiten, Umweltschutz auf Baustellen", url: "https://umwelt.tg.ch/abfall-und-boden/abfall/informationen.html/12415", issuer: "Amt für Umwelt", themes: ["allgemein", "abfall", "boden"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Links zu Rückbau, Entsorgung und Recycling von dieser Seite aus verfolgen" },
  { id: "ur-einstieg", canton: "UR", title: "Umweltschutz beim Bauen; Grundwasser, Wasser, Aushub", url: "https://www.ur.ch/dienstleistungen/4799", issuer: "Amt für Umwelt", themes: ["allgemein", "gewaesser", "abfall"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Viele einzelne Themenblätter nach UB-Nummer" },
  { id: "vs-einstieg", canton: "VS", title: "Bauen im Grundwasser, Bewilligungen", url: "https://www.vs.ch/de/web/sen/informationen-fur-den-gesuchsteller", issuer: "Dienststelle für Umwelt (DUW/SEN)", themes: ["gewaesser", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Deutschsprachige Regionen; kantonale / kommunale Sprache und Bewilligungen beachten" },
  { id: "zg-einstieg", canton: "ZG", title: "Umweltschutz auf Baustellen, ZUBI", url: "https://zg.ch/de/planen-bauen/baubewilligung/umweltschutz-auf-baustellen", issuer: "Amt für Umwelt", themes: ["allgemein"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Zentralschweizer Merkblätter und ZUBI, kantonale Bewilligung prüfen" },
  { id: "zh-einstieg", canton: "ZH", title: "Umweltschutz auf Baustellen und Entwässerung", url: "https://www.zh.ch/de/planen-bauen/baubewilligung/umweltschutz-auf-baustellen.html", issuer: "AWEL / kantonale Fachstellen", themes: ["allgemein", "gewaesser"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Umfangreiche kantonale Textbausteine, Kontrollen und Merkblätter" },
  // Zusatzquellen (Quellenregister, Datei «Zusatzquellen»)
  { id: "zh-entwaesserung", canton: "ZH", title: "Baustellenentwässerung", url: "https://www.zh.ch/de/planen-bauen/baubewilligung/umweltschutz-auf-baustellen/baustellenentwaesserung.html", issuer: "AWEL / kantonale Fachstellen", themes: ["gewaesser"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Aktuelle Baustellenentwässerung und Merkblätter" },
  { id: "lu-gewaesser", canton: "LU", title: "Gewässer und Bau", url: "https://uwe.lu.ch/dienstleistungen/bau_und_umwelt/bau_Gewaesser", issuer: "Dienststelle Umwelt und Energie (uwe)", themes: ["gewaesser", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Gewässerschutzplanung, Gesuche" },
  { id: "lu-bauabfall", canton: "LU", title: "Bauabfälle", url: "https://uwe.lu.ch/dienstleistungen/bau_und_umwelt/bau_abfall", issuer: "Dienststelle Umwelt und Energie (uwe)", themes: ["abfall"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Entsorgungserklärung, Rückbau" },
  { id: "be-entsorgungskonzept", canton: "BE", title: "Leitfaden Erstellung Entsorgungskonzept", url: "https://www.bvd.be.ch/content/dam/bvd/dokumente/de/awa/umwelt/abfall/Leitfaden_Erstellung_Entsorgungskonzept_Version_2021_d.pdf", issuer: "Amt für Wasser und Abfall", themes: ["abfall"], edition: "Merkblatt vom 1. Januar 2021 (laut Dokument, Abruf 15.11.2026) – ob neuere Fassung besteht, nicht geprüft", retrieved: R, nature: "merkblatt", status: 'nicht_geprueft', hint: "Datum 2021, Aktualität prüfen" },
  { id: "vs-gewaesserschaeden", canton: "VS", title: "Gewässerverschmutzung – was tun?", url: "https://www.vs.ch/de/web/sen/gewasserverschmutzung-was-tun", issuer: "Dienststelle für Umwelt (DUW/SEN)", themes: ["gewaesser", "notfall"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Melde- und Ereignisverfahren" },
  { id: "nw-usv", canton: "NW", title: "Kantonale Umweltschutzverordnung", url: "https://gesetze.nw.ch/api/de/versions/932/pdf_file", issuer: "Kanton Nidwalden", themes: ["allgemein"], edition: "Vom 12. Juli 2005, Stand 1. November 2020 (laut abgerufenem PDF, 15.11.2026) – ob dies die geltende Fassung ist, nicht geprüft", retrieved: R, nature: "erlass", status: 'nicht_geprueft', hint: "Historischer Dokumentstand: nicht ohne Datumsprüfung verwenden" },
  { id: "ar-gemeindekontrolle", canton: "AR", title: "Baustellenkontrolle durch Gemeinden", url: "https://ar.ch/verwaltung/departement-bau-und-volkswirtschaft/amt-fuer-umwelt/bauen-und-umweltschutz/baustellenkontrolle-gemeinden/", issuer: "Amt für Umwelt", themes: ["allgemein", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Rollen im Vollzug" },
  { id: "ai-merkblatt", canton: "AI", title: "Gemeinsames Merkblatt AR/AI «Umweltschutz auf der Baustelle»", url: "https://www.ai.ch/themen/planen-und-bauen/umweltschutz-auf-baustellen-bauabfaelle/merkblaetter", issuer: "Amt für Umwelt", themes: ["allgemein", "gewaesser", "abfall"], edition: "2019 (laut Quellenregister) – Aktualität prüfen", retrieved: R, nature: "merkblatt", status: 'nicht_geprueft', hint: "Merkblatt 2019: auf Aktualität prüfen" },
  { id: "sz-wasserentnahme", canton: "SZ", title: "Temporäre Wasserentnahmen", url: "https://www.sz.ch/verwaltung/umweltdepartement/amt-fuer-gewaesser/wassernutzung/brauchwassernutzung.html/8756-8758-8802-9447-9450-10726-12291", issuer: "Amt für Gewässer", themes: ["gewaesser", "bewilligung"], edition: null, retrieved: R, nature: "portal", status: 'nicht_geprueft', hint: "Bewilligung temporärer Wasserentnahmen" },
];

/** Ergebnis der automatisierten Linkprüfung – getrennt vom fachlichen Prüfstatus (status). */
export type LinkStatus = 'erreichbar' | 'umgeleitet' | 'ersetzt' | 'nicht_pruefbar';
export interface LinkCheck { status: LinkStatus; checked: string; note?: string }
export const LINK_STATUS_LABEL: Record<LinkStatus, string> = {
  erreichbar: 'Link erreichbar',
  umgeleitet: 'Link erreichbar (umgeleitet)',
  ersetzt: 'Link ersetzt',
  nicht_pruefbar: 'Link nicht automatisch prüfbar',
};
const LC = '15.11.2026';
const ok: LinkCheck = { status: 'erreichbar', checked: LC };
/**
 * Automatisierte Linkprüfung vom 15.11.2026 (HTTP-Abruf, Seitentitel bzw. PDF-Titelseite verglichen).
 * Sagt nur, dass die Seite/das Dokument erreichbar ist und zum Titel passt – nicht, dass der Inhalt
 * fachlich geprüft oder aktuell ist.
 */
export const LINK_CHECKS: Record<string, LinkCheck> = {
  'ag-einstieg': ok, 'ar-einstieg': ok, 'be-einstieg': ok, 'bs-einstieg': ok, 'gl-einstieg': ok, 'gr-einstieg': ok,
  'lu-einstieg': ok, 'nw-einstieg': ok, 'sg-einstieg': ok, 'sh-einstieg': ok, 'so-einstieg': ok, 'sz-einstieg': ok,
  'tg-einstieg': ok, 'ur-einstieg': ok, 'vs-einstieg': ok, 'zg-einstieg': ok, 'zh-einstieg': ok, 'zh-entwaesserung': ok,
  'lu-gewaesser': ok, 'lu-bauabfall': ok, 'be-entsorgungskonzept': ok, 'vs-gewaesserschaeden': ok, 'nw-usv': ok,
  'ar-gemeindekontrolle': ok, 'sz-wasserentnahme': ok,
  'fr-einstieg': { status: 'umgeleitet', checked: LC, note: 'Leitet auf das PDF «Abwasserbewirtschaftung auf der Baustelle – Vollzugshilfe» weiter; im Dokument kein Stand angegeben.' },
  'ow-einstieg': { status: 'umgeleitet', checked: LC, note: 'Leitet auf das PDF «Gesuch um eine gewässerschutzrechtliche Bewilligung … im Grundwasser» weiter.' },
  'ai-einstieg': { status: 'ersetzt', checked: LC, note: 'Alte Adresse leitete um; durch die neue Adresse der Fachstelle ersetzt.' },
  'ai-merkblatt': { status: 'ersetzt', checked: LC, note: 'Bisheriger PDF-Link lieferte «nicht gefunden» (404). Ersetzt durch die Merkblatt-Seite des Kantons, auf der das Merkblatt «Umweltschutz auf der Baustelle» aktuell angeboten wird.' },
  'bl-einstieg': { status: 'nicht_pruefbar', checked: LC, note: 'Die Website blockiert automatische Abrufe (Browser-Prüfung). Bitte im Browser öffnen und prüfen.' },
};
export const linkCheck = (id: string): LinkCheck | undefined => LINK_CHECKS[id];

export const THEME_LABEL: Record<CantonTheme, string> = {
  allgemein: 'Umweltschutz auf Baustellen (allgemein)',
  gewaesser: 'Gewässerschutz und Baustellenentwässerung',
  abfall: 'Bauabfälle, Entsorgungskonzept, Schadstoffe',
  boden: 'Bodenschutz und Aushub',
  luft_laerm: 'Luft und Lärm',
  natur: 'Natur, Wald, Gewässerraum',
  bewilligung: 'Bewilligungen und Zuständigkeiten',
  notfall: 'Havarie und Meldung',
};

export const NATURE_LABEL: Record<CantonNature, string> = {
  portal: 'Amtliches Fachportal (Einstieg, keine Rechtsgrundlage)',
  merkblatt: 'Amtliches Merkblatt bzw. Vollzugshilfe',
  formular: 'Amtliches Formular',
  erlass: 'Kantonaler Erlass',
};

export const LANG_LABEL: Record<CantonLang, string> = { de: 'Deutsch', fr: 'Französisch', it: 'Italienisch', rm: 'Rätoromanisch' };

/** Themen des Projektchecks (Reihenfolge der Anzeige). */
export const CHECK_THEMES: CantonTheme[] = ['gewaesser', 'abfall', 'boden', 'luft_laerm', 'natur', 'bewilligung', 'notfall'];

/** Schweizer Grundlagen je Thema (Bundesrecht, Bundes-Vollzugshilfen, Normen) – aus dem Quellenverzeichnis der App. */
export const FEDERAL_BY_THEME: Record<CantonTheme, string[]> = {
  allgemein: ['usg', 'gschg', 'vvea'],
  gewaesser: ['gschg', 'gschv', 'ikm-vsa', 'sia431'],
  abfall: ['vvea', 'veva', 'bafu-bauabfaelle'],
  boden: ['vbbo', 'bafu-boden-bauen'],
  luft_laerm: ['lrv', 'bafu-luft', 'lsv', 'bafu-baulaerm'],
  natur: ['nhg', 'wag'],
  bewilligung: ['rpg', 'uvpv'],
  notfall: ['gschg', 'notruf'],
};

/** Welche Themen in welchem Modul «Vor Ort» zu prüfen sind. */
export const MODULE_THEMES: Record<string, CantonTheme[]> = {
  m0: ['allgemein'],
  m1: ['allgemein', 'bewilligung'],
  m2: ['gewaesser', 'notfall'],
  m3: ['abfall'],
  m4: ['boden', 'abfall'],
  m5: ['luft_laerm'],
  m6: ['luft_laerm'],
  m7: ['gewaesser', 'notfall'],
  m8: ['allgemein', 'gewaesser', 'abfall', 'boden', 'luft_laerm', 'natur', 'bewilligung'],
  m9: ['allgemein', 'gewaesser', 'abfall', 'boden', 'luft_laerm', 'notfall'],
  m10: ['allgemein'],
  m11: ['abfall'],
  m12: ['allgemein', 'notfall'],
};

export const cantonOf = (code?: string) => CANTONS.find((c) => c.code === code);
export const cantonSources = (code?: string) => CANTON_SOURCES.filter((x) => x.canton === code);
export const isMultilingual = (code?: string) => (cantonOf(code)?.langs.length ?? 0) > 1;
const federal = (ids: string[]) => ids.map((id) => SOURCES.find((s) => s.id === id)).filter((s): s is Source => !!s);

export type CheckStatus = 'geprueft' | 'quelle_nicht_geprueft' | 'nicht_verifiziert';
export interface CheckRow {
  theme: CantonTheme;
  label: string;
  federal: Source[];
  cantonal: CantonSource[];
  /** Allgemeine Einstiegsquellen des Kantons, wenn zum Thema nichts Spezifisches vorliegt */
  entry: CantonSource[];
  status: CheckStatus;
  message: string;
}

/**
 * Projektcheck für eine Baustelle im Kanton (und optional in einer Gemeinde).
 * Liefert je Thema die Schweizer Grundlagen und – getrennt davon – die kantonalen
 * Quellen. Wo nur Bundesrecht vorliegt, lautet das Ergebnis «kantonale Regelung
 * nicht verifiziert». Nie werden Pflichten aus einer Quelle abgeleitet, deren
 * Fundstelle nicht geprüft ist.
 */
export function projectCheck(code: string | undefined, themes: CantonTheme[] = CHECK_THEMES, municipality?: string): CheckRow[] {
  const all = cantonSources(code);
  const entry = all.filter((x) => x.themes.includes('allgemein'));
  const muni = municipality?.trim();
  const tail = muni ? ` Kommunale Vorgaben der Gemeinde ${muni} (Reglemente, Bewilligung, Auflagen) sind nicht im Register – bei der Gemeinde prüfen.` : ' Kommunale Vorgaben (Reglemente, Bewilligung, Auflagen) sind nicht im Register – bei der Standortgemeinde prüfen.';
  return themes.map((theme) => {
    const cantonal = all.filter((x) => x.themes.includes(theme));
    const checked = cantonal.filter((x) => x.status === 'geprueft' && x.checkedRef);
    const status: CheckStatus = !code || cantonal.length === 0 ? 'nicht_verifiziert' : checked.length ? 'geprueft' : 'quelle_nicht_geprueft';
    const message = !code
      ? 'Kein Kanton gewählt – nur Schweizer Grundlagen.'
      : status === 'nicht_verifiziert'
        ? `Kantonale Regelung nicht verifiziert – zu diesem Thema ist für ${code} keine amtliche Quelle im Register; es liegt nur Bundesrecht vor. Bei der kantonalen Fachstelle nachfragen.${tail}`
        : status === 'quelle_nicht_geprueft'
          ? `Amtliche Quelle gefunden, Pflichten daraus nicht geprüft – nicht als gesicherte Vorgabe verwenden; aktuelle Fassung lesen.${tail}`
          : `Fundstelle geprüft: ${checked.map((x) => x.checkedRef).join('; ')}.${tail}`;
    return { theme, label: THEME_LABEL[theme], federal: federal(FEDERAL_BY_THEME[theme]), cantonal, entry: cantonal.length ? [] : entry, status, message };
  });
}
