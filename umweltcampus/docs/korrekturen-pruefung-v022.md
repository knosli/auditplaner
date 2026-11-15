# Korrekturen nach den Prüfberichten zu Version 0.22 (→ Version 0.23)

Grundlage: Prüfpaket «UmweltCampus_v022_Pruefberichte_NEU» mit zehn externen KI-Prüfberichten (D1–D10, README, Strukturprüfung der Fragen), alle vollständig gelesen. Umgesetzt am 15.11.2026 in der bestehenden App (keine Neuentwicklung).

**Unverändert erhalten:** alle 12 Module, alle Inhalts-IDs, alle Quellen-IDs, alle Lernstände (keine Datenmigration nötig), Prüfstatus «Entwurf». Keine fachliche oder betriebliche Freigabe. Rechtlich nicht verifizierte Aussagen bleiben als ungeprüft gekennzeichnet.

**Keine stille Neubewertung:** Geänderte Bewertungen laufen über die neue **Bewertungsfassung 8** (`SCORING_VERSION = 8`, `RESCORED_V8_*` in `src/lib/versioning.ts`). Frühere Antworten zu den geänderten Fragen und frühere Modulprüfungen der Module 2, 3, 7, 11 (und gemischte Prüfungen) werden nicht umbenotet, sondern als «nach früherer Bewertungsfassung» gekennzeichnet und nicht mehr als Nachweis gezählt.

## 1. Korrekturliste (aus allen zehn Berichten)

| Nr. | Befund (Bericht) | Einstufung | Entscheid |
|---|---|---|---|
| K1.1 | `m7-d04 e`: 0,5 Punkte für «melden; danach weiterarbeiten wie bisher» (D1, D3) | kritisch | umgesetzt |
| K1.2 | `m7-d04 b`: «gespült» – Fachkräfte entscheiden (D3) | wichtig | umgesetzt |
| K1.3 | `m11-d04 a, d`: Teilpunkte für ungeklärte Abgabe von Rückbauteilen (D1, D2, D10) | kritisch/wichtig | umgesetzt |
| K1.4 | `m2-d05 e`: Teilpunkte für zurückgehaltene Ölfilm-Meldung (D1, D5, D10) | wichtig bis kritisch | umgesetzt |
| K1.5 | `m3-d02 c`: Teilpunkte für ungeprüftes Überdecken verdächtigen Klebers (D1, D6, D10) | wichtig | umgesetzt |
| K1.6 | `m11-d05 d`: 0,5 für Aufschub der Abweichungen bis Bauende (D2) | wichtig | umgesetzt (0,25) |
| K1.7 | `m10-d04 c`: Teilpunkte dürfen nicht als Empfehlung zum Verschweigen wirken (D4) | wichtig (didaktisch) | Begründung präzisiert, Gewicht bleibt |
| K2 | Szenen der Fälle A–M: Folgen als mögliche Risiken, Fall F (Kennzeichnung ≠ Verstoss, 6.30 Uhr nur gemeldet), C, D, G, J, B, K (D1, D7) | wichtig | umgesetzt |
| K3.1 | ISO 14001:2026 / ISO 19011:2026 beim Herausgeber bestätigt; Normkapitel nicht (D4, D10) | wichtig | umgesetzt (nur Ausgabe) |
| K3.2 | BAFU-Anhänge 2025 (Entsorgungstabelle, Schlämme) (D6, D10) | wichtig | umgesetzt nach Abgleich mit Original |
| K3.3 | Baulärm-Fachseite des BAFU als Bezug (D3, D10) | Hinweis | umgesetzt |
| K3.4 | Kantonslinks automatisiert prüfen, Linkstatus von Fachstatus trennen, Ausgaben SZ/OW, mehrsprachige Kantone (D1, D5, D8) | wichtig | umgesetzt |
| K3.5 | Faustregeln –6 dB / –3 dB nur unter idealisierten Bedingungen (D3) | Präzisierung | umgesetzt |
| K4.1 | Dashboard «Ihre Fachentwicklung» zu lang, v. a. mobil (D9, D10) | wichtig | umgesetzt |
| K4.2 | Fachgrafiken mobil vergrösserbar (D9) | wichtig | umgesetzt |
| K4.3 | Drei Lernstufen verständlich erklären, ohne Mouseover (D9) | Verbesserung | umgesetzt |
| K5 | Einheitliche Nullpunkt-Regeln zentral per Regressionstest absichern (D10) | wichtig | umgesetzt |

## 2. Bewertungskorrekturen (Bewertungsfassung 8)

