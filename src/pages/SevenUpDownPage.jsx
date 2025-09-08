import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './SevenUpDownPage.css';

export const SevenUpDownPage = () => {
  const [selection, setSelection] = useState('up');
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Animation state
  const [phase, setPhase] = useState('idle'); // idle | dealing | reveal
  const [drawnLabel, setDrawnLabel] = useState('?');
  const [targetSlot, setTargetSlot] = useState(null); // 'up' | 'down' | 'seven'

  const videoSrc = import.meta.env.VITE_SEVENUP_VIDEO_URL || '';

  const playRound = async () => {
    setError('');
    setResult(null);
    setDrawnLabel('?');
    setTargetSlot(null);

    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Start dealing animation first for a more realistic feel
    setPhase('dealing');

    try {
      // Slight delay to let the "deal" animation start
      await new Promise((r) => setTimeout(r, 450));

      setLoading(true);
      const resp = await axios.post('/api/games/7updown/play', {
        selection,
        amount: Number(amount),
      });

      const data = resp.data;
      // Move card towards the correct slot visually
      setTargetSlot(data.category);

      // Wait a bit before flipping the card
      await new Promise((r) => setTimeout(r, 450));

      setDrawnLabel(data?.card?.label ?? '?');
      setResult(data);
      setPhase('reveal');
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Something went wrong. Please try again.');
      setPhase('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sevenup-container">
      <div className="sevenup-header">
        <h1>7 Up Down</h1>
        <p>Pick Up (8–K), Down (A–6), or Seven (exactly 7) and place your bet.</p>
      </div>

      <div className="sevenup-panel">
        <div className="sevenup-controls">
          <div className="options">
            <button
              className={`option up ${selection === 'up' ? 'selected' : ''}`}
              onClick={() => setSelection('up')}
              disabled={loading}
            >
              Up (8–K)
            </button>
            <button
              className={`option seven ${selection === 'seven' ? 'selected' : ''}`}
              onClick={() => setSelection('seven')}
              disabled={loading}
            >
              Seven (7)
            </button>
            <button
              className={`option down ${selection === 'down' ? 'selected' : ''}`}
              onClick={() => setSelection('down')}
              disabled={loading}
            >
              Down (A–6)
            </button>
          </div>

          <div className="bet-row">
            <label htmlFor="bet-amount">Bet Amount</label>
            <input
              id="bet-amount"
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
            <button className="play-button" onClick={playRound} disabled={loading}>
              {loading ? 'Playing...' : 'Play'}
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}
        </div>

        <div className="sevenup-result">
          {result ? (
            <div className={`result-card ${result.outcome}`}>
              <div className="card-face">
                <div className="card-rank">{result.card.label}</div>
                <div className="card-suit">♣</div>
              </div>
              <div className="result-info">
                <div className="row"><span>Selection:</span><strong>{result.selection}</strong></div>
                <div className="row"><span>Category:</span><strong>{result.category}</strong></div>
                <div className="row"><span>Outcome:</span><strong className={result.outcome}>{result.outcome.toUpperCase()}</strong></div>
                <div className="row"><span>Bet:</span><strong>{result.amount}</strong></div>
                <div className="row"><span>Payout x:</span><strong>{result.payoutMultiplier}</strong></div>
                <div className="row total"><span>Win Amount:</span><strong>{result.winAmount}</strong></div>
              </div>
            </div>
          ) : (
            <div className="placeholder">Make a selection and press Play to reveal the card.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SevenUpDownPage;