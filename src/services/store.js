import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { modalReducer } from "./reducers/modalReducer";
import { cartReducer } from "./reducers/cartReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { orderReducer } from "./reducers/orderReducer";

const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: ingredientsReducer,
  cart: cartReducer,
  modal: modalReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));