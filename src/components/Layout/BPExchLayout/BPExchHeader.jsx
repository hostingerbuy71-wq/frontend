import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBell, FaCog, FaSignOutAlt, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export const BPExchHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/');
  };

  return (
    <header className="bpexch-header">
      <div className="header-container">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          
          <Link to="/common/sap" className="logo">
            <div className="logo-icon">BP</div>
            <span className="logo-text">BPExch</span>
          </Link>
        </div>

        {/* Center Section - Search Bar */}
        <div className="header-center">
          {showSearch && (
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search events, teams, or competitions..." 
                className="search-input"
                autoFocus
              />
              <button className="search-btn">
                <FaSearch size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right Section - User Controls */}
        <div className="header-right">
          {/* Search Toggle */}
          <button 
            className="header-btn search-toggle"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FaSearch size={18} />
          </button>

          {/* Notifications */}
          <button className="header-btn notification-btn">
            <FaBell size={18} />
            <span className="notification-badge">3</span>
          </button>

          {/* Settings */}
          <button className="header-btn">
            <FaCog size={18} />
          </button>

          {/* User Menu */}
          <div className="user-menu-container">
            <button 
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUser size={18} />
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-name">John Doe</div>
                  <div className="user-email">john@example.com</div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  <FaUser size={14} />
                  <span>Profile</span>
                </button>
                <button className="dropdown-item">
                  <FaCog size={14} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 