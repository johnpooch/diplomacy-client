// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    nations?: { [key: string]: PaletteColorOptions };
    map?: {
      land: strings;
      sea: strings;
      background: strings;
      text: strings;
      pieceCircleStroke: strings;
      pieceCircleFill: strings;
    };
  }
}
