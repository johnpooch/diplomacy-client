import React from 'react';
import { Label, Tag, Text } from 'react-konva';

// import { variables } from '../variables';

const Tooltip = ({ target, scale, position, pointer }) => {
  if (!target) return null;

  const { name } = target.attrs;
  if (!name) return null;

  const fontSize = 20 / scale;
  const padding = 5 / scale;
  const pos = {
    x: (pointer.x - position.x + 10) / scale,
    y: (pointer.y - position.y + 10) / scale,
  };

  return (
    <Label x={pos.x} y={pos.y}>
      <Tag fill="white" />
      <Text text={target.attrs.name} fontSize={fontSize} padding={padding} />
    </Label>
  );
};

export default Tooltip;
