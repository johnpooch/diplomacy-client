import { faAnchor, faTruckMoving } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Clear,
  ExpandMore,
  Flag,
  Group,
  Menu,
  Settings,
  StarRounded,
  Warning,
} from '@material-ui/icons';
import React from 'react';

export const Army = <FontAwesomeIcon icon={faTruckMoving} />;
export const Fleet = <FontAwesomeIcon icon={faAnchor} />;

export { Clear as Cancel };
export { Flag as Orders };
export { Group as Participants };
export { ExpandMore };
export { Menu };
export { Settings };
export { StarRounded as SupplyCenter };
export { Warning };
