import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../../../pages/AdminPanelPage.css';

export default function AdminDashboardLayout() {
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [soccerOpen, setSoccerOpen] = useState(false);
  const [tennisOpen, setTennisOpen] = useState(false);
  const [cricketOpen, setCricketOpen] = useState(false);
  const [horseOpen, setHorseOpen] = useState(false);
  const [greyhoundOpen, setGreyhoundOpen] = useState(false);
  const navigate = useNavigate();
  const slugify = (name) => name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  const soccerFixtures = [
    'Udinese v AC Milan',
    'Nurnberg v Bochum',
    'Fulham v Brentford',
    'Valencia v Athletic'
  ];
  const tennisFixtures = [
    'Djokovic v Alcaraz',
    'Nadal v Sinner',
    'Gauff v Swiatek',
    'Medvedev v Zverev'
  ];
  const cricketFixtures = [
    'India v Pakistan',
    'Australia v England',
    'New Zealand v South Africa',
    'Sri Lanka v Bangladesh'
  ];
  const horseFixtures = [
    'Ascot – 14:30 Maiden Stakes',
    'Cheltenham – 15:10 Hurdle',
    'Epsom – 16:45 Handicap',
    'York – 18:00 Sprint'
  ];
  const greyhoundFixtures = [
    'Romford – Race 1',
    'Monmore – Race 3',
    'Nottingham – Race 5',
    'Belle Vue – Race 7'
  ];

  // detect mobile and initialize states
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false); // desktop collapse irrelevant on mobile
      } else {
        setSidebarOpenMobile(false); // ensure overlay closed when going desktop
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const linkClass = ({ isActive }) => `admin-link${isActive ? ' active' : ''}`;

  const toggleSidebar = () => {
    if (isMobile) setSidebarOpenMobile((v) => !v);
    else setCollapsed((v) => !v);
  };

  const onNavClick = () => {
    if (isMobile) setSidebarOpenMobile(false);
  };

  const shellClass = `admin-shell${collapsed ? ' collapsed' : ''}${sidebarOpenMobile ? ' show-sidebar' : ''}`;

  return (
    <div className={shellClass}>
      {/* Top navbar matching the screenshot */}
      <header className="admin-topbar">
        <div className="admin-brand admin-brand--light">BETPRO</div>
        <button
          className="admin-hamburger"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          onClick={toggleSidebar}
        >
          ≡
        </button>
        <nav className="admin-topnav" aria-label="Primary">
          <NavLink end to="/admin" className={({isActive})=>`admin-toplink ${isActive?'':''}`}>Dashboard</NavLink>
          <NavLink to="/admin/users" className={({isActive})=>`admin-toplink ${isActive?'active':''}`}>Users</NavLink>
          <NavLink to="/admin/reports" className={({isActive})=>`admin-toplink ${isActive?'active':''}`}>Reports</NavLink>
        </nav>
        <div style={{flex:1}} />
        <div className="admin-right">
          <button type="button" className="admin-user-toggle">
            Admin786 (SuperMaster) <span aria-hidden>▾</span>
          </button>
          <div className="admin-stats">
            <span><strong>B: 0</strong></span>
            <span><strong>Exp: 0</strong></span>
          </div>
        </div>
      </header>

      {/* Left sidebar */}
      <aside className="admin-sidebar" onClick={(e)=>e.stopPropagation()}>
        <nav className="admin-nav" aria-label="Admin Navigation">
          <NavLink to="/admin" end className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">⎈</span>
            <span className="admin-link-text">Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">👥</span>
            <span className="admin-link-text">Users</span>
          </NavLink>

          <NavLink to="/admin/positions" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">📍</span>
            <span className="admin-link-text">Current Position</span>
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">📑</span>
            <span className="admin-link-text">Reports</span>
          </NavLink>

          <NavLink to="/admin/bet-lock" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">🔒</span>
            <span className="admin-link-text">Bet Lock</span>
          </NavLink>

          <NavLink to="/admin/games/star-casino" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">⭐</span>
            <span className="admin-link-text">Star Casino</span>
          </NavLink>

          <NavLink to="/admin/world-casino" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">🌍</span>
            <span className="admin-link-text">World Casino</span>
          </NavLink>
          <NavLink to="/admin/betfair-games" className={linkClass} onClick={onNavClick}>
            <span className="admin-link-icon">🎮</span>
            <span className="admin-link-text">BetFair Games</span>
          </NavLink>

          {/* Soccer direct item */}
          <button type="button" className="admin-link" onClick={() => setSoccerOpen((v)=>!v)} aria-expanded={soccerOpen}>
            <span className="admin-link-icon">⚽</span>
            <span className="admin-link-text">Soccer</span>
            <span className="admin-caret" aria-hidden style={{marginLeft:'auto'}} />
          </button>
          {soccerOpen && (
            <div className="admin-matchlist">
              <div className="admin-matchlist-header"><span className="admin-link-icon">⚽</span><span>Soccer</span></div>
              <ul className="admin-matchlist-items">
                {soccerFixtures.map((m)=> (
                  <li key={m} className="admin-match-item">
                    <button type="button" className="admin-match-button" onClick={() => navigate(`/admin/soccer/${slugify(m.replace(/\s*v\s*/i,'-v-'))}`)}>
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tennis dropdown */}
          <button type="button" className="admin-link" onClick={() => setTennisOpen((v)=>!v)} aria-expanded={tennisOpen}>
            <span className="admin-link-icon">🎾</span>
            <span className="admin-link-text">Tennis</span>
            <span className="admin-caret" aria-hidden style={{marginLeft:'auto'}} />
          </button>
          {tennisOpen && (
            <div className="admin-matchlist">
              <div className="admin-matchlist-header"><span className="admin-link-icon">🎾</span><span>Tennis</span></div>
              <ul className="admin-matchlist-items">
                {tennisFixtures.map((m)=> (
                  <li key={m} className="admin-match-item">{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cricket dropdown */}
          <button type="button" className="admin-link" onClick={() => setCricketOpen((v)=>!v)} aria-expanded={cricketOpen}>
            <span className="admin-link-icon">🏏</span>
            <span className="admin-link-text">Cricket</span>
            <span className="admin-caret" aria-hidden style={{marginLeft:'auto'}} />
          </button>
          {cricketOpen && (
            <div className="admin-matchlist">
              <div className="admin-matchlist-header"><span className="admin-link-icon">🏏</span><span>Cricket</span></div>
              <ul className="admin-matchlist-items">
                {cricketFixtures.map((m)=> (
                  <li key={m} className="admin-match-item">{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Horse Race dropdown */}
          <button type="button" className="admin-link" onClick={() => setHorseOpen((v)=>!v)} aria-expanded={horseOpen}>
            <span className="admin-link-icon">🐎</span>
            <span className="admin-link-text">Horse Race</span>
            <span className="admin-caret" aria-hidden style={{marginLeft:'auto'}} />
          </button>
          {horseOpen && (
            <div className="admin-matchlist">
              <div className="admin-matchlist-header"><span className="admin-link-icon">🐎</span><span>Horse Race</span></div>
              <ul className="admin-matchlist-items">
                {horseFixtures.map((m)=> (
                  <li key={m} className="admin-match-item">{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Greyhound dropdown */}
          <button type="button" className="admin-link" onClick={() => setGreyhoundOpen((v)=>!v)} aria-expanded={greyhoundOpen}>
            <span className="admin-link-icon">🐕</span>
            <span className="admin-link-text">Greyhound</span>
            <span className="admin-caret" aria-hidden style={{marginLeft:'auto'}} />
          </button>
          {greyhoundOpen && (
            <div className="admin-matchlist">
              <div className="admin-matchlist-header"><span className="admin-link-icon">🐕</span><span>Greyhound</span></div>
              <ul className="admin-matchlist-items">
                {greyhoundFixtures.map((m)=> (
                  <li key={m} className="admin-match-item">{m}</li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </aside>

      {/* Backdrop for mobile when sidebar is open */}
      {isMobile && sidebarOpenMobile && (
        <button
          className="admin-overlay"
          aria-label="Close sidebar"
          title="Close sidebar"
          onClick={() => setSidebarOpenMobile(false)}
        />
      )}

      <main className="admin-content" onClick={() => { if (isMobile && sidebarOpenMobile) setSidebarOpenMobile(false); }}>
        <Outlet />
      </main>
    </div>
  );
}