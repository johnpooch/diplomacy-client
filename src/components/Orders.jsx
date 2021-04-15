import React from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';

import { OrderType } from '../game/types';
import { selectOrdersByTurn } from '../store/selectors';

import Build from './Build';
import Convoy from './Convoy';
import Hold from './Hold';
import Move from './Move';
import Retreat from './Retreat';
import Support from './Support';

const OrderTypeMap = {
  [OrderType.MOVE]: Move,
  [OrderType.HOLD]: Hold,
  [OrderType.SUPPORT]: Support,
  [OrderType.CONVOY]: Convoy,
  [OrderType.RETREAT]: Retreat,
  [OrderType.BUILD]: Build,
  [OrderType.DISBAND]: Hold,
};

const Orders = ({ orders }) => {
  const orderElements = orders.map((o) => {
    const ElementType = OrderTypeMap[o.type];
    return <ElementType key={o.id} order={o} />;
  });
  return <Group>{orderElements}</Group>;
};

const mapStateToProps = (state, { turn }) => {
  const orders = selectOrdersByTurn(state, turn.id);
  return { orders };
};

export default connect(mapStateToProps, null)(Orders);
