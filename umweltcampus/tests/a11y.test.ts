// Barrierefreiheit: Textkontraste der Designtokens (hell und dunkel) nach WCAG 2.1 AA.
import { describe, expect, test } from 'vitest';
import cssRaw from '../src/styles.css?raw';

const css: string = cssRaw;
function vars(block: string) {
  const m: Record<string, string> = {};
  for (const x of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)) m[x[1]] = x[2];
  return m;
}
const light = vars(css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {'))));
const darkStart = css.indexOf(':root[data-theme="dark"]');
const dark = vars(css.slice(darkStart, css.indexOf('}', darkStart)));
const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// Text-/Hintergrundpaare, die in der Oberfläche vorkommen
const PAIRS: [string, string][] = [
  ['fg', 'bg'], ['fg', 'surface'], ['fg', 'surface-2'], ['muted', 'bg'], ['muted', 'surface'], ['muted', 'surface-2'],
  ['accent', 'surface'], ['accent', 'accent-soft'], ['accent-fg', 'accent'], ['ok', 'ok-soft'], ['ok', 'surface'],
  ['warn', 'warn-soft'], ['warn', 'surface'], ['ochre', 'ochre-soft'], ['crit-ink', 'crit-soft'], ['crit-ink', 'surface'],
];

describe('Kontraste der Designtokens (WCAG AA, 4.5:1 für Text)', () => {
  for (const [name, t] of [['hell', light], ['dunkel', dark]] as const) {
    test(`${name}: alle Textpaare ≥ 4.5`, () => {
      const bad = PAIRS.filter(([f, b]) => t[f] && t[b] && ratio(t[f], t[b]) < 4.5).map(([f, b]) => `${f}/${b} ${ratio(t[f], t[b]).toFixed(2)}`);
      expect(bad).toEqual([]);
    });
  }
  test('Szenenpläne: Beschriftungen auf den Flächen ≥ 4.5', () => {
    const label = '#24433f';
    for (const bg of ['#f6f7f4', '#e4ebe6', '#efe7d8', '#c9b79a', '#cfe3ef', '#e1efd9', '#dcdfdd', '#f3e2c4', '#ffffff', '#e9d9bd', '#fbe9e6']) expect(ratio(label, bg), bg).toBeGreaterThanOrEqual(4.5);
    for (const marker of ['#c14c40', '#2f6f93', '#2b7547']) expect(ratio('#ffffff', marker), marker).toBeGreaterThanOrEqual(4.5);
  });
});
