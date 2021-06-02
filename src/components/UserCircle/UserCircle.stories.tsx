/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import UserCircle from './UserCircle';

export default {
  title: 'UserCircle',
  component: UserCircle,
} as Meta;

const Template: Story<ComponentProps<typeof UserCircle>> = (args) => (
  <UserCircle {...args} />
);

const defaultArgs = {
  isCurrentUser: false,
  username: 'johnpooch',
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const IsCurrentUser: Story = Template.bind({});
IsCurrentUser.args = {
  ...defaultArgs,
  isCurrentUser: true,
};

export const Small: Story = Template.bind({});
Small.args = {
  ...defaultArgs,
  size: 'sm',
};
