import { alertConstants } from '../actions/actionTypes';

function alerts(state = [], action) {
  const nextId = state.length !== 0 ? state[state.length - 1].id + 1 : 1;
  switch (action.type) {
    case alertConstants.SUCCESS:
      return [
        ...state,
        {
          id: nextId,
          type: 'success',
          message: action.message,
        },
      ];
    case alertConstants.ERROR:
      return [
        ...state,
        {
          id: nextId,
          type: 'danger',
          message: action.message,
        },
      ];
    case alertConstants.CLEAR:
      return state.filter((obj) => {
        return obj.id !== action.id;
      });
    case alertConstants.CLEAR_ALL:
      return [];
    default:
      return state;
  }
}
export default alerts;
