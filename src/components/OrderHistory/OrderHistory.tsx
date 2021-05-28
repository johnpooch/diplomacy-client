import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import CircleFlag from '../CircleFlag/CircleFlag';
import { ExpandMore, SupplyCenter } from '../Icon';
import Order from '../Order';

import useStyles from './OrderHistory.styles';
import { OrderHistoryComponentProps } from './OrderHistory.types';

const OrderHistory: React.FC<OrderHistoryComponentProps> = ({
  nation,
  numSupplyCenters,
  orders,
  username,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel: string) => (_event, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '');
  };

  const PlayerSummary = (
    <div className={classes.summary}>
      <CircleFlag nation={nation} size="sm" />
      <Typography variant="body1">{username}</Typography>
      <SupplyCenter titleAccess="Number of supply centers" />
      <Typography variant="body2">{numSupplyCenters}</Typography>
    </div>
  );

  const OrdersList = (
    <>
      {orders.map((order) => (
        <div key={order.order.source} className={classes.order}>
          <Order
            isCurrent={false}
            outcome={order.outcome}
            order={order.order}
            cancelOrder={() => null}
          />
        </div>
      ))}
    </>
  );

  return orders.length ? (
    <div>
      <Accordion
        className={classes.root}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {PlayerSummary}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {OrdersList}
        </AccordionDetails>
      </Accordion>
    </div>
  ) : (
    <div className={classes.playerSummary}>{PlayerSummary}</div>
  );
};

export default OrderHistory;
