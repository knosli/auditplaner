// Erzeugt die App-Icons (einmalig bzw. bei Änderung des Logos): node scripts/make-icons.cjs
const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const svg = (pad, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" ${bg ? '' : 'rx="112"'} fill="#102d2d"/>
  <g transform="translate(256 256) scale(${pad}) translate(-256 -256)">
    <rect x="96" y="96" width="320" height="320" rx="76" fill="#daeee8"/>
    <g fill="none" stroke="#102d2d" stroke-width="26" stroke-linecap="round">
      <path d="M160 204c32-22 64 22 96 0s64-22 96 0"/>
      <path d="M160 260c32-22 64 22 96 0s64-22 96 0"/>
      <path d="M160 316c32-22 64 22 96 0s64-22 96 0"/>
    </g>
  </g>
</svg>`;
(async () => {
  mkdirSync('scripts/pages-icons', { recursive: true });
  const b = await chromium.launch();
  for (const [name, size, pad, full] of [['icon-512.png', 512, 1, false], ['icon-192.png', 192, 1, false], ['icon-maskable-512.png', 512, 0.72, true], ['apple-touch-icon.png', 180, 0.86, true]]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<body style="margin:0;background:transparent">${svg(pad, full).replace('width="512" height="512"', `width="${size}" height="${size}"`)}</body>`);
    await p.screenshot({ path: `scripts/pages-icons/${name}`, omitBackground: true });
    await p.close();
  }
  await b.close();
})();
