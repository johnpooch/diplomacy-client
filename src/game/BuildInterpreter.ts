import Interpreter from './BaseInterpreter';
import { PieceTypeChoices } from './choices';
import {
  canBuild,
  checkMustSpecifyTargetCoast,
  getPieceTypeOptions,
} from './rules';
import { OrderType, Territory } from './types';

export default class BuildPhaseInterpreter extends Interpreter {
  canSelectTerritory(territory: Territory): boolean {
    return canBuild(territory, this.nation, this.getPiece(territory));
  }

  getContextMenuOptions(): string[][] {
    if (!this.order.pieceType) {
      const pieceTypes = getPieceTypeOptions(this.source);
      return pieceTypes.map((pt) => [pt, PieceTypeChoices[pt]]);
    }
    return this.getTargetCoastChoices(this.source);
  }

  onClickTerritory(territory: Territory): void {
    // Clicking outside of context menu resets order
    if (this.showContextMenu()) {
      this.reset();
    } else if (this.canSelectTerritory(territory)) {
      this.setOrder({
        ...this.order,
        [this.nextAttr()]: territory.id,
        type: OrderType.BUILD,
      });
    }
  }

  showContextMenu(): boolean {
    return (
      (this.mustSpecifyTargetCoast() && !this.order.targetCoast) ||
      Boolean(this.source && !this.order.pieceType)
    );
  }

  mustSpecifyTargetCoast(): boolean {
    return this.order.pieceType
      ? checkMustSpecifyTargetCoast(
          this.source,
          this.order.type,
          this.order.pieceType
        )
      : false;
  }
}
