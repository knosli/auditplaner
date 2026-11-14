# Umsetzung der Gesamtprüfung V0.17 (14.11.2026)

Grundlage: Prüfpaket «umweltcampus_gesamtpruefung_v017» (Durchgänge 1–10, Korrekturauftrag). Die Prüfberichte sind externes KI-Feedback, keine Rechtsfreigabe. Prüfstatus aller Inhalte bleibt **Entwurf**; es wurde keine fachliche oder betriebliche Freigabe gesetzt.

Stand dieses Dokuments: **Phase 1 umgesetzt** (Version 0.18, Bewertungsfassung 6). Phasen 2–4 folgen.

## Phase 1 – Sicherheit und fachlich gefährliche Bewertung

Lernstände bleiben erhalten. Frühere Antworten, Fallläufe und Prüfungen zu den geänderten Inhalten werden nicht neu benotet, sondern als «nach früherer Bewertungsfassung» gekennzeichnet (`src/lib/versioning.ts`, `RESCORED_V6_*`). Geänderte Fragen tragen `rev: 6`.

| ID | Alte Aussage / Wertung | Neuer Text / Wertung | Begründung | Quelle und Fassung | Prüfergebnis | Verbleibender Prüfbedarf |
|---|---|---|---|---|---|---|
| m5-d01 (d) | «Eltern bitten, Spielplatz zu meiden, und weiterarbeiten» – 0,25 | 0, **kritisch**; Begründung: unbeherrschte Exposition wird fortgesetzt | Durchgang 1, kritisch | USG Art. 11 (Vorsorge, sinngemäss); BAFU Baurichtlinie Luft 2016 | Tests grün | Fachliche Abnahme |
| m5-d02 (a) | «Benetzung abstellen – dann gibt es kein Abwasser» – 0,25 | Text präzisiert «… und weiter abbrechen»; 0; Hinweis: nur vertretbar, wenn auch die Staubarbeit ruht | Durchgang 1 («Kontext fehlt»); eigene Suche (Punkt 5) | BAFU Baurichtlinie Luft 2016 | Tests grün | – |
| Fall K, k1 (o3) | «Kinder hereinholen, Polier weiterarbeiten lassen» – 1/2 Punkte | 0, **kritisch**, mit Folge | Durchgang 1, kritisch | wie m5-d01 | Tests grün | Alle Zweige von Fall K fachlich abnehmen |
| m6-d03 (c) | «Nachbarn fragen, dann arbeiten» – 0,25 | 0, **kritisch**; Einverständnis = Akzeptanz, keine Rechtsgrundlage | Durchgang 2 (wichtig); rechtlich unzulässige Handlung (Punkt 5) | kommunale Reglemente; Baulärm-Richtlinie BAFU (Stand 2011) | Tests grün | – |
| m7-d01 (a) | «Verwenden – die Aufschrift genügt» – 0,25 | 0, **kritisch**: ohne Identität, SDB und Freigabe keine Anwendung | Durchgang 3, kritisch | ChemV (sinngemäss); Suva | Tests grün | – |
| m7-d02 (c) | Film binden, Rest in Schmutzwasserschacht – 0,25 | 0: ohne Einstufung und Zustimmung unzulässige Einleitung | Durchgang 3 | GSchG (sinngemäss); Vorgaben der Gemeinde | Tests grün | Einleitbedingungen kantonal |
| m7-d02 (d) | «Alles so lassen bis Freitag» – 0,25 | 0: gefährlicher Zustand bleibt bestehen | eigene Suche (Punkt 5) | KVU-Lagerung (sinngemäss) | Tests grün | – |
| m7-d02 (e) | – | **neu**, 0,5: abpumpen in dichte Gebinde, gesichert lagern | Abwägung braucht eine teilweise richtige Option | Praxis | Tests grün | – |
| m7-d04 (d) | «Intern melden, am Montag mit der Gemeinde besprechen» – 0,25 | 0, **kritisch**: Meldung darf nicht von internen Abläufen abhängen | eigene Suche (Punkt 4/5); Durchgang 3 zu Art. 22 Abs. 6 GSchG | GSchG Art. 22 Abs. 6 (laut Prüfbericht; nicht am Original geprüft) | Tests grün | Phase 2: Art. 22 Abs. 6 im Text verankern |
| m7-d04 (e) | – | **neu**, 0,5: sofort kantonale Fachstelle bzw. Pikett anrufen, Ursache nicht behoben | Abwägung braucht eine teilweise richtige Option | wie oben | Tests grün | Kantonale Pikettnummern |
| m7-d05 (b) | «… mit ihrer Zustimmung [GL] der Gemeinde mitteilen» | Gemeinde gemäss Bewilligung informieren, GL **parallel**; Versäumnisse anhand der Akten belegen | Durchgang 3; Korrekturauftrag Punkt 2 und 4 | Bewilligung; GSchG (sinngemäss) | Tests grün | – |
| m9-d03 (c) | «Selbst alle Pumpenschalter ausschalten» – 0,25 | 0, **kritisch**: Eingriff ohne Kenntnis und Befugnis, Gefahr für Baugrube und Menschen | Durchgang 4, kritisch | BAFU UBB 2007; Praxis | Tests grün | – |
| m9-d03 (e) | – | **neu**, 0,5: Schacht abdecken lassen, Zufluss läuft weiter | Abwägung braucht eine teilweise richtige Option | Praxis | Tests grün | – |
| m9-l1 «Befugnisse» | «… oft geregelt, dass sie Arbeiten unterbrechen lassen kann» | Unterbruchsrecht nur, wenn im Pflichtenheft oder Werkvertrag geregelt; kein allgemeines Stopp-Recht aus der Vollzugshilfe | Durchgang 4 (m9-l3, kritisch); Korrekturauftrag Punkt 3 | BAFU UBB 2007 | – | Pflichtenheft-Muster |
| m9-l3 «Wer darf stoppen?» | «in den meisten Firmen ausdrücklich so geregelt» | Befugnis nur aus Vertrag, Pflichtenheft, Reglement; jede Person fordert bei Gefahr zum Unterbruch auf; Anlagen bedienen nur Zuständige; **neue Rollentabelle** UBB / interne Fachperson / Linie / jede Person | wie oben; Durchgang 10 (Rollenmatrix) | BAFU UBB 2007; UVP-Handbuch | – | – |
| m12-d05 (c) | «Erst die GL fragen» – 0,25 | 0, **kritisch** | Durchgang 7, kritisch; Korrekturauftrag Punkt 4 | GSchG (sinngemäss) | Tests grün | – |
| m12-d05 (d) | «Ölsperren legen, am nächsten Tag melden» – 0,5 | 0, **kritisch**: Meldung nicht unverzüglich | wie oben | wie oben | Tests grün | – |
| m12-d05 (e) | – | **neu**, 0,75: sofort melden, Weisung aber nicht klären | Abwägung braucht eine teilweise richtige Option | Praxis | Tests grün | – |
| m2-d05 (e) | Pumpen stoppen, Fachstelle erst nach Ursachenklärung informieren – 0,5 | 0,25 (nicht kritisch: die Einleitung ist gestoppt) | eigene Suche (Punkt 4): Meldung verzögert | Bewilligung; GSchG (sinngemäss) | Tests grün | Prüfen, ob 0 angezeigt ist |
| Fall G, g4 (r3) | Anerkannte Firma nur für einen Raum, Rest normal rückbauen – 1/2 | 0: ungeprüfter Rückbau setzt mögliches Asbestrisiko aktiv fort | eigene Suche (Punkt 5) | Suva / EKAS 6503 (sinngemäss) | Tests grün | – |
| Modulseite (Hinweis) | Module 5–7, 9–12: «noch nicht extern geprüft» | «extern KI-geprüft (14.11.2026); Korrekturen werden schrittweise umgesetzt» | Stand korrekt wiedergeben | – | – | – |

