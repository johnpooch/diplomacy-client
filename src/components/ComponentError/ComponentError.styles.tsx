import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      color: theme.palette.error.main,
      textAlign: 'center',

      '& > svg': {
        marginBottom: theme.spacing(3),
      },
    },

    icon: {
      textAlign: 'center',
    },
  };
});
