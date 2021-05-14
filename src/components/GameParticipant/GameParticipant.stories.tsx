/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';

import GameParticipant from './GameParticipant';

export default {
  title: 'GameParticipant',
  component: GameParticipant,
};

const Template: Story<ComponentProps<typeof GameParticipant>> = (args) => (
  <GameParticipant {...args} />
);

const defaultArgs = {
  isCurrentUser: false,
  username: 'johnpooch',
};

export const PendingDefault = Template.bind({});
PendingDefault.args = {
  ...defaultArgs,
};

export const PendingIsUser = Template.bind({});
PendingIsUser.args = {
  ...defaultArgs,
  isCurrentUser: true,
};

export const ActiveDefault = Template.bind({});
ActiveDefault.args = {
  ...defaultArgs,
  nation: nations.england,
};

export const ActiveIsUser = Template.bind({});
ActiveIsUser.args = {
  ...defaultArgs,
  isCurrentUser: true,
  nation: nations.england,
};
