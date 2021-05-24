/* eslint-disable react/jsx-props-no-spreading */
import { Typography } from '@material-ui/core';
import React from 'react';

import { OrderType, PieceType } from '../../game/types';
import { Army, Fleet } from '../Icon';

import useStyles from './OrderSummary.styles';
import { OrderSummaryComponentProps } from './OrderSummary.types';

const Aux = ({ territory }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.aux}>
      {territory}
    </Typography>
  );
};

const Source = ({ territory }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.source}>
      {territory}
    </Typography>
  );
};

const Prep = ({ term }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.prep}>
      {term}
    </Typography>
  );
};

const Target = ({ territory }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.target}>
      {territory}
    </Typography>
  );
};

const TargetCoast = ({ targetCoast }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      component="span"
      className={classes.targetCoast}
    >
      ({targetCoast})
    </Typography>
  );
};

const OrderTypeElement = ({ orderType }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.orderType}>
      {orderType}
    </Typography>
  );
};

const PieceTypeElement = ({ pieceType }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.pieceType}>
      {pieceType}
    </Typography>
  );
};

const BuildOrderText = ({ pieceType, source, targetCoast, orderType }) => {
  return (
    <div className="text">
      <OrderTypeElement orderType={orderType} />{' '}
      <PieceTypeElement pieceType={pieceType} /> <Prep term="in" />{' '}
      <Source territory={source} />{' '}
      {targetCoast && <TargetCoast targetCoast={targetCoast} />}{' '}
    </div>
  );
};

const DisbandOrderText = ({ source, orderType }) => {
  return (
    <div className="text">
      <Source territory={source} /> <OrderTypeElement orderType={orderType} />
    </div>
  );
};

const HoldOrderText = ({ source, orderType }) => {
  return (
    <div className="text">
      <Source territory={source} /> <OrderTypeElement orderType={orderType} />
    </div>
  );
};

const MoveOrderText = ({ source, target, targetCoast, orderType }) => {
  return (
    <div className="text">
      <Source territory={source} /> <OrderTypeElement orderType={orderType} />{' '}
      <Prep term="to" /> <Target territory={target} />{' '}
      {targetCoast && <TargetCoast targetCoast={targetCoast} />}{' '}
    </div>
  );
};

const AuxOrderText = ({ aux, source, target, orderType }) => {
  return (
    <div className="text">
      <Source territory={source} /> <OrderTypeElement orderType={orderType} />{' '}
      <Aux territory={aux} /> <Prep term="to" /> <Target territory={target} />
    </div>
  );
};

const OrderTypeMap = {
  [OrderType.MOVE]: MoveOrderText,
  [OrderType.HOLD]: HoldOrderText,
  [OrderType.SUPPORT]: AuxOrderText,
  [OrderType.CONVOY]: AuxOrderText,
  [OrderType.RETREAT]: MoveOrderText,
  [OrderType.BUILD]: BuildOrderText,
  [OrderType.DISBAND]: DisbandOrderText,
};

const OrderSummary: React.FC<OrderSummaryComponentProps> = ({ order }) => {
  const classes = useStyles();
  const { orderType, pieceType } = order;
  const icon = pieceType === PieceType.ARMY ? Army : Fleet;
  const OrderTextElement = OrderTypeMap[orderType];
  return (
    <div className={classes.root}>
      {icon} <OrderTextElement {...order} />
    </div>
  );
};

export default OrderSummary;
