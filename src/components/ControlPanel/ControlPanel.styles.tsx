import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      '& h6': {
        padding: theme.spacing(1, 0, 0, 1),
      },
    },
    drawer: {},
    drawerPaper: {},
    ordersSection: {
      padding: theme.spacing(1),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
      '& > button': {
        width: '100%',
      },
    },
    orderCount: {
      textAlign: 'right',
    },
    tabs: {
      display: 'flex',
    },
  };
});
