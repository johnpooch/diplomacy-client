import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from '../styles';
import { fontSizes, spacing } from '../variables';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  align-items: center;

  .active-turn {
    padding: 0 ${spacing[3]}px;
    text-align: center;
  }

  span {
    text-transform: capitalize;
    display: inline-block;

    &.year {
      margin-left: ${spacing[0]}px;
    }

    &.phase {
      display: block;
      margin-top: ${spacing[0]}px;
      font-size: ${fontSizes.sans[2]}px;
    }
  }
`;

const TurnStatus = (props) => {
  const { turn, _click } = props;
  const { previous_turn: previousTurn, next_turn: nextTurn } = turn;

  return (
    <StyledDiv>
      <IconButton
        className="previous"
        disabled={previousTurn === null}
        onClick={() => {
          if (previousTurn) {
            _click(previousTurn);
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
      <div className="active-turn">
        <div>
          <span className="season">{turn.season}</span>
          <span className="year">{turn.year}</span>
        </div>
        <div>
          <span className="phase">{turn.phase}</span>
        </div>
      </div>
      <IconButton
        className="next"
        disabled={nextTurn === null}
        onClick={() => {
          if (nextTurn) {
            _click(nextTurn);
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </IconButton>
    </StyledDiv>
  );
};

export default TurnStatus;
