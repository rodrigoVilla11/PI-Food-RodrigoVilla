require("dotenv").config();
const axios = require("axios");
const { Diet } = require("../db.js");
const { api_key } = process.env;

const getDiets = async (req, res) => {
  try {
    const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${api_key}&addRecipeInformation=true&number=100`
    );
    const diet = dietsApi.data.results.flatMap((el) => el.diets);
    dietsApi.data.results.forEach((el) => {
      if (el.vegetarian && !diet.includes("vegetarian"))
        diet.push("vegetarian");
    });
    diet.forEach((el) => {
      Diet.findOrCreate({ where: { name: el } });
    });
    const allDiets = await Diet.findAll();
    console.log(allDiets);
    res.status(200).send(allDiets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getDiets;
