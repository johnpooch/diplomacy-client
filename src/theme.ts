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
import { DefaultTheme } from 'styled-components';

import { withUnits } from './utils';

// based on https://theme-ui.com/theme-spec/
const breakpoints = [480, 768, 992, 1200];

const colors = {
  text: 'midnightblue',
  background: 'papayawhip',
  primary: 'dodgerblue',
  secondary: '#8b8bb7',
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
    background: 'black',
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
const fontSizes = [9, 13, 16, 19, 36];
const fontWeights = {
  body: 400,
  display: 700,
  bold: 700,
};
const lineHeights = {
  body: 1.5,
  display: 1.1,
};
const space = [4, 8, 12, 16, 24, 32, 44, 60];
const borderWidths = [1, 3];
const borders = [`${borderWidths[0]}px solid ${colors.secondary}`];
const radii = [6, 8, 16];
const shadows = [`rgba(0, 0, 0, 0.15) 0px 1px 3px 1px`];
const sizes = {
  pageMaxWidth: '690px',
  inputMinSize: '44px',
  sidebarWidth: '320px',
  flag: withUnits([32, 48], 'px'),
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

export const theme: DefaultTheme = {
  breakpoints: withUnits(breakpoints, 'px'),
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

export const darkTheme: DefaultTheme = produce(theme, (draft) => {
  draft.colors.text = 'white';
  draft.colors.background = colors.text;
  draft.colors.muted = 'black';
});
