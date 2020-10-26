import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { colors, fontSizes, sizes, spacing } from '../variables';
import { nationStateConstants } from '../store/nationStates';

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

const TerritorySummary = ({ nation, territory }) => {
  const {
    controlled_by: controlledBy,
    supply_center: supplyCenter,
    name,
  } = territory;
  const color = colors.nations[controlledBy];
  const elements = [];

  elements.push(
    <p key="territory">
      <StyledSpan className="name">{name}</StyledSpan>
      {supplyCenter ? (
        <StyledSpan className="supply">
          <FontAwesomeIcon icon={faStar} />
        </StyledSpan>
      ) : null}
      <StyledSpan className="nation" color={color}>
        ({nation.name})
      </StyledSpan>
    </p>
  );

  return <StyledDiv>{elements}</StyledDiv>;
};

export default TerritorySummary;
