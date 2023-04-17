import {
  GET_RECIPES,
  GET_DETAIL,
  FILTER_BY_DIET,
  FILTER_BY_CREATOR,
  ORDER_BY_NAME,
  ORDER_BY_HEALTSCORE,
  GET_RECIPES_BY_NAME,
  GET_DIETS,
} from "../actions";

export const initialState = {
  recipes: [],
  recipe: [],
  filteredRecipes: [],
  selectedDiet: "All",
  orderRecipes: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  const selectedDiet = action.payload;
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };

    case GET_DETAIL:
      return { ...state, recipe: action.payload };

    case GET_RECIPES_BY_NAME:
      return { ...state, filteredRecipes: action.payload };

    case FILTER_BY_DIET:
      const allRecipes = [...state.recipes];
      const filteredRecipes =
        selectedDiet === "All"
          ? allRecipes
          : allRecipes.filter((el) => el.diets.includes(selectedDiet));
      return {
        ...state,
        filteredRecipes,
        selectedDiet,
      };
    case FILTER_BY_CREATOR:
      const allRecipesCreator = [...state.recipes];
      const filteredCreatedByClient =
        selectedDiet === "dbRecipes"
          ? allRecipesCreator.filter((el) => typeof el.id === "string")
          : allRecipesCreator.filter((el) => typeof el.id === "number");
      return {
        ...state,
        filteredRecipes:
          action.payload === "All" ? state.recipes : filteredCreatedByClient,
      };
    case ORDER_BY_NAME:
      let orderRecipesByName =
        action.payload === "ascendente"
          ? state.filteredRecipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.filteredRecipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });

      console.log(orderRecipesByName);
      return {
        ...state,
        orderRecipes:
          action.payload === "All" ? state.recipes : orderRecipesByName,
      };
    case ORDER_BY_HEALTSCORE:
      let orderRecipesByHS =
        action.payload === "ascendente"
          ? state.filteredRecipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.filteredRecipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });

      console.log(orderRecipesByHS);
      return {
        ...state,
        orderRecipes:
          action.payload === "All" ? state.recipes : orderRecipesByHS,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
