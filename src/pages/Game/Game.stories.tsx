/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as ControlPanelStories from '../../components/ControlPanel/ControlPanel.stories';
import * as GameNavBarStories from '../../components/GameNavBar/GameNavBar.stories';
import * as OrderHistorySectionStories from '../../components/OrderHistorySection/OrderHistorySection.stories';
import * as TurnSummaryStories from '../../components/TurnSummary/TurnSummary.stories';

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
  ...GameNavBarStories.Default.args,
};

export const Current: Story = Template.bind({});
Current.args = {
  ...defaultArgs,
  currentTurn: true,
  nationOrderHistories: [],
  orders: ControlPanelStories.CurrentTurn.args.orders,
  numOrdersToGive: 3,
};

export const History: Story = Template.bind({});
History.args = {
  ...defaultArgs,
  currentTurn: false,
  nationOrderHistories:
    OrderHistorySectionStories.Default.args.nationOrderHistories,
  orders: [],
  numOrdersToGive: null,
};

export const Loading: Story = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};

export const Error: Story = Template.bind({});
Error.args = {
  ...defaultArgs,
  errors: [
    "500 Internal Server Error. Please come back later when we've fixed the problem. Thanks.",
  ],
};
