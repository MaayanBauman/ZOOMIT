import { makeStyles } from '@material-ui/styles';
import backgroundImage from 'assets/images/background.png';

const useStyles = makeStyles(() => ({
    signInGoogle: {
        width: '18vw',
        height: '8vh',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '9vh',
        marginBottom: '2vh',
        fontFamily: "Assistant!important",
        font: 'black!important'
    }
}));

export default useStyles;