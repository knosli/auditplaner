// Schritt-Reihenfolge der Lektionen in Lernstand-Version 1 (App 0.1).
// Version 1 speicherte den Fortschritt als Positionen (Index) der Schritte.
// Ab Version 2 werden stabile Schritt-IDs gespeichert. Diese Tabelle übersetzt
// alte Positionen in IDs. NICHT ÄNDERN – sie beschreibt den historischen Stand.
export const LEGACY_V1_STEPS: Record<string, string[]> = {
  'm2-l1': ['m2-l1-situation', 'm2-l1-quiz', 'm2-l1-explain', 'm2-l1-diagram', 'm2-l1-explain-2', 'm2-l1-example', 'm2-l1-deep', 'm2-l1-decision', 'm2-l1-review', 'm2-l1-practice', 'm2-l1-summary', 'm2-l1-sources'],
  'm2-l2': ['m2-l2-situation', 'm2-l2-quiz', 'm2-l2-explain', 'm2-l2-diagram', 'm2-l2-explain-2', 'm2-l2-example', 'm2-l2-deep', 'm2-l2-decision', 'm2-l2-review', 'm2-l2-practice', 'm2-l2-summary', 'm2-l2-sources'],
  'm2-l3': ['m2-l3-situation', 'm2-l3-quiz', 'm2-l3-explain', 'm2-l3-diagram', 'm2-l3-explain-2', 'm2-l3-diagram-2', 'm2-l3-example', 'm2-l3-deep', 'm2-l3-decision', 'm2-l3-feynman', 'm2-l3-review', 'm2-l3-practice', 'm2-l3-summary', 'm2-l3-sources'],
  'm2-l4': ['m2-l4-situation', 'm2-l4-quiz', 'm2-l4-explain', 'm2-l4-explain-2', 'm2-l4-example', 'm2-l4-deep', 'm2-l4-decision', 'm2-l4-review', 'm2-l4-practice', 'm2-l4-summary', 'm2-l4-sources'],
  'm2-l5': ['m2-l5-situation', 'm2-l5-quiz', 'm2-l5-explain', 'm2-l5-diagram', 'm2-l5-explain-2', 'm2-l5-example', 'm2-l5-deep', 'm2-l5-decision', 'm2-l5-review', 'm2-l5-practice', 'm2-l5-summary', 'm2-l5-sources'],
  'm2-l6': ['m2-l6-situation', 'm2-l6-quiz', 'm2-l6-explain', 'm2-l6-diagram', 'm2-l6-explain-2', 'm2-l6-example', 'm2-l6-deep', 'm2-l6-decision', 'm2-l6-feynman', 'm2-l6-review', 'm2-l6-practice', 'm2-l6-summary', 'm2-l6-sources'],
};
