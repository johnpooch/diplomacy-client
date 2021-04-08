import { baseGameInterface } from './base';

export default class DummyInterface extends baseGameInterface {
  /* This interface class is used when the user cannot interact with the board,
  e.g. Buid phase and the user has no surplus or deficit. */
  showContextMenu() {
    return null;
  }

  formIsReady() {
    return false;
  }

  submitForm() {
    return null;
  }

  getOrderTypeChoices() {
    return [];
  }

  interactionNotPossible() {
    return true;
  }
}
