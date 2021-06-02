import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import { UserSettings } from './UserSettings';

export default {
  title: 'Pages/UserSettings',
  component: UserSettings,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const defaultArgs = {
  errors: {},
  onSubmit: (data) => console.log(data),
};

const Template: Story<ComponentProps<typeof UserSettings>> = (args) => (
  <UserSettings {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const FieldError: Story = Template.bind({});
FieldError.args = {
  ...defaultArgs,
  errors: {
    current_password: ['Password is invalid'],
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
