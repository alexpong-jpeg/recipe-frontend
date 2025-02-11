import React from 'react';
import './Navbar.css';

function Navbar({ setView, currentView }) {
  return (
    <nav className="navbar">
      <h1>Recipe Manager</h1>
      <ul className="nav-links">
        <li
          className={currentView === 'list' ? 'active' : ''}
          onClick={() => setView('list')}
        >
          All Recipes
        </li>
        <li
          className={currentView === 'new' ? 'active' : ''}
          onClick={() => setView('new')}
        >
          New Recipe
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;