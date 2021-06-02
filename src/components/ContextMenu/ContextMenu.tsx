import React from 'react';

import { PrimaryButton } from '../Button';

import useStyles from './ContextMenu.styles';
import { ContextMenuComponentProps } from './ContextMenu.types';

const ContextMenu: React.FC<ContextMenuComponentProps> = ({
  onClickOption,
  options,
}) => {
  const classes = useStyles();
  const handleOptionSelected = (option) => () => onClickOption(option);

  const elements = options.map(([value, label]) => {
    return (
      <PrimaryButton key={`${value}`} onClick={handleOptionSelected(value)}>
        {label}
      </PrimaryButton>
    );
  });

  return <nav className={classes.root}>{elements}</nav>;
};

export default ContextMenu;
