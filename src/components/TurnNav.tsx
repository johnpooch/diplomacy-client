import React, { ReactElement } from 'react';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { IconButton } from './Button';
import Turn, { turnType } from './Turn';

const StyledTurnNav = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 1fr 1fr;
  grid-column-gap: ${(p) => p.theme.space[0]};
  padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[0]};

  button {
    background: ${(p) => p.theme.colors.muted};
    &:hover {
      background: ${(p) => p.theme.colors.primary};
    }
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
        icon={faAngleDoubleLeft}
        onClick={() => setTurn('FIRST')}
        disabled={Boolean(!turn.previousTurn)}
        title={titles.FIRST}
      />
      <IconButton
        icon={faChevronLeft}
        onClick={() => setTurn(turn.previousTurn)}
        disabled={Boolean(!turn.previousTurn)}
        title={titles.PREVIOUS}
      />
      <Turn turn={turn} title="Active turn" />
      <IconButton
        icon={faChevronRight}
        onClick={() => setTurn(turn.nextTurn)}
        disabled={Boolean(!turn.nextTurn)}
        title={titles.NEXT}
      />
      <IconButton
        icon={faAngleDoubleRight}
        onClick={() => setTurn('CURRENT')}
        disabled={Boolean(!turn.nextTurn)}
        title={titles.CURRENT}
      />
    </StyledTurnNav>
  );
};

export default TurnNav;
