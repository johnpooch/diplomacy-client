import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import { ForgotPassword } from './ForgotPassword';

export default {
  title: 'Pages/ForgotPassword',
  component: ForgotPassword,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof ForgotPassword>> = (args) => (
  <ForgotPassword {...args} />
);

const defaultArgs = {
  errors: {},
  onSubmit: ({ email }) => console.log(email),
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const FieldError: Story = Template.bind({});
FieldError.args = {
  ...defaultArgs,
  errors: {
    email: ['Email is invalid'],
  },
};

export const NonFieldError: Story = Template.bind({});
NonFieldError.args = {
  ...defaultArgs,
  errors: {
    non_field_errors: [
      'The username or password you entered do not match an account. Please try again.',
    ],
  },
};
