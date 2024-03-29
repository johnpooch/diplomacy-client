import React from 'react';

import { Typography } from '../MaterialUI';

import { TurnSummaryComponentProps } from './TurnSummary.types';

const TurnSummary: React.FC<TurnSummaryComponentProps> = ({ turn }) => {
  const bull = <span>•</span>;
  return (
    <Typography variant="body1" component="span" color="textPrimary">
      {turn.season} {bull} {turn.year} {bull} {turn.phase}
    </Typography>
  );
};

export default TurnSummary;
