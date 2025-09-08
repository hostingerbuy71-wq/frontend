import React from 'react';
import { FaCalendarAlt, FaPlay, FaStar, FaTrophy, FaSearch, FaTimes } from 'react-icons/fa';

export const BPExchSidebar = ({ activeTab, setActiveTab, selectedSport, setSelectedSport, isSidebarOpen, toggleSidebar }) => {
  const sidebarItems = [
    { id: "events", icon: <FaCalendarAlt size={18} />, label: "Events", href: "/lobby/SportRadar/sr:sport:21" },
    { id: "live", icon: <FaPlay size={8} />, label: "Live", href: "/lobby/SportRadar/inplay" },
    { id: "favourites", icon: <FaStar size={16} />, label: "Favourite", href: "/lobby/favourites" },
    { id: "mybets", icon: <FaTrophy size={16} />, label: "My Bets", href: "/lobby/bet_list" },
    { id: "results", icon: <FaCalendarAlt size={18} />, label: "Results", href: "/lobby/results" },
    { id: "search", icon: <FaSearch size={18} />, label: "Search", href: "/lobby/search" }
  ];

  const sportsList = [
    { id: "cricket", name: "Cricket", icon: "/static/media/ic_cricket.de56ce3f.svg", sportId: "sr:sport:21" },
    { id: "soccer", name: "Soccer", icon: "/static/media/ic_football_w.50cabbda.svg", sportId: "sr:sport:1" },
    { id: "tennis", name: "Tennis", icon: "/static/media/ic_tennis_w.f31f6089.svg", sportId: "sr:sport:5" },
    { id: "srl", name: "Simulated Reality League", icon: "SRL", sportId: "sr:sport:srl" },
    { id: "badminton", name: "Badminton", icon: "/static/media/ic_badminton.2681cdeb.svg", sportId: "sr:sport:31" },
    { id: "baseball", name: "Baseball", icon: "/static/media/ic_baseball.34810a61.svg", sportId: "sr:sport:3" },
    { id: "basketball", name: "Basketball", icon: "/static/media/ic_basketball_w.d6316da7.svg", sportId: "sr:sport:2" },
    { id: "icehockey", name: "Ice Hockey", icon: "/static/media/ic_ice_hockey_w.f355ce9e.svg", sportId: "sr:sport:4" },
    { id: "mma", name: "MMA", icon: "/static/media/ic_MMA.834af83f.svg", sportId: "sr:sport:117" },
    { id: "tabletennis", name: "Table Tennis", icon: "/static/media/ic_table_tennis_w.a4abf836.svg", sportId: "sr:sport:20" }
  ];

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`bpexch-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <h3>BPExch</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="sidebar-nav">
          <div className="nav-section">
            <h4 className="nav-title">Quick Access</h4>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* All Sports Section */}
          <div className="nav-section">
            <h4 className="nav-title">ALL SPORTS</h4>
            <div className="sports-list">
              {sportsList.map((sport) => (
                <button
                  key={sport.id}
                  className={`sport-item ${selectedSport?.id === sport.id ? 'active' : ''}`}
                  onClick={() => handleSportSelect(sport)}
                >
                  <div className="sport-content">
                    {sport.icon === "SRL" ? (
                      <span className="srl-icon">SRL</span>
                    ) : (
                      <img className="sport-img" alt={sport.sportId} title={sport.name} src={sport.icon} />
                    )}
                    <div className="sport-text">
                      <span className="sport-name">{sport.name}</span>
                    </div>
                    <svg className="arrow-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M9.29 15.88 13.17 12 9.29 8.12a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"></path>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="user-balance">
            <span className="balance-label">Balance</span>
            <span className="balance-amount">₹50,000</span>
          </div>
          <button className="deposit-btn">Deposit</button>
        </div>
      </aside>
    </>
  );
}; 