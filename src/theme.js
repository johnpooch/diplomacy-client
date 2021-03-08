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
  text: '#222222',
  background: 'peru',
  primary: 'darkgreen',
  secondary: 'darkorange',
  muted: 'papayawhip',
  nations: {
    1: '#ff1103', // England
    2: '#0074d9', // France
    3: '#777777', // Germany
    4: '#e69f00', // Austria-Hungary
    5: '#2ecc40', // Italy
    6: '#b10dc9', // Russia
    7: '#508e59', // Turkey
  },
  game: {
    land: '#e3d8c4',
    sea: '#79bde1',
  },
  status: {
    error: {
      text: '#ff1103',
      background: '#f5dddb',
    },
    success: {
      text: '#508e59',
      background: '#c3f5ca',
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
const borderWidths = [2];
const radii = [6, 8, 16];
const sizes = {
  innerWidth: '690px',
  outerWidth: '1260px',
  statusBarHeight: '72px',
  inputMinSize: '44px',
  buttonMinWidth: '160px',
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
  fontSizes: withUnits(fontSizes, 'px'),
  fontWeights,
  lineHeights,
  space: withUnits(space, 'px'),
  borderWidths: withUnits(borderWidths, 'px'),
  radii: withUnits(radii, 'px'),
  sizes,
  icons,
};

export const darkTheme = produce(theme, (draft) => {
  draft.colors.text = colors.background;
  draft.colors.background = colors.text;
});
