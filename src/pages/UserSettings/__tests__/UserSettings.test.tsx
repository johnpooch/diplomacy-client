import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';
import React from 'react';

import * as stories from '../UserSettings.stories';

describe('UserSettings', () => {
  it('should render all storybook stories without error', () => {
    const allStories = Object.values(composeStories(stories));
    allStories.forEach((Story) => render(<Story />));
  });
});
