import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventsPage from './useEventsPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategoryRow';
import FilterBox from './FilterBox/FilterBox';
import EventsByCategories from 'models/Event/EventsByCategories';
import { getEventsByCatgory } from 'utils/Event';
import StoreStateType from 'redux/storeStateType';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';

const EventsPage: React.FC = (): JSX.Element => {
    const user = useSelector<StoreStateType, User>(state => state.user);
    
    const classes = useStyles();
    const { events, categories, getEventByTitle, getAllEvents} = useEventsPage();
    const eventsByCategories: EventsByCategories = getEventsByCatgory(events);
    
    const [searchText, setSearchText] = useState('');
    return (
        <>
            <div className={classes.container}>
                <div className={classes.topbar}>
                    <Typography className={classes.count} variant="subtitle1" gutterBottom>
                        {events.length} זומים
                    </Typography>
                    <FilterBox searchText={searchText} setSearchText={setSearchText} onFilter={() => { searchText ? getEventByTitle(searchText) : getAllEvents()}}/>
                </div>
                {
                    categories?.map((category: Category) => eventsByCategories[category.name] && 
                        (<EventCategoryRow key={category.id} categoryId={category.id} events={eventsByCategories[category.name]} title={category.name} isFavorite={user.favorite_categories.includes(category.id)}/>))
                }
            </div>
        </>
        
    );
}

export default EventsPage;
