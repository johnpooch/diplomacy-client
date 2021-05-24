import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  return {
    root: {
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '& .Mui-expanded': {
        margin: 0,
      },
    },
    expanded: {},
    summary: {
      alignItems: 'center',
      display: 'flex',
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
    details: {
      display: 'block',
    },
    order: {
      paddingBottom: theme.spacing(1),
    },
  };
});
