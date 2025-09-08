import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SevenUpDownPage from './SevenUpDownPage';
import RoulettePage from './RoulettePage';
import TeenPattiPage from './TeenPattiPage';
import './BPExchRSCPage.css';

export const BPExchRSCPage = ({ initialId = 900001 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeId = Number(searchParams.get('id') || initialId);

  // If user opens Teen Patti or Dragon Tiger via /Common/RSC, redirect to the dedicated route
  useEffect(() => {
    const p = (location.pathname || '').toLowerCase();
    if (p === '/common/rsc' || p === '/common/rsc/' || p === '/common/sap/rsc') {
      if (activeId === 900003) navigate('/games/teen-patti', { replace: true });
      if (activeId === 900004) navigate('/games/dragon-tiger', { replace: true });
    }
  }, [activeId, location.pathname, navigate]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await axios.get('/api/games');
        if (!ignore && data?.success && Array.isArray(data.games)) {
          setGames(data.games);
        }
      } catch (e) {
        console.warn('Failed to load games, lobby may be limited');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  // Only-Teen-Patti mode: when routed to /games/teen-patti or the active/initial id is 900003
  const onlyTeenPattiMode = useMemo(() => {
    const p = (location.pathname || '').toLowerCase();
    return p === '/games/teen-patti' || activeId === 900003 || initialId === 900003;
  }, [location.pathname, activeId, initialId]);

  const teenPattiFallback = { id: 900003, name: 'Teen Patti', image: 'https://cdn.dreamcasino.live/rg_teen_patti.webp' };

  const activeGame = useMemo(() => games.find(g => g.id === activeId) || null, [games, activeId]);

  const visibleGames = useMemo(() => {
    if (!onlyTeenPattiMode) return games;
    const tp = games.find(g => g.id === 900003);
    return tp ? [tp] : [teenPattiFallback];
  }, [games, onlyTeenPattiMode]);

  const headerTitle = onlyTeenPattiMode ? 'Teen Patti' : (activeGame?.name || 'Game');

  const handleSelect = (id) => {
    setSearchParams({ id: String(id), d: searchParams.get('d') || 'd' });
  };

  return (
    <div className="rsc3-layout">
      {/* Left: Lobby games vertical list */}
      <aside className="rsc3-lobby">
        <div className="lobby-header">
          <div className="badge">Lobby</div>
          <div className="brand">ROYAL GAMING</div>
        </div>
        <div className="lobby-search">
          <input placeholder="Search Game" />
        </div>
        <div className="lobby-list">
          {visibleGames.map(g => (
            <button
              key={g.id}
              className={`lobby-item ${activeId === g.id ? 'active' : ''}`}
              onClick={() => handleSelect(g.id)}
            >
              <img src={g.image} alt={g.name} />
              <div className="meta">
                <div className="name">{g.name}</div>
                <div className="players">{g.id}</div>
              </div>
            </button>
          ))}
          {!visibleGames.length && !loading && (
            <div className="empty">No games</div>
          )}
        </div>
      </aside>

      {/* Center: Game stage */}
      <section className="rsc3-stage">
        <div className="stage-header">
          <h2>{headerTitle}</h2>
          <div className="stage-actions">
            <button className="btn sm">Rules</button>
          </div>
        </div>
        <div className="stage-body">
          {onlyTeenPattiMode ? (
            <TeenPattiPage />
          ) : activeId === 900001 ? (
            <SevenUpDownPage />
          ) : activeId === 900002 ? (
            <RoulettePage />
          ) : activeId === 900003 ? (
            <TeenPattiPage />
          ) : (
            <div className="coming-soon">
              <div className="title">{activeGame?.name || 'Game'}</div>
              <div className="desc">Coming soon to RSC</div>
            </div>
          )}
        </div>
      </section>

      {/* Right: Exposure and bet slip */}
      <aside className="rsc3-slip">
        <div className="wallet">
          <div className="row">
            <span>Available Credit</span>
            <strong>100</strong>
          </div>
          <div className="row muted">
            <span>Exposure</span>
            <strong>0</strong>
          </div>
        </div>
        <div className="tabs">
          <button className="tab active">Open Bets</button>
          <button className="tab">Markets</button>
          <button className="tab">Odds</button>
          <button className="tab">Stake</button>
        </div>
        <div className="slip-empty">You have no bets</div>
      </aside>
    </div>
  );
};

export default BPExchRSCPage;