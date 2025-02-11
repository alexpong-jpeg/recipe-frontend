import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeEditForm.css';

function RecipeEditForm({ initialRecipe, onCancel, onUpdate }) {
  const [recipe, setRecipe] = useState(initialRecipe);

  // State for current nested input fields
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

  // Update local recipe state if the initialRecipe prop changes
  useEffect(() => {
    setRecipe(initialRecipe);
  }, [initialRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientInput(prev => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    if (!ingredientInput.name) return;
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

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepInput(prev => ({ ...prev, [name]: value }));
  };

  const addStep = () => {
    if (!stepInput.instruction) return;
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

  const addTags = () => {
    if (!tagInput.trim()) return;
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    setRecipe(prev => ({
      ...prev,
      tags: [...prev.tags, ...tags]
    }));
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe.id}`, recipe)
      .then(response => {
        setMessage('Recipe updated successfully!');
        onUpdate(response.data);
      })
      .catch(error => {
        setMessage('Error updating recipe.');
        console.error('PUT /api/recipes error:', error);
      });
  };

  return (
    <div className="recipe-edit-form">
      <h2>Edit Recipe</h2>
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
            <li key={idx}>{ing.name} – {ing.quantity} {ing.measurementUnit}</li>
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

        <button type="submit">Update Recipe</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default RecipeEditForm;
