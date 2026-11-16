# Bedienung intuitiver (Versionen 0.25.1 – 0.27)

Auslöser: Rückmeldung der Nutzerin bzw. des Nutzers – die App soll intuitiver werden. Bestätigte Punkte: (1) zu viele Wege auf einmal, (2) lange Lektionen ohne Orientierung, (4) gesperrte Knöpfe ohne Begründung, (5) zu viele Hinweise. Punkt 3 (Begriffe wie «Abwägung», «Baustellenaufgabe») bleibt bewusst unverändert. Keine Inhalte, Bewertungen, IDs oder Lernstände verändert.

| Bereich | Vorher | Jetzt |
|---|---|---|
| Tabellen auf dem Handy (0.25.1) | Tabellen mit 3–5 Spalten gequetscht, Wörter brachen mitten im Wort um | Ab 3 Spalten auf schmalen Bildschirmen als Karten: pro Zeile eine Karte, jeder Wert mit Spaltentitel |
| Module wechseln (0.26) | Nur über das Menü; Startpunkt im Modul weit unten | «Alle Module», Auswahlliste und Pfeile oben, Vor/Zurück unten; Knopf «Starten/Weiterlernen mit Lektion …» im Modulkopf; Lektionen direkt nach dem Kopf |
| Navigation Handy/Tablet (1) | Menü oben links, zwölf Einträge, «→»-Symbol ohne Text | Feste Leiste unten: Start · Module · Fälle · Wiederholen (mit Zähler) · Mehr. In Lektionen und Fällen ausgeblendet, damit die Schrittnavigation Platz hat. Der Empfehlungsknopf oben heisst «Weiter». Desktop unverändert (Seitennavigation). |
| Orientierung in Lektionen (2) | 16 Schritte, Schrittleiste nur mit Typen («Erklärung, Schema, Erklärung …») | Vier Teile: **Verstehen · Vertiefen · Anwenden · Abschliessen**, oben als anwählbare Leiste mit Fortschritt (z. B. «2/8»); Anzeige «Teil 2 von 4: Vertiefen · Schritt 9 von 16». Schrittliste mit Teil-Überschriften und dem Titel jedes Schritts. Auf Handy und Tablet zeigt die Schrittliste nur die Schritte des aktuellen Teils. Doppelte Fortschrittsleiste entfernt. |
| Gesperrte Knöpfe (4) | Knopf grau, Grund unklar oder vage («mindestens einige Zeilen») | Sichtbarer Grund mit Zähler, z. B. «Noch 35 Zeichen – dann können Sie abschliessen», «Wählen Sie zuerst eine Antwort und dann, wie sicher Sie sind», «2 von 3 Fragen gewählt – wählen Sie genau 3», «Beantworten Sie zuerst diese Frage», bei Praxisaufträgen die noch fehlenden Felder. Gilt für Fragen, offene Fragen, Baustellenaufgaben, Erklären-Übung, Fälle, Prüfungen, Wiederholungen und Praxisaufträge. |
| Hinweise (5) | Langer Prüfstatus-Kasten auf jeder Modulseite | Einzeilig «Prüfstatus Entwurf – was heisst das?», zum Aufklappen. Der Prüfstatus bleibt sichtbar (Abzeichen in jeder Lektion, Quellen, Einstellungen). |

## Tests

- Unit-Tests: 268 bestanden.
- Browser-Test (Desktop, Tablet, Smartphone): 360 Prüfungen bestanden, keine Konsolenfehler, kein seitliches Scrollen. Neu geprüft: Tabellen als Karten auf dem Handy, Modulwechsel (Auswahlliste, Pfeile, Vor/Zurück), Startknopf im Modul, Lektionsteile und Sprung zu einem Teil, Begründung bei gesperrtem Knopf, Schnellleiste auf Handy/Tablet und deren Ausblendung in Lektionen.

## Korrektur 0.27.1: Karten liessen sich nicht antippen

Rückmeldung: «Wenn ich auf Module gehe und auf z. B. Modul 2 klicke, passiert nichts.» Ursache: Die Modulkarten (Übersicht und Startseite) und die Fallkarten im Simulator sollten als Ganzes anklickbar sein (unsichtbare Klickfläche über der Karte). Wegen eines Stilfehlers war die Klickfläche nur so gross wie der Titel; ein Tippen auf Symbol, Beschreibung oder «Öffnen →» bewirkte nichts. Behoben (`.mod-card h3`/`.sim-body` nicht mehr als Bezugsrahmen der Klickfläche). Der Browser-Test prüft jetzt das Antippen der Karte selbst, nicht nur den Seitenaufruf. Ergebnis: 366 Browser-Prüfungen bestanden, keine Konsolenfehler.
