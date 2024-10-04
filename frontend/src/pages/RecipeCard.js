import React from 'react';

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return <div>No recipe data available</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-600 mb-2">Ingredients: {recipe.ingredients}</p>
      <p className="text-gray-600 mb-2">Instructions: {recipe.instructions}</p>
      <p className="text-gray-600 mb-2">Cuisine Type: {recipe.cuisineType}</p>
      <p className="text-gray-600 mb-2">Cooking Time: {recipe.cookingTime} minutes</p>
    </div>
  );
};

export default RecipeCard;