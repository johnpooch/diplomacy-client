/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as OrderStories from '../Order/Order.stories';

import Component from './OrderList';

export default {
  title: 'OrderList',
  component: Component,
} as Meta;

const defaultArgs = {
  numOrdersToGive: 3,
  numOrdersGiven: 0,
  orders: [],
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
  ...defaultArgs,
  numOrdersGiven: 1,
  orders: [OrderStories.Default.args],
};

export const MultipleOrders: Story = Template.bind({});
MultipleOrders.args = {
  ...defaultArgs,
  numOrdersGiven: 3,
  orders: [
    OrderStories.Default.args,
    OrderStories.Default.args,
    OrderStories.Loading.args,
  ],
};
