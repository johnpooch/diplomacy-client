import styled from '@emotion/styled';

import { colors, fontSizes, sizes, spacing } from './variables';

// Layout
export const PageWrapper = styled.div`
  padding: ${spacing[6]}px;
  max-width: ${sizes.maxWidth}px;
  margin: 0 auto;
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

// Buttons
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
  background-color: ${colors.base};
  border-radius: ${sizes.borderRadius[0]}px;
  padding: ${spacing[2]}px ${spacing[5]}px;

  &:hover {
    background-color: ${colors.darkgray};
    color: white;
  }
`;

export const SecondaryButton = styled(Button)`
  background: white;
  color: ${colors.base};
  border: ${sizes.border}px solid ${colors.base};

  &:hover {
    border-color: ${colors.darkgray};
    color: white;
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.base};
  background-color: white;
  border: ${sizes.border}px solid white;

  &:hover {
    color: white;
    background-color: ${colors.base};
  }
`;

// Forms
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
