/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Tooltip as MUITooltip, TooltipProps } from '../MaterialUI';

// Wraps material-ui tooltip to provide consistent usage across project
const Tooltip: React.FC<TooltipProps> = (props) => {
  return <MUITooltip arrow {...props} />;
};

export default Tooltip;
