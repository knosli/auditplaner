// Datenmodell der Lerninhalte. Inhalte liegen als Daten vor (src/content/**),
// die React-Komponenten stellen sie nur dar. Neue Lektionen, Fragen oder Fälle
// werden durch neue Datensätze ergänzt, ohne Programmänderung.

/** Rechtsnatur einer Anforderung (Auftrag Ziff. 12). */
export type SourceKind =
  | 'gesetz' // gesetzlich verbindlich (Gesetz, Verordnung)
  | 'auflage' // behördliche Auflage (Bewilligung, Verfügung)
  | 'norm' // technische Norm (SIA, SN, ISO)
  | 'vollzugshilfe' // Vollzugshilfe, Merkblatt, Empfehlung
  | 'praxis' // bewährte Praxis
  | 'intern'; // interner Unternehmensstandard

/** Fachlicher Prüfstatus eines Inhalts. */
export type ReviewStatus =
  | 'entwurf' // erstellt, noch nicht gegen Originalquellen geprüft
  | 'quelle_geprueft' // gegen Originalquelle abgeglichen
  | 'freigegeben'; // durch verantwortliche Fachperson freigegeben

export type Level = 1 | 2 | 3 | 4;

export interface Source {
  id: string;
  title: string;
  short: string;
  kind: SourceKind;
  /** Systematische Rechtssammlung, z.B. "SR 814.20" */
  sr?: string;
  /** Erwähnte Artikel – nur, was in der App verwendet wird */
  articles?: string;
  issuer: string;
  url?: string;
  /** Fassung/Ausgabe, soweit bekannt */
  version: string;
  /** Datum der letzten Überprüfung durch einen Menschen; null = nie */
  lastChecked: string | null;
  scope: string;
  cantonal?: string;
  review: ReviewStatus;
  note?: string;
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
}

export interface ModuleMeta {
  id: string;
  no: number;
  title: string;
  short: string;
  /** Reihenfolge im Lernpfad (Phase D) */
  pathOrder: number;
  status: 'verfuegbar' | 'in_entwicklung';
  deep?: boolean;
  topics: string[];
}

/**
 * single: eine richtige Antwort; multi: mehrere richtige;
 * best: Abwägung – mehrere Antworten sind vertretbar, jede hat ein Gewicht
 *       (1 = am besten geeignet, 0.5–0.75 = unter Voraussetzungen vertretbar,
 *       0–0.25 = ungeeignet) und eine Begründung mit Voraussetzungen und Risiken;
 * open: Freitext mit Bewertungsraster.
 */
export type QuestionType = 'single' | 'multi' | 'best' | 'open';

export interface Option {
  id: string;
  text: string;
  /** nur bei 'best' */
  weight?: number;
  /** Sicherheitsveto: umweltgefährdende oder ohne Bewilligung unzulässige Handlung (immer 0 Punkte) */
  critical?: boolean;
  why?: string;
  prerequisites?: string;
  risks?: string;
}

export interface RubricPoint {
  id: string;
  text: string;
  /** Hinweiswörter für die automatische Vorprüfung (nur Hilfsmittel) */
  keywords: string[];
}

export interface Question {
  id: string;
  moduleId: string;
  topic: string;
  level: Level;
  objective: string;
  type: QuestionType;
  prompt: string;
  options?: Option[];
  /** IDs der korrekten Optionen (single/multi) */
  correct?: string[];
  /** Bewertungsraster (open) */
  rubric?: RubricPoint[];
  explanation: string;
  commonErrors: string[];
  sources: string[];
  review: ReviewStatus;
  /** Inhaltsfassung; steigt, wenn Lösung oder Bewertung geändert wurde */
  rev?: number;
}

export interface Card {
  id: string;
  moduleId: string;
  topic: string;
  level: Level;
  front: string;
  back: string;
  sources: string[];
}

export type Step = StepBody & { id: string };

export type StepBody =
  | { kind: 'situation'; title: string; text: string }
  | { kind: 'brief'; title: string; text: string }
  | { kind: 'sitetask'; title: string; taskId: string }
  | { kind: 'quiz'; title: string; questionIds: string[] }
  | { kind: 'explain'; title: string; text: string }
  | { kind: 'diagram'; title: string; diagram: string; caption: string }
  | { kind: 'example'; title: string; context: 'Hochbau' | 'Tiefbau' | 'Hoch- und Tiefbau'; text: string }
  | { kind: 'deep'; title: string; text: string }
  | { kind: 'decision'; title: string; questionId: string }
  | { kind: 'review'; title: string; questionIds: string[] }
  | { kind: 'feynman'; title: string; feynmanId: string }
  | { kind: 'practice'; title: string; taskId: string }
  | { kind: 'summary'; title: string; points: string[] }
  | { kind: 'sources'; title: string; sourceIds: string[]; note?: string };

