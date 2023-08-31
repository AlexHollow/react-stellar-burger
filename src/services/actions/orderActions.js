// import { postOrder } from "../../utils/burger-api";

export const ORDER_NUM_REQUEST = 'ORDER_REQUEST';
export const ORDER_NUM_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_NUM_FAILED = 'ORDER_FAILED';
export const REMOVE_ORDER_INFO = 'REMOVE_ORDER_INFO'; 

export function getOrderNumRequest() {
  return {
    type: ORDER_NUM_REQUEST,
  }
}

export function getOrderNumSuccess(orderNum) {
  return {
    type: ORDER_NUM_SUCCESS,
    payload: {
      orderNum,
    },
  }
}

export function getOrderNumFailed() {
  return {
    type: ORDER_NUM_FAILED,
  }
}

// export function fetchOrder(order) {
//   return function (dispatch) {
//     dispatch(getOrderNumRequest());

//     postOrder(order)
//       .then((res) => dispatch(getOrderNumSuccess(res.order.number)))
//       .catch(() => dispatch(getOrderNumFailed()))
//   }
// }