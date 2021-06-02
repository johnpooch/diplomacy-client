export interface ContextMenuComponentProps {
  onClickOption: (option: string | boolean) => void;
  options: (string | boolean)[][];
}
