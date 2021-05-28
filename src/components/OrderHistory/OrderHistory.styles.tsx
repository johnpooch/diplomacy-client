import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '& .Mui-expanded': {
        margin: 0,
      },
    },
    expanded: {},
    summary: {
      alignItems: 'center',
      display: 'flex',
    },
    details: {
      display: 'block',
    },
    order: {
      paddingBottom: theme.spacing(1),
    },
    playerSummary: {
      margin: theme.spacing(0, 0, 0, 2),
      minHeight: theme.spacing(6),
      alignItems: 'center',
      display: 'flex',
    },
  };
});
