import { LESSONS, LEVEL_LABEL, LEVEL_SHORT, MODULES, SCENARIOS, TASKS } from '../content';
import { useStore } from '../store';
import { Bar, DevBadge, pct } from '../components/ui';
import { continueLesson, dueItems, knowledgeGaps, levelStats, moduleProgress, moduleRequirements, progressLayers, recommendedLevel, studyMinutes } from '../lib/learning';
import { Icon } from '../components/Icons';
import { ModuleIllustration } from '../components/Illustrations';
import { MOD_GROUP_LABEL, metaOf, type ModGroup } from '../components/moduleMeta';
import { useState } from 'react';
import { PRACTICE_LABEL } from '../components/Practice';
import { LegacyNotice } from './Progress';
import { isLegacyRun } from '../lib/versioning';

export function Dashboard() {
  const { s } = useStore();
  const cont = continueLesson(s);
  const gaps = knowledgeGaps(s).slice(0, 3);
  const due = dueItems(s).length;
  const avail = MODULES.filter((m) => m.status === 'verfuegbar');
  const availLessons = LESSONS.filter((l) => avail.some((m) => m.id === l.moduleId));
  const doneLessons = availLessons.filter((l) => s.lessons[l.id]?.completedAt).length;
  const playedSims = SCENARIOS.filter((x) => (s.scenarios[x.id] ?? []).some((r) => !isLegacyRun(x.id, r)));
  const passedSims = playedSims.filter((x) => (s.scenarios[x.id] ?? []).some((r) => r.passed && !isLegacyRun(x.id, r)));
  const isNew = !Object.keys(s.lessons).length;

  // Lernplan für heute: aus der echten Empfehlungslogik
  const curMod = cont ? cont.lesson.moduleId : avail[0]?.id;
  const simPick = SCENARIOS.filter((x) => x.status === 'verfuegbar').sort((a, b) => (a.moduleId === curMod ? -1 : 0) - (b.moduleId === curMod ? -1 : 0))
    .find((x) => !(s.scenarios[x.id] ?? []).some((r) => r.passed && !isLegacyRun(x.id, r)));
  const plan = [
    cont && { icon: metaOf(cont.lesson.moduleId).icon, tone: metaOf(cont.lesson.moduleId).tone, title: cont.lesson.title, meta: `ca. ${cont.lesson.minutes} Min. · Fachlektion`, href: '#lektion-' + cont.lesson.id, cta: cont.started ? 'Fortsetzen' : 'Starten', min: cont.lesson.minutes },
    simPick && { icon: 'sim', tone: 'sand', title: `Fall ${simPick.code}: ${simPick.title}`, meta: `ca. ${simPick.minutes} Min. · Baustellenfall`, href: '#szenario-' + simPick.id, cta: 'Üben', min: simPick.minutes },
    due > 0 && { icon: 'review', tone: 'law', title: `${due} Wiederholung${due === 1 ? '' : 'en'} fällig`, meta: `ca. ${Math.max(2, Math.ceil(due * 0.5))} Min. · Karten und Fragen`, href: '#wiederholung', cta: 'Festigen', min: Math.max(2, Math.ceil(due * 0.5)) },
  ].filter(Boolean) as { icon: string; tone: string; title: string; meta: string; href: string; cta: string; min: number }[];
  const planMin = plan.reduce((x, p) => x + p.min, 0);

  // Drei Module als Einstieg: aktuelles zuerst, dann Lernpfad-Reihenfolge
  const shelf = [...avail].sort((a, b) => (a.id === curMod ? -1 : b.id === curMod ? 1 : a.pathOrder - b.pathOrder)).slice(0, 3);

  return (
    <div className="page dash">
      <header className="page-head dash-head">
        <span className="eyebrow">Ihr persönlicher Lernarbeitsplatz</span>
        <h1>{isNew ? 'Willkommen im UmweltCampus.' : 'Wissen, das auf der Baustelle zählt.'}</h1>
        <p className="lead">{isNew ? 'Vom Bau-Polier und Sicherheitsspezialisten zum leitenden Umweltbeauftragten. Beginnen Sie mit der ersten Lektion – alles Weitere ergibt sich aus Ihren Antworten.' : 'Gezielt lernen, auf der Baustelle bessere Entscheide treffen, Verantwortung übernehmen.'}</p>
      </header>

      <LegacyNotice />

      {cont ? <ContinueHero lesson={cont.lesson} started={cont.started} /> : (
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Alle verfügbaren Lektionen abgeschlossen</span>
            <h2>Jetzt anwenden und prüfen.</h2>
            <p>Festigen Sie Ihr Wissen in den Baustellenfällen und in den Modulprüfungen. Weitere Module sind in Entwicklung.</p>
            <a className="btn sand hero-cta" href="#pruefung">Zum Prüfungstraining <Icon name="arrow" size={18} /></a>
          </div>
          <div className="hero-art"><ModuleIllustration moduleId="m1" /></div>
        </section>
      )}

      <div className="facts" role="list">
        <div className="fact" role="listitem"><span className="fact-cap">Abgeschlossene Lektionen</span><span className="fact-num">{doneLessons}<small> / {availLessons.length}</small></span><span className="fact-note">in {avail.length} verfügbaren Modulen</span></div>
        <a className="fact" role="listitem" href="#wiederholung"><span className="fact-cap">Wiederholungen fällig</span><span className="fact-num">{due}</span><span className="fact-note link">{due ? 'Heute auffrischen →' : 'Nichts fällig'}</span></a>
        <a className="fact" role="listitem" href="#simulator"><span className="fact-cap">Bearbeitete Fälle</span><span className="fact-num">{playedSims.length}</span><span className="fact-note">{passedSims.length} bestanden</span></a>
        <div className="fact" role="listitem"><span className="fact-cap">Lernzeit 7 Tage</span><span className="fact-num">{studyMinutes(s, 7)}<small> Min.</small></span><span className="fact-note">gesamt {studyMinutes(s)} Min.</span></div>
      </div>

      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head"><div><h2>Ihr Lernplan für heute</h2><span className="hint">{plan.length ? `ca. ${planMin} Min. · aus Ihrem Lernstand zusammengestellt` : 'Derzeit nichts offen'}</span></div><a href="#lernpfad" className="panel-link">Lernpfad <Icon name="arrow" size={16} /></a></div>
          {plan.length ? (
            <ul className="plan">
              {plan.map((p) => (
                <li key={p.href}>
                  <span className={'plan-ico tone-' + p.tone}><Icon name={p.icon} size={20} /></span>
                  <div className="plan-text"><strong>{p.title}</strong><span>{p.meta}</span></div>
                  <a className="btn small plan-go" href={p.href}>{p.cta} <Icon name="arrow" size={15} /></a>
                </li>
              ))}
            </ul>
          ) : <p className="hint">Alles erledigt, was derzeit verfügbar ist.</p>}
          {gaps.length > 0 && (
            <div className="gaps">
              <span className="eyebrow">Persönliche Wissenslücken</span>
              <ul className="gaplist">{gaps.map((g) => <li key={g.topic}><div><strong>{g.title}</strong><span className="hint"> {pct(g.accuracy)} richtig{g.dangerous.length ? ` · ${g.dangerous.length} Fehlannahme(n)` : ''}{g.unsureCorrect ? ` · ${g.unsureCorrect}× richtig, aber unsicher` : ''}</span></div></li>)}</ul>
            </div>
          )}
        </section>
        <section className="panel">
          <div className="panel-head"><div><h2>Ihre Fachentwicklung</h2><span className="hint">Vier Ebenen, getrennt gezählt – keine Gesamtnote</span></div><a href="#fortschritt" className="panel-link">Details <Icon name="arrow" size={16} /></a></div>
          <div className="layers">
            {avail.map((m) => (
              <div key={m.id} className="layer-mod">
                <div className="layer-title"><span className={'mini-ico tone-' + metaOf(m.id).tone}><Icon name={metaOf(m.id).icon} size={15} /></span><strong>{m.short}</strong></div>
                <LayerBars s={s} moduleId={m.id} />
              </div>
            ))}
          </div>
          <p className="rule"><Icon name="eye" size={15} /> «Angesehen» ist kein Nachweis. Beherrschung zeigt sich in Antworten, Fällen und bestätigter Praxis.</p>
        </section>
      </div>

      <section className="shelf">
        <div className="shelf-head"><div><h2>Ihre Fachmodule</h2><p className="hint">Strukturiertes Wissen für die Realität auf der Baustelle</p></div><a className="btn quiet" href="#module">Alle 12 Module <Icon name="arrow" size={16} /></a></div>
        <div className="mod-grid">{shelf.map((m) => <ModuleCard key={m.id} m={m} />)}</div>
      </section>
    </div>
  );
}

