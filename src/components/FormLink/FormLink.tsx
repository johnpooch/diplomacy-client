import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { StyledFormLink } from './FormLink.styles';
import { FormLinkComponentProps } from './FormLink.types';

const FormLink: React.FC<FormLinkComponentProps> = ({
  label,
  link,
  prompt,
}) => {
  return (
    <StyledFormLink>
      {prompt} <Link to={link}>{label}</Link>
    </StyledFormLink>
  );
};

export default withRouter(FormLink);
