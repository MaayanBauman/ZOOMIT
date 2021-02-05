import { makeStyles } from '@material-ui/styles';

import backgroundImage from 'assets/images/background.png';

const useStyle = makeStyles({
    backgroundImage: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '100vw',
        height: '91vh',
        backgroundPosition: 'bottom',
    }, 
    container: {
        marginTop: '2vh',
        width: '100vw',
        overflow: 'hidden'
    },
    message: {
        margin : 'auto',
        marginTop: '20vh',
        fontSize: 30,
    }, 
    redirectButton: {
        marginTop: '2vh',
        width: '15vw',
        margin : 'auto'
    }, 
    details: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default useStyle;
