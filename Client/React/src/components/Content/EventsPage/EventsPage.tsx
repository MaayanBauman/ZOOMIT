import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventsPage from './useEventsPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategoryRow';
import FilterBox from './FilterBox/FilterBox';
import Category from 'models/Category/Category';
import Event from 'models/Event/Event';

const EventsPage: React.FC = (): JSX.Element => {

    const {events, categories, getEventByTitle, getAllEvents} = useEventsPage();

    const [searchText, setSearchText] = useState('');

    const classes = useStyles();
    
    const getEventsByCategory = (category: Category) => events.filter((event: Event) => event.category === category.id);
    
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
                    categories.map(category => (<EventCategoryRow key={category.id} events={getEventsByCategory(category)} title={category.name}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
