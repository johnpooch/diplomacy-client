/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './Alert';

export default {
  title: 'Alert',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args}>Join</Component>
);

const defaultArgs = {
  onClose: () => null,
};

const successAlert = {
  id: 1,
  category: 'success',
  message: 'You have registered successfully!',
};

const errorAlert = {
  id: 2,
  category: 'error',
  message: 'Something has gone wrong...',
};

export const Success: Story = Template.bind({});
Success.args = { ...defaultArgs, alert: successAlert };

export const Error: Story = Template.bind({});
Error.args = { ...defaultArgs, alert: errorAlert };
