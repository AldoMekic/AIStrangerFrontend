import React from 'react';

const Controls = ({ gameData, onAction, onTeleportHover, onMoveHover }) => {
  const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

  const isMoveAvailable = (direction) => {
    return gameData.available_actions?.some(
      action => action.type === 'MOVE' && action.direction === direction
    );
  };

  const getMoveTarget = (direction) => {
  const currentPlayer = gameData.characters.find(
    c => c.name === gameData.current_turn
  );

  if (!currentPlayer) return null;

  let x = currentPlayer.x_pos;
  let y = currentPlayer.y_pos;

  switch (direction) {
    case 'UP':
      y -= 1;
      break;
    case 'DOWN':
      y += 1;
      break;
    case 'LEFT':
      x -= 1;
      break;
    case 'RIGHT':
      x += 1;
      break;
    default:
      break;
  }

  return [x, y];
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
            onMouseEnter={() => onMoveHover(getMoveTarget(dir))}
            onMouseLeave={() => onMoveHover(null)}
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
            onMouseEnter={() => onTeleportHover(target)}
            onMouseLeave={() => onTeleportHover(null)}
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