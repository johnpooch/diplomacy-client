import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import styled, { useTheme } from 'styled-components';

import namedCoastData from '../data/standard/namedCoasts.json';
import { OrderType } from '../game/types';
import { orderActions } from '../store/orders';
import { selectPieceByTerritory } from '../store/selectors';
import { territorySelectors } from '../store/territories';

import { IconButton } from './Button';

const StyledOrderText = styled.div`
  span:first-of-type {
    text-transform: capitalize;
  }
`;

export const OrderText = ({
  aux,
  pieceType,
  source,
  target,
  targetCoast,
  type,
}) => {
  const OrderTextElement = OrderTypeMap[type];
  return (
    <OrderTextElement
      aux={aux}
      pieceType={pieceType}
      source={source}
      target={target}
      targetCoast={targetCoast}
      type={type}
    />
  );
};

const OrderItem = ({
  aux,
  destroyOrder,
  loading,
  piece,
  pieceType,
  source,
  target,
  targetCoast,
  type,
}) => {
  const theme = useTheme();

  const className = loading ? 'order disabled' : 'order';
  return (
    <div className={className}>
      <FontAwesomeIcon
        className="icon"
        icon={theme.icons[pieceType || piece.type]}
      />{' '}
      <OrderText
        aux={aux}
        pieceType={pieceType}
        source={source}
        target={target}
        targetCoast={targetCoast}
        type={type}
      />
      <IconButton
        icon={theme.icons.cancel}
        onClick={destroyOrder}
        disabled={loading}
        title="Cancel order"
      />
    </div>
  );
};

export const getTerritoryName = (state, id) => {
  const territory = territorySelectors.selectById(state, id);
  return territory ? territory.name : null;
};

const mapState = (state, { turn, order }) => {
  const { loading, pieceType, type } = order;
  const aux = getTerritoryName(state, order.aux);
  const source = getTerritoryName(state, order.source);
  const target = getTerritoryName(state, order.target);
  const targetCoast = namedCoastData.find(
    (ncd) => ncd.id === order.targetCoast
  );
  const piece = selectPieceByTerritory(state, order.source, turn.id);
  return { aux, loading, piece, pieceType, source, target, targetCoast, type };
};

const mapDispatch = (dispatch, { order, turn }) => {
  const destroyOrder = () => {
    let urlParams = { orderId: order.id };
    dispatch(orderActions.destroyOrder({ urlParams })).then(() => {
      urlParams = { turnId: turn.id };
      dispatch(orderActions.listOrders({ urlParams }));
    });
  };
  return { destroyOrder };
};

export default connect(mapState, mapDispatch)(OrderItem);
