import { IconButton } from '@material-ui/core';
import React from 'react';

import { FastForward, FastRewind, SkipNext, SkipPrevious } from '../Icon';
import TurnSummary from '../TurnSummary';

import useStyles from './TurnNav.styles';
import { TurnNavComponentProps } from './TurnNav.types';

export const titles = {
  FIRST: 'Show first turn',
  PREVIOUS: 'Show previous turn',
  NEXT: 'Show next turn',
  CURRENT: 'Show current turn',
};

const TurnNav: React.FC<TurnNavComponentProps> = ({
  turnNavIds,
  setTurn,
  turn,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => setTurn(turnNavIds.first)}
        disabled={Boolean(!turnNavIds.previous)}
        title={titles.FIRST}
      >
        <FastRewind />
      </IconButton>
      <IconButton
        onClick={() => setTurn(turnNavIds.previous)}
        disabled={Boolean(!turnNavIds.previous)}
        title={titles.PREVIOUS}
      >
        <SkipPrevious />
      </IconButton>
      <TurnSummary turn={turn} />
      <IconButton
        onClick={() => setTurn(turnNavIds.next)}
        disabled={Boolean(!turnNavIds.next)}
        title={titles.NEXT}
      >
        <SkipNext />
      </IconButton>
      <IconButton
        onClick={() => setTurn(turnNavIds.current)}
        disabled={Boolean(!turnNavIds.next)}
        title={titles.CURRENT}
      >
        <FastForward />
      </IconButton>
    </div>
  );
};

export default TurnNav;
