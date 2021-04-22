/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLAttributes, ReactElement } from 'react';

export type turnType = {
  phaseDisplay: string;
  seasonDisplay: string;
  year: number;
  nextTurn?: number;
  previousTurn?: number;
};

interface Turn extends HTMLAttributes<HTMLDivElement> {
  turn: turnType;
}

interface TurnEnd {
  turnEnd: string;
}

const Turn = ({ turn, ...rest }: Turn): ReactElement => {
  return (
    <div className="turn" {...rest}>
      <span className="phase">{turn.phaseDisplay}</span>,{' '}
      <span className="season">{turn.seasonDisplay}</span>{' '}
      <span className="year">{turn.year}</span>
    </div>
  );
};

export const TurnEnd = ({ turnEnd }: TurnEnd): ReactElement => {
  const d = new Date(turnEnd);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const dateString = d.toLocaleString('en-UK', dateOptions);
  return turnEnd ? <span>Deadline: {dateString}</span> : null;
};

export default Turn;
