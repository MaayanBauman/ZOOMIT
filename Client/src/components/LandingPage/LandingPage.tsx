import { Typography } from '@material-ui/core';
import logo from 'assets/images/Zoomit.png';
import useStyles from './LandingPageStyles';


const LandingPage: React.FC = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.backgroundIamge + ' ' + classes.container}>
            <div className={classes.logoContainer}>
                <img src={logo} alt='logo'  className={classes.logo}/>
            </div>
            <Typography className={classes.aboutUsMessage}>
                . מרכזים לך את כל אירועי הזום הכי חמים בתחומי עניין מגוונים Zoomit-ב
            </Typography>
            <Typography className={classes.aboutUsMessage}>
            !יש לך שעה פנויה? רק צריך להיכנס ולמצוא את מה שבא לך לראות
            </Typography>
            <Typography className={classes.aboutUsMessage}>
                (:מה שנשאר לך לעשות זה להירשם ולהינות
            </Typography>
        </div>
    );
}

export default LandingPage;
