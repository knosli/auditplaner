import { GLOSSARY, LESSONS, LIBRARY, QUESTIONS, TOPICS } from '../content';
import type { RubricPoint } from '../content/types';
import type { Settings } from './state';

// Anweisungen für den KI-Lerncoach. Die KI erhält nur, was hier steht –
// keine Projektdaten, ausser die lernende Person schreibt sie selbst hinein.

const PROFILE = 'Die lernende Person arbeitet in einer Deutschschweizer Baufirma (Hoch- und Tiefbau, ISO-14001-zertifiziert) als Beauftragte für Arbeitssicherheit, Qualität und Umweltschutz. Ausbildung: Maurer, eidg. dipl. Bau-Polier, eidg. dipl. Spezialist Arbeitssicherheit. Ziel: leitende Umweltbeauftragte werden. Bauliche Grundlagen sind bekannt; Umweltfachwissen wird aufgebaut.';

const RULES = `Regeln für deine Antworten:
- Schreibe auf Deutsch in Schweizer Rechtschreibung (kein ß, «» als Anführungszeichen) und mit Schweizer Fachbegriffen.
- Erfinde keine Gesetzesartikel, Norminhalte, Grenzwerte oder Pflichten. Wenn du einen Artikel oder Wert nicht sicher weisst, sag das ausdrücklich und verweise auf die Originalquelle (Fedlex, BAFU, kantonale Fachstelle, SIA).
- Unterscheide ausdrücklich: Gesetz/Verordnung, behördliche Auflage, technische Norm, Vollzugshilfe/Empfehlung, bewährte Praxis, interner Standard.
- Weise darauf hin, dass Kantone, Gemeinden und Bewilligungen zusätzliche Anforderungen stellen können. Bei kritischen Umweltentscheiden: aktuelle Vorgaben prüfen und Fachpersonen beiziehen.
- Gib keine vollständigen Zitate kostenpflichtiger Normen wieder.
- Verharmlose Umweltschäden nicht.
- Antworte kompakt (meist unter 220 Wörtern), mit kurzen Absätzen oder Aufzählungen. Kein Markdown ausser **fett** und Listen mit «- ».`;

const MODE: Record<Settings['coachMode'], string> = {
  erklaeren: 'Modus ERKLÄREN: Gib direkte, fachlich fundierte Antworten. Nenne am Ende die Art der Quelle (z. B. «GSchG, sinngemäss» oder «bewährte Praxis») und ob sie geprüft werden sollte.',
  trainieren: 'Modus TRAINIEREN: Gib KEINE Musterlösung. Stelle eine gezielte Rückfrage oder gib einen Hinweis, der die Person selbst zur Lösung führt. Erst wenn sie zweimal danebenliegt, darfst du einen deutlicheren Hinweis geben. Prüfe ihre Antworten kritisch und benenne fehlende Punkte.',
  pruefen: 'Modus PRÜFEN: Du bist Prüfer in einem mündlichen Fachgespräch. Stelle eine Frage nach der anderen, gib während der Prüfung keine Hilfe und keine Lösungen. Erst wenn die Person «Auswertung» schreibt, bewerte jede Antwort (fachlich richtig, vollständig, begründet) und gib Empfehlungen zur Wiederholung.',
};

export function coachInstructions(mode: Settings['coachMode'], weakTopics: string[], context?: string): string {
  return [
    'Du bist ein Lerncoach für betrieblichen Umweltschutz auf Schweizer Baustellen in der Lern-App «UmweltCampus Bau CH».',
    PROFILE,
    MODE[mode],
    RULES,
    weakTopics.length ? `Bekannte Schwächen der Person (berücksichtige sie, wo passend): ${weakTopics.join(', ')}.` : '',
    context ? `Aktueller Lernkontext:\n${context}` : '',
  ].filter(Boolean).join('\n\n');
}

export function feedbackPrompt(task: string, audience: string | undefined, rubric: RubricPoint[], answer: string): string {
  return `${coachInstructions('erklaeren', [])}

Aufgabe: Bewerte die folgende Antwort einer lernenden Person. Sei ehrlich und konkret.
${audience ? `Zielpublikum der Erklärung: ${audience}.` : ''}
Aufgabenstellung: ${task}
Bewertungsraster:
${rubric.map((r) => `- ${r.text}`).join('\n')}

Antwort der Person:
"""
${answer.slice(0, 4000)}
"""

Gib zurück:
1. **Verständlichkeit** (1–2 Sätze)
2. **Fachliche Richtigkeit** (Fehler klar benennen)
3. **Fehlende Punkte** (gemäss Raster)
4. **Ein Verbesserungsvorschlag** (ein konkreter Satz, den die Person ergänzen könnte)`;
}

