import React from 'react';
import { Arrow } from 'react-konva';
import { connect } from 'react-redux';

import namedCoastData from '../data/standard/namedCoasts.json';
import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords, Vector } from '../utils';

import { useTheme } from './MaterialUI';

const OFFSET = 25;
const PATH_STROKE_WIDTH = 8;

const Move = ({ source, target, targetCoast }) => {
  const theme = useTheme();

  const [sx, sy] = getTerritoryPieceCoords(source);
  const [tx, ty] = getTerritoryPieceCoords(target, null, targetCoast);
  const v = new Vector(tx - sx, ty - sy);
  v.normalize();
  const points = [sx, sy, tx - OFFSET * v.x, ty - OFFSET * v.y];
  return (
    <Arrow
      points={points}
      fill={theme.palette.text.primary}
      stroke={theme.palette.text.primary}
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
  const targetCoast = namedCoastData.find(
    (ncd) => ncd.id === order.targetCoast
  );
  return { source, target, targetCoast };
};

export default connect(mapStateToProps, null)(Move);
