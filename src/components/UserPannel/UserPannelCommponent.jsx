import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Pagination,
  Modal,
  Dropdown
} from "react-bootstrap";
import { FaArrowDown, FaArrowUp, FaUniversity, FaCreditCard, FaWallet } from "react-icons/fa";
import "./UserPannel.css";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

const transactions = [
  { id: "TXN-001234567", type: "Bank Deposit", date: "Dec 15, 2024 - 2:30 PM", amount: "+$1,500.00", status: "Complete", direction: "in" },
  { id: "TXN-001234566", type: "ATM Withdrawal", date: "Dec 14, 2024 - 10:15 AM", amount: "-$200.00", status: "Complete", direction: "out" },
  { id: "TXN-001234565", type: "Wire Transfer", date: "Dec 13, 2024 - 3:45 PM", amount: "+$750.00", status: "Pending", direction: "in" },
  { id: "TXN-001234564", type: "Direct Deposit", date: "Dec 12, 2024 - 9:00 AM", amount: "+$2,500.00", status: "Complete", direction: "in" },
  { id: "TXN-001234563", type: "Online Transfer", date: "Dec 11, 2024 - 4:20 PM", amount: "-$850.00", status: "Failed", direction: "out" },
  { id: "TXN-001234562", type: "PayPal Deposit", date: "Dec 10, 2024 - 1:15 PM", amount: "+$320.00", status: "Complete", direction: "in" },
];
const banks = [
  { id: 'chase', name: 'Chase Bank', sub: 'Checking •••• 4567' },
  { id: 'boa', name: 'Bank of America', sub: 'Savings •••• 2244' },
  { id: 'wells', name: 'Wells Fargo', sub: 'Checking •••• 8891' },
];
const Avatar = ({ name }) => {
  const letter = name?.[0]?.toUpperCase?.() || 'U';
  return <div className="ap-avatar" aria-hidden>{letter}</div>;
};
export default function UserDashboardComponent() {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [showPayModal, setShowPayModal] = useState(false);
  const [payType, setPayType] = useState('deposit');
  const [selectedBank, setSelectedBank] = useState(banks[0]?.id || 'chase');
  const [user, setUser] = useState(null);
  const txRef = useRef(null);
  const paymentRef = useRef(null);
  const navigate = useNavigate();

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

  const openDepositModal = () => { setPayType('deposit'); setShowPayModal(true); };
  const openWithdrawModal = () => { setPayType('withdraw'); setShowPayModal(true); };
  const closePayModal = () => setShowPayModal(false);

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
  const goStatement = () => txRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const goBalance = () => paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Container fluid className="userdash-bg min-vh-100 text-light py-5">
      {/* Responsive Topbar (same as Admin) */}
      <div className="table-wrap d-flex gap-4 "
        style={{
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          background: '#121212'
        }}>
        <div
          className="dashboard-topbar"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            background: '#121212',
            color: '#ffffff',
            padding: vw < 576 ? '6px 10px' : '8px 12px',
            borderRadius: '6px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
            flexWrap: 'wrap',
            gap: '8px 12px'
          }}
        >
          {/* Left: Dashboard title */}
          <div className="">
            <Link to={'/user-dashboard'} className="mt-5 mt-md-0" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', fontWeight: 600, textDecoration: 'none', color: 'white' }}>Dashboard</Link>
          </div>

          {/* Center: Welcome message */}
          <div className="text-center d-flex justify-content-center align-items-center" style={{ color: '#cfcfcf', fontSize: 'clamp(12px, 1.4vw, 14px)', display: vw < 576 ? 'none' : 'block' }}>Welcome To Premium Exchange !</div>

          {/* Right: Balance | loss | avatar | username */}
          <div style={{ display: 'flex', alignItems: 'center', gap: vw < 576 ? '8px' : '12px', justifyContent: 'flex-end', minWidth: 260 }}>
            <span style={{ fontWeight: 600, fontSize: 'clamp(12px, 1.6vw, 14px)' }}>Bal: 1000</span>
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

      <div className="userdash-wrap">
        {/* Transactions */}
        <Card bg="dark" text="light" className="mb-5 shadow transactions-card w-100" ref={txRef}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-white">Recent Transactions</h5>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted d-none d-sm-inline">Showing 1–10 of 156 transactions</small>
              <Button size="sm" variant="success" onClick={openDepositModal}>Deposit</Button>
              <Button size="sm" variant="outline-danger" onClick={openWithdrawModal}>Withdraw</Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0 w-100">
            <div className="transactions-list">
              {transactions.map((tx) => (
                <div key={tx.id} className="tx-row">
                  <div className="tx-left">
                    <div className={`tx-icon ${tx.direction === "in" ? "pos" : "neg"}`}>
                      {tx.direction === "in" ? <FaArrowDown /> : <FaArrowUp />}
                    </div>
                    <div className="tx-details">
                      <div className="tx-title">{tx.type}</div>
                      <div className="tx-sub">
                        <span className="muted">{tx.date}</span>
                        <span className="muted">Transaction ID: {tx.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="tx-right">
                    <div className={`tx-amount ${tx.amount.includes("-") ? "neg" : "pos"}`}>{tx.amount}</div>
                    <span className={`pill ${tx.status.toLowerCase().includes("complete") ? "completed" : tx.status.toLowerCase()}`}>{tx.status === "Complete" ? "Completed" : tx.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with count + pagination */}
            <div className="p-3 tx-footer d-flex justify-content-between align-items-center">
              <small className="text-muted">Showing 1 to 6 of 156 results</small>
              <Pagination size="sm" className="mb-0 userdash-pagination">
                <Pagination.Prev>Previous</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
              </Pagination>
            </div>
          </Card.Body>
        </Card>

        {/* Payment Method */}
        <section className="ap-panel ap-payment ap-full" ref={paymentRef}>
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

      {/* Deposit/Withdraw Modal with Bank List */}
      <Modal show={showPayModal} onHide={closePayModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{payType === 'deposit' ? 'Deposit' : 'Withdraw'} — Select Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {banks.map((b) => (
              <div key={b.id} className="d-flex align-items-center justify-content-between py-2 border-bottom">
                <div className="d-flex align-items-center gap-3">
                  <div className="ap-avatar" aria-hidden>{b.name.charAt(0)}</div>
                  <div>
                    <div className="fw-semibold text-white">{b.name}</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>{b.sub}</div>
                  </div>
                </div>
                <Form.Check
                  type="radio"
                  name="bank"
                  checked={selectedBank === b.id}
                  onChange={() => setSelectedBank(b.id)}
                  aria-label={`Select ${b.name}`}
                />
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePayModal}>Cancel</Button>
          <Button variant={payType === 'deposit' ? 'success' : 'danger'} onClick={closePayModal}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}