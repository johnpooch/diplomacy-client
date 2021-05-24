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

export const ArmyHold: Story = Template.bind({});
ArmyHold.args = {
  order: {
    source: 'Venice',
    pieceType: PieceType.ARMY,
    orderType: OrderType.HOLD,
  },
};

export const FleetHold: Story = Template.bind({});
FleetHold.args = {
  order: {
    source: 'Venice',
    pieceType: PieceType.FLEET,
    orderType: OrderType.HOLD,
  },
};

export const ArmyMove: Story = Template.bind({});
ArmyMove.args = {
  order: {
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.ARMY,
    orderType: OrderType.MOVE,
  },
};

export const FleetMove: Story = Template.bind({});
FleetMove.args = {
  order: {
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.FLEET,
    orderType: OrderType.MOVE,
  },
};

export const FleetMoveTargetCoast: Story = Template.bind({});
FleetMoveTargetCoast.args = {
  order: {
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
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.ARMY,
    orderType: OrderType.RETREAT,
  },
};

export const FleetRetreat: Story = Template.bind({});
FleetRetreat.args = {
  order: {
    source: 'Venice',
    target: 'Trieste',
    pieceType: PieceType.FLEET,
    orderType: OrderType.RETREAT,
  },
};

export const FleetRetreatTargetCoast: Story = Template.bind({});
FleetRetreatTargetCoast.args = {
  order: {
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
    source: 'Venice',
    pieceType: PieceType.ARMY,
    orderType: OrderType.BUILD,
  },
};

export const BuildFleet: Story = Template.bind({});
BuildFleet.args = {
  order: {
    source: 'Venice',
    pieceType: PieceType.FLEET,
    orderType: OrderType.BUILD,
  },
};

export const DisbandArmy: Story = Template.bind({});
DisbandArmy.args = {
  order: {
    source: 'Venice',
    pieceType: PieceType.ARMY,
    orderType: OrderType.DISBAND,
  },
};

export const DisbandFleet: Story = Template.bind({});
DisbandFleet.args = {
  order: {
    source: 'Venice',
    pieceType: PieceType.FLEET,
    orderType: OrderType.DISBAND,
  },
};
