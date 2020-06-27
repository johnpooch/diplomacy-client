import React from 'react';
import styled from '@emotion/styled';

import TurnStatus from './TurnStatus';
import { SecondaryButton } from '../styles';
import { colors, sizes, spacing } from '../variables';

const StyledFooter = styled.footer`
  color: white;
  background: ${colors.darkgray};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${sizes.statusBarHeight}px;

  .orders {
    text-align: right;

    button {
      margin-left: ${spacing[3]}px;
    }
  }
`;

const StyledDiv = styled.div`
  margin: 0 auto;
  padding: 0 ${spacing[6]}px;
  max-width: ${sizes.maxWidth}px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 100%;
`;

const StyledPlayingAs = styled.span`
  .name {
    border-bottom: ${sizes.border}px solid
      ${(props) => (props.color ? props.color : 'transparent')};
  }
`;

const StatusBar = (props) => {
  const { game, privateNationState, finalizeOrders, turn, _setTurn } = props;
  let ordersRemainingMessage = null;
  let orderType = null;

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
    const { id: gameId } = game;
    finalizeOrders(id, gameId);
  };

  const verb = ordersFinalized ? 'Un-finalize' : 'Finalize';

  const renderPlayingAs = () => {
    if (!privateNationState.id) {
      return (
        <div className="playing-as">
          You are not participating in this game.
        </div>
      );
    }

    return (
      <StyledPlayingAs className="playing-as" color={colors.nations[nation.id]}>
        Playing as <span className="name">{nation.name}</span>
      </StyledPlayingAs>
    );
  };

  const renderOrders = () => {
    if (!privateNationState.id) return '';
    return (
      <div className="orders">
        <span className="orders-remaining">{ordersRemainingMessage}</span>
        <SecondaryButton type="submit" onClick={onClickToggleFinalize}>
          {verb} orders
        </SecondaryButton>
      </div>
    );
  };

  return (
    <StyledFooter>
      <StyledDiv>
        {renderPlayingAs()}
        <TurnStatus
          turn={turn}
          _click={(turnId) => {
            _setTurn(turnId);
          }}
        />
        {renderOrders()}
      </StyledDiv>
    </StyledFooter>
  );
};

export default StatusBar;
