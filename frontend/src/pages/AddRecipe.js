import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipePage";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipeData(response.data);
      } catch (err) {
        console.error('Error fetching recipe data:', err);
      }
    };
    fetchRecipeData();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token if needed
      const response = await axios.post("http://localhost:5000/api/recipes", {
        title,
        ingredients,
        instructions,
        cuisineType,
        cookingTime,
        // You can include author if needed from frontend
        // author: decodedToken.email, // Assuming you decode the token to get the email
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authorization if needed
        },
      });
      console.log("Recipe added successfully:", response.data); // Check for response
      setRecipeData(response.data); // Set the recipeData state
      // Clear form fields
      setTitle("");
      setIngredients("");
      setInstructions("");
      setCuisineType("");
      setCookingTime("");
    } catch (err) {
      console.error("Error adding recipe:", err.response ? err.response.data : err.message);
    }
  };


  return (
    <div>


      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-red-500">
        <div className="text-center text-gray-600 mt-6">

        </div>
        <form onSubmit={handleAddRecipe} className="p-8 bg-white shadow-lg rounded-lg w-full max-w-lg">
          <div className="flex items-center justify-center ">

            {recipeData && (
              <div className="mt-3 mb-5">
                <RecipeCard recipe={recipeData} />
              </div>
            )}
          </div>
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add New Recipe</h2>
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Cuisine Type"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Cooking Time (mins)"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="mb-6 px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg w-full hover:bg-green-700 transition duration-300"
          >
            Add Recipe
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddRecipe;
