# Umsetzung der Gesamtprüfung V0.17 (14.11.2026)

Grundlage: Prüfpaket «umweltcampus_gesamtpruefung_v017» (Durchgänge 1–10, Korrekturauftrag). Die Prüfberichte sind externes KI-Feedback, keine Rechtsfreigabe. Prüfstatus aller Inhalte bleibt **Entwurf**; es wurde keine fachliche oder betriebliche Freigabe gesetzt.

Stand dieses Dokuments: **Phasen 1–3 umgesetzt** (Version 0.18: Phase 1, Bewertungsfassung 6; Version 0.19: Phase 2; Version 0.21: Phase 3, Bewertungsfassung 7). Version 0.20 ergänzte das kantonale Quellenregister (separat dokumentiert in `docs/kantonsregister.md`).

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

## Phase 2 – Aktuelle Quellen und rechtliche Präzisierung (Version 0.19)

**Arbeitsweise**: Die 16 frei zugänglichen PDFs aus dem Quellenpaket des Nutzers wurden von den Originaladressen (BAFU, VSA, Kanton Zürich) geladen und als Text ausgewertet. Die geltenden Fassungen von 26 Bundeserlassen wurden über die offene Datenschnittstelle von Fedlex (fedlex.data.admin.ch) abgerufen (Stichtag 14.11.2026). Verglichen wurde der **Wortlaut** der in der App verwendeten Artikel. Das ist ein automatisierter Abgleich, **keine menschliche Fachprüfung**; `lastChecked` der Quellen bleibt deshalb leer, der Prüfstatus bleibt Entwurf. Kostenpflichtige Normen (SIA, VSS, ISO) bleiben «nicht überprüfbar». VBBo (SR 814.12) und MaLV (SR 814.412.2) wurden über die SR-Nummer nicht gefunden und sind nicht abgeglichen. iso.org sperrt automatische Abrufe; die ISO-Ausgaben 2026 sind daher nicht selbst bestätigt.

