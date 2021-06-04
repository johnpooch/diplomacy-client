import React from 'react';

import { BrowseGameFilterChoices } from '../../types';
import { NativeSelect } from '../MaterialUI';

import UseStyles from './BrowseGameFilter.styles';
import { BrowseGameFilterComponentProps } from './BrowseGameFilter.types';

const BrowseGameFilter: React.FC<BrowseGameFilterComponentProps> = ({
  handleChange,
  selected,
}) => {
  const classes = UseStyles();
  return (
    <NativeSelect
      title="Browse game filter"
      className={classes.root}
      value={selected}
      onChange={handleChange}
    >
      <option value={BrowseGameFilterChoices.USER}>My games</option>
      <option value={BrowseGameFilterChoices.ALL_GAMES}>All games</option>
    </NativeSelect>
  );
};

export default BrowseGameFilter;
