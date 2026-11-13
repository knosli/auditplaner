// Gestaltungsangaben je Fachmodul (Icon, Farbton, Nutzenversprechen, Gruppe).
// Reine Oberflächentexte – keine Fachinhalte, keine Bewertungslogik.
export type ModGroup = 'praxis' | 'recht' | 'management';

export const MOD_GROUP_LABEL: Record<ModGroup, string> = {
  praxis: 'Baustellenpraxis',
  recht: 'Recht & Planung',
  management: 'Management & Führung',
};

export const MOD_META: Record<string, { icon: string; tone: string; promise: string; group: ModGroup }> = {
  m1: { icon: 'law', tone: 'law', promise: 'Pflichten, Behörden und Auflagen sicher einordnen.', group: 'recht' },
  m2: { icon: 'water', tone: 'water', promise: 'Baustellenwasser richtig ableiten, behandeln und Havarien beherrschen.', group: 'praxis' },
  m3: { icon: 'recycle', tone: 'waste', promise: 'Bauabfälle trennen, Schadstoffe erkennen und Materialströme steuern.', group: 'praxis' },
  m4: { icon: 'ground', tone: 'soil', promise: 'Boden schützen, Verdichtung vermeiden und Aushub richtig verwerten.', group: 'praxis' },
  m5: { icon: 'air', tone: 'air', promise: 'Staub und Maschinenemissionen an der Quelle begrenzen.', group: 'praxis' },
  m6: { icon: 'noise', tone: 'noise', promise: 'Lärm- und Erschütterungsschutz für den Baualltag planen.', group: 'praxis' },
  m7: { icon: 'drum', tone: 'water', promise: 'Wassergefährdende Stoffe sicher lagern, umschlagen und Notfälle beherrschen.', group: 'praxis' },
  m8: { icon: 'plan', tone: 'law', promise: 'Umweltanforderungen früh in Planung und AVOR verankern.', group: 'recht' },
  m9: { icon: 'site', tone: 'soil', promise: 'Baustellen begleiten, kontrollieren und Nachweise führen.', group: 'praxis' },
  m10: { icon: 'iso', tone: 'mgmt', promise: 'Umweltmanagement nach ISO 14001 wirksam betreiben.', group: 'management' },
  m11: { icon: 'leaf', tone: 'leaf', promise: 'Klima- und Ressourcenwirkung von Bauprojekten beurteilen.', group: 'management' },
  m12: { icon: 'lead', tone: 'mgmt', promise: 'Umweltverantwortung im Unternehmen führen und gestalten.', group: 'management' },
};

export const metaOf = (id: string) => MOD_META[id] ?? { icon: 'book', tone: 'law', promise: '', group: 'praxis' as ModGroup };
