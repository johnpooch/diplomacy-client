import { BrowseGame } from '../../types';

export interface GameCardComponentProps {
  joinGame: (gameSlug: string) => void;
  leaveGame: (gameSlug: string) => void;
  game: BrowseGame;
}
