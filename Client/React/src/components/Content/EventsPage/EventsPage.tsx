import React, {  useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategotryRow';
import FilterBox from './FilterBox/FiterBox';
import Category from 'models/Category/Category';

const EventsPage: React.FC = (): JSX.Element => {

    const {events, categories} = useEventPage();
    const classes = useStyles();
    
    const getEventsByCategory = (category: Category) => events.filter(event => event.category === category.id);
    
    return (
        <>
            <div className={classes.container}>
                <div className={classes.topbar}>
                    <Typography className={classes.count} variant="subtitle1" gutterBottom>
                        {events.length} זומים
                    </Typography>
                    <FilterBox />
                </div>
                {
                    categories.map(category => (<EventCategoryRow key={category.id} events={getEventsByCategory(category)} title={category.name}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