| ID | alt | neu | Begründung | Quelle | Prüfergebnis | offen |
|---|---|---|---|---|---|---|
| `m7-d04 e` | «Sofort … melden; danach weiterarbeiten wie bisher» – 0,5 | Text neu: «… melden; an diesem Platz nicht mehr betanken. Entsorgung des Bindemittels, Dokumentation und ein neuer, geschützter Betankungsplatz werden später geregelt.» – 0,5 | Die Teilpunkte galten einer Option, die die Gefahrenquelle (Betankung neben dem Schacht) bestehen liess. Neu legt die Option die Gefahrenquelle sofort still; es fehlen nur Entsorgung, Dokumentation, dauerhafte Lösung → 0,5 vertretbar. Vorschlag D1 («falls 0,5 gewünscht: Option sicherer formulieren») übernommen. | GSchG (Sorgfalts-/Meldepflicht), Praxis | Bewertungsrichtung mit D1/D3 übereinstimmend | – |
| `m7-d04 b` | «… damit Schacht und Leitung geprüft und gespült werden können» | «… damit Fachkräfte Schacht und Leitung prüfen und über Rückhalt, Absaugen oder Reinigung entscheiden» | Ob gespült wird, entscheiden Fachkräfte; Spülen kann Schadstoffe weitertragen (D3). | Praxis | Text, Gewicht unverändert 1 | – |
| `m11-d04 a` | 0,25 | 0, kritisch | Übergabe ohne Eigentums- und Schadstoffklärung ist nicht rückholbar (D1, D2). | VVEA, BAFU Bauabfälle | übernommen | – |
| `m11-d04 d` | 0,25 | 0, kritisch | Material gehört der Bauherrschaft; auch Stahlträger können belastete Beschichtungen tragen (blei-/PCB-haltige Anstriche). | VVEA, BAFU Bauabfälle | übernommen | Option `c` (Ablehnen, 0,25) bleibt Teiloption |
| `m2-d05 e` | 0,25 | 0, kritisch | Ob Öl die Container verlassen hat, ist unbekannt; bei möglicher Gewässerbelastung wird sofort gemeldet. Gleiche Melde-Logik wie `m7-d04 d` und `m12-d05 c/d` (D5, D10). | GSchG, kantonales Merkblatt | übernommen | – |
| `m2-d05 f` (neu) | – | «Pumpen stoppen und sofort die Fachstelle informieren; Rückhalt und Ursachensuche der Fachstelle/Feuerwehr überlassen» – 0,5 | Nötig, damit die Frage weiterhin eine sichere Teiloption hat (Teststruktur «bester Entscheid»). Meldet sofort, versäumt aber eigene Sofortmassnahmen. | Praxis | neu | – |
| `m2-d05 a` | Voraussetzungen ohne Baugrubensicherheit | Ergänzt: Pumpen nur stoppen, wenn die Grube standsicher bleibt – sonst Wasser zurückhalten bzw. umleiten statt abschalten | Hinweis aus D7 (Fall B) sinngemäss auch hier. | Praxis (BauAV nicht im Wortlaut geprüft) | übernommen | Gewicht unverändert 1 |
| `m3-d02 c` | 0,25 | 0 (nicht als «kritisch» markiert) | Ungeprüftes, undokumentiertes Überdecken versteckt einen möglichen Schadstoff (D1, D6). Nicht «kritisch», weil keine unmittelbare Faserfreisetzung entsteht; Punkte gibt es aber keine. Erklärung: Überdecken nur nach Abklärung, dokumentiertem Entscheid der Bauherrschaft und gemäss Vorgaben. | Suva, EKAS 6503 | übernommen | – |
| `m3-d02 e` (neu) | – | «Arbeiten am Kleber stoppen, umplanen, Bauherrschaft informieren; über die Probe entscheidet sie später» – 0,5 | Sichere Teiloption (Gefahr gestoppt, Abklärung offen). | Suva, EKAS 6503 | neu | – |
| `m11-d05 d` | 0,5 | 0,25 | Abweichungen werden zeitnah angegangen; Teilpunkte nur, weil keine unzutreffende Aussage veröffentlicht wird (D2). | UWG, BöB, Praxis | übernommen | UWG-Wortlaut nicht am Original geprüft |
| `m10-d04 c` | Begründung | Begründung: «Die Teilpunkte gelten nur dem echten, korrekt datierten Nachweis – das Verschweigen ist keine Empfehlung …» | D4 bittet um Prüfung. Gewicht 0,25 bleibt (wurde bereits in Fassung 7 gesenkt; der echte Nachweis ist fachlich richtig, das Verschweigen wird klar als falsch benannt). | ISO 19011, Praxis | **nicht** weiter herabgesetzt | – |

