import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    root: {
      listStyle: 'none',
      // TODO move to global
      marginBlockStart: 0,
      paddingInlineStart: 0,
      marginBlockEnd: 0,

      '& > *': {
        marginBottom: theme.spacing(1),
      },
    },
  };
});
