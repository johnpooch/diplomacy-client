import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import styled, { useTheme } from 'styled-components';

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

const BuildOrderText = ({ pieceType, source, type }) => {
  return (
    <StyledOrderText className="text">
      <span className="action">{type}</span>{' '}
      <span className="pieceType">{pieceType}</span>{' '}
      <span className="action">in</span>{' '}
      <span className="source">{source}</span>{' '}
    </StyledOrderText>
  );
};

const HoldOrderText = ({ source, type }) => {
  return (
    <StyledOrderText className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type}</span>
    </StyledOrderText>
  );
};

const MoveOrderText = ({ source, target, type }) => {
  return (
    <StyledOrderText className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type} to</span>{' '}
      <span className="target">{target}</span>
    </StyledOrderText>
  );
};

const AuxOrderText = ({ aux, source, target, type }) => {
  return (
    <StyledOrderText className="text">
      <span className="source">{source}</span>{' '}
      <span className="action">{type}</span>{' '}
      <span className="target">{target}</span>{' '}
      <span className="action">to</span> <span className="aux">{aux}</span>
    </StyledOrderText>
  );
};

const OrderTypeMap = {
  [OrderType.MOVE]: MoveOrderText,
  [OrderType.HOLD]: HoldOrderText,
  [OrderType.SUPPORT]: AuxOrderText,
  [OrderType.CONVOY]: AuxOrderText,
  [OrderType.RETREAT]: MoveOrderText,
  [OrderType.BUILD]: BuildOrderText,
};

const OrderItem = ({
  aux,
  destroyOrder,
  loading,
  piece,
  pieceType,
  source,
  target,
  type,
}) => {
  const theme = useTheme();

  let orderText = null;
  const OrderTextElement = OrderTypeMap[type];
  orderText = (
    <OrderTextElement
      aux={aux}
      pieceType={pieceType}
      source={source}
      target={target}
      type={type}
    />
  );
  const className = loading ? 'order disabled' : 'order';
  return (
    <div className={className}>
      <FontAwesomeIcon
        className="icon"
        icon={theme.icons[pieceType || piece.type]}
      />{' '}
      {orderText}
      <IconButton
        icon={theme.icons.cancel}
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
  const { loading, pieceType, type } = order;
  const aux = getTerritoryName(state, order.aux);
  const source = getTerritoryName(state, order.source);
  const target = getTerritoryName(state, order.target);
  const piece = selectPieceByTerritory(state, order.source, currentTurn.id);
  return { aux, loading, piece, pieceType, source, target, type };
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
