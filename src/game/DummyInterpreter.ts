/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Territory } from './types';

export default class DummyInterpreter {
  /* This interpreter class is used when the user cannot interact with the board,
  e.g. Buid phase and the user has no surplus or deficit. */

  showContextMenu(): boolean {
    return false;
  }

  getContextMenuOptions(): string[][] {
    return [[]];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canSelectTerritory(_territory: Territory): boolean {
    return false;
  }

  onClickTerritory(_territory: Territory): void {}

  onClickOption(option: string | boolean): void {}
}
