import React from 'react';
import styled from '@emotion/styled';

import { SecondaryButton } from '../styles';
import { colors, sizes, spacing } from '../variables';

const StyledNav = styled.nav`
  position: sticky;
  top: ${sizes.headerHeight}px;
  left: 0;
  right: 0;
  color: ${colors.base};
  padding: ${spacing[1]}px;
  overflow-x: auto;

  ol {
    display: flex;
    justify-content: center;
  }

  li {
    margin: 0 ${spacing[0]}px;
    font-weight: bold;

    &[data-active='false'] {
      opacity: 0.5;
    }
  }

  span {
    text-transform: capitalize;
    display: inline-block;

    &:not(:first-of-type) {
      margin-left: ${spacing[0]}px;
    }
  }
`;

const TurnNav = (props) => {
  const { turns, activeTurn, _click } = props;
  const turnElements = [];
  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const turn = turns[index];
    const isActive = activeTurn.id === turn.id;
    turnElements.push(
      <li key={turn.id} data-active={isActive}>
        <SecondaryButton
          type="button"
          onClick={() => {
            _click(turn.id);
          }}
        >
          <span className="season">{turn.season}</span>
          <span className="year">{turn.year}</span>
          {/* <span className="phase">{turn.phase}</span> */}
        </SecondaryButton>
      </li>
    );
  }
  return (
    <StyledNav>
      <ol>{turnElements}</ol>
    </StyledNav>
  );
};

export default TurnNav;
