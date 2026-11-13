import type { Step } from '../types';

// Ergänzungen je Lektion (Version 2 des Moduls):
//  brief    – «Kurz erklärt»: das Wesentliche in einer Minute, so wie man es dem Polier sagt
//  example  – zweites Praxisbeispiel aus dem jeweils anderen Bereich (Hoch-/Tiefbau)
//  deep     – ausführliche Fachvertiefung (ersetzt die kurze Vertiefung aus Version 1;
//             gleiche Schritt-ID, damit der Fortschritt erhalten bleibt)
//  decision – Abwägung: mehrere Massnahmen sind plausibel
//  task     – praktische Baustellenaufgabe mit fiktiven Projektdaten
//
// Rechtsverweise mit «bestätigt» wurden am 12.11.2026 über kantonale Vollzugshilfen
// bzw. Kommentare abgeglichen (nicht am Fedlex-Volltext). Übrige: sinngemäss, zu prüfen.

type Extra = { brief: Step; example: Step; deep: Step; decision: Step; task: Step };

export const EXTRA: Record<string, Extra> = {
  // =====================================================================
  'm2-l1': {
    brief: { id: 'm2-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Was Gewässer verschmutzen kann, darf weder direkt noch über Umwege hinein – auch nicht in den Boden.** Ein Schaden muss nicht eingetreten sein; die Möglichkeit genügt.

**Wer Abwasser ableiten oder versickern will, braucht eine Bewilligung** – für Gewässer und Untergrund vom Kanton, für die Kanalisation von der Gemeinde.

**Wo die Baustelle liegt, bestimmt die Auflagen**: Gewässerschutzbereich (Au, Ao), Schutzzone (S1–S3), Gewässerraum und Fischgewässer stehen auf kantonalen Karten.

**Verantwortlich sind alle** – vom Maschinisten bis zur Projektleitung. Fahrlässigkeit ist strafbar, die Kosten trägt der Verursacher.` },

    example: { id: 'm2-l1-example-2', kind: 'example', title: 'Beispiel aus dem Hochbau: Untergeschoss im Grundwasser', context: 'Hochbau', text: `Wohn- und Geschäftshaus im Aaretal, zwei Untergeschosse, Bereich Au. Laut Geologiebericht reicht die Bodenplatte 1.2 m unter den mittleren Grundwasserspiegel.

Die kantonale Fachstelle verlangt im Baubewilligungsverfahren einen hydrogeologischen Nachweis, dass die Durchflusskapazität des Grundwassers höchstens um 10 % vermindert wird, sonst wäre der Teil unter dem Grundwasserspiegel nicht bewilligungsfähig. Zusätzlich verfügt sie für die Bauzeit: bewilligte Wasserhaltung mit Maximalmenge, Messung des Grundwasserspiegels in zwei Piezometern, Ableitung über Absetzbecken, pH-Kontrolle beim Betonieren der Bodenplatte, Meldung bei Ölfilm oder Trübung.

**Was das für die Unternehmung heisst**: Jede dieser Auflagen braucht eine Massnahme, eine verantwortliche Person und einen Nachweis. Wer die Auflagen erst auf der Baustelle liest, hat keine Zeit mehr, die Anlagen zu planen.` },

    deep: { id: 'm2-l1-deep', kind: 'deep', title: 'Fachvertiefung: Bewilligungen, Bereiche, Haftung', text: `### 1. Vom Gesetz zur Auflage auf der Baustelle
Das GSchG legt Grundsätze fest, die GSchV konkretisiert sie, der Kanton vollzieht. Für die Baustelle entscheidend ist die **Kette**: Gesetz → Verordnung → kantonale Vollzugshilfe → Bewilligung mit Auflagen → Massnahme auf der Baustelle. Wenn Sie einen Polier beraten, beginnen Sie am Ende der Kette (Was steht in unserer Bewilligung?) und gehen nur so weit zurück, wie es zum Verständnis nötig ist.

### 2. Besonders gefährdete Bereiche: was bewilligt werden muss
Art. 19 Abs. 2 GSchG verlangt für Bauten, Grabungen, Erdbewegungen und ähnliche Arbeiten in den besonders gefährdeten Bereichen eine kantonale Bewilligung, wenn sie Gewässer gefährden können. **Art. 32 GSchV** konkretisiert das: Eine Bewilligung ist insbesondere für unterirdische Bauten und für Eingriffe nötig, welche schützende Deckschichten beeinträchtigen. Kantone stützen auch die Bewilligungspflicht für **Grundwasserabsenkungen** während der Bauzeit auf diese Bestimmung (bestätigt über Vollzugshilfen der Kantone St. Gallen und Solothurn). Der Gesuchsteller muss nachweisen, dass die Schutzanforderungen erfüllt sind; die Bewilligung wird mit Auflagen erteilt.

### 3. Bauen unter dem mittleren Grundwasserspiegel
Im Bereich Au dürfen gemäss GSchV Anhang 4 Ziff. 211 grundsätzlich keine Anlagen erstellt werden, die unter dem **mittleren Grundwasserspiegel** liegen. Die Behörde kann Ausnahmen bewilligen, soweit die Durchflusskapazität des Grundwassers gegenüber dem unbeeinflussten Zustand um **höchstens 10 Prozent** vermindert wird. Auf die Ausnahme besteht **kein Anspruch**; sie setzt eine Interessenabwägung voraus (bestätigt über Vollzugshilfen OW und SG). Einzelne Kantone verlangen bereits für Bauteile unterhalb des **höchsten** Grundwasserspiegels eine Bewilligung (z. B. Zürich).

> Beratungshinweis: Das ist eine Frage der Projektierung. Wenn auf der Baustelle Grundwasser höher ansteht als erwartet, ist nicht die Pumpe die Lösung, sondern die Rückfrage an Planer und Kanton.

### 4. Gewässerraum
Entlang von Fliess- und Stillgewässern legen die Kantone einen Gewässerraum fest (Art. 36a GSchG). Darin dürfen nach **Art. 41c GSchV** grundsätzlich nur standortgebundene Anlagen im öffentlichen Interesse erstellt werden, etwa Brücken oder Wege; die Verordnung kennt weitere Ausnahmen (z. B. in dicht überbauten Gebieten) mit Interessenabwägung. Für **temporäre** Installationsplätze, Depots oder Zufahrten im Gewässerraum gibt es keine allgemeingültige Regel, die wir verifizieren konnten: Klären Sie solche Nutzungen vorgängig mit dem Kanton.

### 5. Fischerei
Eingriffe in Gewässer, ihren Wasserhaushalt oder Verlauf sowie in Ufer und Gewässergrund brauchen eine **fischereirechtliche Bewilligung** der kantonalen Fischereibehörde (Art. 8 BGF, SR 923.0; bestätigt). Typische Baustellenfälle: Bachquerung, Wasserhaltung im Bachbett, Ufersicherung, Einleitbauwerk. Viele Kantone untersagen technische Eingriffe während der **Schonzeiten** grundsätzlich (z. B. Merkblatt «Fischschutz auf Baustellen», Kanton Bern). Das hat direkten Einfluss auf das Bauprogramm.

### 6. Strafrecht, Kosten, Haftung
- **Art. 70 GSchG (Vergehen)**: Wer vorsätzlich Stoffe, die Wasser verunreinigen können, widerrechtlich in ein Gewässer einbringt, wird mit Freiheitsstrafe bis zu drei Jahren oder Geldstrafe bestraft; bei **Fahrlässigkeit** mit Geldstrafe (bestätigt).
- **Art. 71 GSchG (Übertretungen)**: z. B. Verstösse gegen Vorschriften oder Verfügungen; fahrlässig mit Busse.
- **Art. 54 GSchG**: Kosten behördlicher Massnahmen zur Abwehr, Feststellung und Behebung eines Schadens trägt der Verursacher.
- **Unternehmen**: Nur wenn eine Tat wegen mangelhafter Organisation keiner bestimmten Person zugerechnet werden kann, kommt eine Strafbarkeit des Unternehmens selbst in Frage (Art. 102 StGB) – nicht automatisch; Einzelfall durch Juristen zu beurteilen.
- **Getrennte Verfahren**: Strafverfahren, Kostenverfügung (Art. 54) und zivilrechtliche Haftung laufen unabhängig voneinander.
- **Zivilrechtlich** können Geschädigte (z. B. Fischereiberechtigte, Wasserversorgung) Schadenersatz verlangen.

**Konsequenz für Ihre Rolle**: Instruktion, Organisation und Kontrolle müssen nachweisbar sein. Gute Dokumentation schützt Umwelt und Mitarbeitende zugleich.

§> Gesetzlich verbindlich. Artikel sinngemäss wiedergegeben; ausgewählte Inhalte über kantonale Vollzugshilfen bestätigt. Wortlaut auf Fedlex prüfen.` },

    decision: { id: 'm2-l1-abw', kind: 'decision', title: 'Abwägung: Grundwasser höher als erwartet', questionId: 'm2-d01' },
    task: { id: 'm2-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Auflagen in Massnahmen übersetzen', taskId: 'm2-t1' },
  },

  // =====================================================================
  'm2-l2': {
    brief: { id: 'm2-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Jeder Schacht führt irgendwohin – meist nicht dorthin, wo man denkt.** Ein Meteorschacht führt ungereinigt in den Bach oder ins Grundwasser, ein Schmutzwasserschacht zur ARA.

**Sauberes Wasser fernhalten, verschmutztes trennen.** Je weniger Wasser verschmutzt wird, desto kleiner und günstiger die Behandlung.

**Auch sauberes Wasser hat einen vorgeschriebenen Weg**: zuerst versickern, wenn das nicht geht in ein Gewässer – nicht in die Schmutzwasserkanalisation.

**Grundlage ist der Kanalisationskataster der Gemeinde**, nicht der Schachtdeckel.` },

    example: { id: 'm2-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Belagsersatz im Quartier', context: 'Tiefbau', text: `Belagssanierung einer Quartierstrasse in Baden: Fräsen, Reinigen, neuer Deckbelag. Beim Nassfräsen entsteht feinstoffreiches Wasser, das in die Strasseneinlaufschächte läuft. Die Strassenentwässerung ist laut Kataster an die Meteorleitung angeschlossen, die nach 400 m in die Limmat mündet.

Massnahmen der Bauleitung: Einlaufschächte im Arbeitsbereich mit Filtervlies bzw. Abdeckmatten sichern, Fräsgut und Schlamm mit Saugwagen aufnehmen, Kehrmaschine mit Absaugung statt Abspritzen, Schächte nach Abschluss kontrollieren und Schlammsammler leeren lassen.

**Lernpunkt**: Auch im Strassenbau ohne Beton entstehen Trübstoffe. Strasseneinläufe sind fast immer Meteor- oder Mischwassereinläufe – sie gehören in jede Arbeitsvorbereitung.` },

    deep: { id: 'm2-l2-deep', kind: 'deep', title: 'Fachvertiefung: Entwässerung lesen, rechnen, organisieren', text: `### 1. Die gesetzliche Reihenfolge für unverschmutztes Wasser
Art. 7 Abs. 2 GSchG legt fest: Nicht verschmutztes Abwasser ist nach den Anordnungen der kantonalen Behörde **versickern** zu lassen. Erlauben die örtlichen Verhältnisse dies nicht, kann es in ein **oberirdisches Gewässer** eingeleitet werden – wenn möglich mit Rückhaltemassnahmen. Die Kanalisation ist für sauberes Wasser nicht vorgesehen: **Fremdwasser** verdünnt das Abwasser, belastet die ARA und erhöht die Entlastungen bei Regen. Viele Gemeinden lassen sauberes Grundwasser aus Wasserhaltungen deshalb nur ausnahmsweise in die Kanalisation.

§> Art. 7 GSchG gesetzlich verbindlich (sinngemäss). Konkrete Anordnungen: Kanton und Gemeinde.

### 2. Kataster und GEP lesen
Die Gemeinde führt die **Generelle Entwässerungsplanung (GEP)** und den Kanalisationskataster. Darin sehen Sie: Leitungsart (Schmutz-, Regen- bzw. Meteor-, Mischabwasser), Fliessrichtung, Schächte, Einleitstellen, Versickerungsanlagen. Farben und Kürzel unterscheiden sich je nach Gemeinde – lesen Sie immer die Legende. Typische Fallen auf der Baustelle:
- Ein alter Hausanschluss ist im Kataster als Schmutzwasser verzeichnet, wurde aber umgebaut.
- Drainageleitungen der Nachbarliegenschaft führen in die Baugrube.
- Strasseneinläufe sind an die Meteorleitung angeschlossen, obwohl das Quartier sonst im Mischsystem entwässert.
Im Zweifel: Färbeversuch oder Kanal-TV durch die Gemeinde.

### 3. Wie viel Wasser kommt? Eine einfache Abschätzung
Für befestigte Flächen gilt näherungsweise: **Abfluss Q = ψ × i × A**
- ψ = Abflussbeiwert (befestigte Fläche ca. 0.8–0.9, Kies- oder Baugrubensohle deutlich weniger, je nach Sättigung),
- i = Regenintensität in l/(s·ha) – der massgebende Wert kommt vom Planer bzw. aus regionalen Daten,
- A = Fläche in ha.
**Rechenbeispiel** (Annahmen, keine Bemessung): Installationsplatz und Baugrube 2'000 m² = 0.2 ha, ψ = 0.9, angenommene Intensität 200 l/(s·ha) → Q = 0.9 × 200 × 0.2 = **36 l/s**. Eine übliche Tauchpumpe fördert deutlich weniger. Das zeigt: Starkregen lässt sich nicht «wegpumpen», er muss **zurückgehalten** oder von der Baustelle **ferngehalten** werden.

> Rechenwerkzeug: Praxiswerkzeuge → «Abschätzungen: Regenabfluss und Absetzfläche».

### 4. Einleitungen in die Kanalisation
Im Bereich der öffentlichen Kanalisation muss verschmutztes Abwasser in die Kanalisation eingeleitet werden (Anschlusspflicht, Art. 11 GSchG); Abwasser, das den Anforderungen für die Einleitung nicht entspricht, ist vorzubehandeln (Art. 12 GSchG, sinngemäss – Wortlaut prüfen). Für Baustellen heisst das: Die Kanalisation ist ein möglicher Weg, aber nur mit Zustimmung und unter Bedingungen.

Jede Einleitung von Baustellenabwasser in die Kanalisation braucht eine Bewilligung bzw. Zustimmung der Gemeinde (bestätigt über das Merkblatt Baustellenabwasser des Kantons Aargau); für Einleitungen in Gewässer ist der Kanton zuständig. Fragen Sie bei der Gemeinde: Welche Werte gelten (pH, absetzbare Stoffe)? Welche Mengen? Welcher Schacht? Welche Kontrollen und Meldungen?

### 5. Organisation
- **AVOR**: Entwässerung im Installationsplan einzeichnen, Anlagen offerieren, Bewilligungen terminieren.
- **Start**: Schächte markieren und abdecken, Instruktion vor Ort (5 Minuten genügen, wenn der Plan klar ist).
- **Betrieb**: Verantwortliche Person für die Anlagen, Kontrollrhythmus, Material für Notfälle.
- **Phasenwechsel**: Konzept nachführen – im Ausbau kommen Reinigungs- und Schleifwasser, Farben und Lösungsmittel dazu.` },

    decision: { id: 'm2-l2-abw', kind: 'decision', title: 'Abwägung: Wohin mit sauberem Grundwasser?', questionId: 'm2-d02' },
    task: { id: 'm2-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Schächte zuordnen und Waschplatz festlegen', taskId: 'm2-t2' },
  },

  // =====================================================================
  'm2-l3': {
    brief: { id: 'm2-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Betonwaschwasser ist Lauge**: pH 11–13. Für Fische und Kleinlebewesen ist es akut giftig, auch in kleinen Mengen.

**Verdünnen hilft praktisch nicht**: Um von pH 12 auf pH 9 zu kommen, bräuchte es rund das Tausendfache an Wasser.

**Die Regel für die Baustelle**: so wenig wie möglich entstehen lassen, absetzen, mit CO₂ neutralisieren, pH messen und aufschreiben, nur mit Bewilligung ableiten – meist in die Schmutzwasserkanalisation.

**Zielbereich für die Ableitung: pH 6.5–9.0** (GSchV Anhang 3.2; massgebend sind Bewilligung und kantonales Merkblatt).` },

    example: { id: 'm2-l3-example-2', kind: 'example', title: 'Beispiel aus dem Hochbau: Kernbohrungen im Spitalumbau', context: 'Hochbau', text: `Umbau eines Spitaltrakts aus den 1970er-Jahren: 140 Kernbohrungen für neue Leitungen. Die Bohrequipe lässt das Bohrwasser bisher über die Bodenabläufe laufen – «das geht ja in die Kanalisation».

Die Umweltfachperson stellt fest: Das Wasser ist grau, stark alkalisch und feinstoffreich; es lagert sich in den Grundleitungen ab, und die Einleitung ist nicht bewilligt. Zudem fehlt für die Bohrstellen die Schadstoffabklärung: In Bodenbelägen und Klebern dieses Baujahrs kann Asbest vorkommen.

Lösung: Bohrwasser mit Wassersauger direkt an der Krone fassen, in einen Absetzbehälter geben, Klarwasser neutralisieren bzw. mit dem Schlamm entsorgen lassen; Bodenabläufe abdecken. Vor dem Bohren: Schadstoffermittlung prüfen bzw. nachholen (Bezug Arbeitssicherheit und Modul 3).

**Lernpunkt**: Auch kleine Mengen werden über viele Arbeitstage relevant – und Umwelt- und Arbeitssicherheitsfragen hängen oft zusammen.` },

    deep: { id: 'm2-l3-deep', kind: 'deep', title: 'Fachvertiefung: Chemie, Neutralisation, Messung, Schlamm', text: `### 1. Warum Betonwasser so alkalisch ist – und so bleibt
Beim Hydratisieren von Zement entsteht Calciumhydroxid. Es löst sich gut genug, um das Wasser auf pH 12–13 zu bringen, und wirkt als **Puffer**: Wird ein Teil neutralisiert, löst sich neues Hydroxid aus Feststoffen nach. Deshalb gilt: **zuerst Feststoffe absetzen**, sonst steigt der pH nach der Neutralisation wieder an.

**Verdünnung**: Ein pH-Schritt entspricht dem Faktor 10. Rein rechnerisch (idealisiert, ohne Puffer) müsste man Wasser von pH 12 rund tausendfach verdünnen, um pH 9 zu erreichen. Das ist keine Mengenberechnung für reales Betonwasser – dort löst sich laufend Hydroxid aus Feststoffen nach, es bräuchte noch mehr. Die Zahl zeigt nur, warum Verdünnen nichts bringt; zudem bliebe die Fracht gleich. Verdünnen ist weder wirksam noch zulässig.

### 2. Neutralisieren mit CO₂
CO₂ bildet im Wasser Kohlensäure und fällt dabei Calcium als Calciumcarbonat aus. Vorteile: gut dosierbar, und es müssen keine Mineralsäuren gelagert werden. Wie tief der pH bei einer Überdosierung sinkt, hängt aber von Wasserchemie, CO₂-Druck und Kontaktzeit ab – **eine feste Untergrenze ist nicht garantiert**. Deshalb gilt auch mit CO₂: laufend messen, Endkontrolle, Alarm und automatisches Stoppen der Ableitung.
Praxis:
- **Automatische Anlagen** messen den pH laufend, dosieren CO₂ und stoppen die Ableitung bei Abweichung. Das ist die robusteste Lösung für grosse Mengen (Spezialtiefbau, Tunnel, grosse Rohbauten).
- **Batch-Behandlung** in einem Behälter (Begasungslanze, Messung, Ableitung nach Freigabe) genügt für kleinere Mengen.
- **Arbeitssicherheit**: CO₂ ist schwerer als Luft und sammelt sich in Gruben, Schächten und geschlossenen Containern – Erstickungsgefahr. Flaschen sichern, Aufstellung belüftet, Arbeiten in Schächten nur nach Freimessen (Suva-Regeln für enge Räume).

### 3. Messen und nachweisen
- **pH-Teststreifen** sind für die Grobkontrolle geeignet, aber ungenau im Bereich 8–10.
- **pH-Elektroden** liefern belastbare Werte, wenn sie mit Pufferlösungen (für den alkalischen Bereich z. B. pH 7 und pH 10) **kalibriert** und sauber gehalten werden. Das Intervall hängt von der Betriebsart ab: ein **Handgerät** vor dem Gebrauch, eine **Dauermess-Sonde** in festen Abständen gemäss Bewilligung bzw. Hersteller (laut externem Prüfbericht nennt das VSA-Merkblatt 2024.10 dafür zwei Wochen – nicht selbst geprüft). Interne Standards dürfen strenger sein.
- Nach der Neutralisation ist eine **pH-Endkontrolle** vor der Ableitung nötig (bestätigt: Merkblatt Kanton Schwyz).
- Protokoll: Datum, Zeit, Wert, Gerät, Kalibrierung, Visum, Massnahme bei Abweichung.

### 4. Einleitwerte
Baustellenabwasser ist in der GSchV über Anhang 3.3 erfasst (laut externem Prüfbericht Ziff. 23; nicht selbst am Volltext geprüft). Kantonale Merkblätter verlangen, dass es die allgemeinen Anforderungen von Anhang 3.2 Ziff. 2 erfüllt, darunter einen **pH-Bereich von 6.5–9.0**, für Gewässer und Kanalisation (bestätigt: Merkblätter AG, SZ, FR). Für die Kanalisation lässt die Verordnung Abweichungen zu, wenn sich das Abwasser in der Kanalisation genügend vermischt – das entscheidet die Behörde, nicht die Baustelle. Ältere Merkblätter nennen teilweise andere Werte (z. B. 9.5 für die Kanalisation); massgebend ist die aktuelle Bewilligung.

### 5. Schlamm und Restbeton
Absetzschlamm und Restbeton sind **Abfälle**. Sie werden gemäss Abfallrecht (VVEA) verwertet oder abgelagert; welche Kategorie gilt, ergibt die Abfallklassierung (Abfallcode nach LVA, gefährliche Eigenschaften). Den Entsorgungsweg klären Sie mit dem Entsorger bzw. der kantonalen Fachstelle. Nicht zulässig: Schlamm im Aushub «verschwinden» lassen oder in die Bauschuttmulde kippen, wenn diese nicht dafür vorgesehen ist.

### 6. Kreislauf statt Ableitung
Geklärtes Waschwasser kann – je nach Anlage – für weitere Reinigungen wiederverwendet werden. Betonwerke nehmen Rest- und Waschwasser teilweise zurück. Jeder Liter, der nicht abgeleitet wird, spart Behandlung und Bewilligungsaufwand.

### 7. Sonderfall Tunnel und Stollen
Tunnelabwasser ist oft gleichzeitig trüb, alkalisch (Spritzbeton) und ölhaltig; beim Sprengvortrieb kommen Stickstoffverbindungen aus Sprengstoffen dazu. Solche Baustellen haben eigene Behandlungsanlagen und Überwachungsprogramme in der Bewilligung – hier arbeiten Sie mit Spezialisten zusammen.` },

    decision: { id: 'm2-l3-abw', kind: 'decision', title: 'Abwägung: Kleine Baustelle, vier Betonetappen', questionId: 'm2-d03' },
    task: { id: 'm2-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Behandlung für eine Spritzbeton-Baugrube planen', taskId: 'm2-t3' },
  },

  // =====================================================================
  'm2-l4': {
    brief: { id: 'm2-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Trübes Wasser schadet länger, als man es sieht**: Feinstoffe verstopfen die Bachsohle (Kolmation) und zerstören Laichplätze über Monate.

**Ein Absetzbecken wirkt über seine Oberfläche, nicht über seine Tiefe.** Sand setzt sich in Minuten ab, Silt in Stunden, Ton praktisch nicht.

**Deshalb**: Wasser gar nicht erst trüb werden lassen (Fremdwasser fernhalten), genug Fläche planen, Schlamm regelmässig entfernen – und bei Ton frühzeitig eine Fachlösung abklären.

**Wasserhaltung, Einleitung und Versickerung brauchen Bewilligungen.** Bei Trübung am Auslauf: abstellen, zurückhalten, melden.` },

    example: { id: 'm2-l4-example-2', kind: 'example', title: 'Beispiel aus dem Hochbau: Dreck auf der Strasse', context: 'Hochbau', text: `Innerstädtische Baugrube in Luzern, lehmiger Aushub, 60 Lastwagenfahrten pro Tag. Die Lastwagen tragen Schlamm auf die Strasse; bei Regen läuft braunes Wasser in die Strasseneinläufe – Meteorleitung in die Reuss. Die Stadt reklamiert.

Massnahmen: Reifenwaschanlage mit Wasserkreislauf und Absetzbecken an der Ausfahrt, befestigte Baustellenzufahrt (Kies-Tragschicht oder Platten), tägliche Strassenreinigung mit Saugkehrmaschine statt Abspritzen, Einläufe im Ausfahrtsbereich mit Filtersäcken sichern und regelmässig leeren.

**Lernpunkt**: Trübstoffe verlassen die Baustelle nicht nur über Pumpen, sondern auch über Räder.` },

    deep: { id: 'm2-l4-deep', kind: 'deep', title: 'Fachvertiefung: Physik des Absetzens, Messen, Bewilligungen', text: `### 1. Wie schnell sinkt ein Korn?
Für feine Körner gilt näherungsweise das Gesetz von Stokes: Die Sinkgeschwindigkeit wächst mit dem **Quadrat des Korndurchmessers**. Halber Durchmesser – vierfach langsamer. Für Quarzkörner in Wasser von etwa 10 °C ergeben sich ungefähr:

- Feinsand 0.1 mm: ca. 7 mm/s (≈ 25 m/h)
- Grobsilt 0.06 mm: ca. 2.5 mm/s (≈ 9 m/h)
- Mittelsilt 0.02 mm: ca. 0.3 mm/s (≈ 1 m/h)
- Feinsilt 0.006 mm: ca. 0.025 mm/s (≈ 9 cm/h)
- Ton 0.002 mm: ca. 0.003 mm/s (≈ 1 cm/h)

Kälteres Wasser ist zäher, die Körner sinken langsamer.

### 2. Warum die Oberfläche zählt
Ein Korn wird zurückgehalten, wenn es den Boden erreicht, bevor das Wasser das Becken verlässt. Daraus folgt (Prinzip nach Hazen): **erforderliche Oberfläche A ≥ Zufluss Q ÷ Sinkgeschwindigkeit**. Die Tiefe spielt in diesem idealisierten Modell keine Rolle – sie dient als Schlammspeicher und beruhigt die Strömung.

**Rechenbeispiel** (Abschätzung, keine Bemessung): Q = 8 l/s = 28.8 m³/h, Ziel Mittelsilt (≈ 1 m/h) → A ≈ 29 m². Mit einem Zuschlag für Turbulenz und Kurzschlussströmung (z. B. Faktor 2) → rund 60 m². Ein Absetzcontainer hat typischerweise 12–15 m² Oberfläche. Für Ton wären bei gleichem Zufluss mehrere tausend Quadratmeter nötig – unmöglich. Daraus folgen die praktischen Strategien: Zufluss reduzieren, Becken in Serie, Flockung oder Filtration.

> Rechenwerkzeug in dieser Lektion und unter Praxiswerkzeuge. Die Bemessung einer Anlage gehört in die Planung (Fachplaner, Anlagenlieferant).

### 3. Gute Becken im Betrieb
- **Einlauf beruhigen** (Prallplatte, Tauchwand), Abzug an der Oberfläche über die ganze Breite, keine Pumpe im Beckenboden.
- **Serie statt gross**: zwei Kammern hintereinander verhindern Kurzschlussströmung.
- **Schlammstand** regelmässig kontrollieren; ein halbvolles Becken hat seine Wirkung schon weitgehend verloren, weil die Strömung den Schlamm wieder aufwirbelt.
- **Pumpensumpf** in der Grube mit Kiesfilter; Pumpe so hängen, dass sie nicht vom Boden saugt.
- **Weitere Mittel**: Lamellenklärer (mehr wirksame Fläche auf kleinem Raum), Filtersäcke aus Geotextil für kleine Mengen, Sandfilter. **Flockungsmittel** nur nach Abklärung mit der kantonalen Fachstelle.

### 4. Messen
- **Sichtkontrolle und Fotos** am Auslauf zu festen Zeiten (einfach, dokumentierbar).
- **Absetzprobe** im Imhofftrichter: absetzbare Stoffe in ml/l nach festgelegter Zeit.
- **Labor**: gesamte ungelöste Stoffe (GUS) in mg/l, wenn die Bewilligung Werte verlangt.
- Bei Einleitung in Gewässer: Vergleich oberhalb/unterhalb der Einleitstelle.

### 5. Bewilligungen und Schutz der Fische
Grundwasserabsenkungen und Wasserhaltungen sind in den besonders gefährdeten Bereichen bewilligungspflichtig (Art. 32 GSchV, kantonale Praxis; bestätigt). Einleitung in ein Gewässer und Versickerung brauchen eine kantonale Bewilligung (Art. 7 GSchG). Arbeiten **im** Gewässer (Bachquerung, Wasserhaltung im Bachbett) brauchen zusätzlich eine fischereirechtliche Bewilligung (Art. 8 BGF); in **Schonzeiten** sind sie oft nicht erlaubt.

### 6. Boden und Wasser hängen zusammen
Nasser, befahrener Boden wird verdichtet und erodiert – das trübe Wasser in der Grube ist oft die Folge von Bodenproblemen. Bodenschutz (Modul 4, in Entwicklung) ist deshalb immer auch Gewässerschutz.` },

    decision: { id: 'm2-l4-abw', kind: 'decision', title: 'Abwägung: Container laufen trüb', questionId: 'm2-d04' },
    task: { id: 'm2-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Reicht der Absetzcontainer?', taskId: 'm2-t4' },
  },

  // =====================================================================
  'm2-l5': {
    brief: { id: 'm2-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Öl und Treibstoff gehören auf dichte Flächen mit Rückhalt** – weg von Schächten, Gewässern und Schutzzonen, mit Notfallmaterial in Griffweite.

**Wenn etwas ausläuft**: zuerst die eigene Sicherheit – dann **gleichzeitig** stoppen, Schacht abdecken und 118 oder 117 alarmieren (zu zweit: eine Person alarmiert sofort) – danach aufnehmen und dokumentieren. Nie wegspülen, nie abwarten.

**Verschmutztes Bindemittel und Erdreich werden nach Abfallklassierung entsorgt** – meist als Sonderabfall mit Begleitschein.

**Nach dem Ereignis zählt die Ursache**: Warum ist es passiert, und wie verhindern wir es auf allen Baustellen?` },

    example: { id: 'm2-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Bagger im Bachbett', context: 'Tiefbau', text: `Ersatz eines Durchlasses unter einer Gemeindestrasse im Kanton Zürich: Ein Bagger muss zwei Tage im Bachbett arbeiten. Die Bewilligungen verlangen u. a.: fischereirechtliche Bewilligung mit Termin ausserhalb der Schonzeit, Abfischung durch den Fischereiaufseher vor Beginn, Wasserumleitung, biologisch schnell abbaubares Hydrauliköl, tägliche Leckagekontrolle, Betankung nur ausserhalb des Gewässerraums auf Tankwanne, Ölsperre unterhalb der Baustelle.

Am zweiten Tag zeigt sich ein Schillern an der Ölsperre: Ein Schlauchanschluss tropft. Der Maschinist stellt ab, legt Bindevlies, der Polier informiert gemäss Bewilligung die Fachstelle. Weil Sperre und Material bereitlagen, bleibt es bei einem kleinen Ereignis.

**Lernpunkt**: Arbeiten im Gewässer verlangen Vorbereitung auf das Ereignis, nicht nur Vorsicht.` },

    deep: { id: 'm2-l5-deep', kind: 'deep', title: 'Fachvertiefung: Anlagenpflichten, Notfallorganisation, Entsorgung', text: `### 1. Pflichten für Anlagen mit wassergefährdenden Flüssigkeiten
Art. 22 GSchG verpflichtet die **Inhaber** von Anlagen mit wassergefährdenden Flüssigkeiten, die nötigen baulichen und apparativen Schutzvorrichtungen zu erstellen, regelmässig zu kontrollieren und einwandfrei zu betreiben (sinngemäss). Auf der Baustelle ist «Inhaber» praktisch der Unternehmer, der Tank, Fässer und Maschinen betreibt. In den besonders gefährdeten Bereichen können Lageranlagen zusätzlich bewilligungspflichtig sein; Details und Rückhaltevolumen regeln die kantonalen Vorgaben.

### 2. Was auf Baustellen wassergefährdend ist
Nicht nur Diesel: Hydraulik- und Motoröle, Schalöle, Bitumenemulsionen und Voranstriche, Betonzusatzmittel, Epoxid- und Polyurethanharze, Farben und Lösungsmittel, Reinigungsmittel, Frostschutz. Die **Sicherheitsdatenblätter** (Abschnitt 6 «Massnahmen bei unbeabsichtigter Freisetzung», Abschnitt 12 «Umweltbezogene Angaben») sagen, was im Ereignis zu tun ist – Vertiefung in Modul 7.

### 3. Notfallmaterial richtig wählen und platzieren
- **Schachtabdeckmatten** für jeden Meteorschacht im Gefahrenbereich – das wichtigste Material überhaupt.
- **Bindemittel**: Granulat für befestigte Flächen; Vliese und Schläuche für Wasseroberflächen (ölselektiv, nehmen kein Wasser auf).
- **Ölsperren** für Fliessgewässer: schräg zur Strömung setzen, damit das Öl ans Ufer geleitet und dort aufgenommen werden kann.
- **Auffangbehälter und Säcke** für verschmutztes Material, Handschuhe, Schaufel.
- Standort: dort, wo betankt, gelagert und gearbeitet wird – nicht im abgeschlossenen Magazin.

### 4. Alarmierung und Kommunikation
- Extern: **118** (Feuerwehr, Ölwehr) oder **117** (Polizei); diese bieten das kantonale Pikett auf. Bei Gefahr für eine Trinkwasserfassung zusätzlich die Wasserversorgung (gemäss Notfallplan).
- Intern: Alarmkette mit Stellvertretungen; die Umweltfachperson berät, die Linie entscheidet.
- Medien und Anwohnende: Auskunft nur durch die bezeichnete Stelle; sachlich, ohne Spekulation.

### 5. Entsorgung und Nachweise
Ölverschmutztes Bindemittel, Erdreich und Schachtinhalt werden zuerst **klassiert** (Abfallcode gemäss LVA, gefährliche Eigenschaften) – meist ergibt das **Sonderabfall**. Sie werden einem berechtigten Entsorger übergeben; für Sonderabfälle ist ein **Begleitschein** nach der Verordnung über den Verkehr mit Abfällen (VeVA, SR 814.610) nötig (sinngemäss; Einzelheiten mit dem Entsorger klären). Die Nachweise gehören zur Ereignisdokumentation.

### 6. Vom Ereignis zur Verbesserung
Eine wirksame Nachbereitung beantwortet: Was ist passiert? Warum (technisch, organisatorisch, menschlich)? Warum wurde es nicht früher erkannt? Welche Massnahme verhindert die Wiederholung – auf allen Baustellen? Wer setzt sie bis wann um, und wie prüfen wir, ob sie wirkt? Das entspricht der Korrekturmassnahme nach ISO 14001 (Abschnitt 10.2 der Ausgabe 2015; in der Ausgabe 2026 prüfen), die Notfallvorsorge dem Abschnitt 8.2.` },

    decision: { id: 'm2-l5-abw', kind: 'decision', title: 'Abwägung: Ölfilm im Baugrubenwasser', questionId: 'm2-d05' },
    task: { id: 'm2-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Notfallorganisation Installationsplatz am Bach', taskId: 'm2-t5' },
  },

  // =====================================================================
  'm2-l6': {
    brief: { id: 'm2-l6-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Entwässerungskonzept beantwortet sechs Fragen je Bauphase**: Was fällt an? Wie trennen? Wie behandeln? Wohin ableiten? Wer kontrolliert? Was gilt im Notfall?

**Fehler auf Baustellen sind meistens Planungs- und Organisationsfehler** – kein Waschplatz, keine Zuständigkeit, keine Regel für Starkregen.

**Als Umweltfachperson beraten Sie**: Risiko benennen, Pflicht und Empfehlung trennen, Varianten mit Kosten zeigen, klar empfehlen, schriftlich festhalten. Entscheiden und umsetzen muss die Linie.

**Was Sie nicht beurteilen können, sagen Sie** – und ziehen Fachleute bei.` },

    example: { id: 'm2-l6-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Unterführung im Grundwasser', context: 'Tiefbau', text: `Neue Personenunterführung unter einer Bahnlinie, Baugrube mit Spundwänden im Grundwasser, Bauzeit 14 Monate. Das Konzept der Unternehmung gliedert sich nach Phasen:

- **Phase 1 Spundwände, Aushub**: Grundwasserabsenkung (bewilligt, Mengenmessung), Absetzbecken mit Lamellenklärer, Einleitung in den Vorfluter, tägliche Sichtkontrolle, wöchentlich Probe.
- **Phase 2 Unterwasserbeton, Sohle, Wände**: alkalisches Wasser – CO₂-Anlage mit automatischer Abschaltung, Umleitung in Schmutzwasserkanal nur nach Zustimmung der Gemeinde.
- **Phase 3 Ausbau, Abdichtung**: Bitumen und Harze – Lagerung auf Wannen, keine Reinigung über Schächte.

Jede Phase hat eine verantwortliche Person, ein Messprogramm und eine Notfallregel. Bei der Kontrolle durch den Kanton genügt ein Blick in den Ordner.

**Lernpunkt**: Ein gutes Konzept ist kurz, phasenbezogen und benennt Personen statt Absichten.` },

    deep: { id: 'm2-l6-deep', kind: 'deep', title: 'Fachvertiefung: Konzept, Kontrolle, Beratung, Eskalation', text: `### 1. Schnittstellen im Werkvertrag
Viele Lücken entstehen zwischen Bauherrschaft, Planern und Unternehmung. Klären Sie früh:
- Wer erstellt das Konzept, wer holt Bewilligungen ein?
- Wer stellt, betreibt und wartet die Anlagen, wer zahlt CO₂ und Schlammentsorgung?
- Wer misst und meldet – und an wen?
- Ist die Norm SIA 431 vertraglich vereinbart? Sind Leistungen im Leistungsverzeichnis enthalten?
Unklare Leistungen werden auf der Baustelle zum Streitfall – und dann oft weggelassen.

### 2. Kontrollkonzept
Unterscheiden Sie **Eigenkontrolle** (Polier, täglich/wöchentlich, einfache Mittel) und **Fremdkontrolle** (Umweltfachperson stichprobenweise, Behörde, Umweltbaubegleitung). Ein gutes Kontrollkonzept legt fest: Was wird geprüft, wie oft, womit, durch wen, wo dokumentiert, was passiert bei Abweichung? Wenige, klar festgelegte Kontrollen wirken besser als lange Checklisten, die niemand ausfüllt.

### 3. Kennzahlen für die Leitung
Sinnvoll und einfach: Anzahl Baustellen mit genehmigtem Konzept vor Baustart; Anteil Begehungen ohne kritische Feststellung; Anzahl Ereignisse und Meldungen; Zeit bis zur Erledigung von Massnahmen. Kennzahlen dienen der Steuerung – nicht der Schuldzuweisung.

### 4. Das Beratungsgespräch
Eine bewährte Struktur für Gespräche mit Bauführern und Projektleitern:
1. **Lage**: Was sehe ich, was ist geplant?
2. **Risiko**: Was kann passieren, wie wahrscheinlich, wie schwer?
3. **Einordnung**: Was ist Pflicht (Gesetz, Auflage), was Empfehlung (Norm, Praxis)?
4. **Optionen**: zwei bis drei Varianten mit Kosten- und Terminfolgen.
5. **Empfehlung**: eine klare Empfehlung mit Begründung.
6. **Nächster Schritt**: wer, was, bis wann – schriftlich bestätigt.

Nehmen Sie Kosten- und Terminargumente ernst. Wer nur mit dem Gesetz argumentiert, wird bei der nächsten Frage nicht mehr gefragt.

### 5. Eskalation
Wenn eine kritische Abweichung nicht behoben wird: schriftlich festhalten, Vorgesetzte der Linie informieren, bei unmittelbarer Gefahr für ein Gewässer die Arbeit unterbrechen lassen – wer dazu befugt ist, muss im Unternehmen geregelt sein. Klären Sie Ihre Befugnisse, bevor Sie sie brauchen.

### 6. Verbindung zu ISO 14001 (Abschnittsnummern nach Ausgabe 2015; seit April 2026 gilt die Ausgabe 2026)
Das Entwässerungskonzept ist eine Massnahme der **betrieblichen Planung und Steuerung** (Abschnitt 8.1), die Notfallregeln gehören zur **Notfallvorsorge** (8.2), Messungen und Begehungen zur **Überwachung** (9.1), Abweichungen und Ereignisse zu **Nichtkonformität und Korrekturmassnahmen** (10.2). Wer das Konzept auf allen Baustellen gleich aufbaut, schafft einen nachvollziehbaren Prozess für Audits – Vertiefung in Modul 10.` },

    decision: { id: 'm2-l6-abw', kind: 'decision', title: 'Abwägung: «Kannst du das bis morgen absegnen?»', questionId: 'm2-d06' },
    task: { id: 'm2-l6-task', kind: 'sitetask', title: 'Baustellenaufgabe: Kontrollplan für eine Hochbaustelle', taskId: 'm2-t6' },
  },
};
