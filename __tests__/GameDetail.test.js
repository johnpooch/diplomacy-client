import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Konva from 'konva-node';

import { errorMessages } from '../src/copy';
import { urlConf } from '../src/urls';
import {
  destroyOrder,
  finalizeOrders,
  getGameDetail,
  listOrders,
  listVariants,
} from '../src/mocks/resolvers';
import {
  basicBeforeEach,
  logIn,
  renderApp,
  successMessages,
  testElements,
  useHandlers,
} from './testUtils';

beforeEach(() => {
  basicBeforeEach();
  logIn();
});

Konva.isBrowser = false;

describe('Game Detail', () => {
  it('delete order succesfully', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.success],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    let cancelButton = await waitFor(() => screen.getByTitle('Cancel order'));
    userEvent.click(cancelButton);
    cancelButton = await waitFor(() => screen.getByTitle('Cancel order'));
    expect(cancelButton).toHaveAttribute('disabled');
    const successMessage = await waitFor(() => screen.getByRole('alert'));
    expect(successMessage.textContent).toBe(successMessages.destroyOrder());
  });

  it('display error on server error delete order', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorServerError],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const cancelButton = await waitFor(() => screen.getByTitle('Cancel order'));
    userEvent.click(cancelButton);
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });

  it('display error on server error list orders', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.errorServerError]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });

  it('display error on not found delete order', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.destroyOrder, destroyOrder.errorNotFound],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const cancelButton = await waitFor(() => screen.getByTitle('Cancel order'));
    userEvent.click(cancelButton);
    await waitFor(() => screen.getByText(errorMessages.notFound));
  });

  it('finalize orders success', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.finalizeOrders, finalizeOrders.success],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const finalizeOrdersButton = await waitFor(() =>
      screen.getByText('Finalize orders')
    );
    userEvent.click(finalizeOrdersButton);
    expect(screen.getByText('Finalize orders')).toHaveAttribute('disabled');
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByText('Finalize orders')).not.toHaveAttribute('disabled');
  });

  it('display error on server error', async () => {
    renderApp().push('/game/first-turn');
    useHandlers(
      [urlConf.finalizeOrders, finalizeOrders.errorServerError],
      [urlConf.getGameDetail, getGameDetail.success],
      [urlConf.listVariants, listVariants.success],
      [urlConf.listOrders, listOrders.success]
    );
    userEvent.click(await waitFor(() => testElements.ordersSidebarButton()));
    const finalizeOrdersButton = await waitFor(() =>
      screen.getByText('Finalize orders')
    );
    userEvent.click(finalizeOrdersButton);
    await waitFor(() => screen.getByText(errorMessages.internalServerError));
  });
});
