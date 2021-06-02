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
