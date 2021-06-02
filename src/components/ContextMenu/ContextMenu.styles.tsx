import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.background.paper,
      display: 'grid',
      rowGap: theme.spacing(0.25),
      padding: theme.spacing(0.25),
      width: '100%',
    },
  };
});
