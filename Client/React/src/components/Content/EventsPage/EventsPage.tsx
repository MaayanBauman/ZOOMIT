import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategoryRow';
import FilterBox from './FilterBox/FilterBox';
import Category from 'models/Category/Category';
import Event from 'models/Event/Event';

const EventsPage: React.FC = (): JSX.Element => {

    const {events, categories} = useEventPage();

    const [seachText, setSeachText] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

    const classes = useStyles();
    
    const getEventsByCategory = (category: Category) => filteredEvents.filter((event: Event) => event.category === category.id);

    useEffect(() => {  
        setFilteredEvents(events.filter((event: Event) => event.title.includes(seachText)));
    }, [events, seachText]);

    useEffect(() => {  
        setFilteredEvents(events);
    }, [events]);
    
    return (
        <>
            <div className={classes.container}>
                <div className={classes.topbar}>
                    <Typography className={classes.count} variant="subtitle1" gutterBottom>
                        {events.length} זומים
                    </Typography>
                    <FilterBox seachText={seachText} setSeachText={setSeachText}/>
                </div>
                {
                    categories.map(category => (<EventCategoryRow key={category.id} events={getEventsByCategory(category)} title={category.name}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
