import { useSyncExternalStore } from 'react';

// Fokusmodus für Lektionen: blendet Navigation und Seitenleiste aus.
// Gerätebezogene Bequemlichkeit (localStorage), nicht Teil des Lernstands.
const KEY = 'uc-focus';
const subs = new Set<() => void>();
let state = (() => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } })();

export function setFocus(v: boolean) {
  state = v;
  try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* ohne Speicher nur für diese Sitzung */ }
  subs.forEach((f) => f());
}
export function useFocus(): [boolean, (v: boolean) => void] {
  const v = useSyncExternalStore((cb) => { subs.add(cb); return () => subs.delete(cb); }, () => state, () => false);
  return [v, setFocus];
}

// Einklappbare Navigationsgruppen (gerätebezogen)
const NKEY = 'uc-nav-open';
export function loadNavOpen(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(NKEY) ?? '{}') ?? {}; } catch { return {}; }
}
export function saveNavOpen(v: Record<string, boolean>) {
  try { localStorage.setItem(NKEY, JSON.stringify(v)); } catch { /* egal */ }
}
