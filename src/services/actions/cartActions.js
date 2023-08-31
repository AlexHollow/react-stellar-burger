export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const RESET_CART = 'RESET_CART';
export const SHIFT_INGREDIENT = 'SHIFT_INGREDIENT';

export function addIngredient(ingredient, key) {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      ...key,
    }
  }
};

export function removeIngredient(ingredient) {
  return {
    type: REMOVE_INGREDIENT,
    payload: {
      ...ingredient,
    }
  }
};

export function resetCart() {
  return {
    type: RESET_CART,
  }
};

export function shiftIngredient(ingredients) {
  return {
    type: SHIFT_INGREDIENT,
    payload: [ ...ingredients ],
  }
}