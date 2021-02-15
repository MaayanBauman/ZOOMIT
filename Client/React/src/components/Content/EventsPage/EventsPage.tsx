import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventsPage from './useEventsPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategoryRow';
import FilterBox from './FilterBox/FilterBox';
import EventsByCategories from 'models/Event/EventsByCategories';
import { getEventsByCatgory } from 'utils/Event';

const EventsPage: React.FC = (): JSX.Element => {
    
    const classes = useStyles();
    const {events, getEventByTitle, getAllEvents} = useEventsPage();
    const eventsByCategories: EventsByCategories = getEventsByCatgory(events);
    
    const [searchText, setSearchText] = useState('');
    return (
        <>
            <div className={classes.container}>
                <div className={classes.topbar}>
                    <Typography className={classes.count} variant="body1" gutterBottom>
                        {events.length} זומים
                    </Typography>
                    <FilterBox searchText={searchText} setSearchText={setSearchText} onFilter={() => { searchText ? getEventByTitle(searchText) : getAllEvents()}}/>
                </div>
                {
                    Object.keys(eventsByCategories).map((categoryName: string) => (<EventCategoryRow key={categoryName} events={eventsByCategories[categoryName]} title={categoryName}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
