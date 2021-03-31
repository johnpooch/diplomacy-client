import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';

import { onClickOutside, getErrors } from '../utils';

export const StyledDropdownMenu = styled.div`
  div:focus {
    outline: none;
  }
  .dropdown-menu {
    background: ${(p) => p.theme.colors.muted};
    border-radius: ${(p) => p.theme.radii[2]};
    box-shadow: ${(p) => p.theme.shadows[0]};
    cursor: pointer;
    position: absolute;
    transform: translateX(-200px);
    width: 230px;
  }
  .dropdown-menu-item {
    padding: ${(p) => p.theme.space[2]};
    &:hover {
      text-decoration: underline;
    }
  }
  .dropdown-menu-item-icon {
    margin-right: ${(p) => p.theme.space[1]};
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
    color: ${(p) => p.theme.colors.accent};
  }

  .dropdown-menu-icon.active {
    color: ${(p) => p.theme.colors.text};
  }
`;

interface IIconDropdownMenu {
  icon: IconDefinition;
  menuItems: ReactElement[];
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
