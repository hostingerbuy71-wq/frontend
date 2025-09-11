import React, { useState, useEffect } from "react";
import { FaClock, FaInfoCircle, FaCaretUp, FaCaretDown, FaPlay, FaChartLine, FaTrophy, FaUsers, FaCalendarAlt, FaVideo, FaExpand, FaVolumeUp, FaVolumeMute, FaPause, FaStopwatch, FaThermometerHalf, FaWind, FaEye, FaHeart, FaStar } from "react-icons/fa";
import { PiSoccerBallBold } from "react-icons/pi";
import { MdSportsSoccer, MdSportsTennis, MdSportsCricket, MdHd, MdFullscreen } from "react-icons/md";

const MatchDetails = ({ match }) => {
  const [activeTab, setActiveTab] = useState("stream");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liveScore, setLiveScore] = useState({
    player1: { name: "R. Nadal", sets: [6, 4, 5], currentGame: 3 },
    player2: { name: "N. Djokovic", sets: [4, 6, 3], currentGame: 2 }
  });

  // Detect sport type from match data
  const getSportType = () => {
    if (!match || !match.display) return 'tennis';
    
    const display = match.display.toLowerCase();
    if (display.includes('🏏') || display.includes('cricket') || match.tournament?.toLowerCase().includes('cricket')) {
      return 'cricket';
    }
    if (display.includes('⚽') || display.includes('soccer') || display.includes('football') || match.tournament?.toLowerCase().includes('league')) {
      return 'soccer';
    }
    if (display.includes('🐎') || display.includes('horse') || match.tournament?.toLowerCase().includes('ascot') || match.tournament?.toLowerCase().includes('derby')) {
      return 'horse';
    }
    if (display.includes('🐕') || display.includes('greyhound') || display.includes('dog')) {
      return 'greyhound';
    }
    return 'tennis'; // default
  };

  const sportType = getSportType();

  // Extract team/player names from match prop
  const getTeamNames = () => {
    if (match && typeof match === 'object' && match.display) {
      // Remove demo indicators and emojis
      const cleanDisplay = match.display.replace(/🔴 DEMO: |⚠️ API Failed: |🏏 |⚽ |🐎 |🐕 /g, '');
      const teams = cleanDisplay.split(' vs ');
      if (teams.length === 2) {
        return {
          team1: teams[0].trim(),
          team2: teams[1].trim()
        };
      }
    }
    
    // Default names based on sport type
    const defaults = {
      tennis: { team1: "R. Nadal", team2: "N. Djokovic" },
      cricket: { team1: "India", team2: "Australia" },
      soccer: { team1: "Manchester United", team2: "Liverpool" },
      horse: { team1: "Thunder Bolt", team2: "Lightning Strike" },
      greyhound: { team1: "Speedy Runner", team2: "Fast Track" }
    };
    
    return defaults[sportType] || defaults.tennis;
  };

  const teamNames = getTeamNames();

  // Get sport-specific score format
  const getSportScore = () => {
    switch(sportType) {
      case 'cricket':
        return {
          team1: { name: teamNames.team1, score: "245/6", overs: "45.2" },
          team2: { name: teamNames.team2, score: "198/8", overs: "40.0" }
        };
      case 'soccer':
        return {
          team1: { name: teamNames.team1, score: "2", time: "67'" },
          team2: { name: teamNames.team2, score: "1", time: "67'" }
        };
      case 'horse':
        return {
          team1: { name: teamNames.team1, position: "1st", odds: "3/1" },
          team2: { name: teamNames.team2, position: "2nd", odds: "5/2" }
        };
      case 'greyhound':
        return {
          team1: { name: teamNames.team1, position: "1st", time: "29.45s" },
          team2: { name: teamNames.team2, position: "2nd", time: "29.67s" }
        };
      default: // tennis
        return {
          player1: { name: teamNames.team1, sets: [6, 4, 5], currentGame: 3 },
          player2: { name: teamNames.team2, sets: [4, 6, 3], currentGame: 2 }
        };
    }
  };

  // Update live score based on sport type
  useEffect(() => {
    setLiveScore(getSportScore());
    setLoading(false);
  }, [match]);

  return (
    <div className="match-details-container" style={{ width: '100%', maxWidth: '100vw', margin: 0, padding: 0, boxSizing: 'border-box', overflowX: 'hidden' }}>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes pulse {
            0% {
              opacity: 0.5;
              transform: scaleY(1);
            }
            50% {
              opacity: 1;
              transform: scaleY(1.1);
            }
            100% {
              opacity: 0.5;
              transform: scaleY(1);
            }
          }
          
          @keyframes glow {
            0% {
              filter: drop-shadow(0 0 5px #ff4757);
            }
            100% {
              filter: drop-shadow(0 0 20px #ff4757);
            }
          }
          
          @keyframes ripple {
            0% {
              transform: translateX(-50%) scale(0.8);
              opacity: 1;
            }
            100% {
              transform: translateX(-50%) scale(1.2);
              opacity: 0;
            }
          }
          
          @keyframes slideIn {
             0% {
               transform: translateX(-100%);
               opacity: 0;
             }
             100% {
               transform: translateX(0);
               opacity: 1;
             }
           }
           
           @keyframes playerMove {
             0%, 100% {
               transform: translateX(0) translateY(0);
             }
             25% {
               transform: translateX(-10px) translateY(-5px);
             }
             50% {
               transform: translateX(5px) translateY(-8px);
             }
             75% {
               transform: translateX(-5px) translateY(-3px);
             }
           }
           
           @keyframes playerMove2 {
             0%, 100% {
               transform: translateX(0) translateY(0);
             }
             25% {
               transform: translateX(10px) translateY(-5px);
             }
             50% {
               transform: translateX(-5px) translateY(-8px);
             }
             75% {
               transform: translateX(5px) translateY(-3px);
             }
           }
           
           @keyframes racketSwing {
             0%, 100% {
               transform: rotate(-30deg);
             }
             50% {
               transform: rotate(-60deg) scale(1.1);
             }
           }
           
           @keyframes racketSwing2 {
              0%, 100% {
                transform: rotate(30deg);
              }
              50% {
                transform: rotate(60deg) scale(1.1);
              }
            }
            
            @keyframes ballMovement {
              0% {
                transform: translateX(0) translateY(0);
              }
              25% {
                transform: translateX(-200px) translateY(-30px);
              }
              50% {
                transform: translateX(-400px) translateY(0);
              }
              75% {
                transform: translateX(-200px) translateY(-20px);
              }
              100% {
                transform: translateX(0) translateY(0);
              }
            }
            
            @keyframes ballTrail {
              0% {
                transform: translateX(0) translateY(0);
                opacity: 0.4;
              }
              25% {
                transform: translateX(-180px) translateY(-25px);
                opacity: 0.2;
              }
              50% {
                transform: translateX(-360px) translateY(0);
                opacity: 0.1;
              }
              75% {
                transform: translateX(-180px) translateY(-15px);
                opacity: 0.2;
              }
              100% {
                transform: translateX(0) translateY(0);
                opacity: 0.4;
              }
            }
            
            @keyframes crowdCheer {
               0%, 100% {
                 opacity: 0.7;
                 transform: scale(1);
               }
               50% {
                 opacity: 1;
                 transform: scale(1.05);
               }
             }
             
             @keyframes sweatDrop {
               0% {
                 opacity: 1;
                 transform: translateY(0);
               }
               100% {
                 opacity: 0;
                 transform: translateY(15px);
               }
             }
             
             @keyframes courtImpact {
               0% {
                 transform: scale(0);
                 opacity: 1;
               }
               50% {
                 transform: scale(1.2);
                 opacity: 0.7;
               }
               100% {
                 transform: scale(2);
                 opacity: 0;
               }
             }
        `}
      </style>
      {/* Responsive tweaks for MatchDetails */}
      <style>{`
        .match-header { padding: 16px 0; }
        .match-title { font-weight: 700; }
        .live-stream-section { height: 400px !important; }
        @media (max-width: 576px) {
          .match-details-container { width: 100vw; max-width: 100vw; }
          .live-stream-section { height: 240px !important; }
          .live-score-overlay { left: 10px !important; width: calc(100% - 20px) !important; min-width: auto !important; }
          .video-controls { bottom: 10px !important; }
          .match-title { font-size: 20px !important; }
          .match-meta span { display: block; font-size: 12px; }
        }
      `}</style>
      {/* Match Header */}
      <div className="match-header">
        <div className="match-status">
          <span className="live-indicator">LIVE</span>
          <span className="match-time">2h 15m</span>
        </div>
        <h2 className="match-title">{`${teamNames.team1} vs ${teamNames.team2}`}</h2>
        <div className="match-meta">
          <span>{match?.tournament || 'Exhibition'}{match?.status ? ` • ${match.status}` : ''}</span>
          <span>{match?.startTime || 'Today'}{sportType === 'tennis' ? ' • Hard Court' : ''}</span>
        </div>
      </div>

      {/* Live Stream Section */}
      <div className="live-stream-section" style={{background: '#000', borderRadius: '12px', overflow: 'hidden', position: 'relative', height: '400px', margin: '20px 0'}}>
        <div className="video-player" style={{width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
          
          {/* Animated Tennis Court Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #2d5016 100%)',
            opacity: 0.3
          }}>
            {/* Court Lines Animation */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: '2px',
              background: 'white',
              animation: 'pulse 2s infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '2px',
              height: '100%',
              background: 'white',
              opacity: 0.5
            }}></div>
          </div>
          
          {/* Animated Tennis Ball */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '30px',
            height: '30px',
            background: 'radial-gradient(circle at 30% 30%, #ffff00, #cccc00)',
            borderRadius: '50%',
            animation: 'ballMovement 4s infinite ease-in-out',
            boxShadow: '0 4px 8px rgba(255, 255, 0, 0.3)'
          }}></div>
          
          {/* Ball Trail Effect */}
          <div style={{
            position: 'absolute',
            top: '25px',
            right: '25px',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(255, 255, 0, 0.4), transparent)',
            borderRadius: '50%',
            animation: 'ballTrail 4s infinite ease-in-out'
          }}></div>
          
          {/* Crowd Atmosphere */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontSize: '12px',
            color: '#ffffff',
            opacity: 0.7,
            animation: 'crowdCheer 3s infinite'
          }}>👏 CROWD CHEERING 👏</div>
          
          {/* Match Intensity Indicator */}
           <div style={{
             position: 'absolute',
             top: '10px',
             right: '10px',
             fontSize: '10px',
             color: '#ff4757',
             fontWeight: 'bold',
             animation: 'pulse 1s infinite'
           }}>🔥 INTENSE RALLY 🔥</div>
           
           {/* Ball Impact Effects */}
           <div style={{
             position: 'absolute',
             bottom: '70px',
             left: '30%',
             width: '20px',
             height: '20px',
             border: '2px solid #ffffff',
             borderRadius: '50%',
             animation: 'courtImpact 2s infinite'
           }}></div>
           
           <div style={{
             position: 'absolute',
             bottom: '70px',
             right: '30%',
             width: '20px',
             height: '20px',
             border: '2px solid #ffffff',
             borderRadius: '50%',
             animation: 'courtImpact 2.5s infinite'
           }}></div>
           
           {/* Sound Wave Effects */}
           <div style={{
             position: 'absolute',
             bottom: '50px',
             left: '50%',
             transform: 'translateX(-50%)',
             fontSize: '14px',
             color: '#ffa502',
             animation: 'pulse 0.8s infinite'
           }}>♪ THWACK! ♪</div>
          
          {/* Animated Player 1 (Left Side) */}
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '15%',
            width: '40px',
            height: '60px',
            animation: 'playerMove 3s infinite ease-in-out'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: '#ffdbac',
              borderRadius: '50%',
              margin: '0 auto 2px'
            }}></div>
            <div style={{
              width: '16px',
              height: '25px',
              background: '#ff4757',
              margin: '0 auto 2px',
              borderRadius: '2px'
            }}></div>
            <div style={{
              width: '8px',
              height: '20px',
              background: '#2c5aa0',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
            <div style={{
               position: 'absolute',
               top: '15px',
               right: '-8px',
               width: '15px',
               height: '3px',
               background: '#8b4513',
               borderRadius: '2px',
               transform: 'rotate(-30deg)',
               animation: 'racketSwing 1.5s infinite'
             }}></div>
             {/* Sweat Effect Player 1 */}
             <div style={{
               position: 'absolute',
               top: '8px',
               left: '8px',
               width: '3px',
               height: '3px',
               background: '#87ceeb',
               borderRadius: '50%',
               animation: 'sweatDrop 2s infinite'
             }}></div>
             <div style={{
               position: 'absolute',
               top: '10px',
               right: '8px',
               width: '2px',
               height: '2px',
               background: '#87ceeb',
               borderRadius: '50%',
               animation: 'sweatDrop 2.5s infinite'
             }}></div>
           </div>
          
          {/* Animated Player 2 (Right Side) */}
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '15%',
            width: '40px',
            height: '60px',
            animation: 'playerMove2 3s infinite ease-in-out'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: '#ffdbac',
              borderRadius: '50%',
              margin: '0 auto 2px'
            }}></div>
            <div style={{
              width: '16px',
              height: '25px',
              background: '#28a745',
              margin: '0 auto 2px',
              borderRadius: '2px'
            }}></div>
            <div style={{
              width: '8px',
              height: '20px',
              background: '#ffffff',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
            <div style={{
               position: 'absolute',
               top: '15px',
               left: '-8px',
               width: '15px',
               height: '3px',
               background: '#8b4513',
               borderRadius: '2px',
               transform: 'rotate(30deg)',
               animation: 'racketSwing2 1.5s infinite'
             }}></div>
             {/* Sweat Effect Player 2 */}
             <div style={{
               position: 'absolute',
               top: '8px',
               left: '8px',
               width: '3px',
               height: '3px',
               background: '#87ceeb',
               borderRadius: '50%',
               animation: 'sweatDrop 2.2s infinite'
             }}></div>
             <div style={{
               position: 'absolute',
               top: '10px',
               right: '8px',
               width: '2px',
               height: '2px',
               background: '#87ceeb',
               borderRadius: '50%',
               animation: 'sweatDrop 2.7s infinite'
             }}></div>
           </div>
           
           {/* Tennis Net */}
           <div style={{
             position: 'absolute',
             bottom: '60px',
             left: '50%',
             transform: 'translateX(-50%)',
             width: '4px',
             height: '40px',
             background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 20%, transparent 20%, transparent 40%, #ffffff 40%, #ffffff 60%, transparent 60%, transparent 80%, #ffffff 80%, #ffffff 100%)',
             zIndex: 1
           }}></div>
           
           {/* Court Center Line */}
           <div style={{
             position: 'absolute',
             bottom: '40px',
             left: '50%',
             transform: 'translateX(-50%)',
             width: '80%',
             height: '2px',
             background: '#ffffff',
             opacity: 0.6,
             zIndex: 1
           }}></div>
           
           {/* Service Lines */}
           <div style={{
             position: 'absolute',
             bottom: '60px',
             left: '25%',
             width: '2px',
             height: '30px',
             background: '#ffffff',
             opacity: 0.5,
             zIndex: 1
           }}></div>
           <div style={{
             position: 'absolute',
             bottom: '60px',
             right: '25%',
             width: '2px',
             height: '30px',
             background: '#ffffff',
             opacity: 0.5,
             zIndex: 1
           }}></div>
           
            <div className="video-placeholder" style={{textAlign: 'center', color: 'white', zIndex: 2}}>
            <div style={{position: 'relative'}}>
              <FaVideo size={60} style={{marginBottom: '20px', opacity: 0.9, animation: 'glow 2s infinite alternate'}} />
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                border: '2px solid #ff4757',
                borderRadius: '50%',
                animation: 'ripple 2s infinite'
              }}></div>
            </div>
            <h3 style={{margin: '0 0 10px 0', fontSize: '24px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>🎾 Live {sportType.charAt(0).toUpperCase() + sportType.slice(1)} Stream</h3>
            <p style={{margin: 0, opacity: 0.9, fontSize: '16px'}}>{`${teamNames.team1} vs ${teamNames.team2}`}{match?.tournament ? ` - ${match.tournament}` : ''}</p>
            <div style={{
              marginTop: '15px',
              padding: '8px 16px',
              background: 'rgba(255, 71, 87, 0.8)',
              borderRadius: '20px',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }}>
              <span style={{fontSize: '14px', fontWeight: 'bold'}}>🔴 LIVE</span>
            </div>
          </div>
          
          {/* Live Score Overlay - Dynamic based on sport type */}
          <div className="live-score-overlay" style={{position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.9)', padding: '15px', borderRadius: '8px', color: 'white', minWidth: '300px', animation: 'slideIn 1s ease-out', boxShadow: '0 4px 20px rgba(255, 71, 87, 0.3)', border: '1px solid rgba(255, 71, 87, 0.5)'}}>
            {sportType === 'tennis' && (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.player1?.name}</span>
                  <div style={{display: 'flex', gap: '8px'}}>
                    {liveScore.player1?.sets?.map((set, index) => (
                      <span key={index} style={{background: '#28a745', padding: '2px 8px', borderRadius: '4px', fontSize: '14px', animation: 'pulse 2s infinite', boxShadow: '0 2px 8px rgba(40, 167, 69, 0.4)'}}>{set}</span>
                    ))}
                    <span style={{background: '#ff4757', padding: '2px 8px', borderRadius: '4px', fontSize: '14px', animation: 'glow 1.5s infinite alternate', fontWeight: 'bold'}}>{liveScore.player1?.currentGame}</span>
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.player2?.name}</span>
                  <div style={{display: 'flex', gap: '8px'}}>
                    {liveScore.player2?.sets?.map((set, index) => (
                      <span key={index} style={{background: '#28a745', padding: '2px 8px', borderRadius: '4px', fontSize: '14px', animation: 'pulse 2s infinite', boxShadow: '0 2px 8px rgba(40, 167, 69, 0.4)'}}>{set}</span>
                    ))}
                    <span style={{background: '#ff4757', padding: '2px 8px', borderRadius: '4px', fontSize: '14px', animation: 'glow 1.5s infinite alternate', fontWeight: 'bold'}}>{liveScore.player2?.currentGame}</span>
                  </div>
                </div>
              </>
            )}
            
            {sportType === 'cricket' && (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.team1?.name}</span>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{background: '#28a745', padding: '4px 12px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold'}}>{liveScore.team1?.score}</span>
                    <span style={{background: '#007bff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>({liveScore.team1?.overs} overs)</span>
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.team2?.name}</span>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{background: '#28a745', padding: '4px 12px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold'}}>{liveScore.team2?.score}</span>
                    <span style={{background: '#007bff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>({liveScore.team2?.overs} overs)</span>
                  </div>
                </div>
              </>
            )}
            
            {sportType === 'soccer' && (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.team1?.name}</span>
                  <span style={{background: '#28a745', padding: '4px 12px', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold'}}>{liveScore.team1?.score}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.team2?.name}</span>
                  <span style={{background: '#28a745', padding: '4px 12px', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold'}}>{liveScore.team2?.score}</span>
                </div>
                <div style={{textAlign: 'center', padding: '5px', background: 'rgba(255, 71, 87, 0.2)', borderRadius: '4px'}}>
                  <span style={{fontSize: '14px', fontWeight: 'bold'}}>⏱️ {liveScore.team1?.time}</span>
                </div>
              </>
            )}
            
            {(sportType === 'horse' || sportType === 'greyhound') && (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.team1?.name}</span>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{background: '#ffd700', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold'}}>{liveScore.team1?.position}</span>
                    {sportType === 'horse' && <span style={{background: '#007bff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>{liveScore.team1?.odds}</span>}
                    {sportType === 'greyhound' && <span style={{background: '#007bff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>{liveScore.team1?.time}</span>}
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>{liveScore.team2?.name}</span>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{background: '#c0c0c0', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold'}}>{liveScore.team2?.position}</span>
                    {sportType === 'horse' && <span style={{background: '#007bff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>{liveScore.team2?.odds}</span>}
                    {sportType === 'greyhound' && <span style={{background: '#007bff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px'}}>{liveScore.team2?.time}</span>}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Video Controls */}
          <div className="video-controls" style={{position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', background: 'rgba(0,0,0,0.9)', padding: '10px 20px', borderRadius: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '50%', transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 71, 87, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '50%', transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 71, 87, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '50%', transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 71, 87, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              <FaExpand size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Live Match Progress */}
      <div className="live-match-progress" style={{background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', margin: '20px 0', border: '2px solid #ff4757'}}>
        <h4 style={{marginBottom: '20px', color: '#ff4757', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <FaStopwatch size={20} />
          Live Match Progress
        </h4>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px'}}>
          <div style={{textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <h6 style={{color: '#666', marginBottom: '5px'}}>Match Duration</h6>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#ff4757'}}>2h 15m</div>
          </div>
          <div style={{textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <h6 style={{color: '#666', marginBottom: '5px'}}>Current Set</h6>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2c5aa0'}}>Set 3</div>
          </div>
          <div style={{textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <h6 style={{color: '#666', marginBottom: '5px'}}>Games Played</h6>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#28a745'}}>25</div>
          </div>
          <div style={{textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px'}}>
            <h6 style={{color: '#666', marginBottom: '5px'}}>Total Points</h6>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#6f42c1'}}>156</div>
          </div>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
          <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px'}}>
            <h6 style={{color: '#333', marginBottom: '10px'}}>{teamNames.team1} - Set by Set</h6>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <span style={{background: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>6</span>
              <span style={{background: '#dc3545', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>4</span>
              <span style={{background: '#ffc107', color: 'black', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>5*</span>
            </div>
          </div>
          <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px'}}>
            <h6 style={{color: '#333', marginBottom: '10px'}}>{teamNames.team2} - Set by Set</h6>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <span style={{background: '#dc3545', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>4</span>
              <span style={{background: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>6</span>
              <span style={{background: '#ffc107', color: 'black', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold'}}>3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Match Statistics */}
      <div className="match-statistics" style={{background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', margin: '20px 0'}}>
        <h4 style={{marginBottom: '20px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <FaChartLine size={20} color="#2c5aa0" />
          Comprehensive Match Statistics
        </h4>
        
        <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
          <div className="stat-item" style={{background: '#f8f9fa', padding: '15px', borderRadius: '6px'}}>
            <h6 style={{color: '#666', marginBottom: '10px'}}>Aces</h6>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{teamNames.team1}: <strong style={{color: '#28a745'}}>8</strong></span>
              <span>{teamNames.team2}: <strong style={{color: '#dc3545'}}>5</strong></span>
            </div>
          </div>
          
          <div className="stat-item" style={{background: '#f8f9fa', padding: '15px', borderRadius: '6px'}}>
            <h6 style={{color: '#666', marginBottom: '10px'}}>Winners</h6>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{teamNames.team1}: <strong style={{color: '#28a745'}}>15</strong></span>
              <span>{teamNames.team2}: <strong style={{color: '#dc3545'}}>12</strong></span>
            </div>
          </div>
          
          <div className="stat-item" style={{background: '#f8f9fa', padding: '15px', borderRadius: '6px'}}>
            <h6 style={{color: '#666', marginBottom: '10px'}}>Unforced Errors</h6>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{teamNames.team1}: <strong style={{color: '#28a745'}}>8</strong></span>
              <span>{teamNames.team2}: <strong style={{color: '#dc3545'}}>11</strong></span>
            </div>
          </div>
          
          <div className="stat-item" style={{background: '#f8f9fa', padding: '15px', borderRadius: '6px'}}>
            <h6 style={{color: '#666', marginBottom: '10px'}}>Break Points</h6>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{teamNames.team1}: <strong style={{color: '#28a745'}}>3/5</strong></span>
              <span>{teamNames.team2}: <strong style={{color: '#dc3545'}}>1/3</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather & Court Conditions */}
      <div className="conditions" style={{background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', margin: '20px 0'}}>
        <h4 style={{marginBottom: '20px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <FaThermometerHalf size={20} color="#ff6b6b" />
          Court & Weather Conditions
        </h4>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
          <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center'}}>
            <FaThermometerHalf size={24} style={{marginBottom: '10px', color: '#ff6b6b'}} />
            <h6 style={{color: '#666', marginBottom: '5px'}}>Temperature</h6>
            <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ff6b6b'}}>24°C</div>
          </div>
          
          <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center'}}>
            <FaWind size={24} style={{marginBottom: '10px', color: '#2c5aa0'}} />
            <h6 style={{color: '#666', marginBottom: '5px'}}>Wind</h6>
            <div style={{fontSize: '20px', fontWeight: 'bold', color: '#2c5aa0'}}>8 km/h</div>
          </div>
          
          <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center'}}>
            <FaEye size={24} style={{marginBottom: '10px', color: '#28a745'}} />
            <h6 style={{color: '#666', marginBottom: '5px'}}>Humidity</h6>
            <div style={{fontSize: '20px', fontWeight: 'bold', color: '#28a745'}}>65%</div>
          </div>
          
          <div style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', textAlign: 'center'}}>
            <FaStar size={24} style={{marginBottom: '10px', color: '#ffc107'}} />
            <h6 style={{color: '#666', marginBottom: '5px'}}>Court Surface</h6>
            <div style={{fontSize: '16px', fontWeight: 'bold', color: '#ffc107'}}>Hard Court</div>
            <div style={{fontSize: '12px', color: '#666'}}>Centre Court</div>
          </div>
        </div>
      </div>

      {/* Match Odds Section */}
      <div className="match-odds">
        <h4>Match Odds</h4>
        <div className="odds-table">
          <div className="odds-header">
            <span></span>
            <span>Back</span>
            <span>Lay</span>
          </div>
          <div className="odds-row">
            <span className="team-name">Rafael Nadal</span>
            <div className="odds-group">
              <div className="odds-cell back">
                <div className="odds-price">1.85</div>
                <div className="odds-amount">$1,250</div>
              </div>
              <div className="odds-cell back">
                <div className="odds-price">1.86</div>
                <div className="odds-amount">$890</div>
              </div>
              <div className="odds-cell back">
                <div className="odds-price">1.87</div>
                <div className="odds-amount">$2,100</div>
              </div>
            </div>
            <div className="odds-group">
              <div className="odds-cell lay">
                <div className="odds-price">1.88</div>
                <div className="odds-amount">$1,750</div>
              </div>
              <div className="odds-cell lay">
                <div className="odds-price">1.89</div>
                <div className="odds-amount">$950</div>
              </div>
              <div className="odds-cell lay">
                <div className="odds-price">1.90</div>
                <div className="odds-amount">$1,400</div>
              </div>
            </div>
          </div>
          <div className="odds-row">
            <span className="team-name">Novak Djokovic</span>
            <div className="odds-group">
              <div className="odds-cell back">
                <div className="odds-price">2.15</div>
                <div className="odds-amount">$980</div>
              </div>
              <div className="odds-cell back">
                <div className="odds-price">2.16</div>
                <div className="odds-amount">$1,200</div>
              </div>
              <div className="odds-cell back">
                <div className="odds-price">2.17</div>
                <div className="odds-amount">$750</div>
              </div>
            </div>
            <div className="odds-group">
              <div className="odds-cell lay">
                <div className="odds-price">2.18</div>
                <div className="odds-amount">$1,100</div>
              </div>
              <div className="odds-cell lay">
                <div className="odds-price">2.19</div>
                <div className="odds-amount">$850</div>
              </div>
              <div className="odds-cell lay">
                <div className="odds-price">2.20</div>
                <div className="odds-amount">$1,300</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Betting Slip */}
      <div className="betting-slip">
        <h4>Betting Slip</h4>
        <div className="bet-input">
          <label>Odds:</label>
          <input type="number" step="0.01" placeholder="Enter odds" />
        </div>
        <div className="bet-input">
          <label>Stake:</label>
          <input type="number" step="0.01" placeholder="Enter stake" />
        </div>
        <div className="quick-amounts">
          <button>$10</button>
          <button>$25</button>
          <button>$50</button>
          <button>$100</button>
        </div>
        <div className="bet-actions">
          <button className="place-bet-btn">Place Bet</button>
          <button className="clear-bet-btn">Clear</button>
        </div>
      </div>

      {/* Open Bets */}
      <div className="open-bets">
        <h4>Open Bets</h4>
        <div className="bet-item">
          <span>Rafael Nadal to Win</span>
          <span>$50 @ 1.85</span>
          <span className="potential-return">Returns: $92.50</span>
        </div>
      </div>

      {/* Matched Bets */}
      <div className="matched-bets">
        <h4>Matched Bets</h4>
        <div className="bet-item">
          <span>Novak Djokovic to Win Set 1</span>
          <span>$25 @ 2.10</span>
          <span className="status matched">Matched</span>
        </div>
      </div>

      {/* Related Events */}
      <div className="related-events">
        <h4>Related Events</h4>
        <div className="event-list">
          <div className="event-item">
            <span className="event-time">15:30</span>
            <span className="event-name">Women's Singles Final</span>
          </div>
          <div className="event-item">
            <span className="event-time">17:00</span>
            <span className="event-name">Men's Doubles Final</span>
          </div>
          <div className="event-item">
            <span className="event-time">19:30</span>
            <span className="event-name">Mixed Doubles Final</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;