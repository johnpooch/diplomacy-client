import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  border-bottom: ${sizes.border}px solid
    ${(props) => (props.color ? props.color : 'transparent')};
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
  return (
    <StyledSpan className="supply">
      <FontAwesomeIcon icon={faStar} />
    </StyledSpan>
  );
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
  const { game, territory } = props;
  const { controlledBy, piece } = territory;
  const territoryControlledBy = game.getNation(controlledBy);

  const elements = [];

  elements.push(
    <p key="territory">
      <StyledSpan className="name">{territory.name}</StyledSpan>
      {renderSupplyCenter(territory)}
      {renderControlledBy(territoryControlledBy)}
    </p>
  );

  if (piece) {
    const { nation } = piece;
    const pieceControlledBy = game.getNation(nation);
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
