// Physikalische Abschätzungen für die Baustellenentwässerung.
// Keine Bemessung: idealisierte Modelle, nur zur Plausibilisierung.

/** Dynamische Viskosität von Wasser [Pa·s] bei gegebener Temperatur (Stützwerte). */
export const VISCOSITY: Record<number, number> = { 5: 1.519e-3, 10: 1.307e-3, 15: 1.138e-3, 20: 1.002e-3 };

export const GRAINS = [
  { id: 'fs', label: 'Feinsand 0.1 mm', d: 0.1 },
  { id: 'gs', label: 'Grobsilt 0.06 mm', d: 0.06 },
  { id: 'ms', label: 'Mittelsilt 0.02 mm', d: 0.02 },
  { id: 'fsi', label: 'Feinsilt 0.006 mm', d: 0.006 },
  { id: 'ton', label: 'Ton 0.002 mm', d: 0.002 },
] as const;

/** Sinkgeschwindigkeit nach Stokes [m/s] für Quarz (2650 kg/m³) in Wasser. d in mm. */
export function stokes(dMm: number, tempC = 10): number {
  const mu = VISCOSITY[tempC] ?? VISCOSITY[10];
  const d = dMm / 1000;
  return (9.81 * (2650 - 1000) * d * d) / (18 * mu);
}

/** Erforderliche Oberfläche [m²] nach Hazen: A = Q / v_s × Zuschlag. Q in l/s. */
export function requiredArea(qLs: number, vs: number, factor = 2): number {
  if (qLs <= 0 || vs <= 0) return 0;
  return ((qLs / 1000) / vs) * factor;
}

/** Abfluss [l/s] = ψ × i [l/(s·ha)] × A [m²] / 10'000. */
export function runoff(psi: number, iLsHa: number, areaM2: number): number {
  return Math.max(0, psi * iLsHa * (areaM2 / 10000));
}
