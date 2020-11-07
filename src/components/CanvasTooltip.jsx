import React, { useEffect, useRef, useState } from 'react';
import { Label, Tag, Text } from 'react-konva';

import { variables } from '../variables';

const FONTSIZE = variables.fontSizes.sans[2];
const PADDING = variables.spacing[0];
const OFFSET = variables.spacing[1];

const Tooltip = ({
  hoverTarget,
  mousePosition,
  scale,
  stagePosition,
  stageRef,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');

  const labelRef = useRef();

  useEffect(() => {
    if (!labelRef.current) return;

    const { attrs } = stageRef.current;

    const offset = {
      x:
        mousePosition.x < attrs.width / 2
          ? OFFSET / scale
          : -labelRef.current.width(),
      y:
        mousePosition.y < attrs.height / 2
          ? OFFSET / scale
          : -labelRef.current.height(),
    };

    setPosition({
      x: (mousePosition.x - stagePosition.x) / scale + offset.x,
      y: (mousePosition.y - stagePosition.y) / scale + offset.y,
    });
  }, [mousePosition]);

  useEffect(() => {
    setText('');

    if (hoverTarget && hoverTarget.attrs.territory.name) {
      const { territory } = hoverTarget.attrs;

      const newText = territory.name;

      // if (territory.controlled_by_nation) {
      //   const controlledName = territory.controlled_by_nation.name;
      //   newText = `${controlledName} ${newText}`;
      // }

      // if (territory.piece && territory.piece_nation) {
      //   const pieceName = territory.piece_nation.name;
      //   newText = `${pieceName} ${territory.piece.type} in ${newText}`;
      // }

      setText(newText.toUpperCase());
    }
  }, [hoverTarget]);

  return text ? (
    <Label listening={false} ref={labelRef} x={position.x} y={position.y}>
      <Tag fill={variables.colors.white} />
      <Text
        fontFamily={variables.fontFamilies.sans}
        fontSize={FONTSIZE / scale}
        padding={PADDING / scale}
        text={text}
      />
    </Label>
  ) : null;
};

export default Tooltip;
