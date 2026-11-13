import { LESSONS, LEVEL_LABEL, LEVEL_SHORT, MODULES, SCENARIOS, TASKS } from '../content';
import { useStore } from '../store';
import { Bar, DevBadge, Section, pct, fmtDateTime } from '../components/ui';
import { dueItems, knowledgeGaps, levelStats, moduleProgress, moduleRequirements, overallProgress, recommendations, recommendedLevel, studyMinutes, topicCompetence } from '../lib/learning';
import { PRACTICE_LABEL } from '../components/Practice';
import { LegacyNotice } from './Progress';
import { isLegacyRun } from '../lib/versioning';

export function Dashboard() {
  const { s } = useStore();
  const recs = recommendations(s);
  const comp = topicCompetence(s);
  const gaps = knowledgeGaps(s).slice(0, 3);
  const due = dueItems(s).length;
  const doneLessons = LESSONS.filter((l) => s.lessons[l.id]?.completedAt).length;
  const lastScen = Object.entries(s.scenarios).flatMap(([id, runs]) => runs.map((r) => ({ id, ...r }))).sort((a, b) => b.at - a.at).slice(0, 3);
  const isNew = !Object.keys(s.lessons).length;
  return (
    <div className="page">
      <header className="page-head dash-head">
        <div>
          <span className="eyebrow">Persönliche Weiterbildung · Deutschschweiz</span>
          <h1>{isNew ? 'Willkommen im UmweltCampus Bau CH' : 'Ihr Lernstand'}</h1>
          <p className="lead">{isNew ? 'Vom Bau-Polier und Sicherheitsspezialisten zum leitenden Umweltbeauftragten: Sie beginnen mit dem ausführlich ausgearbeiteten Modul Gewässerschutz auf Baustellen.' : 'Kompetenz wird hier an Anwendung und Begründung gemessen, nicht an Klicks.'}</p>
        </div>
      </header>

      <LegacyNotice />
      <div className="kpis">
        <div className="kpi"><span className="eyebrow">Gesamtfortschritt (12 Module)</span><span className="kpi-v mono">{pct(overallProgress(s))}</span><Bar value={overallProgress(s)} label="Gesamtfortschritt" small /></div>
        <div className="kpi"><span className="eyebrow">Lektionen abgeschlossen</span><span className="kpi-v mono">{doneLessons}/{LESSONS.length}</span><span className="hint">verfügbar in Modul 2</span></div>
        <div className="kpi"><span className="eyebrow">Wiederholungen fällig</span><span className="kpi-v mono">{due}</span><a href="#wiederholung" className="hint">öffnen →</a></div>
        <div className="kpi"><span className="eyebrow">Lernzeit 7 Tage</span><span className="kpi-v mono">{studyMinutes(s, 7)} min</span><span className="hint">gesamt {studyMinutes(s)} min</span></div>
      </div>

      <div className="grid-2">
        <Section title="Empfohlener nächster Schritt">
          {recs.length ? (
            <ol className="recs">
              {recs.map((r, i) => (
                <li key={i} className={'rec rec-' + r.kind}>
                  <a href={r.href}><strong>{r.title}</strong></a>
                  <span className="hint">{r.why}</span>
                </li>
              ))}
            </ol>
          ) : <p>Alles erledigt, was derzeit verfügbar ist. Neue Module sind in Entwicklung.</p>}
        </Section>
        <Section title="Kompetenz Gewässerschutz" aside={<a href="#fortschritt" className="hint">Details →</a>}>
          <ul className="mini-comp">
            {comp.map((c) => (
              <li key={c.topic}>
                <span>{c.title}</span>
                <span className="stage-dots" aria-label={`Stufe ${c.stage} von 5`}>{[1, 2, 3, 4, 5].map((n) => <span key={n} className={'dot' + (c.stage >= n ? ' on s' + n : '')} />)}</span>
              </li>
            ))}
          </ul>
          <p className="hint legend">Punkte: angesehen · abgefragt · sicher beherrscht · im Fall angewendet · in der Praxis bestätigt</p>
        </Section>
      </div>

      <div className="grid-2">
        <Section title="Persönliche Wissenslücken">
          {gaps.length ? <ul className="gaplist">{gaps.map((g) => <li key={g.topic}><div><strong>{g.title}</strong><span className="hint"> {pct(g.accuracy)} richtig{g.dangerous.length ? ` · ${g.dangerous.length} Fehlannahme(n)` : ''}{g.unsureCorrect ? ` · ${g.unsureCorrect}× richtig, aber unsicher` : ''}</span></div></li>)}</ul>
            : <p className="hint">Noch keine Lücken erkannt. Sie entstehen aus Ihren Antworten und Ihrer Sicherheitseinschätzung.</p>}
        </Section>
        <Section title="Letzte Baustellenfälle">
          {lastScen.length ? <ul className="plain">{lastScen.map((r) => { const sc = SCENARIOS.find((x) => x.id === r.id); return <li key={r.at}><a href={'#szenario-' + r.id}>Fall {sc?.code}: {sc?.title}</a> <span className="mono">{pct(r.objective ?? r.total)}</span> {isLegacyRun(r.id, r) ? <span className="status-pill">frühere Bewertungsfassung</span> : r.passed ? <span className="status-pill st-bestaetigt">bestanden</span> : <span className="status-pill st-in_arbeit">nicht bestanden</span>}<span className="hint"> {fmtDateTime(r.at)}</span></li>; })}</ul>
            : <p className="hint">Noch kein Fall gespielt. <a href="#simulator">Zum Simulator</a></p>}
        </Section>
      </div>
    </div>
  );
}

