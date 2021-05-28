/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react';
import React, { ComponentProps } from 'react';

import { OrderType, PieceType } from '../../game/types';

import Component from './OrderSummary';

export default {
  title: 'OrderSummary',
  component: Component,
} as Meta;

const Template: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);

const defaultOrderArgs = {
  loading: false,
};

export const ArmyHold: Story = Template.bind({});
ArmyHold.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    pieceType: PieceType.ARMY,
    orderType: OrderType.HOLD,
  },
};

export const FleetHold: Story = Template.bind({});
FleetHold.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    pieceType: PieceType.FLEET,
    orderType: OrderType.HOLD,
  },
};

export const ArmyMove: Story = Template.bind({});
ArmyMove.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.ARMY,
    orderType: OrderType.MOVE,
  },
};

export const FleetMove: Story = Template.bind({});
FleetMove.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.FLEET,
    orderType: OrderType.MOVE,
  },
};

export const FleetMoveTargetCoast: Story = Template.bind({});
FleetMoveTargetCoast.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    target: 'Trieste',
    targetCoast: 'NC',
    pieceType: PieceType.FLEET,
    orderType: OrderType.MOVE,
  },
};

export const ArmyRetreat: Story = Template.bind({});
ArmyRetreat.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.ARMY,
    orderType: OrderType.RETREAT,
  },
};

export const FleetRetreat: Story = Template.bind({});
FleetRetreat.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.FLEET,
    orderType: OrderType.RETREAT,
  },
};

export const FleetRetreatTargetCoast: Story = Template.bind({});
FleetRetreatTargetCoast.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    target: 'Trieste',
    targetCoast: 'NC',
    pieceType: PieceType.FLEET,
    orderType: OrderType.RETREAT,
  },
};

export const ArmySupport: Story = Template.bind({});
ArmySupport.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    aux: 'Adriatic Sea',
    target: 'Trieste',
    pieceType: PieceType.ARMY,
    orderType: OrderType.SUPPORT,
  },
};

export const FleetSupport: Story = Template.bind({});
FleetSupport.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    aux: 'Adriatic Sea',
    target: 'Trieste',
    pieceType: PieceType.FLEET,
    orderType: OrderType.SUPPORT,
  },
};

export const FleetConvoy: Story = Template.bind({});
FleetConvoy.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    aux: 'Adriatic Sea',
    target: 'Trieste',
    pieceType: PieceType.FLEET,
    orderType: OrderType.CONVOY,
  },
};

export const BuildArmy: Story = Template.bind({});
BuildArmy.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    pieceType: PieceType.ARMY,
    orderType: OrderType.BUILD,
  },
};

export const BuildFleet: Story = Template.bind({});
BuildFleet.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    pieceType: PieceType.FLEET,
    orderType: OrderType.BUILD,
  },
};

export const DisbandArmy: Story = Template.bind({});
DisbandArmy.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    pieceType: PieceType.ARMY,
    orderType: OrderType.DISBAND,
  },
};

export const DisbandFleet: Story = Template.bind({});
DisbandFleet.args = {
  order: {
    ...defaultOrderArgs,
    source: 'Venice',
    pieceType: PieceType.FLEET,
    orderType: OrderType.DISBAND,
  },
};
