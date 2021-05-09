/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { theme } from '../../theme';
import { CancelIcon } from '../Icon';

import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

const defaultArgs = {
  theme,
};

export const PrimaryLabelOnly = Template.bind({});
PrimaryLabelOnly.args = {
  ...defaultArgs,
  label: 'Join',
  primary: true,
};

export const PrimaryIconOnly = Template.bind({});
PrimaryIconOnly.args = {
  ...defaultArgs,
  icon: <CancelIcon />,
  primary: true,
};

export const PrimaryLabelAndIcon = Template.bind({});
PrimaryLabelAndIcon.args = {
  ...defaultArgs,
  icon: <CancelIcon />,
  label: 'Close',
  primary: true,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  ...PrimaryLabelAndIcon.args,
  disabled: true,
};

export const SecondaryLabelOnly = Template.bind({});
SecondaryLabelOnly.args = {
  ...PrimaryLabelOnly.args,
  primary: false,
};

export const SecondaryIconOnly = Template.bind({});
SecondaryIconOnly.args = {
  ...PrimaryIconOnly.args,
  primary: false,
};

export const SecondaryLabelAndIcon = Template.bind({});
SecondaryLabelAndIcon.args = {
  ...PrimaryLabelAndIcon.args,
  primary: false,
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  ...PrimaryLabelAndIcon.args,
  primary: false,
  disabled: true,
};
