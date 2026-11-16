// Exportiert die vorzulesenden Abschnitte jeder Lektion (Hörmodus «Inhalte mit Hör-Quiz», ohne Vertiefung)
// als JSON für die Audio-Erzeugung mit Piper (scripts/make-audio.py). Die Prüfsumme erkennt veraltete Audios.
import { writeFileSync } from 'node:fs';
import { LESSONS } from '../src/content';
import { audioHash, lessonSegments } from '../src/lib/speech';

const out = LESSONS.map((l) => {
  const segs = lessonSegments(l, 'inhalt+quiz');
  return { id: l.id, hash: audioHash(segs), segs: segs.map((s) => ({ title: s.title, text: s.text, pause: s.pauseAfter ?? 0 })) };
});
writeFileSync(process.argv[2] ?? 'audio-segments.json', JSON.stringify(out));
console.log(out.length, 'Lektionen exportiert');
