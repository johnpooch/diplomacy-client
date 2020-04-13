export const fonts = {
  sans:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

export const colors = {
  base: 'black',
  gray: 'lightslategray',
  red: 'red',
  sea: 'powderblue',
  land: 'papayaWhip',
  nations: {
    // England
    1: {
      territory: 'red',
      piece: 'red',
    },
    // France
    2: {
      territory: 'blue',
      piece: 'blue',
    },
    // Germany
    3: {
      territory: 'darkslategray',
      piece: 'darkslategray',
    },
    // Austria-Hungary
    4: {
      territory: 'sienna',
      piece: 'sienna',
    },
    // Italy
    5: {
      territory: 'green',
      piece: 'green',
    },
    // Russia
    6: {
      territory: 'darkviolet',
      piece: 'darkviolet',
    },
    // Turkey
    7: {
      territory: 'darkorange',
      piece: 'darkorange',
    },
  },
};

export const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

export const sizes = {
  p: spacing[3],
  border: 3,
  navHeight: 50,
};
