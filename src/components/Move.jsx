import React from 'react';
import { connect } from 'react-redux';
import { Arrow } from 'react-konva';

import { variables } from '../variables';
import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

const OFFSET = 25;
const FILL = variables.colors.base;
const PATHSTROKEWIDTH = 8;

const Move = ({ source, target }) => {
  const [sx, sy] = getTerritoryPieceCoords(source);
  const [tx, ty] = getTerritoryPieceCoords(target);
  const v = new Vector(tx - sx, ty - sy);
  v.normalize();
  const points = [sx, sy, tx - OFFSET * v.x, ty - OFFSET * v.y];
  return (
    <Arrow
      points={points}
      fill={FILL}
      stroke={FILL}
      strokeWidth={PATHSTROKEWIDTH}
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
