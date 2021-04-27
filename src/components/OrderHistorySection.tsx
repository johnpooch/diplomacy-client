import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { nationStateSelectors } from '../store/nationStates';
import { selectOrdersByTurn } from '../store/selectors';
import { NationState, Order, Turn } from '../types';
import { groupBy } from '../utils';

import Flag from './Flag';
import OrderHistoryItem from './OrderHistoryItem';
import Section from './Section';

interface OrderHistorySection {
  nationStates: NationState[];
  ordersByNation: { [key: string]: Order[] };
  turn: Turn;
}

const StyledOrderHistorySection = styled.ul`
  .order > div {
    display: grid;
    grid-gap: ${(p) => p.theme.space[1]};
    grid-template-columns: 20px auto;
    align-items: center;
  }
`;

const NationOrders = ({ nation, orders, turn }) => {
  return (
    <>
      <Flag nation={nation} size={0} />
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="order">
            <OrderHistoryItem order={order} turn={turn} />
          </li>
        ))}
      </ul>
    </>
  );
};

const OrderHistorySection = ({
  nationStates,
  ordersByNation,
  turn,
}: OrderHistorySection) => {
  const nationOrders = Object.entries(ordersByNation).map(
    ([nationId, orders]) => (
      <li key={nationId}>
        <NationOrders
          nation={nationStates.find((ns) => ns.nation === nationId)}
          orders={orders}
          turn={turn}
        />
      </li>
    )
  );

  return (
    <Section className="orders" label="Orders">
      <StyledOrderHistorySection>{nationOrders}</StyledOrderHistorySection>
    </Section>
  );
};

const mapState = (state, { turn }) => {
  const orders = selectOrdersByTurn(state, turn.id);
  const ordersByNation = groupBy(orders, 'nation');
  const nationStates = nationStateSelectors.selectByTurnId(state, turn.id);
  return { nationStates, ordersByNation };
};

export default connect(mapState, null)(OrderHistorySection);
