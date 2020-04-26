import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

const ExpandFormButton = (props) => {
  const { open, toggle } = props;
  const icon = open ? faTimes : faChevronDown;
  return (
    <button className="filter-open-control" type="button" onClick={toggle}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ExpandFormButton;
