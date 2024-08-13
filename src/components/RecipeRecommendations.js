import React, { useState, useEffect } from 'react';
import './RecipeRecommendations.css';

const RecipeRecommendations = () => {
  const [form, setForm] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    category: '',
    tags: ''
  });

  const [recipes, setRecipes] = useState(() => {
    // Load data from localStorage or use default values
    return JSON.parse(localStorage.getItem('recipes')) || [];
  });
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Save recipes to localStorage whenever recipes change
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipes([...recipes, form]);
    setForm({
      name: '',
      ingredients: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      servings: '',
      category: '',
      tags: ''
    });
    setFormVisible(false);
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleDelete = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  return (
    <section className="recipe-recommendations">
      <h2>Recipe Recommendations</h2>
      <p>Use this section for unique recipe recommendations using pantry staples or items approaching expiration dates, offering creative ideas for using ingredients on hand.</p>
      
      <button onClick={toggleForm}>
        {formVisible ? 'Cancel' : 'Add a Recipe'}
      </button>

      {formVisible && (
        <form id="recipe-form" onSubmit={handleSubmit}>
          <label>
            Recipe Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Ingredients:
            <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required />
          </label>
          <label>
            Instructions:
            <textarea name="instructions" value={form.instructions} onChange={handleChange} required />
          </label>
          <label>
            Prep Time:
            <input type="text" name="prepTime" value={form.prepTime} onChange={handleChange} />
          </label>
          <label>
            Cook Time:
            <input type="text" name="cookTime" value={form.cookTime} onChange={handleChange} />
          </label>
          <label>
            Servings:
            <input type="number" name="servings" value={form.servings} onChange={handleChange} />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={form.category} onChange={handleChange} />
          </label>
          <label>
            Tags:
            <input type="text" name="tags" value={form.tags} onChange={handleChange} />
          </label>
          <label>
            Web Bookmark:
            <input type="url" name="bookmark" value={form.bookmark} onChange={handleChange} placeholder="https://example.com" />
          </label>
          <button type="submit">Submit Recipe</button>
        </form>
      )}

      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-item">
            <h3>{recipe.name}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
            <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Tags:</strong> {recipe.tags}</p>
            {recipe.bookmark && (
              <p>
                <strong>Web Bookmark:</strong> 
                <a href={recipe.bookmark} target="_blank" rel="noopener noreferrer">
                  {recipe.bookmark}
                </a>
              </p>
            )}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeRecommendations;
