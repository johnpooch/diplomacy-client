/* eslint camelcase: [2, { "allow": ["text_x", "text_y", "supply_center_x", "supply_center_y"] }] */
import React from 'react';
import styled from '@emotion/styled';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { darken, lighten } from 'polished';

import { colors, fontSizes } from '../variables';

const StyledTerritory = styled.g`
  cursor: ${(props) => (props.panning ? 'all-scroll' : 'pointer')};

  .territory {
    stroke-width: ${(props) => (props.isSource ? 3.5 : 2)};
    fill: ${(props) =>
      props.highlight ? lighten(0.07, props.color) : props.color};
  }

  .text {
    font-size: ${fontSizes.sans[0]}px;
    text-anchor: middle;
    pointer-events: none;
    text-transform: uppercase;
    user-select: none;
    fill: ${(props) => (props.highlight ? colors.base : 'white')};
    font-weight: ${(props) => (props.highlight ? 'bold' : 'normal')};
  }

  .supply-center path {
    pointer-events: none;
    fill: ${(props) => darken(0.3, props.color)};
  }
`;

const getStrokeColor = (props) => {
  const { isAux, isSource, isTarget } = props;
  if (isAux) return 'white';
  if (isSource) return 'white';
  if (isTarget) return 'white';
  return colors.base;
};

const getStrokeDasharray = (props) => {
  const { isAux, isTarget } = props;
  if (isAux) return 10;
  if (isTarget) return 10;
  return 0;
};

const getFillColor = (props) => {
  const { controlledBy, type } = props;
  if (type === 'sea') return colors.sea;
  if (controlledBy) {
    const { id } = controlledBy;
    if (id !== null && id in colors.nations) {
      return colors.nations[id];
    }
  }
  return colors.land;
};

const renderPath = (props) => {
  const { _mouseOut, _mouseOver, _mouseUp, data } = props;
  const { path } = data;
  return (
    <path
      className="territory"
      d={path}
      onMouseOver={_mouseOver}
      onFocus={_mouseOver}
      onMouseOut={_mouseOut}
      onBlur={_mouseOut}
      onMouseUp={_mouseUp}
      stroke={getStrokeColor(props)}
      strokeDasharray={getStrokeDasharray(props)}
    />
  );
};

const renderText = (data) => {
  const { text_x, text_y, abbreviation } = data;
  if (abbreviation && text_x && text_y) {
    return (
      <text
        className="text"
        x={text_x}
        y={text_y}
        transform="translate(195, 170)"
      >
        {abbreviation}
      </text>
    );
  }
  return null;
};

const renderSupplyCenter = (props, data) => {
  const { supplyCenter } = props;
  const { supply_center_x, supply_center_y } = data;
  if (supplyCenter && supply_center_x && supply_center_y) {
    const scale = 0.02;
    const w = faStar.icon[0];
    const h = faStar.icon[0];
    const dx = supply_center_x - (scale * w) / 2 + 195;
    const dy = supply_center_y - (scale * h) / 2 + 170;
    return (
      <g
        className="supply-center"
        transform={`translate(${dx}, ${dy}) scale(${scale})`}
      >
        <path d={faStar.icon[4]} />
      </g>
    );
  }
  return null;
};

const Territory = (props) => {
  const { data, hovering, isSource, panning } = props;
  const color = getFillColor(props);
  return (
    <StyledTerritory
      color={color}
      highlight={!panning && hovering}
      panning={panning}
      isSource={isSource}
    >
      {renderPath(props)}
      {renderSupplyCenter(props, data)}
      {renderText(data)}
    </StyledTerritory>
  );
};

export default Territory;
