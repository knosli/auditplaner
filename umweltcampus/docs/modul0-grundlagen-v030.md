# Modul 0 «Grundlagen auffrischen» mit Einstufungstest (Version 0.30)

Anlass: Viele Umweltgrundlagen aus früheren Ausbildungen sind nicht mehr präsent. Sie sollen vor den Fachmodulen kurz aufgefrischt werden können – mit Einstufungstest, damit Bekanntes übersprungen werden kann.

## Aufbau

| Lektion | Inhalt | Vertieft in |
|---|---|---|
| 1 Wie Umweltschäden entstehen | Quelle – Weg – Schutzgut; Emission/Immission (Art. 7 Abs. 2 USG); Massnahmen an der Quelle (Art. 11 USG); Vorsorge- und Verursacherprinzip (Art. 1 Abs. 2, Art. 2 USG) | Modul 1 und alle Fachmodule |
| 2 Wasser | Grundwasser (mehr als 80 % des Trink- und Brauchwassers, BAFU); Meteor-/Schmutzwasser; Trübung, pH, Öl; Art. 6 und 7 GSchG | Modul 2, 7 |
| 3 Boden | Bodenbegriff (Art. 7 Abs. 4bis USG); Ober-/Unterboden/Untergrund; Funktionen; Verdichtung und Bodenfeuchte | Modul 4, 3 |
| 4 Luft und Lärm | Staub, Feinstaub (PM10), Dieselruss, Quarzfeinstaub; Dezibel-Faustregeln (+3 / +10 / –6 dB, idealisiert); Baulärm: Massnahmenstufen statt Grenzwerte | Modul 5, 6 |
| 5 Stoffe und Zahlen | pH-Skala (logarithmisch), Verdünnung ist keine Behandlung; mg/l, mg/kg, ppm; 1 l/s = 3,6 m³/h; Füllzeit; GHS-Piktogramm «Umwelt» | Modul 2, 7 |
| 6 Recht in 15 Minuten | Gesetz, Verordnung, Vollzugshilfe, Norm, Auflage, Vertrag; Bund/Kanton/Gemeinde (Vollzug durch die Kantone, Art. 36 USG) | Modul 1, 8 |
| 7 Klima und Ressourcen | CO₂-Äquivalente, graue Emissionen, Scope 1/2/3; Netto-Null bis 2050 (Art. 3 KlG, Art. 5 Abs. 1 KlG); vermeiden – verwerten – entsorgen (Art. 30 USG) | Modul 11, 3 |

- **Kurzformat** (`format: 'auffrischung'`): Einstieg, Vorwissen, Kurz erklärt, Erklärung, Schema, Beispiele Hoch- und Tiefbau, Zusammenfassung mit Verweis auf das vertiefende Modul, Wiederholung, Quellen. 10–15 Minuten je Lektion. Vertiefung, Abwägung, Baustellen- und Praxisaufgaben gibt es in den Fachmodulen; die Tests prüfen dieses Kurzformat separat.
- **Fragen:** 42 geschlossene (je Lektion 6, Stufen 1 und 2) und 2 offene für den Abschlusstest. Richtige Antworten gleichmässig auf a–d verteilt (11/11/10/10).
- **19 Wiederholungskarten**, zwei neue Merkschemas («Drei Faustregeln für Dezibel», «Umrechnungen auf einen Blick»).
- **Neue Quelle** `bafu-grundwasser` (BAFU-Seite «Grundwasser», veröffentlicht 25.2.2025, Wortlaut zum 80-%-Anteil verglichen).
- Lernpfad: Modul 0 steht vor allen Fachmodulen (pathOrder 0). Modulabschluss: Einstufungstest gemacht, alle Lektionen abgeschlossen **oder** laut Einstufung sicher, Abschlusstest (Modulprüfung) bestanden.

## Einstufungstest

- Seite `#einstufung`; empfohlen auf der Startseite (solange kein Ergebnis vorliegt), auf der Modulseite von Modul 0 und als erste Empfehlung bei einem neuen Lernstand.
- 14 Fragen (je Lektion zwei Grundwissen-Fragen), Antwortreihenfolge gemischt, Antwort «Weiss ich nicht» statt raten, keine Zeitbegrenzung.
- Ergebnis je Lektion: **2/2** sicher – kann übersprungen werden; **1/2** kurz auffrischen; **0/2** bearbeiten empfohlen. Zu jeder nicht gewussten Frage die richtige Antwort mit Erklärung.
- Wirkung: «Weiter»-Empfehlung, Startseite und Modulseite überspringen sichere Grundlagen-Lektionen. Sie werden **nicht** als abgeschlossen verbucht und zählen nicht als Kompetenznachweis; sie bleiben jederzeit offen.
- Lernstand: neues optionales Feld `placement` (Datum, richtige Antworten je Lektion). Ältere Lernstände bleiben gültig; ungültige Einträge werden beim Laden verworfen.

## Geprüft

Alle Gesetzesstellen (USG Art. 1, 2, 7, 11, 30, 36; GSchG Art. 6, 7; KlG Art. 3, 5) am 16.11.2026 mit der Fedlex-Fassung verglichen (automatisierter Abgleich, keine menschliche Fachprüfung). Fachliche Zahlen (pH-Bereich, Dezibel-Faustregeln, Bodenaufbau) wie in den bereits geprüften Modulen 2, 4 und 6. Prüfstatus aller Inhalte: «Entwurf».

## Tests
Unit-Tests: 284 bestanden (neu `tests/m0.test.ts`: Umfang, Format, Antwortverteilung, Abschlusstest, Einstufung, Überspringen, Lernstand). Browser-Test: 387 Prüfungen bestanden (neu: Modul 0, Einstufungstest durchspielen, Ergebnis und Empfehlung, Kurzformat), keine Konsolenfehler.

## Offen
- **Antwortverteilung in den Fachmodulen:** In den bestehenden Modulen 1–12 ist die richtige Antwort sehr häufig «b». Wer rät, lernt das Muster. Empfehlung: Antwortreihenfolge bei der Anzeige mischen (die Auswertung bleibt gleich, Lernstände bleiben gültig). Nicht in dieser Version umgesetzt, weil es alle Fragen betrifft.
- Fachliche Abnahme der Grundlagen-Lektionen durch eine Fachperson.
