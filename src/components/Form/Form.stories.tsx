/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import GlobalStyles from '../../globalStyles';
import * as FormFieldStories from '../FormField/FormField.stories';

import Form from './Form';

export default {
  title: 'Form',
  component: Form,
};

const Template: Story<ComponentProps<typeof Form>> = (args) => (
  <>
    <GlobalStyles />
    <Form {...args}>
      <FormFieldStories.UsernameOrEmail
        {...FormFieldStories.UsernameOrEmail.args}
      />
      <FormFieldStories.Password {...FormFieldStories.Password.args} />
    </Form>
  </>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: () => null,
};
