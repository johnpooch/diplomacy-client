/* eslint-disable react/jsx-props-no-spreading */
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';

import { Orders, Participants } from '../Icon';
import OrderHistorySection from '../OrderHistorySection';
import OrderList from '../OrderList';

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
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ControlPanel: React.FC<ControlPanelComponentProps> = ({
  currentTurn,
  nationOrderHistories,
  numOrdersToGive,
  numOrdersGiven,
  open,
  orders,
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
        anchor="right"
        open={open}
        onClose={() => console.log('close')}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Control panel sections"
        >
          <Tab icon={<Orders />} {...a11yProps(0)} />
          <Tab icon={<Participants />} {...a11yProps(1)} />
        </Tabs>
        <div role="presentation">
          <TabPanel value={value} index={0}>
            {currentTurn ? (
              <>
                <Typography variant="h6">Orders</Typography>
                <OrderList
                  orders={orders}
                  numOrdersToGive={numOrdersToGive}
                  numOrdersGiven={numOrdersGiven}
                />
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
            <Typography variant="h6">Participants</Typography>
          </TabPanel>
        </div>
      </Drawer>
    </div>
  );
};

export default ControlPanel;
