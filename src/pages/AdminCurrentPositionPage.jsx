import React, { useState } from 'react';
import './AdminPanelPage.css';

export default function AdminCurrentPositionPage() {
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    // TODO: hook to real API once ready
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <div className="admin-page">
      <section className="panel">
        <header className="panel-hd" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h3 style={{ marginRight: 'auto' }}>Market Position</h3>
          <button className="btn btn-green" onClick={onRefresh} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </header>
        <div className="panel-body">
          {/* Placeholder content area to match screenshot */}
          <div style={{ minHeight: '60vh', background: '#e5e7eb', borderRadius: 4 }} />
        </div>
      </section>
    </div>
  );
}