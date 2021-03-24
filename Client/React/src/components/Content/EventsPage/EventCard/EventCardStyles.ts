import { makeStyles } from '@material-ui/styles';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '14vw',
    backgroundColor: theme.backgrounds.bg2,
    marginRight: '2vw',
    marginTop: '3vh',
  },
  cardContentt: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '16px 16px 0 16px',
  },
  title: {
    fontSize: 20,
    lineHeight: 1.5,
    flexGrow: 1,
    marginBottom: '0.7em',
  },
  zoomer: {
    backgroundColor: theme.backgrounds.bg1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '7px',
    marginBottom: '0.35em',
    borderRadius: '4px',
    height: '6vh',
    '& img': {
      height: '36px',
      borderRadius: '100%',
      marginLeft: '7px'
    }
  },
  clickable: {
    cursor: 'pointer',
  },
  category: {
    lineHeight: 1,
  },
  unactive: {
    position: 'absolute',
    marginTop: '-14px',
    padding: '4px',
    fontSize: '0.5em',
    backgroundColor: '#ccc',
    border: '#fafafa solid 1px',
    borderRadius: '15px',
    lineHeight: 0.8,
    fontWeight: 'bold',
  },
  pastEvent: {
    position: 'absolute',
    padding: '4px',
    fontSize: '0.5em',
    backgroundColor: '#ccc',
    border: '#fafafa solid 1px',
    borderRadius: '15px',
    lineHeight: 0.8,
    fontWeight: 'bold',
    transform: 'rotate(-25deg)',
    marginTop: '-1vh',
    marginRight: '9.4vw',
  },
  details: {
    '& p': {
      lineHeight: '1.8',
      fontSize: 15
    }
  },
  cardActions: {
    justifyContent: 'center',
    alignItems: 'stretch',
    '& button': {
      fontSize: '0.7em',
      width: '97vw'
    }
  },
  likeBtn:{
    width: '10vw',
    marginRight: '0px',
    marginLeft: '0px',
  }
});

export default useStyles;