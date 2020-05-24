import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import mapRef from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  bottom: ${spacing[2]}px;
  left: ${spacing[2]}px;
  padding: ${spacing[2]}px;
  pointer-events: none;
  color: white;
  font-size: ${fontSizes.sans[2]}px;
  background-color: ${colors.base};

  p:not(:first-of-type) {
    margin-top: ${spacing[0]}px;
  }
`;

const StyledSpan = styled.span`
  text-transform: capitalize;
  color: ${(props) => (props.color ? props.color : 'white')};
  user-select: none;

  &:not(:last-of-type):after {
    content: ' ';
  }

  &.name {
    font-weight: bold;
  }
`;

const getSupplyCenter = (territory) => {
  if (territory.supply_center) {
    return <StyledSpan className="supply">*</StyledSpan>;
  }
  return null;
};

const getControlledBy = (controlledBy) => {
  if (controlledBy) {
    const color = lighten(0.25, colors.nations[controlledBy.id]);
    return (
      <StyledSpan className="nation" color={color}>
        ({controlledBy.name})
      </StyledSpan>
    );
  }
  return null;
};

const getTooltip = (data, tooltip) => {
  const {
    territory,
    territoryControlledBy,
    piece,
    pieceControlledBy,
  } = tooltip;

  const tooltipElements = [];

  if (data.name) {
    tooltipElements.push(
      <p key="territory">
        <StyledSpan className="name">{data.name}</StyledSpan>
        {getSupplyCenter(territory)}
        {getControlledBy(territoryControlledBy)}
      </p>
    );
  }

  if (piece) {
    tooltipElements.push(
      <p key="piece">
        <StyledSpan className="type">{piece.type}</StyledSpan>
        {getControlledBy(pieceControlledBy)}
      </p>
    );
  }

  return tooltipElements;
};

const Tooltip = (props) => {
  const { tooltip } = props;
  const { territory } = tooltip;

  const data = Utils.matchIdToAbbreviation(territory.id, mapData, mapRef);
  if (!data) return null;

  return <StyledDiv>{getTooltip(data, tooltip)}</StyledDiv>;
};

export default Tooltip;
