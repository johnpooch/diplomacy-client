import produce from 'immer';
import {
  faAnchor,
  faIndustry,
  faMapMarkerAlt,
  faTruckMoving,
} from '@fortawesome/free-solid-svg-icons';
import { withUnits } from './utils';

// based on https://theme-ui.com/theme-spec/
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
const fontSizes = withUnits([9, 13, 15, 19, 36], 'px');
const fontWeights = {
  body: 400,
  heading: 700,
  bold: 700,
};
const lineHeights = {
  body: 1.5,
  heading: 1.125,
};
const space = withUnits([4, 8, 12, 16, 24, 32, 44, 60], 'px');
const borderWidths = withUnits([1], 'px');
const borders = [`${borderWidths[0]} solid ${colors.secondary}`];
const radii = withUnits([6, 8, 16], 'px');
const sizes = {
  pageMaxWidth: '690px',
  inputMinSize: '44px',
  sidebarMaxWidth: '320px',
  flag: withUnits([30, 80], 'px'),
};
const icons = {
  army: faTruckMoving,
  fleet: faAnchor,
  supplyCenter: faIndustry,
  territory: faMapMarkerAlt,
};

export const theme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
  borderWidths,
  borders,
  radii,
  sizes,
  icons,
};

export const darkTheme = produce(theme, (draft) => {
  draft.colors.text = 'white';
  draft.colors.background = colors.text;
  draft.colors.muted = 'black';
});
