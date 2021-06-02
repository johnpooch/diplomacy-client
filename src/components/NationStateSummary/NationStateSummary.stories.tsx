import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';

import Component from './NationStateSummary';

export default {
  title: 'NationStateSummary',
  component: Component,
} as Meta;

const defaultArgs = {
  nation: nations.england,
  numSupplyCenters: 3,
  username: 'johnpooch',
};

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};
