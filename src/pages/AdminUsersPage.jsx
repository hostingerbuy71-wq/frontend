import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanelPage.css';

export default function AdminUsersPage(){
  const navigate = useNavigate();

  const handleNewUserClick = () => {
    navigate('/admin/users/new');
  };

  return (
    <div className="adm-page" style={{padding:16}}>
      {/* Report Type */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" />
            <span>Report Type</span>
          </div>
        </div>
        <div className="adm-tabs">
          <button className="adm-tab">Book Detail</button>
          <button className="adm-tab">Book Detail 2</button>
          <button className="adm-tab">Daily PL</button>
          <button className="adm-tab">Daily Report</button>
          <button className="adm-tab">Final Sheet</button>
          <button className="adm-tab adm-tab--active">Accounts</button>
          <button className="adm-tab">Commission Report</button>
        </div>
      </section>

      {/* Search Users */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-card-header">
          <div className="adm-card-title">
            <span className="adm-caret" />
            <span>Search-Users</span>
          </div>
        </div>
        <div className="adm-block">
          <div className="adm-search">
            <input className="adm-input" placeholder="Username" />
            <button className="adm-btn-green">Search</button>
          </div>
        </div>
      </section>

      {/* Clients List header */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-block">
          <h3 className="adm-subtitle" style={{marginBottom:12}}>
            <strong>Admin786</strong> - Clients List | Default
          </h3>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Credit Remaining</th>
                  <th>Cash</th>
                  <th>P/L Downline</th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:12,alignItems:'center'}}>
            <button className="adm-btn-green" onClick={handleNewUserClick}>New User</button>
            <button className="adm-btn-green" style={{display:'inline-flex',alignItems:'center',gap:6}}>
              <span role="img" aria-label="ledger">📒</span> Account Ledger
            </button>
            <div style={{marginLeft:'auto',display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <span className="adm-badge adm-badge--yellow">C</span>
              <span>Cash / Credit</span>
              <span className="adm-badge adm-badge--teal" title="Edit">✏️</span>
              <span>Edit</span>
              <span className="adm-badge adm-badge--blue">L</span>
              <span>Ledger</span>
              <span className="adm-badge adm-badge--green">A</span>
              <span>Active</span>
              <span className="adm-badge adm-badge--red">D</span>
              <span>InActive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom green toolbar table */}
      <section className="adm-card" style={{marginBottom:16}}>
        <div className="adm-toolbar adm-toolbar--green">
          <button className="adm-btn-yellow">Load Balance</button>
          <div className="adm-toolbar-right">
            <label className="adm-label">Search:</label>
            <input className="adm-input" placeholder="" />
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Type</th>
                <th>Credit</th>
                <th>Balance</th>
                <th>Client (P/L)</th>
                <th>Share</th>
                <th>Exposure</th>
                <th>Available Balance</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9} className="adm-empty">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="adm-table-footer">
          <span>Showing 0 to 0 of 0 entries</span>
        </div>
      </section>
    </div>
  );
}