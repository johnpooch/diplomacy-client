import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import { nations } from '../data';
import * as TurnNavStories from '../TurnNav/TurnNav.stories';

import Component from './GameNavBar';

export default {
  title: 'GameNavBar',
  component: Component,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  onClickOpenControlPanel: () => console.log('Open control panel'),
  nation: nations.england,
  ...TurnNavStories.Default.args,
};
