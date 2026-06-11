import React from 'react';
import './GameGrid.css';
import elevenImg from '../images/eleven.jpg';
import maxImg from '../images/max.jpg';
import demogorgonImg from '../images/demogorgon.jpg';
import shadowmonsterImg from '../images/shadowmonster.jpg';
import mindflayerImg from '../images/mindflayer.jpg';
import veinImg from '../images/veins.jpg';
import trapImg from '../images/trap.jpg';

const GameGrid = ({ data, hoveredTeleportTarget, hoveredMoveTarget }) => {
  const { grid_size, characters, obstacles, goal_position } = data;
  const currentTurn = data.current_turn;

  const getObstacleImage = (type) => {
  switch (type) {
    case 'VEIN':
      return veinImg;
    case 'TRAP':
      return trapImg;
    default:
      return null;
  }
};

const getCharacterImage = (name) => {
  switch (name) {
    case 'ELEVEN':
      return elevenImg;
    case 'MAX':
      return maxImg;
    case 'DEMOGORGON':
      return demogorgonImg;
    case 'SHADOWMONSTER':
      return shadowmonsterImg;
    case 'MINDFLAYER':
      return mindflayerImg;
    default:
      return null;
  }
};

  const renderCells = () => {
    const cells = [];

    for (let y = 0; y < grid_size; y++) {
      for (let x = 0; x < grid_size; x++) {
        const occupant = characters.find(c => c.x_pos === x && c.y_pos === y);
        const hazard = obstacles.find(o => o.x_pos === x && o.y_pos === y);
        const isGoal = goal_position?.[0] === x && goal_position?.[1] === y;
        const isHoveredTeleportTarget = hoveredTeleportTarget?.[0] === x && hoveredTeleportTarget?.[1] === y;
        const isHoveredMoveTarget = hoveredMoveTarget?.[0] === x && hoveredMoveTarget?.[1] === y;

        cells.push(
          <div key={`${x}-${y}`} className={`grid-cell ${isGoal ? 'goal-cell' : ''}  ${isHoveredTeleportTarget ? 'teleport-hover-cell' : ''} ${isHoveredMoveTarget ? currentTurn === 'MAX' ? 'max-move-hover-cell' : 'eleven-move-hover-cell' : ''
  }`}>
            {isGoal && <span className="goal">EXIT</span>}
            {occupant && <img
      src={getCharacterImage(occupant.name)}
      alt={occupant.name}
      className="character-image"
    />}
            {hazard && <img
      src={getObstacleImage(hazard.obstacle_type)}
      alt={hazard.obstacle_type}
      className="obstacle-image"
    />}
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