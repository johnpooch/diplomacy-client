import { baseGameInterface, OrderTypeChoices, OrderTypes } from './base';

export default class DisbandInterface extends baseGameInterface {
  showContextMenu() {
    return Boolean(this.source && !this.pieceType);
  }

  formIsReady() {
    return Boolean(this.type);
  }

  submitForm() {
    this.callbacks.postOrder();
  }

  getOptions() {
    return [OrderTypeChoices[OrderTypes.DISBAND]];
  }

  interactionNotPossible(territory) {
    return !this._userCanOrder(territory);
  }

  _userCanOrder(territory) {
    if (!this.userNation || !this.turn.currentTurn) return false;
    const piece = this._getPiece(territory);
    return Boolean(piece && piece.nation === this.userNation.nation);
  }
}
