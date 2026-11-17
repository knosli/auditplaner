# Tourguide und Handy-Navigation – Änderungen (Version 3.44 → 3.45)

Grundlage: Prüfbericht «Anliker_Tourguide_Navigation_CodeReview_3_44» und die vorbereiteten Funktionspatches. Die Patches wurden **nicht blind übernommen**:
jede Funktion wurde gegen den echten Code von 3.44 verglichen, mehrere Integrationsfehler der Patches wurden gefunden und korrigiert (Abschnitt 3).
Es gibt **keine Datenmigration**, keine neuen Datenfelder und keine neuen Einstellungen. Neue Hilfsfelder (`time`, `dur`, `geo`, `why` …) leben nur im Arbeitsspeicher.

Geänderte Dateien: `js/app.js`, `index.html` (Version), `CLAUDE.md` (Doku), neu `TOURGUIDE_AENDERUNGEN.md`, `tests/tourguide/*.test.js`.

## 1. Geänderte und neue Funktionen (`js/app.js`)

| Funktion | Änderung |
|---|---|
| `tgSim` | Baustellen-Znüni/-Mittag gelten auch für Baustellen-Audits **mit fixer Uhrzeit** (`siteRules`); Verspätung wird nach allen Verschiebungen gemessen. Eigene Mittagspause vor einem Fixtermin nur, wenn der Termin dadurch nicht später beginnt; sonst entfällt sie und `lunchConflict` meldet es. |
| `tgCompute` | `better()` repariert (keine Differenz als Boolean, stabiler ID-Tie-Break); geplante Baustellen / Termine mit Ort **ohne Kartenpunkt** blockieren die Rechnung mit Meldung; verwaiste Planungen (Baustelle gelöscht) nur Hinweis; Kandidaten höchstens 59 Matrix-Punkte, Rest sichtbar (`unprocessed`); `mayOpen` prüft **jedes** Gruppenmitglied am Zieltag (`eligibleOn`); Ausgleich mit festen Grenzen (`MAX_STEPS` 40, `MAX_EVALS` 3000) statt 5-Sekunden-Uhr; Matrix-Fehler werden abgefangen. |
| `tgDayEvents` | Flag `geo` (Termin hat einen ausdrücklichen Ort) und `ds`. |
| `tgRender` | Meldungen: Mittagspause wegen Fixtermin nicht möglich, Verspätung «Fahrzeit oder Baustellen-Pause», Hinweis «Nicht vollständig geprüft», Hinweis zu gelöschten Planungen. |
| `isoMonday` | Kalendertage statt Millisekunden (immer 00:00 lokale Zeit). |
| `piPrevKW`, `checkPlansAfterImport` | Folgeänderung: Wochen-Rechnung mit Kalendertagen (siehe 3f). |
| `mobDayStopList` | liefert `time` (Fixuhrzeit: `p.time`, sonst `fixVisit` am passenden Wochentag, Beratung) und `dur` (Aufenthalt). |
| `mobRouteValid` | prüft zusätzlich Kartenpunkte, Uhrzeiten, Dauer; veraltete Route wird auch nicht mehr für die Anzeige verwendet (`mobOrderedStops`). |
| `mobAutoRoute`, `mobStopDone` (neu) | Route auch für genau einen Stopp; Start: erledigter Stopp (mit Beleg) > frischer GPS > Startadresse; frischer GPS ersetzt einen früheren Heimstart. |
| `solveMobTimedRoute` (neu) | Reihenfolge mit Fixterminen: Verspätung → Fahrzeit → Ende; bis 8 freie Stopps **alle** Reihenfolgen, darüber Einfüge-Heuristik. |
| `computeMobRoute` | nutzt die obigen Teile, ignoriert Ergebnisse eines gewechselten Tages, speichert Startart/Grund/Verspätung; keine stillen Abbrüche. |
| `getDurationMatrix` | gesamte n×n-Matrix validiert; 3500-Paar-Grenze; gleiche gleichzeitige Anfragen zusammengefasst; Startpunkt-Rundung 4 Stellen; Pause nach 429/401/403; Zeitlimit 20 s; Rückfall mit Begründung (`why`). |
| `mobRouteBannerHTML`, `mobMapsChunks` (neu), `mobOpenTourMaps` (neu) | Mehrstopp-Navigation in Etappen, `escH()` für alle Namen, Hinweis auf Stopps ohne Kartenpunkt. |
| `mobOpenMaps` | Einzelziel ohne erzwungene Startadresse (aktueller Standort), Koordinaten als Ziel. |
| `toggleMobileView` | merkt die Zeit des ersten GPS-Standorts (sonst gälte er als veraltet). |
| Hilfen (neu) | `mobGeo`, `mobWhyText`, Konstanten `MAPS_STOPS_PER_LINK`, `ORS_MAX_PAIRS`, Zustände `_orsMatrixPending`, `_orsRetryAfter`. |

