import React, { useEffect, useRef, useState } from 'react';

import ContextMenu from './ContextMenu';
import { makeStyles } from './MaterialUI';

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

const CanvasContextMenu = ({
  stageRef,
  selectedTarget,
  mousePosition,
  onClickOption,
  options,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const classes = useStyles();
  const menuRef = useRef();

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

  const positionStyle = { top: `${position.y}px`, left: `${position.x}px` };

  return (
    <div
      className={classes.root}
      ref={menuRef}
      position={position}
      style={positionStyle}
    >
      <ContextMenu options={options} onClickOption={onClickOption} />
    </div>
  );
};

export default CanvasContextMenu;
