const ALERTS_ADD = 'ALERTS_ADD';
const ALERTS_CLEAR = 'ALERTS_CLEAR';
const ALERTS_CLEAR_ACTIVE = 'ALERTS_CLEAR_ACTIVE';
const ALERTS_CLEAR_ALL = 'ALERTS_CLEAR_ALL';
const ALERTS_PROMOTE_PENDING = 'ALERTS_PROMOTE_PENDING';

// Action creators
export const alertsAdd = (payload) => ({
  type: ALERTS_ADD,
  payload,
});

export const alertsClear = (id) => ({
  type: ALERTS_CLEAR,
  payload: { id },
});

export const alertsClearActive = (id) => ({
  type: ALERTS_CLEAR_ACTIVE,
  payload: { id },
});

export const alertsClearAll = () => ({
  type: ALERTS_CLEAR_ALL,
});

export const alertsPromotePending = () => ({
  type: ALERTS_PROMOTE_PENDING,
});

// Reducer
const alerts = (state = [], action) => {
  const nextId = state.length !== 0 ? state[state.length - 1].id + 1 : 1;

  switch (action.type) {
    case ALERTS_ADD: {
      const { payload } = action;
      const { message, category, pending } = payload;
      return [...state, { message, category, pending, id: nextId }];
    }
    case ALERTS_CLEAR: {
      const { payload } = action;
      const { id } = payload;
      return state.filter((alert) => {
        return alert.id !== id;
      });
    }
    case ALERTS_CLEAR_ACTIVE:
      return state.filter((alert) => {
        return alert.pending === true;
      });
    case ALERTS_CLEAR_ALL:
      return [];
    case ALERTS_PROMOTE_PENDING: {
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
};

export default alerts;
