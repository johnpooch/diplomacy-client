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

const Piece = ({ piece, isHovering, isOrderable }) => {
  const { x, y, type, dislodged, nation } = piece;

  const getCircleFill = () =>
    isHovering && isOrderable ? variables.colors.white : variables.colors.base;

  const getCircleStroke = () =>
    !isHovering && isOrderable
      ? variables.colors.white
      : darken(0.2, variables.colors.nations[nation]);

  const getIconWidth = () => ICONS[type].icon[0] * ICONSCALES[type];

  const getIconHeight = () => ICONS[type].icon[1] * ICONSCALES[type];

  return (
    <Group dislodged={dislodged} listening={false} type={type}>
      <Circle
        fill={getCircleFill()}
        radius={CIRCLERADIUS}
        stroke={getCircleStroke()}
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
        stroke={getCircleFill()}
        strokeWidth={PATHSTROKEWIDTH / ICONSCALES[type]}
        shadowForStrokeEnabled={false}
        x={x - getIconWidth() / 2}
        y={y - getIconHeight() / 2}
      />
    </Group>
  );
};

const Pieces = ({ territories, hoverTarget, userNation }) => {
  return (
    <Group>
      {territories.map((territory) => {
        const { piece } = territory;
        return piece ? (
          <Piece
            key={piece.id}
            isHovering={hoverTarget !== null && territory.id === hoverTarget}
            isOrderable={userNation ? userNation.id === piece.nation : false}
            piece={piece}
          />
        ) : null;
      })}
    </Group>
  );
};

export default Pieces;
