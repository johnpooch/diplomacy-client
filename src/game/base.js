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

// I wonder if there is a DRYer way to set up this structure?
const OrderTypeChoices = {
  [OrderTypes.HOLD]: [OrderTypes.HOLD, 'Hold'],
  [OrderTypes.MOVE]: [OrderTypes.MOVE, 'Move'],
  [OrderTypes.SUPPORT]: [OrderTypes.SUPPORT, 'Support'],
  [OrderTypes.CONVOY]: [OrderTypes.CONVOY, 'Convoy'],
  [OrderTypes.RETREAT]: [OrderTypes.RETREAT, 'Retreat'],
  [OrderTypes.BUILD]: [OrderTypes.BUILD, 'Build'],
  [OrderTypes.DISBAND]: [OrderTypes.DISBAND, 'Disband'],
};

export const PieceTypes = {
  ARMY: 'army',
  FLEET: 'fleet',
};

export const initialGameFormState = {
  action: null,
  aux: null,
  nation: null,
  source: null,
  target: null,
  targetCoast: null,
  type: null,
};

export class baseGameInterface {
  /*
  The game interface takes the user's interacions with the map and updates
  the game form accordingly.

  The game interface is also responsible for presenting the user with the
  correct options depending on the state of the game and the territory that
  the user is interacting with.
  */
  constructor(callbacks, gameForm, setGameForm, turn) {
    const { action, aux, nation, source, target, targetCoast, type } = gameForm;
    const { territories, userNation } = turn;

    this.gameForm = gameForm;
    this.setGameForm = setGameForm;

    this.callbacks = callbacks;

    // Unpack the gameForm and get territory objects using IDs Is there a
    // cleaner way to do this? This is a lot of iteration for every single time
    // this class is instantiated.
    this.aux = territories.find((t) => t.id && t.id === aux) || null;
    this.source = territories.find((t) => t.id && t.id === source) || null;
    this.target = territories.find((t) => t.id && t.id === target) || null;
    this.targetCoast = targetCoast;
    this.type = type;
    this.action = action;

    this.turn = turn;
    this.phase = turn.phase;
    this.userNation = userNation;
    this.nation = nation;

    this.nations = turn.nations.map((n) => [n.id, n.name]);

    // Is there really no way to avoid doing this cruft?
    this.onOptionSelected = this.onOptionSelected.bind(this);
    this.onOrderTypeSelected = this.onOrderTypeSelected.bind(this);

    // Create order once it is ready
    if (this.formIsReady()) {
      this.submitForm();
      this.reset();
    }
  }

  createOrder() {
    throw new Error(
      'Subclasses of baseGameInterface must implement a createOrder method.'
    );
  }

  showContextMenu() {
    throw new Error(
      'Subclasses of baseGameInterface must implement a showContextMenu method.'
    );
  }

  submitForm() {
    throw new Error(
      'Subclasses of baseGameInterface must implement a submitForm method.'
    );
  }

  formIsReady() {
    throw new Error(
      'Subclasses of baseGameInterface must implement a formIsReady method.'
    );
  }

  orderIsReady() {
    if (this.type === OrderTypes.HOLD) {
      return true;
    }
    if ([OrderTypes.MOVE, OrderTypes.RETREAT].includes(this.type)) {
      // TODO namedCoasts
      if (this.target) {
        return true;
      }
    }
    if ([OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(this.type)) {
      if (this.target && this.aux) {
        return true;
      }
    }
    return false;
  }

  onClickTerritory(territory) {
    if (
      // If any of the following are true, interaction is not possible
      Boolean(!territory.id) ||
      this._tryingToCreateOrderImpossible(territory) ||
      this._tryingToSupportOrConvoySource(territory) ||
      this._tryingToMoveToSource(territory)
    ) {
      return;
    }
    const attr = this._getOrderAttrToUpdate();
    this.setGameForm({ ...this.gameForm, [attr]: territory.id });
  }

  getOptions() {
    return this.getOrderTypeChoices();
  }

  onOptionSelected(option) {
    // TODO namedCoasts, pieceTypes
    this.onOrderTypeSelected(option);
  }

  onOrderTypeSelected(type) {
    this.setGameForm({ ...this.gameForm, type });
  }

  userCanOrder(territory) {
    if (!this.userNation || !this.turn.currentTurn) return false;

    if (this.phase === Phases.ORDER) {
      return territory.piece && territory.piece.nation === this.userNation.id;
    }

    if (this.phase === Phases.RETREAT) {
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
    if (!this.source) return null;
    if (!this.source.piece) return null;
    const { type: territoryType } = this.source;
    if (this.phase === Phases.ORDER) {
      const options = [
        OrderTypeChoices[OrderTypes.HOLD],
        OrderTypeChoices[OrderTypes.MOVE],
        OrderTypeChoices[OrderTypes.SUPPORT],
      ];
      const { type: pieceType } = this.source.piece;
      if (pieceType === PieceTypes.FLEET && territoryType === 'sea') {
        options.push(OrderTypes.CONVOY);
      }
      return options;
    }
    if (this.phase === Phases.RETREAT) {
      const options = [
        OrderTypeChoices[OrderTypes.RETREAT],
        OrderTypeChoices[OrderTypes.DISBAND],
      ];
      return options;
    }
    // TODO logic for which build order is available
    return [
      OrderTypeChoices[OrderTypes.BUILD],
      OrderTypeChoices[OrderTypes.DISBAND],
    ];
  }

  getPieceTypeChoices() {
    if (this.source && this.phase === Phases.BUILD)
      return this.source.type === 'coastal'
        ? [PieceTypes.ARMY, PieceTypes.FLEET]
        : [PieceTypes.ARMY];
    return null;
  }

  getTerritoryOrderState(territoryId) {
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
    this.setGameForm(initialGameFormState);
  }

  _tryingToSupportOrConvoySource(territory) {
    const choosingAux =
      [OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(this.type) && !this.aux;
    return Boolean(choosingAux && this.source === territory);
  }

  _tryingToMoveToSource(territory) {
    const choosingTarget = this.type === OrderTypes.MOVE && !this.target;
    return Boolean(choosingTarget && this.source === territory);
  }

  _tryingToCreateOrderImpossible(territory) {
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
