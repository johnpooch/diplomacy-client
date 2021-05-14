import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    buffer: {
      marginTop: '75px',
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
      '& > h3': {
        display: 'inline',
      },
    },
    buttons: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  };
});
