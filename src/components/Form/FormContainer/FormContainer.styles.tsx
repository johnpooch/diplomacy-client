import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(4),
      [theme.breakpoints.only('xs')]: {
        padding: '0',
      },
    },
  };
});
