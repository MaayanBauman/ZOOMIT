import React, {  useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategotryRow';
import FilterBox from './FilterBox/FiterBox';

const EventsPage: React.FC = (): JSX.Element => {

    const {events, categories} = useEventPage();
    const classes = useStyles();

    useEffect((()=>{

    }), [events]);

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
                    categories.map(category => (<EventCategoryRow key={category.id} events={events} title={category.name}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
