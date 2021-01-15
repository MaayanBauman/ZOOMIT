import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Typography, Avatar, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

import User from 'models/User/User';
import Category from 'models/Category/Category';

import StoreStateType from 'redux/storeStateType';

import useStyles from './ProfilePageStyle';
import useProfilePage from './useProfilePage';
import EventCategoryRow from '../EventsPage/EventCategoryRow/EventCategoryRow';

const ProfilePage: React.FC = (): JSX.Element => {
    const classes = useStyles();    
    const { categories, eventsByCategories, getUserEventsByCategories, updateUserFavCategories } = useProfilePage();
    
    const user = useSelector<StoreStateType, User>(state => state.user);

    const favoriteHandler = (event : any) => {
        const newFav = event.target.value;
        const favoriteCategories = user.favorite_categories;
        console.log(favoriteCategories);
        let userFavCategories = [];
        if(!favoriteCategories?.find((value) => value === newFav)) {
            userFavCategories = [...favoriteCategories, event.target.value];
        } else {
            userFavCategories = favoriteCategories.filter((item: string) => item !== newFav);
        }
        updateUserFavCategories(user, userFavCategories)
    }

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
                <Typography className={classes.user_actions} variant="subtitle1" gutterBottom>
                    <Button variant="contained" color="primary" className={classes.zoomer_requast_btn}>
                        אני רוצה להיות זומר/ית!
                    </Button>
                </Typography>
            </Typography>
            <Typography className={classes.categories_section}>
                הקטגוריות שלי:
                <FormGroup className={classes.categoriesContainer} >
                    {
                        categories?.map((category: Category) => (
                            <FormControlLabel 
                                onChange={favoriteHandler}
                                control={<Checkbox value={category.id} checked={ user.favorite_categories.includes(category.id)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                                label={category.name}
                            />))
                    }  
                </FormGroup>
            </Typography>
            <Typography className={classes.linked_events_section}>
                הזומים שנרשמתי אליהם:
                <Typography>
                    {
                        Object.keys(eventsByCategories)?.map((categoryName: string) => (<EventCategoryRow key={categoryName} events={eventsByCategories[categoryName]} title={categoryName}/>) )
                    }
                </Typography>
            </Typography>
        </div>
    );
}

export default ProfilePage;
