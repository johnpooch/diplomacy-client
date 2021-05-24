/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as GameCardStories from '../../components/GameCard/GameCard.stories';

import { Game as Component } from './Game';

export default {
  title: 'Pages/Game',
  component: Component,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  alerts: [],
  alertsClear: () => null,
  errors: [],
  loadGame: () => null,
  loading: false,
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
  game: {},
};
