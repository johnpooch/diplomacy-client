import { orderActions } from '../orders';
import { turnActions } from '../turns';
import { getNextId } from '../utils';

const addOrder = ({ dispatch, getState }) => (next) => (action) => {
  /*
  When addOrder action is dispatched, get the next id of the new order to
  create a new order. If there in an existing order for the source piece,
  remove it. Ensure that the turn slice is also updated to include new order.
  */

  if (action.type === orderActions.addOrder.type) {
    const state = getState();
    const { source } = action.payload;
    const existingOrder = Object.values(state.entities.orders.entities).find(
      (o) => o.source === source
    );
    const id = getNextId(state.entities.orders);
    const orderData = { ...action.payload, id };
    dispatch(turnActions.addOrder({ id: 1, order: id }));
    if (existingOrder) {
      dispatch(orderActions.removeOrder(existingOrder.id));
      dispatch(turnActions.removeOrder({ id: 1, order: existingOrder.id }));
    }
    next(orderActions.addOrder(orderData));
  } else {
    next(action);
  }
};

export default [addOrder];
