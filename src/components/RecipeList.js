import React from 'react';
import './RecipeList.css';

function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found. Try creating a new recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
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
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
