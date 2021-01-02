import React, { useEffect, useRef, useState } from 'react';
import { Label, Tag, Text } from 'react-konva';

import { variables } from '../variables';

const FONTSIZE = variables.fontSizes.sans[2];
const OFFSET = variables.spacing[1];
const PADDING = variables.spacing[0];
const STROKEWIDTH = 1;

const Tooltip = ({
  hoverTarget,
  mousePosition,
  scale,
  stagePosition,
  stageRef,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [textFill, setTextFill] = useState(variables.colors.base);

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
  }, [mousePosition]);

  useEffect(() => {
    setText('');
    setTextFill(variables.colors.base);

    if (hoverTarget && hoverTarget.attrs.territory.name) {
      const { territory } = hoverTarget.attrs;
      setText(territory.name.toUpperCase());

      if (territory.controlledBy) {
        setTextFill(variables.colors.nations[territory.controlledBy]);
      }
    }
  }, [hoverTarget]);

  return text ? (
    <Label listening={false} ref={labelRef} x={position.x} y={position.y}>
      <Tag
        fill={variables.colors.white}
        stroke={variables.colors.base}
        strokeWidth={STROKEWIDTH / scale}
      />
      <Text
        fontFamily={variables.fontFamilies.sans}
        fontSize={FONTSIZE / scale}
        padding={PADDING / scale}
        text={text}
        fill={textFill}
      />
    </Label>
  ) : null;
};

export default Tooltip;
