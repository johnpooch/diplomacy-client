import { ChangeEventHandler } from 'react';

import { BrowseGameFilterChoices } from '../../types';

export interface BrowseGameFilterComponentProps {
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  selected: BrowseGameFilterChoices;
}
