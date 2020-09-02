import { CREATE_ORDER } from '../orders';
import { apiRequest } from '../api';

export const createOrder = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === CREATE_ORDER) {
    // onSuccess - getOrders(gameId)
    const apiAction = apiRequest('GET', 'url', null, null);
    dispatch(apiRequest(apiAction));
  }
};

export const orderMiddleware = [createOrder];
