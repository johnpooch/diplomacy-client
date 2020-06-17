import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Button, IconButton } from '../styles';
import { colors, fontSizes, sizes, spacing } from '../variables';

import OrderMessage from './OrderMessage';
import OrderTypeSelector from './OrderTypeSelector';
import OrderSummary from './OrderSummary';
import TerritorySummary from './TerritorySummary';

const StyledIconButton = styled(IconButton)`
  float: right;
`;

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

function renderOrderConfirmation(order, callback) {
  return (
    <div>
      <OrderSummary order={order} />
      <Button onClick={callback}>Confirm</Button>
    </div>
  );
}

// This function is exported for patching in test
export function renderSubComponent(props) {
  /* Gets the appropriate sub component based on the state of the order. */
  const {
    onClickConfirm,
    onClickOrderTypeChoice,
    onClickPieceTypeChoice,
    orderTypeChoices,
    pieceTypeChoices,
    order,
  } = props;
  const { type, source, target, piece_type: pieceType } = order;

  if (!type) {
    return (
      <OrderTypeSelector
        summary={source}
        choices={orderTypeChoices}
        onClickChoice={onClickOrderTypeChoice}
      />
    );
  }

  switch (type) {
    case 'build':
      if (!pieceType) {
        return (
          <OrderTypeSelector
            summary={source}
            choices={pieceTypeChoices}
            onClickChoice={onClickPieceTypeChoice}
          />
        );
      }
      return renderOrderConfirmation(order, onClickConfirm);

    case 'hold':
      return renderOrderConfirmation(order, onClickConfirm);

    default:
      if (!target) return <OrderMessage order={order} />;
      return renderOrderConfirmation(order, onClickConfirm);
  }
}

const OrderDialogue = (props) => {
  const { order, onClickCancel } = props;
  const { source } = order;

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledIconButton onClick={onClickCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledIconButton>
        <TerritorySummary summary={source} />
        {renderSubComponent(props)}
      </StyledDiv>
    </StyledWrapper>
  );
};

export default OrderDialogue;
