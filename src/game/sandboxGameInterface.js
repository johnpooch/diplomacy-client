import { baseGameInterface, PieceTypes } from './base';

const ADD_ARMY_CHOICE = ['add_army', 'Add army'];
const ADD_FLEET_CHOICE = ['add_fleet', 'Add fleet'];
const REMOVE_PIECE_CHOICE = ['remove_piece', 'Remove piece'];
const CREATE_ORDER_CHOICE = ['create_order', 'Create order'];

export default class SandboxGameInterface extends baseGameInterface {
  userCanOrder() {
    return true;
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
    this.actions.addOrder({
      ...this.gameForm,
      nation: this.source.piece.nation,
    });
    this.reset();
  }
}
