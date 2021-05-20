import { Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import useStyles from './FormLink.styles';
import { FormLinkComponentProps } from './FormLink.types';

const FormLink: React.FC<FormLinkComponentProps> = ({
  label,
  link,
  prompt,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {prompt} <Link to={link}>{label}</Link>
      </Typography>
    </div>
  );
};

export default withRouter(FormLink);
