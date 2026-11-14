import { SCENES, type Scene, type SceneEl } from '../content/scenes';

const CH = 6.1; // mittlere Zeichenbreite bei 11px
function wrap(label: string, w: number): string[] {
  const max = Math.max(6, Math.floor((w - 12) / CH));
  const out: string[] = [];
  let cur = '';
  for (const word of label.split(' ')) {
    if ((cur + ' ' + word).trim().length > max && cur) { out.push(cur); cur = word; } else cur = (cur + ' ' + word).trim();
  }
  if (cur) out.push(cur);
  return out;
}
const pts = (p: [number, number][]) => p.map((x) => x.join(',')).join(' ');

/**
 * Technische Szene eines Baustellenfalls. mode «thumb» = Vorschau ohne Legende,
 * «full» = Gefahren, Schutzgüter, Wege und mögliche Folgen, «debrief» = zusätzlich Massnahmen.
 */
export function SceneMap({ id, mode = 'full' }: { id: string; mode?: 'thumb' | 'full' | 'debrief' }) {
  const sc: Scene | undefined = SCENES[id];
  if (!sc) return null;
  const hazards = sc.els.filter((e): e is Extract<SceneEl, { t: 'hazard' }> => e.t === 'hazard');
  const receptors = sc.els.filter((e): e is Extract<SceneEl, { t: 'receptor' }> => e.t === 'receptor');
  const measures = sc.els.filter((e): e is Extract<SceneEl, { t: 'measure' }> => e.t === 'measure');
  const showM = mode === 'debrief';
  const thumb = mode === 'thumb';
  const label = `${sc.caption}. Gefahren: ${hazards.map((h) => `${h.n}: ${h.label}`).join('; ')}.`;
  return (
    <figure className={'scene-map ' + mode}>
      <svg viewBox="0 0 640 300" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id={`arr-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" className="sm-arrow" /></marker>
        </defs>
        <rect x="0" y="0" width="640" height="300" className="sm-bg" />
        {sc.els.map((e, i) => {
          if (e.t === 'zone') return (
            <g key={i}>
              <rect x={e.x} y={e.y} width={e.w} height={e.h} rx={e.kind === 'water' ? 0 : 6} className={'sm-z sm-' + e.kind} />
              {!thumb && e.label && wrap(e.label, e.w).slice(0, Math.max(1, Math.floor((e.h - 6) / 13))).map((ln, j) => <text key={j} x={e.x + 7} y={e.y + 15 + j * 13} className="sm-zl">{ln}</text>)}
            </g>
          );
          if (e.t === 'pipe') return (
            <g key={i}>
              <polyline points={pts(e.pts)} className="sm-pipe" />
              {!thumb && e.label && <text x={e.pts[0][0] + 4} y={e.pts[0][1] - 5} className="sm-pl">{e.label}</text>}
            </g>
          );
          if (e.t === 'flow') return <polyline key={i} points={pts(e.pts)} className="sm-flow" markerEnd={`url(#arr-${id})`} />;
          return null;
        })}
        {receptors.map((r) => <g key={r.id} className="sm-rec"><rect x={r.x - 12} y={r.y - 11} width="24" height="22" rx="11" /><text x={r.x} y={r.y + 4} textAnchor="middle">{r.id}</text></g>)}
        {hazards.map((h) => <g key={h.n} className="sm-haz"><circle cx={h.x} cy={h.y} r="12" /><text x={h.x} y={h.y + 4} textAnchor="middle">{h.n}</text></g>)}
        {showM && measures.map((m) => <g key={m.id} className="sm-mea"><rect x={m.x - 15} y={m.y - 10} width="30" height="20" rx="5" /><text x={m.x} y={m.y + 4} textAnchor="middle">{m.id}</text></g>)}
      </svg>
      {!thumb && (
        <figcaption>
          <span className="sm-cap">{sc.caption}</span>
          <div className="sm-legend">
            <div>
              <strong className="sm-h">Gefahren</strong>
              <ol className="sm-list">{hazards.map((h) => <li key={h.n}><span className="sm-dot haz">{h.n}</span><span>{h.label}<span className="sm-then">Mögliche Folge ohne Massnahme: {h.then}</span></span></li>)}</ol>
            </div>
            <div>
              <strong className="sm-h">Schutzgüter und Betroffene</strong>
              <ul className="sm-list">{receptors.map((r) => <li key={r.id}><span className="sm-dot rec">{r.id}</span><span>{r.label}</span></li>)}</ul>
              <p className="hint sm-key"><span className="sm-key-flow" aria-hidden="true" /> Wirkungsweg · <span className="sm-key-pipe" aria-hidden="true" /> Leitung</p>
            </div>
            {showM && (
              <div>
                <strong className="sm-h">Massnahmen (Musterlösung)</strong>
                <ul className="sm-list">{measures.map((m) => <li key={m.id}><span className="sm-dot mea">{m.id}</span><span>{m.label}</span></li>)}</ul>
              </div>
            )}
          </div>
          {!showM && <p className="hint">Die Massnahmen erscheinen in der Auswertung – entscheiden Sie zuerst selbst.</p>}
        </figcaption>
      )}
    </figure>
  );
}
