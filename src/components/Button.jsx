import styled from '@emotion/styled';

import { colors, fontSizes, sizes, spacing } from '../variables';

export const BaseButton = styled.button`
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  font-size: inherit;
  text-decoration: none;
  background: transparent;

  &[disabled] {
    opacity: 0.5;
    cursor: initial;
  }
`;

export const Button = styled(BaseButton)`
  background: ${colors.base};
  border-radius: ${sizes.borderRadius[0]}px;
  border: ${sizes.border}px solid ${colors.base};
  color: white;
  font-size: ${fontSizes.sans[2]}px;
  padding: ${spacing[1]}px ${spacing[3]}px;

  &:hover {
    background: ${colors.darkgray};
    color: white;
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${colors.white};
  color: ${colors.base};

  &:hover {
    background: ${colors.base};
    color: white;
  }
`;

export const TertiaryButton = styled(Button)`
  background: transparent;
  color: ${colors.darkgray};
  font-size: ${fontSizes.sans[2]}px;
  padding: 0;

  &:hover {
    background: transparent;
    color: ${colors.darkgray};
    text-decoration: underline;
  }
`;

export const IconButton = styled(SecondaryButton)`
  border-radius: 50%;
  font-size: inherit;
  min-width: ${sizes.input}px;
  height: ${sizes.input}px;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    opacity: 0;
    cursor: initial;
  }
`;
