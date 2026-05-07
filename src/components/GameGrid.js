import React from 'react';
import './GameGrid.css';

const GameGrid = ({ data }) => {
  const { grid_size, characters, obstacles, goal_position } = data;

  const getCharacterClass = (name) => {
    if (name === 'ELEVEN') return 'character eleven';
    if (name === 'MAX') return 'character max';
    return 'character monster';
  };

  const renderCells = () => {
    const cells = [];

    for (let y = 0; y < grid_size; y++) {
      for (let x = 0; x < grid_size; x++) {
        const occupant = characters.find(c => c.x_pos === x && c.y_pos === y);
        const hazard = obstacles.find(o => o.x_pos === x && o.y_pos === y);
        const isGoal = goal_position?.[0] === x && goal_position?.[1] === y;

        cells.push(
          <div key={`${x}-${y}`} className={`grid-cell ${isGoal ? 'goal-cell' : ''}`}>
            {isGoal && <span className="goal">EXIT</span>}
            {occupant && <span className={getCharacterClass(occupant.name)}>{occupant.name}</span>}
            {hazard && <span className={`hazard ${hazard.obstacle_type.toLowerCase()}`}>{hazard.obstacle_type}</span>}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div
      className="grid-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid_size}, 60px)`,
      }}
    >
      {renderCells()}
    </div>
  );
};

export default GameGrid;