/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { namedCoastSelectors } from '../store/namedCoasts';
import {
  selectPiecesByTurn,
  selectTerritoriesByTurn,
  selectUserNationByTurn,
} from '../store/selectors';
import { indexOn } from '../utils';

import Interpreter from './BaseInterpreter';
import BuildInterpreter from './BuildInterpreter';
import DisbandInterpreter from './DisbandInterpreter';
import DummyInterpreter from './DummyInterpreter';
import OrderInterpreter from './OrderInterpreter';
import RetreatInterpreter from './RetreatInterpreter';
import { Order, Phase } from './types';

export const getInterpreterClass = (
  phase: string,
  supplyDelta: number
):
  | typeof OrderInterpreter
  | typeof RetreatInterpreter
  | typeof DisbandInterpreter
  | typeof BuildInterpreter
  | null => {
  switch (phase) {
    case Phase.ORDER:
      return OrderInterpreter;
    case Phase.RETREAT:
      return RetreatInterpreter;
    default:
      if (supplyDelta < 0) {
        return DisbandInterpreter;
      }
      if (supplyDelta > 0) {
        return BuildInterpreter;
      }
      return null;
  }
};

export const initializeInterpreterFromState = (
  state: any,
  turn: { id: number; game: number; phase: Phase },
  order: Order,
  createOrder: () => void,
  setOrder: (order: Order) => void
): Interpreter | DummyInterpreter => {
  const pieces = selectPiecesByTurn(state, turn.id);
  const { variant } = state.entities.gameDetail;
  const territories = selectTerritoriesByTurn(state, turn.id);
  const namedCoasts = namedCoastSelectors.selectByVariantId(state, variant);
  const { nation, supplyDelta } = selectUserNationByTurn(state, turn.id);

  const InterpreterClass = getInterpreterClass(turn.phase, supplyDelta);
  if (!InterpreterClass) return new DummyInterpreter();

  return new InterpreterClass(
    order,
    nation,
    indexOn(territories, 'id'),
    pieces,
    indexOn(namedCoasts, 'id'),
    createOrder,
    setOrder
  );
};

export default getInterpreterClass;
