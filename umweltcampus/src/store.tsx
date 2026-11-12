import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { emptyState, dayKey, hasProgress, preferRemote, type AppState, type HistoryEvent } from './lib/state';
import { initAI, initCloud, loadLocal, saveLocal, type Cloud, type SampleFn } from './lib/platform';

export type SyncStatus = 'lokal' | 'verbinde' | 'konto' | 'fehler' | 'kein_speicher';

export interface CoachContext {
  label: string; // z.B. «Lektion: Betonwaschwasser»
  text?: string; // Kontext für die KI (Lernziele, Frage)
  locked?: boolean; // Prüfungsmodus: keine Hilfe
}

interface Store {
  s: AppState;
  update: (fn: (s: AppState) => AppState) => void;
  log: (type: HistoryEvent['type'], ref: string, detail: string) => void;
  replaceState: (next: AppState) => void;
  sync: SyncStatus;
  ai: SampleFn | null;
  aiChecked: boolean;
  term: string | null;
  openTerm: (id: string | null) => void;
  coachOpen: boolean;
  setCoachOpen: (v: boolean) => void;
  coachCtx: CoachContext | null;
  setCoachCtx: (c: CoachContext | null) => void;
  toast: (msg: string) => void;
  toastMsg: string | null;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<AppState>(() => loadLocal() ?? emptyState());
  const [sync, setSync] = useState<SyncStatus>('lokal');
  const [ai, setAi] = useState<SampleFn | null>(null);
  const [aiChecked, setAiChecked] = useState(false);
  const [term, openTerm] = useState<string | null>(null);
  const [coachOpen, setCoachOpen] = useState(false);
  const [coachCtx, setCoachCtx] = useState<CoachContext | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const cloud = useRef<Cloud | null>(null);
  const cloudTimer = useRef<number | undefined>(undefined);
  const localOk = useRef(true);
  const latest = useRef(s);
  latest.current = s;
  const hostTheme = useRef<string | null>(typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg((m) => (m === msg ? null : m)), 4200);
  }, []);

  const update = useCallback((fn: (s: AppState) => AppState) => {
    setS((prev) => ({ ...fn(prev), updatedAt: Date.now() }));
  }, []);

  const replaceState = useCallback((next: AppState) => setS({ ...next, updatedAt: Date.now() }), []);

  const log = useCallback((type: HistoryEvent['type'], ref: string, detail: string) => {
    update((x) => ({ ...x, history: [...x.history, { at: Date.now(), type, ref, detail }] }));
  }, [update]);

  // Speichern: lokal sofort (verzögert), Konto alle paar Sekunden
  useEffect(() => {
    const t = window.setTimeout(() => {
      localOk.current = saveLocal(s);
    }, 300);
    if (cloud.current) {
      window.clearTimeout(cloudTimer.current);
      cloudTimer.current = window.setTimeout(() => {
        cloud.current?.save(s).then(() => setSync('konto')).catch(() => setSync('fehler'));
      }, 4000);
    } else if (!localOk.current) setSync('kein_speicher');
    return () => window.clearTimeout(t);
  }, [s]);

  // Beim Verlassen oder Verstecken der Seite sofort speichern (verzögertes Speichern könnte die letzte Eingabe verlieren)
  useEffect(() => {
    const flush = () => {
      saveLocal(latest.current);
      cloud.current?.save(latest.current).catch(() => undefined);
    };
    const onVis = () => document.visibilityState === 'hidden' && flush();
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Plattform-Fähigkeiten verbinden
  useEffect(() => {
    let alive = true;
    initAI().then((fn) => {
      if (!alive) return;
      setAi(() => fn);
      setAiChecked(true);
    });
    setSync('verbinde');
    initCloud()
      .then(async (c) => {
        if (!alive) return;
        if (!c) {
          setSync(saveLocal(s) ? 'lokal' : 'kein_speicher');
          return;
        }
        try {
          const remote = await c.load();
          const local = latest.current;
          // Ein Stand ohne Lernaktivität (z. B. neues Gerät) überschreibt nie einen gespeicherten.
          const takeRemote = preferRemote(local, remote);
          if (takeRemote && remote) {
            setS(remote);
            toast('Lernstand aus Ihrem Konto geladen.');
          } else if (hasProgress(local) || !remote) {
            await c.save(local);
          }
          cloud.current = c;
          setSync('konto');
        } catch {
          setSync('fehler');
        }
      })
      .catch(() => alive && setSync('lokal'));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme
  useEffect(() => {
    // «wie System» stellt den Zustand wieder her, den die Umgebung gesetzt hatte (z. B. claude.ai-Theme)
    const r = document.documentElement;
    if (s.settings.theme === 'system') {
      if (hostTheme.current) r.setAttribute('data-theme', hostTheme.current);
      else r.removeAttribute('data-theme');
    } else r.setAttribute('data-theme', s.settings.theme === 'dunkel' ? 'dark' : 'light');
  }, [s.settings.theme]);

  const value = useMemo<Store>(() => ({ s, update, log, replaceState, sync, ai: s.settings.aiEnabled ? ai : null, aiChecked, term, openTerm, coachOpen, setCoachOpen, coachCtx, setCoachCtx, toast, toastMsg }), [s, update, log, replaceState, sync, ai, aiChecked, term, coachOpen, coachCtx, toast, toastMsg]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const c = useContext(Ctx);
  if (!c) throw new Error('StoreProvider fehlt');
  return c;
}

/** Lernzeit erfassen: nur bei sichtbarer Seite und Aktivität in den letzten 2 Minuten. */
export function useStudyTimer(active: boolean) {
  const { update } = useStore();
  const lastAct = useRef(Date.now());
  useEffect(() => {
    const mark = () => (lastAct.current = Date.now());
    window.addEventListener('pointerdown', mark);
    window.addEventListener('keydown', mark);
    window.addEventListener('scroll', mark, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', mark);
      window.removeEventListener('keydown', mark);
      window.removeEventListener('scroll', mark);
    };
  }, []);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || Date.now() - lastAct.current > 120_000) return;
      const k = dayKey();
      update((x) => ({ ...x, studySec: { ...x.studySec, [k]: (x.studySec[k] ?? 0) + 15 } }));
    }, 15_000);
    return () => window.clearInterval(id);
  }, [active, update]);
}
