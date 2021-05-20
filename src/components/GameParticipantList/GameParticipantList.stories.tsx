/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { nations } from '../data';

import GameParticipantList from './GameParticipantList';

export default {
  title: 'GameParticipantList',
  component: GameParticipantList,
} as Meta;

const Template: Story<ComponentProps<typeof GameParticipantList>> = (args) => (
  <GameParticipantList {...args} />
);

const firstUser = {
  username: 'johnpooch',
  nation: null,
  isCurrentUser: false,
};

const secondUser = {
  username: 'niall',
  nation: null,
  isCurrentUser: false,
};

export const Pending: Story = Template.bind({});
Pending.args = {
  joinable: false,
  participants: [{ ...firstUser }, { ...secondUser }],
};
export const PendingNoParticipantsJoinable: Story = Template.bind({});
PendingNoParticipantsJoinable.args = {
  joinable: true,
  participants: [],
};
export const PendingNoParticipantsNotJoinable: Story = Template.bind({});
PendingNoParticipantsNotJoinable.args = {
  joinable: false,
  participants: [],
};
export const PendingJoinable: Story = Template.bind({});
PendingJoinable.args = {
  joinable: true,
  participants: [{ ...firstUser }, { ...secondUser }],
};
export const PendingUserIsParticipant: Story = Template.bind({});
PendingUserIsParticipant.args = {
  joinable: false,
  participants: [{ ...firstUser }, { ...secondUser, isCurrentUser: true }],
};
export const Active: Story = Template.bind({});
Active.args = {
  joinable: false,
  participants: [
    { ...firstUser, nation: nations.england },
    { ...secondUser, nation: nations.france },
  ],
};
export const ActiveJoinable: Story = Template.bind({});
ActiveJoinable.args = {
  joinable: true,
  participants: [
    { ...firstUser, nation: nations.england },
    { ...secondUser, nation: nations.france },
  ],
};
export const ActiveUserIsParticipant: Story = Template.bind({});
ActiveUserIsParticipant.args = {
  joinable: false,
  participants: [
    { ...firstUser, nation: nations.england },
    { ...secondUser, nation: nations.france, isCurrentUser: true },
  ],
};
