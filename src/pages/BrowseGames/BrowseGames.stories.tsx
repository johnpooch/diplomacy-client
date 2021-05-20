/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Story } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';

import * as AlertStories from '../../components/Alert/Alert.stories';
import * as GameCardStories from '../../components/GameCard/GameCard.stories';

import { BrowseGames } from './BrowseGames';

export default {
  title: 'Pages/BrowseGames',
  component: BrowseGames,
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

const Template: Story<ComponentProps<typeof BrowseGames>> = (args) => (
  <BrowseGames {...args} />
);

const defaultArgs = {
  alerts: [],
  alertsClear: () => null,
  loadBrowseGames: () => null,
  logout: () => null,
  loading: false,
};

export const Default = Template.bind({});
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

export const WithAlert = Template.bind({});
WithAlert.args = {
  ...defaultArgs,
  alerts: [AlertStories.Success.args.alert],
  games: [GameCardStories.PendingJoinable.args.game],
};

export const WithMultipleAlerts = Template.bind({});
WithMultipleAlerts.args = {
  ...defaultArgs,
  alerts: [AlertStories.Success.args.alert, AlertStories.Error.args.alert],
  games: [GameCardStories.PendingJoinable.args.game],
};

export const NoGamesFound = Template.bind({});
NoGamesFound.args = {
  ...defaultArgs,
  games: [],
};
