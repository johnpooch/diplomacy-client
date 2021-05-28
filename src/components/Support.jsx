import { useTheme } from '@material-ui/core';
import React from 'react';
import { Arrow, Group, Line } from 'react-konva';
import { connect } from 'react-redux';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

const OFFSET = 15;
const PATH_STROKE_WIDTH = 8;
const SUPPORT_DASH = [1, 1, 0.001];

const Support = ({ aux, isHoldSupport, source, target }) => {
  const theme = useTheme();

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
        fill={theme.palette.text.primary}
        stroke={theme.palette.text.primary}
        strokeWidth={PATH_STROKE_WIDTH}
        dash={SUPPORT_DASH}
      />
      {!isHoldSupport ? (
        <Arrow
          points={targetPoints}
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
          strokeWidth={PATH_STROKE_WIDTH}
          dash={SUPPORT_DASH}
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
