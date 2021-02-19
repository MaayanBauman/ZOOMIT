import React from 'react';
import Typography from '@material-ui/core/Typography';
import useEventsPage from './useEventsPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategoryRow';
import FilterBox from './FilterBox/FilterBox';
import {EventsByFullCategories} from 'models/Event/EventsByCategories';
import { getFullEventsByCatgory } from 'utils/Event';
import StoreStateType from 'redux/storeStateType';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';

const EventsPage: React.FC = (): JSX.Element => {
    const user = useSelector<StoreStateType, User>(state => state.user);
    
    const classes = useStyles();
    const { events, categories, getEventByFilters} = useEventsPage();
    const eventsByCategories: EventsByFullCategories = getFullEventsByCatgory(events);
    
    return (
        <>
            <div className={classes.container}>
                <div className={classes.topbar}>
                    <Typography className={classes.count} variant="body1" gutterBottom>
                        {events.length} זומים
                    </Typography>
                    <span className={classes.filterBox}>
                        <FilterBox onFilter={getEventByFilters}/>
                     </span>   
                </div>
                {
                    events.length ? 
                        categories?.map((category: Category) => eventsByCategories[category.id] && 
                            (<EventCategoryRow key={category.id} categoryId={category.id} events={eventsByCategories[category.id]} title={category.name} isFavorite={user.favorite_categories.includes(category.id)}/>))
                    :
                    <Typography className={classes.noEventsMsg} variant="subtitle1" gutterBottom>
                        לא נמצאו זומים מתאימים
                    </Typography>
                }
            </div>
        </>
        
    );
}

export default EventsPage;
