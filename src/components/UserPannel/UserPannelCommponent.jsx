import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import { FaArrowDown, FaArrowUp, FaUniversity, FaCreditCard, FaWallet } from "react-icons/fa";
import "./UserPannel.css";

const transactions = [
  { id: "TXN-001234567", type: "Bank Deposit", date: "Dec 15, 2024 - 2:30 PM", amount: "+$1,500.00", status: "Complete", direction: "in" },
  { id: "TXN-001234566", type: "ATM Withdrawal", date: "Dec 14, 2024 - 10:15 AM", amount: "-$200.00", status: "Complete", direction: "out" },
  { id: "TXN-001234565", type: "Wire Transfer", date: "Dec 13, 2024 - 3:45 PM", amount: "+$750.00", status: "Pending", direction: "in" },
  { id: "TXN-001234564", type: "Direct Deposit", date: "Dec 12, 2024 - 9:00 AM", amount: "+$2,500.00", status: "Complete", direction: "in" },
  { id: "TXN-001234563", type: "Online Transfer", date: "Dec 11, 2024 - 4:20 PM", amount: "-$850.00", status: "Failed", direction: "out" },
  { id: "TXN-001234562", type: "PayPal Deposit", date: "Dec 10, 2024 - 1:15 PM", amount: "+$320.00", status: "Complete", direction: "in" },
];
const Avatar = ({ name }) => {
  const letter = name?.[0]?.toUpperCase?.() || 'U';
  return <div className="ap-avatar" aria-hidden>{letter}</div>;
};
export default function UserDashboardComponent() {
  const [selectedMethod, setSelectedMethod] = useState("bank");

  return (
    <Container fluid className="userdash-bg min-vh-100 text-light py-5">
      <div className="userdash-wrap">
        {/* Transactions */}
        <Card bg="dark" text="light" className="mb-5 shadow transactions-card">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-white">Recent Transactions</h5>
            <small className="text-muted">Showing 1–10 of 156 transactions</small>
          </Card.Header>
          <Card.Body className="p-0">
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
    </Container>
  );
}