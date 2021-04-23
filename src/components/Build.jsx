import { darken } from 'polished';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import namedCoastData from '../data/standard/namedCoasts.json';
import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';

const CIRCLERADIUS = 15;
const ICONSCALES = {
  army: 0.03,
  fleet: 0.04,
};
const CIRCLESTROKEWIDTH = 2;
const PATH_STROKE_WIDTH = 0.25;

// TODO dry this and CanvasPiece
const Build = ({ namedCoast, nation, source, pieceType }) => {
  const theme = useTheme();
  const { icons } = theme;
  const iconWidth = icons[pieceType].icon[0] * ICONSCALES[pieceType];
  const iconHeight = icons[pieceType].icon[1] * ICONSCALES[pieceType];
  const [sx, sy] = getTerritoryPieceCoords(source, null, namedCoast);

  const circleStroke = darken(0.2, theme.colors.nations[nation]);
  return (
    <Group>
      <Circle
        fill={theme.colors.muted}
        radius={CIRCLERADIUS}
        stroke={circleStroke}
        strokeWidth={CIRCLESTROKEWIDTH}
        shadowForStrokeEnabled={false}
        x={sx}
        y={sy}
      />
      <Path
        data={icons[pieceType].icon[4]}
        fill={darken(0.2, theme.colors.nations[nation])}
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
  const { nation, pieceType, targetCoast } = order;
  const namedCoast = namedCoastData.find((ncd) => ncd.id === targetCoast);
  return { namedCoast, nation, source, pieceType };
};

export default connect(mapStateToProps, null)(Build);
