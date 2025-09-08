import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TennisMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTennisMatches();
  }, []);

  const fetchTennisMatches = async () => {
    try {
      setLoading(true);
      // Using a tennis API to fetch live matches
      const response = await axios.get('https://tennis-api-atp-wta-itf.p.rapidapi.com/tennis/v2/atp/matches/live', {
        headers: {
          'X-RapidAPI-Key': '2f14fa981fmsh7edba18d6be8c58p1a2c76jsn68aba4546138',
          'X-RapidAPI-Host': 'tennis-api-atp-wta-itf.p.rapidapi.com'
        }
      });
      
      // Mock data for demonstration
      const mockMatches = [
        {
          id: '1.247380262',
          player1: 'Novak Djokovic',
          player2: 'Rafael Nadal',
          tournament: 'ATP Masters 1000',
          surface: 'Clay',
          status: 'Live',
          score: '6-4, 3-2',
          odds: {
            player1: 1.85,
            player2: 2.10
          },
          startTime: '2024-01-15 14:00',
          round: 'Quarter Final'
        },
        {
          id: '1.247380263',
          player1: 'Carlos Alcaraz',
          player2: 'Daniil Medvedev',
          tournament: 'ATP Masters 1000',
          surface: 'Hard',
          status: 'Upcoming',
          score: '',
          odds: {
            player1: 1.95,
            player2: 1.95
          },
          startTime: '2024-01-15 16:30',
          round: 'Semi Final'
        },
        {
          id: '1.247380264',
          player1: 'Stefanos Tsitsipas',
          player2: 'Alexander Zverev',
          tournament: 'ATP 500',
          surface: 'Hard',
          status: 'Finished',
          score: '6-3, 7-6',
          odds: {
            player1: 2.20,
            player2: 1.75
          },
          startTime: '2024-01-15 12:00',
          round: 'Final'
        }
      ];
      
      setMatches(mockMatches);
      setError(null);
    } catch (err) {
      console.error('Error fetching tennis matches:', err);
      setError('Failed to load tennis matches');
    } finally {
      setLoading(false);
    }
  };

  const handleMatchClick = (matchId) => {
    navigate(`/match-details/${matchId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'text-red-500';
      case 'Upcoming': return 'text-blue-500';
      case 'Finished': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg">Loading tennis matches...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button 
          onClick={fetchTennisMatches}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tennis Matches</h1>
      
      <div className="grid gap-4">
        {matches.map((match) => (
          <div 
            key={match.id}
            onClick={() => handleMatchClick(match.id)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">
                    {match.player1} vs {match.player2}
                  </h3>
                  <span className={`font-medium ${getStatusColor(match.status)}`}>
                    {match.status}
                  </span>
                </div>
                
                <div className="text-gray-600 mb-2">
                  <span className="mr-4">{match.tournament}</span>
                  <span className="mr-4">Surface: {match.surface}</span>
                  <span>{match.round}</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  Start Time: {match.startTime}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {match.score && (
                  <div className="text-lg font-medium text-blue-600">
                    Score: {match.score}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">{match.player1}</div>
                  <div className="text-lg font-bold text-green-600">{match.odds.player1}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">{match.player2}</div>
                  <div className="text-lg font-bold text-green-600">{match.odds.player2}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Match ID: {match.id}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {matches.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tennis matches available at the moment.
        </div>
      )}
    </div>
  );
};

export default TennisMatches;