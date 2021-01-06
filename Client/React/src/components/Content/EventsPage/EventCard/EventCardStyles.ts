import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: '14vw',
      height: '40vh',
      backgroundColor: '#E4F7EB',
      marginRight: '2vw'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
    },
    pos: {
      marginBottom: 12,
    },
    zoomer: {
      backgroundColor: 'white',
      width: '100vw',
      height: '10vh',
    }
  });

export default useStyles;