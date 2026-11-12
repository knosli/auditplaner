// Plattform-Anbindung. Die App läuft überall (lokal, statischer Webserver,
// claude.ai-Artifact). Im Artifact stehen zusätzlich zur Verfügung:
//  - db:        Lernstand privat pro Person speichern (geräteübergreifend)
//  - sample:    echter KI-Lerncoach (auf Kosten des eigenen Claude-Kontos)
//  - downloads: Export-Datei speichern
// Fehlt eine Fähigkeit, wird die Funktion ausgeblendet bzw. ohne sie gearbeitet.

import { normalizeState, trimState, type AppState } from './state';

type AnyFn = (...a: any[]) => any;
interface ClaudeRuntime { use: (name: string) => Promise<any> }
const runtime = (): ClaudeRuntime | null => {
  try {
    const c = (window as unknown as { claude?: ClaudeRuntime }).claude;
    return c && typeof c.use === 'function' ? c : null;
  } catch {
    return null;
  }
};

async function use<T = any>(name: string): Promise<T | null> {
  const c = runtime();
  if (!c) return null;
  try {
    return (await c.use(name)) as T | null;
  } catch {
    return null;
  }
}

// ---------- Lokal ----------
const LS_KEY = 'umweltcampus.v1';

export function loadLocal(): AppState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveLocal(s: AppState): boolean {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
    return true;
  } catch {
    return false;
  }
}

export function clearLocal() {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* ignorieren */
  }
}

// ---------- Cloud (Artifact-Datenbank, privat pro Person) ----------
export interface Cloud {
  load(): Promise<AppState | null>;
  save(s: AppState): Promise<void>;
}

export async function initCloud(): Promise<Cloud | null> {
  const [db, user] = await Promise.all([use('db'), use('user')]);
  if (!db || !user) return null;
  let uid: string;
  try {
    uid = await user.id();
  } catch {
    return null;
  }
  if (!uid) return null;
  // data/users/<id>/ ist für alle anderen unsichtbar – auch für die Eigentümerin des Artifacts.
  const ref = db.doc(`data/users/${uid}/progress`);
  return {
    async load() {
      const snap = await ref.get();
      const d = snap?.data?.();
      if (!d || typeof d.json !== 'string') return null;
      return normalizeState(JSON.parse(d.json));
    },
    async save(s) {
      await ref.set({ json: JSON.stringify(trimState(s)), updatedAt: s.updatedAt });
    },
  };
}

// ---------- KI ----------
export type SampleFn = ((input: unknown, opts?: Record<string, unknown>) => Promise<{ text: string; truncated?: boolean }>) & { json: AnyFn };

export async function initAI(): Promise<SampleFn | null> {
  return use<SampleFn>('sample');
}

export function aiErrorText(code: string | undefined): string {
  switch (code) {
    case 'not_granted': return 'Sie haben den Zugriff auf Claude für diese Seite nicht erlaubt. Der Coach arbeitet ohne KI weiter.';
    case 'rate_limited': return 'Zu viele Anfragen in kurzer Zeit. Bitte einen Moment warten.';
    case 'cancelled': return 'Abgebrochen.';
    case 'prompt_too_large': return 'Die Anfrage ist zu lang. Bitte kürzer fassen.';
    case 'refused': return 'Die Anfrage wurde abgelehnt. Bitte anders formulieren.';
    case 'invalid_json': return 'Die Antwort konnte nicht ausgewertet werden. Bitte erneut versuchen.';
    default: return 'Die KI ist gerade nicht erreichbar. Bitte später erneut versuchen.';
  }
}

// ---------- Dateien ----------
export async function saveFile(filename: string, text: string, mime = 'application/json'): Promise<'gespeichert' | 'abgelehnt' | 'fallback' | 'fehler'> {
  const dl = await use('downloads');
  if (dl) {
    try {
      await dl.save({ filename, data: new Blob([text], { type: mime }) });
      return 'gespeichert';
    } catch (e: any) {
      if (e?.code === 'declined') return 'abgelehnt';
      // weiter mit Fallback
    }
  }
  if (runtime()) return 'fallback'; // im Artifact sind direkte Downloads gesperrt
  try {
    const url = URL.createObjectURL(new Blob([text], { type: mime }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return 'gespeichert';
  } catch {
    return 'fallback';
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export const inArtifact = () => !!runtime();
