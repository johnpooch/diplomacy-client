import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import { Register as Component } from './Register';

export default {
  title: 'Pages/Register',
  component: Component,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  onSubmit: ({ email, username, password }) =>
    console.log(email, username, password),
  errors: {},
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const FieldError: Story = Template.bind({});
FieldError.args = {
  ...defaultArgs,
  errors: {
    email: ['This email is already registered'],
  },
};

export const NonFieldError: Story = Template.bind({});
NonFieldError.args = {
  ...defaultArgs,
  errors: {
    non_field_errors: ['Internal server error'],
  },
};
