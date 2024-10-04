const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/auth");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Create Recipe
// POST api/recipes
router.post("/", authMiddleware, async (req, res) => {
  const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;

  // Check if req.user is defined and has the expected properties
  const author = req.user?.email; // Get the author's email from the token
  if (!author) {
    return res.status(400).json({ message: "Author information is required." });
  }

  const newRecipe = new Recipe({
    title,
    ingredients,
    instructions,
    cuisineType,
    cookingTime,
    author,
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).json({ message: "Failed to add recipe" });
  }
});


// Get All Recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Recipe
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.author.toString() !== req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Recipe
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.author.toString() !== req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await recipe.remove();
    res.json({ message: "Recipe removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
