import { makeStyles } from '../MaterialUI';

export default makeStyles(() => {
  return {
    root: {
      '& span:first-of-type': {
        textTransform: 'capitalize',
      },
      '& .text': {
        display: 'inline',
      },
    },
    aux: {},
    orderType: {},
    prep: {},
    pieceType: {},
    source: {},
    target: {},
    targetCoast: {},
  };
});
