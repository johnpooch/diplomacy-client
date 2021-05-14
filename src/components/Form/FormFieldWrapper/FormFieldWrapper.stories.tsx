/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Input from '../../Input/Input';
import * as InputStories from '../../Input/Input.stories';

import FormFieldWrapper from './FormFieldWrapper';

export default {
  title: 'FormFieldWrapper',
  component: FormFieldWrapper,
};

const Template: Story<ComponentProps<typeof FormFieldWrapper>> = (args) => (
  <FormFieldWrapper {...args} />
);

const defaultArgs = {
  label: 'Username or email',
};

export const UsernameOrEmail = Template.bind({});
UsernameOrEmail.args = {
  ...defaultArgs,
  name: InputStories.UsernameOrEmail.args.name,
  field: { ...InputStories.UsernameOrEmail.args, fieldClass: Input },
};

export const Password = Template.bind({});
Password.args = {
  ...defaultArgs,
  label: 'Password',
  name: InputStories.Password.args.name,
  field: { ...InputStories.Password.args, fieldClass: Input },
};

export const SingleError = Template.bind({});
SingleError.args = {
  ...defaultArgs,
  name: InputStories.UsernameOrEmail.args.name,
  field: { ...InputStories.UsernameOrEmail.args, fieldClass: Input },
  errors: ['Username not recognized'],
};

export const MultipleErrors = Template.bind({});
MultipleErrors.args = {
  ...defaultArgs,
  name: InputStories.UsernameOrEmail.args.name,
  field: { ...InputStories.UsernameOrEmail.args, fieldClass: Input },
  errors: ['Username not recognized', 'Other error message'],
};
