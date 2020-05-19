import React from 'react';
import styled from '@emotion/styled';
// import { lighten } from 'polished';

import { colors, fontSizes, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  bottom: ${spacing[2]}px;
  right: ${spacing[2]}px;
  padding: ${spacing[2]}px;
  pointer-events: none;
  font-size: ${fontSizes.sans[2]}px;
  background-color: white;

  p:not(:first-of-type) {
    margin-top: ${spacing[0]}px;
  }
`;

const StyledSpan = styled.span`
  text-transform: capitalize;
  color: ${(props) => (props.color ? props.color : colors.base)};
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
    const { id } = controlledBy;
    // const color = lighten(0.25, colors.nations[controlledBy.id]);
    const color = colors.nations[id];
    return (
      <StyledSpan className="nation" color={color}>
        ({controlledBy.name})
      </StyledSpan>
    );
  }
  return null;
};

const getTooltip = (tooltip) => {
  const {
    territory,
    territoryControlledBy,
    piece,
    pieceControlledBy,
  } = tooltip;

  const tooltipElements = [];

  tooltipElements.push(
    <p key="territory">
      <StyledSpan className="name">{territory.name}</StyledSpan>
      {getSupplyCenter(territory)}
      {getControlledBy(territoryControlledBy)}
    </p>
  );

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
  return <StyledDiv>{getTooltip(tooltip)}</StyledDiv>;
};

export default Tooltip;
