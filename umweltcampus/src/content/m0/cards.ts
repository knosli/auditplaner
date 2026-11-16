import type { Card } from '../types';

const M = 'm0';

export const M0_CARDS: Card[] = [
  { id: 'm0-c01', moduleId: M, topic: 'm0-wirkung', level: 1, front: 'Die drei Glieder jeder Umweltgefahr?', back: '**Quelle** (wo es entsteht) → **Weg** (wie es sich ausbreitet) → **Schutzgut** (wen oder was es trifft).', sources: ['praxis'] },
  { id: 'm0-c02', moduleId: M, topic: 'm0-wirkung', level: 1, front: 'Emission oder Immission?', back: '**Emission** beim Austritt aus der Anlage (z. B. am Bagger), **Immission** am Ort des Einwirkens (z. B. im Schlafzimmer) – Art. 7 Abs. 2 USG.', sources: ['usg'] },
  { id: 'm0-c03', moduleId: M, topic: 'm0-wirkung', level: 1, front: 'Wo setzen Massnahmen zuerst an?', back: '**An der Quelle** (Art. 11 Abs. 1 USG), dann am **Weg**; beim Schutzgut nur ergänzend. Vorsorglich – auch ohne Beschwerde.', sources: ['usg'] },
  { id: 'm0-c04', moduleId: M, topic: 'm0-wasser', level: 1, front: 'Wie viel Trink- und Brauchwasser stammt aus Grundwasser?', back: 'In der Schweiz **mehr als 80 %** (BAFU). Was versickert, kann dort ankommen.', sources: ['bafu-grundwasser'] },
  { id: 'm0-c05', moduleId: M, topic: 'm0-wasser', level: 1, front: 'Wohin führt ein Meteorschacht?', back: 'Im Trennsystem **ohne Reinigung** in ein Gewässer bzw. eine Versickerung – nie etwas Verschmutztes hineingeben.', sources: ['gschg', 'gemeinde-entwaesserung'] },
  { id: 'm0-c06', moduleId: M, topic: 'm0-wasser', level: 1, front: 'Die drei typischen Gewässergefahren der Baustelle?', back: '**Trübung** (Feinstoffe), **hoher pH** (Zement), **Öl/Treibstoff/Chemikalien**.', sources: ['gschg', 'praxis'] },
  { id: 'm0-c07', moduleId: M, topic: 'm0-boden', level: 1, front: 'Was ist «Boden» im Umweltrecht?', back: 'Nur die **oberste, unversiegelte Erdschicht, in der Pflanzen wachsen können** (Art. 7 Abs. 4bis USG). Darunter: Aushub.', sources: ['usg'] },
  { id: 'm0-c08', moduleId: M, topic: 'm0-boden', level: 1, front: 'Ober- oder Unterboden?', back: '**Oberboden**: dunkel, humusreich, belebt. **Unterboden**: heller, durchwurzelt. Immer **getrennt** abtragen, lagern, einbauen.', sources: ['bafu-boden-bauen'] },
  { id: 'm0-c09', moduleId: M, topic: 'm0-boden', level: 1, front: 'Wann verdichtet Boden am leichtesten?', back: 'Wenn er **nass** ist. Verdichtung – besonders im Unterboden – ist kaum rückgängig zu machen.', sources: ['bafu-boden-bauen'] },
  { id: 'm0-c10', moduleId: M, topic: 'm0-luftlaerm', level: 1, front: 'Drei Dezibel-Faustregeln?', back: '**+3 dB** zwei gleiche Quellen · **+10 dB** etwa doppelt so laut empfunden · **–6 dB** doppelter Abstand im Freien (idealisiert).', sources: ['bafu-baulaerm', 'praxis'] },
  { id: 'm0-c11', moduleId: M, topic: 'm0-luftlaerm', level: 1, front: 'Was ist PM10?', back: 'Feinstaub mit Partikeln bis etwa **10 Mikrometer** – oft unsichtbar, gelangt tief in die Atemwege.', sources: ['lrv', 'bafu-luft'] },
  { id: 'm0-c12', moduleId: M, topic: 'm0-luftlaerm', level: 2, front: 'Gibt es Grenzwerte für Baulärm?', back: '**Nein.** Begrenzt wird mit Massnahmenstufen A/B/C nach der Baulärm-Richtlinie, verbindlich über Bewilligung bzw. Auflage.', sources: ['bafu-baulaerm', 'lsv'] },
  { id: 'm0-c13', moduleId: M, topic: 'm0-stoffe', level: 1, front: 'pH-Skala in einem Satz?', back: '**7 neutral**, darunter sauer, darüber alkalisch; **logarithmisch** – jede Stufe Faktor 10. Betonwaschwasser oft pH 11–13.', sources: ['kanton-merkblatt'] },
  { id: 'm0-c14', moduleId: M, topic: 'm0-stoffe', level: 1, front: 'l/s in m³/h?', back: '**× 3,6.** Beispiel: 5 l/s = 18 m³/h. Und: 1 m³ = 1000 l.', sources: ['praxis'] },
  { id: 'm0-c15', moduleId: M, topic: 'm0-stoffe', level: 1, front: 'mg/l oder mg/kg?', back: '**mg/l** für Wasser (= g/m³), **mg/kg** für Boden, Aushub, Rückbaumaterial.', sources: ['praxis'] },
  { id: 'm0-c16', moduleId: M, topic: 'm0-recht', level: 1, front: 'Wie verbindlich ist eine BAFU-Vollzugshilfe?', back: 'Richtet sich an die Behörden; für die Baustelle verbindlich über **Bewilligung bzw. Auflage**.', sources: ['bafu-baulaerm'] },
  { id: 'm0-c17', moduleId: M, topic: 'm0-recht', level: 1, front: 'Wer vollzieht das Umweltrecht?', back: 'Grundsätzlich die **Kantone** (Art. 36 USG), je nach Kanton mit den Gemeinden.', sources: ['usg'] },
  { id: 'm0-c18', moduleId: M, topic: 'm0-klima', level: 1, front: 'Graue Emissionen?', back: 'Treibhausgase aus **Herstellung, Transport und Entsorgung der Baustoffe** – vor allem Zement und Stahl.', sources: ['kbob-oekobilanz'] },
  { id: 'm0-c19', moduleId: M, topic: 'm0-klima', level: 1, front: 'Scope 1, 2, 3?', back: '**1** eigene direkte Emissionen (z. B. Diesel) · **2** eingekaufte Energie · **3** übrige Wertschöpfungskette (z. B. Baustoffe).', sources: ['ghg-protocol'] },
];
