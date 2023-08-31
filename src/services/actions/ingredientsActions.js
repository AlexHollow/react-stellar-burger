import { getData } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredientsRequest() {
  return {
    type: GET_INGREDIENTS_REQUEST,
  }
}

export function getIngredientsSuccess(ingredients) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: {
      ingredients,
    },
  }
}

export function getIngredientsFailed() {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}

export function fetchIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    
    getData()
      .then((res) => dispatch(getIngredientsSuccess(res.data)))
      .catch(() => dispatch(getIngredientsFailed()))
  }
}