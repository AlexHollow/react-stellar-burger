import { ORDER_NUM_REQUEST, ORDER_NUM_SUCCESS, ORDER_NUM_FAILED } from "../actions/orderActions";

const initState = {
  orderNum: '',
  isLoading: false,
  hasError: false,
}

export function orderReducer(state = initState, action) {
  switch (action.type) {
    case ORDER_NUM_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case ORDER_NUM_SUCCESS:
      return {
        ...state,
        orderNum: action.payload.orderNum,
        isLoading: false,
        hasError: false,
      }
    case ORDER_NUM_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state;
  }
}