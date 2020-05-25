import React from 'react';
import styled from '@emotion/styled';

import { colors, fontSizes, sizes, spacing } from '../variables';

const StyledDiv = styled.div`
  pointer-events: none;
  font-size: ${fontSizes.sans[2]}px;

  p:not(:first-of-type) {
    margin-top: ${spacing[0]}px;
  }
`;

const StyledSpan = styled.span`
  text-transform: capitalize;
  /* color: ${(props) => (props.color ? props.color : 'inherit')}; */
  border-bottom: ${sizes.border}px solid ${(props) =>
  props.color ? props.color : 'transparent'};
  user-select: none;

  &:not(:last-of-type):after {
    content: ' ';
  }

  &.name {
    font-weight: bold;
  }
`;

const renderSupplyCenter = (territory) => {
  if (!territory.supply_center) return null;
  return <StyledSpan className="supply">*</StyledSpan>;
};

const renderControlledBy = (controlledBy) => {
  if (controlledBy) {
    const { id } = controlledBy;
    const color = colors.nations[id];
    return (
      <StyledSpan className="nation" color={color}>
        ({controlledBy.name})
      </StyledSpan>
    );
  }
  return null;
};

const TerritorySummary = (props) => {
  const { summary } = props;
  const {
    territory,
    territoryControlledBy,
    piece,
    pieceControlledBy,
  } = summary;

  const elements = [];

  elements.push(
    <p key="territory">
      <StyledSpan className="name">{territory.name}</StyledSpan>
      {renderSupplyCenter(territory)}
      {renderControlledBy(territoryControlledBy)}
    </p>
  );

  if (piece) {
    elements.push(
      <p key="piece">
        <StyledSpan className="type">{piece.type}</StyledSpan>
        {renderControlledBy(pieceControlledBy)}
      </p>
    );
  }

  return <StyledDiv>{elements}</StyledDiv>;
};

export default TerritorySummary;
