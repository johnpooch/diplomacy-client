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

  createOrder() {
    // TODO remove
    console.log('Created Order');
    console.log(this.gameForm);
    this.callbacks.postOrder();
    this.reset();
  }

  formIsReady() {
    if (this.type === OrderTypes.HOLD) {
      return true;
    }
    if ([OrderTypes.MOVE, OrderTypes.RETREAT].includes(this.type)) {
      // TODO namedCoasts
      if (this.target) {
        return true;
      }
    }
    if ([OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(this.type)) {
      if (this.target && this.aux) {
        return true;
      }
    }
    return false;
  }
}
