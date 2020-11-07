import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { faAnchor, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';

import { variables } from '../variables';

const CIRCLERADIUS = 15;
const ICONS = {
  army: faTruckMoving,
  fleet: faAnchor,
};
const ICONSCALES = {
  army: 0.03,
  fleet: 0.04,
};
const CIRCLESTROKEWIDTH = 2;
const PATHSTROKEWIDTH = 0.25;

const getCircleFill = (isHovering) =>
  isHovering ? variables.colors.white : variables.colors.base;

const getIconSize = (type) => ({
  width: ICONS[type].icon[0] * ICONSCALES[type],
  height: ICONS[type].icon[1] * ICONSCALES[type],
});

const Piece = ({ piece, isHovering }) => {
  const { x, y, type, dislodged, nation } = piece;
  return (
    <Group dislodged={dislodged} listening={false} type={type}>
      <Circle
        fill={getCircleFill(isHovering)}
        radius={CIRCLERADIUS}
        stroke={darken(0.2, variables.colors.nations[nation])}
        strokeWidth={CIRCLESTROKEWIDTH}
        shadowForStrokeEnabled={false}
        x={x}
        y={y}
      />
      <Path
        data={ICONS[type].icon[4]}
        fill={variables.colors.nations[nation]}
        scaleX={ICONSCALES[type]}
        scaleY={ICONSCALES[type]}
        stroke={getCircleFill(isHovering)}
        strokeWidth={PATHSTROKEWIDTH / ICONSCALES[type]}
        shadowForStrokeEnabled={false}
        x={x - getIconSize(type).width / 2}
        y={y - getIconSize(type).height / 2}
      />
    </Group>
  );
};

const Pieces = ({ territories, hoverTarget }) => {
  return (
    <Group>
      {territories.map((territory) => {
        const { piece } = territory;
        return piece ? (
          <Piece
            key={piece.id}
            piece={piece}
            isHovering={hoverTarget !== null && territory.id === hoverTarget}
          />
        ) : null;
      })}
    </Group>
  );
};

export default Pieces;
