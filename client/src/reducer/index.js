import {
  GET_RECIPES,
  GET_DETAIL,
  FILTER_BY_DIET,
  FILTER_BY_CREATOR,
} from "../actions";

export const initialState = {
  recipes: [],
  recipe: [],
  filteredRecipes: [],
  selectedDiet: "All",
};

const rootReducer = (state = initialState, action) => {
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
      const selectedDiet = action.payload;
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
        action.payload === "dbRecipes"
          ? allRecipesCreator.filter((el) => typeof el.id === "string")
          : allRecipesCreator.filter((el) => typeof el.id === "number");
      return {
        ...state,
        filteredRecipes: (action.payload = "All"
          ? state.filteredRecipes
          : filteredCreatedByClient),
      };
    default:
      return state;
  }
};
export default rootReducer;
