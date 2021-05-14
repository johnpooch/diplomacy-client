/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import ResetPassword from './ResetPassword';

export default {
  title: 'Pages/ResetPassword',
  component: ResetPassword,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof ResetPassword>> = (args) => (
  <ResetPassword {...args} />
);

export const Default = Template.bind({});
