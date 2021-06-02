import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as AlertStories from '../Alert/Alert.stories';

import Component from './AlertList';

export default {
  title: 'AlertList',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args}>Join</Component>
);

const defaultArgs = {
  onClose: () => null,
};

export const Multiple: Story = Template.bind({});
Multiple.args = {
  ...defaultArgs,
  alerts: [AlertStories.Success.args.alert, AlertStories.Error.args.alert],
};
