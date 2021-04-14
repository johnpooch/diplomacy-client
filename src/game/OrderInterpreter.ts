import Interpreter from './BaseInterpreter';
import { OrderTypeChoices, ViaConvoyChoices } from './choices';
import {
  canMoveTo,
  canOrder,
  getOrderTypeOptions,
  getTargetCoastOptions,
  getViaConvoyOptions,
  requiresConvoy,
  checkMustSpecifyViaConvoy,
  checkMustSpecifyTargetCoast,
} from './rules';
import { OrderAttr, OrderType, Territory } from './types';

export default class OrderInterface extends Interpreter {
  canSelectTerritory(territory: Territory): boolean {
    if (!this.source) return canOrder(this.getPiece(territory), this.nation);
    if (this.order.type === OrderType.MOVE)
      return canMoveTo(this.source, territory);
    return canMoveTo(this.source, territory);
  }

  getContextMenuOptions(): (string | boolean)[][] {
    if (this.mustSpecifyTargetCoast())
      return this.getTargetCoastChoices(this.target);
    if (this.mustSpecifyViaConvoy()) return this.getViaConvoyChoices();
    const piece = this.getPiece(this.source);
    const orderTypes = getOrderTypeOptions(this.source, piece);
    return orderTypes.map((ot) => [ot, OrderTypeChoices[ot]]);
  }

  onClickOption(option: string | boolean): void {
    if (this.nextAttr() === OrderAttr.VIA_CONVOY) {
      this.setOrder({
        ...this.order,
        viaConvoy: Boolean(option),
        viaConvoySelected: true,
      });
    } else {
      this.setOrder({ ...this.order, [this.nextAttr()]: option });
    }
  }

  showContextMenu(): boolean {
    return (
      (this.mustSpecifyTargetCoast() && !this.order.targetCoast) ||
      (this.mustSpecifyViaConvoy() && !this.order.viaConvoySelected) ||
      Boolean(this.order.source && !this.order.type)
    );
  }

  onOrderComplete(): void {
    if (
      this.order.type === OrderType.MOVE &&
      requiresConvoy(this.order, this.source, this.target) &&
      !this.order.viaConvoy
    ) {
      this.setOrder({ ...this.order, viaConvoy: true });
    } else {
      Interpreter.prototype.onOrderComplete.call(this);
    }
  }

  getTargetCoastChoices(territory: Territory): string[][] {
    return getTargetCoastOptions(territory, this.namedCoasts).map((t) => [
      t.id,
      t.name,
    ]);
  }

  getViaConvoyChoices(): (boolean | string)[][] {
    return getViaConvoyOptions().map((o) => [
      o,
      ViaConvoyChoices[o.toString()],
    ]);
  }

  mustSpecifyTargetCoast(): boolean {
    return this.target
      ? checkMustSpecifyTargetCoast(this.target, this.order.type)
      : false;
  }

  mustSpecifyViaConvoy(): boolean {
    if (!this.target) return false;
    if (this.order.type !== OrderType.MOVE) return false;
    const piece = this.getPiece(this.source);
    return checkMustSpecifyViaConvoy(
      this.territories,
      this.pieces,
      piece,
      this.order.type,
      this.source,
      this.target
    );
  }
}