## 2. Fehlerstatus je Befund des Prüfberichts

| Nr. | Befund | Status |
|---:|---|---|
| 1 | `better()` Prioritätsvergleich | **behoben** (T1) |
| 2 | Fixtermin durch Mittagspause verspätet | **behoben** (T2); wenn die Pause deshalb ausfällt, wird das gemeldet |
| 3 | Baustellen-Fixtermin in Baustellenpause | **behoben** (T3, T4) |
| 4 | geplante Baustelle ohne GPS-Punkt entfällt | **behoben** (T5) |
| 5 | Handy: Fixzeiten unbeachtet | **behoben** (T8); Verfahren ist im Modell optimal bis 8 freie Stopps, darüber Heuristik – **kein** exakter Zeitfenster-Solver |
| 6 | Einzelziel-Maps startet bei Heimadresse | **behoben** |
| 7 | Mehrstopp-Reihenfolge nicht an Google Maps | **behoben** (T9), mit Einschränkungen (Abschnitt 5) |
| 8 | Kandidaten still abgeschnitten | **behoben** (Grenze 59, sichtbar); eine regionale Vorfilterung vor der Matrix ist **offen** (Verbesserungsidee) |
| 9 | Gruppenverlagerung prüft Zieltag nicht für alle | **behoben** (`eligibleOn`); ein Altfehler konnte nicht gezielt nachgestellt werden (T7 teilweise, siehe 4) |
| 10 | veraltete Route gilt als gültig | **behoben** (T11, T12) |
| 11 | ORS-Anfragehäufigkeit | **teilweise behoben**: Rundung, Zusammenfassung, Pause nach 429 (T15–T17). Das teamweite Tageslimit lässt sich mit lokalen Browserdaten **nicht** verlässlich steuern |
| 12 | ungültige/zu grosse Matrix | **behoben** (T13, T14) |
| 13 | gerätabhängiger Ausgleich | **behoben** (feste Grenzen; zweimal rechnen → gleiches Ergebnis, 25 Zufallsszenarien) |
| 14 | unsicheres HTML im Banner | **behoben** (T20). Die Handy-Karten selbst geben Namen weiterhin ohne `escH()` aus (bestehend, nicht Teil des Auftrags; Schutz über `mgSafe()` beim Laden) |
| 15 | Geokodierung nimmt ersten Treffer | **offen** (Verbesserungsidee, keine Fehlerkorrektur) |
| 16 | `isoMonday` Sommerzeit | **behoben** (T19) inkl. Folgefix 3f |
| 17 | entfernter Stopp als besuchter Standort | **behoben**: nur noch mit Beleg (Audit-/Beratungs-Eintrag vom Tag bzw. Personen-Audit erledigt) |
| 18 | Rapporte auf dem Handy | **offene Fachfrage** (nicht geraten): Rapporte stehen als eigene Karten oben im Tagesplan mit eigenem Maps-Knopf, sind aber nicht Teil der berechneten Route. Sollen sie in die Reihenfolge und Mehrstopp-Navigation? |

## 3. Integrationsfehler der mitgelieferten Patches (gefunden und korrigiert)

