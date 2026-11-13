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
import { Icon } from './components/Icons';
import { L, MODULES, S } from './content';

type NavItem = { id: string; label: string; icon: string };
const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  { label: 'Mein Lernen', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'module', label: 'Fachmodule', icon: 'book' },
    { id: 'lernpfad', label: 'Lernpfad', icon: 'path' },
  ] },
  { label: 'Praxis & Training', items: [
    { id: 'simulator', label: 'Baustellensimulator', icon: 'sim' },
    { id: 'pruefung', label: 'Prüfungstraining', icon: 'exam' },
    { id: 'wiederholung', label: 'Wiederholungen', icon: 'review' },
    { id: 'werkzeuge', label: 'Praxisaufträge & Werkzeuge', icon: 'practice' },
  ] },
  { label: 'Nachschlagen', items: [
    { id: 'bibliothek', label: 'Fachbibliothek', icon: 'library' },
    { id: 'quellen', label: 'Quellen', icon: 'sources' },
  ] },
  { label: 'Persönlich', items: [
    { id: 'fortschritt', label: 'Lernfortschritt', icon: 'chart' },
    { id: 'einstellungen', label: 'Einstellungen', icon: 'settings' },
  ] },
];
const NAV_LABEL: Record<string, string> = Object.fromEntries(NAV_GROUPS.flatMap((g) => g.items.map((i) => [i.id, i.label])));

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
    case 'quellen': view = <LibraryView key="quellen" initialTab="quellen" />; break;
    case 'werkzeuge': view = <ToolsView />; break;
    case 'fortschritt': view = <ProgressView />; break;
    case 'einstellungen': view = <SettingsView />; break;
    default: view = <Dashboard />;
  }

  const syncLabel = { lokal: 'Gespeichert im Browser', verbinde: 'Verbinde …', konto: 'Gespeichert im Konto', fehler: 'Konto nicht erreichbar – lokal gespeichert', kein_speicher: 'Nicht gespeichert – bitte exportieren' }[sync];

  // Brotkrumen: Bereich / Detail
  const crumb = (() => {
    if (route.startsWith('lektion-')) { const l = L.get(route.slice(8)); const m = MODULES.find((x) => x.id === l?.moduleId); return [{ href: '#module', label: 'Fachmodule' }, ...(m ? [{ href: '#modul-' + m.id, label: 'Modul ' + m.no }] : []), { label: l ? 'Lektion ' + l.order : 'Lektion' }]; }
    if (route.startsWith('modul-')) { const m = MODULES.find((x) => x.id === route.slice(6)); return [{ href: '#module', label: 'Fachmodule' }, { label: m ? 'Modul ' + m.no : 'Modul' }]; }
    if (route.startsWith('szenario-')) { const sc = S.get(route.slice(9)); return [{ href: '#simulator', label: 'Baustellensimulator' }, { label: sc ? 'Fall ' + sc.code : 'Fall' }]; }
    return [{ label: NAV_LABEL[route] ?? 'Dashboard' }];
  })();

  return (
    <div className={'app' + (menu ? ' menu-open' : '')}>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <nav className={'sidenav' + (menu ? ' open' : '')} aria-label="Hauptnavigation" id="sidenav">
        <a href="#dashboard" className="brand">
          <span className="brand-mark" aria-hidden="true"><Icon name="ground" size={24} /></span>
          <span className="brand-text"><strong>UmweltCampus</strong><span>Bau CH · Academy</span></span>
        </a>
        <button type="button" className="nav-close" aria-label="Menü schliessen" onClick={() => setMenu(false)}><Icon name="close" /></button>
        {NAV_GROUPS.map((g) => (
          <div className="nav-group" key={g.label}>
            <span className="nav-glabel">{g.label}</span>
            <ul>
              {g.items.map((n) => (
                <li key={n.id}>
                  <a href={'#' + n.id} className={cur === n.id ? 'cur' : ''} aria-current={cur === n.id ? 'page' : undefined}>
                    <Icon name={n.icon} size={18} />
                    <span>{n.label}</span>
                    {n.id === 'wiederholung' && due > 0 && <span className="count" aria-label={`${due} fällig`}>{due}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="nav-goal">
          <span className="nav-glabel">Ihr Lernziel</span>
          <strong>Leitender Umweltbeauftragter</strong>
          <span>Vom Baustellenwissen zur fachlichen Verantwortung. Inhalte im Prüfstatus Entwurf – kein offizieller Abschluss.</span>
        </div>
      </nav>
      {menu && <button type="button" className="scrim" aria-label="Menü schliessen" onClick={() => setMenu(false)} />}
      <div className="workspace">
        <header className="topbar">
          <button type="button" className="menu-btn" aria-label="Menü öffnen" aria-expanded={menu} aria-controls="sidenav" onClick={() => setMenu(!menu)}><Icon name="menu" size={22} /></button>
          <nav className="crumbbar" aria-label="Pfad">
            <span className="crumb-root">UmweltCampus</span>
            {crumb.map((c, i) => <span key={i} className="crumb-part"><span aria-hidden="true">/</span>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</span>)}
          </nav>
          <div className="top-actions">
            <span className={'sync st-' + sync} title={syncLabel}>{syncLabel}</span>
            <button type="button" className="btn small quiet" onClick={() => openTerm('')}><Icon name="terms" size={16} /><span className="tb-l">Begriffe</span></button>
            <button type="button" className="btn small primary" onClick={() => setCoachOpen(true)}><Icon name="chat" size={16} /><span>Coach{ai ? '' : <span className="nokI"> (ohne KI)</span>}</span></button>
          </div>
        </header>
        <main className="main" id="main" tabIndex={-1}>{view}</main>
      </div>
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
