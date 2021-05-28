/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './TurnSummary';

export default {
  title: 'TurnSummary',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const SpringOrder1901: Story = Template.bind({});
SpringOrder1901.args = {
  turn: {
    phase: 'Order',
    season: 'Spring',
    year: 1901,
  },
};
