/* eslint-disable react/jsx-props-no-spreading */
import { Tooltip as MUITooltip, TooltipProps } from '@material-ui/core';
import React from 'react';

// Wraps material-ui tooltip to provide consistent usage across project
const Tooltip: React.FC<TooltipProps> = (props) => {
  return <MUITooltip arrow {...props} />;
};

export default Tooltip;
