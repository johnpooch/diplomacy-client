/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as OrderHistorySectionStories from '../OrderHistorySection/OrderHistorySection.stories';
import * as OrderListStories from '../OrderList/OrderList.stories';

import Component from './ControlPanel';

export default {
  title: 'ControlPanel',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  open: true,
};

export const PreviousTurn: Story = Template.bind({});
PreviousTurn.args = {
  ...defaultArgs,
  currentTurn: false,
  nationOrderHistories:
    OrderHistorySectionStories.Default.args.nationOrderHistories,
};

export const PreviousTurnClosed: Story = Template.bind({});
PreviousTurnClosed.args = {
  ...defaultArgs,
  open: false,
  currentTurn: false,
  nationOrderHistories:
    OrderHistorySectionStories.Default.args.nationOrderHistories,
};

export const CurrentTurn: Story = Template.bind({});
CurrentTurn.args = {
  ...defaultArgs,
  currentTurn: true,
  ...OrderListStories.MultipleOrders.args,
};

export const CurrentTurnClosed: Story = Template.bind({});
CurrentTurnClosed.args = {
  ...defaultArgs,
  open: false,
  currentTurn: true,
  ...OrderListStories.MultipleOrders.args,
};
