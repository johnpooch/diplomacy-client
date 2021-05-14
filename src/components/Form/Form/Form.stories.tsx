/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Input from '../../Input/Input';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';

import Form from './Form';

export default {
  title: 'Form',
  component: Form,
};

const Template: Story<ComponentProps<typeof Form>> = (args) => {
  const userNameField = {
    fieldClass: Input,
    id: 'username',
    type: 'text',
  };
  const passwordField = {
    fieldClass: Input,
    id: 'password',
    type: 'password',
  };
  return (
    <Form {...args}>
      <FormFieldWrapper
        name="username"
        label="Username"
        errors={[]}
        field={userNameField}
      />
      <FormFieldWrapper
        name="password"
        label="Password"
        errors={[]}
        field={passwordField}
      />
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {
  buttonLabel: 'Login',
  onSubmit: (data) => console.log(data),
};
