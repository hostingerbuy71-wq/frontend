import React, { useState } from 'react';
import axios from 'axios';
import './DragonTigerPage.css';

export default function DragonTigerPage(){
  const [selection, setSelection] = useState('dragon');
  const [amount, setAmount] = useState(200);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(13);

  const play = async () => {
    setError('');
    setResult(null);
    const betAmount = Number(amount);
    if (!Number.isFinite(betAmount) || betAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post('/api/games/dragon-tiger/deal', {
        selection,
        amount: betAmount,
      });
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dt-wrapper">
      <aside className="dt-left">
        <div className="lobby-card">Lobby</div>
        <div className="game-list">
          <div className="game-pill active">Teenpatti</div>
          <div className="game-pill">Teen Patti One day</div>
        </div>
      </aside>

      <main className="dt-main">
        <div className="dt-title">DRAGON TIGER</div>
        <div className="dt-stage">
          <div className="stage-overlay">
            <div className="sides">
              <div className="side dragon">DRAGON</div>
              <div className="side tiger">TIGER</div>
            </div>
          </div>
          <div className="timer">
            <div className="count">0:{String(timer).padStart(2,'0')}</div>
            <button className="place-bets">Place your bets</button>
          </div>
        </div>

        <div className="dt-odds">
          <div className="row">
            <div className="label">CLASSIC VIEW</div>
            <div className="limits">MIN:200 | MAX:300000</div>
          </div>
          <div className="market-header">
            <div />
            <div className="back">BACK</div>
            <div className="lay">LAY</div>
          </div>

          <div className="market">
            <div className="name">Dragon</div>
            <button className="odd back">1.98</button>
            <button className="odd lay" disabled>🔒</button>
          </div>
          <div className="market">
            <div className="name">Tiger</div>
            <button className="odd back">1.98</button>
            <button className="odd lay" disabled>🔒</button>
          </div>
          <div className="market">
            <div className="name">Tie</div>
            <button className="odd back">8.00</button>
            <button className="odd lay" disabled>🔒</button>
          </div>
        </div>

        <div className="dt-controls compact">
          <div className="options">
            <button className={`chip ${selection==='dragon'?'active':''}`} onClick={()=>setSelection('dragon')} disabled={loading}>Dragon</button>
            <button className={`chip ${selection==='tie'?'active':''}`} onClick={()=>setSelection('tie')} disabled={loading}>Tie</button>
            <button className={`chip ${selection==='tiger'?'active':''}`} onClick={()=>setSelection('tiger')} disabled={loading}>Tiger</button>
          </div>
          <div className="bet-row">
            <input aria-label="Bet amount" type="number" min={1} step={1} value={amount} onChange={(e)=>setAmount(e.target.value)} disabled={loading} />
            <button className="play" onClick={play} disabled={loading}>{loading?'Dealing...':'Place Bet'}</button>
          </div>
        </div>

        {error && <div className="error-msg center">{error}</div>}

        {result && (
          <div className="dt-round">
            <div className="cards">
              <div className="side">
                <div className="label">Dragon</div>
                <div className="card">{result.dragon.label}</div>
              </div>
              <div className="side">
                <div className="label">Tiger</div>
                <div className="card">{result.tiger.label}</div>
              </div>
            </div>
            <div className="summary">
              <div>Winner: <strong>{result.winner}</strong></div>
              <div>Win: <strong>{result.winAmount}</strong></div>
            </div>
          </div>
        )}
      </main>

      <aside className="dt-right">
        <div className="wallet">
          <div className="row"><span>AVAILABLE CREDIT</span><strong>100</strong></div>
          <div className="row"><span>EXPOSURE</span><strong>0</strong></div>
        </div>
        <div className="open-bets">
          <div className="title">OPEN BETS</div>
          <div className="tabs">
            <div>MARKETS</div>
            <div>ODDS</div>
            <div>STAKE</div>
          </div>
          <div className="empty">You have no bets</div>
        </div>
      </aside>
    </div>
  );
}


