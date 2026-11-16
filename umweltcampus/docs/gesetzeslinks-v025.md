# Gesetzes- und Artikel-Links (Version 0.25)

Ziel: Gesetzesstellen, die in der App zitiert oder «sinngemäss» wiedergegeben werden, mit einem Klick in der **geltenden amtlichen Fassung** nachschlagen. Der Gesetzestext wird bewusst **nicht** in die App kopiert (er ändert sich; eine veraltete Kopie wäre riskanter als ein Link). Massgebend ist immer die Fassung auf Fedlex.

## Was neu ist

| Wo | Was |
|---|---|
| Lektionen, Fragen, Erklärungen, Rechtsnatur-Hinweise | Zitate wie «Art. 2 USG», «Art. 33 Abs. 2 USG», «Art. 59a USG», «Art. 6bis NHG» sind Links. Sie öffnen Fedlex in einem neuen Fenster **direkt beim Artikel** (Sprungmarke `#art_2`, `#art_59_a`, `#art_6_bis`). Bei Bereichen («Art. 60–61 USG») springt der Link zum ersten Artikel. |
| Fachbegriffe (Begriffsfenster) | Die Quellenkürzel unter der Erklärung (z. B. «USG ↗») sind Links zur Quelle bzw. zum Erlass auf Fedlex. |
| Quellenregister | 15 Erlasse, die bisher nur mit SR-Nummer geführt waren, haben jetzt die amtliche Fedlex-Adresse: BGF, VeVA, LVA, BV, NHG, WaG, RPG, AltlV, FrSV, UVPV, BöB, DSG, ChemG, ChemV, StFV. |

## Prüfung

- Adressen über die Fedlex-Datenschnittstelle (SPARQL, SR-Nummer → geltende Fassung) ermittelt und am Titel des Erlasses im amtlichen Text kontrolliert (16.11.2026).
- Sprungmarken: im amtlichen HTML-Text vorhanden (`art_2`, `art_59_a`, `art_59_a_bis` …); im Browser geprüft, dass fedlex.admin.ch bei `#art_2`, `#art_33` und `#art_59_a` direkt zum Artikel springt.
- Kein Link für: VBBo und MaLV (über die Schnittstelle keine Fassung gefunden), Normen (SIA, ISO – kostenpflichtig) und Erlasse ohne Fedlex-Adresse. Ein Zitat ohne Erlassabkürzung (z. B. «Art. 5 Abs. 1») wird nicht verlinkt.
- Der fachliche Prüfstatus der Inhalte ändert sich dadurch nicht («Entwurf»). Ein Link bedeutet nicht, dass die Wiedergabe in der App am Wortlaut geprüft ist – dafür gilt weiterhin der Hinweis in der Quelle.

## Tests

- Neu `tests/lawlinks.test.ts`: Adressen der Hauptgesetze, Sprungmarken (Buchstaben, bis), keine Links ohne Erlass, nur ELI-Adressen der geltenden Fassung.
- Browser-Test: «Art. 2 USG» in Modul 1, Lektion 1 verlinkt auf `…/1984/1122_1122_1122/de#art_2`.
- Ergebnis: 268 Unit-Tests, 333 Browser-Prüfungen (Desktop, Tablet, Smartphone) bestanden, keine Konsolenfehler.
