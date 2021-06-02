import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './OrderOutcome';

export default {
  title: 'OrderOutcome',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Fails: Story = Template.bind({});
Fails.args = {
  outcome: 'Fails',
  message: 'Insufficient hold strength',
};

export const Illegal: Story = Template.bind({});
Illegal.args = {
  outcome: 'Illegal',
  message: 'Fleet cannot reach non-adjacent territory',
};
