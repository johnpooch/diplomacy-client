import React from 'react';
import styled from '@emotion/styled';

import { Button } from './Button';
import { variables } from '../variables';

const StyledContextMenu = styled.nav`
  background: ${variables.colors.white};
  border-radius: ${variables.sizes.borderRadius[0]}px;
  bottom: 0;
  display: grid;
  display: grid;
  grid-row-gap: ${variables.spacing[0]}px;
  padding: ${variables.spacing[0]}px;
  position: absolute;
  width: 100%;
`;

const ContextMenu = ({ onOptionSelected, options }) => {
  const handleOptionSelected = (option) => () => onOptionSelected(option);

  const elements = options.map(([value, label]) => {
    return (
      <Button key={value} onClick={handleOptionSelected(value)}>
        {label}
      </Button>
    );
  });

  return <StyledContextMenu>{elements}</StyledContextMenu>;
};

export default ContextMenu;
