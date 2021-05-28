import { makeStyles } from '../../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  };
});
