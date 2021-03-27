import React, { ReactElement } from 'react';

type Props = {
  text: string;
};

const DropdownMenu = ({ text }: Props): ReactElement => <div>{text}</div>;

export default DropdownMenu;
