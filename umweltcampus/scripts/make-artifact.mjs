// Erzeugt aus dist/index.html eine Artifact-Fassung (dist/artifact.html):
// Das Artifact liefert doctype/html/head/body selbst, daher nur Inhalt.
import { readFileSync, writeFileSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');
const pick = (re) => [...html.matchAll(re)].map((m) => m[0]).join('\n');
const title = pick(/<title>[\s\S]*?<\/title>/g);
const metas = pick(/<meta name="claude:[^>]*>/g);
const links = pick(/<link [^>]*>/g);
const styles = pick(/<style[\s\S]*?<\/style>/g);
const scripts = pick(/<script[\s\S]*?<\/script>/g);
const out = [title, metas, links, styles, '<div id="root"></div>', scripts].join('\n');
writeFileSync('dist/artifact.html', out);
console.log('dist/artifact.html', (out.length / 1024).toFixed(0), 'KB');
