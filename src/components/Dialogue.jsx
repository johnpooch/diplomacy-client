import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';

import useForm from '../hooks/useForm';
import Form from './Form';
import { BaseButton, Button } from './Button';
import { colors, fontSizes, sizes, spacing } from '../variables';

import OrderMessage from './OrderMessage';
import OrderSummary from './OrderSummary';
import OrderTypeSelector from './OrderTypeSelector';
import Select from './Select';
import TerritorySummary from './TerritorySummary';

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

const Dialogue = (props) => {
  const { gameInterface } = props;
  const { source } = gameInterface;
  if (!source) return null;

  const nations = gameInterface.getNationChoices();
  const actions = gameInterface.getActionChoices();

  const [values, handleChange] = useForm({
    action: actions[0][0],
    nation: nations[0][0],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    gameInterface.handleSubmit(values);
  };

  const renderActionForm = () => {
    if (gameInterface.action) return null;
    return (
      <Form onSubmit={onSubmit}>
        <Select
          name="action"
          label="Action"
          value={values.action}
          options={actions}
          onChange={handleChange}
          required
        />
        {!source.piece ? (
          <Select
            name="nation"
            label="Nation"
            value={values.nation}
            options={nations}
            onChange={handleChange}
            required
          />
        ) : null}
        <Button type="submit">Confirm</Button>
      </Form>
    );
  };

  const renderOrderConfirmation = () => {
    return (
      <div className="order-confirmation">
        <OrderSummary gameInterface={gameInterface} />
        <Button onClick={gameInterface.createOrder}>Confirm</Button>
      </div>
    );
  };

  const renderOrderActions = () => {
    /* Gets the appropriate sub component based on the state of the order. */
    const { action, type, target, piece_type: pieceType } = gameInterface;
    if (action !== 'create_order') return null;

    if (!type) {
      return (
        <OrderTypeSelector
          name="type"
          summary={source}
          choices={gameInterface.getOrderTypeChoices()}
          onClickChoice={gameInterface.clickOrderTypeChoice}
        />
      );
    }

    switch (type) {
      case 'build':
        if (!pieceType) {
          return <OrderTypeSelector name="piece_type" summary={source} />;
        }
        return renderOrderConfirmation();

      case 'hold':
        return renderOrderConfirmation(
          gameInterface,
          gameInterface.createOrder
        );

      default: {
        if (!target) {
          return <OrderMessage order={gameInterface} />;
        }
        return renderOrderConfirmation(
          gameInterface,
          gameInterface.createOrder
        );
      }
    }
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledCloseButton onClick={gameInterface.reset}>
          <FontAwesomeIcon icon={faTimes} />
        </StyledCloseButton>
        <TerritorySummary territory={source} />
        {renderActionForm()}
        {renderOrderActions()}
      </StyledDiv>
    </StyledWrapper>
  );
};

export default Dialogue;
