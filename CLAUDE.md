# Anliker Audit Planer

Web-App (PWA) zur Planung und Überwachung von Baustellen-Audits, Personen-Audits,
Beratungen, Rapporten und Ferien der Auditoren. Sprache der Oberfläche: Deutsch (Schweiz).

## Wichtig: `main` ist live

- Die App wird aus `main` unter `/auditplaner/` ausgeliefert (siehe `manifest.json`),
  vermutlich via GitHub Pages. Alles, was auf `main` landet, sehen die Nutzer sofort.
- Änderungen immer auf einem Branch machen und per Pull Request übernehmen.
- Vor jedem PR: App im Browser laden (Desktop- und Mobile-Breite) und in der Konsole
  prüfen, dass keine JavaScript-Fehler auftreten.
- Bei jeder Änderung an der App die Versionsnummer im Header erhöhen
  (`<span ... title="Version">v2.86</span>` in `index.html`).

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Die ganze App: HTML, CSS und JavaScript in einer Datei (~8'400 Zeilen) |
| `sw.js` | Service Worker: kein Caching, lädt immer frisch vom Netz |
| `manifest.json` | PWA-Manifest (Name, Icons, `start_url`) |
| `icon-*.png`, `apple-touch-icon.png` | App-Icons |

Kein Build-Schritt, kein npm. Externe Bibliotheken kommen per CDN:
Supabase JS, Leaflet (+ MarkerCluster), SheetJS (`xlsx`), Tabler Icons, Google Font Inter.

## Aufbau von `index.html`

- Zeilen ~1–337: `<head>`, Mobile-Erkennung, Service-Worker-Registrierung, `<style>` (CSS)
- Zeilen ~339–1381: HTML-Markup (Header mit Admin-Menü, Tabs, Statistik-Leiste,
  Ansichten, Modals)
- Zeilen ~1386–8014: ein grosser `<script>`-Block mit der ganzen Logik
- Zeilen ~8015–8400: weiteres HTML (u.a. Anleitungs-Modal)

Alle Funktionen sind global; das HTML ruft sie direkt über `onclick="..."` auf.

### Wichtige Bereiche im Script (ungefähre Zeilen)

- ~1387 Konstanten: Abteilungen (`DEPT_MAP`, `ALL_DEPTS`, `DC`), Auditor-Kürzel,
  PLZ-Koordinaten (`PLZ`, `CFB`) für die Geokodierung
- ~1499 `status(e)`: berechnet den Status einer Baustelle
  (inactive, paused, planned, beratung, new, overdue, due, soon, ok)
- ~1544 `save()` / `saveNow()` / `load()`: Speichern in localStorage + Supabase-Push
- ~1562 Karte (Leaflet): `initMap`, `renderMarkers`, `renderList`, `selEntry` (Detail-Panel)
- ~2131 `setView`: Tabs Karte / KW-Planung / Auditoren / Übersicht / Personen-Audits
- ~2462 Ferien und Wunschferien (Gantt)
- ~2640 Personen-Audits und Personenregister
- ~3185 Rapporte (inkl. ICS-Export)
- ~3698 KW-Planung / Kalender (`renderKW`, Wochenansicht)
- ~4547 Automatische Verteilung (`openDistribute`)
- ~4889 Mobile-Ansicht (`toggleMobileView`, `renderMobPlan`, Routen via OpenRouteService)
- ~5647 Login/Auth (Supabase Auth), Präsenz-Anzeige
- ~6041 Einstellungen & Regeln (`S(k)` liest eine Einstellung)
- ~6199 Tourguide / Tagesablauf-Simulation (`tg*`)
- ~6791 Personal-Import aus Excel, Sammelbox, temporäre Mitarbeitende
- ~7368 Supabase-Sync (`sbFetch`, `sbPush`, `sbPull`, Polling alle 30 s)
- ~7612 Excel-Export, ~7690 Übersichtstabelle, ~7823 ICS-Export
- ~7975 `renderAll()`, ~7988 Initialisierung (`DOMContentLoaded`)

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
