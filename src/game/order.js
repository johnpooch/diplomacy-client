export const initialOrderState = {
  aux: null,
  source: null,
  target: null,
  targetCoast: null,
  type: null,
};

export class Order {
  constructor(orderForm, turn, setOrder) {
    this.orderForm = orderForm;
    this.turn = turn;
    this.setOrder = setOrder;

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
    if (!territory.id) return;
    if (!this.source && !this.userCanOrder(territory)) return;
    const attr = this.getOrderAttrToUpdate();
    this.setOrder({ ...this.orderForm, [attr]: territory.id });
  }

  clickOrderTypeChoice(_, type) {
    this.setOrder({ ...this.orderForm, type });
  }

  getOrderAttrToUpdate() {
    /* Given the state of the order, determine which attribute should be updated
     * with the next click. */
    let attr = 'source';
    if (this.source && !this.type) return 'type';
    switch (this.type) {
      case 'retreat':
      case 'move':
        if (!this.target) attr = 'target';
        break;
      case 'support':
      case 'convoy':
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
    if (this.turn.phase === 'Order') {
      return territory.piece && territory.piece.nation === this.userNation.id;
    }

    // Retreat turn
    if (this.turn.phase === 'Retreat and Disband') {
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
    if (!this.source) return null;
    if (!this.source.piece) return null;
    const { type: territoryType } = this.source;
    // TODO use constants
    if (this.turn.phase === 'Order') {
      const options = ['hold', 'move', 'support'];
      const { type: pieceType } = this.source.piece;
      if (pieceType === 'fleet' && territoryType === 'sea') {
        options.push('convoy');
      }
      return options;
    }
    if (this.turn.phase === 'Retreat and Disband') {
      const options = ['retreat', 'disband'];
      return options;
    }
    return ['build'];
  }

  getPieceTypeChoices() {
    if (this.source && this.turn.phase === 'Build')
      return this.source.type === 'coastal' ? ['army', 'fleet'] : ['army'];
    return null;
  }

  reset() {
    this.setOrder(initialOrderState);
  }
}
