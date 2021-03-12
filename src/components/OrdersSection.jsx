import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Button } from './Button';
import { getErrors } from '../utils';

import ComponentError from './ComponentError';
import OrderItem from './OrderItem';
import Section from './Section';

import { nationStateActions } from '../store/nationStates';
import { orderActions } from '../store/orders';
import { selectOrdersByTurn } from '../store/selectors';

const StyledOrders = styled.ul`
  .order {
    display: grid;
    grid-gap: ${(p) => p.theme.space[1]};
    grid-template-columns: 20px auto 20px;
    align-items: center;
  }

  .disabled {
    color: gray;
  }
`;

const OrdersSection = ({
  currentTurn,
  errors,
  finalizeOrders,
  orders,
  userNation,
}) => {
  const { numOrders, ordersFinalized } = userNation;

  return (
    <Section className="orders" label="Orders">
      {Object.keys(errors).length ? (
        <ComponentError error={errors} />
      ) : (
        <div>
          <span className="count">
            {orders.length} / {numOrders}
          </span>
          <StyledOrders>
            {orders.map((order) => (
              <li key={order.id}>
                <OrderItem order={order} currentTurn={currentTurn} />
              </li>
            ))}
          </StyledOrders>
          <Button onClick={finalizeOrders} disabled={userNation.loading}>
            {ordersFinalized ? `Edit orders` : 'Lock in orders'}
          </Button>
        </div>
      )}
    </Section>
  );
};

const mapStateToProps = (state, { currentTurn }) => {
  const orders = selectOrdersByTurn(state, currentTurn.id);
  const errors = getErrors(
    state.errors,
    orderActions.destroyOrder,
    orderActions.listOrders,
    nationStateActions.finalizeOrders
  );
  return { errors, orders };
};

const mapDispatchToProps = (dispatch, { userNation }) => {
  const finalizeOrders = () => {
    const urlParams = { nationStateId: userNation.id };
    dispatch(nationStateActions.finalizeOrders({ urlParams }));
  };
  return { finalizeOrders };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersSection);
