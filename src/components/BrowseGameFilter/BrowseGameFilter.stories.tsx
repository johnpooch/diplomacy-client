import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { BrowseGameFilterChoices } from '../../types';

import Component from './BrowseGameFilter';

export default {
  title: 'BrowseGameFilter',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  handleChange: () => null,
  selected: BrowseGameFilterChoices.NULL,
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const UserGames: Story = Template.bind({});
UserGames.args = {
  ...defaultArgs,
  selected: BrowseGameFilterChoices.USER,
};

export const AllGames: Story = Template.bind({});
AllGames.args = {
  ...defaultArgs,
  selected: BrowseGameFilterChoices.ALL_GAMES,
};
