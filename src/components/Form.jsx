import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: grid;
  grid-row-gap: ${(p) => p.theme.space[4]};

  input,
  select,
  textarea {
    background: ${(p) => p.theme.colors.muted};
    border-radius: ${(p) => p.theme.radii[0]};
    border: ${(p) =>
      `${p.theme.borderWidths[0]} solid ${p.theme.colors.secondary}`};
    display: block;
    font-family: ${(p) => p.theme.fonts.sans};
    font-size: inherit;
    line-height: 1;
    margin: 0;
    width: 100%;
  }

  input,
  textarea {
    min-height: ${(p) => p.theme.sizes.inputMinSize};
    padding: ${(p) => p.theme.space[2]};

    &::placeholder {
      color: ${(p) => p.theme.colors.secondary};
    }
  }

  select {
    min-height: ${(p) => p.theme.sizes.inputMinSize};
    padding: 0 ${(p) => p.theme.space[2]};
  }

  button {
    width: 100%;
  }

  textarea {
    resize: vertical;
  }

  label,
  p,
  .field-error,
  .non-field-errors {
    text-align: left;
  }

  hr {
    width: 100%;
    border: none;
    border-top: ${(p) => p.theme.borders[0]};
    margin: 0;
  }

  .field-error,
  .non-field-errors {
    color: ${(p) => p.theme.colors.status.error.text};
  }
`;

const StyledFormWrapper = styled.div`
  background: ${(p) => p.theme.colors.muted};
  border-radius: ${(p) => p.theme.radii[2]};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px;
  font-size: ${(p) => p.theme.fontSizes[1]};
  max-width: 100%;
  width: 350px;
  padding: ${(p) => p.theme.space[4]};
`;

export const FormWrapper = (props) => {
  const { children } = props;
  return <StyledFormWrapper>{children}</StyledFormWrapper>;
};

export const LabelText = styled.span`
  display: block;
  font-size: ${(p) => p.theme.fontSizes[1]};
  line-height: 1;
  font-weight: bold;
  margin-bottom: ${(p) => p.theme.space[2]};
  color: ${(p) => p.theme.colors.text};
`;

const Form = (props) => {
  const { children, onSubmit } = props;
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default Form;