Alle geänderten Fragen tragen `rev: 8`. Betroffene Lektionsschritte (`m2-l5-abw`, `m3-l2-abw`, `m7-l4-abw`, `m11-l4-abw`, `m11-l5-abw`) zeigen die Fragen direkt an; Lektionstexte und Wiederholungskarten wurden geprüft (Suche nach «überdeck», «wie bisher», «gespült», «Ursache geklärt») – keine weitere Stelle widerspricht. «Gespült» kommt nur noch als Fakt in Fallsituationen vor («Die Feuerwehr hat … gespült»), das ist korrekt.

## 3. Szenen und Simulationen

Datei `src/content/scenes.ts`, Falltexte in `m1/tasks.ts`, `m2/scenarios.ts`, `m7/tasks.ts`. Keine Punktzahl eines Falls geändert – daher keine Neubewertung von Fallergebnissen.

| Fall | alt | neu | Begründung |
|---|---|---|---|
| F | Gefahr 3: «ohne sichtbaren Partikelnachweis» → «Einsatz ohne Nachweis unzulässig» | «ohne sichtbare Kennzeichnung zu den Partikelanforderungen» → «Konformität unklar – Nachweis prüfen; ohne Nachweis nicht einsetzen» | Fehlende Kennzeichnung belegt noch keinen Verstoss (D1, D7). |
| F | Gefahr 1: «Abbauhammer laut Anwohner ab 6.30 Uhr» → «Verstoss …, Anzeige möglich» | «Anwohner meldet … (noch nicht bestätigt)» → «Falls bestätigt: Verstoss gegen die Arbeitszeit-Auflage möglich – mit Bewilligung bzw. Reglement abgleichen» | Nur eine Meldung; Bewertung anhand der konkreten Auflage (Auflage 12: lärmintensiv ab 7.00 Uhr). |
| F | Stufe f3: Feedback «Ohne Nachweis kein Einsatz»; Situation «Hinweis auf Arbeiten vor 7 Uhr» | Feedback erklärt: Kennzeichnung allein ist kein Verstoss, aber ohne Nachweis keine belegte Konformität; Situation nennt Auflage 12 | wie oben |
| F | Gefahr 2 «Trennpflicht verletzt, Verwertung verunmöglicht» | «Trennung laut Entsorgungskonzept nicht eingehalten, Verwertung erschwert» | «verunmöglicht» zu absolut. |
| A | Massnahme «Schacht abdecken …, Waschen stoppen» | «Waschen sofort stoppen; Schacht abdecken bzw. abdichten» | Quelle zuerst stoppen (D7). |
| B | «Pumpe stoppen bzw. …» | «Pumpe stoppen, sofern die Baugrube sicher bleibt – sonst über Absetzcontainer umleiten»; ebenso Rangpunkt p1 im Fall | Baugrubensicherheit (D7). |
| C | «Maschinen laufen ab 6.40 Uhr warm» | «… (Arbeitsbeginn laut Reglement 7 Uhr)» | Zeit aus dem Fall (Infoschritt u1), nicht pauschal (D7). |
| D | «Rückbau erst nach Sanierung, Suva-Meldung und Freigabe» | «Reihenfolge: Sanierung (mit Suva-Meldung) → Freigabe → Rückbau» | Freigabekette sichtbar (D6, D7). |
| G | «Probe und Fachperson; Sanierung …» | «Zuerst Schadstoffermittlung …; bei Befund Sanierung nach Suva-/BauAV-Verfahren …» | Reihenfolge (D7). |
| J | «Eigenschutz; Quelle stoppen» / «Schächte abdichten (z. B. Folie, Erde)» | «Eigenschutz zuerst; Quelle nur stoppen, wenn gefahrlos möglich» / «Schächte abdecken (Abdeckmatte, Folie, Bretter), davor eindämmen – kein Material in den Schacht»; ebenso Stufen j2/j-Massnahme im Fall | Eigenschutz, keine Erde in Schächte (D7). |
| K | Gefahr 4 «Maschine möglicherweise ohne Partikelnachweis» | «Konformität unklar – Partikelnachweis des Laders prüfen» | wie F. |
| A, B, D, E, G, H, I, J, K, L, M | Folgen als Tatsachen («gelangt», «bleibt bestehen») | Folgen als mögliche Risiken («kann … gelangen», «möglich», «wahrscheinlich») | D7: Folgen sind Risiken ohne Massnahme, keine Feststellungen. |

