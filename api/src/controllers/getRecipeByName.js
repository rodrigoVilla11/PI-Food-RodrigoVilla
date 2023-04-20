require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db.js");
const { API_KEY } = process.env;

const getRecipeByName = async (req, res) => {
  const name = req.query.name;
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&addRecipeInformation=true`
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
      const recipesDb = await Recipe.findAll({
        where: { title: { [Op.iLike]: `%${name}%` } },
        include: {
          model: Diet,
          attributes: ["name"],
        },
      });
      const allRecipes = await filteredResults.concat(recipesDb);
      if (previewResults.length == 0 && recipesDb.length == 0)
        res.status(400).json({ error: "recipe not found" });
      res.status(200).json(allRecipes);
    } else {
      const preview = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
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
      const recipesDb = await Recipe.findAll({
        include: {
          model: Diet,
          attributes: ["name"],
        },
      });
      const allRecipes = await previewResults.concat(recipesDb);
      res.status(200).send(allRecipes);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getRecipeByName;
