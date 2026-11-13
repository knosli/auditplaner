import type { Scenario, ScenarioStage } from '../content/types';
import { SCORING_VERSION, type ScenarioRun } from './state';

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
  /** Selbstbewertung (Freitext am Raster) – kein unabhängiger Fachnachweis */
  self?: boolean;
  /** Begründung eines kritischen Fehlers (z. B. Alarmierung zu spät) */
  criticalWhy?: string[];
}

/** Gruppe (0-basiert) eines Elements in einer Teilordnung. */
function groupOf(groups: string[][], id: string): number {
  return groups.findIndex((g) => g.includes(id));
}

/**
 * Rangfolge mit Teilordnung: Elemente derselben Gruppe dürfen in beliebiger
 * Reihenfolge stehen (parallele Massnahmen). Bewertet wird der Anteil
 * vertauschter Paare aus verschiedenen Gruppen. Steht eine Pflicht-Sofortmassnahme
 * (rankEarly) zu weit hinten, ist das ein kritischer Fehler.
 */
export function evaluateRank(stage: ScenarioStage, order: string[]): { score: number; critical: boolean; why: string[] } {
  const groups = stage.rankGroups ?? (stage.rankOrder ?? []).map((id) => [id]);
  let inv = 0;
  let pairs = 0;
  for (let i = 0; i < order.length; i++)
    for (let j = i + 1; j < order.length; j++) {
      const gi = groupOf(groups, order[i]);
      const gj = groupOf(groups, order[j]);
      if (gi === gj) continue;
      pairs++;
      if (gi > gj) inv++;
    }
  let score = pairs ? 1 - inv / pairs : 1;
  const why: string[] = [];
  for (const e of stage.rankEarly ?? []) {
    const pos = order.indexOf(e.id) + 1;
    if (pos > e.maxPos) why.push(e.why);
  }
  if (why.length) score = Math.min(score, 0.25);
  return { score, critical: why.length > 0, why };
}

export function evaluateStage(stage: ScenarioStage, a: StageAnswer): StageResult {
  const opts = stage.options ?? [];
  const sel = new Set(a.selected);
  let score = 0;
  let critical = false;
  let self = false;
  let criticalWhy: string[] | undefined;
  switch (stage.type) {
    case 'single': {
      const o = opts.find((x) => x.id === a.selected[0]);
      critical = !!o?.critical;
      score = o && !critical ? o.points / 2 : 0;
      break;
    }
    case 'multi': {
      const good = opts.filter((o) => o.points === 2);
      const hits = good.filter((o) => sel.has(o.id)).length;
      const wrong = opts.filter((o) => o.points === 0 && sel.has(o.id)).length;
      critical = opts.some((o) => o.critical && sel.has(o.id));
      score = critical ? 0 : Math.max(0, Math.min(1, (hits - wrong) / Math.max(1, good.length)));
      break;
    }
    case 'ask': {
      const pick = stage.pick ?? 3;
      const chosen = a.selected.slice(0, pick); // nie mehr als erlaubt werten
      const best = [...opts].sort((x, y) => y.points - x.points).slice(0, pick).reduce((x, o) => x + o.points, 0);
      const got = opts.filter((o) => chosen.includes(o.id)).reduce((x, o) => x + o.points, 0);
      score = best ? Math.min(1, got / best) : 0;
      break;
    }
    case 'rank': {
      const r = evaluateRank(stage, a.selected);
      score = r.score;
      critical = r.critical;
      criticalWhy = r.why;
      break;
    }
    case 'justify': {
      const r = stage.rubric ?? [];
      score = r.length ? a.selected.filter((id) => r.some((p) => p.id === id)).length / r.length : 0;
      self = true;
      break;
    }
  }
  return { stageId: stage.id, score, critical, criteria: stage.criteria, ...(self ? { self } : {}), ...(criticalWhy?.length ? { criticalWhy } : {}) };
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

/**
 * Auswertung: «total» enthält alle Schritte (Anzeige), «objective» nur objektiv
 * bewertete Schritte. Bestanden = objective ≥ 70 % und kein kritischer Fehler.
 * Selbstbewertete Begründungen werden angezeigt, entscheiden aber nicht über «bestanden».
 */
export function summarize(results: StageResult[], now = Date.now()): ScenarioRun {
  const byC: Record<string, { s: number; n: number }> = {};
  for (const r of results) for (const c of r.criteria) {
    byC[c] ??= { s: 0, n: 0 };
    byC[c].s += r.score;
    byC[c].n += 1;
  }
  const byCriterion = Object.fromEntries(Object.entries(byC).map(([k, v]) => [k, v.s / v.n]));
  const avg = (xs: StageResult[]) => (xs.length ? xs.reduce((x, r) => x + r.score, 0) / xs.length : 0);
  const total = avg(results);
  const objective = avg(results.filter((r) => !r.self));
  const critical = results.filter((r) => r.critical).length;
  return { at: now, total, objective, byCriterion, critical, path: results.map((r) => r.stageId), passed: objective >= 0.7 && critical === 0, v: SCORING_VERSION };
}
