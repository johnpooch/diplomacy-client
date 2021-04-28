import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import namedCoastData from '../data/standard/namedCoasts.json';
import { selectPieceByTerritory } from '../store/selectors';

import { getTerritoryName, OrderText } from './OrderItem';

const OrderHistoryItem = ({
  aux,
  piece,
  pieceType,
  source,
  target,
  targetCoast,
  type,
}) => {
  const theme = useTheme();

  return (
    <div>
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
    </div>
  );
};

const mapState = (state, { turn, order }) => {
  const { pieceType, type } = order;
  const aux = getTerritoryName(state, order.aux);
  const source = getTerritoryName(state, order.source);
  const target = getTerritoryName(state, order.target);
  const targetCoast = namedCoastData.find(
    (ncd) => ncd.id === order.targetCoast
  );
  const piece = selectPieceByTerritory(state, order.source, turn.id);
  return { aux, piece, pieceType, source, target, targetCoast, type };
};

export default connect(mapState, null)(OrderHistoryItem);
