import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      alignItems: 'center',
      display: 'flex',
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
  };
});
