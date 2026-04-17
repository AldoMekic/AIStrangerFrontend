import React, { useState, useEffect } from 'react';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';

function App() {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH: Acting as the 'Sensor' to perceive the backend state [9, 10]
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/games/1/') // Fetching the initial state (S0)
      .then(res => res.json())
      .then(data => {
        setGameData(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // ACTUATOR: Sending the player's move (percept) to the Transition Model [11, 12]
  const handleMove = (direction) => {
    fetch('http://127.0.0.1:8000/api/games/1/play_turn/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'MOVE', direction: direction })
    })
    .then(res => res.json())
    .then(updatedState => setGameData(updatedState)); // Rerenders the UI with new AI positions [13]
  };

  if (loading) return <h1>Loading the Upside Down...</h1>;

  return (
    <div className="App">
      <h1>Stranger Things: AI Escape</h1>
      <GameGrid data={gameData} />
      <Controls onMove={handleMove} />
      {gameData.is_over && <h2>Game Over!</h2>}
    </div>
  );
}

export default App;