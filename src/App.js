import React, { useState, useEffect, useCallback } from 'react';
import GameSetup from './components/GameSetup';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';
import Guide from './components/Guide';
import Navbar from './components/Navbar';

const API_BASE = 'http://127.0.0.1:8000/api';

function App() {
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState('');
  const [hoveredTeleportTarget, setHoveredTeleportTarget] = useState(null);
  const [hoveredMoveTarget, setHoveredMoveTarget] = useState(null);
  const [page, setPage] = useState('game');

  const createNewGame = async (config) => {
    setError('');

    try {
      const res = await fetch(`${API_BASE}/games/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create game.');
        return;
      }

      setGameData(data);
    } catch (err) {
      setError('Backend connection failed.');
      console.error(err);
    }
  };

  const playTurn = useCallback(async (action) => {
  if (!gameData || gameData.is_over) return;

  setError('');

  try {
    const res = await fetch(
      `${API_BASE}/games/${gameData.id}/play_turn/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Invalid action.');
      return;
    }

    setHoveredTeleportTarget(null);
    setHoveredMoveTarget(null);
    setGameData(data);
  } catch (err) {
    setError('Backend connection failed.');
    console.error(err);
  }
}, [gameData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameData || gameData.is_over) return;

      let direction = null;

    switch (event.key) {
      case 'ArrowUp':
        direction = 'UP';
        break;
      case 'ArrowDown':
        direction = 'DOWN';
        break;
      case 'ArrowLeft':
        direction = 'LEFT';
        break;
      case 'ArrowRight':
        direction = 'RIGHT';
        break;
      default:
        return;
    }

    event.preventDefault();

    const isLegalMove = gameData.available_actions?.some(
      action =>
        action.type === 'MOVE' &&
        action.direction === direction
    );

    if (!isLegalMove) return;

    playTurn({
      type: 'MOVE',
      direction,
    });
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [gameData, playTurn]);

 return (
  <div className="App">
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {page === 'guide' ? (
      <Guide onNavigate={setPage} />
    ) : !gameData ? (
      <GameSetup onStartGame={createNewGame} onNavigate={setPage} />
    ) : (
      <>
        <Navbar currentPage="game" onNavigate={setPage} />

        <GameGrid
          data={gameData}
          hoveredTeleportTarget={hoveredTeleportTarget}
          hoveredMoveTarget={hoveredMoveTarget}
        />

        <Controls
          gameData={gameData}
          onAction={playTurn}
          onTeleportHover={setHoveredTeleportTarget}
          onMoveHover={setHoveredMoveTarget}
        />

        {gameData.last_event && (
          <div>
            <h3>Last Event</h3>
            <p>
              {gameData.last_event.actor} used {gameData.last_event.action_type}
              {' '}from {JSON.stringify(gameData.last_event.from)}
              {' '}to {JSON.stringify(gameData.last_event.to)}
            </p>
            {gameData.last_event.trap_triggered && <p>Trap triggered!</p>}
            {gameData.last_event.end_reason && <p>End reason: {gameData.last_event.end_reason}</p>}
          </div>
        )}

        {gameData.is_over && (
          <h2>Game Over! Winner: {gameData.winner}</h2>
        )}

        <button onClick={() => setGameData(null)}>New Game</button>
      </>
    )}
  </div>
);
}

export default App;