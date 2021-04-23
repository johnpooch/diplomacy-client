import {
  getNextOrderAttribute,
  getTargetCoastOptions,
  orderComplete,
} from './rules';
import { Order, OrderAttr, Piece, Territory, NamedCoast } from './types';

export const initialOrderState: Order = {
  aux: null,
  pieceType: null,
  source: null,
  target: null,
  targetCoast: null,
  type: null,
  viaConvoy: false,
  viaConvoySelected: false,
};

export default abstract class Interpreter {
  /*
  The interpreter takes the user's interactions with the map and updates
  the order accordingly.

  The interpreter is also responsible for presenting the user with the
  correct options depending on the state of the game and the territory that
  the user is interacting with.
  */
  protected aux: Territory | null;

  protected source: Territory | null;

  protected target: Territory | null;

  protected order: Order;

  protected nation: string | null;

  protected pieces: Piece[];

  protected territories: { [key: string]: Territory };

  protected namedCoasts: { [key: string]: NamedCoast };

  protected setOrder: (order: Order) => void;

  private createOrder: () => void;

  constructor(
    order: Order,
    nation: string | null,
    territories: { [key: string]: Territory },
    pieces: Piece[],
    namedCoasts: { [key: string]: NamedCoast },
    createOrder: () => void,
    setOrder: (order: Order) => void
  ) {
    this.order = order;
    this.nation = nation;
    this.setOrder = setOrder;
    this.createOrder = createOrder;

    this.aux = territories[order.aux];
    this.source = territories[order.source];
    this.target = territories[order.target];

    this.territories = territories;
    this.pieces = pieces;
    this.namedCoasts = namedCoasts;

    this.onClickOption = this.onClickOption.bind(this);

    if (this.orderComplete()) {
      this.onOrderComplete();
    }
  }

  abstract showContextMenu(): boolean;

  abstract getContextMenuOptions(): (string | boolean)[][];

  abstract canSelectTerritory(territory: Territory): boolean;

  getTargetCoastChoices(territory: Territory): string[][] {
    return getTargetCoastOptions(territory, this.namedCoasts).map((t) => [
      t.id,
      t.name,
    ]);
  }

  mustSpecifyTargetCoast(): boolean {
    return false;
  }

  mustSpecifyViaConvoy(): boolean {
    return false;
  }

  nextAttr(): OrderAttr {
    return getNextOrderAttribute(
      this.order,
      this.mustSpecifyViaConvoy(),
      this.mustSpecifyTargetCoast()
    );
  }

  onClickTerritory(territory: Territory): void {
    // Clicking outside of context menu resets order
    if (this.showContextMenu()) {
      this.reset();
    } else if (this.canSelectTerritory(territory)) {
      this.setOrder({ ...this.order, [this.nextAttr()]: territory.id });
    }
  }

  onClickOption(option: string | boolean): void {
    this.setOrder({ ...this.order, [this.nextAttr()]: option });
  }

  onOrderComplete(): void {
    this.createOrder();
    this.reset();
  }

  orderComplete(): boolean {
    return orderComplete(
      this.order,
      this.mustSpecifyViaConvoy(),
      this.mustSpecifyTargetCoast()
    );
  }

  reset(): void {
    this.setOrder(initialOrderState);
  }

  getPiece(territory: Territory): Piece {
    return this.pieces.find(
      (p) => p.territory === territory.id && !p.mustRetreat
    );
  }
}
