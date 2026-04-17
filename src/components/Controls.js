import React from 'react';

// Functional component using destructuring for the onMove prop [5, 6]
const Controls = ({ onMove }) => {
  const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

  return (
    <div className="controls-container">
      <h3>Navigate the Upside Down</h3>
      <div className="button-grid">
        {/* Mapping an array to JSX elements for cleaner code [7] */}
        {directions.map((dir) => (
          <button 
            key={dir} 
            className={`btn-${dir.toLowerCase()}`}
            onClick={() => onMove(dir)} // Sending interactions back up the tree [4, 8]
          >
            {dir}
          </button>
        ))}
      </div>
      
      {/* Teleportation Actuator - Requires 'hidden powers' in state [Requirement] */}
      <div className="special-actions">
        <button 
          className="btn-teleport"
          onClick={() => onMove('TELEPORT')}
        >
          Use Hidden Powers
        </button>
      </div>
    </div>
  );
};

export default Controls;