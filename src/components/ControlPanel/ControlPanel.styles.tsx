import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {},
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
  };
});
