import { Height } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
  root: {
    display: 'block',
    backgroundColor: theme.backgrounds.bg2,
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
  },
  cardContentt: {
    padding: '8px 8px 0 8px',
  },
  title: {
    fontSize: 16,
    lineHeight: 1.5,
    cursor: 'pointer',
    direction: 'rtl',
    textAlign: 'right',
  },
  english: {
    direction: 'ltr',
    textAlign: 'left',
  },
  zoomer: {
    padding: '7px',
    height: '6vh',
    '& img': {
      height: '36px',
      borderRadius: '100%',
    }
  },
  clickable: {
    cursor: 'pointer',
  },
  unactive: {
    position: 'relative',
    width: 'max-content',
    marginTop: '-14px',
    padding: '4px',
    fontSize: '0.5em',
    backgroundColor: '#ccc',
    border: '#fafafa solid 1px',
    borderRadius: '15px',
    lineHeight: 0.8,
    fontWeight: 'bold',
  },
  details: {
    direction: 'rtl',
    textAlign: 'center',
    lineHeight: '1.5',
    fontSize: 15,
    color: '#868692',
    '& p': {
      lineHeight: '1.5',
      fontSize: 13
    }
  },
  cardActions: {
    justifyContent: 'center',
    alignItems: 'stretch',
    '& button': {
      fontSize: '0.7em',
      width: '100%'
    }
  },
  rating:{
    direction: 'rtl',
  },
  ratingContainer: {
    textAlign: 'center',
  },
});

export default useStyles;