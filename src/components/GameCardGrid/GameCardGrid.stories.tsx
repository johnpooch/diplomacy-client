/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import * as GameCardStories from '../GameCard/GameCard.stories';

import GameCardGrid from './GameCardGrid';

export default {
  title: 'GameCardGrid',
  component: GameCardGrid,
};

const Template: Story<ComponentProps<typeof GameCardGrid>> = () => (
  <GameCardGrid>
    <GameCardStories.ActiveJoinable {...GameCardStories.ActiveJoinable.args} />
    <GameCardStories.PendingUserIsParticipant
      {...GameCardStories.PendingUserIsParticipant.args}
    />
    <GameCardStories.PendingJoinable
      {...GameCardStories.PendingJoinable.args}
    />
  </GameCardGrid>
);

export const Default = Template.bind({});