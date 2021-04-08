import {
  faAnchor,
  faCheck,
  faExclamationTriangle,
  faMapMarkerAlt,
  faStar,
  faTimes,
  faTruckMoving,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import produce from 'immer';

import { withUnits } from './utils';

// based on https://theme-ui.com/theme-spec/
const breakpoints = ['480px', '768px', '992px', '1200'];

const colors = {
  text: 'midnightblue',
  background: 'papayawhip',
  primary: 'dodgerblue',
  secondary: 'slategray',
  accent: 'slateblue',
  muted: 'white',
  nations: {
    'standard-england': '#ff1103',
    'standard-france': '#0074d9',
    'standard-germany': '#777777',
    'standard-austria-hungary': '#E69F00',
    'standard-italy': '#2ecc40',
    'standard-russia': '#b10dc9',
    'standard-turkey': '#508e59',
  },
  map: {
    land: '#e3d8c4',
    sea: '#79bde1',
  },
  status: {
    error: {
      primary: 'firebrick',
      muted: '#f5dddb',
    },
    success: {
      primary: '#508e59',
      muted: '#c3f5ca',
    },
  },
};
const fonts = {
  sans:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};
const fontSizes = [9, 13, 15, 19, 36];
const fontWeights = {
  body: 400,
  heading: 700,
  bold: 700,
};
const lineHeights = {
  body: 1.5,
  heading: 1.125,
};
const space = [4, 8, 12, 16, 24, 32, 44, 60];
const borderWidths = [1];
const borders = [`${borderWidths[0]}px solid ${colors.secondary}`];
const radii = [6, 8, 16];
const shadows = [`rgba(0, 0, 0, 0.15) 0px 1px 3px 1px`];
const sizes = {
  pageMaxWidth: '690px',
  inputMinSize: '44px',
  sidebarMaxWidth: '320px',
  flag: withUnits([30, 80], 'px'),
};
const icons = {
  accept: faCheck,
  army: faTruckMoving,
  cancel: faTimes,
  fleet: faAnchor,
  player: faUser,
  supplyCenter: faStar,
  territory: faMapMarkerAlt,
  warning: faExclamationTriangle,
};

export const theme = {
  breakpoints,
  colors,
  fonts,
  fontSizes: withUnits(fontSizes, 'px'),
  fontSizesUnitless: fontSizes,
  fontWeights,
  lineHeights,
  space: withUnits(space, 'px'),
  spaceUnitless: space,
  borderWidths: withUnits(borderWidths, 'px'),
  borderWidthsUnitless: borderWidths,
  borders,
  radii: withUnits(radii, 'px'),
  radiiUnitless: radii,
  shadows,
  sizes,
  icons,
};

export const darkTheme = produce(theme, (draft) => {
  draft.colors.text = 'white';
  draft.colors.background = colors.text;
  draft.colors.muted = 'black';
});
