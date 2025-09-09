import React, { useState, useEffect } from "react";
import axios from "axios";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { PiSoccerBallBold } from "react-icons/pi";
import { FaMoneyBills, FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Sidebar.css'
import swapLogo from "../../../assets/logos/Group 2.png";
import TennisIcon from "@/assets/icons/tennis.png";
import CricketIcons from "../../../assets/icons/cricket.png";
import HorseRace from "../../../assets/icons/horse-race.png";
import DogIcon from "../../../assets/icons/dog.png";
import SportBook from "../../../assets/icons/sport-book.png";
import RoyalStarCasino from "../../../assets/icons/royal-star-book.png";
import StarCasino from "../../../assets/icons/star-casino.png";
import WorldCasino from "../../../assets/icons/world-casino.png";
import RoyalCasino from "../../../assets/icons/royal-casino.png";
import BetFairGame from "../../../assets/icons/bet-fair-games.png";
import TeenPattiStudioImg from "../../../assets/icons/teenPattiStudio.png";
import GlaxiCasino from "../../../assets/icons/glaxi-casino.png";
import MatchDetails from "../../Dashboard/MatchDetails";

export const MemberDashboardSidebar = ({ isSidebarOpen, toggleSidebar, screenSize }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [tennisTournaments, setTennisTournaments] = useState([]);
  const [loadingTennis, setLoadingTennis] = useState(false);
  const [cricketMatches, setCricketMatches] = useState([]);
  const [loadingCricket, setLoadingCricket] = useState(false);
  const [soccerMatches, setSoccerMatches] = useState([]);
  const [loadingSoccer, setLoadingSoccer] = useState(false);
  const [horseRaces, setHorseRaces] = useState([]);
  const [loadingHorse, setLoadingHorse] = useState(false);
  const [greyhoundRaces, setGreyhoundRaces] = useState([]);
  const [loadingGreyhound, setLoadingGreyhound] = useState(false);

  // Fetch tennis matches from API
  const fetchTennisMatches = async () => {
    setLoadingTennis(true);
    try {
      console.log('🎾 Fetching tennis via backend proxy...');
      const res = await fetch('/api/sports/tennis');
      if (!res.ok) throw new Error(`Backend responded ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      if (list.length) {
        setTennisTournaments(list.slice(0, 6));
        return;
      }
      throw new Error('Empty tennis list');
    } catch (error) {
      console.error('Tennis API Error:', error.message);
      const demoMatches = [
        { id: 'demo_1', display: 'DEMO: Novak Djokovic vs Rafael Nadal', status: 'Live', tournament: 'ATP Masters 1000' },
        { id: 'demo_2', display: 'DEMO: Carlos Alcaraz vs Daniil Medvedev', status: 'Upcoming', tournament: 'Wimbledon' },
        { id: 'demo_3', display: 'DEMO: Iga Swiatek vs Aryna Sabalenka', status: 'Live', tournament: 'WTA Finals' },
        { id: 'demo_4', display: 'DEMO: Jannik Sinner vs Alexander Zverev', status: 'Upcoming', tournament: 'US Open' },
        { id: 'demo_5', display: 'DEMO: Coco Gauff vs Jessica Pegula', status: 'Live', tournament: 'French Open' },
        { id: 'demo_6', display: 'DEMO: Stefanos Tsitsipas vs Casper Ruud', status: 'Upcoming', tournament: 'ATP Finals' }
      ];
      setTennisTournaments(demoMatches);
    } finally {
      setLoadingTennis(false);
    }
  };

  // Fetch cricket matches from API
  const fetchCricketMatches = async () => {
    setLoadingCricket(true);
    try {
      console.log('🏏 Fetching cricket via backend proxy...');
      const res = await fetch('/api/sports/cricket');
      if (!res.ok) throw new Error(`Backend responded ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      if (list.length) {
        setCricketMatches(list.slice(0, 8));
        return;
      }
      throw new Error('Empty cricket list');
    } catch (error) {
      console.error('❌ Cricket API Error:', error.message);
      const demoMatches = [
        { id: 'demo_1', display: '🔴 DEMO: India vs Australia', status: 'Live', tournament: 'Border-Gavaskar Trophy' },
        { id: 'demo_2', display: '🔴 DEMO: England vs Pakistan', status: 'Upcoming', tournament: 'Test Series' },
        { id: 'demo_3', display: '🔴 DEMO: Mumbai Indians vs CSK', status: 'Live', tournament: 'IPL 2024' },
        { id: 'demo_4', display: '🔴 DEMO: South Africa vs New Zealand', status: 'Upcoming', tournament: 'ODI Series' },
        { id: 'demo_5', display: '🔴 DEMO: West Indies vs Bangladesh', status: 'Live', tournament: 'T20 Series' },
        { id: 'demo_6', display: '🔴 DEMO: Sri Lanka vs Afghanistan', status: 'Upcoming', tournament: 'Asia Cup' }
      ];
      setCricketMatches(demoMatches);
    } finally {
      setLoadingCricket(false);
    }
  };

  // Fetch soccer matches from API
  const fetchSoccerMatches = async () => {
    setLoadingSoccer(true);
    try {
      console.log('⚽ Fetching soccer via backend proxy...');
      const res = await fetch('/api/sports/soccer');
      if (!res.ok) throw new Error(`Backend responded ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      if (list.length) {
        setSoccerMatches(list.slice(0, 8));
        return;
      }
      throw new Error('Empty soccer list');
    } catch (error) {
      console.error('❌ Soccer API Error:', error.message);
      const demoMatches = [
        { id: 'demo_1', display: '🔴 DEMO: Manchester United vs Liverpool', status: 'Live', tournament: 'Premier League' },
        { id: 'demo_2', display: '🔴 DEMO: Barcelona vs Real Madrid', status: 'Upcoming', tournament: 'La Liga' },
        { id: 'demo_3', display: '🔴 DEMO: Bayern Munich vs Dortmund', status: 'Live', tournament: 'Bundesliga' },
        { id: 'demo_4', display: '🔴 DEMO: PSG vs Marseille', status: 'Upcoming', tournament: 'Ligue 1' },
        { id: 'demo_5', display: '🔴 DEMO: Juventus vs AC Milan', status: 'Live', tournament: 'Serie A' },
        { id: 'demo_6', display: '🔴 DEMO: Chelsea vs Arsenal', status: 'Upcoming', tournament: 'Premier League' },
        { id: 'demo_7', display: '🔴 DEMO: Atletico Madrid vs Valencia', status: 'Live', tournament: 'La Liga' },
        { id: 'demo_8', display: '🔴 DEMO: Inter Milan vs Napoli', status: 'Upcoming', tournament: 'Serie A' }
      ];
      setSoccerMatches(demoMatches);
    } finally {
      setLoadingSoccer(false);
    }
  };

  // Fetch horse racing data
  const fetchHorseRaces = async () => {
    setLoadingHorse(true);
    try {
      console.log('🐎 Fetching horse racing data...');
      
      // Using demo data for horse racing as free APIs are limited
      const demoHorseRaces = [
        { id: 'horse_demo_1', display: '🔴 DEMO: Ascot Gold Cup', status: 'Live', tournament: 'Royal Ascot (Demo)' },
        { id: 'horse_demo_2', display: '🔴 DEMO: Kentucky Derby', status: 'Upcoming', tournament: 'Churchill Downs (Demo)' },
        { id: 'horse_demo_3', display: '🔴 DEMO: Melbourne Cup', status: 'Live', tournament: 'Flemington (Demo)' }
      ];
      setHorseRaces(demoHorseRaces);
      console.log('🐎 Loaded horse racing demo data');
    } catch (error) {
      console.error('❌ Horse Racing Error:', error.message);
    } finally {
      setLoadingHorse(false);
    }
  };

  // Fetch greyhound racing data
  const fetchGreyhoundRaces = async () => {
    setLoadingGreyhound(true);
    try {
      console.log('🐕 Fetching greyhound racing data...');
      
      // Using demo data for greyhound racing as free APIs are limited
      const demoGreyhoundRaces = [
        { id: 'greyhound_demo_1', display: '🔴 DEMO: Wimbledon Stadium Race 1', status: 'Live', tournament: 'Wimbledon Dogs (Demo)' },
        { id: 'greyhound_demo_2', display: '🔴 DEMO: Belle Vue Race 3', status: 'Upcoming', tournament: 'Belle Vue (Demo)' },
        { id: 'greyhound_demo_3', display: '🔴 DEMO: Towcester Race 2', status: 'Live', tournament: 'Towcester (Demo)' }
      ];
      setGreyhoundRaces(demoGreyhoundRaces);
      console.log('🐕 Loaded greyhound racing demo data');
    } catch (error) {
      console.error('❌ Greyhound Racing Error:', error.message);
    } finally {
      setLoadingGreyhound(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchTennisMatches(),
          fetchCricketMatches(),
          fetchSoccerMatches(),
          fetchHorseRaces(),
          fetchGreyhoundRaces()
        ]);
      } catch (error) {
        console.error('Error fetching sports data:', error);
      }
    };
    
    fetchAllData();
  }, []);

  // Sidebar links with sub-menu items and navigation
  const sidebarList = [
    { 
      name: "Soccer", 
      icon: <PiSoccerBallBold size={20} />, 
      link: "/soccer",
      hasSubMenu: true,
      subMenuItems: soccerMatches.map(match => match.display),
      loading: loadingSoccer
    },
    { 
      name: "Tennis", 
      icon: <img src={TennisIcon} alt="Tennis" width={20} height={20} />, 
      link: "/tennis", 
      hasSubMenu: true, 
      subMenuItems: tennisTournaments,
      loading: loadingTennis
    },
    { 
      name: "Cricket", 
      icon: <img src={CricketIcons} alt="Cricket" width={20} height={20} />, 
      link: "/cricket", 
      hasSubMenu: true, 
      subMenuItems: cricketMatches.map(match => match.display),
      loading: loadingCricket
    },
    { 
      name: "Horse Race", 
      icon: <img src={HorseRace} alt="Horse Race" width={20} height={20} />, 
      link: "/horse-race", 
      hasSubMenu: true, 
      subMenuItems: horseRaces.map(race => race.display),
      loading: loadingHorse
    },
    { 
      name: "Grayhound", 
      icon: <img src={DogIcon} alt="Grayhound" width={20} height={20} />, 
      link: "/gray-hound", 
      hasSubMenu: true, 
      subMenuItems: greyhoundRaces.map(race => race.display),
      loading: loadingGreyhound
    },
    { 
      name: "Sports Book", 
      icon: <img src={SportBook} alt="Sports Book" width={20} height={20} />, 
      link: "/sport-book",
      hasSubMenu: false
    },
    { 
      name: "RoyalStar Casino", 
      icon: <img src={RoyalStarCasino} alt="RoyalStar Casino" width={20} height={20} />, 
      link: "/royal-star-casino",
      hasSubMenu: false
    },
    { 
      name: "Star Casino", 
      icon: <img src={StarCasino} alt="Star Casino" width={20} height={20} />, 
      link: "/star-casino",
      hasSubMenu: false
    },
    { 
      name: "World Casino", 
      icon: <img src={WorldCasino} alt="World Casino" width={20} height={20} />, 
      link: "/world-casino",
      hasSubMenu: false
    },
    { 
      name: "Royal Casino", 
      icon: <img src={RoyalCasino} alt="Royal Casino" width={20} height={20} />, 
      link: "/royal-casino",
      hasSubMenu: false
    },
    { 
      name: "BetFairGames", 
      icon: <img src={BetFairGame} alt="BetFairGames" width={20} height={20} />, 
      link: "/betfair-game",
      hasSubMenu: false
    },
    { 
      name: "Teen Patti Studio", 
      icon: <img src={TeenPattiStudioImg} alt="Teen Patti Studio" width={20} height={20} />, 
      link: "/teen-patti-studio",
      hasSubMenu: false
    },
    { 
      name: "Galaxy Casino", 
      icon: <img src={GlaxiCasino} alt="Galaxy Casino" width={20} height={20} />, 
      link: "/galaxy-casino",
      hasSubMenu: false
    },
    { 
      name: "Current Position", 
      icon: <FaMoneyBills size={20} />, 
      link: "/current-position",
      hasSubMenu: false
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleSportClick = (item, index) => {
    if (item.hasSubMenu) {
      setSelectedSport(item);
      setShowSubMenu(true);
      setOpenDropdown(index);
      setShowMatchDetails(false);
    } else {
      // Navigate to the link for items without sub-menu
      navigate(item.link);
      setShowSubMenu(false);
      setShowMatchDetails(false);
      setOpenDropdown(null);
    }
  };

  const handleMatchClick = (matchId) => {
    // For tennis matches, find the complete match object
    if (selectedSport?.name === "Tennis") {
      const fullMatch = tennisTournaments.find(match => match.id === matchId);
      setSelectedMatch(fullMatch || matchId);
    } else {
      setSelectedMatch(matchId);
    }
    setShowMatchDetails(true);
    setShowSubMenu(false);
  };

  const closeMatchDetails = () => {
    setShowMatchDetails(false);
    setSelectedMatch("");
  };

  const handleLogoClick = () => {
    navigate('/');
    setShowSubMenu(false);
    setShowMatchDetails(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <Offcanvas
        show={screenSize === "desktop" || screenSize === "tablet" ? true : isSidebarOpen}
        onHide={toggleSidebar}
        scroll
        backdrop={!(screenSize === "desktop" || (screenSize === "tablet" && !isSidebarOpen))}
        placement="start"
        className={`bg-black sidebar-offcanvas ${
          screenSize === "tablet" && !isSidebarOpen ? "collapsed" : "expanded"
        }`}
        style={{
          zIndex: isSidebarOpen || screenSize === "desktop" ? 1099 : 2,
          width: "200px",
          marginTop: "-2px",
          border: 'none'
        }}
      >
        {/* Logo */}
        {!(screenSize === "tablet" && !isSidebarOpen) && (
          <Offcanvas.Header className="justify-content-center bg-black">
            <div 
              className="d-inline-block cursor-pointer"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={swapLogo}
                alt="swap logo"
                width={70}
                height="auto"
                className="img-fluid object-fit-contain"
              />
            </div>
          </Offcanvas.Header>
        )}

        {/* Sidebar Menu */}
        <Offcanvas.Body className="px-0 mainSidebar noScrollbar">
          <ListGroup>
            {sidebarList.map((item, index) => {
              const isActive = location.pathname === item.link;
              const isChildActive = item.children?.some((child) => location.pathname === child.link);
              const isSelected = openDropdown === index && item.hasSubMenu;

              return (
                <ListGroup.Item
                  key={index}
                  className={`bg-transparent p-0 ${
                    !(screenSize === "tablet" && !isSidebarOpen) ? "ms-3" : ""
                  }`}
                  style={{ border: "none" }}
                >
                  <div
                    className={`d-flex  justify-content-between align-items-center text-white gap-2 text-decoration-none p-2 cursor-pointer ${
                      isActive || isChildActive || isSelected ? "active" : "gray-acc"
                    }`}
                    onClick={() => handleSportClick(item, index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="icon">{item.icon}</span>
                      <span
                        className={`text-nowrap fs-14px ${
                          screenSize === "tablet" && !isSidebarOpen ? "d-none" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    {item.hasSubMenu && (
                      <span>{openDropdown === index ? <FaAngleDown /> : <FaAngleRight />}</span>
                    )}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Right Sub-menu Panel */}
      {showSubMenu && selectedSport && (
        <div
          className="position-fixed bg-dark text-white"
          style={{
            left: "200px",
            top: 0,
            width: "300px",
            height: "100vh",
            zIndex: 1098,
            padding: "20px",
            overflowY: "auto"
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{selectedSport.name}</h5>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => {
                setShowSubMenu(false);
                setSelectedSport(null);
                setOpenDropdown(null);
              }}
            >
              ×
            </button>
          </div>
          <div className="border-top pt-3">
            {selectedSport.loading && selectedSport.name === "Tennis" ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 mb-0 small">Loading matches...</p>
              </div>
            ) : (
              selectedSport.subMenuItems?.map((item, index) => (
                <div
                  key={index}
                  className="py-2 px-3 mb-2 bg-secondary rounded cursor-pointer hover-bg-primary"
                  style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onClick={() => handleMatchClick(selectedSport.name === "Tennis" && typeof item === 'object' ? item.id : item)}
                >
                  {selectedSport.name === "Tennis" && typeof item === 'object' ? (
                    <div>
                      <div className="fw-bold text-white" style={{ fontSize: '14px' }}>
                        {item.display}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="text-light opacity-75">{item.tournament}</small>
                        <span className={`badge ${
                          item.status === 'Live' ? 'bg-danger' : 
                          item.status === 'Upcoming' ? 'bg-warning text-dark' : 'bg-success'
                        }`} style={{ fontSize: '10px' }}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-white">{item}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Match Details Panel */}
      {showMatchDetails && (
        <div
          className="position-fixed bg-white"
          style={{
            left: "200px",
            top: 0,
            width: "calc(100vw - 200px)",
            height: "100vh",
            zIndex: 1097,
            overflowY: "auto"
          }}
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
            <h5 className="mb-0">Match Details</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={closeMatchDetails}
            >
              × Close
            </button>
          </div>
          <MatchDetails match={selectedMatch} onClose={closeMatchDetails} />
        </div>
      )}
    </>
  );
};
