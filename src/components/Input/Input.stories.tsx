import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Input from './Input';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <Input {...args} />
);

const defaultArgs = {
  required: true,
};

export const UsernameOrEmail: Story = Template.bind({});
UsernameOrEmail.args = {
  ...defaultArgs,
  placeholder: 'Username or email',
  type: 'text',
  id: 'username',
  name: 'username',
  autoComplete: 'username',
  autoCapitalize: 'off',
};

export const Password: Story = Template.bind({});
Password.args = {
  ...defaultArgs,
  placeholder: 'Password',
  type: 'password',
  id: 'password',
  name: 'password',
  autoComplete: 'password',
};
