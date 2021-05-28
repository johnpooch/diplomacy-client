/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as TurnSummaryStories from '../TurnSummary/TurnSummary.stories';

import Component from './TurnNav';

export default {
  title: 'TurnNav',
  component: Component,
} as Meta;

const defaultArgs = {
  setTurn: (value) => console.log(value),
  turn: TurnSummaryStories.SpringOrder1901.args.turn,
  turnNavIds: {
    first: 1,
    previous: 1,
    next: 3,
    current: 3,
  },
};

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const FirstTurn: Story = Template.bind({});
FirstTurn.args = {
  ...defaultArgs,
  turnNavIds: { ...defaultArgs.turnNavIds, previous: null },
};

export const LastTurn: Story = Template.bind({});
LastTurn.args = {
  ...defaultArgs,
  turnNavIds: { ...defaultArgs.turnNavIds, next: null },
};

export const OnlyTurn: Story = Template.bind({});
OnlyTurn.args = {
  ...defaultArgs,
  turnNavIds: { ...defaultArgs.turnNavIds, previous: null, next: null },
};
