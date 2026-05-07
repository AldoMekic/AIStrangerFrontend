import React from 'react';

const Controls = ({ gameData, onAction }) => {
  const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

  const isMoveAvailable = (direction) => {
    return gameData.available_actions?.some(
      action => action.type === 'MOVE' && action.direction === direction
    );
  };

  const handleTeleport = (target) => {
    onAction({
      type: 'TELEPORT',
      destination: target,
    });
  };

  return (
    <div className="controls-container">
      <h3>Current Turn: {gameData.current_turn}</h3>

      <div className="button-grid">
        {directions.map((dir) => (
          <button
            key={dir}
            disabled={!isMoveAvailable(dir) || gameData.is_over}
            onClick={() => onAction({ type: 'MOVE', direction: dir })}
          >
            {dir}
          </button>
        ))}
      </div>

      <div className="special-actions">
        <h4>Teleport</h4>

        {!gameData.can_teleport && <p>No teleport available.</p>}

        {gameData.can_teleport && gameData.teleport_targets?.map((target) => (
          <button
            key={`${target[0]}-${target[1]}`}
            disabled={gameData.is_over}
            onClick={() => handleTeleport(target)}
          >
            Teleport to ({target[0]}, {target[1]})
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;