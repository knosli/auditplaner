import type { Lesson } from '../types';

// Modul 8 «Umwelt in Bauplanung und AVOR».
// Rechtliche Aussagen sinngemäss; nur Artikel genannt, die in der App bereits über Sekundärquellen
// bestätigt wurden (Art. 16 VVEA, Art. 25a RPG, Art. 10a USG, LRV Art. 19a, LSV Art. 6) oder die
// ausdrücklich als «zu prüfen» markiert sind. Keine Schwellenwerte, keine Normzitate im Wortlaut.
// Nach externer KI-Fachprüfung vom 13.11.2026 überarbeitet (siehe docs/modul8-korrekturen.md); Prüfstatus bleibt Entwurf.

const M = 'm8';
const E = 'entwurf' as const;

export const M8_LESSONS: Lesson[] = [
  // =====================================================================
  {
    id: 'm8-l1', moduleId: M, level: 1, order: 1, review: E, minutes: 15,
    title: 'Umweltcheck vor Baustart: Bewilligung, Auflagen, Standort',
    topics: ['m8-grundlagen'],
    objectives: [
      'Die Unterlagen nennen, die vor Baustart auf Umweltanforderungen geprüft werden',
      'Auflagen aus Bewilligungen vollständig erfassen und nach Rechtsnatur einordnen',
      'Standortrisiken mit öffentlichen Karten und Katastern erkennen',
    ],
    steps: [
      { id: 'm8-l1-situation', kind: 'situation', title: 'Einstieg: Der Ordner auf dem Tisch', text: `Ihr Unternehmen hat den Zuschlag für einen Wohnbau mit Tiefgarage erhalten. Der Bauführer legt Ihnen einen dicken Ordner hin: Baubewilligung mit 14 Seiten Auflagen, Pläne, Werkvertrag, Leistungsverzeichnis. «Baustart in fünf Wochen. Kannst du schauen, ob da etwas Umweltmässiges drin ist, das uns wehtut?»

Wo fangen Sie an – und wie stellen Sie sicher, dass Sie nichts übersehen?` },
      { id: 'm8-l1-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m8-q01', 'm8-q02'] },
      { id: 'm8-l1-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Der Umweltcheck vor Baustart beantwortet drei Fragen:** Was verlangt die Bewilligung? Was verlangt der Vertrag? Was verlangt der Standort?

**Die Bewilligung** enthält Auflagen und Bedingungen – sie sind für das Projekt verbindlich, auch wenn sie in der Offerte fehlen. Nebenbewilligungen (z. B. Wasserhaltung, Einleitung, Rodung) kommen oft separat.

**Der Standort** zeigt sich auf öffentlichen Karten: Gewässerschutzbereiche und Schutzzonen, Kataster der belasteten Standorte, Kanalisationskataster, Prüfperimeter für Boden, Naturschutzinventare, Lärmempfindlichkeitsstufen.

**Ergebnis** ist eine **Auflagenliste** (Auflagenmatrix): jede Anforderung mit Quelle, Rechtsnatur und nächstem Schritt.` },
      { id: 'm8-l1-explain', kind: 'explain', title: 'Welche Unterlagen Sie prüfen', text: `### 1. Bewilligungen
- **Baubewilligung** mit Auflagen und Bedingungen, Plänen und ggf. Stellungnahmen der Fachstellen (Gewässerschutz, Boden, Lärm, Luft, Natur).
- **Nebenbewilligungen** und Zustimmungen: Grundwasserabsenkung bzw. Wasserhaltung, Einleitung in Kanalisation oder Gewässer, Rodung, Eingriff in Ufervegetation, Strassenbenützung, Nachtarbeit. Nach **Art. 25a RPG** sind die Verfahren zu koordinieren – in der Praxis kommen aber nicht alle Bewilligungen gleichzeitig.
- Bei grossen Anlagen: **Umweltverträglichkeitsbericht** (UVP nach Art. 10a USG; welche Anlagen, bestimmt die UVP-Verordnung). Die Massnahmen für die Bauphase stehen dort oft ausführlicher als in der Bewilligung.

### 2. Vertragsunterlagen
Werkvertrag, besondere Bestimmungen, Leistungsverzeichnis, Pläne, Entsorgungskonzept, Entwässerungskonzept, Bodenschutzkonzept, Schadstoffbericht. Sie zeigen, **was bestellt und bezahlt** ist (Lektion 2).

### 3. Standortgrundlagen (öffentliche Geodaten des Kantons)

| Karte / Kataster | Frage |
|---|---|
| Gewässerschutzkarte | Liegt das Projekt in Au, Ao, Zu/Zo, in einer Grundwasserschutzzone oder im Gewässerraum? |
| Kataster der belasteten Standorte | Ist die Parzelle oder eine Nachbarparzelle eingetragen? |
| Kanalisationskataster (Gemeinde) | Wohin führen die Schächte auf und neben dem Areal? |
| Prüfperimeter Boden (kantonal) | Muss Boden vor der Verschiebung untersucht werden? |
| Naturschutz- und Waldkarten | Hecken, Ufer, Wald, Inventarobjekte in der Nähe? |
| Lärmempfindlichkeitsstufen (Zonenplan) | Wie empfindlich ist die Nachbarschaft? |
| Neophyten-Standorte (wo vorhanden) | Muss Boden mit invasiven Pflanzen getrennt werden? |

Der Kanalisationskataster ist die erste amtliche Grundlage; er kann unvollständig oder veraltet sein. Bei kritischen oder unklaren Verbindungen vor Ort prüfen lassen (z. B. Kanal-TV oder Färbeversuch, in Absprache mit der Gemeinde).

§> Art. 25a RPG und Art. 10a USG sinngemäss (bereits in Modul 1 eingeführt). UVP-pflichtig sind die im Anhang der UVPV bezeichneten Anlagetypen (teils mit Schwellenwerten) – nicht jedes Projekt mit spürbaren Umweltwirkungen. Welche Karten es gibt und wie sie heissen, ist kantonal verschieden – Geoportal des Standortkantons verwenden.` },
      { id: 'm8-l1-explain-2', kind: 'explain', title: 'Auflagen erfassen und einordnen', text: `### Vollständig lesen – nicht nur die Umweltkapitel
Umweltauflagen stehen oft verstreut: unter «Allgemeines», «Kanalisation», «Bauausführung» oder als Verweis auf ein Merkblatt («Das Merkblatt XY ist einzuhalten»). Ein **hinreichend bestimmter Verweis in einer rechtskräftigen Auflage kann die Vorgaben des Merkblatts für das Projekt verbindlich machen**. Halten Sie fest, **welche Fassung** gemeint ist und **welche Teile** Vorgaben sind – Beispiele und Empfehlungen im Merkblatt bleiben Empfehlungen. Im Zweifel über die Bauleitung bei der Behörde klären. Das Merkblatt gehört in den Ordner.

### Rechtsnatur festhalten
Für jede Anforderung notieren Sie, **woher** sie kommt:
- **Gesetz / Verordnung** – gilt immer, auch ohne Auflage (z. B. Verunreinigungsverbot).
- **Behördliche Auflage** – verbindlich für dieses Projekt.
- **Norm** (z. B. SIA 431) – verbindlich, wenn im Vertrag vereinbart oder in der Auflage verlangt; sonst anerkannte Regel der Technik.
- **Vollzugshilfe** – Massstab der Behörde; verbindlich, wenn die Auflage darauf verweist.
- **Bewährte Praxis / interner Standard** – Ihre Firma verlangt es, die Behörde nicht.

### Unklarheiten und Widersprüche
Widersprechen sich zwei Auflagen oder ist eine unklar («geeignete Massnahmen»), klären Sie das **vor Baustart** über die Bauherrschaft bzw. Bauleitung mit der Behörde – schriftlich. Sie legen Auflagen nicht selbst aus.

### Go/No-Go-Punkte festhalten
Für jede Arbeit, die eine Bewilligung, Zustimmung, Meldung oder Freigabe voraussetzt, steht in der Auflagenliste ein **Go/No-Go-Punkt**: Was muss nachweislich vorliegen, bevor diese Arbeit beginnt? Typisch: Baufreigabe (wo der Kanton eine solche kennt), Bewilligung Wasserhaltung, Zustimmung zur Einleitung, Sanierung mit Freigabe des Bereichs vor dem Rückbau, Freigabe von Bodenarbeiten durch die BBB. «Zustimmung», «Bewilligung», «Meldung» und «Freigabe» sind verschiedene Dinge – notieren Sie, **welche** verlangt ist und **von wem**.

!> Eine fehlende Bewilligung (z. B. für die Wasserhaltung) ist ein Grund, mit dieser Arbeit nicht zu beginnen. Melden Sie sie sofort – nicht erst, wenn der Bagger steht. Andere Arbeiten können beginnen, **soweit für sie alle nötigen Freigaben vorliegen**.` },
      { id: 'm8-l1-diagram', kind: 'diagram', title: 'Schema: Vom Projekt zur Ausführung', diagram: 'bewilligungsweg', caption: 'Wo Umweltanforderungen entstehen und wo die Unternehmung sie übernimmt. Vereinfachte Lernhilfe.' },
      { id: 'm8-l1-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Wohnbau mit Tiefgarage', context: 'Hochbau', text: `Beim Durchsehen der Bewilligung findet die Umweltbeauftragte unter «Kanalisation» den Satz: «Für die Wasserhaltung ist vor Baubeginn beim kantonalen Amt eine Bewilligung einzuholen.» Die Gewässerschutzkarte zeigt Bereich Au, der Baugrundbericht Grundwasser zwei Meter über der Baugrubensohle. Eine Bewilligung liegt nicht im Ordner. Sie meldet das der Bauleitung schriftlich; die Bauherrschaft reicht das Gesuch ein, der Aushub unter den Grundwasserspiegel wird im Terminplan nach hinten geschoben.

**Lernpunkt**: Die wichtigste Umweltauflage stand nicht im Kapitel «Umwelt» – und ohne den Kartenblick wäre ihr Gewicht nicht erkannt worden.` },
      { id: 'm8-l1-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Werkleitungsersatz in der Altstadt', context: 'Tiefbau', text: `Für einen Werkleitungsersatz gibt es keine Baubewilligung im klassischen Sinn, aber eine Verfügung der Stadt mit Auflagen zu Lärm (Massnahmenstufe B, Nachtarbeit nur mit Bewilligung), Verkehr und Entsorgung. Der Kataster der belasteten Standorte zeigt im Abschnitt eine ehemalige Gasfabrik. Die Umweltbeauftragte plant mit der Bauleitung ein separates Zwischenlager für verdächtigen Aushub und lässt die Analyse- und Entsorgungswege vor Baustart festlegen.

**Lernpunkt**: Auch Tiefbauprojekte ohne «Baubewilligung» haben Auflagen – und der Standort bringt eigene Risiken mit, die in keiner Auflage stehen.` },
      { id: 'm8-l1-deep', kind: 'deep', title: 'Fachvertiefung: Systematischer Umweltcheck in der AVOR', text: `### 1. Warum der Check so früh kommen muss
Umweltmassnahmen brauchen **Platz, Zeit und Geld**: ein Waschplatz mit Absetzbecken, ein separates Zwischenlager, eine Kiespiste, ein Unterbruch während der Brutzeit. Wer diese Punkte erst auf der Baustelle entdeckt, hat nur noch schlechte Optionen: improvisieren, verzögern oder – im schlimmsten Fall – gegen eine Auflage verstossen. In der AVOR dagegen lässt sich fast alles einplanen.

### 2. Ein Ablauf, der sich bewährt hat
1. **Unterlagen sammeln**: Bewilligung inkl. aller Beilagen und Verweise, Nebenbewilligungen, Vertragsunterlagen, Konzepte, Gutachten (Baugrund, Schadstoffe, Boden).
2. **Standort prüfen**: kantonales Geoportal und Kanalisationskataster; bei Rückbau Baujahr und Schadstoffbericht.
3. **Auflagenliste erstellen**: jede Anforderung mit Fundstelle, Rechtsnatur, Adressat und Frist.
4. **Lücken markieren**: Was fehlt? (z. B. Nebenbewilligung, Entwässerungskonzept, Einleitzustimmung, Analyse).
5. **Widersprüche und Unklarheiten** sammeln und über Bauleitung/Bauherrschaft klären.
6. **Übergabe an die Massnahmenplanung** (Lektion 4): aus der Liste wird der Umweltmassnahmenplan.

### 3. Wer ist Adressat?
Auflagen richten sich **in der Regel** an die Gesuchstellerin bzw. den Gesuchsteller – meist die **Bauherrschaft**. Wer im Einzelfall verpflichtet ist, ergibt sich aus dem konkreten Entscheid und dem kantonalen Recht: Einzelne Pflichten (z. B. die Meldung von Baubeginn und Bauvollendung) können je nach Kanton ausdrücklich die Bauleitung oder die Unternehmung treffen. Die Bauherrschaft überträgt die Umsetzung über Ausschreibung und Werkvertrag an Planer und Unternehmer. Für Sie heisst das: Eine Auflage ist nicht automatisch Ihre Aufgabe – aber was im Vertrag steht oder Ihre Arbeit betrifft (z. B. Entwässerung, Maschinen, Entsorgung), müssen Sie umsetzen. Gesetzliche Pflichten wie das Verunreinigungsverbot gelten ohnehin für alle Beteiligten selbst.

### 4. Typische Lücken, die Sie finden werden
- Nebenbewilligung für Wasserhaltung oder Einleitung fehlt oder ist noch hängig.
- Entsorgungskonzept fehlt, obwohl mehr als 200 m³ Bauabfälle anfallen oder Bauschadstoffe zu erwarten sind (Art. 16 VVEA).
- Bodenschutzauflagen ohne Flächen für Depots und Pisten im Installationsplan.
- Massnahmenstufe Luft oder Lärm angeordnet, aber nicht im Leistungsverzeichnis.
- Kataster-Standort auf der Parzelle, aber kein Konzept für belasteten Aushub.
- Verweis auf ein kantonales Merkblatt in veralteter Fassung.

Je nach Projekt und Standort zusätzlich prüfen (nicht jedes Thema löst eine Pflicht aus – massgebend sind Bewilligung, Kanton und Gemeinde): invasive Neophyten bzw. biologisch belasteter Boden, Baustellenbeleuchtung (Lichtemissionen), Erschütterungen und allfälliges Monitoring, Gewässerraum und Artenschutz, Benützung von Strassen und öffentlichem Grund, Nacht- und Spezialarbeiten, Störfallbetriebe in der Umgebung.

### 5. Standortrisiken lesen
Die Karten liefern **Hinweise, keine Gewissheit**. Ein Eintrag im Kataster der belasteten Standorte heisst nicht, dass der Aushub belastet ist – aber er löst Abklärungen aus (bei Bauvorhaben auf belasteten Standorten gilt Art. 3 AltlV, sinngemäss). Ein Eintrag auf einer **Nachbarparzelle** ist ein Hinweis, kein Befund für die eigene Baugrube. Umgekehrt schützt ein leerer Kataster nicht vor einer alten Auffüllung. Kombinieren Sie Karten mit der Geschichte des Ortes, Gutachten und einer Begehung.

### 6. Rechtsnatur sauber trennen
Der Check ist auch eine Übung in Ehrlichkeit: Was **muss** sein (Gesetz, Auflage), was ist **vereinbart** (Norm im Vertrag), was ist **empfohlen** (Vollzugshilfe ohne Verweis, Praxis)? Diese Trennung ist entscheidend, wenn später über Kosten gesprochen wird: Eine Auflage ist nicht verhandelbar; eine Empfehlung kann man begründet anders lösen.

### 7. Grenzen der eigenen Rolle
Sie prüfen, ordnen ein und melden. Sie **erteilen keine Bewilligung**, legen Auflagen nicht verbindlich aus und ersetzen keine Fachperson (Hydrogeologie, Altlasten, Bodenkunde, Schadstoffe). Wo eine Frage über Ihr Fachgebiet hinausgeht, empfehlen Sie den Beizug.

§> Art. 16 VVEA bestätigt; Art. 25a RPG, Art. 10a USG und Art. 3 AltlV sinngemäss. Kantonale Bezeichnungen der Karten und Perimeter weichen ab.` },
      { id: 'm8-l1-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm8-q03' },
      { id: 'm8-l1-abw', kind: 'decision', title: 'Abwägung: Bewilligung noch hängig', questionId: 'm8-d01' },
      { id: 'm8-l1-task', kind: 'sitetask', title: 'Baustellenaufgabe: Auflagenliste für einen Wohnbau', taskId: 'm8-t1' },
      { id: 'm8-l1-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m8-q04', 'm8-q05'] },
      { id: 'm8-l1-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm8-p1' },
      { id: 'm8-l1-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Drei Fragen: Was verlangt die Bewilligung, der Vertrag, der Standort?',
        'Auflagen vollständig lesen – auch Verweise auf Merkblätter (Fassung, Reichweite) und Nebenbewilligungen.',
        'Standortrisiken über Geoportal und Kanalisationskataster prüfen.',
        'Jede Anforderung mit Quelle, Rechtsnatur, Adressat, Frist und Go/No-Go-Punkt in eine Auflagenliste.',
        'Lücken und Widersprüche vor Baustart schriftlich klären – nicht selbst auslegen.',
      ] },
      { id: 'm8-l1-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['rpg', 'usg', 'uvpv', 'vvea', 'altlv', 'gemeinde-entwaesserung'] },
    ],
  },
  // =====================================================================
  {
    id: 'm8-l2', moduleId: M, level: 2, order: 2, review: E, minutes: 15,
    title: 'Umweltanforderungen in Ausschreibung und Werkvertrag',
    topics: ['m8-vertrag'],
    objectives: [
      'Erklären, wie Umweltanforderungen in Ausschreibung und Werkvertrag gelangen',
      'Fehlende oder unklare Umweltanforderungen in der Offertphase erkennen und richtig behandeln',
      'Umweltpflichten an Subunternehmer weitergeben',
    ],
    steps: [
      { id: 'm8-l2-situation', kind: 'situation', title: 'Einstieg: «Steht nicht im LV»', text: `Drei Wochen nach Baustart verlangt die Gemeinde bei einer Kontrolle einen Waschplatz mit Absetzbecken und pH-Neutralisation – so steht es in der Baubewilligung. Der Bauführer ist verärgert: «Das steht nirgends im Leistungsverzeichnis. Das haben wir nicht offeriert.»

Wer bezahlt den Waschplatz? Und was hätte man früher anders machen können?` },
      { id: 'm8-l2-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m8-q06', 'm8-q07'] },
      { id: 'm8-l2-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Die Bauherrschaft bzw. ihre Planer** übersetzen die Auflagen in die Ausschreibung: Leistungsverzeichnis (LV), besondere Bestimmungen, Pläne.

**Der Unternehmer** prüft in der Offertphase, ob die Umweltanforderungen vollständig und klar sind – und stellt Fragen, wenn nicht.

**Die Auflage gilt trotzdem**, auch wenn sie im LV fehlt. **Wer die Kosten trägt, ist eine separate Frage** des gesamten Werkvertrags (nicht nur des LV; z. B. SIA 118, wenn vereinbart). Eine fehlende Position bedeutet **nicht automatisch** einen Nachtragsanspruch.

**Subunternehmer** erhalten die Umweltpflichten schriftlich weitergegeben (Maschinen, Entsorgung, Verhalten im Notfall).` },
      { id: 'm8-l2-explain', kind: 'explain', title: 'Wie Umweltanforderungen in den Vertrag kommen', text: `### Ausschreibung
In der Ausschreibung beschreibt die Bauherrschaft, **was** gebaut wird und **unter welchen Bedingungen**. Umweltanforderungen erscheinen dort typischerweise:
- als **Positionen im Leistungsverzeichnis** (z. B. Waschplatz, Absetzanlage, Kiespiste, Bodendepot, Staubschutzwand, Entsorgung nach Fraktionen) – in der Schweiz oft auf Basis des Normpositionen-Katalogs (NPK) der CRB;
- in den **besonderen Bestimmungen** (z. B. Massnahmenstufe Luft und Lärm, Arbeitszeiten, Anforderungen an Maschinen, Entwässerungskonzept, Umweltbaubegleitung);
- als **Beilagen**: Bewilligung, Konzepte, Gutachten.

### Offertphase: Ihre Prüfung
- Sind alle Auflagen mit Kostenfolgen im LV abgebildet?
- Sind Mengen realistisch (z. B. Entsorgung belasteter Aushub, Wasserbehandlung über die ganze Bauzeit)?
- Sind Termine mit Umweltauflagen vereinbar (Bodenfeuchte, Brutzeit, Sanierung vor Rückbau)?
- Sind unklare Formulierungen («nach Weisung der UBB», «geeignete Massnahmen») kalkulierbar?
Lücken klären Sie **in der Fragerunde** – fristgerecht und schriftlich. Ist die Fragerunde vorbei, ersuchen Sie die ausschreibende Stelle um Präzisierung oder kalkulieren ausschreibungskonform inklusive der Pflichtmassnahmen. Ein **Vorbehalt in der Offerte** ist kein gleichwertiger Ersatz: Bei öffentlichen Vergaben kann er zum Ausschluss führen, und er garantiert keinen Anspruch. Er kommt nur nach vergabe- und vertragsrechtlicher Prüfung in Frage.

### Nach Vertragsabschluss
Taucht nach Vertragsabschluss eine Umweltanforderung auf, die nicht kalkuliert wurde, unterscheiden Sie **vier Fälle** – die Kostenfolge ist jedes Mal anders:

| Fall | Beispiel | Kostenfolge (Grundsatz) |
|---|---|---|
| 1. Bereits geschuldete Pflicht | Auflage lag der Ausschreibung bei; Vertrag verlangt «Einhaltung aller Auflagen» | Meist im Preis enthalten – kein Nachtrag allein, weil eine LV-Position fehlt |
| 2. Unklare oder lückenhafte Ausschreibung | Auflage war nicht beigelegt oder widersprüchlich beschrieben | Offen – hängt von Vertrag, Risikozuordnung und Rangfolge der Vertragsbestandteile ab |
| 3. Tatsächlich neue Bestellung | Bauherrschaft verlangt nachträglich mehr oder anderes | Bestellungsänderung – Nachtrag nach den Regeln des Vertrags |
| 4. Neue behördliche Anordnung | Behörde verschärft während des Baus | Wer das Risiko trägt, regelt der Vertrag |

In allen vier Fällen gilt: **Pflichtmassnahme rechtzeitig umsetzen**, die Bauleitung **unverzüglich schriftlich** informieren (Anzeige) und den Anspruch **prüfen lassen**. Eine Nachtragsmeldung ist noch kein Anspruch; ob und wie viel vergütet wird, hängt von Vertragsinhalt, Risikozuordnung, rechtzeitiger Anzeige und der tatsächlichen Änderung ab.

§> SIA 118 «Allgemeine Bedingungen für Bauarbeiten» gilt nur, wenn sie im Werkvertrag übernommen ist (Ausgabe und vertragliche Abweichungen beachten; Norm nicht im Volltext geprüft). Die Fallunterscheidung folgt sinngemäss dem KBOB-Leitfaden zum Nachtragsmanagement (2022, laut externer Prüfung; Original nicht selbst geprüft). Konkrete Vertragsfolgen immer durch die Rechtsabteilung bzw. Fachperson Bauvertrag prüfen lassen.` },
      { id: 'm8-l2-explain-2', kind: 'explain', title: 'Öffentliche Beschaffung und Subunternehmer', text: `### Öffentliche Bauherrschaften
Bund, Kantone und Gemeinden vergeben nach dem Beschaffungsrecht (Bund: BöB; Kantone und Gemeinden: IVöB bzw. kantonales Recht). Das revidierte Beschaffungsrecht nennt die **Nachhaltigkeit** ausdrücklich als Ziel und lässt ökologische Kriterien bei Eignung, technischen Spezifikationen und Zuschlag zu – mit Sachbezug zum Auftrag, transparent und für alle Anbieter gleich (BöB Art. 2, 27, 29, 30 laut externer Prüfung; für Kantone gilt die IVöB 2019, soweit beigetreten und in Kraft gesetzt – Wortlaut prüfen). Für Sie heisst das: Umweltangaben in der Offerte (Maschinenpark, Transportkonzept, Entsorgungswege) können über den Zuschlag mitentscheiden – und werden später **vertraglich geschuldet**.

### Subunternehmer und Lieferanten
Die Bauherrschaft hat einen Vertrag mit Ihnen – nicht mit Ihren Subunternehmern. Was Sie zusagen, müssen Sie **weitergeben**:
- Maschinen: Nachweise nach LRV für Baumaschinen mit Dieselmotor über 18 kW (Art. 19a LRV; massgebend sind Motorart, Baujahr und der Konformitätsnachweis – nicht bloss ein sichtbarer Filter; Schwelle und Übergangsregeln im Wortlaut prüfen).
- Entsorgung: Fraktionen, Annahmestellen, Nachweise (Liefer-, Wäge-, Begleitscheine).
- Verhalten: Betankung, Waschplatz, Notfallorganisation, Bodenschutz (nur Pisten befahren).
- Teilnahme an Instruktionen und Kontrollen; Folgen bei Verstössen.

!> Ein Subunternehmer ohne Instruktion ist eines der grössten Umweltrisiken auf jeder Baustelle – gerade weil er die Baustelle und ihre Auflagen nicht kennt.` },
      { id: 'm8-l2-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Schulhaus-Erweiterung', context: 'Hochbau', text: `Die Gemeinde schreibt eine Schulhaus-Erweiterung aus. Die Bewilligung verlangt Massnahmenstufe B Luft und einen Lärmschutz während des Schulbetriebs. Das LV enthält keine Position für Staubschutzwände und keine Regel zu lärmintensiven Arbeiten während der Unterrichtszeit. Die Umweltbeauftragte des Unternehmers stellt in der Fragerunde zwei Fragen: Wie sind Staubschutz und Lärmzeiten abzugelten? Antwort der Bauherrschaft: neue Positionen und ein Zeitfenster für lärmintensive Arbeiten. Alle Anbieter offerieren nun dasselbe.

**Lernpunkt**: Eine fristgerecht und sauber gestellte Frage in der Offertphase kostet wenig – ein Streit über Nachträge während des Baus viel.` },
      { id: 'm8-l2-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Strassensanierung mit Ausbauasphalt', context: 'Tiefbau', text: `Ein Kanton schreibt eine Belagssanierung aus. Das LV enthält «Belag abbrechen und entsorgen» als eine Position, ohne Angaben zum PAK-Gehalt. Der Unternehmer fragt in der Fragerunde: «Liegen PAK-Analysen vor? Wie wird Ausbauasphalt über 250 mg PAK/kg abgegolten?» Die Vergabestelle lässt Bohrkerne untersuchen und teilt die Position für alle Anbieter in Einheitspreise je PAK-Klasse mit geschätzten Mengen auf. Später zeigt ein Abschnitt tatsächlich höhere Werte – abgerechnet wird nach der vorgesehenen Position.

**Lernpunkt**: Die Klärung vor der Eingabe schafft gleiche Bedingungen und sorgt dafür, dass belastetes Material korrekt entsorgt wird, statt aus Kostendruck «mitzulaufen». Ein eigener Vorbehalt in der Offerte wäre bei dieser öffentlichen Vergabe riskant gewesen (möglicher Ausschluss) und hätte keinen Anspruch garantiert.` },
      { id: 'm8-l2-deep', kind: 'deep', title: 'Fachvertiefung: Vertrag, Kosten und Verantwortung', text: `### 1. Drei Ebenen, die man nicht verwechseln darf
- **Öffentlich-rechtliche Pflicht**: Gesetz und Auflage gelten unabhängig vom Vertrag. Die Behörde kann ihre Einhaltung durchsetzen – gegenüber der Bauherrschaft und, je nach Fall, gegenüber den Verursachern.
- **Vertragliche Pflicht**: Was der Unternehmer der Bauherrschaft schuldet, steht im Werkvertrag mit allen Bestandteilen (LV, besondere Bestimmungen, Pläne, ggf. SIA 118).
- **Kostenfrage**: Wer bezahlt eine Massnahme, die gilt, aber nicht bestellt wurde? Das ist eine Frage des Vertrags – nicht der Umwelt.
Der häufigste Fehler auf Baustellen ist, die dritte Frage mit der ersten zu vermischen: «Nicht bezahlt, also nicht nötig.» Das ist falsch. Die Massnahme ist nötig; über die Kosten wird separat gesprochen.

### 2. Gute Umweltpositionen im LV
Eine gute Position ist **messbar und kalkulierbar**: Was genau, wie viel, wie lange, mit welchem Nachweis? Beispiele:
- «Absetzanlage für Baustellenabwasser, inkl. pH-Neutralisation, Betrieb und Unterhalt über die Bauzeit, Protokollierung gemäss Entwässerungskonzept» statt «Gewässerschutzmassnahmen».
- «Entsorgung Ausbauasphalt nach Analyse, getrennt nach PAK-Klassen gemäss VVEA» statt «Belag entsorgen».
- «Baumaschinen über 18 kW mit Partikelfilter gemäss LRV; Maschinenliste vor Einsatz» statt «umweltfreundliche Maschinen».

### 3. Pauschalen und Regie
Umweltleistungen werden oft pauschal offeriert («Baustelleneinrichtung inkl. Umweltmassnahmen»). Das ist einfach, verdeckt aber den Aufwand. Wenn später zusätzliche Massnahmen verlangt werden, ist schwer zu belegen, was in der Pauschale enthalten war. Für unsichere Mengen (z. B. belasteter Aushub) eignen sich Einheitspreise mit geschätzten Mengen oder Regie.

### 4. Fragen vor Vorbehalten
Der sichere Weg ist die **Frage an die ausschreibende Stelle** vor Ablauf der Frist. Materielle Vorbehalte oder abweichende Offerten können bei öffentlichen Vergaben als ausschreibungswidrig ausgeschlossen werden (nicht jeder Hinweis ist ein Ausschlussgrund – aber das Risiko trägt der Anbieter). Wo Varianten zugelassen sind, braucht es in der Regel zusätzlich ein vollständiges, ausschreibungskonformes Grundangebot. Bei privaten Bauherrschaften ist ein **konkreter** Vorbehalt eher möglich (Was ist angenommen? Was gilt, wenn die Annahme nicht stimmt?) – «unter Vorbehalt der Umweltauflagen» nützt niemandem. Ob ein Vorbehalt zulässig und wirksam ist, entscheidet nicht die Umweltfachperson, sondern die Fachperson Vergabe bzw. Bauvertrag.

### 4a. Nachtrag: Anzeige ist nicht Anspruch
Wer nach Vertragsabschluss eine nicht kalkulierte Umweltanforderung entdeckt, prüft zuerst, **welcher der vier Fälle** vorliegt (bereits geschuldet, unklare Ausschreibung, neue Bestellung, neue behördliche Anordnung). Die Pflichtmassnahme wird in jedem Fall rechtzeitig umgesetzt; die Mehrkosten werden unverzüglich schriftlich angezeigt. Ob daraus ein Vergütungs- oder Fristanspruch entsteht, hängt vom Vertrag ab – versprechen Sie der Baustelle keinen Nachtrag, bevor das geprüft ist.

### 5. Weitergabe an Subunternehmer
Was Sie der Bauherrschaft schulden, müssen Sie im Subunternehmervertrag **ausdrücklich** weitergeben. Eine Standard-Beilage «Umweltanforderungen für Subunternehmer» spart Zeit: Maschinen, Betankung, Waschplatz, Entsorgung, Bodenschutz, Notfall, Instruktion, Kontrollen. Sie ersetzt nicht die projektspezifische Instruktion vor Ort.

### 6. Nachhaltigkeit als Zuschlagskriterium
Bei öffentlichen Vergaben können Angaben zu Transporten, Maschinen oder Recyclinganteilen bewertet werden. Was Sie offerieren, wird Vertragsbestandteil – versprechen Sie nur, was die Baustelle tatsächlich leisten kann, und halten Sie fest, wie es nachgewiesen wird. Übertriebene Versprechen sind ein Haftungs- und Reputationsrisiko.

### 7. Ihre Rolle
Sie sind nicht die Bauvertragsjuristin. Sie liefern aber die **fachliche Grundlage**: Welche Umweltleistung ist nötig, wie viel kostet sie ungefähr, was ist Pflicht, was Empfehlung? Mit dieser Grundlage kann die Kalkulation sauber offerieren und die Bauleitung sauber nachtragen.

§> Vertragsrechtliche Aussagen allgemein und sinngemäss; SIA 118 und Beschaffungsrecht nicht im Wortlaut wiedergegeben. Einzelfälle durch Fachperson Bauvertrag prüfen lassen.` },
      { id: 'm8-l2-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm8-q08' },
      { id: 'm8-l2-abw', kind: 'decision', title: 'Abwägung: Lücke im Leistungsverzeichnis', questionId: 'm8-d02' },
      { id: 'm8-l2-task', kind: 'sitetask', title: 'Baustellenaufgabe: Offerte auf Umweltlücken prüfen', taskId: 'm8-t2' },
      { id: 'm8-l2-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m8-q09', 'm8-q10'] },
      { id: 'm8-l2-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm8-p2' },
      { id: 'm8-l2-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Auflagen gelten auch, wenn sie im LV fehlen; die Kostenfrage ist separat und nicht automatisch ein Nachtrag.',
        'Umweltleistungen messbar und kalkulierbar ausschreiben bzw. offerieren.',
        'Lücken in der Fragerunde klären; ein Vorbehalt ist kein sicherer Ersatz (öffentliche Vergabe: Ausschlussrisiko).',
        'Nach Vertragsabschluss: vier Fälle unterscheiden, Pflichtmassnahme umsetzen, sofort schriftlich anzeigen, Anspruch prüfen lassen.',
        'Umweltpflichten schriftlich an Subunternehmer weitergeben und vor Ort instruieren.',
      ] },
      { id: 'm8-l2-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['sia118', 'kbob-nachtrag', 'boeb', 'lrv', 'vvea', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm8-l3', moduleId: M, level: 2, order: 3, review: E, minutes: 15,
    title: 'Installationsplatz, Logistik und Emissionen planen',
    topics: ['m8-installation'],
    objectives: [
      'Einen Installationsplan auf Umweltrisiken prüfen',
      'Entwässerung, Lagerflächen, Materialflüsse und Transporte umweltgerecht anordnen',
      'Massnahmen gegen Staub und Lärm in der Planung verankern',
    ],
    steps: [
      { id: 'm8-l3-situation', kind: 'situation', title: 'Einstieg: Der Plan mit dem Tankcontainer', text: `Der Polier zeigt Ihnen den Installationsplan: Tankcontainer direkt neben dem Strassenschacht («da kommt der Tankwagen gut hin»), Waschplatz in der Ecke beim Bach, Mulden an der Grundstücksgrenze zur Wohnüberbauung, Bodendepot auf der Fläche, die später Garten wird.

Was würden Sie umstellen – und warum?` },
      { id: 'm8-l3-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m8-q11', 'm8-q12'] },
      { id: 'm8-l3-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Der Installationsplan ist das wichtigste Umweltdokument der AVOR.** Was dort falsch liegt, bleibt meist die ganze Bauzeit falsch.

**Gewässerschutz**: Betankung, Lager wassergefährdender Stoffe und Waschplatz auf befestigter, entwässerter Fläche – weg von Meteorschächten, Gewässern und Schutzzonen.

**Boden**: Beanspruchung von gewachsenem Boden so klein wie möglich halten; wo sie nötig ist, nach Bodenschutzkonzept (Abtrag, Piste, Schutz). Depots einplanen.

**Nachbarschaft**: Lärm- und Staubquellen (Mulden, Brecher, Kompressoren) weg von empfindlichen Nutzungen; Zufahrten und Transportrouten planen.

**Materialflüsse**: Aushub, Rückbaumaterial und Abfälle mit möglichst kurzen Wegen und möglichst viel Verwertung vor Ort.` },
      { id: 'm8-l3-explain', kind: 'explain', title: 'Installationsplan: worauf Sie achten', text: `### Elemente und Umweltanforderungen

| Element | Umweltanforderung (Grundsatz) |
|---|---|
| Betankung, Lager Treibstoff/Öl/Chemikalien | Befestigte, dichte Fläche, Auffangvolumen, Abstand zu Schächten und Gewässern, Ölbindemittel griffbereit; in Grundwasserschutzzonen (S1–S3) gelten je nach Zone strenge Einschränkungen bis Verbote – Schutzzonenreglement und kantonale Vorgaben prüfen |
| Waschplatz (Beton, Geräte) | Gefasst, mit Absetzbecken und Neutralisation; Ableitung nur gemäss Entwässerungskonzept und Zustimmung |
| Mulden und Abfallplatz | Trennung nach Fraktionen, beschriftet, gedeckt wo nötig; Sonderabfälle separat und geschützt |
| Bodendepots | Getrennt Ober-/Unterboden, nicht befahren, nicht auf späteren Gartenflächen ohne Konzept |
| Zwischenlager Aushub | Verdächtiges Material separat, abgedeckt, auf befestigter Fläche |
| Zufahrten, Pisten | Auf späteren Verkehrsflächen oder als Piste auf Vlies; Radwaschanlage bzw. Reinigung vor öffentlicher Strasse |
| Container, Unterkünfte | Abwasser an Schmutzwasserkanal (mit Zustimmung) |
| Lärmintensive Geräte | Abgeschirmt, weg von Wohnungen, Schulen, Spitälern |

### Entwässerung auf dem Plan
Jeder Schacht auf und neben dem Areal wird im Plan markiert: **Meteor, Schmutz oder Misch** (laut Kanalisationskataster, nicht nach Aussehen; bei unklaren oder kritischen Verbindungen vor Ort prüfen lassen). Daraus ergibt sich, welche Schächte abzudecken sind und wohin behandeltes Wasser darf (Modul 2, Entwässerungskonzept nach SIA 431).

### Phasen
Der Plan ändert sich: Rückbau, Baugrube, Rohbau, Ausbau, Umgebung. Prüfen Sie **jede Phase** – der Waschplatz von der Rohbauphase steht in der Umgebungsphase oft im Weg und wird dann improvisiert verschoben.

§> Grundsätze sinngemäss aus GSchG, Merkblättern der Kantone (KVU) und SIA 431; Abstände und Detailanforderungen gemäss kantonalen Merkblättern und Auflagen.` },
      { id: 'm8-l3-explain-2', kind: 'explain', title: 'Transporte, Luft und Lärm in der Planung', text: `### Transporte
- **Menge abschätzen**: Aushub, Beton, Rückbaumaterial – Anzahl Fahrten pro Tag in Spitzenzeiten.
- **Routen** festlegen (Schulwege, Wohnquartiere meiden, Auflagen der Gemeinde), Wartezonen auf dem Areal statt im Quartier.
- **Verwertung vor Ort** prüfen (Aushub für Hinterfüllung, mobile Aufbereitung – je nach Kanton und Standort Melde- oder Bewilligungspflicht abklären, Emissionen begrenzen); jede vermiedene Fahrt spart Lärm, Staub, CO₂ und Geld.
- **Bahn** prüfen, wenn grosse Mengen über weite Strecken gehen und Anschlüsse bestehen.

### Luft (Massnahmenstufen der BAFU-Richtlinie «Luftreinhaltung auf Baustellen»)
Die Behörde ordnet im Bewilligungsverfahren **Massnahmenstufe A** (Basismassnahmen) oder **B** (grössere bzw. länger dauernde Baustellen, empfindliche Lage) an. In der AVOR folgen daraus: Maschinenliste mit Partikelfilter-Nachweisen (Art. 19a LRV), Befeuchtung bei staubintensiven Arbeiten, Abdeckung von Schüttgut, Reinigung der Zufahrten, Verbot offener Feuer.

### Lärm (Baulärm-Richtlinie des BAFU, Art. 6 LSV)
Die Richtlinie kennt **Massnahmenstufen A, B und C** für Bauarbeiten (Transporte A und B). Sie hängen u. a. von der Lärmempfindlichkeit der Umgebung, der Dauer und der Tageszeit ab. In der AVOR: lärmarme Verfahren wählen (z. B. Bohren statt Rammen, Zange statt Abbauhammer, wo möglich), lärmintensive Arbeiten in Zeitfenster legen, Abschirmungen planen, **Anwohnende informieren** (vom BAFU empfohlen; eine Pflicht ergibt sich aus Auflage bzw. kantonalem oder kommunalem Recht). Nacht- und Ruhezeitarbeiten können je nach Kanton, Gemeinde oder Auflage bewilligungspflichtig sein – ein schweizweit einheitliches Zeitfenster gibt es nicht. Bei Nachtarbeit auch die Baustellenbeleuchtung, bei Ramm-, Abbruch- und Verdichtungsarbeiten auch Erschütterungen mitplanen.

§> Stufenlogik Luft (A/B) und Lärm (A/B/C) über BAFU- und kantonale Unterlagen bestätigt; Schwellen und Massnahmenkataloge im Original. Vertiefung in den Modulen 5 und 6.` },
      { id: 'm8-l3-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Enge Baustelle in der Stadt', context: 'Hochbau', text: `Ein Ersatzneubau füllt die ganze Parzelle; Platz für Installationen gibt es nur auf der Strasse (Bewilligung der Stadt) und später in der Tiefgarage. Die AVOR plant: Betankung durch Tankwagen auf Wanne statt Tankcontainer, Betonpumpe mit Waschwasser-Rückführung in den Fahrmischer statt Waschplatz, Mulden auf dem Trottoir mit Abdeckung, Anlieferungen nur zwischen 7 und 9 Uhr nach Auflage. Die Meteorschächte der Strasse werden im Plan rot markiert und während der Bauzeit gesichert.

**Lernpunkt**: Wenn der Platz fehlt, braucht es **andere Verfahren** – nicht weniger Umweltschutz.` },
      { id: 'm8-l3-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Brückenersatz über einem Bach', context: 'Tiefbau', text: `Für den Ersatz einer Bachbrücke liegt der Installationsplatz auf einer Wiese neben dem Ufer. Die AVOR verschiebt Betankung, Lager und Waschplatz auf eine Kiesfläche mit Abstand zum Gewässer, legt den Oberboden der Wiese ab und erstellt eine Piste auf Vlies. Der Abbruch der alten Brücke wird so geplant, dass kein Material ins Wasser fällt (Auffangkonstruktion), und mit der Fischereiaufsicht wird das Zeitfenster abgestimmt.

**Lernpunkt**: Am Gewässer entscheidet die Anordnung der Installation, ob ein Unfall ein Ärgernis oder ein Gewässerschaden wird.` },
      { id: 'm8-l3-deep', kind: 'deep', title: 'Fachvertiefung: Installationsplanung als Risikosteuerung', text: `### 1. Denken in Quellen, Wegen und Schutzgütern
Für jedes Element des Installationsplans fragen Sie: **Was kann austreten** (Treibstoff, Zementwasser, Staub, Lärm, Schlamm)? **Wohin kann es gelangen** (Schacht, Bach, Boden, Grundwasser, Nachbarn)? **Was ist dort schützenswert**? Je kürzer und direkter der Weg zu einem empfindlichen Schutzgut, desto weiter weg gehört die Quelle – oder desto stärker die Barriere (Wanne, Abdeckung, Schwelle, Wand).

### 2. Typische Planungsfehler
- Tankcontainer neben einem Meteorschacht, «weil der Tankwagen dort gut hinkommt».
- Waschplatz am tiefsten Punkt des Areals ohne Fassung – dort, wo bei Regen alles hinläuft.
- Bodendepot auf einer Fläche, die später gebraucht wird, und deshalb mehrfach umgelagert.
- Installationsfläche auf gewachsenem Boden ohne Abtrag und Schutz.
- Mulden und Brecher an der Grenze zur Wohnüberbauung, Bürocontainer auf der ruhigen Seite.
- Keine Fläche für ein Zwischenlager, obwohl ein Kataster-Standort bekannt ist.

### 3. Materialbewirtschaftung
Eine **Materialbilanz** (Massenbilanz) zeigt, wie viel Aushub, Rückbaumaterial und Bodenmaterial anfällt und wie viel wieder eingebaut wird. Sie ist die Grundlage für Transporte, Zwischenlager, Entsorgungskonzept und Kosten. Verwertung vor Ort hat Vorrang, wenn das Material geeignet ist und die Anforderungen (z. B. der Vollzugshilfen zur VVEA) erfüllt – mobile Aufbereitungsanlagen können aber je nach Kanton und Standort selbst melde- oder bewilligungspflichtig sein und erzeugen Staub und Lärm (vorher abklären).

### 4. Transportplanung ist Umweltplanung
Auf vielen Baustellen verursachen die Transporte mehr Lärm, Staub und CO₂ als die Baustelle selbst. Eine gute Planung reduziert Fahrten (Verwertung vor Ort, volle Fahrten, Rückfrachten), wählt Routen bewusst und vermeidet Wartezeiten mit laufendem Motor im Quartier. Für die Nachbarschaft ist die Route oft das sichtbarste Zeichen, ob eine Baustelle Rücksicht nimmt.

### 5. Emissionen früh begrenzen
Das Vorsorgeprinzip des USG verlangt, Emissionen unabhängig von der bestehenden Belastung so weit zu begrenzen, wie technisch und betrieblich möglich und wirtschaftlich tragbar (sinngemäss). In der AVOR heisst das: Verfahren und Maschinen so wählen, dass Emissionen gar nicht erst entstehen – das ist wirksamer und meist billiger als nachträgliche Abschirmung.

### 6. Kommunikation mit Anwohnenden einplanen
Information vor Baustart (Dauer, laute Phasen, Ansprechperson), Hinweise vor besonders lauten Arbeiten und ein klarer Umgang mit Beschwerden gehören in die AVOR. Die Baulärm-Richtlinie nennt Information als Massnahme; ob sie Pflicht ist, ergibt sich aus der Auflage bzw. dem kantonalen oder kommunalen Recht.

### 7. Prüfung mit dem Polier
Gehen Sie den Plan **mit dem Polier** durch, idealerweise vor Ort. Er kennt die Abläufe, Sie die Risiken. Fragen Sie für jede Phase: Wo wird betankt, gewaschen, gelagert, wo fahren die Lastwagen, wo ist der nächste Schacht – und was passiert bei Starkregen?

§> Vorsorgeprinzip (Art. 11 Abs. 2 USG) sinngemäss; Stufen Luft und Lärm siehe Quellen. Detailanforderungen kantonal und gemäss Auflage.` },
      { id: 'm8-l3-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm8-q13' },
      { id: 'm8-l3-abw', kind: 'decision', title: 'Abwägung: Wohin mit dem Waschplatz?', questionId: 'm8-d03' },
      { id: 'm8-l3-task', kind: 'sitetask', title: 'Baustellenaufgabe: Installationsplan prüfen', taskId: 'm8-t3' },
      { id: 'm8-l3-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m8-q14', 'm8-q15'] },
      { id: 'm8-l3-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm8-p3' },
      { id: 'm8-l3-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Installationsplan = wichtigstes Umweltdokument der AVOR, für jede Bauphase prüfen.',
        'Quelle – Weg – Schutzgut: Betankung, Lager, Waschplatz weg von Schächten und Gewässern.',
        'Schachtart nach Kanalisationskataster im Plan markieren.',
        'Materialbilanz und Transportplanung reduzieren Fahrten, Lärm, Staub und Kosten.',
        'Massnahmenstufen Luft (A/B) und Lärm (A/B/C) in Verfahren, Maschinen und Zeiten übersetzen.',
      ] },
      { id: 'm8-l3-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'sia431', 'kvu-lagerung', 'bafu-luft', 'lrv', 'bafu-baulaerm', 'lsv'] },
    ],
  },
  // =====================================================================
  {
    id: 'm8-l4', moduleId: M, level: 3, order: 4, review: E, minutes: 15,
    title: 'Umweltmassnahmenplan: Zuständigkeiten, Kontrollen, Nachweise',
    topics: ['m8-massnahmenplan'],
    objectives: [
      'Aus einer Auflagenliste einen Umweltmassnahmenplan mit Verantwortung, Termin und Nachweis erstellen',
      'Kontroll- und Nachweispflichten festlegen und Meldefristen einplanen',
      'Den Massnahmenplan als Steuerungsinstrument während des Baus nutzen',
    ],
    steps: [
      { id: 'm8-l4-situation', kind: 'situation', title: 'Einstieg: «Wer hätte das machen sollen?»', text: `Bei der Schlusskontrolle verlangt die Behörde die Entsorgungsnachweise für den Ausbauasphalt und die pH-Protokolle der Absetzanlage. Die Wägescheine liegen bei einem Subunternehmer, die pH-Messungen wurden «meistens» gemacht, aber nicht aufgeschrieben. Der Bauführer sagt: «Ich dachte, das macht der Polier.» Der Polier: «Ich dachte, das macht die UBB.»

Wie verhindern Sie das beim nächsten Projekt?` },
      { id: 'm8-l4-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m8-q16', 'm8-q17'] },
      { id: 'm8-l4-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Ein Umweltmassnahmenplan** übersetzt jede Anforderung in eine **konkrete Massnahme** mit **verantwortlicher Funktion**, **Termin bzw. Bauphase**, **Kontrolle** und **Nachweis**.

**Funktionen statt Namen**: «Polier/in Rohbau» statt «Herr X» – der Plan bleibt gültig, wenn Personen wechseln, und enthält keine unnötigen Personendaten. Wer die Funktion aktuell besetzt, steht im internen Organigramm bzw. Einsatzplan.

**Nachweise** sind der Beleg, dass etwas getan wurde: Protokolle, Fotos, Lieferscheine, Begleitscheine, Maschinenliste.

**Meldefristen** (z. B. meldepflichtige Asbestsanierungen bei der Suva mindestens 14 Tage vorher) und **Freigaben** (Go/No-Go) gehören als Termine in den Plan.` },
      { id: 'm8-l4-explain', kind: 'explain', title: 'Aufbau eines Umweltmassnahmenplans', text: `### Spalten

| Spalte | Inhalt | Beispiel |
|---|---|---|
| Anforderung / Quelle | Fundstelle | Bewilligung Ziff. 4.3; Art. 16 VVEA |
| Rechtsnatur | Gesetz, Auflage, Norm, Vollzugshilfe, Praxis, intern | Behördliche Auflage |
| Massnahme | Was konkret? | Absetzanlage mit CO₂-Neutralisation |
| Verantwortlich | Funktion | Polier/in Rohbau |
| Termin / Phase | Wann? | vor erster Betonage |
| Kontrolle | Wer prüft wie oft? | Bauführer/in wöchentlich |
| Nachweis | Was wird abgelegt? | pH-Protokoll, Fotos |
| Status | offen, umgesetzt, abgeschlossen | – |

Eine Vorlage finden Sie in der Fachbibliothek («Vorlage Umweltmassnahmenplan»). Das Beispiel gilt für eine Baustelle mit Betonarbeiten und bewilligter Ableitung: Messungen und Protokolle (z. B. pH, Trübung) braucht es nur, wo Wasser anfällt bzw. eingeleitet wird – Parameter und Häufigkeit ergeben sich aus Bewilligung und Entwässerungskonzept.

Ergänzen Sie für Arbeiten mit Vorbedingung eine Spalte **Go/No-Go**: Welche Bewilligung, Meldung oder Freigabe muss vorliegen, bevor begonnen wird?

### Zuständigkeiten klären
Typische Rollen: **Bauherrschaft** (Gesuch, Konzepte, Beizug von Fachpersonen wie UBB oder BBB), **Bauleitung** (Koordination, Abnahmen), **Unternehmer – Bauführung** (Umsetzung, Eigenkontrolle, Nachweise), **Polier** (Umsetzung vor Ort, Instruktion), **Subunternehmer** (eigene Arbeiten nach Vorgaben), **Fachpersonen** (UBB, BBB, Schadstoffe, Hydrogeologie – Beratung, Freigaben, Kontrollen gemäss Auftrag). Eine Massnahme ohne verantwortliche Funktion wird nicht umgesetzt.

### Meldungen und Fristen
- Asbest: Nicht jede Asbestarbeit ist gleich geregelt. Der **Schadstoffbericht** bestimmt Bereich und Verfahren. Arbeiten mit **erheblicher Faserfreisetzung** dürfen nur Suva-anerkannte Unternehmen ausführen; sie melden die Sanierung mindestens 14 Tage vor Beginn der Suva (laut Suva, BauAV Art. 82/86). Der Rückbau im betroffenen Bereich beginnt erst nach der Sanierung, den für das Verfahren verlangten Kontrollen und der **schriftlichen Freigabe des Bereichs**.
- Je nach Kanton treffen Meldepflichten (z. B. Baubeginn, Bauvollendung) ausdrücklich die Bauleitung oder die Unternehmung – nicht nur die Bauherrschaft (z. B. Kanton Zürich laut externer Prüfung; kantonales Recht und Bewilligung prüfen).
- Einleitungen: Zustimmung bzw. Bewilligung **vor** der ersten Einleitung.
- Weitere Meldungen gemäss Auflage (z. B. Baubeginn an die Fachstelle, Beginn Bodenarbeiten an die BBB, Abschluss für Abnahme).

§> Meldefrist und Anerkennungspflicht gemäss Suva für Arbeiten mit erheblicher Faserfreisetzung (siehe Modul 3; Artikelwortlaut der BauAV nicht am Original geprüft). Weitere Meldepflichten und ihr Adressat ergeben sich aus der Bewilligung und kantonalem Recht.` },
      { id: 'm8-l4-diagram', kind: 'diagram', title: 'Schema: Von der Anforderung zum Nachweis', diagram: 'auflagenkette', caption: 'Jede Anforderung braucht alle sechs Glieder – fehlt eines, bleibt sie Papier. Vereinfachte Lernhilfe.' },
      { id: 'm8-l4-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Umbau eines Geschäftshauses', context: 'Hochbau', text: `Der Schadstoffbericht zeigt asbesthaltige Bodenbeläge und PCB-haltige Fugen. Der Bericht legt Verfahren und Bereiche fest; die Bodenbeläge müssen mit erheblicher Faserfreisetzung entfernt werden. Der Massnahmenplan enthält deshalb: Sanierung durch Suva-anerkannte Firma (Verantwortlich: Bauherrschaft beauftragt, Bauleitung koordiniert), Meldung an die Suva (Sanierungsfirma, mind. 14 Tage vorher), die für das Verfahren verlangte Kontrolle bzw. Freimessung (Fachperson), Entsorgung mit Begleitscheinen (Bauführung sammelt) und als **No-Go-Punkt**: Rückbau im Bereich erst nach schriftlicher Freigabe (Bauleitung). Im Terminplan stehen die 14 Tage und die Abnahme als Meilensteine.

**Lernpunkt**: Der Plan macht sichtbar, dass die Sanierung den Rückbau-Start bestimmt – nicht umgekehrt.` },
      { id: 'm8-l4-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Kanalisationsersatz mit Wasserhaltung', context: 'Tiefbau', text: `Für einen Kanalisationsersatz im Grundwasser verlangt die Bewilligung eine tägliche Kontrolle des abgepumpten Wassers (Trübung, pH) und eine wöchentliche Meldung der Pumpmengen. Der Massnahmenplan legt fest: Messung durch den Maschinisten der Wasserhaltung, Protokoll im Baustellenbüro, Wochenmeldung durch die Bauführung, Grenzwertüberschreitung → Sofortmassnahme und Meldung gemäss Bewilligung. Ein Formular mit Feldern für Datum, Uhrzeit, Messwerte und Visum ersetzt die bisherigen Notizen auf Zetteln.

**Lernpunkt**: Ein Nachweis ist nur so gut wie das Formular, das ihn einfach macht.` },
      { id: 'm8-l4-deep', kind: 'deep', title: 'Fachvertiefung: Vom Plan zur Wirksamkeit', text: `### 1. Der Plan ist ein Steuerungsinstrument, kein Ordnerinhalt
Ein Massnahmenplan, der nach der AVOR im Ordner verschwindet, nützt nichts. Er gehört **an die Startsitzung**, in die **Baustellensitzungen** (Statuspunkte) und in die **Begehungen** (Kontrolle). Massnahmen werden je Bauphase aktiviert und abgeschlossen; neue Anforderungen (Nachtragsauflagen, Erkenntnisse aus Kontrollen) werden ergänzt.

### 2. Gute Massnahmen sind SMART genug
Nicht jede Massnahme muss ein Projekt sein, aber sie muss **prüfbar** sein. «Gewässerschutz beachten» ist keine Massnahme. «Meteorschächte S3 und S4 vor Beginn Aushub mit Abdeckung sichern; tägliche Sichtkontrolle durch Polier» ist eine.

### 3. Kontrolle und Nachweis unterscheiden
- **Eigenkontrolle** der Unternehmung: Polier und Bauführung prüfen laufend, ob Massnahmen umgesetzt sind.
- **Kontrolle durch Dritte**: Bauleitung, UBB/BBB im Auftrag der Bauherrschaft, Behörde.
- **Nachweis**: das Dokument, das die Umsetzung belegt. Ohne Nachweis lässt sich die Umsetzung in einer Kontrolle kaum belegen; gesetzlich oder in der Auflage vorgeschriebene Dokumentation ist ohnehin Pflicht.
Planen Sie für jede Massnahme, **welcher Nachweis** genügt – so wenig wie möglich, so viel wie nötig. Fotos mit Datum, kurze Protokolle und vollständige Entsorgungsbelege decken den grössten Teil ab.

### 4. Datenschutz und Vertraulichkeit
Nachweise enthalten oft Namen, Kontrollschilder oder Fotos von Personen. Erfassen Sie nur, was für den Nachweis nötig ist (Funktion statt Name, Fotos ohne erkennbare Personen, wo möglich). Datensparsamkeit heisst nicht Anonymität: Verantwortlichkeiten müssen intern zuordenbar bleiben (Organigramm, Einsatzplan). Für echte Projektunterlagen gelten die Regeln Ihrer Firma zu Zugriffsrechten, Aufbewahrung und Löschung. Projektunterlagen von Bauherrschaften sind vertraulich – keine ungeprüfte Weitergabe an Dritte oder an externe Dienste.

### 5. Fristen und Abhängigkeiten
Viele Umweltmassnahmen haben **Vorlaufzeiten**: Bewilligungen (Wasserhaltung, Einleitung, Rodung), Analysen (Bohrkerne, Bodenproben), Meldungen (Suva), Verfügbarkeit von Fachpersonen und Entsorgungswegen. Diese Vorlaufzeiten gehören in den Terminplan – als Vorgänger der betroffenen Bauarbeiten. Häufig ist das der eigentliche Mehrwert des Massnahmenplans: Er macht Abhängigkeiten sichtbar, bevor sie den Bau blockieren.

### 6. Abweichungen und Eskalation
Legen Sie fest, was passiert, wenn eine Massnahme nicht umgesetzt ist: Wer wird informiert, bis wann wird korrigiert, wann wird die Bauleitung bzw. Bauherrschaft eingeschaltet? Bei unmittelbarer Umweltgefahr gilt: **zuerst Sofortmassnahme, dann melden** (Modul 2 und 9).

### 7. Abschluss und Lernen
Am Projektende: Nachweise vollständig übergeben, Entsorgungsbilanz gegen Konzept prüfen, offene Punkte abschliessen. Und: Was lief gut, was nicht? Diese Erfahrungen fliessen in die Vorlagen der Firma – so wird der nächste Massnahmenplan besser.

§> Inhalte als bewährte Praxis gekennzeichnet; verbindlich sind Auflagen, Gesetz und Vertrag. Rollen von UBB und BBB gemäss Auftrag und kantonaler Praxis.` },
      { id: 'm8-l4-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm8-q18' },
      { id: 'm8-l4-abw', kind: 'decision', title: 'Abwägung: Wie viel Nachweis?', questionId: 'm8-d04' },
      { id: 'm8-l4-task', kind: 'sitetask', title: 'Baustellenaufgabe: Massnahmenplan für einen Kanalisationsersatz', taskId: 'm8-t4' },
      { id: 'm8-l4-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m8-q19', 'm8-q20'] },
      { id: 'm8-l4-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm8-p4' },
      { id: 'm8-l4-feynman', kind: 'feynman', title: 'Erklären Sie es dem Bauführer (Feynman-Methode)', feynmanId: 'm8-f1' },
      { id: 'm8-l4-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Anforderung → Massnahme → Verantwortung → Termin → Kontrolle → Nachweis; Arbeiten mit Vorbedingung erhalten einen Go/No-Go-Punkt.',
        'Funktionen statt Namen; nur nötige Personendaten.',
        'Vorlaufzeiten (Bewilligungen, Analysen, Meldungen) in den Terminplan.',
        'Plan in Startsitzung, Baustellensitzungen und Begehungen nutzen.',
        'Am Ende: Nachweise vollständig, Bilanz gegen Konzept, Erfahrungen in die Vorlagen.',
      ] },
      { id: 'm8-l4-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['vvea', 'suva-asbest', 'sia431', 'praxis'] },
    ],
  },
  // =====================================================================
  {
    id: 'm8-l5', moduleId: M, level: 3, order: 5, review: E, minutes: 15,
    title: 'Kosten, Termine und Zusammenarbeit: Umwelt als Projektsteuerung',
    topics: ['m8-steuerung'],
    objectives: [
      'Kosten- und Terminfolgen von Umweltanforderungen abschätzen und begründen',
      'Die Zusammenarbeit von Bauherrschaft, Planern, Unternehmung und Fachpersonen gestalten',
      'Projektänderungen auf Umweltfolgen prüfen',
    ],
    steps: [
      { id: 'm8-l5-situation', kind: 'situation', title: 'Einstieg: «Umwelt ist zu teuer»', text: `In der Projektsitzung sagt der Projektleiter der Bauherrschaft: «Die Umweltmassnahmen kosten uns 180 000 Franken und drei Wochen. Können wir nicht die Hälfte weglassen?» Alle schauen Sie an.

Was antworten Sie – und welche Unterlagen bräuchten Sie dafür?` },
      { id: 'm8-l5-quiz', kind: 'quiz', title: 'Vorwissen prüfen', questionIds: ['m8-q21', 'm8-q22'] },
      { id: 'm8-l5-brief', kind: 'brief', title: 'Kurz erklärt', text: `**Umweltmassnahmen haben Kosten und Termine** – und die Alternative auch: Baustopp, Sanierung, Bussen, Entschädigungen, Reputationsschaden.

**Trennen Sie**: Was ist **Pflicht** (Gesetz, Auflage) und nicht verhandelbar? Was ist **vereinbart** (Vertrag, Norm)? Was ist **Empfehlung**, die sich begründet anders lösen lässt?

**Optimieren statt streichen**: Bei Pflichtmassnahmen geht es um das *Wie* (Verfahren, Etappierung, Verwertung vor Ort), nicht um das *Ob*.

**Projektänderungen** (Bauablauf, Verfahren, Installationsort) können neue Umweltfolgen und Bewilligungen auslösen – vorher prüfen.` },
      { id: 'm8-l5-explain', kind: 'explain', title: 'Kosten und Termine beurteilen', text: `### Kosten transparent machen
- **Direkte Kosten**: Anlagen (Absetzanlage, Wannen, Pisten), Betrieb (Messungen, Unterhalt), Entsorgung, Fachpersonen.
- **Indirekte Kosten**: Platzbedarf, Wartezeiten (Freigaben, Analysen), Unterbrüche (Regentage, Brutzeit).
- **Kosten der Alternative**: Was passiert, wenn die Massnahme fehlt? (Sanierung eines Gewässerschadens, Entsorgung von vermischtem Material als Sonderabfall, Baustopp, Strafverfahren, Entschädigung Landwirt.)

### Termine
Umweltbedingte Zeitfenster sind oft **fix** und nicht verhandelbar:
- Bodenarbeiten nur bei geeigneter Bodenfeuchte (Modul 4).
- Eingriffe in Wald, Hecken und Ufervegetation: Zuerst klären, ob sie überhaupt zulässig bzw. bewilligt sind (Rodung von Wald braucht eine Bewilligung nach Waldgesetz, unabhängig von der Jahreszeit; Ufervegetation ist nach NHG geschützt). Dazu kommen Schonzeiten gemäss Auflage bzw. kantonalem Recht (z. B. Brutzeit).
- Arbeiten am Gewässer in Abstimmung mit der Fischerei (Laichzeiten).
- Schadstoffsanierung **vor** Rückbau, inkl. allfälliger Meldefrist, Kontrollen und Freigabe des Bereichs.
- Bewilligungen mit Bearbeitungszeit.
Planen Sie diese Fenster als **Randbedingungen** und bauen Sie Reserven ein.

### Optimieren statt streichen

| Statt … | … besser |
|---|---|
| Absetzanlage weglassen | Waschwasser in den Fahrmischer zurückführen, kleinere Anlage |
| Bodenschutz weglassen | Etappieren, Piste auf späterer Verkehrsfläche |
| Entsorgung «günstig» | Getrennt sammeln → mehr Verwertung, tiefere Kosten |
| Lärmschutz weglassen | Lärmarmes Verfahren, Zeitfenster, Information |

§> Kosten- und Terminangaben im Modul sind Beispiele (fiktiv), keine Richtwerte.` },
      { id: 'm8-l5-explain-2', kind: 'explain', title: 'Zusammenarbeit und Projektänderungen', text: `### Wer bringt was ein?
- **Bauherrschaft**: Ziele, Budget, Bewilligung, Beizug von Fachpersonen; letztlich Adressatin der Auflagen.
- **Planer / Bauleitung**: Projekt, Ausschreibung, Koordination, Abnahmen.
- **Unternehmung**: Verfahren, Logistik, Kalkulation, Umsetzung, Eigenkontrolle.
- **Fachpersonen** (UBB, BBB, Altlasten-, Schadstoff-, Gewässerfachleute): fachliche Beurteilung, Freigaben, Kontrollen – im Auftrag der Bauherrschaft oder wie in der Bewilligung festgelegt.
- **Behörden**: Bewilligung, Kontrolle, Auskunft. Kontakt in der Regel über die Bauherrschaft bzw. Bauleitung – ausser im Notfall.

### Umweltpunkt in der Startsitzung
Eine kurze, feste Traktandenliste: Auflagen und offene Bewilligungen, Installationsplan, Entwässerung, Entsorgung, Boden, Luft und Lärm, Notfallorganisation, Zuständigkeiten und Kontrollen, Kommunikation mit Anwohnenden.

### Projektänderungen
Wenn Verfahren, Installationsort, Bauablauf oder Materialien ändern, fragen Sie: **Ändern sich Emissionen, Risiken oder betroffene Schutzgüter?** Braucht es eine Anpassung der Bewilligung, eine Zustimmung oder ein neues Konzept? Beispiele: Nachtarbeit statt Tagesarbeit, Brecher auf der Baustelle, zusätzliche Wasserhaltung, Installationsplatz auf einer anderen Parzelle.

!> Eine Änderung, die eine neue Bewilligung braucht, darf erst umgesetzt werden, wenn diese vorliegt. Ihre Aufgabe ist, das früh zu erkennen und zu melden.` },
      { id: 'm8-l5-example', kind: 'example', title: 'Beispiel aus dem Hochbau: Terminverkürzung mit Folgen', context: 'Hochbau', text: `Um zwei Wochen aufzuholen, will die Bauleitung im Ausbau Samstagsarbeit und eine zusätzliche Betonetappe vorziehen. Die Umweltbeauftragte prüft: Samstagsarbeit ist laut Bewilligung nur mit Gesuch an die Gemeinde zulässig; die vorgezogene Betonetappe fällt in eine Phase, in der die Absetzanlage bereits zurückgebaut werden sollte. Lösung: Gesuch für vier Samstage ohne lärmintensive Arbeiten, Absetzanlage zwei Wochen länger betreiben, Anwohnende informieren.

**Lernpunkt**: Jede Terminänderung ist auch eine Umweltänderung – meist lösbar, wenn man sie früh prüft.` },
      { id: 'm8-l5-example-2', kind: 'example', title: 'Beispiel aus dem Tiefbau: Brecher statt Abtransport', context: 'Tiefbau', text: `Bei einem Strassenneubau schlägt der Unternehmer vor, Rückbaubeton und Aushub mit einem mobilen Brecher vor Ort aufzubereiten und wieder einzubauen. Das spart 1 200 Lastwagenfahrten. Die Umweltbeauftragte stellt die offenen Punkte zusammen: Abklärung beim Kanton, ob die Anlage an diesem Standort melde- oder bewilligungspflichtig ist, Qualität des Materials gemäss Vollzugshilfe, Staubmassnahmen (Befeuchtung), Lärm (Standort, Zeiten), Abstand zu Wohnhäusern. Die Bauherrschaft klärt das mit der Behörde; die Idee wird mit deren Vorgaben umgesetzt.

**Lernpunkt**: Gute Umweltideen brauchen eine saubere Prüfung – dann sind sie oft auch wirtschaftlich die besten.` },
      { id: 'm8-l5-deep', kind: 'deep', title: 'Fachvertiefung: Umweltberatung in der Projektsteuerung', text: `### 1. Die Rolle: beraten, nicht verhindern
Als Umweltbeauftragte/r der Unternehmung sind Sie **interne Beraterin bzw. interner Berater**. Ihr Ziel ist ein Projekt, das Auflagen einhält, Risiken beherrscht und wirtschaftlich bleibt. Wer nur «Nein» sagt, wird umgangen; wer Lösungen anbietet, wird früh beigezogen.

### 2. Argumentieren mit Risiken
Eine wirkungsvolle Argumentation hat drei Teile:
- **Was gilt?** (Gesetz, Auflage, Vertrag – mit Fundstelle).
- **Was passiert ohne Massnahme?** (Wahrscheinlichkeit × Schaden: Gewässerverschmutzung, Baustopp, Kosten, Reputation, Strafbarkeit).
- **Welche Varianten gibt es?** (Kosten, Termin, Wirkung).
Entscheiden müssen am Ende die Verantwortlichen (Bauherrschaft, Projektleitung) – Ihre Aufgabe ist eine **entscheidungsfähige Grundlage**.

### 3. Wenn eine Pflicht gestrichen werden soll
Bei gesetzlichen Pflichten und behördlichen Auflagen gibt es keinen Ermessensspielraum der Projektbeteiligten. Wenn trotzdem Druck kommt: sachlich bleiben, die Fundstelle zeigen, Varianten zur Umsetzung anbieten und den Entscheid **schriftlich** festhalten. Wenn eine Auflage unverhältnismässig erscheint, ist der richtige Weg ein **begründetes Gesuch an die Behörde** über die Bauherrschaft – nicht das stillschweigende Weglassen. Auch die Bauherrschaft kann eine Auflage nicht selbst ändern; Verfahren und Fristen richten sich nach dem kantonalen Recht.

### 4. Termine realistisch machen
Umweltbedingte Zeitfenster sind selten Überraschungen, wenn man sie kennt: Bodenarbeiten bei Nässe, Brutzeiten, Laichzeiten, Sanierung vor Rückbau, Bewilligungsfristen. In der AVOR werden sie im Terminplan **sichtbar** gemacht – als Randbedingung mit Begründung. Das schützt das Projekt vor unrealistischen Versprechen gegenüber der Bauherrschaft.

### 5. Zusammenarbeit mit Fachpersonen
UBB, BBB und andere Fachpersonen werden in der Regel von der Bauherrschaft beauftragt. Für die Unternehmung sind sie Partner: Sie beurteilen fachlich, geben frei und kontrollieren. Klären Sie zu Beginn: Wer meldet was wem? Wie schnell kommen Freigaben? Was geschieht bei Meinungsverschiedenheiten? Ihre eigene Rolle ist nicht, die Fachperson zu ersetzen oder zu übersteuern, sondern die Umsetzung in der Unternehmung sicherzustellen.

### 6. Change-Management im Projekt
Viele Umweltprobleme entstehen durch **Änderungen**, die niemand auf Umweltfolgen geprüft hat: anderer Installationsplatz, neues Verfahren, neuer Subunternehmer, Terminverschiebung in eine kritische Jahreszeit. Ein einfacher Schritt hilft: Bei jeder grösseren Änderung eine Frage im Änderungsformular – «Umweltfolgen geprüft? Ja/Nein, durch wen?»

### 7. Kennzahlen, die Entscheide unterstützen
Wenige Kennzahlen helfen bei Diskussionen: Anteil verwerteter Bauabfälle, Anzahl vermiedener Fahrten, Kosten der Umweltmassnahmen im Verhältnis zur Bausumme, Anzahl Abweichungen und deren Erledigung. Wichtig: Kennzahlen nur dort erheben, wo sie eine Entscheidung verändern – nicht als Selbstzweck (Modul 10).

§> Inhalte als bewährte Praxis; verbindlich sind Gesetz, Auflagen und Vertrag. Strafrechtliche Folgen sinngemäss (Modul 1).` },
      { id: 'm8-l5-decision', kind: 'decision', title: 'Entscheidungsaufgabe', questionId: 'm8-q23' },
      { id: 'm8-l5-abw', kind: 'decision', title: 'Abwägung: Sparen bei den Umweltmassnahmen', questionId: 'm8-d05' },
      { id: 'm8-l5-task', kind: 'sitetask', title: 'Baustellenaufgabe: Entscheidungsvorlage für die Projektleitung', taskId: 'm8-t5' },
      { id: 'm8-l5-review', kind: 'review', title: 'Wiederholungsfragen', questionIds: ['m8-q24', 'm8-q25'] },
      { id: 'm8-l5-practice', kind: 'practice', title: 'Praxisauftrag', taskId: 'm8-p5' },
      { id: 'm8-l5-feynman', kind: 'feynman', title: 'Erklären Sie es der Bauherrschaft (Feynman-Methode)', feynmanId: 'm8-f2' },
      { id: 'm8-l5-summary', kind: 'summary', title: 'Zusammenfassung', points: [
        'Pflicht, Vereinbarung und Empfehlung trennen – Pflichten werden optimiert, nicht gestrichen.',
        'Kosten der Massnahme immer mit den Kosten der Alternative vergleichen.',
        'Umweltbedingte Zeitfenster als Randbedingungen im Terminplan.',
        'Fachpersonen sind Partner; Rollen und Freigabewege zu Beginn klären.',
        'Jede Projektänderung auf Umweltfolgen und Bewilligungsbedarf prüfen.',
      ] },
      { id: 'm8-l5-sources', kind: 'sources', title: 'Quellen und weiterführende Informationen', sourceIds: ['usg', 'sia118', 'bafu-boden-bauen', 'nhg', 'wag', 'praxis'] },
    ],
  },
];
