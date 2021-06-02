import React, { useState } from 'react';

import { ExpandMore } from '../Icon';
import { Accordion, AccordionDetails, AccordionSummary } from '../MaterialUI';
import NationStateSummary from '../NationStateSummary/NationStateSummary';
import Order from '../Order';

import useStyles from './OrderHistory.styles';
import { OrderHistoryComponentProps } from './OrderHistory.types';

const OrderHistory: React.FC<OrderHistoryComponentProps> = ({
  nationState,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState('');

  const { orders } = nationState;

  const handleChange = (panel: string) => (_event, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '');
  };

  const Summary = <NationStateSummary nationState={nationState} />;

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
          {Summary}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {OrdersList}
        </AccordionDetails>
      </Accordion>
    </div>
  ) : (
    <div className={classes.playerSummary}>{Summary}</div>
  );
};

export default OrderHistory;
