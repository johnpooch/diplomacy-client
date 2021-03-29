import {
  faAnchor,
  faIndustry,
  faMapMarkerAlt,
  faTruckMoving,
} from '@fortawesome/free-solid-svg-icons';

export const icons = {
  army: faTruckMoving,
  fleet: faAnchor,
  supplyCenter: faIndustry,
  territory: faMapMarkerAlt,
};

export const breakpoints = {
  extraSmall: 480,
  small: 768,
  medium: 992,
  large: 1200,
};

export const colors = {
  white: '#ffffff',
  base: '#111111',
  darkgray: '#aaaaaa',
  gray: '#ebeef1',
  sea: '#79bde1',
  land: '#e3d8c4',
  nations: {
    'standard-england': '#ff1103',
    'standard-france': '#0074d9',
    'standard-germany': '#777777',
    'standard-austria-hungary': '#E69F00',
    'standard-italy': '#2ecc40',
    'standard-russia': '#b10dc9',
    'standard-turkey': '#508e59',
  },
  error: '#ff1103',
  success: '#508e59',
};

export const flagSizes = {
  small: 30,
  medium: 80,
};

export const fontFamilies = {
  sans:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

export const fontSizes = {
  sans: [9, 13, 15, 19, 36],
};

export const spacing = [4, 8, 12, 16, 24, 32, 44, 60];

export const sizes = {
  padding: spacing[3],
  border: 2,
  borderRadius: [6, 8, 16],
  error: 14,
  innerWidth: 690,
  outerWidth: 1260,
  statusBarHeight: 72,
  input: 44,
  line: 3,
  button: 160,
};

export const variables = {
  breakpoints,
  colors,
  flagSizes,
  fontFamilies,
  fontSizes,
  icons,
  sizes,
  spacing,
};
