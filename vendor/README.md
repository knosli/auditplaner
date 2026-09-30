# Externe Bibliotheken (fest eingebunden)

Diese Dateien sind unveränderte Kopien aus den offiziellen npm-Paketen. Sie liegen im
Repository statt auf fremden Servern (CDN): Der Planer funktioniert so auch, wenn ein CDN
ausfällt, und niemand kann den Code unterwegs austauschen.

| Ordner | Paket | Version | Lizenz |
|---|---|---|---|
| `leaflet/` | leaflet | 1.9.4 | BSD-2-Clause |
| `markercluster/` | leaflet.markercluster | 1.5.3 | MIT |
| `supabase/` | @supabase/supabase-js (`dist/umd/supabase.js`) | 2.117.2 | MIT |
| `xlsx/` | xlsx / SheetJS (`dist/xlsx.full.min.js`) | 0.18.5 | Apache-2.0 |

Aktualisieren: neue Version per `npm pack <paket>@<version>` holen, Datei ersetzen,
Version hier und in `index.html` (`?v=`) anpassen, App testen.
