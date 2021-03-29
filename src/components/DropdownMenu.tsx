import styled from '@emotion/styled';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useRef, useState } from 'react';

import { IconButton } from './Button';
import { onClickOutside } from '../utils';
import { colors, spacing } from '../variables';

export const StyledDropdownMenu = styled.div`
  .dropdown-menu {
    position: absolute;
    background: white;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 15%) 0px 1px 3px 1px;
    cursor: pointer;
    transform: translateX(-200px);
    width: 230px;
  }
  .dropdown-menu-item {
    padding: ${spacing[2]}px;
    &:hover {
      text-decoration: underline;
    }
  }
  .dropdown-menu-item-icon {
    margin-right: ${spacing[1]}px;
  }
  button {
    border: none;
    background: inherit;
    font-size: inherit;
    padding: inherit;
    :focus {
      outline: none;
    }
  }
  .dropdown-menu-icon {
    color: ${colors.darkgray};
  }

  .dropdown-menu-icon.active {
    color: ${colors.base};
  }
`;

interface IIconDropdownMenu {
  icon: IconDefinition;
  menuItems: IDropDownMenuItem[];
  title?: string;
}

interface IDropDownMenuItem {
  label: string;
  onClick?: () => void;
  icon?: IconDefinition;
}

export const DropDownMenuItem = ({
  label,
  onClick,
  icon,
}: IDropDownMenuItem): ReactElement => {
  if (onClick) {
    return (
      <div
        className="dropdown-menu-item"
        onClick={onClick}
        onKeyDown={onClick}
        tabIndex={-1}
        role="menuitem"
      >
        {icon && (
          <FontAwesomeIcon icon={icon} className="dropdown-menu-item-icon" />
        )}
        <span>{label}</span>
      </div>
    );
  }
  return <div className="dropdown-menu-item">{label}</div>;
};

DropDownMenuItem.defaultProps = {
  icon: null,
  onClick: null,
};

const IconDropdownMenu: React.FC<IIconDropdownMenu> = ({
  icon,
  menuItems,
  title,
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);

  onClickOutside(ref, () => setOpen(false));
  const onClick = () => setOpen(!open);

  const active = open ? 'active' : '';
  return (
    <div
      ref={ref}
      title={title}
      onClick={onClick}
      role="button"
      onKeyDown={onClick}
      tabIndex={-1}
    >
      <FontAwesomeIcon
        icon={icon}
        size="lg"
        className={`dropdown-menu-icon ${active}`}
      />
      {open && <div className="dropdown-menu">{menuItems}</div>}
    </div>
  );
};

IconDropdownMenu.defaultProps = {
  title: null,
};

export default IconDropdownMenu;
