import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';

function App() {
  const [gameData, setGameData] = useState(null);

  // ACTUATOR: Connects to backend POST /api/games/ to initialize the world
  const createNewGame = (config) => {
    fetch('http://127.0.0.1:8000/api/games/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    .then(res => res.json())
    .then(initialState => {
      // Upon success, the backend returns the Initial State (S0)
      setGameData(initialState);
    })
    .catch(console.error);
  };

  const handleMove = (direction) => {
    // Current 'play_turn' logic using the ID from the created game
    fetch(`http://127.0.0.1:8000/api/games/${gameData.id}/play_turn/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'MOVE', direction: direction })
    })
    .then(res => res.json())
    .then(updatedState => setGameData(updatedState));
  };

  return (
    <div className="App">
      <h1>Stranger Things: AI Escape</h1>
      
      {/* Conditional Rendering: Showing Setup if no game is active [4] */}
      {!gameData ? (
        <GameSetup onStartGame={createNewGame} />
      ) : (
        <>
          <GameGrid data={gameData} />
          <Controls onMove={handleMove} />
          {gameData.is_over && <h2>Game Over!</h2>}
          <button onClick={() => setGameData(null)}>New Game</button>
        </>
      )}
    </div>
  );
}

export default App;