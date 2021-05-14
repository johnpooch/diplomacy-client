/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import UserSpace from './UserSpace';

export default {
  title: 'UserSpace',
  component: UserSpace,
};

const Template: Story<ComponentProps<typeof UserSpace>> = (args) => (
  <UserSpace {...args} />
);

export const Default = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};
