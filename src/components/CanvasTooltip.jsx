import React, { useEffect, useRef, useState } from 'react';
import { Label, Tag, Text } from 'react-konva';
import { useTheme } from 'styled-components';

const Tooltip = ({
  hoverTarget,
  mousePosition,
  scale,
  stagePosition,
  stageRef,
}) => {
  const theme = useTheme();
  return null;

  const FONTSIZE = theme.fontSizes[2];
  const OFFSET = theme.space[1];
  const PADDING = theme.space[0];
  const STROKEWIDTH = 1;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [textFill, setTextFill] = useState(theme.colors.text);

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
    setTextFill(theme.colors.text);

    if (hoverTarget && hoverTarget.attrs.territory.name) {
      const { territory } = hoverTarget.attrs;
      setText(territory.name.toUpperCase());

      if (territory.controlledBy) {
        setTextFill(theme.colors.nations[territory.controlledBy]);
      }
    }
  }, [hoverTarget]);

  return text ? (
    <Label listening={false} ref={labelRef} x={position.x} y={position.y}>
      <Tag
        fill={theme.colors.muted}
        stroke={theme.colors.text}
        strokeWidth={STROKEWIDTH / scale}
      />
      <Text
        fontFamily={theme.fonts.sans}
        fontSize={FONTSIZE / scale}
        padding={PADDING / scale}
        text={text}
        fill={textFill}
      />
    </Label>
  ) : null;
};

export default Tooltip;
