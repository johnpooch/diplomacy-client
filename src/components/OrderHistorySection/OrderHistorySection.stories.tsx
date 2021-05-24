/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { OrderType, PieceType } from '../../game/types';
import { nations } from '../data';

import Component from './OrderHistorySection';

export default {
  title: 'OrderHistorySection',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

export const Default: Story = Template.bind({});
Default.args = {
  nationOrderHistories: [
    {
      nation: nations.england,
      orders: [
        {
          order: {
            source: 'Vienna',
            target: 'Trieste',
            pieceType: PieceType.ARMY,
            orderType: OrderType.MOVE,
          },
          outcome: null,
          loading: false,
        },
      ],
      numSupplyCenters: 3,
      username: 'johnpooch',
    },
    {
      nation: nations.france,
      orders: [
        {
          order: {
            source: 'Paris',
            target: 'Picardy',
            aux: 'Brest',
            pieceType: PieceType.ARMY,
            orderType: OrderType.SUPPORT,
          },
          outcome: null,
          loading: false,
        },
      ],
      numSupplyCenters: 4,
      username: 'niallt',
    },
  ],
};
