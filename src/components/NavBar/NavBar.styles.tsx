import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      '& > div': {
        display: 'grid',
        gridTemplateRows: 'auto',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
        alignItems: 'center',
      },
      '& > *:last-child': {
        justifyContent: 'flex-end',
      },
    },
    logo: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '& > *': {
        display: 'inline',
      },
    },
    buttons: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  };
});
