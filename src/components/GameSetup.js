import React, { useState } from 'react';

const GameSetup = ({ onStartGame }) => {
  // Requirement: Grid sizes 5x5 to 8x8 and Difficulty Levels 1-4
  const [gridSize, setGridSize] = useState(5);
  const [difficulty, setDifficulty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending interactions back up the component tree to the root
    onStartGame({
      grid_size: parseInt(gridSize),
      difficulty_level: parseInt(difficulty),
      game_mode: "PVA" // Player vs AI
    });
  };

  return (
    <div className="setup-container">
      <h2>Stranger Things: Choose Your Escape</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Grid Size: {gridSize}x{gridSize}</label>
          <input 
            type="range" min="5" max="8" 
            value={gridSize} 
            onChange={(e) => setDifficulty(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Difficulty (AI Algorithm):</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="1">Level 1: Minimax (Demogorgon)</option>
            <option value="2">Level 2: Alpha-Beta (Pruned Demogorgon)</option>
            <option value="3">Level 3: A* (Shadowmonster)</option>
            <option value="4">Level 4: MCTS (Mindflayer)</option>
          </select>
        </div>

        <button type="submit" className="btn-start">Enter the Upside Down</button>
      </form>
    </div>
  );
};

export default GameSetup;