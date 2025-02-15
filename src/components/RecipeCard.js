import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function RecipeCard({ recipe, onEdit, onDelete, onTagToggle, selectedTag }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => setExpanded(!expanded);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text className="text-muted">
          Prep: {recipe.prepTime} | Cook: {recipe.cookTime} | Servings: {recipe.servings}
        </Card.Text>

        {/* Display tags as clickable badges */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mb-2">
            <Card.Subtitle className="mb-1">Tags:</Card.Subtitle>
            {recipe.tags.map((tag, index) => {
              // Tag might be an object with a 'name' or just a string
              const tagName = tag.name ? tag.name : tag;
              const isActive = selectedTag === tagName;
              // Use a different bg color if the tag is selected
              return (
                <Badge
                  key={index}
                  bg={isActive ? 'primary' : 'info'}
                  text="dark"
                  onClick={() => onTagToggle(tagName)}
                  style={{ cursor: 'pointer' }}
                  className="me-1 mb-1"
                >
                  {tagName}
                </Badge>
              );
            })}
          </div>
        )}

        {expanded && (
          <>
            {/* Expand to show ingredients, steps, etc. */}
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
