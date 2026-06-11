import React from 'react';
import Navbar from './Navbar';
import './Guide.css';
import elevenImg from '../images/eleven.jpg';
import maxImg from '../images/max.jpg';
import demogorgonImg from '../images/demogorgon.jpg';
import shadowmonsterImg from '../images/shadowmonster.jpg';
import mindflayerImg from '../images/mindflayer.jpg';
import veinImg from '../images/veins.jpg';
import trapImg from '../images/trap.jpg';

const Guide = ({ onNavigate }) => {
  return (
    <div className="guide-container">
      <Navbar currentPage="guide" onNavigate={onNavigate} />

      <h2>Game Guide</h2>

      <section className="guide-group" style={{ height: 'auto', padding: '15px' }}>
        <h3>Controls</h3>
        <div className='guide-div'>
        <p>
          Use the movement buttons or arrow keys to move the current player up,
          down, left, or right. Only legal moves are enabled.
        </p>
        <p>
          If the current player has hidden powers, teleport buttons will appear.
          Hovering over a teleport button highlights the target tile. Clicking it
          teleports the player to that tile and consumes the hidden power.
        </p>
        </div>
      </section>

      <section className="guide-group" style={{ height: 'auto', padding: '15px' }}>
        <h3>Players</h3>
        <div className='horizontal-div'>
        <div className='guide-div'>
        <h1>Eleven</h1>

        <img
    src={elevenImg}
    alt="Eleven"
    className="guide-image"
  />

        <p>
          Eleven is the main player. She starts with hidden powers and can use
          teleportation once.
        </p>
        </div>

        <div className='guide-div'>
        <h1>Max</h1>

         <img
    src={maxImg}
    alt="Max"
    className="guide-image"
  />

        <p>
          Max appears in Player vs Player and 2 Players vs AI modes. She also
          starts with hidden powers and can teleport once.
        </p>
        </div>
        </div>
      </section>

      <section className="guide-group" style={{ height: 'auto', padding: '15px' }}>
      <div className='guide-div'>
        <h3>Monsters</h3>
        <div className='horizontal-div'>
          <div className="guide-entity">
            <img src={demogorgonImg} alt="Demogorgon" className="guide-image" />
            <p>
            <strong>Demogorgon</strong><br />
              Used in Difficulty Levels 1 and 2.
              Uses Minimax and Alpha-Beta Pruning.
            </p>
          </div>

          <div className="guide-entity">
            <img src={shadowmonsterImg} alt="Shadowmonster" className="guide-image" />
            <p>
              <strong>Shadowmonster</strong><br />
              Used in Difficulty Level 3.
              Uses A* Search and Manhattan Distance.
            </p>
          </div>

          <div className="guide-entity">
            <img src={mindflayerImg} alt="Mindflayer" className="guide-image" />
          <p>
          <strong>Mindflayer</strong><br />
          Used in Difficulty Level 4.
          Uses Monte Carlo Tree Search.
        </p>
        </div>

        </div>
          </div>

          <div className='guide-div'>
            <h3>Obstacles</h3>
            <div className="guide-entity">
              <img src={veinImg} alt="Vein" className="guide-image" />
              <p>
              <strong>Vein</strong><br />
              Blocks the character's way.
              </p>
            </div>

            <div className="guide-entity">
              <img src={trapImg} alt="Trap" className="guide-image" />
                <p>
              <strong>Trap</strong><br />
              Has a chance to randomly relocate a character to another safe tile.
              </p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;