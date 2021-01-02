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

export const colors = {
  white: '#ffffff',
  base: '#111111',
  darkgray: '#aaaaaa',
  gray: '#ebeef1',
  sea: '#79bde1',
  land: '#e3d8c4',
  nations: {
    // england
    1: '#ff1103',
    // france
    2: '#0074d9',
    // germany
    3: '#777777',
    // austria-hungary
    4: '#E69F00',
    // italy
    5: '#2ecc40',
    // russia
    6: '#b10dc9',
    // turkey
    7: '#508e59',
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
  innerWidth: 690,
  outerWidth: 1260,
  statusBarHeight: 72,
  input: 44,
  line: 3,
  button: 160,
};

export const variables = {
  colors,
  flagSizes,
  fontFamilies,
  fontSizes,
  icons,
  sizes,
  spacing,
};
