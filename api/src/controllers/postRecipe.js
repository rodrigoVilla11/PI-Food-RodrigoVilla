const { Recipe, Diet } = require("../db.js");

const postRecipe = async (req, res) => {
  let { title, image, summary, healthScore, instructions, diets } = req.body;

  if (!title || !image || !summary || !healthScore || !instructions) {
    throw Error("Faltan datos");
  }
  const createRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    instructions,
  });

  let dietDb = await Diet.findAll({ where: { name: diets } });
  createRecipe.addDiet(dietDb);
  res.send("Recipe created successfully");
};

module.exports = postRecipe;
