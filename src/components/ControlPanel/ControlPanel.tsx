/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { PrimaryButton } from '../Button/Button';
import { Orders, Participants } from '../Icon';
import { Box, Drawer, Tab, Tabs, Toolbar, Typography } from '../MaterialUI';
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
  nationOrderHistories,
  numOrdersToGive,
  numOrdersGiven,
  open,
  orders,
  ordersFinalized,
  ordersFinalizedLoading,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Drawer
        BackdropProps={{ invisible: true }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Toolbar variant="dense" />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Control panel sections"
        >
          <Tab icon={Orders} {...a11yProps(0)} />
          <Tab icon={Participants} {...a11yProps(1)} />
        </Tabs>
        <div role="presentation">
          <TabPanel value={value} index={0}>
            {currentTurn ? (
              <>
                <Typography variant="h6">Orders</Typography>
                <div className={classes.ordersSection}>
                  <Typography variant="body2" className={classes.orderCount}>
                    {numOrdersGiven}/{numOrdersToGive}
                  </Typography>
                  <div>
                    {orders.map((order) => (
                      <Order
                        cancelOrder={cancelOrder}
                        isCurrent
                        key={order.source}
                        order={order}
                        outcome={null}
                      />
                    ))}
                  </div>
                  <PrimaryButton
                    onClick={finalizeOrders}
                    disabled={ordersFinalizedLoading}
                  >
                    {ordersFinalized ? 'Un-finalize orders' : 'Finalize orders'}
                  </PrimaryButton>
                </div>
              </>
            ) : (
              <>
                <Typography variant="h6">Order History</Typography>
                <OrderHistorySection
                  nationOrderHistories={nationOrderHistories}
                />
              </>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h6">Players</Typography>
          </TabPanel>
        </div>
      </Drawer>
    </div>
  );
};

export default ControlPanel;
