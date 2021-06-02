import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import FormLink from './FormLink';

export default {
  title: 'FormLink',
  component: FormLink,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof FormLink>> = (args) => (
  <FormLink {...args} />
);

export const ForgotPassword: Story = Template.bind({});
ForgotPassword.args = {
  prompt: 'Forgotten password?',
  link: '/forgot-password',
  label: 'Reset password',
};

export const CreateAccount: Story = Template.bind({});
CreateAccount.args = {
  prompt: 'Not a member yet?',
  link: '/register',
  label: 'Create an account',
};
