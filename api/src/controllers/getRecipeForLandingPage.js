require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const getRecipesForLanding = async (req, res) => {
  try {
    const examples = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=5`
    );
    let examplesResults = await examples.data.results.map(
      ({ id, title, image }) => {
        return {
          id,
          title,
          image,
        };
      }
    );
    res.status(200).send(examplesResults);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getRecipesForLanding;
