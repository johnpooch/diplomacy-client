import { TurnDisplay } from '../../types';

export enum TurnNavKeys {
  FIRST = 'first',
  NEXT = 'next',
  PREVIOUS = 'previous',
  CURRENT = 'current',
}

export interface TurnNavComponentProps {
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  turn: TurnDisplay;
  turnNavIds: { [key in TurnNavKeys]: number | null };
}
