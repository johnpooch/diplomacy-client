import React from 'react';
import { connect } from 'react-redux';
import { Arrow, Group, Line } from 'react-konva';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

const OFFSET = 15;
const PATHSTROKEWIDTH = 8;
const SUPPORTDASH = [1, 1, 0.001];

const Support = ({ aux, isHoldSupport, source, target, theme }) => {
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
        strokeWidth={PATHSTROKEWIDTH}
        dash={SUPPORTDASH}
      />
      {!isHoldSupport ? (
        <Arrow
          points={targetPoints}
          fill={theme.colors.text}
          stroke={theme.colors.text}
          strokeWidth={PATHSTROKEWIDTH}
          dash={SUPPORTDASH}
        />
      ) : null}
    </Group>
  );
};

const mapStateToProps = (state, { order }) => {
  const selectTerritoryById = makeSelectTerritoryById();
  const isHoldSupport = order.aux === order.target;
  const aux = selectTerritoryById(state, order.aux);
  const source = selectTerritoryById(state, order.source);
  const target = selectTerritoryById(state, order.target);
  return { aux, isHoldSupport, source, target };
};

export default connect(mapStateToProps, null)(Support);
