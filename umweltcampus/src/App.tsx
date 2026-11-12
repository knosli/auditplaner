import { useEffect, useState } from 'react';
import { StoreProvider, useStore, useStudyTimer } from './store';
import { Dashboard, LearningPath, ModuleDetail, ModulesView } from './views/Main';
import { LessonView } from './views/Lesson';
import { ScenarioPlayer, SimulatorView } from './views/Simulator';
import { ExamView } from './views/Exam';
import { ReviewView } from './views/Review';
import { LibraryView, ToolsView } from './views/Library';
import { ProgressView } from './views/Progress';
import { SettingsView } from './views/Settings';
import { CoachPanel, GlossaryDrawer } from './components/Drawers';
import { dueItems } from './lib/learning';

const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'lernpfad', label: 'Lernpfad' },
  { id: 'module', label: 'Fachmodule' },
  { id: 'simulator', label: 'Baustellensimulator' },
  { id: 'pruefung', label: 'Prüfungstraining' },
  { id: 'wiederholung', label: 'Wiederholungen' },
  { id: 'bibliothek', label: 'Wissensbibliothek' },
  { id: 'werkzeuge', label: 'Praxiswerkzeuge' },
  { id: 'fortschritt', label: 'Mein Fortschritt' },
  { id: 'einstellungen', label: 'Einstellungen' },
] as const;

function useHash() {
  const get = () => decodeURIComponent(location.hash.replace(/^#/, '')) || 'dashboard';
  const [h, setH] = useState(get);
  useEffect(() => {
    const on = () => setH(get());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return h;
}

function navOf(route: string): string {
  if (route.startsWith('lektion-') || route.startsWith('modul-')) return 'module';
  if (route.startsWith('szenario-')) return 'simulator';
  return route;
}

function Shell() {
  const route = useHash();
  const { s, sync, openTerm, setCoachOpen, toastMsg, ai } = useStore();
  const [menu, setMenu] = useState(false);
  const learning = /^(lektion-|szenario-|pruefung|wiederholung)/.test(route);
  useStudyTimer(learning);
  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0 });
  }, [route]);
  const due = dueItems(s).length;
  const cur = navOf(route);

  let view;
  if (route.startsWith('lektion-')) view = <LessonView id={route.slice(8)} />;
  else if (route.startsWith('modul-')) view = <ModuleDetail id={route.slice(6)} />;
  else if (route.startsWith('szenario-')) view = <ScenarioPlayer key={route} id={route.slice(9)} />;
  else switch (route) {
    case 'lernpfad': view = <LearningPath />; break;
    case 'module': view = <ModulesView />; break;
    case 'simulator': view = <SimulatorView />; break;
    case 'pruefung': view = <ExamView />; break;
    case 'wiederholung': view = <ReviewView />; break;
    case 'bibliothek': view = <LibraryView />; break;
    case 'werkzeuge': view = <ToolsView />; break;
    case 'fortschritt': view = <ProgressView />; break;
    case 'einstellungen': view = <SettingsView />; break;
    default: view = <Dashboard />;
  }

  const syncLabel = { lokal: 'Gespeichert im Browser', verbinde: 'Verbinde …', konto: 'Gespeichert im Konto', fehler: 'Konto nicht erreichbar – lokal gespeichert', kein_speicher: 'Nicht gespeichert – bitte exportieren' }[sync];

  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="menu-btn" aria-label="Menü" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
        <a href="#dashboard" className="brand">
          <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 15c3-3 6 3 9 0s6 3 9 0" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 9h18M8 9V4m8 5V4" fill="none" stroke="currentColor" strokeWidth="2" /></svg></span>
          <span>UmweltCampus <strong className="brand-sub">Bau CH</strong></span>
        </a>
        <div className="top-actions">
          <span className={'sync st-' + sync} title={syncLabel}>{syncLabel}</span>
          <button type="button" className="btn small" onClick={() => openTerm('')}>Begriffe</button>
          <button type="button" className="btn small primary" onClick={() => setCoachOpen(true)}>Coach{ai ? '' : <span className="nokI"> (ohne KI)</span>}</button>
        </div>
      </header>
      <nav className={'sidenav' + (menu ? ' open' : '')} aria-label="Hauptnavigation">
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a href={'#' + n.id} className={cur === n.id ? 'cur' : ''} aria-current={cur === n.id ? 'page' : undefined}>
                <span className="mono nav-no">{String(i + 1).padStart(2, '0')}</span>
                {n.label}
                {n.id === 'wiederholung' && due > 0 && <span className="count">{due}</span>}
              </a>
            </li>
          ))}
        </ol>
        <p className="nav-foot">Inhalte: Prüfstatus Entwurf. Kein offizieller Abschluss.</p>
      </nav>
      <main className="main" id="main">{view}</main>
      <GlossaryDrawer />
      <CoachPanel />
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
