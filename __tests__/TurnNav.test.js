import { getByText, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Konva from 'konva-node';

import { titles } from '../src/components/TurnNav';
import {
  getGameDetail,
  getGameFilterChoices,
  listGames,
  listOrders,
  listVariants,
} from '../src/mocks/resolvers';
import { urlConf } from '../src/urls';

import { basicBeforeEach, logIn, renderApp, useHandlers } from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

Konva.isBrowser = false;

const getNavButton = (title) => {
  return waitFor(() => screen.getByTitle(title));
};
const getNavButtons = async () => {
  return {
    [titles.FIRST]: await getNavButton(titles.FIRST),
    [titles.PREVIOUS]: await getNavButton(titles.PREVIOUS),
    [titles.NEXT]: await getNavButton(titles.NEXT),
    [titles.CURRENT]: await getNavButton(titles.CURRENT),
  };
};

const checkPhase = async (phase, season, year) => {
  const turn = screen.getByTitle('Active turn');
  await getByText(turn, phase, { selector: '.phase' });
  await getByText(turn, season, { selector: '.season' });
  await getByText(turn, year, { selector: '.year' });
};

describe('Turn Nav', () => {
  it('all buttons disabled if only turn', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/first-turn');
    const buttons = await getNavButtons();
    Object.values(buttons).forEach((b) =>
      expect(b).toHaveAttribute('disabled')
    );
  });

  it('first button changes to first turn', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/multiple-turns');

    let buttons = await getNavButtons();
    await checkPhase('Retreat', 'Fall', '1901');
    expect(buttons[titles.FIRST]).not.toHaveAttribute('disabled');
    expect(buttons[titles.PREVIOUS]).not.toHaveAttribute('disabled');
    expect(buttons[titles.NEXT]).toHaveAttribute('disabled');
    expect(buttons[titles.CURRENT]).toHaveAttribute('disabled');

    userEvent.click(buttons[titles.FIRST]);
    await checkPhase('Order', 'Spring', '1901');

    buttons = await getNavButtons();
    expect(buttons[titles.FIRST]).toHaveAttribute('disabled');
    expect(buttons[titles.PREVIOUS]).toHaveAttribute('disabled');
    expect(buttons[titles.NEXT]).not.toHaveAttribute('disabled');
    expect(buttons[titles.CURRENT]).not.toHaveAttribute('disabled');
  });

  it('previous button changes to previous turn', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/multiple-turns');

    let buttons = await getNavButtons();

    userEvent.click(buttons[titles.PREVIOUS]);
    await checkPhase('Order', 'Fall', '1901');

    buttons = await getNavButtons();
    expect(buttons[titles.FIRST]).not.toHaveAttribute('disabled');
    expect(buttons[titles.PREVIOUS]).not.toHaveAttribute('disabled');
    expect(buttons[titles.NEXT]).not.toHaveAttribute('disabled');
    expect(buttons[titles.CURRENT]).not.toHaveAttribute('disabled');
  });

  it('next button changes to next turn', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/multiple-turns');

    const buttons = await getNavButtons();

    userEvent.click(buttons[titles.FIRST]);
    await checkPhase('Order', 'Spring', '1901');

    userEvent.click(buttons[titles.NEXT]);
    await checkPhase('Order', 'Fall', '1901');
  });

  it('current button changes to current turn', async () => {
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.getGameFilterChoices, getGameFilterChoices.success],
      [urlConf.listGames, listGames.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    renderApp().push('/game/multiple-turns');

    const buttons = await getNavButtons();

    userEvent.click(buttons[titles.FIRST]);
    await checkPhase('Order', 'Spring', '1901');

    userEvent.click(buttons[titles.CURRENT]);
    await checkPhase('Retreat', 'Fall', '1901');
  });
});
