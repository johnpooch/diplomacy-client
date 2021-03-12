import React from 'react';
import { connect } from 'react-redux';
import { RegularPolygon } from 'react-konva';

import { makeSelectTerritoryById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';

const HOLDRADIUS = 22;
const HOLDSTROKEWIDTH = 5;

const Hold = ({ source, theme }) => {
  const [sx, sy] = getTerritoryPieceCoords(source);
  return (
    <RegularPolygon
      radius={HOLDRADIUS}
      stroke={theme.colors.text}
      strokeWidth={HOLDSTROKEWIDTH}
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
