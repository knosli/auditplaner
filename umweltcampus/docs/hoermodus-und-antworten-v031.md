# Antworten gemischt und Hörmodus (Version 0.31)

## 1. Antwortreihenfolge gemischt

**Befund:** In den Fachmodulen war die richtige Antwort bei 334 von 393 Fragen «b»; im Baustellensimulator stand die beste Option bei 51 von 54 Entscheidungen zuoberst. Wer rät, lernt das Muster.

**Umsetzung:** Antworten werden bei der Anzeige gemischt (`displayOrder` in `src/lib/exam.ts`): zufällig je Lernende(r) und Frage, aber stabil – dieselbe Person sieht bei derselben Frage immer dieselbe Reihenfolge. Gilt für Lektionsfragen, Wiederholungen, Prüfungen, Einstufungstest und Simulator-Entscheidungen.

- **Keine Neubewertung, Lernstände bleiben gültig:** Bewertung und gespeicherte Antworten hängen an den Antwort-IDs, nicht an der Position. Die Bewertungsfassung bleibt 9.
- **Bereinigt:** Vier Begründungen verwiesen auf «wie a» (m1, m3, m5) – ersetzt durch den ausgeschriebenen Text. Eine Erklärung in m11-d05 nannte «(c)» – umformuliert.
- Tests: Reihenfolge stabil je Person, verschieden zwischen Personen, IDs vollständig; Browser-Test prüft Stabilität nach Neuladen.

## 2. Hörmodus (unterwegs lernen)

Seite «Hörmodus» (Navigation unter «Mein Lernen», Knopf «Anhören» in jeder Lektion, «Modul anhören» auf jeder Modulseite).

- **Sprachausgabe des Geräts** (Web Speech API): keine Audiodateien, keine externen Dienste, keine Kosten; funktioniert offline, soweit eine deutsche Stimme installiert ist (Schweizer Stimme bevorzugt).
- **Auswahl:** Modul oder einzelne Lektion; «Inhalte mit Hör-Quiz», «Nur Inhalte», «Nur Hör-Quiz (Wiederholung)»; Fachvertiefung optional; Tempo; Stimme.
- **Vorgelesen werden:** Einstieg, Kurz erklärt, Erklärungen, Beispiele, Zusammenfassung (Vertiefung auf Wunsch). Tabellen werden zu Sätzen («Spalte: Wert»); Abkürzungen, Einheiten und Gesetze werden ausgeschrieben (z. B. «Art. 6 GSchG» → «Artikel 6 Gewässerschutzgesetz», «l/s» → «Liter pro Sekunde», «6.5–9.0» → «6,5 bis 9,0»).
- **Hör-Quiz:** Frage mit nummerierten Antworten, 6 Sekunden Denkpause, dann «Richtig ist Antwort …» mit Erklärung. Keine Bedienung nötig.
- **Für die Fahrt:** grosse Knöpfe (Zurück, Abspielen/Pause, Vor), läuft automatisch durch das Modul, Bildschirm bleibt eingeschaltet (Wake Lock, wo unterstützt), Position wird auf dem Gerät gemerkt. Hinweis: im Auto nur im Stand einstellen.
- **Lernstand:** Zuhören zählt nicht als «gelesen» und verändert den Lernstand nicht.

### Grenzen
- Die Stimmqualität hängt vom Gerät ab; es ist eine Vorlesestimme, kein gesprochener Podcast.
- Auf iPhones bricht die Sprachausgabe ab, wenn der Bildschirm gesperrt wird; darum hält die App den Bildschirm wach.
- Ein Podcast mit natürlichen Stimmen im Dialog (ähnlich NotebookLM) bräuchte einen externen Sprachdienst (Kosten, Zugangsschlüssel) und vorab erzeugte Audiodateien – nicht umgesetzt.

## Tests
Unit-Tests: 291 bestanden (neu `tests/speech.test.ts`; Mischen in `tests/m0.test.ts`). Browser-Test: 405 Prüfungen bestanden (neu: Antwortreihenfolge stabil, Hörmodus starten, vorspringen, anhalten; «Anhören» in der Lektion), keine Konsolenfehler.
