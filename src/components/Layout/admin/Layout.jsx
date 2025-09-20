import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../../../pages/AdminPanelPage.css';

export default function AdminDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sportsOpen, setSportsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

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

          <NavLink to="/admin/position" className={linkClass} onClick={onNavClick}>
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

          <NavLink to="/admin/star-casino" className={linkClass} onClick={onNavClick}>
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

          <div className={`admin-group${sportsOpen ? ' open' : ''}`}>
            <button
              type="button"
              className="admin-group-toggle"
              onClick={() => setSportsOpen((v) => !v)}
              aria-expanded={sportsOpen}
            >
              <span className="admin-link-icon">⚽</span>
              <span className="admin-link-text">Sports</span>
              <span className="admin-caret" aria-hidden />
            </button>
            {sportsOpen && (
              <div className="admin-subnav">
                <NavLink to="/admin/soccer" className={linkClass} onClick={onNavClick}>
                  <span className="admin-link-text">Soccer</span>
                </NavLink>
                <NavLink to="/admin/tennis" className={linkClass} onClick={onNavClick}>
                  <span className="admin-link-text">Tennis</span>
                </NavLink>
              </div>
            )}
          </div>
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