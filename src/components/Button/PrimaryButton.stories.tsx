import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { Cancel } from '../Icon';

import { PrimaryButton } from './Button';

export default {
  title: 'Button',
  component: PrimaryButton,
} as Meta;

const Template: Story<ComponentProps<typeof PrimaryButton>> = (args) => (
  <PrimaryButton {...args}>Join</PrimaryButton>
);

export const PrimaryLabelOnly: Story = Template.bind({});

export const PrimaryLabelAndIcon: Story = Template.bind({});
PrimaryLabelAndIcon.args = {
  startIcon: <Cancel />,
};

export const PrimaryDisabled: Story = Template.bind({});
PrimaryDisabled.args = {
  ...PrimaryLabelAndIcon.args,
  disabled: true,
};
