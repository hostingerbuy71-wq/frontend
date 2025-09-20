import React, { useMemo, useState } from "react";
import "./AdminPanelPage.css";
import SevenUpDownImg from "../assets/sperateimg/7up-down.png";
import RouletteImg from "../assets/sperateimg/rouletee.png";
import TeenPattiImg from "../assets/sperateimg/teen-patti.png";
import BaccaratImg from "../assets/sperateimg/baccarat.png";
import DragonTigerImg from "../assets/sperateimg/dragontiger.png";
import CricketWarImg from "../assets/sperateimg/criketwar.png";

const TABS = [
  { key: "Lobby", label: "Lobby" },
  { key: "HiLo", label: "HiLo" },
  { key: "Roulette", label: "Roulette" },
  { key: "TeenPatti", label: "Teen Patti" },
  { key: "DragonTiger", label: "Dragon Tiger" },
  { key: "Baccarat", label: "Baccarat" },
  { key: "CricketWar", label: "Cricket War" },
];

const GAMES = [
  { id: 900001, name: "7 Up Down", image: SevenUpDownImg, categories: ["HiLo", "Lobby"] },
  { id: 900002, name: "Auto Roulette", image: RouletteImg, categories: ["Roulette", "Lobby"] },
  { id: 900003, name: "Teen Patti", image: TeenPattiImg, categories: ["TeenPatti", "Lobby"] },
  { id: 900004, name: "Dragon Tiger", image: DragonTigerImg, categories: ["DragonTiger", "Lobby"] },
  { id: 900005, name: "Cricket War", image: CricketWarImg, categories: ["CricketWar", "Lobby"] },
  { id: 900006, name: "Baccarat", image: BaccaratImg, categories: ["Baccarat", "Lobby"] },
];

const getGameHref = (gameId) => {
  if (gameId === 900001) return "/games/seven-updown";
  if (gameId === 900002) return "/games/roulette";
  if (gameId === 900003) return "/games/teen-patti";
  if (gameId === 900004) return "/games/dragon-tiger";
  return null; // no route yet for others
};

export default function AdminBetFairGamesPage() {
  const [active, setActive] = useState("Lobby");

  const items = useMemo(() => {
    if (active === "Lobby") return GAMES;
    return GAMES.filter((g) => g.categories.includes(active));
  }, [active]);

  return (
    <div className="match-page">
      <div className="panel">
        <div className="panel-hd">
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div className="side-tabs" style={{ padding: 0 }}>
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`tab ${active === t.key ? "active" : ""}`}
                  onClick={() => setActive(t.key)}
                  aria-pressed={active === t.key}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {items.map((game) => {
              const href = getGameHref(game.id);
              return (
                <div
                  key={game.id}
                  className="panel"
                  style={{
                    borderTop: "none",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ aspectRatio: "16/10", background: "#f6f7f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={game.image} alt={game.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {href ? (
                      <a className="link" href={href} aria-label={`Open ${game.name}`}>{game.name}</a>
                    ) : (
                      <span style={{ fontWeight: 700, color: "#374151" }}>{game.name}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}