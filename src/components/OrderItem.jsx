import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';

import { IconButton } from './Button';
import { OrderTypes } from '../game/base';
import { orderActions } from '../store/orders';
import { selectPieceByTerritory } from '../store/selectors';
import { territorySelectors } from '../store/territories';

const HoldOrderText = ({ source, type }) => {
  return (
    <span className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type}</span>
    </span>
  );
};

const MoveOrderText = ({ source, target, type }) => {
  return (
    <span className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type} to</span>{' '}
      <span className="target">{target}</span>
    </span>
  );
};

const AuxOrderText = ({ aux, source, target, type }) => {
  return (
    <span className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type}</span>{' '}
      <span className="target">{target}</span>{' '}
      <span className="action">to</span> <span className="aux">{aux}</span>
    </span>
  );
};

const OrderItem = ({
  aux,
  destroyOrder,
  loading,
  piece,
  source,
  target,
  type,
  theme,
}) => {
  let orderText = null;
  if ([OrderTypes.MOVE, OrderTypes.RETREAT].includes(type)) {
    orderText = <MoveOrderText source={source} target={target} type={type} />;
  } else if ([OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(type)) {
    orderText = (
      <AuxOrderText aux={aux} source={source} target={target} type={type} />
    );
  } else {
    orderText = (
      <HoldOrderText aux={aux} source={source} target={target} type={type} />
    );
  }
  const className = loading ? 'order disabled' : 'order';
  return (
    <div className={className}>
      <FontAwesomeIcon className="icon" icon={theme.icons[piece.type]} />{' '}
      {orderText}
      <IconButton
        icon={faTimes}
        onClick={destroyOrder}
        disabled={loading}
        title="Cancel order"
      />
    </div>
  );
};

const getTerritoryName = (state, id) => {
  const territory = territorySelectors.selectById(state, id);
  return territory ? territory.name : null;
};

const mapStateToProps = (state, { currentTurn, order }) => {
  const { loading, type } = order;
  const aux = getTerritoryName(state, order.aux);
  const source = getTerritoryName(state, order.source);
  const target = getTerritoryName(state, order.target);
  const piece = selectPieceByTerritory(state, order.source, currentTurn.id);
  return { aux, loading, piece, source, target, type };
};

const mapDispatchToProps = (dispatch, { order, currentTurn }) => {
  const destroyOrder = () => {
    let urlParams = { orderId: order.id };
    dispatch(orderActions.destroyOrder({ urlParams })).then(() => {
      urlParams = { turnId: currentTurn.id };
      dispatch(orderActions.listOrders({ urlParams }));
    });
  };
  return { destroyOrder };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
