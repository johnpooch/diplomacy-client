/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import CircleFlag from '../CircleFlag/CircleFlag';
import { SupplyCenter } from '../Icon';
import { Typography } from '../MaterialUI';

import useStyles from './NationStateSummary.styles';
import { NationStateSummaryComponentProps } from './NationStateSummary.types';

const NationStateSummary: React.FC<NationStateSummaryComponentProps> = ({
  nationState,
}) => {
  const classes = useStyles();
  const { nation, numSupplyCenters, username } = nationState;
  return (
    <div className={classes.root}>
      <CircleFlag nation={nation} size="sm" />
      <Typography variant="body1">{username}</Typography>
      <SupplyCenter titleAccess="Number of supply centers" />
      <Typography variant="body2">{numSupplyCenters}</Typography>
    </div>
  );
};

export default NationStateSummary;
