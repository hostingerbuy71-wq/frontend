import React, { useMemo, useState } from 'react';
import axios from 'axios';

const numbers = Array.from({ length: 37 }, (_, i) => i); // 0..36
const RED_NUMBERS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const colorOf = (n) => (n === 0 ? 'green' : RED_NUMBERS.has(n) ? 'red' : 'black');

export default function RoulettePage(){
  const [selected, setSelected] = useState([]); // array of numbers
  const [amount, setAmount] = useState(200);
  const [activeChip, setActiveChip] = useState(200);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [noMoreBets, setNoMoreBets] = useState(false);
  const [lastResults, setLastResults] = useState([]); // recent hit numbers

  const chips = useMemo(() => [200, 1000, 2000, 10000, 20000, 50000], []);

  const disabled = spinning || noMoreBets;

  const toggle = (n) => {
    if (disabled) return;
    setSelected((prev) => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);
  };

  const undo = () => {
    if (disabled) return;
    setSelected((prev) => prev.slice(0, -1));
  };

  const resetSel = () => {
    if (disabled) return;
    setSelected([]);
  };

  const markNoMoreBets = () => setNoMoreBets(true);

  const play = async () => {
    setError('');
    setResult(null);
    if (selected.length === 0) {
      setError('Select at least one number');
      return;
    }
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      setError('Enter a valid stake amount');
      return;
    }

    try {
      setSpinning(true);
      setNoMoreBets(true);
      const bets = selected.map(n => ({ type: 'straight', number: n, amount: amt }));
      const { data } = await axios.post('/api/games/roulette/spin', { bets });
      setResult(data);
      if (Number.isInteger(data?.number)) {
        setLastResults((prev) => [data.number, ...prev].slice(0, 12));
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Something went wrong');
    } finally {
      setSpinning(false);
      setNoMoreBets(false);
    }
  };

  return (
    <div className="roulette">
      <div className="roulette-video">
        <div className="video-placeholder">AUTO ROULETTE</div>
      </div>

      {/* Recent results tape and round controls */}
      <div className="roulette-roundbar">
        <div className="results-tape">
          {lastResults.length === 0 && <div className="muted">No previous results</div>}
          {lastResults.map((n, idx) => (
            <div key={idx} className={`pill ${colorOf(n)}`}>{n}</div>
          ))}
        </div>
        <div className="round-actions">
          <button className="btn sm" onClick={markNoMoreBets} disabled={noMoreBets || spinning}>No More Bets</button>
          <button className="btn sm ghost">Player History</button>
        </div>
      </div>

      {/* Chips + stake + spin */}
      <div className="roulette-toolbar">
        <div className="chips">
          {chips.map((c) => (
            <button key={c} className={`chip ${activeChip === c ? 'active' : ''}`} onClick={() => { setActiveChip(c); setAmount(c); }}>
              {c >= 1000 ? `${c/1000}k` : c}
            </button>
          ))}
        </div>
        <div className="bet-info">
          <label>Stake</label>
          <input type="number" value={amount} min={1} onChange={(e)=>setAmount(e.target.value)} />
          <button className="play" onClick={play} disabled={spinning}>{spinning ? 'Spinning...' : 'Spin'}</button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}

      {/* Board */}
      <div className="roulette-board" aria-disabled={disabled}>
        <div className="zero" onClick={()=>toggle(0)} data-active={selected.includes(0)}>0</div>
        <div className="grid">
          {numbers.slice(1).map(n => (
            <button
              key={n}
              className={`cell ${colorOf(n)} ${selected.includes(n) ? 'active' : ''}`}
              onClick={()=>toggle(n)}
              disabled={disabled}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="actions">
        <button className="btn icon" onClick={undo} disabled={disabled || selected.length===0}>UNDO</button>
        <button className="btn icon" onClick={resetSel} disabled={disabled || selected.length===0}>RESET</button>
        <div className="spacer" />
        <div className="selected-summary">Selections: {selected.length} • Stake: {amount}</div>
      </div>

      {result && (
        <div className="roulette-result">
          <div>Result: <strong>{result.number}</strong> ({result.color})</div>
          <div>Total Bet: {result.totalBet}</div>
          <div>Win: <strong>{result.winAmount}</strong></div>
          <div>Net: <strong>{result.balanceChange}</strong></div>
        </div>
      )}
    </div>
  );
}