## 4. Quellen

| Quelle | Änderung | Prüfergebnis |
|---|---|---|
| `iso14001`, `iso19011` | Ausgabe 2026 «laut externen Prüfberichten beim Herausgeber bestätigt (Abruf 15.11.2026), von der App nicht abrufbar»; ausdrücklich nur die Ausgabe, nicht der Norminhalt | iso.org blockiert automatische Abrufe weiterhin; Abschnittsnummern aus 2015 bleiben als nicht verglichen markiert |
| `bafu-entsorgungstabelle` (neu) | Entsorgungstabelle Bauabfälle, Anhang A3, Fassung 10.12.2025 | Datum auf der BAFU-Übersicht «Abfall: Vollzugshilfen» (abgerufen 15.11.2026), Dateigrösse und Inhalt am Original-PDF verglichen; Fusszeile des Formulars lautet «© BAFU 2020». Keine Werte übernommen. |
| `bafu-schlaemme` (neu) | Schlämme aus der Bauwirtschaft, UV-1826/02/04 | Titelseite des PDF: «Stand 03/2026, gültig ab 1. Mai 2025, Vorversion 05/2025». Hinweis D6 («vom 1.05.2025») damit präzisiert. Keine Inhalte übernommen. |
| `bafu-bauabfaelle` | Verweis auf Übersicht und die beiden Anhänge | – |
| `bafu-baulaerm` | BAFU-Fachseite «Ermittlung und Beurteilung von Baulärm» ergänzt (veröffentlicht 18.11.2025; Richtlinie weiterhin «Stand 2011») | abgerufen 15.11.2026 |
| Lektion `m3-l1` | Quellenschritt nennt die zwei neuen Anhänge | – |
| `m6-q05`, `m6-q31` | «unter idealisierten Bedingungen» zu –6 dB/–3 dB | Präzisierung, keine Bewertungsänderung |

### Kantonsregister – Linkprüfung

Automatisierte Prüfung am 15.11.2026 (HTTP-Abruf, Seitentitel bzw. PDF-Titelseite verglichen). Dafür wurden die Kantons-Hosts in der Cloud-Umgebung freigegeben. Neues Feld `LINK_CHECKS` in `src/content/cantons.ts`, angezeigt als eigenes Abzeichen und eigene Zeile «Linkprüfung» – **getrennt vom fachlichen Status**, der bei allen 30 Quellen «nicht geprüft» bleibt.

| Ergebnis | Quellen |
|---|---|
| erreichbar, Titel passt (25) | AG, AR (2), BE (2), BS, GL, GR, LU (3), NW (2), SG, SH, SO, SZ (2), TG, UR, VS (2), ZG, ZH (2) |
| erreichbar über Weiterleitung (2) | FR (→ PDF Vollzugshilfe), OW (→ PDF Gesuch Grundwasser) |
| ersetzt (2) | AI Fachstelle (neue Adresse); AI Merkblatt: alter PDF-Link **404** → ersetzt durch die Merkblatt-Seite des Kantons, auf der «Umweltschutz auf der Baustelle» aktuell angeboten wird |
| nicht automatisch prüfbar (1) | BL (Website blockiert automatische Abrufe) – im Browser prüfen |

Ausgaben aus den Dokumenten übernommen: SZ «Juni 2024», OW «Stand März 2025», BE «Merkblatt vom 1. Januar 2021», GL «erlassen 1. März 2020», SH «Stand Mai 2025», NW kUSV «Stand 1. November 2020» (ob geltende Fassung: nicht geprüft). Bei mehrsprachigen Kantonen weist die Kantonsseite jetzt darauf hin, dass die amtlich veröffentlichte Fassung (französisch, italienisch, rätoromanisch) massgebend ist und Übersetzungen abweichen können.

## 5. Benutzerführung

| Änderung | Details |
|---|---|
| Dashboard kompakt | «Ihre Fachentwicklung» zeigt nur die drei aktuell relevanten Module (aktuelles Modul, dann zuletzt bearbeitete, dann Lernpfad). Knopf «Alle 12 anzeigen» (mit `aria-expanded`). Die Vollansicht bleibt unter «Details»/Fortschritt. |
| Plan vergrössern | Jede Fallszene hat «Plan vergrössern»: Vollbild mit Zoom (100–400 %), seitlich verschiebbar, Esc oder «Schliessen» beendet, Fokus kehrt zum Knopf zurück. |
| Lernstufen erklärt | Aufklappbar «Was bedeuten die drei Stufen?» im Lektionskopf und am Lektionsende – funktioniert ohne Mouseover, also auch auf dem Handy. Betont: Selbstbewertungen sind nie ein Nachweis. |
| Linkstatus | Kantonsquellen zeigen «Link erreichbar / umgeleitet / ersetzt / nicht automatisch prüfbar» neben «nicht geprüft». |

