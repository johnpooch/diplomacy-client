/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import ForgotPassword from './ForgotPassword';

export default {
  title: 'Pages/ForgotPassword',
  component: ForgotPassword,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof ForgotPassword>> = (args) => (
  <ForgotPassword {...args} />
);

export const Default = Template.bind({});
