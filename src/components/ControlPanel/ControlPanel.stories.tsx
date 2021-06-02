/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as OrderStories from '../Order/Order.stories';
import * as OrderHistorySectionStories from '../OrderHistorySection/OrderHistorySection.stories';

import Component from './ControlPanel';

export default {
  title: 'ControlPanel',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  numOrdersToGive: 3,
  numOrdersGiven: 0,
};

export const PreviousTurn: Story = Template.bind({});
PreviousTurn.args = {
  ...defaultArgs,
  currentTurn: false,
  nationOrderHistories:
    OrderHistorySectionStories.Default.args.nationOrderHistories,
};

export const CurrentTurn: Story = Template.bind({});
CurrentTurn.args = {
  ...defaultArgs,
  currentTurn: true,
  numOrdersGiven: 3,
  orders: [
    OrderStories.Default.args.order,
    OrderStories.Default.args.order,
    OrderStories.Loading.args.order,
  ],
};
