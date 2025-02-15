import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

function RecipeDetailsModal({ show, onHide, recipe }) {
  if (!recipe) return null;

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
                <ListGroup.Item key={idx}>
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
