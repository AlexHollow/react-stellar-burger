export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal({ content, title }) {
  return {
    type: OPEN_MODAL,
    payload: {
      content,
      title,
    }
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}