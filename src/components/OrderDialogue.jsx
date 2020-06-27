import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';

import OrderMessage from './OrderMessage';
import OrderTypeSelector from './OrderTypeSelector';
import OrderSummary from './OrderSummary';
import TerritorySummary from './TerritorySummary';
import { Button, BaseButton } from '../styles';
import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: ${spacing[3] + sizes.statusBarHeight}px;
  left: ${spacing[3]}px;
  right: ${spacing[3]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledDiv = styled.div`
  position: relative;
  background: white;
  color: ${colors.base};
  padding: ${spacing[4]}px;
  font-size: ${fontSizes.sans[2]}px;
  border: ${sizes.border}px solid ${colors.base};
  border-radius: ${sizes.borderRadius[1]}px;
  pointer-events: all;
  text-align: center;
  cursor: initial;

  .territory-summary {
    margin: 0 ${sizes.input}px;
  }

  .order-confirmation {
    p,
    button {
      margin-top: ${spacing[3]}px;
    }
  }

  .order-actions {
    margin-top: ${spacing[3]}px;

    button {
      width: ${sizes.button}px;

      &:not(:last-of-type) {
        margin-right: ${spacing[2]}px;
      }
    }
  }
`;

const StyledCloseButton = styled(BaseButton)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${colors.darkgray};
  width: ${sizes.input}px;
  height: ${sizes.input}px;

  &:hover {
    color: ${darken(0.2, colors.darkgray)};
  }
`;

function renderOrderConfirmation(order, callback) {
  return (
    <div className="order-confirmation">
      <OrderSummary order={order} />
      <Button onClick={callback}>Confirm</Button>
    </div>
  );
}

// This function is exported for patching in test
export function renderOrderActions(props) {
  /* Gets the appropriate sub component based on the state of the order. */
  const {
    onClickConfirm,
    onClickCancelOrder,
    onClickOrderTypeChoice,
    onClickPieceTypeChoice,
    orderTypeChoices,
    pieceTypeChoices,
    order,
    existingOrder,
  } = props;
  const { type, source, target, piece_type: pieceType } = order;

  const cancelOrder = () => {
    const { id } = existingOrder;
    return onClickCancelOrder(id);
  };

  if (existingOrder) {
    const choices = ['cancel order'];
    return (
      <OrderTypeSelector
        summary={source}
        choices={choices}
        onClickChoice={cancelOrder}
      />
    );
  }

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
        <StyledCloseButton onClick={onClickCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledCloseButton>
        <div className="territory-summary">
          <TerritorySummary summary={source} />
        </div>
        <div className="order-actions">{renderOrderActions(props)}</div>
      </StyledDiv>
    </StyledWrapper>
  );
};

export default OrderDialogue;
