import { makeStyles } from '../../components/MaterialUI';

export default makeStyles((theme) => {
  return {
    bottomNav: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: theme.zIndex.drawer + 101,
      display: 'flex',
      justifyContent: 'center',
    },
    contextMenu: {
      zIndex: theme.zIndex.drawer + 102,
    },
    drawerPaper: {
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  };
});
