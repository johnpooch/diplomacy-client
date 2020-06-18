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
  const { privateNationState } = props;
  let ordersRemainingMessage = null;
  let orderType = null;

  if (!privateNationState) {
    return null;
  }
  const {
    nation,
    num_orders_remaining: ordersRemaining,
    num_builds: numBuilds,
    num_disbands: numDisbands,
  } = privateNationState;

  // Format ordersRemainingMessage
  if (numBuilds) {
    orderType = ordersRemaining === 1 ? 'build' : 'builds';
    ordersRemainingMessage = `${ordersRemaining} ${orderType} to submit`;
  } else if (numDisbands) {
    orderType = ordersRemaining === 1 ? 'disband' : 'disbands';
    ordersRemainingMessage = `${ordersRemaining} ${orderType} to submit`;
  } else {
    orderType = ordersRemaining === 1 ? 'order' : 'orders';
    ordersRemainingMessage = `${ordersRemaining} ${orderType} to submit`;
  }

  return (
    <StyledDiv>
      <span className="playing-as">Playing as {nation.name}</span>
      <span className="orders-remaining">{ordersRemainingMessage}</span>
    </StyledDiv>
  );
};

export default PlayerStatus;
