# UX-, Design- und Lernqualitäts-Update (Version 0.22)

Grundlage: Auftrag «gezieltes UX-, Design- und Lernqualitäts-Update». Umgesetzt auf dem aktuellen Stand (v0.21; enthält v0.19 vollständig sowie das kantonale Quellenregister und die Korrekturen der Gesamtprüfung). Kein neues System, das bestehende Academy-Designsystem bleibt. Lernstände, Inhalts-IDs, Quellen und Prüfstatus «Entwurf» sind unverändert; keine Bewertung wurde geändert (Bewertungsfassung bleibt 7).

## Priorität 1 – Lernlogik und Feedback

| Änderung | Wo | Details |
|---|---|---|
| Drei getrennte Stufen je Lektion: **Gelesen – Bearbeitet – Nachgewiesen** | `lessonStatus()` in `src/lib/learning.ts`; Anzeige `components/LessonStatus.tsx` im Lektionskopf, am Lektionsende («Was fehlt noch?») und in der Lektionsliste der Modulseite | *Gelesen*: alle Inhaltsschritte angesehen. *Bearbeitet*: alle Fragen der Lektion beantwortet und Baustellenaufgabe bearbeitet. *Nachgewiesen*: alle geschlossenen Fragen zuletzt richtig – nur objektiv ausgewertete Antworten der aktuellen Bewertungsfassung, ohne kritischen Fehler. Selbstbewertete offene Fragen und KI-Feedback zählen nie. |
| Kritische Fehler: themen- und entscheidungsspezifische Rückmeldung | `CriticalFeedback` in `components/Question.tsx`; Auswertung im Simulator | Statt des pauschalen Satzes («würde ein Gewässer gefährden oder ist ohne Bewilligung unzulässig», der z. B. bei Klima- oder Führungsfragen falsch war): Thema, gewählte Option, Begründung, mögliche Folgen und «Fachlich richtig wäre». Im Simulator: konkrete Folge des Entscheids und die richtige Option; der pauschale Gewässer-Satz ist entfernt. |
| Bewertungsart sichtbar | Fragen, offene Fragen, Simulator | Kennzeichnung «Objektiv ausgewertet», «Selbstbewertung · kein Nachweis», «KI-Feedback · nicht bewertet, nicht fachlich geprüft». Die bestehende Trennung in Kompetenzprofil und Prüfungen bleibt. |

## Priorität 2 – Lernoberfläche

| Änderung | Details |
|---|---|
| Navigation reduziert, ohne Funktionen zu entfernen | Gruppen «Nachschlagen» und «Persönlich» einklappbar (gerätebezogen gespeichert); die Gruppe mit der aktuellen Seite ist immer offen. Alle Seiten bleiben erreichbar. |
| Nächste Lernhandlung immer auffindbar | Knopf in der Kopfzeile mit der wichtigsten Empfehlung (fällige Wiederholungen, begonnene oder nächste Lektion, Fall, Prüfung). Ausgeblendet im Dashboard (dort der grosse Weiterlernen-Block) und während Lektion, Fall und Prüfung. Auf dem Handy als Symbol. Auf dem Handy bleibt in Lektionen die Schrittnavigation unten sichtbar. |
| Fokusmodus für Lektionen | Knopf «Fokusmodus»: blendet Seitennavigation, Pfad und Lektions-Seitenleiste aus, Lesebreite ca. 780 px, grössere Schrift. Pfeiltasten links/rechts wechseln den Schritt (nicht in Eingabefeldern), Esc beendet. |
| Fachvertiefung gegliedert | `components/DeepText.tsx`: Übersicht «Auf einen Blick» mit dem Kernsatz jedes Abschnitts (automatisch aus dem Text, keine neuen Inhalte), aufklappbare Abschnitte mit Lesefortschritt, «Weiter: nächster Abschnitt», Zwischenstand nach der Hälfte, Rechtsnatur-Hinweis am Schluss. Abkürzungen wie «Art.», «Abs.», «z. B.» beenden den Kernsatz nicht. |

## Priorität 3 – Baustellensimulator

| Änderung | Details |
|---|---|
| Eigene technische Szene je Fall (A–M) | `src/content/scenes.ts`, `components/SceneMap.tsx`: schematischer Lageplan bzw. bei Management-Fällen (E, L, M) ein Ablaufschema. Nummerierte **Gefahren** mit «möglicher Folge ohne Massnahme», **Schutzgüter/Betroffene**, **Wirkungswege** und Leitungen. Inhalt ausschliesslich aus Ausgangslage, Fakten und Musterlösung des Falls. |
| Massnahmen und Konsequenzen | Massnahmen (Musterlösung) erscheinen erst in der Auswertung, damit nicht vorweggenommen wird. Kritische Entscheide zeigen ihre konkrete Folge. |
| Lagebild «Liegt vor / Fehlt noch» | Seitenleiste im Fall: Fakten der Ausgangslage und erfragte Antworten; nach dem Informationsschritt die nicht erfragten wichtigen Punkte als «Nicht erfragt»; vorher der Hinweis, in welchem Schritt nachgefragt werden kann. |
| Keine dekorativen Grafiken | In Fallübersicht und Fallstart ersetzt die fachliche Szene die frühere Modul-Illustration (die bei mehreren Fällen eines Moduls identisch war). |

