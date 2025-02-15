import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import RecipeEditForm from './RecipeEditForm';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  // Fetch recipes from the backend
  const fetchRecipes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then(response => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Delete a recipe
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(r => r.id !== id));
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  };

  // Switch to edit mode for a recipe
  const handleEdit = (id) => {
    setEditingRecipeId(id);
  };

  // Callback when an update is successful
  const handleUpdate = (updatedRecipe) => {
    setRecipes(recipes.map(r => (r.id === updatedRecipe.id ? updatedRecipe : r)));
    setEditingRecipeId(null);
  };

  const handleCancelEdit = () => {
    setEditingRecipeId(null);
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">All Recipes</h2>
      <Row>
        {recipes.length === 0 ? (
          <p>No recipes found. Try creating a new recipe!</p>
        ) : (
          recipes.map(recipe => (
            <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
              {editingRecipeId === recipe.id ? (
                <RecipeEditForm 
                  initialRecipe={recipe} 
                  onCancel={handleCancelEdit} 
                  onUpdate={handleUpdate} 
                />
              ) : (
                <RecipeCard 
                  recipe={recipe} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              )}
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default RecipeList;
