// Artikel-Links auf Fedlex (geltende Fassung, Sprungmarke zum Artikel).
import { describe, expect, test } from 'vitest';
import { LAW_RE_SRC, LAW_URLS, lawLink } from '../src/lib/lawlinks';
import { SOURCES } from '../src/content';

const find = (txt: string) => [...txt.matchAll(new RegExp(LAW_RE_SRC, 'g'))].map((m) => lawLink(m[1], m[2], m[3], m[4]));

describe('Artikel-Links', () => {
  test('Hauptgesetze haben eine Fedlex-Adresse', () => {
    for (const a of ['USG', 'GSchG', 'GSchV', 'VVEA', 'LRV', 'LSV', 'NHG', 'RPG', 'VeVA', 'AltlV', 'StGB', 'OR', 'KlG', 'BV']) expect(LAW_URLS[a], a).toMatch(/^https:\/\/www\.fedlex\.admin\.ch\/eli\/cc\/.+\/de$/);
  });
  test('Sprungmarken wie auf Fedlex (art_2, art_59_a, art_6_bis)', () => {
    const usg = LAW_URLS.USG;
    expect(find('Verursacherprinzip (Art. 2 USG)')).toEqual([usg + '#art_2']);
    expect(find('Art. 59a USG')).toEqual([usg + '#art_59_a']);
    expect(find('Art. 33 Abs. 2 USG und Art. 6bis NHG')).toEqual([usg + '#art_33', LAW_URLS.NHG + '#art_6_bis']);
    expect(find('Art. 60–61 USG')).toEqual([usg + '#art_60']);
    expect(find('Art. 19 lit. b VVEA')).toEqual([LAW_URLS.VVEA + '#art_19']);
  });
  test('keine Links ohne Erlass oder für Erlasse ohne Fedlex-Adresse', () => {
    expect(find('Art. 5 Abs. 1 regelt')).toEqual([]);
    expect(find('Art. 3 SIA 118')).toEqual([]);
    expect(find('Art. 4 VBBo')).toEqual([]);
    expect(find('Art. 2 USGX')).toEqual([]);
  });
  test('jede Fedlex-Adresse im Quellenregister ist eine ELI-Adresse der geltenden Fassung', () => {
    for (const s of SOURCES.filter((x) => x.url?.includes('fedlex.admin.ch/eli'))) expect(s.url, s.id).toMatch(/^https:\/\/www\.fedlex\.admin\.ch\/eli\/cc\/[^?#]+\/de$/);
  });
});

describe('BauAV und ChemRRV (16.11.2026)', () => {
  test('als Quellen mit Fedlex-Adresse; Artikelzitate verlinkt', () => {
    expect(LAW_URLS.BauAV).toBe('https://www.fedlex.admin.ch/eli/cc/2021/384/de');
    expect(LAW_URLS.ChemRRV).toBe('https://www.fedlex.admin.ch/eli/cc/2005/478/de');
    expect(find('(Art. 82 BauAV)')).toEqual([LAW_URLS.BauAV + '#art_82']);
    expect(find('Art. 3 Abs. 2 BauAV')).toEqual([LAW_URLS.BauAV + '#art_3']);
  });
  test('keine «laut Suva»-Vorbehalte mehr bei den verglichenen BauAV-Artikeln', () => {
    const s = JSON.stringify(SOURCES.find((x) => x.id === 'bauav'));
    for (const a of ['Art. 3 Abs. 2', 'Art. 82', 'Art. 86']) expect(s).toContain(a);
  });
});
