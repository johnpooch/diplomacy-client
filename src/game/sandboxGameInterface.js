import { baseGameInterface, PieceTypes } from './base';

export const ActionTypes = {
  ADD_ARMY: 'add_army',
  ADD_FLEET: 'add_army',
  REMOVE_PIECE: 'remove_piece',
  CREATE_ORDER: 'create_order',
};

const ActionTypeChoices = {
  [ActionTypes.ADD_ARMY]: [ActionTypes.ADD_ARMY, 'Add Army'],
  [ActionTypes.ADD_FLEET]: [ActionTypes.ADD_FLEET, 'Add Fleet'],
  [ActionTypes.REMOVE_PIECE]: [ActionTypes.REMOVE_PIECE, 'Remove Piece'],
  [ActionTypes.CREATE_ORDER]: [ActionTypes.CREATE_ORDER, 'Create Order'],
};

const ADD_ARMY_CHOICE = ['add_army', 'Add army'];
const ADD_FLEET_CHOICE = ['add_fleet', 'Add fleet'];
const REMOVE_PIECE_CHOICE = ['remove_piece', 'Remove piece'];
const CREATE_ORDER_CHOICE = ['create_order', 'Create order'];

export default class SandboxGameInterface extends baseGameInterface {
  userCanOrder() {
    return true;
  }

  showContextMenu() {
    // User first clicks a territory
    if (this.source && !this.action) {
      return true;
    }
    if (this.source && !this.type) {
      return true;
    }
    // TODO NamedCoasts, Build
    return false;
  }

  onOptionSelected(option) {
    if (!this.action) {
      console.log(`Setting action to ${option}`);
      this.onActionTypeSelected(option);
    }
  }

  onActionTypeSelected(action) {
    this.setGameForm({ ...this.gameForm, action });
  }

  getOptions() {
    if (!this.action) {
      return this.getActionChoices();
    }
    if ([ActionTypes.ADD_FLEET, ActionTypes.ADD_ARMY].includes(this.action)) {
      return this.nations;
    }
    return [];
  }

  handleSubmit({ action, nation }) {
    if (action === CREATE_ORDER_CHOICE[0]) {
      return this.setGameForm({
        ...this.gameForm,
        action: CREATE_ORDER_CHOICE[0],
      });
    }
    if (action === ADD_ARMY_CHOICE[0]) {
      this.actions.addPiece(this.source.id, PieceTypes.ARMY, nation);
    }
    if (action === ADD_FLEET_CHOICE[0]) {
      this.actions.addPiece(this.source.id, PieceTypes.FLEET, nation);
    }
    if (action === REMOVE_PIECE_CHOICE[0]) {
      this.actions.removePiece(this.source.piece.id);
    }
    return this.reset();
  }

  getActionChoices() {
    /*
    Get a choice for each action that is available to the territory.
    */
    if (this.source.piece) {
      return [CREATE_ORDER_CHOICE, REMOVE_PIECE_CHOICE];
    }
    if (this.source.type === 'sea') return [ADD_FLEET_CHOICE];
    if (this.source.type === 'inland') return [ADD_ARMY_CHOICE];
    return [ADD_ARMY_CHOICE, ADD_FLEET_CHOICE];
  }

  createOrder() {
    // TODO remove
    console.log('Created Order');
    console.log(this.gameForm);
    this.actions.addOrder({
      ...this.gameForm,
      nation: this.source.piece.nation,
    });
    this.reset();
  }
}
