import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BaseButton } from './Button';

const StyledAlert = styled.div`
  align-items: center;
  background: ${(p) => p.theme.colors.status[p.category].muted};
  border-bottom: ${(p) => p.theme.borders[0]};
  border-color: ${(p) => p.theme.colors.status[p.category].primary};
  color: ${(p) => p.theme.colors.status[p.category].primary};
  display: grid;
  font-size: ${(p) => p.theme.fontSizes[2]};
  grid-column-gap: ${(p) => p.theme.space[4]};
  grid-template-columns: 1fr auto;

  p {
    padding: ${(p) => p.theme.space[2]};
  }

  button {
    color: ${(p) => p.theme.colors.status[p.category].primary};
    min-width: ${(p) => p.theme.sizes.inputMinSize};
    min-height: ${(p) => p.theme.sizes.inputMinSize};
    border-radius: 0;

    &:hover {
      background: ${(p) => p.theme.colors.status[p.category].primary};
      color: ${(p) => p.theme.colors.status[p.category].muted};
    }
  }
`;

export const Alert = (props) => {
  const { text, category, id, onClick } = props;
  const theme = useTheme();
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
        <FontAwesomeIcon icon={theme.icons.cancel} />
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
