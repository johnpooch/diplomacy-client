import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      alignItems: 'center',
      display: 'flex',
      '& button': {
        color: theme.palette.text.primary,
      },
    },
  };
});
