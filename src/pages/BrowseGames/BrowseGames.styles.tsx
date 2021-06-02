import { makeStyles } from '../../components/MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        padding: 0,
      },
    },
  };
});
