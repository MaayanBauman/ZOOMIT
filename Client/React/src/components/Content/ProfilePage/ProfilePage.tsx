import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Typography, Avatar, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

import User from 'models/User/User';
import Category from 'models/Category/Category';

import StoreStateType from 'redux/storeStateType';

import useStyles from './ProfilePageStyle';
import useProfilePage from './useProfilePage';
import EventsCarousel from '../EventsPage/EventCategoryRow/EventsCarousel';

const ProfilePage: React.FC = (): JSX.Element => {
    const classes = useStyles();    
    const { categories, events, getUserEventsByCategories, favoriteHandler, createNewZoomerReq } = useProfilePage();
    
    const user = useSelector<StoreStateType, User>(state => state.user);

    useEffect(() => {
        user._id !== '' && getUserEventsByCategories(user._id);
    }, []);

    return (
        <div className={classes.container}>
            <Typography className={classes.topbar}>
                <Typography className={classes.user_info}>
                    <Avatar className={classes.avatar} alt={user.full_name} src={user.photograph} />
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                            {user.full_name}
                    </Typography>
                </Typography>
                {
                    user.user_type === 'user' && (
                        <Typography className={classes.user_actions} variant="subtitle1" gutterBottom>
                            <Button variant="contained" color="primary" onClick={() => createNewZoomerReq(user._id)} className={classes.zoomer_requast_btn}>
                                אני רוצה להיות זומר/ית!
                            </Button>
                        </Typography>
                    )
                }
            </Typography>
            <Typography className={classes.categories_section}>
                הקטגוריות שלי:
                <FormGroup className={classes.categoriesContainer} >
                    {
                        categories?.map((category: Category) => (
                            <FormControlLabel 
                                onChange={(e) => favoriteHandler(e, user)}
                                control={<Checkbox value={category.id} checked={ user.favorite_categories.includes(category.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                                label={category.name}
                            />))
                    }  
                </FormGroup>
            </Typography>
            <Typography className={classes.linked_events_section}>
                הזומים שנרשמתי אליהם:
                {
                    events.length ? 
                        (<EventsCarousel events={events}/> )
                    : 
                        (<Typography className={classes.noEventsMsg}>אינך רשום לזומים :(</Typography>)
                }
            </Typography>
        </div>
    );
}

export default ProfilePage;
