import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as AlertStories from '../../components/Alert/Alert.stories';

import { Login as Component } from './Login';

export default {
  title: 'Pages/Login',
  component: Component,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultArgs = {
  alerts: [],
  alertsClear: () => null,
  onSubmit: ({ username, password }) => console.log(username, password),
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
    username: ['Username is invalid'],
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

export const WithAlert: Story = Template.bind({});
WithAlert.args = {
  ...defaultArgs,
  alerts: [AlertStories.Success.args.alert],
};
