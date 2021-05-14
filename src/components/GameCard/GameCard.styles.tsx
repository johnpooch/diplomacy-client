import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  actions: {
    padding: '0 16px 16px 16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: 0,
  },
  content: {
    '& *': {
      marginTop: '8px',
    },
  },
  rules: {
    color: 'gray',
  },
});
