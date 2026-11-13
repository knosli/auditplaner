// Erstellt die Web-App-Fassung für GitHub Pages im Ordner pages/ (nicht eingecheckt;
// der Inhalt wird als Zweig gh-pages des App-Repositorys veröffentlicht).
// Eine HTML-Datei plus Manifest, Icons und ein kleiner Service Worker, damit die
// App auf dem Handy zum Startbildschirm hinzugefügt und offline geöffnet werden kann.
// Aufruf: npm run build:pages
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';

const OUT = process.argv[2] ?? 'pages';
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
mkdirSync(OUT, { recursive: true });

const head = `
<meta name="theme-color" content="#102d2d">
<meta name="description" content="UmweltCampus Bau CH – Lern-App Umweltschutz auf Schweizer Baustellen (Prüfstatus Entwurf)">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="UmweltCampus">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<script>if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));</script>
`;
let html = readFileSync('dist/index.html', 'utf8');
if (!html.includes('</title>')) throw new Error('dist/index.html: <title> nicht gefunden – zuerst npm run build');
html = html.replace('</title>', '</title>' + head);
writeFileSync(`${OUT}/index.html`, html);

writeFileSync(`${OUT}/manifest.webmanifest`, JSON.stringify({
  name: 'UmweltCampus Bau CH',
  short_name: 'UmweltCampus',
  description: 'Lern-App Umweltschutz auf Schweizer Baustellen',
  lang: 'de-CH',
  start_url: './',
  scope: './',
  display: 'standalone',
  orientation: 'any',
  background_color: '#f7f7f2',
  theme_color: '#102d2d',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');

// Service Worker: immer zuerst das Netz (neue Version sofort sichtbar), bei fehlender
// Verbindung die zuletzt geladene Fassung. Lernstände liegen nicht im Cache, sondern
// im Browser-Speicher des Geräts.
writeFileSync(`${OUT}/sw.js`, `// UmweltCampus Bau CH ${pkg.version}
const CACHE = 'umweltcampus-v1';
const FILES = ['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('./')))
  );
});
`);

for (const f of ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png']) {
  if (!existsSync(`scripts/pages-icons/${f}`)) throw new Error(`Icon fehlt: scripts/pages-icons/${f} (node scripts/make-icons.cjs)`);
  copyFileSync(`scripts/pages-icons/${f}`, `${OUT}/${f}`);
}
console.log(`${OUT}/index.html`, Math.round(html.length / 1024), 'KB, Version', pkg.version);
