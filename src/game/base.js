// Constants

export const Phases = {
  ORDER: 'Order',
  RETREAT: 'Retreat and Disband',
  BUILD: 'Build',
};

export const OrderTypes = {
  HOLD: 'hold',
  MOVE: 'move',
  SUPPORT: 'support',
  CONVOY: 'convoy',
  RETREAT: 'retreat',
  BUILD: 'build',
  DISBAND: 'disband',
};

export const PieceTypes = {
  ARMY: 'army',
  FLEET: 'fleet',
};

export const initialGameFormState = {
  action: null,
  aux: null,
  source: null,
  target: null,
  targetCoast: null,
  type: null,
};

export class baseGameInterface {
  /*
  The game interface takes the user's interactions with the map and updates the
  game form accordingly.

  The game interface is also responsible for presenting the user with the
  correct options depending on the state of the game and the territory that the
  user is interacting with.
  */
  constructor(actions, gameForm, setGameForm, turn) {
    const { action, aux, source, target, targetCoast, type } = gameForm;
    const { territories, userNation } = turn;

    this.actions = actions;
    this.gameForm = gameForm;
    this.setGameForm = setGameForm;
    this.turn = turn;
    this.nations = turn.nations;
    this.action = action;
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
    this.createOrder = this.createOrder.bind(this);

    this._tryingToSupportOrConvoySource = this._tryingToSupportOrConvoySource.bind(
      this
    );
    this._tryingToMoveToSource = this._tryingToMoveToSource.bind(this);
    this._tryingToCreateOrderImpossible = this._tryingToCreateOrderImpossible.bind(
      this
    );
  }

  createOrder() {
    /*
    What happens when the user confirms an order. Subclasses must implement
    this method.
    */
    throw new Error(
      'Subclasses of baseGameInterface must implement a createOrder method.'
    );
  }

  clickTerritory(territory) {
    /*
    Determine whether the user can interact with the territory. If possible,
    update the game form.
    */
    if (
      // If any of the following are true, interaction is not possible
      Boolean(!territory.id) ||
      this._tryingToCreateOrderImpossible(territory) ||
      this._tryingToSupportOrConvoySource(territory) ||
      this._tryingToMoveToSource(territory)
    )
      return;
    const attr = this._getOrderAttrToUpdate();
    this.setGameForm({ ...this.gameForm, [attr]: territory.id });
  }

  clickOrderTypeChoice(_, type) {
    /*
    Update gameForm based on the order type which the user has selected.
    */
    this.setGameForm({ ...this.gameForm, type });
  }

  userCanOrder(territory) {
    /*
    Determine whether a user can create an order for the given territory.
    */
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

  getOrderTypeChoices() {
    /*
    Given the current turn phase and the piece being ordered, determine
    which order types are available to the piece.
    */
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
    /*
    If the turn is a build phase, determine which piece types can be build
    by the source territory
    */
    if (this.source && this.turn.phase === Phases.BUILD)
      return this.source.type === 'coastal'
        ? [PieceTypes.ARMY, PieceTypes.FLEET]
        : [PieceTypes.ARMY];
    return null;
  }

  getNationChoices() {
    /*
    Get an option for each nation in the game.
    */
    return this.turn.nations.map((n) => [n.id, n.name]);
  }

  getTerritoryOrderState(territoryId) {
    /*
    Determine the status of a territory in the order.
    */
    // TODO could this be written more elegantly?
    const { aux, source, target } = this.gameForm;
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

  reset() {
    /*
    Set the order form to its initial state.
    */
    this.setGameForm(initialGameFormState);
  }

  _tryingToSupportOrConvoySource(territory) {
    /*
    Determine whether the player is trying to choose the source territory as
    the aux for a support or convoy order.
    */
    const choosingAux =
      [OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(this.type) && !this.aux;
    return Boolean(choosingAux && this.source === territory);
  }

  _tryingToMoveToSource(territory) {
    /*
    Determine whether the player is trying to choose the source territory as
    the target for a move order.
    */
    const choosingTarget = this.type === OrderTypes.MOVE && !this.target;
    return Boolean(choosingTarget && this.source === territory);
  }

  _tryingToCreateOrderImpossible(territory) {
    /*
    Determine whether the player is trying to create an order for a territory
    which it cannot order.
    */
    return Boolean(!this.source && !this.userCanOrder(territory));
  }

  _getOrderAttrToUpdate() {
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
}
