// UX-Update: drei Lernstufen, Gliederung der Fachvertiefung, Szenen im Simulator.
import { describe, expect, test } from 'vitest';
import { LESSONS, SCENARIOS } from '../src/content';
import { SCENES } from '../src/content/scenes';
import { lessonStatus, recordAnswer } from '../src/lib/learning';
import { emptyState, normalizeState } from '../src/lib/state';
import { keySentence, splitDeep } from '../src/components/RichText';

const L = LESSONS.find((l) => l.id === 'm2-l1')!;
const closedIds = L.steps.flatMap((st) => (st.kind === 'quiz' || st.kind === 'review' ? st.questionIds : st.kind === 'decision' ? [st.questionId] : []));

describe('Drei Lernstufen je Lektion', () => {
  test('frischer Stand: nichts erfüllt', () => {
    const st = lessonStatus(emptyState(), 'm2-l1');
    expect([st.read.ok, st.worked.ok, st.proven.ok]).toEqual([false, false, false]);
    expect(st.read.total).toBeGreaterThan(3);
  });
  test('gelesen ≠ nachgewiesen: alle Schritte gesehen, keine Antworten', () => {
    const s = emptyState();
    s.lessons['m2-l1'] = { cur: L.steps[0].id, seen: L.steps.map((x) => x.id), startedAt: 1, completedAt: 2, answers: {}, open: {} };
    const st = lessonStatus(s, 'm2-l1');
    expect(st.read.ok).toBe(true);
    expect(st.worked.ok).toBe(false);
    expect(st.proven.ok).toBe(false);
  });
  test('falsche Antworten: bearbeitet, aber nicht nachgewiesen', () => {
    let s = emptyState();
    for (const q of closedIds) s = recordAnswer(s, q, 0, 2, 'lektion', 10);
    const st = lessonStatus(s, 'm2-l1');
    expect(st.proven.done).toBe(0);
    expect(st.proven.ok).toBe(false);
  });
  test('richtige, objektiv ausgewertete Antworten weisen nach; Selbstbewertung nie', () => {
    let s = emptyState();
    for (const q of closedIds) s = recordAnswer(s, q, 1, 3, 'lektion', 10);
    const st = lessonStatus(s, 'm2-l1');
    expect(st.proven.done).toBe(st.proven.total);
    let t = emptyState();
    for (const q of closedIds) t = recordAnswer(t, q, 1, undefined, 'lektion', 10, { self: true });
    expect(lessonStatus(t, 'm2-l1').proven.done).toBe(0);
  });
  test('kritischer Fehler zählt nie als Nachweis; Lernstand bleibt beim Laden erhalten', () => {
    let s = emptyState();
    s = recordAnswer(s, closedIds[0], 1, 3, 'lektion', 10, { crit: true });
    expect(lessonStatus(s, 'm2-l1').proven.done).toBe(0);
    const again = normalizeState(JSON.parse(JSON.stringify(s)));
    expect(again.answers).toEqual(s.answers);
  });
});

describe('Fachvertiefung gegliedert', () => {
  test('jede Vertiefung lässt sich in mindestens drei Abschnitte mit Kernsatz gliedern', () => {
    for (const l of LESSONS) for (const st of l.steps) if (st.kind === 'deep') {
      const d = splitDeep(st.text);
      expect(d.sections.length, st.id).toBeGreaterThanOrEqual(3);
      for (const sec of d.sections) expect(keySentence(sec.body).length, `${st.id} ${sec.title}`).toBeGreaterThan(10);
    }
  });
  test('Kernsatz endet nicht bei Abkürzungen', () => {
    expect(keySentence('Nach Art. 19 Abs. 2 GSchG braucht es eine Bewilligung. Rest.')).toBe('Nach Art. 19 Abs. 2 GSchG braucht es eine Bewilligung.');
    expect(keySentence('Zum Beispiel z. B. Beton. Mehr.')).toBe('Zum Beispiel z. B. Beton.');
  });
  test('Rechtsnatur-Hinweis am Schluss bleibt erhalten', () => {
    const d = splitDeep('### 1. A\nText eins.\n### 2. B\nText zwei.\n### 3. C\nText drei.\n\n§> Sinngemäss.');
    expect(d.legal).toBe('§> Sinngemäss.');
    expect(d.sections[2].body).not.toContain('§>');
  });
});

describe('Technische Szenen im Simulator', () => {
  test('jeder verfügbare Fall hat eine eigene Szene mit Gefahren, Schutzgütern und Massnahmen', () => {
    for (const sc of SCENARIOS.filter((x) => x.status === 'verfuegbar')) {
      const s = SCENES[sc.id];
      expect(s, sc.id).toBeTruthy();
      const hz = s.els.filter((e) => e.t === 'hazard');
      expect(hz.length, sc.id).toBeGreaterThanOrEqual(2);
      expect(s.els.filter((e) => e.t === 'receptor').length, sc.id).toBeGreaterThanOrEqual(1);
      expect(s.els.filter((e) => e.t === 'measure').length, sc.id).toBeGreaterThanOrEqual(2);
      for (const h of hz) if (h.t === 'hazard') expect(h.then.length, sc.id).toBeGreaterThan(5);
    }
  });
  test('Szenen sind individuell und liegen im Zeichenbereich', () => {
    const sigs = new Set(Object.values(SCENES).map((s) => JSON.stringify(s.els.filter((e) => e.t === 'hazard'))));
    expect(sigs.size).toBe(Object.keys(SCENES).length);
    for (const [id, s] of Object.entries(SCENES)) for (const e of s.els) {
      const xy = 'x' in e ? [[e.x, e.y]] : e.pts;
      for (const [x, y] of xy) { expect(x, id).toBeGreaterThanOrEqual(0); expect(x, id).toBeLessThanOrEqual(640); expect(y, id).toBeGreaterThanOrEqual(0); expect(y, id).toBeLessThanOrEqual(300); }
    }
  });
});