a. **`mobAutoRoute`-Patch** hätte die vorhandene Funktion «nach einem erledigten Stopp startet die Route dort» ganz entfernt. Jetzt: erledigter Stopp (Beleg) wird weiterverwendet, ein bloss gelöschter nie.
b. **GPS-Zeit:** `toggleMobileView` setzte `_mobGPSTime` nicht. Mit der neuen «frisch»-Regel wäre der erste GPS-Standort ignoriert worden.
c. **`tgSim`-Patch** strich die eigene Mittagspause vor Fixterminen komplett: bei einem Fixtermin um 12:40 gäbe es sonst stillschweigend nie eine Pause. Jetzt: Pause nur, wenn der Termin pünktlich bleibt, sonst Meldung.
d. **Ausgleich** `passes<3`: jeder Durchlauf bricht nach dem ersten Treffer ab, das wären nur 3 Verbesserungen gewesen. Jetzt 40 Schritte / 3000 Bewertungen, auch innerhalb der Schleifen geprüft.
e. **`tgCompute`-Patch** blockierte dauerhaft bei einer Planung auf eine gelöschte Baustelle und bei Rapporten, die nur eine Ort-Bezeichnung (keine Adresse) haben. Jetzt Hinweis bzw. nur ausdrückliche Orte.
f. **`isoMonday`** liefert jetzt exakt 00:00. Zwei Aufrufer rechneten mit `7*86400000` ms darauf und wären über die Zeitumstellung um einen Tag verrutscht (`piPrevKW`: z.B. KW 14/2026 → falsche Vorwoche). Beide auf Kalendertage umgestellt; geprüft für KW 1–52, 2020–2031 in drei Zeitzonen.
g. **`getDurationMatrix`-Patch**: kein Zeitlimit (eine hängende Anfrage hätte `_mobRouteBusy` für immer gesetzt), keine Begründung für die Schätzung, und der Fehler bei ungültigen Koordinaten war im Tourguide nicht abgefangen.
h. **`mobOpenTourMaps`-Patch**: Etappenprüfung vor der Zahlenprüfung, `dir_action=navigate` auch mit festem Start. Jetzt nur bei Start am aktuellen Standort.
i. **`solveMobTimedRoute`-Patch** war reine Heuristik; bis 8 freie Stopps rechnet die Version jetzt alle Reihenfolgen im selben Modell.

## 4. Testergebnisse T1–T22

Ausgeführt mit Playwright/Chromium gegen die echte PWA (`tests/tourguide/*.test.js`, Zeitzone Europe/Zurich), Gesamtergebnis **alle bestanden**. Gegenprobe: gegen Version 3.44 schlagen T1, T2, T3, T4, T5, T19 und das Kandidatenlimit erwartungsgemäss fehl.

| Test | Ergebnis |
|---|---|
| T1 Priorität gross/klein, beide Reihenfolgen | bestanden |
| T2 Fixtermin 12:40 nach Audit 11:40 | bestanden (Start 12:40, 0 min zu spät, Pausenkonflikt gemeldet) |
| T3 Fix-Audit 12:00 im Baustellen-Mittag | bestanden (13:00, 60 min) |
| T4 Fix-Audit 09:00 im Znüni | bestanden (09:15, 15 min) |
| T5 geplante Baustelle ohne Kartenpunkt | bestanden (Meldung, keine Rechnung) |
| T6 zwei Termine 09:00 an 30 Fahrminuten | bestanden (Verspätung ausgewiesen) |
| T7 Gruppenverlagerung / Zieltag | **teilweise**: Eigenschaftstest (25 Zufallsszenarien: nur zulässige Tage, keine Doppelten, `maxN`, Tageslänge) bestanden; der konkrete Altfehler wurde nicht gezielt nachgestellt |
| T8 Handy B fix 08:00 vor A fix 09:30 | bestanden |
| T9 sieben Stopps, Heimfahrt | bestanden (3 bzw. mit einem Stopp ohne Kartenpunkt 2 Etappen, je ≤ 3 Zwischenziele, Anschluss, letzte Etappe zur Startadresse) |
| T10 ein Stopp mit GPS | bestanden (direkt und automatisch) |
| T11 / T12 Koordinate / Uhrzeit geändert | bestanden (+ Dauer und Stoppmenge) |
| T13 `null`, Text, falsche Zeilenlänge, negativ | bestanden |
| T14 60 Punkte (3600 Paare) | bestanden (keine Anfrage); 59 Punkte werden angefragt |
| T15 gleichzeitig identisch | bestanden (1 Netzaufruf) |
| T16 GPS wenige Meter versetzt | bestanden (Cache); grosse Verschiebung neue Anfrage |
| T17 HTTP 429 | bestanden (Schätzung, danach keine weitere Anfrage) |
| T18 null Stopps, Tageswechsel während Anfrage | bestanden |
| T19 `isoMonday(14, 2026)` und KW-Wechsel | bestanden |
| T20 Name mit HTML | bestanden (nur Text) |
| T21 gleicher Ort 2+3 Personen | bestanden (Rundgang nach 5 Personen, Nachbearbeitung 2×) |
| T22 6 Stopps ohne Fixtermine | bestanden (Fahrzeit = Minimum aller 720 Reihenfolgen) |

Weitere Prüfungen: Stabilität (zweimal rechnen, gleiches Ergebnis), erledigt-vs-gelöscht, GPS-Frische, ORS offline/ohne Schlüssel, Handy-Ansicht bei 390 px ohne JavaScript-Fehler, `node tests/merge.test.js` (19 Tests).

