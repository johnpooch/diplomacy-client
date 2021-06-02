import { makeStyles } from '../MaterialUI';

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
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'contents',

    '& :hover': {
      textDecoration: 'underline',
    },
  },
  rules: {
    color: 'gray',
  },
});
