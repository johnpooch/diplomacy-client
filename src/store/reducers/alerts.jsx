import { alertConstants } from '../actions/actionTypes';

function alerts(state = [], action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return [
        ...state,
        {
          type: 'success',
          message: action.message,
        },
      ];
    case alertConstants.ERROR:
      return [
        ...state,
        {
          type: 'danger',
          message: action.message,
        },
      ];
    case alertConstants.CLEAR:
      return [];
    default:
      return state;
  }
}
export default alerts;
