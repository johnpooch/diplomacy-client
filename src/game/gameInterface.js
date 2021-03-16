import {
  baseGameInterface,
  OrderTypeChoices,
  OrderTypes,
  PieceTypes,
} from './base';

export default class GameInterface extends baseGameInterface {
  /*
  Game interface class for real games (as opposed to the sandbox game).
  */

  showContextMenu() {
    return Boolean(this.source && !this.type);
  }

  formIsReady() {
    return this.orderIsReady();
  }

  submitForm() {
    this.callbacks.postOrder();
  }

  getOrderTypeChoices() {
    if (!this.source) return null;
    const piece = this._getPiece(this.source);
    if (!piece) return null;
    const { type: territoryType } = this.source;
    const options = [
      OrderTypeChoices[OrderTypes.HOLD],
      OrderTypeChoices[OrderTypes.MOVE],
      OrderTypeChoices[OrderTypes.SUPPORT],
    ];
    if (piece.type === PieceTypes.FLEET && territoryType === 'sea') {
      options.push(OrderTypeChoices[OrderTypes.CONVOY]);
    }
    return options;
  }

  interactionNotPossible(territory) {
    return (
      this._tryingToCreateOrderImpossible(territory) ||
      this._tryingToSupportOrConvoySource(territory) ||
      this._tryingToMoveToSource(territory)
    );
  }
}
