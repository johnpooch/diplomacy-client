import { OrderTypes, Phases, PieceTypes } from './base';

export const initialOrderState = {
  aux: null,
  source: null,
  target: null,
  targetCoast: null,
  type: null,
};

export class Order {
  /* Wrapper class for the order form. Provides methods for updating the state
   * of the order form. */

  constructor(orderForm, turn, setOrderForm) {
    this.orderForm = orderForm;
    this.turn = turn;
    this.setOrderForm = setOrderForm;

    const { aux, source, target, targetCoast, type } = orderForm;
    const { territories, userNation } = turn;
    this.aux = territories.find((t) => t.id && t.id === aux) || null;
    this.source = territories.find((t) => t.id && t.id === source) || null;
    this.target = territories.find((t) => t.id && t.id === target) || null;
    this.targetCoast = targetCoast;
    this.type = type;

    this.currentTurn = turn.current_turn;
    this.territories = territories;
    this.userNation = userNation;

    this.clickOrderTypeChoice = this.clickOrderTypeChoice.bind(this);
    this.reset = this.reset.bind(this);
  }

  clickTerritory(territory) {
    /* Determine whether clicking the territory is valid. If valid, update the
     * order form */
    if (!territory.id) return;
    if (!this.source && !this.userCanOrder(territory)) return;
    if (
      [OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(this.type) &&
      !this.aux &&
      territory.id === this.source.id
    )
      return;
    if (this.source && !this.target && territory.id === this.source.id) return;
    const attr = this.getOrderAttrToUpdate();
    this.setOrderForm({ ...this.orderForm, [attr]: territory.id });
  }

  clickOrderTypeChoice(_, type) {
    this.setOrderForm({ ...this.orderForm, type });
  }

  getOrderAttrToUpdate() {
    /* Given the state of the order, determine which attribute should be updated
     * with the next click. */
    let attr = 'source';
    if (this.source && !this.type) return 'type';
    switch (this.type) {
      case OrderTypes.RETREAT:
      case OrderTypes.MOVE:
        if (!this.target) attr = 'target';
        break;
      case OrderTypes.SUPPORT:
      case OrderTypes.CONVOY:
        if (!this.aux) return 'aux';
        if (!this.target) return 'target';
        break;
      default:
        attr = 'source';
    }
    return attr;
  }

  userCanOrder(territory) {
    /* Determine whether a user can create an order for the given territory */
    if (!(this.userNation && this.currentTurn)) return false;

    // Orders turn
    if (this.turn.phase === Phases.ORDER) {
      return territory.piece && territory.piece.nation === this.userNation.id;
    }

    // Retreat turn
    if (this.turn.phase === Phases.RETREAT) {
      return (
        territory.dislodgedPiece &&
        territory.dislodgedPiece.nation === this.userNation.id
      );
    }

    // Build turn
    // TODO handle disband and build
    return false;
  }

  getTerritoryOrderState(territoryId) {
    /* Determine the status of a territory in the order. */
    // TODO could this be written more elegantly?
    const { aux, source, target } = this.orderForm;
    if (!territoryId) return null;
    if (source === territoryId) {
      return 'source';
    }
    if (aux === territoryId) {
      return 'aux';
    }
    if (target === territoryId) {
      return 'target';
    }
    return null;
  }

  getOrderTypeChoices() {
    /* Given the current turn phase and the piece being ordered, determine
     * which order types are available to the piece. */
    if (!this.source) return null;
    if (!this.source.piece) return null;
    const { type: territoryType } = this.source;
    if (this.turn.phase === Phases.ORDER) {
      const options = [OrderTypes.HOLD, OrderTypes.MOVE, OrderTypes.SUPPORT];
      const { type: pieceType } = this.source.piece;
      if (pieceType === PieceTypes.FLEET && territoryType === 'sea') {
        options.push(OrderTypes.CONVOY);
      }
      return options;
    }
    if (this.turn.phase === Phases.RETREAT) {
      const options = [OrderTypes.RETREAT, OrderTypes.DISBAND];
      return options;
    }
    return [OrderTypes.BUILD];
  }

  getPieceTypeChoices() {
    /* If the turn is a build phase, determine which piece types can be build
     * by the source territory */
    if (this.source && this.turn.phase === Phases.BUILD)
      return this.source.type === 'coastal'
        ? [PieceTypes.ARMY, PieceTypes.FLEET]
        : [PieceTypes.ARMY];
    return null;
  }

  reset() {
    /* Set the order form to its initial state. */
    this.setOrderForm(initialOrderState);
  }
}
