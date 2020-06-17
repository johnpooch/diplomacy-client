import React from 'react';
import { render } from '@testing-library/react';

import OrderSummary from '../OrderSummary';

const source = {
  piece: {
    type: 'army',
  },
  territory: {
    name: 'london',
  },
};

const target = {
  territory: {
    name: 'wales',
  },
};

test('Build army', () => {
  const order = {
    type: 'build',
    piece_type: 'army',
    source,
  };
  const { asFragment } = render(<OrderSummary order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Build fleet', () => {
  const order = {
    type: 'build',
    piece_type: 'fleet',
    source,
  };
  const { asFragment } = render(<OrderSummary order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Hold army', () => {
  const order = {
    type: 'hold',
    piece_type: null,
    source,
  };
  const { asFragment } = render(<OrderSummary order={order} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Move army', () => {
  const order = {
    type: 'move',
    piece_type: null,
    source,
    target,
  };
  const { asFragment } = render(<OrderSummary order={order} />);
  expect(asFragment()).toMatchSnapshot();
});