function ContinueHero({ lesson, started }: { lesson: (typeof LESSONS)[number]; started: boolean }) {
  const { s } = useStore();
  const m = MODULES.find((x) => x.id === lesson.moduleId)!;
  const inMod = LESSONS.filter((l) => l.moduleId === m.id);
  const p = s.lessons[lesson.id];
  const stepIdx = p ? Math.max(0, lesson.steps.findIndex((st) => st.id === p.cur)) : 0;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow">{started ? 'Weiterlernen' : 'Als Nächstes'} · Modul {String(m.no).padStart(2, '0')} · {m.short}</span>
        <h2 id="hero-title">{lesson.title}</h2>
        <p>{lesson.objectives[0]}{lesson.objectives.length > 1 ? ` – und ${lesson.objectives.length - 1} weitere Lernziele.` : '.'}</p>
        <div className="pill-line">
          <span><Icon name="clock" size={14} /> ca. {lesson.minutes} Min.</span>
          <span>{LEVEL_SHORT[lesson.level] ? `Stufe ${lesson.level} · ${LEVEL_SHORT[lesson.level]}` : `Stufe ${lesson.level}`}</span>
          <span>Lektion {lesson.order} / {inMod.length}</span>
          {started && <span>Schritt {stepIdx + 1} / {lesson.steps.length}</span>}
        </div>
        <a className="btn sand hero-cta" href={'#lektion-' + lesson.id}>{started ? 'Lektion fortsetzen' : 'Lektion starten'} <Icon name="arrow" size={18} /></a>
      </div>
      <div className="hero-art">
        <span className="hero-stamp">Technische Lernillustration · vereinfacht</span>
        <ModuleIllustration moduleId={m.id} />
      </div>
    </section>
  );
}

