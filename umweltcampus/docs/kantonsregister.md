# Kantonales Quellenregister (ab Version 0.20)

Grundlage: Quellenpaket «UmweltCampus – Alle 21 Kantone» des Nutzers (Link-Recherche 14.11.2026): 21 Kantone mit Deutsch als Amts- oder anerkannter Amtssprache (inkl. BE, FR, GR, VS) und 9 Zusatzquellen.

## Was die App zeigt

- **Einstellungen → Baustellenstandort**: Kanton, bei BE/FR/GR/VS die Sprache der Unterlagen, optional die Standortgemeinde (nur Name, keine Adresse). Gespeichert in `settings.site`; ältere Lernstände laden unverändert, Lernfortschritt bleibt beim Wechsel erhalten.
- **Modulseite → «Vor Ort prüfen»**: zwei getrennte Modi: «Schweizer Grundlagen» (Bundesrecht, Bundes-Vollzugshilfen, Normen aus dem Quellenverzeichnis) und «Zusatzanforderungen Kanton/Gemeinde» (amtliche kantonale Quellen). Keine Vermischung.
- **Kanton & Standort** (Navigation «Nachschlagen»): Quellenkarte je Kanton, Projektcheck für Gewässerschutz, Abfall, Boden, Luft/Lärm, Natur, Bewilligungen und Havarie, Abklärungsraster.

## Regeln

- Jede kantonale Quelle hat den Status **nicht geprüft**, bis eine Fundstelle in einer datierten Originalquelle geprüft ist. Die App leitet aus nicht geprüften Quellen keine Pflichten ab.
- Liegt zu einem Thema nur Bundesrecht vor, lautet das Ergebnis **«Kantonale Regelung nicht verifiziert»**; es wird der allgemeine Einstieg des Kantons genannt.
- Kommunale Vorgaben sind nicht im Register; die App verweist immer auf die Standortgemeinde.
- Keine erfundenen Vorschriften, Schwellen, Termine oder Ansprechpersonen. Kostenpflichtige Normen werden nicht gespeichert.
- Die Links wurden aus dem Register übernommen; ihre Erreichbarkeit und ihr Inhalt wurden in dieser Version **nicht** automatisch geprüft.

## Datenmodell (`src/content/cantons.ts`)

`CantonSource`: `id`, `canton`, `title`, `url`, `issuer`, `themes`, `edition` (Ausgabe/Stand), `retrieved` (Datum der Link-Recherche), `nature` (Portal, Merkblatt, Formular, Erlass), `status` (`nicht_geprueft` | `geprueft`), `checkedRef` (geprüfte Fundstelle mit Fassung), `reviewer` (optional, nur Funktion), `hint`.

Themen sind nur nach dem im Register genannten Thema vergeben (z. B. «Bauabfälle» → Abfall). Ein Thema bedeutet «amtliche Quelle zum Thema gefunden», nicht «Pflichten geprüft».

## Eine Quelle als geprüft eintragen

1. Originaldokument in der aktuellen Fassung lesen.
2. Im Eintrag `status: 'geprueft'` setzen und `checkedRef` ausfüllen, z. B. «Merkblatt X, Ausgabe 2025, Ziff. 3.2».
3. Optional `reviewer` (Funktion, kein Name) und `edition` ergänzen.
4. Der Test «Keine Quelle gilt als geprüft ohne datierte Fundstelle» stellt sicher, dass `checkedRef` vorhanden ist; die Erwartung «derzeit 0 geprüft» in `tests/cantons.test.ts` dann anpassen.

## Tests

- `tests/cantons.test.ts`: 21 Kantone, Metadaten, Status, Mehrsprachigkeit BE/FR/GR/VS, Kantonswechsel, «nicht verifiziert», Gemeinde, Lernstand bleibt erhalten.
- `tests/e2e.cjs`: Standortwahl, Sprachwahl, Gemeinde, «Vor Ort prüfen» in beiden Modi, Quellenkarte, Projektcheck, Kantonswechsel (Desktop und Handy).
