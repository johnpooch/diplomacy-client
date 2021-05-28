import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';

import { PrimaryButton } from './Button/Button';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.background.paper,
      display: 'grid',
      rowGap: theme.spacing(0.25),
      padding: theme.spacing(0.25),
      position: 'absolute',
    },
  };
});

const ContextMenu = ({
  stageRef,
  selectedTarget,
  mousePosition,
  onClickOption,
  options,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const classes = useStyles();

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
      <PrimaryButton key={value} onClick={handleOptionSelected(value)}>
        {label}
      </PrimaryButton>
    );
  });

  const positionStyle = { top: `${position.y}px`, left: `${position.x}px` };

  return (
    <nav
      className={classes.root}
      ref={menuRef}
      position={position}
      style={positionStyle}
    >
      {elements}
    </nav>
  );
};

export default ContextMenu;
