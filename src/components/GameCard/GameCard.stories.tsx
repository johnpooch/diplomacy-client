/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { GameStatus } from '../../game/types';
import * as GameParticipantListStories from '../GameParticipantList/GameParticipantList.stories';

import GameCard from './GameCard';

export default {
  title: 'GameCard',
  component: GameCard,
} as Meta;

const Template: Story<ComponentProps<typeof GameCard>> = (args) => (
  <GameCard {...args} />
);

const defaultGame = {
  joinable: false,
  name: 'Game title',
  participants: [],
  phase: null,
  rules: {
    buildDeadline: '24hrs',
    orderDeadline: '24hrs',
    retreatDeadline: '24hrs',
  },
  turn: null,
  status: GameStatus.PENDING,
  userIsParticipant: false,
  variant: 'Standard',
};

export const PendingJoinable: Story = Template.bind({});
PendingJoinable.args = {
  game: {
    ...defaultGame,
    joinable: true,
    participants: GameParticipantListStories.Pending.args.participants,
  },
};

export const PendingNotJoinable: Story = Template.bind({});
PendingNotJoinable.args = {
  game: {
    ...defaultGame,
    participants: GameParticipantListStories.Pending.args.participants,
  },
};

export const PendingUserIsParticipant: Story = Template.bind({});
PendingUserIsParticipant.args = {
  game: {
    ...defaultGame,
    participants:
      GameParticipantListStories.PendingUserIsParticipant.args.participants,
  },
};

export const PendingNoParticipantsJoinable: Story = Template.bind({});
PendingNoParticipantsJoinable.args = {
  game: { ...defaultGame, joinable: true },
};

export const PendingNoParticipantsNotJoinable: Story = Template.bind({});
PendingNoParticipantsNotJoinable.args = {
  game: { ...defaultGame },
};

export const ActiveJoinable: Story = Template.bind({});
ActiveJoinable.args = {
  game: {
    ...defaultGame,
    joinable: true,
    status: GameStatus.ACTIVE,
    turn: {
      year: 1900,
      phase: 'Spring',
      season: 'Order',
    },
    participants: GameParticipantListStories.ActiveJoinable.args.participants,
  },
};

// export const PendingIsUser: Story = Template.bind({});
// PendingIsUser.args = {
//   ...defaultArgs,
//   isCurrentUser: true,
// };

// export const ActiveDefault: Story = Template.bind({});
// ActiveDefault.args = {
//   ...defaultArgs,
//   nation: 'standard-england',
// };

// export const ActiveIsUser: Story = Template.bind({});
// ActiveIsUser.args = {
//   ...defaultArgs,
//   isCurrentUser: true,
//   nation: 'standard-england',
// };
