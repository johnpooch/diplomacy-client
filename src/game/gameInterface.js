import { baseGameInterface } from './base';

export default class GameInterface extends baseGameInterface {
  /*
  Game interface class for real games (as opposed to the sandbox game).
  */

  createOrder() {
    this.actions.postOrder();
    this.reset();
  }
}
