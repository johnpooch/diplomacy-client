import { gameActions } from '../games';
import { pieceActions } from '../pieces';
import { pieceStateActions } from '../pieceStates';
import { turnActions } from '../turns';
import { getNextId } from '../utils';

const addPiece = ({ dispatch, getState }) => (next) => (action) => {
  /*
  When addPiece action is dispatched, separate payload appropriately and
  dispatch actions.
  */

  if (action.type === pieceActions.addPiece.type) {
    const state = getState();
    const pieceId = getNextId(state.entities.pieces);
    const pieceStateId = getNextId(state.entities.pieceStates);
    const { payload } = action;
    const {
      attacker_territory,
      dislodged,
      dislodged_by,
      must_retreat,
      named_coast,
      nation,
      territory,
      type,
    } = payload;
    const pieceData = { id: pieceId, nation, type };
    const pieceStateData = {
      attacker_territory,
      dislodged,
      dislodged_by,
      must_retreat,
      named_coast,
      id: pieceStateId,
      piece: pieceId,
      territory,
    };
    dispatch(gameActions.addPiece({ id: 'SANDBOX', piece: pieceId }));
    dispatch(turnActions.addPieceState({ id: 1, pieceState: pieceStateId }));
    dispatch(pieceStateActions.addPieceState(pieceStateData));
    next(pieceActions.addPiece(pieceData));
  } else {
    next(action);
  }
};

const removePiece = ({ dispatch, getState }) => (next) => (action) => {
  /*
  When removePiece action is dispatched, remove piece state and remove piece
  from game.
  */

  if (action.type === pieceActions.removePiece.type) {
    const { payload: id } = action;
    const state = getState();
    const pieceState = Object.values(state.entities.pieceStates.entities).find(
      (ps) => ps.piece === id
    ).id;
    dispatch(gameActions.removePiece({ id: 'SANDBOX', piece: id }));
    dispatch(turnActions.removePieceState({ id: 1, pieceState }));
    dispatch(pieceStateActions.removePieceState(pieceState));
    next(action);
  } else {
    next(action);
  }
};

export default [addPiece, removePiece];