export function LayerBars({ s, moduleId }: { s: ReturnType<typeof useStore>['s']; moduleId: string }) {
  return (
    <ul className="layer-bars">
      {progressLayers(s, moduleId).map((x) => (
        <li key={x.key} className={'lb lb-' + x.key}>
          <span className="lb-l">{x.label}</span>
          <span className="lb-track" role="progressbar" aria-label={`${x.label}: ${x.done} von ${x.total} ${x.unit}`} aria-valuenow={x.done} aria-valuemin={0} aria-valuemax={x.total}><span style={{ width: (x.total ? (x.done / x.total) * 100 : 0) + '%' }} /></span>
          <span className="lb-v mono">{x.done}/{x.total}</span>
        </li>
      ))}
    </ul>
  );
}

export function ModuleCard({ m }: { m: (typeof MODULES)[number] }) {
  const { s } = useStore();
  const meta = metaOf(m.id);
  const avail = m.status === 'verfuegbar';
  const nLessons = LESSONS.filter((l) => l.moduleId === m.id).length;
  const done = LESSONS.filter((l) => l.moduleId === m.id && s.lessons[l.id]?.completedAt).length;
  return (
    <article className={'mod-card tone-' + meta.tone + (avail ? '' : ' dev')}>
      <div className="mod-top">
        <span className="mod-ico"><Icon name={meta.icon} size={26} /></span>
        <span className="mod-no">Modul {String(m.no).padStart(2, '0')}</span>
      </div>
      <h3>{avail ? <a href={'#modul-' + m.id} className="stretched">{m.title}</a> : m.title}</h3>
      <p>{meta.promise}</p>
      {avail && <div className="mini-bar" role="progressbar" aria-label={`Lektionen abgeschlossen: ${done} von ${nLessons}`} aria-valuenow={done} aria-valuemin={0} aria-valuemax={nLessons}><b style={{ width: (nLessons ? (done / nLessons) * 100 : 0) + '%' }} /></div>}
      <div className="mod-bottom">
        {avail ? <span className="tag">{done} / {nLessons} Lektionen</span> : <span className="tag ghost">In Entwicklung</span>}
        {avail ? <span className="mod-open" aria-hidden="true">{done ? 'Weiterlernen' : 'Öffnen'} <Icon name="arrow" size={15} /></span> : <span className="mod-open muted">{m.topics.length} Themen geplant</span>}
      </div>
    </article>
  );
}

