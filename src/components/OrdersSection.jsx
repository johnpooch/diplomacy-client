import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { gameActions } from '../store/games';
import { nationStateActions } from '../store/nationStates';
import { orderActions } from '../store/orders';
import { selectOrdersByTurn } from '../store/selectors';
import { getErrors } from '../utils';

import { Button } from './Button';
import ComponentError from './ComponentError';
import OrderItem from './OrderItem';
import Section from './Section';

const StyledOrders = styled.ul`
  .order {
    display: grid;
    gap: ${(p) => p.theme.space[1]};
    grid-template-columns: 20px auto 20px;
    align-items: center;
  }

  .disabled {
    color: gray;
  }
`;

const OrdersSection = ({
  turn,
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
                <OrderItem order={order} turn={turn} />
              </li>
            ))}
          </StyledOrders>
          <Button onClick={finalizeOrders} disabled={userNation.loading}>
            {ordersFinalized ? `Un-finalize orders` : 'Finalize orders'}
          </Button>
        </div>
      )}
    </Section>
  );
};

const mapStateToProps = (state, { turn }) => {
  const orders = selectOrdersByTurn(state, turn.id);
  const errors = getErrors(
    state.errors,
    orderActions.destroyOrder,
    orderActions.listOrders,
    nationStateActions.finalizeOrders
  );
  return { errors, orders };
};

const mapDispatchToProps = (dispatch, { game, userNation }) => {
  const finalizeOrders = () => {
    let urlParams = { nationStateId: userNation.id };
    dispatch(nationStateActions.finalizeOrders({ urlParams })).then(() => {
      urlParams = { gameSlug: game.slug };
      dispatch(gameActions.getGameDetail({ urlParams }));
    });
  };
  return { finalizeOrders };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersSection);
