import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import './RecipeEditForm.css';

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
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredientInput(prev => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    if (!ingredientInput.name) return;
    const newIngredient = {
      ...ingredientInput,
      ingredientOrder: recipe.ingredients.length + 1
    };
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
    setIngredientInput({ name: '', quantity: '', measurementUnit: '' });
  };

  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepInput(prev => ({ ...prev, [name]: value }));
  };

  const addStep = () => {
    if (!stepInput.instruction) return;
    const newStep = {
      ...stepInput,
      stepNumber: recipe.steps.length + 1
    };
    setRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
    setStepInput({ instruction: '' });
  };

  const addTags = () => {
    if (!tagInput.trim()) return;
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    setRecipe(prev => ({
      ...prev,
      tags: [...prev.tags, ...tags]
    }));
    setTagInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe.id}`, recipe)
      .then(response => {
        setMessage('Recipe updated successfully!');
        onUpdate(response.data);
      })
      .catch(error => {
        setMessage('Error updating recipe.');
        console.error('PUT error:', error);
      });
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">Edit Recipe</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formTitle">
          <Form.Label column sm={3}>Title:</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name="title" value={recipe.title} onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column sm={3}>Description:</Form.Label>
          <Col sm={9}>
            <Form.Control as="textarea" name="description" value={recipe.description} onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPrepTime">
          <Form.Label column sm={3}>Prep Time (min):</Form.Label>
          <Col sm={9}>
            <Form.Control type="number" name="prepTime" value={recipe.prepTime} onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCookTime">
          <Form.Label column sm={3}>Cook Time (min):</Form.Label>
          <Col sm={9}>
            <Form.Control type="number" name="cookTime" value={recipe.cookTime} onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formServings">
          <Form.Label column sm={3}>Servings:</Form.Label>
          <Col sm={9}>
            <Form.Control type="number" name="servings" value={recipe.servings} onChange={handleChange} required />
          </Col>
        </Form.Group>

        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing.name} – {ing.quantity} {ing.measurementUnit}</li>
          ))}
        </ul>
        <Row className="align-items-center">
          <Col sm={4}>
            <Form.Control type="text" name="name" placeholder="Name" value={ingredientInput.name} onChange={handleIngredientChange} />
          </Col>
          <Col sm={3}>
            <Form.Control type="number" name="quantity" placeholder="Quantity" value={ingredientInput.quantity} onChange={handleIngredientChange} />
          </Col>
          <Col sm={3}>
            <Form.Control type="text" name="measurementUnit" placeholder="Unit" value={ingredientInput.measurementUnit} onChange={handleIngredientChange} />
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={addIngredient}>Add</Button>
          </Col>
        </Row>

        <h4 className="mt-4">Steps</h4>
        <ol>
          {recipe.steps.map((st, idx) => (
            <li key={idx}>{st.instruction}</li>
          ))}
        </ol>
        <Row className="align-items-center">
          <Col sm={10}>
            <Form.Control type="text" name="instruction" placeholder="Instruction" value={stepInput.instruction} onChange={handleStepChange} />
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={addStep}>Add</Button>
          </Col>
        </Row>

        <h4 className="mt-4">Tags</h4>
        <ul>
          {recipe.tags.map((tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
        </ul>
        <Row className="align-items-center">
          <Col sm={10}>
            <Form.Control type="text" placeholder="Comma separated tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={addTags}>Add</Button>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button type="submit" variant="success">Update Recipe</Button>
          <Button type="button" variant="secondary" onClick={onCancel} className="ml-2">Cancel</Button>
        </div>
      </Form>
    </Container>
  );
}

export default RecipeEditForm;
