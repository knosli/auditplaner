import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icons';

export interface AudioTrack { lessonId: string; title: string; src: string; dur: number; marks: { t: number; title: string }[] }
export interface AudioManifest { voice: string; lessons: Record<string, { hash: string; file: string; dur: number; marks: { t: number; title: string }[] }> }

let manifestPromise: Promise<AudioManifest | null> | null = null;
/** Audio-Verzeichnis einmal laden (liegt neben der App unter audio/manifest.json); fehlt es, wird die Gerätestimme verwendet. */
export function loadAudioManifest(): Promise<AudioManifest | null> {
  manifestPromise ??= fetch('audio/manifest.json', { cache: 'no-cache' })
    .then((r) => (r.ok ? (r.json() as Promise<AudioManifest>) : null))
    .catch(() => null);
  return manifestPromise;
}

const POS_KEY = 'umweltcampus.hoeren.audio';
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/**
 * Abspieler für die vorab erzeugten Audios (natürliche Stimme). Läuft als normales Audio: auch bei gesperrtem
 * Bildschirm, bedienbar über Sperrbildschirm, Kopfhörer und Auto (Media Session).
 */
export function AudioPlayer({ tracks, rate, album, posKey }: { tracks: AudioTrack[]; rate: number; album: string; posKey: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  // Alle Abschnitte über alle Lektionen hinweg
  const marks = useMemo(() => tracks.flatMap((tr, ti) => tr.marks.map((m) => ({ ...m, ti }))), [tracks]);
  const [ti, setTi] = useState(0);
  const [mi, setMi] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const pendingSeek = useRef<number | null>(null);
  // Soll abgespielt werden? (Beim Wechsel der Datei meldet der Browser kurz «pausiert» – das darf die Wiedergabe nicht beenden.)
  const wantPlay = useRef(false);

  // Gespeicherte Position laden
  useEffect(() => {
    let p = { k: '', ti: 0, t: 0 };
    try { p = JSON.parse(localStorage.getItem(POS_KEY) ?? 'null') ?? p; } catch { /* egal */ }
    if (p.k === posKey && tracks[p.ti]) { setTi(p.ti); pendingSeek.current = p.t; } else { setTi(0); pendingSeek.current = 0; }
  }, [posKey, tracks]);

  const cur = tracks[ti];
  const curMarkIdx = (t: number, track = ti) => {
    let k = marks.findIndex((m) => m.ti === track);
    for (let i = k; i < marks.length && marks[i].ti === track; i++) if (marks[i].t <= t + 0.05) k = i;
    return Math.max(0, k);
  };

  useEffect(() => { if (audio.current) audio.current.playbackRate = rate; }, [rate, ti]);

  // Media Session: Titel und Steuerung auf Sperrbildschirm, Kopfhörer, Auto
  useEffect(() => {
    const ms = (navigator as Navigator & { mediaSession?: MediaSession }).mediaSession;
    if (!ms || !cur) return;
    try {
      ms.metadata = new MediaMetadata({ title: marks[mi]?.title ?? cur.title, artist: 'UmweltCampus Bau CH', album });
      ms.setActionHandler('play', () => { wantPlay.current = true; void audio.current?.play(); });
      ms.setActionHandler('pause', () => { wantPlay.current = false; audio.current?.pause(); });
      ms.setActionHandler('previoustrack', () => go(mi - 1));
      ms.setActionHandler('nexttrack', () => go(mi + 1));
    } catch { /* nicht unterstützt */ }
  });

  const save = (track: number, t: number) => { try { localStorage.setItem(POS_KEY, JSON.stringify({ k: posKey, ti: track, t })); } catch { /* egal */ } };

  const go = (k: number) => {
    const m = marks[Math.max(0, Math.min(marks.length - 1, k))];
    if (!m) return;
    if (m.ti !== ti) { pendingSeek.current = m.t; setTi(m.ti); setMi(marks.indexOf(m)); return; }
    if (audio.current) audio.current.currentTime = m.t;
    setMi(marks.indexOf(m)); save(ti, m.t);
  };

  const onLoaded = () => {
    const a = audio.current; if (!a) return;
    a.playbackRate = rate;
    if (pendingSeek.current !== null) { a.currentTime = pendingSeek.current; setMi(curMarkIdx(pendingSeek.current)); pendingSeek.current = null; }
    if (wantPlay.current) void a.play().catch(() => setPlaying(false));
  };
  const onTime = () => {
    const a = audio.current; if (!a) return;
    setTime(a.currentTime);
    const k = curMarkIdx(a.currentTime);
    if (k !== mi) { setMi(k); save(ti, a.currentTime); }
  };
  const onEnded = () => {
    if (ti < tracks.length - 1) { pendingSeek.current = 0; setTi(ti + 1); } else { wantPlay.current = false; setPlaying(false); save(0, 0); }
  };
  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (playing) { wantPlay.current = false; a.pause(); save(ti, a.currentTime); } else { wantPlay.current = true; void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  };

  const totalLeft = tracks.slice(ti).reduce((n, tr) => n + tr.dur, 0) - time;
  return (
    <section className="section listen-player" aria-live="polite">
      <audio ref={audio} src={cur?.src} preload="auto" onLoadedMetadata={onLoaded} onTimeUpdate={onTime} onEnded={onEnded}
        onPlay={() => setPlaying(true)} onPause={() => { if (!wantPlay.current) setPlaying(false); }} />
      <div className="lp-now">
        <span className="eyebrow">Lektion {ti + 1} von {tracks.length} · Abschnitt {mi + 1} von {marks.length} · noch ca. {Math.max(1, Math.round(totalLeft / 60 / rate))} Min.</span>
        <h2 id="ls-title">{marks[mi]?.title ?? cur?.title ?? '–'}</h2>
        <p className="hint">{cur?.title} · {fmt(time)} / {fmt(cur?.dur ?? 0)}</p>
      </div>
      <div className="bar" aria-hidden="true"><b style={{ width: `${cur ? (time / cur.dur) * 100 : 0}%` }} /></div>
      <div className="lp-ctl">
        <button type="button" className="btn lp-btn" onClick={() => go(mi - 1)} aria-label="Abschnitt zurück"><Icon name="prev" size={28} /></button>
        {playing
          ? <button type="button" id="ls-pause" className="btn primary lp-main" onClick={toggle} aria-label="Pause"><Icon name="pause" size={40} /></button>
          : <button type="button" id="ls-play" className="btn primary lp-main" onClick={toggle} aria-label="Abspielen"><Icon name="play" size={40} /></button>}
        <button type="button" className="btn lp-btn" onClick={() => go(mi + 1)} aria-label="Abschnitt vor"><Icon name="next" size={28} /></button>
      </div>
      <p className="hint">Natürliche Stimme (Thorsten, erzeugt mit der freien Software Piper). Läuft auch bei gesperrtem Bildschirm; Pause und Vor/Zurück gehen über Sperrbildschirm, Kopfhörer oder Auto. Position wird auf diesem Gerät gemerkt.</p>
    </section>
  );
}