## 5. Bekannte Einschränkungen und Risiken

- **Externe Angaben nicht selbst geprüft:** In der Entwicklungsumgebung waren die Dokumentationsseiten von openrouteservice und Google Maps nicht erreichbar. Die Grenzen (ORS-Vollmatrix 3500 Paare; Google-Maps-Link in mobilen Browsern höchstens 3 Zwischenziele, 2048 Zeichen) stammen aus dem Prüfbericht und sind als Konstanten (`ORS_MAX_PAIRS`, `MAPS_STOPS_PER_LINK`) leicht anpassbar. Vor dem Einsatz bitte in den offiziellen Unterlagen bestätigen, ebenso das Verhalten von `dir_action=navigate`.
- **Google Maps** rechnet die Strecke selbst: Reihenfolge der Zwischenziele wird übergeben, aber nicht dieselbe Strecke oder Fahrzeit wie in der App garantiert. Bei mehreren Etappen öffnet die Person die nächste selbst.
- **Handy-Zeitfenster** sind eine Näherung: das Modell kennt Fahrzeit, Aufenthalt und Baustellen-Znüni/-Mittag, nicht die eigene Pause und keinen Verkehr. Verspätungen werden angezeigt.
- **ORS-Tageslimit (500)**: nicht teamweit steuerbar; es gibt nur den lokalen Cache, die Zusammenfassung gleicher Anfragen und die Pause nach 429. Ohne Schlüssel oder bei Fehlern rechnet die App mit der Luftlinie (×1.35, 50 km/h) und sagt es an.
- **Mittagspause vor Fixtermin:** Ist der Termin knapp, entfällt die Pause (Meldung) – bewusst «pünktlich geht vor». Wenn du das umgekehrt willst, ist das eine Regel-Entscheidung.
- **Tourguide-Blockade:** Fehlende Kartenpunkte bei bereits geplanten Baustellen oder Terminen mit Adresse verhindern die Rechnung (statt eines zu optimistischen Plans). Rapporte mit Adresse brauchen für die Berechnung eine erreichbare Geokodierung (swisstopo).
- **Offen:** Rapporte in der Handy-Route (Fachfrage), Geokodierung nimmt weiterhin den ersten Treffer, regionale Vorfilterung der Kandidaten, Handy-Karten geben Namen ohne `escH()` aus (bestehend).

## 6. Manuelle Abnahme

**Desktop (Tourguide):**
1. Admin → Tourguide öffnen, Auditor und Woche wählen, rechnen. Prüfen: Plan erscheint, Mittag/Znüni stehen als Pause, keine Fehlermeldung in der Konsole.
2. Baustelle ohne Kartenpunkt für diesen Auditor einplanen → «Tourguide nicht berechnet … ohne Kartenpunkt». Marker setzen → rechnet wieder.
3. Baustelle mit Uhrzeit 12:00 planen (KW-Planung, Uhrzeit) → «Termin 12:00, 60 min zu spät» (Baustellen-Mittag), Mittagspause-Hinweis bei knappem Fixtermin.
4. Dieselbe Woche zweimal rechnen → identische Planung.
5. Viele fällige Baustellen (> 58) → Hinweis «Nicht vollständig geprüft».

**Handy (Mobile-Ansicht, schmaler Bildschirm):**
1. Tagesplan mit 3–7 Stopps öffnen: Kasten oben mit Fahrzeit und Knöpfen «Etappe 1/n» (bei einem Stopp «Route in Google Maps»).
2. «📍 Sortieren» mit GPS: Route «ab Standort», Etappe 1 öffnet Google Maps ab aktuellem Standort mit den Zwischenzielen in dieser Reihenfolge; Etappe 2 beginnt am letzten Ziel von Etappe 1; die letzte Etappe endet an der Startadresse.
3. Stopp mit Uhrzeit setzen (z.B. 08:00 bei einem weiter entfernten): Reihenfolge ändert sich, Verspätungshinweis erscheint bei unmöglichen Zeiten.
4. «✓ Auditiert» bei einem Stopp: die Restroute startet dort («ab …»). Einen anderen Stopp absagen/löschen: die Route startet **nicht** dort.
5. Einzelknopf 🗺️ bei einer Baustelle: Google Maps zeigt das Ziel vom aktuellen Standort, nicht von der Startadresse.
6. Flugmodus: Route wird nach Luftlinie geschätzt, mit Hinweis «Routen-Dienst nicht erreichbar».
