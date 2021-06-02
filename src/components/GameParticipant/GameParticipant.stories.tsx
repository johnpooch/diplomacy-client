import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';

import GameParticipant from './GameParticipant';

export default {
  title: 'GameParticipant',
  component: GameParticipant,
} as Meta;

const Template: Story<ComponentProps<typeof GameParticipant>> = (args) => (
  <GameParticipant {...args} />
);

const defaultArgs = {
  isCurrentUser: false,
  username: 'johnpooch',
};

export const PendingDefault: Story = Template.bind({});
PendingDefault.args = {
  ...defaultArgs,
};

export const PendingIsUser: Story = Template.bind({});
PendingIsUser.args = {
  ...defaultArgs,
  isCurrentUser: true,
};

export const ActiveDefault: Story = Template.bind({});
ActiveDefault.args = {
  ...defaultArgs,
  nation: nations.england,
};

export const ActiveIsUser: Story = Template.bind({});
ActiveIsUser.args = {
  ...defaultArgs,
  isCurrentUser: true,
  nation: nations.england,
};
