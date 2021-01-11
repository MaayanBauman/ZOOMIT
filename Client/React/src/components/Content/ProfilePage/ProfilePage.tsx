import { useSelector } from 'react-redux';

import { Typography, Avatar, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import User from 'models/User/User';
import Category from 'models/Category/Category';
import EventsByCategories from 'models/Event/EventsByCategories';
import StoreStateType from 'redux/storeStateType';
import EventCategoryRow from '../EventsPage/EventCategoryRow/EventCategoryRow';

import useStyles from './ProfilePageStyle';
import { getEventsByCatgory } from 'utils/Event';
import useEventsPage from '../EventsPage/useEventsPage';

const ProfilePage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    
    const user = useSelector<StoreStateType, User>(state => state.user);
    const eventsByCategories: EventsByCategories = getEventsByCatgory(user.registerd_events);
    const { categories } = useEventsPage();

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
                        אני רוצה להיות זומר\ית!
                    </Button>
                </Typography>
            </Typography>
            <Typography className={classes.categories_section}>
                הקטגוריות שלי:
                <Typography>
                    {
                        categories.map((category: Category) => (
                            <Typography className={classes.categoriesContainer}> 
                                {user.favorite_categories.includes(category) ? <StarIcon onClick={() => console.log('remove from favorite_categories') } /> : <StarBorderIcon onClick={() => console.log('add to favorite_categories') }/>}
                                {category.name} 
                            </Typography>
                        ))
                    }
                </Typography>
            </Typography>
            <Typography className={classes.linked_events_section}>
                הזומים שנרשמתי אליהם:
                <Typography>
                    {
                        Object.keys(eventsByCategories).map((categoryName: string) => (<EventCategoryRow key={categoryName} events={eventsByCategories[categoryName]} title={categoryName}/>) )
                    }
                </Typography>
            </Typography>
        </div>
    );
}

export default ProfilePage;
