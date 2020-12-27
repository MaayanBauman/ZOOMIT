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
    backgroundIamge: {
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
        height: '50%',
        marginTop: '9vh',
    },
    aboutUsMessage: {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Assistant',
    }
}));

export default useStyles;