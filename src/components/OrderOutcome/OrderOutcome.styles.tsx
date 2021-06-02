import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      color: theme.palette.error.main,
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
    outcome: {
      fontWeight: theme.typography.fontWeightBold,
    },
  };
});
