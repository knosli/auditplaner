import { useState } from 'react';
import { GRAINS, requiredArea, runoff, stokes } from '../lib/calc';

const fmt = (x: number, d = 1) => x.toLocaleString('de-CH', { maximumFractionDigits: d, minimumFractionDigits: 0 });

/** Abschätzung der nötigen Absetzfläche (Stokes/Hazen) und des Regenabflusses. */
export function AbsetzRechner() {
  const [q, setQ] = useState('8');
  const [grain, setGrain] = useState<string>('ms');
  const [temp, setTemp] = useState('10');
  const [factor, setFactor] = useState('2');
  const [have, setHave] = useState('14.4');
  const g = GRAINS.find((x) => x.id === grain)!;
  const vs = stokes(g.d, Number(temp));
  const qn = Math.max(0, Number(q.replace(',', '.')) || 0);
  const fn = Math.min(4, Math.max(1, Number(factor.replace(',', '.')) || 1));
  const need = requiredArea(qn, vs, fn);
  const hv = Math.max(0, Number(have.replace(',', '.')) || 0);
  const ratio = need > 0 ? hv / need : 0;
  return (
    <div className="calc">
      <div className="calc-grid">
        <label className="field"><span>Zufluss Q [l/s]</span><input id="calc-q" inputMode="decimal" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <label className="field"><span>Massgebendes Korn</span>
          <select id="calc-grain" value={grain} onChange={(e) => setGrain(e.target.value)}>{GRAINS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select>
        </label>
        <label className="field"><span>Wassertemperatur</span>
          <select id="calc-temp" value={temp} onChange={(e) => setTemp(e.target.value)}>{[5, 10, 15, 20].map((t) => <option key={t} value={t}>{t} °C</option>)}</select>
        </label>
        <label className="field"><span>Zuschlag (Turbulenz, Kurzschluss)</span><input id="calc-f" inputMode="decimal" value={factor} onChange={(e) => setFactor(e.target.value)} /></label>
        <label className="field"><span>Vorhandene Oberfläche [m²]</span><input id="calc-have" inputMode="decimal" value={have} onChange={(e) => setHave(e.target.value)} /></label>
      </div>
      {(!(Number(q.replace(',', '.')) > 0) || !(Number(factor.replace(',', '.')) >= 1 && Number(factor.replace(',', '.')) <= 4)) && (
        <p className="error">Bitte gültige Werte eingeben: Zufluss grösser als 0, Zuschlag zwischen 1 und 4.</p>
      )}
      <dl className="calc-out">
        <div><dt>Sinkgeschwindigkeit</dt><dd className="mono">{fmt(vs * 1000, 3)} mm/s · {fmt(vs * 3600, 2)} m/h</dd></div>
        <div><dt>Zufluss</dt><dd className="mono">{fmt(qn * 3.6, 1)} m³/h</dd></div>
        <div><dt>Nötige Oberfläche</dt><dd className="mono strong">{need > 100000 ? '> 100 000' : fmt(need, need < 10 ? 1 : 0)} m²</dd></div>
        <div><dt>Vorhanden / nötig</dt><dd className={'mono ' + (ratio >= 1 ? 'ok' : 'crit')}>{need > 0 ? Math.round(ratio * 100) + ' %' : '–'}</dd></div>
      </dl>
      <p className="hint">Formeln: v = g·(ρs−ρw)·d² / (18·μ) für Quarz; A = Q / v × Zuschlag. Idealisierte Abschätzung zur Plausibilisierung, keine Bemessung (diese erfolgt durch die Fachplanung nach SIA 431 inkl. Korrigendum C3:2026): kugelförmige Einzelkörner, ruhige Strömung, keine Flockung. Der Zuschlag ist eine Annahme, kein Normwert. «Vorhandene Oberfläche» meint die wirksame Fläche: Container in Serie addieren sich nicht, parallel geschaltete schon.</p>
      <RunoffCalc />
    </div>
  );
}

function RunoffCalc() {
  const [psi, setPsi] = useState('0.9');
  const [i, setI] = useState('200');
  const [a, setA] = useState('2000');
  const num = (x: string) => Math.max(0, Number(x.replace(',', '.')) || 0);
  const qr = runoff(Math.min(1, num(psi)), num(i), num(a));
  return (
    <div className="calc runoff">
      <h4>Regenabfluss abschätzen</h4>
      <div className="calc-grid">
        <label className="field"><span>Abflussbeiwert ψ (0–1)</span><input id="ro-psi" inputMode="decimal" value={psi} onChange={(e) => setPsi(e.target.value)} /></label>
        <label className="field"><span>Regenintensität i [l/(s·ha)]</span><input id="ro-i" inputMode="decimal" value={i} onChange={(e) => setI(e.target.value)} /></label>
        <label className="field"><span>Fläche A [m²]</span><input id="ro-a" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} /></label>
      </div>
      <p className="calc-result">Abfluss Q = ψ × i × A ≈ <strong className="mono">{fmt(qr, 1)} l/s</strong> ({fmt(qr * 3.6, 0)} m³/h)</p>
      <p className="hint">Die Regenintensität für den Standort liefern Planer bzw. regionale Daten. Vorgabewerte sind Beispiele, keine Bemessungsgrundlage.</p>
    </div>
  );
}