| ID / Stelle | Alt | Neu | Begründung | Quelle und Fassung | Prüfergebnis | Verbleibender Prüfbedarf |
|---|---|---|---|---|---|---|
| Quelle `gschg`, m2-l5, m7-l4 | Meldepflicht «laut externem Prüfbericht Art. 22 Abs. 6 – nicht selbst verifiziert» | Wortlaut sinngemäss zitiert: unverzügliche Meldung an die **Gewässerschutzpolizei**, zumutbare Abwehrmassnahmen; Meldung nie von interner Freigabe abhängig | Durchgang 3, 10 (kritisch); Korrekturauftrag Phase 2 Punkt 2 | GSchG Art. 22 Abs. 6, Fedlex-Fassung 1.8.2025 | **Wortlaut bestätigt** | Kantonale Gewässerschutzpolizei und Pikettnummern je Standort |
| m7-l4 (neu) | – | Tabelle «Drei Ebenen»: Notruf 118/117 – Behörde (Gewässerschutzpolizei, kantonale Fachstelle/Pikett) – intern, gleichzeitig | Korrekturauftrag: Notruf und kantonale Meldestelle als getrennte Ebenen | wie oben | – | – |
| Quelle `notruf` | «Gewässerverschmutzungen werden über Polizei oder Feuerwehr gemeldet» | Notruf als erster Kontakt; gesetzliche Meldestelle ist die Gewässerschutzpolizei, Organisation kantonal | Präzisierung | GSchG Art. 22 Abs. 6 | bestätigt | – |
| Quelle `gschg` | Art. 54 sinngemäss | Art. 54 und 70–71 verglichen | Quellenabgleich | Fedlex 1.8.2025 | bestätigt | – |
| Quelle `usg` | Art. 2 sinngemäss | verglichen | Quellenabgleich | Fedlex 1.8.2026 | bestätigt | – |
| Quelle `lrv` (m5-q11, m8) | «über 18 kW» | Wortlaut «mehr als 18 kW», Motoren mit Kompressionszündung, Anhang 4 Ziff. 3 | Durchgang 1 | LRV Art. 19a Abs. 1, Fedlex 1.8.2026 | bestätigt | m5-q11-Text in Phase 3 schärfen |
| Quellen `bafu-luft`, `bafu-baulaerm` | Rechtsnatur nur allgemein | Rechtsnatur zentral aus dem Abschnitt «Rechtlicher Stellenwert» der Original-PDFs: Vollzugshilfe des BAFU als Aufsichtsbehörde; andere rechtskonforme Lösungen zulässig; für die Baustelle verbindlich über Bewilligung bzw. Auflage. Ausgaben: Luft Februar 2016 (Erstausgabe 2009, UV-0901); Baulärm 2006, Stand 2011 (UV-0606); neue Links | Korrekturauftrag Phase 2 Punkt 3; Durchgang 10 | Original-PDFs BAFU | bestätigt | – |
| Quelle `lsv` | Art. 6 «über Unterlagen bestätigt» | Art. 6 und Art. 43 im Wortlaut verglichen | Durchgang 2 (Teil A 1, 3) | LSV, Fedlex 1.1.2025 | bestätigt | – |
| Quelle `vvea`, m3-l3 | Art. 52 bereits mit Daten | Keine Inhaltsänderung nötig: Verwertung über 250 mg PAK/kg nur bis 31.12.2025; Ablagerung Typ E (über 250) bzw. Typ B (bis 250) bis 31.12.2027 – stimmt mit der App überein | Korrekturauftrag Phase 2 Punkt 5 | VVEA Art. 20, 52, Fedlex 1.8.2026 | bestätigt | Entsorgungswege ab 2028 kantonal |
| Quelle `sdr`, m7-l2 | «Geltende Fassung prüfen» | Änderung vom 21.9.2026 (AS 2026 525), in Kraft 1.1.2027, als Hinweis; Inhalt nicht ausgewertet | Korrekturauftrag Phase 2 Punkt 4 | Fedlex-Metadaten AS 2026 525 | Datum bestätigt | Inhalt der Änderung für Baustellentransporte auswerten |
| Quelle `iso19011`, m10-l4 | «Ausgabe 2018 – aktuelle Ausgabe prüfen» | «laut externer Prüfung ISO 19011:2026 (27.05.2026)», nicht selbst geprüft | Korrekturauftrag Phase 2 Punkt 1 | Prüfbericht | nicht überprüfbar (Herausgeberseite gesperrt) | Ausgabe beim Herausgeber bzw. SNV bestätigen |
| Quelle `iso14001`, m10-l1, m10-l5 | Abschnittsnummern 2015 teils ohne Vermerk | Überall «Ausgabe 2026 nicht verglichen»; Quelle: 2026 laut Zertifizierern und Prüfbericht | Korrekturauftrag Phase 2 Punkt 1; Durchgang 10 | Prüfbericht | nicht überprüfbar | Normtext 2026 mit Lizenz vergleichen |
| Quelle `stgb` (Modul 12) | Art. 102 sinngemäss | Abs. 1 (subsidiär bei mangelhafter Organisation) und Abs. 2 (nur aufgezählte Delikte, keine Umweltdelikte) verglichen | Durchgang 7 (m12-l5) | StGB, Fedlex 1.11.2026 | bestätigt | Darstellung in m12-l1/l5 in Phase 3 |
| Quelle `or-vr` | Art. 716a «zu prüfen» | verglichen (Oberleitung, Organisation, Oberaufsicht inkl. Befolgung der Gesetze) | Durchgang 7 | OR, Fedlex 1.10.2026 | bestätigt | – |
| Quelle `klimabericht` | SR-Nummer der Verordnung «zu prüfen» | SR 221.434; Art. 964a–964l OR; Pflicht für Gesellschaften des öffentlichen Interesses mit mindestens 500 Vollzeitstellen und einer weiteren Grössengrenze | Durchgang 6 | OR, Fedlex 1.10.2026; V 221.434, Fassung 1.1.2024 | bestätigt | Laufende Revisionen |
| Quellen `klg`, `co2g`, `uwg` | SR-Nummern «zu prüfen» | SR 814.310 (in Kraft 1.1.2025; Art. 3 Netto-Null 2050), SR 641.71 (Art. 29 Abgabe auf Brennstoffe), UWG Art. 3 Abs. 1 Bst. b | Durchgang 6 | Fedlex 1.1.2025 | bestätigt | – |

## Phase 3 – Bewertungsrubriken, Didaktik und übrige Befunde (Version 0.21)

Grundlage: alle Befunde «wichtig» und «gering» aus den Durchgängen 1–9, die nach Phase 1 und 2 noch offen waren. Wo eine Aussage im Gesetz nachgeschlagen werden konnte, ist sie mit der Fedlex-Fassung verglichen (automatisierter Abgleich, keine menschliche Fachprüfung).

### Geänderte Bewertungen (Bewertungsfassung 7)

