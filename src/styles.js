import styled from '@emotion/styled';

import { colors, fontSizes, sizes, spacing } from './variables';

export const Button = styled.button`
  cursor: pointer;
  color: white;
  background-color: ${colors.darkgray};
  border-radius: ${sizes.borderRadius[0]}px;
  border: none;
  outline: 0;
  margin: 0;
  padding: ${spacing[2]}px ${spacing[5]}px;
  font-size: inherit;
  text-decoration: none;

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
`;

export const PageWrapper = styled.div`
  padding: ${spacing[4]}px;
`;

export const FormLabel = styled.span`
  display: block;
  font-size: ${fontSizes.sans[1]}px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: ${spacing[1]}px;
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
    border: ${sizes.border}px solid ${colors.darkgray};
    border-radius: ${sizes.borderRadius[0]}px;
    padding: ${spacing[1]}px ${spacing[2]}px;
    width: 100%;
    font-size: inherit;

    &::placeholder {
      color: ${colors.darkgray};
    }
  }

  label,
  p {
    display: block;

    &:not(:first-child) {
      margin-top: ${spacing[4]}px;
    }

    &:not(:last-child) {
      margin-bottom: ${spacing[4]}px;
    }
  }
`;
