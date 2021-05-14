/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { theme } from '../../theme';
import { Cancel } from '../Icon';

import { PrimaryButton } from './Button';

export default {
  title: 'Button',
  component: PrimaryButton,
};

const Template: Story<ComponentProps<typeof PrimaryButton>> = (args) => (
  <PrimaryButton {...args}>Join</PrimaryButton>
);

const defaultArgs = {
  theme,
};

export const PrimaryLabelOnly = Template.bind({});
PrimaryLabelOnly.args = {
  ...defaultArgs,
};

export const PrimaryLabelAndIcon = Template.bind({});
PrimaryLabelAndIcon.args = {
  ...defaultArgs,
  startIcon: <Cancel />,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  ...PrimaryLabelAndIcon.args,
  disabled: true,
};
