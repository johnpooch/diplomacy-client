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
`;

const ComponentError = ({ error }) => {
  if (!error) return null;
  const message = error.non_field_errors;
  return (
    <StyledComponentError className="component-error" role="alert">
      <div className="body">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div>{message}</div>
      </div>
    </StyledComponentError>
  );
};

export default ComponentError;
