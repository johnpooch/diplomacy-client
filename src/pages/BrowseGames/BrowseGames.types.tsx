import { BrowseGame } from '../../types';

export interface BrowseGamesPageProps {
  games: BrowseGame[];
  loading: boolean;
  loadBrowseGames: () => void;
}
