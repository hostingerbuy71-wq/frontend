import React from 'react';
import './AdminPanelPage.css';

export default function AdminWorldCasinoPage(){
  return (
    <div className="admin-page">
      <div className="match-grid">
        <section className="panel panel-main">
          <header className="panel-hd">
            <h3>No Active Market found!</h3>
          </header>
          <div className="panel-body">
            <div className="alert-live" style={{background:'#e8f7ea', borderColor:'#b7e2c1', color:'#1a7f37'}}>
              No Active Market found!
            </div>
            <div style={{minHeight:'58vh'}} />
          </div>
        </section>
        <aside className="panel panel-side">
          <section className="panel">
            <header className="panel-hd"><h3>Open Bets (0)</h3></header>
            <div className="panel-body">
              <div className="side-table empty">No open bets</div>
            </div>
          </section>
          <section className="panel">
            <header className="panel-hd" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h3>Matched Bets (0)</h3>
              <button className="btn btn-green">Full Bet list</button>
            </header>
            <div className="panel-body">
              <div className="side-table empty">No matched bets</div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}