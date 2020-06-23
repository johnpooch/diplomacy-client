import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from '../styles';
import { colors, spacing } from '../variables';

const StyledNav = styled.nav`
  position: fixed;
  top: ${spacing[2]}px;
  left: 0;
  right: 0;
  display: grid;
  grid-template: 'previous active next' auto / 1fr auto 1fr;

  .previous {
    grid-area: previous;
    margin-left: auto;
  }

  .next {
    grid-area: next;
    margin-right: auto;
  }

  .active-turn {
    grid-area: active;
    color: white;
    background: ${colors.base};
    padding: ${spacing[2]}px ${spacing[3]}px;
    min-width: 200px;
    text-align: center;
  }

  span {
    text-transform: capitalize;
    display: inline-block;

    &.year {
      margin-left: ${spacing[0]}px;
    }

    &.phase {
      &:before {
        content: '';
        margin-left: ${spacing[0]}px;
      }
    }
  }
`;

const TurnNav = (props) => {
  const { turn, _click } = props;
  const { previous_turn: previousTurn, next_turn: nextTurn } = turn;

  const renderPrevious = () => {
    if (!previousTurn) return null;
    return (
      <IconButton
        className="previous"
        onClick={() => {
          _click(previousTurn);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
    );
  };

  const renderNext = () => {
    if (!nextTurn) return null;
    return (
      <IconButton
        className="next"
        onClick={() => {
          _click(nextTurn);
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </IconButton>
    );
  };

  return (
    <StyledNav>
      {renderPrevious()}
      <div className="active-turn">
        <div>
          <span className="season">{turn.season}</span>
          <span className="year">{turn.year}</span>
          <span className="phase">({turn.phase})</span>
        </div>
      </div>
      {renderNext()}
    </StyledNav>
  );
};

export default TurnNav;