### Systematische Suche (Korrekturauftrag Punkt 5)

Alle 137 Optionen mit Teilpunkten (Abwägungen mit Gewicht zwischen 0 und 1, Simulationsoptionen mit 1/2 Punkten) wurden einzeln auf «gefährdende Handlung wird fortgesetzt», «unzulässige Einleitung/Handlung» und «Meldung verzögert» geprüft. Änderungen siehe Tabelle. **Bewusst nicht geändert** (suboptimal, aber nicht gefährdend oder rechtlich unzulässig; jeweils kontextabhängig):

| ID | Option | Gewicht | Begründung |
|---|---|---|---|
| m2-d02 (a) | Einleitung in Mischwasserkanal | 0,25 | Nur mit Zustimmung der Gemeinde zulässig; Begründung nennt das. Prüfen, ob «ohne Zustimmung» im Text ergänzt werden soll. |
| m3-d02 (c) | Kleber überdecken ohne Abklärung | 0,25 | Keine Faserfreisetzung durch Überdecken; aber Schadstoff bleibt unbekannt. Fachlich prüfen lassen. |
| m5-d04 (a) | Brecher ohne Abklärung aufstellen | 0,25 | Bewilligungspflicht kantonal unterschiedlich (Durchgang 1); Phase 3. |
| m6-d01 (d) | Zwei Hämmer ohne Einschränkung | 0,25 | Nicht per se unzulässig, wenn innerhalb der Zeiten. Phase 3 (m6-d01 c). |
| m6-d02 (a) | Spundwände schlagen | 0,25 | Hohes Schadensrisiko, aber nicht unzulässig; Begründung nennt Risiko. |
| m7-d03 (c) | Reinigungswasser ins Lavabo | 0,25 | Kommunal unterschiedlich zulässig; Begründung nennt das. |
| m11-d04 (a) | Bauteile ohne Klärung abgeben | 0,25 | Schadstofffreiheit ungeklärt; Begründung nennt das. Fachlich prüfen. |
| Fall D, d1 (o3) | «Terminplan bleibt vorerst» | 1/2 | Die Arbeit hat noch nicht begonnen; Klärung wird eingeleitet. |

## Tests

- Unit-Tests: 228 bestanden (neu: Block «Bewertungsfassung 6»).
- Browser-Test (Desktop und Handy): 172 Prüfungen bestanden, keine Konsolenfehler.

## Offen (nächste Schritte)

- **Phase 2**: ISO 14001:2026 und ISO 19011:2026 als aktuelle Ausgaben; Art. 22 Abs. 6 GSchG und Notfall-Ebenen (Notruf / kantonale Fachstelle); Rechtsnatur der Baurichtlinie Luft (2016) und der Baulärm-Richtlinie (Stand 2011) zentral; SDR-Änderung (in Kraft 01.01.2027); VVEA-Stichtage Ausbauasphalt; Normdetails weiterhin «nicht überprüfbar».
- **Phase 3**: wichtige und geringe Befunde je Modul (Durchgänge 1–9), u. a. m5-q11, m5-q21, m6-q02, m6-q05, m6-d01, m6-q19, m7-q12, m9-d01, m12-l1/l4/l5; offene Antworten nur über Raster.
- **Phase 4**: Änderungsnachweis für Phasen 2 und 3 ergänzen.
