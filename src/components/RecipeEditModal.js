import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import RecipeEditForm from './RecipeEditForm';

function RecipeEditModal({ show, onHide, recipe, onUpdate }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecipeEditForm
          initialRecipe={recipe}
          onCancel={onHide}
          onUpdate={(updatedRecipe) => {
            onUpdate(updatedRecipe);
            onHide();
          }}
        />
      </Modal.Body>
    </Modal>
  );
}

export default RecipeEditModal;
