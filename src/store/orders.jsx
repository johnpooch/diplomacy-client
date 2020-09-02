export const ORDERS_RECEIVED = 'ORDERS_RECEIVED';
export const CREATE_ORDER = 'CREATE_ORDER';

export const ordersReceived = (payload) => ({
  type: ORDERS_RECEIVED,
  payload,
});

export const createOrder = (orderId) => ({
  type: CREATE_ORDER,
  payload: orderId,
});

const initialState = {
  data: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_RECEIVED: {
      const { payload } = action;
      if (!payload) return initialState;
      const data = Object.values(payload);
      return { data };
    }
    default:
      return state;
  }
};

export default ordersReducer;
