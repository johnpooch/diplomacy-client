import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import UserDropdownMenu from './UserDropdownMenu';

export default {
  title: 'UserDropdownMenu',
  component: UserDropdownMenu,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof UserDropdownMenu>> = (args) => (
  <UserDropdownMenu {...args} />
);

export const Default: Story = Template.bind({});
