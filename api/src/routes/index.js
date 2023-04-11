const { Router } = require("express");
// Importar todos los routers;
const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName = require("../controllers/getRecipeByName");
const postRecipe = require("../controllers/postRecipe");
const getDiets = require("../controllers/getDiets");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:idRecipe", getRecipeById);

router.get("/recipes", getRecipeByName);

router.post("/recipes", postRecipe);

router.get("/diets", getDiets);

module.exports = router;
