import React, { useEffect, useRef, useState } from 'react';
import { Label, Tag, Text } from 'react-konva';

const Tooltip = ({
  hoverTarget,
  mousePosition,
  scale,
  stagePosition,
  stageRef,
  theme,
}) => {
  const { colors, fontSizes, space } = theme;

  const FONTSIZE = fontSizes.sans[2];
  const OFFSET = space[1];
  const PADDING = space[0];
  const STROKEWIDTH = 1;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [textFill, setTextFill] = useState(colors.text);

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
    setTextFill(colors.text);

    if (hoverTarget && hoverTarget.attrs.territory.name) {
      const { territory } = hoverTarget.attrs;
      setText(territory.name.toUpperCase());

      if (territory.controlledBy) {
        setTextFill(colors.nations[territory.controlledBy]);
      }
    }
  }, [hoverTarget]);

  return text ? (
    <Label listening={false} ref={labelRef} x={position.x} y={position.y}>
      <Tag
        fill={colors.muted}
        stroke={colors.text}
        strokeWidth={STROKEWIDTH / scale}
      />
      <Text
        fontFamily={(p) => p.theme.fonts.sans}
        fontSize={FONTSIZE / scale}
        padding={PADDING / scale}
        text={text}
        fill={textFill}
      />
    </Label>
  ) : null;
};

export default Tooltip;
