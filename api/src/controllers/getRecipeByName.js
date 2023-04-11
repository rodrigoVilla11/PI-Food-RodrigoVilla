require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db.js");
const { api_key } = process.env;

const getRecipeByName = async (req, res) => {
  const name = req.query.name;
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${name}&addRecipeInformation=true`
    );

    if (name) {
      let filteredResults = await apiUrl.data.results
        .filter((el) => el.title.toLowerCase().includes(name.toLowerCase()))
        .map(
          ({
            id,
            title,
            image,
            summary,
            healthScore,
            instructions,
            diets,
          }) => ({
            id,
            title,
            image,
            summary,
            healthScore,
            instructions,
            diets,
          })
        );
      const recipe = await Recipe.findAll({
        where: { title: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Diet,
          attributes: ["name"],
        },
      });
      const allRecipes = await filteredResults.concat(recipe);
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getRecipeByName;
