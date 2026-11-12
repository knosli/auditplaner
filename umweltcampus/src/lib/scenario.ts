import type { Scenario, ScenarioStage } from '../content/types';
import type { ScenarioRun } from './state';

export interface StageAnswer {
  stageId: string;
  selected: string[]; // single/multi/ask; rank: Reihenfolge; justify: abgehakte Rubrikpunkte
  text?: string;
}

export interface StageResult {
  stageId: string;
  score: number; // 0..1
  critical: boolean;
  criteria: string[];
}

export function evaluateStage(stage: ScenarioStage, a: StageAnswer): StageResult {
  const opts = stage.options ?? [];
  const sel = new Set(a.selected);
  let score = 0;
  let critical = false;
  switch (stage.type) {
    case 'single': {
      const o = opts.find((x) => x.id === a.selected[0]);
      score = o ? o.points / 2 : 0;
      critical = !!o?.critical;
      break;
    }
    case 'multi': {
      const good = opts.filter((o) => o.points === 2);
      const hits = good.filter((o) => sel.has(o.id)).length;
      const wrong = opts.filter((o) => o.points === 0 && sel.has(o.id)).length;
      score = Math.max(0, Math.min(1, (hits - wrong) / Math.max(1, good.length)));
      critical = opts.some((o) => o.critical && sel.has(o.id));
      break;
    }
    case 'ask': {
      const pick = stage.pick ?? 3;
      const best = [...opts].sort((x, y) => y.points - x.points).slice(0, pick).reduce((x, o) => x + o.points, 0);
      const got = opts.filter((o) => sel.has(o.id)).reduce((x, o) => x + o.points, 0);
      score = best ? Math.min(1, got / best) : 0;
      break;
    }
    case 'rank': {
      const order = stage.rankOrder ?? [];
      const n = order.length;
      const dist = a.selected.reduce((x, id, i) => x + Math.abs(i - order.indexOf(id)), 0);
      const max = Math.floor((n * n) / 2) || 1;
      score = Math.max(0, 1 - dist / max);
      // Erster Platz falsch = Prioritätsfehler, deutlich gewichten
      if (a.selected[0] !== order[0]) score = Math.min(score, 0.5);
      break;
    }
    case 'justify': {
      const r = stage.rubric ?? [];
      score = r.length ? a.selected.filter((id) => r.some((p) => p.id === id)).length / r.length : 0;
      break;
    }
  }
  return { stageId: stage.id, score, critical, criteria: stage.criteria };
}

/** Nächster Schritt: Option-Verzweigung > Stage.next > nächster in der Liste. */
export function nextStageId(sc: Scenario, stage: ScenarioStage, a: StageAnswer): string | null {
  if (stage.type === 'single') {
    const o = stage.options?.find((x) => x.id === a.selected[0]);
    if (o?.next) return o.next;
  }
  if (stage.next) return stage.next;
  const i = sc.stages.findIndex((x) => x.id === stage.id);
  return sc.stages[i + 1]?.id ?? null;
}

export function summarize(results: StageResult[], now = Date.now()): ScenarioRun {
  const byC: Record<string, { s: number; n: number }> = {};
  for (const r of results) for (const c of r.criteria) {
    byC[c] ??= { s: 0, n: 0 };
    byC[c].s += r.score;
    byC[c].n += 1;
  }
  const byCriterion = Object.fromEntries(Object.entries(byC).map(([k, v]) => [k, v.s / v.n]));
  const total = results.length ? results.reduce((x, r) => x + r.score, 0) / results.length : 0;
  const critical = results.filter((r) => r.critical).length;
  return { at: now, total, byCriterion, critical, path: results.map((r) => r.stageId), passed: total >= 0.7 && critical === 0 };
}
