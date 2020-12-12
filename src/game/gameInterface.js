import { baseGameInterface } from './base';

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

  createOrder() {
    // TODO remove
    console.log('Created Order');
    console.log(this.gameForm);
    this.actions.postOrder();
    this.reset();
  }
}
