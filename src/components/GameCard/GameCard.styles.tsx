import { makeStyles } from '../MaterialUI';

export default makeStyles((theme) => {
  return {
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
    tableContainer: {
      marginTop: 0,
    },
    table: {
      display: 'block',
      marginTop: 'none',
      '& th, td': {
        color: theme.palette.text.secondary,
        border: 'none',
        paddingRight: theme.spacing(2),
      },
      '& th': {
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: theme.typography.body2.fontSize,
        lineHeight: '14px',
      },
    },
  };
});
