import {
  fireEvent,
  waitFor,
  screen,
  Matcher,
  render,
} from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import App from '../src/App';
import userData from '../src/mocks/data/user.json';
import { restMethods } from '../src/mocks/handlers';
import { login } from '../src/mocks/resolvers';
import { authActions } from '../src/store/auth';
import configureStore from '../src/store/store';
import { urlConf } from '../src/urls';

const server = setupServer();

const baseUrl = 'http://127.0.0.1:8082/api/v1/';
let history: History;
let store;

const mockLocalStorage = () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
};

export const logIn = (): void => {
  const url = urlConf.login;
  const { urlPattern, method } = url;
  const handler = restMethods[method];
  server.use(handler(baseUrl + urlPattern, login.success));
  const user = userData;
  const token =
    'faketokencdd6b6112b47176e410d1d6f0fc0a4b879286e5c93405ce89685929';
  store.dispatch(authActions.login.fulfilled({ user, token }));
};

export const useHandlers = (...handlers) => {
  handlers.forEach(([url, resolver]) => {
    const { method, urlPattern } = url;
    server.use(restMethods[method](baseUrl + urlPattern, resolver));
  });
};

export const renderApp = (): History => {
  // Should only be called after basicBeforeEach
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  return history;
};

export const fillForm = (...labels: string[]): void =>
  /* Shortcut function for filling forms with basic data */
  labels.forEach((l) =>
    fireEvent.change(screen.getByLabelText(l), { target: { value: 'Value' } })
  );

export const basicBeforeEach = (): History => {
  process.env.SERVICE_URI = baseUrl;
  history = createBrowserHistory();
  history.push('/');
  store = configureStore(history);
  mockLocalStorage();
  return history;
};

export const basicBeforeAll = (): void => {
  server.listen();
};

export const basicAfterEach = (): void => {
  server.resetHandlers();
};

export const basicAfterAll = (): void => {
  server.close();
};

beforeAll(() => basicBeforeAll());
beforeEach(() => basicBeforeEach());
afterEach(() => basicAfterEach());
afterAll(() => basicAfterAll());

export enum Selectors {
  Button = 'button',
  BrowseGameTitle = 'h3',
  FormButton = 'button>span',
  FormHeader = 'h3',
  FormLink = 'a',
  Header = 'h1',
  ControlPanelHeader = 'h6',
  MenuButton = 'span',
  Paragraph = 'p',
}

export const userClicksElement = (
  label: Matcher,
  selector: Selectors,
  query: (...args: any[]) => HTMLElement = screen.getByText
): void => {
  const element = query(label, { selector });
  fireEvent.click(element);
};

export const elementIsDisabled = (
  label: Matcher,
  selector: Selectors,
  query: (...args: any[]) => HTMLElement = screen.getByText
): void => {
  const element = query(label, { selector });
  expect(element).toHaveAttribute('disabled');
};

export const userSeesElement = async (
  label: Matcher,
  selector: Selectors,
  query: (...args: any[]) => HTMLElement = screen.getByText
): Promise<void> => {
  await waitFor(() => query(label, { selector }));
};

export const userCannotSeeElement = async (
  label: Matcher,
  selector: Selectors
): Promise<void> => {
  const element = screen.queryByText(label, { selector });
  expect(element).toBeNull(); // it doesn't exist
};

export const userSeesAlert = async (message: string): Promise<void> => {
  const element = await waitFor(() => screen.getByRole('alert'));
  expect(element.textContent).toBe(message);
};

export const userSeesLoadingSpinner = async (): Promise<void> => {
  await waitFor(() => screen.getByTitle('loading spinner'));
};

export const userFillsForm = (formData: { [key: string]: string }): void =>
  Object.entries(formData).forEach(([label, value]) =>
    fireEvent.change(screen.getByLabelText(label), { target: { value } })
  );
