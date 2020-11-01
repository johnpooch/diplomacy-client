import React from 'react';
import styled from '@emotion/styled';

import { variables } from '../variables';

const StyledForm = styled.form`
  display: block;

  input,
  select,
  textarea {
    border-radius: ${variables.sizes.borderRadius[0]}px;
    border: ${variables.sizes.border}px solid ${variables.colors.darkgray};
    display: block;
    font-family: ${variables.fontFamilies.sans};
    font-size: inherit;
    line-height: 1;
    margin: 0;
    width: 100%;
  }

  input,
  textarea {
    min-height: ${variables.sizes.input}px;
    padding: ${variables.spacing[2]}px;

    &::placeholder {
      color: ${variables.colors.darkgray};
    }
  }

  select {
    height: ${variables.sizes.input}px;
    padding: 0 ${variables.spacing[2]}px;
  }

  button {
    width: 100%;
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

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const Form = (props) => {
  const { children, onSubmit } = props;
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

const StyledFormWrapper = styled.div`
  background: ${variables.colors.white};
  border-radius: ${variables.sizes.borderRadius[2]}px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px;
  font-size: ${variables.fontSizes.sans[1]}px;
  max-width: 100%;
  width: 350px;
  padding: ${variables.spacing[4]}px;
`;

export const FormWrapper = (props) => {
  const { children } = props;
  return <StyledFormWrapper>{children}</StyledFormWrapper>;
};

export const FormLabel = styled.span`
  display: block;
  font-size: ${variables.fontSizes.sans[1]}px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: ${variables.spacing[2]}px;
  color: ${variables.colors.base};
`;
