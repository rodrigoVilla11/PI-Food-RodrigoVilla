require("dotenv").config();
const axios = require("axios");
const { Diet } = require("../db.js");
const { API_KEY } = process.env;

const getDiets = async (req, res) => {
  try {
    const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const diet = dietsApi.data.results.flatMap((el) => el.diets);
    dietsApi.data.results.forEach((el) => {
      if (el.vegetarian && !diet.includes("vegetarian"))
        diet.push("vegetarian");
    });
    const dietFilter = diet.filter((el, index, arr) => {
      return index === arr.indexOf(el);
    });
    console.log(dietFilter);
    dietFilter.forEach(async (el) => {
      await Diet.findOrCreate({ where: { name: el } });
    });
    const allDiets = await Diet.findAll();
    res.status(200).send(allDiets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getDiets;
