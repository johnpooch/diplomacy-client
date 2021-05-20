/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as AlertStories from '../Alert/Alert.stories';

import Component from './AlertList';

export default {
  title: 'AlertList',
  component: Component,
};

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args}>Join</Component>
);

const defaultArgs = {
  onClose: () => null,
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...defaultArgs,
  alerts: [AlertStories.Success.args.alert, AlertStories.Error.args.alert],
};