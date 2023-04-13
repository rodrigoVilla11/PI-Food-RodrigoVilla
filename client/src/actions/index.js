import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_CREATOR = "FILTER_BY_CREATOR";

export function getRecipes() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
  };
}

export function filterRecipesByDiets(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function filterRecipesByCreator(payload) {
  return {
    type: FILTER_BY_CREATOR,
    payload,
  };
}
