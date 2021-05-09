/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import GlobalStyles from '../../globalStyles';
import { theme } from '../../theme';
import * as InputStories from '../Input/Input.stories';

import FormField from './FormField';

export default {
  title: 'FormField',
  component: FormField,
};

const Template: Story<ComponentProps<typeof FormField>> = (args) => (
  <>
    <GlobalStyles />
    <FormField {...args} />
  </>
);

const defaultArgs = {
  label: 'Username or email',
  theme,
};

export const UsernameOrEmail = Template.bind({});
UsernameOrEmail.args = {
  ...defaultArgs,
  name: InputStories.UsernameOrEmail.args.name,
  field: (
    <InputStories.UsernameOrEmail {...InputStories.UsernameOrEmail.args} />
  ),
};

export const Password = Template.bind({});
Password.args = {
  ...defaultArgs,
  label: 'Password',
  name: InputStories.Password.args.name,
  field: <InputStories.Password {...InputStories.Password.args} />,
};

export const SingleError = Template.bind({});
SingleError.args = {
  ...defaultArgs,
  name: InputStories.UsernameOrEmail.args.name,
  field: (
    <InputStories.UsernameOrEmail {...InputStories.UsernameOrEmail.args} />
  ),
  errors: ['Username not recognized'],
};

export const MultipleErrors = Template.bind({});
MultipleErrors.args = {
  ...defaultArgs,
  name: InputStories.UsernameOrEmail.args.name,
  field: (
    <InputStories.UsernameOrEmail {...InputStories.UsernameOrEmail.args} />
  ),
  errors: ['Username not recognized', 'Other error message'],
};
