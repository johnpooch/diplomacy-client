/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './Alert';

export default {
  title: 'Alert',
  component: Component,
};

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args}>Join</Component>
);

const defaultArgs = {
  onClose: () => null,
};

const successAlert = {
  category: 'success',
  message: 'You have registered successfully!',
};

const errorAlert = {
  category: 'error',
  message: 'Something has gone wrong...',
};

export const Success = Template.bind({});
Success.args = { ...defaultArgs, alert: successAlert };

export const Error = Template.bind({});
Error.args = { ...defaultArgs, alert: errorAlert };
