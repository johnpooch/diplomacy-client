import { faAnchor } from '@fortawesome/free-solid-svg-icons/faAnchor';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons/faTruckMoving';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// NOTE this is a workaround to minimize bundle size.
// There is a nicer approach which uses tree shaking
// but I can't seem to get it working.
// https://material-ui.com/guides/minimizing-bundle-size/
import Clear from '@material-ui/icons/Clear';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FastForward from '@material-ui/icons/FastForward';
import FastRewind from '@material-ui/icons/FastRewind';
import Menu from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import StarRounded from '@material-ui/icons/StarRounded';
import Warning from '@material-ui/icons/Warning';
import React from 'react';

export const Army = <FontAwesomeIcon icon={faTruckMoving} />;
export const ArmyType = faTruckMoving;
export const Orders = <FontAwesomeIcon icon={faFlag} />;
export const Fleet = <FontAwesomeIcon icon={faAnchor} />;
export const FleetType = faAnchor;
export const Participants = <FontAwesomeIcon icon={faUsers} />;
export const Home = <FontAwesomeIcon icon={faHome} />;
export const New = <FontAwesomeIcon icon={faPlusCircle} />;

export {
  Clear as Cancel,
  ExpandMore,
  Menu,
  Settings,
  SkipNext,
  SkipPrevious,
  FastForward,
  FastRewind,
  StarRounded as SupplyCenter,
  Warning,
};
