import React, {  useEffect } from 'react';
import { Typography } from '@material-ui/core';

import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCategoryRow from './EventCategoryRow/EventCategotryRow';

const EventsPage: React.FC = (): JSX.Element => {

    const {events, categories} = useEventPage();
    const classes = useStyles();

    useEffect((()=>{

    }), [events]);

    return (
        <>
            <div className={classes.container}>
                {
                    categories.map(category => (<EventCategoryRow key={category.id} events={events} title={category.name}/>) )
                }
            </div>
        </>
        
    );
}

export default EventsPage;
