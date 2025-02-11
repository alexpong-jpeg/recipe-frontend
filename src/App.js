import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  // 'view' toggles between "list" and "new"
  const [view, setView] = useState('list');
  // Local state to store recipes
  const [recipes, setRecipes] = useState([]);

  // Callback to add a new recipe to the state
  const addRecipe = (recipe) => {
    // Optionally assign an ID to each recipe (using the current length + 1)
    const newRecipe = { ...recipe, id: recipes.length + 1 };
    setRecipes((prev) => [...prev, newRecipe]);
  };

  return (
    <div className="App">
      <Navbar setView={setView} currentView={view} />
      <div className="container">
        {view === 'new' ? (
          <RecipeForm onAddRecipe={addRecipe} />
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>
    </div>
  );
}

export default App;