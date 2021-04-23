/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLAttributes, ReactElement } from 'react';

export type turnType = {
  phaseDisplay: string;
  seasonDisplay: string;
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
      <div className="phase">{turn.phaseDisplay}</div>{' '}
      <span className="season">{turn.seasonDisplay}</span>{' '}
      <span className="year">{turn.year}</span>
    </div>
  );
};

export default Turn;
