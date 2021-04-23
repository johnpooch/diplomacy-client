import {
  faFastBackward,
  faFastForward,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { IconButton } from './Button';
import Turn, { turnType } from './Turn';

const StyledTurnNav = styled.div`
  text-align: center;
  align-items: center;
  column-gap: ${(p) => p.theme.space[1]};
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 1fr 1fr;
  padding: ${(p) => p.theme.space[2]};
  color: white;

  button {
    background: ${(p) => p.theme.colors.muted};
    padding: ${(p) => p.theme.space[1]};

    &:not(:disabled):hover {
      background: ${(p) => p.theme.colors.primary};
    }
  }

  .turn {
    line-height: ${(p) => p.theme.lineHeights.display};
  }
`;

interface ITurnNav {
  setTurn: (id: number | string) => void;
  turn: turnType;
}

export const titles = {
  FIRST: 'Show first turn',
  PREVIOUS: 'Show previous turn',
  NEXT: 'Show next turn',
  CURRENT: 'Show current turn',
};

const TurnNav = ({ setTurn, turn }: ITurnNav): ReactElement => {
  return (
    <StyledTurnNav>
      <IconButton
        icon={faFastBackward}
        onClick={() => setTurn('FIRST')}
        disabled={Boolean(!turn.previousTurn)}
        title={titles.FIRST}
      />
      <IconButton
        icon={faStepBackward}
        onClick={() => setTurn(turn.previousTurn)}
        disabled={Boolean(!turn.previousTurn)}
        title={titles.PREVIOUS}
      />
      <Turn turn={turn} title="Active turn" />
      <IconButton
        icon={faStepForward}
        onClick={() => setTurn(turn.nextTurn)}
        disabled={Boolean(!turn.nextTurn)}
        title={titles.NEXT}
      />
      <IconButton
        icon={faFastForward}
        onClick={() => setTurn('CURRENT')}
        disabled={Boolean(!turn.nextTurn)}
        title={titles.CURRENT}
      />
    </StyledTurnNav>
  );
};

export default TurnNav;
