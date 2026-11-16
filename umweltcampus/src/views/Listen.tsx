import { useEffect, useMemo, useRef, useState } from 'react';
import { LESSONS, MODULES } from '../content';
import { Icon } from '../components/Icons';
import { chunks, lessonSegments, minutesOf, moduleSegments, voiceScore, type ListenMode, type Segment } from '../lib/speech';

const POS_KEY = 'umweltcampus.hoeren';
const savePos = (key: string, idx: number) => { try { localStorage.setItem(POS_KEY, JSON.stringify({ key, idx })); } catch { /* egal */ } };
const loadPos = (key: string): number => { try { const x = JSON.parse(localStorage.getItem(POS_KEY) ?? 'null'); return x && x.key === key ? Number(x.idx) || 0 : 0; } catch { return 0; } };

const MODE_LABEL: Record<ListenMode, string> = { inhalt: 'Nur Inhalte', 'inhalt+quiz': 'Inhalte mit Hör-Quiz', quiz: 'Nur Hör-Quiz (Wiederholung)' };

/**
 * Hörmodus: Modul oder Lektion vorlesen lassen – mit der Sprachausgabe des Geräts.
 * Für unterwegs: einmal starten, dann läuft es ohne Bedienung durch; Hör-Quiz mit Denkpause und Lösung.
 */
