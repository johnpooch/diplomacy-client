import {
  baseGameInterface,
  OrderTypes,
  PieceTypes,
  PieceTypeChoices,
} from './base';
import { selectRetreatingPieceByTerritory } from '../store/selectors';

export default class DisbandInterface extends baseGameInterface {
  showContextMenu() {
    return Boolean(this.source && !this.pieceType);
  }

  formIsReady() {
    return this.orderIsReady();
  }

  submitForm() {
    this.callbacks.postOrder();
  }

  getOptions() {
    return [
      PieceTypeChoices[PieceTypes.ARMY],
      PieceTypeChoices[PieceTypes.FLEET],
    ];
  }

  interactionNotPossible(territory) {
    console.log(this.userNation);
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

  _getPiece(territory) {
    return selectRetreatingPieceByTerritory(
      this.state,
      territory.id,
      this.turn.id
    );
  }
}
