import React, { useEffect, useState } from 'react';
import './AdminPanelPage.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState({
    soccer: [
      { id: 1, name: 'Alaves v Sevilla / Match Odds', amount: 2953472 },
      { id: 2, name: 'Atl Tucuman v River Plate / Match Odds', amount: 228887 },
      { id: 3, name: 'AVS Futebol SAD v Benfica / Match Odds', amount: 6986039 },
      { id: 4, name: 'Brest v Nice / Match Odds', amount: 1633861 },
      { id: 5, name: 'Fulham v Brentford / Match Odds', amount: 1485114 },
      { id: 6, name: 'Guimaraes v Braga / Match Odds', amount: 133207 },
      { id: 7, name: 'Kansas City v Vancouver Whitecaps / Match Odds', amount: 78551 },
    ],
  });

  useEffect(() => {
    // Optionally load highlights from API later
  }, []);

  const onSearch = async () => {
    if (!username) return;
    setLoading(true);
    try {
      // Placeholder: navigate to users page with query
      navigate(`/admin/users?username=${encodeURIComponent(username)}`);
    } finally {
      setLoading(false);
    }
  };

  const refreshHighlights = () => {
    // Simulate refresh: randomize amounts slightly
    setSports((prev) => ({
      soccer: prev.soccer.map(r => ({ ...r, amount: Math.max(1000, Math.round(r.amount * (0.9 + Math.random()*0.2))) }))
    }));
  };

  const money = (n) => n.toLocaleString();

  return (
    <div className="adm-page">
      {/* Search Users */}
      <section className="adm-card">
        <header className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-icon-filter" aria-hidden /> Search-Users
          </div>
        </header>
        <div className="adm-block">
          <div className="adm-search">
            <input
              className="adm-input"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              onKeyDown={(e)=>{ if(e.key==='Enter') onSearch(); }}
            />
            <button className="adm-btn adm-btn-green" onClick={onSearch} disabled={loading}>
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      {/* Sport Highlights */}
      <section className="adm-card">
        <header className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" /> Sport Highlights
          </div>
          <button className="adm-btn adm-btn-badge" onClick={refreshHighlights}>Refresh</button>
        </header>

        <div className="adm-block">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Soccer</th>
                  <th style={{width:160}}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sports.soccer.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <a className="adm-link" href="#" onClick={(e)=>{e.preventDefault();}}>
                        {row.name} <span className="adm-dot" aria-hidden />
                      </a>
                    </td>
                    <td className="adm-amount">{money(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}