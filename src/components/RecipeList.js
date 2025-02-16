import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTagFilter, setSelectedTagFilter] = useState(null);

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

  // Handle tag filter toggling.
  const handleTagToggle = (tagName) => {
    if (selectedTagFilter === tagName) {
      setSelectedTagFilter(null);
    } else {
      setSelectedTagFilter(tagName);
    }
  };

  const filteredRecipes = selectedTagFilter
    ? recipes.filter(recipe =>
        recipe.tags.some(tag => (tag.name ? tag.name : tag) === selectedTagFilter)
      )
    : recipes;

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">All Recipes</h2>
      <Row>
        {filteredRecipes.length === 0 ? (
          <p>No recipes found for the selected tag.</p>
        ) : (
          filteredRecipes.map(recipe => (
            <Col key={recipe.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <RecipeCard 
                recipe={recipe} 
                onDelete={handleDelete}
                onTagToggle={handleTagToggle}
                selectedTag={selectedTagFilter}
                onUpdate={(updatedRecipe) => {
                  setRecipes(recipes.map(r => (r.id === updatedRecipe.id ? updatedRecipe : r)));
                }}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default RecipeList;
