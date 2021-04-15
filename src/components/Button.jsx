/* eslint-disable react/jsx-props-no-spreading */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

export const BaseButton = styled.button`
  background: transparent;
  border-radius: ${(p) => p.theme.radii[0]};
  border: none;
  cursor: pointer;
  font-size: inherit;
  margin: 0;
  padding: 0;
  text-decoration: none;

  &[disabled] {
    cursor: initial;
    opacity: 0.5;
  }
`;

export const Button = styled(BaseButton)`
  background: ${(p) => p.theme.colors.primary};
  color: white;
  font-size: ${(p) => p.theme.fontSizes[2]};
  padding: ${(p) => `${p.theme.space[2]} ${p.theme.space[3]}`};

  &:hover {
    background: ${(p) => p.theme.colors.accent};
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${(p) => p.theme.colors.secondary};
`;

export const IconButton = ({ icon, size = '1x', ...props }) => (
  <BaseButton type="button" {...props}>
    <FontAwesomeIcon className="icon" icon={icon} size={size} />
  </BaseButton>
);

export const BackButton = styled(IconButton)`
  background: ${(p) => p.theme.colors.text};
  border-radius: 50%;
  color: ${(p) => p.theme.colors.secondary};

  &:hover {
    /* background: ${(p) => p.theme.colors.primary}; */
    color: ${(p) => p.theme.colors.primary};
  }
`;
