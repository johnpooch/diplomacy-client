import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 0),
      '& label': {
        padding: theme.spacing(1, 0),
      },
      '& form': {
        padding: theme.spacing(0, 3),
        paddingBottom: theme.spacing(3),
      },
      '& button': {
        marginTop: theme.spacing(2),
        width: '100%',
      },
      '& .form-links': {
        borderTop: `${theme.palette.primary.light} solid 1px`,
        padding: theme.spacing(3, 3, 0, 3),
        '& > *:not(:last-child)': {
          marginBottom: theme.spacing(2),
        },
      },
    },
    header: {
      width: '100%',
      textAlign: 'center',
    },
  };
});

// export default styled(Paper)`
//   background-color: ${(p) => p.theme.colors.surface};
//   h2 {
//   }
//   button {
//     width: 100%;
//   }
//   .form-links {
//     border-top: ${(p) => p.theme.colors.primary.light}
//       ${(p) => p.theme.borderWidths[0]} solid;
//     padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[3]} 0
//       ${(p) => p.theme.space[3]};
//     > *:not(:last-child) {
//       margin-bottom: ${(p) => p.theme.space[2]};
//     }
//   }
// `;
