# Anliker Audit Planer

Web-App (PWA) zur Planung und Überwachung von Baustellen-Audits, Personen-Audits,
Beratungen, Rapporten und Ferien der Auditoren. Sprache der Oberfläche: Deutsch (Schweiz).

## Wichtig: `main` ist live

- Die App wird aus `main` unter `/auditplaner/` ausgeliefert (siehe `manifest.json`),
  vermutlich via GitHub Pages. Alles, was auf `main` landet, sehen die Nutzer sofort.
- Änderungen immer auf einem Branch machen und per Pull Request übernehmen.
- Vor jedem PR: App im Browser laden (Desktop- und Mobile-Breite) und in der Konsole
  prüfen, dass keine JavaScript-Fehler auftreten.
- Bei jeder Änderung an der App die Versionsnummer erhöhen, und zwar an drei Stellen
  in `index.html`: im Header (`<span ... title="Version">v2.87</span>`) und in den
  Links `css/style.css?v=2.87` und `js/app.js?v=2.87`. Der `?v=`-Zusatz sorgt dafür,
  dass Browser nach einem Update nicht eine alte CSS/JS-Datei aus dem Cache verwenden.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | HTML-Gerüst: Header, Tabs, Ansichten, Modals (~1'500 Zeilen) |
| `css/style.css` | Alle Styles inkl. Dark Mode (~300 Zeilen) |
| `js/app.js` | Die ganze Logik (~6'600 Zeilen) |
| `sw.js` | Service Worker: kein Caching, lädt immer frisch vom Netz |
| `manifest.json` | PWA-Manifest (Name, Icons, `start_url`) |
| `icon-*.png`, `apple-touch-icon.png` | App-Icons |

Kein Build-Schritt, kein npm. Externe Bibliotheken kommen per CDN:
Supabase JS, Leaflet (+ MarkerCluster), SheetJS (`xlsx`), Tabler Icons, Google Font Inter.

## Aufbau

`index.html`:
- `<head>`: Mobile-Erkennung und Service-Worker-Registrierung (kleine Inline-Scripts,
  müssen früh laufen), CDN-Styles, dann `css/style.css`
- `<body>`: HTML-Markup, dann CDN-Scripts, dann `js/app.js`, danach weiteres HTML
  (u.a. Anleitungs-Modal)

`js/app.js` ist ein normales (klassisches) Script, kein Modul. Alle Funktionen sind
global; das HTML ruft sie direkt über `onclick="..."` auf.

### Wichtige Bereiche in `js/app.js` (ungefähre Zeilen)

- ~1 Konstanten: Abteilungen (`DEPT_MAP`, `ALL_DEPTS`, `DC`), Auditor-Kürzel,
  PLZ-Koordinaten (`PLZ`, `CFB`) für die Geokodierung
- ~113 `status(e)`: berechnet den Status einer Baustelle
  (inactive, paused, planned, beratung, new, overdue, due, soon, ok)
- ~158 `save()` / `saveNow()` / `load()`: Speichern in localStorage + Supabase-Push
- ~176 Karte (Leaflet): `initMap`, `renderMarkers`, `renderList`, `selEntry` (Detail-Panel)
- ~745 `setView`: Tabs Karte / KW-Planung / Auditoren / Übersicht / Personen-Audits
- ~1076 Ferien und Wunschferien (Gantt)
- ~1254 Personen-Audits und Personenregister
- ~1799 Rapporte (inkl. ICS-Export)
- ~2312 KW-Planung / Kalender (`renderKW`, Wochenansicht)
- ~3161 Automatische Verteilung (`openDistribute`)
- ~3503 Mobile-Ansicht (`toggleMobileView`, `renderMobPlan`, Routen via OpenRouteService)
- ~4261 Login/Auth (Supabase Auth), Präsenz-Anzeige
- ~4655 Einstellungen & Regeln (`S(k)` liest eine Einstellung)
- ~4813 Tourguide / Tagesablauf-Simulation (`tg*`)
- ~5405 Personal-Import aus Excel, Sammelbox, temporäre Mitarbeitende
- ~5982 Supabase-Sync (`sbFetch`, `sbPush`, `sbPull`, Polling alle 30 s)
- ~6226 Excel-Export, ~6304 Übersichtstabelle, ~6437 ICS-Export
- ~6589 `renderAll()`, ~6602 Initialisierung (`DOMContentLoaded`)

## Daten und Speicherung

- Zentrale Variablen: `data` (Baustellen), `plans`, `auditors`, `ferien`,
  `ferienWunsch`, `personAudits`, `persons`, `beratPlan`, `rapporte`, `tlog` (Verlauf),
  `auditorMeta`, `auditorColors`, `customDepts`/`deptMeta`.
- Lokal: localStorage, Hauptschlüssel `anliker_v4` (`SK`) plus weitere `anliker_*`-Keys.
- Team-Sync: Supabase-Tabelle `audit_state`, **eine einzige Zeile `id=1`**, jede
  Datenliste als JSON-String in einer eigenen Spalte. `sbPush` schreibt alles,
  `sbPull` liest alles (letzter Schreiber gewinnt). Tabelle `presence` für Online-Anzeige.
- Neue Datenfelder brauchen eine neue Spalte in Supabase; `sbPush` hat dafür einen
  Fallback ohne die neueren Spalten.

## Vorsicht

- Datenformat nicht brechen: Bestehende Daten in localStorage und Supabase müssen nach
  einer Änderung weiterhin geladen werden können. Felder nicht umbenennen oder entfernen.
- Admin-Funktionen wie «Alles zurücksetzen» oder «Alle Personen löschen» wirken über
  den Sync auf alle Nutzer.
- Die App muss auf Desktop und auf dem Handy (Mobile-Ansicht) funktionieren.
