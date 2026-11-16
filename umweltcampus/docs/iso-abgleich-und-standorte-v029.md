# ISO-Abgleich mit Kurzfassungen und mehrere Baustellenstandorte (Version 0.29)

## 1. Abgleich ISO 14001:2015 und ISO 9001:2015

Grundlage (von der Nutzerin bzw. dem Nutzer bereitgestellt, nicht im Repository abgelegt):
- «Kurzfassung ISO 14001:2015», SAQ-QUALICON AG, Olten, V1.2 – beruht auf ISO 14001:2015 (D) vom September 2015; laut Herausgeberin stimmen die Kapitelüberschriften wörtlich mit der Norm überein, die übrigen Texte sind vereinfacht.
- «Kurzfassung ISO 9001:2015», SAQ-QUALICON AG, V1.0 – beruht auf EN ISO 9001:2015 (D).

Es handelt sich um eine **Sekundärquelle**, nicht um den Normtext. Aus urheberrechtlichen Gründen wurde kein Text übernommen; verglichen wurden nur Gliederung, Nummern und Abschnittstitel.

| In der App zitiert (ISO 14001:2015) | Titel laut Kurzfassung | Ergebnis |
|---|---|---|
| 4–10 (Kapitelübersicht Modul 10) | Kontext der Organisation, Führung, Planung, Unterstützung, Betrieb, Bewertung der Leistung, Verbesserung | stimmt |
| 6.1.1 / 6.1.2 / 6.1.3 | Allgemeines / Umweltaspekte / Bindende Verpflichtungen | stimmt |
| 6.2 | Umweltziele und Planung zu deren Erreichung | stimmt |
| 8.1 / 8.2 | Betriebliche Planung und Steuerung / Notfallvorsorge und Gefahrenabwehr | stimmt |
| 9.1 / 9.1.1 / 9.1.2 | Überwachung, Messung, Analyse und Bewertung / Allgemeines / Bewertung der Einhaltung von Verpflichtungen | stimmt |
| 9.2 / 9.3 | Internes Audit / Managementbewertung | stimmt |
| 10.2 / 10.3 | Nichtkonformität und Korrekturmassnahmen / Fortlaufende Verbesserung | stimmt |
| Begriff «bindende Verpflichtungen» | so in der deutschen Fassung 2015 | stimmt |

ISO 9001:2015: gleiche Kapitelstruktur 4–10 bestätigt. Ergänzt in Modul 10, Lektion 5: Im Detail gibt es Unterschiede, z. B. hat ISO 9001:2015 einen eigenen Abschnitt 6.3 «Planung von Änderungen».

**Weiterhin offen:** Die Ausgabe **ISO 14001:2026** (gültig, Übergangsfrist für Zertifikate) ist nicht verglichen. Die Kurzfassungen beziehen sich auf 2015. Die Vermerke «Ausgabe 2026 nicht verglichen» bleiben deshalb stehen.

Neuer Regressionstest `tests/iso.test.ts`: Jede in der App zitierte ISO-14001-Abschnittsnummer muss in der Gliederung 2015 vorkommen.

## 2. Mehrere Baustellenstandorte

Anlass: Baustellen in mehreren Kantonen. Bisher konnte nur ein Standort gespeichert werden.

- **Meine Baustellen:** In den Einstellungen und auf «Kanton & Standort» lassen sich mehrere Standorte (Kanton, optional Gemeinde) merken und entfernen.
- **Wechseln mit einem Tipp:** In «Vor Ort prüfen» jedes Moduls erscheinen die gemerkten Standorte als Auswahl (ab zwei Standorten); ein Tipp zeigt sofort die Quellen dieses Kantons.
- **Datenschutz:** Gespeichert werden nur Kanton, Sprache und Gemeindename, keine Adresse; höchstens 30 Standorte.
- **Lernstände:** unverändert. Bei älteren Lernständen wird der bisher gewählte Kanton automatisch als erster gemerkter Standort übernommen.

## Tests
Unit-Tests: 274 bestanden (neu: ISO-Abschnittsnummern, Übernahme und Bereinigung der Standortliste). Browser-Test: 372 Prüfungen bestanden (neu: Standorte merken und in «Vor Ort prüfen» wechseln), keine Konsolenfehler.
