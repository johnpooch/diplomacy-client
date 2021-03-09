import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Button } from './Button';
import { getErrors } from '../utils';
import { variables } from '../variables';

import ComponentError from './ComponentError';
import NonFieldErrors from './NonFieldErrors';
import OrderItem from './OrderItem';
import Section from './Section';

import { nationStateActions } from '../store/nationStates';
import { orderActions } from '../store/orders';
import { selectOrdersByTurn } from '../store/selectors';

const OrdersSection = ({
  currentTurn,
  orderErrors,
  orders,
  finalizeOrders,
  userNation,
}) => {
  const { numOrders, ordersFinalized } = userNation;

  const StyledOrders = styled.ul`
    .order {
      display: grid;
      grid-gap: ${variables.spacing[1]}px;
      grid-template-columns: 20px auto 20px;
      align-items: center;
    }
    .disabled {
      color: gray;
    }
  `;

  if (Object.keys(orderErrors).length) {
    return <ComponentError error={orderErrors} />;
  }

  return (
    <Section className="orders" label="Orders">
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
      <NonFieldErrors errors={orderErrors.non_field_errors} />
      <Button onClick={finalizeOrders} disabled={userNation.loading}>
        {ordersFinalized ? `Un-finalize orders` : 'Finalize orders'}
      </Button>
    </Section>
  );
};

const mapStateToProps = (state, { currentTurn }) => {
  const orders = selectOrdersByTurn(state, currentTurn.id);
  const orderErrors = getErrors(
    state.errors,
    orderActions.destroyOrder,
    orderActions.listOrders,
    nationStateActions.finalizeOrders
  );
  return { orderErrors, orders };
};

const mapDispatchToProps = (dispatch, { userNation }) => {
  const finalizeOrders = () => {
    const urlParams = { nationStateId: userNation.id };
    dispatch(nationStateActions.finalizeOrders({ urlParams }));
  };
  return { finalizeOrders };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersSection);
