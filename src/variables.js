export const fontFamilies = {
  sans:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

export const fontSizes = {
  sans: [4, 13, 15, 19, 36],
};

export const colors = {
  base: '#444444',
  darkgray: '#999999',
  gray: '#ebeef1',
  flashErrorText: '#ad6678',
  flashErrorBackground: '#f2dedf',
  flashSuccessText: '#3e7947',
  flashSuccessBackground: '#dff0d8',
  yellow: '#ffdc00',
  sea: '#79bde1',
  land: '#e3d8c4',
  nations: {
    // england
    1: '#ff4136',
    // france
    2: '#0074d9',
    // germany
    3: '#777777',
    // austria-hungary
    4: '#ff851b',
    // italy
    5: '#2ecc40',
    // russia
    6: '#b10dc9',
    // turkey
    7: '#ffdc00',
  },
};

export const spacing = [4, 8, 12, 16, 24, 32, 44, 60];

export const sizes = {
  padding: spacing[3],
  border: 1,
  borderRadius: [8, 16],
  maxWidth: 1260,
  headerHeight: 48,
};

export const colorMap = {
  'alert-danger': {
    text: colors.flashErrorText,
    background: colors.flashErrorBackground,
  },
  'alert-success': {
    text: colors.flashSuccessText,
    background: colors.flashSuccessBackground,
  },
};
