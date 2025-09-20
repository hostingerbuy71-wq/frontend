import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

// Simple helper to transform a slug back to a title like "Udinese v AC Milan"
const fromSlug = (slug) => {
  try {
    const s = decodeURIComponent(slug).replace(/-/g, ' ');
    const parts = s.split(/\s+v\s+/i);
    if (parts.length === 2) {
      const toTitle = (t) => t.replace(/\b\w/g, (m) => m.toUpperCase());
      return `${toTitle(parts[0])} v ${toTitle(parts[1])}`;
    }
    return s.replace(/\b\w/g, (m) => m.toUpperCase());
  } catch {
    return slug;
  }
};

export default function AdminSoccerMatchPage(){
  const { slug } = useParams();
  const title = useMemo(() => fromSlug(slug || 'Match'), [slug]);

  // Example in-play meta and odds data
  const meta = {
    date: '20 Sep 23:45',
    status: 'InPlay',
    elapsed: '01:31:13',
    note: 'LIVE VIDEO ALSO UNMATCHED BETS ALLOWED'
  };

  const matchOdds = [
    { runner: 'Udinese', back: ['310', '440', '1000'], lay: ['414', '1000', '13.5K'] },
    { runner: 'AC Milan', back: ['1.01', '1.02', '1.03'], lay: ['12.7M', '193.5K', '—'] },
    { runner: 'The Draw', back: ['290', '390', '430'], lay: ['436', '390', '6.1K'] }
  ];

  const overUnder35 = [
    { runner: 'Under 3.5 Goals', odds: ['2.3','2.32','2.34','2.38','2.42'] },
    { runner: 'Over 3.5 Goals', odds: ['1.74','1.75','1.76','1.80','1.82'] }
  ];

  const overUnder45 = [
    { runner: 'Under 4.5 Goals', odds: ['1.22','1.23','1.24','1.26','1.27'] },
    { runner: 'Over 4.5 Goals', odds: ['—','—','—','—','—'] }
  ];

  return (
    <div className="match-page">
      <div className="match-header">
        <div className="match-title">
          <h2>{title} <span className="badge inplay">{meta.status}</span></h2>
          <div className="match-sub">
            <span className="date">{meta.date}</span>
            <span className="elapsed">Elapsed: <b>{meta.elapsed}</b></span>
          </div>
        </div>
        <div className="match-actions">
          <button className="btn btn-green">Bet Lock</button>
          <button className="btn btn-outline">User Book</button>
        </div>
      </div>

      <div className="match-grid">
        <section className="panel panel-main">
          <header className="panel-hd">
            <h3>Match Odds</h3>
          </header>
          <div className="panel-body">
            <div className="meta-strip">
              <div className="left">{meta.date}</div>
              <div className="right">Elapsed: <b>{meta.elapsed}</b></div>
            </div>
            <div className="alert-live">{meta.note}</div>
            <div className="odds-table-wrap">
              <table className="odds-table">
                <thead>
                  <tr>
                    <th>Runner</th>
                    <th className="c">Back</th>
                    <th className="c">Back</th>
                    <th className="c">Back</th>
                    <th className="c sep">Lay</th>
                    <th className="c">Lay</th>
                    <th className="c">Lay</th>
                  </tr>
                </thead>
                <tbody>
                  {matchOdds.map((r) => (
                    <tr key={r.runner}>
                      <td className="runner">{r.runner}</td>
                      {r.back.map((v, i) => (
                        <td key={`b-${i}`} className="back c">{v}</td>
                      ))}
                      {r.lay.map((v, i) => (
                        <td key={`l-${i}`} className="lay c">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <aside className="panel panel-side">
          <div className="side-tabs">
            <button className="tab active">Tv</button>
            <button className="tab">Score Card</button>
          </div>
          <div className="scorecard">
            <div className="teams">
              <span className="team">UDI</span>
              <span className="score">0 - 3</span>
              <span className="team">ACM</span>
            </div>
            <div className="timeline">2nd | 45+3' | 90</div>
          </div>

          <div className="side-panel">
            <h4>Open Bets (0)</h4>
            <div className="side-table empty">No open bets</div>
          </div>
          <div className="side-panel">
            <div className="side-head">
              <h4>Matched Bets (0)</h4>
              <Link to="#" className="link">Full Bet List</Link>
            </div>
            <div className="side-table empty">No matched bets</div>
          </div>
        </aside>
      </div>

      <section className="panel">
        <header className="panel-hd"><h3>Over/Under 3.5 Goals</h3></header>
        <div className="panel-body">
          <div className="odds-table-wrap">
            <table className="odds-table">
              <thead>
                <tr>
                  <th>Runner</th>
                  <th className="c">1</th><th className="c">2</th><th className="c">3</th><th className="c">4</th><th className="c">5</th>
                </tr>
              </thead>
              <tbody>
                {overUnder35.map((r) => (
                  <tr key={r.runner}>
                    <td className="runner">{r.runner}</td>
                    {r.odds.map((o, i) => (
                      <td key={i} className="c">{o}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="panel">
        <header className="panel-hd"><h3>Over/Under 4.5 Goals</h3></header>
        <div className="panel-body">
          <div className="odds-table-wrap">
            <table className="odds-table">
              <thead>
                <tr>
                  <th>Runner</th>
                  <th className="c">1</th><th className="c">2</th><th className="c">3</th><th className="c">4</th><th className="c">5</th>
                </tr>
              </thead>
              <tbody>
                {overUnder45.map((r) => (
                  <tr key={r.runner}>
                    <td className="runner">{r.runner}</td>
                    {r.odds.map((o, i) => (
                      <td key={i} className="c">{o}</td>
                    ))}
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