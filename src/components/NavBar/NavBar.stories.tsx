import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof NavBar>> = (args) => (
  <NavBar {...args} />
);

export const Default: Story = Template.bind({});