| ID | Alt | Neu | Begründung | Quelle | Prüfergebnis | Verbleibender Prüfbedarf |
|---|---|---|---|---|---|---|
| m6-d01 (c) | Zwei Hämmer in Zeitfenstern – 0,75 | 0,5; nur vertretbar, wenn Stufe, Bewilligung und Zeitvorschriften es zulassen | Durchgang 2: Spitzenbelastung | Baulärm-Richtlinie (Stand 2011) | Tests grün | – |
| m9-d01 (d) | UBB durch ausführende Unternehmung mit Behördenzustimmung – 0,75 | 0,5; Interessenkonflikt nur gemildert | Durchgang 4 | BAFU UBB 2007 | Tests grün | – |
| m10-d04 (c) | Echte Übung, im Audit verschweigen – 0,5 | 0,25; fehlende Transparenz und Ursachenanalyse | Durchgang 5 | Praxis | Tests grün | – |
| m10-d04 (d) | «Hoffen, dass nicht gefragt wird» – 0,25 | 0 | Folge aus c: passives Verschweigen ohne Korrektur nicht besser bewerten als c | Praxis | Tests grün | – |
| m12-d01 (c) | Verantwortung an Stab abgeben, zweite Stelle verlangen – 0,5 | 0,25; pauschale Abgabe bleibt unzulänglich | Durchgang 7 | OR Art. 716a | Tests grün | – |

Frühere Antworten und Prüfungen dazu gelten als «frühere Bewertungsfassung» (`RESCORED_V7_*`); nichts wird neu benotet.

### Präzisierte Texte

| ID / Stelle | Änderung | Befund | Quelle und Fassung |
|---|---|---|---|
| m11-l1, m11-l2, m11-c02, m11-t1, Glossar | **Art. 5 Abs. 1 KlG**: Alle Unternehmen müssen spätestens 2050 Netto-Null-Emissionen aufweisen (mindestens direkte und indirekte). Die frühere Aussage «kaum direkte Pflichten für Bauunternehmen» war falsch und ist entfernt. Fahrpläne (Art. 5 Abs. 2–3) und Finanzhilfen (Art. 6) präzisiert. | Durchgang 6 (wichtig) | KlG, Fedlex 1.1.2025 – Wortlaut verglichen |
| m11-q05 | Kriterien der Berichtspflicht nach Art. 964a OR (öffentliches Interesse, 500 Vollzeitstellen inkl. kontrollierter Unternehmen, weitere Grössengrenze) statt Mitarbeiterzahl allein | Durchgang 6 | OR, Fedlex 1.10.2026 |
| m11-q12 | Recyclingbeton: CO₂-Wirkung «hängt vor allem von Zementmenge und -art ab», mit Deklarationen auf gleicher funktionaler Einheit belegen (statt absoluter Aussage) | Durchgang 6 | KBOB (sinngemäss) |
| m11-l2 | Baustrom-Zuordnung nach Konsolidierungsmethode (operative/finanzielle Kontrolle) und vertraglichen Rollen, nicht nach Zahler | Durchgang 6 | GHG Protocol (sinngemäss) |
| m5-q21 | «Zuständige Vollzugsbehörde – in der Regel im Baubewilligungsverfahren bzw. mit den Auflagen»; kantonale Zuständigkeit erwähnt | Durchgang 1 | BAFU Baurichtlinie Luft 2016 |
| m5-q11 | Wortlaut Art. 19a Abs. 1 LRV («mehr als 18 kW», Kompressionszündung); unbelegte Angabe zu Übergangsregeln entfernt | Durchgang 1 | LRV, Fedlex 1.8.2026 |
| m5-d04 (a) | Bewilligung bzw. Meldung für mobile Brecher hängt von Kanton, Gemeinde, Standort und Anlage ab – keine Pauschalaussage | Durchgang 1 | – |
| m6-q02 | Art. 6 LSV und Verbindlichkeit der angeordneten Stufe direkt gegenübergestellt | Durchgang 2 | LSV, Fedlex 1.1.2025 |
| m6-q05, **m6-q31 (neu)** | Bedingungen der –6-dB-Regel (Punktquelle, freies Schallfeld); Linienquelle etwa –3 dB; neue Frage zu Reflexion in einer Gasse | Durchgang 2 | Akustische Faustregeln (Praxis) |
| m6-q19 | Normen (VSS, DIN): Nummer, Ausgabe, Geltungsbereich nicht am Original geprüft – durch Fachperson belegen | Durchgang 2 | – (kostenpflichtig) |
| m6-l4, Glossar | Zustandsaufnahme = Beweissicherung, kein Nachweis für oder gegen eine Verursachung | Durchgang 2 | – |
| m7-q12 | Begleitscheinpflicht nicht pauschal: abhängig von Abfallcode (LVA), Menge und Übergabe | Durchgang 3 | VeVA/LVA (sinngemäss) |
| m7-l2 | Neuer Entscheidweg für Lager: Produkt → Lagerort → Menge → Rückhalt → kantonale Vorgabe | Durchgang 3 | – |
| m10-d04 | «Jährliche Notfallübung» ausdrücklich als interne Vorgabe des eigenen Systems, nicht als Normforderung | Durchgang 5 | ISO 14001 (nicht verglichen) |
| m10-d01 (a) | Einschränkung des Anwendungsbereichs nicht pauschal unzulässig; muss sachlich zutreffend, transparent und mit der Zertifizierungsstelle abgestimmt sein | Durchgang 5 | – |
| m12-l1 | Art. 102 StGB genau (subsidiär, Busse bis 5 Mio. Fr., Abs. 2 ohne Umweltdelikte); keine Strafimmunität der Stabsstelle | Durchgang 7 | StGB, Fedlex 1.11.2026 |
| m12-l5 | Drei Wege getrennt: gesetzliche Notfallmeldung – interne Eskalation – freiwillige externe Hinweise; kein umfassender gesetzlicher Schutz von Hinweisgebenden in der Privatwirtschaft (nach heutigem Kenntnisstand, nicht am Original geprüft), Treuepflicht, Rechtsberatung | Durchgang 7 | – |
| m1-l3 | Rechtsnatur der Vollzugshilfen (an Behörden gerichtet, andere rechtskonforme Lösungen zulässig, verbindlich über Auflage) | Durchgang 8 | BAFU-PDFs (Stellenwert) |
| m2-l3 | pH-Lernwert begründet keine Einleitbewilligung; massgebend ist die konkrete Bewilligung | Durchgang 8 | – |

