import { baseGameInterface, OrderTypes, OrderTypeChoices } from './base';
import { selectRetreatingPieceByTerritory } from '../store/selectors';

export default class RetreatPhaseInterface extends baseGameInterface {
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
    return [
      OrderTypeChoices[OrderTypes.RETREAT],
      OrderTypeChoices[OrderTypes.DISBAND],
    ];
  }

  interactionNotPossible(territory) {
    return (
      this._tryingToCreateOrderImpossible(territory) ||
      this._tryingToRetreatToSource(territory)
    );
  }

  _userCanOrder(territory) {
    if (!this.userNation || !this.turn.currentTurn) return false;
    const piece = this._getPiece(territory);
    return Boolean(
      piece && piece.nation === this.userNation.nation && piece.mustRetreat
    );
  }

  _tryingToRetreatToSource(territory) {
    const choosingTarget = this.type === OrderTypes.RETREAT && !this.target;
    return Boolean(choosingTarget && this.source === territory);
  }

  _pieceNotRetreating(territory) {
    const piece = this._getPiece(territory);
    return Boolean(!piece.mustRetreat);
  }

  _tryingToCreateOrderImpossible(territory) {
    return Boolean(!this.source && !this.userCanOrder(territory));
  }

  _getPiece(territory) {
    return selectRetreatingPieceByTerritory(
      this.state,
      territory.id,
      this.turn.id
    );
  }
}
