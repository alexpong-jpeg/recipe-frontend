import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [view, setView] = useState('list');

  return (
    <div className="App">
      <Navbar setView={setView} currentView={view} />
      <div className="container">
        {view === 'new' ? <RecipeForm /> : <RecipeList />}
      </div>
    </div>
  );
}

export default App;
