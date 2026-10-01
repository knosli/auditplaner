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
  `index.html`: im Header (`<span ... title="Version">v2.91</span>`) und in den Links
  `css/style.css?v=2.91`, `js/merge.js?v=2.91` und `js/app.js?v=2.91`. Der `?v=`-Zusatz
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
  (inactive, paused, planned, beratung, new, overdue, due, soon, ok)
- ~142 `save()` (verzögert) / `saveNow()` / `load()`
- ~147 Dialoge (`uiDialog`, `askConfirm`, `askText`) und Rückgängig (`undoPoint`)
- ~202 Karte (Leaflet): `initMap`, `renderMarkers`, `renderList`, `selEntry` (Detail-Panel)
- ~771 `setView`: Tabs Karte / KW-Planung / Auditoren / Übersicht / Personen-Audits
- ~1102 Ferien und Wunschferien (Gantt)
- ~1280 Personen-Audits und Personenregister
- ~1794 Rapporte (inkl. ICS-Export)
- ~2309 KW-Planung / Kalender (`renderKW`, Wochenansicht)
- ~3147 Automatische Verteilung (`openDistribute`)
- ~3489 Mobile-Ansicht (`toggleMobileView`, `renderMobPlan`, Routen via OpenRouteService)
- ~4247 Login/Auth (Supabase Auth), Präsenz-Anzeige
- ~4642 Einstellungen & Regeln (`S(k)` liest eine Einstellung)
- ~4801 Tourguide / Tagesablauf-Simulation (`tg*`). Auswahl in `tgCompute`: nur rot/orange,
  «Ort ausschöpfen» (`harvest`, Umkreis `tg_harvest_min`), neue Gegend nur wenn sie ganz
  Platz hat (`mayOpen`), Gleichstand ±`tg_tie_min` → Grösse/★/Fälligkeit
  Ampel gilt am Audit-Tag (`status(e,now)`, `x.urgDay[d]`), keine 2. Fahrt in dieselbe Gegend pro
  Woche, lange rot (`tg_force_days`) immer; Routen-Schlüssel: `setOrsKey`/`orsTestKey`
- ~5393 Personal-Import (JSON), Sammelbox, temporäre Mitarbeitende
- ~5969 Supabase-Verbindung (`sbFetch`, `sbInit`)
- ~6026 Sync (`SB_FIELDS`, `sbPush`, `sbPull`, `sbMergeRemote`, Speicher-Status)
- ~6265 Admin: Anleitung & SQL, Änderungsprotokoll, Verlauf & Wiederherstellen
- ~6513 Excel-Export, ~6591 Übersichtstabelle, ~6724 ICS-Export
- ~6876 `renderAll()`, ~6889 Initialisierung (`DOMContentLoaded`)

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
  (in `supabase/setup.sql` ergänzen). Fehlen Spalten, speichert `sbWrite` ohne sie.
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
