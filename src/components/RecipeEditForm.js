import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, FloatingLabel, Button, Row, Col, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // optional: using react-icons for plus icon

function RecipeEditForm({ initialRecipe, onCancel, onUpdate }) {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [ingredientInput, setIngredientInput] = useState({
    name: '',
    quantity: '',
    measurementUnit: ''
  });
  const [stepInput, setStepInput] = useState({ instruction: '' });
  const [tagInput, setTagInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setRecipe(initialRecipe);
  }, [initialRecipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientInput((prev) => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    if (!ingredientInput.name) return;
    const newIngredient = {
      ...ingredientInput,
      ingredientOrder: recipe.ingredients.length + 1
    };
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
    setIngredientInput({ name: '', quantity: '', measurementUnit: '' });
  };

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepInput((prev) => ({ ...prev, [name]: value }));
  };

  const addStep = () => {
    if (!stepInput.instruction) return;
    const newStep = {
      ...stepInput,
      stepNumber: recipe.steps.length + 1
    };
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
    setStepInput({ instruction: '' });
  };

  const addTags = () => {
    if (!tagInput.trim()) return;
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    setRecipe((prev) => ({
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
        console.error('Error:', error);
      });
  };

  return (
    <Row className="justify-content-center my-4">
      <Col xs={12} md={8} lg={6}>
        <Card>
          <Card.Body>
            <Card.Title className="text-center mb-4">Edit Recipe</Card.Title>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              {/* Floating Label for Title */}
              <FloatingLabel controlId="formTitle" label="Title" className="mb-3">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter recipe title"
                  value={recipe.title}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              {/* Floating Label for Description */}
              <FloatingLabel controlId="formDescription" label="Description" className="mb-3">
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Brief description of the recipe"
                  style={{ height: '100px' }}
                  value={recipe.description}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>

              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="formPrepTime" label="Prep Time (min)">
                    <Form.Control
                      type="number"
                      name="prepTime"
                      placeholder="10"
                      value={recipe.prepTime}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="formCookTime" label="Cook Time (min)">
                    <Form.Control
                      type="number"
                      name="cookTime"
                      placeholder="20"
                      value={recipe.cookTime}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="formServings" label="Servings">
                    <Form.Control
                      type="number"
                      name="servings"
                      placeholder="4"
                      value={recipe.servings}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Ingredients Section */}
              <h5 className="mt-4">Ingredients</h5>
              <ul>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing.name} – {ing.quantity} {ing.measurementUnit}</li>
                ))}
              </ul>
              <Row className="align-items-center mb-3">
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={ingredientInput.name}
                    onChange={handleIngredientChange}
                  />
                </Col>
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={ingredientInput.quantity}
                    onChange={handleIngredientChange}
                  />
                </Col>
                <Col sm={3}>
                  <Form.Control
                    type="text"
                    name="measurementUnit"
                    placeholder="Unit"
                    value={ingredientInput.measurementUnit}
                    onChange={handleIngredientChange}
                  />
                </Col>
                <Col sm={2}>
                  <Button variant="outline-primary" onClick={addIngredient}>
                    <FaPlus className="me-1" /> Add
                  </Button>
                </Col>
              </Row>

              {/* Steps Section */}
              <h5 className="mt-4">Steps</h5>
              <ol>
                {recipe.steps.map((st, idx) => (
                  <li key={idx}>{st.instruction}</li>
                ))}
              </ol>
              <Row className="align-items-center mb-3">
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="instruction"
                    placeholder="Instruction"
                    value={stepInput.instruction}
                    onChange={handleStepChange}
                  />
                </Col>
                <Col sm={2}>
                  <Button variant="outline-primary" onClick={addStep}>
                    <FaPlus className="me-1" /> Add
                  </Button>
                </Col>
              </Row>

              {/* Tags Section */}
              <h5 className="mt-4">Tags</h5>
              <ul>
                {recipe.tags.map((tag, idx) => (
                  <li key={idx}>{tag.name ? tag.name : tag}</li>
                ))}
              </ul>
              <Row className="align-items-center mb-3">
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Comma separated tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                </Col>
                <Col sm={2}>
                  <Button variant="outline-primary" onClick={addTags}>
                    <FaPlus className="me-1" /> Add
                  </Button>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button type="submit" variant="outline-success">
                  Update Recipe
                </Button>
                <Button type="button" variant="outline-secondary" onClick={onCancel} className="ms-2">
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RecipeEditForm;
