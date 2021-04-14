import Interpreter from './BaseInterpreter';
import { OrderTypeChoices } from './choices';
import { canRetreat, canRetreatTo } from './rules';
import { OrderType, Piece, Territory } from './types';

export default class RetreatInterpreter extends Interpreter {
  canSelectTerritory(territory: Territory): boolean {
    if (!this.source) return canRetreat(this.getPiece(territory), this.nation);
    return canRetreatTo(this.getPiece(this.source), this.source, territory);
  }

  getContextMenuOptions(): string[][] {
    return [
      [OrderType.RETREAT, OrderTypeChoices[OrderType.RETREAT]],
      [OrderType.DISBAND, OrderTypeChoices[OrderType.DISBAND]],
    ];
  }

  getPiece(territory: Territory): Piece {
    return this.pieces.find(
      (p) => p.territory === territory.id && p.mustRetreat
    );
  }

  showContextMenu(): boolean {
    return Boolean(this.source && !this.order.type);
  }
}
