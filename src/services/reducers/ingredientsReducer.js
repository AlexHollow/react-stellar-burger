import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/ingredientsActions';

const initState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
}

export function ingredientsReducer(state = initState, action) {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.ingredients,
        isLoading: false,
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state;
  }
}