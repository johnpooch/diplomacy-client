import React from 'react';
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
  color: white;
  background: ${colors.base};
  border-radius: ${sizes.borderRadius[0]}px;
  padding: ${spacing[2]}px ${spacing[5]}px;

  &:hover {
    background: ${colors.darkgray};
    color: white;
  }
`;

export const SecondaryButton = styled(Button)`
  padding: ${spacing[1]}px ${spacing[2]}px;
  font-size: ${fontSizes.sans[2]}px;
  color: ${colors.base};
  background: rgba(255, 255, 255, 0.5);
  border: ${sizes.border}px solid ${colors.base};

  &:hover {
    color: white;
    background: ${colors.base};
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
