import React from 'react';
import { connect } from 'react-redux';
import { Arrow } from 'react-konva';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

const OFFSET = 25;
const PATH_STROKE_WIDTH = 8;

const Retreat = ({ source, target, theme }) => {
  const [sx, sy] = getTerritoryPieceCoords(source, true);
  const [tx, ty] = getTerritoryPieceCoords(target);
  const v = new Vector(tx - sx, ty - sy);
  v.normalize();
  const points = [sx, sy, tx - OFFSET * v.x, ty - OFFSET * v.y];
  return (
    <Arrow
      points={points}
      fill={theme.colors.text1}
      stroke={theme.colors.text1}
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

export default connect(mapStateToProps, null)(Retreat);
