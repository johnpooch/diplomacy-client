import {
  faAnchor,
  faFlag,
  faTruckMoving,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Clear,
  ExpandMore,
  FastForward,
  FastRewind,
  Menu,
  Settings,
  SkipNext,
  SkipPrevious,
  StarRounded,
  Warning,
} from '@material-ui/icons';
import React from 'react';

export const Army = <FontAwesomeIcon icon={faTruckMoving} />;
export const Orders = <FontAwesomeIcon icon={faFlag} />;
export const Fleet = <FontAwesomeIcon icon={faAnchor} />;
export const Participants = <FontAwesomeIcon icon={faUsers} />;

export { Clear as Cancel };
export { ExpandMore };
export { Menu };
export { Settings };
export { SkipNext, SkipPrevious, FastForward, FastRewind };
export { StarRounded as SupplyCenter };
export { Warning };
