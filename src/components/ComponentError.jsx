import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from '@emotion/styled';

import { variables } from '../variables';

const StyledComponentError = styled.div`
  color: ${variables.colors.error};
  svg {
    margin-bottom: 1rem;
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
