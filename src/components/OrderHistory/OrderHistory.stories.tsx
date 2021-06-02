import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';
import * as OrderStories from '../Order/Order.stories';

import Component from './OrderHistory';

export default {
  title: 'OrderHistory',
  component: Component,
} as Meta;

const defaultArgs = {
  nationState: {
    nation: nations.england,
    numSupplyCenters: 3,
    orders: [],
    username: 'johnpooch',
  },
};

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const NoOrders: Story = Template.bind({});
NoOrders.args = {
  ...defaultArgs,
};

export const Order: Story = Template.bind({});
Order.args = {
  nationState: {
    ...defaultArgs.nationState,
    orders: [OrderStories.Default.args],
  },
};

export const MultipleOrders: Story = Template.bind({});
MultipleOrders.args = {
  nationState: {
    ...defaultArgs.nationState,
    orders: [
      OrderStories.Default.args,
      OrderStories.HistorySuccess.args,
      OrderStories.HistoryFails.args,
    ],
  },
};
