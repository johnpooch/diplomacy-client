import { fireEvent, waitFor, screen } from '@testing-library/react';
import Konva from 'konva-node';

import { infoMessages } from '../src/copy';
import {
  getGameFilterChoices,
  getGameDetail,
  listGames,
  listVariants,
} from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import {
  basicBeforeEach,
  logIn,
  renderApp,
  testElements,
  useHandlers,
} from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

Konva.isBrowser = false;

const pendingGameTitle = 'New game';
const activeGameTitle = 'First turn';

describe('Browse Games', () => {
  it('redirect user to log in and remove from storage on log out', async () => {
    renderApp();
    fireEvent.click(screen.getByTitle('user menu'));
    const logoutButton = await waitFor(() => screen.getByText('Logout'));
    fireEvent.click(logoutButton);
    await waitFor(() => testElements.loginButton());
  });

  it('display nav items', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    screen.getByTitle('home');
    screen.getByTitle('create game');
  });

  it('display pending game correctly', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    await waitFor(() => screen.getByTitle(pendingGameTitle));
    expect(screen.getByText(infoMessages.waitingForPlayers));
    expect(screen.getByText('1 / 7'));
  });

  it('display active game correctly', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successActiveGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    await waitFor(() => screen.getByTitle(activeGameTitle));
    expect(screen.getByText('Spring 1901 - Order'));
    expect(screen.getByText('7 / 7'));
  });

  it('navigate to game detail view when active game is clicked', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.successActiveGame],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    const gameLink = await waitFor(() => screen.getByTitle(activeGameTitle));
    fireEvent.click(gameLink);
    await waitFor(() => screen.getByText('England'));
  });

  it('navigate to pre-game when when pending game is clicked', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    const gameLink = await waitFor(() => screen.getByTitle(pendingGameTitle));
    fireEvent.click(gameLink);
    fireEvent.click(gameLink);
    await waitFor(testElements.leaveGameButton);
  });

  it('display error on listGames server error', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.errorServerError],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    await waitFor(testElements.componentError500);
  });

  it('display error on listVariants server error', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.successActiveGame],
      [urlConf.listVariants, listVariants.errorServerError]
    );
    renderApp();
    await waitFor(testElements.componentError500);
  });

  it('redirect to login on unauthorized', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.errorUnauthorized],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    await waitFor(testElements.loginButton);
  });

  // TODO
  it('filter games using filters', async () => {
    return true;
  });
});
