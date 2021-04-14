import Interpreter from './BaseInterpreter';
import { OrderTypeChoices } from './choices';
import { OrderType, Territory } from './types';

export default class DisbandInterpreter extends Interpreter {
  canSelectTerritory(territory: Territory): boolean {
    const piece = this.getPiece(territory);
    return Boolean(piece && piece.nation === this.nation);
  }

  getContextMenuOptions(): string[][] {
    return [[OrderType.DISBAND, OrderTypeChoices[OrderType.DISBAND]]];
  }

  showContextMenu(): boolean {
    return Boolean(this.source && !this.order.type);
  }
}
