import React from 'react';
import { RegularPolygon } from 'react-konva';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';

const HOLD_RADIUS = 22;
const HOLD_STROKE_WIDTH = 5;

const Hold = ({ source }) => {
  const theme = useTheme();
  const [sx, sy] = getTerritoryPieceCoords(source);
  return (
    <RegularPolygon
      radius={HOLD_RADIUS}
      stroke={theme.colors.text}
      strokeWidth={HOLD_STROKE_WIDTH}
      sides={8}
      rotation={22.5}
      x={sx}
      y={sy}
    />
  );
};

const mapStateToProps = (state, { order }) => {
  const selectTerritoryById = makeSelectTerritoryById();
  const source = selectTerritoryById(state, order.source);
  return { source };
};

export default connect(mapStateToProps, null)(Hold);
