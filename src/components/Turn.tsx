/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLAttributes, ReactElement } from 'react';

import { toTitleCase } from '../utils';

export type turnType = {
  phase: string;
  season: string;
  year: number;
  nextTurn?: number;
  previousTurn?: number;
};

interface ITurn extends HTMLAttributes<HTMLDivElement> {
  turn: turnType;
}

const Turn = ({ turn, ...rest }: ITurn): ReactElement => {
  return (
    <div className="turn" {...rest}>
      <span className="phase">{turn.phase}</span>,{' '}
      <span className="season">{toTitleCase(turn.season)}</span>{' '}
      <span className="year">{turn.year}</span>
    </div>
  );
};

export default Turn;
