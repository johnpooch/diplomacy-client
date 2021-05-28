/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as OrderOutcomeStories from '../OrderOutcome/OrderOutcome.stories';
import * as OrderSummaryStories from '../OrderSummary/OrderSummary.stories';

import Component from './Order';

export default {
  title: 'Order',
  component: Component,
} as Meta;

const defaultArgs = {
  outcome: null,
  isCurrent: true,
  order: OrderSummaryStories.ArmyHold.args.order,
};

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Loading: Story = Template.bind({});
Loading.args = {
  ...defaultArgs,
  order: { ...OrderSummaryStories.ArmyHold.args.order, loading: true },
};

export const HistorySuccess: Story = Template.bind({});
HistorySuccess.args = {
  ...defaultArgs,
  isCurrent: false,
};

export const HistoryFails: Story = Template.bind({});
HistoryFails.args = {
  ...defaultArgs,
  isCurrent: false,
  outcome: OrderOutcomeStories.Fails.args,
};
