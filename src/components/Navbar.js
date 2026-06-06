import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Stranger Things: AI Escape</h1>

      <div className="navbar-buttons">
        <button
          className={currentPage === 'game' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('game')}
        >
          Game
        </button>

        <button
          className={currentPage === 'guide' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('guide')}
        >
          Guide
        </button>
      </div>
    </nav>
  );
};

export default Navbar;