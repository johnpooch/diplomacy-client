import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// import { getObjectByKey } from '../utils';
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
    min-width: 120px;
    text-align: center;
  }

  span {
    text-transform: capitalize;
    display: inline-block;

    &.year {
      margin-left: ${spacing[0]}px;
    }
  }
`;

const TurnNav = (props) => {
  const { turns, activeTurn, _click } = props;
  const { id } = activeTurn;

  console.log(turns);
  console.log(activeTurn);

  const currentTurnIndex = turns.findIndex((obj) => obj.current_turn === true);
  const activeIndex = turns.findIndex((obj) => obj.id === id);

  const renderPrevious = () => {
    console.log(activeIndex);
    console.log(turns.length);

    if (activeIndex >= turns.length - 1) return null;
    return (
      <IconButton
        className="previous"
        onClick={() => {
          _click(2);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
    );
  };

  const renderNext = () => {
    if (activeIndex === currentTurnIndex) return null;
    return (
      <IconButton
        className="next"
        onClick={() => {
          _click(3);
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </IconButton>
    );
  };

  return (
    <StyledNav>
      {renderPrevious()}
      <p className="active-turn">
        <span className="season">{activeTurn.season}</span>
        <span className="year">{activeTurn.year}</span>
      </p>
      {renderNext()}
    </StyledNav>
  );
};

export default TurnNav;
