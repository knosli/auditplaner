// ISO 14001:2015 – zitierte Abschnittsnummern müssen in der Gliederung der Ausgabe 2015 vorkommen
// (verglichen am 16.11.2026 mit der Kurzfassung der SAQ-QUALICON AG; Kapitelüberschriften laut Herausgeberin wörtlich).
import { describe, expect, test } from 'vitest';
import { LESSONS, QUESTIONS, TASKS, SCENARIOS, CARDS, GLOSSARY } from '../src/content';

const ISO14001_2015 = new Set([
  '4', '4.1', '4.2', '4.3', '4.4', '5', '5.1', '5.2', '5.3', '6', '6.1', '6.1.1', '6.1.2', '6.1.3', '6.1.4', '6.2', '6.2.1', '6.2.2',
  '7', '7.1', '7.2', '7.3', '7.4', '7.4.1', '7.4.2', '7.4.3', '7.5', '7.5.1', '7.5.2', '7.5.3', '8', '8.1', '8.2',
  '9', '9.1', '9.1.1', '9.1.2', '9.2', '9.2.1', '9.2.2', '9.3', '10', '10.1', '10.2', '10.3',
]);

describe('ISO 14001:2015 – Abschnittsnummern', () => {
  const text = JSON.stringify([LESSONS, QUESTIONS, TASKS, SCENARIOS, CARDS, GLOSSARY]);
  // «ISO 14001 … Abschnitt(e) 6.1.3 und 9.1.2», «ISO 14001 (Ausgabe 2015: 6.1.3, 9.1.2)», «ISO 14001:2015 (9.2, 10.2)»
  const refs = [...text.matchAll(/ISO 14001[^.\]"]{0,60}?(?:Abschnitte?|Ausgabe 2015:|2015 \()\s*((?:\d+(?:\.\d+)*(?:,\s*| und )?)+)/g)]
    .flatMap((m) => m[1].split(/,\s*| und /).map((x) => x.trim()).filter(Boolean));
  test('es werden Abschnitte zitiert', () => expect(refs.length).toBeGreaterThanOrEqual(10));
  test('jede zitierte Nummer existiert in der Ausgabe 2015', () => {
    for (const r of refs) expect(ISO14001_2015.has(r), r).toBe(true);
  });
});
