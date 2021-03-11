import React from 'react';
import styled from '@emotion/styled';
import { darken, lighten } from 'polished';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BaseButton } from './Button';
import { colors, sizes, spacing, fontSizes } from '../variables';

const StyledAlert = styled.div`
  align-items: center;
  background: ${(props) => lighten(0.4, colors[props.category])};
  border-top: ${sizes.border}px solid
    ${(props) => lighten(0.2, colors[props.category])};
  color: ${(props) => colors[props.category]};
  display: grid;
  font-size: ${fontSizes.sans[2]}px;
  grid-column-gap: ${spacing[4]}px;
  grid-template-columns: 1fr auto;

  p {
    padding: ${spacing[2]}px;
  }

  button {
    color: ${(props) => colors[props.category]};
    min-width: ${sizes.input}px;
    height: ${sizes.input}px;

    &:hover {
      color: ${(props) => darken(0.2, colors[props.category])};
    }
  }
`;

export const Alert = (props) => {
  const { text, category, id, onClick } = props;
  if (!text) return null;
  return (
    <StyledAlert category={category}>
      <p role="alert">{text}</p>
      <BaseButton
        type="button"
        title="Close alert"
        onClick={() => {
          onClick(id);
        }}
        category={category}
      >
        <FontAwesomeIcon icon={faTimes} />
      </BaseButton>
    </StyledAlert>
  );
};

const StyledAlerts = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 2;
`;

const Alerts = (props) => {
  const { alerts, onClick } = props;
  if (!alerts || !alerts.length) return null;
  const elements = alerts.map((alert) => {
    return alert.pending !== true ? (
      <Alert
        key={alert.id}
        id={alert.id}
        text={alert.message}
        category={alert.category}
        onClick={onClick}
      />
    ) : null;
  });
  return <StyledAlerts>{elements}</StyledAlerts>;
};

export default Alerts;
