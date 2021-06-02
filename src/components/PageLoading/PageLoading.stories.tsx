import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './PageLoading';

export default {
  title: 'PageLoading',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
