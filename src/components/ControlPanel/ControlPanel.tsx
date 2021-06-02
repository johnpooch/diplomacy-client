/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { PrimaryButton } from '../Button/Button';
import { Orders, Participants } from '../Icon';
import { Box, Tab, Tabs, Typography } from '../MaterialUI';
import NationStateSummary from '../NationStateSummary/NationStateSummary';
import Order from '../Order';
import OrderHistorySection from '../OrderHistorySection';

import useStyles from './ControlPanel.styles';
import {
  ControlPanelComponentProps,
  TabPanelProps,
} from './ControlPanel.types';

function a11yProps(index: number) {
  return {
    id: `control-panel-tab-${index}`,
    'aria-controls': `control-panel-tabpanel-${index}`,
  };
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`contol-panel-tabpanel-${index}`}
      aria-labelledby={`contol-panel-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ControlPanel: React.FC<ControlPanelComponentProps> = ({
  cancelOrder,
  currentTurn,
  finalizeOrders,
  nationStates,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setValue(newValue);
  };

  const userNationState = nationStates.find((n) => n.isUser);

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={value}
        onChange={handleChange}
        aria-label="Control panel sections"
        classes={{ flexContainer: classes.tabs }}
      >
        <Tab icon={Orders} {...a11yProps(0)} />
        <Tab icon={Participants} {...a11yProps(1)} />
      </Tabs>
      <div role="presentation">
        <TabPanel value={value} index={0}>
          {currentTurn ? (
            <>
              <Typography variant="h6">Orders</Typography>
              {userNationState ? (
                <div className={classes.ordersSection}>
                  <Typography variant="body2" className={classes.orderCount}>
                    {userNationState.orders.length}/{userNationState.numOrders}
                  </Typography>
                  <div>
                    {userNationState.orders.map((order) => (
                      <Order
                        cancelOrder={cancelOrder}
                        isCurrent
                        key={order.order.source}
                        order={order.order}
                        outcome={null}
                      />
                    ))}
                  </div>
                  <PrimaryButton
                    onClick={finalizeOrders}
                    disabled={userNationState.loading}
                    title="Toggle finalize orders"
                  >
                    {userNationState.ordersFinalized
                      ? 'Un-finalize orders'
                      : 'Finalize orders'}
                  </PrimaryButton>
                </div>
              ) : (
                <div className={classes.ordersSection}>
                  <Typography variant="body2">
                    You are not participating in this game.
                  </Typography>
                </div>
              )}
            </>
          ) : (
            <>
              <Typography variant="h6">Order History</Typography>
              <OrderHistorySection nationStates={nationStates} />
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6">Players</Typography>
          {nationStates.map((ns) => (
            <NationStateSummary nationState={ns} key={ns.id} />
          ))}
        </TabPanel>
      </div>
    </div>
  );
};

export default ControlPanel;
