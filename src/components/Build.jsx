import React from 'react';
import { connect } from 'react-redux';
import { Circle, Group, Path } from 'react-konva';

import { useTheme } from 'styled-components';
import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';

const CIRCLERADIUS = 15;
const ICONSCALES = {
  army: 0.03,
  fleet: 0.04,
};
const CIRCLESTROKEWIDTH = 2;
const PATH_STROKE_WIDTH = 0.25;

const Build = ({ source, pieceType }) => {
  const theme = useTheme();
  const { icons } = theme;
  const iconWidth = icons[pieceType].icon[0] * ICONSCALES[pieceType];
  const iconHeight = icons[pieceType].icon[1] * ICONSCALES[pieceType];
  const [sx, sy] = getTerritoryPieceCoords(source);
  return (
    <Group>
      <Circle
        fill={theme.colors.white}
        radius={CIRCLERADIUS}
        stroke={theme.colors.white}
        strokeWidth={CIRCLESTROKEWIDTH}
        shadowForStrokeEnabled={false}
        x={sx}
        y={sy}
      />
      <Path
        data={icons[pieceType].icon[4]}
        fill={theme.colors.text}
        scaleX={ICONSCALES[pieceType]}
        scaleY={ICONSCALES[pieceType]}
        stroke={theme.colors.white}
        strokeWidth={PATH_STROKE_WIDTH / ICONSCALES[pieceType]}
        shadowForStrokeEnabled={false}
        x={sx - iconWidth / 2}
        y={sy - iconHeight / 2}
      />
    </Group>
  );
};

const mapStateToProps = (state, { order }) => {
  const selectTerritoryById = makeSelectTerritoryById();
  const source = selectTerritoryById(state, order.source);
  const { pieceType } = order;
  return { source, pieceType };
};

export default connect(mapStateToProps, null)(Build);
