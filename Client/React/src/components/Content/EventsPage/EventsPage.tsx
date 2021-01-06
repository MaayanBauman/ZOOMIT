import React, {  useEffect } from 'react';
import { Typography } from '@material-ui/core';

import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategotryRow';

const EventsPage: React.FC = (): JSX.Element => {

    const {events} = useEventPage();
    const classes = useStyles();

    useEffect((()=>{

    }), [events]);

    return (
        <>
            <div className={classes.container}>
                <EventCategoryRow events={events}/> 
            </div>
        </>
        
    );
}

export default EventsPage;
