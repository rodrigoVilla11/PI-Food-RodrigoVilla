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
            vegetarian,
            lowFodmap,
            diets,
          }) => {
            if (vegetarian) diets.push("vegetarian");
            if (lowFodmap) diets.push("lowFodmap");
            return {
              id,
              title,
              image,
              summary,
              healthScore,
              instructions,
              diets,
            };
          }
        );
      const recipe = await Recipe.findAll({
        where: { title: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Diet,
          attributes: ["name"],
        },
      });
      const allRecipes = await filteredResults.concat(recipe);
      if (allRecipes.length == 0)
        res.status(400).json({ error: "recipe not found" });
      res.status(200).json(allRecipes);
    } else {
      const preview = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&addRecipeInformation=true&number=100`
      );
      let previewResults = await preview.data.results.map(
        ({
          id,
          title,
          image,
          summary,
          healthScore,
          instructions,
          vegetarian,
          diets,
        }) => {
          if (vegetarian) diets.push("vegetarian");

          return {
            id,
            title,
            image,
            summary,
            healthScore,
            instructions,
            diets,
          };
        }
      );
      res.status(200).send(previewResults);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getRecipeByName;
