import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const StyledComponentError = styled.div`
  color: ${(p) => p.theme.colors.status.error};

  svg {
    margin-bottom: ${(p) => p.theme.space[3]};
  }

  .icon {
    text-align: center;
  }
`;

const ComponentError = ({ error }) => {
  if (!error) return null;
  const theme = useTheme();
  const message = error.non_field_errors;
  return (
    <StyledComponentError className="component-error" role="alert">
      <div className="icon">
        <FontAwesomeIcon icon={theme.icons.warning} />
      </div>
      <div className="body">
        <div>{message}</div>
      </div>
    </StyledComponentError>
  );
};

export default ComponentError;
