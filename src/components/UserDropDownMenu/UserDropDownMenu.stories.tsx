/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import UserDropdownMenu from './UserDropdownMenu';

export default {
  title: 'UserDropdownMenu',
  component: UserDropdownMenu,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof UserDropdownMenu>> = (args) => (
  <UserDropdownMenu {...args} />
);

export const Default = Template.bind({});
