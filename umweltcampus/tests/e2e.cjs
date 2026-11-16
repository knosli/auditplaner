// Browser-Durchlauf aller Funktionen (Desktop, Tablet, Handy), inkl. Migration eines Lernstands aus Version 1.
// Aufruf: npm run build && npm run e2e   (benötigt Playwright mit Chromium)
const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');
const html = fs.readFileSync(path.resolve(process.argv[2]));
// Auslieferung über HTTP (wie im Betrieb); file:// hat in Chromium eigene Speicherregeln.
const server = http.createServer((_q, r) => { r.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); r.end(html); });
let url = '';
const out = process.argv[3] || require('os').tmpdir();
const v1 = { version: 1, createdAt: 1, updatedAt: Date.now() - 86400000,
  lessons: { 'm2-l1': { step: 7, viewed: [0,1,2,3,4,5,6,7], startedAt: 5, completedAt: Date.now() - 90000000, answers: { 'm2-q01': ['b'] }, open: {} },
             'm2-l3': { step: 9, viewed: [0,1,2,9], startedAt: 6, answers: {}, open: {} } },
  answers: [{ q: 'm2-q01', at: 10, score: 1, correct: true, conf: 3, ctx: 'lektion' }, { q: 'm2-q12', at: 11, score: 1, correct: true, conf: 3, ctx: 'lektion' }],
  sr: { 'q:m2-q01': { ease: 2.5, interval: 2, due: 2000, reps: 1, lapses: 0, last: 10 } },
  scenarios: {}, exams: [], practice: {}, feynman: {}, history: [], studySec: {},
  settings: { theme: 'system', coachMode: 'trainieren', askConfidence: true, aiEnabled: true } };
