/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof NavBar>> = (args) => (
  <NavBar {...args} />
);

export const Default = Template.bind({});
