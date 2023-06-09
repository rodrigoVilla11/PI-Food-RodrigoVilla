require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getRecipeById = async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (!isNaN(idRecipe)) {
      const apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
      );
      const {
        id,
        title,
        image,
        summary,
        healthScore,
        instructions,
        vegetarian,
        diets,
      } = apiUrl.data;
      if (vegetarian) {
        diets.push("vegetarian");
      }
      res.status(200).json({
        id,
        title,
        image,
        summary,
        healthScore,
        instructions,
        diets,
      });
    } else {
      const recipe = await Recipe.findOne({
        where: { id: idRecipe },
        include: {
          model: Diet,
          attributes: ["name"],
        },
      });
      res.status(200).json(recipe);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = getRecipeById;
