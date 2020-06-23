import { alertConstants } from '../actions/actionTypes';

function alerts(state = [], action) {
  const nextId = state.length !== 0 ? state[state.length - 1].id + 1 : 1;
  switch (action.type) {
    case alertConstants.ADD:
      return [
        ...state,
        {
          id: nextId,
          category: action.category,
          message: action.message,
          pending: action.pending === true,
        },
      ];
    case alertConstants.CLEAR:
      return state.filter((obj) => {
        return obj.id !== action.id;
      });
    case alertConstants.CLEAR_ACTIVE:
      return state.filter((obj) => {
        return obj.pending === true;
      });
    case alertConstants.CLEAR_ALL:
      return [];
    case alertConstants.PROMOTE_PENDING: {
      const newState = [];
      state.forEach((obj) => {
        const newObj = obj;
        newObj.pending = false;
        newState.push(newObj);
      });
      return newState;
    }
    default:
      return state;
  }
}
export default alerts;
