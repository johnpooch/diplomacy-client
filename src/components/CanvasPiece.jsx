import { darken } from 'polished';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { connect } from 'react-redux';

import namedCoastData from '../data/standard/namedCoasts.json';
import territoryData from '../data/standard/territories.json';
import { makeSelectPieceById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';

import { ArmyType, FleetType } from './Icon';
import { useTheme } from './MaterialUI';

const CIRCLE_RADIUS = 15;
const ICON_SCALES = {
  army: 0.035,
  fleet: 0.045,
};
const CIRCLE_STROKE_WIDTH = 2;

const Piece = ({ namedCoast, piece, territory, turnId }) => {
  const { mustRetreat, nation, turnCreated, type } = piece;

  // Don't show a piece if it was created this turn (build order shown instead)
  if (turnCreated === turnId) return null;

  const [x, y] = getTerritoryPieceCoords(territory, mustRetreat, namedCoast);
  const theme = useTheme();

  const iconType = type === 'army' ? ArmyType : FleetType;

  const iconWidth = iconType.icon[0] * ICON_SCALES[type];
  const iconHeight = iconType.icon[1] * ICON_SCALES[type];

  return (
    <Group mustRetreat={mustRetreat} listening={false} type={type}>
      <Circle
        fill={theme.palette.map.pieceCircleFill}
        radius={CIRCLE_RADIUS}
        stroke={darken(0.2, theme.palette.nations[nation].main)}
        strokeWidth={CIRCLE_STROKE_WIDTH}
        shadowForStrokeEnabled={false}
        x={x}
        y={y}
      />
      <Path
        data={iconType.icon[4]}
        fill={theme.palette.nations[nation].main}
        scaleX={ICON_SCALES[type]}
        scaleY={ICON_SCALES[type]}
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
    const namedCoast = namedCoastData.find(
      (ncd) => ncd.id === piece.namedCoast
    );
    const territory = territoryData.find((td) => td.id === piece.territory);
    return {
      namedCoast,
      piece,
      territory,
      turnId,
    };
  };
};

export default connect(makeMapStateToProps, null)(Piece);
