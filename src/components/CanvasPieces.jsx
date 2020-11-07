/* eslint camelcase: [2, { "allow": ["controlled_by", "territory_map_data_id"] }] */
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
const CIRCLESTROKEWIDTH = 1;
const PATHSTROKEWIDTH = 0.5;

const Piece = ({ piece, isHovering }) => {
  const { x, y, type, dislodged, nation } = piece;

  if (!type || !(nation in variables.colors.nations)) return null;

  const getCircleFill = () => {
    return isHovering
      ? variables.colors.white
      : darken(0.3, variables.colors.nations[nation]);
  };

  const iconSize = {
    width: ICONS[type].icon[0] * ICONSCALES[type],
    height: ICONS[type].icon[1] * ICONSCALES[type],
  };

  return (
    <Group dislodged={dislodged} listening={false} type={type}>
      <Circle
        fill={getCircleFill()}
        radius={CIRCLERADIUS}
        stroke={variables.colors.base}
        strokeWidth={CIRCLESTROKEWIDTH}
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
        x={x - iconSize.width / 2}
        y={y - iconSize.height / 2}
      />
    </Group>
  );
};

const Pieces = ({ territories, hoverTarget }) => {
  return (
    <Group>
      {territories.map((territory) => {
        const { piece } = territory;
        if (!piece) return null;
        return (
          <Piece
            key={piece.id}
            piece={piece}
            isHovering={hoverTarget !== null && territory.id === hoverTarget}
          />
        );
      })}
    </Group>
  );
};

export default Pieces;
