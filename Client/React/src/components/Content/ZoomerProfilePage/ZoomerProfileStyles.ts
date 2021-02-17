import { makeStyles } from '@material-ui/styles';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
    zoomerDetailes: {
        display: 'flex', 
        flexDirection: 'column',
        marginRight: '4vw',
        marginTop: '4vh',
        overflowY: 'auto'
    },
    zoomerImg: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }, 
    zoomerHead: {
        display: 'flex',
        flexDirection: 'row'
    }, 
    zoomerName: {
        fontSize: 30,
        color: theme.typography.subtitle1.color
    }, 
    zoomerTitle: {
        marginRight: '2vw',
    },
    zoomerDescription: {
        marginTop: '3vh',
        marginRight: '2vw',
        width: '50vw'
    }, 
    zoomerEvents: {
        marginTop: '8vh',
    }
});

export default useStyles;