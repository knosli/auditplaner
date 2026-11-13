# UmweltCampus Bau CH – Academy Edition: Umsetzungsbericht

Stand 13.11.2026 · App-Version 0.7 · Bewertungsfassung 4 (unverändert)

Grundlage: Lead-Design-Direktive «Academy Edition» und HTML-Zielbild (nur visuelle Referenz). Ausgangsbasis war ausschliesslich die aktuelle App-Version 0.6.

## Unverändert (nachgewiesen)

- Lerninhalte, Frage-IDs, Antwort- und Bewertungslogik, Fallgewichte, Quellen, Prüfstatus.
- Speicherformat: lokaler Schlüssel `umweltcampus.v1`, Konto-Dokument `data/users/<id>/progress`, `STATE_VERSION 3`, Export-/Importformat.
- Browser-Test «Lernstand beim Navigieren unverändert»: Antworten, Fälle, Prüfungen, Praxisaufträge und Zeitstempel der Lektionen bleiben über alle Seiten identisch. Die Migration eines Lernstands aus Version 1 wird weiterhin geprüft.

## Umgesetzt

| Bereich | Änderung | Dateien |
|---|---|---|
| Designsystem | Farben nach Direktive (Petrol #102D2D, Teal #167B70, Arbeitsfläche #F7F7F2, Mint, Sand #E5AA63, Rot #C14C40 nur kritisch), Systemschriften statt Google Fonts, Radien 12/20/24 px, Fachfarbtöne je Modul, Dunkelmodus angepasst | `src/styles.css`, `index.html` |
| Icons | Einheitlicher SVG-Icon-Satz, keine Emoji-Navigation | `src/components/Icons.tsx` |
| Shell | Dunkle Sidebar mit vier Gruppen (Mein Lernen, Praxis & Training, Nachschlagen, Persönlich), aktiver Ort mit Sand-Markierung, fällige Wiederholungen als Zahl, Lernziel-Karte; Topbar mit Brotkrumen, Speicherstatus, Begriffe, Coach; Handy-Menü mit Hintergrund-Abdunklung; «Zum Inhalt springen» | `src/App.tsx` |
| Neue Route | `#quellen` öffnet die Bibliothek direkt im Quellenverzeichnis | `src/App.tsx`, `src/views/Library.tsx` |
| Dashboard | Hero «Weiterlernen» mit genau einer Aktion (begonnene bzw. nächste Lektion aus dem Lernstand), technische Illustration des Moduls, vier Fakten, Lernplan für heute aus echter Logik (Lektion, offener Fall, fällige Wiederholungen, mit realer Dauer), Fachentwicklung in vier getrennten Ebenen ohne Gesamtnote, drei Module als Einstieg, Wissenslücken | `src/views/Main.tsx`, `src/lib/learning.ts` (`continueLesson`, `progressLayers`) |
| Illustrationen | Eigene SVG-Schemata: Baustellenabwasser (M2), Rückbau und Trennung (M3), Bodenprofil und Piste (M4), Vom Gesetz zur Massnahme (M1) | `src/components/Illustrations.tsx` |
| Fachmodule | Karten mit Fachidentität (Icon, Farbton), Nutzenversprechen, Lektionsfortschritt bzw. «In Entwicklung», Filter (Praxis / Recht & Planung / Management) und Suche über Titel und Themen | `src/views/Main.tsx`, `src/components/moduleMeta.ts` |
| Moduldetail | Modul-Hero, Prüfstatus-Hinweis, Weg durch die vier Lernstufen mit Lektionen, Fälle, Praxisaufträge, Modulabschluss | `src/views/Main.tsx` |
| Lernlektion | Fokus-Layout: segmentierte Schrittanzeige, Blocktypen klar gekennzeichnet (Situation, Entscheidung, Erklärung, Vertiefung, Quelle & Prüfstatus …), Lesespalte max. ~72 Zeichen, Seitenleiste mit Lernzielen, Schritten und Quellen; auf Handy und Tablet oben, quer scrollbar; feste Navigationsleiste unten; bei unbeantworteter Frage heisst die Schaltfläche «Weiter ohne Antwort» | `src/views/Lesson.tsx` |
| Simulator | Fallkarten mit Situationsgrafik, Bauart, Stufe, Dauer, Anzahl Entscheidungen; Fallstart mit Ausgangslage, Rolle, Ziel, Risikofaktoren, Bewertungskriterien; Einsatzablauf (Ausgangslage → Entscheidungen → Auswertung) mit Markierung kritischer Fehler; Auswertung hervorgehoben | `src/views/Simulator.tsx` |
| Barrierefreiheit | Tap-Ziele ≥ 44 px, Fokusrahmen, `aria-current`, beschriftete Fortschrittsbalken, `prefers-reduced-motion` | div. |
| Tests | 22 neue Browser-Prüfungen (Navigation, Hero, Ebenen, Filter, Suche, Quellen, kein horizontales Scrollen auf 13 Seiten, Datenerhalt) | `tests/e2e.cjs` |

## Tests

- Unit-Tests: 123/123 bestanden (`npm test`).
- Browser-Tests: 116/116 bestanden, Desktop 1360 px und iPhone 13 (`npm run build && npm run e2e`), keine Konsolenfehler.
- Breiten 1440 / 1024 / 768 / 390 / 320 px: kein horizontales Scrollen auf allen Hauptseiten (inkl. Handy-Emulation).
- Leerer Lernstand, vorhandener Lernstand (Testdaten) und Dunkelmodus geprüft.
- Vorher/Nachher: `vorher-nachher-desktop.png`, `vorher-nachher-mobile.png`.

## Beobachtete Schwierigkeiten

- Auf dem Handy hat die quer scrollbare Ablaufleiste im Simulator anfangs die Seitenbreite vergrössert (Layout-Viewport 696 px). Die Breitenprüfung ohne Handy-Emulation hat das nicht erkannt; behoben und als Browser-Test aufgenommen.
- Lange Wörter (z. B. «Baustellenentwässerung») bei 320 px: Silbentrennung aktiviert.

## Offen

- Prüfungstraining, Wiederholungen, Lernpfad, Bibliothek, Fortschritt und Einstellungen übernehmen das neue Designsystem (Farben, Karten, Schaltflächen, Navigation), wurden aber nicht einzeln neu gestaltet.
- Interaktive Abbildungen für Absetzbecken, pH-Neutralisation, Ober-/Unterboden und Abfalltrennung: die bestehenden Schemas bleiben in Funktion; neue interaktive Varianten stehen noch aus.
- Illustrationen für künftige Module (5–12) folgen mit den Modulen.
