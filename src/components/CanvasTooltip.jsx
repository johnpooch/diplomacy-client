import React, { useEffect, useRef } from 'react';
import { Label, Tag, Text } from 'react-konva';

import { useReferredState } from '../utils';
import { variables } from '../variables';

const FONTSIZE = 16;
const PADDING = 5;
const OFFSET = 7;

const Tooltip = ({
  hoverTarget,
  mousePosition,
  scale,
  stagePosition,
  stageRef,
}) => {
  const [position, setPosition] = useReferredState({ x: 0, y: 0 });

  const labelRef = useRef();

  useEffect(() => {
    if (!labelRef.current) return;

    const { attrs } = stageRef.current;

    const offset = {
      x:
        mousePosition.x < attrs.width / 2
          ? OFFSET / scale
          : -labelRef.current.width() - OFFSET / scale,
      y:
        mousePosition.y < attrs.height / 2
          ? OFFSET / scale
          : -labelRef.current.height() - OFFSET / scale,
    };

    setPosition({
      x: (mousePosition.x - stagePosition.x) / scale + offset.x,
      y: (mousePosition.y - stagePosition.y) / scale + offset.y,
    });
  }, [hoverTarget, mousePosition]);

  return hoverTarget && hoverTarget.attrs.name ? (
    <Label
      listening={false}
      ref={labelRef}
      x={position.current.x}
      y={position.current.y}
    >
      <Tag fill={variables.colors.white} />
      <Text
        fontFamily={variables.fontFamilies.sans}
        fontSize={FONTSIZE / scale}
        padding={PADDING / scale}
        text={hoverTarget.attrs.name.toUpperCase()}
      />
    </Label>
  ) : null;
};

export default Tooltip;
