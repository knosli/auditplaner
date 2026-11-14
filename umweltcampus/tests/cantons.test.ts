// Kantonales Quellenregister: Kantonswechsel, Mehrsprachigkeit, Gemeinde, Prüfstatus, Lernstand.
import { describe, expect, test } from 'vitest';
import { CANTONS, CANTON_SOURCES, CHECK_THEMES, MODULE_THEMES, cantonSources, isMultilingual, projectCheck } from '../src/content/cantons';
import { MODULES, SOURCES } from '../src/content';
import { emptyState, normalizeState } from '../src/lib/state';

describe('Kantonsregister', () => {
  test('21 Kantone, eindeutige Kürzel, je mindestens eine amtliche Quelle', () => {
    expect(CANTONS.length).toBe(21);
    expect(new Set(CANTONS.map((c) => c.code)).size).toBe(21);
    for (const c of CANTONS) expect(cantonSources(c.code).length, c.code).toBeGreaterThanOrEqual(1);
    expect(CANTONS.map((c) => c.code)).not.toContain('GE');
  });
  test('Quellen: eindeutige IDs, https, Schweizer Domain, Metadaten vollständig', () => {
    expect(new Set(CANTON_SOURCES.map((x) => x.id)).size).toBe(CANTON_SOURCES.length);
    for (const x of CANTON_SOURCES) {
      expect(x.url, x.id).toMatch(/^https:\/\/[^/]+\.ch\//);
      expect(CANTONS.some((c) => c.code === x.canton), x.id).toBe(true);
      expect(x.title && x.issuer && x.retrieved && x.nature && x.hint, x.id).toBeTruthy();
      expect(x.themes.length, x.id).toBeGreaterThan(0);
    }
  });
  test('Keine Quelle gilt als geprüft ohne datierte Fundstelle', () => {
    for (const x of CANTON_SOURCES) {
      if (x.status === 'geprueft') expect(x.checkedRef, x.id).toBeTruthy();
      else expect(x.status).toBe('nicht_geprueft');
    }
    // derzeit ist keine kantonale Pflicht fachlich geprüft
    expect(CANTON_SOURCES.filter((x) => x.status === 'geprueft').length).toBe(0);
  });
  test('BE, FR, GR, VS mehrsprachig, die übrigen einsprachig Deutsch', () => {
    for (const c of ['BE', 'FR', 'GR', 'VS']) expect(isMultilingual(c), c).toBe(true);
    expect(CANTONS.find((c) => c.code === 'GR')!.langs).toEqual(['de', 'it', 'rm']);
    expect(CANTONS.find((c) => c.code === 'FR')!.langs).toEqual(['de', 'fr']);
    for (const c of CANTONS.filter((x) => !['BE', 'FR', 'GR', 'VS'].includes(x.code))) expect(c.langs, c.code).toEqual(['de']);
  });
  test('Kantonswechsel ändert die Quellen', () => {
    const zh = projectCheck('ZH').find((r) => r.theme === 'gewaesser')!;
    const ag = projectCheck('AG').find((r) => r.theme === 'gewaesser')!;
    expect(zh.cantonal.every((x) => x.canton === 'ZH')).toBe(true);
    expect(zh.cantonal.length).toBeGreaterThan(0);
    expect(ag.cantonal.length).toBe(0);
    expect(JSON.stringify(zh.cantonal)).not.toEqual(JSON.stringify(ag.cantonal));
  });
  test('Nur Bundesrecht → «kantonale Regelung nicht verifiziert»; gefundene Quelle → nicht als gesichert', () => {
    const ag = projectCheck('AG');
    const gw = ag.find((r) => r.theme === 'gewaesser')!;
    expect(gw.status).toBe('nicht_verifiziert');
    expect(gw.message).toContain('Kantonale Regelung nicht verifiziert');
    expect(gw.federal.map((s) => s.id)).toContain('gschg');
    const ab = ag.find((r) => r.theme === 'abfall')!;
    expect(ab.status).toBe('quelle_nicht_geprueft');
    expect(ab.message).toContain('nicht geprüft');
    for (const r of projectCheck(undefined)) expect(r.cantonal.length).toBe(0);
  });
  test('Projektcheck deckt alle Themen ab und nennt die Gemeinde', () => {
    const rows = projectCheck('SO', CHECK_THEMES, 'Musterdorf');
    expect(rows.map((r) => r.theme)).toEqual(['gewaesser', 'abfall', 'boden', 'luft_laerm', 'natur', 'bewilligung', 'notfall']);
    for (const r of rows) { expect(r.message).toContain('Musterdorf'); expect(r.federal.length).toBeGreaterThan(0); }
  });
  test('Schweizer Grundlagen verweisen nur auf vorhandene Quellen; jedes Modul hat Themen', () => {
    for (const r of projectCheck('ZH')) for (const s of r.federal) expect(SOURCES.some((x) => x.id === s.id)).toBe(true);
    for (const m of MODULES) expect(MODULE_THEMES[m.id], m.id).toBeTruthy();
  });
});

describe('Standort im Lernstand', () => {
  test('alter Lernstand ohne Standort lädt; Standort und Fortschritt bleiben beim Import erhalten', () => {
    const old = emptyState(1); old.answers.push({ q: 'm2-q01', at: 1, score: 1, correct: true, ctx: 'lektion', v: 6 });
    const a = normalizeState(JSON.parse(JSON.stringify(old)));
    expect(a.settings.site).toBeUndefined();
    const withSite = { ...a, settings: { ...a.settings, site: { canton: 'BE', lang: 'fr', municipality: 'Biel/Bienne' }, localMode: 'kanton' } };
    const b = normalizeState(JSON.parse(JSON.stringify(withSite)));
    expect(b.settings.site).toEqual({ canton: 'BE', lang: 'fr', municipality: 'Biel/Bienne' });
    expect(b.answers.length).toBe(1);
    const switched = normalizeState({ ...b, settings: { ...b.settings, site: { canton: 'ZH' } } });
    expect(switched.answers).toEqual(b.answers);
  });
});
