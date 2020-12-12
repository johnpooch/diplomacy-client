import { baseGameInterface, PieceTypes } from './base';

export const ActionTypes = {
  ADD_ARMY: 'add_army',
  ADD_FLEET: 'add_fleet',
  REMOVE_PIECE: 'remove_piece',
  CREATE_ORDER: 'create_order',
};

const ActionTypeChoices = {
  [ActionTypes.ADD_ARMY]: [ActionTypes.ADD_ARMY, 'Add Army'],
  [ActionTypes.ADD_FLEET]: [ActionTypes.ADD_FLEET, 'Add Fleet'],
  [ActionTypes.REMOVE_PIECE]: [ActionTypes.REMOVE_PIECE, 'Remove Piece'],
  [ActionTypes.CREATE_ORDER]: [ActionTypes.CREATE_ORDER, 'Create Order'],
};

export default class SandboxGameInterface extends baseGameInterface {
  userCanOrder() {
    return true;
  }

  showContextMenu() {
    // TODO clean up logic
    if (
      [ActionTypes.ADD_FLEET, ActionTypes.ADD_ARMY].includes(this.action) &&
      this.nation
    )
      return false;
    if (this.action === ActionTypes.CREATE_ORDER && this.type) {
      return false;
    }
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
      this.onActionTypeSelected(option);
    }
    if ([ActionTypes.ADD_FLEET, ActionTypes.ADD_ARMY].includes(this.action)) {
      if (!this.nation) {
        this.onNationSelected(option);
      }
    }
    if (this.action === ActionTypes.CREATE_ORDER) {
      this.onOrderTypeSelected(option);
    }
  }

  submitForm() {
    // TODO merge these
    if (this.action === ActionTypes.ADD_ARMY) {
      this.callbacks.addPiece(this.source.id, PieceTypes.ARMY, this.nation);
    }
    if (this.action === ActionTypes.ADD_FLEET) {
      this.callbacks.addPiece(this.source.id, PieceTypes.FLEET, this.nation);
    }
    if (this.action === ActionTypes.REMOVE_PIECE) {
      this.callbacks.removePiece(this.source.piece.id);
    }
    if (this.action === ActionTypes.CREATE_ORDER) {
      console.log('Created Order');
      console.log(this.gameForm);
      delete this.gameForm.action;
      this.callbacks.addOrder({
        ...this.gameForm,
        nation: this.source.piece.nation,
      });
    }
  }

  // TODO these methods can be merged
  onActionTypeSelected(action) {
    this.setGameForm({ ...this.gameForm, action });
  }

  onNationSelected(nation) {
    this.setGameForm({ ...this.gameForm, nation });
  }

  getOptions() {
    if (!this.action) {
      return this.getActionChoices();
    }
    if ([ActionTypes.ADD_FLEET, ActionTypes.ADD_ARMY].includes(this.action)) {
      return this.nations;
    }
    if (this.action === ActionTypes.CREATE_ORDER) {
      return this.getOrderTypeChoices();
    }
    return null;
  }

  getActionChoices() {
    /*
    Get a choice for each action that is available to the territory.
    */
    if (this.source.piece) {
      return [
        ActionTypeChoices[ActionTypes.CREATE_ORDER],
        ActionTypeChoices[ActionTypes.REMOVE_PIECE],
      ];
    }
    if (this.source.type === 'sea') {
      return [ActionTypeChoices[ActionTypes.ADD_FLEET]];
    }
    if (this.source.type === 'inland') {
      return [ActionTypeChoices[ActionTypes.ADD_ARMY]];
    }
    return [
      ActionTypeChoices[ActionTypes.ADD_ARMY],
      ActionTypeChoices[ActionTypes.ADD_FLEET],
    ];
  }

  createOrder() {
    this.callbacks.addOrder({
      ...this.gameForm,
      nation: this.source.piece.nation,
    });
    this.reset();
  }

  formIsReady() {
    if ([ActionTypes.ADD_FLEET, ActionTypes.ADD_ARMY].includes(this.action)) {
      return Boolean(this.nation);
    }
    if (ActionTypes.REMOVE_PIECE === this.action) return true;
    return this.orderIsReady();
  }
}
