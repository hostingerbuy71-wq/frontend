import React, { useMemo, useState } from 'react';
import axios from 'axios';

export default function TeenPattiPage(){
  const [selection, setSelection] = useState('playerA');
  const [amount, setAmount] = useState(200);
  const [activeChip, setActiveChip] = useState(200);
  const [dealing, setDealing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const chips = useMemo(() => [200, 1000, 2000, 10000, 20000, 50000], []);

  const deal = async () => {
    setError('');
    setResult(null);

    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      setError('Enter a valid stake amount');
      return;
    }

    try {
      setDealing(true);
      const { data } = await axios.post('/api/games/teenpatti/deal', { selection, amount: amt });
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Something went wrong');
    } finally {
      setDealing(false);
    }
  };

  const renderCards = (hand) => {
    if (!hand) return null;
    return (
      <div className="tp-cards">
        {hand.map((c, idx) => (
          <div key={idx} className="tp-card">
            <div className="rank">{c.label}</div>
            <div className="suit">{c.suit}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="teenpatti">
      <div className="tp-video">
        <div className="video-placeholder">TEEN PATTI</div>
      </div>

      <div className="tp-toolbar">
        <div className="tp-sides">
          <button className={`side ${selection==='playerA'?'active':''}`} onClick={()=>setSelection('playerA')} disabled={dealing}>
            Player A <span className="payout">1 : 1</span>
          </button>
          <button className={`side ${selection==='tie'?'active':''}`} onClick={()=>setSelection('tie')} disabled={dealing}>
            Tie <span className="payout">1 : 8</span>
          </button>
          <button className={`side ${selection==='playerB'?'active':''}`} onClick={()=>setSelection('playerB')} disabled={dealing}>
            Player B <span className="payout">1 : 1</span>
          </button>
        </div>
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
          <button className="play" onClick={deal} disabled={dealing}>{dealing ? 'Dealing...' : 'Deal'}</button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}

      <div className="tp-table">
        <div className="panel">
          <div className="panel-title">Player A</div>
          {result ? (
            <>
              {renderCards(result.playerA?.hand)}
              <div className="hand-info">{result.playerA?.info?.label}</div>
            </>
          ) : (
            <div className="panel-placeholder">Place your bet and deal</div>
          )}
        </div>

        <div className="panel center">
          <div className="round-info">
            <div>Selection: <strong>{selection}</strong></div>
            {result && (
              <>
                <div>Winner: <strong>{result.winner}</strong></div>
                <div>Payout: x{result.payoutMultiplier}</div>
                <div>Win: <strong>{result.winAmount}</strong></div>
              </>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Player B</div>
          {result ? (
            <>
              {renderCards(result.playerB?.hand)}
              <div className="hand-info">{result.playerB?.info?.label}</div>
            </>
          ) : (
            <div className="panel-placeholder">Waiting for deal</div>
          )}
        </div>
      </div>
    </div>
  );
}