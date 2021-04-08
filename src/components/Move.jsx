import React from 'react';
import { Arrow } from 'react-konva';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

const OFFSET = 25;
const PATH_STROKE_WIDTH = 8;

const Move = ({ source, target }) => {
  const theme = useTheme();

  const [sx, sy] = getTerritoryPieceCoords(source);
  const [tx, ty] = getTerritoryPieceCoords(target);
  const v = new Vector(tx - sx, ty - sy);
  v.normalize();
  const points = [sx, sy, tx - OFFSET * v.x, ty - OFFSET * v.y];
  return (
    <Arrow
      points={points}
      fill={theme.colors.text}
      stroke={theme.colors.text}
      strokeWidth={PATH_STROKE_WIDTH}
      pointerLength={5}
      pointerWidth={5}
    />
  );
};

const mapStateToProps = (state, { order }) => {
  const selectTerritoryById = makeSelectTerritoryById();
  const source = selectTerritoryById(state, order.source);
  const target = selectTerritoryById(state, order.target);
  return { source, target };
};

export default connect(mapStateToProps, null)(Move);
