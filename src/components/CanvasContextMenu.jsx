import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import { variables } from '../variables';

const StyledContextMenu = styled.nav`
  background: ${variables.colors.white};
  border-radius: ${variables.sizes.borderRadius[0]}px;
  display: grid;
  grid-row-gap: ${variables.spacing[0]}px;
  left: ${(props) => props.position.x}px;
  padding: ${variables.spacing[0]}px;
  position: absolute;
  top: ${(props) => props.position.y}px;
`;

const ContextMenu = ({
  stageRef,
  selectedTarget,
  mousePosition,
  onOptionSelected,
  options,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const menuRef = useRef();

  const handleOptionSelected = (option) => () => onOptionSelected(option);

  useEffect(() => {
    if (!menuRef.current) return;
    const { attrs } = stageRef.current;
    const bounds = menuRef.current.getBoundingClientRect();
    setPosition({
      x:
        mousePosition.x < attrs.width / 2
          ? mousePosition.x
          : mousePosition.x - bounds.width,
      y:
        mousePosition.y < attrs.height / 2
          ? mousePosition.y
          : mousePosition.y - bounds.height,
    });
  }, [selectedTarget]);

  const elements = options.map(([value, label]) => {
    return (
      <Button key={value} onClick={handleOptionSelected(value)}>
        {label}
      </Button>
    );
  });

  return (
    <StyledContextMenu ref={menuRef} position={position}>
      {elements}
    </StyledContextMenu>
  );
};

export default ContextMenu;
