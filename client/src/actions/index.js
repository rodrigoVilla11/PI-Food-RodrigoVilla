import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_CREATOR = "FILTER_BY_CREATOR";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_HEALTSCORE = "ORDER_BY_HEALTSCORE";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_DIETS = "GET_DIETS";

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

export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
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

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByHealtScore(payload) {
  return {
    type: ORDER_BY_HEALTSCORE,
    payload,
  };
}

export function getDiets() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/recipes", payload);
    return response;
  };
}