export function LearningPath() {
  const { s } = useStore();
  const path = [...MODULES].sort((a, b) => a.pathOrder - b.pathOrder);
  return (
    <div className="page">
      <header className="page-head">
        <h1>Lernpfad</h1>
        <p className="lead">Reihenfolge abgestimmt auf Ihr Ziel: zuerst die Themen mit dem grössten Risiko auf Baustellen, dann Planung, Begleitung und Managementsystem, zuletzt Strategie und Führung. Jede Stufe wird empfohlen, sobald die vorherige gefestigt ist – wiederholen können Sie jederzeit.</p>
      </header>
      <ol className="path-list">
        {path.map((m, i) => {
          const avail = m.status === 'verfuegbar';
          const rec = avail ? recommendedLevel(s, m.id) : 0;
          return (
            <li key={m.id} className={'path-item' + (avail ? '' : ' dev')}>
              <span className="path-no mono">{i + 1}</span>
              <div className="path-body">
                <div className="row spread">
                  <h3>{avail ? <a href={'#modul-' + m.id}>Modul {m.no}: {m.title}</a> : <>Modul {m.no}: {m.title}</>}</h3>
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
  const { s } = useStore();
  return (
    <div className="page">
      <header className="page-head">
        <h1>Fachmodule</h1>
        <p className="lead">Zwölf Module mit je vier Stufen. Modul 2 ist vollständig ausgearbeitet; die übrigen Module sind mit ihren geplanten Themen aufgeführt und als «In Entwicklung» gekennzeichnet.</p>
      </header>
      <div className="modgrid">
        {MODULES.map((m) => {
          const avail = m.status === 'verfuegbar';
          return (
            <article key={m.id} className={'mod' + (avail ? ' avail' : '')}>
              <span className="mod-no mono">{String(m.no).padStart(2, '0')}</span>
              <h3>{avail ? <a href={'#modul-' + m.id}>{m.title}</a> : m.title}</h3>
              {avail ? <><Bar value={moduleProgress(s, m.id)} label={m.title} small /><span className="hint">{LESSONS.filter((l) => l.moduleId === m.id).length} Lektionen · {pct(moduleProgress(s, m.id))}</span></> : <DevBadge />}
              {m.deep && <span className="badge">vertieft ausgearbeitet</span>}
              <details>
                <summary>Themen ({m.topics.length})</summary>
                <ul>{m.topics.map((t) => <li key={t}>{t}</li>)}</ul>
              </details>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ModuleDetail({ id }: { id: string }) {
  const { s } = useStore();
  const m = MODULES.find((x) => x.id === id);
  if (!m) return <div className="page">Modul nicht gefunden.</div>;
  if (m.status !== 'verfuegbar') return <div className="page"><h1>Modul {m.no}: {m.title}</h1><DevBadge /><p>Dieses Modul ist in Entwicklung. Geplante Themen:</p><ul>{m.topics.map((t) => <li key={t}>{t}</li>)}</ul></div>;
  const lessons = LESSONS.filter((l) => l.moduleId === id);
  const rec = recommendedLevel(s, id);
  const req = moduleRequirements(s, id);
  const tasks = TASKS.filter((t) => t.moduleId === id);
  return (
    <div className="page">
      <nav className="crumbs"><a href="#module">Fachmodule</a> / <span>Modul {m.no}</span></nav>
      <header className="page-head">
        <span className="eyebrow">Modul {m.no} · empfohlene Stufe: {LEVEL_LABEL[rec]}</span>
        <h1>{m.title}</h1>
        <Bar value={moduleProgress(s, id)} label="Modulfortschritt" />
      </header>
      <div className="callout law"><span className="callout-label">Verlässlichkeit</span><span>Alle Inhalte stehen auf Prüfstatus «Entwurf»: fachlich sorgfältig erstellt, aber noch nicht durch eine Fachperson gegen die aktuellen Originalquellen geprüft. Rechtsartikel sind sinngemäss wiedergegeben. Kantone, Gemeinden und Bewilligungen können zusätzliche Anforderungen stellen.</span></div>
      <Section title="Lektionen">
        <ol className="lessonlist">
          {lessons.map((l) => {
            const p = s.lessons[l.id];
            const state = p?.completedAt ? 'abgeschlossen' : p ? `Schritt ${Math.max(1, l.steps.findIndex((st) => st.id === p.cur) + 1)}/${l.steps.length}` : 'offen';
            return (
              <li key={l.id} className={(p?.completedAt ? 'done ' : '') + (l.level > rec ? 'ahead' : '')}>
                <span className="mono">{l.order}</span>
                <div>
                  <a href={'#lektion-' + l.id}><strong>{l.title}</strong></a>
                  <span className="hint">Stufe {l.level} · {LEVEL_SHORT[l.level]} · ca. {l.minutes} Min. · {state}{l.level > rec ? ' · Stufe noch nicht empfohlen' : ''}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>
      <div className="grid-2">
        <Section title="Baustellenfälle">
          <ul className="plain">{SCENARIOS.filter((x) => x.moduleId === id).map((x) => <li key={x.id}><a href={'#szenario-' + x.id}>Fall {x.code}: {x.title}</a> <span className="hint">Stufe {x.level}</span></li>)}</ul>
        </Section>
        <Section title="Praxisaufträge">
          <ul className="plain">{tasks.map((t) => <li key={t.id}>{t.title} <span className="hint">{PRACTICE_LABEL[s.practice[t.id]?.status ?? 'offen']}</span></li>)}</ul>
          <a href="#werkzeuge" className="hint">In den Praxiswerkzeugen bearbeiten →</a>
        </Section>
      </div>
      <Section title="Modulabschluss">
        <ul className="reqs">{req.map((r) => <li key={r.label} className={r.done ? 'done' : ''}><span className="mono">{r.done ? '✓' : '○'}</span> {r.label} <span className="hint">({r.detail})</span></li>)}</ul>
        <a className="btn" href="#pruefung">Zum Prüfungstraining</a>
      </Section>
    </div>
  );
}
