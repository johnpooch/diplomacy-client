import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      border: 'none',
      borderRadius: theme.spacing(1),
      color: theme.palette.text.primary,
      padding: theme.spacing(3),

      '& &:focus-visible': {
        backgroundColor: theme.palette.background.paper,
        border: `${theme.spacing(0.125)}px solid`,
        boxSizing: 'border-box',
        color: theme.palette.text.primary,
        outline: 'none',
      },
      '& &:not(:placeholder-shown)': {
        backgroundColor: theme.palette.background.paper,
        border: `${theme.spacing(0.125)} solid`,
      },
    },
  };
});
