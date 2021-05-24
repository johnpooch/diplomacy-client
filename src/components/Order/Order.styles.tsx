import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    root: {},
    order: {
      display: 'flex',
      justifyContent: 'space-between',
      '& > *': {
        display: 'inline',
      },
      '& button': {
        padding: 0,
      },
    },
    disabled: {
      color: theme.palette.text.disabled,
    },
  };
});
