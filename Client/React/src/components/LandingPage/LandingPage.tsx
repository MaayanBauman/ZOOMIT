import { Typography } from '@material-ui/core';

import Login from './Login/Login';
import logo from 'assets/images/Zoomit.png';
import useStyles from './LandingPageStyles';

const LandingPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.backgroundImage + ' ' + classes.container}>
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
            <Login />
            <Typography className={classes.aboutUsMessage}>
                אנחנו משתמשים בחיבור עם גוגל כדי שנוכל
            </Typography>
            <Typography className={classes.aboutUsMessage}>
                (:לשמור איתך על קשר ולשלוח לך את הלינקים לזומים שאצלנו
            </Typography>
            <Typography className={classes.aboutUsMessage}>
               .לא נשתמש בחשבון שלך לשום דבר חוץ מזה
            </Typography>
        </div>
    );
}

export default LandingPage;
