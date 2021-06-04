import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as GameCardStories from '../../components/GameCard/GameCard.stories';
import { BrowseGameFilterChoices } from '../../types';

import { BrowseGames } from './BrowseGames';

export default {
  title: 'Pages/BrowseGames',
  component: BrowseGames,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
} as Meta;

const Template: Story<ComponentProps<typeof BrowseGames>> = (args) => (
  <BrowseGames {...args} />
);

const defaultArgs = {
  alerts: [],
  alertsClear: () => null,
  browseGameFilter: BrowseGameFilterChoices.USER,
  errors: [],
  loadBrowseGames: () => null,
  logout: () => null,
  loading: false,
  setBrowseGameFilter: (option) => console.log(option),
};

export const Default: Story = Template.bind({});
Default.args = {
  ...defaultArgs,
  games: [
    GameCardStories.PendingJoinable.args.game,
    GameCardStories.PendingNotJoinable.args.game,
    GameCardStories.PendingUserIsParticipant.args.game,
    GameCardStories.PendingNoParticipantsJoinable.args.game,
    GameCardStories.PendingNoParticipantsNotJoinable.args.game,
    GameCardStories.ActiveJoinable.args.game,
  ],
};

export const NoGamesFound: Story = Template.bind({});
NoGamesFound.args = {
  ...defaultArgs,
  games: [],
};

export const Error: Story = Template.bind({});
Error.args = {
  ...defaultArgs,
  errors: [
    "500 Internal Server Error. Please come back later when we've fixed the problem. Thanks.",
  ],
  games: [GameCardStories.PendingJoinable.args.game],
};

export const Loading: Story = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};
