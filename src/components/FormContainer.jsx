import React from 'react';
import styled from '@emotion/styled';

import Heading from './Heading';
import { colors, fontSizes } from '../variables';

const StyledMain = styled.main`
  background: ${colors.white};
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

  hr {
    margin-top: 1rem;
    border-color: #0000002b;
  }
  button {
    font-size: ${fontSizes.sans[3]}px;
    width: 100%;
  }
  label {
    text-align: left;
  }
  .forgot-password-paragraph {
    text-align: left;
  }
`;

const FormContainer = (props) => {
  const { children, headingText } = props;

  return (
    <StyledMain>
      {headingText ? <Heading text={headingText} /> : null}
      {children}
    </StyledMain>
  );
};

export default FormContainer;