### Geprüft, keine Änderung nötig

| Befund | Ergebnis |
|---|---|
| m8-l2 (kritisch): fehlende LV-Position ≠ Nachtragsanspruch | Bereits seit der Korrektur von Modul 8 so dargestellt (vier Fälle, «Anzeige ist nicht Anspruch»); m6-q15 übernimmt das. |
| m3-l3: Ausbauasphalt-Stichtage | Bereits korrekt (Phase 2 mit Fedlex verglichen). |
| m4-l2: Befahrbarkeit nicht pauschal | Text verlangt Beurteilung über Saugspannung bzw. Fachperson und nennt keine pauschale Freigabe. |
| m5-l2/m5-d02: Wasserpfad bei Benetzung | Bereits Bestandteil von Lektion, Checkliste und m5-d02 (Phase 1 geschärft). |
| m9-l1: interne Kontrolle vs. formelle UBB | Bereits mit Tabelle und Lernziel unterschieden; Phase 1 ergänzte die Befugnis-Tabelle. |
| m9-l4: Datenschutz bei Fotos | Bereits Abschnitt mit Zweck, Zugriff, Aufbewahrung und Löschung. |
| m9-l5: Umsetzungs- vs. Wirkungskontrolle | Bereits «umgesetzt ≠ wirksam» mit Nachkontrolle. |
| m10-q24: Compliance-Bewertung ≠ behördliche Prüfung | Bereits so formuliert. |
| m12-l3: Wirksamkeit nicht aus Teilnehmerliste | Bereits vier Ebenen, Verhalten und Ergebnis. |
| m11-d01, m11-d03 | Bereits mit Bilanz-/Belegpflicht bzw. Freigabe und Nachweis; keine Änderung. |
| Phase 3 Punkt 2: offene Antworten | Selbstbewertete offene Antworten werden nie als «richtig» verbucht und zählen nicht als Kompetenznachweis (`recordAnswer`, `self`); Prüfungen weisen den Anteil aus Selbstbewertung aus. |
| Phase 3 Punkt 3: Synchronisierung | Karten, Glossar, Bibliothek und Fälle nach den geänderten Aussagen durchsucht («18 kW», Netto-Null, Notfallübung, Meldung); angepasst: m11-c02, m11-t1, Glossar «Kompensation» und «Zustandsaufnahme». |

Tests: 240 Unit-Tests (neu: Block «Bewertungsfassung 7»), 186 Browser-Prüfungen, keine Konsolenfehler.

## Offen

- Fachliche Abnahme durch eine menschliche Fachperson (alle Module; Prüfstatus bleibt Entwurf).
- ISO 14001:2026 und ISO 19011:2026 mit lizenziertem Normtext vergleichen.
- Inhalt der SDR-Änderung (AS 2026 525, ab 1.1.2027) für Baustellentransporte auswerten.
- Kantonale Quellen einzeln prüfen und mit Fundstelle als «geprüft» eintragen (siehe `docs/kantonsregister.md`).
- VBBo und MaLV am Fedlex-Text abgleichen.
