import React from 'react';
import { connect } from 'react-redux';
import { Group } from 'react-konva';

import Convoy from './Convoy';
import Hold from './Hold';
import Move from './Move';
import Retreat from './Retreat';
import Support from './Support';
import { OrderTypes } from '../game/base';
import { selectOrdersByTurn } from '../store/selectors';

const OrderTypeMap = {
  [OrderTypes.MOVE]: Move,
  [OrderTypes.HOLD]: Hold,
  [OrderTypes.SUPPORT]: Support,
  [OrderTypes.CONVOY]: Convoy,
  [OrderTypes.RETREAT]: Retreat,
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
