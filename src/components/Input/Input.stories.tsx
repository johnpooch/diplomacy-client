/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import GlobalStyles from '../../globalStyles';
import { theme } from '../../theme';

import Input from './Input';

export default {
  title: 'Input',
  component: Input,
};

const Template: Story<ComponentProps<typeof Input>> = (args) => (
  <>
    <GlobalStyles />
    <Input {...args} />
  </>
);

const defaultArgs = {
  required: true,
  theme,
};

export const UsernameOrEmail = Template.bind({});
UsernameOrEmail.args = {
  ...defaultArgs,
  placeholder: 'Username or email',
  type: 'text',
  id: 'username',
  name: 'username',
  autocomplete: 'username',
  autoCapitalize: 'off',
};

export const Password = Template.bind({});
Password.args = {
  ...defaultArgs,
  placeholder: 'Password',
  type: 'password',
  id: 'password',
  name: 'password',
  autocomplete: 'password',
};
