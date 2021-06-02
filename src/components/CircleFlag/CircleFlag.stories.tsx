import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';

import CircleFlag from './CircleFlag';

export default {
  title: 'CircleFlag',
  component: CircleFlag,
} as Meta;

const Template: Story<ComponentProps<typeof CircleFlag>> = (args) => (
  <CircleFlag {...args} />
);

export const EnglandMedium: Story = Template.bind({});
EnglandMedium.args = {
  nation: nations.england,
};

export const FranceMedium: Story = Template.bind({});
FranceMedium.args = {
  nation: nations.france,
};

export const GermanyMedium: Story = Template.bind({});
GermanyMedium.args = {
  nation: nations.germany,
};

export const RussiaMedium: Story = Template.bind({});
RussiaMedium.args = {
  nation: nations.russia,
};

export const TurkeyMedium: Story = Template.bind({});
TurkeyMedium.args = {
  nation: nations.turkey,
};

export const AustriaMedium: Story = Template.bind({});
AustriaMedium.args = {
  nation: nations.austriaHungary,
};

export const NoTooltip: Story = Template.bind({});
NoTooltip.args = {
  showTooltip: false,
  nation: nations.austriaHungary,
};
