import {
  GET_RECIPES,
  GET_DETAIL,
  FILTER_BY_DIET,
  FILTER_BY_CREATOR,
  ORDER_BY_NAME,
  ORDER_BY_HEALTSCORE,
} from "../actions";

export const initialState = {
  recipes: [],
  recipe: [],
  filteredRecipes: [],
  selectedDiet: "All",
  orderRecipes: [],
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
      return {
        ...state,
        recipe: action.payload,
      };
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
      return { ...state, recipes: orderRecipesByName };
    case ORDER_BY_HEALTSCORE:
      let orderRecipesByHS =
        action.payload === "ascendente"
          ? state.filteredRecipes.sort((a, b) => {
              if (a.healtScore > b.healtScore) {
                return 1;
              }
              if (b.healtScore > a.healtScore) {
                return -1;
              }
              return 0;
            })
          : state.filteredRecipes.sort((a, b) => {
              if (a.healtScore > b.healtScore) {
                return -1;
              }
              if (b.healtScore > a.healtScore) {
                return 1;
              }
              return 0;
            });
      return { ...state, orderRecipes: orderRecipesByHS };
    default:
      return state;
  }
};
export default rootReducer;
