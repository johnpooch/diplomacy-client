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
  left: ${(props) => props.mousePos.x}px;
  top: ${(props) => props.mousePos.y}px;

  div:not(:first-of-type) {
    margin-top: ${spacing[0]}px;
  }
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

const getSupplyCenter = (data) => {
  if (data.supply) {
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

const getTooltip = (data, props) => {
  const { territoryControlledBy, piece, pieceControlledBy } = props;

  const tooltip = [];

  if (data.name) {
    tooltip.push(
      <div key="territory">
        <StyledSpan className="name">{data.name}</StyledSpan>
        {getSupplyCenter(data)}
        {getControlledBy(territoryControlledBy)}
      </div>
    );
  }

  if (piece) {
    tooltip.push(
      <div key="piece">
        <StyledSpan className="type">{piece.type}</StyledSpan>
        {getControlledBy(pieceControlledBy)}
      </div>
    );
  }

  return tooltip;
};

const Tooltip = (props) => {
  const { mousePos, territoryState } = props;
  const data = Utils.getObjectByKey(
    territoryState.territory,
    mapData.territories
  );
  if (!data) return null;
  return <StyledDiv mousePos={mousePos}>{getTooltip(data, props)}</StyledDiv>;
};

export default Tooltip;
