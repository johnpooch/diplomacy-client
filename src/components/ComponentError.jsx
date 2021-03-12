import React from 'react';
import styled from 'styled-components';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const message = error.non_field_errors;
  return (
    <StyledComponentError className="component-error" role="alert">
      <div className="icon">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </div>
      <div className="body">
        <div>{message}</div>
      </div>
    </StyledComponentError>
  );
};

export default ComponentError;
