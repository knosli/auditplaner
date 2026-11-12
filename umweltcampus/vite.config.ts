import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Eine einzige HTML-Datei: läuft als Artifact, auf jedem statischen Webserver
// und lokal ohne Server-Konfiguration.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist', assetsInlineLimit: 100000000 },
  test: { globals: true, environment: 'node' },
});
