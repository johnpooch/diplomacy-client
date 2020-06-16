import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Button, IconButton } from '../styles';
import { colors, fontSizes, sizes, spacing } from '../variables';

import OrderConfirmation from './OrderConfirmation';
import OrderMessage from './OrderMessage';
import OrderSelector from './OrderSelector';
import OrderSummary from './OrderSummary';

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

const OrderDialogue = (props) => {
  const {
    onClickCancel,
    onClickOrderTypeChoice,
    onClickConfirm,
    orderTypeChoices,
    order,
  } = props;
  const { type, source, aux, target } = order;

  const renderOrderSelector = () => {
    if (type || !source) {
      return null;
    }
    return (
      <OrderSelector
        summary={source}
        choices={orderTypeChoices}
        onClickChoice={onClickOrderTypeChoice}
      />
    );
  };

  const renderOrderConfirmation = () => {
    return (
      <div>
        <OrderSummary order={order} />
        <Button onClick={onClickConfirm}>Confirm</Button>
      </div>
    );
  };

  const renderOrderMessage = () => {
    switch (type) {
      case 'hold':
        return renderOrderConfirmation();

      case 'move':
        if (!target) {
          return <OrderMessage text="Select a territory to move into" />;
        }
        return renderOrderConfirmation();

      case 'support':
        if (!aux) {
          return <OrderMessage text="Select a territory to support from" />;
        }
        if (!target) {
          return <OrderMessage text="Select a territory to support into" />;
        }
        return renderOrderConfirmation();

      case 'convoy':
        if (!aux) {
          return <OrderMessage text="Select a territory to convoy from" />;
        }
        if (!target) {
          return <OrderMessage text="Select a territory to convoy into" />;
        }
        return renderOrderConfirmation();

      default:
        return null;
    }
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledIconButton onClick={onClickCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledIconButton>
        {renderOrderSelector()}
        {renderOrderMessage()}
      </StyledDiv>
    </StyledWrapper>
  );
};

export default OrderDialogue;