export function ListenView({ target }: { target?: string }) {
  const initLesson = target && /^m\d+-l\d+$/.test(target) ? target : '';
  const initModule = initLesson ? initLesson.split('-')[0] : target && MODULES.some((m) => m.id === target) ? target : 'm0';
  const [mod, setMod] = useState(initModule);
  const [lesson, setLesson] = useState(initLesson);
  const [mode, setMode] = useState<ListenMode>('inhalt+quiz');
  const [deep, setDeep] = useState(false);
  const [rate, setRate] = useState(1);
  const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceUri, setVoiceUri] = useState('');
  const [voicesChecked, setVoicesChecked] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => setVoicesChecked(true), 2000); return () => window.clearTimeout(t); }, []);

  const segs: Segment[] = useMemo(() => {
    if (lesson) { const l = LESSONS.find((x) => x.id === lesson); return l ? lessonSegments(l, mode, deep) : []; }
    return moduleSegments(mod, mode, deep);
  }, [mod, lesson, mode, deep]);
  const key = `${lesson || mod}|${mode}|${deep ? 1 : 0}`;
  const [idx, setIdx] = useState(() => loadPos(key));
  const [playing, setPlaying] = useState(false);
  const [pause, setPause] = useState(0); // Sekunden Denkpause
  const gen = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const wake = useRef<{ release: () => Promise<void> } | null>(null);

  // Stimmen laden (deutsch zuerst, Schweizerdeutsch-Region bevorzugt)
  useEffect(() => {
    if (!synth) return;
    const load = () => {
      const all = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith('de'));
      all.sort((a, b) => voiceScore(b) - voiceScore(a) || a.name.localeCompare(b.name));
      setVoices(all);
      let saved = '';
      try { saved = localStorage.getItem('umweltcampus.stimme') ?? ''; } catch { /* egal */ }
      setVoiceUri((u) => u || (all.some((v) => v.voiceURI === saved) ? saved : all[0]?.voiceURI) || '');
    };
    load();
    synth.addEventListener?.('voiceschanged', load);
    return () => synth.removeEventListener?.('voiceschanged', load);
  }, [synth]);

  // Auswahl geändert → Position laden, Wiedergabe stoppen
  useEffect(() => { stop(); setIdx(Math.min(loadPos(key), Math.max(0, segs.length - 1))); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [key]);
  useEffect(() => () => { gen.current++; synth?.cancel(); window.clearTimeout(timer.current); void wake.current?.release(); }, [synth]);

  const keepAwake = async (on: boolean) => {
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } };
      if (on && nav.wakeLock && !wake.current) wake.current = await nav.wakeLock.request('screen');
      if (!on && wake.current) { await wake.current.release(); wake.current = null; }
    } catch { /* nicht unterstützt */ }
  };

  const [voiceNote, setVoiceNote] = useState('');
  const badVoices = useRef(new Set<string>());
  /**
   * Eine Äusserung robust sprechen: Safari (iPhone) ignoriert speak() direkt nach cancel(), darum nach einem
   * Abbruch kurz warten. Beginnt eine gewählte Stimme nicht innerhalb von 2,5 s, gilt sie als defekt und es wird
   * mit der Standardstimme weitergesprochen.
   */
  const speakOne = (text: string, my: number, afterCancel: boolean, onDone: () => void) => {
    if (!synth) return;
    const v = voices.find((x) => x.voiceURI === voiceUri && !badVoices.current.has(x.voiceURI));
    const go = (useVoice: SpeechSynthesisVoice | undefined) => {
      if (my !== gen.current) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = useVoice?.lang ?? 'de-DE'; if (useVoice) u.voice = useVoice; u.rate = rate;
      let started = false;
      u.onstart = () => { started = true; };
      u.onend = () => { if (my === gen.current) onDone(); };
      u.onerror = (e) => { if (my !== gen.current || (e as SpeechSynthesisErrorEvent).error === 'interrupted' || (e as SpeechSynthesisErrorEvent).error === 'canceled') return; if (!started && useVoice) fallback(); else onDone(); };
      const fallback = () => {
        if (!useVoice || my !== gen.current) return;
        badVoices.current.add(useVoice.voiceURI);
        setVoiceNote(`Die Stimme «${useVoice.name}» gibt auf diesem Gerät keinen Ton aus – es wird mit der Standardstimme weitergelesen.`);
        synth.cancel();
        window.setTimeout(() => go(undefined), 250);
      };
      synth.resume();
      synth.speak(u);
      if (useVoice) window.setTimeout(() => { if (!started && my === gen.current && !synth.speaking) fallback(); }, 2500);
    };
    if (afterCancel) window.setTimeout(() => go(v), 250); else go(v);
  };

  const speakSeg = (i: number) => {
    if (!synth || i >= segs.length) { setPlaying(false); void keepAwake(false); return; }
    const my = ++gen.current;
    setIdx(i); savePos(key, i); setPause(0);
    const parts = chunks(segs[i].text);
    const say = (c: number) => {
      if (my !== gen.current) return;
      if (c >= parts.length) {
        const p = segs[i].pauseAfter ?? 0;
        if (p > 0) {
          let left = p; setPause(left);
          const tick = () => { if (my !== gen.current) return; left -= 1; setPause(left); if (left <= 0) speakSeg(i + 1); else timer.current = window.setTimeout(tick, 1000); };
          timer.current = window.setTimeout(tick, 1000);
        } else timer.current = window.setTimeout(() => my === gen.current && speakSeg(i + 1), 500);
        return;
      }
      speakOne(parts[c], my, c === 0, () => say(c + 1));
    };
    synth.cancel();
    say(0);
  };
  const sample = () => {
    if (!synth) return;
    stop();
    const my = ++gen.current;
    speakOne('Grüezi. So klingt diese Stimme. Betonwaschwasser gehört nie in einen Meteorschacht.', my, true, () => undefined);
  };
  const play = () => { if (!segs.length) return; setPlaying(true); void keepAwake(true); speakSeg(idx >= segs.length ? 0 : idx); };
  const stop = () => { gen.current++; synth?.cancel(); window.clearTimeout(timer.current); setPlaying(false); setPause(0); void keepAwake(false); };
  const jump = (d: number) => { const n = Math.max(0, Math.min(segs.length - 1, idx + d)); if (playing) speakSeg(n); else { setIdx(n); savePos(key, n); } };

  const cur = segs[idx];
  const ls = LESSONS.filter((l) => l.moduleId === mod);
  return (
    <div className="page listen">
      <header className="page-head">
        <span className="eyebrow">Unterwegs lernen</span>
        <h1>Hörmodus.</h1>
        <p className="lead">Die App liest Lektionen vor und stellt danach Hör-Quizfragen – mit Denkpause und Lösung, ohne dass Sie etwas antippen müssen.</p>
      </header>
      <p className="trust"><Icon name="alert" size={16} /> <span><strong>Im Auto nur im Stand einstellen.</strong> Einmal starten, dann läuft das Modul von selbst durch. Damit die Wiedergabe nicht abbricht, bleibt der Bildschirm eingeschaltet (Gerät in der Halterung lassen).</span></p>

      {!synth ? (
        <section className="section"><p>Dieses Gerät bzw. dieser Browser unterstützt keine Sprachausgabe. Bitte einen aktuellen Browser verwenden (Safari, Chrome, Edge).</p></section>
      ) : (
        <>
          <section className="section listen-setup">
            <label className="field"><span>Modul</span>
              <select id="ls-mod" value={mod} onChange={(e) => { setMod(e.target.value); setLesson(''); }}>
                {[...MODULES].filter((m) => m.status === 'verfuegbar').sort((a, b) => a.pathOrder - b.pathOrder).map((m) => <option key={m.id} value={m.id}>Modul {m.no}: {m.short}</option>)}
              </select>
            </label>
            <label className="field"><span>Umfang</span>
              <select id="ls-lesson" value={lesson} onChange={(e) => setLesson(e.target.value)}>
                <option value="">Ganzes Modul ({ls.length} Lektionen)</option>
                {ls.map((l) => <option key={l.id} value={l.id}>Lektion {l.order}: {l.title}</option>)}
              </select>
            </label>
            <div className="seg" role="radiogroup" aria-label="Was vorlesen?">
              {(['inhalt+quiz', 'inhalt', 'quiz'] as ListenMode[]).map((m) => (
                <label key={m} className={mode === m ? 'on' : ''}><input type="radio" name="ls-mode" checked={mode === m} onChange={() => setMode(m)} />{MODE_LABEL[m]}</label>
              ))}
            </div>
            <div className="listen-opts">
              <label className="switch"><input type="checkbox" checked={deep} onChange={(e) => setDeep(e.target.checked)} /> Fachvertiefung mitlesen (länger)</label>
              <label className="field inline"><span>Tempo</span>
                <select id="ls-rate" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
                  {[0.85, 1, 1.15, 1.3].map((r) => <option key={r} value={r}>{r === 1 ? 'normal' : r < 1 ? 'langsamer' : r < 1.2 ? 'etwas schneller' : 'schnell'}</option>)}
                </select>
              </label>
              {voices.length > 0 && (
                <label className="field inline"><span>Stimme</span>
                  <select id="ls-voice" value={voiceUri} onChange={(e) => { const v = e.target.value; badVoices.current.delete(v); setVoiceNote(''); setVoiceUri(v); try { localStorage.setItem('umweltcampus.stimme', v); } catch { /* egal */ } if (playing) stop(); }}>
                    {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang}){voiceScore(v) >= 10 ? ' ★' : ''}</option>)}
                  </select>
                </label>
              )}
              <button type="button" className="btn small" id="ls-sample" onClick={sample}>Hörprobe</button>
            </div>
            {voiceNote && <p className="hint need" role="status">{voiceNote}</p>}
            <details className="voice-help">
              <summary>Stimme klingt roboterhaft? So wird sie natürlicher – gratis</summary>
              <p>Die App nutzt die Vorlesestimmen Ihres Geräts. Fast alle Geräte haben bessere Stimmen, die man einmal kostenlos herunterlädt (einige hundert MB, am besten im WLAN). Danach wählt die App sie automatisch (mit ★ markiert).</p>
              <ul className="plain">
                <li><strong>iPhone / iPad:</strong> Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen → Deutsch → eine Stimme mit «Verbessert» oder «Premium» laden (z. B. Anna oder Petra). App danach neu öffnen.</li>
                <li><strong>Android:</strong> Einstellungen → Bedienungshilfen bzw. System → Sprachausgabe (Text-in-Sprache) → Google-Sprachausgabe → Sprachdaten installieren → Deutsch → eine Stimme in hoher Qualität wählen.</li>
                <li><strong>Computer:</strong> In Microsoft Edge stehen sehr natürliche «Natural»-Stimmen bereit (z. B. Katja, Conrad), in Chrome die «Google Deutsch»-Stimme. Beide brauchen eine Internetverbindung.</li>
              </ul>
            </details>
            {voicesChecked && voices.length === 0 && <p className="hint">Keine deutsche Stimme gemeldet – vorgelesen wird mit der Standardstimme. Klingt sie nicht deutsch: auf dem Handy unter Einstellungen → Bedienungshilfen → Gesprochene Inhalte bzw. Sprachausgabe eine deutsche Stimme laden.</p>}
          </section>

          <section className="section listen-player" aria-live="polite">
            <div className="lp-now">
              <span className="eyebrow">Abschnitt {Math.min(idx + 1, segs.length)} von {segs.length} · ca. {minutesOf(segs.slice(idx), rate)} Min. verbleibend</span>
              <h2 id="ls-title">{cur?.title ?? '–'}</h2>
              {pause > 0 && <p className="lp-pause">Denkpause … {pause}</p>}
            </div>
            <div className="bar" aria-hidden="true"><b style={{ width: `${segs.length ? ((idx + (playing ? 0.5 : 0)) / segs.length) * 100 : 0}%` }} /></div>
            <div className="lp-ctl">
              <button type="button" className="btn lp-btn" onClick={() => jump(-1)} aria-label="Abschnitt zurück"><Icon name="prev" size={28} /></button>
              {playing
                ? <button type="button" id="ls-pause" className="btn primary lp-main" onClick={stop} aria-label="Pause"><Icon name="pause" size={40} /></button>
                : <button type="button" id="ls-play" className="btn primary lp-main" onClick={play} aria-label="Abspielen"><Icon name="play" size={40} /></button>}
              <button type="button" className="btn lp-btn" onClick={() => jump(1)} aria-label="Abschnitt vor"><Icon name="next" size={28} /></button>
            </div>
            <p className="hint">Position wird auf diesem Gerät gemerkt. Das Zuhören zählt nicht als «gelesen» und verändert Ihren Lernstand nicht.</p>
          </section>
        </>
      )}
    </div>
  );
}
