import React from 'react';
import styled from '@emotion/styled';

import OrdersStatus from './OrdersStatus';
import PlayingAs from './PlayingAs';
import TurnStatus from './TurnStatus';
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
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .spinner {
      margin-right: ${spacing[3]}px;
    }

    button {
      margin-left: ${spacing[3]}px;
    }
  }
`;

const StyledDiv = styled.div`
  margin: 0 auto;
  padding: 0 ${spacing[6]}px;
  max-width: ${sizes.outerWidth}px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 100%;
`;

const StatusBar = (props) => {
  const { finalizeOrders, turn, _setTurn } = props;
  const { currentTurn, userNation } = turn;

  return (
    <StyledFooter>
      <StyledDiv>
        <PlayingAs userNation={userNation} />
        <TurnStatus
          turn={turn}
          _click={(turnId) => {
            _setTurn(turnId);
          }}
        />
        {currentTurn ? (
          <OrdersStatus
            finalizeOrders={finalizeOrders}
            userNation={userNation}
          />
        ) : null}
      </StyledDiv>
    </StyledFooter>
  );
};

export default StatusBar;
