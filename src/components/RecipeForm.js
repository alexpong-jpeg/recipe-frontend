import React, { useState } from 'react';
import './RecipeForm.css';

function RecipeForm({ onAddRecipe }) {
  // Recipe state including nested fields
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

  // State for the current ingredient input
  const [ingredient, setIngredient] = useState({
    name: '',
    quantity: '',
    measurementUnit: ''
  });

  // State for the current step input
  const [step, setStep] = useState({
    instruction: ''
  });

  // State for tags input (comma separated)
  const [tagInput, setTagInput] = useState('');
  const [message, setMessage] = useState('');

  // Handle changes for the basic recipe fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Add an ingredient to the recipe's ingredient list
  const addIngredient = () => {
    // Automatically assign an ingredient order based on the current list length
    const newIngredient = {
      ...ingredient,
      ingredientOrder: recipe.ingredients.length + 1
    };
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
    setIngredient({ name: '', quantity: '', measurementUnit: '' });
  };

  // Add a step to the recipe's step list
  const addStep = () => {
    // Automatically assign step number based on list length
    const newStep = {
      ...step,
      stepNumber: recipe.steps.length + 1
    };
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
    setStep({ instruction: '' });
  };

  // Add tags by splitting a comma-separated string
  const addTags = () => {
    const tagArray = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    setRecipe((prev) => ({
      ...prev,
      tags: [...prev.tags, ...tagArray]
    }));
    setTagInput('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecipe(recipe);
    setMessage('Recipe added successfully!');
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
    setTagInput('');
    // Hide message after a short time
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="recipe-form">
      <h2>Create New Recipe</h2>
      {message && <p className="status-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Basic Recipe Fields */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Preparation Time (minutes):</label>
          <input
            type="number"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cooking Time (minutes):</label>
          <input
            type="number"
            name="cookTime"
            value={recipe.cookTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Servings:</label>
          <input
            type="number"
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ingredients Section */}
        <div className="form-group">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>
                {ing.name} - {ing.quantity} {ing.measurementUnit}
              </li>
            ))}
          </ul>
          <div className="ingredient-inputs">
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) =>
                setIngredient({ ...ingredient, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                setIngredient({ ...ingredient, quantity: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.measurementUnit}
              onChange={(e) =>
                setIngredient({ ...ingredient, measurementUnit: e.target.value })
              }
            />
            <button type="button" onClick={addIngredient}>
              Add Ingredient
            </button>
          </div>
        </div>

        {/* Steps Section */}
        <div className="form-group">
          <h3>Steps</h3>
          <ul>
            {recipe.steps.map((st, index) => (
              <li key={index}>
                Step {st.stepNumber}: {st.instruction}
              </li>
            ))}
          </ul>
          <div className="step-inputs">
            <input
              type="text"
              placeholder="Step instruction"
              value={step.instruction}
              onChange={(e) =>
                setStep({ ...step, instruction: e.target.value })
              }
            />
            <button type="button" onClick={addStep}>
              Add Step
            </button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="form-group">
          <h3>Tags</h3>
          <div className="tag-inputs">
            <input
              type="text"
              placeholder="Enter tags, comma separated"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button type="button" onClick={addTags}>
              Add Tags
            </button>
          </div>
          <ul>
            {recipe.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;