import React from 'react';

import { colors } from '../variables';

const getStrokeColor = (territoryOrderState) => {
  if (territoryOrderState) return 'white';
  return colors.base;
};

const getStrokeDasharray = (territoryOrderState) => {
  const orderTypes = ['aux', 'target'];
  if (orderTypes.includes(territoryOrderState)) return 10;
  return 0;
};

const TerritoryPath = (props) => {
  const { callbacks, territory, territoryOrderState } = props;
  const { contextMenu, mouseOut, mouseOver, mouseUp } = callbacks;
  const { path } = territory;
  return (
    <path
      className="territory"
      d={path}
      onMouseOver={mouseOver}
      onFocus={mouseOver}
      onMouseOut={mouseOut}
      onBlur={mouseOut}
      onMouseUp={mouseUp}
      onContextMenu={contextMenu}
      stroke={getStrokeColor(territoryOrderState)}
      strokeDasharray={getStrokeDasharray(territoryOrderState)}
    />
  );
};

export default TerritoryPath;
