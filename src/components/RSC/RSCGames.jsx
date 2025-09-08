import React from 'react';
import { Link } from 'react-router-dom';
import './RSCGames.css';

const games = [
  {
    key: '7updown',
    name: '7 Up & Down',
    description: 'Guess if the next number will be above or below 7.',
    color: '#4e7cff',
  },
  {
    key: 'roulette',
    name: 'Roulette',
    description: 'Classic wheel with red/black, odd/even and numbers.',
    color: '#e74c3c',
  },
  {
    key: 'teenpatti',
    name: 'Teen Patti',
    description: 'Popular 3-card game with pairs, sequence and trails.',
    color: '#f39c12',
  },
  {
    key: 'dragontiger',
    name: 'Dragon Tiger',
    description: 'Pick Dragon or Tiger – higher card wins.',
    color: '#16a085',
  },
  {
    key: 'cricketwar',
    name: 'Cricket War',
    description: 'Fast duel – Team A vs Team B higher score wins.',
    color: '#9b59b6',
  },
];

export const RSCGames = () => {
  return (
    <section className="rsc-games">
      <div className="rsc-games-header">
        <h2>Popular Games</h2>
        <p className="subtitle">Play instant games inside RSC</p>
      </div>

      <div className="rsc-games-grid">
        {games.map((g) => (
          <div key={g.key} className="game-card" style={{ borderColor: g.color }}>
            <div className="game-card-accent" style={{ background: g.color }} />
            <div className="game-card-body">
              <div className="game-icon" style={{ background: g.color }}>
                {g.name[0]}
              </div>
              <div className="game-info">
                <h3 className="game-title">{g.name}</h3>
                <p className="game-desc">{g.description}</p>
              </div>
            </div>
            <div className="game-card-actions">
              {/* Placeholder actions: wire these later to real game routes */}
              <button className="btn primary">Play</button>
              <Link to="#" className="btn ghost">Rules</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RSCGames;