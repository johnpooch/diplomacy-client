/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';

import CircleFlag from './CircleFlag';

export default {
  title: 'CircleFlag',
  component: CircleFlag,
};

const Template: Story<ComponentProps<typeof CircleFlag>> = (args) => (
  <CircleFlag {...args} />
);

export const EnglandMedium = Template.bind({});
EnglandMedium.args = {
  nation: nations.england,
};

export const FranceMedium = Template.bind({});
FranceMedium.args = {
  nation: nations.france,
};

export const GermanyMedium = Template.bind({});
GermanyMedium.args = {
  nation: nations.germany,
};

export const RussiaMedium = Template.bind({});
RussiaMedium.args = {
  nation: nations.russia,
};

export const TurkeyMedium = Template.bind({});
TurkeyMedium.args = {
  nation: nations.turkey,
};

export const AustriaMedium = Template.bind({});
AustriaMedium.args = {
  nation: nations.austriaHungary,
};

export const NoTooltip = Template.bind({});
NoTooltip.args = {
  showTooltip: false,
  nation: nations.austriaHungary,
};
