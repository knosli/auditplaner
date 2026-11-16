# Hörmodus mit natürlicher Stimme (Version 0.32)

Anlass: Die Gerätestimmen klangen roboterhaft, und auf dem Handy liessen sich keine besseren Stimmen installieren. Vorgabe: Die Lösung muss kostenlos bleiben.

## Lösung
- Alle Lektionen werden **vorab als Audiodateien** erzeugt – mit **Piper** (freie Sprachsynthese, läuft offline) und der Stimme **«de_DE-thorsten-high»** (Datensatz Thorsten-Voice, Lizenz **CC0**). Keine Kosten, kein Konto, kein externer Dienst zur Laufzeit.
- Inhalt je Lektion: Hörmodus «Inhalte mit Hör-Quiz» (Einstieg, Kurz erklärt, Erklärungen, Beispiele, Zusammenfassung, Quizfragen mit 6 s Denkpause und Lösung); ohne Fachvertiefung.
- Format: MP3, mono, 32 kbit/s; insgesamt rund 11½ Stunden bzw. rund 170 MB. Dazu `audio/manifest.json` mit Prüfsumme, Dauer und Sprungmarken (Startzeit und Titel jedes Abschnitts).
- Ablage: neben der App (GitHub Pages `gh-pages/audio/`, im Artefakt als zugehörige Dateien). Nicht im Quellcode-Repository.

## Abspielen
- Der Hörmodus nutzt die Audios automatisch, wenn für die gewählte Lektion bzw. das ganze Modul passende Dateien vorliegen; sonst – und für «Nur Inhalte», «Nur Hör-Quiz» oder mit Vertiefung – liest wie bisher die Gerätestimme. Auf Wunsch lässt sich die Gerätestimme auch erzwingen.
- **Prüfsumme:** Jede Audiodatei ist an den Text gebunden, aus dem sie erzeugt wurde. Ändert sich ein Lektionstext, wird für diese Lektion automatisch die Gerätestimme verwendet, bis das Audio neu erzeugt ist – es wird nie ein veralteter Inhalt vorgelesen.
- Echte Audiowiedergabe: läuft **auch bei gesperrtem Bildschirm**; Titel und Steuerung (Abspielen, Pause, Abschnitt vor/zurück) über Sperrbildschirm, Kopfhörer bzw. Auto (Media Session). Läuft automatisch durch alle Lektionen des Moduls; Position wird auf dem Gerät gemerkt; Tempo einstellbar.

## Erzeugen und aktualisieren
1. `npx tsx scripts/export-audio-segments.ts segments.json`
2. `python scripts/make-audio.py segments.json de_DE-thorsten-high.onnx <audio-ordner> --jobs 4`
   (Piper: `pip install piper-tts`; Stimme von huggingface.co/rhasspy/piper-voices). Bereits passende Lektionen (gleiche Prüfsumme) werden übersprungen.
3. Den Ordner als `audio/` neben `index.html` veröffentlichen.

## Behoben im selben Zug
- Zwischentitel wurden von der Gerätestimme als «Raute Raute Raute» vorgelesen.
- Beim Wechsel zur nächsten Lektion blieb die Wiedergabe stehen (der Browser meldet beim Dateiwechsel kurz «pausiert») – jetzt läuft sie durch.

## Tests
Unit-Tests: 293 bestanden (u. a. Prüfsumme, Titel ohne Rautezeichen). Browser-Test: 405 Prüfungen bestanden. Zusätzlich manuell mit Webserver: natürliche Stimme wird erkannt, Abspielen, Pause, Abschnitt vor, automatischer Übergang zur nächsten Lektion, Titel in der Media Session; Modul ohne Audios fällt auf die Gerätestimme zurück.