export interface Lesson {
  id: string;
  moduleId: string;
  level: Level;
  order: number;
  title: string;
  minutes: number;
  topics: string[];
  objectives: string[];
  steps: Step[];
  review: ReviewStatus;
}

/** Praktische Baustellenaufgabe innerhalb einer Lektion (fiktive Projektdaten). */
export interface SiteTask {
  id: string;
  moduleId: string;
  topic: string;
  level: Level;
  setting: 'Hochbau' | 'Tiefbau';
  title: string;
  situation: string;
  data: string[];
  assignment: string;
  rubric: RubricPoint[];
  solution: string;
  sources: string[];
}

export interface FeynmanTask {
  id: string;
  moduleId: string;
  topic: string;
  audience: string;
  prompt: string;
  rubric: RubricPoint[];
}

export interface PracticeTask {
  id: string;
  moduleId: string;
  topic: string;
  title: string;
  goal: string;
  steps: string[];
  deliverable: string;
  /** Kriterien, die bei der Einreichung selbst begründet werden */
  criteria: string[];
  /** Wer die Umsetzung bestätigen kann */
  confirmer: string;
}

// ---------- Baustellensimulator ----------

export type Criterion =
  | 'risiko'
  | 'fachlich'
  | 'prioritaet'
  | 'unsicherheit'
  | 'recht'
  | 'zusammenarbeit'
  | 'begruendung';

export interface ScenarioOption {
  id: string;
  text: string;
  /** 0 = falsch, 1 = teilweise, 2 = gut */
  points: 0 | 1 | 2;
  feedback: string;
  /** Realistische Folge, die angezeigt wird */
  consequence?: string;
  /** Schwerer Fehler mit möglichem Umweltschaden */
  critical?: boolean;
  /** Abweichender nächster Schritt */
  next?: string;
}

export interface ScenarioStage {
  id: string;
  title: string;
  situation: string;
  /**
   * single: eine Wahl; multi: mehrere Wahlen (jede zählt);
   * ask: fehlende Informationen erfragen (Antworten werden aufgedeckt);
   * rank: Massnahmen nach Priorität ordnen; justify: Begründung als Freitext
   */
  type: 'single' | 'multi' | 'ask' | 'rank' | 'justify';
  prompt: string;
  criteria: Criterion[];
  options?: (ScenarioOption & { reveal?: string; relevant?: boolean })[];
  /** rank: IDs in fachlich richtiger Reihenfolge */
  rankOrder?: string[];
  rankItems?: Option[];
  rankExplanation?: string;
  /**
   * Zulässige Teilordnung: Gruppen in fachlicher Reihenfolge; innerhalb einer
   * Gruppe ist jede Reihenfolge richtig (parallele Massnahmen).
   */
  rankGroups?: string[][];
  /** Massnahmen, die spätestens an Position maxPos stehen müssen (sonst kritischer Fehler) */
  rankEarly?: { id: string; maxPos: number; why: string }[];
  rubric?: RubricPoint[];
  /** Max. Anzahl Wahlen bei multi/ask */
  pick?: number;
  next?: string;
}

export interface Scenario {
  id: string;
  code: string;
  moduleId: string;
  title: string;
  setting: 'Hochbau' | 'Tiefbau' | 'Rückbau' | 'AVOR' | 'Management';
  level: Level;
  minutes: number;
  topics: string[];
  intro: string;
  facts: string[];
  stages: ScenarioStage[];
  debrief: string;
  sources: string[];
  status: 'verfuegbar' | 'in_entwicklung';
  rev?: number;
}

// ---------- Bibliothek ----------

export interface GlossaryTerm {
  id: string;
  term: string;
  aliases?: string[];
  definition: string;
  detail?: string;
  kind?: SourceKind;
  related?: string[];
  sources: string[];
  moduleId?: string;
}

export interface LibraryEntry {
  id: string;
  category: 'checkliste' | 'vorlage' | 'matrix' | 'problem' | 'massnahme' | 'recht';
  title: string;
  summary: string;
  /** Kurzer Fliesstext im App-Markup */
  text?: string;
  /** Abhakbare Punkte (Checklisten) */
  items?: { group: string; points: string[] }[];
  /** Tabellen (Matrix, Vorlagen) */
  table?: { head: string[]; rows: string[][] };
  tags: string[];
  sources: string[];
  moduleId?: string;
}
