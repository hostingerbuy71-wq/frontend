import React, { useMemo, useRef, useState, useEffect } from 'react';
import './AdminPanelPage.css';

export default function AdminBetLockPage() {
  // Seed categories and items
  const sections = useMemo(() => ([
    {
      id: 'casino',
      title: 'All Casino',
      items: [
        'TeenPatti Studio',
        'Royal Casino',
        'Betfair Games',
        'Star Casino',
        'Galaxy Casino',
        'Sports Book',
        'Super Nova',
      ],
    },
    {
      id: 'cricket',
      title: 'Cricket',
      items: [
        'Figure',
        'Fancy',
        'Match Odds',
        'Even / Odd',
        'Session',
        'Khada Book',
      ],
    },
    {
      id: 'soccer',
      title: 'Soccer',
      items: [
        'Match Odds',
        'Over/Under',
        'Correct Score',
      ],
    },
    {
      id: 'tennis',
      title: 'Tennis',
      items: [
        'Match Odds',
        'Set Winner',
      ],
    },
  ]), []);

  // Track selections per item
  const [selected, setSelected] = useState(() => {
    const init = {};
    sections.forEach(sec => {
      sec.items.forEach((label, idx) => {
        const key = `${sec.id}:${idx}`;
        init[key] = true; // default checked like screenshot
      });
    });
    return init;
  });

  const groupRefs = useRef({});

  const isItemChecked = (secId, idx) => !!selected[`${secId}:${idx}`];
  const groupAll = (sec) => sec.items.every((_, idx) => isItemChecked(sec.id, idx));
  const groupSome = (sec) => sec.items.some((_, idx) => isItemChecked(sec.id, idx));

  // keep indeterminate state in sync
  useEffect(() => {
    sections.forEach((sec) => {
      const ref = groupRefs.current[sec.id];
      if (ref) {
        const all = groupAll(sec);
        const some = groupSome(sec);
        ref.indeterminate = !all && some; // tri-state
      }
    });
  }, [selected, sections]);

  const toggleItem = (secId, idx) => {
    const key = `${secId}:${idx}`;
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGroup = (sec) => {
    const should = !groupAll(sec);
    setSelected((prev) => {
      const next = { ...prev };
      sec.items.forEach((_, idx) => { next[`${sec.id}:${idx}`] = should; });
      return next;
    });
  };

  return (
    <div className="admin-page">
      <section className="panel">
        <header className="panel-hd">
          <h3>Allowed Market Types (Admin786)</h3>
        </header>
        <div className="panel-body">
          <div className="checklist">
            {sections.map((sec) => (
              <div key={sec.id} className="check-section">
                <label className="check-row group">
                  <input
                    type="checkbox"
                    ref={(el) => { groupRefs.current[sec.id] = el; }}
                    checked={groupAll(sec)}
                    onChange={() => toggleGroup(sec)}
                  />
                  <span className="check-label">{sec.title}</span>
                </label>
                <ul className="check-items">
                  {sec.items.map((label, idx) => (
                    <li key={idx}>
                      <label className="check-row">
                        <input
                          type="checkbox"
                          checked={isItemChecked(sec.id, idx)}
                          onChange={() => toggleItem(sec.id, idx)}
                        />
                        <span className="check-label">{label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}