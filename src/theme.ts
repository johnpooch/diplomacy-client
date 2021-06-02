import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fafafa',
    },
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    nations: {
      'standard-england': {
        main: '#ff1103',
      },
      'standard-france': {
        main: '#0074d9',
      },
      'standard-germany': {
        main: '#777777',
      },
      'standard-austria-hungary': {
        main: '#FC8889',
      },
      'standard-italy': {
        main: '#2ecc40',
      },
      'standard-russia': {
        main: '#b10dc9',
      },
      'standard-turkey': {
        main: '#508e59',
      },
    },
    map: {
      land: '#e3d8c4',
      sea: '#79bde1',
      background: 'black',
      text: 'black',
      pieceCircleStroke: 'white',
      pieceCircleFill: 'white',
    },
  },
  typography: {
    body1: {
      fontWeight: 500,
      fontVariationSettings: '"wght" 500',
      lineHeight: '24px',
    },
    body2: {
      fontWeight: 500,
      fontVariationSettings: '"wght" 500',
      lineHeight: '16px',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      fontVariationSettings: '"wght" 700',
    },
    fontFamily: [
      'Work Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export const darkTheme = createMuiTheme();
