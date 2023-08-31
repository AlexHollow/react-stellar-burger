import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modalActions"

const initState = {
  isActive: false,
  content: '',
  title: '',
}

export function modalReducer(state = initState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isActive: true,
        content: action.payload.content,
        title: action.payload.title,
      }
    case CLOSE_MODAL:
      return initState;
    default:
      return state;
  }
}