import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const StyledContextMenu = styled.nav`
  background: ${(p) => p.theme.colors.background};
  border-radius: ${(p) => p.theme.radii[0]};
  bottom: 0;
  display: grid;
  display: grid;
  row-gap: ${(p) => p.theme.space[0]};
  padding: ${(p) => p.theme.space[0]};
  position: absolute;
  width: 100%;
`;

const ContextMenu = ({ onClickOption, options }) => {
  const handleOptionSelected = (option) => () => onClickOption(option);

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
