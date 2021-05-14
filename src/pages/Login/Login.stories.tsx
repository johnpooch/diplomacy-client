/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import Register from './Login';

export default {
  title: 'Pages/Register',
  component: Register,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof Register>> = (args) => (
  <Register {...args} />
);

export const Default = Template.bind({});
