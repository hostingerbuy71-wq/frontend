import React, { useEffect, useState } from 'react';
import './AdminPanelPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

const Avatar = ({ name }) => {
  const letter = name?.[0]?.toUpperCase?.() || 'U';
  return <div className="ap-avatar" aria-hidden>{letter}</div>;
};

const StatusPill = ({ status }) => {
  const key = String(status || '').toLowerCase().replace(/\s+/g, '-');
  return <span className={`ap-status ap-status-${key}`}>{status}</span>;
};

const TypeBadge = ({ type }) => {
  const key = String(type || '').toLowerCase().replace(/\s+/g, '-');
  return <span className={`ap-type ap-type-${key}`}>{type}</span>;
};

const Row = ({ date, user, txId, type, amount, status }) => {
  const sign = amount >= 0 ? '+' : '-';
  const formatted = Math.abs(amount).toLocaleString();
  return (
    <tr>
      <td className="ap-col-date">{date}</td>
      <td className="ap-col-user">
        <Avatar name={user} />
        <div className="ap-user-meta">
          <div className="ap-user-name">{user}</div>
          <div className="ap-user-sub">#{txId}</div>
        </div>
      </td>
      <td className="ap-col-type"><TypeBadge type={type} /></td>
      <td className={`ap-col-amount ${amount >= 0 ? 'ap-pos' : 'ap-neg'}`}>{sign}{formatted}.00</td>
      <td className="ap-col-status"><StatusPill status={status} /></td>
      <td className="ap-col-actions"><button className="ap-btn-icon" aria-label="Actions">⋯</button></td>
    </tr>
  );
};

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!API_BASE || !token) return;
    fetch(`${API_BASE}/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => (r.ok ? r.json() : null))
      .then(res => { if (res?.success && res?.data?.user) setUser(res.data.user); })
      .catch(() => {});
  }, []);

  const rows = [
    { date: 'Dec 15, 2024', user: 'John Doe', txId: 'JD1245', type: 'Deposit', amount: 45200, status: 'Completed' },
    { date: 'Dec 14, 2024', user: 'Sarah', txId: 'SR0099', type: 'Withdrawal', amount: -1300, status: 'Pending' },
    { date: 'Dec 14, 2024', user: 'Mike Johnson', txId: 'MJ043221', type: 'Bet Win', amount: 4800, status: 'Completed' },
    { date: 'Dec 14, 2024', user: 'Emma', txId: 'EM7771', type: 'Transfer', amount: 500, status: 'Completed' },
    { date: 'Dec 14, 2024', user: 'Alex Brown', txId: 'AB013797', type: 'Bet Loss', amount: -5200, status: 'Cancelled' },
  ];
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      if (API_BASE && token) {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Logout request failed', e);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const displayName = user?.fullName || user?.username || 'User';
  const initial = displayName?.[0]?.toUpperCase?.() || 'U';
  const goProfile = () => navigate('/user-dashboard');
  const goStatement = () => navigate('/user-dashboard');
  const goBalance = () => navigate('/user-dashboard');

  return (
    <div className="ap-page">
      {/* Topbar */}
      <div className="table-wrap d-flex gap-4 "
        style={{ width: '100%', position: 'sticky', top: 0, zIndex: 999, background: '#121212' }}>
        <div className="dashboard-topbar"
          style={{ position: 'sticky', top: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: '#121212', color: '#ffffff', padding: vw < 576 ? '6px 10px' : '8px 12px', borderRadius: '6px', boxShadow: '0 4px 10px rgba(0,0,0,0.35)', flexWrap: 'wrap', gap: '8px 12px' }}>
          {/* Left */}
          <div className="">
            <Link to={'/user-dashboard'} className="mt-5 mt-md-0" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', fontWeight: 600, textDecoration: 'none', color: 'white' }}>Dashboard</Link>
          </div>
          {/* Center */}
          <div className="text-center d-flex justify-content-center align-items-center" style={{ color: '#cfcfcf', fontSize: 'clamp(12px, 1.4vw, 14px)', display: vw < 576 ? 'none' : 'block' }}>Welcome To Premium Exchange !</div>
          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: vw < 576 ? '8px' : '12px', justifyContent: 'flex-end', minWidth: 260 }}>
            <span style={{ fontWeight: 600, fontSize: 'clamp(12px, 1.6vw, 14px)' }}>Bal: 100,000</span>
            <span style={{ color: '#cfcfcf' }}>|</span>
            {vw >= 420 && <span style={{ fontSize: 'clamp(12px, 1.6vw, 14px)' }}>loss: 100</span>}

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="outline-light"
                size="sm"
                id="user-menu-toggle"
                style={{ display: 'flex', alignItems: 'center', gap: 8, borderColor: '#F04141', color: '#fff', backgroundColor: 'transparent' }}
              >
                <div
                  style={{
                    width: vw < 576 ? 24 : 28,
                    height: vw < 576 ? 24 : 28,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid #F04141',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffebe9',
                    color: '#F04141',
                    fontWeight: 700,
                    fontSize: vw < 576 ? 12 : 14
                  }}
                  aria-label="profile-avatar"
                  title="Profile"
                >
                  {initial}
                </div>
                {vw >= 480 && <span style={{ fontSize: 12 }}>{displayName}</span>}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark" className="user-menu" style={{ minWidth: 180 }}>
                <Dropdown.Item onClick={goProfile} className="text-light">Profile</Dropdown.Item>
                <Dropdown.Item onClick={goStatement} className="text-light">Statement</Dropdown.Item>
                <Dropdown.Item onClick={goBalance} className="text-light">Balance</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-light">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* rest of page */}
      <div className="ap-grid">


        {/* Banking History (left) */}
        <section className="ap-panel ap-banking">

          <header className="ap-panel-header">
            <div className="ap-title">Banking History</div>
            <div className="ap-actions">
              <input className="ap-input ap-search" placeholder="Search" />
              <select className="ap-input ap-select" defaultValue="all"> 
                <option value="all">All Accounts</option>
                <option value="main">Main</option>
                <option value="bonus">Bonus</option>
              </select>
              <select className="ap-input ap-select" defaultValue="30"> 
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </header>

          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <Row key={i} {...r} />
                ))}
              </tbody>
            </table>
          </div>

          <footer className="ap-table-footer">
            <div>Showing 1–5 of 150 transactions</div>
            <div className="ap-pager">
              <button className="ap-btn ap-btn-sm" disabled>Previous</button>
              <button className="ap-btn ap-btn-sm ap-active">1</button>
              <button className="ap-btn ap-btn-sm">2</button>
              <button className="ap-btn ap-btn-sm">3</button>
              <button className="ap-btn ap-btn-sm">Next</button>
            </div>
          </footer>
        </section>

        {/* Right column memo and summaries */}
        <aside className="ap-right">
          <section className="ap-panel ap-memo">
            <header className="ap-panel-header">
              <div className="ap-title">Today’s Cash Memo</div>
              <div className="ap-date">December 15, 2024</div>
            </header>
            <div className="ap-metrics">
              <div className="ap-metric"><span>Opening Balance</span><b className="ap-pos">+456,670.00</b></div>
              <div className="ap-metric"><span>Total Deposits</span><b className="ap-pos">+125,000.00</b></div>
              <div className="ap-metric"><span>Total Withdrawals</span><b className="ap-neg">-23,450.00</b></div>
              <div className="ap-metric"><span>Total Betting</span><b>-</b></div>
              <div className="ap-metric"><span>Betting Revenue</span><b className="ap-pos">+18,350.00</b></div>
            </div>
          </section>

          <section className="ap-panel ap-pending">
            <div className="ap-subtitle">Pending Transactions</div>
            <div className="ap-list">
              <div className="ap-list-row"><span>Withdrawals</span><b>$4,920.00</b></div>
              <div className="ap-list-row"><span>Deposits</span><b>$3,200.00</b></div>
              <div className="ap-list-row"><span>Verifications</span><b>7 accounts</b></div>
            </div>
          </section>

          <section className="ap-panel ap-summary">
            <div className="ap-subtitle">Daily Summary</div>
            <ul className="ap-bullets">
              <li><b>Net Profit:</b> <span className="ap-pos">$48,053.00</span></li>
              <li><b>Growth:</b> +1.6% from yesterday</li>
              <li><b>Active Users:</b> 1,247</li>
            </ul>
            <button className="ap-btn ap-btn-green">Print Cash Memo</button>
          </section>
        </aside>

        {/* Payment method (bottom full width) */}
        <section className="ap-panel ap-payment ap-full">
          <h3 className="ap-title">Choose Payment Method</h3>
          <p className="ap-muted">Select your preferred way to pay</p>

          <div className="ap-card ap-bank-card">
            <div className="ap-bank-left">
              <Avatar name="Chase" />
              <div>
                <div className="ap-bank-name">Chase Bank</div>
                <div className="ap-bank-sub">Checking •••• 4567</div>
                <div className="ap-verified">Verified</div>
              </div>
            </div>
            <div className="ap-bank-right">
              <input type="radio" name="bank" defaultChecked />
            </div>
          </div>

          <button className="ap-btn ap-btn-outline ap-btn-block">+ Change Bank Account</button>

          <div className="ap-methods">
            <div className="ap-card ap-method">
              <div>
                <div className="ap-method-title">Credit Card</div>
                <div className="ap-muted">Visa, Mastercard, Amex</div>
              </div>
              <input type="radio" name="pay" />
            </div>
            <div className="ap-card ap-method">
              <div>
                <div className="ap-method-title">Digital Wallet</div>
                <div className="ap-muted">PayPal, Apple Pay, Google Pay</div>
              </div>
              <input type="radio" name="pay" />
            </div>
          </div>

          <div className="ap-form-actions">
            <button className="ap-btn ap-btn-light">Back</button>
            <button className="ap-btn ap-btn-primary">Continue</button>
          </div>
        </section>
      </div>
    </div>
  );
}