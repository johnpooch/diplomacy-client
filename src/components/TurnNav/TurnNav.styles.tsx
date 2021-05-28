import { makeStyles } from '@material-ui/core/styles';

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
