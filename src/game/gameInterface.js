import { baseGameInterface, OrderTypes } from './base';

export default class GameInterface extends baseGameInterface {
  /*
  Game interface class for real games (as opposed to the sandbox game).
  */

  showContextMenu() {
    // User first clicks a territory
    if (this.source && !this.type) {
      return true;
    }
    // TODO NamedCoasts, Build
    return false;
  }

  formIsReady() {
    return this.orderIsReady();
  }

  submitForm() {
    // TODO remove
    console.log('Created Order');
    console.log(this.gameForm);
    delete this.gameForm.action;
    this.callbacks.postOrder();
  }
}
