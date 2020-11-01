import React from 'react';
import styled from '@emotion/styled';

import { variables } from '../variables';

const StyledForm = styled.form`
  input,
  select,
  textarea {
    margin: 0;
    border: 0;
    padding: 0;
    display: block;
    line-height: 1;
    background: ${variables.colors.offwhite};
    border: ${variables.sizes.border}px solid ${variables.colors.border};
    border-radius: ${variables.sizes.borderRadius[0]}px;
    padding: ${variables.spacing[2]}px;
    width: 100%;
    font-size: inherit;
    min-height: ${variables.sizes.input}px;

    &::placeholder {
      color: ${variables.colors.darkgray};
    }
  }

  button {
    width: 100%;
  }

  select {
    height: ${variables.sizes.input}px;
  }

  textarea {
    resize: vertical;
  }

  hr,
  label,
  p,
  .field-error,
  .non-field-errors {
    display: block;
    margin: ${variables.spacing[4]}px 0;
    text-align: left;
  }

  .field-error,
  .non-field-errors {
    color: ${variables.colors.error};
  }
`;

export const Form = (props) => {
  const { children, onSubmit } = props;
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

const StyledFormWrapper = styled.div`
  background: ${variables.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px;
  font-size: ${variables.fontSizes.sans[1]}px;
  max-width: 100%;
  min-width: 300px;
  padding: 0 ${variables.spacing[3]}px;
  border-radius: ${variables.sizes.borderRadius[2]}px;
`;

export const FormWrapper = (props) => {
  const { children } = props;
  return <StyledFormWrapper>{children}</StyledFormWrapper>;
};
