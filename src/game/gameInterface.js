import { baseGameInterface } from './base';

export default class GameInterface extends baseGameInterface {
  /*
  Game interface class for real games (as opposed to the sandbox game).
  */
  createOrder() {
    // TODO remove
    console.log('Created Order');
    console.log(this.gameForm);
    this.actions.postOrder();
    this.reset();
  }
}
