import React from 'react';
import Navbar from './Navbar';
import './Guide.css';

const Guide = ({ onNavigate }) => {
  return (
    <div className="guide-container">
      <Navbar currentPage="guide" onNavigate={onNavigate} />

      <h2>Game Guide</h2>

      <section className="guide-group" style={{ height: 'auto', padding: '15px' }}>
        <h3>Controls</h3>
        <p>
          Use the movement buttons or arrow keys to move the current player up,
          down, left, or right. Only legal moves are enabled.
        </p>
        <p>
          If the current player has hidden powers, teleport buttons will appear.
          Hovering over a teleport button highlights the target tile. Clicking it
          teleports the player to that tile and consumes the hidden power.
        </p>
      </section>

      <section className="guide-group" style={{ height: 'auto', padding: '15px' }}>
        <h3>Players</h3>
        <p>
          Eleven is the main player. She starts with hidden powers and can use
          teleportation once.
        </p>
        <p>
          Max appears in Player vs Player and 2 Players vs AI modes. She also
          starts with hidden powers and can teleport once.
        </p>
      </section>

      <section className="guide-group" style={{ height: 'auto', padding: '15px' }}>
        <h3>Monsters and Obstacles</h3>
        <p>
          Level 1 uses the Demogorgon with Minimax search.
        </p>
        <p>
          Level 2 uses the Demogorgon with Alpha-Beta pruning.
        </p>
        <p>
          Level 3 uses the Shadowmonster with A* search and Manhattan distance.
        </p>
        <p>
          Level 4 uses the Mindflayer with Monte Carlo Tree Search.
        </p>
        <p>
          Veins make a character stuck, causing them to lose their next turn.
        </p>
        <p>
          Traps may randomly relocate a character to another safe tile.
        </p>
      </section>
    </div>
  );
};

export default Guide;