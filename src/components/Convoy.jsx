import React from 'react';
import { Arrow, Group, Line } from 'react-konva';
import { connect } from 'react-redux';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

const OFFSET = 15;
const PATH_STROKE_WIDTH = 8;
const CONVOY_DASH = [1, 1, 0.001];

const Convoy = ({ aux, source, target, theme }) => {
  const [ax, ay] = getTerritoryPieceCoords(aux);
  const [sx, sy] = getTerritoryPieceCoords(source);
  const [tx, ty] = getTerritoryPieceCoords(target);
  let v = new Vector(ax - sx, ay - sy);
  v.normalize();
  const auxPoints = [sx, sy, ax - OFFSET * v.x, ay - OFFSET * v.y];
  v = new Vector(tx - sx, ty - sy);
  v.normalize();
  const targetPoints = [sx, sy, tx - OFFSET * v.x, ty - OFFSET * v.y];
  return (
    <Group>
      <Line
        points={auxPoints}
        fill={theme.colors.text}
        stroke={theme.colors.text}
        strokeWidth={PATH_STROKE_WIDTH}
        dash={CONVOY_DASH}
      />
      <Arrow
        points={targetPoints}
        fill={theme.colors.text}
        stroke={theme.colors.text}
        strokeWidth={PATH_STROKE_WIDTH}
        dash={CONVOY_DASH}
      />
    </Group>
  );
};

const mapStateToProps = (state, { order }) => {
  const selectTerritoryById = makeSelectTerritoryById();
  const aux = order.aux ? selectTerritoryById(state, order.aux) : null;
  const source = selectTerritoryById(state, order.source);
  const target = selectTerritoryById(state, order.target);
  return { aux, source, target };
};

export default connect(mapStateToProps, null)(Convoy);
