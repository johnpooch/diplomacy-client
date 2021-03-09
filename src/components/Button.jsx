/* eslint-disable react/jsx-props-no-spreading */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from '@emotion/styled';
import { variables } from '../variables';

export const BaseButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: ${variables.sizes.borderRadius[0]}px;
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
  background: ${variables.colors.base};
  border: ${variables.sizes.border}px solid ${variables.colors.base};
  color: white;
  font-size: ${variables.fontSizes.sans[2]}px;
  padding: ${variables.spacing[1]}px ${variables.spacing[3]}px;

  &:hover {
    background: ${variables.colors.darkgray};
    color: white;
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${variables.colors.white};
  color: ${variables.colors.base};
`;

export const TertiaryButton = styled(Button)`
  background: transparent;
  color: ${variables.colors.darkgray};
  font-size: ${variables.fontSizes.sans[2]}px;
  padding: 0;

  &:hover {
    background: transparent;
    color: ${variables.colors.darkgray};
    text-decoration: underline;
  }
`;

export const IconButton = ({ icon, size = '1x', ...props }) => (
  <BaseButton type="button" {...props}>
    <FontAwesomeIcon className="icon" icon={icon} size={size} />
  </BaseButton>
);

export const BackButton = styled(IconButton)`
  background: ${variables.colors.base};
  border-radius: 50%;
  color: ${variables.colors.white};

  &:hover {
    color: ${variables.colors.darkgray};
  }
`;
