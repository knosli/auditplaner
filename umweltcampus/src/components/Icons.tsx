// Einheitlicher Icon-Satz (24×24, Strich 1.8). Keine Emoji-Navigation.
const P: Record<string, string> = {
  home: 'M3 11 12 3l9 8v10H3V11Zm6 10v-8h6v8',
  book: 'M3 5c3-1 6-1 9 1 3-2 6-2 9-1v15c-3-1-6-1-9 1-3-2-6-2-9-1V5Zm9 1v15',
  path: 'M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 16V9a3 3 0 0 1 3-3h4m2 12h3a3 3 0 0 0 3-3v-5',
  sim: 'M3 20h18M5 17h14V5H5v12Zm3-8 3 3-3 3m5 0h3',
  exam: 'M9 4h6l1 2h3v15H5V6h3l1-2Zm-1 9 3 3 5-6',
  review: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',
  practice: 'M14 6l4 4-9 9H5v-4l9-9Zm2-2 2-2 4 4-2 2',
  library: 'M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 3 15-3.5 1z',
  sources: 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6m-6 4h6',
  chart: 'M3 21h18M6 19V10h3v9m3 0V4h3v15m3 0v-7h3v7',
  settings: 'M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2 2m8.8 8.8 2 2m0-12.8-2 2m-8.8 8.8-2 2M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  water: 'M12 2C9 6 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-4-9-7-13zM8 15a4 4 0 0 0 4 4',
  recycle: 'M9 4h6l3 5m-4-1 4 1 1-4M20 14l-3 5h-6m4-3 2 3-3 2M7 19l-3-5 3-5m-1 5H4l-1 3',
  ground: 'M2 7c4-2 7 2 11 0s7 0 9 0M2 12c4-2 7 2 11 0s7 0 9 0M2 17c4-2 7 2 11 0s7 0 9 0',
  law: 'M12 3v18M5 7h14M7 7l-3 7h6L7 7Zm10 0-3 7h6l-3-7ZM8 21h8',
  air: 'M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h7',
  noise: 'M4 9v6h4l5 4V5L8 9H4Zm13-1a5 5 0 0 1 0 8m2-11a9 9 0 0 1 0 14',
  drum: 'M6 5c0-1 2.7-2 6-2s6 1 6 2v14c0 1-2.7 2-6 2s-6-1-6-2V5Zm0 0c0 1 2.7 2 6 2s6-1 6-2M6 12c0 1 2.7 2 6 2s6-1 6-2',
  plan: 'M3 4h18v16H3zM3 9h18M8 4v16M12 13h6m-6 3h4',
  check: 'm4 12 5 5 11-11',
  iso: 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Zm-3 9 2 2 4-4',
  leaf: 'M5 19c0-9 6-14 15-14 0 9-5 15-14 15m0-1 7-7',
  lead: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.6-7 8-7s8 3 8 7',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 3v6l4 2',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  back: 'M19 12H5m5-5-5 5 5 5',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm5 11.5 5 5',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  alert: 'm12 3 10 18H2L12 3Zm0 6v5m0 3v1',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  quiz: 'M9 9a3 3 0 1 1 4 2.8c-.6.3-1 .9-1 1.6V14m0 3v1M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z',
  site: 'M2 20h20M4 20V10l6-4v14m0-10h10v10M14 14h2m-2 3h2',
  user: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.6-7 8-7s8 3 8 7',
  chat: 'M4 5h16v11H9l-5 4V5Z',
  terms: 'M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Zm0 0a2 2 0 0 1 2-2h12M8 7h6',
  layers: 'M12 3 2 8l10 5 10-5-10-5ZM2 13l10 5 10-5M2 17l10 5 10-5',
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 20, className }: { name: IconName | string; size?: number; className?: string }) {
  const d = P[name] ?? P.book;
  return (
    <svg className={'ico' + (className ? ' ' + className : '')} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={name === 'check' ? 2.1 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
