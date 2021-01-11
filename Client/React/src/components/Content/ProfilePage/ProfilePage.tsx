import { Typography, Avatar, Button } from '@material-ui/core';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import StoreStateType from 'redux/storeStateType';
import useStyles from './ProfilePageStyle';

const ProfilePage: React.FC = (): JSX.Element => {
    const classes = useStyles();

    const user = useSelector<StoreStateType, User>(state => state.user);
   

    return (
        <div className={classes.container}>
            <Typography className={classes.topbar}>
                <Typography className={classes.user_info}>
                    <Avatar className={classes.avatar} alt={user.full_name} src={user.photograph} />
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                            {user.full_name}
                    </Typography>
                </Typography>
                <Button variant="contained" color="primary" className={classes.zoomer_requast_btn}>
                    אני רוצה להיות זומר\ית!
                </Button>
            </Typography>
        </div>
    );
}

export default ProfilePage;
