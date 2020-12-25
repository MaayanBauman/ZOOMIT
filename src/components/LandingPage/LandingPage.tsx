import { Typography } from '@material-ui/core';
import logo from 'assets/images/Zoomit.png';
import useStyles from './LandingPageStyles';


const LandingPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const aboutUsMessage = 'בZoomit מרכזים לך את כל אירועי הזום הכי חמים בתחומי עניין מגוונים.';

    return (
        <div className={classes.backgroundIamge + ' ' + classes.container}>
            <div className={classes.logoContainer}>
                <img src={logo} alt='logo'  className={classes.logo}/>
            </div>
            <Typography className={classes.aboutUsMessage}>
                {aboutUsMessage}
            </Typography>
        </div>
    );
}

export default LandingPage;
