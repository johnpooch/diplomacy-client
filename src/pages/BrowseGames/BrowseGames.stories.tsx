/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as GameCardStories from '../../components/GameCard/GameCard.stories';

import BrowseGames from './BrowseGames';

export default {
  title: 'Pages/BrowseGames',
  component: BrowseGames,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof BrowseGames>> = (args) => (
  <BrowseGames {...args} />
);

export const Default = Template.bind({});
Default.args = {
  games: [
    GameCardStories.PendingJoinable.args.game,
    GameCardStories.PendingNotJoinable.args.game,
    GameCardStories.PendingUserIsParticipant.args.game,
    GameCardStories.PendingNoParticipantsJoinable.args.game,
    GameCardStories.PendingNoParticipantsNotJoinable.args.game,
    GameCardStories.ActiveJoinable.args.game,
  ],
};
