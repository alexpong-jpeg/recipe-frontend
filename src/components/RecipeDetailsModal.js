import React, { useState } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

function RecipeDetailsModal({ show, onHide, recipe }) {
  // Local state to track which ingredients are struck
  // This could be an object with keys as ingredient indices, and values as booleans
  const [struckIngredients, setStruckIngredients] = useState({});

  if (!recipe) return null;

  // Toggles the strike-through for a given ingredient index
  const handleIngredientClick = (idx) => {
    setStruckIngredients((prev) => {
      const updated = { ...prev };
      // If already struck, remove it; otherwise, set it to true
      if (updated[idx]) {
        delete updated[idx];
      } else {
        updated[idx] = true;
      }
      return updated;
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{recipe.description}</p>
        <p className="text-muted">
          Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min | Servings: {recipe.servings}
        </p>
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <>
            <h5>Ingredients:</h5>
            <ListGroup variant="flush">
              {recipe.ingredients.map((ing, idx) => (
                <ListGroup.Item
                  key={idx}
                  // Toggle strike-through if this index is in struckIngredients
                  style={{
                    textDecoration: struckIngredients[idx] ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleIngredientClick(idx)}
                >
                  {ing.name} - {ing.quantity} {ing.measurementUnit}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
        {recipe.steps && recipe.steps.length > 0 && (
          <>
            <h5 className="mt-3">Steps:</h5>
            <ol>
              {recipe.steps.map((st, idx) => (
                <li key={idx}>{st.instruction}</li>
              ))}
            </ol>
          </>
        )}
        {recipe.tags && recipe.tags.length > 0 && (
          <>
            <h5 className="mt-3">Tags:</h5>
            <div>
              {recipe.tags.map((tag, idx) => (
                <span key={idx} className="badge bg-info text-dark me-1">
                  {tag.name ? tag.name : tag}
                </span>
              ))}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeDetailsModal;
