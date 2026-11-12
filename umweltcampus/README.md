# UmweltCampus Bau CH

Lern-App für betrieblichen Umweltschutz und Umweltmanagement auf Schweizer Baustellen
(persönliche Weiterbildung, erste Ausbaustufe).

## Starten

```bash
npm install
npm run dev        # Entwicklungsserver
npm test           # Tests (Lernlogik, Bewertung, Datenintegrität der Inhalte)
npm run build      # dist/index.html (eine Datei) + dist/artifact.html
```

`dist/index.html` läuft ohne Server-Konfiguration (auch per Doppelklick) und auf jedem
statischen Webserver. `dist/artifact.html` ist dieselbe App als claude.ai-Artifact.

## Architektur

- React + TypeScript + Vite, kein Backend. Build = eine einzige HTML-Datei.
- **Inhalte getrennt vom Code**: `src/content/` (Module, Lektionen, Fragen, Karten,
  Fälle, Praxisaufträge, Glossar, Bibliothek, Quellen) – typisiert in `src/content/types.ts`.
  Neues Modul = neue Datensätze in `src/content/<modul>/` und Eintrag in `src/content/index.ts`.
- **Lernlogik** in reinen Funktionen (`src/lib/`): Spaced Repetition (`srs.ts`), Bewertung,
  Kompetenz, Empfehlungen (`learning.ts`), Simulator (`scenario.ts`), Prüfungen (`exam.ts`).
- **Lernstand** = ein versioniertes JSON-Objekt (`src/lib/state.ts`), Export/Import mit
  Prüfung. Für eine spätere Datenbank 1:1 pro Benutzer speicherbar.
- **Plattform** (`src/lib/platform.ts`): localStorage überall; im claude.ai-Artifact
  zusätzlich private Speicherung im Konto, KI-Coach (Claude) und Datei-Export.
  Ohne diese Fähigkeiten arbeitet die App regelbasiert weiter.

## Fachlicher Prüfstatus

Alle Inhalte stehen auf **Entwurf**: aus Fachwissen erstellt, Rechtsartikel sinngemäss,
noch nicht gegen die aktuellen Originalquellen (Fedlex, SIA, kantonale Merkblätter)
geprüft. Freigabe: Quelle prüfen, `lastChecked` und `review` in `src/content/sources.ts`
bzw. am Inhalt setzen.
