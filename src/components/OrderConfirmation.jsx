import React from 'react';
import styled from '@emotion/styled';

import { Button, Grid, SecondaryButton } from '../styles';
import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: ${spacing[2]}px;
  left: ${spacing[2]}px;
  right: ${spacing[2]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledDiv = styled.div`
  background-color: white;
  color: ${colors.base};
  padding: ${spacing[4]}px;
  font-size: ${fontSizes.sans[2]}px;
  border: ${sizes.border}px solid ${colors.base};
  border-radius: ${sizes.borderRadius[1]}px;
  pointer-events: all;
  text-align: center;
  cursor: initial;
`;

const StyledGrid = styled(Grid)`
  margin-top: ${spacing[4]}px;
`;

const StyledP = styled.p`
  .aux,
  .piece,
  .source,
  .target {
    text-transform: capitalize;
    font-weight: bold;
  }

  .action {
    font-style: italic;
  }

  span:not(:last-of-type):after {
    content: ' ';
  }
`;

const renderOrderSummary = (props) => {
  const { _onClickCancel, _onClickConfirm, order } = props;
  const { aux, source, target, type } = order;

  let orderSummary = null;

  if (source.piece) {
    switch (type) {
      case 'hold':
        orderSummary = (
          <StyledP>
            <span className="piece">{source.piece.type}</span>
            in <span className="source">{source.territory.name}</span>
            to <span className="action">{type}</span>
          </StyledP>
        );
        break;

      case 'move':
        orderSummary = (
          <StyledP>
            <span className="piece">{source.piece.type}</span>
            in <span className="source">{source.territory.name}</span>
            to <span className="action">{type}</span>
            to <span className="target">{target.territory.name}</span>
          </StyledP>
        );
        break;

      case 'convoy':
      case 'support':
        if (source.piece.type === 'fleet' && aux.piece) {
          orderSummary = (
            <StyledP>
              <span className="piece">{source.piece.type}</span>
              in <span className="source">{source.territory.name}</span>
              to <span className="action">{type}</span>
              <span className="aux">{aux.territory.name}</span>
              to <span className="target">{target.territory.name}</span>
            </StyledP>
          );
        }
        break;

      default:
        break;
    }
  }

  if (!orderSummary) {
    return (
      <StyledDiv>
        <p>That order is not valid</p>
        <StyledGrid columns={1}>
          <Button onClick={_onClickCancel}>Go back</Button>
        </StyledGrid>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv>
      {orderSummary}
      <StyledGrid columns={2} columnGap={`${spacing[1]}px`}>
        <Button onClick={_onClickConfirm}>Confirm</Button>
        <SecondaryButton onClick={_onClickCancel}>Cancel</SecondaryButton>
      </StyledGrid>
    </StyledDiv>
  );
};

const OrderConfirmation = (props) => {
  return <StyledWrapper>{renderOrderSummary(props)}</StyledWrapper>;
};

export default OrderConfirmation;
