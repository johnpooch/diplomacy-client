// import {
//   faAnchor,
//   faCheck,
//   faExclamationTriangle,
//   faMapMarkerAlt,
//   faStar,
//   faTimes,
//   faTruckMoving,
//   faUser,
// } from '@fortawesome/free-solid-svg-icons';
// import { createMuiTheme } from '@material-ui/core/styles';
// import produce from 'immer';
// import { DefaultTheme } from 'styled-components';

import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';

// import { withUnits } from './utils';

// // based on https://theme-ui.com/theme-spec/
// const breakpoints = [480, 768, 992, 1200];

// const colors = {
//   text: {
//     main: 'black',
//     light: '#616161',
//     lighter: '#959595',
//   },
//   background: '#F0F0F0',
//   border: 'black',
//   primary: {
//     main: '#9D0189',
//     light: '#E896DD',
//     lighter: '#FFD6FA',
//   },
//   secondary: {
//     main: '#FFA87B',
//     light: '#FFC2A2',
//     lighter: '#FFD9C5',
//   },
//   surface: 'white',
//   accent: 'slateblue',
//   muted: 'white',
//   nations: {
//     'standard-england': '#ff1103',
//     'standard-france': '#0074d9',
//     'standard-germany': '#777777',
//     'standard-austria-hungary': '#FC8889',
//     'standard-italy': '#2ecc40',
//     'standard-russia': '#b10dc9',
//     'standard-turkey': '#508e59',
//   },
//   map: {
//     land: '#e3d8c4',
//     sea: '#79bde1',
//     background: 'black',
//     text: 'black',
//     pieceCircleStroke: 'white',
//     pieceCircleFill: 'white',
//   },
//   status: {
//     error: {
//       main: '#F35C6E',
//       light: '#F89DA8',
//       lighter: '#FDDEE2',
//     },
//     success: {
//       primary: '#508e59',
//       muted: '#c3f5ca',
//     },
//   },
//   white: 'white',
// };
// const fonts = {
//   sans:
//     '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
// };
// const fontSizes = [9, 13, 16, 19, 36];
// const fontWeights = {
//   body: 500,
//   display: 700,
//   bold: 700,
// };
// const lineHeights = {
//   body: 1.5,
//   display: 1.1,
// };
// const space = [4, 8, 12, 16, 24, 32, 44, 60];
// const borderWidths = [1, 2, 3];
// const borders = [`${borderWidths[0]}px solid ${colors.secondary}`];
// const radii = [6, 8, 16];
// const shadows = [`rgba(0, 0, 0, 0.15) 0px 1px 3px 1px`];
// const sizes = {
//   pageMaxWidth: '690px',
//   inputMinSize: '44px',
//   sidebarWidth: '320px',
//   flag: withUnits([32, 48], 'px'),
// };
// const icons = {
//   accept: faCheck,
//   army: faTruckMoving,
//   cancel: faTimes,
//   fleet: faAnchor,
//   player: faUser,
//   supplyCenter: faStar,
//   territory: faMapMarkerAlt,
//   warning: faExclamationTriangle,
// };

// export const theme: DefaultTheme = {
//   breakpoints: withUnits(breakpoints, 'px'),
//   colors,
//   fonts,
//   fontSizes: withUnits(fontSizes, 'px'),
//   fontSizesUnitless: fontSizes,
//   fontWeights,
//   lineHeights,
//   space: withUnits(space, 'px'),
//   spaceUnitless: space,
//   borderWidths: withUnits(borderWidths, 'px'),
//   borderWidthsUnitless: borderWidths,
//   borders,
//   radii: withUnits(radii, 'px'),
//   radiiUnitless: radii,
//   shadows,
//   sizes,
//   icons,
// };

// export const darkTheme: DefaultTheme = produce(theme, (draft) => {
//   draft.colors.background = colors.text;
//   draft.colors.muted = 'black';
// });

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
