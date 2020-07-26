import React from 'react';
import styled from '@emotion/styled';

import { colors, spacing } from '../variables';

const StyledDiv = styled.nav`
  position: fixed;
  top: ${spacing[2]}px;
  left: 0;
  right: 0;

  span {
    grid-area: active;
    color: white;
    background: ${colors.base};
    padding: ${spacing[2]}px ${spacing[3]}px;
    min-width: 120px;
    text-align: center;
  }
`;

const PlayerStatus = (props) => {
  const { game, privateNationState, finalizeOrders } = props;
  let ordersRemainingMessage = null;
  let orderType = null;

  // If not playing
  if (Object.keys(privateNationState).length === 0) {
    return (
      <StyledDiv>
        <span className="playing-as">
          You are not participating in this game.
        </span>
      </StyledDiv>
    );
  }
  const {
    id,
    nation,
    num_orders_remaining: ordersRemaining,
    num_builds: numBuilds,
    num_disbands: numDisbands,
    orders_finalized: ordersFinalized,
  } = privateNationState;

  // Format ordersRemainingMessage
  if (ordersFinalized) {
    ordersRemainingMessage = 'Orders finalized';
  } else if (numBuilds) {
    orderType = ordersRemaining === 1 ? 'build' : 'builds';
    ordersRemainingMessage = `${ordersRemaining} ${orderType} to submit`;
  } else if (numDisbands) {
    orderType = ordersRemaining === 1 ? 'disband' : 'disbands';
    ordersRemainingMessage = `${ordersRemaining} ${orderType} to submit`;
  } else {
    orderType = ordersRemaining === 1 ? 'order' : 'orders';
    ordersRemainingMessage = `${ordersRemaining} ${orderType} to submit`;
  }

  const onClickToggleFinalize = () => {
    const { slug } = game;
    finalizeOrders(id, slug);
  };

  const verb = ordersFinalized ? 'Un-finalize' : 'Finalize';

  return (
    <StyledDiv>
      <span className="playing-as">Playing as {nation.name}</span>
      <span className="orders-remaining">{ordersRemainingMessage}</span>
      <button type="submit" onClick={onClickToggleFinalize}>
        {verb} orders
      </button>
    </StyledDiv>
  );
};

export default PlayerStatus;
