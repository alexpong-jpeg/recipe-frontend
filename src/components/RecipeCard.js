import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import RecipeDetailsModal from './RecipeDetailsModal';

function RecipeCard({ recipe, onEdit, onDelete, onTagToggle, selectedTag }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="mb-4" style={{ minWidth: '220px' }}>
        <Card.Img 
          variant="top" 
          src="https://placehold.co/400" 
          alt="Recipe image placeholder" 
        />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {recipe.description}
          </Card.Subtitle>
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

          <div className="d-flex flex-wrap gap-2 mt-3">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={() => onEdit(recipe.id)}
              className="d-flex align-items-center"
            >
              <FaEdit className="me-1" /> Edit
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={() => onDelete(recipe.id)}
              className="d-flex align-items-center"
            >
              <FaTrashAlt className="me-1" /> Delete
            </Button>
            <Button 
              variant="outline-info" 
              size="sm" 
              onClick={() => setShowModal(true)}
              className="d-flex align-items-center"
            >
              <FaEye className="me-1" /> View
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
