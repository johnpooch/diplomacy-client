import React from 'react';
import { connect } from 'react-redux';
import { Circle, Group, Path } from 'react-konva';
import { darken } from 'polished';

import territoryData from '../data/standard/territories.json';
import { makeSelectPieceById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';
import { variables } from '../variables';

const CIRCLERADIUS = 15;
const ICONSCALES = {
  army: 0.03,
  fleet: 0.04,
};
const CIRCLESTROKEWIDTH = 2;
const PATHSTROKEWIDTH = 0.25;

const Piece = ({ piece, territory, isHovering, isOrderable, isSelected }) => {
  const { type, mustRetreat, nation } = piece;
  const [x, y] = getTerritoryPieceCoords(territory, mustRetreat);
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
    <Group mustRetreat={mustRetreat} listening={false} type={type}>
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

const makeMapStateToProps = () => {
  const selectPieceById = makeSelectPieceById();
  return (state, { id, turnId }) => {
    const piece = selectPieceById(state, id, turnId);
    const territory = territoryData.find(
      (td) => td.territoryUID === piece.territory
    );
    return {
      piece,
      territory,
    };
  };
};

export default connect(makeMapStateToProps, null)(Piece);
