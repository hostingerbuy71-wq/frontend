import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaPlay, FaStar, FaSearch, FaCalendarAlt, FaTrophy } from "react-icons/fa";
import { PiSoccerBallBold } from "react-icons/pi";
import { MdSportsSoccer, MdSportsTennis, MdSportsCricket, MdSportsBasketball, MdSportsBaseball } from "react-icons/md";

export const BPExchDashboard = () => {
  const { activeTab, setActiveTab, selectedSport, setSelectedSport } = useOutletContext();

  return (
    <div className="bpexch-dashboard-content">
      {/* Content Header */}
      <div className="content-header">
        {/* <h1>BPExch Dashboard</h1> */}
        {selectedSport && (
          <div className="selected-sport-badge">
            {selectedSport.icon === "SRL" ? (
              <span className="srl-icon-large">SRL</span>
            ) : (
              <img src={selectedSport.icon} alt={selectedSport.name} className="sport-icon-large" />
            )}
            <span>{selectedSport.name}</span>
          </div>
        )}
      </div>

      {/* Content Tabs */}
      <div className="content-tabs">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button 
            className={`tab-btn ${activeTab === "live" ? "active" : ""}`}
            onClick={() => setActiveTab("live")}
          >
            Live
          </button>
          <button 
            className={`tab-btn ${activeTab === "favourites" ? "active" : ""}`}
            onClick={() => setActiveTab("favourites")}
          >
            Favourites
          </button>
          <button 
            className={`tab-btn ${activeTab === "mybets" ? "active" : ""}`}
            onClick={() => setActiveTab("mybets")}
          >
            My Bets
          </button>
          <button 
            className={`tab-btn ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}
          >
            Results
          </button>
          <button 
            className={`tab-btn ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            Search
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "events" && (
          <div className="events-content">
            <h2>Events</h2>
            {selectedSport ? (
              <div className="sport-events">
                <h3>{selectedSport.name} Events</h3>
                <div className="events-grid">
                  <div className="event-card">
                    <div className="event-header">
                      <span className="event-time">Today 15:00</span>
                      <span className="event-status">Upcoming</span>
                    </div>
                    <div className="event-teams">
                      <div className="team">Team A vs Team B</div>
                    </div>
                    <div className="event-odds">
                      <div className="odd-item">1.85</div>
                      <div className="odd-item">3.40</div>
                      <div className="odd-item">4.20</div>
                    </div>
                  </div>
                  <div className="event-card">
                    <div className="event-header">
                      <span className="event-time">Today 18:30</span>
                      <span className="event-status">Upcoming</span>
                    </div>
                    <div className="event-teams">
                      <div className="team">Team C vs Team D</div>
                    </div>
                    <div className="event-odds">
                      <div className="odd-item">2.10</div>
                      <div className="odd-item">3.20</div>
                      <div className="odd-item">3.80</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-sport-selected">
                <p>Please select a sport from the sidebar to view events</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "live" && (
          <div className="live-content">
            <h2>Live Events</h2>
            <div className="live-indicator">
              <FaPlay size={12} />
              <span>LIVE</span>
            </div>
            <div className="live-events">
              <div className="live-event-card">
                <div className="live-header">
                  <span className="live-time">LIVE - 45'</span>
                  <span className="live-score">1 - 0</span>
                </div>
                <div className="live-teams">
                  <div className="team">Live Team A vs Live Team B</div>
                </div>
                <div className="live-odds">
                  <div className="odd-item live">1.95</div>
                  <div className="odd-item live">3.50</div>
                  <div className="odd-item live">4.10</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "favourites" && (
          <div className="favourites-content">
            <h2>Favourite Events</h2>
            <div className="favourites-list">
              <div className="favourite-item">
                <FaStar className="star-icon" />
                <span>No favourite events yet</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mybets" && (
          <div className="mybets-content">
            <h2>My Bets</h2>
            <div className="bets-list">
              <div className="bet-item">
                <span>No active bets</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div className="results-content">
            <h2>Results</h2>
            <div className="results-list">
              <div className="result-item">
                <span>No recent results</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "search" && (
          <div className="search-content">
            <h2>Search Events</h2>
            <div className="search-box">
              <input type="text" placeholder="Search for events, teams, or competitions..." />
              <button className="search-btn">
                <FaSearch size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 