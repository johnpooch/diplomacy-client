import {
  baseGameInterface,
  OrderTypes,
  PieceTypes,
  PieceTypeChoices,
} from './base';

export default class BuildPhaseInterface extends baseGameInterface {
  showContextMenu() {
    return Boolean(this.source && !this.pieceType);
  }

  formIsReady() {
    if (this.pieceType) {
      return true;
    }
    return false;
  }

  submitForm() {
    this.callbacks.postOrder();
  }

  getOptions() {
    if (this.source.type === 'inland')
      return [PieceTypeChoices[PieceTypes.ARMY]];
    return [
      PieceTypeChoices[PieceTypes.ARMY],
      PieceTypeChoices[PieceTypes.FLEET],
    ];
  }

  onOptionSelected(pieceType) {
    this.setGameForm({ ...this.gameForm, pieceType, type: OrderTypes.BUILD });
  }

  interactionNotPossible(territory) {
    const piece = this._getPiece(territory);
    if (territory.controlledBy !== this.userNation.nation) return true;
    if (territory.nationality !== this.userNation.nation) return true;
    if (!territory.supplyCenter) return true;
    if (piece) return true;
    return false;
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
}
