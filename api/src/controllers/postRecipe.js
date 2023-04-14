const { Recipe, Diet } = require("../db.js");

const postRecipe = async (req, res) => {
  let { title, image, summary, healthScore, instructions, diets } = req.body;
  try {
    if (!title || !image || !summary || !healthScore || !instructions) {
      throw Error("Faltan datos");
    }
    const alreadyExists = await Recipe.findOne({ where: { title: title } });

    if (alreadyExists) throw Error("Recipe already exists");

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
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = postRecipe;
