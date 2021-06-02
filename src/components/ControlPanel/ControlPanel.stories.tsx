import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as OrderHistoryStories from '../OrderHistory/OrderHistory.stories';

import Component from './ControlPanel';

export default {
  title: 'ControlPanel',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {};

export const PreviousTurn: Story = Template.bind({});
PreviousTurn.args = {
  ...defaultArgs,
  currentTurn: false,
  nationStates: [OrderHistoryStories.Order.args.nationState],
};

export const CurrentTurn: Story = Template.bind({});
CurrentTurn.args = {
  ...defaultArgs,
  currentTurn: true,
  nationStates: [OrderHistoryStories.Order.args.nationState],
};
