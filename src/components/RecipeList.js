import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeEditForm from './RecipeEditForm';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  // Fetch recipes from the backend
  const fetchRecipes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then(response => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Delete a recipe
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(r => r.id !== id));
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  };

  // Switch to edit mode for a recipe
  const handleEdit = (id) => {
    setEditingRecipeId(id);
  };

  // Callback when an update is successful
  const handleUpdate = (updatedRecipe) => {
    setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    setEditingRecipeId(null);
  };

  const handleCancelEdit = () => {
    setEditingRecipeId(null);
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found. Try creating a new recipe!</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            {editingRecipeId === recipe.id ? (
              <RecipeEditForm 
                initialRecipe={recipe} 
                onCancel={handleCancelEdit} 
                onUpdate={handleUpdate} 
              />
            ) : (
              <>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <p>
                  <strong>Prep:</strong> {recipe.prepTime} min |{' '}
                  <strong>Cook:</strong> {recipe.cookTime} min |{' '}
                  <strong>Servings:</strong> {recipe.servings}
                </p>
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                  <div>
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.map((ing, index) => (
                        <li key={index}>
                          {ing.name} - {ing.quantity} {ing.measurementUnit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {recipe.steps && recipe.steps.length > 0 && (
                  <div>
                    <h4>Steps:</h4>
                    <ol>
                      {recipe.steps.map((st, index) => (
                        <li key={index}>{st.instruction}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div>
                    <h4>Tags:</h4>
                    <ul>
                      {recipe.tags.map((tag, index) => (
                        <li key={index}>{tag.name ? tag.name : tag}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
