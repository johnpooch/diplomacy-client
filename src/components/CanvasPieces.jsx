import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { darken } from 'polished';

import { variables } from '../variables';

const CIRCLERADIUS = 15;
const ICONSCALES = {
  army: 0.03,
  fleet: 0.04,
};
const CIRCLESTROKEWIDTH = 2;
const PATHSTROKEWIDTH = 0.25;

const Piece = ({ piece, isHovering, isOrderable, isSelected }) => {
  const { x, y, type, dislodged, nation } = piece;
  const { icons } = variables;

  const iconWidth = icons[type].icon[0] * ICONSCALES[type];
  const iconHeight = icons[type].icon[1] * ICONSCALES[type];

  const circleFill =
    (isHovering || isSelected) && isOrderable
      ? variables.colors.white
      : variables.colors.base;

  const circleStroke =
    !(isHovering || isSelected) && isOrderable
      ? variables.colors.white
      : darken(0.2, variables.colors.nations[nation]);

  return (
    <Group dislodged={dislodged} listening={false} type={type}>
      <Circle
        fill={circleFill}
        radius={CIRCLERADIUS}
        stroke={circleStroke}
        strokeWidth={CIRCLESTROKEWIDTH}
        shadowForStrokeEnabled={false}
        x={x}
        y={y}
      />
      <Path
        data={icons[type].icon[4]}
        fill={variables.colors.nations[nation]}
        scaleX={ICONSCALES[type]}
        scaleY={ICONSCALES[type]}
        stroke={circleFill}
        strokeWidth={PATHSTROKEWIDTH / ICONSCALES[type]}
        shadowForStrokeEnabled={false}
        x={x - iconWidth / 2}
        y={y - iconHeight / 2}
      />
    </Group>
  );
};

const Pieces = ({ territories, hoverId, selectedId, userNation }) => {
  return (
    <Group>
      {territories.map((territory) => {
        const { piece } = territory;
        return piece ? (
          <Piece
            key={piece.id}
            isHovering={hoverId !== null && territory.id === hoverId}
            isOrderable={userNation ? userNation.id === piece.nation : false}
            isSelected={selectedId !== null && territory.id === selectedId}
            piece={piece}
          />
        ) : null;
      })}
    </Group>
  );
};

export default Pieces;
