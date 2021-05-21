/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import { ResetPassword } from './ResetPassword';

export default {
  title: 'Pages/ResetPassword',
  component: ResetPassword,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof ResetPassword>> = (args) => (
  <ResetPassword {...args} />
);

const defaultArgs = {
  errors: {},
  onSubmit: ({ password }) => console.log(password),
  history: {
    push: () => null,
  },
  location: {
    search: {
      get: (val: string) => val,
    },
  },
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const FieldError: Story = Template.bind({});
FieldError.args = {
  ...defaultArgs,
  errors: {
    password: ['Password is invalid'],
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
