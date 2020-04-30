import { ADD_FLASH_MESSAGE } from './actionTypes';

export default function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
}
