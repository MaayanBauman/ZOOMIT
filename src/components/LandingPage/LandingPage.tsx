import logo from 'assets/images/Zoomit.png';
import useStyles from './LandingPageStyles';


const LandingPage: React.FC = (): JSX.Element => {
    const classes = useStyles();

    return (
          <div className={classes.backgroundIamge}></div>
    );
}

export default LandingPage;
