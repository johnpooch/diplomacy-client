import { makeStyles } from '../../components/MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        padding: 0,
      },
    },
    browseGameFilter: {
      maxWidth: '200px',
      padding: theme.spacing(2, 0, 2, 1),
    },
  };
});
