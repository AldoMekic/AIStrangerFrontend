import React from 'react';
import './GameGrid.css';

const GameGrid = ({ data }) => {
  const { grid_size, characters, obstacles } = data;

  // Creating the State Space visualization
  const renderCells = () => {
    let cells = [];
    for (let y = 0; y < grid_size; y++) {
      for (let x = 0; x < grid_size; x++) {
        // Check if a character or hazard is at this (x, y) coordinate
        const occupant = characters.find(c => c.x_pos === x && c.y_pos === y);
        const hazard = obstacles.find(o => o.x_pos === x && o.y_pos === y);

        cells.push(
          <div key={`${x}-${y}`} className="grid-cell">
            {occupant && <span className="character">{occupant.name}</span>}
            {hazard && <span className="hazard">{hazard.obstacle_type}</span>}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="grid-container" style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(${grid_size}, 50px)` 
    }}>
      {renderCells()}
    </div>
  );
};

export default GameGrid;