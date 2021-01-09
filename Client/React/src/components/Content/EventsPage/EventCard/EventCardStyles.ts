import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
  root: {
    width: '14vw',
    backgroundColor: theme.backgrounds.bg2,
    marginRight: '2vw',
    marginTop: '3vh',
    direction: 'rtl',
  },
  cardContentt: {
    padding: '16px 16px 0 16px'
  },
  title: {
    fontSize: 20,
  },
  zoomer: {
    backgroundColor: theme.backgrounds.bg1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '7px',
    marginBottom: '0.35em',
    borderRadius: '4px',
    '& img': {
      height: '36px',
      borderRadius: '100%',
      marginLeft: '7px'
    }
  },
  details: {
    '& p': {
      lineHeight: '1.8',
      fontSize: 15
    }
  },
  cardActions: {
    justifyContent: 'space-between',
    '& button': {
      flexBasis: '47%'
    },
    '& > :not(:first-child)': {
      margin: 0
    }
  }
});

export default useStyles;