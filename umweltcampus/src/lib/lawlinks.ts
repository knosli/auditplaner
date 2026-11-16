import { SOURCES } from '../content';

// Artikelzitate wie «Art. 59a USG» oder «Art. 33 Abs. 2 USG» → Link auf die geltende Fassung auf Fedlex,
// direkt zum Artikel (Sprungmarke «#art_59_a»). Nur für Erlasse mit Fedlex-Adresse im Quellenregister.

/** Abkürzung → Fedlex-Adresse (aus dem Quellenregister). */
export const LAW_URLS: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const s of SOURCES) {
    if (!s.url || !/^https:\/\/www\.fedlex\.admin\.ch\/eli\/cc\//.test(s.url)) continue;
    const inBrackets = /\(([A-Za-zÄÖÜäöü]{2,8})\)/.exec(s.short)?.[1];
    const first = /^([A-Za-zÄÖÜäöü]{2,8})(?:\s|$)/.exec(s.short)?.[1];
    const abbr = inBrackets ?? first;
    if (abbr && !out[abbr]) out[abbr] = s.url;
  }
  return out;
})();

const ABBRS = Object.keys(LAW_URLS).sort((a, b) => b.length - a.length).join('|');
/** Gruppen: 1 Artikelnummer, 2 Buchstabe, 3 bis/ter/quater, 4 Abkürzung */
export const LAW_RE_SRC = `Art\\. (\\d+)([a-z])?(?: ?(bis|ter|quater))?(?:[–-]\\d+[a-z]?)?(?: (?:Abs\\.|Ziff\\.|lit\\.|Bst\\.) ?\\d*[a-z]?(?:[–-]\\d+)?)* (${ABBRS})(?![A-Za-zäöü])`;

export function lawLink(no: string, letter: string | undefined, suffix: string | undefined, abbr: string): string | null {
  const base = LAW_URLS[abbr];
  if (!base) return null;
  return `${base}#art_${no}${letter ? '_' + letter : ''}${suffix ? '_' + suffix : ''}`;
}
