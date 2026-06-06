import React, { useState } from 'react';
import "./GameSetup.css";
import Navbar from './Navbar';

const GameSetup = ({ onStartGame, onNavigate }) => {
  const [gridSize, setGridSize] = useState(5);
  const [difficulty, setDifficulty] = useState(1);
  const [gameMode, setGameMode] = useState('PVA');

  const handleSubmit = (e) => {
    e.preventDefault();

    onStartGame({
      grid_size: parseInt(gridSize),
      difficulty_level: parseInt(difficulty),
      game_mode: gameMode,
    });
  };

  return (
    <div className="setup-container">
      <Navbar currentPage="game" onNavigate={onNavigate} />

      <h2>Choose Your Escape</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Grid Size: {gridSize}x{gridSize}</label>
          <input
            type="range"
            min="5"
            max="8"
            value={gridSize}
            onChange={(e) => setGridSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Game Mode:</label>
          <select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
            <option value="PVA">Player vs AI</option>
            <option value="PVP">Player vs Player</option>
            <option value="P2VA">2 Players vs AI</option>
          </select>
        </div>

        <div className="form-group">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="1">Level 1: Minimax - Demogorgon</option>
            <option value="2">Level 2: Alpha-Beta - Demogorgon</option>
            <option value="3">Level 3: A* - Shadowmonster</option>
            <option value="4">Level 4: MCTS - Mindflayer</option>
          </select>
        </div>

        <button type="submit">Enter the Upside Down</button>
      </form>
    </div>
  );
};

export default GameSetup;