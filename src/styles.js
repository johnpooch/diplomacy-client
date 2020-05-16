import styled from '@emotion/styled';

import { colors, fontSizes, sizes, spacing } from './variables';

export const PageWrapper = styled.div`
  padding: ${spacing[6]}px;
  max-width: ${sizes.maxWidth}px;
  margin: 0 auto;
`;

export const BaseButton = styled.button`
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  font-size: inherit;
  text-decoration: none;
  background-color: transparent;
`;

export const Button = styled(BaseButton)`
  color: white;
  background-color: ${colors.darkgray};
  border-radius: ${sizes.borderRadius[0]}px;
  padding: ${spacing[2]}px ${spacing[5]}px;

  &:hover {
    background-color: ${colors.base};
    color: white;
  }
`;

export const SecondaryButton = styled(Button)`
  background: white;
  color: ${colors.darkgray};
  border: ${sizes.border}px solid ${colors.darkgray};

  &:hover {
    border-color: ${colors.base};
  }
`;

export const TertiaryButton = styled(Button)`
  background: transparent;
  color: ${colors.darkgray};
  padding: 0;
  font-size: ${fontSizes.sans[1]}px;

  &:hover {
    background-color: transparent;
    color: ${colors.darkgray};
    text-decoration: underline;
  }
`;

export const IconButton = styled(BaseButton)`
  font-size: inherit;
  width: ${sizes.input}px;
  height: ${sizes.input}px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columns ? `repeat(${props.columns}, 1fr)` : 'auto'};
  grid-column-gap: ${spacing[4]}px;
  grid-row-gap: ${spacing[4]}px;

  label,
  input {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const GridTemplate = styled(Grid)`
  grid-template-columns: ${(props) =>
    props.templateColumns ? props.templateColumns : 'auto'};
`;

export const GenericForm = styled.form`
  font-size: ${fontSizes.sans[2]}px;

  input,
  select,
  textarea {
    margin: 0;
    border: 0;
    padding: 0;
    display: block;
    line-height: 1;
    border: ${sizes.border}px solid ${colors.base};
    border-radius: ${sizes.borderRadius[0]}px;
    padding: ${spacing[2]}px;
    width: 100%;
    font-size: inherit;
    min-height: ${sizes.input}px;

    &::placeholder {
      color: ${colors.darkgray};
    }
  }

  select {
    height: ${sizes.input}px;
  }

  textarea {
    resize: vertical;
  }

  label,
  p {
    display: block;
    margin: ${spacing[4]}px 0;
  }
`;

export const FormLabelText = styled.span`
  display: block;
  font-size: ${fontSizes.sans[1]}px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: ${spacing[2]}px;
  color: ${colors.base};
`;

export const Alert = styled.div`
  color: white;
  border-radius: 10px;
  position: absolute;
  top: 50px;
  right: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  z-index: 1111;

  p {
    margin: 0;
  }
  .alert-error {
    background: lightcoral;
  }
  .alert-success {
    background: lightgreen;
  }
  .close {
    color: white;
    cursor: pointer;
    margin-right: 10px;
  }
`;
