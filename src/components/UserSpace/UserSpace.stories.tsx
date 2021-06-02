import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import UserSpace from './UserSpace';

export default {
  title: 'UserSpace',
  component: UserSpace,
} as Meta;

const Template: Story<ComponentProps<typeof UserSpace>> = (args) => (
  <UserSpace {...args} />
);

export const Default: Story = Template.bind({});

export const Small: Story = Template.bind({});
Small.args = {
  size: 'sm',
};
