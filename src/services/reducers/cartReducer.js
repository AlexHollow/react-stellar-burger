import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, RESET_CART } from "../actions/cartActions";

const initState = {
  bun: '',
  ingredients: [],
}

export function cartReducer(state = initState, action) {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return { bun: action.payload, ingredients: state.ingredients }
      }
      return { bun: state.bun, ingredients: state.ingredients.concat(action.payload) }
    }
    case REMOVE_INGREDIENT:
      return { bun: state.bun, ingredients: state.ingredients.filter((item) => item.key !== action.payload.key) }
    case SHIFT_INGREDIENT:
      return { ...state, ingredients: action.payload }
    case RESET_CART:
      return initState;
    default:
      return state;
  }
}