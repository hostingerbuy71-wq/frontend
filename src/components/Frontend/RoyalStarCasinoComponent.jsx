import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoyalStarCasinoComponent.css';
import SevenUpDown from '../../assets/sperateimg/7up-down.png'
import Rouletee from '../../assets/sperateimg/rouletee.png'
import TeenPatti from '../../assets/sperateimg/teen-patti.png'
import Beccarat from '../../assets/sperateimg/baccarat.png'
import DragonTiger from '../../assets/sperateimg/dragontiger.png'
import CricketWar from '../../assets/sperateimg/criketwar.png'


export const RoyalStarCasinoComponent = () => {
  const fallbackGames = [
    { id: 900001, name: '7 Up Down', image: SevenUpDown },
    { id: 900002, name: 'Auto Roulette', image: Rouletee },
    { id: 900003, name: 'Teen Patti', image: TeenPatti },
    { id: 900004, name: 'Dragon Tiger', image: DragonTiger },
    { id: 900005, name: 'Cricket War', image: CricketWar },
    { id: 900006, name: 'Baccarat', image: Beccarat },
  ];

  const [games, setGames] = useState(fallbackGames);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await axios.get('/api/games');
        if (!ignore && data?.success && Array.isArray(data.games)) {
          // Start with API games merged with fallback metadata
          const mergedFromApi = data.games.map((g) => {
            const fb = fallbackGames.find(f => f.id === g.id);
            return { ...g, name: fb?.name || g.name, image: fb?.image || g.image };
          });
          // Ensure fallback-only games (like Teen Patti, Dragon Tiger, Cricket War, Baccarat) appear
          const existingIds = new Set(mergedFromApi.map(g => g.id));
          const onlyFallback = fallbackGames.filter(f => !existingIds.has(f.id));
          setGames([...mergedFromApi, ...onlyFallback]);
        }
      } catch (e) {
        console.warn('Failed to load games from API, using fallback list');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const getGameHref = (gameId) => {
    if (gameId === 900001) return '/games/seven-updown';
    if (gameId === 900002) return '/games/roulette';
    if (gameId === 900003) return '/games/teen-patti';
    if (gameId === 900004) return '/games/dragon-tiger';
    return `/Common/RSC?id=${gameId}&d=d`;
  };

  return (
    <div className="casino-games-container min-h-100vh">
      {games.map((game) => (
        <div key={game.id} className="game-card h-100 w-100">
          <a
            href={getGameHref(game.id)}
            className="game-link"
            aria-label={`Launch ${game.name}`}
          >
            <img src={game.image}  className="" alt={game.name} loading="lazy" style={{objectFit:"cover",height:"130",width:"200px"}}/>
          </a>
        </div>
      ))}
    </div>
  );
};

export default RoyalStarCasinoComponent;
