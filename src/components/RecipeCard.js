import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function RecipeCard({ recipe, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => setExpanded(!expanded);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text>
          <small className="text-muted">
            Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min | Servings: {recipe.servings}
          </small>
        </Card.Text>
        {recipe.tags && recipe.tags.length > 0 && (
          <div>
            <Card.Subtitle className="mt-2">Tags:</Card.Subtitle>
            <ul className="list-unstyled">
              {recipe.tags.map((tag, index) => (
                <li key={index}>{tag.name ? tag.name : tag}</li>
              ))}
            </ul>
          </div>
        )}
        {expanded && (
          <>
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <Card.Subtitle className="mt-2">Ingredients:</Card.Subtitle>
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
                <Card.Subtitle className="mt-2">Steps:</Card.Subtitle>
                <ol>
                  {recipe.steps.map((st, index) => (
                    <li key={index}>{st.instruction}</li>
                  ))}
                </ol>
              </div>
            )}
          </>
        )}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="primary" size="sm" onClick={() => onEdit(recipe.id)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(recipe.id)}>
            Delete
          </Button>
          <Button variant="info" size="sm" onClick={toggleDetails}>
            {expanded ? 'Hide Details' : 'View Details'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
