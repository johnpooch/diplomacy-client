import { makeStyles } from '../../MaterialUI';

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
