import Interpreter from './BaseInterpreter';
import { PieceTypeChoices } from './choices';
import { canBuild, getPieceTypeOptions } from './rules';
import { OrderType, PieceType, Territory } from './types';

export default class BuildPhaseInterpreter extends Interpreter {
  canSelectTerritory(territory: Territory): boolean {
    return canBuild(territory, this.nation, this.getPiece(territory));
  }

  getContextMenuOptions(): string[][] {
    const pieceTypes = getPieceTypeOptions(this.source);
    return pieceTypes.map((pt) => [pt, PieceTypeChoices[pt]]);
  }

  onClickOption(pieceType: PieceType): void {
    this.setOrder({ ...this.order, pieceType, type: OrderType.BUILD });
  }

  showContextMenu(): boolean {
    return Boolean(this.source && !this.order.pieceType);
  }
}
