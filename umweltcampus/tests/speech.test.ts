// Hörmodus: Text für die Sprachausgabe und Abschnitte.
import { describe, expect, test } from 'vitest';
import { LESSONS, MODULES } from '../src/content';
import { chunks, lessonSegments, minutesOf, moduleSegments, speakable } from '../src/lib/speech';

describe('Text für die Sprachausgabe', () => {
  test('Markup, Abkürzungen, Einheiten und Gesetze werden hörbar', () => {
    expect(speakable('Titel. ### Der Weg\nText')).not.toContain('#');
    const t = speakable('**Wichtig:** Nach Art. 6 Abs. 1 GSchG z. B. 5 l/s = 18 m³/h; pH 6.5–9.0; [[ph|pH-Wert]] am 25.2.2025, +3 dB, 80 %.');
    expect(t).not.toMatch(/\*\*|\[\[|\]\]/);
    expect(t).toContain('Artikel 6 Absatz 1 Gewässerschutzgesetz');
    expect(t).toContain('zum Beispiel');
    expect(t).toContain('Liter pro Sekunde');
    expect(t).toContain('Kubikmeter pro Stunde');
    expect(t).toContain('6,5 bis 9,0');
    expect(t).toContain('25.2.2025');
    expect(t).toContain('Dezibel');
    expect(t).toContain('80 Prozent');
  });
  test('Tabellen werden zu Sätzen', () => {
    const t = speakable('| Art | Wer |\n|---|---|\n| Gesetz | Parlament |');
    expect(t).toContain('Gesetz. Wer: Parlament.');
    expect(t).not.toContain('|');
  });
  test('lange Texte in kurze Stücke', () => {
    const c = chunks('Satz eins. '.repeat(60));
    expect(c.length).toBeGreaterThan(2);
    expect(c.every((x) => x.length <= 240)).toBe(true);
  });
});

describe('Abschnitte', () => {
  test('jedes verfügbare Modul lässt sich vorlesen, mit Inhalten und Hör-Quiz', () => {
    for (const m of MODULES.filter((x) => x.status === 'verfuegbar')) {
      const all = moduleSegments(m.id, 'inhalt+quiz');
      expect(all.length, m.id).toBeGreaterThan(10);
      expect(all.some((s) => s.pauseAfter), m.id).toBe(true);
      expect(all.every((s) => s.text.length > 3), m.id).toBe(true);
    }
  });
  test('Hör-Quiz: Frage mit Denkpause, danach die Lösung', () => {
    const l = LESSONS.find((x) => x.id === 'm0-l2')!;
    const q = lessonSegments(l, 'quiz');
    expect(q[0].pauseAfter).toBe(6);
    expect(q[0].text).toMatch(/Antwort 1/);
    expect(q[1].text).toMatch(/^Richtig ist Antwort \d/);
  });
  test('Modus «nur Inhalte» enthält keine Quizfragen; Vertiefung nur auf Wunsch', () => {
    const l = LESSONS.find((x) => x.id === 'm2-l1')!;
    expect(lessonSegments(l, 'inhalt').some((s) => s.pauseAfter)).toBe(false);
    expect(lessonSegments(l, 'inhalt', true).length).toBeGreaterThan(lessonSegments(l, 'inhalt').length);
    expect(minutesOf(lessonSegments(l, 'inhalt'))).toBeGreaterThan(1);
  });
});

describe('Stimmenwahl', () => {
  test('natürliche Stimmen vor einfachen', async () => {
    const { voiceScore } = await import('../src/lib/speech');
    const vs = [
      { name: 'Anna', lang: 'de-DE' },
      { name: 'Anna (Verbessert)', lang: 'de-DE' },
      { name: 'Microsoft Katja Online (Natural) - German (Germany)', lang: 'de-DE' },
      { name: 'eSpeak German', lang: 'de' },
      { name: 'Google Deutsch', lang: 'de-DE' },
    ].sort((a, b) => voiceScore(b) - voiceScore(a)).map((v) => v.name);
    expect(vs[0]).toMatch(/Verbessert|Natural/);
    expect(vs[vs.length - 1]).toMatch(/eSpeak/);
    expect(vs.indexOf('Google Deutsch')).toBeLessThan(vs.indexOf('Anna'));
  });
});

describe('Audio-Prüfsumme', () => {
  test('stabil für gleichen Text, ändert sich bei Textänderung', async () => {
    const { audioHash } = await import('../src/lib/speech');
    const l = LESSONS.find((x) => x.id === 'm0-l1')!;
    const a = lessonSegments(l, 'inhalt+quiz');
    expect(audioHash(a)).toBe(audioHash(lessonSegments(l, 'inhalt+quiz')));
    expect(audioHash([{ ...a[0], text: a[0].text + ' x' }, ...a.slice(1)])).not.toBe(audioHash(a));
  });
});