export function generateQuestionPrompt(topicTitle: string, level: number): string {
  return `${coachInstructions('erklaeren', [])}

Erstelle EINE neue Übungsfrage (Single Choice, 4 Antworten, genau eine richtig) zum Thema «${topicTitle}» im Bereich Gewässerschutz auf Schweizer Baustellen, Schwierigkeitsstufe ${level} von 4 (1 Grundlagen, 2 Anwendung, 3 Fortgeschritten, 4 Experte). Bevorzuge eine konkrete Baustellensituation. Keine erfundenen Artikelnummern oder Grenzwerte.
Antworte nur mit JSON in dieser Form:
{"prompt":"…","options":["…","…","…","…"],"correct":0,"explanation":"…","source":"Art der Quelle, z. B. GSchG sinngemäss / bewährte Praxis"}`;
}

/** Offline-Coach: regelbasierte Suche in den vorbereiteten Inhalten. */
export interface OfflineHit { kind: 'Begriff' | 'Bibliothek' | 'Lektion' | 'Frage'; title: string; text: string; href?: string; termId?: string }

const words = (t: string) => t.toLowerCase().replace(/ß/g, 'ss').split(/[^a-zäöüéèà0-9]+/).filter((w) => w.length > 2);
const STOP = new Set(['der', 'die', 'das', 'und', 'oder', 'wie', 'was', 'wer', 'wann', 'warum', 'ist', 'sind', 'ein', 'eine', 'einen', 'mit', 'für', 'auf', 'bei', 'den', 'dem', 'des', 'darf', 'muss', 'kann', 'ich', 'man', 'wir', 'nicht', 'auch', 'von', 'zum', 'zur', 'baustelle']);

export function offlineSearch(query: string, limit = 6): OfflineHit[] {
  const q = words(query).filter((w) => !STOP.has(w));
  if (!q.length) return [];
  const score = (hay: string) => {
    const h = hay.toLowerCase().replace(/ß/g, 'ss');
    return q.reduce((x, w) => x + (h.includes(w) ? 1 : h.includes(w.slice(0, Math.max(4, w.length - 2))) ? 0.5 : 0), 0);
  };
  const hits: (OfflineHit & { sc: number })[] = [];
  for (const g of GLOSSARY) hits.push({ kind: 'Begriff', title: g.term, text: g.definition, termId: g.id, sc: score(g.term + ' ' + (g.aliases ?? []).join(' ')) * 2 + score(g.definition) });
  for (const e of LIBRARY) hits.push({ kind: 'Bibliothek', title: e.title, text: e.summary, href: '#bibliothek', sc: score(e.title + ' ' + e.tags.join(' ')) * 1.5 + score(e.summary) });
  for (const l of LESSONS) hits.push({ kind: 'Lektion', title: l.title, text: l.objectives.join(' · '), href: '#lektion-' + l.id, sc: score(l.title + ' ' + l.objectives.join(' ')) });
  return hits.filter((h) => h.sc >= 1).sort((a, b) => b.sc - a.sc).slice(0, limit);
}

/** Vorbereitete Leitfragen pro Thema (Trainieren ohne KI). */
export const GUIDING: Record<string, string[]> = {
  recht: ['Welche drei Pflichten aus dem GSchG betreffen die Situation?', 'Ist die Anforderung Gesetz, Auflage, Norm, Vollzugshilfe oder Praxis?', 'Welche Stelle ist zuständig: Bund, Kanton oder Gemeinde?'],
  entwaesserung: ['Welche Abwasserart liegt vor – und ist sie verschmutzt?', 'Wohin führt der Schacht laut Kataster?', 'Wie lässt sich die Menge verschmutzten Wassers verringern?'],
  alkalisch: ['Welcher pH-Wert ist zu erwarten?', 'Was muss vor der Neutralisation geschehen?', 'Wohin darf das behandelte Wasser – mit welcher Zustimmung?'],
  truebstoffe: ['Welche Korngrösse dominiert – und setzt sie sich ab?', 'Was passiert bei Starkregen mit der Anlage?', 'Woran erkennt der Polier «zu trüb»?'],
  wasserhaltung: ['Braucht der Eingriff ins Grundwasser eine Bewilligung?', 'Welche Qualität verlangt die Bewilligung am Auslauf?', 'Liegt die Baustelle im Au oder in einer Schutzzone?'],
  oel: ['Ist der Platz dicht und frei von Meteorschächten?', 'Ist der Rückhalt (Wanne) leer und vor Regen geschützt?', 'Liegt Notfallmaterial griffbereit?'],
  havarie: ['Ist die eigene Sicherheit gewährleistet?', 'Wurde gleichzeitig mit dem Eindämmen sofort alarmiert (118/117)?', 'Ist die Verbindung zu Schacht und Gewässer unterbrochen?'],
  konzept: ['Beantwortet das Konzept alle sechs Leitfragen?', 'Sind Zuständigkeiten und Kontrollen festgelegt?', 'Was ist Pflicht, was Empfehlung – und was kostet die Alternative?'],
};

export function topicTitle(id: string) {
  return TOPICS.find((t) => t.id === id)?.title ?? id;
}

export const QUESTION_COUNT = QUESTIONS.length;
