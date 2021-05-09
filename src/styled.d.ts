import 'styled-components';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface NationColors {
  [key: string]: string;
}
type MapColors = {
  [key in 'land' | 'sea']: string;
};
type StatusColors = {
  [key: string]: { [key in 'primary' | 'muted']: string };
};
type TintColors = {
  [key in 'main' | 'light' | 'lighter']: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    borders: string[];
    borderWidths: number[];
    borderWidthsUnitless: number[];
    breakpoints: string[];
    colors: {
      [key: string]:
        | string
        | MapColors
        | NationColors
        | StatusColors
        | TintColors;
    };
    icons: { [key: string]: IconDefinition };
    fonts: { [key: string]: string };
    fontSizesUnitless: number[];
    lineHeights: { [key: string]: number };
    spaceUnitless: number[];
    space: number[];
    fontSizes: number[];
    fontWeights: { [key: string]: number };
    sizes: { [key: string]: string };
    shadows: string[];
    radii: string[];
    radiiUnitless: number[];
  }
}
