import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import backgroundImage from 'assets/images/background.png';

const useStyles = makeStyles((theme: Theme) => ({
    backgroundImage: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '100vw',
        height: '53vh',
        backgroundPosition: 'bottom',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }, 
    crowdTitle: {
        fontSize: 25,
        color: theme.typography.subtitle1.color
    }, 
    addEventButton: {
        color: theme.palette.primary.main,
        width: '15vw',
        height: '15vw'
    }
}));

export default useStyles;