import React, { useState } from 'react';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
// Example icons from Font Awesome (react-icons/fa)
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

function RecipeCard({ recipe, onEdit, onDelete, onTagToggle, selectedTag }) {
  const [expanded, setExpanded] = useState(false);
  const toggleDetails = () => setExpanded(!expanded);

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src="https://placehold.co/400" alt="Recipe" />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {recipe.description}
        </Card.Subtitle>
        <Card.Text className="text-muted">
          Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min | Servings: {recipe.servings}
        </Card.Text>

        {/* Tags as clickable badges */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mb-2">
            <Card.Subtitle className="mb-1">Tags:</Card.Subtitle>
            {recipe.tags.map((tag, index) => {
              const tagName = tag.name ? tag.name : tag;
              const isActive = selectedTag === tagName;
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

        {/* More modern approach for Edit, Delete, View buttons */}
        <div className="d-flex justify-content-between mt-3">
          <ButtonGroup size="sm">
            <Button
              variant="outline-primary"
              onClick={() => onEdit(recipe.id)}
              className="d-flex align-items-center"
            >
              <FaEdit className="me-1" /> Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => onDelete(recipe.id)}
              className="d-flex align-items-center"
            >
              <FaTrashAlt className="me-1" /> Delete
            </Button>
            <Button
              variant="outline-info"
              onClick={toggleDetails}
              className="d-flex align-items-center"
            >
              <FaEye className="me-1" />
              {expanded ? 'Hide' : 'View'}
            </Button>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