## 6. Tests

- Unit-Tests: **260 bestanden** (vorher 253). Neu: Bewertungsfassung 8 (Gewichte, kritische Markierung, `rev: 8`, Kennzeichnung früherer Ergebnisse, Prüfungen), Benzinunfall-Text, Begründung `m10-d04 c`, Linkprüfung aller 30 Kantonsquellen, Ausgaben SZ/OW, **modulübergreifende Nullpunkt-Regel** (keine Teilpunkte für Optionen mit «erst informieren, wenn», «weiterarbeiten wie bisher», «ohne abzuklären», Abgabe «ohne Rücksprache», «am Montag»).
- Browser-Test (Desktop 1360 px, Tablet iPad, Smartphone iPhone 13): **330 Prüfungen bestanden, keine Konsolenfehler**, kein horizontales Scrollen. Neu geprüft: Stufen-Erklärung, Plan vergrössern mit Zoom und Esc, Dashboard 3/12 Module, Linkstatus der Kantonsquellen. Dabei gefunden und behoben: Nach jedem Zoom-Schritt sprang der Tastaturfokus auf «Schliessen» zurück.
- TypeScript-Prüfung und Produktions-Build fehlerfrei.

## 7. Nicht oder anders übernommene Empfehlungen

| Empfehlung | Entscheid | Grund |
|---|---|---|
| `m10-d04 c` auf 0 setzen (sinngemäss D4) | nicht übernommen | Bereits in Fassung 7 gesenkt; der echte Nachweis ist richtig, nur das Verschweigen falsch – die Begründung sagt das jetzt unmissverständlich. |
| `m3-d02 c` als «kritisch» markieren | nicht übernommen | 0 Punkte ja; «kritisch» ist in der App für unmittelbar gefährdende Handlungen reserviert. Überdecken setzt jetzt keine Fasern frei. |
| `m11-d05 d` auf 0 | nicht übernommen (0,25) | Die Option verhindert eine unzutreffende Veröffentlichung; der Aufschub wird mit «wenig geeignet» klar abgewertet. |
| Datum «1.05.2025» für Schlämme-Modul (D6) | präzisiert | Laut Titelseite gilt das Modul ab 1. Mai 2025, die aktuelle Fassung ist aber «Stand 03/2026». |
| Entsorgungstabelle als «2025» ohne Vorbehalt | präzisiert | Die BAFU-Übersicht nennt 10.12.2025; das Formular selbst trägt «© BAFU 2020». Beides angegeben. |
| KlG Art. 5 ändern (D2) | nicht nötig | D2 bestätigt den Wortlaut von Abs. 1; Abs. 2–3 sind in der Lektion bereits als «können» formuliert. |
| Kantonale Rechts- und Fassungsprüfung je Kanton (D1, D8) | nicht umgesetzt | Linkprüfung ≠ fachliche Prüfung; die inhaltliche Prüfung muss eine Fachperson vornehmen. Status bleibt «nicht geprüft». |

## 8. Noch offen

- **Fachliche Abnahme** aller Inhalte durch eine menschliche Fachperson (Status bleibt «Entwurf»).
- **ISO 14001:2026 / 19011:2026**: Abschnittsnummern und Inhalte nicht mit der neuen Ausgabe verglichen (Norm kostenpflichtig, iso.org für die App gesperrt).
- **SIA 431-C3:2026** (D5): nicht gegen den lizenzierten Normstand geprüft.
- **Kantonsquellen**: Inhalte, Zuständigkeiten und Bewilligungswege je Kanton nicht fachlich geprüft; BL-Link nur im Browser prüfbar; NW kUSV-Fassung ungeklärt; Linkprüfung sollte periodisch wiederholt werden.
- **UWG Art. 3** (`m11-d05`) und **OR Art. 716a** nicht am Original geprüft.
- **Rückverfolgbarkeit der Szenen** (D7: jede Gefahr/Massnahme auf eine Falltext-ID zurückführen) – derzeit nur inhaltlich aus dem Fall übernommen, nicht technisch verknüpft.
- **Screenreader-Test** mit echten Hilfsmitteln (D9) steht weiter aus.