export function LearningPath() {
  const { s } = useStore();
  const path = [...MODULES].sort((a, b) => a.pathOrder - b.pathOrder);
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Mein Lernen</span>
        <h1>Ihr Lernpfad.</h1>
        <p className="lead">Reihenfolge abgestimmt auf Ihr Ziel: zuerst die Themen mit dem grössten Risiko auf Baustellen, dann Planung, Begleitung und Managementsystem, zuletzt Strategie und Führung. Jede Stufe wird empfohlen, sobald die vorherige gefestigt ist – wiederholen können Sie jederzeit.</p>
      </header>
      <ol className="path-list">
        {path.map((m, i) => {
          const avail = m.status === 'verfuegbar';
          const rec = avail ? recommendedLevel(s, m.id) : 0;
          return (
            <li key={m.id} className={'path-item tone-' + metaOf(m.id).tone + (avail ? '' : ' dev')}>
              <span className="path-no">{i + 1}</span>
              <div className="path-body">
                <div className="row spread">
                  <h3 className="path-title"><span className="mini-ico"><Icon name={metaOf(m.id).icon} size={15} /></span>{avail ? <a href={'#modul-' + m.id}>Modul {m.no}: {m.title}</a> : <>Modul {m.no}: {m.title}</>}</h3>
                  {avail ? <span className="mono">{pct(moduleProgress(s, m.id))}</span> : <DevBadge />}
                </div>
                {avail ? (
                  <>
                    <Bar value={moduleProgress(s, m.id)} label={m.title} small />
                    <div className="levels">
                      {[1, 2, 3, 4].map((lvl) => {
                        const st = levelStats(s, m.id, lvl);
                        const state = lvl < rec ? 'solid' : lvl === rec ? 'current' : 'later';
                        return (
                          <div key={lvl} className={'lvl ' + state}>
                            <strong>Stufe {lvl}</strong> <span>{LEVEL_SHORT[lvl]}</span>
                            <span className="hint">{st.lessons ? `${st.lessonsDone}/${st.lessons} Lektionen · ` : ''}{st.n ? `${pct(st.acc)} richtig (${st.n})` : 'noch nicht geprüft'}</span>
                            <span className="lvl-state">{state === 'solid' ? 'gefestigt' : state === 'current' ? 'empfohlen' : 'später empfohlen'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : <p className="hint">{m.topics.slice(0, 6).join(' · ')}{m.topics.length > 6 ? ' …' : ''}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function ModulesView() {
  const [group, setGroup] = useState<'alle' | ModGroup>('alle');
  const [q, setQ] = useState('');
  const n = q.trim().toLowerCase();
  const list = MODULES.filter((m) => (group === 'alle' || metaOf(m.id).group === group) && (!n || [m.title, m.short, metaOf(m.id).promise, ...m.topics].join(' ').toLowerCase().includes(n)));
  const avail = MODULES.filter((m) => m.status === 'verfuegbar').length;
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Wissen systematisch aufbauen</span>
        <h1>Ihre Fachmodule.</h1>
        <p className="lead">Zwölf Module mit je vier Lernstufen – von den rechtlichen Grundlagen über die Baustellenpraxis bis zur fachlichen Führung. {avail} Module sind verfügbar, die übrigen in Entwicklung.</p>
      </header>
      <div className="toolbar" role="search">
        <div className="chips" role="group" aria-label="Nach Bereich filtern">
          {(['alle', 'praxis', 'recht', 'management'] as const).map((g) => (
            <button key={g} type="button" className={'chip' + (group === g ? ' on' : '')} aria-pressed={group === g} onClick={() => setGroup(g)}>{g === 'alle' ? 'Alle Themen' : MOD_GROUP_LABEL[g]}</button>
          ))}
        </div>
        <label className="search-field"><Icon name="search" size={18} /><input type="search" placeholder="Module und Themen durchsuchen …" aria-label="Module und Themen durchsuchen" value={q} onChange={(e) => setQ(e.target.value)} /></label>
      </div>
      {list.length ? <div className="mod-grid">{list.map((m) => <ModuleCard key={m.id} m={m} />)}</div> : <p className="hint">Keine passenden Module gefunden.</p>}
    </div>
  );
}

export function ModuleDetail({ id }: { id: string }) {
  const { s } = useStore();
  const m = MODULES.find((x) => x.id === id);
  if (!m) return <div className="page">Modul nicht gefunden.</div>;
  const meta = metaOf(m.id);
  if (m.status !== 'verfuegbar') return (
    <div className="page">
      <section className={'mod-hero tone-' + meta.tone}><span className="mod-ico big"><Icon name={meta.icon} size={34} /></span><div><span className="eyebrow">Modul {String(m.no).padStart(2, '0')} · In Entwicklung</span><h1>{m.title}</h1><p className="lead">{meta.promise}</p></div></section>
      <section className="section"><h2>Geplante Themen</h2><ul className="topic-list">{m.topics.map((t) => <li key={t}>{t}</li>)}</ul></section>
    </div>
  );
  const lessons = LESSONS.filter((l) => l.moduleId === id);
  const rec = recommendedLevel(s, id);
  const req = moduleRequirements(s, id);
  const tasks = TASKS.filter((t) => t.moduleId === id);
  const doneN = lessons.filter((l) => s.lessons[l.id]?.completedAt).length;
  return (
    <div className="page">
      <section className={'mod-hero tone-' + meta.tone}>
        <span className="mod-ico big"><Icon name={meta.icon} size={34} /></span>
        <div className="mod-hero-text">
          <span className="eyebrow">Modul {String(m.no).padStart(2, '0')} · empfohlene Stufe: {LEVEL_LABEL[rec]}</span>
          <h1>{m.title}</h1>
          <p className="lead">{meta.promise}</p>
          <div className="mod-hero-meta"><span>{lessons.length} Lektionen</span><span>{doneN} abgeschlossen</span><span>{(() => { const n = SCENARIOS.filter((x) => x.moduleId === id && x.status === 'verfuegbar').length; return `${n} Baustellenf${n === 1 ? 'all' : 'älle'}`; })()}</span><span>{tasks.length} Praxisaufträge</span></div>
        </div>
      </section>
      <p className="trust"><Icon name="alert" size={16} /> <span><strong>Prüfstatus Entwurf.</strong> Fachlich sorgfältig erstellt und extern KI-geprüft, aber nicht durch eine Fachperson am Originaltext freigegeben. Kantone, Gemeinden und Bewilligungen können zusätzliche Anforderungen stellen.</span></p>

      <section className="section">
        <div className="section-head"><h2>Ihr Weg durch die vier Lernstufen</h2><span className="hint">{pct(moduleProgress(s, id))} des Modulabschlusses</span></div>
        <ol className="level-path">
          {[1, 2, 3, 4].map((lvl) => {
            const st = levelStats(s, id, lvl);
            const ls = lessons.filter((l) => l.level === lvl);
            const state = lvl < rec ? 'solid' : lvl === rec ? 'current' : 'later';
            return (
              <li key={lvl} className={'lp ' + state}>
                <div className="lp-head">
                  <span className="lp-no">{state === 'solid' ? <Icon name="check" size={16} /> : lvl}</span>
                  <div><strong>Stufe {lvl} · {LEVEL_SHORT[lvl]}</strong><span className="hint">{state === 'solid' ? 'gefestigt' : state === 'current' ? 'empfohlen' : 'später empfohlen'}{st.n ? ` · ${pct(st.acc)} richtig (${st.n} Antworten)` : ' · noch nicht geprüft'}</span></div>
                </div>
                {ls.length > 0 ? (
                  <ol className="lessonlist">
                    {ls.map((l) => {
                      const p = s.lessons[l.id];
                      const pos = p ? Math.max(1, l.steps.findIndex((x) => x.id === p.cur) + 1) : 0;
                      const state2 = p?.completedAt ? 'abgeschlossen' : p ? `Schritt ${pos}/${l.steps.length}` : 'offen';
                      return (
                        <li key={l.id} className={(p?.completedAt ? 'done ' : '') + (l.level > rec ? 'ahead' : '')}>
                          <span className="ll-no">{p?.completedAt ? <Icon name="check" size={16} /> : l.order}</span>
                          <div>
                            <a href={'#lektion-' + l.id} className="stretched"><strong>{l.title}</strong></a>
                            <span className="hint">ca. {l.minutes} Min. · {state2}{l.level > rec ? ' · Stufe noch nicht empfohlen' : ''}</span>
                          </div>
                          {p && !p.completedAt && <span className="ll-bar" aria-hidden="true"><span style={{ width: (pos / l.steps.length) * 100 + '%' }} /></span>}
                        </li>
                      );
                    })}
                  </ol>
                ) : <p className="hint lp-empty">Auf dieser Stufe festigen Sie mit Fällen, Prüfung und Praxisaufträgen.</p>}
              </li>
            );
          })}
        </ol>
      </section>

      <div className="grid-2">
        <section className="section">
          <h2>Baustellenfälle</h2>
          <ul className="link-list">{SCENARIOS.filter((x) => x.moduleId === id).map((x) => <li key={x.id}><a href={'#szenario-' + x.id}><span className="code-chip">{x.code}</span><span><strong>{x.title}</strong><span className="hint">{x.setting} · Stufe {x.level} · ca. {x.minutes} Min.</span></span></a></li>)}</ul>
        </section>
        <section className="section">
          <h2>Praxisaufträge</h2>
          <ul className="plain">{tasks.map((t) => <li key={t.id} className="task-row"><span>{t.title}</span> <span className={'status-pill st-' + (s.practice[t.id]?.status ?? 'offen')}>{PRACTICE_LABEL[s.practice[t.id]?.status ?? 'offen']}</span></li>)}</ul>
          <a href="#werkzeuge" className="panel-link">In «Praxisaufträge & Werkzeuge» bearbeiten <Icon name="arrow" size={15} /></a>
        </section>
      </div>
      <section className="section">
        <h2>Modulabschluss</h2>
        <ul className="reqs">{req.map((r) => <li key={r.label} className={r.done ? 'done' : ''}><span className="req-mark">{r.done ? <Icon name="check" size={15} /> : null}</span> {r.label} <span className="hint">({r.detail})</span></li>)}</ul>
        <div><a className="btn" href="#pruefung">Zum Prüfungstraining <Icon name="arrow" size={16} /></a></div>
      </section>
    </div>
  );
}
