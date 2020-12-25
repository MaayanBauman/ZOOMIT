import { makeStyles } from '@material-ui/styles';
import backgroundImage from 'assets/images/background.png';

const useStyles = makeStyles(() => ({
    backgroundIamge: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'bottom'
    }
}));

export default useStyles;