## Priorität 4 – Mobile Bedienbarkeit und Barrierefreiheit

| Prüfpunkt | Ergebnis |
|---|---|
| Desktop, Tablet, Smartphone | Browser-Test läuft jetzt auf Desktop (1360 px), Tablet (iPad) und Smartphone (iPhone 13); kein horizontales Scrollen auf allen Hauptseiten inkl. «Kanton & Standort» und «Quellen». |
| Textkontraste | Neuer Test `tests/a11y.test.ts` berechnet die Kontraste der Designtokens (hell und dunkel) und der Szenenfarben nach WCAG 2.1 AA (4,5:1). Gefunden und behoben: Akzentfarbe auf hellem Akzentgrund im hellen Modus (4,24 → 4,71; `--accent` minimal abgedunkelt). |
| Dark Mode | Szenenpläne mit festen, kontrastgeprüften Farben auf hellem Zeichenhintergrund – in beiden Modi lesbar. Alle Tokens im dunklen Modus bestehen. |
| Tastatur | «Zum Inhalt springen» als erster Tab; **neu: nach jedem Seitenwechsel springt der Fokus an den Anfang des Inhalts** (vorher blieb er an einer beliebigen Stelle im Dokument – im Test gefunden); einklappbare Navigationsgruppen und Vertiefungsabschnitte mit `aria-expanded`, Fokusmodus mit Pfeiltasten und Esc, sichtbare Fokusrahmen. |
| Grafiken und Tabellen auf kleinen Bildschirmen | Szenen skalieren als SVG; die Legende ist als Text darunter (auch für Screenreader). Tabellen liegen in einem seitlich scrollbaren Rahmen. |

## Priorität 5 – Qualitätssicherung

- **Veraltete Oberflächentexte korrigiert**: «Weitere Module sind in Entwicklung» (alle zwölf sind verfügbar), «die übrigen in Entwicklung» (Modulübersicht), «Graue Module sind in Entwicklung» (Fortschritt), Suchhinweis der Bibliothek, Verlässlichkeitshinweis im Quellenschritt (nennt jetzt den Fedlex-Abgleich).
- **Tests**: 253 Unit-Tests (neu `tests/ux.test.ts`: Lernstufen, Gliederung aller Vertiefungen, Kernsätze, Szenen vollständig und individuell; `tests/a11y.test.ts`: Kontraste). Browser-Test mit neuen Prüfungen für Lernstufen, Vertiefung, Fokusmodus, Tastatur, spezifisches Fehler-Feedback, Szenen und Lagebild – auf drei Geräteklassen: 312 Prüfungen bestanden, keine Konsolenfehler.
- **Erhalten**: Lernstände (keine Datenmigration nötig; Fokus und Navigationszustand sind gerätebezogene Bequemlichkeiten ausserhalb des Lernstands), alle Inhalts-IDs, Quellen, Bewertungen und der Prüfstatus «Entwurf».

## Noch offene Prüfpunkte

- **Fachliche Abnahme der Szenen**: Die Szenen stellen Lage und Massnahmen schematisch dar und übernehmen nur Angaben aus den Fällen; eine Fachperson sollte prüfen, ob Wirkungswege und «mögliche Folgen» im Einzelfall treffend sind.
- **Screenreader-Test** mit echten Hilfsmitteln (NVDA, VoiceOver) steht aus; geprüft sind Struktur, Beschriftungen und Tastaturwege.
- **Kontrast der Modulfarben** (Kacheltöne `--t-*`) und der Illustrationen ist nicht automatisiert geprüft.
- **Fokusmodus** gilt nur für Lektionen; Prüfungstraining und Wiederholungen haben ihn nicht.
- **Szenenpläne auf dem Handy**: Die Beschriftungen im Plan sind klein; der vollständige Inhalt steht als Text in der Legende darunter. Eine vergrösserbare Planansicht wäre eine sinnvolle Ergänzung.
- **Kernsätze** werden automatisch aus dem ersten Satz gebildet; bei einzelnen Abschnitten kann ein anderer Satz aussagekräftiger sein (redaktionelle Nacharbeit).