const ok = (c, m) => { console.log((c ? 'OK   ' : 'FAIL ') + m); if (!c) process.exitCode = 1; };
(async () => {
  await new Promise((res) => server.listen(0, '127.0.0.1', res));
  url = `http://127.0.0.1:${server.address().port}/index.html`;
  const browser = await chromium.launch();
  for (const [name, opts] of [['desktop', { viewport: { width: 1360, height: 900 } }], ['tablet', { ...devices['iPad (gen 7)'] }], ['mobile', { ...devices['iPhone 13'] }]]) {
    const ctx = await browser.newContext({ ...opts, acceptDownloads: true });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
    // Stand aus Version 1 vor dem Start der App setzen (nur beim ersten Laden)
    await page.addInitScript((st) => {
      if (!localStorage.getItem('e2e-seeded')) { localStorage.setItem('umweltcampus.v1', JSON.stringify(st)); localStorage.setItem('e2e-seeded', '1'); }
    }, v1);
    await page.goto(url + '#dashboard'); await page.waitForTimeout(400);
    const go = async (h) => { await page.evaluate((x) => (location.hash = x), h); await page.waitForTimeout(200); };
    console.log('--- ' + name);
    // Migration
    await go('modul-m2');
    ok((await page.locator('.lessonlist > li.done').count()) === 1, 'v1-Fortschritt: Lektion 1 abgeschlossen');
    ok((await page.locator('.lessonlist > li').nth(2).textContent()).includes('Schritt'), 'v1-Fortschritt: Lektion 3 begonnen');
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('umweltcampus.v1')));
    ok(stored.version === 3 && stored.lessons['m2-l3'].cur === 'm2-l3-feynman', 'gespeicherter Stand auf Version 3 migriert');
    await go('dashboard');
    ok((await page.locator('.callout', { hasText: 'Frühere Fassung' }).count()) === 1, 'Hinweis «frühere Bewertungsfassung» sichtbar');
    await go('lektion-m2-l7');
    ok((await page.locator('h1').first().textContent()).includes('SIA 431:2022'), 'Lektion 7 (SIA 431:2022) erreichbar');
    await go('lektion-m2-l3');
    ok((await page.locator('.step h2').textContent()).includes('Erklären'), 'Lektion 3 öffnet beim gespeicherten Schritt');
    // Routes overflow
    for (const r of ['dashboard','lernpfad','module','modul-m2','lektion-m2-l1','lektion-m2-l4','simulator','szenario-sim-b','pruefung','wiederholung','bibliothek','werkzeuge','fortschritt','einstellungen']) {
      await go(r);
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ov > 0) ok(false, `Überlauf ${r}: ${ov}px`);
    }
    ok(true, 'alle Bereiche ohne seitlichen Überlauf geprüft');
    // Lesson 1: brief, Abwägung, Baustellenaufgabe
    await go('lektion-m2-l1');
    const steps = page.locator('.stepper button');
    const labels = await steps.allTextContents();
    ok(labels.some((l) => l.includes('Kurz erklärt')) && labels.some((l) => l.includes('Baustellenaufgabe')), 'Stepper zeigt Kurz erklärt und Baustellenaufgabe (' + labels.length + ' Schritte)');
    const idxOf = (t) => labels.findIndex((l) => l.includes(t));
    await steps.nth(idxOf('Abwägung')).click();
    await page.waitForTimeout(150);
    ok((await page.locator('.step h2').textContent()).includes('Abwägung'), 'Abwägungsschritt erreicht');
    await page.locator('.opt').nth(2).click();
    await page.getByText('Eher sicher').first().click();
    await page.getByRole('button', { name: 'Antwort prüfen' }).click();
    ok((await page.locator('.ana').count()) === 4, 'Analyse aller 4 Optionen angezeigt');
    ok((await page.locator('.analysis').textContent()).includes('Voraussetzungen'), 'Voraussetzungen und Risiken sichtbar');
    if (name === 'desktop') await page.screenshot({ path: out + '/abwaegung.png', fullPage: false });
    await steps.nth(idxOf('Baustellenaufgabe')).click(); await page.waitForTimeout(150);
    await page.locator('.sitetask textarea').fill('Ziff. 4.1 bis 4.5 sind verbindliche Auflagen, 4.6 nur Empfehlung. Konzept vor Baubeginn einreichen, pH-Protokoll und Neutralisation, Gemeinde Zustimmung, Absenkung mit Geologe abklären, Notfallkarte 117 und Instruktion.');
    await page.getByRole('button', { name: /Lösung abschliessen/ }).click();
    ok((await page.locator('.hintchip').count()) >= 3, 'Stichwort-Vorprüfung markiert Rasterpunkte');
    await page.locator('.rubric input[type=checkbox]').first().check();
    await page.getByRole('button', { name: /Bewertung speichern/ }).click();
    ok((await page.locator('.sitetask .feedback').textContent()).includes('Musterlösung'), 'Musterlösung nach Bearbeitung sichtbar');
    // Kurz erklärt + Glossar
    await steps.nth(idxOf('Kurz erklärt')).click(); await page.waitForTimeout(100);
    ok((await page.locator('.brief').count()) === 1, 'Kurz erklärt wird angezeigt');
    // Lesson 4 Rechner
    await go('lektion-m2-l4');
    const l4 = await page.locator('.stepper button').allTextContents();
    await page.locator('.stepper button').nth(l4.findIndex((l) => l.includes('Schema'))).click(); await page.waitForTimeout(100);
    const area = await page.locator('.calc-out .strong').textContent();
    ok(/5[5-9]/.test(area), 'Rechner: 8 l/s Mittelsilt → ' + area.trim());
    await page.locator('#calc-grain').selectOption('ton');
    ok((await page.locator('.calc-out .strong').textContent()).length > 3, 'Rechner reagiert auf Kornwahl');
    // Lektion abschliessen → Karten
    await page.locator('.stepper button').last().click(); await page.waitForTimeout(100);
    await page.getByRole('button', { name: /Lektion abschliessen/ }).click(); await page.waitForTimeout(200);
    ok((await page.evaluate(() => location.hash)) === '#lektion-m2-l5', 'Abschluss führt zur nächsten Lektion');
    // Szenario A guter Pfad
    await go('szenario-sim-a');
    await page.getByRole('button', { name: 'Fall beginnen' }).click();
    const pickAndGo = async (texts) => { for (const t of texts) await page.getByText(t, { exact: false }).first().click(); await page.getByRole('button', { name: 'Entscheid bestätigen' }).click(); await page.getByRole('button', { name: 'Weiter' }).click(); await page.waitForTimeout(100); };
    await pickAndGo(['Sofort zum Mitarbeiter gehen']);
    await pickAndGo(['Wohin führt der Schacht', 'Ist bereits Wasser im Schacht', 'Was sieht das Entwässerungskonzept', 'Welche Mittel sind vor Ort']);
    await pickAndGo(['Schädigung oder Tod', 'Ablagerung von Feinstoffen', 'Strafverfahren wegen', 'Kosten für Abklärungen']);
    // rank: bring into right order by moving s1..s5 to top in reverse
    for (const t of ['Dokumentieren', 'Bauführer informieren', 'Restliches Waschwasser', '117 bzw. 118 alarmieren', 'Schacht abdichten']) {
      for (let k = 0; k < 5; k++) { const li = page.locator('.rank li', { hasText: t }); const up = li.getByRole('button', { name: 'nach oben' }); if (await up.isDisabled()) break; await up.click(); }
    }
    await page.getByRole('button', { name: 'Entscheid bestätigen' }).click();
    ok((await page.locator('.fb-verdict').textContent()).includes('100'), 'Rangfolge korrekt bewertet');
    await page.getByRole('button', { name: 'Weiter' }).click();
    await pickAndGo(['Übers Wochenende absetzen']);
    await pickAndGo(['Waschplatz gemäss Konzept']);
    await page.locator('textarea').fill('Risiko: alkalisches Waschwasser pH 12 über Meteorleitung in den Bach. Reinigung gestoppt, Schacht abgedeckt, Wasser in Mulde gefasst, Auslauf kontrolliert. GSchG Verunreinigungsverbot, Konzept sieht Waschplatz vor. Ursache fehlender Waschplatz und Instruktion. Bis Dienstag Waschplatz einrichten, Verantwortung Polier.');
    await page.getByRole('button', { name: /Text abschliessen/ }).click();
    for (const cb of await page.locator('.rubric input[type=checkbox]').all()) await cb.check();
    await page.getByRole('button', { name: /Bewertung speichern/ }).click();
    await page.getByRole('button', { name: 'Entscheid bestätigen' }).click();
    await page.getByRole('button', { name: 'Weiter' }).click(); await page.waitForTimeout(200);
    ok((await page.locator('.verdict').textContent()).includes('Bestanden'), 'Fall A: guter Pfad bestanden');
    if (name === 'mobile') await page.screenshot({ path: out + '/mobile-auswertung.png' });
    // Wissenscheck
    await go('pruefung');
    await page.getByRole('button', { name: 'Starten' }).first().click();
    for (let i = 0; i < 6; i++) {
      await page.locator('.opt').first().click();
      await page.getByText('Eher sicher').first().click();
      await page.getByRole('button', { name: 'Antwort speichern' }).click();
      await page.getByRole('button', { name: i < 5 ? 'Nächste Frage' : 'Prüfung abgeben' }).click();
    }
    ok((await page.locator('h1').first().textContent()).includes('Auswertung'), 'Wissenscheck ausgewertet');
    // Wiederholung neue Karten
    await go('wiederholung');
    await page.getByRole('button', { name: 'Neue Karten lernen' }).click();
    await page.getByRole('button', { name: 'Antwort zeigen' }).click();
    await page.getByRole('button', { name: 'Gewusst, sicher' }).click();
    ok((await page.locator('.review .row .mono').textContent()).startsWith('2'), 'Karte bewertet, nächste Karte');
    // Praxisauftrag
    await go('werkzeuge');
    const card = page.locator('.practice').first();
    await card.getByRole('button', { name: 'Auftrag öffnen' }).click();
    await card.getByRole('button', { name: 'Auftrag beginnen' }).click();
    for (const ta of await card.locator('.refl textarea').all()) await ta.fill('Erfüllt durch Abgleich mit der Gewässerschutzkarte und Bewilligung.');
    await card.getByRole('button', { name: 'Als eingereicht markieren' }).click();
    await card.locator('input[id^=pt-role]').fill('Bauführer');
    await card.locator('input[type=date]').fill('2026-11-10');
    await card.locator('textarea[id^=pt-ev]').fill('Steckbrief im Projektordner abgelegt und besprochen.');
    await card.getByRole('button', { name: 'Bestätigung erfassen' }).click();
    ok((await card.locator('.status-pill').textContent()).includes('bestätigt'), 'Praxisauftrag bis «bestätigt» durchlaufen');
    ok((await page.locator('#rechner').count()) === 1, 'Rechner unter Praxiswerkzeuge');
    // Modul 1
    await go('modul-m1');
    ok((await page.locator('.lessonlist > li').count()) === 6, 'Modul 1: 6 Lektionen');
    await go('lektion-m1-l3');
    const m1steps = await page.locator('.stepper button').allTextContents();
    await page.locator('.stepper button').nth(m1steps.findIndex((l) => l.includes('Schema'))).click(); await page.waitForTimeout(100);
    await page.getByRole('tab', { name: 'Abfall' }).click();
    ok((await page.locator('.vo').textContent()).includes('VVEA'), 'Modul 1: interaktive Verordnungsübersicht');
    await page.locator('.stepper button').nth(m1steps.findIndex((l) => l.includes('Abwägung'))).click(); await page.waitForTimeout(100);
    await page.getByText('Einsetzen lassen und auf das Papier warten').click();
    await page.getByText('Eher sicher').first().click();
    await page.getByRole('button', { name: 'Antwort prüfen' }).click();
    ok((await page.locator('.callout', { hasText: 'Kritischer Fehler' }).count()) === 1, 'Modul 1: Sicherheitsveto bei kritischer Wahl sichtbar');
    await go('szenario-sim-f');
    await page.getByRole('button', { name: 'Fall beginnen' }).click();
    await page.getByText('Zuerst schnell die Mulde umschichten').click();
    await page.getByRole('button', { name: 'Entscheid bestätigen' }).click();
    ok((await page.locator('.stage-fb.crit').count()) === 1, 'Fall F: kritischer Entscheid markiert');
    // Module 3, 4 und 8
    for (const [mod, n, sim, txt, label, crit = true] of [['m3', 5, 'sim-g', 'Fertig ausbauen, aber vorsichtig', 'Fall G'], ['m4', 5, 'sim-h', 'Freigabe ist Freigabe', 'Fall H'], ['m8', 5, 'sim-d', 'Parallel geht schon', 'Fall D'], ['m9', 5, 'sim-i', 'Mit den Mulden und dem Magazin', 'Fall I', false], ['m10', 5, 'sim-e', 'Dem Vorschlag folgen', 'Fall E'], ['m7', 5, 'sim-j', 'Streu den Rest Bindemittel', 'Fall J'], ['m5', 5, 'sim-k', 'stärker benetzen und weitermachen', 'Fall K'], ['m6', 5, 'sim-c', 'Wir halten alle Auflagen ein. Baustellen', 'Fall C', false], ['m11', 5, 'sim-l', 'Freigeben – das Konzept war ja Teil der Offerte', 'Fall L'], ['m12', 5, 'sim-m', 'Einverstanden, wir stellen es als Einzelfall dar', 'Fall M']]) {
      await go('modul-' + mod);
      ok((await page.locator('.lessonlist > li').count()) === n, `Modul ${mod.slice(1)}: ${n} Lektionen`);
      await go('lektion-' + mod + '-l1');
      const st = await page.locator('.stepper button').allTextContents();
      await page.locator('.stepper button').nth(st.findIndex((l) => l.includes('Schema'))).click(); await page.waitForTimeout(100);
      ok((await page.locator('.diagram.kette li').count()) >= 3, `Modul ${mod.slice(1)}: Schema sichtbar`);
      await go('szenario-' + sim);
      await page.getByRole('button', { name: 'Fall beginnen' }).click();
      await page.getByText(txt).click();
      await page.getByRole('button', { name: 'Entscheid bestätigen' }).click();
      ok((await page.locator(crit ? '.stage-fb.crit' : '.stage-fb').count()) === 1, `${label}: ${crit ? 'kritischer Entscheid markiert' : 'Rückmeldung zum Entscheid angezeigt'}`);
    }
    await go('pruefung');
    await page.getByText('Modul 1: Umweltrecht').click();
    await page.getByRole('button', { name: 'Starten' }).first().click();
    ok((await page.locator('h1').first().textContent()).includes('Modul 1'), 'Prüfung für Modul 1 gestartet');
    await page.getByRole('button', { name: 'Abbrechen' }).click();
    const mixBtn = page.locator('article', { hasText: 'Gemischte Prüfung' }).getByRole('button', { name: 'Starten' });
    await mixBtn.click();
    ok((await page.locator('h1').first().textContent()).includes('Gemischte Prüfung'), 'Gemischte Prüfung gestartet');
    await page.getByRole('button', { name: 'Abbrechen' }).click();
    // UX-Update: Lernstufen, Fachvertiefung, Fokusmodus, Tastatur, Simulator-Szenen, spezifisches Feedback
    await go('lektion-m2-l1');
    ok((await page.locator('.lesson-head .trio > li').count()) === 3, 'Lektion zeigt drei Stufen: gelesen, bearbeitet, nachgewiesen');
    await page.locator('.lesson-head .trio-help summary').click(); await page.waitForTimeout(100);
    ok((await page.locator('.lesson-head .trio-help dt').count()) === 3 && await page.locator('.lesson-head .trio-help dd').first().isVisible(), 'Stufen-Erklärung aufklappbar (ohne Mouseover, auch mobil)');
    { const lbl = await page.locator('.stepper button').allTextContents(); await page.locator('.stepper button').nth(lbl.findIndex((l) => l.includes('Vertiefung'))).click(); await page.waitForTimeout(150); }
    const tocN = await page.locator('.deep-toc li').count();
    await page.locator('.deep-toc li button').nth(2).click(); await page.waitForTimeout(150);
    ok(tocN >= 3 && (await page.locator('.deep-sec h3 button[aria-expanded="true"]').count()) >= 2, 'Fachvertiefung: Übersicht mit Kernsätzen, Abschnitte aufklappbar');
    await page.locator('.deep-sec h3 button').nth(3).focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(100);
    ok((await page.locator('.deep-sec h3 button').nth(3).getAttribute('aria-expanded')) === 'true', 'Tastatur: Abschnitt mit Enter öffnen');
    await page.click('#focus-toggle'); await page.waitForTimeout(100);
    const stepBefore = await page.locator('.lp-label').textContent();
    await page.locator('body').click({ position: { x: 5, y: 300 } }).catch(() => {});
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
    ok((await page.locator('.app.focus').count()) === 1 && !(await page.locator('.sidenav').isVisible()) && (await page.locator('.lp-label').textContent()) !== stepBefore, 'Fokusmodus: Navigation ausgeblendet, Pfeiltaste wechselt den Schritt');
    await page.keyboard.press('Escape'); await page.waitForTimeout(100);
    ok((await page.locator('.app.focus').count()) === 0, 'Fokusmodus mit Esc beendet');
    await go('lektion-m12-l5');
    { const lbl = await page.locator('.stepper button').allTextContents(); await page.locator('.stepper button').nth(lbl.findIndex((l) => l.includes('Abwägung'))).click(); await page.waitForTimeout(150); }
    await page.locator('.question .opt').first().click();
    await page.locator('.question .conf label').last().click();
    await page.getByRole('button', { name: 'Antwort prüfen' }).click(); await page.waitForTimeout(150);
    const cf = (await page.locator('.crit-fb').textContent()) || '';
    ok(cf.includes('Fachlich richtig wäre') && cf.includes('Mögliche Folgen') && !cf.includes('Gewässer gefährden oder ist ohne Bewilligung'), 'Kritischer Fehler: themen- und entscheidungsspezifische Rückmeldung');
    ok((await page.locator('.badge.eval-obj').count()) >= 1, 'Bewertungsart gekennzeichnet (objektiv ausgewertet)');
    await go('szenario-sim-a');
    ok(await page.evaluate(() => document.activeElement && document.activeElement.id === 'main'), 'Tastatur: nach Seitenwechsel steht der Fokus am Anfang des Inhalts');
    ok((await page.locator('.scene-map svg').count()) === 1 && (await page.locator('.sm-list li').count()) >= 3, 'Simulator: technische Szene mit Gefahren und Schutzgütern');
    await page.getByRole('button', { name: 'Plan vergrössern' }).click(); await page.waitForTimeout(150);
    { const dlg = page.locator('.sm-zoom'); const w0 = await dlg.locator('svg').evaluate((e) => e.getBoundingClientRect().width);
      await dlg.getByRole('button', { name: 'Vergrössern' }).click(); await page.waitForTimeout(100);
      const w1 = await dlg.locator('svg').evaluate((e) => e.getBoundingClientRect().width);
      ok((await dlg.count()) === 1 && w1 > w0 && await page.evaluate(() => document.activeElement && document.activeElement.getAttribute('aria-label') === 'Vergrössern'), 'Plan vergrössern: Vollbild mit Zoom'); }
    await page.keyboard.press('Escape'); await page.waitForTimeout(100);
    ok((await page.locator('.sm-zoom').count()) === 0 && await page.evaluate(() => document.activeElement && document.activeElement.textContent === 'Plan vergrössern'), 'Vollbild mit Esc geschlossen, Fokus zurück');
    await page.getByRole('button', { name: 'Fall beginnen' }).click(); await page.waitForTimeout(150);
    ok((await page.locator('.infoboard').count()) === 1 && (await page.locator('.infoboard').textContent()).includes('Fehlt noch'), 'Simulator: Lagebild mit «Liegt vor» und «Fehlt noch»');
    { const fresh = await ctx.newPage(); await fresh.goto(url + '#dashboard'); await fresh.waitForTimeout(400); await fresh.keyboard.press('Tab');
      ok(await fresh.evaluate(() => document.activeElement && document.activeElement.classList.contains('skip')), 'Tastatur: erster Tab erreicht «Zum Inhalt springen»'); await fresh.close(); }
    await go('lektion-m1-l1');
    { const lbl = await page.locator('.stepper button').allTextContents(); await page.locator('.stepper button').nth(lbl.findLastIndex((l) => l.includes('Erklärung'))).click(); await page.waitForTimeout(150); }
    { const a = page.locator('a.lawlink', { hasText: 'Art. 2 USG' }).first();
      ok((await a.getAttribute('href')) === 'https://www.fedlex.admin.ch/eli/cc/1984/1122_1122_1122/de#art_2' && (await a.getAttribute('target')) === '_blank', 'Artikelzitat «Art. 2 USG» verlinkt direkt auf den Artikel in Fedlex'); }
    await go('lektion-m10-l1');
    { const lbl = await page.locator('.stepper button').allTextContents(); await page.locator('.stepper button').nth(lbl.findIndex((l) => l.includes('Erklärung'))).click(); await page.waitForTimeout(150);
      const d = await page.locator('.table.cards-sm td').first().evaluate((e) => getComputedStyle(e).display);
      ok(name === 'mobile' ? d === 'block' : d === 'table-cell', name === 'mobile' ? 'Handy: Tabellen ab drei Spalten als Karten' : 'Tabellen ab drei Spalten als Tabelle'); }
    await go('modul-m2');
    { const cta = page.locator('.mod-hero-cta a.btn.primary'); ok(/^#lektion-m2-l\d$/.test((await cta.getAttribute('href')) || '') && /Weiterlernen|Weiter|Starten/.test(await cta.textContent()), 'Modulseite: Hauptknopf führt direkt in die passende Lektion des Moduls'); }
    await page.selectOption('#mod-select', 'm5'); await page.waitForTimeout(200);
    ok((await page.evaluate(() => location.hash)) === '#modul-m5' && (await page.locator('h1').first().textContent()).includes('Luft'), 'Modulseite: Auswahlliste wechselt das Modul');
    await page.locator('.mod-switch a[aria-label^="Nächstes Modul"]').click(); await page.waitForTimeout(200);
    ok((await page.evaluate(() => location.hash)) === '#modul-m6' && (await page.locator('.mod-pager a').count()) === 2, 'Modulseite: Pfeil wechselt zum nächsten Modul, unten Vor/Zurück');
    await go('dashboard');
    ok((await page.locator('#dash-layers .layer-mod').count()) === 3, 'Dashboard: Fachentwicklung zeigt nur drei relevante Module');
    await page.locator('.layers-toggle').click(); await page.waitForTimeout(100);
    ok((await page.locator('#dash-layers .layer-mod').count()) === 12 && (await page.locator('.layers-toggle').getAttribute('aria-expanded')) === 'true', 'Dashboard: «Alle 12 anzeigen» klappt alle Module auf');
    // Kanton & Standort
    await go('modul-m2');
    ok((await page.locator('#vor-ort').count()) === 1 && (await page.locator('#vor-ort').textContent()).includes('Einstellungen'), 'Vor Ort prüfen: ohne Kanton Hinweis auf Einstellungen');
    await go('einstellungen');
    await page.selectOption('#site-canton', 'BE');
    ok((await page.locator('#site-lang option').allTextContents()).includes('Französisch'), 'Mehrsprachiger Kanton (BE): Sprachwahl Deutsch/Französisch');
    await page.selectOption('#site-canton', 'ZH');
    ok((await page.locator('#site-lang').count()) === 0, 'Einsprachiger Kanton (ZH): keine Sprachwahl');
    await page.fill('#site-muni', 'Musterdorf');
    await go('modul-m2');
    const vo = await page.locator('#vor-ort').textContent();
    ok(vo.includes('Zusatzanforderungen ZH') && (await page.locator('#vor-ort a[href*="zh.ch"]').count()) > 0 && vo.includes('nicht geprüft') && vo.includes('Musterdorf'), 'Vor Ort prüfen (Modul 2, ZH): amtliche Links, Status «nicht geprüft», Gemeinde');
    await page.locator('#vor-ort').getByText('Schweizer Grundlagen').click();
    const vo2 = await page.locator('#vor-ort').textContent();
    ok(vo2.includes('GSchG') && (await page.locator('#vor-ort a[href*="zh.ch"]').count()) === 0, 'Modus Schweizer Grundlagen: nur Bundesquellen, keine Vermischung');
    await page.locator('#vor-ort').getByText('Zusatzanforderungen ZH').click();
    await go('kanton');
    ok(Number(await page.locator('#canton-count').textContent()) >= 2 && (await page.locator('.projectcheck').textContent()).includes('Kantonale Regelung nicht verifiziert'), 'Quellenkarte ZH und Projektcheck mit «nicht verifiziert»');
    await page.selectOption('#canton-pick', 'AG');
    ok((await page.locator('.csrc a[href*="ag.ch"]').count()) > 0 && (await page.locator('.csrc a[href*="zh.ch"]').count()) === 0, 'Kantonswechsel ZH → AG ändert die Quellen');
    ok((await page.locator('.csrc .badge.chk-link').count()) > 0 && (await page.locator('.csrc').first().textContent()).includes('Linkprüfung'), 'Kantonsquellen: Linkstatus getrennt vom fachlichen Prüfstatus');
    await page.selectOption('#canton-pick', '');
    // Bibliothek
    await go('bibliothek');
    for (const term of ['Betonwaschwasser', 'Bodenschutz', 'SIA 431', 'Entsorgungskonzept', 'Gewässerraum']) {
      await page.locator('#lib-search').fill(term);
      const n = await page.locator('.termgrid li, .libcard, .srclist li').count();
      ok(n > 0, `Suche «${term}»: ${n} Treffer`);
    }
    // Export / Import
    await go('fortschritt');
    const dl = page.waitForEvent('download', { timeout: 3000 }).catch(() => null);
    await page.getByRole('button', { name: /Lernstand exportieren/ }).click();
    const d = await dl;
    ok(!!d, 'Export erzeugt Datei');
    if (d) {
      const fp = await d.path();
      const txt = require('fs').readFileSync(fp, 'utf8');
      await page.locator('details summary', { hasText: 'Text einfügen' }).click();
      await page.locator('#import-json').fill(txt);
      await page.getByRole('button', { name: 'Prüfen' }).click();
      ok((await page.locator('.import-preview').textContent()).includes('Lektionen'), 'Import-Vorschau');
      await page.getByRole('button', { name: 'Diesen Stand übernehmen' }).click();
      await page.getByRole('button', { name: /Ja, aktuellen Stand ersetzen/ }).click();
      ok(true, 'Import übernommen');
    }
    // Theme
    await go('einstellungen');
    await page.getByText('Dunkel', { exact: true }).click();
    ok((await page.evaluate(() => document.documentElement.getAttribute('data-theme'))) === 'dark', 'Dark Mode aktiv');
    if (name === 'desktop') { await go('lektion-m2-l2'); await page.screenshot({ path: out + '/dark.png' }); }
    await go('einstellungen');
    await page.getByText('wie System').click();
    ok((await page.evaluate(() => document.documentElement.getAttribute('data-theme'))) === null, 'zurück auf System');
    // Reload persistence
    await page.reload(); await page.waitForTimeout(300);
    await go('fortschritt');
    const hn = await page.locator('.history li').count(); const raw = await page.evaluate(() => { const x = JSON.parse(localStorage.getItem('umweltcampus.v1') || '{}'); return { h: (x.history || []).length, v: x.version, l: Object.keys(x.lessons || {}).length }; }); ok(hn > 3, 'Historie nach Neuladen vorhanden (' + hn + ' Einträge, gespeichert ' + JSON.stringify(raw) + ')');
    // ---- Academy-Design: Navigation, Dashboard, Module, Quellen, Breite, Datenerhalt ----
    const before = await page.evaluate(() => JSON.parse(localStorage.getItem('umweltcampus.v1')));
    await go('dashboard');
    ok((await page.locator('.nav-glabel').allTextContents()).join('|').includes('Praxis & Training'), 'Navigation in Gruppen');
    const heroHref = await page.locator('.hero-cta').getAttribute('href');
    ok(/^#(lektion-|pruefung)/.test(heroHref || ''), 'Hero: genau eine Weiterlernen-Aktion (' + heroHref + ')');
    ok((await page.locator('.hero-cta').count()) === 1, 'Hero hat genau eine primäre Aktion');
    { const n0 = await page.locator('.lb').count(); await page.locator('.layers-toggle').click(); await page.waitForTimeout(100);
      const n1 = await page.locator('.lb').count(); await page.locator('.layers-toggle').click(); await page.waitForTimeout(100);
      ok(n0 === 4 * 3 && n1 === 4 * 12, 'Fortschrittsebenen getrennt (4 Ebenen × 3 relevante, aufklappbar auf 12 Module)'); }
    ok((await page.locator('.shelf .mod-card').count()) === 3, 'Drei Module als Einstieg');
    await page.locator('.hero-cta').click(); await page.waitForTimeout(200);
    ok((await page.evaluate(() => location.hash)) === heroHref, 'Weiterlernen öffnet die Lektion');
    await go('module');
    await page.getByRole('button', { name: 'Management & Führung' }).click();
    ok((await page.locator('.mod-card').count()) === 3, 'Modulfilter Management: 3 Module');
    await page.getByRole('button', { name: 'Alle Themen' }).click();
    await page.getByRole('searchbox', { name: /durchsuchen/ }).fill('Recycling');
    ok((await page.locator('.mod-card').count()) >= 1 && (await page.locator('.mod-card').count()) < 12, 'Modulsuche filtert nach Themen');
    await go('quellen');
    ok((await page.locator('.srclist li').count()) > 20, 'Quellen über eigene Navigation erreichbar');
    ok((await page.locator('.src-group h3').count()) >= 3, 'Quellen nach Rechtsnatur gruppiert');
    await go('fortschritt');
    ok((await page.locator('.prog-mod').count()) === 12 && (await page.locator('.stage-legend li').count()) === 5, 'Fortschritt je Modul mit fünf Kompetenzstufen');
    await go('werkzeuge');
    const allTasks = await page.locator('.practice').count();
    await page.getByRole('button', { name: 'Modul 3: Bauabfälle' }).click();
    ok((await page.locator('.practice').count()) === 5 && allTasks > 5, 'Praxisaufträge nach Modul filterbar');
    await go('pruefung');
    await page.locator('.mod-radio', { hasText: 'Modul 4' }).click();
    ok((await page.locator('h2', { hasText: 'Abschluss von Modul 4' }).count()) === 1, 'Prüfungstraining: Modulwahl wirkt');
    let wide = [];
    for (const h of ['dashboard', 'module', 'modul-m2', 'lektion-m2-l2', 'simulator', 'szenario-sim-g', 'lernpfad', 'pruefung', 'wiederholung', 'bibliothek', 'werkzeuge', 'fortschritt', 'einstellungen', 'kanton', 'quellen']) {
      await go(h); if (h.startsWith('szenario')) { await page.getByRole('button', { name: 'Fall beginnen' }).click(); await page.waitForTimeout(150); }
      const w = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); if (w > 1) wide.push(h + ':' + w);
    }
    ok(wide.length === 0, 'Kein horizontales Scrollen (' + (wide.join(', ') || 'alle Seiten') + ')');
    const after = await page.evaluate(() => JSON.parse(localStorage.getItem('umweltcampus.v1')));
    const same = (k) => JSON.stringify(before[k]) === JSON.stringify(after[k]);
    const lessonsKept = Object.keys(before.lessons).every((k) => ['startedAt', 'completedAt'].every((f) => before.lessons[k][f] === after.lessons[k][f]));
    ok(same('answers') && same('scenarios') && same('exams') && same('practice') && lessonsKept && after.version === before.version, 'Lernstand beim Navigieren unverändert (Antworten, Fälle, Prüfungen, Praxis, Zeitstempel)');
    ok(errs.length === 0, 'Konsolenfehler: ' + (errs.join(' | ') || 'keine'));
    await ctx.close();
  }
  await browser.close();
  server.close();
})();
