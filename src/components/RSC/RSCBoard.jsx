import React from 'react';
import './RSCBoard.css';

const sampleEvents = [
  {
    id: 'ev1',
    competition: 'Premier League',
    time: 'Today 19:30',
    teams: ['Manchester United', 'Liverpool'],
    markets: {
      matchOdds: [
        { label: '1', back: 2.18, lay: 2.2 },
        { label: 'X', back: 3.6, lay: 3.65 },
        { label: '2', back: 3.3, lay: 3.35 }
      ]
    }
  },
  {
    id: 'ev2',
    competition: 'La Liga',
    time: 'Today 21:00',
    teams: ['Barcelona', 'Real Madrid'],
    markets: {
      matchOdds: [
        { label: '1', back: 2.05, lay: 2.08 },
        { label: 'X', back: 3.5, lay: 3.55 },
        { label: '2', back: 3.8, lay: 3.85 }
      ]
    }
  },
  {
    id: 'ev3',
    competition: 'IPL',
    time: 'Tomorrow 18:00',
    teams: ['Mumbai Indians', 'Chennai Super Kings'],
    markets: {
      matchOdds: [
        { label: '1', back: 1.85, lay: 1.87 },
        { label: '2', back: 2.1, lay: 2.12 }
      ]
    }
  }
];

export const RSCBoard = () => {
  return (
    <div className="rsc-board">
      <div className="rsc-header">
        <h2>RSC</h2>
        <div className="rsc-header-actions">
          <button className="btn small">In-Play</button>
          <button className="btn small">Today</button>
          <button className="btn small">Tomorrow</button>
        </div>
      </div>

      <div className="rsc-table">
        <div className="rsc-table-head">
          <div className="col col-competition">Competition</div>
          <div className="col col-event">Event</div>
          <div className="col col-market">Back</div>
          <div className="col col-market">Lay</div>
          <div className="col col-market">Back</div>
          <div className="col col-market">Lay</div>
          <div className="col col-market">Back</div>
          <div className="col col-market">Lay</div>
        </div>
        <div className="rsc-table-body">
          {sampleEvents.map((ev) => (
            <div key={ev.id} className="rsc-row">
              <div className="col col-competition">
                <div className="competition-name">{ev.competition}</div>
                <div className="event-time">{ev.time}</div>
              </div>
              <div className="col col-event">
                <div className="teams">
                  <span>{ev.teams[0]}</span>
                  <span className="vs">vs</span>
                  <span>{ev.teams[1]}</span>
                </div>
              </div>
              {ev.markets.matchOdds.map((m, i) => (
                <React.Fragment key={i}>
                  <div className="col col-market back">{m.back}</div>
                  <div className="col col-market lay">{m.lay}</div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RSCBoard;