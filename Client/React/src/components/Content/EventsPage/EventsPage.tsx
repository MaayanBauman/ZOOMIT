import React, {  useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

import Event from 'models/Event/Event';
import useEventPage from './useEventPage';
import useStyles from './EventsPageStyles';
import EventCard  from './EventCard/EventCard';

const EventsPage: React.FC = (): JSX.Element => {

    const {events} = useEventPage();
    const classes = useStyles();

    useEffect((()=>{

    }), [events]);

    return (
        <div className={classes.container}>
            { <Carousel navButtonsAlwaysVisible={true} indicators={false} >
                <div className={classes.eventRow}>
                    { events?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
                </div>  
            </Carousel>}
            {/* <div className={classes.eventRow}>
                { events?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
            </div>   */}
        </div>
    );
}

export default EventsPage;
