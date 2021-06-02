import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './ComponentError';

export default {
  title: 'ComponentError',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  error: 'Internal server error.',
};
