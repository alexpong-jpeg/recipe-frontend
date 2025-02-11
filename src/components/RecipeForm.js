import React, { useState } from 'react';
import axios from 'axios';
import './RecipeForm.css';

function RecipeForm({ onRecipeCreated }) {
  // Main recipe state
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [],
    steps: [],
    tags: []
  });

  // State for current nested field inputs
  const [ingredientInput, setIngredientInput] = useState({
    name: '',
    quantity: '',
    measurementUnit: ''
  });
  const [stepInput, setStepInput] = useState({
    instruction: ''
  });
  const [tagInput, setTagInput] = useState('');

  const [message, setMessage] = useState('');

  // Handle changes for main recipe fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  // Update ingredient input fields
  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientInput(prev => ({ ...prev, [name]: value }));
  };

  // Add the current ingredient to the recipe
  const addIngredient = () => {
    if (!ingredientInput.name) return; // simple check
    const newIngredient = {
      ...ingredientInput,
      ingredientOrder: recipe.ingredients.length + 1
    };
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
    setIngredientInput({ name: '', quantity: '', measurementUnit: '' });
  };

  // Update step input field
  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepInput(prev => ({ ...prev, [name]: value }));
  };

  // Add the current step to the recipe
  const addStep = () => {
    if (!stepInput.instruction) return; // simple check
    const newStep = {
      ...stepInput,
      stepNumber: recipe.steps.length + 1
    };
    setRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
    setStepInput({ instruction: '' });
  };

  // Add tags by splitting a comma-separated string
  const addTags = () => {
    if (!tagInput.trim()) return;
    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    setRecipe(prev => ({
      ...prev,
      tags: [...prev.tags, ...tags]
    }));
    setTagInput('');
  };

  // Handle form submission: send POST request to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/recipes`, recipe)
      .then(response => {
        setMessage('Recipe created successfully!');
        if (onRecipeCreated) onRecipeCreated(response.data);
        // Clear the form
        setRecipe({
          title: '',
          description: '',
          prepTime: '',
          cookTime: '',
          servings: '',
          ingredients: [],
          steps: [],
          tags: []
        });
      })
      .catch(error => {
        setMessage('Error creating recipe.');
        console.error('POST /api/recipes error:', error);
      });
  };

  return (
    <div className="recipe-form">
      <h2>Create New Recipe</h2>
      {message && <p className="status-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Basic Fields */}
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={recipe.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={recipe.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Preparation Time (min):</label>
          <input type="number" name="prepTime" value={recipe.prepTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cooking Time (min):</label>
          <input type="number" name="cookTime" value={recipe.cookTime} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Servings:</label>
          <input type="number" name="servings" value={recipe.servings} onChange={handleChange} required />
        </div>

        {/* Nested Fields for Ingredients */}
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.name} – {ing.quantity} {ing.measurementUnit}
            </li>
          ))}
        </ul>
        <div className="nested-inputs">
          <input
            type="text"
            name="name"
            placeholder="Ingredient name"
            value={ingredientInput.name}
            onChange={handleIngredientChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={ingredientInput.quantity}
            onChange={handleIngredientChange}
          />
          <input
            type="text"
            name="measurementUnit"
            placeholder="Unit"
            value={ingredientInput.measurementUnit}
            onChange={handleIngredientChange}
          />
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
        </div>

        {/* Nested Fields for Steps */}
        <h3>Steps</h3>
        <ol>
          {recipe.steps.map((st, idx) => (
            <li key={idx}>{st.instruction}</li>
          ))}
        </ol>
        <div className="nested-inputs">
          <input
            type="text"
            name="instruction"
            placeholder="Step instruction"
            value={stepInput.instruction}
            onChange={handleStepChange}
          />
          <button type="button" onClick={addStep}>Add Step</button>
        </div>

        {/* Nested Fields for Tags */}
        <h3>Tags</h3>
        <ul>
          {recipe.tags.map((tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
        </ul>
        <div className="nested-inputs">
          <input
            type="text"
            placeholder="Comma separated tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button type="button" onClick={addTags}>Add Tags</button>
        </div>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;
