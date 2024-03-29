import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import Input from '../../Input/Input';
import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';

import Form from './Form';

export default {
  title: 'Form',
  component: Form,
} as Meta;

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

export const Default: Story = Template.bind({});
Default.args = {
  buttonLabel: 'Login',
  errors: {},
  onSubmit: (data) => console.log(data),
};
