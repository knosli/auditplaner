# Anliker Audit Planer

Web-App (PWA) zur Planung und Überwachung von Baustellen-Audits, Personen-Audits,
Beratungen, Rapporten und Ferien der Auditoren. Sprache der Oberfläche: Deutsch (Schweiz).

## Wichtig: `main` ist live

- Die App wird aus `main` unter `/auditplaner/` ausgeliefert (siehe `manifest.json`),
  vermutlich via GitHub Pages. Alles, was auf `main` landet, sehen die Nutzer sofort.
- Änderungen immer auf einem Branch machen und per Pull Request übernehmen.
- Vor jedem PR: App im Browser laden (Desktop- und Mobile-Breite) und in der Konsole
  prüfen, dass keine JavaScript-Fehler auftreten.
- Bei jeder Änderung an der App die Versionsnummer erhöhen, und zwar überall in
  `index.html`: im Header (`<span ... title="Version">v3.26</span>`) und in den Links
  `css/style.css?v=3.26`, `js/merge.js?v=3.26` und `js/app.js?v=3.26`. Der `?v=`-Zusatz
  sorgt dafür, dass Browser nach einem Update keine alte Datei aus dem Cache verwenden.
- Tests für die Zusammenführung: `node tests/merge.test.js` (muss grün sein).
- Keine Browser-Dialoge (`confirm`, `prompt`, `alert`): `askConfirm()`, `askText()`,
  `uiDialog()` verwenden. Beim Löschen einzelner Einträge statt Rückfrage `undoPoint()`
  aufrufen (zeigt «Rückgängig»).

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | HTML-Gerüst: Header, Tabs, Ansichten, Modals (~1'500 Zeilen) |
| `css/style.css` | Alle Styles inkl. Dark Mode (~300 Zeilen) |
| `js/merge.js` | Zusammenführen gleichzeitiger Änderungen (reine Funktionen, getestet) |
| `js/app.js` | Die ganze übrige Logik (~6'900 Zeilen) |
| `supabase/setup.sql` | Einmalige Datenbank-Einrichtung (Admins, Verlauf, Protokoll); wird in der App unter Admin → Anleitung & SQL angezeigt |
| `tests/merge.test.js` | Tests für `js/merge.js` |
| `vendor/` | Bibliotheken (Leaflet, MarkerCluster, Supabase JS, SheetJS) als feste Kopien, siehe `vendor/README.md` |
| `sw.js` | Service Worker: kein Caching, lädt immer frisch vom Netz |
| `manifest.json` | PWA-Manifest (Name, Icons, `start_url`) |
| `icon-*.png`, `apple-touch-icon.png` | App-Icons |

Kein Build-Schritt, kein npm. Bibliotheken liegen in `vendor/` (nicht per CDN laden);
nur Tabler Icons und die Schrift Inter kommen noch von aussen (nur CSS/Schriften).

## Aufbau

`index.html`:
- `<head>`: Mobile-Erkennung und Service-Worker-Registrierung (kleine Inline-Scripts,
  müssen früh laufen), CDN-Styles, dann `css/style.css`
- `<body>`: HTML-Markup, dann Bibliotheken aus `vendor/`, dann `js/merge.js` und
  `js/app.js`, danach weiteres HTML
  (u.a. Anleitungs-Modal)

`js/app.js` ist ein normales (klassisches) Script, kein Modul. Alle Funktionen sind
global; das HTML ruft sie direkt über `onclick="..."` auf.

### Wichtige Bereiche in `js/app.js` (ungefähre Zeilen)

- ~1 Konstanten: Abteilungen (`DEPT_MAP`, `ALL_DEPTS`, `DC`), Auditor-Kürzel,
  PLZ-Koordinaten (`PLZ`, `CFB`) für die Geokodierung
- ~97 `status(e)`: berechnet den Status einer Baustelle
  (inactive, paused, planned, beratung, new, overdue, due, soon, ok); Werkhöfe sind nie `new`
- ~142 `save()` (verzögert) / `saveNow()` / `load()`
- ~147 Dialoge (`uiDialog`, `askConfirm`, `askText`) und Rückgängig (`undoPoint`)
- ~202 Karte (Leaflet): `initMap`, `renderMarkers`, `renderList`, `selEntry` (Detail-Panel)
- ~771 `setView`: Tabs Karte / KW-Planung / Auditoren / Übersicht / Personen-Audits
- ~1102 Ferien und Wunschferien (Gantt). Fixe Ferien: nur Admin erfassen/bearbeiten/löschen;
  Wünsche: eigene oder Admin. Bearbeiten über `uiForm()` (Formular-Dialog) oder Klick auf den Balken
- ~1280 Personen-Audits und Personenregister
- ~1794 Rapporte (inkl. ICS-Export)
- ~2309 KW-Planung / Kalender (`renderKW`, Wochenansicht)
- ~3489 Mobile-Ansicht (`toggleMobileView`, `renderMobPlan`, Routen via OpenRouteService)
  Handy startet in der Mobile-Ansicht (Inline-Script `#mob-hide` + CSS `body:not(.full-view)`); «✕ Normal»
  setzt `body.full-view` + `sessionStorage.ap_full` (gilt für die Sitzung), zurück über «📱 Handy» (`#mob-back`)
  Unter 1024 px darf nichts breiter als der Bildschirm sein (Tabs/Statistik scrollen seitlich), sonst zoomt
  das Handy heraus. `manifest.json`: `orientation: any` (Querformat erlaubt)
- ~4247 Login/Auth (Supabase Auth), Präsenz-Anzeige
- ~4642 Einstellungen & Regeln (`S(k)` liest eine Einstellung; Regeltexte `rulesHTML()`, Druck `printRules()`)
- ~4801 Tourguide / Tagesablauf-Simulation (`tg*`). Auswahl in `tgCompute`: nur rot/orange,
  «Ort ausschöpfen» (`harvest`, Umkreis `tg_harvest_min`), neue Gegend nur wenn sie ganz
  Platz hat (`mayOpen`), Gleichstand ±`tg_tie_min` → Grösse/★/Fälligkeit
  Ampel gilt am Audit-Tag (`status(e,now)`, `x.urgDay[d]`), keine 2. Fahrt in dieselbe Gegend pro
  Woche, lange rot (`tg_force_days`) immer; Nachbearbeitung `tg_post_min` pro Baustelle zählt zur Tageslänge (`tgSim` → `post`), Wartezeiten
  werden angerechnet (`postInWait`); Tag mit flexiblen Stopps beginnt immer zum Tagesbeginn;
  Toleranz: Tag ≤ `tg_day_tol` über `tg_day_hours`, Überzeit aller Tage zusammen ≤ `tg_week_tol` (`ok`/`weekOver` in `tgCompute`);
  `tg_day_start` = Beginn des ersten Audits (Abfahrt um die Fahrzeit früher, `tgSim`);
  Neue Baustellen (Status `new`) wie orange, sobald Personal (`tg_new_due`, bool, `urgRaw` in `tgCandidates`);
  Gleicher Ort (`tgLocKey`, Koordinaten 4 Stellen): gemeinsamer Rundgang, Dauer = `tgMinForCount`(Personen aller
  Einheiten), nur die Differenz pro weiterer Einheit (`sched[].joint`); Nachbearbeitung pro Einheit;
  Gelbe (Stufe 2, `tg_yellow_harvest`) nur zum Schluss im Umkreis (`harvest(d,true)`); Umweg-Bonus für grosse Baustellen
  (`tg_size_bonus`, `sizeBonus`); neue Gegend auch teilweise, wenn kein anderer freier Tag sie ganz aufnimmt (`mayOpen`);
  Reihenfolge `tgCompute`: harvest um Fixes → «über tg_force_days rot» (`isForce`) → pro Farbe Region, dann Rest → gelbe am Weg;
  Ausgleich verschiebt nur auf Tage, an denen die Baustelle rot/orange ist (`mayMove`). Einstellungen: `SETTINGS_ADV` = «Erweitert»;
  Hauptregion pro Auditor `auditorMeta[a].regionKm` + `regionPlace` (Umkreis um Ort, leer = Startadresse; `tgInRegion`/`tgRegionCenter`/`tgGeocodeRegion`): pro Farbe erst Region, dann Rest;
  Einmaliger Termin: Planung mit `p.time` 'HH:MM' (`planTimeMin`/`planTimeTag`, Planen-Formular `plan-time`, Popup `pop-time`)
  → fixe Uhrzeit im Tourguide (`fixT`, geht `fixVisit` vor);
  Fester Besuchstermin pro Baustelle `e.fixVisit={days:[0..4],time:'HH:MM'}` (`fvTime`/`fvDayOK`/`fvLabel`): nur an diesen
  Tagen vorgeschlagen, im Tag als fixe Uhrzeit (`_tgCalc.fixT`, `tgTm`); KW-Planung übernimmt den Wochentag;
  Znüni der Baustellen `tg_znueni_start`+`tg_znueni_dur`: kein Audit-Beginn; laufendes darf durch (`tg_znueni_through`, bool);
  Audit-Dauer bis `tg_audit_flex` kürzer statt in eine Pause zu laufen (`sched[].short`); Einstellung mit `bool:1` = Häkchen;
  Baustellen-Mittag `tg_lunch_start`…+`tg_lunch_dur` = nie ein Audit (`blocked` in `tgSim`); eigene Pause flexibel
  ± `tg_lunch_flex` (z.B. 11:45–12:45, dann Fahrt, Audit ab 13:00); Routen-Schlüssel: `setOrsKey`/`orsTestKey`
  Personal für GENAU die geplante KW (`tgPersonalState`/`persForKW`); fehlt die Liste noch: «vorläufig»
  ('prov', letzte Liste ≤2 Wochen alt + Woche davor auch Personal), Nachkontrolle nach dem Import
  (`checkPlansAfterImport`). Bauferien pro Abteilung in `deptMeta[d].bauferien` (`bauferienAt`,
  Admin → Abteilungen verwalten → 🏖) sperren Tourguide-Tage und markieren Planungen. Nie Werkhöfe,
  ohne Kartenpunkt → Liste `noGeo`, kein Audit-Beginn nach `tg_last_start`, «📞 wenig Personal»
  bis `pi_review_max`. «Pausiert bis» endet automatisch (`autoResumeExpired`, `pauseOverAt`)
- ~5393 Personal-Import (JSON), Sammelbox, temporäre Mitarbeitende
  Kundendienst-Liste `deptMeta._piIgnore` (PSP exakt, `pspall` = PSP inkl. aller Unternummern, oder
  Stichwort, optional pro Einheit;
  `piIgnoreMatch`, Admin → Kundendienst-Liste): greift nur bei Einträgen OHNE passende Baustelle →
  Bucket `kundendienst` statt `unknown`. Sammelbox: `sammelboxClean()` (Doppelte zusammenführen)
  Erkannte Kundendienst-Einträge: `deptMeta._piKdSeen` (`piKdRecord` bei «Übernehmen», 8 Wochen)
  mit Verlauf `hist` (12 Wochen, `piKdHist`); «🔔 Audit prüfen» ab `kd_streak_weeks` Wochen am Stück
  mit Personal (`piKdStreak`/`piKdFlag`), Hinweis nach dem Import; aus der Sammelbox gemerkte sofort
  (`piKdFromBox` in `sammelboxClean`)
  Bestehende Baustelle → Kundendienst: Bearbeiten → «🔧 Ist Kundendienst» (`siteToKundendienst`, Admin)
  Personal-Übersicht (Admin): `deptMeta._piWeeks` [{kw,year,u:{quelle:[total,kd,temp,orte]},t,tempN}] pro Import
  (`piWeekRecord`, Teil-Importe ersetzen nur ihre Einheiten), Anzeige `openPersonalWeeks`/`piWeekRows`
  (ältere Wochen rückwirkend aus `personalHistory`). Temporäre = separate Liste, nicht in den
  Personenzahlen der Einträge → im Total dazugezählt (`total` = `own` + `tempN`)
  «Kein Audit» `e.noAudit` (Status `noaudit`, Bearbeiten-Häkchen `f-noaudit`; NICHT dasselbe wie «dauerhaft ausgeschlossen» im Import =
  `excludeFromPersonalReview` + pausiert; v3.25 hatte das fälschlich umgewandelt, `pauseTrack` macht es rückgängig): läuft, Personal wird erfasst (Import-Bucket `excluded`), keine Ampel, nie Tourguide/auto-inaktiv
  Pause → inaktiv: `e.pausedAt` (automatisch in `pauseTrack` beim Speichern), nach `pause_to_inactive` Tagen ohne
  «pausiert bis» inaktiv (`autoInactivateLongPaused` in `autoResumeExpired`); `markInactive` setzt `inactiveAt`/`inactiveReason`/
  `extDone`; Admin → «Inaktiv gesetzt (Audit-App)» (`openInactList`, PSP kopieren, abhaken)
  «+ Neue Baustelle» aus Import/Sammelbox/Kundendienst: Personal wird beim Speichern übernommen
  (`piNewSitePending` → `window._newSitePersonal` → `piApplyNewSite` in `saveEntry`); `sbAssign` ebenfalls
- ~5969 Supabase-Verbindung (`sbFetch`, `sbInit`)
- ~6026 Sync (`SB_FIELDS`, `sbPush`, `sbPull`, `sbMergeRemote`, Speicher-Status)
- ~6265 Admin: Anleitung & SQL, Änderungsprotokoll, Verlauf & Wiederherstellen
- ~6513 Excel-Export, ~6591 Übersichtstabelle, ~6724 ICS-Export
- ~6876 `renderAll()`, ~6889 Initialisierung (`DOMContentLoaded`)

## Kalenderwochen

KW-Nummern sind in der App **fortlaufend**, bezogen auf das aktuelle ISO-Jahr (53/54 = KW 1/2 des
nächsten Jahres, 0 = letzte KW des Vorjahres). `kwToDate(kw)` rechnet das richtig um. Für Anzeige
und Speichern: `kwNum(kw)` (echte KW), `kwYear(kw)`, `kwLabel(kw)` (mit Jahr, wenn nicht das
aktuelle), `kwIdx(datum)` (Datum → fortlaufende KW), `kwFromInput(n)` (eingetippte KW). Nie
KW-Nummern auf 1–52 begrenzen oder mit `dateToKW()` vergleichen, ohne das Jahr zu beachten.

## Daten und Speicherung

- Zentrale Variablen: `data` (Baustellen), `plans`, `auditors`, `ferien`,
  `ferienWunsch`, `personAudits`, `persons`, `beratPlan`, `rapporte`, `tlog` (Verlauf),
  `auditorMeta`, `auditorColors`, `customDepts`/`deptMeta`.
- Lokal: localStorage als Kopie für den schnellen Start (`saveLocal()`), Hauptschlüssel
  `anliker_v4` (`SK`) plus weitere `anliker_*`-Keys (`LOCAL_DATA_KEYS`). Beim Abmelden
  werden sie gelöscht; nach dem Login gilt immer der Server-Stand.
- Team-Sync: Supabase-Tabelle `audit_state`, **eine einzige Zeile `id=1`**, jede
  Datenliste als JSON-Text in einer eigenen Spalte (Liste der Felder: `SB_FIELDS`).
- Speichern mit Konflikterkennung: Geschrieben wird nur, wenn `updated_at` noch dem
  zuletzt gelesenen Stand (`sbBase`) entspricht. Sonst wird der Server-Stand geholt, mit
  den eigenen Änderungen zusammengeführt (`js/merge.js`, 3-Wege-Merge nach `id`) und
  erneut gespeichert. Abgleich alle 30 s (zuerst nur `updated_at`).
- Neue Datenfelder: Eintrag in `SB_FIELDS` (mit `opt:1`) + neue Spalte in Supabase
  (in `supabase/setup.sql` als `add column if not exists` ergänzen). Fehlende Spalten erkennt die
  App beim Lesen (`sbMissingCols`), schreibt ohne sie und warnt (Admin-Toast, Anleitung, Sammelbox,
  Abmelden) – diese Daten liegen dann nur lokal.
- Weitere Tabellen (aus `supabase/setup.sql`): `app_admins` + Funktion `is_app_admin()`,
  `audit_state_history` (automatischer Verlauf per Trigger), `audit_log`
  (Änderungsprotokoll, von der App nach jedem Speichern geschrieben), `presence`.
- RLS ist auf allen Tabellen aktiv; Zugriff nur für angemeldete Benutzer, Verlauf und
  Protokoll nur für Admins. Löschen der Zeile `audit_state` ist nicht erlaubt.

## Sicherheit

- Rollen: Voll-Admin = `ADMIN_EMAILS` im Code oder Tabelle `app_admins` (Funktion
  `is_app_admin()`). Nur diese Prüfung zählt; `auditorMeta[..].fullAdmin` wird ignoriert,
  weil alle angemeldeten Benutzer die Auditor-Angaben ändern können.
  Sekundär-Admin (`secondaryAdmin`, nur Statistik-Anzeige) wird im Planer vergeben.
- Texte aus Datenbank, Dateien, Login-Namen, Präsenz und Adress-Suche laufen durch
  `mgSafe()` (js/merge.js): spitze Klammern, Anführungszeichen, Apostroph, Backtick und
  Backslash werden durch harmlose, ähnlich aussehende Zeichen ersetzt. Grund: Die App baut HTML mit Template-Strings und `innerHTML`.
  Neue Datenquellen ebenfalls durch `mgSafe()` schicken (bei HTML-Ausgabe sonst `escH()`).
- Selbst-Registrierung in Supabase muss ausgeschaltet bleiben (Authentication →
  Sign In / Providers).

## Vorsicht

- Datenformat nicht brechen: Bestehende Daten in localStorage und Supabase müssen nach
  einer Änderung weiterhin geladen werden können. Felder nicht umbenennen oder entfernen.
- Admin-Funktionen wie «Alles zurücksetzen» oder «Alle Personen löschen» wirken über
  den Sync auf alle Nutzer (Wiederherstellung über Admin → Verlauf & Wiederherstellen).
- Excel wird nur noch exportiert, nicht mehr importiert (Import wurde entfernt).
- Die App muss auf Desktop und auf dem Handy (Mobile-Ansicht) funktionieren.
