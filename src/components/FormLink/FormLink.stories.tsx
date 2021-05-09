/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import GlobalStyles from '../../globalStyles';

import FormLink from './FormLink';

export default {
  title: 'FormLink',
  component: FormLink,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof FormLink>> = (args) => (
  <>
    <GlobalStyles />
    <FormLink {...args} />
  </>
);

export const ForgotPassword = Template.bind({});
ForgotPassword.args = {
  prompt: 'Forgotten password?',
  link: '/forgot-password',
  label: 'Reset password',
};
