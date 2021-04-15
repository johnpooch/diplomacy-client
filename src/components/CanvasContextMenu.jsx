import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const StyledContextMenu = styled.nav`
  background: ${(p) => p.theme.colors.muted};
  border-radius: ${(p) => p.theme.radii[0]};
  display: grid;
  grid-row-gap: ${(p) => p.theme.space[0]};
  left: ${(p) => p.position.x}px;
  padding: ${(p) => p.theme.space[0]};
  position: absolute;
  top: ${(p) => p.position.y}px;
`;

const ContextMenu = ({
  stageRef,
  selectedTarget,
  mousePosition,
  onClickOption,
  options,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const menuRef = useRef();

  const handleOptionSelected = (option) => () => onClickOption(option);

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
