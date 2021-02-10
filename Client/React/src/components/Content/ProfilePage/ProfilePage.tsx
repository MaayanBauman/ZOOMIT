import { useEffect } from 'react';

import { Typography, Avatar, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import Category from 'models/Category/Category';

import useStyles from './ProfilePageStyle';
import useProfilePage from './useProfilePage';
import EventsCarousel from '../EventsPage/EventCategoryRow/EventsCarousel';
import UserType from 'models/Enums/UserType';

const ProfilePage: React.FC = (): JSX.Element => {
    const classes = useStyles();    
    const { user, categories, events, getUserEventsByCategories, favoriteHandler, createNewZoomerReq, cancelZoomerReq } = useProfilePage();
    
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
                    user.user_type === UserType.USER && ( 
                        !user.is_waiting_for_approval ? 
                            <Typography className={classes.user_actions} variant="subtitle1" gutterBottom>
                                <Button variant="contained" color="primary" onClick={() => createNewZoomerReq(user)} className={classes.zoomer_requast_btn}>
                                    אני רוצה להיות זומר/ית!
                                </Button>
                            </Typography>
                            :
                            <Typography className={classes.user_actions} variant="subtitle1" gutterBottom>
                                <Button variant="contained" color="secondary" onClick={() => cancelZoomerReq(user)} className={classes.zoomer_requast_btn}>
                                    בטל בקשה להיות זומר/ית
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
