import React from 'react';
import { render } from '@testing-library/react';

import OrderMessage from '../OrderMessage';

const aux = {
  piece: {
    type: 'army',
  },
  territory: {
    name: 'york',
  },
};

const target = {
  territory: {
    name: 'wales',
  },
};

test('Build', () => {
  const order = {
    type: 'build',
    aux: null,
    target: null,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Hold', () => {
  const order = {
    type: 'hold',
    aux: null,
    target: null,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Disband', () => {
  const order = {
    type: 'disband',
    aux: null,
    target: null,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Move without target', () => {
  const order = {
    type: 'move',
    aux: null,
    target: null,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Move with target', () => {
  const order = {
    type: 'move',
    aux: null,
    target,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Support without aux', () => {
  const order = {
    type: 'support',
    aux: null,
    target: null,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Support with aux', () => {
  const order = {
    type: 'support',
    aux,
    target: null,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Support with target', () => {
  const order = {
    type: 'support',
    aux,
    target,
  };
  const { asFragment } = render(<OrderMessage order={order} />);
  expect(asFragment()).toMatchSnapshot();
});
