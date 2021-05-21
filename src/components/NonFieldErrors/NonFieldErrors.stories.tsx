/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Component from './NonFieldErrors';

export default {
  title: 'NonFieldErrors',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  errors: null,
};

export const NoErrors: Story = Template.bind({});
NoErrors.args = {
  ...defaultArgs,
};

export const SingleError: Story = Template.bind({});
SingleError.args = {
  ...defaultArgs,
  errors: [
    'The username or password you entered do not match an account. Please try again.',
  ],
};

export const MultipleErrors: Story = Template.bind({});
MultipleErrors.args = {
  ...defaultArgs,
  errors: [
    'The username or password you entered do not match an account. Please try again.',
    'Internal server error',
  ],
};
