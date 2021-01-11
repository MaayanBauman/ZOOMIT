import { makeStyles } from '@material-ui/styles';
import backgroundImage from 'assets/images/background.png';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: 'auto',
        height: '30vh',
    },
    backgroundImage: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'bottom'
    }, 
    logo: {
        width: 'auto',
        height: '40%',
        marginTop: '9vh',
    },
    aboutUsMessage: {
        display: 'flex',
        justifyContent: 'center',
    },
    signInGoogle: {
        width: '18vw',
        height: '8vh',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '9vh',
        marginBottom: '2vh'
    }
}));

export default useStyles;