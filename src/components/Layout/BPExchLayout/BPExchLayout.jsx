import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { BPExchHeader } from './BPExchHeader';
import { BPExchSidebar } from './BPExchSidebar';
import './BPExchLayout.css';

export const BPExchLayout = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [selectedSport, setSelectedSport] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bpexch-layout">
      {/* BPExch Header */}
      <BPExchHeader 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="bpexch-main-container">
        {/* BPExch Sidebar */}
        <BPExchSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        {/* Main Content Area */}
        <main className="bpexch-content">
          <Outlet context={{ activeTab, setActiveTab, selectedSport, setSelectedSport }} />
        </main>
      </div>
    </div>
  );
}; 