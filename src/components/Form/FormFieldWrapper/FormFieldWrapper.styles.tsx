import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(0, 2, 2, 2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  };
});
