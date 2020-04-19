import React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  padding: ${spacing[1]}px;
  pointer-events: none;
  color: white;
  font-size: ${fontSizes.sans.small}px;
  background-color: ${colors.base};

  div:not(:first-of-type) {
    margin-top: ${spacing[0]}px;
  }
`;

const PositionedDiv = styled(StyledDiv)`
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

const StyledSpan = styled.span`
  text-transform: capitalize;
  color: ${(props) => (props.color ? props.color : 'white')};

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
      <div key="territory">
        <StyledSpan className="name">{data.name}</StyledSpan>
        {getSupplyCenter(territory)}
        {getControlledBy(territoryControlledBy)}
      </div>
    );
  }

  if (piece) {
    tooltipElements.push(
      <div key="piece">
        <StyledSpan className="type">{piece.type}</StyledSpan>
        {getControlledBy(pieceControlledBy)}
      </div>
    );
  }

  return tooltipElements;
};

const Tooltip = (props) => {
  const { tooltip } = props;
  const { territory } = tooltip;

  const data = Utils.getObjectByKey(territory.id, mapData.territories);
  if (!data) return null;

  const { pos } = tooltip;
  const { x, y } = pos;

  return (
    <PositionedDiv x={x} y={y}>
      {getTooltip(data, tooltip)}
    </PositionedDiv>
  );
};

export default Tooltip;
