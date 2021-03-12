import { fireEvent, waitFor, screen } from '@testing-library/react';
import Konva from 'konva-node';

import { infoMessages } from '../src/copy';
import { urlConf } from '../src/urls';
import {
  getGameFilterChoices,
  getGameDetail,
  listGames,
  listVariants,
} from '../src/mocks/resolvers';
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

const gameTitle = () => screen.getByRole('heading', { level: 2 });

describe('Browse Games', () => {
  it('redirect user to log in and remove from storage on log out', async () => {
    renderApp();
    fireEvent.click(testElements.logoutButton());
    await waitFor(() => testElements.loginButton());
  });

  it('display nav items', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    const links = screen.getAllByRole('link');
    expect(links[0].textContent === 'Browse games');
    expect(links[1].textContent === 'Create game');
  });

  it('display pending game correctly', async () => {
    useHandlers(
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success]
    );
    renderApp();
    const title = await waitFor(gameTitle);
    expect(title.textContent === 'New game');
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
    const title = await waitFor(gameTitle);
    expect(title.textContent === 'First turn');
    expect(screen.getByText('spring 1901 - Order'));
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
    await waitFor(gameTitle);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[3]);
    await waitFor(() => screen.getByText('England'));
  });

  it('navigate to pre-game when when pending game is clicked', async () => {
    useHandlers(
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.successPendingGame],
      [urlConf.listVariants, listVariants.success]
    );
    renderApp();
    await waitFor(gameTitle);
    const links = screen.getAllByRole('link');
    fireEvent.click(links[3]);
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

  // TODO
  it('filter games using filters', async () => {
    return true;
  });
});