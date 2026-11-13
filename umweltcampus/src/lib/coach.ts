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

Erstelle EINE neue Übungsfrage (Single Choice, 4 Antworten, genau eine richtig) zum Thema «${topicTitle}» im betrieblichen Umweltschutz auf Schweizer Baustellen, Schwierigkeitsstufe ${level} von 4 (1 Grundlagen, 2 Anwendung, 3 Fortgeschritten, 4 Experte). Bevorzuge eine konkrete Baustellensituation. Keine erfundenen Artikelnummern oder Grenzwerte.
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
  'm1-grundlagen': ['Ist das eine Emission (Quelle) oder eine Immission (Betroffene)?', 'Welche Massnahme an der Quelle ist technisch möglich und wirtschaftlich tragbar?', 'Gibt es einen Grenzwert – oder eine Richtlinie mit Massnahmenstufe?'],
  'm1-rechtsordnung': ['Ist das Gesetz, Verordnung, Auflage, Vollzugshilfe, Norm oder interner Standard?', 'Wer ist zuständig: Bund, Kanton oder Gemeinde?', 'Welche Fassung gilt, und wo steht sie?'],
  'm1-verordnungen': ['Welche Massnahmenstufe für Luft und Lärm ist angeordnet?', 'Haben alle Maschinen über 18 kW einen Nachweis – auch beim Subunternehmer?', 'Braucht es ein Entsorgungskonzept (über 200 m³ oder Bauschadstoffe)?'],
  'm1-natur': ['Ist die Vegetation am Ufer, im Wald, in einer Hecke oder einem Inventarobjekt?', 'Gibt es eine Alternative ohne Eingriff?', 'Welches Zeitfenster gilt (Brutzeit, Schonzeit)?'],
  'm1-verantwortung': ['Geht es um Kosten, Strafe oder Schadenersatz?', 'Wer hat ausgewählt, instruiert, ausgerüstet, kontrolliert?', 'Ist es dokumentiert?'],
  'm1-vollzug': ['Wer ist Adressat der Auflage?', 'Ist die Bewilligung rechtskräftig – und widersprechen sich Auflagen?', 'Wie belegen Sie die Umsetzung bei einer Kontrolle?'],
  'm3-klassierung': ['Ist es Sonderabfall, kontrollpflichtig oder übriger Abfall?', 'Kann auf der Baustelle getrennt werden – wenn nicht, warum genau nicht?', 'Welcher Nachweis gehört zur Übergabe?'],
  'm3-rueckbau': ['Was sagt der Schadstoffbericht – und welche Bereiche wurden nicht untersucht?', 'Wer darf die Sanierung ausführen, und ist sie gemeldet?', 'Was passiert bei einem unerwarteten Fund?'],
  'm3-mineralisch': ['Liegt eine Analyse vor (z. B. PAK im Belag)?', 'Ist das Material sortenrein und schadstofffrei?', 'Wo darf das Recyclingmaterial eingesetzt werden?'],
  'm3-aushub': ['Gibt es Hinweise auf Belastung (Kataster, Nutzung, Geruch, Fremdstoffe)?', 'Wo lagern Sie verdächtiges Material bis zur Klärung?', 'Wer beurteilt und stuft ein?'],
  'm3-kreislauf': ['Liegen alle Nachweise vor?', 'Was zeigt die Bilanz gegenüber dem Konzept?', 'Welche Kennzahl würde wirklich eine Entscheidung verändern?'],
  'm4-grundlagen': ['Welche Bodenschichten sind betroffen – und wie mächtig sind sie?', 'Welche Auflagen zum Boden stehen in der Bewilligung?', 'Wird der Boden wiederverwendet oder verwertet?'],
  'm4-verdichtung': ['Wie nass ist der Boden – wer hat das wie gemessen?', 'Wo fahren Lastwagen und schwere Maschinen?', 'Welche Arbeiten sind ohne Bodeneingriff möglich?'],
  'm4-abtrag': ['Sind Ober- und Unterboden getrennt?', 'Ist das Depot locker, niedrig, begrünt und geschützt?', 'Wann und wie wird rekultiviert – und wer bewirtschaftet danach?'],
  'm4-belastung': ['Liegt die Fläche in einem Prüfperimeter oder auf einem Kataster-Standort?', 'Was zeigt die Analyse – und welche Nutzung ist geplant?', 'Wer stuft den Boden ein?'],
  'm4-planung': ['Sind Pisten, Depots und Schutzflächen im Installationsplan?', 'Regelt der Vertrag Regentage?', 'Wer gibt frei – und was ist Ihre Rolle, was die der Fachperson?'],
  'm8-grundlagen': ['Haben Sie alle Auflagen gelesen – auch Verweise und Nebenbewilligungen?', 'Was zeigen Gewässerschutzkarte, Kataster und Kanalisationskataster?', 'Welche Lücke müssen Sie vor Baustart schriftlich melden?'],
  'm8-vertrag': ['Gilt die Anforderung, auch wenn sie nicht im LV steht?', 'Ist das eine Pflicht-, eine Vertrags- oder eine Kostenfrage?', 'Wissen die Subunternehmer, was Sie zugesagt haben?'],
  'm8-installation': ['Was kann wo austreten – und wohin gelangt es?', 'Wohin führt der nächste Schacht?', 'Stimmt der Plan auch für die nächste Bauphase?'],
  'm8-massnahmenplan': ['Hat jede Anforderung eine Massnahme, eine Funktion, einen Termin, eine Kontrolle und einen Nachweis?', 'Welche Vorlaufzeiten fehlen im Terminplan?', 'Welche Nachweise sind Pflicht, welche nur nützlich?'],
  'm8-steuerung': ['Ist das Pflicht, Vereinbarung oder Empfehlung?', 'Was kostet die Alternative ohne Massnahme?', 'Welche Projektänderung hat Umweltfolgen, die noch niemand geprüft hat?'],
  'm9-rolle': ['Für wen arbeitet diese Person – Bauherrschaft, Unternehmung oder Behörde?', 'Woraus ergibt sich ihre Befugnis (Bewilligung, Pflichtenheft, Vertrag)?', 'Was ist Ihre eigene Rolle – und was nicht?'],
  'm9-kontrolle': ['Wo würde ein Fehler heute am schnellsten und schwersten schaden?', 'Ist die Massnahme vorhanden, angewendet und wirksam?', 'Was haben Sie nicht angeschaut?'],
  'm9-feststellung': ['Was genau haben Sie beobachtet – und was ist Vermutung?', 'Droht ein Schaden unmittelbar oder fehlt eine zwingende Freigabe?', 'Was muss jetzt sofort geschehen, und wen holen Sie?'],
  'm9-bericht': ['Könnten Sie jeden Satz in zwei Jahren vor Dritten vertreten?', 'Steht bei jeder Feststellung, wer was bis wann tut?', 'Sind Personen auf den Fotos nötig?'],
  'm9-nachverfolgung': ['Ist das die Ursache oder nur das Symptom?', 'Woran erkennen Sie, dass die Massnahme wirkt?', 'Wer kann das entscheiden – und haben Sie die Eskalation angekündigt?'],
  'm10-system': ['Geht es um das System oder um den Zustand einer einzelnen Baustelle?', 'Wer trägt hier die Verantwortung – Leitung, Linie oder Fachstelle?', 'Kommt das, was im System steht, auf der Baustelle an?'],
  'm10-planung': ['Ist das ein Aspekt oder eine Auswirkung?', 'Welche Verpflichtung gilt – und auf welcher Ebene (Unternehmen, Standort, Projekt)?', 'Wer muss wegen dieses Ziels was anders machen?'],
  'm10-betrieb': ['In welchen bestehenden Arbeitsschritt gehört diese Vorgabe?', 'Können es die Leute – und tun sie es?', 'Wurde der Notfall schon einmal geübt?'],
  'm10-audit': ['Was ist die Anforderung, was der Nachweis?', 'Welche Schwäche im System steckt hinter dieser Feststellung?', 'Ist dieser Nachweis echt und zum richtigen Zeitpunkt entstanden?'],
  'm10-verbesserung': ['Welche Entscheidung stützt diese Kennzahl?', 'Was beantragen Sie – mit welchen Kosten und welcher Wirkung?', 'Was können Sie weglassen?'],
  konzept: ['Beantwortet das Konzept alle sechs Leitfragen?', 'Sind Zuständigkeiten und Kontrollen festgelegt?', 'Was ist Pflicht, was Empfehlung – und was kostet die Alternative?'],
};

export function topicTitle(id: string) {
  return TOPICS.find((t) => t.id === id)?.title ?? id;
}

export const QUESTION_COUNT = QUESTIONS.length;
