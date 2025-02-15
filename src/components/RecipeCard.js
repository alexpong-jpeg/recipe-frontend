import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import RecipeDetailsModal from './RecipeDetailsModal';

function RecipeCard({ recipe, onEdit, onDelete, onTagToggle, selectedTag }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="mb-4">
        <Card.Img variant="top" src="https://placehold.co/400" alt="Recipe placeholder" />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{recipe.description}</Card.Subtitle>
          <Card.Text className="text-muted">
            Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min | Servings: {recipe.servings}
          </Card.Text>
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
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" size="sm" onClick={() => onEdit(recipe.id)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(recipe.id)}>
              Delete
            </Button>
            <Button variant="info" size="sm" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
      <RecipeDetailsModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        recipe={recipe} 
      />
    </>
  );
}

export default RecipeCard;